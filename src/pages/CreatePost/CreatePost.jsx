import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

function CreatePost() {
    const [newPost, setNewPost] = useState({
        title: '',
        body: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPost((prevPost) => ({
            ...prevPost,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(API_URL, newPost);
            console.log(response);
            setNewPost({ title: '', body: '' });
            navigate('/posts');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={newPost.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        name="body"
                        value={newPost.body}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreatePost;
