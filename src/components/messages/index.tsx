import React from 'react';

import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getMessages } from '../../store/slices/messagesSlice';

import { Message } from './message';
import { Information } from '../ui/information';

import './messages.scss'

export const Messages: React.FC = () => {
    const chatRef = React.useRef<HTMLDivElement>(null)
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.messages.messages)
    const uid = useAppSelector(state => state.auth.uid)

    React.useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        if (id && uid) {
            dispatch(getMessages(({ id, uid })))
        }
    }, [id, uid, dispatch])

    return (
        <div className='chat__messages' ref={chatRef}>
            {
                messages.length ? messages.map((message, index) => (
                    <Message {...message} key={index} />
                ))
                    :
                    <Information text='Начните диалог' className='chat__messages-information' />}
        </div>
    );
};
