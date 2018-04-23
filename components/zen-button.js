import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';
import { hideIfHome } from '../providers/index.js';
import { compose } from 'recompose';

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
                backgroundColor: '#29ECCE',
                fontSize: 0.07,
                marginTop: 0.03,
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'flex-start',
                layoutOrigin: [0.5, 0.5],
                fontWeight: '400',
                textAlign: 'center',
                textAlignVertical: 'center',
                transform: [{translate: [0, 0, -1]}],
            }}>
              {text}
            </Text>
        </VrButton>
  )
});