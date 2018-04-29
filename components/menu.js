import React from 'react';
import { hideIf, usingAppContext } from '../providers/index.js';
import { compose } from 'recompose';
import { View } from 'react-vr';
import { Zens, Title } from '../components/index.js';

const hideMenu = hideIf(({ selectedZen }) => selectedZen !== 4);

export default compose(
    usingAppContext,
    hideMenu,
)(({ selectedZen, children }) => {
    return (
        <View style={{marginTop: -0.2, height: 0.2}}>
            { children }
        </View>
    )
});
