import React from 'react';

import { useAppSelector } from '../../../hooks/redux';

import { MessagePictures } from '../messagePictures';
import { MessageAudio } from '../messageAudio';
import { MessageText } from '../messageText';

import { IMessage } from '../interface';

export const Message: React.FC<IMessage> = ({ id, from, text, pictures, createdAt, audio, audioDuration, editMessage }) => {
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
                {pictures?.length ?
                    <MessagePictures pictures={pictures} createdAt={createdAt} text={text} /> : null
                }
                {text && <MessageText text={text} createdAt={createdAt} />}
                {audio && audioDuration && <MessageAudio audio={audio} createdAt={createdAt} {...audioDuration} />}
                {uid === from &&
                    <button className='chat__message-edit' onClick={() => editMessage(id)}>
                        <span></span>
                    </button>
                }
            </div>
        </div >
    );
};