import React from 'react'
import { 
    Button,
    IconButton,
    Container,
 
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackBtn(props) {
    
  return (
    <Container>
        <Button
            color="primary"
            aria-label="back"
            href={props.path}
            startIcon={<ArrowBackIcon />}
        >
            กลับ
        </Button>
    </Container>
  )
}

export default BackBtn