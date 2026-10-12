const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const vm = require('node:vm');

function heroHarness({ reduced = false, saveData = false, blocked = false } = {}) {
  const events = {}, documentEvents = {}, observers = [];
  const classes = new Set();
  const hero = { classList: { add: name => classes.add(name), remove: name => classes.delete(name) } };
  let loadedSource = '', plays = 0, click, preferenceChange;
  const text = {}, icon = {};
  const control = {
    hidden: true,
    setAttribute(name, value) { this[name] = value; },
    querySelector: selector => selector.endsWith('__text') ? text : icon,
    addEventListener(event, callback) { if (event === 'click') click = callback; }
  };
  const video = {
    paused: true, muted: false, dataset: { src: 'villa.mp4' },
    getAttribute: () => loadedSource || null,
    set src(value) { loadedSource = value; },
    addEventListener(event, callback) { events[event] = callback; },
    pause() { this.paused = true; events.pause?.(); },
    play() {
      plays++;
      if (blocked) return Promise.reject(new Error('Autoplay blocked'));
      this.paused = false;
      events.playing?.();
      return Promise.resolve();
    }
  };
  const preference = {
    matches: reduced,
    addEventListener(event, callback) { preferenceChange = callback; }
  };
  const document = {
    hidden: false,
    documentElement: { classList: { add() {} }, scrollHeight: 5000 },
    body: { append() {} },
    querySelector: selector => ({ '.hero': hero, '.hero-video': video, '.hero-video-control': control })[selector] || null,
    querySelectorAll: () => [],
    createElement: () => ({ setAttribute() {}, style: {} }),
    addEventListener(event, callback) { documentEvents[event] = callback; }
  };
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
  }
  const window = {
    matchMedia: () => preference, IntersectionObserver: Observer,
    addEventListener() {}, innerHeight: 900, scrollY: 0,
    requestAnimationFrame: callback => { callback(); return 1; }
  };
  vm.runInNewContext(readFileSync(resolve(__dirname, '../script.js'), 'utf8'), {
    window, document, navigator: { connection: { saveData } }, IntersectionObserver: Observer
  });
  return {
    video, control, classes,
    visible: value => observers[0].callback([{ isIntersecting: value }]),
    click: () => click(),
    hidden(value) { document.hidden = value; documentEvents.visibilitychange(); },
    reduce(value) { preference.matches = value; preferenceChange(); },
    error: () => events.error(),
    unblock() { blocked = false; },
    get source() { return loadedSource; }, get plays() { return plays; }
  };
}

test('video only loads in view, stays muted, and pauses outside the hero', () => {
  const page = heroHarness();
  assert.equal(page.source, '');
  page.visible(true);
  assert.equal(page.source, 'villa.mp4');
  assert.equal(page.video.muted, true);
  assert.equal(page.video.paused, false);
  page.visible(false);
  assert.equal(page.video.paused, true);
  page.visible(true);
  assert.equal(page.video.paused, false);
});

test('manual pause survives scrolling and hidden-tab transitions', () => {
  const page = heroHarness();
  page.visible(true);
  page.click();
  page.visible(false);
  page.hidden(true);
  page.hidden(false);
  page.visible(true);
  assert.equal(page.video.paused, true);
  assert.equal(page.control['aria-label'], 'Lire l’animation');
  page.click();
  assert.equal(page.video.paused, false);
});

test('reduced motion and data saving keep the photo without fetching footage', () => {
  for (const options of [{ reduced: true }, { saveData: true }]) {
    const page = heroHarness(options);
    page.visible(true);
    assert.equal(page.source, '');
    assert.equal(page.plays, 0);
    assert.equal(page.control.hidden, true);
  }
});

test('changing the motion preference stops playback and restores the photo', () => {
  const page = heroHarness();
  page.visible(true);
  assert.equal(page.classes.has('has-video'), true);
  page.reduce(true);
  assert.equal(page.video.paused, true);
  assert.equal(page.classes.has('has-video'), false);
  assert.equal(page.control.hidden, true);
});

test('a failed video leaves the photo visible and stops retrying', () => {
  const page = heroHarness();
  page.visible(true);
  page.error();
  page.visible(false);
  page.visible(true);
  assert.equal(page.classes.has('has-video'), false);
  assert.equal(page.control.hidden, true);
  assert.equal(page.plays, 1);
});

test('blocked autoplay exposes a working play button', async () => {
  const page = heroHarness({ blocked: true });
  page.visible(true);
  await Promise.resolve();
  assert.equal(page.video.paused, true);
  assert.equal(page.control.hidden, false);
  assert.equal(page.control['aria-label'], 'Lire l’animation');
  page.unblock();
  page.click();
  assert.equal(page.video.paused, false);
});
