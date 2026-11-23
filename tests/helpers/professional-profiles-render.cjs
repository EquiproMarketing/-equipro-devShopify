const fs=require('node:fs');
const {Liquid}=require('liquidjs');
const engine=new Liquid({root:['snippets'],extname:'.liquid'});
const locale=JSON.parse(fs.readFileSync('locales/en.default.json','utf8'));
engine.registerFilter('t',key=>{const value=key.split('.').reduce((v,k)=>v?.[k],locale);if(typeof value!=='string')throw new Error('Missing translation: '+key);return value;});
engine.registerTag('doc',{parse(tag,remain){while(remain.length){if(remain.shift().getText().trim()==='{% enddoc %}')break;}},render(){return '';}});
engine.registerFilter('asset_url',x=>x);engine.registerFilter('stylesheet_tag',x=>`<link rel="stylesheet" href="${x}">`);
engine.registerFilter('handleize',x=>String(x).trim().toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''));
engine.registerFilter('money',x=>`$${(x/100).toFixed(2)}`);
engine.registerFilter('image_url',(x,...args)=>x?.url||'image.webp');
engine.registerFilter('image_tag',x=>`<img src="${x}" width="800" height="600">`);
engine.registerFilter('placeholder_svg_tag',()=>'<svg></svg>');
const source=fs.readFileSync('sections/custom-spa-pack-builder.liquid','utf8');
const template=source.replace(/{% schema %}[\s\S]*?{% endschema %}/,'').replace(/<script>[\s\S]*?<\/script>/,'');
const product=(id,price=23500)=>({id,url:'/products/item-'+id,title:'Product '+id,price_min:price,type:'/PRODUITS/STOOLS',images:[]});
const profile=(id,name,products=[])=>({system:{id,handle:'profile-'+id,type:'professional_profile'},name:{value:name},short_description:{value:'Short '+name},description:{value:'Description '+name},featured_products:{value:products},related_collections:{value:[]}});
const block=(id,name,products=[])=>({id,type:'category_tab',settings:{tab_title:name,show_hero_card:true,hero_title:name,...Object.fromEntries(products.map((p,i)=>['product_'+(i+1),p]))}});
async function render({selected=[],active=selected,blocks=[],settings={}}={}) {
 const entries=Object.fromEntries(active.filter(Boolean).map(p=>[p.system.handle,p]));
 return engine.parseAndRender(template,{section:{id:'pilot',settings:{professional_profiles:selected,...settings},blocks},metaobjects:{professional_profile:entries},routes:{all_products_collection_url:'/collections/all'}});
}

module.exports={engine,render,profile,product,block,source};
