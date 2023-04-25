
export const setLoginUser = (data: any, isRemember: boolean = false) => {
    localStorage.getItem("user");
};
export const getLoginUser = () => {
    if(localStorage.getItem("user")){
        let user = JSON.parse(localStorage.getItem("user") || "");
        return user;
    }else{
        return null;
    }
};
export const removeUser = () => {
    localStorage.removeItem("user");
    localStorage.clear();
};


