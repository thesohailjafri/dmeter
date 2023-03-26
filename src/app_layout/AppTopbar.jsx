import React from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import { layoutColorModeAtom } from "../recoil/atoms/layoutAtom";
import { mobileTopbarMenuActiveAtom } from "../recoil/atoms/layoutAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Button } from "primereact/button";
import { userBranchIdAtom, userPositionAtom, userRestaurantIdAtom, userEmailAtom, userFirstnameAtom, userIdAtom, userLastnameAtom, userPhoneAtom, userRestaurantNameAtom } from "../recoil/atoms/userAtom";

export const AppTopbar = (props) => {
    const layoutColorMode = useRecoilValue(layoutColorModeAtom);
    const mobileTopbarMenuActive = useRecoilValue(mobileTopbarMenuActiveAtom);
    // atoms getters
    const userRestaurantName = useRecoilValue(userRestaurantNameAtom);
    // atoms setters

    const setUserIdAtom = useSetRecoilState(userIdAtom);
    const setEmailAtom = useSetRecoilState(userEmailAtom);
    const setFirstnameAtom = useSetRecoilState(userFirstnameAtom);
    const setLastnameAtom = useSetRecoilState(userLastnameAtom);
    const setPhoneAtom = useSetRecoilState(userPhoneAtom);
    const setUserRestaurantIdAtom = useSetRecoilState(userRestaurantIdAtom);
    const setUserRestaurantNameAtom = useSetRecoilState(userRestaurantNameAtom);
    const setUserBranchIdAtom = useSetRecoilState(userBranchIdAtom);
    const setUserPositionAtom = useSetRecoilState(userPositionAtom);

    const logoutHandler = () => {
        localStorage.removeItem("customer_token");
        setUserIdAtom("");
        setEmailAtom("");
        setFirstnameAtom("");
        setLastnameAtom("");
        setPhoneAtom("");
        setUserRestaurantIdAtom("");
        setUserRestaurantNameAtom("");
        setUserBranchIdAtom("");
        setUserPositionAtom("");
        window.location.href = "/login";
    };

    const logoutConfirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: "Do you want to logout from this system?",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: logoutHandler,
        });
    };
    return (
        <div className="layout-topbar">
            <ConfirmPopup />
            <Link to="/" className="layout-topbar-logo">
                <img src={"/favicon_io/android-chrome-192x192.png"} alt="logo" />
                <span> {userRestaurantName ? userRestaurantName : "Dmeter"}</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": mobileTopbarMenuActive })}>
                <li>
                    <Button
                        tooltip="Events"
                        tooltipOptions={{
                            position: "bottom",
                            className: "hidden lg:block",
                        }}
                        className="p-link layout-topbar-button"
                        onClick={props.onMobileSubTopbarMenuClick}
                    >
                        <i className="pi pi-calendar" />
                        <span>Events</span>
                    </Button>
                </li>
                <li>
                    <Button
                        tooltip="Settings"
                        tooltipOptions={{
                            position: "bottom",
                            className: "hidden lg:block",
                        }}
                        className="p-link layout-topbar-button"
                        onClick={props.onMobileSubTopbarMenuClick}
                    >
                        <i className="pi pi-cog" />
                        <span>Settings</span>
                    </Button>
                </li>
                <li>
                    <Button
                        tooltip="Profile"
                        tooltipOptions={{
                            position: "bottom",
                            className: "hidden lg:block",
                        }}
                        className="p-link layout-topbar-button"
                        onClick={props.onMobileSubTopbarMenuClick}
                    >
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </Button>
                </li>
                <li>
                    <Button
                        tooltip="Logout"
                        tooltipOptions={{
                            position: "bottom",
                            className: "hidden lg:block",
                        }}
                        className="p-link layout-topbar-button"
                        onClick={logoutConfirm}
                    >
                        <i className="pi pi-sign-out" />
                        <span>Logout</span>
                    </Button>
                </li>
            </ul>
        </div>
    );
};
