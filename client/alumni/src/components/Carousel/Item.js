import React from 'react'
import { Paper, Button } from '@mui/material'

const Item = (item) => {
    console.log(item);
    return (
        <Paper>
            <img src={item.item.Pic_url} alt={item.item.PostSubject} style={{width:"100%",height:"80vh"}} />
            <h2>{item.title}</h2>
        </Paper>
    )
}

export default Item