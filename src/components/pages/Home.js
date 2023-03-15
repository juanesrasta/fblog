import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ReactPlayer from 'react-player';
import video from './assets/video_back.webm';

export const Home = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="container-fluid container-video" id="container-video">
                <div id="col-sm-8">
                    <ReactPlayer 
                        url={video}
                        playing={true}
                        autoPlay={true} 
                        controls
                        loop   
                        width={'100%'} 
                        height={'100%'}            
                    />
                </div>
                <div id="col-sm-4">
                    <img
                        className="d-block"
                        src={require('./assets/images/5.jpg')}
                    />
                </div>
            <div id="carousel-yo">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={require('./assets/images/hori4.jpg')}
                    alt="First slide"
                    />    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require('./assets/images/hori2.jpg')}
                        alt="Second slide"
                    />      
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require('./assets/images/hori3.jpg')}
                        alt="Third slide"
                    />        
                </Carousel.Item>
            </Carousel>
            </div>
        </div>
    )
}