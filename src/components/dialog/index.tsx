import React from 'react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectedDialog } from '../../store/slices/dialogId';

import { IDialog } from './interface'

import './dialog.scss'

export const Dialog: React.FC<IDialog> = ({ id, avatar, name, lastMessage, createdAt }) => {
    const dispatch = useAppDispatch()
    const dialogId = useAppSelector(state => state.dialogId.id)

    const selectedChat = (id: string) => {
        dispatch(selectedDialog(id))
    }

    return (
        <Link to={id} className={`dialog ${dialogId === id ? 'dialog--active' : ''}`} onClick={() => selectedChat(id)}>
            <div className="dialog__avatar">
                <img src={avatar} alt="" />
            </div>
            <div className="dialog__info">
                <div className="dialog__info-top">
                    <div className="dialog__info-title">{name}</div>
                    <div className="dialog__info-date">{createdAt}</div>
                </div>
                <div className="dialog__info-bottom">
                    <div className="dialog__info-last-message">{lastMessage}</div>
                </div>
            </div>
        </Link>
    );
};