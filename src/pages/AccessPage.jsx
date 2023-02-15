import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import "../scss/pages/access_notfound.scss";

export const AccessPage = () => {
    const history = useHistory();

    const goHome = () => {
        history.push("/");
    };
    const goLogin = () => {
        history.push("/login");
    };
    const goBack = () => {
        history.goBack();
    };
    useEffect(() => {
        document.title = "Access denied";
    }, []);

    return (
        <div className="exception-panel absolute top-0 left-0 flex align-items-center justify-content-center h-screen w-screen">
            <div className="exception-card w-screen">
                <h1 className="">ACCESS</h1>
                <h3 className="">Denied</h3>
                <p className="text-3xl">You are not allowed to view this page.</p>
                <div className="flex justify-content-center gap-3">
                    <Button icon="pi pi-arrow-left" label="Go Back" onClick={goBack}></Button>
                    <Button icon="pi pi-home" label="Open Home" onClick={goHome}></Button>
                    <Button icon="pi pi-sign-in" label="Open Login Page" onClick={goLogin}></Button>
                </div>
            </div>
        </div>
    );
};
