import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signUpUser } from '../../store/slices/authSlice';

import { AuthForm } from '../../components/authForm';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export const SignUp: React.FC = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const uid = useAppSelector(state => state.auth.uid)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const signIn = (e: any) => {
        e.preventDefault()

        if (email.trim().length > 0 && password.trim().length > 0 && name.trim().length > 0 && lastName.trim().length > 0) {
            dispatch(signUpUser({
                email,
                password,
                uid,
                name,
                lastName
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
    }, [uid])

    return (
        <AuthForm title="Регистрация" link='sign-in' linkText='Уже есть аккаунт?'>
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
            <Input
                value={name}
                setValue={setName}
                placeholder='Имя'
                className='auth-form__field'
                required
            />
            <Input
                value={lastName}
                setValue={setLastName}
                placeholder='Фамилия'
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
