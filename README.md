# chalk-animation

[![Build Status](https://travis-ci.org/bokub/chalk-animation.svg?branch=master)](https://travis-ci.org/bokub/chalk-animation)
[![npm](https://img.shields.io/npm/v/chalk-animation.svg)](https://www.npmjs.com/package/chalk-animation)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Code Climate](https://img.shields.io/codeclimate/github/bokub/chalk-animation.svg)](https://codeclimate.com/github/bokub/chalk-animation)

> Colorful animations in terminal output


## Available animations

|   Name    |                   Preview                  |
|:---------:|:------------------------------------------:|
|  rainbow  | ![rainbow](http://i.imgur.com/napdxdn.gif) |
|   pulse   | ![rainbow](http://i.imgur.com/xdaETwr.gif) |
|   glitch  | ![rainbow](http://i.imgur.com/834FJU1.gif) |
|   radar   | ![rainbow](http://i.imgur.com/3bFrtRc.gif) |
|    neon   | ![rainbow](http://i.imgur.com/YdAAroI.gif) |


## Install

```bash
$ npm i chalk-animation
```


## Usage

```javascript
const chalkAnimation = require('chalk-animation');

chalkAnimation.rainbow('Lorem ipsum dolor sit amet');
```

#### Start and stop

You can stop and resume an animation with `stop()` and `start()`.

When created, the instance of chalkAnimation **starts automatically**.

```javascript
const rainbow = chalkAnimation.rainbow('Lorem ipsum'); // Animation starts

setTimeout(() => {
    rainbow.stop(); // Animation stops
}, 1000);

setTimeout(() => {
    rainbow.start(); // Animation resumes
}, 2000);

```

#### Automatic stop

Anything printed to the console will stop the previous animation automatically

```javascript
chalkAnimation.rainbow('Lorem ipsum');
setTimeout(() => {
    // Stop the 'Lorem ipsum' animation, then write on a new line.
    console.log('dolor sit amet');
}, 1000);
```

#### Changing speed

Change the animation speed using a second parameter. Should be greater than 0, default is 1.

```javascript
chalkAnimation.rainbow('Lorem ipsum', 2); // Two times faster than default
```

#### Changing text

Change the animated text seamlessly with `replace()`

```javascript
let str = 'Loading...';
const rainbow = chalkAnimation.rainbow(str);

// Add a new dot every second
setInterval(() => {
	rainbow.replace(str += '.');
}, 1000);
```

#### Manual rendering

Manually render frames with `render()`, or get the content of the next frame with `frame()`

```javascript
const rainbow = chalkAnimation.rainbow('Lorem ipsum').stop(); // Don't start the animation

rainbow.render(); // Display the first frame

const frame = rainbow.frame(); // Get the second frame
console.log(frame);
```


## CLI mode

```bash
# Install package globally
$ npm install --global chalk-animation
```

```
$ chalk-animation --help

  Colorful animations in terminal output

  Usage
    $ chalk-animation <name> [options] [text...]

  Options
		--duration  Duration of the animation in ms, defaults to Infinity
    --speed  Animation speed as number > 0, defaults to 1

  Available animations
    rainbow
    pulse
    glitch
    radar
    neon

  Example
    $ chalk-animation rainbow Hello world!
```


## Related

- [gradient-string](https://github.com/bokub/gradient-string) - Output gradients to terminal
- [chalk](https://github.com/chalk/chalk) - Output colored text to terminal


## License

MIT © [Boris K](https://github.com/bokub)
