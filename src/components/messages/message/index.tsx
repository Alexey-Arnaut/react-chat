import React from 'react';

import moment from 'moment';
import 'moment/locale/ru'

import { useAppSelector } from '../../../hooks/redux';

import { MessagePictures } from '../messagePictures';

import { IMessage } from '../interface';

export const Message: React.FC<IMessage> = ({ from, text, pictures, createdAt }) => {
    const uid = useAppSelector(state => state.auth.uid)

    return (
        <div className={`chat__message ${uid === from ? 'own' : ''}`}>
            <div className="chat__message-container">
                <div className="chat__message-text">{text}</div>
                {pictures?.length ?
                    <MessagePictures pictures={pictures} /> : null
                }
                <div className="chat__message-date">{moment(new Date(createdAt * 1000)).format('LT')}</div>
            </div>
        </div>
    );
};