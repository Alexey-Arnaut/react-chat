import React from 'react';

import classNames from 'classnames'

import { IButton } from './interface'

import './button.scss'

export const Button: React.FC<IButton> = ({ children, className, handleClick }) => {
    return (
        <button
            className={classNames('button', className)}
            onClick={handleClick}
        >
            {children}
        </button >
    );
};