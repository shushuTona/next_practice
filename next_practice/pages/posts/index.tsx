import type { NextPage } from 'next'

type PostItem = {
    id: string
    body: string
    title: string
}

type PagePropsType = {
    posts: PostItem[]
}

const PostsIndex: NextPage<PagePropsType> = ( { posts }: PagePropsType ) => {
    return (
        <ul>
            {
                posts.map( ( post: PostItem ) => {
                    return (
                        <li key={post.id}>
                            <a href={`/posts/${post.id}`}>
                                {post.id} : {post.title}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export async function getStaticProps() {
    const res = await fetch( 'https://jsonplaceholder.typicode.com/posts/' );
    const posts: PostItem[] = await res.json();

    return {
        props: {
            posts
        }
    }
}

export default PostsIndex;
