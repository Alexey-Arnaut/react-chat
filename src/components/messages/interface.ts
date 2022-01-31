export interface IMessage {
    id: string,
    from: string,
    text: string,
    pictures?: string[],
    createdAt: number,
    editMessage: (id: string) => void
}

export interface IMessagePictures {
    pictures: string[]
}