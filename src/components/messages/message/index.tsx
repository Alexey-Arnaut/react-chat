import React from 'react';

import moment from 'moment';
import 'moment/locale/ru'
import { useAppSelector } from '../../../hooks/redux';

import { MessagePictures } from '../messagePictures';

import { IMessage } from '../interface';

export const Message: React.FC<IMessage> = ({ id, from, text, pictures, createdAt, editMessage }) => {
    const uid = useAppSelector(state => state.auth.uid)
    const scrollRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [text])

    return (
        <div ref={scrollRef} className={`chat__message ${uid === from ? 'own' : ''}`}>
            <div className="chat__message-container">
                <div className="chat__message-text">{text}</div>
                {pictures?.length ?
                    <MessagePictures pictures={pictures} /> : null
                }
                <div className="chat__message-date">
                    {moment(new Date(createdAt * 1000)).format('LT')}
                </div>
                {uid === from &&
                    <button className='chat__message-edit' onClick={() => editMessage(id)}>
                        <span></span>
                    </button>
                }

            </div>
        </div>
    );
};