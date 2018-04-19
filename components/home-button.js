import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';

const HomeButton = (props) => {
    return (
        <VrButton
          onClick={props.buttonClick}
          style={{width: 1.0}}>
          <View style={{ margin: 0.1, height: 0.2, backgroundColor: '#CF3C7E'}}>
            <Text
              style={{
                backgroundColor: 'white',
                color: '#29ECCE',
                fontSize: 0.07,
                marginTop: 0.05,
                layoutOrigin: [0.5, 0.5],
                fontWeight: '400',
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, 0, -3]}],
            }}>
              Home
            </Text>
          </View>
        </VrButton>
    )
}

export default HomeButton;