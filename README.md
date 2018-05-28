## Find Your Zen: A demo app for introducing React 360

The project I'll guide you through is a virtual reality app -- built using React 360 -- which allows the user to choose his or her immersive meditation environment, each of which comes with its own mantra inspired by the very excellent show ["The Good Place."](https://www.nbc.com/the-good-place?nbc=1) In case you need it for reference, my final source code is [here](https://github.com/lilybarrett/find-your-zen).

This content and more like it -- including an introduction to [Recompose](https://github.com/acdlite/recompose), which I used for state management here -- are on my blog at [lilydbarrett.com](http://lilydbarrett.com/).

### About React 360
* Revamped and rebranded version of [React VR](https://techcrunch.com/2017/04/18/facebook-launches-react-vr-a-new-javascript-framework-for-building-basic-vr-apps/)
* Open source, built by [Facebook](https://github.com/facebook)
* Incorporates [Three.js](https://threejs.org/), a 3-D JavaScript library; [React Native](https://facebook.github.io/react-native/) mobile elements; and [Web VR](https://webvr.info/), responsible for allowing us to view VR experiences across different browsers, including web
* Enables [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) for ease with fitting content to different browsers/screens

React 360 components include (among others):
- [`View`](https://facebook.github.io/react-native/docs/view.html) - given to us by React Native, it"s used in place of the `div` elements React typically expects and maps to the view of whatever platform is running the code
- [`Text`](https://facebook.github.io/react-native/docs/text.html) - given to us by React Native, it renders 3-D text
- [`Image`](https://facebook.github.io/react-360/docs/image.html) - used for displaying 2-D images
- [`VrButton`](https://facebook.github.io/react-360/docs/vrbutton.html) - detects click events across web, mobile, and headset, from a computer mouse to an Oculus Go controller 
- [`Entity`](https://facebook.github.io/react-360/docs/entity.html) - used for rendering 3-D objects in a scene 

You do not need any VR devices to get started with creating React 360 apps.

### Building your own FindYourZen

#### Getting started

* Install the React 360 CLI tool:

```
$ npm i -g react-360-cli
```

* Use it to create a new project:

```
$ react-360 init FindYourZen
$ cd FindYourZen
$ npm start
```

#### Exploring the file structure

Take a look at the file structure.

* `index.js` = entry point for your app
* `client.js` = sets up the "runtime," which turns our React components into 3D elements in our VR landscape 
* `index.html` = as in the typical React application, provides a place for you to mount your React code
* `static_assets` = stores images, audio files, and other external resources

#### Using Images

Delete the `360_world` image from `static_assets` and replace it with some new images, including your "home" environment image, the one that appears when the app loads.

A tip (Thank you, [Coding Artist](https://medium.com/coding-artist/learn-react-360-chapter-1-hello-virtual-world-202241c0cb63)!): Search for "equirectangular" photos on Google. [Flickr](https://www.flickr.com/) is a particularly good source of free, Creative Commons-licensed, high-quality panoramic photos.

Create an `images` folder in your `static_assets` and move your images in there. If your `client.js`, update the following line to use the name of your new "home" environment image:

```javascript
r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
```

This line of code, which immediately sets the background image when the app is first mounted, uses the `asset` utility from `react-360` to automatically look inside our `static_assets` folder for the correct image. 

That's all well and good, but keep in mind you'll eventually want to change the image based on which environment the user selects. You can handle dynamic images from within a React event by using `react-360`'s `Environment` module. Example:

```javascript
Environment.setBackgroundImage(asset(someImage));
```

#### Updating Text

In `index.js`, change the text from "Welcome to React 360" to "Find your zen" and the color to a nice, calming blue. (I liked `#29ECCE`).

Note that any text in the application needs to be explicitly wrapped inside a `Text` component.

#### Managing State 

Now, you"ll need to add logic for updating the user's environment based on which option they choose by clicking on a `VrButton` component. I'll leave this open-ended as it's still just React: You can use local state, Redux, Mobx, whatever. I chose to use Recompose. 

FYI, I wound up putting my data for each environment in a `consts/zens.js` file:

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

#### Playing audio

You don"t really feel like you"re at the beach unless you hear the sound of waves, right?

A good source of free and Creative Commons-licensed audio is [Freesound](https://freesound.org/). You"ll have to make an account, but it"s quick and easy. They"ll ask you to complete a survey along the way, but you can just skip it.

After downloading the sounds -- many of which have large `.wav` files -- you"ll want to compress the files. I used [All2MP3](https://all2mp3.en.softonic.com/mac), which was easy to install and worked like a dream to turn my `.wav` files into more manageable `.mp3` files, which I then added to a `sounds` folder in my `static_assets`.

For playing audio, we'll use the `AudioModule` Native Module. Its `playEnvironmental` method allows us to provide a path (to the audio our assets folder) and a volume at which to play said audio at a looping pace; Once the audio file stops playing, it'll start again.

One thing to keep in mind is that you'll need to tell your application when to _stop_ playing a particular audio file when you switch scenes. (Otherwise it'll keep playing in an environment where it's not welcome! You can't listen to Parisian church bells on a Hawaiian beach!) You can do this via the `AudioModule`'s `stopEnvironmental` method.

#### Mounting the app 

```javascript
// index.js
import React from "react";
import {
  AppRegistry,
  View,
} from "react-360";
import { AppContent } from "./components";
import { withAppContext } from "./providers";

const MeditationApp = withAppContext(() => (
    <View style={{
      transform: [{ translate: [0, 0, -2] }]
    }}>
      <AppContent />
    </View>
));


AppRegistry.registerComponent("AppContent", () => AppContent);
AppRegistry.registerComponent("MeditationApp", () => MeditationApp);
```

To break this down a bit: I've registered components in different places. My `MeditationApp` is mounted to `react-360`'s default location -- giving my components access to the runtime -- while the content I want to display (stored in `AppContent`) is mounted to `react-360`'s default cylindrical surface.

My `client.js` deals with mounting my component to locations and surfaces:

```javascript
// client.js
import { ReactInstance, Surface } from "react-360-web";

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    // Add custom options here
    ...options,
  });

  r360.renderToSurface(
    r360.createRoot("AppContent", { /* initial props */ }),
    r360.getDefaultSurface()
  );

  r360.renderToLocation(
    r360.createRoot("MeditationApp", { /* initial props */ }),
    r360.getDefaultLocation(),
  );

  r360.compositor.setBackground(r360.getAssetURL("images/homebase.png"));
}

window.React360 = {init};
```

And, for context, here's my `AppContent` component:

```javascript
import React from "react";
import { View } from "react-360";
import { HomeEnvironment, ZenEnvironment } from "../../scenes";
import { withAppContext } from "../../providers";

const AppContent = withAppContext(() => (
   <View>
        <HomeEnvironment />
        <ZenEnvironment />
   </View>
));

export default AppContent;
```

#### Architecture 

I set up my folder structure as follows:

```
- components // shared components
  - base-button
  - content 
- consts 
- providers
  // Recompose providers live here 
- scenes
  - home-environment
    - components
      - menu
      - title 
      - zen-button
      - zens 
  - zen-environment
    - components
      - home-button
      - mantra 
- static_assets
  - images 
  - sounds 
```

Shared components live in the top-level `components` folder; my `HomeEnvironment` and `ZenEnvironment` scenes each have their own sets of relevant components stored in `scenes`. My state management is essentially handled by the `providers` and composed into each component that needs knowledge of/access to state.

#### StyleSheets

We get `StyleSheet` from `react-native`, basically, which allows us to use JavaScript to pass styling attributes to our React components.  As an example:

```javascript
// scenes/home-environment/components/zen-button/style.js
import { StyleSheet } from "react-360";

export default StyleSheet.create({
    text: {
        backgroundColor: "#29ECCE",
        textAlign: "center",
        color: "white",
        marginTop: 30  
    }
})
```

Here, we create and export a `StyleSheet` object that allows us to reference styles in a terse, DRY manner in our component itself:

```javascript
// scenes/home-environment/components/zen-button/index.js
import React from "react";
import { BaseButton } from "../../../../components";
import style from "./style";

const ZenButton = ({ text, buttonClick, selectedZen }) => {
  return (
    <BaseButton
      text={text}
      selectedZen={selectedZen}
      buttonClick={buttonClick}
      textStyle={style.text}
    />
  )
}

export default ZenButton;
```

#### Debugging React 360

When you `Inspect Element`, you"ll see that React 360 bundles all its files into one giant blob that isn"t super easy to grok. Fortunately, because it supports [sourcemaps](https://trackjs.com/blog/debugging-with-sourcemaps/), we can still access the original files, use `debugger`, etc.

#### Viewing the finished demo code

```
$ git clone https://github.com/lilybarrett/find-your-zen.git
$ cd find-your-zen
$ npm i
$ npm start
```

Navigate to http://localhost:8081/index.html.

#### Useful React VR resources and tutorials

* [React VR docs](https://facebook.github.io/react-360/docs/getting-started.html)
* [Coding Artist tutorials on React VR](https://medium.com/coding-artist/learn-react-360-chapter-1-hello-virtual-world-202241c0cb63)

#### Useful Recompose resources

* [Recompose docs](https://github.com/acdlite/recompose/blob/master/docs/API.md)
* [Why the Hipsters Recompose Everything](https://medium.com/javascript-inside/why-the-hipsters-recompose-everything-23ac08748198)
* [Roll your own provider and connect with Recompose](https://medium.com/@leathcooper/roll-your-own-provider-and-connect-with-recompose-ceb73ba29dd3)