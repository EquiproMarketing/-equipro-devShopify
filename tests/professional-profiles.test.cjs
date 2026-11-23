const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {Liquid}=require('liquidjs');
const {render,profile,product,block,source}=require('./helpers/professional-profiles-render.cjs');
test('reference lists iterate product objects without supporting numeric lookup',async()=>{
 // Shopify reference-list contract: iterable resource drops, not a JS array.
 const items=[product(1,0),product(1,0),product(2),product(3),product(4),product(5),product(6)];
 const references={count:items.length,*[Symbol.iterator](){yield* items;}};
 const probe=new Liquid();
 assert.equal(await probe.parseAndRender('{{ refs[0].id }}',{refs:references}),'');
 assert.equal(await probe.parseAndRender('{% for p in refs limit: 3 %}{{ p.id }},{% endfor %}',{refs:references}),'1,1,2,');
 const html=await render({selected:[profile(1,'Spa',references)],blocks:[block('old','Legacy',[product(99)])]});
 assert.equal((html.match(/class="spa-pack-card[" ]/g)||[]).length,5);
 for(const id of [1,2,3,4,5])assert.match(html,new RegExp('href="/products/item-'+id+'"'));
 assert.equal((html.match(/href="\/products\/item-1"/g)||[]).length,1);
 assert.doesNotMatch(html,/item-6|item-99|\$0\.00/);
});
test('empty selection retains legacy profiles with duplicate names and cards removed',async()=>{
 const html=await render({blocks:[block('a','Spa',[product(1),product(1),product(2)]),block('b',' SPA '),block('c','Clinic')]});
 assert.match(html,/data-profile-source="legacy"/);assert.equal((html.match(/role="tab"/g)||[]).length,2);
 assert.equal((html.match(/href="\/products\/item-1"/g)||[]).length,1);assert.equal((html.match(/class="spa-pack-card[" ]/g)||[]).length,2);
});
test('selected active profiles preserve editorial order and replace rather than mix with blocks',async()=>{
 const p1=profile(1,'Clinic',[product(7)]),p2=profile(2,'Spa',[product(8)]);
 const html=await render({selected:[p2,p1],blocks:[block('legacy','Old',[product(99)])]});
 assert.match(html,/data-profile-source="metaobject"/);assert.ok(html.indexOf('>Spa</button>')<html.indexOf('>Clinic</button>'));
 assert.match(html,/data-profile-handle="profile-2"/);assert.doesNotMatch(html,/item-99|>Old</);
 assert.match(html,/Short Spa/);assert.match(html,/Description Clinic/);
});
test('draft, deleted, blank-name and wrong-type selections fall back to legacy',async()=>{
 const draft=profile(1,'Draft'),blank=profile(2,''),wrong={...profile(3,'Wrong'),system:{id:3,handle:'wrong',type:'other'}};
 const html=await render({selected:[draft,null,blank,wrong],active:[blank,wrong],blocks:[block('legacy','Existing')]});
 assert.match(html,/data-profile-source="legacy"/);assert.doesNotMatch(html,/>Draft<|>Wrong</);
});
test('deduplicates profile identities/names and product references within each profile',async()=>{
 const a=profile(1,'Spa',[product(1),product(1),product(2)]),sameName=profile(2,' SPA ');
 const html=await render({selected:[a,a,sameName]});assert.equal((html.match(/role="tab"/g)||[]).length,1);assert.equal((html.match(/href="\/products\/item-1"/g)||[]).length,1);
});
test('zero and mixed-zero prices are hidden while their product links remain',async()=>{
 const html=await render({selected:[profile(1,'Spa',[product(1,0),{...product(2,0),price_varies:true},{...product(3),price_varies:true}])]});
 assert.doesNotMatch(html,/\$0\.00|free/i);for(const id of [1,2,3])assert.match(html,new RegExp('href="/products/item-'+id+'"'));
 assert.match(html,/From \$235.00/);assert.equal((html.match(/class="spa-pack-card__price"/g)||[]).length,1);
});
test('product references are capped at six and invalid references never create empty links',async()=>{
 const html=await render({selected:[profile(1,'Spa',Array.from({length:8},(_,i)=>product(i+1)))]});assert.equal((html.match(/class="spa-pack-card[" ]/g)||[]).length,6);assert.doesNotMatch(html,/item-7|href=""/);
 const invalid=await render({selected:[profile(1,'Spa',[null,{id:1},product(2)])]});assert.match(invalid,/item-2/);assert.doesNotMatch(invalid,/href=""/);
});
test('related collections are real references, deduplicated; image references render safely',async()=>{
 const p=profile(1,'Spa');p.related_collections.value=[{id:1,title:'Stools',url:'/collections/stools'},{id:1,title:'Stools',url:'/collections/stools'},null];
 p.image={value:{media_type:'image',preview_image:{url:'profile.webp'}}};
 const html=await render({selected:[p]});assert.equal((html.match(/href="\/collections\/stools"/g)||[]).length,1);assert.match(html,/src="profile.webp"/);
});
test('tabs and panels have unique linked IDs, one tab stop, hidden inactive panels and escaped names',async()=>{
 const html=await render({selected:[profile(1,'<Spa>'),profile(2,'Clinic')]});
 assert.match(html,/&lt;Spa&gt;/);assert.match(html,/id="profile-tab-pilot-1"[\s\S]*?aria-controls="profile-panel-pilot-1" tabindex="0"/);
 assert.match(html,/id="profile-panel-pilot-2" role="tabpanel" aria-labelledby="profile-tab-pilot-2" tabindex="0" hidden/);
 assert.equal((html.match(/role="tab"[^>]*tabindex="0"/g)||[]).length,1);
});
test('empty data renders no empty section and Skip remains a separate optional catalog link',async()=>{
 assert.doesNotMatch(await render(),/<section/);
 const html=await render({blocks:[block('a','Spa')],settings:{show_explore_all:true,explore_all_label:'Skip / Explore all products'}});
 assert.match(html,/href="\/collections\/all" data-profile-skip/);assert.equal((html.match(/role="tab"/g)||[]).length,1);
 assert.doesNotMatch(await render({blocks:[block('a','Spa')]}),/data-profile-skip/);
});
test('section settings bind to the existing metaobject definition without creating records',()=>{
 const schema=JSON.parse(source.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]);
 const setting=schema.settings.find(x=>x.id==='professional_profiles');assert.equal(setting.type,'metaobject_list');assert.equal(setting.metaobject_type,'professional_profile');assert.equal(setting.limit,12);
 assert.doesNotMatch(source,/localStorage|sessionStorage|document\.cookie|fetch\(/);
});
module.exports={render,profile,product,block};
