import React from 'react'
import style from './first_section.module.css'

const FirstSection = () => {
  return (
    <div>
      <div className={style.parent_container}>
        <div className={style.container}>
          <div className={style.parent_child_container}>
            <div className={style.child_container}>
              <div>
                <p>Contact Us</p>
              </div>
              <div>
                <p>We’re here to help! Contact us with any question and we will do our best to reply as soon as we can.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirstSection
