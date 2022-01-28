export interface IMessage {
    from: string,
    text: string,
    pictures?: string[],
    createdAt: number,
}

export interface IMessagePictures {
    pictures: string[]
}