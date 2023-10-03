import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq } from "../../services/service";
function PostDetail() {
    const [post,setPost] = useState();
    const {id} = useParams();
    
    const getNews = async () => {
        try {
            const response = await axiosReq.get(
                `http://localhost:8000/post/${id}`
            );
            setPost(response?.data);
            console.log(response?.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        getNews();
        console.log(post)
    }, [])
  return (
    <div>
        <h1>Post Detail {id}</h1>
        {post && (
            <div>
                <h1>{post.PostSubject}</h1>
                <h3>{post.PostCategory}</h3>
                <h3>{post.PostDetail}</h3>
                <img src={post.Pic_url} alt="" width="500px" height="500px"/>
            </div>
        )}
    </div>

  )
}

export default PostDetail;