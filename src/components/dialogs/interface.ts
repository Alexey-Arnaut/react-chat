export interface IDialog {
    userAvatar?: string,
    createdAt: number,
    from: string,
    fullName: string,
    friend: string,
    pictures?: string[],
    text: string,
    to: string
}