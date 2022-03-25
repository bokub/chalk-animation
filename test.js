import test from 'ava';
import a from './index.js';

const effects = Object.keys(a);

for (const effect of effects) {
	test(`throw error if invalid speed (${effect})`, t => {
		t.throws(() => a[effect]('abc', ''), {message: 'Expected `speed` to be an number greater than 0'});
	});

	test(`animations are starting automatically (${effect})`, async t => {
		const an = a[effect]('Lorem ipsum\ndolor sit amet');

		await Promise.race([
			new Promise((resolve, reject) => {
				const interval = setInterval(() => {
					if (an.f > 2) {
						clearInterval(interval);
						try {
							t.pass();
							// Exit the test right when there is a result
							resolve();
						} catch (error) {
							reject(error);
						}
					}
				}, 10);
			}),
		], new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					t.true(an.f > 2);
					resolve();
				} catch (error) {
					reject(error);
				}
			}, 1500);
		}));
	});

	test(`console.log stops the animation (${effect})`, async t => {
		const an = a[effect]('Lorem ipsum\ndolor sit amet');

		await new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					t.is(an.stopped, false);
					console.log('This log should stop the animation');
					t.is(an.stopped, true);
					resolve();
				} catch (error) {
					reject(error);
				}
			}, 20);
		});
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
		if (['radar'].includes(effect)) {
			return t.pass(); // Ignore some animations
		}

		const an = a[effect]('Y Y Y').stop();
		const f1 = an.frame();
		an.replace('Z Z Z');
		const f2 = an.frame();

		t.true(f1.includes('Y'));
		t.false(f1.includes('Z'));

		t.false(f2.includes('Y'));
		t.true(f2.includes('Z'));
	});

	test(`multiline is well supported (${effect})`, t => {
		const an = a[effect]('Lorem\nipsum\ndolor\nsit\namet').stop();
		const frame = an.frame();
		t.is(an.lines, 5);
		t.is(frame.split('\n').length, 5);
	});

	test(`forced start is not a problem (${effect})`, async t => {
		await t.notThrowsAsync(async () => {
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					try {
						a[effect]('Lorem ipsum\ndolor sit amet', 10).start();
						resolve();
					} catch (error) {
						reject(error);
					}
				}, 20);
			});
		});
	});

	test(`test lots of frames (${effect})`, t => {
		const an = a[effect]('Lorem ipsum\ndolor sit amet').stop();
		for (let i = 0; i < 5000; i++) {
			t.notThrows(() => an.frame());
		}
	});
}
