const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('sections/header.liquid','utf8');
function setup() {
 const document={body:{style:{overflow:'auto'}},activeElement:null};
 function node(id,{visible=true,disabled=false,tabIndex=0}={}) {
  const attributes=new Map(),classes=new Set(),events={};
  return {id,attributes,events,disabled,tabIndex,dataset:{},
   classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x)},
   setAttribute:(k,v)=>attributes.set(k,v),removeAttribute:k=>attributes.delete(k),
   addEventListener:(k,fn)=>events[k]=fn,getClientRects:()=>visible?[{}]:[],closest:()=>null,
   focus(options){document.activeElement=this;this.focusOptions=options;}};
 }
 const trigger=node('HeaderHamburger'),close=node('MobileDrawerClose'),link=node('link'),hidden=node('hidden',{visible:false}),disabled=node('disabled',{disabled:true}),last=node('last'),drawer=node('MobileDrawer'),overlay=node('MobileDrawerOverlay');
 drawer.setAttribute('inert','');drawer.setAttribute('aria-hidden','true');trigger.setAttribute('aria-expanded','false');
 drawer.querySelectorAll=()=>[close,link,hidden,disabled,last];
 const nodes={HeaderHamburger:trigger,MobileDrawerClose:close,MobileDrawer:drawer,MobileDrawerOverlay:overlay,QuoteModal:null};
 document.getElementById=id=>nodes[id];document.querySelectorAll=()=>[];document.querySelector=()=>null;document.dispatchEvent=()=>{};
 document.addEventListener=(name,fn)=>{if(name==='DOMContentLoaded')fn();};
 vm.runInNewContext(source.match(/<script>([\s\S]*?)<\/script>/)[1],{document,window:{matchMedia:()=>({addEventListener(){}})},getComputedStyle:()=>({visibility:'visible'})});
 return {document,trigger,close,link,last,drawer,overlay,key(key,shiftKey=false){let prevented=false;drawer.events.keydown({key,shiftKey,preventDefault(){prevented=true;}});return prevented;}};
}
test('closed drawer is inert in initial HTML; opening exposes dialog and focuses close without scrolling',()=>{
 assert.match(source,/<aside[^>]*id="MobileDrawer"[^>]*aria-hidden="true" inert>/);
 const f=setup();f.trigger.events.click();
 assert.equal(f.drawer.attributes.has('inert'),false);assert.equal(f.drawer.attributes.get('aria-hidden'),'false');
 assert.equal(f.trigger.attributes.get('aria-expanded'),'true');assert.equal(f.document.activeElement,f.close);
 assert.equal(f.close.focusOptions.preventScroll,true);assert.equal(f.document.body.style.overflow,'hidden');
});
test('Tab wraps both directions while normal interior Tab remains native; hidden and disabled controls are skipped',()=>{
 const f=setup();f.trigger.events.click();
 assert.equal(f.key('Tab',true),true);assert.equal(f.document.activeElement,f.last);
 assert.equal(f.key('Tab'),true);assert.equal(f.document.activeElement,f.close);
 f.link.focus();assert.equal(f.key('Tab'),false);assert.equal(f.document.activeElement,f.link);
});
test('Escape closes, removes off-screen controls from focus, restores overflow and returns focus without scrolling',()=>{
 const f=setup();f.trigger.events.click();f.trigger.events.click();
 assert.equal(f.key('Escape'),true);assert.equal(f.drawer.classList.contains('is-open'),false);
 assert.equal(f.drawer.attributes.has('inert'),true);assert.equal(f.drawer.attributes.get('aria-hidden'),'true');
 assert.equal(f.trigger.attributes.get('aria-expanded'),'false');assert.equal(f.document.activeElement,f.trigger);
 assert.equal(f.trigger.focusOptions.preventScroll,true);assert.equal(f.document.body.style.overflow,'auto');
 assert.equal(f.key('Tab'),false);
});
test('close button and overlay retain click dismissal and focus return',()=>{
 for(const control of ['close','overlay']){const f=setup();f.trigger.events.click();f[control].events.click();assert.equal(f.drawer.attributes.has('inert'),true);assert.equal(f.document.activeElement,f.trigger);}
});
