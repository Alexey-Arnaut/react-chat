export interface IDialog {
    userAvatar?: string,
    uid: string,
    createdAt: number,
    from: string,
    fullName: string,
    friend: string,
    pictures: string[] | [],
    text: string,
    to: string,
    audio: string
}

export interface IDialogsCurrentUser {
    userAvatar?: string,
    fullName: string,
    searchId: string
}

export interface IDialogsSearchUser {
    uid: string,
    userAvatar?: string,
    fullName: string,
    searchId: string
}

export interface IDialogLastMessageInfo {
    text: string,
    pictures: string[] | [],
    audio: string
}