import React from 'react';

import { ChatForm } from '../chatForm';
import { Messages } from '../messages';

import './chat.scss'

export const Chat = () => {
  return (
    <div className='chat'>
      <Messages />
      <ChatForm />
    </div>
  );
};