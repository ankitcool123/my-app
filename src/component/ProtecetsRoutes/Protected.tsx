import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authUserAtom } from "../../state";
import { useSetRecoilState } from "recoil";

function Protected(props: any) {
    const setAuthUser = useSetRecoilState(authUserAtom)

    const { Component } = props;
    const navigate = useNavigate();
    useEffect(() => {
        let auth = setAuthUser;
        if (!auth) {
            navigate("/Login")
        }
    });

    return (
        <div>
            <Component></Component>
        </div>
    )
}
export default Protected;