import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';
import { Button } from '../components/index.js';

const HomeButton = ({ text, buttonClick, selectedZen }) => {
  return (
    <Button
      selectedZen={selectedZen}
      buttonClick={buttonClick}
      text={text}
      textStyle={{
        backgroundColor: 'white',
        color: '#29ECCE',
        marginTop: 0.05,
        transform: [{translate: [0, 0, -3]}]}}
    />
  )
}

export default HomeButton;