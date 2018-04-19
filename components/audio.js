import React from "react";
import { Sound } from "react-vr";

const Audio = (props) => {
    const { url } = props;
    return (
        url !== null && url !== undefined && url !== "" ?
        <Sound source={url} /> :
        null
    )
}

export default Audio;