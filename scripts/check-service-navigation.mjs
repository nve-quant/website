import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';

// Exercise the actual navigation handlers without browser automation.
const trigger=new EventTarget(),firstLink=new EventTarget(),panel=new EventTarget();
const dropdown=Object.assign(new EventTarget(),{open:false});
const motion={matches:true};
globalThis.document=Object.assign(new EventTarget(),{
  activeElement:null,querySelector:()=>dropdown,getElementById:()=>null,
});
globalThis.window=new EventTarget();
globalThis.location={hash:''};
globalThis.HTMLDetailsElement=class {};
globalThis.matchMedia=()=>motion;
trigger.focus=()=>{document.activeElement=trigger;};
firstLink.focus=()=>{document.activeElement=firstLink;};
panel.contains=node=>node===firstLink;
panel.querySelector=()=>firstLink;
dropdown.contains=node=>[dropdown,trigger,panel,firstLink].includes(node);
dropdown.querySelector=selector=>selector==='summary'?trigger:panel;
const source=await readFile(new URL('../src/components/SiteHeader.astro',import.meta.url),'utf8');
const script=source.match(/<script>([\s\S]*?)<\/script>/)[1];
const js=ts.transpileModule(script,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const fire=(node,type,values={})=>{
  const event=new Event(type,{cancelable:true});
  for(const [key,value] of Object.entries(values))Object.defineProperty(event,key,{value});
  node.dispatchEvent(event);return event;
};
const settle=()=>new Promise(resolve=>setTimeout(resolve,250));

fire(dropdown,'pointerenter',{pointerType:'mouse'});
assert(dropdown.open,'Hover opens the panel');
assert(fire(trigger,'click',{detail:1}).defaultPrevented,'First mouse click must not immediately close a hover-opened panel');
fire(dropdown,'pointerleave',{pointerType:'mouse'});
await settle();
assert(!dropdown.open,'Leaving the whole panel dismisses it');

fire(dropdown,'pointerenter',{pointerType:'mouse'});
fire(dropdown,'pointerleave',{pointerType:'mouse'});
fire(dropdown,'pointerenter',{pointerType:'mouse'});
await settle();
assert(dropdown.open,'Crossing the small trigger-to-panel gap cancels dismissal');
fire(document,'pointerdown',{target:{}});
assert(!dropdown.open,'Outside pointer closes the panel');

fire(dropdown,'keydown',{target:trigger,key:'ArrowDown'});
assert(dropdown.open&&document.activeElement===firstLink,'ArrowDown opens and focuses the first service');
fire(dropdown,'pointerleave',{pointerType:'mouse'});
await settle();
assert(dropdown.open,'Pointer exit preserves keyboard focus inside the panel');
fire(dropdown,'keydown',{key:'Escape'});
assert(!dropdown.open&&document.activeElement===trigger,'Escape closes and restores trigger focus');
fire(dropdown,'keydown',{target:trigger,key:'ArrowDown'});
fire(dropdown,'focusout',{relatedTarget:{}});
assert(!dropdown.open,'Tabbing outside dismisses the panel');

fire(dropdown,'pointerenter',{pointerType:'touch'});
assert(!dropdown.open,'Touch does not trigger mouse hover behaviour');
assert(!fire(trigger,'click',{detail:1}).defaultPrevented,'Touch click keeps native disclosure activation');
motion.matches=false;
fire(dropdown,'pointerenter',{pointerType:'mouse'});
assert(!dropdown.open,'No hover on a non-hover device');
console.log('Services navigation checks passed: hover, gap traversal, first click, outside dismissal, keyboard focus, Escape and touch fallback.');
