import React from 'react'

// create styles for footer in this file
import './Footer.css'

function Footer() {
  return (
    <div className="footer">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="d-flex">
                        <p>College Of Computing</p>
                    </div>
                    <div className="d-flex">
                        <a href="tel:555-555-555">+94 11 2650 000</a>
                    </div>
                    <div className="d-flex">
                        <p>Khon Kaen</p>
                    </div>
                </div>
                <div className="col-lg-3 col-md-2 col-sm-6">
                    <div className="row">
                        <div className="col">
                            <a className="footer-nav">Home</a>
                            <br/>
                            <a className="footer-nav">About Us</a>
                            <br/>
                            <a className="footer-nav">Contact Us</a>
                        </div>
                        <div className="col">
                            <a className="footer-nav">Alumni</a>
                            <br/>
                            <a className="footer-nav">Events</a>
                            <br/>
                            <a className="footer-nav">Gallery</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-6 align-items-center">
                    <div className="d-flex justify-content-center">
                        <a href="https://www.mrt.ac.lk/" target="_blank" rel="noopener noreferrer"><img src="https://www.mrt.ac.lk/web/sites/default/files/inline-images/Logo%20-%20English%20-%20Horizontal%20-%20Full%20Colour.png" alt="logo" width="200px" height="auto"/></a>
                    </div>
                    <div className="d-flex justify-content-center">
                        <p className="footer-brand">Khon Kaen University</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer