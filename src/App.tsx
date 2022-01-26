import React from 'react';

import { Routes, Route, useNavigate } from 'react-router-dom'
import { useAppSelector } from './hooks/redux';

import { Home } from './pages/home'
import { SignIn } from './pages/signIn';
import { SignUp } from './pages/signUp';

export const App: React.FC = () => {
  const uid = useAppSelector(state => state.auth.uid)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (uid === null) {
      navigate('/sign-in')
    }

  }, [uid])

  return (
    <>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </>
  );
}