import React from 'react';

import { Dialogs } from '../../components/dialogs';
import { Chat } from '../../components/chat';

import './home.scss'

export const Home = () => {
    return (
        <div className='wrapper'>
            <Dialogs />
            <Chat />
        </div>
    );
};
