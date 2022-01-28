export interface IDialog {
    userAvatar?: string,
    createdAt: number,
    from: string,
    fullName: string,
    id: string,
    pictures?: string[],
    text: string,
    to: string
}