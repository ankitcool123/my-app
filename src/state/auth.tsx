
import {atom} from "recoil";

const localPersist = ({onSet, setSelf, node }: any) => {
    const storeData = localStorage.getItem(node.key);
    if (storeData != null) {
        setSelf(JSON.parse(storeData || ""))
    }
    onSet((newData: any, _:any, isReset: any) => {
        isReset
          ? localStorage.removeItem(node.key)
          : localStorage.setItem(node.key, JSON.stringify(newData));
    });
};
const authUserAtom = atom({
    key: "user",
    default: "",
    effects:[localPersist]
});

export {authUserAtom};
