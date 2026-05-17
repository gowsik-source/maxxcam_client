import React, { useState } from 'react'
import style from './image_viewer.module.css'
import { RiCloseLargeLine } from "react-icons/ri";
import Slider from "react-slick";
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';

const ImageViewer = ({productImages, closeComponent}) => {

  const [isImageZoom, setIsImageZoom] = useState(false);

    const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    };

    const imageZoomHandler = () => {
      setIsImageZoom(prev => !prev);
    }

  return (
    <div>
      <div className={style.parent_container}>
          <div className={style.container}>
            <div className={style.close_icon}>
              <div>
                <button className='default_btn' onClick={closeComponent}><RiCloseLargeLine /></button>
              </div>
            </div>
            <div className={style.parent_slider_container}>
              <div className={style.slider_container}>
                  <Slider {...settings}>
                      {productImages.map((imageSelector, index) => (
                          <div className={style.slider_item}>
                              <img src={imageSelector} alt="" key={index} onClick={imageZoomHandler} className={isImageZoom ? style.image_zoom : style.image_not_zoom} />
                          </div>
                      ))}
                  </Slider>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ImageViewer
