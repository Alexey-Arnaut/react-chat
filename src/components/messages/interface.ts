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

export interface IMessagePictures {
    pictures: string[]
}