import {
    Container,

} from '@mui/material'
import React from 'react'

function Contact() {
    return (
        <Container>
            <Container sx={{ justifyContent: 'center', bgcolor: 'red', display: 'flex' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d956.5006923175189!2d102.82497131067005!3d16.475397453211496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31228b1daee27277%3A0x4d95131862f3456e!2z4Lit4Liy4LiE4Liy4Lij4Lin4Li04LiX4Lii4Lin4Li04Lig4Liy4LiqIChTQzA5KQ!5e0!3m2!1sth!2sth!4v1708762455290!5m2!1sth!2sth" width="800" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </Container>
        </Container>
    )
}

export default Contact