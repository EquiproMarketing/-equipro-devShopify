const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const code=fs.readFileSync('sections/complete-your-setup.liquid','utf8').match(/{% javascript %}([\s\S]*?){% endjavascript %}/)[1];
function fixture() {
 let Component;
 const document={body:{style:{overflow:''}},getElementById:id=>id==='ProductVariantIdInput'?{value:'11'}:id==='CartFeedback'?{textContent:'Only one unit available.'}:null,createElement:tag=>node(tag)};
 function node(tag='div') {return {tag,children:[],style:{},dataset:{},textContent:'',value:'',hidden:false,disabled:false,append(...kids){this.children.push(...kids);},replaceChildren(){this.children=[];},focus(){document.activeElement=this;},setAttribute(k,v){this[k]=v;},removeAttribute(k){delete this[k];},getClientRects(){return [1];}};}
 const browserWindow={Shopify:{routes:{root:'/fr/'}}};
 vm.runInNewContext(code,{customElements:{get(){},define(_,c){Component=c;}},HTMLElement:class{},window:browserWindow,document,requestAnimationFrame:fn=>fn(),setTimeout:()=>1,clearTimeout(){}});
 const component=new Component();
 return {Component,component,document,node,browserWindow};
}
const main={options:['Couleur'],variants:[{id:10,options:['White']},{id:11,options:[' Black ']}]};
const product={id:2,title:'Stool',url:'/products/stool',image:'white.webp',options:['Color'],variants:[{id:20,options:['White'],image:'white.webp',price:'$235 USD',available:true,purchasable:true},{id:21,options:['Black'],image:'black.webp',price:'$235 USD',available:true,purchasable:true}]};
test('color suggestion follows the current main variant and only normalized exact colors',()=>{
 const {Component}=fixture();
 assert.equal(Component.suggestedOptions(main,11,product)[0],'Black');
 assert.equal(Component.suggestedOptions(main,10,product)[0],'White');
 assert.equal(Component.normalize('  ＷＨＩＴＥ  '),'white');
 const noMatch={options:['Color'],variants:[{id:11,options:['Navy Blue']}]};
 assert.equal(Component.suggestedOptions(noMatch,11,product)[0],'');
 assert.equal(Component.suggestedOptions(main,999,product)[0],'');
 assert.equal(Component.suggestedOptions({...main,options:['Finish']},11,product)[0],'');
});
test('a color suggestion never guesses size or ambiguous normalized colors',()=>{
 const {Component}=fixture();
 const multi={...product,options:['Color','Size'],variants:[{id:20,options:['Black','Small']},{id:21,options:['Black','Large']}]};
 assert.deepEqual(Array.from(Component.suggestedOptions(main,11,multi)),['Black','']);
 const ambiguous={...product,variants:[{id:20,options:['Black']},{id:21,options:[' black ']}]};
 assert.equal(Component.suggestedOptions(main,11,ambiguous)[0],'');
});
test('selection requires every exact option; impossible combinations never resolve',()=>{
 const {Component}=fixture();
 assert.equal(Component.selectedVariant(product,['']),null);
 assert.equal(Component.selectedVariant(product,['black']),null);
 assert.equal(Component.selectedVariant(product,['Black']).id,21);
 const multi={options:['Color','Size'],variants:[{id:1,options:['White','Small']},{id:2,options:['Black','Large']}]};
 assert.equal(Component.selectedVariant(multi,['Black','Small']),null);
 assert.equal(Component.selectedVariant(multi,['Black','']),null);
});
function inlineFixture() {
 const f=fixture(),{component:c,node}=f;
 const e=Object.fromEntries(['suggestion','options','availability','message','error','add','refresh','text','spinner','price','image'].map(k=>[k,node()]));
 e.add.dataset={addedLabel:'Added! ✓'};e.add.querySelector=s=>s==='.btn-text'?e.text:e.spinner;e.text.textContent='Add to cart';
 e.price.textContent='$235 USD';
 const panel={dataset:{suggestionLabel:'Suggested:',selectLabel:'Select an option',instockLabel:'Available',soldoutLabel:'Unavailable',detailsLabel:'View details',acceptedLabel:'Added. Refresh display.'},querySelector:s=>e[s.replace('[data-inline-','').replace(']','').replace('[data-setup-refresh','refresh')],querySelectorAll:()=>e.options.children.filter(n=>n.tag==='select')};
 panel.querySelector=s=>s==='[data-setup-refresh]'?e.refresh:e[s.replace('[data-inline-','').replace(']','')];
 const card={querySelector:s=>s==='[data-setup-product]'?{textContent:JSON.stringify(product)}:s==='.spa-pack-card__price'?e.price:e.image};
 const trigger=node('summary');
 const details={id:'Options-test',open:true,closest:()=>card,querySelector:s=>s==='summary'?trigger:panel};
 e.add.closest=()=>details;e.refresh.closest=()=>details;
 c.cartReady=true;c.querySelector=()=>({textContent:JSON.stringify({...main,selectedVariantId:10})});
 c.querySelectorAll=s=>s==='details[data-setup-options]'?[details]:[e.add];
 return {...f,c,e,panel,card,trigger,details};
}
function cartFor(f,reject=false) {
 const calls=[];
 const cart={pending:false,unsynced:false,errorMessage:()=> 'Cart error',async run(work,recovery=false) {
  if(this.pending||this.unsynced&&!recovery)return false;
  this.pending=true;f.e.add.disabled=true;
  try {await work();return true;}catch(e){this.unsynced=true;return false;}
  finally {this.pending=false;f.e.add.disabled=false;}
 },async request(url,options){calls.push({url,body:JSON.parse(options.body)});if(reject)throw new Error('Only one unit available.');return {id:21};},async refreshDrawer(){this.unsynced=false;this.refreshed=true;},open(trigger){this.trigger=trigger;}};
 f.browserWindow.cartDrawer=cart;return {cart,calls};
}
test('inline expansion suggests current color and updates card price/image without focus or cart mutation',()=>{
 const f=inlineFixture();const {calls}=cartFor(f);f.c.openOptions(f.details);
 assert.equal(f.document.activeElement,undefined);assert.equal(f.document.body.style.overflow,'');
 assert.equal(f.e.options.children.find(n=>n.tag==='select').value,'Black');
 assert.equal(f.e.price.textContent,'$235 USD');assert.equal(f.e.image.src,'black.webp');assert.equal(f.e.add.disabled,false);assert.equal(calls.length,0);
});
test('manual selection persists when reopening; main variant changes refresh the suggestion',()=>{
 const f=inlineFixture();cartFor(f);f.c.openOptions(f.details);
 f.e.options.children.find(n=>n.tag==='select').value='White';f.c.updateSelection(f.details.setupState);f.c.openOptions(f.details);
 assert.equal(f.e.add.dataset.variantId,'20');
 f.document.getElementById=()=>({value:'10'});f.c.openOptions(f.details);assert.equal(f.e.add.dataset.variantId,'20');
});
test('zero price and unavailable variants never enable inline Add',()=>{
 const f=inlineFixture();cartFor(f);f.c.openOptions(f.details);
 for(const variant of [{...product.variants[1],available:false,purchasable:false},{...product.variants[1],price:'',purchasable:false}]) {
  f.details.setupState.product={...product,variants:[variant]};f.c.updateSelection(f.details.setupState);
  assert.equal(f.e.add.disabled,true);assert.equal(f.e.add.dataset.variantId,'');
  if(!variant.price)assert.equal(f.e.price.hidden,true);
 }
});
test('explicit Add submits chosen variant once through shared integration and returns focus to summary',async()=>{
 const f=inlineFixture(),{cart,calls}=cartFor(f);f.c.openOptions(f.details);
 f.e.options.children.find(n=>n.tag==='select').value='White';f.c.updateSelection(f.details.setupState);
 await f.c.addVariant(f.e.add);
 assert.deepEqual(calls,[{url:'/fr/cart/add.js',body:{id:'20',quantity:1}}]);assert.equal(cart.refreshed,true);assert.equal(cart.trigger,f.trigger);
 assert.equal(f.e.add['aria-busy'],undefined);assert.equal(f.e.add.disabled,false);
});
test('no exact match requires explicit selection and never posts stale variant',async()=>{
 const f=inlineFixture(),{calls}=cartFor(f);f.document.getElementById=()=>({value:'999'});f.c.openOptions(f.details);
 assert.equal(f.e.add.disabled,true);f.e.add.dataset.variantId='21';await f.c.addVariant(f.e.add);assert.equal(calls.length,0);
});
test('accepted add with failed refresh blocks duplicates; recovery performs GET reconciliation only',async()=>{
 const f=inlineFixture(),{cart,calls}=cartFor(f);f.c.openOptions(f.details);
 cart.refreshDrawer=async()=>{throw new Error('Display failed');};
 await f.c.addVariant(f.e.add);await f.c.addVariant(f.e.add);
 assert.equal(calls.length,1);assert.equal(f.e.add.disabled,true);assert.equal(f.e.refresh.hidden,false);assert.equal(f.e.message.textContent,'Added. Refresh display.');
 cart.refreshDrawer=async()=>{cart.unsynced=false;};await f.c.reconcile(f.e.refresh);
 assert.equal(calls.length,1);assert.equal(f.e.add.disabled,false);assert.equal(f.e.refresh.hidden,true);assert.equal(cart.trigger,f.trigger);
});
test('shared rejection is visible inline with no retry',async()=>{
 const f=inlineFixture(),{calls}=cartFor(f,true);f.c.openOptions(f.details);await f.c.addVariant(f.e.add);
 assert.equal(calls.length,1);assert.equal(f.e.error.hidden,false);assert.equal(f.e.error.textContent,'Only one unit available.');
});
test('opening one disclosure closes the other; Escape closes it and restores summary focus',()=>{
 const f=inlineFixture(),listeners={};
 f.c.addEventListener=(type,fn)=>listeners[type]=fn;f.browserWindow.addEventListener=()=>{};cartFor(f);
 f.details.matches=()=>true;
 const other={open:true};f.c.querySelectorAll=s=>s==='details[data-setup-options]'?[f.details,other]:[];
 f.c.connectedCallback();listeners.toggle({target:f.details});assert.equal(other.open,false);assert.equal(f.details.open,true);
 let prevented=false;listeners.keydown({key:'Escape',target:{closest:()=>f.details},preventDefault(){prevented=true;}});
 assert.equal(f.details.open,false);assert.equal(f.document.activeElement,f.trigger);assert.equal(prevented,true);
});
