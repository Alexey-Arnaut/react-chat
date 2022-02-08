export interface IMessage {
    id: string,
    from: string,
    text: string,
    pictures?: string[],
    createdAt: number,
    audio: string,
    editMessage: (id: string) => void,
    audioDuration: IAudioDuration | ''
}

interface IAudioDuration {
    minutes: number,
    seconds: number,
}

export interface IMessageBuble {
    className?: string
}

export interface IMessageText {
    text: string,
    createdAt: number
}

export interface IMessagePictures {
    pictures: string[],
    createdAt: number,
    text: string
}

export interface IMessagePicture {
    picture: string,
    className?: string
}

export interface IMessageAudio {
    audio: string,
    minutes: number,
    seconds: number,
    createdAt: number
}

