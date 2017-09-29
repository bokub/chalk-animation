# chalk-animation

[![Build Status](https://travis-ci.org/bokub/chalk-animation.svg?branch=master)](https://travis-ci.org/bokub/chalk-animation)
[![npm](https://img.shields.io/npm/v/chalk-animation.svg)](https://www.npmjs.com/package/chalk-animation)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![Code Climate](https://img.shields.io/codeclimate/github/bokub/chalk-animation.svg)](https://codeclimate.com/github/bokub/chalk-animation)

> Colorful animations in terminal stdout


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
$ npm install --save chalk-animation
```


## Usage

```javascript
const chalkAnimation = require('chalk-animation');

chalkAnimation.rainbow('Lorem ipsum dolor sit amet');
```

You can stop and restart an animation with `stop()` and `start()`

```javascript
const rainbow = chalkAnimation.rainbow('Lorem ipsum'); // Animation starts

setTimeout(() => {
    rainbow.stop(); // Animation stops
}, 1000);

setTimeout(() => {
    rainbow.start(); // Animation resumes
}, 2000);

```

Anything printed to the console will stop the previous animation automatically

```javascript
chalkAnimation.rainbow('Lorem ipsum');
setTimeout(() => {
    // Stop the 'Lorem ipsum' animation, then write on a new line.
    console.log('dolor sit amet');
}, 1000);
```

Change the animation speed using a second parameter. Should be greater than 0, default is 1.

```javascript
chalkAnimation.rainbow('Lorem ipsum', 2); // Two times faster than default
```

Change the animated text seamlessly with `replace()`

```javascript
let str = 'Loading...';
const rainbow = chalkAnimation.rainbow(str);

// Add a new dot every second
setInterval(() => {
	str += '.';
	rainbow.replace(str);
}, 1000);
```

## CLI mode

```bash
# Install package globally
$ npm install --global chalk-animation
```

```
$ chalk-animation --help

Usage
  $ chalk-animation <name> [text...]

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
