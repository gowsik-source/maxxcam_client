import React, { useState, useEffect } from 'react'
import style from './second_section.module.css'
import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import LinkCopied from '../../../components/LinkCopied';

// social media icons
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { CiLink } from "react-icons/ci";

const generalFaq = [
    {
      id: 'faq-section-1',
      question: 'What is an FAQ section?',
      answer: 'An FAQ section can be used to quickly answer common questions about your business like "Where do you ship to?", "What are your opening hours?", or "How can I book a service?".'
    },
    {
      id: 'faq-section-2',
      question: 'Why do FAQ matter?',
      answer: 'FAQs are a great way to help site visitors find quick answers to common questions about your business and create a better navigation experience.'
    },
    {
      id: 'faq-section-3',
      question: 'Where can I add my FAQs?',
      answer: 'FAQs can be added to any page on your site or to your Wix mobile app, giving access to members on the go.'
    }
  ]

  const settingUpFaq = [
    {
      id: 'faq-section-4',
      question: 'How do I add a new question & answer?',
      answer: 'To add a new FAQ follow these steps: 1. Manage FAQs from your site dashboard or in the Editor 2. Add a new question & answer 3. Assign your FAQ to a category 4. Save and publish.'
    },
    {
      id: 'faq-section-5',
      question: 'Can I insert an image, video, or GIF in my FAQ?',
      answer: 'Yes. To add media follow these steps: 1. Manage FAQs from your site dashboard or in the Editor 2. Create a new FAQ or edit an existing one 3. From the answer text box click on the video, image or GIF icon 4. Add media from your library and save.'
    },
    {
      id: 'faq-section-6',
      question: 'How do I edit or remove the "Frequently Asked Questions" title?',
      answer: 'You can edit the title from the FAQ "Settings" tab in the Editor. To remove the title from your mobile app go to the "Site & App" tab in your Owner`s app and customize.'
    }
  ]

const SecondSection = () => {

  const socialMediaIcons = [
    {
      name: 'facebook',
      icon: CiFacebook,
      link: 'https://www.facebook.com/'
    },
    {
      name: 'twitter',
      icon: FaXTwitter,
      link: 'https://x.com/'
    },
    {
      name: 'linkedin',
      icon: CiLinkedin,
      link: 'https://in.linkedin.com/'
    }
  ]

  const [isSearchValue, setIsSearchValue] = useState(''); //search bar user entered value
  const [isFaqCategory, setIsFaqCategory] = useState('generalFaq'); //category bar
  const [isFaqItems, setIsFaqItems] = useState(generalFaq); // main useState to store faq items
  const [isAnswerOpen, setIsAnswerOpen] = useState(''); // to handle faq answer section visiblity
  const [isLinkCopied, setIsLinkCopied] = useState(false); // to handle link copied component visiblity

  // default logics for when page loading & open the particular secion using id #
  useEffect(() => {
    if (isFaqItems.length === 0) {
      setIsAnswerOpen('');
      return;
    }
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setIsAnswerOpen(hash);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
    else {
      setIsAnswerOpen(isFaqItems === generalFaq ? isFaqItems[0].id : '');

    }
  }, [isFaqItems]);

  // useEffect for auto hide Link copied component
  useEffect(() => {
    if (!isLinkCopied) return;

    const timer = setTimeout(() => {
      setIsLinkCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLinkCopied]);

  // search filter function
  const searchFilterHandler = (e) => {
    const exactInputValue = e.target.value;
    setIsSearchValue(exactInputValue);
    const value = e.target.value.toLowerCase().trim();
    const sourceFaqs = [...generalFaq, ...settingUpFaq];

    // if search is empty → show category data
    if (!value) {
      setIsFaqItems(isFaqCategory === "generalFaq" ? generalFaq : settingUpFaq);
      return;
    }

    const searchWords = value.split(/\s+/);
    const filteredFaqs = sourceFaqs.filter((faq) => {
      const text = `${faq.question} ${faq.answer}`.toLowerCase();
      return searchWords.every((word) => text.includes(word));
    });

    setIsFaqItems(filteredFaqs);
  };

  //general data
  const generalFaqDataHandler = () => {
    setIsFaqItems(generalFaq);
    setIsFaqCategory('generalFaq');
  }

  // setting up data
  const settingUpFaqDataHandler = () => {
    setIsFaqItems(settingUpFaq);
    setIsFaqCategory('settingUpFaq');
    setIsAnswerOpen('');
  }

  // to handle anser section display
  const answerSectionDisplayHandler = (id) => {
    setIsAnswerOpen(prevId => (prevId === id ? '' : id));
  }

  //copy link
  const copyFaqLink = (faqId) => {
    const url = `${window.location.origin}${window.location.pathname}#${faqId}`;
    navigator.clipboard.writeText(url);
    setIsLinkCopied(true);
  };

  return (
    <div>
      <div className={style.master_container}>
        <div className={style.parent_container}>
          <div className={style.container}>
            <div className={style.container_for_heading_and_search_bar}>
              <div className={style.frequently_heading}>
                <p>Frequently asked questions</p>
              </div>
              {/* search bar */}
              <div className={style.search_bar}>
                <input type="text" placeholder='Looking for something' onChange={searchFilterHandler} />
                <span className={style.search_icon}><CiSearch /></span>
              </div>
            </div>
            {/* faq nav */}
            <div className={isSearchValue.length > 0 ? style.container_for_faq_nav_hidden : style.container_for_faq_nav}>
              <div className={style.faq_nav}>
                <div>
                  <button className={`default_btn ${isFaqCategory === 'generalFaq' ? style.faq_nav_item_active : ''}`} onClick={generalFaqDataHandler}>General</button>
                </div>
                <div className={isFaqCategory === 'generalFaq' ? style.hr_line_for_nav_topic : style.hr_line_for_nav_topic_hidden}>
                  <hr />
                </div>
              </div>
              <div className={style.faq_nav}>
                <div>
                  <button className={`default_btn ${isFaqCategory === 'settingUpFaq' ? style.faq_nav_item_active : ''}`} onClick={settingUpFaqDataHandler}>Setting Up for FAQs</button>
                </div>
                <div className={isFaqCategory === 'settingUpFaq' ? style.hr_line_for_nav_topic : style.hr_line_for_nav_topic_hidden}>
                  <hr />
                </div>
              </div>
            </div>
            {/* show search value when user typing on search bar */}
            {isSearchValue && isFaqItems.length > 0 && <div className={style.container_for_search_input_value}>
              <div>
                <p>Showing results for:</p>
              </div>
              <div className={style.search_input_value}>
                <p>{isSearchValue}</p>
              </div>
            </div>}
            {/* empty message */}
            {isFaqItems.length === 0 && <div className={style.container_for_empty_message}>
              <div>
                <p>No FAQs found</p>
              </div>
              <div>
                <p>Try using different keywords or explore the FAQ section to find what you're looking for.</p>
              </div>
            </div>}
            {/* faq data */}
            {isFaqItems.map((faqData, index) => (
              <div key={index} id={faqData.id} className={style.container_for_faq_questions}>
                {/* faq question */}
                <div className={style.faq_question_container_section}>
                  <button className={`default_btn ${style.faq_question_container}`} onClick={() => answerSectionDisplayHandler(faqData.id)}>
                    <span className={style.faq_question}>
                      <h3>{faqData.question}</h3>
                    </span>
                    <span className={isAnswerOpen === faqData.id ? style.faq_arrow_icon_open : style.faq_arrow_icon_closed}>
                      <RiArrowDropDownLine />
                    </span>
                  </button>
                </div>
                {/* faq answer section */}
                <div className={isAnswerOpen === faqData.id ? style.parent_faq_answer_icon_container : style.parent_faq_answer_icon_container_hidden}>
                  <div className={style.faq_answer_icon_container}>
                    <div className={style.faq_answer}>
                      <p>{faqData.answer}</p>
                    </div>
                    {/* social media icons */}
                    <div className={style.faq_section_icon_container}>
                      {socialMediaIcons.map((icon, index) => {
                        const IconComponent = icon.icon;
                        return (
                          <div key={index} className={style.social_media_icon}>
                            <a href={icon.link} target="_blank" rel="noopener noreferrer"><IconComponent /></a>
                            <span className={style.tooltip_name}>{icon.name}</span>
                          </div>
                        );
                      })}
                      {/* copy link icon */}
                      <div className={style.social_media_icon}>
                        <button className='default_btn' onClick={() => copyFaqLink(faqData.id)}><CiLink /></button>
                        <span className={style.tooltip_name}>Copy link</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* link copied component */}
      <LinkCopied className={isLinkCopied ? style.copy_link_container : style.copy_link_container_hidden} />
    </div>
  )
}

export default SecondSection