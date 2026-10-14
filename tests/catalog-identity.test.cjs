const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { Liquid } = require('liquidjs');
const engine = new Liquid();
engine.registerFilter('asset_url', x => x);
engine.registerFilter('stylesheet_tag', x => `<link href="${x}">`);
engine.registerFilter('image_url', x => x?.src || '');
engine.registerFilter('money', x => `$${(Number(x) / 100).toFixed(2)}`);
engine.registerFilter('money_with_currency', x => `$${(Number(x) / 100).toFixed(2)} USD`);
engine.registerFilter('json', x => JSON.stringify(x ?? null));
engine.registerFilter('t', x => ({ 'collections.no_products': 'No products in this collection.', 'collections.pagination': 'Collection pages' }[x] || x));
engine.registerFilter('default_pagination', x => x.pages > 1 ? `<a href="?page=${Math.min(x.pages, x.current_page + 1)}">Next page</a>` : '');
// Shopify-specific tags use a local adapter; live pagination is checked separately.
engine.registerTag('paginate', {
  parse(token, tokens) {
    [this.path, this.size] = token.args.split(' by ');
    this.templates = [];
    const stream = this.liquid.parser.parseStream(tokens)
      .on('tag:endpaginate', () => stream.stop())
      .on('template', template => this.templates.push(template));
    stream.start();
  },
  async render(ctx, emitter) {
    const products = await this.liquid.evalValue(this.path, ctx);
    const collection = ctx.get(['collection']);
    const page = ctx.get(['current_page']) || 1;
    const size = Number(this.size);
    ctx.push({ collection: { ...collection, products: products.slice((page - 1) * size, page * size) }, paginate: { pages: Math.ceil(products.length / size), current_page: page } });
    try { emitter.write(await this.liquid.render(this.templates, ctx)); } finally { ctx.pop(); }
  }
});
function source(file) {
  return fs.readFileSync(file, 'utf8').replace(/{% schema %}[\s\S]*?{% endschema %}/g, '').replace(/{% stylesheet %}[\s\S]*?{% endstylesheet %}/g, '')
    .replace(/{% form 'product', target_product %}/g, '<form data-product-id="{{ target_product.id }}">').replace(/{% endform %}/g, '</form>');
}
function product(id, available = true) {
  const image = { src: `image-${id}.jpg`, alt: `Product ${id}` };
  const variant = { id: id * 10, title: 'Red', price: id * 100, available, options: ['Red'], option1: 'Red', image };
  return { id, title: `Product ${id}`, description: `<p>Description ${id}</p>`, available: true, has_only_default_variant: false, images: [image], featured_image: image, collections: [], selected_or_first_available_variant: variant, options_with_values: [{ name: 'Color', selected_value: 'Red', values: ['Red'] }], variants: [variant] };
}
async function renderProduct(visited, featured = '', settings = {}, blocks = []) {
  return engine.parseAndRender(source('sections/main-product.liquid'), { product: visited, section: { id: 'test', settings: { featured_product: featured, show_variant_selectors: true, ...settings }, blocks } });
}
test('visited product wins over a different featured product and foreign overrides', async () => {
  const a = product(1), b = product(2);
  const html = await renderProduct(a, b, { custom_title: 'Foreign title', custom_description: 'Foreign description' }, [{ type: 'gallery_image', settings: { image: b.featured_image } }]);
  assert.match(html, /Product 1/); assert.match(html, /Description 1/);
  assert.match(html, /data-product-id="1"/); assert.match(html, /id="ProductVariantIdInput" value="10"/);
  assert.match(html, /image-1.jpg/); assert.match(html, /\$1.00/);
  assert.doesNotMatch(html, /Foreign title|Foreign description|image-2.jpg|value="20"/);
});
test('featured product remains the fallback outside a product page', async () => {
  assert.match(await renderProduct(null, product(2)), /data-product-id="2"/);
});
test('specific product editorial overrides remain when target matches', async () => {
  const p = product(1); const html = await renderProduct(p, p, { custom_title: 'Editorial title', custom_description: '<p>Editorial description</p>' });
  assert.match(html, /Editorial title/); assert.match(html, /Editorial description/);
});
test('initial selected sold-out variant disables purchase even when another variant is available', async () => {
  const html = await renderProduct(product(1, false));
  assert.match(html, /id="AddToCartButton" disabled/); assert.match(html, /OUT OF STOCK/);
});
test('Portables collection membership suppresses the purchase form regardless of stock', async () => {
  const p = product(1); p.collections = [{ handle: 'portable' }];
  const html = await renderProduct(p);
  assert.doesNotMatch(html, /id="ProductVariantIdInput"|id="AddToCartButton"/);
  assert.match(html, /Product 1/);
});
test('variant changes send the matching ID; nonexistent combinations clear the previous ID', async () => {
  const p = product(1); p.variants.push({ ...p.variants[0], id: 11, options: ['Blue'], option1: 'Blue', available: false, price: 200 });
  const html = await renderProduct(p);
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  const selector = { value: 'Blue', dataset: { optionIndex: '0' }, addEventListener() {} };
  const controls = { ProductVariantIdInput: { value: 10 }, AddToCartButton: { disabled: false }, ProductPriceContainer: {}, MainProductImg: {} };
  controls['ProductVariantsJson-1'] = { textContent: html.match(/id="ProductVariantsJson-1">([\s\S]*?)<\/script>/)[1] };
  const ctx = { document: { querySelectorAll: () => [selector], getElementById: id => controls[id] } };
  vm.runInNewContext(scripts.at(-1)[1], ctx);
  ctx.updateSelectedVariant(); assert.equal(controls.ProductVariantIdInput.value, 11); assert.equal(controls.AddToCartButton.disabled, true);
  selector.value = 'Missing'; ctx.updateSelectedVariant(); assert.equal(controls.ProductVariantIdInput.value, ''); assert.equal(controls.AddToCartButton.disabled, true);
  selector.value = 'Red'; ctx.updateSelectedVariant(); assert.equal(controls.ProductVariantIdInput.value, 10); assert.equal(controls.AddToCartButton.disabled, false);
});
test('empty visited collection shows the empty message and no fabricated cards', async () => {
  const html = await engine.parseAndRender(source('sections/main-collection-product-grid.liquid'), { collection: { title: 'Empty', products: [] }, section: { id: 'test', settings: { btn_primary_text: 'Ver producto' } } });
  assert.match(html, /No products in this collection/); assert.doesNotMatch(html, /TM-3|CA\$375|custom-treatment-card__title/);
});
test('a 49-product visited collection has three distinct pages and neutral links', async () => {
  const products = Array.from({ length: 49 }, (_, i) => ({ ...product(i + 1), url: `/products/product-${i + 1}` }));
  const collection = { title: 'Visited catalog', products };
  const section = { id: 'test', settings: { featured_collection: { products: [product(999)] }, btn_primary_text: 'Ver producto', btn_secondary_text: '' } };
  for (const [page, first, last, count] of [[1,1,24,24],[2,25,48,24],[3,49,49,1]]) {
    const html = await engine.parseAndRender(source('sections/main-collection-product-grid.liquid'), { collection, section, current_page: page });
    assert.equal((html.match(/class="custom-treatment-card__title"/g) || []).length, count);
    assert.match(html, new RegExp(`href="/products/product-${first}"`)); assert.match(html, new RegExp(`href="/products/product-${last}"`));
    assert.match(html, /Collection pages/); assert.match(html, /Ver producto/); assert.doesNotMatch(html, /Product 999|Acheter/);
  }
});

test('Royal-style purchase area shows explicit currency and preserves existing image alt', async () => {
  const p = product(1); p.featured_image.alt = 'Original Royal image alt';
  const html = await renderProduct(p, p, { show_currency: true, purchase_note: '<p>Contact us for other upholstery colors.</p>' });
  assert.match(html, /\$1.00 USD/); assert.match(html, /Original Royal image alt/);
  assert.match(html, /Contact us for other upholstery colors/); assert.match(html, /id="AddToCartButton"/);
});

test('product detail blocks are isolated to their configured product', async () => {
 const section = { id: 'pilot', settings: { applies_to_product: product(1), heading: 'Royal details', layout: 'faq' }, blocks: [{ settings: { title: 'Royal question', text: '<p>Royal answer</p>' } }] };
 const render = p => engine.parseAndRender(source('sections/product-details.liquid'), { product: p, section });
 assert.match(await render(product(1)), /Royal question/);
 assert.doesNotMatch(await render(product(2)), /Royal question|Royal answer|Royal details/);
});

test('Royal separates the source section hierarchy and retains seven product-specific FAQs', () => {
 const pilot = JSON.parse(fs.readFileSync('templates/product.royal-pilot.json', 'utf8'));
 assert.deepEqual(pilot.order, ['main', 'overview', 'features', 'instructions', 'safety', 'faq']);
 assert.equal(pilot.sections.overview.settings.layout, 'overview');
 assert.equal(pilot.sections.overview.blocks.item_10.settings.group, 'use');
 assert.equal(pilot.sections.instructions.settings.layout, 'steps');
 assert.equal(pilot.sections.faq.block_order.length, 7);
 for (const [id, section] of Object.entries(pilot.sections)) if (id !== 'main') assert.equal(section.settings.applies_to_product, 'ei-501-royal');
});
test('overview renders uses as accordions and specifications as a semantic table', async () => {
 const section = { id: 'overview', settings: { heading: 'Specs and uses', secondary_heading: 'Professional uses', layout: 'overview', applies_to_product: product(1) }, blocks: [
  { settings: { title: 'Model', text: '<p>Royal EI-501</p>', group: 'specification' } },
  { settings: { title: 'Massage', text: '<p>Body treatment positioning</p>', group: 'use' } }
 ] };
 const html = await engine.parseAndRender(source('sections/product-details.liquid'), { product: product(1), section });
 assert.match(html, /<summary>Massage<\/summary>/);
 assert.match(html, /<th scope="row">Model<\/th>/);
 assert.match(html, /<caption/);
 assert.doesNotMatch(html, /<th scope="row">Massage/);
});
