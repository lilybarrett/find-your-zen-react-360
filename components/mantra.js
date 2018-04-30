import React from 'react';
import { Text } from 'react-vr';
import zens from '../consts/zens.js';
import { hideIfHome, usingAppContext } from '../providers/index.js';
import { compose } from 'recompose';

export default compose(
    usingAppContext,
    hideIfHome,
)(({ selectedZen }) => {
    const text = zens[selectedZen - 1].mantra;
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
            { text }
        </Text>
    )
});