import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signUpUser } from '../../store/slices/authSlice';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

import { AuthForm } from '../../components/authForm';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export const SignUp: React.FC = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [userPhoto, setUserPhoto]: any = React.useState('')
    const [userPhotoPreview, setUserPhotoPreview]: any = React.useState('')
    const uid = useAppSelector(state => state.auth.uid)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const registUser = async (e: any) => {
        e.preventDefault()

        if (email.trim().length > 0 && password.trim().length > 0 && name.trim().length > 0 && lastName.trim().length > 0) {

            let url: string = '';

            if (userPhoto) {
                const imgRef = ref(
                    storage,
                    `users/${new Date().getTime()} - ${userPhoto[0].name}`
                );

                const snap = await uploadBytes(imgRef, userPhoto[0])
                url = await getDownloadURL(ref(storage, snap.ref.fullPath));
            }

            dispatch(signUpUser({
                email,
                password,
                uid,
                name,
                lastName,
                userAvatar: url || ''
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

    React.useEffect(() => {

        if (userPhoto.length !== 0) {
            const reader = new FileReader()
            reader.readAsDataURL(userPhoto[0])

            reader.onload = () => {
                setUserPhotoPreview(reader.result)
            }
        }

    }, [userPhoto])

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
            <div className="auth-form__container">
                <input
                    className='auth-form__field-photo'
                    onChange={(e) => setUserPhoto(e.target.files)}
                    type="file"
                    accept='image/*'
                    id='photo'
                />
                <label htmlFor="photo">
                    {userPhotoPreview ?
                        <div
                            className="auth-form__container-photo"
                            style={{ backgroundImage: `url(${userPhotoPreview})` }}
                        ></div>
                        :
                        <div className="auth-form__container-photo"></div>
                    }
                    <p>Загрузить фото</p>
                </label>
            </div>

            <Button
                className='auth-form__button'
                text='Зарегестрироваться'
                handleClick={registUser}
            />
        </AuthForm>
    );
};
