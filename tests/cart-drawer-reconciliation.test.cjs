const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const source=fs.readFileSync('assets/cart-drawer.js','utf8').split('// Inicializar globalmente')[0];
function fixture({missing=false}={}) {
 const body={innerHTML:'old'},count={textContent:'(0)'},badge={textContent:'0'};
 const nodes={CartDrawerBody:body,CartDrawerCount:count};
 const parsed={CartDrawerBody:{innerHTML:'one line'},CartDrawerCount:{textContent:'(1)'},CartDrawerFooter:null};
 const document={activeElement:{},getElementById:id=>nodes[id],querySelectorAll:()=>[badge]};
 const calls=[];let Controller;
 vm.runInNewContext(source+';Controller=CartDrawer;', {document,window:{location:{href:'https://equipro-dev.myshopify.com/products/ei-501-royal?view=ei-501-royal&preview_theme_id=189456777389'}},URL,DOMParser:class{parseFromString(){return {getElementById:id=>missing?null:parsed[id]};}},set Controller(c){Controller=c;}});
 const c=Object.create(Controller.prototype);c.drawer={contains:()=>false,classList:{contains:()=>false}};c.unsynced=true;c.errorMessage=()=> 'Refresh failed';
 c.request=async (url,options)=>{calls.push(url);calls.options=options;return {'cart-drawer':'rendered section'};};
 return {c,calls,body,count,badge};
}
test('reconciliation passes a string URL with section and pilot view intact and updates shared drawer',async()=>{
 const f=fixture();await f.c.refreshDrawer();
 assert.equal(f.calls.options.headers.Accept,'text/html');assert.equal(typeof f.calls[0],'string');const url=new URL(f.calls[0]);
 assert.equal(url.searchParams.get('sections'),'cart-drawer');assert.equal(url.searchParams.get('view'),'ei-501-royal');assert.equal(url.searchParams.get('preview_theme_id'),'189456777389');
 assert.equal(f.body.innerHTML,'one line');assert.equal(f.count.textContent,'(1)');assert.equal(f.badge.textContent,'1');assert.equal(f.c.unsynced,false);
});
test('missing section markup leaves cart blocked and never mutates cart contents',async()=>{
 const f=fixture({missing:true});await assert.rejects(()=>f.c.refreshDrawer(),/Refresh failed/);
 assert.equal(f.c.unsynced,true);assert.equal(f.body.innerHTML,'old');assert.equal(f.calls.length,1);
});
