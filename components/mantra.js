import React from 'react';
import { Text } from 'react-vr';
import { hideIf } from "../providers/index.js";
import { compose } from "recompose";

const hideMantra = hideIf((props) => props.text === null || props.text === undefined || props.text.length === 0);

export default compose(
    hideMantra,
)((props) => {
    const { text } = props;
    return (
        <Text
            style={{
              backgroundColor: 'transparent',
              color: 'lightcyan',
              fontSize: 0.3,
              fontWeight: '500',
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.2,
              paddingRight: 0.2,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0, -3]}],
          }}>
            {text}
        </Text>
    )
});