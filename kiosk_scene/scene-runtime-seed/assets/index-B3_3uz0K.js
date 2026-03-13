var Bt=Object.defineProperty;var Ft=(t,e,a)=>e in t?Bt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var b=(t,e,a)=>Ft(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function L(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function d(t,e=160){const a=String(t??"").replace(/\s+/g," ").trim();return a?a.length<=e?a:`${a.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function at(t){const e=new Date(String(t??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ye(t,e){if(!L(t)||!L(e))return e??t;const a={...t};for(const[r,n]of Object.entries(e)){if(Array.isArray(n)){a[r]=n.slice();continue}if(L(n)&&L(a[r])){a[r]=ye(a[r],n);continue}a[r]=n}return a}function bt(t,e=40){return Array.isArray(t)?t.map(a=>d(a,e).toLowerCase()).filter(Boolean):[]}const ae={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},rt={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function je(t){var a,r,n,s,l,o,f,g,i,x,C,$,k,w;const e=ye(ae,L(t)?t:{});return{version:1,assistant:{name:d((a=e.assistant)==null?void 0:a.name,40)||ae.assistant.name,locale:d((r=e.assistant)==null?void 0:r.locale,16)||void 0},links:L(e.links)?Object.fromEntries(Object.entries(e.links).map(([E,T])=>[d(E,64),d(T,1024)]).filter(([E,T])=>E&&T)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||ae.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||ae.scene.configUrl},state:{provider:((l=e.state)==null?void 0:l.provider)==="ha"?"ha":"json",stateUrl:d((o=e.state)==null?void 0:o.stateUrl,1024)||ae.state.stateUrl,apiUrl:d((f=e.state)==null?void 0:f.apiUrl,1024)||void 0,haApiFallback:((g=e.state)==null?void 0:g.haApiFallback)===!0,idleLinesUrl:d((i=e.state)==null?void 0:i.idleLinesUrl,1024)||ae.state.idleLinesUrl,entityMapUrl:d((x=e.state)==null?void 0:x.entityMapUrl,1024)||void 0},control:{provider:((C=e.control)==null?void 0:C.provider)==="ha"?"ha":"json",controlUrl:d(($=e.control)==null?void 0:$.controlUrl,1024)||ae.control.controlUrl,apiUrl:d((k=e.control)==null?void 0:k.apiUrl,1024)||void 0,entityMapUrl:d((w=e.control)==null?void 0:w.entityMapUrl,1024)||void 0}}}function Ke(t){var a,r,n,s,l;const e=ye(rt,L(t)?t:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||rt.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:L(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,f])=>[d(o,32),d(f,1024)]).filter(([o,f])=>o&&f)):{},viewPresets:L(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,f])=>d(o,32)&&L(f))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((r=e.capabilities)==null?void 0:r.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((l=e.capabilities)==null?void 0:l.supportsPointerFocus)===!0}}}const ee={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},_t=["full","torso","head"];function pe(t,e=Date.now()){var o,f,g,i,x,C,$;const a=ye(ee,L(t)?t:{}),r={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((o=a.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:d((f=a.page)==null?void 0:f.target,40)||null,until:d((g=a.page)==null?void 0:g.until,64)||null},cue:{cue:d((i=a.cue)==null?void 0:i.cue,32)||null,emotion:d((x=a.cue)==null?void 0:x.emotion,32)||null,motion:d((C=a.cue)==null?void 0:C.motion,32)||null,until:d(($=a.cue)==null?void 0:$.until,64)||null}},n=d(a.viewPreset,16).toLowerCase();r.viewPreset=_t.includes(n)?n:null;const s=at(r.page.until);r.page.mode==="pinned"&&(r.page.target?r.page.until&&(!s||s<=e)&&(r.page={mode:"auto",target:null,until:null}):r.page={mode:"auto",target:null,until:null});const l=at(r.cue.until);return r.cue.until&&(!l||l<=e)&&(r.cue={cue:null,emotion:null,motion:null,until:null}),r}function Be(t,e,a=Date.now()){return pe(ye(pe(t,a),L(e)?e:{}),a)}function Ot(t,e,a=Date.now()){return pe({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function Ht(t,e,a=3e4,r=Date.now()){const n=d(e,40),s=new Date(r+Math.max(5e3,Number(a)||0)).toISOString();return pe({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},r)}function wt(t,e){var l,o,f;const a={...t||{}},r=d((l=e==null?void 0:e.cue)==null?void 0:l.cue,32),n=d((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),s=d((f=e==null?void 0:e.cue)==null?void 0:f.motion,32);return r&&(a.cue=r),n&&(a.emotion=n),s&&(a.motion=s),a}function _(t,e){const a=Number(t);return Number.isFinite(a)?Math.max(0,a):e}function ze(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function Je(t){return L(t)&&L(t.config)?t.config:t}function St(t,e){const a=e.map(n=>t.find(s=>s.id===n)).filter(Boolean),r=t.filter(n=>!a.some(s=>s.id===n.id));return a.concat(r)}function jt(t,e){const a={...t};return L(e)&&(typeof e.id=="string"&&(a.id=d(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(r=>L(r)))),a}function zt(t,e){const a=Je(t),r=Array.isArray(e.pages)?e.pages.slice():[],n=L(a)&&Array.isArray(a.pages)?a.pages:[],s=r.map($=>{const k=n.find(w=>d(L(w)?w.id:"",40)===$.id);return jt($,k)}),l=L(a)&&L(a.rotation)?a.rotation:{},o=L(e.display)?e.display:{},f=L(a)&&L(a.display)?a.display:{},g=L(o.safeArea)?o.safeArea:{},i=L(f.safeArea)?f.safeArea:{},x=Array.isArray(l.order)?l.order:e.rotation.order,C=bt(x).filter(($,k,w)=>s.some(E=>E.id===$)&&w.indexOf($)===k);return{version:1,rotation:{order:C.length?C:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(l.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:_(i.top,_(g.top,0)),right:_(i.right,_(g.right,0)),bottom:_(i.bottom,_(g.bottom,0)),left:_(i.left,_(g.left,0))},layoutPaddingPx:_(f.layoutPaddingPx,_(o.layoutPaddingPx,16)),layoutGapPx:_(f.layoutGapPx,_(o.layoutGapPx,16)),globalScale:ze(f.globalScale,ze(o.globalScale,1))},pages:s}}function Vt(t,e){var s;const a=zt(t,e),r=Je(t),n=L(r)&&L(r.avatar)?{packId:typeof r.avatar.packId=="string"&&d(r.avatar.packId,120)||null}:{packId:typeof((s=e.avatar)==null?void 0:s.packId)=="string"&&d(e.avatar.packId,120)||null};return{version:1,kind:"scene.display",rotation:{order:a.rotation.order.slice(),defaultDwellMs:a.rotation.defaultDwellMs},display:{safeAreaPx:{...a.display.safeAreaPx},layoutPaddingPx:a.display.layoutPaddingPx,layoutGapPx:a.display.layoutGapPx,globalScale:a.display.globalScale},avatar:n,pages:St(a.pages,a.rotation.order)}}function Wt(t){return L(t)&&t.kind==="scene.display"&&Number(t.version)===1&&L(t.rotation)&&Array.isArray(t.pages)&&L(t.display)&&L(t.display.safeAreaPx)}function qt(t){var o,f;const e=Array.isArray(t.pages)?t.pages.filter(g=>L(g)):[],a=Array.isArray((o=t.rotation)==null?void 0:o.order)?t.rotation.order:e.map(g=>g.id),r=bt(a).filter((g,i,x)=>e.some(C=>C.id===g)&&x.indexOf(g)===i),n=t.display,s=t.display.safeAreaPx,l=L(t.avatar)?{packId:typeof t.avatar.packId=="string"&&d(t.avatar.packId,120)||null}:{packId:null};return{version:1,kind:"scene.display",rotation:{order:r.length?r:e.map(g=>g.id),defaultDwellMs:Math.max(5e3,Number((f=t.rotation)==null?void 0:f.defaultDwellMs)||18e3)},display:{safeAreaPx:{top:_(s.top,0),right:_(s.right,0),bottom:_(s.bottom,0),left:_(s.left,0)},layoutPaddingPx:_(n.layoutPaddingPx,16),layoutGapPx:_(n.layoutGapPx,16),globalScale:ze(n.globalScale,1)},avatar:l,pages:St(e,r)}}function Gt(t,e){if(Wt(t))return qt(t);const a=Je(t);if(!L(a))throw new Error("Scene runtime config must be a JSON object.");return Vt(a,a)}function Kt(t,e=220){const a=d(t,Math.max(e+20,e)),r={emotion:"",activity:"",cue:"",motion:""},n=a.replace(/\[(emotion|activity|cue|motion|page|preset|view|size)\s*:\s*([a-z0-9_-]+)\]/gi,(s,l,o)=>{const f=d(l,16).toLowerCase(),g=d(o,32).toLowerCase();return(f==="emotion"||f==="activity"||f==="cue"||f==="motion")&&g&&(r[f]=g)," "});return{text:d(n,e),emotion:r.emotion,activity:r.activity,cue:r.cue,motion:r.motion}}const xt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function fe(t,e={}){const a=L(t)?t:{},r={...xt,...e};return{version:1,assistant:d(a.assistant??r.assistant,40),online:typeof a.online=="boolean"?a.online:r.online,busy:typeof a.busy=="boolean"?a.busy:r.busy,status:d(a.status??r.status,255),message:d(a.message??r.message,255),source:d(a.source??r.source,64),updatedAt:d(a.updatedAt??r.updatedAt,64),emotion:d(a.emotion??r.emotion,32)||null,activity:d(a.activity??r.activity,32)||null,cue:d(a.cue??r.cue,32)||null,intensity:Jt(a.intensity??r.intensity),speaking:typeof a.speaking=="boolean"?a.speaking:!!r.speaking,motion:d(a.motion??r.motion,32)||null,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):r.revision,event:d(a.event??r.event,64)}}function Jt(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Yt(t,e){return t.order[e]||t.order[0]||""}function Zt(t,e){const a=t.order.findIndex(r=>r===e);return a>=0?a:0}function Xt(t,e,a,r){const n=Array.isArray(t.order)?t.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let l=1;l<=n.length;l+=1){const o=(s+l*a+n.length)%n.length;if(r(n[o]))return o}return s}function Qt(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],r=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=t.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:Zt(t.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(t.force){const l=Yt(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(l)?t.activeIndex:Math.max(0,a.findIndex(f=>t.isEligible(f))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<r)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let s=t.activeIndex;for(let l=1;l<=a.length;l+=1){const o=(t.activeIndex+l)%a.length;if(t.isEligible(a[o])){s=o;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const kt={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},ea=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function it(t){const e=d(t,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:ea.some(a=>e.includes(a)):!1}function ta(t,e){const a=fe(t),r=d(a.status,72),n=d(a.message,220);if(!(a.online!==!1&&(it(r)||it(n))))return{state:a,hasTechnicalFailure:!1};const o=d(a.emotion,32).toLowerCase(),f=d(a.motion,32).toLowerCase();return{state:{...a,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:o==="error"?"calm":o||null,activity:d(a.activity,32).toLowerCase()==="error"?"idle":d(a.activity,32)||null,cue:d(a.cue,32)||null,intensity:a.intensity??null,speaking:!1,motion:f==="error"?"idle_soft":f||null},hasTechnicalFailure:!0}}function aa(t,e){const a=(e==null?void 0:e.copy)??kt,r=fe(t),n=Kt(r.message,220),s=ta({...r,message:n.text,emotion:d(r.emotion,32)||n.emotion||null,activity:d(r.activity,32)||n.activity||null,cue:d(r.cue,32)||n.cue||null,motion:d(r.motion,32)||n.motion||null},{healthyStatus:a.technicalHealthyLabel}),l=s.state,o=d(l.message,180),f=d(l.activity,32).toLowerCase(),g=l.online!==!1&&f!=="offline",i=!!l.busy||f==="thinking"||f==="busy"||f==="acting",x=l.speaking===!0||f==="speaking",C=g?i?a.busyLabel:o||x?a.speakingLabel:s.hasTechnicalFailure?a.technicalHealthyLabel:a.idleLabel:a.offlineLabel,$=o?a.messageCaption:s.hasTechnicalFailure?a.statusCaption:a.modeCaption,k=o||(g?i?a.busyBody:d(e==null?void 0:e.idleMonologue,220)||a.idleBody:a.offlineBody);return{state:l,hasTechnicalFailure:s.hasTechnicalFailure,caption:$,label:C,body:k,bodyKey:[$,C,k].join(":")}}function ra(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function nt(t,e=-1){const a=Array.isArray(t)?t.map(n=>d(n,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let r=Math.floor(Math.random()*a.length);return a.length>1&&r===e&&(r=(r+1)%a.length),{line:a[r],index:r}}function ia(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),r=!!d(t==null?void 0:t.message,180);return e&&!a&&!r}const na={cue:null,emotion:null,motion:null,until:null},sa={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function oa(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function $t(t){return t.endsWith("/")?t:`${t}/`}function Ct(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function Pe(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;if(a.startsWith("/")){const n=Ct(t||window.location.href);if(n)return new URL(a.slice(1),n).toString();const s=new URL(window.location.href).origin;return new URL(a,s).toString()}const r=new URL($t(d(t,1024)||"."),window.location.href);return new URL(a,r).toString()}function Le(t){const e=d(t,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const a=Ct(window.location.href);return a?new URL(e.slice(1),a).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function la(t,e,a){const r=d(t.runtimeUrl,1024)||d(e.runtimeUrl,1024);return r?Le(r):new URL("../avatar.html",new URL($t(d(a,1024)||"."),window.location.href)).toString()}function da(t,e){const a=d(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function ca(t,e){const a=new URL(t,window.location.href),r={...e.query||{}};e.displayMode!==!1&&r.display==null&&(r.display=!0);for(const[n,s]of Object.entries(r)){const l=d(n,64);if(!l||s==null)continue;const o=typeof s=="boolean"?s?"1":"0":String(s);a.searchParams.set(l,o)}return a.toString()}function st(t,e,a){const r=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),Pe(a,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([n,s])=>[d(n,64),Le(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Le(t.state.stateUrl),idleLinesUrl:Le(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:Pe(a,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:Pe(a,e.fallbackPortrait||""),motionMapUrl:Pe(a,e.motionMapUrl||""),presetThumbs:r}}}class ua{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"rendererConfigBlobUrl","");b(this,"currentState");b(this,"currentCue",{...na});b(this,"currentPreset","full");b(this,"currentBubble",{...sa});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var n;const a=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!a||e.source!==a||!oa(e.data))return;const r=d(e.data.type,64);if(r==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}r==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Ke({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=je(e.rendererConfig||{}),this.currentState=fe({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const a=la(this.options,this.manifest,this.assetRoot),r={...this.options.query||{}};try{if(new URL(a,window.location.href).origin===window.location.origin){const g=st(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(g)],{type:"application/json"})),r.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const n=ca(a,{...this.options,query:r});this.targetOrigin=da(n,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const l=document.createElement("iframe");l.className="ks-live2d-iframe",l.src=n,l.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,l.loading="eager",l.allow="autoplay",Object.assign(l.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&l.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);s.append(l,o),this.host.append(s),l.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=l,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=fe(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const r=d(e,255);this.currentBubble={text:r,key:r?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const r=document.createElement("div");Object.assign(r.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),r.append(n,s),a.append(r),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:st(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=wt(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var r;const a=(r=this.iframeEl)==null?void 0:r.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function pa(t={}){return new ua(t)}const fa={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},ot={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class ga{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const r=document.createElement("img");r.className="ks-static-avatar-image",Object.assign(r.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),r.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(r,n,s),this.host.append(a),this.frameEl=a,this.imageEl=r,this.bubbleEl=s,this.fallbackEl=n;const l=this.resolveImageUrl(e.assetRoot);l&&(r.src=l,r.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),r.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||ot,r=a[e]||a.full||ot.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(r.x)||0}px, ${Number(r.y)||0}px) scale(${Number(r.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const r=String(e||"").trim();if(!r){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=r,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return fa}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const r=e.replace(/\/+$/,""),n=a.replace(/^\.?\//,"");return r?`${r}/${n}`:n}}function ma(t={}){return new ga(t)}function ha(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function Pt(){var t;for(const e of ha())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),r=a==null?void 0:a.hass;if(r!=null&&r.states)return r}catch{continue}return null}function va(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function ya(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const r=d(a.entity_id,255);r&&(e[r]=a)}return e}function ba(t,e,a="Assistant"){const r=t[e.status],n=t[e.message],s=t[e.online],l=t[e.busy],o=t[e.source],f=t[e.updatedAt],g=e.emotion?t[e.emotion]:null,i=e.activity?t[e.activity]:null,x=e.cue?t[e.cue]:null,C=e.speaking?t[e.speaking]:null,$=e.intensity?t[e.intensity]:null,k=e.motion?t[e.motion]:null,w=t[e.revision];if(!r&&!n&&!s&&!l)return null;const E=d(r==null?void 0:r.state,72),T=d(n==null?void 0:n.state,220),W=d(f==null?void 0:f.state,64),K=Fe(s,!0),A=Fe(l,!1),j=d(i==null?void 0:i.state,32)||"",N=Fe(C)??j==="speaking",X=j||(K?N?"speaking":A?"thinking":"idle":"offline");return fe({version:1,assistant:d(a,40)||"Assistant",online:K,busy:A,status:E&&E!=="unknown"&&E!=="unavailable"?E:"",message:T&&T!=="unknown"&&T!=="unavailable"?T:"",source:d(o==null?void 0:o.state,64)||"ha",updatedAt:W&&W!=="unknown"&&W!=="unavailable"?W:(r==null?void 0:r.last_changed)||new Date().toISOString(),emotion:d(g==null?void 0:g.state,32)||null,activity:X,cue:d(x==null?void 0:x.state,32)||null,intensity:ka($),speaking:N,motion:d(k==null?void 0:k.state,32)||null,revision:Number(w==null?void 0:w.state)||0})}const wa=["full","torso","head"];function Sa(t){const e=d(t==null?void 0:t.state,16).toLowerCase();return wa.includes(e)?e:null}function xa(t,e){const a=e.viewPreset?t[e.viewPreset]:null,r=e.pageMode?t[e.pageMode]:null,n=e.pageTarget?t[e.pageTarget]:null,s=e.pageUntil?t[e.pageUntil]:null,l=e.cue?t[e.cue]:null,o=e.emotion?t[e.emotion]:null,f=e.motion?t[e.motion]:null,g=e.cueUntil?t[e.cueUntil]:null,i=e.revision?t[e.revision]:null;if(!a&&!r&&!n&&!l&&!o&&!f)return null;const x=d(n==null?void 0:n.state,40)||null,C=d(s==null?void 0:s.state,64)||null,$=d(r==null?void 0:r.state,16).toLowerCase(),k=$==="auto"?"auto":$==="pinned"||x||C?"pinned":"auto";return pe({...ee,revision:Number(i==null?void 0:i.state)||0,viewPreset:Sa(a),page:{mode:k,target:k==="pinned"?x:null,until:k==="pinned"?C:null},cue:{cue:d(l==null?void 0:l.state,32)||null,emotion:d(o==null?void 0:o.state,32)||null,motion:d(f==null?void 0:f.state,32)||null,until:d(g==null?void 0:g.state,64)||null}})}function Fe(t,e){const a=d(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function ka(t){const e=d(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function It(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),r=Math.max(6e4,t.authCooldownMs??600*1e3),n=d(t.apiUrl,4096);let s=null,l=0,o=null,f=0;async function g(){var k;const i=Pt();if(i!=null&&i.states)return i.states;const x=Date.now();if(s&&x-l<a||!n&&!t.allowApiFallback||typeof e!="function"||x<f)return s;if(o)return o;const C=n?"":d(((k=t.readToken)==null?void 0:k.call(t))??va(),4096);if(!n&&!C)return s;const $={};return C&&($.Authorization=`Bearer ${C}`),o=e(n||"/api/states",{cache:"no-store",headers:$}).then(async w=>{if(!w.ok){const E=new Error(`HA states HTTP ${w.status}`);throw E.status=w.status,E}return w.json()}).then(w=>{const E=ya(w);return E&&(s=E,l=Date.now()),E||s}).catch(w=>(((w==null?void 0:w.status)===401||(w==null?void 0:w.status)===403)&&(f=Date.now()+r),s)).finally(()=>{o=null}),o}return{id:"ha-states",async read(){return g()}}}async function Ye(t){const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=d(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const r=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");r.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await e(r.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return t.sanitize?t.sanitize(s):s}catch(n){if(t.defaultValue!==void 0)return t.defaultValue;throw n}}function $a(t){return{id:"json-state",async read(){const e=await Ye({...t,defaultValue:t.defaultValue});return fe(e)}}}function Ca(t){return{id:"json-control",async read(){const e=await Ye({...t,defaultValue:t.defaultValue??ee});return pe(e)}}}function Pa(t){return{id:"json-lines",async read(){const e=await Ye({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>d(a,220)).filter(Boolean):[]}}}function z(t,e,a=64){return d(t[e],a)}function me(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Ia(t,e="en-US"){const a=d(t,64);if(!a)return"";const r=new Date(a);return Number.isNaN(r.getTime())?a:r.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ie(t,e){return!t||!e?null:t[e]||null}function Ea(t,e=null,a="en-US"){var x,C,$,k;const r=z(t,"caption",40)||z(t,"type",24)||"Card",n=z(t,"hint",72),s=z(t,"type",32).toLowerCase()||"entity",l=z(t,"entity",255),o=Ie(e,l),f=Ie(e,z(t,"stateEntity",255)),g=Ie(e,z(t,"downEntity",255)),i=Ie(e,z(t,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:r,value:z(t,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const w=Number(o==null?void 0:o.state);return!Number.isFinite(w)||w<=0?{caption:r,value:"Clear",hint:n||"nothing pending"}:{caption:r,value:`${w} item${w===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const w=(o==null?void 0:o.state)==="on";return{caption:r,value:w?z(t,"onText",48)||"On":z(t,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const w=me(o==null?void 0:o.state,0);return{caption:r,value:w?`${w}%`:"—",hint:d(f==null?void 0:f.state,48)||n||"battery level"}}if(s==="network"){const w=me(g==null?void 0:g.state,0),E=me(i==null?void 0:i.state,0);return{caption:r,value:w||E?`↓ ${w||"0"} · ↑ ${E||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:r,value:Ia(o==null?void 0:o.state,a)||"—",hint:n||"next event"};if(s==="percent"){const w=me(o==null?void 0:o.state,Number(z(t,"digits",4))||0);return{caption:r,value:w?`${w}%`:"—",hint:n||d((x=o==null?void 0:o.attributes)==null?void 0:x.friendly_name,48)||"state percentage"}}if(s==="number"){const w=Number(z(t,"digits",4))||0,E=me(o==null?void 0:o.state,w),T=z(t,"unit",16)||d((C=o==null?void 0:o.attributes)==null?void 0:C.unit_of_measurement,16);return{caption:r,value:E?`${E}${T?` ${T}`:""}`:"—",hint:n||d(($=o==null?void 0:o.attributes)==null?void 0:$.friendly_name,48)||"numeric value"}}return{caption:r,value:d(o==null?void 0:o.state,64)||z(t,"value",64)||"—",hint:n||d((k=o==null?void 0:o.attributes)==null?void 0:k.friendly_name,48)||"entity state"}}function Aa(t,e=null,a="en-US"){return Array.isArray(t)?t.map(r=>Ea(r,e,a)):[]}const Et={...kt,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},At={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},Ut={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Ua={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Re={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function v(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ze(t){return t.endsWith("/")?t:`${t}/`}function Ta(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function H(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(t,window.location.href);if(a.startsWith("/")){const n=Ta(r.toString());return n?new URL(a.slice(1),n).toString():new URL(a,r.origin).toString()}return new URL(a,r).toString()}function Tt(t){try{return new URL(".",t).toString()}catch{return new URL(".",window.location.href).toString()}}function La(t,e){const a=Tt(e),r=H(a,d(t.assetRoot,1024)||"./assets"),n=r?Ze(r):a,s=l=>{const o=d(l,1024);return o?H(n,o):""};return{...t,assetRoot:r,runtimeUrl:H(a,t.runtimeUrl||""),entry:s(t.entry||""),modelUrl:s(t.modelUrl||""),fallbackPortrait:s(t.fallbackPortrait||""),motionMapUrl:s(t.motionMapUrl||""),expressionMapUrl:s(t.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([l,o])=>[l,H(a,o)]).filter(([,l])=>!!l))}}function _e(t){return{...Re,...t||{},metrics:{...Re.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)&&t.forecast.length?t.forecast.map(e=>({...e})):Re.forecast.map(e=>({...e}))}}function lt(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function G(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const r=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:r})}function Ra(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const r=d(e,24).toLowerCase();return r==="mmhg"||r==="мм рт. ст."?`${G(a)} мм рт. ст.`:`${G(a*.750061683,0)} мм рт. ст.`}function Da(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const r=d(e,24).toLowerCase();return r==="m/s"||r==="м/с"?`${G(a,1)} м/с`:r==="km/h"||r==="км/ч"?`${G(a/3.6,1)} м/с`:`${G(a,1)} м/с`}function Ma(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Na(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function Ba(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function Fa(t,e="ru-RU"){const a=d(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||d(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function dt(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function _a(t,e="./assets/icons"){const a=Number(t),r=Ze(e);return a===0?`${r}sun.svg`:[1,2].includes(a)?`${r}cloud-sun.svg`:[3].includes(a)?`${r}cloud.svg`:[45,48].includes(a)?`${r}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${r}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${r}cloud-snow.svg`:[95,96,99].includes(a)?`${r}cloud-lightning.svg`:`${r}cloud.svg`}function Oa(t){const e=d(t.locale,32)||"ru-RU",a=d(t.iconBaseUrl,1024)||"./assets/icons",r=It({allowApiFallback:t.allowApiFallback,apiUrl:t.apiUrl,fetchImpl:t.fetchImpl});return async()=>{var k,w,E,T,W,K,A,j,F,N,X,be,we,Se,xe,ke,$e,Ce,ge,u;const n=await r.read(),s=t.fetchImpl??globalThis.fetch,l=n==null?void 0:n[t.weatherEntity];let o=null;const f=d(t.openMeteoUrl,4096);if(f&&typeof s=="function")try{const p=await s(`${f}${f.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});p.ok&&(o=await p.json())}catch{o=null}if(!l&&!(o!=null&&o.current))return null;const g=d(l==null?void 0:l.last_changed,64)||d((k=o==null?void 0:o.current)==null?void 0:k.time,64)||new Date().toISOString(),i=l?Fa(l.state,e):dt((w=o==null?void 0:o.current)==null?void 0:w.weather_code,e),x=Array.isArray((E=o==null?void 0:o.daily)==null?void 0:E.time)?o.daily.time.map((p,c)=>{var I,U,R,P,Y;const h=new Date(`${p}T12:00:00+03:00`);return{name:h.toLocaleDateString(e,{weekday:"short"}),dayNumber:h.toLocaleDateString(e,{day:"numeric"}),monthShort:h.toLocaleDateString(e,{month:"short"}),note:d(dt((I=o.daily.weather_code)==null?void 0:I[c],e),28),max:`${G((U=o.daily.temperature_2m_max)==null?void 0:U[c])}°`,min:`${G((R=o.daily.temperature_2m_min)==null?void 0:R[c])}° · ${G((P=o.daily.precipitation_probability_max)==null?void 0:P[c])}%`,icon:_a((Y=o.daily.weather_code)==null?void 0:Y[c],a)}}):[],C=x[0]||null,$=x.slice(1,6);return{todayValue:Na(g,e),todayLabel:Ba(g,e),updatedAt:Ma(g,e),temperature:G(((T=l==null?void 0:l.attributes)==null?void 0:T.temperature)??((W=o==null?void 0:o.current)==null?void 0:W.temperature_2m),1),condition:i,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${G(((K=l==null?void 0:l.attributes)==null?void 0:K.apparent_temperature)??((A=o==null?void 0:o.current)==null?void 0:A.apparent_temperature)??((j=l==null?void 0:l.attributes)==null?void 0:j.temperature),1)}°C`,badgeSummary:i,badgeRange:C?`${C.max} / ${G((N=(F=o==null?void 0:o.daily)==null?void 0:F.temperature_2m_min)==null?void 0:N[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${G(((X=l==null?void 0:l.attributes)==null?void 0:X.humidity)??((be=o==null?void 0:o.current)==null?void 0:be.relative_humidity_2m))}%`,pressure:Ra(((we=l==null?void 0:l.attributes)==null?void 0:we.pressure)??((Se=o==null?void 0:o.current)==null?void 0:Se.surface_pressure),((xe=l==null?void 0:l.attributes)==null?void 0:xe.pressure_unit)??"hPa"),wind:Da(((ke=l==null?void 0:l.attributes)==null?void 0:ke.wind_speed)??(($e=o==null?void 0:o.current)==null?void 0:$e.wind_speed_10m),((Ce=l==null?void 0:l.attributes)==null?void 0:Ce.wind_speed_unit)??"km/h"),clouds:`${G(((ge=l==null?void 0:l.attributes)==null?void 0:ge.cloud_coverage)??((u=o==null?void 0:o.current)==null?void 0:u.cloud_cover))}%`},forecast:$}}}class Ha{constructor(e,a={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"sceneRuntimeConfig");b(this,"entityMap",null);b(this,"controlEntityMap",null);b(this,"haStatesReader",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",ee);b(this,"uiControl",ee);b(this,"currentControl",ee);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=a,this.copy={...Et,...a.copy||{}},this.labels={...At,...a.labels||{}},this.presetLabels={...Ut,...a.presetLabels||{}},this.weatherData=_e(a.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="${v(this.labels.avatarPresetGroup)}">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${v(this.presetLabels.full)}" aria-label="${v(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${v(this.presetLabels.torso)}" aria-label="${v(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${v(this.presetLabels.head)}" aria-label="${v(this.presetLabels.head)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="head">
                </button>
              </div>
              <div class="avatar-mount" data-avatar-mount></div>
            </div>
          </section>

          <section class="panel content-panel">
            <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="${v(this.labels.carouselRegion)}">
              <div class="carousel-track" data-carousel-track></div>
              <div class="carousel-dots" data-dots aria-label="${v(this.labels.pagesRegion)}"></div>
            </div>
          </section>
        </div>
      </div>
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=H(window.location.href,this.getRendererConfigUrl()),a=Tt(e),r=je(await this.readJson(e)),n=je({...r,links:Object.fromEntries(Object.entries(r.links||{}).map(([l,o])=>[l,H(a,o)])),avatar:{...r.avatar,manifestUrl:H(a,r.avatar.manifestUrl)},scene:{...r.scene,configUrl:H(a,r.scene.configUrl)},state:{...r.state,stateUrl:H(a,r.state.stateUrl),apiUrl:r.state.apiUrl?H(a,r.state.apiUrl):void 0,idleLinesUrl:H(a,r.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:r.state.entityMapUrl?H(a,r.state.entityMapUrl):void 0},control:{...r.control,controlUrl:H(a,r.control.controlUrl),apiUrl:r.control.apiUrl?H(a,r.control.apiUrl):void 0,entityMapUrl:r.control.entityMapUrl?H(a,r.control.entityMapUrl):void 0}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=La(Ke(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.sceneRuntimeConfig=Gt(this.sceneConfig),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await Pa({url:this.rendererConfig.state.idleLinesUrl||H(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=Be(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=Ot(this.uiControl,a||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",a=>{if(a.key==="ArrowLeft"){a.preventDefault(),this.stepPage(-1);return}a.key==="ArrowRight"&&(a.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",a=>{var r,n;a.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(a.target)||(this.carouselDragState={pointerId:a.pointerId,startX:a.clientX,startY:a.clientY,deltaX:0,deltaY:0,locked:!1},(n=(r=this.carouselShellEl).setPointerCapture)==null||n.call(r,a.pointerId))}),this.carouselShellEl.addEventListener("pointermove",a=>{if(!(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=a.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=a.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(a.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}a.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=a=>{if(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)return;const{locked:r,deltaX:n}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,l=r&&Math.abs(n)>=s*.16,o=n<0?1:-1;if(this.clearDragState(a.pointerId,!1),l){this.stepPage(o);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(this.currentControl),this.uiControl=Be(ee,this.uiControl),this.currentControl=Be(this.remoteControl,this.uiControl);const e=wt(this.currentState,this.currentControl);this.syncIdleMonologue(e);const a=aa(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),r=this.sceneRuntimeConfig;this.applyDisplayConfig(r);const n=r.pages,s=Qt({control:this.currentControl,rotation:r.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:l=>n.some(o=>o.id===l)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(a.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(a.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(n,a)}renderCarousel(e,a){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((r,n)=>r.kind==="overview"?this.renderOverviewSlide(r,a,n):this.renderDynamicSlide(r,n,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((r,n)=>`
      <button
        class="carousel-dot ${n===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${n}"
        data-scene-page-id="${v(r.id)}"
        aria-label="${v(d(r.title,40)||d(r.id,40)||`${this.labels.pageStamp} ${n+1}`)}"
      ></button>
    `).join("");for(const r of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))r.addEventListener("click",()=>{this.pinPageByIndex(Number(r.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,a,r){const n=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||Re,l=s.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="${v(e.id)}" data-scene-page-id="${v(e.id)}" data-slide-order="${r}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${v(s.title)}</h1>
              <p class="subline">${v(s.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${v(s.todayCaption)}</span>
                <span class="value">${v(s.todayValue)}</span>
                <span class="meta">${v(s.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${v(s.updatedCaption)}</span>
                <span class="value">${v(s.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${v(s.temperature)}</span>
                <span class="unit">°${v(s.unit)}</span>
              </div>
              <div class="condition">${v(s.condition)}</div>
              <div class="feels">${v(s.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${v(this.resolveIconUrl("thermometer"))}" alt=""><span>${v(s.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${v(this.resolveIconUrl("calendarDays"))}" alt=""><span>${v(s.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${v(a.caption)}</strong>
                  <div class="neiri-label">${v(a.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${v(this.resolveIconUrl("sparkles"))}" alt="${v(n)}"></div>
              </div>
              <div class="neiri-meta">${v(a.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${v(this.labels.humidity)}</span><i><img src="${v(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${v(s.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${v(this.labels.pressure)}</span><i><img src="${v(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${v(s.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${v(this.labels.wind)}</span><i><img src="${v(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${v(s.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${v(this.labels.clouds)}</span><i><img src="${v(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${v(s.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${v(s.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${l}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,a,r){const n=Aa(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),l=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),o=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${a+1} / ${r}`),f=e.cardStyle==="mini"?n.map(($,k)=>`
          <article class="mini-card" data-scene-card-index="${k}" data-scene-page-id="${v(e.id)}">
            <span class="caption">${v($.caption)}</span>
            <strong>${v($.value)}</strong>
          </article>
        `).join(""):n.map(($,k)=>`
          <article class="home-card" data-scene-card-index="${k}" data-scene-page-id="${v(e.id)}">
            <span class="caption">${v($.caption)}</span>
            <strong>${v($.value)}</strong>
            <small>${v($.hint)}</small>
          </article>
        `).join(""),g=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map($=>this.renderForecastDay($)).join("")}</div>`:"",i=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",x=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${a+1}`,C=d(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${v(e.id)}" data-scene-page-id="${v(e.id)}" data-slide-order="${a}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${v(e.kind)}" data-dynamic-card-style="${v(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${v(x)}</h1>
              ${C?`<p class="subline">${v(C)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${v(l)}</span>
              <span class="value">${v(o)}</span>
            </div>
          </div>
          ${g}
          <div class="${i}">
            ${f||`<div class="empty">${v(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `}renderForecastDay(e){return`
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${v(e.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${v(e.name)}</span>
            <span class="meta"><span class="day-number">${v(e.dayNumber)}</span><span class="day-month">${v(e.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${v(e.max)}</strong>
          <small>${v(e.min)}</small>
        </div>
        <div class="day-note">${v(e.note)}</div>
      </article>
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const a=e[0],r=e[e.length-1];return`${d(a.dayNumber,4)} ${d(a.monthShort,8)} → ${d(r.dayNumber,4)} ${d(r.monthShort,8)}`}resolveIconUrl(e){var n;const a=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return a||`${Ze(d(this.options.iconBaseUrl,1024)||"./assets")}${Ua[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:r,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${r}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,r=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${r}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,a){var r,n;!a&&((n=(r=this.carouselShellEl).hasPointerCapture)!=null&&n.call(r,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=Xt(this.sceneRuntimeConfig.rotation,this.activeIndex,e,r=>this.orderedPages.some(n=>n.id===r));this.pinPageByIndex(a)}pinPageByIndex(e){const r=(this.orderedPages.length?this.orderedPages:this.sceneRuntimeConfig.pages)[e];if(!r)return;const n=Math.max(18e3,this.sceneRuntimeConfig.rotation.defaultDwellMs*2);this.uiControl=Ht(this.uiControl,r.id,n),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!ia(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=nt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const a=nt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refresh()},ra(18e3,18e3))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: HTTP ${a.status}`);return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:It({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl})}async readAssistantState(){const e=async()=>$a({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??xt}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap||!this.haStatesReader)return e();const a=await this.haStatesReader.read();return ba(a||{},this.entityMap,this.rendererConfig.assistant.name)||e()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=ee){const a=async()=>Ca({url:this.rendererConfig.control.controlUrl,defaultValue:e}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap||!this.haStatesReader)return a();const r=await this.haStatesReader.read();return xa(r||{},this.controlEntityMap)||a()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const a=await this.readJson(this.getWeatherUrl());e=lt(e,a)}catch{}if(this.options.weatherReader)try{const a=await this.options.weatherReader();e=lt(e,a)}catch{}try{return _e(e)}catch{return _e(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return pa({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return ma({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const r=a.dataset.avatarPreset||"",n=a.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[r];a.classList.toggle("is-active",r===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function ja(t,e={}){const a=new Ha(t,e);return await a.init(),a}const za=["overview","cards","forecast+cards"],Va=["full","mini"],Lt=["entity","text","todo","onoff","battery","network","time","percent","number"],Z=["caption","hint"],Ee="/local/live2d/",ct="/scene-legacy/live2d/",Wa={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},qa={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackDelete:"Удалить",avatarPackDeleteConfirm:t=>`Удалить аватар «${t}»? Это действие нельзя отменить.`,avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackDelete:"Delete",avatarPackDeleteConfirm:t=>`Delete avatar "${t}"? This cannot be undone.`,avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Ga=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Ka=4*1024*1024,Ja=192*1024,De=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Ve="mellow-fly-7";function ce(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Ya(t){return De.find(e=>e.id===t)||De.find(e=>e.id===Ve)||De[0]}function Za(t){return`${t.width} × ${t.height}`}function m(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Xe(t){return JSON.parse(JSON.stringify(t))}function J(t){const e=new Map(t.pages.map(n=>[n.id,n])),a=t.rotation.order.map(n=>e.get(n)).filter(Boolean),r=t.pages.filter(n=>!a.some(s=>s.id===n.id));return[...a,...r]}function Xa(t,e){return e?Math.max(0,J(t).findIndex(a=>a.id===e)):0}function Qa(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Rt(t,e){const a=Qa(e);let r=a,n=2;for(;t.pages.some(s=>s.id===r);)r=`${a}-${n}`,n+=1;return r}function er(t){const e=t.pages.length+1,a=ce()==="ru";return{id:Rt(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function ut(t){const e=ce()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function V(t,e){const a=t[e];return a==null?"":String(a)}function Q(t,e){const a=t[e];return a==null?"":String(a)}function re(t,e){const a=t.display||{},r=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(r.top))?Number(r.top):0);case"safeRight":return String(Number.isFinite(Number(r.right))?Number(r.right):0);case"safeBottom":return String(Number.isFinite(Number(r.bottom))?Number(r.bottom):0);case"safeLeft":return String(Number.isFinite(Number(r.left))?Number(r.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function tr(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function Ae(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function Oe(t){return t.avatar||(t.avatar={}),t.avatar}function ar(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function rr(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function ir(t){var r;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&J(t).some(n=>n.id===a)?a:((r=J(t)[0])==null?void 0:r.id)||null}async function nr(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return Xe(a.config)}async function sr(t,e){const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),r=await a.json();if(!a.ok||r.success===!1||!r.config)throw new Error(`POST ${t} failed: HTTP ${a.status}`);return Xe(r.config)}function Qe(t){switch(t){case"text":return[...Z,"value"];case"todo":return[...Z,"entity"];case"onoff":return[...Z,"entity","onText","offText"];case"battery":return[...Z,"entity","stateEntity"];case"network":return[...Z,"downEntity","upEntity"];case"time":return[...Z,"entity"];case"percent":return[...Z,"entity","digits"];case"number":return[...Z,"entity","digits","unit"];default:return[...Z,"entity"]}}function He(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:t.kindOverview}function ue(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function Dt(t){const e=ce();return Wa[e][t]||""}function Me(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function or(t,e){const a=e.attributes||{},r=String(a.friendly_name||t),n=t.includes(".")&&t.split(".",1)[0]||"other",s=String(e.state||""),l=String(a.unit_of_measurement||"");return{entityId:t,name:r,domain:n,state:s,unit:l}}function lr(t){return t?Object.entries(t).map(([e,a])=>or(e,a)).sort((e,a)=>{const r=e.domain.localeCompare(a.domain);return r!==0?r:e.name.localeCompare(a.name,"ru")}):[]}function dr(t,e){const a=e.trim().toLowerCase();return a?t.filter(r=>r.entityId.toLowerCase().includes(a)||r.name.toLowerCase().includes(a)||r.domain.toLowerCase().includes(a)||r.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function cr(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():null}function ne(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(e,window.location.href);if(a.startsWith("/")){const n=cr(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,r).toString()}function et(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ee))return ne(`${ct}${a.slice(Ee.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const r=new URL(a,e);if(r.pathname.startsWith(Ee)){const n=r.pathname.slice(Ee.length);return ne(`${ct}${n}${r.search}${r.hash}`,e)}}catch{return a}return a}function ur(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function pr(t,e){const a=new URL("./",t).toString(),r=ne(et(e,a)||e,a);return ur(r||a)}function pt(t,e,a){const r=String(a||"").trim();return r?ne(et(r,t)||r,pr(t,e)):""}function fr(t,e){const a=String(e||"").trim();return a?ne(et(a,t)||a,new URL("./",t).toString()):""}function Mt(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}function We(t,e){const a=Mt(t);return{...a,manifestUrl:a.manifestUrl?ne(a.manifestUrl,e):"",previewUrl:a.previewUrl?ne(a.previewUrl,e):""}}async function gr(t,e){var g;const a=String(t||"").trim();if(!a)return null;const r=await fetch(a,{cache:"no-store"}),n=await r.json();if(!r.ok)throw new Error(`GET ${a} failed: HTTP ${r.status}`);const s=String(n.assetRoot||"").trim();let l=0;const o=pt(a,s,String(n.motionMapUrl||"").trim());if(o)try{const i=await fetch(o,{cache:"no-store"}),x=await i.json();i.ok&&Array.isArray(x.motions)&&(l=x.motions.length)}catch{l=0}const f=fr(a,String(((g=n.presetThumbs)==null?void 0:g.full)||"").trim())||pt(a,s,String(n.fallbackPortrait||"").trim());return Mt({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:a,previewUrl:f,motionCount:l,capabilities:n.capabilities})}async function ft(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),r=await a.json();if(!a.ok||r.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(r.items)?r.items.map(n=>We(n,e)).filter(n=>n.id&&n.manifestUrl):[]}async function mr(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const r=/\/api\/hassio_ingress\//.test(a),n=r?Ja:Ka;if(r||e.size>n){const f=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,g=Math.max(1,Math.ceil(e.size/n));let i=null;for(let x=0;x<g;x+=1){const C=x*n,$=Math.min(e.size,C+n),k=new FormData;k.set("uploadId",f),k.set("filename",e.name),k.set("chunkIndex",String(x)),k.set("chunkCount",String(g)),k.set("archive",e.slice(C,$,"application/zip"),`${e.name}.part-${x+1}-of-${g}`);const w=await fetch(a,{method:"POST",body:k}),E=await w.json();if(!w.ok||E.success===!1)throw new Error(String(E.error||`HTTP ${w.status}`));E.item&&(i=We(E.item,a))}if(!i)throw new Error("Avatar import did not return the imported pack.");return i}const s=new FormData;s.set("archive",e,e.name);const l=await fetch(a,{method:"POST",body:s}),o=await l.json();if(!l.ok||o.success===!1||!o.item)throw new Error(String(o.error||`HTTP ${l.status}`));return We(o.item,a)}async function hr(t,e){var l,o,f,g;const a=String(t||"").trim(),r=String(e||"").trim();if(!a||!r)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${a}?packId=${encodeURIComponent(r)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((l=s.motionMap)==null?void 0:l.motions)?(o=s.motionMap)==null?void 0:o.motions.map(i=>({index:Number(i.index),id:String(i.id||"").trim(),label:String(i.label||i.id||"").trim(),group:String(i.group||"").trim(),tags:Array.isArray(i.tags)?i.tags.map(x=>String(x||"").trim()).filter(Boolean):[]})).filter(i=>Number.isFinite(i.index)):[],semantic:typeof((f=s.motionMap)==null?void 0:f.semantic)=="object"&&((g=s.motionMap)!=null&&g.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function vr(t,e){var s,l,o;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const r=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await r.json();if(!r.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${r.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((l=n.motionMap)==null?void 0:l.semantic)=="object"&&((o=n.motionMap)!=null&&o.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function yr(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function br(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function wr(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Ga.map(r=>`
          <div class="field">
            <label for="avatar-semantic-${m(r.key)}">${m(br(t,r))}</label>
            <select id="avatar-semantic-${m(r.key)}" data-avatar-semantic="${m(r.key)}">
              <option value="">${m(t.avatarMotionNone)}</option>
              ${a.map(n=>`
                <option value="${m(String(n.index))}"${yr(e.motionMap.semantic[r.key])===String(n.index)?" selected":""}>
                  ${m(`${n.label||n.id} · #${n.index}`)}
                </option>
              `).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      <div class="cards-list">
        ${a.map(r=>`
          <article class="card-list-item">
            <div class="card-list-select">
              <strong>${m(r.label||r.id||`${t.avatarMappingMotion} ${r.index}`)}</strong>
              <span class="meta">${m(`${t.avatarMappingMotion} #${r.index} · ${r.group||t.avatarMappingMotion.toLowerCase()}`)}</span>
              <code>${m(r.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${t.avatarMappingSaveHint}</div>
    </div>
  `}function gt(t,e,a){var x,C,$,k,w;const r=(e==null?void 0:e.id)||"",n=a===r,s=(e==null?void 0:e.name)||t.avatarPackDefaultTile,l=(e==null?void 0:e.id)||t.avatarPackCurrent,o=(e==null?void 0:e.previewUrl)||"",f=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(x=e.capabilities)!=null&&x.supportsMotion?t.avatarCapabilityMotion:"",(C=e.capabilities)!=null&&C.supportsEmotion?t.avatarCapabilityEmotion:"",($=e.capabilities)!=null&&$.supportsLipSync?t.avatarCapabilityLipSync:"",(k=e.capabilities)!=null&&k.supportsViewPresets?t.avatarCapabilityViewPresets:"",(w=e.capabilities)!=null&&w.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],g=f.length?f:[t.avatarPackDefaultHint],i=e!==null;return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${o?`<img src="${m(o)}" alt="${m(s)}">`:`<span>${m(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${m(s)}</strong>
        <div class="meta">${m(l)}</div>
        <div class="avatar-pack-card-meta">
          ${g.map(E=>`<span>${m(E)}</span>`).join("")}
        </div>
        <div class="avatar-pack-card-actions">
          <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${m(r)}">
            ${m(n?t.avatarPackSelected:t.avatarPackSelect)}
          </button>
          ${i?`<button class="scene-editor-button is-danger" type="button" data-action="delete-avatar-pack" data-pack-id="${m(r)}" data-pack-name="${m(s)}">
            ${m(t.avatarPackDelete)}
          </button>`:""}
        </div>
      </div>
    </article>
  `}function tt(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function Sr(t,e,a,r){if(!e||a===null)return`<div class="meta">${m(t.entityBindingEmpty)}</div>`;const n=Qe(V(e,"type")||"entity").filter(s=>tt(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(r==null?void 0:r.cardIndex)===a&&r.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${m(s)}">
            ${m(Me(t,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${m(t.entityBindingNoTargets)}</div>`}function mt(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function oe(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function ht(t){return Qe(t).find(e=>tt(e))||null}function le(t,e,a,r=!1){return`
    <div class="field ${r?"is-wide":""}">
      <label for="page-field-${e}">${m(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${m(e)}" value="${m(a)}">
    </div>
  `}function ie(t,e,a){const r=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${m(t)}</label>
      <input id="display-field-${e}" type="number" step="${r}" data-display-field="${m(e)}" value="${m(a)}">
    </div>
  `}function vt(t,e,a,r){return`
    <div class="field">
      <label for="page-select-${e}">${m(t)}</label>
      <select id="page-select-${e}" data-page-field="${m(e)}">
        ${r.map(n=>`<option value="${m(n.value)}"${n.value===a?" selected":""}>${m(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function xr(t,e,a,r){const n=V(e,"type")||"entity",s=Qe(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${m(V(e,"caption")||ue(t,n))}</strong>
          <div class="meta">${m(ue(t,n))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${m(t.cardType)}</label>
          <select data-card-index="${a}" data-card-field="type">
            ${Lt.map(l=>`<option value="${l}"${l===n?" selected":""}>${m(ue(t,l))}</option>`).join("")}
          </select>
        </div>
        ${s.map(l=>{const o=tt(l),f=o&&(r==null?void 0:r.cardIndex)===a&&r.field===l;return o?`
              <div class="field ${l==="hint"?"is-wide":""} is-binding-field${f?" is-active":""}">
                <label>${m(Me(t,l))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${a}"
                    data-card-field="${m(l)}"
                    data-binding-field="${m(l)}"
                    value="${m(V(e,l))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${a}"
                    data-binding-field="${m(l)}"
                  >${t.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${l==="hint"?"is-wide":""}">
              <label>${m(Me(t,l))}</label>
              <input
                type="${l==="digits"?"number":"text"}"
                data-card-index="${a}"
                data-card-field="${m(l)}"
                value="${m(V(e,l))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function kr(t,e,a,r,n){const s=V(e,"type")||"entity",l=V(e,"caption")||ue(t,s),o=V(e,"entity")||V(e,"stateEntity")||V(e,"downEntity")||V(e,"upEntity")||V(e,"value")||V(e,"hint")||Dt(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
        <strong>${m(l)}</strong>
        <span class="meta">${m(ue(t,s))}</span>
        <div class="meta">${m(o)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===r-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function $r(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${m(e)}"
    >
      <strong>${m(ue(t,e))}</strong>
      <span>${m(Dt(e))}</span>
    </button>
  `}function Cr(t,e,a){t[e]=a.entityId;const r=t;String(r.caption||"").trim()||(r.caption=a.name),String(r.hint||"").trim()||(r.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(r.type==="number"||r.type==="percent")&&!String(r.unit||"").trim()&&a.unit&&(r.unit=a.unit)}async function Pr(t){var ge;const e=qa[ce()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const r=document.getElementById("scene-editor-shell");r!=null&&r.contains(a)&&document.body.insertBefore(a,r),r==null||r.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
        display: flex;
        gap: 12px;
        overflow-x: auto;
        overflow-y: hidden;
        padding-bottom: 6px;
        scroll-snap-type: x proximity;
        -webkit-overflow-scrolling: touch;
      }
      #scene-editor-shell .avatar-pack-grid::-webkit-scrollbar {
        height: 6px;
      }
      #scene-editor-shell .avatar-pack-grid::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background: rgba(32,48,65,0.18);
      }
      #scene-editor-shell .avatar-pack-card {
        display: grid;
        gap: 8px;
        border-radius: 16px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(255,255,255,0.92);
        padding: 10px;
        min-width: 110px;
        max-width: 110px;
        flex-shrink: 0;
        scroll-snap-align: start;
      }
      #scene-editor-shell .avatar-pack-card.is-active {
        border-color: rgba(45,98,162,0.35);
        box-shadow: inset 0 0 0 1px rgba(45,98,162,0.18);
      }
      #scene-editor-shell .avatar-pack-card-preview {
        aspect-ratio: 3/4;
        border-radius: 12px;
        background: linear-gradient(180deg, rgba(223,232,239,0.82), rgba(236,242,246,0.92));
        display: grid;
        place-items: center;
        overflow: hidden;
      }
      #scene-editor-shell .avatar-pack-card-preview img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      #scene-editor-shell .avatar-pack-card-preview span {
        padding: 10px;
        text-align: center;
        font: 11px/1.3 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.62);
      }
      #scene-editor-shell .avatar-pack-card-body {
        display: grid;
        gap: 6px;
      }
      #scene-editor-shell .avatar-pack-card-body strong {
        font-size: 12px;
        line-height: 1.25;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      #scene-editor-shell .avatar-pack-card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      #scene-editor-shell .avatar-pack-card-meta span {
        border-radius: 999px;
        padding: 2px 6px;
        background: rgba(214,225,237,0.72);
        font-size: 10px;
        color: #385268;
      }
      #scene-editor-shell .avatar-pack-card-actions {
        display: grid;
        gap: 4px;
      }
      #scene-editor-shell .scene-editor-button.is-danger {
        color: #a83232;
        border-color: rgba(168,50,50,0.25);
        background: rgba(255,230,230,0.72);
        font-size: 11px;
        padding: 4px 8px;
      }
      #scene-editor-shell .scene-editor-button.is-danger:hover {
        background: rgba(255,210,210,0.9);
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
                ${De.map(u=>`<option value="${m(u.id)}">${m(u.label[ce()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),l=n.querySelector("[data-preview-canvas]"),o=n.querySelector("[data-preview-resolution]"),f=n.querySelector("[data-preview-display]"),g=n.querySelector("[data-dashboard]");if(!s||!l||!o||!f||!g)throw new Error("Missing native editor shell elements");l.appendChild(a);const i={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Ve,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},x=async u=>{const p=String(u||"").trim();if(!p||!t.avatarPackApiUrl){i.avatarPackDetails=null,i.avatarPackLoading=!1,i.avatarPackDirty=!1;return}i.avatarPackLoading=!0,A();try{i.avatarPackDetails=await hr(t.avatarPackApiUrl,p),i.avatarPackDirty=!1}catch(c){i.avatarPackDetails=null,i.avatarPackDirty=!1,j(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{i.avatarPackLoading=!1}},C=()=>{var R;const u=Ya(i.previewDisplayId),p=Math.max(320,((R=s.parentElement)==null?void 0:R.clientWidth)||s.clientWidth||u.width),c=Math.max(260,Math.min(window.innerHeight*.62,760)),h=Math.min(1,p/u.width,c/u.height),I=Math.round(u.width*h),U=Math.round(u.height*h);f.value=u.id,o.textContent=Za(u),s.style.aspectRatio=`${u.width} / ${u.height}`,s.style.width=`${I}px`,s.style.height=`${U}px`,l.style.width=`${u.width}px`,l.style.height=`${u.height}px`,l.style.transform=`scale(${h})`,a.style.width=`${u.width}px`,a.style.height=`${u.height}px`},$=u=>{i.previewDisplayId=String(u||"").trim()||Ve,C()},k=u=>{i.pendingAvatarZip=u,i.pendingAvatarZipName=(u==null?void 0:u.name)||"",i.avatarImportStatus="",i.avatarImportTone="muted",A(),u&&w(u)},w=async u=>{if(!(!i.config||!t.avatarImportUrl||i.avatarImporting)){i.pendingAvatarZip=null,i.avatarImporting=!0,i.avatarImportStatus=e.avatarImporting,i.avatarImportTone="muted",A();try{const p=await mr(t.avatarImportUrl,u);i.avatarCatalog=t.avatarCatalogUrl?await ft(t.avatarCatalogUrl):[p],Oe(i.config).packId=p.id,await x(p.id),i.pendingAvatarZip=null,i.pendingAvatarZipName="",i.avatarImporting=!1,i.avatarImportStatus=e.avatarImportSuccess(p.name||p.id),i.avatarImportTone="ok",N(),A()}catch(p){i.avatarImporting=!1,i.avatarImportStatus=`${e.avatarImportError}: ${String(p)}`,i.avatarImportTone="bad",A()}}},E=typeof ResizeObserver<"u"?new ResizeObserver(()=>C()):null;E==null||E.observe(s.parentElement||s);let T=null;const W=()=>{const u=i.selectedPageId||"",p=i.selectedCardIndex;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=a.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&p!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${p}"]`,h=a.querySelector(c);h&&(h.dataset.editorSelectedCard="true")}},K=typeof MutationObserver<"u"?new MutationObserver(()=>W()):null;K==null||K.observe(a,{childList:!0,subtree:!0});const A=()=>{const u=i.config,p=u?J(u):[],c=p.find(y=>y.id===i.selectedPageId)||p[0]||null,h=Array.isArray(c==null?void 0:c.cards)?c.cards:[],I=i.selectedCardIndex!==null&&h[i.selectedCardIndex]||null,U=dr(i.haEntities,i.entitySearch),R=i.focusedBinding?e.entityBindingActive(V(h[i.focusedBinding.cardIndex],"caption")||`${e.cards} #${i.focusedBinding.cardIndex+1}`,Me(e,i.focusedBinding.field)):e.entityBindingEmpty,P=u?Ae(u):"",Y=i.avatarImportStatus?`<div class="scene-editor-status" data-tone="${i.avatarImportTone}">${m(i.avatarImportStatus)}</div>`:"",S=i.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,O=c?`${c.title||c.id||e.pageSettings} · ${He(e,c.kind)}`:e.statusLoading;g.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${i.statusTone}">${m(i.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${m(t.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${i.saving||i.avatarPackSaving||!u?" disabled":""}>${i.saving||i.avatarPackSaving?e.saving:e.save}</button>
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
                ${gt(e,i.bundledAvatar,P)}
                ${i.avatarCatalog.map(y=>gt(e,y,P)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label>${e.avatarImportSelect}</label>
              </div>
              <div class="avatar-import-actions">
                <button
                  class="scene-editor-button avatar-import-button${i.avatarImporting||!t.avatarImportUrl?" is-disabled":""}"
                  type="button"
                  data-action="choose-avatar-archive"
                  ${i.avatarImporting||!t.avatarImportUrl?" disabled":""}
                >
                  ${i.avatarImporting?e.avatarImporting:e.avatarImportChooseButton}
                </button>
                <input
                  id="avatar-pack-archive"
                  class="avatar-import-input"
                  type="file"
                  accept=".zip,application/zip"
                  data-avatar-archive
                  tabindex="-1"
                  aria-hidden="true"
                  ${i.avatarImporting||!t.avatarImportUrl?" disabled":""}
                >
              </div>
              ${i.pendingAvatarZipName?`<div class="meta">${m(e.avatarImportSelected(i.pendingAvatarZipName))}</div>`:""}
              <div class="meta">${e.avatarImportHint}</div>
              ${Y}
            </div>
            ${P?i.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:i.avatarPackDetails?wr(e,i.avatarPackDetails):"":""}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(t.packId)}</div>
              <div class="meta">${e.pageOrderHint}</div>
            </div>
            <div class="page-list">
            ${p.map((y,D)=>`
              <article class="page-chip ${y.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${m(y.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${m(y.id)}">
                  <strong>${m(y.title||y.id||(ce()==="ru"?`Страница ${D+1}`:`Page ${D+1}`))}</strong>
                  <span class="meta">${m(He(e,y.kind))} · ${m(e.pageCards(Array.isArray(y.cards)?y.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${m(y.id)}"${D===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${m(y.id)}"${D===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${m(y.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pageSettings}</h2>
              <div class="meta">${m(O)}</div>
            </div>
          ${c?`
            <div class="inspector-grid">
              ${le(e.fieldPageId,"id",Q(c,"id"),!0)}
              ${vt(e.fieldKind,"kind",Q(c,"kind"),za.map(y=>({value:y,label:He(e,y)})))}
              ${le(e.fieldTitle,"title",Q(c,"title"),!0)}
              ${le(e.fieldSubtitle,"subtitle",Q(c,"subtitle"),!0)}
              ${le(e.fieldSlot,"slot",Q(c,"slot"))}
              ${vt(e.fieldCardStyle,"cardStyle",Q(c,"cardStyle")||"full",Va.map(y=>({value:y,label:y==="mini"?e.styleMini:e.styleFull})))}
              ${le(e.fieldStampCaption,"stampCaption",Q(c,"stampCaption"))}
              ${le(e.fieldStampValue,"stampValue",Q(c,"stampValue"))}
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
                  ${Lt.map(y=>$r(e,y)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${h.length?h.map((y,D)=>kr(e,y,D,h.length,D===i.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${I?xr(e,I,i.selectedCardIndex||0,i.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              ${ie(e.fieldDisplaySafeTop,"safeTop",re(u,"safeTop"))}
              ${ie(e.fieldDisplaySafeRight,"safeRight",re(u,"safeRight"))}
              ${ie(e.fieldDisplaySafeBottom,"safeBottom",re(u,"safeBottom"))}
              ${ie(e.fieldDisplaySafeLeft,"safeLeft",re(u,"safeLeft"))}
              ${ie(e.fieldDisplayPadding,"layoutPaddingPx",re(u,"layoutPaddingPx"))}
              ${ie(e.fieldDisplayGap,"layoutGapPx",re(u,"layoutGapPx"))}
              ${ie(e.fieldDisplayScale,"globalScale",re(u,"globalScale"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.homeAssistant}</h2>
              <div class="meta">${m(R)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${Sr(e,I,i.selectedCardIndex,i.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${m(i.entitySearch)}">
          </div>
          <div class="ha-list">
            ${U.length?U.map(y=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${m(y.name)}</strong>
                    <div class="meta">${m(y.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${m(y.entityId)}"${i.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${m(y.entityId)}</code>
                <div class="ha-state">${m(y.state)}${y.unit?` · ${m(y.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const B=g.querySelector("[data-avatar-archive]"),te=g.querySelector("[data-action='choose-avatar-archive']");te==null||te.addEventListener("click",()=>{if(!B||B.disabled)return;B.value="";const y=B;try{if(typeof y.showPicker=="function"){y.showPicker();return}}catch{}B.click()}),B==null||B.addEventListener("click",()=>{B.value=""}),B==null||B.addEventListener("change",()=>{var D;const y=((D=B.files)==null?void 0:D[0])||null;k(y),B.value=""});for(const y of Array.from(g.querySelectorAll(".page-chip[data-page-id]")))y.draggable=!0,y.addEventListener("dragstart",D=>{const q=String(y.dataset.pageId||"").trim();T=q?{kind:"page",pageId:q}:null,!(!T||!D.dataTransfer)&&(D.dataTransfer.effectAllowed="move",D.dataTransfer.setData("text/plain",JSON.stringify(T)))}),y.addEventListener("dragover",D=>{!T||T.kind!=="page"||(D.preventDefault(),oe(n),y.classList.add("is-drop-target"),D.dataTransfer&&(D.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",D=>{if(!T||T.kind!=="page")return;D.preventDefault();const q=String(y.dataset.pageId||"").trim();q&&xe(T.pageId,q),T=null,oe(n)}),y.addEventListener("dragend",()=>{T=null,oe(n)});for(const y of Array.from(g.querySelectorAll(".card-list-item[data-card-index]")))y.draggable=!0,y.addEventListener("dragstart",D=>{const q=Number(y.dataset.cardIndex||"-1");T=Number.isFinite(q)&&q>=0?{kind:"card",cardIndex:q}:null,!(!T||!D.dataTransfer)&&(D.dataTransfer.effectAllowed="move",D.dataTransfer.setData("text/plain",JSON.stringify(T)))}),y.addEventListener("dragover",D=>{!T||T.kind!=="card"||(D.preventDefault(),oe(n),y.classList.add("is-drop-target"),D.dataTransfer&&(D.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",D=>{if(!T||T.kind!=="card")return;D.preventDefault();const q=Number(y.dataset.cardIndex||"-1");Number.isFinite(q)&&q>=0&&ke(T.cardIndex,q),T=null,oe(n)}),y.addEventListener("dragend",()=>{T=null,oe(n)});C(),W()},j=(u,p)=>{i.status=u,i.statusTone=p,A()},F=()=>{if(!i.config)return;const u=J(i.config);if(!u.length){i.selectedPageId=null;return}(!i.selectedPageId||!u.some(h=>h.id===i.selectedPageId))&&(i.selectedPageId=u[0].id);const p=u.find(h=>h.id===i.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(i.selectedCardIndex===null||i.selectedCardIndex>=c.length)&&(i.selectedCardIndex=0):(i.selectedCardIndex=null,i.focusedBinding=null),rr(i.selectedPageId),ar(Xa(i.config,i.selectedPageId))},N=()=>{i.dirty=!0,j(e.statusDirty,"muted")},X=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),i.selectedPageId&&u.searchParams.set("editorPage",i.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},be=(u,p)=>{if(!i.config||!i.selectedPageId)return;const c=i.config.pages.find(h=>h.id===i.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const h=Rt(i.config,p||"page"),I=c.id;c.id=h,i.config.rotation.order=i.config.rotation.order.map(U=>U===I?h:U),i.selectedPageId=h}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);N(),F()}},we=(u,p)=>{if(!i.config)return;const c=tr(i.config),h=c.safeArea||{},I=p===""?null:Number(p),U=Number.isFinite(I)?I:null;u==="safeTop"?h.top=U??0:u==="safeRight"?h.right=U??0:u==="safeBottom"?h.bottom=U??0:u==="safeLeft"?h.left=U??0:u==="layoutPaddingPx"?c.layoutPaddingPx=U??16:u==="layoutGapPx"?c.layoutGapPx=U??16:u==="globalScale"&&(c.globalScale=U??1),c.safeArea=h,N()},Se=(u,p,c)=>{var U;if(!i.config||!i.selectedPageId)return;const h=i.config.pages.find(R=>R.id===i.selectedPageId);if(!h)return;Array.isArray(h.cards)||(h.cards=[]);const I=h.cards[u];if(I){if(p==="type"){const R=ut(c);if(h.cards[u]={...R,caption:V(I,"caption")||R.caption},((U=i.focusedBinding)==null?void 0:U.cardIndex)===u){const P=ht(c);i.focusedBinding=P?{cardIndex:u,field:P}:null}}else p==="digits"?I[p]=c===""?0:Number(c):I[p]=c;N()}},xe=(u,p)=>{if(!i.config||!u||!p||u===p)return;const c=J(i.config).map(U=>U.id),h=c.indexOf(u),I=c.indexOf(p);h<0||I<0||(c.splice(h,1),c.splice(I,0,u),i.config.rotation.order=c,i.selectedPageId=u,i.selectedCardIndex=0,i.focusedBinding=null,N(),F(),A())},ke=(u,p)=>{if(!i.config||!i.selectedPageId||u===p)return;const c=i.config.pages.find(I=>I.id===i.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||p<0||u>=c.cards.length||p>=c.cards.length)return;const[h]=c.cards.splice(u,1);c.cards.splice(p,0,h),i.selectedCardIndex=p,i.focusedBinding=null,N(),A()},$e=u=>{if(!i.config||!i.selectedPageId||!i.focusedBinding)return;const p=i.config.pages.find(I=>I.id===i.selectedPageId),c=i.haEntities.find(I=>I.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const h=p.cards[i.focusedBinding.cardIndex];h&&(Cr(h,i.focusedBinding.field,c),N(),A())},Ce=(u,p)=>{i.selectedCardIndex=u,i.focusedBinding={cardIndex:u,field:p},A(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async u=>{var Y,se;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),h=c==null?void 0:c.dataset.action;if(!h||!i.config)return;const I=J(i.config),U=(c==null?void 0:c.dataset.pageId)||null,R=U?I.findIndex(S=>S.id===U):-1;if(h==="select-page"&&U){i.selectedPageId=U,i.selectedCardIndex=0,i.focusedBinding=null,F(),A();return}if(h==="page-up"&&R>0){const S=I.map(O=>O.id);[S[R-1],S[R]]=[S[R],S[R-1]],i.config.rotation.order=S,i.selectedPageId=U,N(),F(),A();return}if(h==="page-down"&&R>=0&&R<I.length-1){const S=I.map(O=>O.id);[S[R],S[R+1]]=[S[R+1],S[R]],i.config.rotation.order=S,i.selectedPageId=U,N(),F(),A();return}if(h==="page-remove"&&U&&I.length>1){i.config.pages=i.config.pages.filter(S=>S.id!==U),i.config.rotation.order=J(i.config).map(S=>S.id),i.selectedPageId=((Y=J(i.config)[Math.max(0,R-1)])==null?void 0:Y.id)||((se=J(i.config)[0])==null?void 0:se.id)||null,i.selectedCardIndex=0,i.focusedBinding=null,N(),F(),A();return}if(h==="add-page"){const S=er(i.config);i.config.pages.push(S),i.config.rotation.order=J(i.config).map(O=>O.id),i.selectedPageId=S.id,i.selectedCardIndex=null,i.focusedBinding=null,N(),F(),A();return}if(h==="add-card-template"&&i.selectedPageId){const S=i.config.pages.find(B=>B.id===i.selectedPageId),O=(c==null?void 0:c.dataset.cardType)||"entity";if(S){Array.isArray(S.cards)||(S.cards=[]),S.cards.push(ut(O));const B=S.cards.length-1;i.selectedCardIndex=B;const te=ht(O);i.focusedBinding=te?{cardIndex:B,field:te}:null,N(),A(),te&&window.requestAnimationFrame(()=>{const y=n.querySelector("#ha-entity-search");y==null||y.scrollIntoView({behavior:"smooth",block:"center"}),y==null||y.focus()})}return}if(h==="focus-binding"){const S=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),O=(c==null?void 0:c.dataset.bindingField)||"";S>=0&&O&&Ce(S,O);return}const P=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(P>=0&&i.selectedPageId){const S=i.config.pages.find(O=>O.id===i.selectedPageId);if(!S||!Array.isArray(S.cards))return;if(h==="select-card"){i.selectedCardIndex=P,A();return}if(h==="card-remove"){S.cards=S.cards.filter((O,B)=>B!==P),i.selectedCardIndex!==null&&(i.selectedCardIndex===P?i.selectedCardIndex=S.cards.length?Math.min(P,S.cards.length-1):null:i.selectedCardIndex>P&&(i.selectedCardIndex-=1)),i.focusedBinding&&(i.focusedBinding.cardIndex===P?i.focusedBinding=null:i.focusedBinding.cardIndex>P&&(i.focusedBinding={cardIndex:i.focusedBinding.cardIndex-1,field:i.focusedBinding.field})),N(),A();return}if(h==="card-up"&&P>0){[S.cards[P-1],S.cards[P]]=[S.cards[P],S.cards[P-1]],i.selectedCardIndex===P?i.selectedCardIndex=P-1:i.selectedCardIndex===P-1&&(i.selectedCardIndex=P),i.focusedBinding&&(i.focusedBinding.cardIndex===P?i.focusedBinding={cardIndex:P-1,field:i.focusedBinding.field}:i.focusedBinding.cardIndex===P-1&&(i.focusedBinding={cardIndex:P,field:i.focusedBinding.field})),N(),A();return}if(h==="card-down"&&P<S.cards.length-1){[S.cards[P],S.cards[P+1]]=[S.cards[P+1],S.cards[P]],i.selectedCardIndex===P?i.selectedCardIndex=P+1:i.selectedCardIndex===P+1&&(i.selectedCardIndex=P),i.focusedBinding&&(i.focusedBinding.cardIndex===P?i.focusedBinding={cardIndex:P+1,field:i.focusedBinding.field}:i.focusedBinding.cardIndex===P+1&&(i.focusedBinding={cardIndex:P,field:i.focusedBinding.field})),N(),A();return}}if(h==="save"){i.saving=!0,i.avatarPackSaving=i.avatarPackDirty,j(e.saving,"muted");try{if(i.avatarPackDirty&&i.avatarPackDetails&&t.avatarPackApiUrl){try{i.avatarPackDetails=await vr(t.avatarPackApiUrl,i.avatarPackDetails)}catch(S){throw new Error(`${e.avatarMappingSaveError}: ${String(S)}`)}i.avatarPackDirty=!1}i.config=await sr(t.sceneApiUrl,Xe(i.config)),i.dirty=!1,i.saving=!1,i.avatarPackSaving=!1,F(),j(e.statusSaved,"ok"),window.setTimeout(()=>X(),250)}catch(S){i.saving=!1,i.avatarPackSaving=!1,j(`${e.saveError}: ${String(S)}`,"bad")}return}if(h==="bind-entity"){const S=(c==null?void 0:c.dataset.entityId)||"";$e(S)}}),n.addEventListener("input",u=>{const p=u.target;if(!p||!i.config){p&&p.dataset.previewDisplay!==void 0&&$(p.value);return}if(p.dataset.previewDisplay!==void 0){$(p.value);return}if(p.dataset.avatarSemantic!==void 0){const c=Ae(i.config);if(!i.avatarPackDetails||!c||i.avatarPackDetails.packId!==c)return;const h=p.value.trim();h?i.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic]=Number(h):delete i.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic],i.avatarPackDirty=!0,j(e.statusDirty,"muted"),A();return}if(p.dataset.pageField){be(p.dataset.pageField,p.value),A();return}if(p.dataset.displayField){we(p.dataset.displayField,p.value),A();return}if(p.dataset.cardField&&p.dataset.cardIndex){i.selectedCardIndex=Number(p.dataset.cardIndex),Se(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),A();return}p.hasAttribute("data-ha-search")&&(i.entitySearch=p.value,A())}),n.addEventListener("click",u=>{var I,U;const p=(I=u.target)==null?void 0:I.closest("[data-action='delete-avatar-pack']");if(p&&t.avatarPackApiUrl){const R=String(p.dataset.packId||"").trim(),P=String(p.dataset.packName||R).trim();if(!R||!window.confirm(e.avatarPackDeleteConfirm(P)))return;const Y=`${t.avatarPackApiUrl}?packId=${encodeURIComponent(R)}`;fetch(Y,{method:"DELETE"}).then(async se=>{if(!se.ok){const S=await se.json().catch(()=>({}));console.warn("Failed to delete avatar pack",R,S);return}i.config&&Ae(i.config)===R&&(Oe(i.config).packId=null,i.avatarPackDetails=null,N()),i.avatarCatalog=i.avatarCatalog.filter(S=>S.id!==R),A()});return}const c=(U=u.target)==null?void 0:U.closest("[data-action='select-avatar-pack']");if(!c||!i.config)return;const h=String(c.dataset.packId||"").trim();Oe(i.config).packId=h||null,N(),x(h||null).finally(()=>A()),A()}),a.addEventListener("click",u=>{if(!i.config)return;const p=u.target,c=p==null?void 0:p.closest("[data-scene-card-index][data-scene-page-id]");if(c){const I=String(c.dataset.scenePageId||"").trim(),U=Number(c.dataset.sceneCardIndex||"-1");I&&Number.isFinite(U)&&U>=0&&(i.selectedPageId=I,i.selectedCardIndex=U,i.focusedBinding=null,F(),A(),mt("cards"));return}const h=p==null?void 0:p.closest("[data-scene-page-id]");if(h){const I=String(h.dataset.scenePageId||"").trim();I&&(i.selectedPageId=I,i.selectedCardIndex=0,i.focusedBinding=null,F(),A(),mt("pages"));return}}),n.addEventListener("change",u=>{var c;const p=u.target;!p||p.dataset.avatarArchive===void 0||k(((c=p.files)==null?void 0:c[0])||null)}),n.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(i.selectedCardIndex=c,i.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(i.config=await nr(t.sceneApiUrl),t.sceneAvatarManifestUrl)try{i.bundledAvatar=await gr(t.sceneAvatarManifestUrl,t.packId)}catch{i.bundledAvatar=null}if(t.avatarCatalogUrl)try{i.avatarCatalog=await ft(t.avatarCatalogUrl)}catch{i.avatarCatalog=[]}i.haEntities=lr(((ge=Pt())==null?void 0:ge.states)||null),i.selectedPageId=ir(i.config),i.selectedCardIndex=0,i.status=e.statusSaved,i.statusTone="ok",await x(Ae(i.config)),F()}catch(u){i.status=`${e.loadError}: ${String(u)}`,i.statusTone="bad"}A()}const Ir="../scene-api/bootstrap",Er="weather.forecast_home_assistant",Ar="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ue="/local/live2d/",yt="/scene-legacy/live2d/",Ur={...Et,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Tr={...At,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},Lr={...Ut,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Rr={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Dr={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:t=>`Pack: ${t||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:t=>`Pack: ${t||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Mr(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Nr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Br(t){if(!Nr(t))return null;const e=String(t.type||"").trim();return e!=="kiosk-display-off"&&e!=="kiosk-display-on"?null:{type:e,displayOn:t.displayOn===void 0?e==="kiosk-display-on":t.displayOn===!0,source:String(t.source||"").trim()||void 0,timestamp:Number.isFinite(Number(t.timestamp))?Number(t.timestamp):void 0}}function Fr(){return new URLSearchParams(window.location.search).get("bootstrap")||Ir}function _r(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);if(a)return new URL(a[0],e.origin).toString();for(const r of["/scene-api/","/scene-runtime/","/scene-editor/"]){const n=e.pathname.indexOf(r);if(n>=0)return new URL(e.pathname.slice(0,n+1),e.origin).toString()}return null}function M(t,e){const a=Or(String(t||"").trim(),e);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(e,window.location.href);if(a.startsWith("/")){const n=_r(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,r).toString()}function Or(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ue))return`${yt}${a.slice(Ue.length)}`;if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const r=new URL(a,new URL(e,window.location.href));if(r.pathname.startsWith(Ue)){const n=r.pathname.slice(Ue.length);return M(`${yt}${n}${r.search}${r.hash}`,e)||a}}catch{return a}return a}function Hr(t,e){const a=Ke(t),r=a.adapter==="live2d"?M("../../scene-runtime/avatar.html",e):"",n=M(String(a.assetRoot||"").trim(),e),s=f=>{const g=String(f||"").trim();return g?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(g)||g.startsWith("/")?M(g,e):g:""},l=f=>{const g=String(f||"").trim();return g?M(g,e):""},o=Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([f,g])=>[f,M(String(g||""),e)]).filter(([,f])=>!!f));return{...a,assetRoot:n,runtimeUrl:r||M(String(a.runtimeUrl||"").trim(),e),entry:s(String(a.entry||"").trim()),modelUrl:s(String(a.modelUrl||"").trim()),fallbackPortrait:s(String(a.fallbackPortrait||"").trim()),motionMapUrl:l(String(a.motionMapUrl||"").trim()),presetThumbs:o}}function qe(t,e,a,r){t.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${a}</p>
        ${r?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${r}</pre>`:""}
      </div>
    </section>
  `}let Ge=null,Te=null;function jr(t){const e=Array.from(document.querySelectorAll("iframe.ks-live2d-iframe"));let a=!1;for(const r of e)r.contentWindow&&(r.contentWindow.postMessage(t,"*"),a=!0);return a}function Ne(t=24){Te!==null&&(window.clearTimeout(Te),Te=null),Ge&&(jr(Ge)||t<=0||(Te=window.setTimeout(()=>{Ne(t-1)},120)))}window.addEventListener("message",t=>{const e=Br(t.data);e&&(Ge=e,Ne())});function Nt(){return new URLSearchParams(window.location.search).get("editor")==="1"}function zr(){if(!Nt())return;const t=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),t(),window.addEventListener("pageshow",t,{once:!0}),window.addEventListener("load",t,{once:!0}),window.requestAnimationFrame(()=>{t(),window.setTimeout(t,120)});let e=!1;const a=()=>{e=!0},r=["pointerdown","wheel","touchstart","keydown"];for(const l of r)window.addEventListener(l,a,{once:!0,passive:!0});let n=0;const s=window.setInterval(()=>{if(e||n>=24){window.clearInterval(s);return}t(),n+=1},80)}async function Vr(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return a}async function he(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return e.json()}function Wr(t,e){var a,r,n,s,l,o,f,g,i,x,C,$;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([k,w])=>[k,M(w,e)]).filter(([,k])=>!!k)),avatar:{manifestUrl:M(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:M(String(((r=t.scene)==null?void 0:r.configUrl)||"").trim(),e)},state:{provider:((n=t.state)==null?void 0:n.provider)||"json",stateUrl:M(String(((s=t.state)==null?void 0:s.stateUrl)||"").trim(),e),apiUrl:M(String(((l=t.state)==null?void 0:l.apiUrl)||"").trim(),e)||void 0,haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:M(String(((f=t.state)==null?void 0:f.idleLinesUrl)||"").trim(),e),entityMapUrl:M(String(((g=t.state)==null?void 0:g.entityMapUrl)||"").trim(),e)},control:{provider:((i=t.control)==null?void 0:i.provider)||"json",controlUrl:M(String(((x=t.control)==null?void 0:x.controlUrl)||"").trim(),e),apiUrl:M(String(((C=t.control)==null?void 0:C.apiUrl)||"").trim(),e)||void 0,entityMapUrl:M(String((($=t.control)==null?void 0:$.entityMapUrl)||"").trim(),e)||void 0}}}async function qr(t,e){var k,w,E,T,W,K,A,j;const a=M(String(((k=t.files)==null?void 0:k.rendererConfigUrl)||"").trim(),e);if(!a)return"";const r=M(String(((w=t.files)==null?void 0:w.sceneConfigUrl)||"").trim(),e),n=M(String(((E=t.files)==null?void 0:E.avatarCatalogUrl)||"").trim(),e);let s="";if(r&&n)try{const F=await he(r);s=String(((T=F.avatar)==null?void 0:T.packId)||"").trim()}catch{s=""}let l="";if(s&&n)try{const F=await he(n),N=Array.isArray(F.items)?F.items.find(X=>String(X.id||"").trim()===s):null;l=M(String((N==null?void 0:N.manifestUrl)||"").trim(),e)}catch{l=""}const o=Wr(await he(a),a);r&&(o.scene={...o.scene||{},configUrl:r});const f=M(String(((W=t.files)==null?void 0:W.haStatesUrl)||"").trim(),e);f&&(o.state={...o.state||{},apiUrl:((K=o.state)==null?void 0:K.apiUrl)||f},o.control={...o.control||{},apiUrl:((A=o.control)==null?void 0:A.apiUrl)||f});const g=l||String(((j=o.avatar)==null?void 0:j.manifestUrl)||"").trim();if(!g)return URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));const i=M(g,e),x=Hr(await he(i),i),C=URL.createObjectURL(new Blob([JSON.stringify(x)],{type:"application/json"})),$={...o,avatar:{manifestUrl:C}};return URL.createObjectURL(new Blob([JSON.stringify($)],{type:"application/json"}))}const ve=document.getElementById("app");if(!ve)throw new Error("Missing #app root element");const de=Dr[Mr()];zr();qe(ve,de.startingTitle,de.startingBody);(async()=>{var e,a,r,n,s;const t=Fr();try{const l=await Vr(t),o=String(l.packId||"").trim(),f=o.toLowerCase()==="neiri",g=await qr(l,t),i=g?await he(g):null;if(!g){qe(ve,de.missingRendererTitle,de.missingRendererBody,JSON.stringify(l,null,2));return}document.documentElement.dataset.packId=o,document.title=f?"Нейри":o?`kiosk-scene hosted runtime (${o})`:"kiosk-scene hosted runtime",await ja(ve,{rendererConfigUrl:g,weatherUrl:f?"./weather.json":void 0,weatherReader:f?Oa({weatherEntity:Er,openMeteoUrl:Ar,locale:"ru-RU",iconBaseUrl:"./assets",apiUrl:String(((e=i==null?void 0:i.state)==null?void 0:e.apiUrl)||"").trim()||void 0,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:f?Ur:void 0,labels:f?Tr:void 0,presetLabels:f?Lr:void 0,defaultWeather:f?Rr:void 0}),Ne(),Nt()&&(await Pr({packId:o,sceneApiUrl:M(String(l.sceneEditorApiUrl||"").trim(),t),sceneAvatarManifestUrl:M(String(((a=l.files)==null?void 0:a.avatarManifestUrl)||"").trim(),t),avatarCatalogUrl:M(String(((r=l.files)==null?void 0:r.avatarCatalogUrl)||"").trim(),t),avatarImportUrl:M(String(((n=l.files)==null?void 0:n.avatarImportUrl)||"").trim(),t),avatarPackApiUrl:M(String(((s=l.files)==null?void 0:s.avatarPackApiUrl)||"").trim(),t),sceneUrl:M(String(l.entryUrl||l.runtimeBaseUrl||"./").trim(),t)}),Ne())}catch(l){qe(ve,de.failedTitle,de.failedBody,String(l))}})();
