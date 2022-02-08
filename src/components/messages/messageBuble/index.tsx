import React from 'react';

import classNames from 'classnames'

import { IMessageBuble } from '../interface';

export const MessageBuble: React.FC<IMessageBuble> = ({ children, className }) => {
    return (
        <div
            className={classNames('chat__message-buble', className)}
        >
            {children}
        </div>
    );
};