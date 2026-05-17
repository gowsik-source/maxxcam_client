import React from 'react'
import style from './second_section.module.css'
import RightBoxImage from '../../../assets/section_2_image_2.jpg'

const SecondSection = () => {
  return (
    <div>
      <div className={style.parent_container}>
        <div className={style.container}>
          <div className={style.box_container}>
            <div className={style.left_box_container}>
              <div className={style.highlighted_text}>
                <h2>2 YEARS WARRANTY</h2>
              </div>
              <div className={style.normal_text}>
                <p>ON OUR ENTIRE LENSES SELECTION</p>
              </div>
            </div>
            <div className={style.right_box_container}>
              <div className={style.border}>
                <div className={style.right_box_image}>
                  <img src={RightBoxImage} alt="camera" />
                </div>
                <div className={style.right_box_text_container}>
                  <div className={style.right_box_normal_text}>
                    <p>New TIPOX Models</p>
                  </div>
                  <div className={style.right_box_highlighted_text}>
                    <h2>IN STOCK NOW !</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.second_container}>
          <div className={style.second_container_text}>
            <p>Free Delivery in The US  <span>\</span>  Same Day Shipping</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondSection
