import React from "react";
import { Pano, Environment } from "react-360";
import { usingAppContext } from "../providers/index.js";
import { Audio } from "../components/index.js";
import zens from "../consts/zens.js";
import { asset } from "react-360";

export default usingAppContext(({ selectedZen }) => {
    return (
        <Pano source={asset(zens[selectedZen - 1].image)} >
            <Audio />
        </Pano>
    )
});
