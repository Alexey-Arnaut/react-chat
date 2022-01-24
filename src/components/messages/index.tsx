import React from 'react';

import { Message } from '../message';

import './messages.scss'

export const Messages = () => {
    const chatRef = React.useRef<any>()

    React.useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
    }, [])

    const messages = [
        {
            id: '1',
            from: '1',
            to: '2',
            date: '12:02',
            text: 'Lorem ipsum dolor sit amet.'
        },
        {
            id: '2',
            from: '1',
            to: '2',
            date: '12:02',
            text: 'Lorem, ipsum dolor..',
            pictures: [
                'https://4lapki.com/wp-content/uploads/2020/10/Screenshot_7-1.jpg',
            ]
        },
        {
            id: '3',
            from: '2',
            to: '1',
            date: '12:10',
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, dicta ipsa officia recusandae ut dolores iste cupiditate alias doloribus quisquam.'
        },
        {
            id: '4',
            from: '1',
            to: '2',
            date: '12:12',
            text: 'Lorem ipsum dolor, sit amet consectetur adipisicing.'
        }
    ]

    return (
        <div className='chat__messages' ref={chatRef}>
            {messages.map(message => (
                <Message {...message} key={message.id} />
            ))}
        </div>
    );
};
