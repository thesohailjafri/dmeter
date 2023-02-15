import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "primereact/button";
import "../scss/pages/access_notfound.scss";

export const NotFoundPage = () => {
    useEffect(() => {
        document.title = "Page Not Found";
    }, []);

    const history = useHistory();

    const goHome = () => {
        history.push("/");
    };
    const goBack = () => {
        history.goBack();
    };

    return (
        <div className="exception-panel absolute top-0 left-0 flex align-items-center justify-content-center h-screen w-screen">
            <div className="exception-card w-screen">
                <h1 className="">404</h1>
                <h3 className="">Page Not Found</h3>
                <div className="flex justify-content-center gap-3">
                    <Button icon="pi pi-home" label="Open Home" onClick={() => goHome()}></Button>
                    <Button icon="pi pi-arrow-left" label="Go Back" onClick={() => goBack()}></Button>
                </div>
            </div>
        </div>
    );
};
