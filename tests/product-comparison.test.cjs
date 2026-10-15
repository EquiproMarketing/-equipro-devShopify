const { test } = require('node:test');
const assert = require('node:assert/strict');
const { selectProduct, visibleRows } = require('../assets/equipro-comparison.js');
const data = require('../assets/equipro-comparison-data.json');
test('three slots allow add, replace and remove, including the initial product', () => {
 const ids=['a','b','c','d'];
 let slots=['a','',''];
 slots=selectProduct(slots,1,'b',ids); slots=selectProduct(slots,2,'c',ids);
 assert.deepEqual(slots,['a','b','c']);
 slots=selectProduct(slots,1,'d',ids); assert.deepEqual(slots,['a','d','c']);
 slots=selectProduct(slots,0,'',ids); assert.deepEqual(slots,['','d','c']);
});
test('duplicates, unrelated IDs and a fourth slot cannot enter a comparison', () => {
 const slots=['a','b','c'], ids=['a','b','c','d'];
 assert.equal(selectProduct(slots,1,'a',ids),slots);
 assert.equal(selectProduct(slots,1,'foreign',ids),slots);
 assert.equal(selectProduct(slots,3,'d',ids),slots);
});
test('unknown does not mean No or equality; empty rows are omitted', () => {
 const items=[{specs:{same:'2 years',unknown:null,diff:'Round',missing:null,na:'not_applicable'}},{specs:{same:'2 years',unknown:'Yes',diff:'Contoured',missing:null,na:'Yes'}}];
 assert.deepEqual(visibleRows(['same','unknown','diff','missing','na'],items,true),['unknown','diff','na']);
 assert.deepEqual(visibleRows(['same','unknown','diff','missing'],items,false),['same','unknown','diff']);
});
test('pilot scope has six unique stools and eight unique storage trolleys with primary-source provenance', () => {
 const products=Object.values(data.products);
 assert.equal(products.filter(p=>p.family==='stools').length,6);
 assert.equal(products.filter(p=>p.family==='trolleys').length,8);
 assert.equal(new Set(products.map(p=>p.model)).size,14);
 for(const p of products){assert.ok(p.sourcePage);assert.ok(p.specs.warranty);assert.ok(!/manicure|make-up|infinity/.test(p.handle));}
 assert.equal(products.find(p=>p.model==='EI-311').specs.warranty,'1 year');
 assert.equal(products.find(p=>p.model==='51104').specs.spacing,'Top–middle: 9.75 in; middle–bottom: 10 in');
 assert.equal(products.find(p=>p.model==='51000').specs.dimensions,'25.5 × 15 × 54.5 in');
});
