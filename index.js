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

const glitchChars = 'x*0987654321[]0-~@#(____!!!!\\|?????....0000\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';

const effects = {
	rainbow(str, frame) {
		const hue = 5 * frame;
		const leftColor = {h: hue % 360, s: 1, v: 1};
		const rightColor = {h: (hue + 1) % 360, s: 1, v: 1};
		return gradient(leftColor, rightColor)(str, longHsv);
	},
	pulse(str, frame) {
		return frame % 5 === 4 ? chalk.bold.red(str) : str;
	},
	glitch(str, frame) {
		if ((frame % 2) + (frame % 3) + (frame % 11) + (frame % 29) + (frame % 37) > 52) {
			return str.replace(/[^\r\n]/g, ' ');
		}

		const chunkSize = Math.max(3, Math.round(str.length * 0.02));
		const chunks = [];
		for (let i = 0, length = str.length; i < length; i++) {
			const skip = Math.round(Math.max(0, (Math.random() - 0.8) * chunkSize));
			chunks.push(str.substring(i, i + skip).replace(/[^\r\n]/g, ' '));
			i += skip;
			if (str[i]) {
				if (str[i] !== '\n' && str[i] !== '\r' && Math.random() > 0.995) {
					chunks.push(glitchChars[Math.floor(Math.random() * glitchChars.length)]);
				} else if (Math.random() > 0.005) {
					chunks.push(str[i]);
				}
			}
		}

		let result = chunks.join('');
		if (Math.random() > 0.99) {
			result = result.toUpperCase();
		} else if (Math.random() < 0.01) {
			result = result.toLowerCase();
		}

		return result;
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
module.exports.glitch = (str, speed) => animateString(str, effects.glitch, 55, speed);
