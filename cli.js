#!/usr/bin/env node
import process from 'node:process';
import meow from 'meow';
import chalkAnim from './index.js';

const names = Object.keys(chalkAnim);

const cli = meow(`
Usage
  $ chalk-animation <name> [options] [text...]

Options
  --duration  Duration of the animation in ms, defaults to Infinity
  --speed     Animation speed as number > 0, defaults to 1

Available animations
  ${names.join('\n  ')}

Example
  $ chalk-animation rainbow Hello world!
`, {
	importMeta: import.meta
});

if (cli.input.length < 2) {
	cli.showHelp(2);
}

const name = cli.input[0];
const payload = cli.input.slice(1);
const effect = chalkAnim[name];

if (typeof effect === 'undefined') {
	console.error(`error: unknown animation name: "${name}", must be one of: ${names.join(', ')}`);
	process.exit(1);
}

const animation = effect(payload.join(' '), cli.flags.speed);

if (typeof cli.flags.duration === 'number') {
	setTimeout(() => {
		animation.stop();
	}, cli.flags.duration);
}
