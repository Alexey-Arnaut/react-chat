import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signInUser } from '../../store/slices/authSlice';

import { AuthForm } from '../../components/authForm';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Information } from '../../components/ui/information';

export const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const uid = useAppSelector(state => state.auth.uid)
  const loading = useAppSelector(state => state.auth.loading)

  const signIn = (e: any) => {
    e.preventDefault()

    if (email.trim().length > 0 && password.trim().length > 0) {
      dispatch(signInUser({
        email,
        password
      }))

      if (uid !== null) {
        navigate('/')
      }
    }
  }

  React.useEffect(() => {
    if (uid !== null) {
      navigate('/')
      localStorage.setItem('user', JSON.stringify({ email, password }))
    }

    if (localStorage.getItem('user')) {
      const { email, password } = JSON.parse(localStorage.getItem('user')!)

      setEmail(email)
      setPassword(password)

      dispatch(signInUser({
        email,
        password
      }))
    }
  }, [uid])

  if (loading) {
    return (
      <Information text='Загрузка...' />
    )
  }

  return (
    <AuthForm title="Войти в аккаунт" link='sign-up' linkText="Еще нет аккаунта?">
      <Input
        value={email}
        setValue={setEmail}
        placeholder='Почта'
        className='auth-form__field'
        required
      />
      <Input
        value={password}
        setValue={setPassword}
        placeholder='Пароль'
        className='auth-form__field'
        required
      />

      <Button
        className='auth-form__button'
        text='Войти'
        handleClick={signIn}
      />
    </AuthForm>
  );
};