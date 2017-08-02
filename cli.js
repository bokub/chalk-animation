#!/usr/bin/env node
const chalkAnim = require('.');

if (process.argv.length < 4) {
	console.error('Usage\n  $ chalk-animation <name> [text...]');
	console.error(
		'\nAvailable animations\n  ' + Object.keys(chalkAnim).join('\n  ')
	);
	console.error('\nExample\n  $ chalk-animation rainbow Hello world!');
	process.exit(2);
}

if (!(process.argv[2] in chalkAnim)) {
	console.error('error: unknown animation name:', process.argv[2]);
	process.exit(1);
}

const effect = chalkAnim[process.argv[2]];

effect(process.argv.slice(3).join(' '));
