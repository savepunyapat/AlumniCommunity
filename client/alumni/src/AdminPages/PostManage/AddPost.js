import { useState, useEffect, useMemo } from 'react'
import JoditEditor from 'jodit-react';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
function AddPost({ placeholder }) {
    const [PostDetail, setPostDetail] = useState('')
    const [PostSubject, setPostSubject] = useState('')
    const [PostCategory, setPostCategory] = useState('')

    const handleChange = (event) => {
        setPostCategory(event.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(PostDetail)
        console.log(PostSubject)
        console.log(PostCategory)
    }
    return (
        <div className='container'>
            <div className='container' id='form-box'>
                <form onSubmit={handleSubmit} defaultValue="" required>
                    <label>หัวข้อ</label><br />
                    <input onChange={handleChange} name='PostSubject' placeholder="ชื่อหัวข้อ" /><br />
                    <InputLabel id="demo-simple-select-label">หมวดหมู่</InputLabel>
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

                    <label>Details</label><br />
                    <JoditEditor
                        value={PostDetail}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={newContent => setPostDetail(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => { }} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>

    )
}

export default AddPost