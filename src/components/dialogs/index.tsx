import React from 'react';

import { Input } from '../ui/input';
import { Dialog } from './dialog';

import './dialogs.scss'

export const Dialogs: React.FC = () => {
  const [value, setValue] = React.useState('')

  const dialogs = [
    {
      id: '9h5O98YiDZS5Jp0bZReIeN4e1dU2',
      name: 'Angelina Jolie',
      avatar: 'https://i.pinimg.com/736x/17/1f/cb/171fcb073e4c2fab5394fe9713a28c3d--long-wavy-hairstyles-celebrity-hairstyles.jpg',
      lastMessage: 'Lorem ipsum dolor, sit amet consectetur adipisicing.',
      createdAt: '12:12'
    },
    {
      id: "NOhnEGoXCbaT45mB3HtMzSmFS3k1",
      name: 'Chris Hemsworth',
      avatar: 'https://is2-ssl.mzstatic.com/image/thumb/RjJixx3neQmuD4_UP2lhOg/550x550ve.jpg',
      lastMessage: 'Lorem ipsum dolor sit amet.',
      createdAt: '11:10'
    }
  ]

  return (
    <div className='dialogs'>
      <Input
        placeholder='Поиск'
        value={value}
        setValue={setValue}
      />
      <div className="dialogs__list">
        {dialogs.map(dialog => (
          <Dialog {...dialog} key={dialog.id} />
        ))}
      </div>
    </div>
  );
};

