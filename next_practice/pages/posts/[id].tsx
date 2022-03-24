import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'node:querystring'

interface PostItem {
    id: string
    body: string
    title: string
}
interface PagePropsType {
    post: PostItem
}

const Posts: NextPage<PagePropsType> = ( { post } ) => {
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

// getStaticPropsの戻り値になるpropsの型を定義
interface Props {
    post: PostItem
}
// getStaticPathsで作成したparamsの型を定義
interface Params extends ParsedUrlQuery {
    id: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async ( { params } ) => {
    const res = await fetch( `https://jsonplaceholder.typicode.com/posts/${params!.id}` );
    const post: PostItem = await res.json();

    return {
        props: {
            post
        }
    }
}

interface PathsItem {
    params: Params
}
type PathsType = PathsItem[];

export const getStaticPaths: GetStaticPaths<Params>  = async () => {
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
