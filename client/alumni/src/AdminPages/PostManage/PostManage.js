import React, { useEffect, useState } from "react";
import { axiosReq } from '../../services/service';
import { Button } from "@mui/material";
import Cookies from "js-cookie";

function PostManage() {
    const [posts, setPosts] = useState([]);
    const commentExist = (comments) => {
        if (comments && Object.keys(comments).length > 0) {
            return (
                <div>
                    <h4>Comments:</h4>
                    {Object.values(comments).map((comment, index) => (
                        <p key={index}>{comment.comment}</p>
                    ))}
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        const isAdmin = async () => {
            try {
                const accessToken = Cookies.get('token');
                if (!accessToken) {
                    window.location.href = '/login';
                }
                const response = await axiosReq.get('http://localhost:8000/isAdmin');
                if (response.data === 'not-admin') {
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        const fetchData = async () => {
            try {
                const response = await axiosReq.get('http://localhost:8000/getAllPosts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        isAdmin();
        fetchData();
    }, []);
    
    return (
        <div>
            {posts.map((post) => (
                <div key={post._id}>
                    <h2>{post.PostSubject}</h2>
                    <p>{post.PostDetail}</p>
                    <Button>Delete</Button>
                    <Button>Edit</Button>
                </div>
            ))}
        </div>
    );
}

export default PostManage;
