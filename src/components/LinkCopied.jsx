import React from 'react'
import style from './link_copied.module.css'

const LinkCopied = ({className}) => {
    return (
        <div>
            <div className={className}>
                <div className={style.display}>
                    <p>Link Copied</p>
                </div>
            </div>
        </div>
    )
}

export default LinkCopied
