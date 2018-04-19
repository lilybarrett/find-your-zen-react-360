import React from 'react';
import { Text } from 'react-vr';

const Mantra = (props) => {
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
}

export default Mantra;