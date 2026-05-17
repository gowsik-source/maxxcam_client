import React from 'react'
import { Link } from 'react-router-dom';
import style from './first_section.module.css'
import { FaGreaterThan } from "react-icons/fa6";

const FirstSection = () => {

    return (
        <div>
            <div className={style.parent_container}>
                <div className={style.container}>
                    <div className={style.parent_child_container}>
                        <div className={style.child_container}>
                            <div>
                                <p>FAQ</p>
                            </div>
                            <div>
                                <p>ANSWERS? WE'VE GOT THEM.</p>
                            </div>
                            <div>
                                <p>Here are the questions we are most</p>
                            </div>
                            <div className={style.still_questions_container}>
                                <div>
                                    <p>Still got questions?</p>
                                </div>
                                <div className={style.contact_us_button}>
                                    <Link to="/contact" className={style.contact_page_redirect_link}>
                                        <span>Contact Us</span>
                                        <span className={style.contact_us_icon}><FaGreaterThan /></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstSection
