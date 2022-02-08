import React from 'react';

import { messageSendTime } from '../../../helpers/time';

import { MessageBuble } from '../messageBuble'

import { IMessageText } from '../interface'

export const MessageText: React.FC<IMessageText> = ({ text, createdAt }) => {
    return (
        <MessageBuble className='chat__message-buble-text'>
            <div className="chat__message-text">{text}</div>
            <div className="chat__message-date">{messageSendTime(createdAt)}</div>
        </MessageBuble>
    );
};
