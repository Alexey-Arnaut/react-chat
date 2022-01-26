import React from 'react';

import { Link } from 'react-router-dom';

import { AuthFormWrapper } from './authFormWrapper';

import './auth-form.scss'

interface IAuthForm {
  title: string,
  link: string,
  linkText: string
}

export const AuthForm: React.FC<IAuthForm> = ({ title, link, linkText, children }) => {
  return (
    <AuthFormWrapper>
      <h1 className='auth-form__title'>{title}</h1>
      {children}
      <Link className='auth-form__link' to={`/${link}`}>{linkText}</Link>
    </AuthFormWrapper>
  );
};