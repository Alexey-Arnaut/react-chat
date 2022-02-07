import React from "react"

import { IDialogLastMessageInfo } from '../interface'

export const DialogLastMesssgeInfo: React.FC<IDialogLastMessageInfo> = ({ text, pictures, audio }) => {

    if (text && !pictures.length) {
        return <div className="dialog__info-last-message-text">{text}</div>
    } else if (pictures && !text && !audio) {
        return (
            <div className="dialog__info-last-message-picture">
                <div
                    className="dialog__info-last-message-img"
                    style={{ backgroundImage: `url(${pictures[0]})` }}
                ></div>
                <div className="dialog__info-last-message-text">{pictures.length === 1 ? 'Фото' : 'Альбом'}</div>
            </div>
        )
    } else if (text && pictures && !audio) {
        return (
            <div className="dialog__info-last-message-picture">
                <div
                    className="dialog__info-last-message-img"
                    style={{ backgroundImage: `url(${pictures[0]})` }}
                ></div>
                <div className="dialog__info-last-message-text">{text}</div>
            </div>
        )
    } else if (audio?.length && !text && !pictures.length) {
        return <div className="dialog__info-last-message-text">Голосовое сообщение</div>
    } else {
        return null
    }
}