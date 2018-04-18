import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Image,
} from 'react-vr';

export default class MeditationApp extends React.Component {
  render() {
    return (
      <View>
        <Pano source={asset('homebase.png')}/>
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
        <VrButton
          style={{width: 1.0}}
          onClick={()=> console.log("I was clicked!")}>
          <Text
            style={{
              backgroundColor: '#29ECCE',
              fontSize: 0.07,
              marginTop: 0.05,
              layoutOrigin: [0.5, 0.5],
              fontWeight: '400',
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0, -3]}],
          }}>
            I'm feeling beachy
          </Text>
        </VrButton>
        <VrButton
          style={{width: 1.0}}
          onClick={()=> console.log("I was clicked!")}>
          <Text
            style={{
              backgroundColor: '#29ECCE',
              fontSize: 0.07,
              marginTop: 0.05,
              layoutOrigin: [0.5, 0.5],
              fontWeight: '400',
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0, -3]}],
          }}>
            Ain't no mountain high enough
          </Text>
        </VrButton>
        <VrButton
          style={{width: 1.0}}
          onClick={()=> console.log("I was clicked!")}>
          <Text
            style={{
              backgroundColor: '#29ECCE',
              fontSize: 0.07,
              marginTop: 0.05,
              fontWeight: '400',
              layoutOrigin: [0.5, 0.5],
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0, -3]}],
          }}>
            I want a baguette
          </Text>
        </VrButton>
      </View>
    );
  }
};

AppRegistry.registerComponent('MeditationApp', () => MeditationApp);
