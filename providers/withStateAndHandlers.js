import React from "react";
import { withState, withHandlers, compose } from "recompose";
import { Environment, asset, NativeModules } from "react-360";
const { AudioModule } = NativeModules;
import zens from "../consts/zens.js";

const withStateAndHandlers = compose(
    withState("selectedZen", "zenClicked", 4),
    withHandlers({
        zenClicked: (props) => (id, evt) => {
            props.zenClicked(selectedZen => id);
            Environment.setBackgroundImage(asset(zens[id - 1].image));
            if (zens[id - 1].audio !== null && zens[id - 1].audio !== undefined) {
                AudioModule.playEnvironmental({
                    source: asset(zens[id - 1].audio),
                    volume: 0.3,
                });
            }
        }
    }),
)

export default withStateAndHandlers;