import React from 'react'
import style from '../components/prev_arrow_style.module.css'

const PrevArrow = ({ onClick }) => {
    return (
        <div onClick={onClick} className={style.prevArrow}>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M16 4l-8 8 8 8" stroke="black" strokeWidth="2" fill="none" />
            </svg>
        </div>
    )
}

export default PrevArrow
