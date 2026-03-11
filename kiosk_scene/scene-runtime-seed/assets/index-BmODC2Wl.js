var Tt=Object.defineProperty;var Rt=(a,e,t)=>e in a?Tt(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var b=(a,e,t)=>Rt(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();function D(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function d(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Ze(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ve(a,e){if(!D(a)||!D(e))return e??a;const t={...a};for(const[i,n]of Object.entries(e)){if(Array.isArray(n)){t[i]=n.slice();continue}if(D(n)&&D(t[i])){t[i]=ve(t[i],n);continue}t[i]=n}return t}function Mt(a,e=40){return Array.isArray(a)?a.map(t=>d(t,e).toLowerCase()).filter(Boolean):[]}const ae={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},Xe={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function Oe(a){var t,i,n,s,l,o,f,v,r,x,C,k,$,w;const e=ve(ae,D(a)?a:{});return{version:1,assistant:{name:d((t=e.assistant)==null?void 0:t.name,40)||ae.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:D(e.links)?Object.fromEntries(Object.entries(e.links).map(([A,U])=>[d(A,64),d(U,1024)]).filter(([A,U])=>A&&U)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||ae.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||ae.scene.configUrl},state:{provider:((l=e.state)==null?void 0:l.provider)==="ha"?"ha":"json",stateUrl:d((o=e.state)==null?void 0:o.stateUrl,1024)||ae.state.stateUrl,apiUrl:d((f=e.state)==null?void 0:f.apiUrl,1024)||void 0,haApiFallback:((v=e.state)==null?void 0:v.haApiFallback)===!0,idleLinesUrl:d((r=e.state)==null?void 0:r.idleLinesUrl,1024)||ae.state.idleLinesUrl,entityMapUrl:d((x=e.state)==null?void 0:x.entityMapUrl,1024)||void 0},control:{provider:((C=e.control)==null?void 0:C.provider)==="ha"?"ha":"json",controlUrl:d((k=e.control)==null?void 0:k.controlUrl,1024)||ae.control.controlUrl,apiUrl:d(($=e.control)==null?void 0:$.apiUrl,1024)||void 0,entityMapUrl:d((w=e.control)==null?void 0:w.entityMapUrl,1024)||void 0}}}function Ve(a){var t,i,n,s,l;const e=ve(Xe,D(a)?a:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||Xe.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:D(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,f])=>[d(o,32),d(f,1024)]).filter(([o,f])=>o&&f)):{},viewPresets:D(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,f])=>d(o,32)&&D(f))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((l=e.capabilities)==null?void 0:l.supportsPointerFocus)===!0}}}const Q={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},Dt=["full","torso","head"];function ue(a,e=Date.now()){var o,f,v,r,x,C,k;const t=ve(Q,D(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((o=t.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:d((f=t.page)==null?void 0:f.target,40)||null,until:d((v=t.page)==null?void 0:v.until,64)||null},cue:{cue:d((r=t.cue)==null?void 0:r.cue,32)||null,emotion:d((x=t.cue)==null?void 0:x.emotion,32)||null,motion:d((C=t.cue)==null?void 0:C.motion,32)||null,until:d((k=t.cue)==null?void 0:k.until,64)||null}},n=d(t.viewPreset,16).toLowerCase();i.viewPreset=Dt.includes(n)?n:null;const s=Ze(i.page.until);i.page.mode==="pinned"&&(i.page.target?i.page.until&&(!s||s<=e)&&(i.page={mode:"auto",target:null,until:null}):i.page={mode:"auto",target:null,until:null});const l=Ze(i.cue.until);return i.cue.until&&(!l||l<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function Me(a,e,t=Date.now()){return ue(ve(ue(a,t),D(e)?e:{}),t)}function Nt(a,e,t=Date.now()){return ue({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function Bt(a,e,t=3e4,i=Date.now()){const n=d(e,40),s=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return ue({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},i)}function ht(a,e){var l,o,f;const t={...a||{}},i=d((l=e==null?void 0:e.cue)==null?void 0:l.cue,32),n=d((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),s=d((f=e==null?void 0:e.cue)==null?void 0:f.motion,32);return i&&(t.cue=i),n&&(t.emotion=n),s&&(t.motion=s),t}function K(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function Qe(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function Ft(a){return D(a)&&D(a.config)?a.config:a}function _t(a,e){const t={...a};return D(e)&&(typeof e.id=="string"&&(t.id=d(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>D(i)))),t}function De(a,e){const t=Ft(a),i=Array.isArray(e.pages)?e.pages.slice():[],n=D(t)&&Array.isArray(t.pages)?t.pages:[],s=i.map(k=>{const $=n.find(w=>d(D(w)?w.id:"",40)===k.id);return _t(k,$)}),l=D(t)&&D(t.rotation)?t.rotation:{},o=D(e.display)?e.display:{},f=D(t)&&D(t.display)?t.display:{},v=D(o.safeArea)?o.safeArea:{},r=D(f.safeArea)?f.safeArea:{},x=Array.isArray(l.order)?l.order:e.rotation.order,C=Mt(x).filter((k,$,w)=>s.some(A=>A.id===k)&&w.indexOf(k)===$);return{version:1,rotation:{order:C.length?C:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(l.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:K(r.top,K(v.top,0)),right:K(r.right,K(v.right,0)),bottom:K(r.bottom,K(v.bottom,0)),left:K(r.left,K(v.left,0))},layoutPaddingPx:K(f.layoutPaddingPx,K(o.layoutPaddingPx,16)),layoutGapPx:K(f.layoutGapPx,K(o.layoutGapPx,16)),globalScale:Qe(f.globalScale,Qe(o.globalScale,1))},pages:s}}function Ot(a,e=220){const t=d(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},n=t.replace(/\[(emotion|activity|cue|motion|page|preset|view|size)\s*:\s*([a-z0-9_-]+)\]/gi,(s,l,o)=>{const f=d(l,16).toLowerCase(),v=d(o,32).toLowerCase();return(f==="emotion"||f==="activity"||f==="cue"||f==="motion")&&v&&(i[f]=v)," "});return{text:d(n,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const vt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function pe(a,e={}){const t=D(a)?a:{},i={...vt,...e};return{version:1,assistant:d(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:d(t.status??i.status,255),message:d(t.message??i.message,255),source:d(t.source??i.source,64),updatedAt:d(t.updatedAt??i.updatedAt,64),emotion:d(t.emotion??i.emotion,32)||null,activity:d(t.activity??i.activity,32)||null,cue:d(t.cue??i.cue,32)||null,intensity:Ht(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:d(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:d(t.event??i.event,64)}}function Ht(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function jt(a,e){return a.order[e]||a.order[0]||""}function zt(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function Vt(a,e,t,i){const n=Array.isArray(a.order)?a.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let l=1;l<=n.length;l+=1){const o=(s+l*t+n.length)%n.length;if(i(n[o]))return o}return s}function Wt(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=a.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:zt(a.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(a.force){const l=jt(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(l)?a.activeIndex:Math.max(0,t.findIndex(f=>a.isEligible(f))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let s=a.activeIndex;for(let l=1;l<=t.length;l+=1){const o=(a.activeIndex+l)%t.length;if(a.isEligible(t[o])){s=o;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const yt={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},qt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function et(a){const e=d(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:qt.some(t=>e.includes(t)):!1}function Gt(a,e){const t=pe(a),i=d(t.status,72),n=d(t.message,220);if(!(t.online!==!1&&(et(i)||et(n))))return{state:t,hasTechnicalFailure:!1};const o=d(t.emotion,32).toLowerCase(),f=d(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:o==="error"?"calm":o||null,activity:d(t.activity,32).toLowerCase()==="error"?"idle":d(t.activity,32)||null,cue:d(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:f==="error"?"idle_soft":f||null},hasTechnicalFailure:!0}}function Kt(a,e){const t=(e==null?void 0:e.copy)??yt,i=pe(a),n=Ot(i.message,220),s=Gt({...i,message:n.text,emotion:d(i.emotion,32)||n.emotion||null,activity:d(i.activity,32)||n.activity||null,cue:d(i.cue,32)||n.cue||null,motion:d(i.motion,32)||n.motion||null},{healthyStatus:t.technicalHealthyLabel}),l=s.state,o=d(l.message,180),f=d(l.activity,32).toLowerCase(),v=l.online!==!1&&f!=="offline",r=!!l.busy||f==="thinking"||f==="busy"||f==="acting",x=l.speaking===!0||f==="speaking",C=v?r?t.busyLabel:o||x?t.speakingLabel:s.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,k=o?t.messageCaption:s.hasTechnicalFailure?t.statusCaption:t.modeCaption,$=o||(v?r?t.busyBody:d(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:l,hasTechnicalFailure:s.hasTechnicalFailure,caption:k,label:C,body:$,bodyKey:[k,C,$].join(":")}}function Jt(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function tt(a,e=-1){const t=Array.isArray(a)?a.map(n=>d(n,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function Yt(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!d(a==null?void 0:a.message,180);return e&&!t&&!i}const Zt={cue:null,emotion:null,motion:null,until:null},Xt={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Qt(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function bt(a){return a.endsWith("/")?a:`${a}/`}function wt(a){try{const e=new URL(a,window.location.href),t=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return t?new URL(t[0],e.origin).toString():""}catch{return""}}function Ce(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;if(t.startsWith("/")){const n=wt(a||window.location.href);if(n)return new URL(t.slice(1),n).toString();const s=new URL(window.location.href).origin;return new URL(t,s).toString()}const i=new URL(bt(d(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function Ae(a){const e=d(a,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const t=wt(window.location.href);return t?new URL(e.slice(1),t).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function ea(a,e,t){const i=d(a.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?Ae(i):new URL("../avatar.html",new URL(bt(d(t,1024)||"."),window.location.href)).toString()}function ta(a,e){const t=d(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function aa(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[n,s]of Object.entries(i)){const l=d(n,64);if(!l||s==null)continue;const o=typeof s=="boolean"?s?"1":"0":String(s);t.searchParams.set(l,o)}return t.toString()}function at(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),Ce(t,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([n,s])=>[d(n,64),Ae(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Ae(a.state.stateUrl),idleLinesUrl:Ae(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:Ce(t,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:Ce(t,e.fallbackPortrait||""),motionMapUrl:Ce(t,e.motionMapUrl||""),presetThumbs:i}}}class ia{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"rendererConfigBlobUrl","");b(this,"currentState");b(this,"currentCue",{...Zt});b(this,"currentPreset","full");b(this,"currentBubble",{...Xt});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var n;const t=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!t||e.source!==t||!Qt(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Ve({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Oe(e.rendererConfig||{}),this.currentState=pe({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const t=ea(this.options,this.manifest,this.assetRoot),i={...this.options.query||{}};try{if(new URL(t,window.location.href).origin===window.location.origin){const v=at(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(v)],{type:"application/json"})),i.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const n=aa(t,{...this.options,query:i});this.targetOrigin=ta(n,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const l=document.createElement("iframe");l.className="ks-live2d-iframe",l.src=n,l.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,l.loading="eager",l.allow="autoplay",Object.assign(l.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&l.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);s.append(l,o),this.host.append(s),l.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=l,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=pe(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(n,s),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:at(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=ht(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function ra(a={}){return new ia(a)}const na={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},it={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class sa{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,n,s),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=n;const l=this.resolveImageUrl(e.assetRoot);l&&(i.src=l,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||it,i=t[e]||t.full||it.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return na}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),n=t.replace(/^\.?\//,"");return i?`${i}/${n}`:n}}function oa(a={}){return new sa(a)}function la(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function St(){var a;for(const e of la())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function da(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function ca(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=d(t.entity_id,255);i&&(e[i]=t)}return e}function ua(a,e,t="Assistant"){const i=a[e.status],n=a[e.message],s=a[e.online],l=a[e.busy],o=a[e.source],f=a[e.updatedAt],v=e.emotion?a[e.emotion]:null,r=e.activity?a[e.activity]:null,x=e.cue?a[e.cue]:null,C=e.speaking?a[e.speaking]:null,k=e.intensity?a[e.intensity]:null,$=e.motion?a[e.motion]:null,w=a[e.revision];if(!i&&!n&&!s&&!l)return null;const A=d(i==null?void 0:i.state,72),U=d(n==null?void 0:n.state,220),V=d(f==null?void 0:f.state,64),G=Ne(s,!0),P=Ne(l,!1),H=d(r==null?void 0:r.state,32)||"",M=Ne(C)??H==="speaking",Z=H||(G?M?"speaking":P?"thinking":"idle":"offline");return pe({version:1,assistant:d(t,40)||"Assistant",online:G,busy:P,status:A&&A!=="unknown"&&A!=="unavailable"?A:"",message:U&&U!=="unknown"&&U!=="unavailable"?U:"",source:d(o==null?void 0:o.state,64)||"ha",updatedAt:V&&V!=="unknown"&&V!=="unavailable"?V:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(v==null?void 0:v.state,32)||null,activity:Z,cue:d(x==null?void 0:x.state,32)||null,intensity:ma(k),speaking:M,motion:d($==null?void 0:$.state,32)||null,revision:Number(w==null?void 0:w.state)||0})}const pa=["full","torso","head"];function fa(a){const e=d(a==null?void 0:a.state,16).toLowerCase();return pa.includes(e)?e:null}function ga(a,e){const t=e.viewPreset?a[e.viewPreset]:null,i=e.pageMode?a[e.pageMode]:null,n=e.pageTarget?a[e.pageTarget]:null,s=e.pageUntil?a[e.pageUntil]:null,l=e.cue?a[e.cue]:null,o=e.emotion?a[e.emotion]:null,f=e.motion?a[e.motion]:null,v=e.cueUntil?a[e.cueUntil]:null,r=e.revision?a[e.revision]:null;if(!t&&!i&&!n&&!l&&!o&&!f)return null;const x=d(n==null?void 0:n.state,40)||null,C=d(s==null?void 0:s.state,64)||null,k=d(i==null?void 0:i.state,16).toLowerCase(),$=k==="auto"?"auto":k==="pinned"||x||C?"pinned":"auto";return ue({...Q,revision:Number(r==null?void 0:r.state)||0,viewPreset:fa(t),page:{mode:$,target:$==="pinned"?x:null,until:$==="pinned"?C:null},cue:{cue:d(l==null?void 0:l.state,32)||null,emotion:d(o==null?void 0:o.state,32)||null,motion:d(f==null?void 0:f.state,32)||null,until:d(v==null?void 0:v.state,64)||null}})}function Ne(a,e){const t=d(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function ma(a){const e=d(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function xt(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3),n=d(a.apiUrl,4096);let s=null,l=0,o=null,f=0;async function v(){var $;const r=St();if(r!=null&&r.states)return r.states;const x=Date.now();if(s&&x-l<t||!n&&!a.allowApiFallback||typeof e!="function"||x<f)return s;if(o)return o;const C=n?"":d((($=a.readToken)==null?void 0:$.call(a))??da(),4096);if(!n&&!C)return s;const k={};return C&&(k.Authorization=`Bearer ${C}`),o=e(n||"/api/states",{cache:"no-store",headers:k}).then(async w=>{if(!w.ok){const A=new Error(`HA states HTTP ${w.status}`);throw A.status=w.status,A}return w.json()}).then(w=>{const A=ca(w);return A&&(s=A,l=Date.now()),A||s}).catch(w=>(((w==null?void 0:w.status)===401||(w==null?void 0:w.status)===403)&&(f=Date.now()+i),s)).finally(()=>{o=null}),o}return{id:"ha-states",async read(){return v()}}}async function We(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=d(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const n=await e(i.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return a.sanitize?a.sanitize(s):s}catch(n){if(a.defaultValue!==void 0)return a.defaultValue;throw n}}function ha(a){return{id:"json-state",async read(){const e=await We({...a,defaultValue:a.defaultValue});return pe(e)}}}function va(a){return{id:"json-control",async read(){const e=await We({...a,defaultValue:a.defaultValue??Q});return ue(e)}}}function ya(a){return{id:"json-lines",async read(){const e=await We({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>d(t,220)).filter(Boolean):[]}}}function j(a,e,t=64){return d(a[e],t)}function ge(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function ba(a,e="en-US"){const t=d(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ie(a,e){return!a||!e?null:a[e]||null}function wa(a,e=null,t="en-US"){var x,C,k,$;const i=j(a,"caption",40)||j(a,"type",24)||"Card",n=j(a,"hint",72),s=j(a,"type",32).toLowerCase()||"entity",l=j(a,"entity",255),o=Ie(e,l),f=Ie(e,j(a,"stateEntity",255)),v=Ie(e,j(a,"downEntity",255)),r=Ie(e,j(a,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:j(a,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const w=Number(o==null?void 0:o.state);return!Number.isFinite(w)||w<=0?{caption:i,value:"Clear",hint:n||"nothing pending"}:{caption:i,value:`${w} item${w===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const w=(o==null?void 0:o.state)==="on";return{caption:i,value:w?j(a,"onText",48)||"On":j(a,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const w=ge(o==null?void 0:o.state,0);return{caption:i,value:w?`${w}%`:"—",hint:d(f==null?void 0:f.state,48)||n||"battery level"}}if(s==="network"){const w=ge(v==null?void 0:v.state,0),A=ge(r==null?void 0:r.state,0);return{caption:i,value:w||A?`↓ ${w||"0"} · ↑ ${A||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:i,value:ba(o==null?void 0:o.state,t)||"—",hint:n||"next event"};if(s==="percent"){const w=ge(o==null?void 0:o.state,Number(j(a,"digits",4))||0);return{caption:i,value:w?`${w}%`:"—",hint:n||d((x=o==null?void 0:o.attributes)==null?void 0:x.friendly_name,48)||"state percentage"}}if(s==="number"){const w=Number(j(a,"digits",4))||0,A=ge(o==null?void 0:o.state,w),U=j(a,"unit",16)||d((C=o==null?void 0:o.attributes)==null?void 0:C.unit_of_measurement,16);return{caption:i,value:A?`${A}${U?` ${U}`:""}`:"—",hint:n||d((k=o==null?void 0:o.attributes)==null?void 0:k.friendly_name,48)||"numeric value"}}return{caption:i,value:d(o==null?void 0:o.state,64)||j(a,"value",64)||"—",hint:n||d(($=o==null?void 0:o.attributes)==null?void 0:$.friendly_name,48)||"entity state"}}function Sa(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>wa(i,e,t)):[]}const $t={...yt,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},kt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},Ct={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},xa={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Ue={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function h(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function qe(a){return a.endsWith("/")?a:`${a}/`}function $a(a){try{const e=new URL(a,window.location.href),t=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return t?new URL(t[0],e.origin).toString():""}catch{return""}}function O(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(a,window.location.href);if(t.startsWith("/")){const n=$a(i.toString());return n?new URL(t.slice(1),n).toString():new URL(t,i.origin).toString()}return new URL(t,i).toString()}function It(a){try{return new URL(".",a).toString()}catch{return new URL(".",window.location.href).toString()}}function ka(a,e){const t=It(e),i=O(t,d(a.assetRoot,1024)||"./assets"),n=i?qe(i):t,s=l=>{const o=d(l,1024);return o?O(n,o):""};return{...a,assetRoot:i,runtimeUrl:O(t,a.runtimeUrl||""),entry:s(a.entry||""),modelUrl:s(a.modelUrl||""),fallbackPortrait:s(a.fallbackPortrait||""),motionMapUrl:s(a.motionMapUrl||""),expressionMapUrl:s(a.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([l,o])=>[l,O(t,o)]).filter(([,l])=>!!l))}}function Be(a){return{...Ue,...a||{},metrics:{...Ue.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):Ue.forecast.map(e=>({...e}))}}function rt(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function q(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function Ca(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${q(t)} мм рт. ст.`:`${q(t*.750061683,0)} мм рт. ст.`}function Ia(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${q(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${q(t/3.6,1)} м/с`:`${q(t,1)} м/с`}function Pa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ea(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function Aa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function Ua(a,e="ru-RU"){const t=d(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||d(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function nt(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function La(a,e="./assets/icons"){const t=Number(a),i=qe(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function Ta(a){const e=d(a.locale,32)||"ru-RU",t=d(a.iconBaseUrl,1024)||"./assets/icons",i=xt({allowApiFallback:a.allowApiFallback,apiUrl:a.apiUrl,fetchImpl:a.fetchImpl});return async()=>{var $,w,A,U,V,G,P,H,F,M,Z,ye,be,we,Se,xe,$e,ke,fe,u;const n=await i.read(),s=a.fetchImpl??globalThis.fetch,l=n==null?void 0:n[a.weatherEntity];let o=null;const f=d(a.openMeteoUrl,4096);if(f&&typeof s=="function")try{const p=await s(`${f}${f.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});p.ok&&(o=await p.json())}catch{o=null}if(!l&&!(o!=null&&o.current))return null;const v=d(l==null?void 0:l.last_changed,64)||d(($=o==null?void 0:o.current)==null?void 0:$.time,64)||new Date().toISOString(),r=l?Ua(l.state,e):nt((w=o==null?void 0:o.current)==null?void 0:w.weather_code,e),x=Array.isArray((A=o==null?void 0:o.daily)==null?void 0:A.time)?o.daily.time.map((p,c)=>{var E,L,N,I,ee;const m=new Date(`${p}T12:00:00+03:00`);return{name:m.toLocaleDateString(e,{weekday:"short"}),dayNumber:m.toLocaleDateString(e,{day:"numeric"}),monthShort:m.toLocaleDateString(e,{month:"short"}),note:d(nt((E=o.daily.weather_code)==null?void 0:E[c],e),28),max:`${q((L=o.daily.temperature_2m_max)==null?void 0:L[c])}°`,min:`${q((N=o.daily.temperature_2m_min)==null?void 0:N[c])}° · ${q((I=o.daily.precipitation_probability_max)==null?void 0:I[c])}%`,icon:La((ee=o.daily.weather_code)==null?void 0:ee[c],t)}}):[],C=x[0]||null,k=x.slice(1,6);return{todayValue:Ea(v,e),todayLabel:Aa(v,e),updatedAt:Pa(v,e),temperature:q(((U=l==null?void 0:l.attributes)==null?void 0:U.temperature)??((V=o==null?void 0:o.current)==null?void 0:V.temperature_2m),1),condition:r,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${q(((G=l==null?void 0:l.attributes)==null?void 0:G.apparent_temperature)??((P=o==null?void 0:o.current)==null?void 0:P.apparent_temperature)??((H=l==null?void 0:l.attributes)==null?void 0:H.temperature),1)}°C`,badgeSummary:r,badgeRange:C?`${C.max} / ${q((M=(F=o==null?void 0:o.daily)==null?void 0:F.temperature_2m_min)==null?void 0:M[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${q(((Z=l==null?void 0:l.attributes)==null?void 0:Z.humidity)??((ye=o==null?void 0:o.current)==null?void 0:ye.relative_humidity_2m))}%`,pressure:Ca(((be=l==null?void 0:l.attributes)==null?void 0:be.pressure)??((we=o==null?void 0:o.current)==null?void 0:we.surface_pressure),((Se=l==null?void 0:l.attributes)==null?void 0:Se.pressure_unit)??"hPa"),wind:Ia(((xe=l==null?void 0:l.attributes)==null?void 0:xe.wind_speed)??(($e=o==null?void 0:o.current)==null?void 0:$e.wind_speed_10m),((ke=l==null?void 0:l.attributes)==null?void 0:ke.wind_speed_unit)??"km/h"),clouds:`${q(((fe=l==null?void 0:l.attributes)==null?void 0:fe.cloud_coverage)??((u=o==null?void 0:o.current)==null?void 0:u.cloud_cover))}%`},forecast:k}}}class Ra{constructor(e,t={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"entityMap",null);b(this,"controlEntityMap",null);b(this,"haStatesReader",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",Q);b(this,"uiControl",Q);b(this,"currentControl",Q);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...$t,...t.copy||{}},this.labels={...kt,...t.labels||{}},this.presetLabels={...Ct,...t.presetLabels||{}},this.weatherData=Be(t.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="${h(this.labels.avatarPresetGroup)}">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${h(this.presetLabels.full)}" aria-label="${h(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${h(this.presetLabels.torso)}" aria-label="${h(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${h(this.presetLabels.head)}" aria-label="${h(this.presetLabels.head)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="head">
                </button>
              </div>
              <div class="avatar-mount" data-avatar-mount></div>
            </div>
          </section>

          <section class="panel content-panel">
            <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="${h(this.labels.carouselRegion)}">
              <div class="carousel-track" data-carousel-track></div>
              <div class="carousel-dots" data-dots aria-label="${h(this.labels.pagesRegion)}"></div>
            </div>
          </section>
        </div>
      </div>
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=O(window.location.href,this.getRendererConfigUrl()),t=It(e),i=Oe(await this.readJson(e)),n=Oe({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([l,o])=>[l,O(t,o)])),avatar:{...i.avatar,manifestUrl:O(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:O(t,i.scene.configUrl)},state:{...i.state,stateUrl:O(t,i.state.stateUrl),apiUrl:i.state.apiUrl?O(t,i.state.apiUrl):void 0,idleLinesUrl:O(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?O(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:O(t,i.control.controlUrl),apiUrl:i.control.apiUrl?O(t,i.control.apiUrl):void 0,entityMapUrl:i.control.entityMapUrl?O(t,i.control.entityMapUrl):void 0}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=ka(Ve(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await ya({url:this.rendererConfig.state.idleLinesUrl||O(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=Me(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=Nt(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,n;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(n=(i=this.carouselShellEl).setPointerCapture)==null||n.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:n}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,l=i&&Math.abs(n)>=s*.16,o=n<0?1:-1;if(this.clearDragState(t.pointerId,!1),l){this.stepPage(o);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(this.currentControl),this.uiControl=Me(Q,this.uiControl),this.currentControl=Me(this.remoteControl,this.uiControl);const e=ht(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=Kt(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=De(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const n=this.getOrderedPages(i.pages,i.rotation.order),s=Wt({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:l=>n.some(o=>o.id===l)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(n,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,n)=>i.kind==="overview"?this.renderOverviewSlide(i,t,n):this.renderDynamicSlide(i,n,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,n)=>`
      <button
        class="carousel-dot ${n===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${n}"
        data-scene-page-id="${h(i.id)}"
        aria-label="${h(d(i.title,40)||d(i.id,40)||`${this.labels.pageStamp} ${n+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t,i){const n=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||Ue,l=s.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="${h(e.id)}" data-scene-page-id="${h(e.id)}" data-slide-order="${i}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${h(s.title)}</h1>
              <p class="subline">${h(s.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${h(s.todayCaption)}</span>
                <span class="value">${h(s.todayValue)}</span>
                <span class="meta">${h(s.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${h(s.updatedCaption)}</span>
                <span class="value">${h(s.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${h(s.temperature)}</span>
                <span class="unit">°${h(s.unit)}</span>
              </div>
              <div class="condition">${h(s.condition)}</div>
              <div class="feels">${h(s.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${h(this.resolveIconUrl("thermometer"))}" alt=""><span>${h(s.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${h(this.resolveIconUrl("calendarDays"))}" alt=""><span>${h(s.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${h(t.caption)}</strong>
                  <div class="neiri-label">${h(t.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${h(this.resolveIconUrl("sparkles"))}" alt="${h(n)}"></div>
              </div>
              <div class="neiri-meta">${h(t.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${h(this.labels.humidity)}</span><i><img src="${h(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${h(s.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${h(this.labels.pressure)}</span><i><img src="${h(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${h(s.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${h(this.labels.wind)}</span><i><img src="${h(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${h(s.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${h(this.labels.clouds)}</span><i><img src="${h(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${h(s.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${h(s.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${l}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,t,i){const n=Sa(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),l=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),o=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${t+1} / ${i}`),f=e.cardStyle==="mini"?n.map((k,$)=>`
          <article class="mini-card" data-scene-card-index="${$}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(k.caption)}</span>
            <strong>${h(k.value)}</strong>
          </article>
        `).join(""):n.map((k,$)=>`
          <article class="home-card" data-scene-card-index="${$}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(k.caption)}</span>
            <strong>${h(k.value)}</strong>
            <small>${h(k.hint)}</small>
          </article>
        `).join(""),v=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(k=>this.renderForecastDay(k)).join("")}</div>`:"",r=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",x=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${t+1}`,C=d(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${h(e.id)}" data-scene-page-id="${h(e.id)}" data-slide-order="${t}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${h(e.kind)}" data-dynamic-card-style="${h(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${h(x)}</h1>
              ${C?`<p class="subline">${h(C)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${h(l)}</span>
              <span class="value">${h(o)}</span>
            </div>
          </div>
          ${v}
          <div class="${r}">
            ${f||`<div class="empty">${h(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `}renderForecastDay(e){return`
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${h(e.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${h(e.name)}</span>
            <span class="meta"><span class="day-number">${h(e.dayNumber)}</span><span class="day-month">${h(e.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${h(e.max)}</strong>
          <small>${h(e.min)}</small>
        </div>
        <div class="day-note">${h(e.note)}</div>
      </article>
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const t=e[0],i=e[e.length-1];return`${d(t.dayNumber,4)} ${d(t.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var n;const t=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return t||`${qe(d(this.options.iconBaseUrl,1024)||"./assets")}${xa[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,t){const i=t.map(s=>e.find(l=>l.id===s)).filter(Boolean),n=e.filter(s=>!i.some(l=>l.id===s.id));return i.concat(n)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,n;!t&&((n=(i=this.carouselShellEl).hasPointerCapture)!=null&&n.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=De(this.sceneConfig,this.sceneConfig),i=Vt(t.rotation,this.activeIndex,e,n=>this.orderedPages.some(s=>s.id===n));this.pinPageByIndex(i)}pinPageByIndex(e){var l;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((l=this.sceneConfig.rotation)==null?void 0:l.order)||[]))[e];if(!i)return;const n=De(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,n.rotation.defaultDwellMs*2);this.uiControl=Bt(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!Yt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=tt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=tt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},Jt(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:xt({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl})}async readAssistantState(){const e=async()=>ha({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??vt}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap||!this.haStatesReader)return e();const t=await this.haStatesReader.read();return ua(t||{},this.entityMap,this.rendererConfig.assistant.name)||e()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=Q){const t=async()=>va({url:this.rendererConfig.control.controlUrl,defaultValue:e}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap||!this.haStatesReader)return t();const i=await this.haStatesReader.read();return ga(i||{},this.controlEntityMap)||t()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=rt(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=rt(e,t)}catch{}try{return Be(e)}catch{return Be(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return ra({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return oa({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",n=t.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function Ma(a,e={}){const t=new Ra(a,e);return await t.init(),t}const Da=["overview","cards","forecast+cards"],Na=["full","mini"],Pt=["entity","text","todo","onoff","battery","network","time","percent","number"],Y=["caption","hint"],Pe="/local/live2d/",st="/scene-legacy/live2d/",Ba={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Fa={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:a=>`${a} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:a=>`Выбран архив: ${a}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:a=>`Импортирован avatar-pack: ${a}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(a,e)=>`Сейчас связываем: ${a} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:a=>`${a} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:a=>`Selected archive: ${a}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:a=>`Imported avatar pack: ${a}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(a,e)=>`Binding now: ${a} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},_a=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Oa=4*1024*1024,Ha=192*1024,Le=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],He="mellow-fly-7";function de(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function ja(a){return Le.find(e=>e.id===a)||Le.find(e=>e.id===He)||Le[0]}function za(a){return`${a.width} × ${a.height}`}function g(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ge(a){return JSON.parse(JSON.stringify(a))}function J(a){const e=new Map(a.pages.map(n=>[n.id,n])),t=a.rotation.order.map(n=>e.get(n)).filter(Boolean),i=a.pages.filter(n=>!t.some(s=>s.id===n.id));return[...t,...i]}function Va(a,e){return e?Math.max(0,J(a).findIndex(t=>t.id===e)):0}function Wa(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Et(a,e){const t=Wa(e);let i=t,n=2;for(;a.pages.some(s=>s.id===i);)i=`${t}-${n}`,n+=1;return i}function qa(a){const e=a.pages.length+1,t=de()==="ru";return{id:Et(a,`page-${e}`),kind:"cards",title:t?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:t?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function ot(a){const e=de()==="ru";switch(a){case"text":return{type:a,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:a,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:a,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:a,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function z(a,e){const t=a[e];return t==null?"":String(t)}function X(a,e){const t=a[e];return t==null?"":String(t)}function ie(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function Ga(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function Fe(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function lt(a){return a.avatar||(a.avatar={}),a.avatar}function Ka(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function Ja(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Ya(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&J(a).some(n=>n.id===t)?t:((i=J(a)[0])==null?void 0:i.id)||null}async function Za(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return Ge(t.config)}async function Xa(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return Ge(i.config)}function Ke(a){switch(a){case"text":return[...Y,"value"];case"todo":return[...Y,"entity"];case"onoff":return[...Y,"entity","onText","offText"];case"battery":return[...Y,"entity","stateEntity"];case"network":return[...Y,"downEntity","upEntity"];case"time":return[...Y,"entity"];case"percent":return[...Y,"entity","digits"];case"number":return[...Y,"entity","digits","unit"];default:return[...Y,"entity"]}}function _e(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function ce(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function At(a){const e=de();return Ba[e][a]||""}function Te(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Qa(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),n=a.includes(".")&&a.split(".",1)[0]||"other",s=String(e.state||""),l=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:n,state:s,unit:l}}function ei(a){return a?Object.entries(a).map(([e,t])=>Qa(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function ti(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}function ai(a){const e=new URL(a,window.location.href),t=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return t?new URL(t[0],e.origin).toString():null}function ne(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const n=ai(e);if(n)return new URL(t.slice(1),n).toString()}return new URL(t,i).toString()}function Je(a,e){const t=String(a||"").trim();if(!t)return"";if(t.startsWith(Pe))return ne(`${st}${t.slice(Pe.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))try{const i=new URL(t,e);if(i.pathname.startsWith(Pe)){const n=i.pathname.slice(Pe.length);return ne(`${st}${n}${i.search}${i.hash}`,e)}}catch{return t}return t}function ii(a){const e=String(a||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function ri(a,e){const t=new URL("./",a).toString(),i=ne(Je(e,t)||e,t);return ii(i||t)}function dt(a,e,t){const i=String(t||"").trim();return i?ne(Je(i,a)||i,ri(a,e)):""}function ni(a,e){const t=String(e||"").trim();return t?ne(Je(t,a)||t,new URL("./",a).toString()):""}function Ut(a){return{id:String(a.id||"").trim(),name:String(a.name||a.id||"").trim(),manifestUrl:String(a.manifestUrl||"").trim(),previewUrl:String(a.previewUrl||"").trim(),motionCount:Number(a.motionCount||0),capabilities:typeof a.capabilities=="object"&&a.capabilities?{supportsMotion:!!a.capabilities.supportsMotion,supportsEmotion:!!a.capabilities.supportsEmotion,supportsLipSync:!!a.capabilities.supportsLipSync,supportsViewPresets:!!a.capabilities.supportsViewPresets,supportsPointerFocus:!!a.capabilities.supportsPointerFocus}:void 0}}function je(a,e){const t=Ut(a);return{...t,manifestUrl:t.manifestUrl?ne(t.manifestUrl,e):"",previewUrl:t.previewUrl?ne(t.previewUrl,e):""}}async function si(a,e){var v;const t=String(a||"").trim();if(!t)return null;const i=await fetch(t,{cache:"no-store"}),n=await i.json();if(!i.ok)throw new Error(`GET ${t} failed: HTTP ${i.status}`);const s=String(n.assetRoot||"").trim();let l=0;const o=dt(t,s,String(n.motionMapUrl||"").trim());if(o)try{const r=await fetch(o,{cache:"no-store"}),x=await r.json();r.ok&&Array.isArray(x.motions)&&(l=x.motions.length)}catch{l=0}const f=ni(t,String(((v=n.presetThumbs)==null?void 0:v.full)||"").trim())||dt(t,s,String(n.fallbackPortrait||"").trim());return Ut({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:t,previewUrl:f,motionCount:l,capabilities:n.capabilities})}async function ct(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(n=>je(n,e)).filter(n=>n.id&&n.manifestUrl):[]}async function oi(a,e){const t=String(a||"").trim();if(!t)throw new Error("Avatar import API is not configured.");const i=/\/api\/hassio_ingress\//.test(t),n=i?Ha:Oa;if(i||e.size>n){const f=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,v=Math.max(1,Math.ceil(e.size/n));let r=null;for(let x=0;x<v;x+=1){const C=x*n,k=Math.min(e.size,C+n),$=new FormData;$.set("uploadId",f),$.set("filename",e.name),$.set("chunkIndex",String(x)),$.set("chunkCount",String(v)),$.set("archive",e.slice(C,k,"application/zip"),`${e.name}.part-${x+1}-of-${v}`);const w=await fetch(t,{method:"POST",body:$}),A=await w.json();if(!w.ok||A.success===!1)throw new Error(String(A.error||`HTTP ${w.status}`));A.item&&(r=je(A.item,t))}if(!r)throw new Error("Avatar import did not return the imported pack.");return r}const s=new FormData;s.set("archive",e,e.name);const l=await fetch(t,{method:"POST",body:s}),o=await l.json();if(!l.ok||o.success===!1||!o.item)throw new Error(String(o.error||`HTTP ${l.status}`));return je(o.item,t)}async function li(a,e){var l,o,f,v;const t=String(a||"").trim(),i=String(e||"").trim();if(!t||!i)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${t}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((l=s.motionMap)==null?void 0:l.motions)?(o=s.motionMap)==null?void 0:o.motions.map(r=>({index:Number(r.index),id:String(r.id||"").trim(),label:String(r.label||r.id||"").trim(),group:String(r.group||"").trim(),tags:Array.isArray(r.tags)?r.tags.map(x=>String(x||"").trim()).filter(Boolean):[]})).filter(r=>Number.isFinite(r.index)):[],semantic:typeof((f=s.motionMap)==null?void 0:f.semantic)=="object"&&((v=s.motionMap)!=null&&v.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function di(a,e){var s,l,o;const t=String(a||"").trim();if(!t||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${t}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await i.json();if(!i.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${i.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((l=n.motionMap)==null?void 0:l.semantic)=="object"&&((o=n.motionMap)!=null&&o.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function ci(a){if(Array.isArray(a)){const e=a.find(t=>Number.isFinite(Number(t)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(a))?String(Number(a)):""}function ui(a,e){const t=a[e.labelKey];return typeof t=="string"?t:e.key}function pi(a,e){const t=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${a.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${_a.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${g(i.key)}">${g(ui(a,i))}</label>
            <select id="avatar-semantic-${g(i.key)}" data-avatar-semantic="${g(i.key)}">
              <option value="">${g(a.avatarMotionNone)}</option>
              ${t.map(n=>`
                <option value="${g(String(n.index))}"${ci(e.motionMap.semantic[i.key])===String(n.index)?" selected":""}>
                  ${g(`${n.label||n.id} · #${n.index}`)}
                </option>
              `).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      <div class="cards-list">
        ${t.map(i=>`
          <article class="card-list-item">
            <div class="card-list-select">
              <strong>${g(i.label||i.id||`${a.avatarMappingMotion} ${i.index}`)}</strong>
              <span class="meta">${g(`${a.avatarMappingMotion} #${i.index} · ${i.group||a.avatarMappingMotion.toLowerCase()}`)}</span>
              <code>${g(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${a.avatarMappingSaveHint}</div>
    </div>
  `}function ut(a,e,t){var r,x,C,k,$;const i=(e==null?void 0:e.id)||"",n=t===i,s=(e==null?void 0:e.name)||a.avatarPackDefaultTile,l=(e==null?void 0:e.id)||a.avatarPackCurrent,o=(e==null?void 0:e.previewUrl)||"",f=e?[e.motionCount>0?a.avatarPackMotionCount(e.motionCount):"",(r=e.capabilities)!=null&&r.supportsMotion?a.avatarCapabilityMotion:"",(x=e.capabilities)!=null&&x.supportsEmotion?a.avatarCapabilityEmotion:"",(C=e.capabilities)!=null&&C.supportsLipSync?a.avatarCapabilityLipSync:"",(k=e.capabilities)!=null&&k.supportsViewPresets?a.avatarCapabilityViewPresets:"",($=e.capabilities)!=null&&$.supportsPointerFocus?a.avatarCapabilityPointerFocus:""].filter(Boolean):[a.avatarPackDefaultHint],v=f.length?f:[a.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${o?`<img src="${g(o)}" alt="${g(s)}">`:`<span>${g(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${g(s)}</strong>
        <div class="meta">${g(l)}</div>
        <div class="avatar-pack-card-meta">
          ${v.map(w=>`<span>${g(w)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${g(i)}">
          ${g(n?a.avatarPackSelected:a.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function Ye(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function fi(a,e,t,i){if(!e||t===null)return`<div class="meta">${g(a.entityBindingEmpty)}</div>`;const n=Ke(z(e,"type")||"entity").filter(s=>Ye(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===t&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${t}" data-binding-field="${g(s)}">
            ${g(Te(a,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${g(a.entityBindingNoTargets)}</div>`}function pt(a){const e=document.querySelector(`[data-editor-section="${a}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function se(a){for(const e of Array.from(a.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function ft(a){return Ke(a).find(e=>Ye(e))||null}function oe(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${g(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${g(e)}" value="${g(t)}">
    </div>
  `}function re(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${g(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${g(e)}" value="${g(t)}">
    </div>
  `}function gt(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${g(a)}</label>
      <select id="page-select-${e}" data-page-field="${g(e)}">
        ${i.map(n=>`<option value="${g(n.value)}"${n.value===t?" selected":""}>${g(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function gi(a,e,t,i){const n=z(e,"type")||"entity",s=Ke(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${g(z(e,"caption")||ce(a,n))}</strong>
          <div class="meta">${g(ce(a,n))}</div>
        </div>
        <div class="meta">#${t+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${g(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${Pt.map(l=>`<option value="${l}"${l===n?" selected":""}>${g(ce(a,l))}</option>`).join("")}
          </select>
        </div>
        ${s.map(l=>{const o=Ye(l),f=o&&(i==null?void 0:i.cardIndex)===t&&i.field===l;return o?`
              <div class="field ${l==="hint"?"is-wide":""} is-binding-field${f?" is-active":""}">
                <label>${g(Te(a,l))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${g(l)}"
                    data-binding-field="${g(l)}"
                    value="${g(z(e,l))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${t}"
                    data-binding-field="${g(l)}"
                  >${a.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${l==="hint"?"is-wide":""}">
              <label>${g(Te(a,l))}</label>
              <input
                type="${l==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${g(l)}"
                value="${g(z(e,l))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function mi(a,e,t,i,n){const s=z(e,"type")||"entity",l=z(e,"caption")||ce(a,s),o=z(e,"entity")||z(e,"stateEntity")||z(e,"downEntity")||z(e,"upEntity")||z(e,"value")||z(e,"hint")||At(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${t}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${t}">
        <span class="card-list-index">#${t+1}</span>
        <strong>${g(l)}</strong>
        <span class="meta">${g(ce(a,s))}</span>
        <div class="meta">${g(o)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
      </div>
    </article>
  `}function hi(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${g(e)}"
    >
      <strong>${g(ce(a,e))}</strong>
      <span>${g(At(e))}</span>
    </button>
  `}function vi(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function yi(a){var fe;const e=Fa[de()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
    <style>
      #scene-editor-shell {
        width: min(100%, 1420px);
        max-width: 1420px;
        margin: 0 auto;
        padding: 24px 18px 64px;
        box-sizing: border-box;
        overflow-x: clip;
        color: #203041;
      }
      #scene-editor-shell .scene-editor-page {
        display: grid;
        gap: 22px;
      }
      #scene-editor-shell .scene-preview-shell,
      #scene-editor-shell .scene-settings-card {
        border-radius: 24px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(248, 251, 253, 0.92);
        box-shadow: 0 16px 36px rgba(46,72,94,0.1);
      }
      #scene-editor-shell .scene-preview-shell {
        padding: 18px;
      }
      #scene-editor-shell .scene-preview-head,
      #scene-editor-shell .scene-dashboard-topbar {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }
      #scene-editor-shell .scene-preview-copy strong,
      #scene-editor-shell .scene-dashboard-title strong {
        display: block;
        font: 700 18px/1.05 "Aptos","Segoe UI",sans-serif;
        letter-spacing: -0.03em;
      }
      #scene-editor-shell .scene-preview-copy span,
      #scene-editor-shell .scene-dashboard-title span {
        display: block;
        margin-top: 6px;
        font: 13px/1.45 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.68);
      }
      #scene-editor-shell .scene-preview-controls {
        display: flex;
        align-items: end;
        gap: 14px;
        flex-wrap: wrap;
      }
      #scene-editor-shell .scene-preview-resolution {
        min-width: 140px;
        padding: 10px 14px;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.08);
        background: rgba(255,255,255,0.82);
      }
      #scene-editor-shell .scene-preview-resolution span {
        display: block;
        font: 12px/1.2 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.62);
      }
      #scene-editor-shell .scene-preview-resolution strong {
        display: block;
        margin-top: 4px;
        font: 700 15px/1.1 "Aptos","Segoe UI",sans-serif;
      }
      #scene-editor-shell .scene-preview-frame {
        margin-top: 18px;
        overflow: hidden;
        padding: 4px 0 8px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
      }
      #scene-editor-shell .scene-preview-hint {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
      }
      #scene-editor-shell .scene-preview-hint span {
        border-radius: 999px;
        padding: 6px 10px;
        background: rgba(214,225,237,0.72);
        font-size: 12px;
        color: #385268;
      }
      #scene-editor-shell .scene-preview-stage {
        overflow: hidden;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.1);
        background: #e6eef4;
        display: block;
        max-width: 100%;
        margin: 0 auto;
        position: relative;
      }
      #scene-editor-shell .scene-preview-canvas {
        transform-origin: top left;
        will-change: transform;
      }
      #scene-editor-shell #app {
        overflow: hidden;
        margin: 0;
        min-height: 0;
        transform: none !important;
      }
      #scene-editor-shell #app,
      #scene-editor-shell #app .scene-viewport,
      #scene-editor-shell #app .layout {
        min-height: 0;
        height: 100%;
      }
      #scene-editor-shell #app .scene-viewport {
        overflow: hidden;
      }
      #scene-editor-shell #app [data-scene-page-id],
      #scene-editor-shell #app [data-scene-card-index] {
        cursor: pointer;
      }
      #scene-editor-shell #app [data-editor-selected-page="true"] {
        box-shadow: inset 0 0 0 3px rgba(77,147,121,0.28);
      }
      #scene-editor-shell #app [data-editor-selected-card="true"] {
        box-shadow: 0 0 0 3px rgba(45,98,162,0.2), var(--card-shadow, 0 14px 28px rgba(83, 109, 128, 0.1));
      }
      #scene-editor-shell .scene-dashboard {
        display: grid;
        gap: 18px;
      }
      #scene-editor-shell[data-collapsed="true"] .scene-dashboard-body {
        display: none;
      }
      #scene-editor-shell .scene-editor-status {
        margin-top: 10px;
        display: inline-flex;
        align-items: center;
        min-height: 30px;
        padding: 0 12px;
        border-radius: 999px;
        background: rgba(255,255,255,0.84);
        font: 12px/1 "Aptos","Segoe UI",sans-serif;
        color: #4b6577;
      }
      #scene-editor-shell .scene-editor-status[data-tone="ok"] { color:#2b7f57; }
      #scene-editor-shell .scene-editor-status[data-tone="bad"] { color:#ab4444; }
      #scene-editor-shell .scene-editor-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }
      #scene-editor-shell .scene-editor-button,
      #scene-editor-shell .tiny-btn,
      #scene-editor-shell input,
      #scene-editor-shell select {
        font: 13px/1.2 "Aptos","Segoe UI",sans-serif;
      }
      #scene-editor-shell .scene-editor-button,
      #scene-editor-shell .tiny-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid rgba(62,98,122,0.18);
        background: rgba(255,255,255,0.86);
        color: #203041;
        text-decoration: none;
        cursor: pointer;
      }
      #scene-editor-shell .tiny-btn {
        min-height: 30px;
        padding: 0 10px;
      }
      #scene-editor-shell .tiny-btn.is-active {
        background: rgba(45,98,162,0.14);
        border-color: rgba(45,98,162,0.25);
        color: #1f4e87;
      }
      #scene-editor-shell .scene-editor-button.is-accent {
        background: linear-gradient(180deg, rgba(111,191,162,0.24), rgba(111,191,162,0.12));
        border-color: rgba(77,147,121,0.28);
      }
      #scene-editor-shell .scene-settings-card {
        padding: 18px;
      }
      #scene-editor-shell .scene-settings-head {
        margin-bottom: 12px;
      }
      #scene-editor-shell h2 {
        margin: 0 0 6px;
        font: 700 16px/1.1 "Aptos","Segoe UI",sans-serif;
        color: #203041;
      }
      #scene-editor-shell .meta {
        font: 12px/1.4 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.66);
      }
      #scene-editor-shell .scene-settings-stack {
        display: grid;
        gap: 10px;
      }
      #scene-editor-shell .page-list {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(240px, 280px);
        gap: 12px;
        overflow-x: auto;
        padding: 2px 2px 8px;
        align-items: stretch;
        scrollbar-width: thin;
      }
      #scene-editor-shell .cards-list {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(220px, 260px);
        gap: 12px;
        overflow-x: auto;
        padding: 2px 2px 8px;
        align-items: stretch;
        scrollbar-width: thin;
      }
      #scene-editor-shell .ha-list {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }
      #scene-editor-shell .card-template-grid {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      }
      #scene-editor-shell .card-template-button {
        display: grid;
        gap: 6px;
        min-height: 96px;
        padding: 14px;
        text-align: left;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(255,255,255,0.9);
        color: #203041;
        cursor: pointer;
      }
      #scene-editor-shell .card-template-button strong {
        display: block;
        font: 700 14px/1.15 "Aptos","Segoe UI",sans-serif;
      }
      #scene-editor-shell .card-template-button span {
        font: 12px/1.4 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.66);
      }
      #scene-editor-shell .avatar-pack-box {
        display: grid;
        gap: 14px;
      }
      #scene-editor-shell .avatar-pack-grid {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      #scene-editor-shell .avatar-pack-card {
        display: grid;
        gap: 12px;
        border-radius: 20px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(255,255,255,0.92);
        padding: 14px;
      }
      #scene-editor-shell .avatar-pack-card.is-active {
        border-color: rgba(45,98,162,0.35);
        box-shadow: inset 0 0 0 1px rgba(45,98,162,0.18);
      }
      #scene-editor-shell .avatar-pack-card-preview {
        min-height: 144px;
        border-radius: 16px;
        background: linear-gradient(180deg, rgba(223,232,239,0.82), rgba(236,242,246,0.92));
        display: grid;
        place-items: center;
        overflow: hidden;
      }
      #scene-editor-shell .avatar-pack-card-preview img {
        display: block;
        max-width: 100%;
        max-height: 144px;
        object-fit: contain;
      }
      #scene-editor-shell .avatar-pack-card-preview span {
        padding: 12px;
        text-align: center;
        font: 12px/1.35 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.62);
      }
      #scene-editor-shell .avatar-pack-card-body {
        display: grid;
        gap: 8px;
      }
      #scene-editor-shell .avatar-pack-card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      #scene-editor-shell .avatar-pack-card-meta span {
        border-radius: 999px;
        padding: 4px 8px;
        background: rgba(214,225,237,0.72);
        font-size: 11px;
        color: #385268;
      }
      #scene-editor-shell .page-chip,
      #scene-editor-shell .card-item,
      #scene-editor-shell .ha-entity,
      #scene-editor-shell .card-list-item {
        display: grid;
        gap: 10px;
        padding: 12px;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.08);
        background: rgba(255,255,255,0.86);
      }
      #scene-editor-shell .card-list-item {
        min-width: 0;
        align-content: space-between;
        gap: 8px;
      }
      #scene-editor-shell .page-chip {
        min-width: 0;
        align-content: space-between;
      }
      #scene-editor-shell .page-chip.is-active {
        border-color: rgba(77,147,121,0.34);
        box-shadow: 0 0 0 2px rgba(111,191,162,0.18);
      }
      #scene-editor-shell .card-list-item.is-active {
        border-color: rgba(77,147,121,0.34);
        box-shadow: 0 0 0 2px rgba(111,191,162,0.18);
      }
      #scene-editor-shell .page-chip.is-drop-target,
      #scene-editor-shell .card-list-item.is-drop-target {
        border-color: rgba(45,98,162,0.34);
        box-shadow: 0 0 0 2px rgba(45,98,162,0.18);
      }
      #scene-editor-shell .page-chip-header {
        display: grid;
        gap: 4px;
        cursor: pointer;
      }
      #scene-editor-shell .card-list-select {
        display: grid;
        gap: 4px;
        padding: 0;
        border: 0;
        background: transparent;
        text-align: left;
        cursor: pointer;
        color: inherit;
      }
      #scene-editor-shell .card-list-index {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        padding: 3px 8px;
        border-radius: 999px;
        background: rgba(214,225,237,0.72);
        font: 11px/1 "Aptos","Segoe UI",sans-serif;
        color: #385268;
      }
      #scene-editor-shell .page-chip-header strong,
      #scene-editor-shell .card-item-head strong,
      #scene-editor-shell .ha-entity strong,
      #scene-editor-shell .card-list-select strong {
        display: block;
        font: 700 14px/1.1 "Aptos","Segoe UI",sans-serif;
        color: #203041;
      }
      #scene-editor-shell .page-chip-actions,
      #scene-editor-shell .card-actions,
      #scene-editor-shell .card-add {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      #scene-editor-shell .card-actions {
        justify-content: space-between;
      }
      #scene-editor-shell .inspector-grid,
      #scene-editor-shell .card-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }
      #scene-editor-shell .avatar-mapping-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      #scene-editor-shell .card-stack {
        display: grid;
        gap: 16px;
      }
      #scene-editor-shell .field {
        display: grid;
        gap: 6px;
      }
      #scene-editor-shell .field.is-binding-field {
        padding: 10px;
        border-radius: 14px;
        border: 1px solid rgba(32,48,65,0.08);
        background: rgba(246,249,252,0.82);
      }
      #scene-editor-shell .field.is-binding-field.is-active {
        border-color: rgba(77,147,121,0.34);
        box-shadow: 0 0 0 2px rgba(111,191,162,0.18);
      }
      #scene-editor-shell .field.is-wide {
        grid-column: 1 / -1;
      }
      #scene-editor-shell .field label {
        font: 12px/1.25 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.72);
      }
      #scene-editor-shell input,
      #scene-editor-shell select {
        width: 100%;
        min-height: 40px;
        border-radius: 12px;
        border: 1px solid rgba(32,48,65,0.12);
        background: rgba(255,255,255,0.92);
        padding: 0 12px;
        color: #203041;
      }
      #scene-editor-shell .field-binding-row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 8px;
        align-items: center;
      }
      #scene-editor-shell .binding-targets {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }
      #scene-editor-shell .ha-entity code {
        display: block;
        font: 11px/1.2 Consolas, monospace;
        color: #385268;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #scene-editor-shell code {
        font: 12px/1.25 Consolas, monospace;
        color: #385268;
      }
      #scene-editor-shell .ha-entity {
        gap: 6px;
        padding: 10px;
        border-radius: 16px;
      }
      #scene-editor-shell .ha-entity-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }
      #scene-editor-shell .ha-entity .tiny-btn {
        min-height: 26px;
        padding: 0 8px;
      }
      #scene-editor-shell .ha-state {
        font: 11px/1.25 "Aptos","Segoe UI",sans-serif;
        color: #4f6a7c;
      }
      #scene-editor-shell .avatar-import-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      #scene-editor-shell .avatar-import-button.is-disabled {
        opacity: 0.58;
        cursor: not-allowed;
      }
      #scene-editor-shell .avatar-import-input {
        position: absolute;
        width: 1px;
        height: 1px;
        min-height: 1px;
        max-width: 1px;
        max-height: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
        opacity: 0;
        pointer-events: none;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        clip-path: inset(50%);
      }
      @media (max-width: 980px) {
        #scene-editor-shell {
          padding: 12px 12px 42px;
        }
        #scene-editor-shell .scene-preview-shell,
        #scene-editor-shell .scene-settings-card {
          border-radius: 24px;
        }
        #scene-editor-shell .avatar-pack-box {
          grid-template-columns: 1fr;
        }
        #scene-editor-shell .inspector-grid,
        #scene-editor-shell .card-grid {
          grid-template-columns: 1fr;
        }
        #scene-editor-shell .field-binding-row {
          grid-template-columns: 1fr;
        }
        #scene-editor-shell .page-list {
          grid-auto-columns: minmax(220px, 84vw);
        }
        #scene-editor-shell .cards-list {
          grid-auto-columns: minmax(220px, 84vw);
        }
      }
    </style>
    <div class="scene-editor-page">
      <section class="scene-preview-shell">
        <div class="scene-preview-head">
          <div class="scene-preview-copy">
            <strong>${e.previewTitle}</strong>
            <span>${e.previewSubtitle}</span>
          </div>
          <div class="scene-preview-controls">
            <div class="field">
              <label for="scene-preview-display">${e.previewDisplay}</label>
              <select id="scene-preview-display" data-preview-display>
                ${Le.map(u=>`<option value="${g(u.id)}">${g(u.label[de()])}</option>`).join("")}
              </select>
            </div>
            <div class="scene-preview-resolution">
              <span>${e.previewResolution}</span>
              <strong data-preview-resolution>1920 × 1080</strong>
            </div>
          </div>
        </div>
        <div class="scene-preview-hint">
          <span>${e.previewSelectPage}</span>
          <span>${e.previewSelectCard}</span>
        </div>
        <div class="scene-preview-frame">
          <div class="scene-preview-stage" data-preview-stage>
            <div class="scene-preview-canvas" data-preview-canvas></div>
          </div>
        </div>
      </section>
      <section class="scene-dashboard" data-dashboard></section>
    </div>
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),l=n.querySelector("[data-preview-canvas]"),o=n.querySelector("[data-preview-resolution]"),f=n.querySelector("[data-preview-display]"),v=n.querySelector("[data-dashboard]");if(!s||!l||!o||!f||!v)throw new Error("Missing native editor shell elements");l.appendChild(t);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:He,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},x=async u=>{const p=String(u||"").trim();if(!p||!a.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,P();try{r.avatarPackDetails=await li(a.avatarPackApiUrl,p),r.avatarPackDirty=!1}catch(c){r.avatarPackDetails=null,r.avatarPackDirty=!1,H(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{r.avatarPackLoading=!1}},C=()=>{var N;const u=ja(r.previewDisplayId),p=Math.max(320,((N=s.parentElement)==null?void 0:N.clientWidth)||s.clientWidth||u.width),c=Math.max(260,Math.min(window.innerHeight*.62,760)),m=Math.min(1,p/u.width,c/u.height),E=Math.round(u.width*m),L=Math.round(u.height*m);f.value=u.id,o.textContent=za(u),s.style.aspectRatio=`${u.width} / ${u.height}`,s.style.width=`${E}px`,s.style.height=`${L}px`,l.style.width=`${u.width}px`,l.style.height=`${u.height}px`,l.style.transform=`scale(${m})`,t.style.width=`${u.width}px`,t.style.height=`${u.height}px`},k=u=>{r.previewDisplayId=String(u||"").trim()||He,C()},$=u=>{r.pendingAvatarZip=u,r.pendingAvatarZipName=(u==null?void 0:u.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",P(),u&&w(u)},w=async u=>{if(!(!r.config||!a.avatarImportUrl||r.avatarImporting)){r.pendingAvatarZip=null,r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",P();try{const p=await oi(a.avatarImportUrl,u);r.avatarCatalog=a.avatarCatalogUrl?await ct(a.avatarCatalogUrl):[p],lt(r.config).packId=p.id,await x(p.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(p.name||p.id),r.avatarImportTone="ok",M(),P()}catch(p){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(p)}`,r.avatarImportTone="bad",P()}}},A=typeof ResizeObserver<"u"?new ResizeObserver(()=>C()):null;A==null||A.observe(s.parentElement||s);let U=null;const V=()=>{const u=r.selectedPageId||"",p=r.selectedCardIndex;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=t.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&p!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${p}"]`,m=t.querySelector(c);m&&(m.dataset.editorSelectedCard="true")}},G=typeof MutationObserver<"u"?new MutationObserver(()=>V()):null;G==null||G.observe(t,{childList:!0,subtree:!0});const P=()=>{const u=r.config,p=u?J(u):[],c=p.find(y=>y.id===r.selectedPageId)||p[0]||null,m=Array.isArray(c==null?void 0:c.cards)?c.cards:[],E=r.selectedCardIndex!==null&&m[r.selectedCardIndex]||null,L=ti(r.haEntities,r.entitySearch),N=r.focusedBinding?e.entityBindingActive(z(m[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,Te(e,r.focusedBinding.field)):e.entityBindingEmpty,I=u?Fe(u):"",ee=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${g(r.avatarImportStatus)}</div>`:"",S=r.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,_=c?`${c.title||c.id||e.pageSettings} · ${_e(e,c.kind)}`:e.statusLoading;v.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${g(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${g(a.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${r.saving||r.avatarPackSaving||!u?" disabled":""}>${r.saving||r.avatarPackSaving?e.saving:e.save}</button>
          <button class="scene-editor-button" type="button" data-action="add-page"${u?"":" disabled"}>${e.addPage}</button>
        </div>
      </div>
      <div class="scene-dashboard-body">
        <div class="scene-settings-stack">
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.avatar}</h2>
              <div class="meta">${e.avatarSubtitle}</div>
            </div>
          ${u?`
            <div class="avatar-pack-box">
              <div class="meta">${S}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${ut(e,r.bundledAvatar,I)}
                ${r.avatarCatalog.map(y=>ut(e,y,I)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label>${e.avatarImportSelect}</label>
              </div>
              <div class="avatar-import-actions">
                <button
                  class="scene-editor-button avatar-import-button${r.avatarImporting||!a.avatarImportUrl?" is-disabled":""}"
                  type="button"
                  data-action="choose-avatar-archive"
                  ${r.avatarImporting||!a.avatarImportUrl?" disabled":""}
                >
                  ${r.avatarImporting?e.avatarImporting:e.avatarImportChooseButton}
                </button>
                <input
                  id="avatar-pack-archive"
                  class="avatar-import-input"
                  type="file"
                  accept=".zip,application/zip"
                  data-avatar-archive
                  tabindex="-1"
                  aria-hidden="true"
                  ${r.avatarImporting||!a.avatarImportUrl?" disabled":""}
                >
              </div>
              ${r.pendingAvatarZipName?`<div class="meta">${g(e.avatarImportSelected(r.pendingAvatarZipName))}</div>`:""}
              <div class="meta">${e.avatarImportHint}</div>
              ${ee}
            </div>
            ${I?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?pi(e,r.avatarPackDetails):"":""}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(a.packId)}</div>
              <div class="meta">${e.pageOrderHint}</div>
            </div>
            <div class="page-list">
            ${p.map((y,T)=>`
              <article class="page-chip ${y.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${g(y.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${g(y.id)}">
                  <strong>${g(y.title||y.id||(de()==="ru"?`Страница ${T+1}`:`Page ${T+1}`))}</strong>
                  <span class="meta">${g(_e(e,y.kind))} · ${g(e.pageCards(Array.isArray(y.cards)?y.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${g(y.id)}"${T===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${g(y.id)}"${T===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${g(y.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pageSettings}</h2>
              <div class="meta">${g(_)}</div>
            </div>
          ${c?`
            <div class="inspector-grid">
              ${oe(e.fieldPageId,"id",X(c,"id"),!0)}
              ${gt(e.fieldKind,"kind",X(c,"kind"),Da.map(y=>({value:y,label:_e(e,y)})))}
              ${oe(e.fieldTitle,"title",X(c,"title"),!0)}
              ${oe(e.fieldSubtitle,"subtitle",X(c,"subtitle"),!0)}
              ${oe(e.fieldSlot,"slot",X(c,"slot"))}
              ${gt(e.fieldCardStyle,"cardStyle",X(c,"cardStyle")||"full",Na.map(y=>({value:y,label:y==="mini"?e.styleMini:e.styleFull})))}
              ${oe(e.fieldStampCaption,"stampCaption",X(c,"stampCaption"))}
              ${oe(e.fieldStampValue,"stampValue",X(c,"stampValue"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="cards">
            <div class="scene-settings-head">
              <h2>${e.cards}</h2>
              <div class="meta">${e.cardsSubtitle}</div>
              <div class="meta">${e.cardOrderHint}</div>
            </div>
          ${c?`
            <div class="card-stack">
              <div>
                <div class="meta">${e.cardTemplates}</div>
                <div class="card-template-grid" style="margin-top:12px;">
                  ${Pt.map(y=>hi(e,y)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${m.length?m.map((y,T)=>mi(e,y,T,m.length,T===r.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${E?gi(e,E,r.selectedCardIndex||0,r.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
              </div>
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.displaySettings}</h2>
              <div class="meta">${e.displaySubtitle}</div>
            </div>
          ${u?`
            <div class="inspector-grid">
              ${re(e.fieldDisplaySafeTop,"safeTop",ie(u,"safeTop"))}
              ${re(e.fieldDisplaySafeRight,"safeRight",ie(u,"safeRight"))}
              ${re(e.fieldDisplaySafeBottom,"safeBottom",ie(u,"safeBottom"))}
              ${re(e.fieldDisplaySafeLeft,"safeLeft",ie(u,"safeLeft"))}
              ${re(e.fieldDisplayPadding,"layoutPaddingPx",ie(u,"layoutPaddingPx"))}
              ${re(e.fieldDisplayGap,"layoutGapPx",ie(u,"layoutGapPx"))}
              ${re(e.fieldDisplayScale,"globalScale",ie(u,"globalScale"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.homeAssistant}</h2>
              <div class="meta">${g(N)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${fi(e,E,r.selectedCardIndex,r.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${g(r.entitySearch)}">
          </div>
          <div class="ha-list">
            ${L.length?L.map(y=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${g(y.name)}</strong>
                    <div class="meta">${g(y.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${g(y.entityId)}"${r.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${g(y.entityId)}</code>
                <div class="ha-state">${g(y.state)}${y.unit?` · ${g(y.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const B=v.querySelector("[data-avatar-archive]"),te=v.querySelector("[data-action='choose-avatar-archive']");te==null||te.addEventListener("click",()=>{if(!B||B.disabled)return;B.value="";const y=B;try{if(typeof y.showPicker=="function"){y.showPicker();return}}catch{}B.click()}),B==null||B.addEventListener("click",()=>{B.value=""}),B==null||B.addEventListener("change",()=>{var T;const y=((T=B.files)==null?void 0:T[0])||null;$(y),B.value=""});for(const y of Array.from(v.querySelectorAll(".page-chip[data-page-id]")))y.draggable=!0,y.addEventListener("dragstart",T=>{const W=String(y.dataset.pageId||"").trim();U=W?{kind:"page",pageId:W}:null,!(!U||!T.dataTransfer)&&(T.dataTransfer.effectAllowed="move",T.dataTransfer.setData("text/plain",JSON.stringify(U)))}),y.addEventListener("dragover",T=>{!U||U.kind!=="page"||(T.preventDefault(),se(n),y.classList.add("is-drop-target"),T.dataTransfer&&(T.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",T=>{if(!U||U.kind!=="page")return;T.preventDefault();const W=String(y.dataset.pageId||"").trim();W&&Se(U.pageId,W),U=null,se(n)}),y.addEventListener("dragend",()=>{U=null,se(n)});for(const y of Array.from(v.querySelectorAll(".card-list-item[data-card-index]")))y.draggable=!0,y.addEventListener("dragstart",T=>{const W=Number(y.dataset.cardIndex||"-1");U=Number.isFinite(W)&&W>=0?{kind:"card",cardIndex:W}:null,!(!U||!T.dataTransfer)&&(T.dataTransfer.effectAllowed="move",T.dataTransfer.setData("text/plain",JSON.stringify(U)))}),y.addEventListener("dragover",T=>{!U||U.kind!=="card"||(T.preventDefault(),se(n),y.classList.add("is-drop-target"),T.dataTransfer&&(T.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",T=>{if(!U||U.kind!=="card")return;T.preventDefault();const W=Number(y.dataset.cardIndex||"-1");Number.isFinite(W)&&W>=0&&xe(U.cardIndex,W),U=null,se(n)}),y.addEventListener("dragend",()=>{U=null,se(n)});C(),V()},H=(u,p)=>{r.status=u,r.statusTone=p,P()},F=()=>{if(!r.config)return;const u=J(r.config);if(!u.length){r.selectedPageId=null;return}(!r.selectedPageId||!u.some(m=>m.id===r.selectedPageId))&&(r.selectedPageId=u[0].id);const p=u.find(m=>m.id===r.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(r.selectedCardIndex===null||r.selectedCardIndex>=c.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),Ja(r.selectedPageId),Ka(Va(r.config,r.selectedPageId))},M=()=>{r.dirty=!0,H(e.statusDirty,"muted")},Z=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),r.selectedPageId&&u.searchParams.set("editorPage",r.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},ye=(u,p)=>{if(!r.config||!r.selectedPageId)return;const c=r.config.pages.find(m=>m.id===r.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const m=Et(r.config,p||"page"),E=c.id;c.id=m,r.config.rotation.order=r.config.rotation.order.map(L=>L===E?m:L),r.selectedPageId=m}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);M(),F()}},be=(u,p)=>{if(!r.config)return;const c=Ga(r.config),m=c.safeArea||{},E=p===""?null:Number(p),L=Number.isFinite(E)?E:null;u==="safeTop"?m.top=L??0:u==="safeRight"?m.right=L??0:u==="safeBottom"?m.bottom=L??0:u==="safeLeft"?m.left=L??0:u==="layoutPaddingPx"?c.layoutPaddingPx=L??16:u==="layoutGapPx"?c.layoutGapPx=L??16:u==="globalScale"&&(c.globalScale=L??1),c.safeArea=m,M()},we=(u,p,c)=>{var L;if(!r.config||!r.selectedPageId)return;const m=r.config.pages.find(N=>N.id===r.selectedPageId);if(!m)return;Array.isArray(m.cards)||(m.cards=[]);const E=m.cards[u];if(E){if(p==="type"){const N=ot(c);if(m.cards[u]={...N,caption:z(E,"caption")||N.caption},((L=r.focusedBinding)==null?void 0:L.cardIndex)===u){const I=ft(c);r.focusedBinding=I?{cardIndex:u,field:I}:null}}else p==="digits"?E[p]=c===""?0:Number(c):E[p]=c;M()}},Se=(u,p)=>{if(!r.config||!u||!p||u===p)return;const c=J(r.config).map(L=>L.id),m=c.indexOf(u),E=c.indexOf(p);m<0||E<0||(c.splice(m,1),c.splice(E,0,u),r.config.rotation.order=c,r.selectedPageId=u,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),P())},xe=(u,p)=>{if(!r.config||!r.selectedPageId||u===p)return;const c=r.config.pages.find(E=>E.id===r.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||p<0||u>=c.cards.length||p>=c.cards.length)return;const[m]=c.cards.splice(u,1);c.cards.splice(p,0,m),r.selectedCardIndex=p,r.focusedBinding=null,M(),P()},$e=u=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const p=r.config.pages.find(E=>E.id===r.selectedPageId),c=r.haEntities.find(E=>E.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const m=p.cards[r.focusedBinding.cardIndex];m&&(vi(m,r.focusedBinding.field,c),M(),P())},ke=(u,p)=>{r.selectedCardIndex=u,r.focusedBinding={cardIndex:u,field:p},P(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async u=>{var ee,Re;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),m=c==null?void 0:c.dataset.action;if(!m||!r.config)return;const E=J(r.config),L=(c==null?void 0:c.dataset.pageId)||null,N=L?E.findIndex(S=>S.id===L):-1;if(m==="select-page"&&L){r.selectedPageId=L,r.selectedCardIndex=0,r.focusedBinding=null,F(),P();return}if(m==="page-up"&&N>0){const S=E.map(_=>_.id);[S[N-1],S[N]]=[S[N],S[N-1]],r.config.rotation.order=S,r.selectedPageId=L,M(),F(),P();return}if(m==="page-down"&&N>=0&&N<E.length-1){const S=E.map(_=>_.id);[S[N],S[N+1]]=[S[N+1],S[N]],r.config.rotation.order=S,r.selectedPageId=L,M(),F(),P();return}if(m==="page-remove"&&L&&E.length>1){r.config.pages=r.config.pages.filter(S=>S.id!==L),r.config.rotation.order=J(r.config).map(S=>S.id),r.selectedPageId=((ee=J(r.config)[Math.max(0,N-1)])==null?void 0:ee.id)||((Re=J(r.config)[0])==null?void 0:Re.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),P();return}if(m==="add-page"){const S=qa(r.config);r.config.pages.push(S),r.config.rotation.order=J(r.config).map(_=>_.id),r.selectedPageId=S.id,r.selectedCardIndex=null,r.focusedBinding=null,M(),F(),P();return}if(m==="add-card-template"&&r.selectedPageId){const S=r.config.pages.find(B=>B.id===r.selectedPageId),_=(c==null?void 0:c.dataset.cardType)||"entity";if(S){Array.isArray(S.cards)||(S.cards=[]),S.cards.push(ot(_));const B=S.cards.length-1;r.selectedCardIndex=B;const te=ft(_);r.focusedBinding=te?{cardIndex:B,field:te}:null,M(),P(),te&&window.requestAnimationFrame(()=>{const y=n.querySelector("#ha-entity-search");y==null||y.scrollIntoView({behavior:"smooth",block:"center"}),y==null||y.focus()})}return}if(m==="focus-binding"){const S=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),_=(c==null?void 0:c.dataset.bindingField)||"";S>=0&&_&&ke(S,_);return}const I=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(I>=0&&r.selectedPageId){const S=r.config.pages.find(_=>_.id===r.selectedPageId);if(!S||!Array.isArray(S.cards))return;if(m==="select-card"){r.selectedCardIndex=I,P();return}if(m==="card-remove"){S.cards=S.cards.filter((_,B)=>B!==I),r.selectedCardIndex!==null&&(r.selectedCardIndex===I?r.selectedCardIndex=S.cards.length?Math.min(I,S.cards.length-1):null:r.selectedCardIndex>I&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===I?r.focusedBinding=null:r.focusedBinding.cardIndex>I&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),M(),P();return}if(m==="card-up"&&I>0){[S.cards[I-1],S.cards[I]]=[S.cards[I],S.cards[I-1]],r.selectedCardIndex===I?r.selectedCardIndex=I-1:r.selectedCardIndex===I-1&&(r.selectedCardIndex=I),r.focusedBinding&&(r.focusedBinding.cardIndex===I?r.focusedBinding={cardIndex:I-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===I-1&&(r.focusedBinding={cardIndex:I,field:r.focusedBinding.field})),M(),P();return}if(m==="card-down"&&I<S.cards.length-1){[S.cards[I],S.cards[I+1]]=[S.cards[I+1],S.cards[I]],r.selectedCardIndex===I?r.selectedCardIndex=I+1:r.selectedCardIndex===I+1&&(r.selectedCardIndex=I),r.focusedBinding&&(r.focusedBinding.cardIndex===I?r.focusedBinding={cardIndex:I+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===I+1&&(r.focusedBinding={cardIndex:I,field:r.focusedBinding.field})),M(),P();return}}if(m==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,H(e.saving,"muted");try{if(r.avatarPackDirty&&r.avatarPackDetails&&a.avatarPackApiUrl){try{r.avatarPackDetails=await di(a.avatarPackApiUrl,r.avatarPackDetails)}catch(S){throw new Error(`${e.avatarMappingSaveError}: ${String(S)}`)}r.avatarPackDirty=!1}r.config=await Xa(a.sceneApiUrl,Ge(r.config)),r.dirty=!1,r.saving=!1,r.avatarPackSaving=!1,F(),H(e.statusSaved,"ok"),window.setTimeout(()=>Z(),250)}catch(S){r.saving=!1,r.avatarPackSaving=!1,H(`${e.saveError}: ${String(S)}`,"bad")}return}if(m==="bind-entity"){const S=(c==null?void 0:c.dataset.entityId)||"";$e(S)}}),n.addEventListener("input",u=>{const p=u.target;if(!p||!r.config){p&&p.dataset.previewDisplay!==void 0&&k(p.value);return}if(p.dataset.previewDisplay!==void 0){k(p.value);return}if(p.dataset.avatarSemantic!==void 0){const c=Fe(r.config);if(!r.avatarPackDetails||!c||r.avatarPackDetails.packId!==c)return;const m=p.value.trim();m?r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic]=Number(m):delete r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic],r.avatarPackDirty=!0,H(e.statusDirty,"muted"),P();return}if(p.dataset.pageField){ye(p.dataset.pageField,p.value),P();return}if(p.dataset.displayField){be(p.dataset.displayField,p.value),P();return}if(p.dataset.cardField&&p.dataset.cardIndex){r.selectedCardIndex=Number(p.dataset.cardIndex),we(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),P();return}p.hasAttribute("data-ha-search")&&(r.entitySearch=p.value,P())}),n.addEventListener("click",u=>{var m;const p=(m=u.target)==null?void 0:m.closest("[data-action='select-avatar-pack']");if(!p||!r.config)return;const c=String(p.dataset.packId||"").trim();lt(r.config).packId=c||null,M(),x(c||null).finally(()=>P()),P()}),t.addEventListener("click",u=>{if(!r.config)return;const p=u.target,c=p==null?void 0:p.closest("[data-scene-card-index][data-scene-page-id]");if(c){const E=String(c.dataset.scenePageId||"").trim(),L=Number(c.dataset.sceneCardIndex||"-1");E&&Number.isFinite(L)&&L>=0&&(r.selectedPageId=E,r.selectedCardIndex=L,r.focusedBinding=null,F(),P(),pt("cards"));return}const m=p==null?void 0:p.closest("[data-scene-page-id]");if(m){const E=String(m.dataset.scenePageId||"").trim();E&&(r.selectedPageId=E,r.selectedCardIndex=0,r.focusedBinding=null,F(),P(),pt("pages"));return}}),n.addEventListener("change",u=>{var c;const p=u.target;!p||p.dataset.avatarArchive===void 0||$(((c=p.files)==null?void 0:c[0])||null)}),n.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(r.selectedCardIndex=c,r.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(r.config=await Za(a.sceneApiUrl),a.sceneAvatarManifestUrl)try{r.bundledAvatar=await si(a.sceneAvatarManifestUrl,a.packId)}catch{r.bundledAvatar=null}if(a.avatarCatalogUrl)try{r.avatarCatalog=await ct(a.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=ei(((fe=St())==null?void 0:fe.states)||null),r.selectedPageId=Ya(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",await x(Fe(r.config)),F()}catch(u){r.status=`${e.loadError}: ${String(u)}`,r.statusTone="bad"}P()}const bi="../scene-api/bootstrap",wi="weather.forecast_home_assistant",Si="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ee="/local/live2d/",mt="/scene-legacy/live2d/",xi={...$t,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},$i={...kt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},ki={...Ct,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Ci={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Ii={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Pi(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Ei(){return new URLSearchParams(window.location.search).get("bootstrap")||bi}function Ai(a){const e=new URL(a,window.location.href),t=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);if(t)return new URL(t[0],e.origin).toString();for(const i of["/scene-api/","/scene-runtime/","/scene-editor/"]){const n=e.pathname.indexOf(i);if(n>=0)return new URL(e.pathname.slice(0,n+1),e.origin).toString()}return null}function R(a,e){const t=Ui(String(a||"").trim(),e);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const n=Ai(e);if(n)return new URL(t.slice(1),n).toString()}return new URL(t,i).toString()}function Ui(a,e){const t=String(a||"").trim();if(!t)return"";if(t.startsWith(Ee))return`${mt}${t.slice(Ee.length)}`;if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))try{const i=new URL(t,new URL(e,window.location.href));if(i.pathname.startsWith(Ee)){const n=i.pathname.slice(Ee.length);return R(`${mt}${n}${i.search}${i.hash}`,e)||t}}catch{return t}return t}function Li(a,e){const t=Ve(a),i=t.adapter==="live2d"?R("../../scene-runtime/avatar.html",e):"",n=R(String(t.assetRoot||"").trim(),e),s=o=>{const f=String(o||"").trim();return f?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(f)||f.startsWith("/")?R(f,e):f:""},l=Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([o,f])=>[o,R(String(f||""),e)]).filter(([,o])=>!!o));return{...t,assetRoot:n,runtimeUrl:i||R(String(t.runtimeUrl||"").trim(),e),entry:s(String(t.entry||"").trim()),modelUrl:s(String(t.modelUrl||"").trim()),fallbackPortrait:s(String(t.fallbackPortrait||"").trim()),motionMapUrl:s(String(t.motionMapUrl||"").trim()),presetThumbs:l}}function ze(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function Lt(){return new URLSearchParams(window.location.search).get("editor")==="1"}function Ti(){if(!Lt())return;const a=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),a(),window.addEventListener("pageshow",a,{once:!0}),window.addEventListener("load",a,{once:!0}),window.requestAnimationFrame(()=>{a(),window.setTimeout(a,120)});let e=!1;const t=()=>{e=!0},i=["pointerdown","wheel","touchstart","keydown"];for(const l of i)window.addEventListener(l,t,{once:!0,passive:!0});let n=0;const s=window.setInterval(()=>{if(e||n>=24){window.clearInterval(s);return}a(),n+=1},80)}async function Ri(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function me(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function Mi(a,e){var t,i,n,s,l,o,f,v,r,x,C,k;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([$,w])=>[$,R(w,e)]).filter(([,$])=>!!$)),avatar:{manifestUrl:R(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:R(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((n=a.state)==null?void 0:n.provider)||"json",stateUrl:R(String(((s=a.state)==null?void 0:s.stateUrl)||"").trim(),e),apiUrl:R(String(((l=a.state)==null?void 0:l.apiUrl)||"").trim(),e)||void 0,haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:R(String(((f=a.state)==null?void 0:f.idleLinesUrl)||"").trim(),e),entityMapUrl:R(String(((v=a.state)==null?void 0:v.entityMapUrl)||"").trim(),e)},control:{provider:((r=a.control)==null?void 0:r.provider)||"json",controlUrl:R(String(((x=a.control)==null?void 0:x.controlUrl)||"").trim(),e),apiUrl:R(String(((C=a.control)==null?void 0:C.apiUrl)||"").trim(),e)||void 0,entityMapUrl:R(String(((k=a.control)==null?void 0:k.entityMapUrl)||"").trim(),e)||void 0}}}async function Di(a,e){var $,w,A,U,V,G,P,H;const t=R(String((($=a.files)==null?void 0:$.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=R(String(((w=a.files)==null?void 0:w.sceneConfigUrl)||"").trim(),e),n=R(String(((A=a.files)==null?void 0:A.avatarCatalogUrl)||"").trim(),e);let s="";if(i&&n)try{const F=await me(i);s=String(((U=F.avatar)==null?void 0:U.packId)||"").trim()}catch{s=""}let l="";if(s&&n)try{const F=await me(n),M=Array.isArray(F.items)?F.items.find(Z=>String(Z.id||"").trim()===s):null;l=R(String((M==null?void 0:M.manifestUrl)||"").trim(),e)}catch{l=""}const o=Mi(await me(t),t),f=R(String(((V=a.files)==null?void 0:V.haStatesUrl)||"").trim(),e);f&&(o.state={...o.state||{},apiUrl:((G=o.state)==null?void 0:G.apiUrl)||f},o.control={...o.control||{},apiUrl:((P=o.control)==null?void 0:P.apiUrl)||f});const v=l||String(((H=o.avatar)==null?void 0:H.manifestUrl)||"").trim();if(!v)return URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));const r=R(v,e),x=Li(await me(r),r),C=URL.createObjectURL(new Blob([JSON.stringify(x)],{type:"application/json"})),k={...o,avatar:{manifestUrl:C}};return URL.createObjectURL(new Blob([JSON.stringify(k)],{type:"application/json"}))}const he=document.getElementById("app");if(!he)throw new Error("Missing #app root element");const le=Ii[Pi()];Ti();ze(he,le.startingTitle,le.startingBody);(async()=>{var e,t,i,n,s;const a=Ei();try{const l=await Ri(a),o=String(l.packId||"").trim(),f=o.toLowerCase()==="neiri",v=await Di(l,a),r=v?await me(v):null;if(!v){ze(he,le.missingRendererTitle,le.missingRendererBody,JSON.stringify(l,null,2));return}document.documentElement.dataset.packId=o,document.title=f?"Нейри":o?`kiosk-scene hosted runtime (${o})`:"kiosk-scene hosted runtime",await Ma(he,{rendererConfigUrl:v,weatherUrl:f?"./weather.json":void 0,weatherReader:f?Ta({weatherEntity:wi,openMeteoUrl:Si,locale:"ru-RU",iconBaseUrl:"./assets",apiUrl:String(((e=r==null?void 0:r.state)==null?void 0:e.apiUrl)||"").trim()||void 0,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:f?xi:void 0,labels:f?$i:void 0,presetLabels:f?ki:void 0,defaultWeather:f?Ci:void 0}),Lt()&&await yi({packId:o,sceneApiUrl:R(String(l.sceneEditorApiUrl||"").trim(),a),sceneAvatarManifestUrl:R(String(((t=l.files)==null?void 0:t.avatarManifestUrl)||"").trim(),a),avatarCatalogUrl:R(String(((i=l.files)==null?void 0:i.avatarCatalogUrl)||"").trim(),a),avatarImportUrl:R(String(((n=l.files)==null?void 0:n.avatarImportUrl)||"").trim(),a),avatarPackApiUrl:R(String(((s=l.files)==null?void 0:s.avatarPackApiUrl)||"").trim(),a),sceneUrl:R(String(l.entryUrl||l.runtimeBaseUrl||"./").trim(),a)})}catch(l){ze(he,le.failedTitle,le.failedBody,String(l))}})();
