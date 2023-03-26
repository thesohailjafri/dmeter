import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userEmailAtom } from "../recoil/atoms/userAtom";
import { Password } from "primereact/password";
import { loginApi } from "../api";
import delay from "../utils/delay";

export const LoginPage = () => {
    const [email, setEmail] = useRecoilState(userEmailAtom);

    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        setLoading(true);
        const res = await loginApi({
            email,
            password,
        });
        if (res) {
            if (res.status === 200) {
                localStorage.setItem("user_token", res?.data?.token);
                await delay(1000);
                setLoading(false);
                window.location.href = "/";
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        document.title = "Login";
    }, []);
    return (
        <div className="h-screen flex ai-center">
            {/* login side */}
            <div className="card mx-auto h-fit-content mt-8">
                <h3>Login</h3>
                <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                        <label aria-label="email">Email</label>
                        <InputText
                            placeholder="Enter your email"
                            id="email"
                            type="text"
                            className="w-full"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>

                    <div className="field col-12 ">
                        <label aria-label="password">Password</label>
                        <Password
                            toggleMask
                            feedback={false}
                            placeholder="Enter your password"
                            className="w-full"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="text-center mb-3">
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                    <Link to={"/register"} className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
                        Register
                    </Link>
                </div>

                <Button loading={loading} disabled={loading || !password || !email} icon="pi pi-sign-in" label="Login" className="w-full" onClick={handleLogin} />
            </div>
            {/* <div className=" hidden md:block w-6 bg-no-repeat bg-cover  " style={{ backgroundImage: `url(${backgrounds})` }}></div> */}
        </div>
    );
};
