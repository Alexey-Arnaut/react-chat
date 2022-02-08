export interface IPreviewImg {
    previewImg: string[],
    removeImg: (e: React.MouseEvent<SVGSVGElement>, index: number) => void
}

export interface IChatFormRecord {
    s: number;
    m: number;
}

export interface IChatFormEditButtons {
    closeEdit: () => void,
    saveChange: () => void,
    removeMessage: () => void,
}