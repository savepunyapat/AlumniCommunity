import React from 'react'
import { Paper, Button } from '@mui/material'

const Item = (item) => {
    console.log(item);
    return (
        <Paper>
            <img src={item.item.Pic_url} alt={item.item.PostSubject} style={{width:"100%",height:"50vh"}} />
            <div className='component-carousel-desc' style={{display:"flex",justifyContent:"center"}}>
            <h4>{item.item.PostSubject}</h4>
            </div>
            
        </Paper>
    )
}

export default Item