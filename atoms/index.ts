import { atom } from "recoil";
import { userInfo } from "../src/types";
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

// Edit Modal State
export const editModalState = atom({
    key: 'editModalState',
    default: false,
})
export const userInfoState = atom<userInfo | null>({
    key: 'userInfoState',
    default: null,
})

export const confirmModalState = atom({
    key: 'confirmModalState',
    default: false
})