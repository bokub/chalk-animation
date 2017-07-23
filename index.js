'use strict';

const gradient = require('gradient-string');

const log = console.log;
const gradientOptions = {interpolation: 'hsv', hsvSpin: 'long'};
let currentAnimation = null;

const funcs = {
	log: console.log.bind(console),
	info: console.info.bind(console),
	warn: console.warn.bind(console),
	error: console.error.bind(console)
};

// eslint-disable-next-line guard-for-in
for (const k in funcs) {
	console[k] = function () {
		stopLastAnimation();
		funcs[k].apply(console, arguments);
	};
}

const effects = {
	rainbow(str, frame) {
		const hue = 5 * frame;
		const leftColor = {h: hue % 360, s: 1, v: 1};
		const rightColor = {h: (hue + 1) % 360, s: 1, v: 1};
		return gradient(leftColor, rightColor)(str, gradientOptions);
	}
};

function animateString(str, effect, delay) {
	stopLastAnimation();
	currentAnimation = {
		stopped: false,
		frame: 0,
		nextStep() {
			const self = this;
			log('\u001B[1F\u001B[G' + effect(str, this.frame));
			setTimeout(() => {
				self.frame++;
				if (!self.stopped) {
					self.nextStep();
				}
			}, delay);
		},
		stop() {
			this.stopped = true;
		},
		start() {
			this.stopped = false;
			this.nextStep();
		}
	};

	console.log('');
	currentAnimation.start();
	return currentAnimation;
}

function stopLastAnimation() {
	if (currentAnimation) {
		currentAnimation.stop();
	}
}

module.exports.rainbow = str => animateString(str, effects.rainbow, 15);
