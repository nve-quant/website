import assert from 'node:assert/strict';
import {initVenueCarousels,wrapPosition} from '../src/scripts/venue-carousel.ts';
class Element extends EventTarget {
 constructor(){super();this.children=[];this.scrollLeft=0;this.clientWidth=600;this.classList={add(){},remove(){}};}
 append(child){child.offsetLeft=this.children.length*172;this.children.push(child);}
 cloneNode(){return new Element();}
 setAttribute(key,value){this[key]=value;}
 setPointerCapture(){}
 contains(element){return element===rail||element===button;}
 getBoundingClientRect(){return {top:100,bottom:300};}
}
const rail=new Element(),button=new Element(),carousel=new Element();
for(let i=0;i<27;i++)rail.append(new Element());
carousel.querySelector=selector=>selector==='.venue-rail'?rail:button;
const documentMock=new EventTarget();documentMock.querySelectorAll=()=>[carousel];documentMock.activeElement=null;documentMock.hidden=false;
globalThis.document=documentMock;globalThis.window=new EventTarget();globalThis.innerHeight=900;
const motion=new EventTarget();motion.matches=false;globalThis.matchMedia=()=>motion;
let intersectionCallback;
globalThis.IntersectionObserver=class {constructor(callback){intersectionCallback=callback;}observe(){}};
globalThis.ResizeObserver=class {constructor(callback){this.callback=callback;}observe(){this.callback();}};
let sequence=0;const frames=new Map();
globalThis.requestAnimationFrame=callback=>{frames.set(++sequence,callback);return sequence;};
globalThis.cancelAnimationFrame=id=>frames.delete(id);
const emit=(target,type,props={})=>{const event=new Event(type,{cancelable:true});Object.assign(event,props);target.dispatchEvent(event);};
const tick=time=>{const batch=[...frames.values()];frames.clear();for(const callback of batch)callback(time);};
initVenueCarousels();
assert.equal(rail.children.length,54);assert(rail.children.slice(27).every(item=>item['aria-hidden']==='true'));
assert.equal(frames.size,0,'Offscreen carousel should not animate');
intersectionCallback([{isIntersecting:true}]);tick(100);tick(150);assert(Math.abs(rail.scrollLeft-.9)<.001,'18px per second, retained subpixel movement');
emit(rail,'pointerenter',{pointerType:'mouse'});assert.equal(frames.size,0);
const before=rail.scrollLeft;
emit(rail,'pointerdown',{isPrimary:true,button:0,pointerId:1,clientX:200,pointerType:'mouse'});
emit(rail,'pointermove',{pointerId:1,clientX:120});assert.equal(rail.scrollLeft,before+80);
emit(rail,'pointerup');emit(rail,'pointerleave',{pointerType:'mouse'});assert.equal(frames.size,1);
emit(button,'click');assert.equal(frames.size,0);assert.equal(button.textContent,'Resume motion');
emit(button,'click');assert.equal(frames.size,1);
motion.matches=true;emit(motion,'change');assert.equal(frames.size,0);assert.equal(button.hidden,true);
emit(rail,'keydown',{key:'ArrowRight'});assert(rail.scrollLeft>before+80,'Manual navigation remains under reduced motion');
motion.matches=false;emit(motion,'change');documentMock.hidden=true;emit(documentMock,'visibilitychange');assert.equal(frames.size,0);
documentMock.hidden=false;emit(documentMock,'visibilitychange');assert.equal(frames.size,1);
documentMock.activeElement=rail;emit(carousel,'focusin');assert.equal(frames.size,0);
documentMock.activeElement=null;emit(carousel,'focusout');await Promise.resolve();assert.equal(frames.size,1);
emit(window,'pagehide');assert.equal(frames.size,0);emit(window,'pageshow');assert.equal(frames.size,1);
assert.equal(wrapPosition(-10,100),90);assert.equal(wrapPosition(110,100),10);assert.equal(wrapPosition(5,0),0);
console.log('Venue carousel checks passed: pacing, seamless wrapping, drag, keyboard, pause, reduced motion, visibility, focus and page lifecycle. Browser rendering remains separately required.');
