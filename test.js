import test from 'ava';
import a from '.';

test('throw error if invalid speed', t => {
	t.throws(() => a.rainbow('abc', ''), `Expected \`speed\` to be an number greater than 0`);
	t.throws(() => a.rainbow('abc', -1), `Expected \`speed\` to be an number greater than 0`);
});

test('works fine', t => {
	t.notThrows(() => a.rainbow('Lorem ipsum dolor sit amet'));
});
