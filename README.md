# FindYourZen

## Purpose

FindYourZen is an app created with React VR that allows the user to choose his or her meditation environment (each of which comes with a mantra inspired by "The Good Place").

Created for a demo introducing VR development with React VR.

## Getting Started

```
$ git clone https://github.com/lilybarrett/meditation-react-vr.git
$ cd meditation-react-vr
$ npm i
$ npm start
```

Navigate to http://localhost:8081/vr/index.html.

## About React VR

* Open source, built by Facebook
* Incorporates Three.js, React Native mobile elements, and Web VR

React VR components include:
- View - given to us by React Native, used in place of div elements, maps to the view of whatever platform is running the code
- Text - given to us by React Native
- Image - given to us by React Native
- Pano - displays 360-degree panoramas
- DirectionalLight - one of many types of light sources
- Sphere - adds a 3D sphere to your VR scene
- VrButton

You do NOT need any VR devices to get started with creating React VR apps.

## Building your own FindYourZen

### Step 1

* Install the React VR CLI tool:

`$ npm i -g react-vr-cli`

* Use it to create a new project:

```
$ react-vr init FindYourZen
$ cd FindYourZen
$ npm start
```

### Step 2

Take a look at the file structure.

* `index.vr.js` = entry point for your app
* `vr` folder = stores the code that launches your app
* `static_assets` = stores images, audio files, and other external resources

### Step 3

Delete the chess image from `static_assets` and replace it with some new images, including your "homebase" image, the one that appears when the app loads.

A tip (Thank you, Coding Artist!): Search for "equirectangular" photos on Google. Flickr is particularly good course of high-quality panoramic photos.

Create an `images` folder in your `static_assets` and move your images in there. Update the `Pano` component to refer to the "homebase" image for now.

As you may have guessed by the name, the `Pano` component allows us to display panoramic, or "equirectangular," images.

### Step 4

Change the button text to "Choose your zen" and the color to a nice, calming blue. (I liked `#29ECCE`). Note that the button text needs to be wrapped inside a `Text` component.

<!-- mention stuff about how to style React VR components here -->

Easy, right?

For our purposes, though, we're going to want this to be a _title_ rather than a clickable button. Create a `components` folder and set up a 3D Text component in `title.js`:

```
import React from "react";
import { View, Text } from "react-vr";

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
```

### Step 5

Allow the user to make choices about their meditation environment by clicking on a button! You won't be surprised to learn React VR's `vrButton` is useful here.

components/zen-button.js
```
import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';

const ZenButton = (props) => {
    const { text } = props;
    return (
        <VrButton
          onClick={props.buttonClick}
          style={{width: 1.0}}>
          <View style={{ margin: 0.1, height: 0.2, backgroundColor: '#CF3C7E'}}>
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
              {text}
            </Text>
          </View>
        </VrButton>
    )
}

export default ZenButton;
```

For simplicity, I'm storing all my data for each environment/button in a constants file called `zens.js`:

constants/zens.js
```
const zens = [
    {   id: 1,
        image: "images/hawaii_beach.jpg",
        text: "I'm feeling beachy keen",
    },
    {   id: 2,
        image: "images/horseshoe_bend.jpg",
        text: "Ain't no mountain high enough",
    },
    {   id: 3,
        image: "images/sunrise_paris_2.jpg",
        text: "I want a baguette",
    },
    {   id: 4,
        image: "images/homebase.png",
        text: "Home"
    }
]

export default zens;
```

index.vr.js
```
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
import zens from "./consts/zens.js";
import { ZenButton } from "./components/index.js";

export default class MeditationApp extends React.Component {
 constructor () {
   super();
   this.state = {
    selectedZen: 4,
   }
 }

  zenClicked(zen) {
    let newZen = zen;
    this.setState({ selectedZen: newZen });
  }

  render() {
    return (
      <View>
         <Pano source={asset(zens[this.state.selectedZen - 1].image)}>
         </Pano>
          <View>
            <Title>Choose your zen</Title>
            <View>
              {
                  zens.map((zen) => {
                    return (
                      <ZenButton
                        key={zen.id}
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
```

### Step 6

Let's add our mantras!

consts/zens.js
```
const zens = [
    {   id: 1,
        mantra: "Find your inner motherforking peace",
        image: "images/hawaii_beach.jpg",
        text: "I'm feeling beachy keen",
    },
    {   id: 2,
        mantra: "Breathe in peace, breathe out bullshirt",
        image: "images/horseshoe_bend.jpg",
        text: "Ain't no mountain high enough",
    },
    {   id: 3,
        mantra: "Benches will be benches",
        image: "images/sunrise_paris_2.jpg",
        text: "I want a baguette",
    },
    {   id: 4,
        mantra: "",
        image: "images/homebase.png",
        text: "Home"
    }
]

export default zens;
```

Create a `mantra` component:

components/mantra.js
```
import React from 'react';
import { Text } from 'react-vr';

const Mantra = (props) => {
    const { text } = props;
    return (
        <Text
            style={{
              backgroundColor: 'transparent',
              color: 'lightcyan',
              fontSize: 0.3,
              fontWeight: '500',
              layoutOrigin: [0.5, 0.5],
              paddingLeft: 0.2,
              paddingRight: 0.2,
              textAlign: 'center',
              textAlignVertical: 'center',
              transform: [{translate: [0, 0, -3]}],
          }}>
            {text}
        </Text>
    )
}

export default Mantra;
```

index.vr.js
```
// place above the View containing the Title
<Mantra text={zens[this.state.selectedZen - 1].mantra} />
```

### Step 6

Let's add a little additional logic to remove the options menu and title while in the meditation environment, and a home button so we can get back to the menu if we wish:

components/home-button.js
```
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
```

index.vr.js
```
// place under the Pano component
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
                key={zen.id}
                buttonClick={() => this.zenClicked(zen.id)}
                text={zen.text}
            />)
        })
    }
    </View>
</View>
```

### Step 7

You don't really feel like you're at the beach unless you hear the sound of waves, am I right?

A good source of free and Creative Commons-licensed audio is Free Sound. You'll have to make an account, but it's quick and easy. They'll ask you to complete a survey along the way, but you can just skip it.

After downloading the sounds -- many of whch have large `.wav` files -- you'll want to compress the files. I used All2MP3, which was easy to install and worked like a dream to turn my `.wav` files into more manageable `.mp3` files, which I then added to a `sounds` folder in my `static_assets`.

Add the audio links to your `zens.js` file:

const/zens.js
```
const zens = [
    {   id: 1,
        mantra: "Find your inner motherforking peace",
        image: "images/hawaii_beach.jpg",
        audio: "sounds/waves.mp3",
        text: "I'm feeling beachy keen",
    },
    {   id: 2,
        mantra: "Breathe in peace, breathe out bullshirt",
        image: "images/horseshoe_bend.jpg",
        audio: "sounds/birds.mp3",
        text: "Ain't no mountain high enough",
    },
    {   id: 3,
        mantra: "Benches will be benches",
        image: "images/sunrise_paris_2.jpg",
        audio: "sounds/chimes.mp3",
        text: "I want a baguette",
    },
    {   id: 4,
        mantra: "",
        image: "images/homebase.png",
        audio: "",
        text: "Home"
    }
]

export default zens;
```

Now, when you click "I'm feeling beachy keen," you not only find yourself standing on a beach, but you hear the music of the ocean!

## Useful React VR resources and tutorials

* React VR docs
* Coding Artist tutorials on Medium
* Udemy's React VR course













