const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=process.env.THEME_TEST_ROOT||'.';
const load=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8').replace(/^\/\*[\s\S]*?\*\//,''));
const protectedSettings=require('./helpers/technical-claims-protected.json');
test('claim corrections preserve technical tables, identity, section order, options, pricing references and safety fields',()=>{
 for(const [file,fields] of Object.entries(protectedSettings)){
  const data=load(file);
  for(const [field,value] of Object.entries(fields)){
   const actual=field.split('/').reduce((o,k)=>o[k],data);
   const normalize=x=>typeof x==='string'?x.replace(/&amp;/g,'&'):x;
   assert.deepEqual(normalize(actual),normalize(value),`${file}:${field}`);
  }
 }
});
test('model-specific neutral copy retains documented optics and heating range without physiological promises',()=>{
 const vis=load('templates/product.61402-visiderm.json').sections.main.settings;
 assert.match(vis.custom_description,/3-diopter/);assert.match(vis.custom_description,/six neon tubes/);assert.doesNotMatch(vis.custom_description,/dermal irregularities|sun damage|hydration imbalances/);
 const spa=load('templates/product.66007-spaslim-heating-blanket.json').sections.main_product_characteristics_Hp7Baq.blocks.faq_item_74hYTC.settings.answer;
 assert.match(spa,/30°C to 60°C/);assert.doesNotMatch(spa,/deep-tissue|therapeutic massage|body contouring/);
 const infra=load('templates/product.11300-infraderm.json').sections.main_product_characteristics_Hp7Baq.blocks.faq_item_mcpNpt.settings.answer;
 assert.match(infra,/purple, pink and indirect-massage electrodes/);assert.doesNotMatch(infra,/cellular recovery|antibacterial|erythema/);
});
test('category wording avoids blanket antimicrobial, circulation and safety promises',()=>{
 for(const file of ['templates/collection.json','templates/collection.streamers.json']){
  const feature=load(file).sections.why_category.blocks.feature_CFhXYt.settings;
  assert.equal(feature.item_title,'Operating instructions');assert.doesNotMatch(feature.item_text,/antibacterial|oxygenation|UV\/Ozone/);
 }
 const stools=load('templates/collection.stools.json').sections.faq.blocks.faq_item_8gidaT.settings.answer;
 assert.doesNotMatch(stools,/blood circulation|spine aligned|reduces tension/);
 const skin=load('templates/collection.skin-analyzer.json').sections.faq.blocks.faq_item_Gn3pgW.settings.answer;
 assert.match(skin,/model-specific operating and eye-protection instructions/);assert.doesNotMatch(skin,/completely safe|Yes, absolutely/);
});
