(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"1Oj2":function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),i=n.n(r),o=n("m/Pd"),a=n.n(o);function s(){return(s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function l(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}const u={arr:Array.isArray,obj:e=>"[object Object]"===Object.prototype.toString.call(e),fun:e=>"function"===typeof e,str:e=>"string"===typeof e,num:e=>"number"===typeof e,und:e=>void 0===e,nul:e=>null===e,set:e=>e instanceof Set,map:e=>e instanceof Map,equ(e,t){if(typeof e!==typeof t)return!1;if(u.str(e)||u.num(e))return e===t;if(u.obj(e)&&u.obj(t)&&Object.keys(e).length+Object.keys(t).length===0)return!0;let n;for(n in e)if(!(n in t))return!1;for(n in t)if(e[n]!==t[n])return!1;return!u.und(n)||e===t}};function c(){const e=Object(r.useState)(!1)[1];return Object(r.useCallback)(()=>e(e=>!e),[])}function d(e,t){return u.und(e)||u.nul(e)?t:e}function h(e){return u.und(e)?[]:u.arr(e)?e:[e]}function f(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return u.fun(e)?e(...n):e}function p(e){const t=function(e){return e.to,e.from,e.config,e.onStart,e.onRest,e.onFrame,e.children,e.reset,e.reverse,e.force,e.immediate,e.delay,e.attach,e.destroyed,e.interpolateTo,e.ref,e.lazy,l(e,["to","from","config","onStart","onRest","onFrame","children","reset","reverse","force","immediate","delay","attach","destroyed","interpolateTo","ref","lazy"])}(e);if(u.und(t))return s({to:t},e);const n=Object.keys(e).reduce((n,r)=>u.und(t[r])?s({},n,{[r]:e[r]}):n,{});return s({to:t},n)}class m{constructor(){this.payload=void 0,this.children=[]}getAnimatedValue(){return this.getValue()}getPayload(){return this.payload||this}attach(){}detach(){}getChildren(){return this.children}addChild(e){0===this.children.length&&this.attach(),this.children.push(e)}removeChild(e){const t=this.children.indexOf(e);this.children.splice(t,1),0===this.children.length&&this.detach()}}class g extends m{constructor(){super(...arguments),this.payload=[],this.attach=()=>this.payload.forEach(e=>e instanceof m&&e.addChild(this)),this.detach=()=>this.payload.forEach(e=>e instanceof m&&e.removeChild(this))}}class v extends m{constructor(){super(...arguments),this.payload={},this.attach=()=>Object.values(this.payload).forEach(e=>e instanceof m&&e.addChild(this)),this.detach=()=>Object.values(this.payload).forEach(e=>e instanceof m&&e.removeChild(this))}getValue(e){void 0===e&&(e=!1);const t={};for(const n in this.payload){const r=this.payload[n];(!e||r instanceof m)&&(t[n]=r instanceof m?r[e?"getAnimatedValue":"getValue"]():r)}return t}getAnimatedValue(){return this.getValue(!0)}}let b,y;function w(e,t){b={fn:e,transform:t}}function j(e){y=e}let k,_=e=>"undefined"!==typeof window?window.requestAnimationFrame(e):-1;function O(e){k=e}let x,E=()=>Date.now();function A(e){x=e}let T,C,P=e=>e.current;function V(e){T=e}class M extends v{constructor(e,t){super(),this.update=void 0,this.payload=e.style?s({},e,{style:T(e.style)}):e,this.update=t,this.attach()}}let S=!1;const R=new Set,N=()=>{if(!S)return!1;let e=E();for(let t of R){let n=!1;for(let r=0;r<t.configs.length;r++){let i,o,a=t.configs[r];for(let t=0;t<a.animatedValues.length;t++){let r=a.animatedValues[t];if(r.done)continue;let s=a.fromValues[t],l=a.toValues[t],u=r.lastPosition,c=l instanceof m,d=Array.isArray(a.initialVelocity)?a.initialVelocity[t]:a.initialVelocity;if(c&&(l=l.getValue()),a.immediate)r.setValue(l),r.done=!0;else if("string"!==typeof s&&"string"!==typeof l){if(void 0!==a.duration)u=s+a.easing((e-r.startTime)/a.duration)*(l-s),i=e>=r.startTime+a.duration;else if(a.decay)u=s+d/(1-.998)*(1-Math.exp(-(1-.998)*(e-r.startTime))),(i=Math.abs(r.lastPosition-u)<.1)&&(l=u);else{o=void 0!==r.lastTime?r.lastTime:e,d=void 0!==r.lastVelocity?r.lastVelocity:a.initialVelocity,e>o+64&&(o=e);let t=Math.floor(e-o);for(let e=0;e<t;++e){u+=1*(d+=1*((-a.tension*(u-l)+-a.friction*d)/a.mass)/1e3)/1e3}let n=!(!a.clamp||0===a.tension)&&(s<l?u>l:u<l),c=Math.abs(d)<=a.precision,h=0===a.tension||Math.abs(l-u)<=a.precision;i=n||c&&h,r.lastVelocity=d,r.lastTime=e}c&&!a.toValues[t].done&&(i=!1),i?(r.value!==l&&(u=l),r.done=!0):n=!0,r.setValue(u),r.lastPosition=u}else r.setValue(l),r.done=!0}t.props.onFrame&&(t.values[a.name]=a.interpolation.getValue())}t.props.onFrame&&t.props.onFrame(t.values),n||(R.delete(t),t.stop(!0))}return R.size?C?C():_(N):S=!1,S},D=e=>{R.has(e)||R.add(e),S||(S=!0,_(C||N))},F=e=>{R.has(e)&&R.delete(e)};function W(e,t,n){if("function"===typeof e)return e;if(Array.isArray(e))return W({range:e,output:t,extrapolate:n});if(k&&"string"===typeof e.output[0])return k(e);const r=e,i=r.output,o=r.range||[0,1],a=r.extrapolateLeft||r.extrapolate||"extend",s=r.extrapolateRight||r.extrapolate||"extend",l=r.easing||(e=>e);return e=>{const t=function(e,t){for(var n=1;n<t.length-1&&!(t[n]>=e);++n);return n-1}(e,o);return function(e,t,n,r,i,o,a,s,l){let u=l?l(e):e;if(u<t){if("identity"===a)return u;"clamp"===a&&(u=t)}if(u>n){if("identity"===s)return u;"clamp"===s&&(u=n)}if(r===i)return r;if(t===n)return e<=t?r:i;t===-1/0?u=-u:n===1/0?u-=t:u=(u-t)/(n-t);u=o(u),r===-1/0?u=-u:i===1/0?u+=r:u=u*(i-r)+r;return u}(e,o[t],o[t+1],i[t],i[t+1],l,a,s,r.map)}}class L extends g{constructor(e,t,n,r){super(),this.calc=void 0,this.payload=e instanceof g&&!(e instanceof L)?e.getPayload():Array.isArray(e)?e:[e],this.calc=W(t,n,r)}getValue(){return this.calc(...this.payload.map(e=>e.getValue()))}updateConfig(e,t,n){this.calc=W(e,t,n)}interpolate(e,t,n){return new L(this,e,t,n)}}class q extends m{constructor(e){var t;super(),t=this,this.animatedStyles=new Set,this.value=void 0,this.startPosition=void 0,this.lastPosition=void 0,this.lastVelocity=void 0,this.startTime=void 0,this.lastTime=void 0,this.done=!1,this.setValue=function(e,n){void 0===n&&(n=!0),t.value=e,n&&t.flush()},this.value=e,this.startPosition=e,this.lastPosition=e}flush(){0===this.animatedStyles.size&&function e(t,n){"update"in t?n.add(t):t.getChildren().forEach(t=>e(t,n))}(this,this.animatedStyles),this.animatedStyles.forEach(e=>e.update())}clearStyles(){this.animatedStyles.clear()}getValue(){return this.value}interpolate(e,t,n){return new L(this,e,t,n)}}class I extends g{constructor(e){super(),this.payload=e.map(e=>new q(e))}setValue(e,t){void 0===t&&(t=!0),Array.isArray(e)?e.length===this.payload.length&&e.forEach((e,n)=>this.payload[n].setValue(e,t)):this.payload.forEach(n=>n.setValue(e,t))}getValue(){return this.payload.map(e=>e.getValue())}interpolate(e,t){return new L(this,e,t)}}let z=0;class H{constructor(){this.id=void 0,this.idle=!0,this.hasChanged=!1,this.guid=0,this.local=0,this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.listeners=[],this.queue=[],this.localQueue=void 0,this.getValues=()=>this.interpolations,this.id=z++}update(e){if(!e)return this;const t=p(e),n=t.delay,r=void 0===n?0:n,i=t.to,o=l(t,["delay","to"]);if(u.arr(i)||u.fun(i))this.queue.push(s({},o,{delay:r,to:i}));else if(i){let e={};Object.entries(i).forEach(t=>{let n=t[0];const i=s({to:{[n]:t[1]},delay:f(r,n)},o),a=e[i.delay]&&e[i.delay].to;e[i.delay]=s({},e[i.delay],i,{to:s({},a,i.to)})}),this.queue=Object.values(e)}return this.queue=this.queue.sort((e,t)=>e.delay-t.delay),this.diff(o),this}start(e){if(this.queue.length){this.idle=!1,this.localQueue&&this.localQueue.forEach(e=>{let t=e.from,n=void 0===t?{}:t,r=e.to,i=void 0===r?{}:r;u.obj(n)&&(this.merged=s({},n,this.merged)),u.obj(i)&&(this.merged=s({},this.merged,i))});const t=this.local=++this.guid,n=this.localQueue=this.queue;this.queue=[],n.forEach((r,i)=>{let o=r.delay,a=l(r,["delay"]);const s=r=>{i===n.length-1&&t===this.guid&&r&&(this.idle=!0,this.props.onRest&&this.props.onRest(this.merged)),e&&e()};let c=u.arr(a.to)||u.fun(a.to);o?setTimeout(()=>{t===this.guid&&(c?this.runAsync(a,s):this.diff(a).start(s))},o):c?this.runAsync(a,s):this.diff(a).start(s)})}else u.fun(e)&&this.listeners.push(e),this.props.onStart&&this.props.onStart(),D(this);return this}stop(e){return this.listeners.forEach(t=>t(e)),this.listeners=[],this}pause(e){return this.stop(!0),e&&F(this),this}runAsync(e,t){var n=this;e.delay;let r=l(e,["delay"]);const i=this.local;let o=Promise.resolve(void 0);if(u.arr(r.to))for(let a=0;a<r.to.length;a++){const e=a,t=s({},r,p(r.to[e]));u.arr(t.config)&&(t.config=t.config[e]),o=o.then(()=>{if(i===this.guid)return new Promise(e=>this.diff(t).start(e))})}else if(u.fun(r.to)){let e,t=0;o=o.then(()=>r.to(n=>{const o=s({},r,p(n));if(u.arr(o.config)&&(o.config=o.config[t]),t++,i===this.guid)return e=new Promise(e=>this.diff(o).start(e))},function(e){return void 0===e&&(e=!0),n.stop(e)}).then(()=>e))}o.then(t)}diff(e){this.props=s({},this.props,e);let t=this.props,n=t.from,r=void 0===n?{}:n,i=t.to,o=void 0===i?{}:i,a=t.config,l=void 0===a?{}:a,c=t.reverse,p=t.attach,m=t.reset,g=t.immediate;if(c){var v=[o,r];r=v[0],o=v[1]}this.merged=s({},r,this.merged,o),this.hasChanged=!1;let b=p&&p(this);if(this.animations=Object.entries(this.merged).reduce((e,t)=>{let n=t[0],i=t[1],o=e[n]||{};const a=u.num(i),c=u.str(i)&&!i.startsWith("#")&&!/\d/.test(i)&&!y[i],p=u.arr(i),v=!a&&!p&&!c;let w=u.und(r[n])?i:r[n],j=a||p?i:c?i:1,_=f(l,n);b&&(j=b.animations[n].parent);let O,x=o.parent,A=o.interpolation,T=h(b?j.getPayload():j),C=i;v&&(C=k({range:[0,1],output:[i,i]})(1));let P=A&&A.getValue();const V=!u.und(x)&&o.animatedValues.some(e=>!e.done),M=!u.equ(C,P),S=!u.equ(C,o.previous),R=!u.equ(_,o.config);if(m||S&&M||R){if(a||c)x=A=o.parent||new q(w);else if(p)x=A=o.parent||new I(w);else if(v){let e=o.interpolation&&o.interpolation.calc(o.parent.value);e=void 0===e||m?w:e,o.parent?(x=o.parent).setValue(0,!1):x=new q(0);const t={output:[e,i]};o.interpolation?(A=o.interpolation,o.interpolation.updateConfig(t)):A=x.interpolate(t)}return T=h(b?j.getPayload():j),O=h(x.getPayload()),m&&!v&&x.setValue(w,!1),this.hasChanged=!0,O.forEach(e=>{e.startPosition=e.value,e.lastPosition=e.value,e.lastVelocity=V?e.lastVelocity:void 0,e.lastTime=V?e.lastTime:void 0,e.startTime=E(),e.done=!1,e.animatedStyles.clear()}),f(g,n)&&x.setValue(v?j:i,!1),s({},e,{[n]:s({},o,{name:n,parent:x,interpolation:A,animatedValues:O,toValues:T,previous:C,config:_,fromValues:h(x.getValue()),immediate:f(g,n),initialVelocity:d(_.velocity,0),clamp:d(_.clamp,!1),precision:d(_.precision,.01),tension:d(_.tension,170),friction:d(_.friction,26),mass:d(_.mass,1),duration:_.duration,easing:d(_.easing,e=>e),decay:_.decay})})}return M?e:(v&&(x.setValue(1,!1),A.updateConfig({output:[C,C]})),x.done=!0,this.hasChanged=!0,s({},e,{[n]:s({},e[n],{previous:C})}))},this.animations),this.hasChanged){this.configs=Object.values(this.animations),this.values={},this.interpolations={};for(let e in this.animations)this.interpolations[e]=this.animations[e].interpolation,this.values[e]=this.animations[e].interpolation.getValue()}return this}destroy(){this.stop(),this.props={},this.merged={},this.animations={},this.interpolations={},this.values={},this.configs=[],this.local=0}}const G=(e,t)=>{const n=Object(r.useRef)(!1),i=Object(r.useRef)(),o=u.fun(t),a=Object(r.useMemo)(()=>{let n;return i.current&&(i.current.map(e=>e.destroy()),i.current=void 0),[new Array(e).fill().map((e,r)=>{const i=new H,a=o?f(t,r,i):t[r];return 0===r&&(n=a.ref),i.update(a),n||i.start(),i}),n]},[e]),s=a[0],l=a[1];i.current=s;Object(r.useImperativeHandle)(l,()=>({start:()=>Promise.all(i.current.map(e=>new Promise(t=>e.start(t)))),stop:e=>i.current.forEach(t=>t.stop(e)),get controllers(){return i.current}}));const c=Object(r.useMemo)(()=>e=>i.current.map((t,n)=>{t.update(o?f(e,n,t):e[n]),l||t.start()}),[e]);Object(r.useEffect)(()=>{n.current?o||c(t):l||i.current.forEach(e=>e.start())}),Object(r.useEffect)(()=>(n.current=!0,()=>i.current.forEach(e=>e.destroy())),[]);const d=i.current.map(e=>e.getValues());return o?[d,c,e=>i.current.forEach(t=>t.pause(e))]:d},J=e=>{const t=u.fun(e),n=G(1,t?e:[e]),r=n[0],i=n[1],o=n[2];return t?[r[0],i,o]:r};class $ extends v{constructor(e){void 0===e&&(e={}),super(),!e.transform||e.transform instanceof m||(e=b.transform(e)),this.payload=e}}const U={transparent:0,aliceblue:4042850303,antiquewhite:4209760255,aqua:16777215,aquamarine:2147472639,azure:4043309055,beige:4126530815,bisque:4293182719,black:255,blanchedalmond:4293643775,blue:65535,blueviolet:2318131967,brown:2771004159,burlywood:3736635391,burntsienna:3934150143,cadetblue:1604231423,chartreuse:2147418367,chocolate:3530104575,coral:4286533887,cornflowerblue:1687547391,cornsilk:4294499583,crimson:3692313855,cyan:16777215,darkblue:35839,darkcyan:9145343,darkgoldenrod:3095792639,darkgray:2846468607,darkgreen:6553855,darkgrey:2846468607,darkkhaki:3182914559,darkmagenta:2332068863,darkolivegreen:1433087999,darkorange:4287365375,darkorchid:2570243327,darkred:2332033279,darksalmon:3918953215,darkseagreen:2411499519,darkslateblue:1211993087,darkslategray:793726975,darkslategrey:793726975,darkturquoise:13554175,darkviolet:2483082239,deeppink:4279538687,deepskyblue:12582911,dimgray:1768516095,dimgrey:1768516095,dodgerblue:512819199,firebrick:2988581631,floralwhite:4294635775,forestgreen:579543807,fuchsia:4278255615,gainsboro:3705462015,ghostwhite:4177068031,gold:4292280575,goldenrod:3668254975,gray:2155905279,green:8388863,greenyellow:2919182335,grey:2155905279,honeydew:4043305215,hotpink:4285117695,indianred:3445382399,indigo:1258324735,ivory:4294963455,khaki:4041641215,lavender:3873897215,lavenderblush:4293981695,lawngreen:2096890111,lemonchiffon:4294626815,lightblue:2916673279,lightcoral:4034953471,lightcyan:3774873599,lightgoldenrodyellow:4210742015,lightgray:3553874943,lightgreen:2431553791,lightgrey:3553874943,lightpink:4290167295,lightsalmon:4288707327,lightseagreen:548580095,lightskyblue:2278488831,lightslategray:2005441023,lightslategrey:2005441023,lightsteelblue:2965692159,lightyellow:4294959359,lime:16711935,limegreen:852308735,linen:4210091775,magenta:4278255615,maroon:2147483903,mediumaquamarine:1724754687,mediumblue:52735,mediumorchid:3126187007,mediumpurple:2473647103,mediumseagreen:1018393087,mediumslateblue:2070474495,mediumspringgreen:16423679,mediumturquoise:1221709055,mediumvioletred:3340076543,midnightblue:421097727,mintcream:4127193855,mistyrose:4293190143,moccasin:4293178879,navajowhite:4292783615,navy:33023,oldlace:4260751103,olive:2155872511,olivedrab:1804477439,orange:4289003775,orangered:4282712319,orchid:3664828159,palegoldenrod:4008225535,palegreen:2566625535,paleturquoise:2951671551,palevioletred:3681588223,papayawhip:4293907967,peachpuff:4292524543,peru:3448061951,pink:4290825215,plum:3718307327,powderblue:2967529215,purple:2147516671,rebeccapurple:1714657791,red:4278190335,rosybrown:3163525119,royalblue:1097458175,saddlebrown:2336560127,salmon:4202722047,sandybrown:4104413439,seagreen:780883967,seashell:4294307583,sienna:2689740287,silver:3233857791,skyblue:2278484991,slateblue:1784335871,slategray:1887473919,slategrey:1887473919,snow:4294638335,springgreen:16744447,steelblue:1182971135,tan:3535047935,teal:8421631,thistle:3636451583,tomato:4284696575,turquoise:1088475391,violet:4001558271,wheat:4125012991,white:4294967295,whitesmoke:4126537215,yellow:4294902015,yellowgreen:2597139199},B="[-+]?\\d*\\.?\\d+",X=B+"%";function Q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return"\\(\\s*("+t.join(")\\s*,\\s*(")+")\\s*\\)"}const Y=new RegExp("rgb"+Q(B,B,B)),Z=new RegExp("rgba"+Q(B,B,B,B)),K=new RegExp("hsl"+Q(B,X,X)),ee=new RegExp("hsla"+Q(B,X,X,B)),te=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,ne=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,re=/^#([0-9a-fA-F]{6})$/,ie=/^#([0-9a-fA-F]{8})$/;function oe(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function ae(e,t,n){const r=n<.5?n*(1+t):n+t-n*t,i=2*n-r,o=oe(i,r,e+1/3),a=oe(i,r,e),s=oe(i,r,e-1/3);return Math.round(255*o)<<24|Math.round(255*a)<<16|Math.round(255*s)<<8}function se(e){const t=parseInt(e,10);return t<0?0:t>255?255:t}function le(e){return(parseFloat(e)%360+360)%360/360}function ue(e){const t=parseFloat(e);return t<0?0:t>1?255:Math.round(255*t)}function ce(e){const t=parseFloat(e);return t<0?0:t>100?1:t/100}function de(e){let t=function(e){let t;return"number"===typeof e?e>>>0===e&&e>=0&&e<=4294967295?e:null:(t=re.exec(e))?parseInt(t[1]+"ff",16)>>>0:U.hasOwnProperty(e)?U[e]:(t=Y.exec(e))?(se(t[1])<<24|se(t[2])<<16|se(t[3])<<8|255)>>>0:(t=Z.exec(e))?(se(t[1])<<24|se(t[2])<<16|se(t[3])<<8|ue(t[4]))>>>0:(t=te.exec(e))?parseInt(t[1]+t[1]+t[2]+t[2]+t[3]+t[3]+"ff",16)>>>0:(t=ie.exec(e))?parseInt(t[1],16)>>>0:(t=ne.exec(e))?parseInt(t[1]+t[1]+t[2]+t[2]+t[3]+t[3]+t[4]+t[4],16)>>>0:(t=K.exec(e))?(255|ae(le(t[1]),ce(t[2]),ce(t[3])))>>>0:(t=ee.exec(e))?(ae(le(t[1]),ce(t[2]),ce(t[3]))|ue(t[4]))>>>0:null}(e);return null===t?e:`rgba(${(4278190080&(t=t||0))>>>24}, ${(16711680&t)>>>16}, ${(65280&t)>>>8}, ${(255&t)/255})`}const he=/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,fe=/(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,pe=new RegExp(`(${Object.keys(U).join("|")})`,"g");let me={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0};const ge=["Webkit","Ms","Moz","O"];function ve(e,t,n){return null==t||"boolean"===typeof t||""===t?"":n||"number"!==typeof t||0===t||me.hasOwnProperty(e)&&me[e]?(""+t).trim():t+"px"}me=Object.keys(me).reduce((e,t)=>(ge.forEach(n=>e[((e,t)=>e+t.charAt(0).toUpperCase()+t.substring(1))(n,t)]=e[t]),e),me);const be={};V(e=>new $(e)),A("div"),O(e=>{const t=e.output.map(e=>e.replace(fe,de)).map(e=>e.replace(pe,de)),n=t[0].match(he).map(()=>[]);t.forEach(e=>{e.match(he).forEach((e,t)=>n[t].push(+e))});const r=t[0].match(he).map((t,r)=>W(s({},e,{output:n[r]})));return e=>{let n=0;return t[0].replace(he,()=>r[n++](e)).replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,(e,t,n,r,i)=>`rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`)}}),j(U),w((e,t)=>{if(!e.nodeType||void 0===e.setAttribute)return!1;{const i=t.style,o=t.children,a=t.scrollTop,s=t.scrollLeft,u=l(t,["style","children","scrollTop","scrollLeft"]),c="filter"===e.nodeName||e.parentNode&&"filter"===e.parentNode.nodeName;void 0!==a&&(e.scrollTop=a),void 0!==s&&(e.scrollLeft=s),void 0!==o&&(e.textContent=o);for(let t in i)if(i.hasOwnProperty(t)){var n=0===t.indexOf("--"),r=ve(t,i[t],n);"float"===t&&(t="cssFloat"),n?e.style.setProperty(t,r):e.style[t]=r}for(let t in u){const n=c?t:be[t]||(be[t]=t.replace(/([A-Z])/g,e=>"-"+e.toLowerCase()));"undefined"!==typeof e.getAttribute(n)&&e.setAttribute(n,u[t])}}},e=>e);var ye,we;const je=(ye=e=>Object(r.forwardRef)((t,n)=>{const o=c(),a=Object(r.useRef)(!0),d=Object(r.useRef)(null),h=Object(r.useRef)(null),f=Object(r.useCallback)(e=>{const t=d.current;d.current=new M(e,()=>{let e=!1;h.current&&(e=b.fn(h.current,d.current.getAnimatedValue())),h.current&&!1!==e||o()}),t&&t.detach()},[]);Object(r.useEffect)(()=>()=>{a.current=!1,d.current&&d.current.detach()},[]),Object(r.useImperativeHandle)(n,()=>P(h,a,o)),f(t);const p=d.current.getValue(),m=(p.scrollTop,p.scrollLeft,l(p,["scrollTop","scrollLeft"])),g=(e=>u.fun(e)&&!(e.prototype instanceof i.a.Component))(e)?void 0:e=>h.current=function(e,t){return t&&(u.fun(t)?t(e):u.obj(t)&&(t.current=e)),e}(e,n);return i.a.createElement(e,s({},m,{ref:g}))}),void 0===(we=!1)&&(we=!0),e=>(u.arr(e)?e:Object.keys(e)).reduce((e,t)=>{const n=we?t[0].toLowerCase()+t.substring(1):t;return e[n]=ye(n),e},ye))(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]);var ke=n("HMs9"),_e=n.n(ke),Oe=(n("AfnP"),i.a.createElement),xe=function(e){var t=e.className,n=e.animation,r=e.image,i=e.alt,o=J(n),a=n?je.img:"img";return Oe(a,{className:(t?t+" ":"")+"image",style:o,src:r,alt:i})},Ee=(n("yDpu"),i.a.createElement),Ae=function(e){var t=e.className,n=e.animation,r=e.video,i=J(n),o=n?je.video:"video";return Ee(o,{className:(t?t+" ":"")+"video",style:i,playsinline:!0,autoPlay:!0,muted:!0,loop:!0},r.mp4&&Ee("source",{src:r.mp4,type:"video/mp4"}),r.webm&&Ee("source",{src:r.webm,type:"video/webm"}),"Your browser does not support the video tag.")},Te=(n("D+mZ"),i.a.createElement),Ce=function(e){var t,n,r=e.name,i=e.thumbnail,o=e.video,a=e.description,s=e.tags,l=e.href,u=e.credits,c=e.isReversed,d=e.animation,h=e.className,f={opacity:1,transform:"translate(0px, 0px)",from:{opacity:0,transform:"translate(10000px, 0px)"}},p=d?je.div:"div";return Te(p,{className:(h?h+" ":"")+"project"+(c?" project--reversed":""),style:d},Te("div",{className:"project__inner"},Te("h2",{className:"project__title"+(t=r,n=11,t.split(" ").reduce(function(e,t){return e||t.length>n},!1)?" project__title--smaller":"")},Te("span",{className:"project__highlight"},l?Te("a",{href:l,target:"__blank",rel:"noopener noreferrer",className:"project__link"},r):r)),Te("p",{className:"project__description"},Te("span",{className:"project__highlight"},a)),o?Te(_e.a,{height:400,offset:100,once:!0},Te(Ae,{className:"project__thumbnail project__thumbnail--video",video:o,animation:f})):Te(_e.a,{height:400,once:!0},Te(xe,{className:"project__thumbnail",animation:f,image:i,alt:r})),Te("ul",{className:"project__tags"},s.sort().map(function(e,t){return Te("li",{key:t,className:"project__tags__tag"},e)})),u&&u.length&&u.map(function(e,t){return Te("div",{key:t,className:"project__credit"},Te("span",{className:"project__highlight"},Te("span",{className:"project__credit__label"},e.label,":")," ",Te("strong",{className:"project__credit__value"},e.value)))})))},Pe=(n("AuPx"),i.a.createElement),Ve=function(e){var t=e.projects,n=((e,t)=>{const n=Object(r.useRef)(!1),i=u.fun(t),o=f(t),a=Object(r.useRef)(),l=G(e,(e,t)=>(0===e&&(a.current=[]),a.current.push(t),s({},o,{config:f(o.config,e),attach:e>0&&(()=>a.current[e-1])}))),c=l[0],d=l[1],h=l[2],p=Object(r.useMemo)(()=>e=>d((t,n)=>{e.reverse;const r=e.reverse?t+1:t-1,i=a.current[r];return s({},e,{config:f(e.config||o.config,t),attach:i&&(()=>i)})}),[e,o.reverse]);return Object(r.useEffect)(()=>void(n.current&&!i&&p(t))),Object(r.useEffect)(()=>void(n.current=!0),[]),i?[c,p,h]:c})(t.length,{opacity:1,transform:"translate(0px, 0px)",from:{opacity:0,transform:"translate(-1000px, 0px)"}});return Pe("div",{className:"project-gallery"},Pe("div",{className:"project-gallery__inner"},t.map(function(e,t){return Pe(Ce,{key:t,name:e.name,thumbnail:e.thumbnail,video:e.video,description:e.description,tags:e.tags,href:e.href,credits:e.credits,isReversed:(t+1)%2===0,animation:n[t],className:"project-gallery__item"})})))},Me=(n("uVvT"),i.a.createElement);t.default=function(){var e=[{name:"Busby Marou - The Great Divide",thumbnail:n("C0GJ"),description:"A follow-to-win contest which allowed the chance to meet the band. Exclusive video content could be unlocked after a streaming threshold had been met in each Australian region.",tags:["React","Spotify","Apple Music","NodeJS","MongoDB","Websockets","YouTube"],href:"https://thegreatdivide.com.au",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Warner Music Australia"},{label:"Designer",value:"Finn McLean"},{label:"DSP Integration",value:"Firepit Platforms"}]},{name:"Joy Division - Unknown Pleasures - Reimagined",thumbnail:n("OVGX"),video:{webm:"/static/video/jd_upr_video.webm"},description:'A microsite showcasing reimagined music videos created for the 40th aniversary of the seminal album "Unknown Pleasures".',tags:["React","YouTube"],href:"https://www.joydivisionofficial.com/reimagined/",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Rhino Records"},{label:"Designer",value:"Toni Hollis"}]},{name:"Marina - Orange Trees",thumbnail:n("uhJy"),description:"A fan activation with allowed the chance to unlock exclusive video content after a pre-save threshold had been met in each continent of the globe.",tags:["React","Spotify","Apple Music","Deezer","NodeJS","MongoDB","Websockets"],credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Atlantic Records"},{label:"Designers",value:"Finn McLean, Toni Hollis"},{label:"DSP Integration",value:"Firepit Platforms"}]},{name:"Disturbed - Evolution",thumbnail:"https://placehold.it/250x400",video:{mp4:"/static/video/d_e_tg_video.mp4"},description:'A Facebook camera effect that turns the user into Disturbed\'s mascot: "The Guy".',tags:["Augmented Reality","Spark AR","Facebook","Javascript"],href:"https://www.facebook.com/Disturbed/videos/1097834423714167/",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Warner Records"},{label:"Designer",value:"Eddie Tindame"},{label:"3D Model",value:"Project XIV"}]},{name:"#WarnerSquad",thumbnail:n("paSI"),description:"A rewards hub for fans of Warner Artists. This site offers Italian / English localisation and uses Wordpress as a headless CMS.",tags:["React","NodeJS","MongoDB","i18n","Wordpress"],href:"https://club.warnermusic.it",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Warner Music Italy"},{label:"Designer",value:"Eddie Tindame"}]},{name:"Spotify Listening Party",thumbnail:"https://placehold.it/250x400",video:{webm:"/static/video/slp_video.webm"},description:"A real-time synchronised listening / chat room experience where fans can connect with artists. Designed as a one-time fan activation, a countdown is set for a certain time and date and then the party begins! Chat can be moderated and includes an admin panel.",tags:["React","Spotify","NodeJS","Websockets"],credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Parlophone Records"},{label:"Designer",value:"Finn McLean"}]},{name:"#dualita",thumbnail:"https://placehold.it/250x400",video:{mp4:"/static/video/dl_ss_video.mp4",webm:"/static/video/dl_ss_video.webm"},description:'A Facebook camera effect / Snapchat lens that lets you sport Alita\'s war paint from the film Alita: Battle Angel. The main soundtrack "Swan Song" by Dua Lipa plays as you frown and apply the paint.',tags:["Augmented Reality","Spark AR","Facebook","Javascript","Snapchat","Snap Studio"],credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Warner Records"},{label:"Designer",value:"Eddie Tindame"}]},{name:"#LMHR",thumbnail:n("ofbL"),description:'A pro bono project for the charity "Love Music Hate Racism". Visitors can anonymously upload their personal stories of how racism has affected them in the past.',tags:["React","Wordpress","PHP","jQuery"],href:"https://www.lovemusichateracism.com/",credits:[{label:"Where",value:"Firepit Technology"},{label:"Commissioner",value:"Love Music Hate Racism"},{label:"Designer",value:"Chris"}]}];return Me(i.a.Fragment,null,Me(a.a,null,Me("title",null,"Eddie Tindame | Work")),Me("div",{id:"work",className:"work"},Me("div",{className:"container"},Me(Ve,{projects:e}))))}},C0GJ:function(e,t){e.exports="/_next/static/images/bm-tgd-thumbnail-343aff9b448af5cf714feff526262256.jpg"},HMs9:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.forceCheck=t.lazyload=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n("q1tI"),o=h(i),a=h(n("i8i4")),s=h(n("17x9")),l=n("Seim"),u=h(n("tvXG")),c=h(n("PTkm")),d=h(n("uUxy"));function h(e){return e&&e.__esModule?e:{default:e}}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function m(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var g=0,v=0,b=0,y=0,w="data-lazyload-listened",j=[],k=[],_=!1;try{var O=Object.defineProperty({},"passive",{get:function(){_=!0}});window.addEventListener("test",null,O)}catch(M){}var x=!!_&&{capture:!1,passive:!0},E=function(e){var t=a.default.findDOMNode(e);if(t instanceof HTMLElement){var n=(0,u.default)(t);(e.props.overflow&&n!==t.ownerDocument&&n!==document&&n!==document.documentElement?function(e,t){var n=a.default.findDOMNode(e),r=void 0,i=void 0,o=void 0,s=void 0;try{var l=t.getBoundingClientRect();r=l.top,i=l.left,o=l.height,s=l.width}catch(M){r=g,i=v,o=y,s=b}var u=window.innerHeight||document.documentElement.clientHeight,c=window.innerWidth||document.documentElement.clientWidth,d=Math.max(r,0),h=Math.max(i,0),f=Math.min(u,r+o)-d,p=Math.min(c,i+s)-h,m=void 0,w=void 0,j=void 0,k=void 0;try{var _=n.getBoundingClientRect();m=_.top,w=_.left,j=_.height,k=_.width}catch(M){m=g,w=v,j=y,k=b}var O=m-d,x=w-h,E=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return O-E[0]<=f&&O+j+E[1]>=0&&x-E[0]<=p&&x+k+E[1]>=0}(e,n):function(e){var t=a.default.findDOMNode(e);if(!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))return!1;var n=void 0,r=void 0;try{var i=t.getBoundingClientRect();n=i.top,r=i.height}catch(M){n=g,r=y}var o=window.innerHeight||document.documentElement.clientHeight,s=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return n-s[0]<=o&&n+r+s[1]>=0}(e))?e.visible||(e.props.once&&k.push(e),e.visible=!0,e.forceUpdate()):e.props.once&&e.visible||(e.visible=!1,e.props.unmountIfInvisible&&e.forceUpdate())}},A=function(){for(var e=0;e<j.length;++e){var t=j[e];E(t)}k.forEach(function(e){var t=j.indexOf(e);-1!==t&&j.splice(t,1)}),k=[]},T=void 0,C=null,P=function(e){function t(e){f(this,t);var n=p(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.visible=!1,n}return m(t,i.Component),r(t,[{key:"componentDidMount",value:function(){var e=window,t=this.props.scrollContainer;t&&"string"===typeof t&&(e=e.document.querySelector(t));var n=void 0!==this.props.debounce&&"throttle"===T||"debounce"===T&&void 0===this.props.debounce;if(n&&((0,l.off)(e,"scroll",C,x),(0,l.off)(window,"resize",C,x),C=null),C||(void 0!==this.props.debounce?(C=(0,c.default)(A,"number"===typeof this.props.debounce?this.props.debounce:300),T="debounce"):void 0!==this.props.throttle?(C=(0,d.default)(A,"number"===typeof this.props.throttle?this.props.throttle:300),T="throttle"):C=A),this.props.overflow){var r=(0,u.default)(a.default.findDOMNode(this));if(r&&"function"===typeof r.getAttribute){var i=+r.getAttribute(w)+1;1===i&&r.addEventListener("scroll",C,x),r.setAttribute(w,i)}}else if(0===j.length||n){var o=this.props,s=o.scroll,h=o.resize;s&&(0,l.on)(e,"scroll",C,x),h&&(0,l.on)(window,"resize",C,x)}j.push(this),E(this)}},{key:"shouldComponentUpdate",value:function(){return this.visible}},{key:"componentWillUnmount",value:function(){if(this.props.overflow){var e=(0,u.default)(a.default.findDOMNode(this));if(e&&"function"===typeof e.getAttribute){var t=+e.getAttribute(w)-1;0===t?(e.removeEventListener("scroll",C,x),e.removeAttribute(w)):e.setAttribute(w,t)}}var n=j.indexOf(this);-1!==n&&j.splice(n,1),0===j.length&&"undefined"!==typeof window&&((0,l.off)(window,"resize",C,x),(0,l.off)(window,"scroll",C,x))}},{key:"render",value:function(){return this.visible?this.props.children:this.props.placeholder?this.props.placeholder:o.default.createElement("div",{style:{height:this.props.height},className:"lazyload-placeholder"})}}]),t}();P.propTypes={once:s.default.bool,height:s.default.oneOfType([s.default.number,s.default.string]),offset:s.default.oneOfType([s.default.number,s.default.arrayOf(s.default.number)]),overflow:s.default.bool,resize:s.default.bool,scroll:s.default.bool,children:s.default.node,throttle:s.default.oneOfType([s.default.number,s.default.bool]),debounce:s.default.oneOfType([s.default.number,s.default.bool]),placeholder:s.default.node,scrollContainer:s.default.oneOfType([s.default.string,s.default.object]),unmountIfInvisible:s.default.bool},P.defaultProps={once:!1,offset:0,overflow:!1,resize:!1,scroll:!0,unmountIfInvisible:!1};var V=function(e){return e.displayName||e.name||"Component"};t.lazyload=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){return function(n){function a(){f(this,a);var e=p(this,(a.__proto__||Object.getPrototypeOf(a)).call(this));return e.displayName="LazyLoad"+V(t),e}return m(a,i.Component),r(a,[{key:"render",value:function(){return o.default.createElement(P,e,o.default.createElement(t,this.props))}}]),a}()}},t.default=P,t.forceCheck=A},OVGX:function(e,t){e.exports="/_next/static/images/jd-upr-thumbnail-8c6674b200410b3492585d547f7a4eae.jpg"},PTkm:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var r=void 0,i=void 0,o=void 0,a=void 0,s=void 0,l=function l(){var u=+new Date-a;u<t&&u>=0?r=setTimeout(l,t-u):(r=null,n||(s=e.apply(o,i),r||(o=null,i=null)))};return function(){o=this,i=arguments,a=+new Date;var u=n&&!r;return r||(r=setTimeout(l,t)),u&&(s=e.apply(o,i),o=null,i=null),s}}},Seim:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.on=function(e,t,n,r){r=r||!1,e.addEventListener?e.addEventListener(t,n,r):e.attachEvent&&e.attachEvent("on"+t,function(t){n.call(e,t||window.event)})},t.off=function(e,t,n,r){r=r||!1,e.removeEventListener?e.removeEventListener(t,n,r):e.detachEvent&&e.detachEvent("on"+t,n)}},cDxr:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/work",function(){var e=n("1Oj2");return{page:e.default||e}}])},ofbL:function(e,t){e.exports="/_next/static/images/lmhr-thumbnail-6bbd811c86d10857a22c33d9e77932fa.jpg"},paSI:function(e,t){e.exports="/_next/static/images/ws-thumbnail-2e9c5cedfe06298958947e54c98bd4e0.jpg"},tvXG:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(!(e instanceof HTMLElement))return document.documentElement;for(var t="absolute"===e.style.position,n=/(scroll|auto)/,r=e;r;){if(!r.parentNode)return e.ownerDocument||document.documentElement;var i=window.getComputedStyle(r),o=i.position,a=i.overflow,s=i["overflow-x"],l=i["overflow-y"];if("static"===o&&t)r=r.parentNode;else{if(n.test(a)&&n.test(s)&&n.test(l))return r;r=r.parentNode}}return e.ownerDocument||e.documentElement||document.documentElement}},uUxy:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var r,i;return t||(t=250),function(){var o=n||this,a=+new Date,s=arguments;r&&a<r+t?(clearTimeout(i),i=setTimeout(function(){r=a,e.apply(o,s)},t)):(r=a,e.apply(o,s))}}},uhJy:function(e,t){e.exports="/_next/static/images/m-ot-thumbnail-1020e7d2580dbb811aab3f7b711a220c.jpg"}},[["cDxr",1,0,2]]]);