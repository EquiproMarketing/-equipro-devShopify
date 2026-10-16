const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { Liquid } = require('liquidjs');
const data = require('../assets/equipro-comparison-data.json');
const source = file => fs.readFileSync(file, 'utf8').replace(/{% schema %}[\s\S]*?{% endschema %}/g, '');
const engine = new Liquid({ root: 'snippets', extname: '.liquid' });
engine.registerTag('doc', { parse(token, tokens) { while (tokens.length && !tokens.shift().content?.includes('enddoc')) {} }, render() { return ''; } });
engine.registerFilter('image_url', x => x?.src || '');
engine.registerFilter('money', x => `$${(Number(x) / 100).toFixed(2)}`);

function product(id) {
  const p = data.products[id];
  return { id: Number(id), handle: p.handle, title: p.model, url: `/products/${p.handle}`, price: 10000, featured_media: { src: `${id}.jpg` }, selected_or_first_available_variant: { sku: p.model }, collections: [] };
}
async function renderModal(family, currentId, ids) {
  const products = ids.map(product);
  return engine.parseAndRender(source('sections/product-compare-modal.liquid'), {
    product: product(currentId), section: { settings: { heading: 'Technical Model Comparison', compare_collection: '' } },
    collections: { [family]: { products } }
  });
}
test('the original modal controls, table, selection limit, and opening behavior remain', async () => {
  const ids = Object.entries(data.products).filter(([, p]) => p.family === 'stools').map(([id]) => id);
  const html = await renderModal('stools', ids[0], ids);
  assert.match(html, /id="CustomCompareModal"/);
  assert.match(html, /id="CloseCompareModal"/);
  assert.match(html, /id="CloseCompareModalFooter"/);
  assert.match(source('sections/main-product.liquid'), /id="OpenCompareModal"/);
  assert.match(html, /class="compare-table"/);
  assert.match(html, /This Model/);
  assert.equal((html.match(/class="compare-product-title"/g) || []).length, 4);
  assert.match(html, /modal\.style\.display = 'flex'/);
  assert.doesNotMatch(html, /<equipro-comparison|Show differences only|comparison-slot/);
});
test('stool and trolley tables contain verified family rows and preserve PDF dimension order', async () => {
  const stools = Object.entries(data.products).filter(([, p]) => p.family === 'stools').map(([id]) => id);
  const trolleys = Object.entries(data.products).filter(([, p]) => p.family === 'trolleys').map(([id]) => id);
  const stoolHtml = await renderModal('stools', stools[0], stools);
  const trolleyHtml = await renderModal('trolleys', trolleys[0], trolleys);
  assert.match(stoolHtml, /Height range/);
  assert.match(stoolHtml, /Adjustment mechanism/);
  assert.match(stoolHtml, /20\.5–27\.5 in/);
  assert.match(stoolHtml, /Not confirmed/);
  assert.doesNotMatch(stoolHtml, /Shelf spacing/);
  assert.match(trolleyHtml, /Shelf dimensions/);
  assert.match(trolleyHtml, /Electrical outlets/);
  assert.match(trolleyHtml, /14 × 25 × 33\.5 in/);
  assert.doesNotMatch(trolleyHtml, /Seat shape/);
});
test('six stools and eight storage trolleys remain mapped without merging EI or 51103-M identities', () => {
  const products = Object.values(data.products);
  assert.equal(products.filter(p => p.family === 'stools').length, 6);
  assert.equal(products.filter(p => p.family === 'trolleys').length, 8);
  for (const p of products) assert.ok(!/manicure|make-up|infinity/i.test(p.handle));
  assert.equal(products.find(p => p.model === 'EI-311').specs.warranty, '1 year');
  assert.equal(products.find(p => p.model === '31100').specs.warranty, '2 years');
  assert.equal(products.find(p => p.model === 'EI-312').specs.height, '20.5–28 in');
  const mini = products.find(p => p.handle === '51103-tm-3-mini');
  assert.match(mini.identityQuestion, /51103-M/);
  assert.ok(Object.values(mini.specs).every(v => v === null));
  assert.equal(products.find(p => p.model === '51000').specs.dimensions, '15 × 25.5 × 54.5 in');
});
