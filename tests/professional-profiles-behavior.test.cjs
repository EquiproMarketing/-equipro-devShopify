const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const script=fs.readFileSync('sections/custom-spa-pack-builder.liquid','utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
function fixture({rtl=false,mobile=false}={}) {
 const document={readyState:'complete',listeners:{},addEventListener(t,f){this.listeners[t]=f;}};
 function node(){return {listeners:{},attrs:{},classList:{toggle(){}},addEventListener(t,f){this.listeners[t]=f;},setAttribute(k,v){this.attrs[k]=v;},focus(){document.activeElement=this;this.listeners.focus?.();},getAttribute(k){return this.attrs[k];}};}
 const tabs=Array.from({length:3},(_,i)=>Object.assign(node(),{attrs:{'aria-controls':'panel-'+i},getBoundingClientRect:()=>({left:i*150-scroller.scrollLeft,right:i*150+140-scroller.scrollLeft})}));
 const panels=tabs.map((_,i)=>({...node(),id:'panel-'+i,hidden:i>0}));
 const scroller={scrollWidth:mobile?450:300,clientWidth:300,scrollLeft:0,getBoundingClientRect:()=>({left:0,right:300}),scrollTo(opts){this.scrollLeft=opts.left;this.last=opts;}};
 const section={dataset:{},querySelectorAll:s=>s==='[role="tab"]'?tabs:panels,querySelector:()=>scroller};
 document.querySelectorAll=()=>[section];
 vm.runInNewContext(script,{document,getComputedStyle:()=>({direction:rtl?'rtl':'ltr'})});
 const key=(i,key)=>{const e={key,prevented:false,preventDefault(){this.prevented=true;}};tabs[i].listeners.keydown(e);return e;};
 return {document,tabs,panels,scroller,section,key};
}
test('click selects one panel and one roving tab stop',()=>{
 const f=fixture();f.tabs[1].listeners.click();assert.deepEqual(f.panels.map(p=>p.hidden),[true,false,true]);assert.deepEqual(f.tabs.map(t=>t.tabIndex),[-1,0,-1]);assert.equal(f.tabs[1].attrs['aria-selected'],'true');
});
test('arrow keys wrap, Home and End focus the selected tab; Tab is not intercepted',()=>{
 const f=fixture();f.key(0,'ArrowLeft');assert.equal(f.document.activeElement,f.tabs[2]);f.key(2,'ArrowRight');assert.equal(f.document.activeElement,f.tabs[0]);f.key(0,'End');assert.equal(f.document.activeElement,f.tabs[2]);f.key(2,'Home');assert.equal(f.document.activeElement,f.tabs[0]);assert.equal(f.key(0,'Tab').prevented,false);
});
test('RTL reverses horizontal arrows',()=>{const f=fixture({rtl:true});f.key(0,'ArrowRight');assert.equal(f.document.activeElement,f.tabs[2]);});
test('focused mobile tabs scroll within their own row; desktop never scrolls',()=>{
 const f=fixture({mobile:true});f.key(0,'End');assert.equal(f.scroller.scrollLeft,144);assert.equal(f.scroller.last.behavior,'instant');
 const desktop=fixture();desktop.key(0,'End');assert.equal(desktop.scroller.last,undefined);
});
test('native focus activates its panel and theme editor reload does not duplicate setup',()=>{
 const f=fixture();f.tabs[2].focus();assert.equal(f.panels[2].hidden,false);const listener=f.tabs[2].listeners.click;f.document.listeners['shopify:section:load']();assert.equal(f.tabs[2].listeners.click,listener);
});
