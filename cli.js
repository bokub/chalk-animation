#!/usr/bin/env node
const chalkAnim = require('.');

const er = console.error;

if (process.argv.length < 4) {
	er('Usage\n  $ chalk-animation <name> [text...]');
	er('\nAvailable animations\n  ' + Object.keys(chalkAnim).join('\n  '));
	er('\nExample\n  $ chalk-animation rainbow Hello world!');
	// eslint-disable-next-line no-process-exit
	process.exit(2);
}

if (!(process.argv[2] in chalkAnim)) {
	er('error: unknown animation name:', process.argv[2]);
	// eslint-disable-next-line no-process-exit
	process.exit(1);
}

const effect = chalkAnim[process.argv[2]];

effect(process.argv.slice(3).join(' '));
