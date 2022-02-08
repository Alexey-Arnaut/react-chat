import React from 'react';

import { IChatFormRecord } from '../interface'

export const ChatFormRecord: React.FC<IChatFormRecord> = ({ s, m }) => {
    return (
        <div className="chat__form-recording">
            <span></span>
            <p className='chat__form-recording-text'>Запись...</p>
            <div className="chat__form-recording-times">
                <p>{(s >= 10) ? s : '0' + s}</p>&nbsp;:&nbsp;
                <p>{(m >= 10) ? m : '0' + m}</p>
            </div>
        </div>
    );
};
