import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ReactMarkdown from 'react-markdown';
import style from './privacy_policy.module.css';

const PrivacyPolicy = () => {

    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getPrivacyPolicy = async () => {
            try {
                setLoading(true);
                const response = await Axios.get('/privacy_policy.md');
                setContent(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getPrivacyPolicy();
    }, []);

    return (
        <div className={style.container}>
            <div className={style.display}>
                {loading && <div className={style.loader}>
                    <h1>Loading...</h1>
                </div>}
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    )
}

export default PrivacyPolicy
