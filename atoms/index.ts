import { atom } from "recoil";
type uploadType = {ContentType: string; data: number[]} | null





export const isPendingTX = atom<boolean>({
    key: 'isPendingTX',
    default: false,
});

export const isEditorOpen = atom<boolean>({
    key: 'isEditorOpen',
    default: false,
});

export const uploadImage = atom<uploadType>({
    key: 'uploadImage',
    default: null,
});

export const uploadPercent = atom<number>({
    key: 'uploadPercent',
    default: 0,
});


export const uploadTXID = atom<string>({
    key: 'uploadTXID',
    default: "",
});

export const isDarkMode = atom<boolean>({
    key: 'isDarkMode',
    default: false,
})


// Transfer Modal for labels 
export const transferModal = atom({
    key: 'transferModal',
    default: false
})
// Label entity
export const labelState = atom<any  | null>({
    key: 'labelState',
    default: null
})