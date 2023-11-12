import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Item'
import imgsrc from './imgsrc.json'

const Carouselimg = () => {
    
    return (
        <Carousel>
            {
                imgsrc.map( item => <Item key={item.id} item={item} /> )
            }
        </Carousel>
    )
}

export default Carouselimg