import React from 'react'
import { Paper, Button } from '@mui/material'

const Item = (item) => {
    console.log(item);
    return (
        <Paper>
            <img src={item.item.image} alt={item.title} style={{width:"100%",height:"45vh"}} />
            <h2>{item.title}</h2>

        </Paper>
    )
}

export default Item