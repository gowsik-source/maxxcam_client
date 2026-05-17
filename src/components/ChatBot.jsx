import React, { useState, useRef } from 'react'
import style from './chatbot.module.css'
import Logo from '../assets/logo.jpg'
import { BsChatLeftTextFill } from "react-icons/bs";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import { MdSend } from "react-icons/md";

const ChatBot = () => {

  const [showChatBot, setShowChatBot] = useState(false);
  const [isMessage, setIsMessage] = useState('');
  const inputFileRef = useRef(null);
  const messageInputRef = useRef(null);

  const chatBotVisibilityHandler = () => {
    setShowChatBot(prev => !prev);
  }

  const fileIconHandler = () => {
    inputFileRef.current.click();
  }

  const fileInputChangeHandler = (e) => {
    const file = e.target.files[0];
    console.log(file,'file');
  }

  const messageInputHeightHandler = () => {
    const element = messageInputRef.current;
    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
    element.style.overflow = element.scrollHeight > 63 ? 'auto' : 'hidden';
  }

  return (
    <div>
      <div>
        {!showChatBot && <button className={`default_btn ${style.always_show_container}`} onClick={chatBotVisibilityHandler}>
          <span className={style.chat_bot_icon}>
            <BsChatLeftTextFill />
          </span>
        </button>}
      </div>
      {showChatBot && <div className={style.chat_popup_container}>
        <div className={style.chat_header}>
          <div className={style.chat_header_display}>
            <div className={style.profile_picture_and_name_status_container}>
              <div className={style.chat_profile_photo}>
                <img src={Logo} alt="profile" />
                <span className={style.status_indicator_dot}></span>
              </div>
              <div className={style.chatbot_name_and_status_container}>
                <div className={style.chatbot_name}>camera-shop</div>
                <div className={style.status}>We'll replay as soon as we can</div>
              </div>
            </div>
            <div className={style.chatbot_close}>
              <button className='default_btn' onClick={chatBotVisibilityHandler}><RiCloseLargeLine /></button>
            </div>
          </div>
        </div>
        <div className={style.chat_body}></div>
        <div className={style.chat_footer}>
          <div className={style.chat_footer_display}>
            <div className={style.chat_input}>
              <textarea name="" id="" className={style.chat_textarea} placeholder='Write your message...' onChange={(e) => setIsMessage(e.target.value)} value={isMessage} autoFocus rows={1} ref={messageInputRef} onInput={messageInputHeightHandler}></textarea>
            </div>
            <div className={style.attach}>
              <button className='default_btn' onClick={fileIconHandler}><input type="file" style={{ display: 'none' }} ref={inputFileRef} onChange={fileInputChangeHandler} /><IoIosLink /></button>
            </div>
            <div className={isMessage.length === 0 ? style.no_valve_to_send : style.send}>
              <button className='default_btn' disabled={isMessage.length === 0}><MdSend /></button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default ChatBot
