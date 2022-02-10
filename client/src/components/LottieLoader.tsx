import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

// Assets
import lottieJson from "~/assets/lottie_loader.json"

const LottieLoader = () => {
    const divRef = useRef<any>()

    useEffect(() => {
        const $div = divRef.current;

        if (!$div) return

        lottie.loadAnimation({
            container: $div,
            animationData: lottieJson,
            loop: true,
            autoplay: true,
            renderer: "svg"
        })
    }, [])

    return (
        <div className="iw_lottie-loader">
            <div ref={divRef}></div>
        </div>
    )
};

export default LottieLoader;