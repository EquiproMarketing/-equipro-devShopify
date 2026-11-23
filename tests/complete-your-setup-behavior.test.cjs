const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const script = fs.readFileSync('sections/complete-your-setup.liquid', 'utf8').match(/{% javascript %}([\s\S]*?){% endjavascript %}/)[1];
function setup({request = async () => ({id: 42}), pending = false, unsynced = false} = {}) {
 const listeners = {}, calls = [], work = [], attrs = {}, text = {textContent: 'Add to cart', style: {}}, spinner = {style: {}};
 const button = {hidden: true, disabled: false, dataset: {variantId: '42', addedLabel: 'Added! ✓'}, querySelector: s => s === '.btn-text' ? text : spinner, setAttribute: (k,v) => attrs[k] = v, removeAttribute: k => delete attrs[k], closest: () => null, hasAttribute: () => false};
 const cart = {pending, unsynced, request: async (...args) => {calls.push(args); return request(...args);}, refreshDrawer: async () => {cart.refreshed = true;}, open: () => {cart.opened = true;}, errorMessage: () => 'Cart error', run(fn) {
  if (this.pending || this.unsynced) return;
  this.pending = true; button.disabled = true;
  const result = (async () => { try {await fn();return true;} catch (e) {this.error = e.message;return false;} finally {this.pending = false;button.disabled = false;} })();
  work.push(result);return result;
 }};
 let Component;
 class Element {
  addEventListener(name, fn) {listeners[name] = fn;}
  querySelectorAll() {return [button];}
  querySelector(selector) {return selector === 'dialog' ? null : this.scroller;}
 }
 vm.runInNewContext(script, {customElements: {get() {}, define(_, c) {Component = c;}}, HTMLElement: Element,
  document: {getElementById:()=>null}, window: {cartDrawer: cart, Shopify: {routes: {root: '/fr/'}}, addEventListener() {}}, requestAnimationFrame: fn => fn(), setTimeout: () => 1, clearTimeout() {}});
 const component = new Component();component.connectedCallback();
 return {component, button, text, spinner, attrs, cart, calls, work, click: () => listeners.click({target: {closest: selector => selector === '.complete-setup__add' ? button : null}}), focus: card => listeners.focusin({target: {closest: () => card}})};
}
test('adapter reuses cart run/request/refresh/open with loading state and one add', async () => {
 let resolve;
 const s = setup({request: () => new Promise(r => resolve = r)});
 assert.equal(s.button.hidden, false);
 s.click();s.click();
 assert.equal(s.calls.length, 1);assert.equal(s.button.disabled, true);assert.equal(s.attrs['aria-busy'], 'true');
 assert.equal(s.text.style.display, 'none');assert.equal(s.spinner.style.display, 'inline-block');
 assert.equal(s.calls[0][0], '/fr/cart/add.js');assert.deepEqual(JSON.parse(s.calls[0][1].body), {id:'42',quantity:1});
 resolve({id:42});await Promise.all(s.work);await new Promise(setImmediate);
 assert.equal(s.cart.refreshed, true);assert.equal(s.cart.opened, true);assert.equal(s.button.disabled, false);
 assert.equal(s.attrs['aria-busy'], undefined);assert.equal(s.spinner.style.display, 'none');assert.equal(s.text.textContent, 'Added! ✓');
});
test('Shopify rejection returns to existing cart error handling and resets loading without retry', async () => {
 const s = setup({request: async () => {throw new Error('Only 1 available');}});
 s.click();await Promise.all(s.work);await new Promise(setImmediate);
 assert.equal(s.cart.error, 'Only 1 available');assert.equal(s.cart.opened, undefined);assert.equal(s.calls.length, 1);
 assert.equal(s.attrs['aria-busy'], undefined);assert.equal(s.spinner.style.display, 'none');assert.equal(s.text.textContent,'Add to cart');
});
test('pending or unreconciled cart never sends another add', () => {
 for (const state of [{pending:true},{unsynced:true}]) {const s = setup(state);s.click();assert.equal(s.calls.length,0);}
});
test('malformed success is handled by the cart controller, not shown as Added', async () => {
 const s = setup({request:async()=>({})});s.click();await Promise.all(s.work);await new Promise(setImmediate);
 assert.equal(s.cart.error,'Cart error');assert.equal(s.cart.opened,undefined);
});
test('focus scrolls the whole card within mobile bounds, without moving desktop', () => {
 const s = setup();let next;
 s.component.scroller = {scrollWidth:558,clientWidth:327,scrollLeft:6,getBoundingClientRect:()=>({left:24,right:351}),scrollTo:options=>next=options};
 s.focus({getBoundingClientRect:()=>({left:307.75,right:575.5})});assert.equal(next.left,236.5);assert.equal(next.behavior,'instant');
 next=undefined;s.component.scroller.scrollWidth=327;s.focus({getBoundingClientRect:()=>({left:307.75,right:575.5})});assert.equal(next,undefined);
});
