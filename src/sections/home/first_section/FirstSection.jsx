import React from 'react'
import { useNavigate } from 'react-router-dom'
import style from './first_section.module.css'

const FirstSection = () => {

  const navigate = useNavigate();
  const goToShopPage = () => {
    navigate('/shop');
  }

  return (
    <div>
      <div className={style.parent_container}>
        <div className={style.container}>
            <div className={style.parent_child_container}>
              <div className={style.child_container}>
                <div className={style.heading}>
                  <h1>PRICE DROP!</h1>
                </div>
                <div className={style.sub_heading}>
                  <h1>Up to 15% Off All Our Products!</h1>
                </div>
              </div>
              <div className={style.shop_now_button}>
                <button onClick={goToShopPage}>Shop Now</button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FirstSection
