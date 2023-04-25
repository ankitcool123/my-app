import { atom } from "recoil";
import { DATA_STORAGE_KEYS } from "../Keys/data-storage-keys";

export const userAtom = atom<any>({
    key: DATA_STORAGE_KEYS.users.usersAtom,
    default: [],
});