const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {engine,profile,product}=require('./helpers/professional-profiles-render.cjs');
const source=fs.readFileSync('sections/find-your-setup.liquid','utf8');
const template=source.replace(/{% schema %}[\s\S]*?{% endschema %}/,'');
const defaults=Object.fromEntries(JSON.parse(source.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]).settings.map(x=>[x.id,x.default]));
const specialtyKey='filter.p.m.custom.professional_profiles', categoryKey='filter.p.m.custom.setup_category';
const value=(label,active=false,count=1)=>({label,active,count,value:label,url_to_add:'/collections/all?native=add&sort_by=price-ascending',url_to_remove:'/collections/all?native=remove&sort_by=price-ascending'});
const facet=(param_name,values)=>({param_name,type:'list',values,active_values:values.filter(x=>x.active)});
async function render(filters=[],options={}){
 return engine.parseAndRender(template,{collection:{handle:'all',url:'/collections/all',products_count:6,sort_by:'price-ascending',filters,...options},section:{id:'catalog-test',settings:defaults}});
}
test('unavailable or partially configured filters show an honest state with no recommendation panels or filter controls',async()=>{
 for(const filters of [[],[facet(specialtyKey,[value('Spa')])],[facet(categoryKey,[value('seating')])]]){
  const html=await render(filters);
  assert.match(html,/data-filter-state="unavailable"/);assert.match(html,/Specialty filtering is not available yet/);
  assert.doesNotMatch(html,/<fieldset|role="tab"|role="tabpanel"|spa-pack-card|professional-profile-panel|<script/);
  assert.match(html,/href="\/collections\/all\?sort_by=price-ascending"/);
 }
});
test('native specialty values render first; category controls wait for a native active specialty',async()=>{
 const html=await render([facet(specialtyKey,[value('Spa & Esthetics',false,6)]),facet(categoryKey,[value('facial-equipment',false,3)])]);
 assert.match(html,/Spa &amp; Esthetics/);assert.match(html,/\(6\)/);assert.match(html,/native=add&amp;sort_by=price-ascending/);
 assert.doesNotMatch(html,/<legend>Equipment category/);assert.match(html,/Choose a specialty/);
});
test('active specialty exposes contextual category counts and exact Shopify removal/addition URLs',async()=>{
 const html=await render([facet(specialtyKey,[value('Spa',true,6)]),facet(categoryKey,[value('facial-equipment',true,3),value('seating',false,1)])]);
 assert.match(html,/<legend>Equipment category/);assert.match(html,/Facial equipment/);assert.match(html,/\(3\)/);
 assert.match(html,/native=remove&amp;sort_by=price-ascending/);assert.match(html,/native=add&amp;sort_by=price-ascending/);
 assert.match(html,/Clear all — Explore all products/);assert.match(html,/role="status">6 products/);
 assert.match(html,/aria-label="Facial equipment: selected. Remove filter"/);
});
test('zero-result values are not selectable while active zero-result filters remain removable',async()=>{
 const html=await render([facet(specialtyKey,[value('Spa',true,0),value('No matches',false,0)]),facet(categoryKey,[value('seating',false,0),value('service-tables',true,0)])],{products_count:0});
 assert.equal((html.match(/aria-disabled="true"/g)||[]).length,2);assert.match(html,/Service tables: selected. Remove filter/);
 assert.match(html,/role="status">0 products/);assert.match(html,/Clear all/);
});
test('a category left active after removing a specialty remains visible and removable',async()=>{
 const html=await render([facet(specialtyKey,[value('Spa',false,6)]),facet(categoryKey,[value('seating',true,1)])]);
 assert.match(html,/<legend>Equipment category/);assert.match(html,/Seating: selected. Remove filter/);
 assert.match(html,/Clear all/);assert.doesNotMatch(html,/Choose a specialty/);
});
test('clear-all discards filter/page state and retains sorting, including an unavailable-filter state',async()=>{
 for(const sort_by of ['title-descending','price-ascending','']){
  const html=await render([],{sort_by,default_sort_by:''});
  assert.match(html,new RegExp('href="/collections/all'+(sort_by?'\\?sort_by='+sort_by:'')+'"'));
  assert.doesNotMatch(html,/href="[^"]*(?:page=|filter\.)/);
 }
 assert.equal((await render([],{handle:'stools'})).trim(),'');
});
const english=JSON.parse(fs.readFileSync('locales/en.default.json','utf8').replace(/^\/\*[\s\S]*?\*\//,''));
engine.registerFilter('t',(key,...args)=>{
 const vars=Object.fromEntries(args);let text=key.split('.').reduce((o,k)=>o?.[k],english);
 assert.ok(text,`Missing English translation: ${key}`);
 if(typeof text==='object')text=text[Number(vars.count)===1?'one':'other'];
 return text.replace(/{{\s*(\w+)\s*}}/g,(_,k)=>vars[k]);
});
engine.registerFilter('default_pagination',x=>x.pages>1?'<a href="?page=2">Next</a>':'');
let testPage=1;
engine.registerTag('paginate',{
 parse(token,tokens){[this.path,this.size]=token.args.split(' by ');this.templates=[];const stream=this.liquid.parser.parseStream(tokens).on('tag:endpaginate',()=>stream.stop()).on('template',t=>this.templates.push(t));stream.start();},
 async render(ctx,emitter){const products=await this.liquid.evalValue(this.path,ctx),collection=ctx.get(['collection']),page=ctx.get(['current_page'])||testPage,size=Number(this.size);ctx.push({collection:{...collection,products:products.slice((page-1)*size,page*size)},paginate:{pages:Math.ceil(products.length/size),current_page:page}});try{emitter.write(await this.liquid.render(this.templates,ctx));}finally{ctx.pop();}}
});
const catalogSource=fs.readFileSync('sections/custom-product-treatment.liquid','utf8');
const catalogTemplate=catalogSource.replace(/{% schema %}[\s\S]*?{% endschema %}/,'');
test('the all-products route uses all products across 24/24/1 pages and never the fixed featured collection',async()=>{
 const products=Array.from({length:49},(_,i)=>product(i+1,i===0?0:23000));
 for(const [page,count] of [[1,24],[2,24],[3,1]]){
  testPage=page;
  const html=await engine.parseAndRender(catalogTemplate,{request:{page_type:'collection'},collection:{handle:'all',products},section:{id:'test',settings:{featured_collection:{products:[product(999)]}},blocks:[]},current_page:page});
  assert.equal((html.match(/class="custom-treatment-card__title"/g)||[]).length,count);
  assert.doesNotMatch(html,/item-999|\$0\.00/);assert.match(html,/data-full-catalog/);
 }
});
test('non-catalog collections retain their configured featured products and shared AJAX script',async()=>{
 const featured={...product(999),selected_or_first_available_variant:{id:9,available:true}};
 const html=await engine.parseAndRender(catalogTemplate,{request:{page_type:'collection'},collection:{handle:'stools',products:[product(1)]},section:{id:'test',settings:{featured_collection:{products:[featured]}},blocks:[]}});
 assert.doesNotMatch(html,/data-full-catalog/);assert.match(html,/item-999/);
 // Compare the executable script to MAIN, allowing only the approved translated strings and indentation.
 const baselineSource=fs.readFileSync(path.join('docs/tr02a2-main-snapshot','sections/custom-product-treatment.liquid'),'utf8');
 const extractScript=source=>source.match(/<script>[\s\S]*?<\/script>/)[0].trim().split('\n').map(line=>line.trim()).join('\n');
 const baselineScript=extractScript(baselineSource);
 const localizedScript=extractScript(catalogSource)
  .replace("{{ 'cart.uncertain_add' | t | json }}", "'Check cart before adding again'")
  .replace("{{ 'cart.added' | t | json }}", "'Added! ✓'");
 assert.equal(localizedScript,baselineScript);
});
test('catalog section never loads the retired selector script or shared recommendation panels',()=>{
 assert.doesNotMatch(template,/<script|professional-profile-panel|custom-spa-pack-builder.css|localStorage|sessionStorage|cookie|fetch\(/);
 assert.doesNotMatch(template,/Digipro|Infraderm|Rotoderm|Ioniderm|EI-312|TM-3/);
 assert.doesNotMatch(template,/for product|collection.products[^_]/);
});
