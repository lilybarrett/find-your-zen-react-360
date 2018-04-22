# React VR with Recompose

## Purpose

FindYourZen is a VR app created using React VR and Recompose that allows the user to choose his or her meditation environment (each of which comes with a mantra inspired by "The Good Place").

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
- `View` - given to us by React Native, used in place of div elements, maps to the view of whatever platform is running the code
- `Text` - given to us by React Native
- `Image` - given to us by React Native
- `Pano` - displays 360-degree panoramas
- `DirectionalLight` - one of many types of light sources
- `Sphere` - adds a 3D sphere to your VR scene
- `VrButton`

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

Easy!

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

### Debugging React VR

<!-- put stuf here -->

### Refactoring with Recompose

I found this project a great opportunity to get comfortable with the [Recompose](https://github.com/acdlite/recompose) library, "a React utility belt for function components and higher-order components" created by Andrew Clark, a front-end engineer at Facebook and co-creator of Redux. I'd thought about using Redux for my state management but thought it was a little heavy-handed for this application. Recompose is also functional programming-friendly!

### Using `withState` and `withHandlers`

I was able to convert my `MeditationApp` component in `index.vr.js` to a stateless, functional component, thanks to Recompose's `withState`. `withState` takes three arguments: the name of the state being updated (`selectedZen`), the function or handler updating the state (`zenClicked`), and the initial value of `selectedZen` (`4`, the ID for the homebase environment).

Recompose is all about currying. The result of `withState` curries into `withHandlers`, which, in this case, accepts an object map of handler creators. These creators take a set of props and return a handler to update state. Here, `zenClicked` accepts a `props` argument which returns an `id` to be used as an argument in a curried function that calls `props.zenClicked` (given to us by `withState`) and updates the state of `selectedZen` to the value of `id`. Whew!

We can then use `selectedZen` and `zenClicked` in our functional component.

A note about `withHandlers` and performance optimization: `withHandlers` passes handlers as immutable props. Typically, functions added to the body of a class component are remade on every render in React, creating false positives and breaking lifecycle methods like `shouldComponentUpdate`.

```
const MeditationApp = compose(
    withState('selectedZen', 'zenClicked', 4),
    withHandlers({
        zenClicked: (props) => (id, evt) => props.zenClicked(selectedZen => id)
    })
    )(({
        selectedZen,
        zenClicked
    }) => (
        <View>
            <Pano source={asset(zens[selectedZen - 1].image)}>
                <Sound source={asset(zens[selectedZen - 1].audio)} />
            </Pano>
            <HomeButton buttonClick={() => zenClicked(4)} />
            { selectedZen !== 4 ?
                <Mantra text={zens[selectedZen - 1].mantra} /> :
                <Title>Choose your zen</Title>
                <View>
                {
                    zens.slice(0, 3).map((zen) => {
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
            }
        </View>
    ));
```

### Hiding elements with `branch` and `renderNothing` 

But what about that ternary operator/if-else logic that either renders the menu or a mantra, based on which environment the user finds him or herself in? And what about that edge case I just thought of, in which I want to render the `Home` button _only_ when we are in an environment other than "homebase"? What about that annoying 404 error I see in my console when I'm at "homebase", regarding audio that doesn't exist? 

I could keep adding ternary operators for my rendering logic, which is _fine_ and it _works_, but I'm actually interested in extracting the logic from the component's render method and putting it an HOC instead, which would be more functional and allow each component to be more individually focused on its own render logic. Recompose comes to the rescue again! 

Rather than using `if`, I can use Recompose's `branch` utility, which accepts a callback as an argument and returns one (or one of two) higher order components based on whether the callback function returns `true` or `false`. If I want the component to simply not display, given a certain condition, I can use Recompose's `renderNothing`, which will do exactly what it sounds like. Beautiful!

In my case. I set up a generic `hideIf` provider (see `providers` folder):

providers/hideIf.js
```
import React from 'react';
import { branch, renderNothing } from 'recompose';

const hideIf = (isConditionTrue) => 
    branch(
        isConditionTrue,
        renderNothing,
    );

export default hideIf;
```

Now, for instance, I can create a `menu` component that wraps the components I want to display in the "homebase" environment and create a special `hideIf` function for it:

components/menu.js
```
import React from 'react';
import { hideIf } from '../providers/index.js';
import { compose } from 'recompose';
import { View } from 'react-vr';

const hideMenu = hideIf((props) => props.selectedZen !== 4);

export default compose(
    hideMenu,
)((props) => {
    return (
        <View style={{marginTop: -0.2, height: 0.2}}>
            {props.children}
        </View>
    )
});
```

index.vr.js
```
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
        <Sound source={asset(zens[selectedZen - 1].audio)} />
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
```

Cool, so that takes care of the Menu logic. It appears on the "homebase" page and disappears when I navigate to the beach, the mountain top, or Paris environments.

But what about my mantras? Easy:

components/mantra.js
```
import React from 'react';
import { Text } from 'react-vr';
import { hideIf } from '../providers/index.js';
import { compose } from 'recompose';

const hideMantra = hideIf((props) => props.text === null || props.text === undefined || props.text.length === 0);

export default compose(
    hideMantra,
)((props) => {
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
});
```

After implementing similar logic for my `HomeButton` and `Sound` components, I get the results I want and no longer see any pesky errors in the console!

### What else can Recompose do?

If I wanted each component to be less dependent on props being passed down to it, I could implement some more Redux-like logic using Recompose's [`withReducer`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withreducer), [`getContext`](https://github.com/acdlite/recompose/blob/master/docs/API.md#getcontext) and [`withContext`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withcontext) utilities. 

Recompose also comes with `mapProps`, which works similarly to Redux's `mapStateToProps`, and a `lifecycle` utility for adding lifecyclem methods such as `componentDidMount` to functional components.

### Useful React VR resources and tutorials

* [React VR docs](https://facebook.github.io/react-vr/docs/getting-started.html)
* [Coding Artist tutorials on React VR](https://medium.com/coding-artist/learn-react-vr-chapter-1-hello-virtual-world-202241c0cb63)

### Useful Recompose resources 

* [Recompose docs](https://github.com/acdlite/recompose/blob/master/docs/API.md) 
* [Why the Hipsters Recompose Everything](https://medium.com/javascript-inside/why-the-hipsters-recompose-everything-23ac08748198)
* [Roll your own provider and connect with Recompose](https://medium.com/@leathcooper/roll-your-own-provider-and-connect-with-recompose-ceb73ba29dd3)












