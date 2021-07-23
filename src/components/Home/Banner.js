import React from 'react';
import './Banner.css';
import img1 from '../../Images/bannerImage1.jpg'
import img2 from '../../Images/bannerImage2.jpg'
import img3 from '../../Images/bannerImage3.jpg'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';

const Banner = () => {
    return (
        <Carousel className='banner'>
            <Carousel.Item interval={2500}>
                <img
                    className="d-block w-100"
                    src={img1}
                    alt="First slide"
                />

                {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, repellendus.</p>
            </Carousel.Item>

            <Carousel.Item interval={2500}>
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Second slide"
                />

                {/* <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption> */}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, repellendus.</p>
            </Carousel.Item>

            <Carousel.Item interval={2500}>
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                />

                {/* <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption> */}
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, repellendus.</p>
            </Carousel.Item>
        </Carousel>
    )
}

export default Banner;
