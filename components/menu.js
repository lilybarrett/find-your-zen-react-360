import React from 'react';
import { hideIf } from '../providers/index.js';
import { compose } from 'recompose';
import { View } from 'react-vr';

const hideMenu = hideIf((props) => props.selectedZen !== 4);

export default compose(
    hideMenu,
)((props) => {
    return (
        <View style={{marginTop: -0.2, height: 0.2}}>
            {props.children}
        </View>
    )
});
