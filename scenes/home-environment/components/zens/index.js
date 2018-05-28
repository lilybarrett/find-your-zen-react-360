import React from "react";
import ZenButton from "../zen-button";
import { usingAppContext } from "../../../../providers";
import { zens } from "../../../../consts";
import { compose } from "recompose";
import { View } from "react-360";

export default compose(
    usingAppContext
)(({ zenClicked }) => {
    return (
        <View>
        {
            zens.map((zen) => (
                <ZenButton
                    selectedZen={zen.id}
                    key={zen.id}
                    buttonClick={() => {
                        zenClicked(zen.id);
                    }}
                    text={zen.text}
                />
            ))
        }
    </View>
    )
})