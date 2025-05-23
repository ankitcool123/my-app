import { atom } from "recoil";
import { DATA_STORAGE_KEYS } from "../Keys/data-storage-keys";
import { Message } from "../component/UserChats/Message";

export const userAtom = atom<any>({
    key: DATA_STORAGE_KEYS.users.usersAtom,
    default: [],
});
export const messagesAtom = atom<Message[]>({
    key: DATA_STORAGE_KEYS.users.usersAtom,
    default: [],
});
export const loaderAtom = atom({
  key: DATA_STORAGE_KEYS.loader.loaderAtom,
  default: false,
});
export const selectedChatUserAtom = atom<any | null>({
  key: DATA_STORAGE_KEYS.selectedChatUsers.selectedChatUser,
  default: null,
});
export const usersDataAtom = atom({
  key: DATA_STORAGE_KEYS.usersData.usersDataAtom,
  default: [], 
});