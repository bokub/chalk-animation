import chalk from 'chalk';
import gradient from 'gradient-string';

const {log} = console;
let currentAnimation = null;

const consoleFunctions = {
	log: log.bind(console),
	info: console.info.bind(console),
	warn: console.warn.bind(console),
	error: console.error.bind(console),
};

// eslint-disable-next-line guard-for-in
for (const k in consoleFunctions) {
	console[k] = (...args) => {
		stopLastAnimation();
		consoleFunctions[k](...args);
	};
}

const glitchChars
	= 'x*0987654321[]0-~@#(____!!!!\\|?????....0000\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t';
const longHsv = {interpolation: 'hsv', hsvSpin: 'long'};

const effects = {
	rainbow(string_, frame) {
		const hue = 5 * frame;
		const leftColor = {h: hue % 360, s: 1, v: 1};
		const rightColor = {h: (hue + 1) % 360, s: 1, v: 1};
		return gradient(leftColor, rightColor)(string_, longHsv);
	},
	pulse(string_, frame) {
		frame = (frame % 120) + 1;
		const transition = 6;
		const duration = 10;
		const on = '#ff1010';
		const off = '#e6e6e6';

		if (frame >= (2 * transition) + duration) {
			return chalk.hex(off)(string_); // All white
		}

		if (frame >= transition && frame <= transition + duration) {
			return chalk.hex(on)(string_); // All red
		}

		frame
			= frame >= transition + duration
				? (2 * transition) + duration - frame
				: frame; // Revert animation

		const g
			= frame <= transition / 2
				? gradient([
					{color: off, pos: 0.5 - (frame / transition)},
					{color: on, pos: 0.5},
					{color: off, pos: 0.5 + (frame / transition)},
				])
				: gradient([
					{color: off, pos: 0},
					{color: on, pos: 1 - (frame / transition)},
					{color: on, pos: (frame / transition)},
					{color: off, pos: 1},
				]);

		return g(string_);
	},
	glitch(string_, frame) {
		if (
			(frame % 2) + (frame % 3) + (frame % 11) + (frame % 29) + (frame % 37)
			> 52
		) {
			return string_.replace(/[^\r\n]/g, ' ');
		}

		const chunkSize = Math.max(3, Math.round(string_.length * 0.02));
		const chunks = [];

		for (let i = 0, {length} = string_; i < length; i++) {
			const skip = Math.round(Math.max(0, (Math.random() - 0.8) * chunkSize));
			chunks.push(string_.slice(i, i + skip).replace(/[^\r\n]/g, ' '));
			i += skip;
			if (string_[i]) {
				if (
					string_[i] !== '\n'
					&& string_[i] !== '\r'
					&& Math.random() > 0.995
				) {
					chunks.push(
						glitchChars[Math.floor(Math.random() * glitchChars.length)],
					);
				} else if (Math.random() > 0.005) {
					chunks.push(string_[i]);
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
	},
	radar(string_, frame) {
		const depth = Math.floor(Math.min(string_.length, string_.length * 0.2));
		const step = Math.floor(255 / depth);

		const globalPos = frame % (string_.length + depth);

		const chars = [];
		for (let i = 0, {length} = string_; i < length; i++) {
			const pos = -(i - globalPos);
			if (pos > 0 && pos <= depth - 1) {
				const shade = (depth - pos) * step;
				chars.push(chalk.rgb(shade, shade, shade)(string_[i]));
			} else {
				chars.push(' ');
			}
		}

		return chars.join('');
	},
	neon(string_, frame) {
		const color
			= frame % 2 === 0
				? chalk.dim.rgb(88, 80, 85)
				: chalk.bold.rgb(213, 70, 242);
		return color(string_);
	},
	karaoke(string_, frame) {
		const chars = (frame % (string_.length + 20)) - 10;
		if (chars < 0) {
			return chalk.white(string_);
		}

		return (
			chalk.rgb(255, 187, 0).bold(string_.slice(0, Math.max(0, chars)))
			+ chalk.white(string_.slice(chars))
		);
	},
};

function animateString(string_, effect, delay, speed) {
	stopLastAnimation();

	speed = speed === undefined ? 1 : Number.parseFloat(speed);
	if (!speed || speed <= 0) {
		throw new Error('Expected `speed` to be an number greater than 0');
	}

	currentAnimation = {
		text: string_.split(/\r\n|\r|\n/),
		lines: string_.split(/\r\n|\r|\n/).length,
		stopped: false,
		init: false,
		f: 0,
		render() {
			if (!this.init) {
				log('\n'.repeat(this.lines - 1));
				this.init = true;
			}

			log(this.frame());
			setTimeout(() => {
				if (!this.stopped) {
					this.render();
				}
			}, delay / speed);
		},
		frame() {
			this.f++;
			return (
				'\u001B['
				+ this.lines
				+ 'F\u001B[G\u001B[2K'
				+ this.text.map(string_ => effect(string_, this.f)).join('\n')
			);
		},
		replace(string_) {
			this.text = string_.split(/\r\n|\r|\n/);
			this.lines = string_.split(/\r\n|\r|\n/).length;
			return this;
		},
		stop() {
			this.stopped = true;
			return this;
		},
		start() {
			this.stopped = false;
			this.render();
			return this;
		},
	};
	setTimeout(() => {
		if (!currentAnimation.stopped) {
			currentAnimation.start();
		}
	}, delay / speed);
	return currentAnimation;
}

function stopLastAnimation() {
	if (currentAnimation) {
		currentAnimation.stop();
	}
}

const chalkAnimation = {
	rainbow: (string_, speed) =>
		animateString(string_, effects.rainbow, 15, speed),
	pulse: (string_, speed) => animateString(string_, effects.pulse, 16, speed),
	glitch: (string_, speed) => animateString(string_, effects.glitch, 55, speed),
	radar: (string_, speed) => animateString(string_, effects.radar, 50, speed),
	neon: (string_, speed) => animateString(string_, effects.neon, 500, speed),
	karaoke: (string_, speed) =>
		animateString(string_, effects.karaoke, 50, speed),
};

export default chalkAnimation;
