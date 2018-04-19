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
import zens from "./consts/zens.js";
import { ZenButton, Mantra, Title, HomeButton } from "./components/index.js";

export default class MeditationApp extends React.Component {
 constructor () {
   super();
   this.state = {
    selectedZen: 4,
   }
 }

  zenClicked(zen) {
    let newZen = zen;
    console.log(newZen);
    this.setState({ selectedZen: newZen });
  }

  render() {
    return (
      <View>
         <Pano source={asset(zens[this.state.selectedZen - 1].image)}/>
         <HomeButton buttonClick={() => this.zenClicked(4)} />
         { this.state.selectedZen !== 4 ?
          <Mantra text={zens[this.state.selectedZen - 1].mantra} /> :
          <View>
            <Title>Choose your zen</Title>
            <View>
              {
                  zens.slice(0, 3).map((zen) => {
                    return (
                      <ZenButton
                        buttonClick={() => this.zenClicked(zen.id)}
                        text={zen.text}
                      />
                    )
                })
              }
            </View>
          </View>
         }
      </View>
    );
  }
};

AppRegistry.registerComponent('MeditationApp', () => MeditationApp);
