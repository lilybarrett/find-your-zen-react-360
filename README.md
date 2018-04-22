# Find Your Zen: A demo app introducing React VR with Recompose

## Purpose

FindYourZen is a VR app created using [React VR](https://facebook.github.io/react-vr/) and [Recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md) that allows the user to choose his or her meditation environment (each of which comes with its own background sounds and a mantra inspired by ["The Good Place"](https://www.nbc.com/the-good-place?nbc=1)).

## Getting Started

```
$ git clone https://github.com/lilybarrett/find-your-zen.git
$ cd find-your-zen
$ npm i
$ npm start
```

Navigate to http://localhost:8081/vr/index.html.

## About React VR

* Open source, built by [Facebook](https://github.com/facebook)
* Incorporates [Three.js](https://threejs.org/), [React Native](https://facebook.github.io/react-native/) mobile elements, and [Web VR](https://webvr.info/)

React VR components include:
- [`View`](https://facebook.github.io/react-native/docs/view.html) - given to us by React Native, used in place of the `div` elements React typically expects, maps to the view of whatever platform is running the code
- [`Text`](https://facebook.github.io/react-native/docs/text.html) - given to us by React Native
- [`Image`](https://facebook.github.io/react-native/docs/image.html) - given to us by React Native
- [`Pano`](https://facebook.github.io/react-vr/docs/pano.html) - displays 360-degree panoramas
- [`DirectionalLight`](https://facebook.github.io/react-vr/docs/directionallight.html) - one of many types of light sources
- [`Sphere`](https://facebook.github.io/react-vr/docs/sphere.html) - adds a 3D sphere to your VR scene
- [`VrButton`](https://facebook.github.io/react-vr/docs/vrbutton.html)

You do NOT need any VR devices to get started with creating React VR apps.

## Building your own React VR app

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

A tip (Thank you, [Coding Artist](https://medium.com/coding-artist/learn-react-vr-chapter-1-hello-virtual-world-202241c0cb63)!): Search for "equirectangular" photos on Google. [Flickr](https://www.flickr.com/) is a particularly good course of free, Creative Commons-licensed, high-quality panoramic photos.

Create an `images` folder in your `static_assets` and move your images in there. Update the `Pano` component to refer to the "homebase" image for now.

As you may have guessed by the name, the `Pano` component allows us to display panoramic, or "equirectangular," images, and uses the `asset` utility from `react-vr` to automatically look inside our `static_assets` folder for the image.

### Step 4

Change the button text to "Choose your zen" and the color to a nice, calming blue. (I liked `#29ECCE`).

Note that the button text -- and, really, any text in the application -- needs to be explicitly wrapped inside a `Text` component.

### Step 5 

Now, you'll need to add logic for updating the user's environment based on which option they choose (perhaps by clicking on a `VrButton` component). I'll leave this open-ended because...wait for the best part...this is just [React](https://reactjs.org/)! State management works exactly the same way. You can use local state, [Redux](https://redux.js.org/), etc. In my case, I used [Recompose](https://github.com/acdlite/recompose) (scroll down for more on that).

### Step 6

You don't really feel like you're at the beach unless you hear the sound of waves.

A good source of free and Creative Commons-licensed audio is [Freesound](https://freesound.org/). You'll have to make an account, but it's quick and easy. They'll ask you to complete a survey along the way, but you can just skip it.

After downloading the sounds -- many of which have large `.wav` files -- you'll want to compress the files. I used [All2MP3](https://all2mp3.en.softonic.com/mac), which was easy to install and worked like a dream to turn my `.wav` files into more manageable `.mp3` files, which I then added to a `sounds` folder in my `static_assets`.

You'll then add each sound link to a `Sound` component, which takes a `source` prop, the value of which -- like `Pano` -- wraps the link in an `asset` utility, allowing us to automatically look inside our `static_assets` folder for the resources we need.

For this demo, I wound up putting my data for each environment in a `consts/zens.js` file:

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
        image: "images/homebase.png",
        text: "Home"
    }
]

export default zens;
```

### Debugging React VR

When you `Inspect Element`, you'll see that React VR bundles all its files into one giant blob that isn't super easy to grok. Fortunately, because it supports [sourcemaps](https://trackjs.com/blog/debugging-with-sourcemaps/), we can still access the original files, use `debugger`, etc.

### Refactoring with Recompose

I found this project a great opportunity to get comfortable with the [Recompose](https://github.com/acdlite/recompose) library, "a React utility belt for function components and higher-order components" created by [Andrew Clark](https://github.com/acdlite), a front-end engineer at [Facebook](https://github.com/facebook) and co-creator of [Redux](https://redux.js.org/). I'd thought about using Redux for my state management but thought it was a little heavy-handed for this application. And Recompose is also functional programming-friendly, increasing the predictability and composability of React code, reducing weird side effects and mutations, and making the app easier to test. 

### Using [`withState`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate) and [`withHandlers`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withhandlers)

I was able to convert my `MeditationApp` component in `index.vr.js` to a stateless, functional component from a class component, thanks to Recompose's `withState`. `withState` takes three arguments: the name of the state being updated (in my case, `selectedZen`), the function or handler updating the state (`zenClicked`), and the initial value of `selectedZen` (`4`, the ID for the "homebase" environment).

```
// previous component structure in index.vr.js
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
         <Pano source={asset(zens[this.state.selectedZen - 1].image)}>
          <Sound source={asset(zens[this.state.selectedZen - 1].audio)} />
         </Pano>
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
```

```
// present component structure
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

Recompose is all about currying. The result of `withState` curries into `withHandlers`, which accepts an object map of handler creators. Each creator takes a set of props and returns a handler to update state. Here, `zenClicked` accepts a `props` argument which returns an `id` to be used as an argument in a curried function that calls `props.zenClicked` (given to us by `withState`) and updates the state of `selectedZen` to the value of `id`. Whew!

We can then use `selectedZen` and `zenClicked` in our functional component.

A note about `withHandlers` and performance optimization: `withHandlers` passes handlers as immutable props. Typically, functions added to the body of a class component are remade on every render in React, creating false positives and breaking lifecycle methods like `shouldComponentUpdate`.

### Hiding elements with [`branch`](https://github.com/acdlite/recompose/blob/master/docs/API.md#branch) and [`renderNothing`](https://github.com/acdlite/recompose/blob/master/docs/API.md#rendernothing) 

This is lookin' good! But what about that ternary operator/`if ... else`-like logic that either renders the "homebase" menu or an environment-based `Mantra`? And what about that edge case I just thought of, in which I want to render the `Home` button _only_ when we are in an environment other than "homebase"? What about that annoying `404` error I see in my console when I'm in the "homebase" environment, regarding a nonexistent audio file? 

I could keep adding ternary operators for my rendering logic, which is _fine_ and it _works_, but I'm more interested in extracting the logic from components' render methods and putting it an HOC instead, which would be more functional and allow each component to be more individually focused on its own render logic.

Recompose comes to the rescue again! Rather than using `if ... else` or ternary operators, I can use Recompose's `branch` utility, which accepts a callback as an argument and returns one (or one of two) higher order components based on whether the callback function returns `true` or `false`. If I want the component to simply not display, given a certain condition, I can use Recompose's `renderNothing`, which will do exactly what it sounds like. Beautiful!

In my case. I set up a generic `hideIf` provider (see `providers` folder):

```
// providers/hideIf.js
import React from 'react';
import { branch, renderNothing } from 'recompose';

const hideIf = (isConditionTrue) => 
    branch(
        isConditionTrue,
        renderNothing,
    );

export default hideIf;
```

Now, for instance, I can create a `Menu` component that wraps the components I want to display in the "homebase" environment and set up a special `hideIf` function for it:

```
// components/menu.js
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

```
// index.vr.js
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

Cool, so that takes care of the Menu logic. It appears on the "homebase" page and disappears when I navigate to a meditation environment, to be replaced with the `Home` button.

But what about my mantras? Easy:

```
// components/mantra.js
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

Recompose also comes with [`mapProps`](https://github.com/acdlite/recompose/blob/master/docs/API.md#mapprops), which works similarly to React-Redux's [`mapStateToProps`](https://learn.co/lessons/map-state-to-props-readme), and a [`lifecycle`](https://github.com/acdlite/recompose/blob/master/docs/API.md#lifecycle) utility for adding lifecycle methods such as [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount) to functional components.

### Useful React VR resources and tutorials

* [React VR docs](https://facebook.github.io/react-vr/docs/getting-started.html)
* [Coding Artist tutorials on React VR](https://medium.com/coding-artist/learn-react-vr-chapter-1-hello-virtual-world-202241c0cb63)

### Useful Recompose resources 

* [Recompose docs](https://github.com/acdlite/recompose/blob/master/docs/API.md) 
* [Why the Hipsters Recompose Everything](https://medium.com/javascript-inside/why-the-hipsters-recompose-everything-23ac08748198)
* [Roll your own provider and connect with Recompose](https://medium.com/@leathcooper/roll-your-own-provider-and-connect-with-recompose-ceb73ba29dd3)












