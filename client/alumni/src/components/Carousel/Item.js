import React from 'react'
import { Paper, Button } from '@mui/material'

const Item = (item) => {
    console.log(item);
    return (
        <Paper>
            <img src={item.item.Pic_url} alt={item.item.PostSubject} style={{width:"100%",height:"80vh"}} />
            <div className='component-carousel-desc' style={{display:"flex",justifyContent:"center"}}>
            <h2>{item.item.PostSubject}</h2>
            </div>
            
        </Paper>
    )
}

export default Item