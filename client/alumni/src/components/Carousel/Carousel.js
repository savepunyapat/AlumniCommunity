import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Item'
import { axiosReq } from '../../services/service'
import { useEffect } from 'react'



const 
Carouselimg = () => {
    const [images, setImages] = React.useState([]);

    const getNewsImage = async () => {
        try {
            const response = await axiosReq.get(
                "/getAllPosts"
            );
            setImages(response.data);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getNewsImage();
    }, []);

    return (
        <Carousel>
            {
                images.map( item => <Item key={item.id} item={item} /> )
            }
        </Carousel>
    )
}

export default Carouselimg