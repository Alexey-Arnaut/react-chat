import React from 'react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectedDialog } from '../../../store/slices/dialogIdSlice';
import { getUserInfo } from '../../../store/slices/userSlice';
import moment from 'moment';
import 'moment/locale/ru'

import { IDialog } from '../interface'

export const Dialog: React.FC<IDialog> = ({ uid, friend, userAvatar, fullName, text, createdAt, pictures }) => {
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
                        {text?.length === 0 ?
                            pictures?.length === 1 ?
                                <div className="dialog__info-last-message-picture">
                                    <div
                                        className="dialog__info-last-message-img"
                                        style={{ backgroundImage: `url(${pictures})` }}
                                    ></div>
                                    <div className="dialog__info-last-message-text">{text.length === 0 ? "Фото" : text}</div>
                                </div>
                                :
                                <div className="dialog__info-last-message-picture">
                                    <div
                                        className="dialog__info-last-message-img"
                                        style={{ backgroundImage: `url(${pictures})` }}
                                    ></div>
                                    <div className="dialog__info-last-message-text">Альбом</div>
                                </div>
                            :
                            <div className="dialog__info-last-message-text">{text}</div>
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
};