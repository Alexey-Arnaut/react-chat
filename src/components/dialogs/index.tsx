import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getDialogs } from '../../store/slices/dialogsSlice';
import { getMeInfo, resultUserSearch } from '../../store/slices/userSlice';
import { sendMessage } from '../../store/slices/messagesSlice';

import { Input } from '../ui/input';
import { Dialog } from './dialog';
import { Information } from '../ui/information';
import { DialogCurrentUser } from './dialogsCurrentUser';
import { DialogSearchUser } from './dialogsSearchUser';

import './dialogs.scss'

export const Dialogs: React.FC = () => {
  const [value, setValue] = React.useState('')
  const dispatch = useAppDispatch()
  const dialogs = useAppSelector(state => state.dialogs.dialogs)
  const uid = useAppSelector(state => state.auth.uid)
  const currentUser: any = useAppSelector(store => store.user.meInfo)
  const foundUser: any = useAppSelector(state => state.user.foundUser)

  React.useEffect(() => {

    if (uid) {
      dispatch(getDialogs(uid))
      dispatch(getMeInfo(uid))
    }

  }, [uid, dispatch])

  const userSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(resultUserSearch(value))
  }

  const clearUserSearch = () => {
    dispatch(resultUserSearch(''))
    setValue('')
  }

  return (
    <div className='dialogs'>
      <div className="dialogs__form">
        <form className='dialogs__form-container' onSubmit={userSearch}>
          <Input
            placeholder='Поиск'
            value={value}
            setValue={setValue}
          />
        </form>
        {foundUser.length !== 0 &&
          <button className='dialogs__form-button' onClick={clearUserSearch}></button>
        }
      </div>
      {foundUser.length !== 0 &&
        <div className='search-user'>
          <>
            <p className='search-user__text'>Поиск: {value}</p>
            {foundUser.map((user: any) => (
              <DialogSearchUser {...user} key={user.uid} />
            ))}
            <p className='search-user__text'>Диалоги</p>
          </>
        </div>
      }
      <div className="dialogs__list">
        {dialogs.length !== 0 ?
          dialogs.slice().sort((a: any, b: any) => b.createdAt - a.createdAt).map((dialog, index) => (
            <Dialog {...dialog} key={index} />
          ))
          :
          <Information className='dialogs__list-info' text='Никого нет :(' />
        }
      </div>
      {currentUser.length !== 0 &&
        <DialogCurrentUser {...currentUser} />
      }
    </div>
  );
};

