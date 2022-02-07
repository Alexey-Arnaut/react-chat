import React from 'react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectedDialog } from '../../../store/slices/dialogIdSlice';
import { getUserInfo } from '../../../store/slices/userSlice';
import moment from 'moment';
import 'moment/locale/ru'

import { DialogLastMesssgeInfo } from '../dialogLastMessageInfo';

import { IDialog } from '../interface'

export const Dialog: React.FC<IDialog> = ({ uid, friend, userAvatar, fullName, text, createdAt, pictures, audio }) => {
    const dispatch = useAppDispatch()
    const dialogId = useAppSelector(state => state.dialogId.id)

    const selectedChat = (id: string) => {
        dispatch(selectedDialog(id))
        dispatch(getUserInfo(id))
    }

    return (
        <Link to={friend} className={`dialog ${dialogId === friend ? 'dialog--active' : ''}`} onClick={() => selectedChat(friend)}>
            <div className={`dialog__avatar ${!userAvatar && 'dialog__avatar-no'}`}>
                {userAvatar ?
                    <div
                        className="dialog__avatar-img"
                        style={{ backgroundImage: `url(${userAvatar})` }}
                    ></div>
                    :
                    <p>{fullName.slice(0, 1)}</p>
                }
            </div>
            <div className="dialog__info">
                <div className="dialog__info-top">
                    <div className="dialog__info-title">{uid === friend ? "Избранное" : fullName}</div>
                    <div className="dialog__info-date">
                        {moment(new Date(createdAt * 1000)).format('LT')}
                    </div>
                </div>
                <div className="dialog__info-bottom">
                    <div className="dialog__info-last-message">
                        <DialogLastMesssgeInfo text={text} pictures={pictures} audio={audio} />
                    </div>
                </div>
            </div>
        </Link>
    );
};