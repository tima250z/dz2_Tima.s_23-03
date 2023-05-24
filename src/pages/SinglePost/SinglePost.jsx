import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

const fetchPost = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await response.json();
    return data;
};

const deletePost = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
    });
    return response.json();
};

const SinglePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: post, isLoading } = useQuery(["post", id], () => fetchPost(id));

    const deletePostMutation = useMutation(() => deletePost(id), {
        onSuccess: () => {
            navigate("/posts");
        },
    });

    useEffect(() => {
        if (!isLoading && !post) {
            navigate("/not-found"); // Handle case when post is not found
        }
    }, [isLoading, post, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <button onClick={() => navigate(-1)}>Назад</button>
            <button onClick={deletePostMutation.mutate}>Удалить</button>
        </div>
    );
};

export default SinglePost;
