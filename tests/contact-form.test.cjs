const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const vm = require('node:vm');

// Exercise the real submission handler without sending messages to Formspree.
function contactHarness(fetch, valid = true) {
  let submit, timeout;
  let resets = 0, cleared = false;
  const status = { className: '', textContent: '', classList: { add() {} } };
  const button = {
    disabled: false, busy: false,
    setAttribute() { this.busy = true; },
    removeAttribute() { this.busy = false; }
  };
  const form = {
    action: 'https://formspree.io/f/xljrajoz', method: 'post',
    addEventListener(event, handler) { if (event === 'submit') submit = handler; },
    reportValidity: () => valid,
    querySelector: () => button,
    reset() { resets++; }
  };
  const document = {
    documentElement: { classList: { add() {} }, scrollHeight: 5000 },
    body: { append() {} },
    querySelector: selector => selector === '#contact-form' ? form : selector === '#form-status' ? status : null,
    querySelectorAll: () => [],
    createElement: () => ({ setAttribute() {}, style: {} })
  };
  const window = {
    matchMedia: () => ({ matches: true }), addEventListener() {},
    requestAnimationFrame: callback => { callback(); return 1; },
    setTimeout: callback => { timeout = callback; return 1; },
    clearTimeout() { cleared = true; }, innerHeight: 900, scrollY: 0
  };
  vm.runInNewContext(readFileSync(resolve(__dirname, '../script.js'), 'utf8'), {
    document, window, fetch, AbortController, FormData: class {}
  });
  return {
    submit: () => submit({ preventDefault() {} }),
    expire: () => timeout(), button, status,
    get resets() { return resets; }, get cleared() { return cleared; }
  };
}

test('invalid fields never send a request', async () => {
  let requests = 0;
  const harness = contactHarness(() => { requests++; }, false);
  await harness.submit();
  assert.equal(requests, 0);
  assert.equal(harness.button.disabled, false);
});

test('successful submission confirms delivery and clears the form', async () => {
  const harness = contactHarness(async () => ({ ok: true }));
  await harness.submit();
  assert.equal(harness.resets, 1);
  assert.match(harness.status.textContent, /bien été envoyé/);
  assert.equal(harness.button.disabled, false);
  assert.equal(harness.button.busy, false);
  assert.equal(harness.cleared, true);
});

test('server failure preserves the draft and allows another attempt', async () => {
  const harness = contactHarness(async () => ({ ok: false }));
  await harness.submit();
  assert.equal(harness.resets, 0);
  assert.match(harness.status.textContent, /Réessayez/);
  assert.equal(harness.button.disabled, false);
  assert.equal(harness.cleared, true);
});

test('a hanging request times out, preserves the draft, and unlocks sending', async () => {
  const harness = contactHarness((url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('Aborted')));
  }));
  const pending = harness.submit();
  assert.equal(harness.button.disabled, true);
  harness.expire();
  await pending;
  assert.equal(harness.resets, 0);
  assert.match(harness.status.textContent, /WhatsApp/);
  assert.equal(harness.button.disabled, false);
  assert.equal(harness.button.busy, false);
});
