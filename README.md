# chalk-animation

> Work in progress ⏳


## Install

```
$ npm install --save chalk-animation
```


## Usage

```javascript
const chalkAnimation = require('chalk-animation');

chalkAnimation.rainbow('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
```

You can stop and restart an animation

```javascript
const animation = chalkAnimation.rainbow('Lorem ipsum dolor sit amet, consectetur adipiscing elit');

setTimeout(() => {
	animation.stop();
}, 1000);

setTimeout(() => {
	animation.start();
}, 2000);

```

Anything printed to the console will stop the previous animation automatically

```javascript
chalkAnimation.rainbow('Lorem ipsum');
setTimeout(() => {
	console.log('dolor sit amet');
}, 1000);
```

## Dependencies

- [gradient-string](https://github.com/bokub/gradient-string) - Output gradients to terminal
- [chalk](https://github.com/chalk/chalk) - Output colored text to terminal


## License

MIT © [Boris K](https://github.com/bokub)
