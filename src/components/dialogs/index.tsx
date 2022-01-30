import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getDialogs } from '../../store/slices/dialogsSlice';
import { selectedDialog } from '../../store/slices/dialogIdSlice';
import { Link } from 'react-router-dom';
import { getMeInfo, getUserInfo, resultUserSearch } from '../../store/slices/userSlice';

import { Input } from '../ui/input';
import { Dialog } from './dialog';
import { Information } from '../ui/information';

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

  const selectedChat = (id: string) => {
    if (uid) {
      dispatch(selectedDialog(id))
      dispatch(getUserInfo(id))
      dispatch(getMeInfo(uid))
    }
  }

  const userSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(resultUserSearch(value))
  }

  return (
    <div className='dialogs'>
      <form onSubmit={userSearch}>
        <Input
          placeholder='Поиск'
          value={value}
          setValue={setValue}
        />
      </form>
      {foundUser.length !== 0 &&
        <div className='search-user'>
          {foundUser.map((user: any) => (
            <Link to={`/${user.uid}`} onClick={() => selectedChat(user.uid)} className="current-user" key={user.uid}>
              <div className={`current-user__avatar ${!user.userAvatar && 'current-user__avatar-no'}`}>
                {user.userAvatar ?
                  <div
                    className="current-user__avatar-img"
                    style={{ backgroundImage: `url(${user.userAvatar})` }}
                  ></div>
                  :
                  <p>{user.fullName}</p>
                }
              </div>
              <div className="current-user__info">
                <h3 className="current-user__info-full-name">{user.fullName}</h3>
                <p className="current-user__info-id">{user.searchId}</p>
              </div>
            </Link>
          ))}
        </div>
      }
      <div className="dialogs__list">
        {dialogs.length !== 0 ?
          dialogs.map((dialog, index) => (
            <Dialog {...dialog} key={index} />
          ))
          :
          <Information className='dialogs__list-info' text='Никого нет :(' />
        }
      </div>
      {currentUser.length !== 0 &&
        <div className="current-user">
          <div className={`current-user__avatar ${!currentUser.userAvatar && 'current-user__avatar-no'}`}>
            {currentUser.userAvatar ?
              <div
                className="current-user__avatar-img"
                style={{ backgroundImage: `url(${currentUser.userAvatar})` }}
              ></div>
              :
              <p>{currentUser.fullName.slice(0, 1)}</p>
            }
          </div>
          <div className="current-user__info">
            <h3 className="current-user__info-full-name">{currentUser.fullName}</h3>
            <p className="current-user__info-id">{currentUser.searchId}</p>
          </div>
        </div>
      }
    </div>
  );
};

