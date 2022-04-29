import { atom } from "recoil";

export const isEditorOpen = atom<boolean>({
    key: 'isEditorOpen',
    default: false,
});