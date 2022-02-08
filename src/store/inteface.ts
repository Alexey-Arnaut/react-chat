export interface ISignInUser {
    email: string,
    password: string
}

export interface ISignUpUser {
    email: string,
    password: string,
    name: string,
    lastName: string,
    userAvatar: string,
    uid: string
}

export interface IGetMessagesParams {
    id: string,
    uid: string
}

export interface IGetMessages {
    from: string,
    to: string,
    text: string,
    createdAt: number,
    id: string,
    pictures: string,
    audio: string,
    audioDuration: IAudioDuration | ''
}

export interface ISendMessageParams {
    id: string,
    uid: string,
    value: string,
    pictures: string[],
    audio: string,
    audioDuration: IAudioDuration | '',
}

export interface ISaveChangeMessage {
    value: string,
    messageId: string,
    id: string,
    uid: string,
    lastMessageId: string
}

export interface IDeleteMessage {
    value: string,
    messageId: string,
    id: string,
    uid: string,
    pictures: string[],
    audio: string,
    createdAt: ICreatedAt
}

interface ICreatedAt {
    seconds: number,
    nanoseconds: number
}

interface IAudioDuration {
    minutes: number,
    seconds: number,
}

export interface IGetDialogs {
    audio: string,
    createdAt: number,
    friend: string,
    fullName: string,
    pictures: string[],
    text: string,
    uid: string,
    userAvatar: string,
}

export interface IResultUserSearch {
    fullName: string,
    userAvatar: string,
    uid: string,
    searchId: string
}

export interface IUserFriendsParams {
    userInfo: any,
    meInfo: any,
    uid: string,
    id: string,
    value: string,
    pictures: string[],
    audio: string,
}