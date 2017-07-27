#!/usr/bin/env node
const chalkAnim = require('.');

if (process.argv.length < 4) {
	console.error('usage: chalk-animation <name> [text...]');
	console.error('\navailable animations:\n');
	console.error(Object.keys(chalkAnim).join('\n'));
	process.exit(2);
}

if (!(process.argv[2] in chalkAnim)) {
	console.error('error: unknown animation name:', process.argv[2]);
	process.exit(1);
}

const effect = chalkAnim[process.argv[2]];

effect(process.argv.slice(3).join(' '));
