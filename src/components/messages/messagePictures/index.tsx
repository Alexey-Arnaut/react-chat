import React from 'react';

import { messageSendTime } from '../../../helpers/time';

import { ChatMessagePicture } from '../chatMessagePicture';

import { IMessagePictures } from '../interface'

export const MessagePictures: React.FC<IMessagePictures> = ({ pictures, createdAt, text }) => {
    return (
        <div className="chat__message-pictures">
            {pictures.length === 1 &&
                pictures.map((picture, index) => (
                    <ChatMessagePicture picture={picture} key={index} />
                ))
            }
            {pictures.length === 2 &&
                pictures.map((picture, index) => (
                    <ChatMessagePicture picture={picture} key={index} className='chat__message-picture-2'
                    />
                ))
            }
            {pictures.length === 3 &&
                pictures.map((picture, index) => (
                    <ChatMessagePicture picture={picture} key={index} className='chat__message-picture-3'
                    />
                ))
            }
            {pictures.length === 4 &&
                pictures.map((picture, index) => (
                    <ChatMessagePicture picture={picture} key={index} className='chat__message-picture-4'
                    />
                ))
            }
            {pictures.length === 5 &&
                pictures.map((picture, index) => (
                    <ChatMessagePicture picture={picture} key={index} className='chat__message-picture-5'
                    />
                ))
            }
            {pictures.length === 6 &&
                pictures.map((picture, index) => (
                    <ChatMessagePicture picture={picture} key={index} className='chat__message-picture-6'
                    />
                ))
            }
            {pictures.length === 7 &&
                pictures.map((picture, index) => (
                    <ChatMessagePicture picture={picture} key={index} className='chat__message-picture-7'
                    />
                ))
            }
            {pictures.length === 8 &&
                pictures.map((picture, index) => (
                    <ChatMessagePicture picture={picture} key={index} className='chat__message-picture-8'
                    />
                ))
            }
            {pictures.length === 9 &&
                pictures.map((picture, index) => (
                    <ChatMessagePicture picture={picture} key={index} className='chat__message-picture-9'
                    />
                ))
            }
            {!text &&
                <div className="chat__message-date">{messageSendTime(createdAt)}</div>
            }
        </div>
    );
};