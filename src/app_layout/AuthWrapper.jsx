import PrimeReact from "primereact/api";
import React, { useRef } from "react";
import classNames from "classnames";

import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getBranchesApi, getMeApi } from "../api";
import { MainLoader } from "../components/MainLoader";
import { ScrollTop } from "primereact/scrolltop";
import { branchesAtom } from "../recoil/atoms/branchAtom";
import { inputStyleAtom, layoutColorModeAtom, layoutModeAtom } from "../recoil/atoms/layoutAtom";
import { mobileMenuActiveAtom, mobileTopbarMenuActiveAtom, overlayMenuActiveAtom, staticMenuInactiveAtom } from "../recoil/atoms/layoutAtom";
import { rippleEffectAtom } from "../recoil/atoms/rippleEffectAtom";
import { userBranchIdAtom, userRestaurantIdAtom, userEmailAtom, userFirstnameAtom, userIdAtom, userLastnameAtom, userPhoneAtom, userPositionAtom, userRestaurantNameAtom } from "../recoil/atoms/userAtom";
import { AppConfig } from "./AppConfig";
import { AppMenu } from "./AppMenu";
import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";

export const AuthWrapper = ({ children }) => {
    const history = useHistory();
    const [authing, setAuthing] = useState(false);

    const setEmailAtom = useSetRecoilState(userEmailAtom);
    const setFirstnameAtom = useSetRecoilState(userFirstnameAtom);
    const setLastnameAtom = useSetRecoilState(userLastnameAtom);
    const setPhoneAtom = useSetRecoilState(userPhoneAtom);
    const setUserRestaurantIdAtom = useSetRecoilState(userRestaurantIdAtom);
    const setUserRestaurantNameAtom = useSetRecoilState(userRestaurantNameAtom);
    const setUserIdAtom = useSetRecoilState(userIdAtom);
    const setUserBranchIdAtom = useSetRecoilState(userBranchIdAtom);
    const setUserPositionAtom = useSetRecoilState(userPositionAtom);
    const setBranchesAtom = useSetRecoilState(branchesAtom);
    // recoil state
    const [layoutColorMode, setLayoutColorMode] = useRecoilState(layoutColorModeAtom);
    const [layoutMode, setLayoutMode] = useRecoilState(layoutModeAtom);
    const [rippleEffect, setRippleEffect] = useRecoilState(rippleEffectAtom);
    const [inputStyle, setInputStyle] = useRecoilState(inputStyleAtom);
    const [staticMenuInactive, setStaticMenuInactive] = useRecoilState(staticMenuInactiveAtom);
    const [overlayMenuActive, setOverlayMenuActive] = useRecoilState(overlayMenuActiveAtom);
    const [mobileMenuActive, setMobileMenuActive] = useRecoilState(mobileMenuActiveAtom);
    const setMobileTopbarMenuActive = useSetRecoilState(mobileTopbarMenuActiveAtom);

    // local state
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": rippleEffect === false,
        "layout-theme-light": layoutColorMode === "light",
    });
    const fetchBranches = async (id) => {
        const res = await getBranchesApi({
            restaurant_id: id,
        });
        if (res) {
            if (res.status === 200) {
                setBranchesAtom(res?.data?.branches);
            } else {
                setBranchesAtom([]);
            }
        }
    };
    const fetchMe = async () => {
        setAuthing(true);
        const res = await getMeApi();
        if (res) {
            if (res.status === 200) {
                setUserIdAtom(res?.data?._id);
                setFirstnameAtom(res?.data?.name?.first);
                setLastnameAtom(res?.data?.name?.last);
                setPhoneAtom(res?.data?.phone);
                setEmailAtom(res?.data?.email);
                setUserRestaurantIdAtom(res?.data?.restaurant_id);
                setUserRestaurantNameAtom(res?.data?.restaurant_name);
                setUserBranchIdAtom(res?.data?.branch_id);
                setUserPositionAtom(res?.data?.position);
                if (res?.data?.position === "owner") {
                    fetchBranches(res?.data?.restaurant_id);
                }
            } else {
                setUserIdAtom("");
                setFirstnameAtom("");
                setLastnameAtom("");
                setPhoneAtom("");
                setEmailAtom("");
                setUserRestaurantIdAtom("");
                setUserRestaurantNameAtom("");
                setUserBranchIdAtom("");
                setUserPositionAtom("");
                history.push("/accessdenied");
            }
            setAuthing(false);
        }
    };
    useEffect(() => fetchMe(), []);

    return authing ? (
        <MainLoader />
    ) : (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <ScrollTop />
            <AppTopbar onToggleMenuClick={onToggleMenuClick} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu onMenuItemClick={onMenuItemClick} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">{children}</div>
            </div>
            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
            <AppFooter />
        </div>
    );
};
