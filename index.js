'use strict';
const chalk = require('chalk');
const gradient = require('gradient-string');

const log = console.log;
const longHsv = {interpolation: 'hsv', hsvSpin: 'long'};
let currentAnimation = null;

const consoleFunctions = {
	log: console.log.bind(console),
	info: console.info.bind(console),
	warn: console.warn.bind(console),
	error: console.error.bind(console)
};

// eslint-disable-next-line guard-for-in
for (const k in consoleFunctions) {
	console[k] = function () {
		stopLastAnimation();
		consoleFunctions[k].apply(console, arguments);
	};
}

const effects = {
	rainbow(str, frame) {
		const hue = 5 * frame;
		const leftColor = {h: hue % 360, s: 1, v: 1};
		const rightColor = {h: (hue + 1) % 360, s: 1, v: 1};
		return gradient(leftColor, rightColor)(str, longHsv);
	},
	pulse(str, frame) {
		return frame % 5 === 4 ? chalk.bold.red(str) : str;
	}
};

function animateString(str, effect, delay, speed) {
	stopLastAnimation();

	speed = speed === undefined ? 1 : parseFloat(speed);
	if (!speed || speed <= 0) {
		throw new Error(`Expected \`speed\` to be an number greater than 0`);
	}

	currentAnimation = {
		stopped: false,
		frame: 0,
		nextStep() {
			const self = this;
			log('\u001B[1F\u001B[G\u001B[2K' + effect(str, this.frame));
			setTimeout(() => {
				self.frame++;
				if (!self.stopped) {
					self.nextStep();
				}
			}, delay / speed);
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

module.exports.rainbow = (str, speed) => animateString(str, effects.rainbow, 15, speed);
module.exports.pulse = (str, speed) => animateString(str, effects.pulse, 200, speed); // TODO Be able to choose the color?
