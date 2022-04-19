import test from 'ava';
import a from './index.js';

const effects = Object.keys(a);

// eslint-disable-next-line no-promise-executor-return
const sleep = ms => new Promise(r => setTimeout(r, ms));

for (const effect of effects) {
	test(`throw error if invalid speed (${effect})`, t => {
		t.throws(() => a[effect]('abc', ''), {message: 'Expected `speed` to be an number greater than 0'});
	});

	test(`animations are starting automatically (${effect})`, async t => {
		const an = a[effect]('Lorem ipsum\ndolor sit amet');
		for (let i = 0; i < 150; i++) {
			// eslint-disable-next-line no-await-in-loop
			await sleep(10);
			if (an.f > 2) {
				t.pass();
				return; // Exit the test right when there is a result
			}
		}
		t.fail();
	});

	test(`console.log stops the animation (${effect})`, async t => {
		const an = a[effect]('Lorem ipsum\ndolor sit amet');
		await sleep(20);
		t.is(an.stopped, false);
		console.log('This log should stop the animation');
		t.is(an.stopped, true);
	});

	test(`start and stop are working (${effect})`, t => {
		const an = a[effect]('Lorem ipsum\ndolor sit amet');
		t.is(an.stopped, false);
		an.stop();
		t.is(an.stopped, true);
		an.start();
		t.is(an.stopped, false);
	});

	test(`manual render is working (${effect})`, t => {
		const an = a[effect]('Lorem ipsum\ndolor sit amet').stop();
		t.is(an.f, 0);
		an.render();
		t.is(an.f, 1);
		an.render();
		t.is(an.f, 2);
	});

	test(`text can be replaced (${effect})`, t => {
		if (['radar'].indexOf(effect) > -1) {
			return t.pass(); // Ignore some animations
		}

		const an = a[effect]('Y Y Y').stop();
		const f1 = an.frame();
		an.replace('Z Z Z');
		const f2 = an.frame();

		t.true(f1.indexOf('Y') > -1);
		t.false(f1.indexOf('Z') > -1);

		t.false(f2.indexOf('Y') > -1);
		t.true(f2.indexOf('Z') > -1);
	});

	test(`multiline is well supported (${effect})`, t => {
		const an = a[effect]('Lorem\nipsum\ndolor\nsit\namet').stop();
		const frame = an.frame();
		t.is(an.lines, 5);
		t.is(frame.split('\n').length, 5);
	});

	test(`forced start is not a problem (${effect})`, async t => {
		await t.notThrowsAsync(async () => {
			a[effect]('Lorem ipsum\ndolor sit amet', 10).start();
			await sleep(20);
		});
	});

	test(`test lots of frames (${effect})`, t => {
		const an = a[effect]('Lorem ipsum\ndolor sit amet').stop();
		for (let i = 0; i < 5000; i++) {
			t.notThrows(() => an.frame());
		}
	});
}
