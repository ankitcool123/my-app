import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props: any) {
    const { Component } = props;
    const navigate = useNavigate();
    useEffect(() => {
        let auth = localStorage.getItem("user-token");
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