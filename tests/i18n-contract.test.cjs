const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const locales = {
  en: JSON.parse(fs.readFileSync('locales/en.default.json', 'utf8')),
  fr: JSON.parse(fs.readFileSync('locales/fr.json', 'utf8'))
};

function flatten(value, prefix = '', output = {}) {
  for (const [key, child] of Object.entries(value)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object' && !Array.isArray(child)) flatten(child, fullKey, output);
    else output[fullKey] = child;
  }
  return output;
}

function structure(value, prefix = '', output = {}) {
  for (const [key, child] of Object.entries(value)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === 'object' && !Array.isArray(child)) {
      output[fullKey] = Object.keys(child).sort();
      structure(child, fullKey, output);
    } else output[fullKey] = 'string';
  }
  return output;
}

function translationKeysInTheme() {
  const keys = new Set();
  for (const folder of ['layout', 'sections', 'snippets', 'templates']) {
    for (const file of fs.readdirSync(folder, { recursive: true })) {
      const target = path.join(folder, file.toString());
      if (!target.endsWith('.liquid')) continue;
      const text = fs.readFileSync(target, 'utf8');
      for (const match of text.matchAll(/['"]([\w.-]+)['"]\s*\|\s*t\b/g)) keys.add(match[1]);
    }
  }
  return keys;
}

test('EN and FR locales have matching keys, interpolation variables, and plural forms', () => {
  const en = flatten(locales.en);
  const fr = flatten(locales.fr);
  assert.equal(Object.keys(en).length, 311);
  assert.deepEqual(Object.keys(fr).sort(), Object.keys(en).sort());
  assert.deepEqual(structure(locales.fr), structure(locales.en));
  const placeholders = value => [...value.matchAll(/{{\s*([^{}]+?)\s*}}/g)].map(match => match[1]).sort();
  for (const key of Object.keys(en)) {
    assert.deepEqual(placeholders(fr[key]), placeholders(en[key]), `Interpolation mismatch: ${key}`);
  }
  assert.deepEqual(Object.keys(locales.en.comparison.count).sort(), ['one', 'other']);
  assert.deepEqual(Object.keys(locales.fr.comparison.count).sort(), ['one', 'other']);
  assert.deepEqual(Object.keys(locales.en.setup_filters.count).sort(), ['one', 'other']);
  assert.deepEqual(Object.keys(locales.fr.setup_filters.count).sort(), ['one', 'other']);
});

test('every static Liquid translation key exists in English and French', () => {
  for (const key of translationKeysInTheme()) {
    for (const [localeName, locale] of Object.entries(locales)) {
      const value = key.split('.').reduce((node, part) => node && node[part], locale);
      assert.ok(value !== undefined, `${localeName} is missing ${key}`);
    }
  }
});
