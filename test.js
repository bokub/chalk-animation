import test from 'ava';
import a from '.';

const effects = Object.keys(a);

for (const effect of effects) {
	test(`throw error if invalid speed (${effect})`, t => {
		t.throws(() => a[effect]('abc', ''), `Expected \`speed\` to be an number greater than 0`);
	});

	test(`doesn't throw (${effect})`, t => {
		t.notThrows(() => a[effect]('Lorem ipsum dolor sit amet'));
	});
}
