import React from 'react';

import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { selectedDialog } from '../../../store/slices/dialogIdSlice';
import { getUserInfo } from '../../../store/slices/userSlice';

import { IDialogsSearchUser } from '../interface';

export const DialogSearchUser: React.FC<IDialogsSearchUser> = ({ uid, userAvatar, fullName, searchId }) => {
    const dispatch = useAppDispatch()

    const selectedChat = (id: string) => {
        if (uid) {
            dispatch(selectedDialog(id))
            dispatch(getUserInfo(id))
        }
    }

    return (
        <Link to={`/${uid}`} onClick={() => selectedChat(uid)} className="current-user" key={uid}>
            <div className={`current-user__avatar ${!userAvatar && 'current-user__avatar-no'}`}>
                {userAvatar ?
                    <div
                        className="current-user__avatar-img"
                        style={{ backgroundImage: `url(${userAvatar})` }}
                    ></div>
                    :
                    <p>{fullName.slice(0, 1)}</p>
                }
            </div>
            <div className="current-user__info">
                <h3 className="current-user__info-full-name">{fullName}</h3>
                <p className="current-user__info-id">{searchId}</p>
            </div>
        </Link>
    );
};
