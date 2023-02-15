import { Timeline } from "gsap/gsap-core";
import React from "react";
import { useEffect } from "react";
import "../scss/components/MainLoader.scss";
export const MainLoader = () => {
    useEffect(() => {
        const loader12Timeline = new Timeline({ repeat: -1 });

        loader12Timeline
            .to(
                ".loader12__path-top",
                0.75,
                {
                    attr: {
                        cx: 50,
                        cy: 50,
                    },
                },
                "l12_1"
            )
            .to(
                ".loader12__path-left",
                0.75,
                {
                    attr: {
                        cx: 27,
                        cy: 5,
                    },
                },
                "l12_1"
            )
            .to(
                ".loader12__path-right",
                0.75,
                {
                    attr: {
                        cx: 5,
                        cy: 50,
                    },
                },
                "l12_1"
            );
    }, []);
    return (
        <div class="w-screen h-screen flex p-0 m-0 absolute top-0 left-0 main-loading-wrapper">
            <svg class="loader12" height="57" stroke="var(--primary-color)" viewBox="0 0 57 57" width="57" xmlns="http://www.w3.org/2000/svg">
                <g fill-rule="evenodd" fill="none">
                    <g stroke-width="2" transform="translate(1 1)">
                        <circle class="loader12__path-left" cx="5" cy="50" r="5"></circle>
                        <circle class="loader12__path-top" cx="27" cy="5" r="5"></circle>
                        <circle class="loader12__path-right" cx="50" cy="50" r="5"></circle>
                    </g>
                </g>
            </svg>
        </div>
    );
};
