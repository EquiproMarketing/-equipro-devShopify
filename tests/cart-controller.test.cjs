const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function controller(fetch) {
  const context = { window: { Shopify: { routes: { root: '/fr/' } }, location: { pathname: '/fr/cart', search: '?preview_theme_id=123' } }, document: { addEventListener() {} }, FormData, AbortSignal, fetch };
  vm.runInNewContext(fs.readFileSync('assets/cart-drawer.js', 'utf8'), context);
  const c = context.window.cartDrawer;
  c.setBusy = value => { c.busy = value; };
  c.sectionIds = () => ['cart-drawer', 'template__main'];
  c.messages = [];
  c.status = (message, error) => c.messages.push({ message, error });
  c.render = sections => { c.rendered = sections; };
  c.open = () => { c.opened = true; };
  return c;
}
const ok = data => ({ ok: true, json: async () => data });
test('rapid duplicate adds produce one POST; locale and sections are preserved', async () => {
  let resolve, calls = [];
  const c = controller((url, options) => { calls.push({ url, options }); return new Promise(r => resolve = r); });
  const first = c.mutate('cart/add.js', { items: [{ id: 1, quantity: 1 }] }, true);
  await c.mutate('cart/add.js', { items: [{ id: 1, quantity: 1 }] }, true);
  assert.equal(calls.length, 1); assert.equal(c.busy, true);
  assert.equal(calls[0].url, '/fr/cart/add.js');
  assert.equal(JSON.parse(calls[0].options.body).sections_url, '/fr/cart?preview_theme_id=123');
  resolve(ok({ sections: { 'cart-drawer': 'html' } })); await first;
  assert.equal(c.busy, false); assert.equal(c.opened, true);
});
test('quantity zero removes last item; invalid quantities never send a request', async () => {
  let bodies = [];
  const c = controller(async (_, options) => { bodies.push(JSON.parse(options.body)); return ok({ sections: {} }); });
  await c.updateQuantity('variant:key', 0);
  assert.equal(bodies[0].quantity, 0); assert.equal(bodies[0].id, 'variant:key');
  await c.updateQuantity('variant:key', -1); await c.updateQuantity('variant:key', 1.5);
  assert.equal(bodies.length, 1);
});
test('stock 422 displays Shopify error and reconciles without retrying POST', async () => {
  let calls = 0, refreshes = 0;
  const c = controller(async () => { calls++; return { ok: false, json: async () => ({ description: 'Only 2 items available.' }) }; });
  c.refreshDrawer = async () => { refreshes++; c.unsynced = false; };
  await c.updateQuantity('key', 3);
  assert.equal(calls, 1); assert.equal(refreshes, 1);
  assert.equal(c.messages.at(-1).message, 'Only 2 items available.'); assert.equal(c.opened, undefined);
});
test('lost response and offline reconciliation block further mutations', async () => {
  let calls = 0;
  const c = controller(async () => { calls++; throw new TypeError('Failed to fetch'); });
  c.refreshDrawer = async () => { throw new Error('offline'); };
  await c.mutate('cart/add.js', { items: [{ id: 1 }] }, true);
  await c.mutate('cart/add.js', { items: [{ id: 1 }] }, true);
  assert.equal(calls, 1); assert.equal(c.unsynced, true); assert.equal(c.busy, false);
});
test('missing sections triggers only a read refresh, not another mutation', async () => {
  let calls = 0, reads = 0;
  const c = controller(async () => { calls++; return ok({ sections: null }); });
  c.render = () => { throw new Error('null sections'); };
  c.refreshDrawer = async () => { reads++; c.unsynced = false; };
  await c.updateQuantity('key', 2);
  assert.equal(calls, 1); assert.equal(reads, 1);
});
test('product form preserves properties and selling plan', async () => {
  let body;
  const c = controller(async (_, options) => { body = options.body; return ok({ sections: {} }); });
  const form = new FormData(); form.set('id', '42'); form.set('properties[Finish]', 'Navy'); form.set('selling_plan', '9');
  await c.mutate('cart/add.js', form, true);
  assert.equal(body.get('properties[Finish]'), 'Navy'); assert.equal(body.get('selling_plan'), '9'); assert.equal(body.get('sections'), 'cart-drawer,template__main');
});
