import React from 'react';

import classNames from 'classnames'

import { IInput } from './interface'

import './input.scss'

export const Input: React.FC<IInput> = ({ type, placeholder, className, value, setValue, required }) => {
    return (
        <input
            type={type ? type : 'text'}
            placeholder={placeholder}
            className={classNames('input', className)}
            value={value}
            onChange={e => setValue(e.target.value)}
            required={required ? true : false}
        />
    );
};
