import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AxiosInterpector({ children }) {
    const toast = useRef(null);
    const history = useHistory();
    axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("user_token");
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.patch["Content-Type"] = "application/json";
    axios.defaults.headers.put["Content-Type"] = "application/json";
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.delete["Content-Type"] = "application/json";
    axios.interceptors.response.use(
        (res) => {
            // Add configurations here
            if (res.data.msg) {
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: res.data.msg,
                    life: 5000,
                });
            }
            return res;
        },
        (err) => {
            // console.log({ err });
            if (err.response.status === 401) {
                window.location.replace("/accessdenied");
            }
            if (err.response.data.msg) {
                if (err.response.status >= 500) {
                    toast.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: err.response.data.msg,
                        life: 5000,
                    });
                } else if (err.response.status >= 400) {
                    toast.current.show({
                        severity: "warn",
                        summary: "Alert",
                        detail: err.response.data.msg,
                        life: 5000,
                    });
                }
            }
            return Promise.reject(err);
        }
    );
    return (
        <div>
            <Toast ref={toast} />
            {children}
        </div>
    );
}
