import React from 'react'
import style from '../components/next_arrow_style.module.css'

const NextArrow = ({ onClick }) => {
    return (
        <div onClick={onClick} className={style.nextArrow}>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M8 4l8 8-8 8" stroke="black" strokeWidth="2" fill="none" />
            </svg>
        </div>
    )
}

export default NextArrow
