import { useEffect, useState } from "react";
import { axiosReq } from '../../services/service';


function PostManage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axiosReq.get("http//localhost:8000/getAllPosts").then((res) => {
            setPosts(res.data);
        });
    }, []);
  return (
    <div>
        <h1>PostManage</h1>
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Content</th>
                    <th>Author</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{post.content}</td>
                        <td>{post.author}</td>
                        <td>{post.createdAt}</td>
                        <td>{post.updatedAt}</td>
                        <td>
                            <button>Edit</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default PostManage;
