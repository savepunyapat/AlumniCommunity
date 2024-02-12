import React,{ useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosReq,axiosWithTokenReq } from '../../services/service'
import { 
    Container,
    ImageList,
    ImageListItem,
    Modal,
    Box,
    IconButton,
    Typography,
    ImageListItemBar,
    ThemeProvider,

} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


function GalleryPreview() {
    const { id } = useParams();
    const [album, setAlbum] = useState({});
    const [images, setImages] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState({});
    const [loading, setLoading] = useState(true); 

    
    const previewStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: "5px",
    };

    const handleClose = () => {
        setOpen(false);
    }

    const getAlbum = async () => {
        try {
            const response = await axiosReq.get('http://localhost:8000/gallery/getAlbumById/'+id);
            setAlbum(response.data);
            setImages(response.data.AlbumImages);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getAlbum();
    }, [])
    

  return (
    <Container sx={{minHeight:"80vh",width:"auto",minWidth:"100vw"}}>
        <Box sx={{justifyContent:'center',textAlign:'center'}}>
            <h1>{album.AlbumTitle}</h1>
            <Typography variant="h6" gutterBottom>
                {album.AlbumDescription}
            </Typography>   
        </Box>
        <ImageList sx={{paddingTop:5}} gap={8} cols={4}>
            {images.map((item) => (
                <ImageListItem key={item._id} onClick={() => {
                    setSelectedImage(item);
                    setOpen(true);
                }}>
                    <img
                        src={item.Image_URL}
                        alt={item.ImageTitle}
                        style={{
                            width: "85%",
                            height: "auto",
                            objectFit: "cover",
                        }}
                    />
                    <ImageListItemBar
                        title={item.ImageTitle}
                        subtitle={<span>วันที่ : {new Date(item.ImageDate).toISOString().split('T')[0]}</span>}
                        position='below'
                    >
                    
                </ImageListItemBar>
                </ImageListItem>
                
            ))}
        </ImageList>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={previewStyle}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <img
                    src={selectedImage.Image_URL}
                    alt={selectedImage.ImageTitle}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </Box>
        </Modal>

    </Container>

  )
}

export default GalleryPreview