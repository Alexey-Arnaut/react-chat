import React from 'react';

import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getMessages } from '../../store/slices/messagesSlice';
import { selectMessage } from '../../store/slices/messagesSlice';

import { Message } from './message';
import { Information } from '../ui/information';

import './messages.scss'

import { IMessage } from './interface';

export const Messages: React.FC = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const messages = useAppSelector(state => state.messages.messages)
    const uid = useAppSelector(state => state.auth.uid)

    React.useEffect(() => {
        if (id && uid) {
            dispatch(getMessages(({ id, uid })))
        }
    }, [id, uid, dispatch])

    const editMessage = (id: string) => {

        dispatch(selectMessage(id))
    }

    return (
        <div className='chat__messages'>
            {messages.length ?
                <>
                    {messages.slice().sort((a: any, b: any) => a.createdAt - b.createdAt).map((message: IMessage) => (
                        <Message {...message} key={message.id} editMessage={editMessage} />
                    ))}
                </>
                :
                <Information text='Начните диалог' className='chat__messages-information' />
            }

        </div>
    );
};
