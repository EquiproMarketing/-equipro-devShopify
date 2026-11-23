const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {Liquid}=require('liquidjs');
const root=process.env.THEME_TEST_ROOT||'.';
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const locale=JSON.parse(read('locales/en.default.json').replace(/^\/\*[\s\S]*?\*\//,''));
function engine(currency='USD'){
 const e=new Liquid();e.registerFilter('asset_url',x=>x);e.registerFilter('stylesheet_tag',()=> '');e.registerFilter('image_url',()=> 'image.webp');e.registerFilter('json',x=>JSON.stringify(x??null));e.registerFilter('money',n=>`$${(n/100).toFixed(2)}`);e.registerFilter('money_with_currency',n=>`$${(n/100).toFixed(2)} ${currency}`);
 e.registerFilter('t',(key,...args)=>{let text=key.split('.').reduce((o,k)=>o?.[k],locale);assert.equal(typeof text,'string',key);return text.replace(/{{\s*(\w+)\s*}}/g,(_,k)=>Object.fromEntries(args)[k]);});
 e.registerTag('form',{parse(token,tokens){this.templates=[];const stream=this.liquid.parser.parseStream(tokens).on('tag:endform',()=>stream.stop()).on('template',t=>this.templates.push(t));stream.start();},async render(ctx,out){out.write('<form action="/cart/add">');out.write(await this.liquid.render(this.templates,ctx));out.write('</form>');}});
 return e;
}
const featured=read('sections/featured-collection.liquid').split('{% schema %}')[0].replace(/<script>[\s\S]*?<\/script>/,'');
const main=read('sections/main-product.liquid');
const restriction=main.match(/{% liquid\n    assign purchase_restricted[\s\S]*?%}/)[0];
const buybox=main.slice(main.indexOf('      <!-- BUY BOX -->'),main.indexOf('    <!-- RIGHT COLUMN'));
const data=main.match(/<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/)[1];
const script=main.match(/<script>\n  const productVariants[\s\S]*?<\/script>/)[0].replace(/<\/?script>/g,'');
function product(variants,extra={}){return {id:1,title:'Verified product',url:'/products/verified',price_min:Math.min(...variants.map(v=>v.price)),price_varies:new Set(variants.map(v=>v.price)).size>1,variants,selected_or_first_available_variant:variants[0],tags:[],collections:[],...extra};}
const v=(id,price,available=true)=>({id,price,available,title:'Option '+id,options:['Option '+id],option1:'Option '+id,sku:'SKU-'+id});
test('reference-backed cards use current context money and native URL, never saved prices; unbound/zero cards do not imply free',async()=>{
 for(const currency of ['USD','CAD']){
  const p=product([v(1,34500),v(2,36500)]);const html=await engine(currency).parseAndRender(featured,{section:{settings:{},blocks:[{type:'custom_card',settings:{product:p,title:'LFM',price:'CA$999,00',link:'/wrong'}}]},collections:{}});
  assert.match(html,/href="\/products\/verified"/);assert.ok(html.includes('From $345.00 '+currency));assert.doesNotMatch(html,/999|\/wrong/);
 }
 for(const p of [null,product([v(1,0)])]){
  const html=await engine().parseAndRender(featured,{section:{settings:{},blocks:[{type:'custom_card',settings:{product:p,title:'Infinity',price:'from CA$3,200.00'}}]},collections:{}});
  assert.match(html,/Price unavailable/);assert.doesNotMatch(html,/3,200|\$0\.00|href="#"/);
 }
});
test('server-rendered purchase states reject zero, sold-out, quote, portable and selling-plan-only products',async()=>{
 for(const [p,allowed] of [[product([v(1,0)]),false],[product([v(1,10000,false)]),false],[product([v(1,10000)],{tags:['RFQ']}),false],[product([v(1,10000)],{template_suffix:'quote'}),false],[product([v(1,10000)],{collections:[{handle:'portable'}]}),false],[product([v(1,10000)],{requires_selling_plan:true}),false],[product([v(1,10000)]),true]]){
  const html=await engine().parseAndRender(restriction+buybox,{target_product:p,section:{settings:{show_variant_selectors:false}},current_variant:p.variants[0]});
  const button=html.match(/<button type="submit"[^>]+>/)[0];assert.equal(!button.includes('disabled'),allowed);
  if(p.price_min===0){assert.match(html,/Price unavailable/);assert.doesNotMatch(html,/\$0\.00/);}
  assert.equal(/id="ProductVariantIdInput" value="1"/.test(html),allowed);
 }
});
test('variant switching and keyboard form submission cannot re-enable or submit a zero-priced/quote variant; paid selection still works',async()=>{
 for(const restricted of [false,true]){
  const p=product([v(1,10000),v(2,0),v(3,10000,false)],{tags:restricted?['quote-only']:[]});
  const context={target_product:p,current_variant:p.variants[0],section:{id:'test',settings:{}}};
  const rendered=await engine().parseAndRender(restriction+data,context);const variants=JSON.parse(rendered);let onSubmit;
  const id={value:'1'},button={},price={},select={value:'Option 1',dataset:{optionIndex:'0'},addEventListener(){}};
  const form={closest:()=>null,querySelector:()=>id,addEventListener(type,cb){onSubmit=cb;}};
  const document={getElementById:n=>n.startsWith('ProductVariantsJson')?{textContent:JSON.stringify(variants)}:n==='ProductVariantIdInput'?id:n==='AddToCartButton'?button:n==='ProductPriceContainer'?price:null,querySelector:()=>form,querySelectorAll:s=>s==='.product-variant-selector'?[select]:[]};
  const js=await engine().parseAndRender(script,context);const browser={document,Event:class{}};vm.runInNewContext(js,browser);
  function submit(){const event={prevented:false,stopped:false,preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.stopped=true;}};onSubmit(event);return event;}
  select.value='Option 2';browser.updateSelectedVariant();assert.equal(button.disabled,true);assert.equal(id.value,'');assert.equal(price.textContent,'Price unavailable');assert.equal(submit().prevented,true);
  id.value='2';assert.equal(submit().prevented,true);
  select.value='Option 3';browser.updateSelectedVariant();assert.equal(button.disabled,true);assert.equal(submit().prevented,true);
  select.value='Option 1';browser.updateSelectedVariant();assert.equal(button.disabled,restricted);assert.equal(submit().prevented,restricted);
 }
});
test('homepage mappings fix the three stale placements and LFM; Infinity links to the Admin-verified active Online Store product',()=>{
 const index=JSON.parse(read('templates/index.json').replace(/^\/\*[\s\S]*?\*\//,''));const blocks=index.sections.best_sellers.blocks;
 assert.equal(blocks.custom_card_rFaJei.settings.product,'skincare-equipment-stools-ergonomic-stool-with-backrest-31300');assert.equal(blocks.custom_card_3WjHXz.settings.product,'elite-spa-ei-508');assert.equal(blocks.custom_card_Kq4ak6.settings.product,'63203-lfm-magnifier-led-3d-or-5d');
 assert.equal(index.sections.hero_banner.blocks.slide_MnxhKP.settings.button_link,'shopify://products/skincare-equipment-stools-ergonomic-stool-with-backrest-31300');
 assert.ok(!blocks.custom_card_AjpNta.settings.product);assert.equal(blocks.custom_card_AjpNta.settings.link,'/products/ultra-comfort-20500-gm25t');assert.equal(blocks.custom_card_AjpNta.settings.price,'');
 assert.equal(Object.values(blocks).filter(b=>b.settings.product).length,10);
});
