import type { NextPage, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'node:querystring'

interface PostItem {
    id: string
    body: string
    title: string
}
interface Props {
    posts: PostItem[]
}

const PostsIndex: NextPage<Props> = ( { posts } ) => {
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

export const getStaticProps: GetStaticProps<Props> = async () => {
    const res = await fetch( 'https://jsonplaceholder.typicode.com/posts/' );
    const posts: PostItem[] = await res.json();

    return {
        props: {
            posts
        }
    }
}

export default PostsIndex;
