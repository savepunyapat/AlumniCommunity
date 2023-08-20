import { useState, useEffect, useMemo } from 'react'
import JoditEditor from 'jodit-react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import './AddPost.css'
import { axiosReq } from '../../../services/service';
import Cookies from "js-cookie";
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';


function AddPost({ placeholder }) {
    const [PostDetail, setPostDetail] = useState('')
    const [PostSubject, setPostSubject] = useState('')
    const [PostCategory, setPostCategory] = useState('')

    const handleChange = (event) => {
        setPostCategory(event.target.value);
    };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axiosReq.post('http://localhost:8000/addPost',{PostSubject,PostDetail,PostCategory});
            console.log(response.data)
        }catch(error){
            console.error('Error fetching data:', error);
        }
        console.log(PostDetail)
        console.log(PostSubject)
        console.log(PostCategory)
    }
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
        isAdmin();
    }, []);

    return (
        <div id="addpost-box" className='addpost-container'>
            <div className='addpost-container' id='form-box'>
                <h1>เพิ่มโพสต์</h1>
                <form onSubmit={handleSubmit} defaultValue="" required>
                    <label>หัวข้อ</label><br />
                    <input onChange={e=>{setPostSubject(e.target.value)}} name='PostSubject' placeholder="ชื่อหัวข้อ" /><br /><br />
                    <label>หมวดหมู่</label><br />
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={PostCategory}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={'normal'}>ข่าวทั่วไป</MenuItem>
                        <MenuItem value={'alumni'}>แนะนำศิษย์เก่า</MenuItem>
                        <MenuItem value={'activity'}>กิจกรรม</MenuItem>
                        <MenuItem value={'work'}>รับสมัครงาน</MenuItem>
                    </Select>
                    <br/><br />
                    <label>รูปภาพหน้าปก</label><br />
                    <input type="file" name="file" id="file" class="inputfile" /><br /><br />
                    <label>เนื้อหาข่าว</label><br />
                    <JoditEditor
                        value={PostDetail}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setPostDetail(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { }} />
                    <Button sx={{marginTop:'1vh',marginRight:"1vw"}} color='success' variant='contained' className='addpostBTN' type="submit" value="" >โพสต์</Button>
                    <NavLink to="/admin/posts">
                        <Button sx={{marginTop:'1vh'}} color='error' variant='contained' className='addpostBTN'>กลับ</Button>
                    </NavLink>
                </form>
                
            </div>
        </div>

    )
}

export default AddPost