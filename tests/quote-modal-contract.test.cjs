const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const layout = fs.readFileSync('layout/theme.liquid', 'utf8');
const header = fs.readFileSync('sections/header.liquid', 'utf8');
const snippet = fs.readFileSync('snippets/quote-modal.liquid', 'utf8');
const quoteScript = fs.readFileSync('assets/quote-modal.js', 'utf8');
const headerScript = header.match(/<script>[\s\S]*?<\/script>/)?.[0];
const baselineHeader = fs.readFileSync('docs/tr02a2-main-snapshot/sections/header.liquid', 'utf8');
const baselineHeaderScript = baselineHeader.match(/<script>[\s\S]*?<\/script>/)?.[0];

test('Quote modal is rendered once and preserves the R1.10-V native contact fields', () => {
  assert.equal((layout.match(/{%\s*render\s+['"]quote-modal['"]\s*%}/g) || []).length, 1);
  assert.doesNotMatch(header, /render\s+['"]quote-modal['"]/);
  assert.match(snippet, /{%\s*form\s+'contact',\s*id:\s*'QuoteForm'/);
  for (const field of [
    'contact[Requested_Product]', 'contact[Variant]', 'contact[SKU]', 'contact[Name]',
    'contact[Company]', 'contact[email]', 'contact[Phone]', 'contact[Quantity]', 'contact[body]'
  ]) assert.ok(snippet.includes(`name="${field}"`), `Missing native quote field ${field}`);
  for (const field of ['QuoteName', 'QuoteCompany', 'QuoteEmail', 'QuotePhone']) {
    assert.match(snippet, new RegExp(`id="${field}"[^>]*required`));
  }
  assert.match(snippet, /name="contact\[Quantity\]" min="1" value="1"(?![^>]*required)/);
  assert.match(quoteScript, /QuoteModal/);
  assert.equal(headerScript, baselineHeaderScript, 'Header must preserve MAIN mobile-nav and Quote focus/scroll handoff');
  assert.match(headerScript, /navigationReady/);
  assert.match(headerScript, /equipro:quote-menu-release/);
  assert.match(headerScript, /desktopTransition/);
});
