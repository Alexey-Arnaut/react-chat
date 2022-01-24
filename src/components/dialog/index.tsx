import React from 'react';

import { IDialog } from './interface'

import './dialog.scss'

export const Dialog: React.FC<IDialog> = ({ avatar, name, lastMessage, date }) => {
    return (
        <div className='dialog'>
            <div className="dialog__avatar">
                <img src={avatar} alt="" />
            </div>
            <div className="dialog__info">
                <div className="dialog__info-top">
                    <div className="dialog__info-title">{name}</div>
                    <div className="dialog__info-date">{date}</div>
                </div>
                <div className="dialog__info-bottom">
                    <div className="dialog__info-last-message">{lastMessage}</div>
                </div>
            </div>
        </div>
    );
};