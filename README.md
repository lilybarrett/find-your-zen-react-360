## Find Your Zen: A demo app for introducing Recompose with React VR

[Functional programming](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0) is a hot topic in React development these days, and for good reason. At work, when I began using [Recompose](https://github.com/acdlite/recompose/blob/master/docs/API.md), "a React utility belt for function components and higher-order components" created by [Andrew Clark](https://github.com/acdlite), I liked the way Recompose instantly transformed the way I coded -- and thought about coding -- in React. Being function-friendly, Recompose increases the predictability and composability of React code and makes apps easier to test.

Here, I'll walk you through how I refactored a React app with Recompose and, as a bonus, give you an introduction to [React VR](https://facebook.github.io/react-vr/) along the way! This article assumes you have a working knowledge of React.

The project I'll guide you through is a virtual reality app which allows the user to choose his or her immersive meditation environment, each of which comes with its own mantra inspired by the very excellent show ["The Good Place."](https://www.nbc.com/the-good-place?nbc=1) In case you need it for reference, my final source code is [here](https://github.com/lilybarrett/find-your-zen).

This content and more like it are on my blog at [lilydbarrett.com](http://lilydbarrett.com/).

### About React VR

* Open source, built by [Facebook](https://github.com/facebook)
* Incorporates [Three.js](https://threejs.org/), a 3-D JavaScript library; [React Native](https://facebook.github.io/react-native/) mobile elements; and [Web VR](https://webvr.info/), responsible for allowing us to view VR experiences across different browsers, including web
* Enables [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for ease with fitting content to different browsers/screens

React VR components include (among others):
- [`View`](https://facebook.github.io/react-native/docs/view.html) - given to us by React Native, it's used in place of the `div` elements React typically expects and maps to the view of whatever platform is running the code
- [`Text`](https://facebook.github.io/react-native/docs/text.html) - given to us by React Native, it renders 3-D text
- [`Pano`](https://facebook.github.io/react-vr/docs/pano.html) - displays 360-degree panoramas
- [`DirectionalLight`](https://facebook.github.io/react-vr/docs/directionallight.html) - one of many types of light sources, it illuminates all objects equally from a given direction
- [`Sphere`](https://facebook.github.io/react-vr/docs/sphere.html) - adds a 3-D sphere to your VR scene
- [`VrButton`](https://facebook.github.io/react-vr/docs/vrbutton.html)

You do not need any VR devices to get started with creating React VR apps.

### Building your own FindYourZen

#### Step 1

* Install the React VR CLI tool:

```
$ npm i -g react-vr-cli
```

* Use it to create a new project:

```
$ react-vr init FindYourZen
$ cd FindYourZen
$ npm start
```

#### Step 2

Take a look at the file structure.

* `index.vr.js` = entry point for your app
* `vr` folder = stores the code that launches your app
* `static_assets` = stores images, audio files, and other external resources

#### Step 3

Delete the chess image from `static_assets` and replace it with some new images, including your "home" environment image, the one that appears when the app loads.

A tip (Thank you, [Coding Artist](https://medium.com/coding-artist/learn-react-vr-chapter-1-hello-virtual-world-202241c0cb63)!): Search for "equirectangular" photos on Google. [Flickr](https://www.flickr.com/) is a particularly good source of free, Creative Commons-licensed, high-quality panoramic photos.

Create an `images` folder in your `static_assets` and move your images in there. Update the `Pano` component to refer to the home environment image for now.

As you may have guessed by the name, the `Pano` component allows us to display panoramic, or "equirectangular," images, and uses the `asset` utility from `react-vr` to automatically look inside our `static_assets` folder for the image.

#### Step 4

Change the button text to "Choose your zen" and the color to a nice, calming blue. (I liked `#29ECCE`).

Note that the button text -- and, really, any text in the application -- needs to be explicitly wrapped inside a `Text` component.

#### Step 5

Now, you'll need to add logic for updating the user's environment based on which option they choose by clicking on a `VrButton` component. I'll leave this open-ended as I'm assuming readers can set up local React state in `index.vr.js` on their own. If you need more guidance, though, I do include the original code setting up local state in my discussion of [Recompose](https://github.com/acdlite/recompose) tools below. :)

As an FYI, I wound up putting my data for each environment in a `consts/zens.js` file:

```javascript
const zens = [
  { id: 1,
    mantra: "Find your inner motherforking peace",
    image: "images/hawaii_beach.jpg",
    audio: "sounds/waves.mp3",
    text: "I'm feeling beachy keen",
  },
  { id: 2,
    mantra: "Breathe in peace, breathe out bullshirt",
    image: "images/horseshoe_bend.jpg",
    audio: "sounds/birds.mp3",
    text: "Ain't no mountain high enough",
  },
  { id: 3,
    mantra: "Benches will be benches",
    image: "images/sunrise_paris_2.jpg",
    audio: "sounds/chimes.mp3",
    text: "I want a baguette",
 },
 { id: 4,
   image: "images/homebase.png",
   text: "Home"
 }
]

export default zens;
```

#### Step 6

You don't really feel like you're at the beach unless you hear the sound of waves, right?

A good source of free and Creative Commons-licensed audio is [Freesound](https://freesound.org/). You'll have to make an account, but it's quick and easy. They'll ask you to complete a survey along the way, but you can just skip it.

After downloading the sounds -- many of which have large `.wav` files -- you'll want to compress the files. I used [All2MP3](https://all2mp3.en.softonic.com/mac), which was easy to install and worked like a dream to turn my `.wav` files into more manageable `.mp3` files, which I then added to a `sounds` folder in my `static_assets`.

You'll then add each sound link to a `Sound` component, which takes a `source` prop, the value of which -- like `Pano` -- wraps the link in an `asset` utility, allowing us to automatically look inside our `static_assets` folder for the resources we need.

#### Debugging React VR

When you `Inspect Element`, you'll see that React VR bundles all its files into one giant blob that isn't super easy to grok. Fortunately, because it supports [sourcemaps](https://trackjs.com/blog/debugging-with-sourcemaps/), we can still access the original files, use `debugger`, etc.

#### Refactoring with Recompose

I found this project a great opportunity to get more comfortable with [Recompose](https://github.com/acdlite/recompose). Recompose is all about [currying](https://www.sitepoint.com/currying-in-functional-javascript/), which basically means that one function takes a series of arguments and returns -- for example -- a function that uses one argument, which returns a function that uses another of the arguments, etc., until all the original arguments are used up. Here's a theoretical example:

```javascript
const madLibMantraGenerator = function(yogaPhrase, goodPlaceSwear) {
   return function(meditationWord) {
      console.log(yogaPhrase + goodPlaceSwear + meditationWord);
   }
}

const mantra = madLibMantraGenerator("breathe in", "motherforking");
mantra("namaste");
// => "breathe in motherforking namaste"

// a.k.a. madLibMantraGenerator("breathe in," "motherforking")("namaste")
```

Staying relevant to our needs as React developers, Recompose uses Higher Order Components (HOCs) -- functions that return functions that render React components -- for its currying work.

```
$ npm i --save recompose
```

#### Using [`withState`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate) and [`withHandlers`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withhandlers)

Thanks to Recompose, I was able to convert my `MeditationApp` component in `index.vr.js` to a stateless, functional component from a class component, thanks to Recompose's `withState`. `withState` takes three arguments: the name of the state being updated (in my case, `selectedZen`), the function or handler updating the state (`zenClicked`), and the initial value of `selectedZen` (`4`, the ID for the home environment).

```javascript
// previous component structure in index.vr.js
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
    this.setState({ selectedZen: newZen });
  }

  render() {
    return (
      <View>
         <Pano source={asset(zens[this.state.selectedZen - 1].image)}>
          <Sound source={asset(zens[this.state.selectedZen - 1].audio)} />
         </Pano>
         <HomeButton text={zens[3].text} buttonClick={() => this.zenClicked(4)} />
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

AppRegistry.registerComponent('MeditationApp', () => MeditationApp);
```

```javascript
// present component structure
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
      <HomeButton text={zens[3].text} buttonClick={() => zenClicked(4)} />
      <Mantra text={zens[selectedZen - 1].mantra} />
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
  </View>
));

AppRegistry.registerComponent('MeditationApp', () => MeditationApp);
```

In the code above, the result of `withState` curries into `withHandlers`, which accepts an object map of handler creators. Each creator takes a set of props and returns a handler to update state. Here, `zenClicked` accepts a `props` argument which returns an `id` to be used as an argument in a curried function that calls `props.zenClicked` (given to us by `withState`) and updates the state of `selectedZen` to the value of `id`. Whew!

We can then use `selectedZen` and `zenClicked` in our functional component.

A note about `withHandlers` and performance optimization: `withHandlers` passes handlers as immutable props. Typically, functions added to the body of a class component are remade on every render in React, creating false positives and breaking lifecycle methods like `shouldComponentUpdate`.

#### Hiding elements with [`branch`](https://github.com/acdlite/recompose/blob/master/docs/API.md#branch) and [`renderNothing`](https://github.com/acdlite/recompose/blob/master/docs/API.md#rendernothing)

This is looking good! But what about that ternary operator/`if ... else`-like logic that either renders the home menu or a meditation-environment-based `Mantra`? And what about that edge case I just thought of, in which I want to render the `Home` button _only_ when we are in a meditation environment (as opposed to within the home environment itself)? What about that annoying `404` error I see in my console when I'm in the home environment, regarding a nonexistent audio file?

I could keep adding ternary operators, which is _fine_ and it _works_, but I'm more interested in extracting the logic from components' render methods and putting it another HOC instead, which would be more functional and allow each component to be more individually focused on its own render logic.

Recompose comes to the rescue again! Rather than using `if ... else` -- which can get messy and easily lead to errors -- or ternary operators, I can use Recompose's `branch` utility, which accepts a callback as an argument and returns one (or one of two) higher order components based on whether the callback function returns `true` or `false`. If I want the component to simply not display, given a certain condition, I can use Recompose's `renderNothing`, which will do exactly what it sounds like. Beautiful!

In my case. I set up a generic `hideIf` provider:

```javascript
// providers/hideIf.js
import React from 'react';
import { branch, renderNothing } from 'recompose';

const hideIf = (callback) =>
   branch(
     callback,
     renderNothing,
   );

export default hideIf;
```

Now, for instance, I can create a `Menu` component that wraps the components I want to display in the home environment and set up a special `hideIf` function for it:

```javascript
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

```javascript
// index.vr.js
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
      <HomeButton text={zens[3].text} buttonClick={() => zenClicked(4)} />
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
```

Cool, so that takes care of the `Menu` logic. It appears in the home environment and disappears when I navigate to a meditation environment.

What about hiding the `Mantra` component when it doesn't have a value in the `consts/zens.js` file (like in the home environment)? Easy:

```javascript
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

After implementing similar logic for my `HomeButton` component and `Sound` (which becomes a wrapping `Audio`) component, I get the results I want and no longer see any pesky errors in the console!

```javascript
// components/home-button.js
import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';
import { compose } from 'recompose';
import { hideIf } from '../providers/index.js';

const hideHomeButton = hideIf((props) => props.selectedZen === 4);

export default compose (
  hideHomeButton,
)(({text}) => {
  return (
    <VrButton
          onClick={props.buttonClick}
          style={{width: 1.0}}>
            <View style={{marginBottom: 0.2}} >
              <Text
                style={{
                  backgroundColor: 'white',
                  color: '#29ECCE',
                  fontSize: 0.07,
                  marginTop: 0.05,
                  layoutOrigin: [0.5, 0.5],
                  fontWeight: '400',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: 'flex-start',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  transform: [{translate: [0, 0, -3]}],
              }}>
                {text}
             </Text>
          </View>
    </VrButton>
  )
});
```

```javascript
// components/audio.js
import React from 'react';
import { Sound } from 'react-vr';
import { compose } from 'recompose';
import { asset } from 'react-vr';
import { hideIf } from '../providers/index.js';

const hideIfNoUrl = hideIf((props) => props.url === null || props.url === undefined || props.url.length === 0);

export default compose(
    hideIfNoUrl,
)((props) => {
    const { url } = props;
    return (
        <Sound source={asset(url)} />
    )
});
```

I can also implement something similar in my `ZenButton` component to avoid having to `slice` my zens when I map through them in `index.vr.js`:

```javascript
// components/zen-button.js
import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';
import { hideIf } from "../providers/index.js";
import { compose } from 'recompose';

const hideHomeOption = hideIf((props) => props.text === "Home");

export default compose(
  hideHomeOption,
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
```

Hmm, this seems like a code smell: What if the text of the `HomeButton` changes? It's probably best to make determinations based on environment ID. It also seems like both `HomeButton` and `ZenButton` need to `renderNothing` in the home environment. I'm going to add a `selectedZen` prop to `ZenButton` so that it, like `HomeButton`, can be aware of the `selectedZen.`

I create a top-level `hideIfHome` HOC in my `providers` folder that makes use of the previously created `hideIf`:

```javascript
import React from 'react';
import hideIf from './hideIf';

const hideIfHome = hideIf(({ selectedZen }) => selectedZen === 4);

export default hideIfHome;
```

Now I can replace the repetitive providers in both `HomeButton` and `ZenButton` with this one!

Unfortunately, there's still some anti-DRY (Don't Repeat Yourself) logic in both components. Let's create a `components/buttons` folder and set up a `baseButton` that will use the `hideIfHome` provider and set some base styles that both `ZenButton` and `HomeButton` can draw from:

```javascript
// components/buttons/base-button.js
import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';
import { compose } from 'recompose';
import { hideIfHome } from '../../providers/index.js';

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
            // in React Native, you can combine styles by passing them in an array, with the last style passed taking precedence
              {text}
          </Text>
    </VrButton>
  )
});
```

```javascript
// component/buttons/zen-button.js
import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';
import BaseButton from './base-button.js';

const ZenButton = ({ text, buttonClick, selectedZen }) => {
  return (
    <BaseButton
      text={text}
      selectedZen={selectedZen}
      buttonClick={buttonClick}
      textStyle={{
        backgroundColor: '#29ECCE',
        color: 'white',
        marginTop: 0.03,
        transform: [{translate: [0, 0, -1]}]
      }}
    />
  )
}

export default ZenButton;
```

```javascript
// components/buttons/home-button.js
import React from 'react';
import {
  VrButton,
  Text,
  View,
} from 'react-vr';
import BaseButton from './base-button.js';

const HomeButton = ({ text, buttonClick, selectedZen }) => {
  return (
    <BaseButton
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
```

Be sure to update your paths for `ZenButton` and `HomeButton` in `components/index.js`.

#### Using [`withContext`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withcontext) and [`getContext`](https://github.com/acdlite/recompose/blob/master/docs/API.md#getcontext)

If you're like me, the fact that you're drilling the same props down through more than one component is making you itchy. Fortunately, there's something we can do about it!

Create a provider called `withStateAndHandlers.js` and move your `withState` and `withHandlers` composition logic in there:

```javascript
import React from 'react';
import { withState, withHandlers, compose } from 'recompose';

const withStateAndHandlers = compose(
    withState('selectedZen', 'zenClicked', 4),
    withHandlers({
        zenClicked: (props) => (id, evt) => props.zenClicked(selectedZen => id)
    }),
)

export default withStateAndHandlers;
```

Next, create a `withAppContext` provider:

```javascript
import { withContext, compose } from 'recompose';
import * as PropTypes from 'prop-types';
import withStateAndHandlers from './withStateAndHandlers';

export const AppPropTypes = {
    selectedZen: PropTypes.number,
    zenClicked: PropTypes.func,
}

const AppContext = withContext(
    AppPropTypes,
    ({ selectedZen, zenClicked }) => ({
        selectedZen,
        zenClicked,
    })
);

export default compose(
    withStateAndHandlers,
    AppContext,
);
```

And a `usingAppContext` provider:

```javascript
import { getContext } from 'recompose';
import { AppPropTypes } from "./withAppContext";

export default getContext(AppPropTypes);
```

Now, you can use the context anywhere you desire within your app. I was able to update my `Pano` component by placing it in a `WrappedPano` component responsible for retrieving its own data via `usingAppContext`:

```javascript
// components/wrapped-pano.js
import React from 'react';
import { Pano } from 'react-vr';
import { usingAppContext } from '../providers/index.js';
import { Audio } from '../components/index.js';
import zens from '../consts/zens.js';
import { asset } from 'react-vr';

export default usingAppContext(({ selectedZen }) => {
    return (
        <Pano source={asset(zens[selectedZen - 1].image)} >
            <Audio />
        </Pano>
    )
});
```

While I _could_ pass the same `selectedZen` prop down to `Audio` here, I'd like to make it similarly self-contained with regards to its data. I refactored it as such:

```javascript
// components/audio.js
import React from 'react';
import { Sound } from 'react-vr';
import zens from '../consts/zens.js';
import { compose } from 'recompose';
import { asset } from 'react-vr';
import { hideIf, usingAppContext } from '../providers/index.js';

const hideIfNoAudioUrl = hideIf(({ selectedZen }) => {
    const zenAudio = zens[selectedZen - 1].audio;
    return zenAudio === null || zenAudio === undefined || zenAudio.length === 0;
});

export default compose(
    usingAppContext,
    hideIfNoAudioUrl,
)(({ selectedZen }) => {
    const url = zens[selectedZen - 1].audio;
    return (
        <Sound source={asset(url)} />
    )
});
```

You'll notice I was able to change the `hideIf` provider here not to evaluate a `url` prop but to use the `selectedZen` value directly from context.

My updated `index.vr.js` component now is no longer responsible for passing data down to either the `Pano` or the `Audio` components. How refreshing!

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
import zens from './consts/zens.js';
import { ZenButton, Mantra, Title, Menu, HomeButton, WrappedPano } from './components/index.js';
import { withState, withHandlers, compose } from 'recompose';
import withAppContext from './providers/withAppContext.js';

const MeditationApp = withAppContext(() => (
    <View>
      <WrappedPano />
      // other stuff here
  </View>
));

AppRegistry.registerComponent('MeditationApp', () => MeditationApp);
```



#### What else can Recompose do?

Recompose also comes with [`withReducer`](https://github.com/acdlite/recompose/blob/master/docs/API.md#withreducer), [`mapProps`](https://github.com/acdlite/recompose/blob/master/docs/API.md#mapprops), which works similarly to React-Redux's [`mapStateToProps`](https://learn.co/lessons/map-state-to-props-readme), and a [`lifecycle`](https://github.com/acdlite/recompose/blob/master/docs/API.md#lifecycle) utility for adding lifecycle methods such as [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount) to functional components.

#### Viewing the finished demo code

```
$ git clone https://github.com/lilybarrett/find-your-zen.git
$ cd find-your-zen
$ npm i
$ npm start
```

Navigate to http://localhost:8081/vr/index.html.

#### Useful React VR resources and tutorials

* [React VR docs](https://facebook.github.io/react-vr/docs/getting-started.html)
* [Coding Artist tutorials on React VR](https://medium.com/coding-artist/learn-react-vr-chapter-1-hello-virtual-world-202241c0cb63)

#### Useful Recompose resources

* [Recompose docs](https://github.com/acdlite/recompose/blob/master/docs/API.md)
* [Why the Hipsters Recompose Everything](https://medium.com/javascript-inside/why-the-hipsters-recompose-everything-23ac08748198)
* [Roll your own provider and connect with Recompose](https://medium.com/@leathcooper/roll-your-own-provider-and-connect-with-recompose-ceb73ba29dd3)
