import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const POSTS = gql`
    query posts {
        posts {
            title
            id
        }
    }
`

const DELETE_POST = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id)
    }
`

const UPDATE_POST = gql`
    mutation updatePost($id: ID!, $input: UpdatePostInput!) {
        updatePost(id: $id, input: $input) {
            id
            title
        }
    }
`

const Posts: React.FC = () => {
    const { loading, error, data, refetch } = useQuery(POSTS)
    const [deletePost] = useMutation(DELETE_POST)
    const [updatePost] = useMutation(UPDATE_POST)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return data.posts.map(({ id, title }: { id: number; title: string }) => (
        <div key={id} data-cy="post">
            <p
                data-cy="post-title"
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={e =>
                    updatePost({
                        variables: {
                            id,
                            input: { title: e.target.textContent },
                        },
                    }).then(refetch)
                }
            >
                {title}
            </p>
            <button
                data-cy="post-button"
                onClick={() => {
                    deletePost({ variables: { id } }).then(refetch)
                }}
            >
                Delete post
            </button>
        </div>
    ))
}

export default Posts
