import React from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

import { Dialogs } from '../../components/dialogs';
import { Chat } from '../../components/chat';
import { Information } from '../../components/ui/information';

import './home.scss'

export const Home: React.FC = () => {
    const dialogId = useAppSelector(state => state.dialogId.id)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (dialogId === null) {
            navigate('/')
        }
    }, [dialogId, navigate])

    return (
        <div className='wrapper'>
            <Dialogs />
            <Routes>
                <Route path=":id" element={<Chat />} />
                <Route path="" element={<Information text="Выберите чат" />} />
            </Routes>
        </div>
    );
};
