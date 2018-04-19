import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  VrButton,
  Text,
  View,
  Image,
} from 'react-vr';
import zens from "./vr/consts/zens.js";
import Button from "./vr/components/button.js";

export default class MeditationApp extends React.Component {
 constructor () {
   super();
   this.state = {
    selectedZen: 3,
   }

   this.zenClicked = this.zenClicked.bind(this);
 }

  zenClicked(zen) {
    let newZen = zen;
    console.log(newZen);
    this.setState({ selectedZen: newZen });
  }

  render() {
    return (
      <View>
        <View>
          <Pano source={asset(zens[this.state.selectedZen].image)}/>
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
        <View>
          <Button buttonClick={() => this.zenClicked(0)} text="I'm feeling beachy keen" />
          <Button buttonClick={() => this.zenClicked(1)} text="Ain't no mountain high enough" />
          <Button buttonClick={() => this.zenClicked(2)} text="I want a baguette" />
        </View>
      </View>
    );
  }
};

AppRegistry.registerComponent('MeditationApp', () => MeditationApp);
