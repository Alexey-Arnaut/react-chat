import React from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getDialogs } from '../../store/slices/dialogsSlice';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { selectedDialog } from '../../store/slices/dialogIdSlice';
import { Link } from 'react-router-dom';
import { getMeInfo, getUserInfo } from '../../store/slices/userSlice';

import { Input } from '../ui/input';
import { Dialog } from './dialog';
import { Information } from '../ui/information';

import './dialogs.scss'

export const Dialogs: React.FC = () => {
  const [value, setValue] = React.useState('')
  const dispatch = useAppDispatch()
  const dialogs = useAppSelector(state => state.dialogs.dialogs)
  const uid = useAppSelector(state => state.auth.uid)
  const [user, setUser]: any = React.useState([])
  const [currentUser, setCurrentUser]: any = React.useState([])

  React.useEffect(() => {

    if (uid) {
      dispatch(getDialogs(uid))
    }

    const getCurrentUser = async () => {
      const q = query(collection(db, "users"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCurrentUser({ ...doc.data() })
      });
    }

    getCurrentUser()
  }, [uid])

  const selectedChat = (id: string) => {
    if (uid) {
      dispatch(selectedDialog(id))
      dispatch(getUserInfo(id))
      dispatch(getMeInfo(uid))
    }
  }

  const searchUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const q = query(collection(db, "users"), where("searchId", "==", value));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUser({
          fullName: doc.data().fullName,
          userAvatar: doc.data().userAvatar,
          uid: doc.data().uid,
          searchId: doc.data().searchId,
        })
      });
    });
  }

  return (
    <div className='dialogs'>
      <form onSubmit={searchUser}>
        <Input
          placeholder='Поиск'
          value={value}
          setValue={setValue}
        />
      </form>
      {user.length !== 0 &&
        <div className='search-user'>
          <Link to={`/${user.uid}`} onClick={() => selectedChat(user.uid)} className="current-user">
            <div className={`current-user__avatar ${!user.userAvatar && 'current-user__avatar-no'}`}>
              {user.userAvatar ?
                <div
                  className="current-user__avatar-img"
                  style={{ backgroundImage: `url(${user.userAvatar})` }}
                ></div>
                :
                <p>{user.fullName.slice(0, 1)}</p>
              }
            </div>
            <div className="current-user__info">
              <h3 className="current-user__info-full-name">{user.fullName}</h3>
              <p className="current-user__info-id">{user.searchId}</p>
            </div>
          </Link>
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

