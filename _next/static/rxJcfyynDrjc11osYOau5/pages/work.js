(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"1Oj2":function(e,t,n){"use strict";n.r(t);var i=n("q1tI"),r=n.n(i),a=n("m/Pd"),o=n.n(a);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function l(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}const u={arr:Array.isArray,obj:e=>"[object Object]"===Object.prototype.toString.call(e),fun:e=>"function"===typeof e,str:e=>"string"===typeof e,num:e=>"number"===typeof e,und:e=>void 0===e,nul:e=>null===e,set:e=>e instanceof Set,map:e=>e instanceof Map,equ(e,t){if(typeof e!==typeof t)return!1;if(u.str(e)||u.num(e))return e===t;if(u.obj(e)&&u.obj(t)&&Object.keys(e).length+Object.keys(t).length===0)return!0;let n;for(n in e)if(!(n in t))return!1;for(n in t)if(e[n]!==t[n])return!1;return!u.und(n)||e===t}};function c(){const e=Object(i.useState)(!1)[1];return Object(i.useCallback)(()=>e(e=>!e),[])}function d(e,t){return u.und(e)||u.nul(e)?t:e}function f(e){return u.und(e)?[]:u.arr(e)?e:[e]}function h(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];return u.fun(e)?e(...n):e}function p(e){const t=function(e){return e.to,e.from,e.config,e.onStart,e.onRest,e.onFrame,e.children,e.reset,e.reverse,e.force,e.immediate,e.delay,e.attach,e.destroyed,e.interpolateTo,e.ref,e.lazy,l(e,["to","from","config","onStart","onRest","onFrame","children","reset","reverse","force","immediate","delay","attach","destroyed","interpolateTo","ref","lazy"])}(e);if(u.und(t))return s({to:t},e);const n=Object.keys(e).reduce((n,i)=>u.und(t[i])?s({},n,{[i]:e[i]}):n,{});return s({to:t},n)}class m{constructor(){this.payload=void 0,this.children=[]}getAnimatedValue(){return this.getValue()}getPayload(){return this.payload||this}attach(){}detach(){}getChildren(){return this.children}addChild(e){0===this.children.length&&this.attach(),this.children.push(e)}removeChild(e){const t=this.children.indexOf(e);this.children.splice(t,1),0===this.children.length&&this.detach()}}class g extends m{constructor(){super(...arguments),this.payload=[],this.attach=()=>this.payload.forEach(e=>e instanceof m&&e.addChild(this)),this.detach=()=>this.payload.forEach(e=>e instanceof m&&e.removeChild(this))}}class v extends m{constructor(){super(...arguments),this.payload={},this.attach=()=>Object.values(this.payload).forEach(e=>e instanceof m&&e.addChild(this)),this.detach=()=>Object.values(this.payload).forEach(e=>e instanceof m&&e.removeChild(this))}getValue(e){void 0===e&&(e=!1);const t={};for(const n in this.payload){const i=this.payload[n];(!e||i instanceof m)&&(t[n]=i instanceof m?i[e?"getAnimatedValue":"getValue"]():i)}return t}getAnimatedValue(){return this.getValue(!0)}}let y,b;function w(e,t){y={fn:e,transform:t}}function j(e){b=e}let k,_=e=>"undefined"!==typeof window?window.requestAnimationFrame(e):-1;function O(e){k=e}let x,E=()=>Date.now();function A(e){x=e}let T,C,P=e=>e.current;function V(e){T=e}class M extends v{constructor(e,t){super(),this.update=void 0,this.payload=e.style?s({},e,{style:T(e.style)}):e,this.update=t,this.attach()}}let S=!1;const R=new Set,N=()=>{if(!S)return!1;let e=E();for(let t of R){let n=!1;for(let i=0;i<t.configs.length;i++){let r,a,o=t.configs[i];for(let t=0;t<o.animatedValues.length;t++){let i=o.animatedValues[t];if(i.done)continue;let s=o.fromValues[t],l=o.toValues[t],u=i.lastPosition,c=l instanceof m,d=Array.isArray(o.initialVelocity)?o.initialVelocity[t]:o.initialVelocity;if(c&&(l=l.getValue()),o.immediate)i.setValue(l),i.done=!0;else if("string"!==typeof s&&"string"!==typeof l){if(void 0!==o.duration)u=s+o.easing((e-i.startTime)/o.duration)*(l-s),r=e>=i.startTime+o.duration;else if(o.decay)u=s+d/(1-.998)*(1-Math.exp(-(1-.998)*(e-i.startTime))),(r=Math.abs(i.lastPosition-u)<.1)&&(l=u);else{a=void 0!==i.lastTime?i.lastTime:e,d=void 0!==i.lastVelocity?i.lastVelocity:o.initialVelocity,e>a+64&&(a=e);let t=Math.floor(e-a);for(let e=0;e<t;++e){u+=1*(d+=1*((-o.tension*(u-l)+-o.friction*d)/o.mass)/1e3)/1e3}let n=!(!o.clamp||0===o.tension)&&(s<l?u>l:u<l),c=Math.abs(d)<=o.precision,f=0===o.tension||Math.abs(l-u)<=o.precision;r=n||c&&f,i.lastVelocity=d,i.lastTime=e}c&&!o.toValues[t].done&&(r=!1),r?(i.value!==l&&(u=l),i.done=!0):n=!0,i.setValue(u),i.lastPosition=u}else i.setValue(l),i.done=!0}t.props.onFrame&&(t.values[o.name]=o.interpolation.getValue())}t.props.onFrame&&t.props.onFrame(t.values),n||(R.delete(t),t.stop(!0))}return R.size?C?C():_(N):S=!1,S},D=e=>{R.has(e)||R.add(e),S||(S=!0,_(C||N))},F=e=>{R.has(e)&&R.delete(e)};function L(e,t,n){if("function"===typeof e)return e;if(Array.isArray(e))return L({range:e,output:t,extrapolate:n});if(k&&"string"===typeof e.output[0])return k(e);const i=e,r=i.output,a=i.range||[0,1],o=i.extrapolateLeft||i.extrapolate||"extend",s=i.extrapolateRight||i.extrapolate||"extend",l=i.easing||(e=>e);return e=>{const t=function(e,t){for(var n=1;n<t.length-1&&!(t[n]>=e);++n);return n-1}(e,a);return function(e,t,n,i,r,a,o,s,l){let u=l?l(e):e;if(u<t){if("identity"===o)return u;"clamp"===o&&(u=t)}if(u>n){if("identity"===s)return u;"clamp"===s&&(u=n)}if(i===r)return i;if(t===n)return e<=t?i:r;t===-1/0?u=-u:n===1/0?u-=t:u=(u-t)/(n-t);u=a(u),i===-1/0?u=-u:r===1/0?u+=i:u=u*(r-i)+i;return u}(e,a[t],a[t+1],r[t],r[t+1],l,o,s,i.map)}}class W extends g{constructor(e,t,n,i){super(),this.calc=void 0,this.payload=e instanceof g&&!(e instanceof W)?e.getPayload():Array.isArray(e)?e:[e],this.calc=L(t,n,i)}getValue(){return this.calc(...this.payload.map(e=>e.getValue()))}updateConfig(e,t,n){this.calc=L(e,t,n)}interpolate(e,t,n){return new W(this,e,t,n)}}class q extends m{constructor(e){var t;super(),t=this,this.animatedStyles=new Set,this.value=void 0,this.startPosition=void 0,this.lastPosition=void 0,this.lastVelocity=void 0,this.startTime=void 0,this.lastTime=void 0,this.done=!1,this.setValue=function(e,n){void 0===n&&(n=!0),t.value=e,n&&t.flush()},this.value=e,this.startPosition=e,this.lastPosition=e}flush(){0===this.animatedStyles.size&&function e(t,n){"update"in t?n.add(t):t.getChildren().forEach(t=>e(t,n))}(this,this.animatedStyles),this.animatedStyles.forEach(e=>e.update())}clearStyles(){this.animatedStyles.clear()}getValue(){return this.value}interpolate(e,t,n){return new W(this,e,t,n)}}class I extends g{constructor(e){super(),this.payload=e.map(e=>new q(e))}setValue(e,t){void 0===t&&(t=!0),Array.isArray(e)?e.length===this.payload.length&&e.forEach((e,n)=>this.payload[n].setValue(e,t)):this.payload.forEach(n=>n.setValue(e,t))}getValue(){return this.payload.map(e=>e.getValue())}interpolate(e,t){return new W(this,e,t)}}let z=0;class H{constructor(){this.id=void 0,this.idle=!0,this.hasChanged=!1,this.guid=0,this.local=0,this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.listeners=[],this.queue=[],this.localQueue=void 0,this.getValues=()=>this.interpolations,this.id=z++}update(e){if(!e)return this;const t=p(e),n=t.delay,i=void 0===n?0:n,r=t.to,a=l(t,["delay","to"]);if(u.arr(r)||u.fun(r))this.queue.push(s({},a,{delay:i,to:r}));else if(r){let e={};Object.entries(r).forEach(t=>{let n=t[0];const r=s({to:{[n]:t[1]},delay:h(i,n)},a),o=e[r.delay]&&e[r.delay].to;e[r.delay]=s({},e[r.delay],r,{to:s({},o,r.to)})}),this.queue=Object.values(e)}return this.queue=this.queue.sort((e,t)=>e.delay-t.delay),this.diff(a),this}start(e){if(this.queue.length){this.idle=!1,this.localQueue&&this.localQueue.forEach(e=>{let t=e.from,n=void 0===t?{}:t,i=e.to,r=void 0===i?{}:i;u.obj(n)&&(this.merged=s({},n,this.merged)),u.obj(r)&&(this.merged=s({},this.merged,r))});const t=this.local=++this.guid,n=this.localQueue=this.queue;this.queue=[],n.forEach((i,r)=>{let a=i.delay,o=l(i,["delay"]);const s=i=>{r===n.length-1&&t===this.guid&&i&&(this.idle=!0,this.props.onRest&&this.props.onRest(this.merged)),e&&e()};let c=u.arr(o.to)||u.fun(o.to);a?setTimeout(()=>{t===this.guid&&(c?this.runAsync(o,s):this.diff(o).start(s))},a):c?this.runAsync(o,s):this.diff(o).start(s)})}else u.fun(e)&&this.listeners.push(e),this.props.onStart&&this.props.onStart(),D(this);return this}stop(e){return this.listeners.forEach(t=>t(e)),this.listeners=[],this}pause(e){return this.stop(!0),e&&F(this),this}runAsync(e,t){var n=this;e.delay;let i=l(e,["delay"]);const r=this.local;let a=Promise.resolve(void 0);if(u.arr(i.to))for(let o=0;o<i.to.length;o++){const e=o,t=s({},i,p(i.to[e]));u.arr(t.config)&&(t.config=t.config[e]),a=a.then(()=>{if(r===this.guid)return new Promise(e=>this.diff(t).start(e))})}else if(u.fun(i.to)){let e,t=0;a=a.then(()=>i.to(n=>{const a=s({},i,p(n));if(u.arr(a.config)&&(a.config=a.config[t]),t++,r===this.guid)return e=new Promise(e=>this.diff(a).start(e))},function(e){return void 0===e&&(e=!0),n.stop(e)}).then(()=>e))}a.then(t)}diff(e){this.props=s({},this.props,e);let t=this.props,n=t.from,i=void 0===n?{}:n,r=t.to,a=void 0===r?{}:r,o=t.config,l=void 0===o?{}:o,c=t.reverse,p=t.attach,m=t.reset,g=t.immediate;if(c){var v=[a,i];i=v[0],a=v[1]}this.merged=s({},i,this.merged,a),this.hasChanged=!1;let y=p&&p(this);if(this.animations=Object.entries(this.merged).reduce((e,t)=>{let n=t[0],r=t[1],a=e[n]||{};const o=u.num(r),c=u.str(r)&&!r.startsWith("#")&&!/\d/.test(r)&&!b[r],p=u.arr(r),v=!o&&!p&&!c;let w=u.und(i[n])?r:i[n],j=o||p?r:c?r:1,_=h(l,n);y&&(j=y.animations[n].parent);let O,x=a.parent,A=a.interpolation,T=f(y?j.getPayload():j),C=r;v&&(C=k({range:[0,1],output:[r,r]})(1));let P=A&&A.getValue();const V=!u.und(x)&&a.animatedValues.some(e=>!e.done),M=!u.equ(C,P),S=!u.equ(C,a.previous),R=!u.equ(_,a.config);if(m||S&&M||R){if(o||c)x=A=a.parent||new q(w);else if(p)x=A=a.parent||new I(w);else if(v){let e=a.interpolation&&a.interpolation.calc(a.parent.value);e=void 0===e||m?w:e,a.parent?(x=a.parent).setValue(0,!1):x=new q(0);const t={output:[e,r]};a.interpolation?(A=a.interpolation,a.interpolation.updateConfig(t)):A=x.interpolate(t)}return T=f(y?j.getPayload():j),O=f(x.getPayload()),m&&!v&&x.setValue(w,!1),this.hasChanged=!0,O.forEach(e=>{e.startPosition=e.value,e.lastPosition=e.value,e.lastVelocity=V?e.lastVelocity:void 0,e.lastTime=V?e.lastTime:void 0,e.startTime=E(),e.done=!1,e.animatedStyles.clear()}),h(g,n)&&x.setValue(v?j:r,!1),s({},e,{[n]:s({},a,{name:n,parent:x,interpolation:A,animatedValues:O,toValues:T,previous:C,config:_,fromValues:f(x.getValue()),immediate:h(g,n),initialVelocity:d(_.velocity,0),clamp:d(_.clamp,!1),precision:d(_.precision,.01),tension:d(_.tension,170),friction:d(_.friction,26),mass:d(_.mass,1),duration:_.duration,easing:d(_.easing,e=>e),decay:_.decay})})}return M?e:(v&&(x.setValue(1,!1),A.updateConfig({output:[C,C]})),x.done=!0,this.hasChanged=!0,s({},e,{[n]:s({},e[n],{previous:C})}))},this.animations),this.hasChanged){this.configs=Object.values(this.animations),this.values={},this.interpolations={};for(let e in this.animations)this.interpolations[e]=this.animations[e].interpolation,this.values[e]=this.animations[e].interpolation.getValue()}return this}destroy(){this.stop(),this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.local=0}}const G=(e,t)=>{const n=Object(i.useRef)(!1),r=Object(i.useRef)(),a=u.fun(t),o=Object(i.useMemo)(()=>{let n;return r.current&&(r.current.map(e=>e.destroy()),r.current=void 0),[new Array(e).fill().map((e,i)=>{const r=new H,o=a?h(t,i,r):t[i];return 0===i&&(n=o.ref),r.update(o),n||r.start(),r}),n]},[e]),s=o[0],l=o[1];r.current=s;Object(i.useImperativeHandle)(l,()=>({start:()=>Promise.all(r.current.map(e=>new Promise(t=>e.start(t)))),stop:e=>r.current.forEach(t=>t.stop(e)),get controllers(){return r.current}}));const c=Object(i.useMemo)(()=>e=>r.current.map((t,n)=>{t.update(a?h(e,n,t):e[n]),l||t.start()}),[e]);Object(i.useEffect)(()=>{n.current?a||c(t):l||r.current.forEach(e=>e.start())}),Object(i.useEffect)(()=>(n.current=!0,()=>r.current.forEach(e=>e.destroy())),[]);const d=r.current.map(e=>e.getValues());return a?[d,c,e=>r.current.forEach(t=>t.pause(e))]:d},J=e=>{const t=u.fun(e),n=G(1,t?e:[e]),i=n[0],r=n[1],a=n[2];return t?[i[0],r,a]:i};class $ extends v{constructor(e){void 0===e&&(e={}),super(),!e.transform||e.transform instanceof m||(e=y.transform(e)),this.payload=e}}const U={transparent:0,aliceblue:4042850303,antiquewhite:4209760255,aqua:16777215,aquamarine:2147472639,azure:4043309055,beige:4126530815,bisque:4293182719,black:255,blanchedalmond:4293643775,blue:65535,blueviolet:2318131967,brown:2771004159,burlywood:3736635391,burntsienna:3934150143,cadetblue:1604231423,chartreuse:2147418367,chocolate:3530104575,coral:4286533887,cornflowerblue:1687547391,cornsilk:4294499583,crimson:3692313855,cyan:16777215,darkblue:35839,darkcyan:9145343,darkgoldenrod:3095792639,darkgray:2846468607,darkgreen:6553855,darkgrey:2846468607,darkkhaki:3182914559,darkmagenta:2332068863,darkolivegreen:1433087999,darkorange:4287365375,darkorchid:2570243327,darkred:2332033279,darksalmon:3918953215,darkseagreen:2411499519,darkslateblue:1211993087,darkslategray:793726975,darkslategrey:793726975,darkturquoise:13554175,darkviolet:2483082239,deeppink:4279538687,deepskyblue:12582911,dimgray:1768516095,dimgrey:1768516095,dodgerblue:512819199,firebrick:2988581631,floralwhite:4294635775,forestgreen:579543807,fuchsia:4278255615,gainsboro:3705462015,ghostwhite:4177068031,gold:4292280575,goldenrod:3668254975,gray:2155905279,green:8388863,greenyellow:2919182335,grey:2155905279,honeydew:4043305215,hotpink:4285117695,indianred:3445382399,indigo:1258324735,ivory:4294963455,khaki:4041641215,lavender:3873897215,lavenderblush:4293981695,lawngreen:2096890111,lemonchiffon:4294626815,lightblue:2916673279,lightcoral:4034953471,lightcyan:3774873599,lightgoldenrodyellow:4210742015,lightgray:3553874943,lightgreen:2431553791,lightgrey:3553874943,lightpink:4290167295,lightsalmon:4288707327,lightseagreen:548580095,lightskyblue:2278488831,lightslategray:2005441023,lightslategrey:2005441023,lightsteelblue:2965692159,lightyellow:4294959359,lime:16711935,limegreen:852308735,linen:4210091775,magenta:4278255615,maroon:2147483903,mediumaquamarine:1724754687,mediumblue:52735,mediumorchid:3126187007,mediumpurple:2473647103,mediumseagreen:1018393087,mediumslateblue:2070474495,mediumspringgreen:16423679,mediumturquoise:1221709055,mediumvioletred:3340076543,midnightblue:421097727,mintcream:4127193855,mistyrose:4293190143,moccasin:4293178879,navajowhite:4292783615,navy:33023,oldlace:4260751103,olive:2155872511,olivedrab:1804477439,orange:4289003775,orangered:4282712319,orchid:3664828159,palegoldenrod:4008225535,palegreen:2566625535,paleturquoise:2951671551,palevioletred:3681588223,papayawhip:4293907967,peachpuff:4292524543,peru:3448061951,pink:4290825215,plum:3718307327,powderblue:2967529215,purple:2147516671,rebeccapurple:1714657791,red:4278190335,rosybrown:3163525119,royalblue:1097458175,saddlebrown:2336560127,salmon:4202722047,sandybrown:4104413439,seagreen:780883967,seashell:4294307583,sienna:2689740287,silver:3233857791,skyblue:2278484991,slateblue:1784335871,slategray:1887473919,slategrey:1887473919,snow:4294638335,springgreen:16744447,steelblue:1182971135,tan:3535047935,teal:8421631,thistle:3636451583,tomato:4284696575,turquoise:1088475391,violet:4001558271,wheat:4125012991,white:4294967295,whitesmoke:4126537215,yellow:4294902015,yellowgreen:2597139199},B="[-+]?\\d*\\.?\\d+",X=B+"%";function Q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return"\\(\\s*("+t.join(")\\s*,\\s*(")+")\\s*\\)"}const Y=new RegExp("rgb"+Q(B,B,B)),Z=new RegExp("rgba"+Q(B,B,B,B)),K=new RegExp("hsl"+Q(B,X,X)),ee=new RegExp("hsla"+Q(B,X,X,B)),te=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,ne=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,ie=/^#([0-9a-fA-F]{6})$/,re=/^#([0-9a-fA-F]{8})$/;function ae(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function oe(e,t,n){const i=n<.5?n*(1+t):n+t-n*t,r=2*n-i,a=ae(r,i,e+1/3),o=ae(r,i,e),s=ae(r,i,e-1/3);return Math.round(255*a)<<24|Math.round(255*o)<<16|Math.round(255*s)<<8}function se(e){const t=parseInt(e,10);return t<0?0:t>255?255:t}function le(e){return(parseFloat(e)%360+360)%360/360}function ue(e){const t=parseFloat(e);return t<0?0:t>1?255:Math.round(255*t)}function ce(e){const t=parseFloat(e);return t<0?0:t>100?1:t/100}function de(e){let t=function(e){let t;return"number"===typeof e?e>>>0===e&&e>=0&&e<=4294967295?e:null:(t=ie.exec(e))?parseInt(t[1]+"ff",16)>>>0:U.hasOwnProperty(e)?U[e]:(t=Y.exec(e))?(se(t[1])<<24|se(t[2])<<16|se(t[3])<<8|255)>>>0:(t=Z.exec(e))?(se(t[1])<<24|se(t[2])<<16|se(t[3])<<8|ue(t[4]))>>>0:(t=te.exec(e))?parseInt(t[1]+t[1]+t[2]+t[2]+t[3]+t[3]+"ff",16)>>>0:(t=re.exec(e))?parseInt(t[1],16)>>>0:(t=ne.exec(e))?parseInt(t[1]+t[1]+t[2]+t[2]+t[3]+t[3]+t[4]+t[4],16)>>>0:(t=K.exec(e))?(255|oe(le(t[1]),ce(t[2]),ce(t[3])))>>>0:(t=ee.exec(e))?(oe(le(t[1]),ce(t[2]),ce(t[3]))|ue(t[4]))>>>0:null}(e);return null===t?e:`rgba(${(4278190080&(t=t||0))>>>24}, ${(16711680&t)>>>16}, ${(65280&t)>>>8}, ${(255&t)/255})`}const fe=/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,he=/(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,pe=new RegExp(`(${Object.keys(U).join("|")})`,"g");let me={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0};const ge=["Webkit","Ms","Moz","O"];function ve(e,t,n){return null==t||"boolean"===typeof t||""===t?"":n||"number"!==typeof t||0===t||me.hasOwnProperty(e)&&me[e]?(""+t).trim():t+"px"}me=Object.keys(me).reduce((e,t)=>(ge.forEach(n=>e[((e,t)=>e+t.charAt(0).toUpperCase()+t.substring(1))(n,t)]=e[t]),e),me);const ye={};V(e=>new $(e)),A("div"),O(e=>{const t=e.output.map(e=>e.replace(he,de)).map(e=>e.replace(pe,de)),n=t[0].match(fe).map(()=>[]);t.forEach(e=>{e.match(fe).forEach((e,t)=>n[t].push(+e))});const i=t[0].match(fe).map((t,i)=>L(s({},e,{output:n[i]})));return e=>{let n=0;return t[0].replace(fe,()=>i[n++](e)).replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,(e,t,n,i,r)=>`rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(i)}, ${r})`)}}),j(U),w((e,t)=>{if(!e.nodeType||void 0===e.setAttribute)return!1;{const r=t.style,a=t.children,o=t.scrollTop,s=t.scrollLeft,u=l(t,["style","children","scrollTop","scrollLeft"]),c="filter"===e.nodeName||e.parentNode&&"filter"===e.parentNode.nodeName;void 0!==o&&(e.scrollTop=o),void 0!==s&&(e.scrollLeft=s),void 0!==a&&(e.textContent=a);for(let t in r)if(r.hasOwnProperty(t)){var n=0===t.indexOf("--"),i=ve(t,r[t],n);"float"===t&&(t="cssFloat"),n?e.style.setProperty(t,i):e.style[t]=i}for(let t in u){const n=c?t:ye[t]||(ye[t]=t.replace(/([A-Z])/g,e=>"-"+e.toLowerCase()));"undefined"!==typeof e.getAttribute(n)&&e.setAttribute(n,u[t])}}},e=>e);var be,we;const je=(be=e=>Object(i.forwardRef)((t,n)=>{const a=c(),o=Object(i.useRef)(!0),d=Object(i.useRef)(null),f=Object(i.useRef)(null),h=Object(i.useCallback)(e=>{const t=d.current;d.current=new M(e,()=>{let e=!1;f.current&&(e=y.fn(f.current,d.current.getAnimatedValue())),f.current&&!1!==e||a()}),t&&t.detach()},[]);Object(i.useEffect)(()=>()=>{o.current=!1,d.current&&d.current.detach()},[]),Object(i.useImperativeHandle)(n,()=>P(f,o,a)),h(t);const p=d.current.getValue(),m=(p.scrollTop,p.scrollLeft,l(p,["scrollTop","scrollLeft"])),g=(e=>u.fun(e)&&!(e.prototype instanceof r.a.Component))(e)?void 0:e=>f.current=function(e,t){return t&&(u.fun(t)?t(e):u.obj(t)&&(t.current=e)),e}(e,n);return r.a.createElement(e,s({},m,{ref:g}))}),void 0===(we=!1)&&(we=!0),e=>(u.arr(e)?e:Object.keys(e)).reduce((e,t)=>{const n=we?t[0].toLowerCase()+t.substring(1):t;return e[n]=be(n),e},be))(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]);var ke=n("HMs9"),_e=n.n(ke),Oe=(n("AfnP"),r.a.createElement),xe=function(e){var t=e.className,n=e.animation,i=e.image,r=e.alt,a=J(n),o=n?je.img:"img";return Oe(o,{className:(t?t+" ":"")+"image",style:a,src:i,alt:r})},Ee=(n("yDpu"),r.a.createElement),Ae=function(e){var t=e.className,n=e.animation,r=e.video,a=Object(i.useRef)(),o=Object(i.useState)(!1),s=o[0],l=o[1],u=J(n),c=n?je.div:"div",d=function(){l(!0)};return Object(i.useEffect)(function(){var e=a.current;return e.addEventListener("canplay",d),function(){e.removeEventListener("canplay",d)}},[]),Ee(c,{className:(t?t+" ":"")+"video",style:u},Ee("video",{className:"video__element",style:{opacity:s?1:0},ref:a,playsInline:!0,autoPlay:!0,muted:!0,loop:!0},r.mp4&&Ee("source",{src:r.mp4,type:"video/mp4"}),r.webm&&Ee("source",{src:r.webm,type:"video/webm"}),"Your browser does not support the video tag."),!s&&Ee("div",{className:"video__overlay",style:{opacity:s?0:1}},"loading..."))},Te=(n("D+mZ"),r.a.createElement),Ce=function(e){var t,n,i=e.name,r=e.thumbnail,a=e.video,o=e.description,s=e.tags,l=e.href,u=e.credits,c=e.isReversed,d=e.animation,f=e.className,h={opacity:1,transform:"translate(0px, 0px)",from:{opacity:0,transform:"translate(10000px, 0px)"}},p=d?je.div:"div";return Te(p,{className:(f?f+" ":"")+"project"+(c?" project--reversed":""),style:d},Te("div",{className:"project__inner"},Te("h2",{className:"project__title"+(t=i,n=11,t.split(" ").reduce(function(e,t){return e||t.length>n},!1)?" project__title--smaller":"")},Te("span",{className:"project__highlight"},l?Te("a",{href:l,target:"__blank",rel:"noopener noreferrer",className:"project__link"},i):i)),Te("p",{className:"project__description"},Te("span",{className:"project__highlight"},o)),a?Te(_e.a,{height:400,offset:100,once:!0},Te(Ae,{className:"project__thumbnail project__thumbnail--video",video:a,animation:h})):Te(_e.a,{height:400,once:!0},Te(xe,{className:"project__thumbnail",animation:h,image:r,alt:i})),Te("ul",{className:"project__tags"},s.sort().map(function(e,t){return Te("li",{key:t,className:"project__tags__tag"},e)})),u&&u.length&&u.map(function(e,t){return Te("div",{key:t,className:"project__credit"},Te("span",{className:"project__highlight"},Te("span",{className:"project__credit__label"},e.label,":")," ",Te("strong",{className:"project__credit__value"},e.value)))})))},Pe=(n("AuPx"),r.a.createElement),Ve=function(e){var t=e.projects,n=((e,t)=>{const n=Object(i.useRef)(!1),r=u.fun(t),a=h(t),o=Object(i.useRef)(),l=G(e,(e,t)=>(0===e&&(o.current=[]),o.current.push(t),s({},a,{config:h(a.config,e),attach:e>0&&(()=>o.current[e-1])}))),c=l[0],d=l[1],f=l[2],p=Object(i.useMemo)(()=>e=>d((t,n)=>{e.reverse;const i=e.reverse?t+1:t-1,r=o.current[i];return s({},e,{config:h(e.config||a.config,t),attach:r&&(()=>r)})}),[e,a.reverse]);return Object(i.useEffect)(()=>void(n.current&&!r&&p(t))),Object(i.useEffect)(()=>void(n.current=!0),[]),r?[c,p,f]:c})(t.length,{opacity:1,transform:"translate(0px, 0px)",from:{opacity:0,transform:"translate(-1000px, 0px)"}});return Pe("div",{className:"project-gallery"},Pe("div",{className:"project-gallery__inner"},t.map(function(e,t){return Pe(Ce,{key:t,name:e.name,thumbnail:e.thumbnail,video:e.video,description:e.description,tags:e.tags,href:e.href,credits:e.credits,isReversed:(t+1)%2===0,animation:n[t],className:"project-gallery__item"})})))},Me=(n("uVvT"),r.a.createElement);t.default=function(){var e=[{name:"Busby Marou - The Great Divide",thumbnail:n("C0GJ"),description:"A follow-to-win contest which allowed the chance to meet the band. Exclusive video content could be unlocked after a streaming threshold had been met in each Australian region.",tags:["React","Spotify","Apple Music","NodeJS","MongoDB","Websockets","YouTube"],href:"https://thegreatdivide.com.au",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Warner Music Australia"},{label:"Designer",value:"Finn McLean"},{label:"DSP Integration",value:"Firepit Platforms"}]},{name:"Joy Division - Unknown Pleasures - Reimagined",thumbnail:n("OVGX"),video:{webm:"/static/video/jd_upr_video.webm"},description:'A microsite showcasing reimagined music videos created for the 40th aniversary of the seminal album "Unknown Pleasures".',tags:["React","YouTube"],href:"https://www.joydivisionofficial.com/reimagined/",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Rhino Records"},{label:"Designer",value:"Toni Hollis"}]},{name:"Marina - Orange Trees",thumbnail:n("uhJy"),description:"A fan activation with allowed the chance to unlock exclusive video content after a pre-save threshold had been met in each continent of the globe.",tags:["React","Spotify","Apple Music","Deezer","NodeJS","MongoDB","Websockets"],credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Atlantic Records"},{label:"Designers",value:"Finn McLean, Toni Hollis"},{label:"DSP Integration",value:"Firepit Platforms"}]},{name:"Disturbed - Evolution",thumbnail:"https://placehold.it/250x400",video:{mp4:"/static/video/d_e_tg_video.mp4"},description:'A Facebook camera effect that turns the user into Disturbed\'s mascot: "The Guy".',tags:["Augmented Reality","Spark AR","Facebook","Javascript"],href:"https://www.facebook.com/Disturbed/videos/1097834423714167/",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Warner Records"},{label:"Designer",value:"Eddie Tindame"},{label:"3D Model",value:"Project XIV"}]},{name:"#WarnerSquad",thumbnail:n("paSI"),description:"A rewards hub for fans of Warner Artists. This site offers Italian / English localisation and uses Wordpress as a headless CMS.",tags:["React","NodeJS","MongoDB","i18n","Wordpress"],href:"https://club.warnermusic.it",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Warner Music Italy"},{label:"Designer",value:"Eddie Tindame"}]},{name:"Spotify Listening Party",thumbnail:"https://placehold.it/250x400",video:{webm:"/static/video/slp_video.webm"},description:"A real-time synchronised listening / chat room experience where fans can connect with artists. Designed as a one-time fan activation, a countdown is set for a certain time and date and then the party begins! Chat can be moderated and includes an admin panel.",tags:["React","Spotify","NodeJS","Websockets"],credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Parlophone Records"},{label:"Designer",value:"Finn McLean"}]},{name:"#dualita",thumbnail:"https://placehold.it/250x400",video:{mp4:"/static/video/dl_ss_video.mp4",webm:"/static/video/dl_ss_video.webm"},description:'A Facebook camera effect / Snapchat lens that lets you sport Alita\'s war paint from the film Alita: Battle Angel. The main soundtrack "Swan Song" by Dua Lipa plays as you frown and apply the paint.',tags:["Augmented Reality","Spark AR","Facebook","Javascript","Snapchat","Snap Studio"],credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Warner Records"},{label:"Designer",value:"Eddie Tindame"}]},{name:"#LMHR",thumbnail:n("ofbL"),description:'A pro bono project for the charity "Love Music Hate Racism". Visitors can anonymously upload their personal stories of how racism has affected them in the past.',tags:["React","Wordpress","PHP","jQuery"],href:"https://www.lovemusichateracism.com/",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Love Music Hate Racism"},{label:"Designer",value:"Chris"}]}];return Me(r.a.Fragment,null,Me(o.a,null,Me("title",null,"Eddie Tindame | Work")),Me("div",{id:"work",className:"work"},Me("div",{className:"container"},Me(Ve,{projects:e}))))}},C0GJ:function(e,t){e.exports="/_next/static/images/bm-tgd-thumbnail-343aff9b448af5cf714feff526262256.jpg"},HMs9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.forceCheck=t.lazyload=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n("q1tI"),a=f(r),o=f(n("i8i4")),s=f(n("17x9")),l=n("Seim"),u=f(n("tvXG")),c=f(n("PTkm")),d=f(n("uUxy"));function f(e){return e&&e.__esModule?e:{default:e}}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function m(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var g=0,v=0,y=0,b=0,w="data-lazyload-listened",j=[],k=[],_=!1;try{var O=Object.defineProperty({},"passive",{get:function(){_=!0}});window.addEventListener("test",null,O)}catch(M){}var x=!!_&&{capture:!1,passive:!0},E=function(e){var t=o.default.findDOMNode(e);if(t instanceof HTMLElement){var n=(0,u.default)(t);(e.props.overflow&&n!==t.ownerDocument&&n!==document&&n!==document.documentElement?function(e,t){var n=o.default.findDOMNode(e),i=void 0,r=void 0,a=void 0,s=void 0;try{var l=t.getBoundingClientRect();i=l.top,r=l.left,a=l.height,s=l.width}catch(M){i=g,r=v,a=b,s=y}var u=window.innerHeight||document.documentElement.clientHeight,c=window.innerWidth||document.documentElement.clientWidth,d=Math.max(i,0),f=Math.max(r,0),h=Math.min(u,i+a)-d,p=Math.min(c,r+s)-f,m=void 0,w=void 0,j=void 0,k=void 0;try{var _=n.getBoundingClientRect();m=_.top,w=_.left,j=_.height,k=_.width}catch(M){m=g,w=v,j=b,k=y}var O=m-d,x=w-f,E=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return O-E[0]<=h&&O+j+E[1]>=0&&x-E[0]<=p&&x+k+E[1]>=0}(e,n):function(e){var t=o.default.findDOMNode(e);if(!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))return!1;var n=void 0,i=void 0;try{var r=t.getBoundingClientRect();n=r.top,i=r.height}catch(M){n=g,i=b}var a=window.innerHeight||document.documentElement.clientHeight,s=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return n-s[0]<=a&&n+i+s[1]>=0}(e))?e.visible||(e.props.once&&k.push(e),e.visible=!0,e.forceUpdate()):e.props.once&&e.visible||(e.visible=!1,e.props.unmountIfInvisible&&e.forceUpdate())}},A=function(){for(var e=0;e<j.length;++e){var t=j[e];E(t)}k.forEach(function(e){var t=j.indexOf(e);-1!==t&&j.splice(t,1)}),k=[]},T=void 0,C=null,P=function(e){function t(e){h(this,t);var n=p(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.visible=!1,n}return m(t,r.Component),i(t,[{key:"componentDidMount",value:function(){var e=window,t=this.props.scrollContainer;t&&"string"===typeof t&&(e=e.document.querySelector(t));var n=void 0!==this.props.debounce&&"throttle"===T||"debounce"===T&&void 0===this.props.debounce;if(n&&((0,l.off)(e,"scroll",C,x),(0,l.off)(window,"resize",C,x),C=null),C||(void 0!==this.props.debounce?(C=(0,c.default)(A,"number"===typeof this.props.debounce?this.props.debounce:300),T="debounce"):void 0!==this.props.throttle?(C=(0,d.default)(A,"number"===typeof this.props.throttle?this.props.throttle:300),T="throttle"):C=A),this.props.overflow){var i=(0,u.default)(o.default.findDOMNode(this));if(i&&"function"===typeof i.getAttribute){var r=+i.getAttribute(w)+1;1===r&&i.addEventListener("scroll",C,x),i.setAttribute(w,r)}}else if(0===j.length||n){var a=this.props,s=a.scroll,f=a.resize;s&&(0,l.on)(e,"scroll",C,x),f&&(0,l.on)(window,"resize",C,x)}j.push(this),E(this)}},{key:"shouldComponentUpdate",value:function(){return this.visible}},{key:"componentWillUnmount",value:function(){if(this.props.overflow){var e=(0,u.default)(o.default.findDOMNode(this));if(e&&"function"===typeof e.getAttribute){var t=+e.getAttribute(w)-1;0===t?(e.removeEventListener("scroll",C,x),e.removeAttribute(w)):e.setAttribute(w,t)}}var n=j.indexOf(this);-1!==n&&j.splice(n,1),0===j.length&&"undefined"!==typeof window&&((0,l.off)(window,"resize",C,x),(0,l.off)(window,"scroll",C,x))}},{key:"render",value:function(){return this.visible?this.props.children:this.props.placeholder?this.props.placeholder:a.default.createElement("div",{style:{height:this.props.height},className:"lazyload-placeholder"})}}]),t}();P.propTypes={once:s.default.bool,height:s.default.oneOfType([s.default.number,s.default.string]),offset:s.default.oneOfType([s.default.number,s.default.arrayOf(s.default.number)]),overflow:s.default.bool,resize:s.default.bool,scroll:s.default.bool,children:s.default.node,throttle:s.default.oneOfType([s.default.number,s.default.bool]),debounce:s.default.oneOfType([s.default.number,s.default.bool]),placeholder:s.default.node,scrollContainer:s.default.oneOfType([s.default.string,s.default.object]),unmountIfInvisible:s.default.bool},P.defaultProps={once:!1,offset:0,overflow:!1,resize:!1,scroll:!0,unmountIfInvisible:!1};var V=function(e){return e.displayName||e.name||"Component"};t.lazyload=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){return function(n){function o(){h(this,o);var e=p(this,(o.__proto__||Object.getPrototypeOf(o)).call(this));return e.displayName="LazyLoad"+V(t),e}return m(o,r.Component),i(o,[{key:"render",value:function(){return a.default.createElement(P,e,a.default.createElement(t,this.props))}}]),o}()}},t.default=P,t.forceCheck=A},OVGX:function(e,t){e.exports="/_next/static/images/jd-upr-thumbnail-8c6674b200410b3492585d547f7a4eae.jpg"},PTkm:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var i=void 0,r=void 0,a=void 0,o=void 0,s=void 0,l=function l(){var u=+new Date-o;u<t&&u>=0?i=setTimeout(l,t-u):(i=null,n||(s=e.apply(a,r),i||(a=null,r=null)))};return function(){a=this,r=arguments,o=+new Date;var u=n&&!i;return i||(i=setTimeout(l,t)),u&&(s=e.apply(a,r),a=null,r=null),s}}},Seim:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.on=function(e,t,n,i){i=i||!1,e.addEventListener?e.addEventListener(t,n,i):e.attachEvent&&e.attachEvent("on"+t,function(t){n.call(e,t||window.event)})},t.off=function(e,t,n,i){i=i||!1,e.removeEventListener?e.removeEventListener(t,n,i):e.detachEvent&&e.detachEvent("on"+t,n)}},cDxr:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/work",function(){var e=n("1Oj2");return{page:e.default||e}}])},ofbL:function(e,t){e.exports="/_next/static/images/lmhr-thumbnail-6bbd811c86d10857a22c33d9e77932fa.jpg"},paSI:function(e,t){e.exports="/_next/static/images/ws-thumbnail-2e9c5cedfe06298958947e54c98bd4e0.jpg"},tvXG:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(!(e instanceof HTMLElement))return document.documentElement;for(var t="absolute"===e.style.position,n=/(scroll|auto)/,i=e;i;){if(!i.parentNode)return e.ownerDocument||document.documentElement;var r=window.getComputedStyle(i),a=r.position,o=r.overflow,s=r["overflow-x"],l=r["overflow-y"];if("static"===a&&t)i=i.parentNode;else{if(n.test(o)&&n.test(s)&&n.test(l))return i;i=i.parentNode}}return e.ownerDocument||e.documentElement||document.documentElement}},uUxy:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var i,r;return t||(t=250),function(){var a=n||this,o=+new Date,s=arguments;i&&o<i+t?(clearTimeout(r),r=setTimeout(function(){i=o,e.apply(a,s)},t)):(i=o,e.apply(a,s))}}},uhJy:function(e,t){e.exports="/_next/static/images/m-ot-thumbnail-1020e7d2580dbb811aab3f7b711a220c.jpg"}},[["cDxr",1,0,2]]]);