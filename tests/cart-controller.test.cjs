const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');

const source = fs.readFileSync('assets/cart-drawer.js', 'utf8').split('// Inicializar globalmente')[0];

function controller(fetch) {
  const feedback = { dataset: { error: 'Cart error', refreshError: 'Cart refresh failed' }, textContent: '', hidden: false };
  const document = {
    activeElement: {},
    addEventListener() {},
    getElementById(id) { return id === 'CartFeedback' ? feedback : null; },
    querySelectorAll() { return []; }
  };
  let Controller;
  vm.runInNewContext(`${source}; Controller = CartDrawer;`, {
    document,
    window: { Shopify: { routes: { root: '/fr/' } }, location: { pathname: '/fr/products/item', search: '?preview_theme_id=123' } },
    fetch,
    AbortSignal,
    URL,
    set Controller(value) { Controller = value; }
  });
  const instance = Object.create(Controller.prototype);
  instance.pending = false;
  instance.unsynced = false;
  instance.feedback = message => { feedback.textContent = message; };
  instance.errorMessage = kind => kind === 'refreshError' ? 'Cart refresh failed' : 'Cart error';
  instance.drawer = null;
  return { instance, feedback };
}

const response = (data, ok = true, status = 200) => ({ ok, status, json: async () => data });

test('concurrent cart updates send one localized POST and preserve section routing', async () => {
  let resolve;
  const calls = [];
  const { instance: cart, feedback } = controller((url, options) => {
    calls.push({ url, options });
    return new Promise(done => { resolve = done; });
  });
  cart.refreshDrawer = async () => {};
  const first = cart.updateQuantity('variant:key', 2);
  const second = await cart.updateQuantity('variant:key', 3);
  assert.equal(second, false);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, '/fr/cart/change.js');
  assert.deepEqual(JSON.parse(calls[0].options.body), { id: 'variant:key', quantity: 2 });
  resolve(response({ items: [{ key: 'variant:key', quantity: 2 }] }));
  const result = await first;
  assert.equal(result, true, feedback.textContent);
});

test('quantity zero removes an item; invalid quantities never send a request', async () => {
  const bodies = [];
  const { instance: cart } = controller(async (_url, options) => {
    bodies.push(JSON.parse(options.body));
    return response({ items: [] });
  });
  cart.refreshDrawer = async () => {};
  await cart.updateQuantity('variant:key', 0);
  await cart.updateQuantity('variant:key', -1);
  await cart.updateQuantity('variant:key', 1.5);
  assert.deepEqual(bodies, [{ id: 'variant:key', quantity: 0 }]);
});

test('422 exposes Shopify error and reconciles with a read only', async () => {
  const calls = [];
  let refreshes = 0;
  const { instance: cart, feedback } = controller(async (url, options) => {
    calls.push({ url, options });
    return response({ description: 'Only 2 items available.' }, false, 422);
  });
  cart.refreshDrawer = async () => { refreshes++; cart.unsynced = false; };
  await cart.updateQuantity('key', 3);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].options.method, 'POST');
  assert.equal(refreshes, 1);
  assert.equal(feedback.textContent, 'Only 2 items available.');
  assert.equal(cart.unsynced, false);
});

test('ambiguous response blocks another mutation when reconciliation fails', async () => {
  let posts = 0;
  const { instance: cart } = controller(async () => { posts++; throw new TypeError('Failed to fetch'); });
  cart.refreshDrawer = async () => { throw new Error('offline'); };
  await cart.updateQuantity('key', 2);
  await cart.updateQuantity('key', 3);
  assert.equal(posts, 1);
  assert.equal(cart.unsynced, true);
  assert.equal(cart.pending, false);
});

test('accepted mutation with missing rendered sections never retries the POST', async () => {
  let posts = 0;
  let refreshes = 0;
  const { instance: cart } = controller(async () => {
    posts++;
    return response({ items: [{ key: 'key', quantity: 2 }] });
  });
  cart.refreshDrawer = async () => { refreshes++; throw new Error('missing sections'); };
  await cart.updateQuantity('key', 2);
  assert.equal(posts, 1);
  assert.equal(refreshes, 2); // one update refresh plus one safe GET reconciliation
  assert.equal(cart.unsynced, true);
});

test('request preserves native product FormData properties and selling plan', async () => {
  let sent;
  const { instance: cart } = controller(async (_url, options) => {
    sent = options.body;
    return response({ id: 42 });
  });
  const form = new FormData();
  form.set('id', '42');
  form.set('properties[Finish]', 'Navy');
  form.set('selling_plan', '9');
  await cart.request('/fr/cart/add.js', { method: 'POST', body: form });
  assert.equal(sent.get('id'), '42');
  assert.equal(sent.get('properties[Finish]'), 'Navy');
  assert.equal(sent.get('selling_plan'), '9');
  assert.equal(sent.get('sections'), null);
});
