import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';
import { compose } from 'recompose';
import { hideIfHome } from '../providers/index.js';

export default compose(
  hideIfHome,
)((props) => {
  const { text } = props;
  return (
    <VrButton
          onClick={props.buttonClick}
          style={{width: 1.0}}>
            <Text
              style={{
                backgroundColor: 'white',
                color: '#29ECCE',
                fontSize: 0.07,
                marginTop: 0.05,
                layoutOrigin: [0.5, 0.5],
                fontWeight: '400',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, 0, -3]}],
            }}>
              {text}
            </Text>
        </VrButton>
  )
});