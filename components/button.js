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
  const { text, textStyle } = props;
  return (
    <VrButton
          onClick={props.buttonClick}
          style={{ width: 1.0 }}>
            <Text
              style={[
                {
                  fontSize: 0.07,
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: 'flex-start',
                  layoutOrigin: [0.5, 0.5],
                  fontWeight: '400',
                  textAlign: 'center',
                  textAlignVertical: 'center'
                },
                  textStyle,
              ]}>
                {text}
            </Text>
        </VrButton>
  )
});