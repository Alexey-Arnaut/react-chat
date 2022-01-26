import React from 'react';

import classNames from 'classnames';

import { IInformation } from './interface';

import './information.scss'

export const Information: React.FC<IInformation> = ({ text, className }) => {
    return (
        <div className={classNames('information', className)}>
            <h1 className='information__title'>{text}</h1>
        </div>
    );
};