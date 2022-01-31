import React from 'react';

import { IDialogsCurrentUser } from '../interface'

export const DialogCurrentUser: React.FC<IDialogsCurrentUser> = ({ userAvatar, fullName, searchId }) => {
    return (
        <div className="current-user">
            <div className={`current-user__avatar ${!userAvatar && 'current-user__avatar-no'}`}>
                {userAvatar ?
                    <div
                        className="current-user__avatar-img"
                        style={{ backgroundImage: `url(${userAvatar})` }}
                    ></div>
                    :
                    <p>{fullName.slice(0, 1)}</p>
                }
            </div>
            <div className="current-user__info">
                <h3 className="current-user__info-full-name">{fullName}</h3>
                <p className="current-user__info-id">{searchId}</p>
            </div>
        </div>
    );
};