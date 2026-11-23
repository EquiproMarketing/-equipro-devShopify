const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { Liquid } = require('liquidjs');
const engine = new Liquid();
const source = fs.readFileSync('sections/complete-your-setup.liquid', 'utf8').replace(/{% (schema|stylesheet|javascript) %}[\s\S]*?{% end\1 %}/g, '');
const translations = JSON.parse(fs.readFileSync('locales/en.default.json'));
engine.registerFilter('t', key => key.split('.').reduce((v,k)=>v?.[k],translations));
engine.registerFilter('asset_url', x => x);
engine.registerFilter('stylesheet_tag', x => `<link href="${x}">`);
engine.registerFilter('placeholder_svg_tag', () => '<svg></svg>');
engine.registerFilter('money_with_currency', x => `$${(x / 100).toFixed(2)} CAD`);
const item = (id, price = 10000) => ({id, title: `Product ${id}`, url: `/products/${id}`, price_min: price});
const render = (value, type = 'list.product_reference', settings = {}) => engine.parseAndRender(source, {
 product: {id: 1, metafields: {custom: {complete_your_setup: {type, value}}, existing: {accessories: {type, value}}}},
 section: {id: 'pilot', settings}
});
test('empty, wrong type and self-only lists render no block', async () => {
 for (const [value, type] of [[[], undefined], [[item(1)], undefined], [[item(2)], 'single_line_text_field']]) assert.equal((await render(value, type)).trim(), '');
});
test('skips invalid and self references and limits the rendered products to three', async () => {
 const html = await render([null, item(1), {id: 9}, item(2), item(3), item(4), item(5)]);
 assert.equal((html.match(/<li /g) || []).length, 3);
 assert.doesNotMatch(html, /href="\/products\/(1|5)"/);
 assert.match(html, /href="\/products\/4"/);
});
test('zero and mixed-zero prices are omitted, positive variable prices have From', async () => {
 const html = await render([item(2, 0), {...item(3, 0), price_varies: true}, {...item(4), price_varies: true}]);
 assert.doesNotMatch(html, /\$0\.00|free/i);
 assert.equal((html.match(/spa-pack-card__price/g) || []).length, 1);
 assert.match(html, /From\s+\$100.00 CAD/);
});
test('existing metafield and sold-out products remain navigable without purchase controls', async () => {
 const html = await render([{...item(2), available: false}], undefined, {metafield_namespace: 'existing', metafield_key: 'accessories'});
 assert.match(html, /href="\/products\/2"/);
 assert.match(html, /tabindex="0"/);
 assert.doesNotMatch(html, /<form|data-variant-id=|\/cart|checkout/);
});

test('only an available positive-price default variant gets Quick Add', async () => {
 const eligible = {...item(2), available: true, has_only_default_variant: true, variants: [{id: 200, price: 10000, available: true}]};
 const html = await render([eligible]);
 assert.match(html, /class="complete-setup__add js-add-to-cart-btn"/);
 assert.match(html, /data-variant-id="200"/);
 assert.match(html, /aria-describedby="CompleteSetupProduct-pilot-2"/);
 assert.match(html, /Add to cart/);
 assert.doesNotMatch(html, /<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<button/);
});
test('options, selling plans, quotes, portable products, gift cards and zero prices stay link-only', async () => {
 const eligible = {...item(2), available: true, has_only_default_variant: true, variants: [{id: 200, price: 10000, available: true}]};
 const cases = [
  {has_only_default_variant: false}, {variants: [...eligible.variants, {id: 201, price: 10000, available: true}]},
  {requires_selling_plan: true}, {tags: ['QUOTE-ONLY']}, {template_suffix: 'quote'},
  {collections: [{handle: 'portable'}]}, {'gift_card?': true}, {price_min: 0}, {available: false},
  {variants: [{id: 200, price: 0, available: true}]}, {variants: [{id: 200, price: 10000, available: false}]}
 ];
 for (const change of cases) {
  const html = await render([{...eligible, ...change}]);
  assert.doesNotMatch(html, /data-variant-id=/, JSON.stringify(change));
  assert.match(html, /href="\/products\/2"/);
 }
});
test('fallback links describe the next action and category paths become readable', async () => {
 const html = await render([
  {...item(2), available: true, has_only_default_variant: false, type: '/PRODUITS/STOOLS'},
  {...item(3), tags: ['quote-only']}, {...item(4), available: false}
 ]);
 assert.match(html, />Stools<\/span>/);
 assert.doesNotMatch(html, /PRODUITS/);
 for (const label of ['Choose options', 'View quote details', 'View availability']) assert.ok(html.includes(label));
});
test('multi-variant inline payload uses real options and safe per-variant restrictions', async () => {
 const product = {...item(2),title:'Stool </script><img>',available:true,has_only_default_variant:false,
  options_with_values:[{name:'Color'}], variants:[
   {id:20,options:['White'],price:23500,available:true},
   {id:21,options:['Black'],price:0,available:true},
   {id:22,options:['Navy'],price:23500,available:false},
   {id:23,options:['Sand'],price:23500,available:true,requires_selling_plan:true},
   {id:24,options:['Dove'],price:23500,available:true,quantity_rule:{min:2,increment:1}}
  ]};
 const html=await render([product]);
 assert.match(html,/data-setup-options="2"/);
 const payload=html.match(/data-setup-product="2">([\s\S]*?)<\/script>/)[1];
 assert.doesNotMatch(payload,/<\/script>/);
 const data=JSON.parse(payload);
 assert.equal(data.title,product.title);
 assert.deepEqual(data.options,['Color']);
 assert.deepEqual(data.variants.map(v=>v.purchasable),[true,false,false,false,false]);
 assert.equal(data.variants[1].price,'');
 assert.equal(data.variants[0].price,'$235.00 CAD');
 assert.ok(JSON.parse(html.match(/data-setup-main>([\s\S]*?)<\/script>/)[1]));
});
test('restricted or incomplete product lists never receive inline selectors', async () => {
 const base={...item(2),available:true,has_only_default_variant:false,variants:[{id:20,options:['White'],price:10000,available:true},{id:21,options:['Black'],price:10000,available:true}]};
 for(const change of [{tags:['quote-only']},{available:false},{price_min:0},{requires_selling_plan:true},{'gift_card?':true},{variants:Array.from({length:51},(_,id)=>({id,price:10000,available:true}))}]) {
  const html=await render([{...base,...change}]);assert.doesNotMatch(html,/data-setup-options=/,JSON.stringify(change));
 }
});
