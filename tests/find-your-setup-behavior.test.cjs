const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const script=fs.readFileSync('assets/find-your-setup.js','utf8');
function fixture({mobile=false,rtl=false}={}){
 const document={readyState:'complete',listeners:{},addEventListener(t,f){this.listeners[t]=f;}};
 const node=()=>({listeners:{},attrs:{},classList:{toggle(){}},addEventListener(t,f){this.listeners[t]=f;},setAttribute(k,v){this.attrs[k]=v;},getAttribute(k){return this.attrs[k];},focus(){document.activeElement=this;this.listeners.focus?.();}});
 const wrapper={scrollWidth:mobile?760:800,clientWidth:mobile?320:800,scrollLeft:0,getBoundingClientRect:()=>({left:0,right:mobile?320:800}),scrollTo(o){this.scrollLeft=o.left;}};
 const tabs=Array.from({length:4},(_,i)=>({...node(),attrs:{'aria-controls':'panel-'+i},getBoundingClientRect:()=>({left:i*180-wrapper.scrollLeft,right:i*180+170-wrapper.scrollLeft})}));
 const panels=tabs.map((_,i)=>({...node(),id:'panel-'+i,hidden:i>0}));
 const skip=node(),destination=node();
 const section={dataset:{},querySelectorAll:s=>s==='[role="tab"]'?tabs:panels,querySelector:s=>s==='[data-setup-skip]'?skip:s==='[data-setup-all]'?tabs[0]:s==='.find-your-setup__destination'?destination:wrapper};
 document.querySelectorAll=()=>[section];
 vm.runInNewContext(script,{document,getComputedStyle:()=>({direction:rtl?'rtl':'ltr'})});
 return {tabs,panels,wrapper,section,document,skip,destination,key(i,key){const e={key,preventDefault(){this.prevented=true;}};tabs[i].listeners.keydown(e);return e;}};
}
test('changing profiles affects only owned panels; one tab and panel are active',()=>{
 const f=fixture();f.tabs[2].listeners.click();assert.deepEqual(f.panels.map(x=>x.hidden),[true,true,false,true]);assert.deepEqual(f.tabs.map(x=>x.tabIndex),[-1,-1,0,-1]);
 f.tabs[1].listeners.click();assert.deepEqual(f.panels.map(x=>x.hidden),[true,false,true,true]);
});
test('Skip resets the profile and focuses the catalog destination without intercepting the native anchor',()=>{
 const f=fixture();f.tabs[3].listeners.click();f.skip.listeners.click();assert.deepEqual(f.panels.map(x=>x.hidden),[false,true,true,true]);assert.equal(f.document.activeElement,f.destination);assert.equal(f.tabs[0].attrs['aria-selected'],'true');
});
test('arrows wrap, Home/End work, RTL reverses directions and Tab remains native',()=>{
 const f=fixture();f.key(0,'ArrowLeft');assert.equal(f.document.activeElement,f.tabs[3]);f.key(3,'Home');assert.equal(f.document.activeElement,f.tabs[0]);f.key(0,'End');assert.equal(f.document.activeElement,f.tabs[3]);f.key(3,'ArrowRight');assert.equal(f.document.activeElement,f.tabs[0]);assert.equal(f.key(0,'Tab').prevented,undefined);
 const rtl=fixture({rtl:true});rtl.key(0,'ArrowRight');assert.equal(rtl.document.activeElement,rtl.tabs[3]);
});
test('keyboard focus scrolls the compact mobile row fully into view and initialization is idempotent',()=>{
 const f=fixture({mobile:true});f.key(0,'End');assert.equal(f.wrapper.scrollLeft,394);f.key(3,'Home');assert.equal(f.wrapper.scrollLeft,-4);
 const handler=f.tabs[0].listeners.click;f.document.listeners['shopify:section:load']();assert.equal(f.tabs[0].listeners.click,handler);
});
