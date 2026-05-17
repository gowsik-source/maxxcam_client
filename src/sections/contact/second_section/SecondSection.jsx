import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './second_section.module.css'
import { FaGreaterThan } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md"
import axios from 'axios'

const SecondSection = () => {

    const [isName, setIsName] = useState('');
    const [isEmail, setIsEmail] = useState('');
    const [isMessage, setIsMessage] = useState('');
    const [isError, setIsError] = useState({});

    const validateForm = () => {
        const localError = {};

        if (!isName.trim()) {
            localError.name = "Enter your name";
        }
        if (isName.replace(/[A-Za-z0-9\s]/g, "").length > 4) {
            localError.name = "Too much of special characters.";
        }

        if (!isEmail.trim()) {
            localError.email = "Enter your Email";
        }

        if (!/\S+@\S+\.\S+/.test(isEmail)) {
            localError.email = "Enter an email address like example@mysite.com.";
        }
        if (isMessage.replace(/[A-Za-z0-9\s]/g, "").length > 6) {
            localError.isMessage = "Too much of special characters.";
        }

        setIsError(localError);
        return Object.keys(localError).length === 0;
    }

    const formAction = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const formData = {
                    name: isName,
                    email: isEmail,
                    message: isMessage
                };
                const apiResponse = await axios.post('https://jsonplaceholder.typicode.com/posts', formData)
                console.log(apiResponse);
            } catch (error) {
                console.log('api error or network error');
            }
        }
    }

    return (
        <div>
            <div className={style.master_container}>
                <div className={style.parent_container}>
                    <div className={style.container}>
                        {/* left section */}
                        <div className={style.display_left}>
                            <div className={style.address_section}>
                                <div>
                                    <h3>Mailing address:</h3>
                                </div>
                                <div className={style.address}>
                                    <a href="https://maps.app.goo.gl/WGegE3qTP6mjmyFJ7" target="_blank" rel="noopener noreferrer">500 Terry Francine Street San Francisco, CA 94158</a>
                                </div>
                            </div>
                            <div className={style.contact_number_section}>
                                <div>
                                    <h3>Call us 24/7:</h3>
                                </div>
                                <div className={style.contact_number}>
                                    <a href="tel:+911234567890">Tel: 123-456-7890</a>
                                </div>
                            </div>
                            <div className={style.email_section}>
                                <div>
                                    <h3>Or email us at:</h3>
                                </div>
                                <div className={style.mail_id}>
                                    <a href="mailto:info@mysite.com">info@mysite.com</a>
                                </div>
                            </div>
                            <div className={style.questions_section}>
                                <Link to="/faq" className={style.faq_page_redirect_link}>
                                    <span className={style.questions_heading}>
                                        <p>Questions?</p>
                                    </span>
                                    <span className={style.see_our_faq_heading}>
                                        <p>See Our FAQ</p>
                                    </span>
                                    <span className={style.arrow_icon}>
                                        <FaGreaterThan />
                                    </span>
                                </Link>
                            </div>
                        </div>
                        {/* right section */}
                        <div className={style.display_right}>
                            <div className={style.display_right_heading}>
                                <h3>Write to us:</h3>
                            </div>
                            {/* form */}
                            <form onSubmit={formAction}>
                                <div className={style.name_input_container}>
                                    <input type="text" className={`default_input_style ${isError.name ? style.input_validation_error : ''}`} placeholder='Name *' value={isName} onChange={(e) => setIsName(e.target.value)} />
                                    <span className={style.tool_tip}>This field is mandatory</span>
                                </div>
                                {isError.name && <div className={style.error_message_container}>
                                    <div className={style.error_icon}>
                                        <MdErrorOutline />
                                    </div>
                                    <div className={style.error_message}>
                                        <p>{isError.name}</p>
                                    </div>
                                </div>}
                                <div className={style.email_input_container}>
                                    <input type="email" className={`default_input_style ${isError.email ? style.input_validation_error : ''}`} placeholder='Email *' value={isEmail} onChange={(e) => setIsEmail(e.target.value)} />
                                    <span className={style.tool_tip}>This field is mandatory</span>
                                </div>
                                {isError.email && <div className={style.error_message_container}>
                                    <div className={style.error_icon}>
                                        <MdErrorOutline />
                                    </div>
                                    <div className={style.error_message}>
                                        <p>{isError.email}</p>
                                    </div>
                                </div>}
                                <div className={style.message_textarea_container}>
                                    <textarea name="" id="" className={`default_input_style ${isError.isMessage ? style.textarea_input_validation_error : style.added_textarea_input_style}`} placeholder='Type your message here...' value={isMessage} onChange={(e) => setIsMessage(e.target.value)}></textarea>
                                </div>
                                {isError.isMessage && <div className={style.error_message_container}>
                                    <div className={style.error_icon}>
                                        <MdErrorOutline />
                                    </div>
                                    <div className={style.error_message}>
                                        <p>{isError.isMessage}</p>
                                    </div>
                                </div>}
                                <div className={style.submit_button}>
                                    <button type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondSection
