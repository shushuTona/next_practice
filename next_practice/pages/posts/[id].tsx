import type { NextPage } from 'next';

type PostItem = {
    id: string
    body: string
    title: string
}
type PagePropsType = {
    post: PostItem
}

const Posts: NextPage<PagePropsType> = ( { post }: PagePropsType ) => {
    return (
        <>
            <h1>{post.id} : {post.title}</h1>
            <div>
                <p>{post.body}</p>
                <p><a href="/posts/">back Posts Top</a></p>
            </div>
        </>
    )
}

type GetStaticPropsType = {
    params: PostItem
}

export async function getStaticProps( { params }: GetStaticPropsType ) {
    const res = await fetch( `https://jsonplaceholder.typicode.com/posts/${params.id}` );
    const post: PostItem = await res.json();

    return {
        props: {
            post
        }
    }
}

type PathsItem = {
    params: {
        id: string
    }
}
type PathsType = PathsItem[];

export async function getStaticPaths() {
    const res = await fetch( 'https://jsonplaceholder.typicode.com/posts' );
    const posts = await res.json();

    const paths: PathsType = posts.map( ( post: PostItem ) => ( {
        params: { id: post.id.toString() }
    } ) )

    return {
        paths,
        fallback: false
    }
}

export default Posts;
