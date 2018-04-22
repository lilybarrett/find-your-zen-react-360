import React from 'react';
import { View, Text } from 'react-vr';

const Title = () => {
    return (
        <View>
            <Text
                style={{
                backgroundColor: '#29ECCE',
                fontSize: 0.2,
                fontWeight: '400',
                layoutOrigin: [0.5, 0.5],
                paddingLeft: 0.2,
                paddingRight: 0.2,
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, 0, -3]}],
            }}>
                Choose your zen
            </Text>
        </View>
    )
}

export default Title;