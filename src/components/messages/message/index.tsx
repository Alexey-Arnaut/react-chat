import React from 'react';

import moment from 'moment';
import 'moment/locale/ru'

import { IMessage } from './interface';

export const Message: React.FC<IMessage> = ({ from, text, pictures, createdAt }) => {
    const uid = 'uCKnhsvh3chi7lddbqVp7Vbufl32'

    return (
        <div className={`chat__message ${uid === from ? 'own' : ''}`}>
            <div className="chat__message-container">
                <div className="chat__message-text">{text}</div>
                {pictures &&
                    <div className="chat__message-pictures">
                        {pictures.map((pic, index) => (
                            <div className="chat__message-picture" key={index}>
                                <img src={pic} alt={text} />
                                <div className="chat__message-icon">
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="far"
                                        data-icon="eye"
                                        className="svg-inline--fa fa-eye fa-w-18"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 576 512">
                                        <path
                                            fill="currentColor"
                                            d="M288 144a110.94 110.94 0 0 0-31.24 5 55.4 55.4 0 0 1 7.24 27 56 56 0 0 1-56 56 55.4 55.4 0 0 1-27-7.24A111.71 111.71 0 1 0 288 144zm284.52 97.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400c-98.65 0-189.09-55-237.93-144C98.91 167 189.34 112 288 112s189.09 55 237.93 144C477.1 345 386.66 400 288 400z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                <div className="chat__message-date">{moment(new Date(createdAt * 1000)).format('LT')}</div>
            </div>
        </div>
    );
};