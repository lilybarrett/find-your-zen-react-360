import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  VrButton,
  Text,
  View,
  Sound,
  Image,
} from 'react-vr';
import zens from './consts/zens.js';
import { Audio, ZenButton, Mantra, Title, Menu, HomeButton } from './components/index.js';
import { withState, withHandlers, compose } from 'recompose';

const MeditationApp = compose(
    withState('selectedZen', 'zenClicked', 4),
    withHandlers({
      zenClicked: (props) => (id, evt) => props.zenClicked(selectedZen => id)
    }),
  )(({
    selectedZen,
    zenClicked
  }) => (
    <View>
      <Pano source={asset(zens[selectedZen - 1].image)}>
        <Audio url={zens[selectedZen - 1].audio} />
      </Pano>
      <HomeButton selectedZen={selectedZen} buttonClick={() => zenClicked(4)} />
      <Mantra text={zens[selectedZen - 1].mantra} />
      <Menu selectedZen={selectedZen}>
        <Title>Choose your zen</Title>
        <View>
          {
              zens.map((zen) => {
                return (
                  <ZenButton
                    key={zen.id}
                    buttonClick={() => zenClicked(zen.id)}
                    text={zen.text}
                  />
                )
            })
          }
        </View>
    </Menu>
  </View>
));

AppRegistry.registerComponent('MeditationApp', () => MeditationApp);
