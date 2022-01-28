export interface IInput {
    type?: string,
    placeholder?: string,
    value?: string,
    setValue: (e: string) => void,
    className?: string,
    required?: boolean,
    id?: string
}