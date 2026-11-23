const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('sections/category-subnav.liquid','utf8');
const script=source.match(/<script>([\s\S]*?)<\/script>/)[1];
function fixture({mobile=false,openDelay='800',closeDelay='250'}={}) {
 let time=0,id=0;const timers=new Map();
 const document={readyState:'complete',activeElement:null,listeners:{},addEventListener(t,f){(this.listeners[t]??=[]).push(f);}};
 function node(parent=null) {
  const classes=new Set();
  return {parent,dataset:{},attrs:{},listeners:{},classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle(x,on){if(on)classes.add(x);else classes.delete(x);}},
   addEventListener(t,f){(this.listeners[t]??=[]).push(f);},setAttribute(k,v){this.attrs[k]=v;},
   contains(x){while(x){if(x===this)return true;x=x.parent;}return false;},
   focus(){document.activeElement=this;if(this.item)fire(this.item,'focusin');},
   closest(s){return s==='.has-megamenu'?this.item:this.closestMap?.[s];}
  };
 }
 const nav=node();nav.dataset={openDelay,closeDelay};
 const items=Array.from({length:2},()=>{
  const item=node(nav),trigger=node(item),panel=node(item),sidebar=node(panel),content=node(panel);
  trigger.item=item;trigger.href='/collections/skincare-equipment';
  const tabs=[node(content),node(content)];tabs[0].classList.add('is-active');
  const entries=tabs.map((tab,i)=>{const entry=node(sidebar),link=node(entry);entry.item=item;link.item=item;entry.dataset.targetTab='tab-'+(++id);entry.target=tab;entry.link=link;entry.closestMap={'.category-megamenu__sidebar':sidebar,'.category-megamenu':panel};return entry;});
  sidebar.querySelectorAll=()=>entries;content.querySelectorAll=()=>tabs;content.querySelector=s=>entries.find(x=>'#'+x.dataset.targetTab===s)?.target;panel.querySelector=()=>content;
  item.querySelector=s=>s==='.category-subnav__bar-link'?trigger:entries[0].link;
  return Object.assign(item,{trigger,entries,tabs});
 });
 nav.querySelectorAll=s=>s==='.category-subnav__bar-item.has-megamenu'?items:items.flatMap(x=>x.entries);
 document.querySelectorAll=()=>[nav];document.getElementById=id=>items.flatMap(x=>x.entries).find(x=>x.dataset.targetTab===id)?.target;
 const desktop={matches:!mobile,addEventListener(_,f){this.changed=f;}};
 const setTimeout=(fn,ms)=>{const timer=++id;timers.set(timer,{at:time+ms,fn});return timer;};
 const clearTimeout=timer=>timers.delete(timer);
 function tick(ms){const until=time+ms;while(true){const next=[...timers].sort((a,b)=>a[1].at-b[1].at).find(x=>x[1].at<=until);if(!next)break;time=next[1].at;timers.delete(next[0]);next[1].fn();}time=until;}
 function fire(target,type,props={}){const event={target,key:'',relatedTarget:null,prevented:false,preventDefault(){this.prevented=true;},stopPropagation(){},...props};for(const fn of target.listeners[type]||[])fn(event);return event;}
 vm.runInNewContext(script,{document,window:{matchMedia:()=>desktop},setTimeout,clearTimeout});
 const isOpen=i=>items[i].classList.contains('is-desktop-open');
 return {nav,items,document,desktop,tick,fire,isOpen};
}
test('mouse intent waits 800ms, then exposes exactly one panel with expanded state',()=>{
 const f=fixture();f.fire(f.items[0],'mouseenter');f.tick(799);assert.equal(f.isOpen(0),false);f.tick(1);assert.equal(f.isOpen(0),true);assert.equal(f.items[0].trigger.attrs['aria-expanded'],'true');assert.equal(f.isOpen(1),false);
});
test('rapid entry and exit cancels opening; crossing categories never opens the old one',()=>{
 const f=fixture();f.fire(f.items[0],'mouseenter');f.tick(400);f.fire(f.items[0],'mouseleave');f.fire(f.items[1],'mouseenter');f.tick(799);assert.equal(f.isOpen(0),false);assert.equal(f.isOpen(1),false);f.fire(f.items[1],'mouseleave');f.tick(1000);assert.equal(f.isOpen(1),false);
});
test('closing waits 250ms; reentry cancels closure without reopening delay',()=>{
 const f=fixture();f.fire(f.items[0],'mouseenter');f.tick(800);f.fire(f.items[0],'mouseleave');f.tick(249);assert.equal(f.isOpen(0),true);f.fire(f.items[0],'mouseenter');f.tick(500);assert.equal(f.isOpen(0),true);f.fire(f.items[0],'mouseleave');f.tick(250);assert.equal(f.isOpen(0),false);
});
test('leaving a new category before its intent delay also closes the previous panel',()=>{
 const f=fixture();f.fire(f.items[0],'mouseenter');f.tick(800);f.fire(f.items[0],'mouseleave');f.fire(f.items[1],'mouseenter');f.tick(100);f.fire(f.items[1],'mouseleave');f.tick(250);assert.equal(f.isOpen(0),false);assert.equal(f.isOpen(1),false);
});
test('keyboard focus opens immediately and focus within keeps the panel open',()=>{
 const f=fixture();f.items[0].trigger.focus();assert.equal(f.isOpen(0),true);f.fire(f.items[0],'focusout',{relatedTarget:f.items[0].entries[0].link});assert.equal(f.isOpen(0),true);f.fire(f.items[0],'mouseleave');f.tick(1000);assert.equal(f.isOpen(0),true);f.fire(f.items[0],'focusout',{relatedTarget:null});assert.equal(f.isOpen(0),false);
});
test('Escape closes, cancels stale timers and returns focus to the category',()=>{
 const f=fixture();f.items[0].trigger.focus();const target=f.items[0].entries[0].link;f.document.activeElement=target;
 const event=f.fire(f.nav,'keydown',{target,key:'Escape'});assert.equal(event.prevented,true);assert.equal(f.document.activeElement,f.items[0].trigger);f.tick(2000);assert.equal(f.isOpen(0),false);
});
test('ArrowDown enters the panel while Enter and modified clicks retain navigation',()=>{
 const f=fixture();const trigger=f.items[0].trigger;
 assert.equal(f.fire(trigger,'keydown',{key:'Enter'}).prevented,false);assert.equal(f.fire(trigger,'click',{ctrlKey:true}).prevented,false);
 assert.equal(f.fire(trigger,'keydown',{key:'ArrowDown'}).prevented,true);assert.equal(f.document.activeElement,f.items[0].entries[0].link);
});
test('hover and keyboard preview selection stay active; sidebar clicks never block desktop URLs',()=>{
 const f=fixture(),entry=f.items[0].entries[1];f.fire(entry,'mouseenter');assert.equal(entry.target.classList.contains('is-active'),true);assert.equal(f.items[0].tabs[0].classList.contains('is-active'),false);
 assert.equal(f.fire(entry,'click').prevented,false);assert.equal(f.fire(entry,'click',{metaKey:true}).prevented,false);
 f.fire(f.items[0].entries[0],'focusin');assert.equal(f.items[0].tabs[0].classList.contains('is-active'),true);
});
test('breakpoint changes clear desktop timers and optional mobile first-tap behavior remains',()=>{
 const f=fixture();f.fire(f.items[0],'mouseenter');f.desktop.matches=false;f.desktop.changed();f.tick(1000);assert.equal(f.isOpen(0),false);
 const trigger=f.items[0].trigger;assert.equal(f.fire(trigger,'click').prevented,true);assert.equal(f.fire(trigger,'click').prevented,false);assert.equal(f.fire(f.items[0].entries[0],'click').prevented,true);f.fire(f.items[0],'mouseenter');f.tick(1000);assert.equal(f.isOpen(0),false);
});
test('custom delays, including zero, are respected; editor reinitialization does not duplicate listeners',()=>{
 const f=fixture({openDelay:'50',closeDelay:'0'});f.fire(f.items[0],'mouseenter');f.tick(49);assert.equal(f.isOpen(0),false);f.tick(1);assert.equal(f.isOpen(0),true);f.fire(f.items[0],'mouseleave');f.tick(0);assert.equal(f.isOpen(0),false);
 f.document.listeners['shopify:section:load'][0]();assert.equal(f.items[0].listeners.mouseenter.length,1);
});
test('Liquid preserves Shopify URLs and configurable defaults and unique panel controls',async()=>{
 const {Liquid}=require('liquidjs'),engine=new Liquid();
 engine.registerFilter('asset_url',x=>x);engine.registerFilter('stylesheet_tag',x=>x);engine.registerFilter('handleize',x=>x.toLowerCase().replace(/\s+/g,'-'));
 const html=await engine.parseAndRender(source.replace(/{% schema %}[\s\S]*?{% endschema %}/,''),{section:{id:'pilot',blocks:[],settings:{category_menu:{links:[{title:'Skincare Equipment',url:'/collections/skincare-equipment',links:[{title:'Steamers',url:'/collections/streamers',object:{handle:'streamers'}}]}]},hide_on_mobile:true,hover_open_delay:0,hover_close_delay:250}}});
 assert.match(html,/href="\/collections\/streamers"/);assert.match(html,/href="\/collections\/skincare-equipment"/);assert.match(html,/data-open-delay="0"/);assert.match(html,/aria-controls="MegaMenu-pilot-1"/);assert.match(html,/id="MegaMenu-pilot-1"/);
 const settings=JSON.parse(source.match(/{% schema %}([\s\S]*?){% endschema %}/)[1]).settings;assert.equal(settings.find(x=>x.id==='hover_open_delay').default,800);assert.equal(settings.find(x=>x.id==='hover_close_delay').default,250);
});
