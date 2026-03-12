var _t=Object.defineProperty;var Ot=(t,e,a)=>e in t?_t(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var v=(t,e,a)=>Ot(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function L(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function l(t,e=160){const a=String(t??"").replace(/\s+/g," ").trim();return a?a.length<=e?a:`${a.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function at(t){const e=new Date(String(t??""));return Number.isNaN(e.getTime())?0:e.getTime()}function be(t,e){if(!L(t)||!L(e))return e??t;const a={...t};for(const[r,n]of Object.entries(e)){if(Array.isArray(n)){a[r]=n.slice();continue}if(L(n)&&L(a[r])){a[r]=be(a[r],n);continue}a[r]=n}return a}function bt(t,e=40){return Array.isArray(t)?t.map(a=>l(a,e).toLowerCase()).filter(Boolean):[]}const re={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},rt={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function je(t){var a,r,n,s,d,o,c,m,i,f,w,y,k,x;const e=be(re,L(t)?t:{});return{version:1,assistant:{name:l((a=e.assistant)==null?void 0:a.name,40)||re.assistant.name,locale:l((r=e.assistant)==null?void 0:r.locale,16)||void 0},links:L(e.links)?Object.fromEntries(Object.entries(e.links).map(([P,U])=>[l(P,64),l(U,1024)]).filter(([P,U])=>P&&U)):{},avatar:{manifestUrl:l((n=e.avatar)==null?void 0:n.manifestUrl,1024)||re.avatar.manifestUrl},scene:{configUrl:l((s=e.scene)==null?void 0:s.configUrl,1024)||re.scene.configUrl},state:{provider:((d=e.state)==null?void 0:d.provider)==="ha"?"ha":"json",stateUrl:l((o=e.state)==null?void 0:o.stateUrl,1024)||re.state.stateUrl,apiUrl:l((c=e.state)==null?void 0:c.apiUrl,1024)||void 0,haApiFallback:((m=e.state)==null?void 0:m.haApiFallback)===!0,idleLinesUrl:l((i=e.state)==null?void 0:i.idleLinesUrl,1024)||re.state.idleLinesUrl,entityMapUrl:l((f=e.state)==null?void 0:f.entityMapUrl,1024)||void 0},control:{provider:((w=e.control)==null?void 0:w.provider)==="ha"?"ha":"json",controlUrl:l((y=e.control)==null?void 0:y.controlUrl,1024)||re.control.controlUrl,apiUrl:l((k=e.control)==null?void 0:k.apiUrl,1024)||void 0,entityMapUrl:l((x=e.control)==null?void 0:x.entityMapUrl,1024)||void 0}}}function Ge(t){var a,r,n,s,d;const e=be(rt,L(t)?t:{});return{version:1,name:l(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:l(e.assetRoot,1024)||rt.assetRoot,runtimeUrl:l(e.runtimeUrl,1024)||"",entry:l(e.entry,1024)||"",modelUrl:l(e.modelUrl,1024)||"",fallbackPortrait:l(e.fallbackPortrait,1024)||"",motionMapUrl:l(e.motionMapUrl,1024)||"",expressionMapUrl:l(e.expressionMapUrl,1024)||"",presetThumbs:L(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,c])=>[l(o,32),l(c,1024)]).filter(([o,c])=>o&&c)):{},viewPresets:L(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,c])=>l(o,32)&&L(c))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((r=e.capabilities)==null?void 0:r.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((d=e.capabilities)==null?void 0:d.supportsPointerFocus)===!0}}}const X={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},Ht=["full","torso","head"];function pe(t,e=Date.now()){var o,c,m,i,f,w,y;const a=be(X,L(t)?t:{}),r={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((o=a.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:l((c=a.page)==null?void 0:c.target,40)||null,until:l((m=a.page)==null?void 0:m.until,64)||null},cue:{cue:l((i=a.cue)==null?void 0:i.cue,32)||null,emotion:l((f=a.cue)==null?void 0:f.emotion,32)||null,motion:l((w=a.cue)==null?void 0:w.motion,32)||null,until:l((y=a.cue)==null?void 0:y.until,64)||null}},n=l(a.viewPreset,16).toLowerCase();r.viewPreset=Ht.includes(n)?n:null;const s=at(r.page.until);r.page.mode==="pinned"&&(r.page.target?r.page.until&&(!s||s<=e)&&(r.page={mode:"auto",target:null,until:null}):r.page={mode:"auto",target:null,until:null});const d=at(r.cue.until);return r.cue.until&&(!d||d<=e)&&(r.cue={cue:null,emotion:null,motion:null,until:null}),r}function Ne(t,e,a=Date.now()){return pe(be(pe(t,a),L(e)?e:{}),a)}function zt(t,e,a=Date.now()){return pe({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function jt(t,e,a=3e4,r=Date.now()){const n=l(e,40),s=new Date(r+Math.max(5e3,Number(a)||0)).toISOString();return pe({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},r)}function wt(t,e){var d,o,c;const a={...t||{}},r=l((d=e==null?void 0:e.cue)==null?void 0:d.cue,32),n=l((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),s=l((c=e==null?void 0:e.cue)==null?void 0:c.motion,32);return r&&(a.cue=r),n&&(a.emotion=n),s&&(a.motion=s),a}function Be(t){const e=l(t,64).toLowerCase();return e==="page"||/^page\s+\d+$/.test(e)}function St(t){if(!L(t))return!1;const e=["entity","stateEntity","downEntity","upEntity"];for(const a of e)if(typeof t[a]=="string"&&l(t[a],255))return!0;for(const[a,r]of Object.entries(t))if(!(a==="type"||a==="caption"||a==="hint"||a==="onText"||a==="offText")&&(typeof r=="string"&&l(r,255)||typeof r=="number"&&Number.isFinite(r)||typeof r=="boolean"))return!0;return!1}function Vt(t,e){if(t.kind==="overview"||t.kind==="forecast+cards"||(Array.isArray(t.cards)?t.cards.filter(o=>St(o)):[]).length>0)return!0;const r=l(t.title,64),n=l(t.subtitle||"",140),s=l(t.stampCaption||"",32),d=l(t.stampValue||"",32);return n||d?!0:!r||Be(r)||Be(t.id)||e>=1&&r===`Page ${e+1}`?!1:!Be(s)}function _(t,e){const a=Number(t);return Number.isFinite(a)?Math.max(0,a):e}function Ve(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function Je(t){return L(t)&&L(t.config)?t.config:t}function xt(t,e){const a=e.map(n=>t.find(s=>s.id===n)).filter(Boolean),r=t.filter(n=>!a.some(s=>s.id===n.id));return a.concat(r)}function Wt(t,e){const a={...t};return L(e)&&(typeof e.id=="string"&&(a.id=l(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(r=>L(r)))),a}function Kt(t,e){const a=Je(t),r=Array.isArray(e.pages)?e.pages.slice():[],n=L(a)&&Array.isArray(a.pages)?a.pages:[],s=r.map(y=>{const k=n.find(P=>l(L(P)?P.id:"",40)===y.id),x=Wt(y,k);return Array.isArray(x.cards)&&(x.cards=x.cards.filter(P=>St(P))),x}).filter((y,k)=>Vt(y,k)),d=L(a)&&L(a.rotation)?a.rotation:{},o=L(e.display)?e.display:{},c=L(a)&&L(a.display)?a.display:{},m=L(o.safeArea)?o.safeArea:{},i=L(c.safeArea)?c.safeArea:{},f=Array.isArray(d.order)?d.order:e.rotation.order,w=bt(f).filter((y,k,x)=>s.some(P=>P.id===y)&&x.indexOf(y)===k);return{version:1,rotation:{order:w.length?w:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(d.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:_(i.top,_(m.top,0)),right:_(i.right,_(m.right,0)),bottom:_(i.bottom,_(m.bottom,0)),left:_(i.left,_(m.left,0))},layoutPaddingPx:_(c.layoutPaddingPx,_(o.layoutPaddingPx,16)),layoutGapPx:_(c.layoutGapPx,_(o.layoutGapPx,16)),globalScale:Ve(c.globalScale,Ve(o.globalScale,1))},pages:s}}function qt(t,e){var s;const a=Kt(t,e),r=Je(t),n=L(r)&&L(r.avatar)?{packId:typeof r.avatar.packId=="string"&&l(r.avatar.packId,120)||null}:{packId:typeof((s=e.avatar)==null?void 0:s.packId)=="string"&&l(e.avatar.packId,120)||null};return{version:1,kind:"scene.display",rotation:{order:a.rotation.order.slice(),defaultDwellMs:a.rotation.defaultDwellMs},display:{safeAreaPx:{...a.display.safeAreaPx},layoutPaddingPx:a.display.layoutPaddingPx,layoutGapPx:a.display.layoutGapPx,globalScale:a.display.globalScale},avatar:n,pages:xt(a.pages,a.rotation.order)}}function Gt(t){return L(t)&&t.kind==="scene.display"&&Number(t.version)===1&&L(t.rotation)&&Array.isArray(t.pages)&&L(t.display)&&L(t.display.safeAreaPx)}function Jt(t){var d,o;const e=Array.isArray(t.pages)?t.pages.filter(c=>L(c)):[],a=Array.isArray((d=t.rotation)==null?void 0:d.order)?t.rotation.order:e.map(c=>c.id),r=bt(a).filter((c,m,i)=>e.some(f=>f.id===c)&&i.indexOf(c)===m),n=t.display.safeAreaPx,s=L(t.avatar)?{packId:typeof t.avatar.packId=="string"&&l(t.avatar.packId,120)||null}:{packId:null};return{version:1,kind:"scene.display",rotation:{order:r.length?r:e.map(c=>c.id),defaultDwellMs:Math.max(5e3,Number((o=t.rotation)==null?void 0:o.defaultDwellMs)||18e3)},display:{safeAreaPx:{top:_(n.top,0),right:_(n.right,0),bottom:_(n.bottom,0),left:_(n.left,0)},layoutPaddingPx:_(t.display.layoutPaddingPx,16),layoutGapPx:_(t.display.layoutGapPx,16),globalScale:Ve(t.display.globalScale,1)},avatar:s,pages:xt(e,r)}}function Yt(t,e){if(Gt(t))return Jt(t);const a=Je(t);if(!L(a))throw new Error("Scene runtime config must be a JSON object.");return qt(a,a)}function Zt(t,e=220){const a=l(t,Math.max(e+20,e)),r={emotion:"",activity:"",cue:"",motion:""},n=a.replace(/\[(emotion|activity|cue|motion|page|preset|view|size)\s*:\s*([a-z0-9_-]+)\]/gi,(s,d,o)=>{const c=l(d,16).toLowerCase(),m=l(o,32).toLowerCase();return(c==="emotion"||c==="activity"||c==="cue"||c==="motion")&&m&&(r[c]=m)," "});return{text:l(n,e),emotion:r.emotion,activity:r.activity,cue:r.cue,motion:r.motion}}const kt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function fe(t,e={}){const a=L(t)?t:{},r={...kt,...e};return{version:1,assistant:l(a.assistant??r.assistant,40),online:typeof a.online=="boolean"?a.online:r.online,busy:typeof a.busy=="boolean"?a.busy:r.busy,status:l(a.status??r.status,255),message:l(a.message??r.message,255),source:l(a.source??r.source,64),updatedAt:l(a.updatedAt??r.updatedAt,64),emotion:l(a.emotion??r.emotion,32)||null,activity:l(a.activity??r.activity,32)||null,cue:l(a.cue??r.cue,32)||null,intensity:Xt(a.intensity??r.intensity),speaking:typeof a.speaking=="boolean"?a.speaking:!!r.speaking,motion:l(a.motion??r.motion,32)||null,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):r.revision,event:l(a.event??r.event,64)}}function Xt(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Qt(t,e){return t.order[e]||t.order[0]||""}function ea(t,e){const a=t.order.findIndex(r=>r===e);return a>=0?a:0}function ta(t,e,a,r){const n=Array.isArray(t.order)?t.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let d=1;d<=n.length;d+=1){const o=(s+d*a+n.length)%n.length;if(r(n[o]))return o}return s}function aa(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],r=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=t.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:ea(t.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(t.force){const d=Qt(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(d)?t.activeIndex:Math.max(0,a.findIndex(c=>t.isEligible(c))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<r)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let s=t.activeIndex;for(let d=1;d<=a.length;d+=1){const o=(t.activeIndex+d)%a.length;if(t.isEligible(a[o])){s=o;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const Ct={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},ra=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function it(t){const e=l(t,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:ra.some(a=>e.includes(a)):!1}function ia(t,e){const a=fe(t),r=l(a.status,72),n=l(a.message,220);if(!(a.online!==!1&&(it(r)||it(n))))return{state:a,hasTechnicalFailure:!1};const o=l(a.emotion,32).toLowerCase(),c=l(a.motion,32).toLowerCase();return{state:{...a,busy:!1,status:l(e==null?void 0:e.healthyStatus,72),message:"",emotion:o==="error"?"calm":o||null,activity:l(a.activity,32).toLowerCase()==="error"?"idle":l(a.activity,32)||null,cue:l(a.cue,32)||null,intensity:a.intensity??null,speaking:!1,motion:c==="error"?"idle_soft":c||null},hasTechnicalFailure:!0}}function na(t,e){const a=(e==null?void 0:e.copy)??Ct,r=fe(t),n=Zt(r.message,220),s=ia({...r,message:n.text,emotion:l(r.emotion,32)||n.emotion||null,activity:l(r.activity,32)||n.activity||null,cue:l(r.cue,32)||n.cue||null,motion:l(r.motion,32)||n.motion||null},{healthyStatus:a.technicalHealthyLabel}),d=s.state,o=l(d.message,180),c=l(d.activity,32).toLowerCase(),m=d.online!==!1&&c!=="offline",i=!!d.busy||c==="thinking"||c==="busy"||c==="acting",f=d.speaking===!0||c==="speaking",w=m?i?a.busyLabel:o||f?a.speakingLabel:s.hasTechnicalFailure?a.technicalHealthyLabel:a.idleLabel:a.offlineLabel,y=o?a.messageCaption:s.hasTechnicalFailure?a.statusCaption:a.modeCaption,k=o||(m?i?a.busyBody:l(e==null?void 0:e.idleMonologue,220)||a.idleBody:a.offlineBody);return{state:d,hasTechnicalFailure:s.hasTechnicalFailure,caption:y,label:w,body:k,bodyKey:[y,w,k].join(":")}}function sa(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function nt(t,e=-1){const a=Array.isArray(t)?t.map(n=>l(n,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let r=Math.floor(Math.random()*a.length);return a.length>1&&r===e&&(r=(r+1)%a.length),{line:a[r],index:r}}function oa(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),r=!!l(t==null?void 0:t.message,180);return e&&!a&&!r}const la={cue:null,emotion:null,motion:null,until:null},da={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0},ca=15e3;function ua(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function $t(t){return t.endsWith("/")?t:`${t}/`}function Pt(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function Ee(t,e){const a=l(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;if(a.startsWith("/")){const n=Pt(t||window.location.href);if(n)return new URL(a.slice(1),n).toString();const s=new URL(window.location.href).origin;return new URL(a,s).toString()}const r=new URL($t(l(t,1024)||"."),window.location.href);return new URL(a,r).toString()}function Le(t){const e=l(t,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const a=Pt(window.location.href);return a?new URL(e.slice(1),a).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function pa(t,e,a){const r=l(t.runtimeUrl,1024)||l(e.runtimeUrl,1024);return r?Le(r):new URL("../avatar.html",new URL($t(l(a,1024)||"."),window.location.href)).toString()}function fa(t,e){const a=l(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function ha(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"Поднимаю рендер аватара…":"Loading compatibility renderer..."}function It(t){return String(t||navigator.language||"").toLowerCase().startsWith("ru")?"Ассистент":"Assistant"}function ma(t,e){const a=String(t||navigator.language||"").toLowerCase(),r=l(e,40)||It(a);return a.startsWith("ru")?`${r}: аватар`:`${r} avatar`}function ga(t,e){const a=new URL(t,window.location.href),r={...e.query||{}};e.displayMode!==!1&&r.display==null&&(r.display=!0),r.externalState==null&&(r.externalState=!0);for(const[n,s]of Object.entries(r)){const d=l(n,64);if(!d||s==null)continue;const o=typeof s=="boolean"?s?"1":"0":String(s);a.searchParams.set(d,o)}return a.toString()}function st(t,e,a){const r=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[l(n,32),Ee(a,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:l(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([n,s])=>[l(n,64),Le(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Le(t.state.stateUrl),idleLinesUrl:Le(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:Ee(a,l(e.modelUrl,1024)||l(e.entry,1024)),fallbackPortrait:Ee(a,e.fallbackPortrait||""),motionMapUrl:Ee(a,e.motionMapUrl||""),presetThumbs:r}}}class va{constructor(e={}){v(this,"id","live2d");v(this,"options");v(this,"manifest");v(this,"rendererConfig");v(this,"host",null);v(this,"containerEl",null);v(this,"iframeEl",null);v(this,"splashEl",null);v(this,"splashTextEl",null);v(this,"assetRoot","");v(this,"rendererConfigBlobUrl","");v(this,"currentState");v(this,"currentCue",{...la});v(this,"currentPreset","full");v(this,"currentBubble",{...da});v(this,"targetOrigin","*");v(this,"isReady",!1);v(this,"bubbleRevision",0);v(this,"readyTimeoutHandle",null);v(this,"handleWindowMessage",e=>{var n;const a=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!a||e.source!==a||!ua(e.data))return;const r=l(e.data.type,64);if(r==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}r==="neiri-avatar-ready"&&(this.isReady=!0,this.clearReadyTimeout(),this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Ge({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=je(e.rendererConfig||{}),this.currentState=fe({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=l(e.assetRoot,1024)||this.manifest.assetRoot;const a=pa(this.options,this.manifest,this.assetRoot),r={...this.options.query||{}};try{if(new URL(a,window.location.href).origin===window.location.origin){const m=st(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(m)],{type:"application/json"})),r.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const n=ga(a,{...this.options,query:r});this.targetOrigin=fa(n,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const d=document.createElement("iframe");d.className="ks-live2d-iframe",d.src=n,d.title=l(this.options.iframeTitle,80)||ma(this.rendererConfig.assistant.locale||"",this.rendererConfig.assistant.name),d.loading="eager",d.allow="autoplay",Object.assign(d.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),l(this.options.iframeSandbox,255)&&d.setAttribute("sandbox",l(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);s.append(d,o),this.host.append(s),d.addEventListener("load",()=>{this.armReadyTimeout(),this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=d,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.clearReadyTimeout(),this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=fe(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:l(e==null?void 0:e.cue,32)||null,emotion:l(e==null?void 0:e.emotion,32)||null,motion:l(e==null?void 0:e.motion,32)||null,until:l(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const r=l(e,255);this.currentBubble={text:r,key:r?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const r=document.createElement("div");Object.assign(r.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=l(this.rendererConfig.assistant.name,40)||It(this.rendererConfig.assistant.locale||""),Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent=ha(),Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),r.append(n,s),a.append(r),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}clearReadyTimeout(){this.readyTimeoutHandle!=null&&(window.clearTimeout(this.readyTimeoutHandle),this.readyTimeoutHandle=null)}armReadyTimeout(){this.clearReadyTimeout(),this.readyTimeoutHandle=window.setTimeout(()=>{this.isReady||(console.warn("Live2D iframe did not report ready in time; hiding splash guard."),this.setSplashVisible(!1))},ca)}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:st(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=wt(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var r;const a=(r=this.iframeEl)==null?void 0:r.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function ya(t={}){return new va(t)}const ba={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},ot={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class wa{constructor(e={}){v(this,"id","static");v(this,"options");v(this,"host",null);v(this,"frameEl",null);v(this,"imageEl",null);v(this,"bubbleEl",null);v(this,"fallbackEl",null);v(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const r=document.createElement("img");r.className="ks-static-avatar-image",Object.assign(r.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),r.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(r,n,s),this.host.append(a),this.frameEl=a,this.imageEl=r,this.bubbleEl=s,this.fallbackEl=n;const d=this.resolveImageUrl(e.assetRoot);d&&(r.src=d,r.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),r.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||ot,r=a[e]||a.full||ot.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(r.x)||0}px, ${Number(r.y)||0}px) scale(${Number(r.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const r=String(e||"").trim();if(!r){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=r,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return ba}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const r=e.replace(/\/+$/,""),n=a.replace(/^\.?\//,"");return r?`${r}/${n}`:n}}function Sa(t={}){return new wa(t)}function xa(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function Et(){var t;for(const e of xa())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),r=a==null?void 0:a.hass;if(r!=null&&r.states)return r}catch{continue}return null}function ka(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return l(e==null?void 0:e.access_token,4096)}catch{return""}}function At(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const r=l(a.entity_id,255);r&&(e[r]=a)}return e}function Ca(t,e,a="Assistant"){const r=t[e.status],n=t[e.message],s=t[e.online],d=t[e.busy],o=t[e.source],c=t[e.updatedAt],m=e.emotion?t[e.emotion]:null,i=e.activity?t[e.activity]:null,f=e.cue?t[e.cue]:null,w=e.speaking?t[e.speaking]:null,y=e.intensity?t[e.intensity]:null,k=e.motion?t[e.motion]:null,x=t[e.revision];if(!r&&!n&&!s&&!d)return null;const P=l(r==null?void 0:r.state,72),U=l(n==null?void 0:n.state,220),W=l(c==null?void 0:c.state,64),G=Fe(s,!0),E=Fe(d,!1),z=l(i==null?void 0:i.state,32)||"",M=Fe(w)??z==="speaking",Q=z||(G?M?"speaking":E?"thinking":"idle":"offline");return fe({version:1,assistant:l(a,40)||"Assistant",online:G,busy:E,status:P&&P!=="unknown"&&P!=="unavailable"?P:"",message:U&&U!=="unknown"&&U!=="unavailable"?U:"",source:l(o==null?void 0:o.state,64)||"ha",updatedAt:W&&W!=="unknown"&&W!=="unavailable"?W:(r==null?void 0:r.last_changed)||new Date().toISOString(),emotion:l(m==null?void 0:m.state,32)||null,activity:Q,cue:l(f==null?void 0:f.state,32)||null,intensity:Ea(y),speaking:M,motion:l(k==null?void 0:k.state,32)||null,revision:Number(x==null?void 0:x.state)||0})}const $a=["full","torso","head"];function Pa(t){const e=l(t==null?void 0:t.state,16).toLowerCase();return $a.includes(e)?e:null}function Ia(t,e){const a=e.viewPreset?t[e.viewPreset]:null,r=e.pageMode?t[e.pageMode]:null,n=e.pageTarget?t[e.pageTarget]:null,s=e.pageUntil?t[e.pageUntil]:null,d=e.cue?t[e.cue]:null,o=e.emotion?t[e.emotion]:null,c=e.motion?t[e.motion]:null,m=e.cueUntil?t[e.cueUntil]:null,i=e.revision?t[e.revision]:null;if(!a&&!r&&!n&&!d&&!o&&!c)return null;const f=l(n==null?void 0:n.state,40)||null,w=l(s==null?void 0:s.state,64)||null,y=l(r==null?void 0:r.state,16).toLowerCase(),k=y==="auto"?"auto":y==="pinned"||f||w?"pinned":"auto";return pe({...X,revision:Number(i==null?void 0:i.state)||0,viewPreset:Pa(a),page:{mode:k,target:k==="pinned"?f:null,until:k==="pinned"?w:null},cue:{cue:l(d==null?void 0:d.state,32)||null,emotion:l(o==null?void 0:o.state,32)||null,motion:l(c==null?void 0:c.state,32)||null,until:l(m==null?void 0:m.state,64)||null}})}function Fe(t,e){const a=l(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function Ea(t){const e=l(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function Ut(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),r=Math.max(6e4,t.authCooldownMs??600*1e3),n=l(t.apiUrl,4096);let s=null,d=0,o=null,c=0;async function m(){var k;const i=Et();if(i!=null&&i.states)return i.states;const f=Date.now();if(s&&f-d<a||!n&&!t.allowApiFallback||typeof e!="function"||f<c)return s;if(o)return o;const w=n?"":l(((k=t.readToken)==null?void 0:k.call(t))??ka(),4096);if(!n&&!w)return s;const y={};return w&&(y.Authorization=`Bearer ${w}`),o=e(n||"/api/states",{cache:"no-store",headers:y}).then(async x=>{if(!x.ok){const P=new Error(`HA states HTTP ${x.status}`);throw P.status=x.status,P}return x.json()}).then(x=>{const P=At(x);return P&&(s=P,d=Date.now()),P||s}).catch(x=>(((x==null?void 0:x.status)===401||(x==null?void 0:x.status)===403)&&(c=Date.now()+r),s)).finally(()=>{o=null}),o}return{id:"ha-states",async read(){return m()}}}async function Ye(t){const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=l(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const r=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");r.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await e(r.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return t.sanitize?t.sanitize(s):s}catch(n){if(t.defaultValue!==void 0)return t.defaultValue;throw n}}function Aa(t){return{id:"json-state",async read(){const e=await Ye({...t,defaultValue:t.defaultValue});return fe(e)}}}function Ua(t){return{id:"json-control",async read(){const e=await Ye({...t,defaultValue:t.defaultValue??X});return pe(e)}}}function Ta(t){return{id:"json-lines",async read(){const e=await Ye({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>l(a,220)).filter(Boolean):[]}}}function j(t,e,a=64){return l(t[e],a)}function me(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function La(t,e="en-US"){const a=l(t,64);if(!a)return"";const r=new Date(a);return Number.isNaN(r.getTime())?a:r.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ae(t,e){return!t||!e?null:t[e]||null}function Ra(t,e=null,a="en-US"){var f,w,y,k;const r=j(t,"caption",40)||j(t,"type",24)||"Card",n=j(t,"hint",72),s=j(t,"type",32).toLowerCase()||"entity",d=j(t,"entity",255),o=Ae(e,d),c=Ae(e,j(t,"stateEntity",255)),m=Ae(e,j(t,"downEntity",255)),i=Ae(e,j(t,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:r,value:j(t,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const x=Number(o==null?void 0:o.state);return!Number.isFinite(x)||x<=0?{caption:r,value:"Clear",hint:n||"nothing pending"}:{caption:r,value:`${x} item${x===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const x=(o==null?void 0:o.state)==="on";return{caption:r,value:x?j(t,"onText",48)||"On":j(t,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const x=me(o==null?void 0:o.state,0);return{caption:r,value:x?`${x}%`:"—",hint:l(c==null?void 0:c.state,48)||n||"battery level"}}if(s==="network"){const x=me(m==null?void 0:m.state,0),P=me(i==null?void 0:i.state,0);return{caption:r,value:x||P?`↓ ${x||"0"} · ↑ ${P||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:r,value:La(o==null?void 0:o.state,a)||"—",hint:n||"next event"};if(s==="percent"){const x=me(o==null?void 0:o.state,Number(j(t,"digits",4))||0);return{caption:r,value:x?`${x}%`:"—",hint:n||l((f=o==null?void 0:o.attributes)==null?void 0:f.friendly_name,48)||"state percentage"}}if(s==="number"){const x=Number(j(t,"digits",4))||0,P=me(o==null?void 0:o.state,x),U=j(t,"unit",16)||l((w=o==null?void 0:o.attributes)==null?void 0:w.unit_of_measurement,16);return{caption:r,value:P?`${P}${U?` ${U}`:""}`:"—",hint:n||l((y=o==null?void 0:o.attributes)==null?void 0:y.friendly_name,48)||"numeric value"}}return{caption:r,value:l(o==null?void 0:o.state,64)||j(t,"value",64)||"—",hint:n||l((k=o==null?void 0:o.attributes)==null?void 0:k.friendly_name,48)||"entity state"}}function lt(t,e=null,a="en-US"){return Array.isArray(t)?t.map(r=>Ra(r,e,a)):[]}const Tt={...Ct,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Lt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},Rt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Da={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},ve={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function S(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ze(t){return t.endsWith("/")?t:`${t}/`}function Ma(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function O(t,e){const a=l(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(t,window.location.href);if(a.startsWith("/")){const n=Ma(r.toString());return n?new URL(a.slice(1),n).toString():new URL(a,r.origin).toString()}return new URL(a,r).toString()}function Dt(t){try{return new URL(".",t).toString()}catch{return new URL(".",window.location.href).toString()}}function Na(t,e){const a=Dt(e),r=O(a,l(t.assetRoot,1024)||"./assets"),n=r?Ze(r):a,s=d=>{const o=l(d,1024);return o?O(n,o):""};return{...t,assetRoot:r,runtimeUrl:O(a,t.runtimeUrl||""),entry:s(t.entry||""),modelUrl:s(t.modelUrl||""),fallbackPortrait:s(t.fallbackPortrait||""),motionMapUrl:s(t.motionMapUrl||""),expressionMapUrl:s(t.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([d,o])=>[d,O(a,o)]).filter(([,d])=>!!d))}}function _e(t){return{...ve,...t||{},metrics:{...ve.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)&&t.forecast.length?t.forecast.map(e=>({...e})):ve.forecast.map(e=>({...e}))}}function Oe(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function q(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const r=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:r})}function Ba(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const r=l(e,24).toLowerCase();return r==="mmhg"||r==="мм рт. ст."?`${q(a)} мм рт. ст.`:`${q(a*.750061683,0)} мм рт. ст.`}function Fa(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const r=l(e,24).toLowerCase();return r==="m/s"||r==="м/с"?`${q(a,1)} м/с`:r==="km/h"||r==="км/ч"?`${q(a/3.6,1)} м/с`:`${q(a,1)} м/с`}function _a(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Oa(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function Ha(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function za(t,e="ru-RU"){const a=l(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||l(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function dt(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function ja(t,e="./assets/icons"){const a=Number(t),r=Ze(e);return a===0?`${r}sun.svg`:[1,2].includes(a)?`${r}cloud-sun.svg`:[3].includes(a)?`${r}cloud.svg`:[45,48].includes(a)?`${r}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${r}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${r}cloud-snow.svg`:[95,96,99].includes(a)?`${r}cloud-lightning.svg`:`${r}cloud.svg`}function Va(t){const e=l(t.locale,32)||"ru-RU",a=l(t.iconBaseUrl,1024)||"./assets/icons",r=Ut({allowApiFallback:t.allowApiFallback,apiUrl:t.apiUrl,fetchImpl:t.fetchImpl});return async()=>{var k,x,P,U,W,G,E,z,B,M,Q,we,Se,xe,ke,Ce,$e,Pe,he,p;const n=await r.read(),s=t.fetchImpl??globalThis.fetch,d=n==null?void 0:n[t.weatherEntity];let o=null;const c=l(t.openMeteoUrl,4096);if(c&&typeof s=="function")try{const h=await s(`${c}${c.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});h.ok&&(o=await h.json())}catch{o=null}if(!d&&!(o!=null&&o.current))return null;const m=l(d==null?void 0:d.last_changed,64)||l((k=o==null?void 0:o.current)==null?void 0:k.time,64)||new Date().toISOString(),i=d?za(d.state,e):dt((x=o==null?void 0:o.current)==null?void 0:x.weather_code,e),f=Array.isArray((P=o==null?void 0:o.daily)==null?void 0:P.time)?o.daily.time.map((h,u)=>{var A,T,N,I,ae;const b=new Date(`${h}T12:00:00+03:00`);return{name:b.toLocaleDateString(e,{weekday:"short"}),dayNumber:b.toLocaleDateString(e,{day:"numeric"}),monthShort:b.toLocaleDateString(e,{month:"short"}),note:l(dt((A=o.daily.weather_code)==null?void 0:A[u],e),28),max:`${q((T=o.daily.temperature_2m_max)==null?void 0:T[u])}°`,min:`${q((N=o.daily.temperature_2m_min)==null?void 0:N[u])}° · ${q((I=o.daily.precipitation_probability_max)==null?void 0:I[u])}%`,icon:ja((ae=o.daily.weather_code)==null?void 0:ae[u],a)}}):[],w=f[0]||null,y=f.slice(1,6);return{todayValue:Oa(m,e),todayLabel:Ha(m,e),updatedAt:_a(m,e),temperature:q(((U=d==null?void 0:d.attributes)==null?void 0:U.temperature)??((W=o==null?void 0:o.current)==null?void 0:W.temperature_2m),1),condition:i,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${q(((G=d==null?void 0:d.attributes)==null?void 0:G.apparent_temperature)??((E=o==null?void 0:o.current)==null?void 0:E.apparent_temperature)??((z=d==null?void 0:d.attributes)==null?void 0:z.temperature),1)}°C`,badgeSummary:i,badgeRange:w?`${w.max} / ${q((M=(B=o==null?void 0:o.daily)==null?void 0:B.temperature_2m_min)==null?void 0:M[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${q(((Q=d==null?void 0:d.attributes)==null?void 0:Q.humidity)??((we=o==null?void 0:o.current)==null?void 0:we.relative_humidity_2m))}%`,pressure:Ba(((Se=d==null?void 0:d.attributes)==null?void 0:Se.pressure)??((xe=o==null?void 0:o.current)==null?void 0:xe.surface_pressure),((ke=d==null?void 0:d.attributes)==null?void 0:ke.pressure_unit)??"hPa"),wind:Fa(((Ce=d==null?void 0:d.attributes)==null?void 0:Ce.wind_speed)??(($e=o==null?void 0:o.current)==null?void 0:$e.wind_speed_10m),((Pe=d==null?void 0:d.attributes)==null?void 0:Pe.wind_speed_unit)??"km/h"),clouds:`${q(((he=d==null?void 0:d.attributes)==null?void 0:he.cloud_coverage)??((p=o==null?void 0:o.current)==null?void 0:p.cloud_cover))}%`},forecast:y}}}class Wa{constructor(e,a={}){v(this,"root");v(this,"options");v(this,"avatarMountEl");v(this,"carouselShellEl");v(this,"carouselTrackEl");v(this,"dotsEl");v(this,"presetButtons");v(this,"copy");v(this,"labels");v(this,"presetLabels");v(this,"rendererConfig");v(this,"avatarManifest");v(this,"sceneConfig");v(this,"sceneRuntimeConfig");v(this,"entityMap",null);v(this,"controlEntityMap",null);v(this,"haStatesReader",null);v(this,"weatherData");v(this,"hassStates",null);v(this,"currentState");v(this,"remoteControl",X);v(this,"uiControl",X);v(this,"currentControl",X);v(this,"idleLines",[]);v(this,"activeIndex",0);v(this,"lastAutoRotateAt",0);v(this,"currentIdleLine","");v(this,"lastIdleIndex",-1);v(this,"currentPreset","full");v(this,"idleTimer",null);v(this,"avatarAdapter",null);v(this,"refreshIntervalHandle",null);v(this,"stateStream",null);v(this,"orderedPages",[]);v(this,"carouselDragState",null);v(this,"lastPageStructureKey","");v(this,"lastCarouselRenderKey","");v(this,"slideMarkupCache",new Map);v(this,"lastDotsMarkup","");v(this,"lastAvatarStateKey","");v(this,"lastAvatarCueKey","");v(this,"lastAvatarBubbleKey","");v(this,"lastAvatarPreset","");this.root=e,this.options=a,this.copy={...Tt,...a.copy||{}},this.labels={...Lt,...a.labels||{}},this.presetLabels={...Rt,...a.presetLabels||{}},this.weatherData=_e(a.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="${S(this.labels.avatarPresetGroup)}">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${S(this.presetLabels.full)}" aria-label="${S(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${S(this.presetLabels.torso)}" aria-label="${S(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${S(this.presetLabels.head)}" aria-label="${S(this.presetLabels.head)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="head">
                </button>
              </div>
              <div class="avatar-mount" data-avatar-mount></div>
            </div>
          </section>

          <section class="panel content-panel">
            <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="${S(this.labels.carouselRegion)}">
              <div class="carousel-track" data-carousel-track></div>
              <div class="carousel-dots" data-dots aria-label="${S(this.labels.pagesRegion)}"></div>
            </div>
          </section>
        </div>
      </div>
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=O(window.location.href,this.getRendererConfigUrl()),a=Dt(e),r=je(await this.readJson(e)),n=je({...r,links:Object.fromEntries(Object.entries(r.links||{}).map(([d,o])=>[d,O(a,o)])),avatar:{...r.avatar,manifestUrl:O(a,r.avatar.manifestUrl)},scene:{...r.scene,configUrl:O(a,r.scene.configUrl)},state:{...r.state,stateUrl:O(a,r.state.stateUrl),apiUrl:r.state.apiUrl?O(a,r.state.apiUrl):void 0,idleLinesUrl:O(a,r.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:r.state.entityMapUrl?O(a,r.state.entityMapUrl):void 0},control:{...r.control,controlUrl:O(a,r.control.controlUrl),apiUrl:r.control.apiUrl?O(a,r.control.apiUrl):void 0,entityMapUrl:r.control.entityMapUrl?O(a,r.control.entityMapUrl):void 0}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=Na(Ge(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.sceneRuntimeConfig=Yt(this.sceneConfig),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await Ta({url:this.rendererConfig.state.idleLinesUrl||O(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=Ne(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.connectStateStream()||(this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??1e4))}async dispose(){var e,a;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null,(a=this.stateStream)==null||a.close(),this.stateStream=null}getRendererConfigUrl(){return l(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return l(this.options.weatherUrl,1024)||"./weather.json"}getStateStreamUrl(){return l(this.options.stateStreamUrl,2048)}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=zt(this.uiControl,a||"full"),this.refresh()})}bindCarouselControls(){let e=0,a=0,r=0;const n=(f,w,y,k)=>this.orderedPages.length<2||this.isCarouselInteractiveTarget(k)?!1:(this.carouselDragState={pointerId:f,startX:w,startY:y,deltaX:0,deltaY:0,locked:!1},!0),s=(f,w,y)=>{if(!this.carouselDragState||f!==this.carouselDragState.pointerId)return!1;if(this.carouselDragState.deltaX=w-this.carouselDragState.startX,this.carouselDragState.deltaY=y-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return!1;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX))return this.clearDragState(f,!1),!1;this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}return this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX}),!0},d=f=>{if(!this.carouselDragState||f!==this.carouselDragState.pointerId)return;const{locked:w,deltaX:y}=this.carouselDragState,k=this.carouselShellEl.clientWidth||1,x=w&&Math.abs(y)>=k*.16,P=y<0?1:-1;if(this.clearDragState(f,!1),x){this.stepPage(P);return}this.updateCarouselPosition()},o=()=>Date.now()-e>500&&Date.now()-r>500,c=()=>Date.now()-e>500&&Date.now()-a>500;this.carouselShellEl.addEventListener("keydown",f=>{if(f.key==="ArrowLeft"){f.preventDefault(),this.stepPage(-1);return}f.key==="ArrowRight"&&(f.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",f=>{var w,y;f.button!==0||f.pointerType==="mouse"&&Date.now()-a<500||(e=Date.now(),n(f.pointerId,f.clientX,f.clientY,f.target)&&(f.preventDefault(),(y=(w=this.carouselShellEl).setPointerCapture)==null||y.call(w,f.pointerId)))}),this.carouselShellEl.addEventListener("pointermove",f=>{!this.carouselDragState||f.pointerId!==this.carouselDragState.pointerId||(e=Date.now(),s(f.pointerId,f.clientX,f.clientY)&&f.preventDefault())});const m=f=>{e=Date.now(),d(f.pointerId)};this.carouselShellEl.addEventListener("pointerup",m),this.carouselShellEl.addEventListener("pointercancel",m),this.carouselShellEl.addEventListener("lostpointercapture",m),this.carouselShellEl.addEventListener("touchstart",f=>{var y;if(!o())return;const w=(y=f.changedTouches)==null?void 0:y[0];w&&n(`touch-${w.identifier}`,w.clientX,w.clientY,f.target)&&(a=Date.now(),f.preventDefault(),f.stopPropagation())},{passive:!1}),this.carouselShellEl.addEventListener("touchmove",f=>{if(!o()||!this.carouselDragState)return;const w=Array.from(f.changedTouches||[]).find(y=>{var k;return`touch-${y.identifier}`===((k=this.carouselDragState)==null?void 0:k.pointerId)});w&&(a=Date.now(),s(`touch-${w.identifier}`,w.clientX,w.clientY)&&(f.preventDefault(),f.stopPropagation()))},{passive:!1});const i=f=>{if(!o()||!this.carouselDragState)return;const w=Array.from(f.changedTouches||[]).find(y=>{var k;return`touch-${y.identifier}`===((k=this.carouselDragState)==null?void 0:k.pointerId)});w&&(a=Date.now(),f.preventDefault(),f.stopPropagation(),d(`touch-${w.identifier}`))};this.carouselShellEl.addEventListener("touchend",i,{passive:!1}),this.carouselShellEl.addEventListener("touchcancel",i,{passive:!1}),this.carouselShellEl.addEventListener("mousedown",f=>{f.button!==0||!c()||n("mouse-fallback",f.clientX,f.clientY,f.target)&&(r=Date.now(),f.preventDefault())}),window.addEventListener("mousemove",f=>{!this.carouselDragState||this.carouselDragState.pointerId!=="mouse-fallback"||(r=Date.now(),s("mouse-fallback",f.clientX,f.clientY)&&f.preventDefault())}),window.addEventListener("mouseup",f=>{!this.carouselDragState||this.carouselDragState.pointerId!=="mouse-fallback"||(r=Date.now(),f.button===0&&f.preventDefault(),d("mouse-fallback"))})}connectStateStream(){const e=this.getStateStreamUrl();if(!e||typeof EventSource>"u")return!1;const a=O(window.location.href,e),r=new EventSource(a);return r.onmessage=n=>{try{const s=JSON.parse(String(n.data||"null")),d=At(Array.isArray(s)?s:s==null?void 0:s.states);if(!d)return;this.refresh(d)}catch(s){console.warn("Failed to parse state stream payload",s)}},r.onerror=()=>{console.warn("Scene state stream disconnected; keeping EventSource reconnect logic active.")},this.stateStream=r,!0}async refresh(e){const a=e??await this.readSceneStates();this.currentState=await this.readAssistantState(a),this.hassStates=a,this.remoteControl=await this.readRemoteControl(this.currentControl,a),this.uiControl=Ne(X,this.uiControl),this.currentControl=Ne(this.remoteControl,this.uiControl);const r=wt(this.currentState,this.currentControl);this.syncIdleMonologue(r);const n=na(r,{idleMonologue:this.currentIdleLine,copy:this.copy}),s=this.sceneRuntimeConfig;this.applyDisplayConfig(s);const d=s.pages,o=aa({control:this.currentControl,rotation:s.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:c=>d.some(m=>m.id===c)});if(this.activeIndex=o.nextIndex,this.lastAutoRotateAt=o.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.syncAvatarPresentation(n),this.renderCarousel(d,n)}renderCarousel(e,a){this.orderedPages=e.slice();const r=JSON.stringify(e.map(o=>({id:o.id,kind:o.kind,title:o.title,subtitle:o.subtitle||"",slot:o.slot??null,cardStyle:o.cardStyle||"",stampCaption:o.stampCaption||"",stampValue:o.stampValue||"",cards:Array.isArray(o.cards)?o.cards.map(c=>({type:l(c.type,32),entity:l(c.entity,255),stateEntity:l(c.stateEntity,255),downEntity:l(c.downEntity,255),upEntity:l(c.upEntity,255),caption:l(c.caption,48),hint:l(c.hint,72)})):[]}))),n=this.buildCarouselRenderKey(e,a);if(r===this.lastPageStructureKey&&n===this.lastCarouselRenderKey){this.updateCarouselPosition(),this.updateDotState();return}const s=e.map((o,c)=>o.kind==="overview"?this.renderOverviewSlide(o,a,c):this.renderDynamicSlide(o,c,e.length)),d=e.map((o,c)=>`
      <button
        class="carousel-dot ${c===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${c}"
        data-scene-page-id="${S(o.id)}"
        aria-label="${S(l(o.title,40)||l(o.id,40)||`${this.labels.pageStamp} ${c+1}`)}"
      ></button>
    `).join("");if(r!==this.lastPageStructureKey){this.carouselTrackEl.innerHTML=s.join(""),this.dotsEl.innerHTML=d,this.lastPageStructureKey=r,this.lastCarouselRenderKey=n,this.lastDotsMarkup=d,this.slideMarkupCache=new Map(e.map((o,c)=>[o.id,s[c]]));for(const o of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))o.addEventListener("click",()=>{this.pinPageByIndex(Number(o.dataset.slideIndex)||0)})}else{const o=Array.from(this.carouselTrackEl.children);if(s.forEach((c,m)=>{const i=e[m];if(this.slideMarkupCache.get(i.id)===c)return;const f=o[m];if(!f)return;const w=document.createElement("template");w.innerHTML=c.trim();const y=w.content.firstElementChild;y&&(f.replaceWith(y),this.slideMarkupCache.set(i.id,c))}),this.lastDotsMarkup!==d){this.dotsEl.innerHTML=d,this.lastDotsMarkup=d;for(const c of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))c.addEventListener("click",()=>{this.pinPageByIndex(Number(c.dataset.slideIndex)||0)})}this.lastCarouselRenderKey=n}this.updateCarouselPosition(),this.updateDotState()}buildCarouselRenderKey(e,a){const r=this.weatherData||ve,n=this.rendererConfig.assistant.locale||"en-US";return JSON.stringify({presentation:{caption:l(a.caption,64),label:l(a.label,96),body:l(a.body,280)},weather:{title:l(r.title,64),location:l(r.location,96),todayCaption:l(r.todayCaption,48),todayValue:l(r.todayValue,48),todayLabel:l(r.todayLabel,48),updatedCaption:l(r.updatedCaption,48),updatedAt:l(r.updatedAt,48),temperature:l(r.temperature,24),unit:l(r.unit,8),condition:l(r.condition,96),feelsLike:l(r.feelsLike,140),badgeSummary:l(r.badgeSummary,96),badgeRange:l(r.badgeRange,96),metrics:r.metrics,forecastTitle:l(r.forecastTitle,64),forecast:r.forecast.map(s=>({name:l(s.name,24),dayNumber:l(s.dayNumber,8),monthShort:l(s.monthShort,16),note:l(s.note,48),max:l(s.max,16),min:l(s.min,24),icon:l(s.icon,255)}))},pages:e.map((s,d)=>({id:l(s.id,64),kind:l(s.kind,32),title:l(s.title,96),subtitle:l(s.subtitle,160),stampCaption:l(s.stampCaption,48),stampValue:l(s.stampValue,48),cardStyle:l(s.cardStyle,16),index:d,cards:lt(s.cards||[],this.hassStates,n).map(o=>({caption:l(o.caption,64),value:l(o.value,96),hint:l(o.hint,160)}))}))})}renderOverviewSlide(e,a,r){const n=l(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||ve,d=s.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="${S(e.id)}" data-scene-page-id="${S(e.id)}" data-slide-order="${r}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${S(s.title)}</h1>
              <p class="subline">${S(s.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${S(s.todayCaption)}</span>
                <span class="value">${S(s.todayValue)}</span>
                <span class="meta">${S(s.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${S(s.updatedCaption)}</span>
                <span class="value">${S(s.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${S(s.temperature)}</span>
                <span class="unit">°${S(s.unit)}</span>
              </div>
              <div class="condition">${S(s.condition)}</div>
              <div class="feels">${S(s.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${S(this.resolveIconUrl("thermometer"))}" alt=""><span>${S(s.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${S(this.resolveIconUrl("calendarDays"))}" alt=""><span>${S(s.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${S(a.caption)}</strong>
                  <div class="neiri-label">${S(a.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${S(this.resolveIconUrl("sparkles"))}" alt="${S(n)}"></div>
              </div>
              <div class="neiri-meta">${S(a.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${S(this.labels.humidity)}</span><i><img src="${S(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${S(s.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${S(this.labels.pressure)}</span><i><img src="${S(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${S(s.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${S(this.labels.wind)}</span><i><img src="${S(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${S(s.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${S(this.labels.clouds)}</span><i><img src="${S(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${S(s.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${S(s.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${d}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,a,r){const n=lt(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),d=l(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),o=l(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${a+1} / ${r}`),c=e.cardStyle==="mini"?n.map((y,k)=>`
          <article class="mini-card" data-scene-card-index="${k}" data-scene-page-id="${S(e.id)}">
            <span class="caption">${S(y.caption)}</span>
            <strong>${S(y.value)}</strong>
          </article>
        `).join(""):n.map((y,k)=>`
          <article class="home-card" data-scene-card-index="${k}" data-scene-page-id="${S(e.id)}">
            <span class="caption">${S(y.caption)}</span>
            <strong>${S(y.value)}</strong>
            <small>${S(y.hint)}</small>
          </article>
        `).join(""),m=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(y=>this.renderForecastDay(y)).join("")}</div>`:"",i=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",f=l(e.title,64)||l(e.id,64)||`${this.labels.pageStamp} ${a+1}`,w=l(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${S(e.id)}" data-scene-page-id="${S(e.id)}" data-slide-order="${a}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${S(e.kind)}" data-dynamic-card-style="${S(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${S(f)}</h1>
              ${w?`<p class="subline">${S(w)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${S(d)}</span>
              <span class="value">${S(o)}</span>
            </div>
          </div>
          ${m}
          <div class="${i}">
            ${c||`<div class="empty">${S(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `}renderForecastDay(e){return`
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${S(e.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${S(e.name)}</span>
            <span class="meta"><span class="day-number">${S(e.dayNumber)}</span><span class="day-month">${S(e.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${S(e.max)}</strong>
          <small>${S(e.min)}</small>
        </div>
        <div class="day-note">${S(e.note)}</div>
      </article>
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const a=e[0],r=e[e.length-1];return`${l(a.dayNumber,4)} ${l(a.monthShort,8)} → ${l(r.dayNumber,4)} ${l(r.monthShort,8)}`}resolveIconUrl(e){var n;const a=l((n=this.options.iconUrls)==null?void 0:n[e],1024);return a||`${Ze(l(this.options.iconBaseUrl,1024)||"./assets")}${Da[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:r,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${r}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,r=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${r}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,a){var r,n;typeof e=="number"&&!a&&((n=(r=this.carouselShellEl).hasPointerCapture)!=null&&n.call(r,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=ta(this.sceneRuntimeConfig.rotation,this.activeIndex,e,r=>this.orderedPages.some(n=>n.id===r));this.pinPageByIndex(a)}pinPageByIndex(e){const r=(this.orderedPages.length?this.orderedPages:this.sceneRuntimeConfig.pages)[e];if(!r)return;const n=Math.max(18e3,this.sceneRuntimeConfig.rotation.defaultDwellMs*2);this.uiControl=jt(this.uiControl,r.id,n),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!oa(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=nt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const a=nt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refresh()},sa(18e3,18e3))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: HTTP ${a.status}`);return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:Ut({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl})}async readAssistantState(e){var n;const a=async()=>Aa({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??kt}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap)return a();const r=e??await((n=this.haStatesReader)==null?void 0:n.read())??null;return r&&Ca(r||{},this.entityMap,this.rendererConfig.assistant.name)||a()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=X,a){var s;const r=async()=>Ua({url:this.rendererConfig.control.controlUrl,defaultValue:e}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap)return r();const n=a??await((s=this.haStatesReader)==null?void 0:s.read())??null;return n&&Ia(n||{},this.controlEntityMap)||r()}async syncAvatarPresentation(e){if(!this.avatarAdapter)return;const a=JSON.stringify(e.state);a!==this.lastAvatarStateKey&&(await this.avatarAdapter.setState(e.state),this.lastAvatarStateKey=a);const r=JSON.stringify(this.currentControl.cue||X.cue);r!==this.lastAvatarCueKey&&(await this.avatarAdapter.setCue(this.currentControl.cue),this.lastAvatarCueKey=r),this.currentPreset!==this.lastAvatarPreset&&(await this.avatarAdapter.setViewPreset(this.currentPreset),this.lastAvatarPreset=this.currentPreset);const n=e.body||"";n!==this.lastAvatarBubbleKey&&(await this.avatarAdapter.showBubble(e.body,{ttlMs:0,speak:!1,typewriter:!1}),this.lastAvatarBubbleKey=n)}async readWeatherData(){const e={...this.options.defaultWeather||{}};let a={...e};try{const r=await this.readJson(this.getWeatherUrl());a=Oe(a,r)}catch{}if(a=Oe(a,e),this.options.weatherReader)try{const r=await this.options.weatherReader();a=Oe(a,r)}catch{}try{return _e(a)}catch{return _e(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return ya({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Sa({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const r=a.dataset.avatarPreset||"",n=a.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[r];a.classList.toggle("is-active",r===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function Ka(t,e={}){const a=new Wa(t,e);return await a.init(),a}const qa=["overview","cards","forecast+cards"],Ga=["full","mini"],Mt=["entity","text","todo","onoff","battery","network","time","percent","number"],Z=["caption","hint"],Ue="/local/live2d/",ct="/scene-legacy/live2d/",Ja={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Ya={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Za=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Xa=4*1024*1024,Qa=192*1024,Re=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],We="mellow-fly-7";function ce(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function er(t){return Re.find(e=>e.id===t)||Re.find(e=>e.id===We)||Re[0]}function tr(t){return`${t.width} × ${t.height}`}function g(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Xe(t){return JSON.parse(JSON.stringify(t))}function J(t){const e=new Map(t.pages.map(n=>[n.id,n])),a=t.rotation.order.map(n=>e.get(n)).filter(Boolean),r=t.pages.filter(n=>!a.some(s=>s.id===n.id));return[...a,...r]}function ar(t,e){return e?Math.max(0,J(t).findIndex(a=>a.id===e)):0}function rr(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Nt(t,e){const a=rr(e);let r=a,n=2;for(;t.pages.some(s=>s.id===r);)r=`${a}-${n}`,n+=1;return r}function ir(t){const e=t.pages.length+1,a=ce()==="ru";return{id:Nt(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function ut(t){const e=ce()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function V(t,e){const a=t[e];return a==null?"":String(a)}function te(t,e){const a=t[e];return a==null?"":String(a)}function ie(t,e){const a=t.display||{},r=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(r.top))?Number(r.top):0);case"safeRight":return String(Number.isFinite(Number(r.right))?Number(r.right):0);case"safeBottom":return String(Number.isFinite(Number(r.bottom))?Number(r.bottom):0);case"safeLeft":return String(Number.isFinite(Number(r.left))?Number(r.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function nr(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function He(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function sr(t){return t.avatar||(t.avatar={}),t.avatar}function or(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function lr(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function dr(t){var r;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&J(t).some(n=>n.id===a)?a:((r=J(t)[0])==null?void 0:r.id)||null}async function cr(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return Xe(a.config)}async function ur(t,e){const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),r=await a.json();if(!a.ok||r.success===!1||!r.config)throw new Error(`POST ${t} failed: HTTP ${a.status}`);return Xe(r.config)}function Qe(t){switch(t){case"text":return[...Z,"value"];case"todo":return[...Z,"entity"];case"onoff":return[...Z,"entity","onText","offText"];case"battery":return[...Z,"entity","stateEntity"];case"network":return[...Z,"downEntity","upEntity"];case"time":return[...Z,"entity"];case"percent":return[...Z,"entity","digits"];case"number":return[...Z,"entity","digits","unit"];default:return[...Z,"entity"]}}function ze(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:t.kindOverview}function ue(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function Bt(t){const e=ce();return Ja[e][t]||""}function De(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function pr(t,e){const a=e.attributes||{},r=String(a.friendly_name||t),n=t.includes(".")&&t.split(".",1)[0]||"other",s=String(e.state||""),d=String(a.unit_of_measurement||"");return{entityId:t,name:r,domain:n,state:s,unit:d}}function fr(t){return t?Object.entries(t).map(([e,a])=>pr(e,a)).sort((e,a)=>{const r=e.domain.localeCompare(a.domain);return r!==0?r:e.name.localeCompare(a.name,"ru")}):[]}function hr(t,e){const a=e.trim().toLowerCase();return a?t.filter(r=>r.entityId.toLowerCase().includes(a)||r.name.toLowerCase().includes(a)||r.domain.toLowerCase().includes(a)||r.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function mr(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():null}function se(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(e,window.location.href);if(a.startsWith("/")){const n=mr(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,r).toString()}function et(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ue))return se(`${ct}${a.slice(Ue.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const r=new URL(a,e);if(r.pathname.startsWith(Ue)){const n=r.pathname.slice(Ue.length);return se(`${ct}${n}${r.search}${r.hash}`,e)}}catch{return a}return a}function gr(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function vr(t,e){const a=new URL("./",t).toString(),r=se(et(e,a)||e,a);return gr(r||a)}function pt(t,e,a){const r=String(a||"").trim();return r?se(et(r,t)||r,vr(t,e)):""}function yr(t,e){const a=String(e||"").trim();return a?se(et(a,t)||a,new URL("./",t).toString()):""}function Ft(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}function Ke(t,e){const a=Ft(t);return{...a,manifestUrl:a.manifestUrl?se(a.manifestUrl,e):"",previewUrl:a.previewUrl?se(a.previewUrl,e):""}}async function br(t,e){var m;const a=String(t||"").trim();if(!a)return null;const r=await fetch(a,{cache:"no-store"}),n=await r.json();if(!r.ok)throw new Error(`GET ${a} failed: HTTP ${r.status}`);const s=String(n.assetRoot||"").trim();let d=0;const o=pt(a,s,String(n.motionMapUrl||"").trim());if(o)try{const i=await fetch(o,{cache:"no-store"}),f=await i.json();i.ok&&Array.isArray(f.motions)&&(d=f.motions.length)}catch{d=0}const c=yr(a,String(((m=n.presetThumbs)==null?void 0:m.full)||"").trim())||pt(a,s,String(n.fallbackPortrait||"").trim());return Ft({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:a,previewUrl:c,motionCount:d,capabilities:n.capabilities})}async function ft(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),r=await a.json();if(!a.ok||r.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(r.items)?r.items.map(n=>Ke(n,e)).filter(n=>n.id&&n.manifestUrl):[]}async function wr(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const r=/\/api\/hassio_ingress\//.test(a),n=r?Qa:Xa;if(r||e.size>n){const c=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,m=Math.max(1,Math.ceil(e.size/n));let i=null;for(let f=0;f<m;f+=1){const w=f*n,y=Math.min(e.size,w+n),k=new FormData;k.set("uploadId",c),k.set("filename",e.name),k.set("chunkIndex",String(f)),k.set("chunkCount",String(m)),k.set("archive",e.slice(w,y,"application/zip"),`${e.name}.part-${f+1}-of-${m}`);const x=await fetch(a,{method:"POST",body:k}),P=await x.json();if(!x.ok||P.success===!1)throw new Error(String(P.error||`HTTP ${x.status}`));P.item&&(i=Ke(P.item,a))}if(!i)throw new Error("Avatar import did not return the imported pack.");return i}const s=new FormData;s.set("archive",e,e.name);const d=await fetch(a,{method:"POST",body:s}),o=await d.json();if(!d.ok||o.success===!1||!o.item)throw new Error(String(o.error||`HTTP ${d.status}`));return Ke(o.item,a)}async function Sr(t,e){var d,o,c,m;const a=String(t||"").trim(),r=String(e||"").trim();if(!a||!r)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${a}?packId=${encodeURIComponent(r)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((d=s.motionMap)==null?void 0:d.motions)?(o=s.motionMap)==null?void 0:o.motions.map(i=>({index:Number(i.index),id:String(i.id||"").trim(),label:String(i.label||i.id||"").trim(),group:String(i.group||"").trim(),tags:Array.isArray(i.tags)?i.tags.map(f=>String(f||"").trim()).filter(Boolean):[]})).filter(i=>Number.isFinite(i.index)):[],semantic:typeof((c=s.motionMap)==null?void 0:c.semantic)=="object"&&((m=s.motionMap)!=null&&m.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function xr(t,e){var s,d,o;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const r=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await r.json();if(!r.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${r.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((d=n.motionMap)==null?void 0:d.semantic)=="object"&&((o=n.motionMap)!=null&&o.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function kr(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function Cr(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function $r(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Za.map(r=>`
          <div class="field">
            <label for="avatar-semantic-${g(r.key)}">${g(Cr(t,r))}</label>
            <select id="avatar-semantic-${g(r.key)}" data-avatar-semantic="${g(r.key)}">
              <option value="">${g(t.avatarMotionNone)}</option>
              ${a.map(n=>`
                <option value="${g(String(n.index))}"${kr(e.motionMap.semantic[r.key])===String(n.index)?" selected":""}>
                  ${g(`${n.label||n.id} · #${n.index}`)}
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
              <strong>${g(r.label||r.id||`${t.avatarMappingMotion} ${r.index}`)}</strong>
              <span class="meta">${g(`${t.avatarMappingMotion} #${r.index} · ${r.group||t.avatarMappingMotion.toLowerCase()}`)}</span>
              <code>${g(r.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${t.avatarMappingSaveHint}</div>
    </div>
  `}function ht(t,e,a){var i,f,w,y,k;const r=(e==null?void 0:e.id)||"",n=a===r,s=(e==null?void 0:e.name)||t.avatarPackDefaultTile,d=(e==null?void 0:e.id)||t.avatarPackCurrent,o=(e==null?void 0:e.previewUrl)||"",c=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(i=e.capabilities)!=null&&i.supportsMotion?t.avatarCapabilityMotion:"",(f=e.capabilities)!=null&&f.supportsEmotion?t.avatarCapabilityEmotion:"",(w=e.capabilities)!=null&&w.supportsLipSync?t.avatarCapabilityLipSync:"",(y=e.capabilities)!=null&&y.supportsViewPresets?t.avatarCapabilityViewPresets:"",(k=e.capabilities)!=null&&k.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],m=c.length?c:[t.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${o?`<img src="${g(o)}" alt="${g(s)}">`:`<span>${g(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${g(s)}</strong>
        <div class="meta">${g(d)}</div>
        <div class="avatar-pack-card-meta">
          ${m.map(x=>`<span>${g(x)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${g(r)}">
          ${g(n?t.avatarPackSelected:t.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function tt(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function Pr(t,e,a,r){if(!e||a===null)return`<div class="meta">${g(t.entityBindingEmpty)}</div>`;const n=Qe(V(e,"type")||"entity").filter(s=>tt(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(r==null?void 0:r.cardIndex)===a&&r.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${g(s)}">
            ${g(De(t,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${g(t.entityBindingNoTargets)}</div>`}function mt(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function oe(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function gt(t){return Qe(t).find(e=>tt(e))||null}function le(t,e,a,r=!1){return`
    <div class="field ${r?"is-wide":""}">
      <label for="page-field-${e}">${g(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${g(e)}" value="${g(a)}">
    </div>
  `}function ne(t,e,a){const r=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${g(t)}</label>
      <input id="display-field-${e}" type="number" step="${r}" data-display-field="${g(e)}" value="${g(a)}">
    </div>
  `}function vt(t,e,a,r){return`
    <div class="field">
      <label for="page-select-${e}">${g(t)}</label>
      <select id="page-select-${e}" data-page-field="${g(e)}">
        ${r.map(n=>`<option value="${g(n.value)}"${n.value===a?" selected":""}>${g(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function Ir(t,e,a,r){const n=V(e,"type")||"entity",s=Qe(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${g(V(e,"caption")||ue(t,n))}</strong>
          <div class="meta">${g(ue(t,n))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${g(t.cardType)}</label>
          <select data-card-index="${a}" data-card-field="type">
            ${Mt.map(d=>`<option value="${d}"${d===n?" selected":""}>${g(ue(t,d))}</option>`).join("")}
          </select>
        </div>
        ${s.map(d=>{const o=tt(d),c=o&&(r==null?void 0:r.cardIndex)===a&&r.field===d;return o?`
              <div class="field ${d==="hint"?"is-wide":""} is-binding-field${c?" is-active":""}">
                <label>${g(De(t,d))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${a}"
                    data-card-field="${g(d)}"
                    data-binding-field="${g(d)}"
                    value="${g(V(e,d))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${a}"
                    data-binding-field="${g(d)}"
                  >${t.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${d==="hint"?"is-wide":""}">
              <label>${g(De(t,d))}</label>
              <input
                type="${d==="digits"?"number":"text"}"
                data-card-index="${a}"
                data-card-field="${g(d)}"
                value="${g(V(e,d))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Er(t,e,a,r,n){const s=V(e,"type")||"entity",d=V(e,"caption")||ue(t,s),o=V(e,"entity")||V(e,"stateEntity")||V(e,"downEntity")||V(e,"upEntity")||V(e,"value")||V(e,"hint")||Bt(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
        <strong>${g(d)}</strong>
        <span class="meta">${g(ue(t,s))}</span>
        <div class="meta">${g(o)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===r-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function Ar(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${g(e)}"
    >
      <strong>${g(ue(t,e))}</strong>
      <span>${g(Bt(e))}</span>
    </button>
  `}function Ur(t,e,a){t[e]=a.entityId;const r=t;String(r.caption||"").trim()||(r.caption=a.name),String(r.hint||"").trim()||(r.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(r.type==="number"||r.type==="percent")&&!String(r.unit||"").trim()&&a.unit&&(r.unit=a.unit)}async function Tr(t){var he;const e=Ya[ce()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const r=document.getElementById("scene-editor-shell");r!=null&&r.contains(a)&&document.body.insertBefore(a,r),r==null||r.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
                ${Re.map(p=>`<option value="${g(p.id)}">${g(p.label[ce()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),d=n.querySelector("[data-preview-canvas]"),o=n.querySelector("[data-preview-resolution]"),c=n.querySelector("[data-preview-display]"),m=n.querySelector("[data-dashboard]");if(!s||!d||!o||!c||!m)throw new Error("Missing native editor shell elements");d.appendChild(a);const i={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:We,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarInspectorPackId:null,avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},f=async p=>{const h=String(p||"").trim();if(!h||!t.avatarPackApiUrl){i.avatarPackDetails=null,i.avatarPackLoading=!1,i.avatarPackDirty=!1;return}i.avatarPackLoading=!0,E();try{i.avatarPackDetails=await Sr(t.avatarPackApiUrl,h),i.avatarPackDirty=!1}catch(u){i.avatarPackDetails=null,i.avatarPackDirty=!1,z(`${e.avatarMappingLoadError}: ${String(u)}`,"bad")}finally{i.avatarPackLoading=!1}},w=()=>{var N;const p=er(i.previewDisplayId),h=Math.max(320,((N=s.parentElement)==null?void 0:N.clientWidth)||s.clientWidth||p.width),u=Math.max(260,Math.min(window.innerHeight*.62,760)),b=Math.min(1,h/p.width,u/p.height),A=Math.round(p.width*b),T=Math.round(p.height*b);c.value=p.id,o.textContent=tr(p),s.style.aspectRatio=`${p.width} / ${p.height}`,s.style.width=`${A}px`,s.style.height=`${T}px`,d.style.width=`${p.width}px`,d.style.height=`${p.height}px`,d.style.transform=`scale(${b})`,a.style.width=`${p.width}px`,a.style.height=`${p.height}px`},y=p=>{i.previewDisplayId=String(p||"").trim()||We,w()},k=p=>{i.pendingAvatarZip=p,i.pendingAvatarZipName=(p==null?void 0:p.name)||"",i.avatarImportStatus="",i.avatarImportTone="muted",E(),p&&x(p)},x=async p=>{if(!(!i.config||!t.avatarImportUrl||i.avatarImporting)){i.pendingAvatarZip=null,i.avatarImporting=!0,i.avatarImportStatus=e.avatarImporting,i.avatarImportTone="muted",E();try{const h=await wr(t.avatarImportUrl,p);i.avatarCatalog=t.avatarCatalogUrl?await ft(t.avatarCatalogUrl):[h],i.avatarInspectorPackId=h.id,await f(h.id),i.pendingAvatarZip=null,i.pendingAvatarZipName="",i.avatarImporting=!1,i.avatarImportStatus=e.avatarImportSuccess(h.name||h.id),i.avatarImportTone="ok",E()}catch(h){i.avatarImporting=!1,i.avatarImportStatus=`${e.avatarImportError}: ${String(h)}`,i.avatarImportTone="bad",E()}}},P=typeof ResizeObserver<"u"?new ResizeObserver(()=>w()):null;P==null||P.observe(s.parentElement||s);let U=null;const W=()=>{const p=i.selectedPageId||"",h=i.selectedCardIndex;for(const u of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete u.dataset.editorSelectedPage;for(const u of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete u.dataset.editorSelectedCard;if(p){const u=a.querySelector(`[data-slide-id="${CSS.escape(p)}"]`);u&&(u.dataset.editorSelectedPage="true")}if(p&&h!==null){const u=`[data-scene-page-id="${CSS.escape(p)}"][data-scene-card-index="${h}"]`,b=a.querySelector(u);b&&(b.dataset.editorSelectedCard="true")}},G=typeof MutationObserver<"u"?new MutationObserver(()=>W()):null;G==null||G.observe(a,{childList:!0,subtree:!0});const E=()=>{const p=i.config,h=p?J(p):[],u=h.find(C=>C.id===i.selectedPageId)||h[0]||null,b=Array.isArray(u==null?void 0:u.cards)?u.cards:[],A=i.selectedCardIndex!==null&&b[i.selectedCardIndex]||null,T=hr(i.haEntities,i.entitySearch),N=i.focusedBinding?e.entityBindingActive(V(b[i.focusedBinding.cardIndex],"caption")||`${e.cards} #${i.focusedBinding.cardIndex+1}`,De(e,i.focusedBinding.field)):e.entityBindingEmpty,I=p?He(p):"",ae=i.avatarInspectorPackId||I,Ie=i.avatarImportStatus?`<div class="scene-editor-status" data-tone="${i.avatarImportTone}">${g(i.avatarImportStatus)}</div>`:"",H=i.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,ee=u?`${u.title||u.id||e.pageSettings} · ${ze(e,u.kind)}`:e.statusLoading;m.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${i.statusTone}">${g(i.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${g(t.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${i.saving||i.avatarPackSaving||!p?" disabled":""}>${i.saving||i.avatarPackSaving?e.saving:e.save}</button>
          <button class="scene-editor-button" type="button" data-action="add-page"${p?"":" disabled"}>${e.addPage}</button>
        </div>
      </div>
      <div class="scene-dashboard-body">
        <div class="scene-settings-stack">
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.avatar}</h2>
              <div class="meta">${e.avatarSubtitle}</div>
            </div>
          ${p?`
            <div class="avatar-pack-box">
              <div class="meta">${H}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${ht(e,i.bundledAvatar,I)}
                ${i.avatarCatalog.map(C=>ht(e,C,I)).join("")}
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
              ${i.pendingAvatarZipName?`<div class="meta">${g(e.avatarImportSelected(i.pendingAvatarZipName))}</div>`:""}
              <div class="meta">${e.avatarImportHint}</div>
              ${Ie}
            </div>
            ${ae?i.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:i.avatarPackDetails?$r(e,i.avatarPackDetails):"":""}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(t.packId)}</div>
              <div class="meta">${e.pageOrderHint}</div>
            </div>
            <div class="page-list">
            ${h.map((C,R)=>`
              <article class="page-chip ${C.id===((u==null?void 0:u.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${g(C.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${g(C.id)}">
                  <strong>${g(C.title||C.id||(ce()==="ru"?`Страница ${R+1}`:`Page ${R+1}`))}</strong>
                  <span class="meta">${g(ze(e,C.kind))} · ${g(e.pageCards(Array.isArray(C.cards)?C.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${g(C.id)}"${R===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${g(C.id)}"${R===h.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${g(C.id)}"${h.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pageSettings}</h2>
              <div class="meta">${g(ee)}</div>
            </div>
          ${u?`
            <div class="inspector-grid">
              ${le(e.fieldPageId,"id",te(u,"id"),!0)}
              ${vt(e.fieldKind,"kind",te(u,"kind"),qa.map(C=>({value:C,label:ze(e,C)})))}
              ${le(e.fieldTitle,"title",te(u,"title"),!0)}
              ${le(e.fieldSubtitle,"subtitle",te(u,"subtitle"),!0)}
              ${le(e.fieldSlot,"slot",te(u,"slot"))}
              ${vt(e.fieldCardStyle,"cardStyle",te(u,"cardStyle")||"full",Ga.map(C=>({value:C,label:C==="mini"?e.styleMini:e.styleFull})))}
              ${le(e.fieldStampCaption,"stampCaption",te(u,"stampCaption"))}
              ${le(e.fieldStampValue,"stampValue",te(u,"stampValue"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="cards">
            <div class="scene-settings-head">
              <h2>${e.cards}</h2>
              <div class="meta">${e.cardsSubtitle}</div>
              <div class="meta">${e.cardOrderHint}</div>
            </div>
          ${u?`
            <div class="card-stack">
              <div>
                <div class="meta">${e.cardTemplates}</div>
                <div class="card-template-grid" style="margin-top:12px;">
                  ${Mt.map(C=>Ar(e,C)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${b.length?b.map((C,R)=>Er(e,C,R,b.length,R===i.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${A?Ir(e,A,i.selectedCardIndex||0,i.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
              </div>
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.displaySettings}</h2>
              <div class="meta">${e.displaySubtitle}</div>
            </div>
          ${p?`
            <div class="inspector-grid">
              ${ne(e.fieldDisplaySafeTop,"safeTop",ie(p,"safeTop"))}
              ${ne(e.fieldDisplaySafeRight,"safeRight",ie(p,"safeRight"))}
              ${ne(e.fieldDisplaySafeBottom,"safeBottom",ie(p,"safeBottom"))}
              ${ne(e.fieldDisplaySafeLeft,"safeLeft",ie(p,"safeLeft"))}
              ${ne(e.fieldDisplayPadding,"layoutPaddingPx",ie(p,"layoutPaddingPx"))}
              ${ne(e.fieldDisplayGap,"layoutGapPx",ie(p,"layoutGapPx"))}
              ${ne(e.fieldDisplayScale,"globalScale",ie(p,"globalScale"))}
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
            ${Pr(e,A,i.selectedCardIndex,i.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${g(i.entitySearch)}">
          </div>
          <div class="ha-list">
            ${T.length?T.map(C=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${g(C.name)}</strong>
                    <div class="meta">${g(C.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${g(C.entityId)}"${i.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${g(C.entityId)}</code>
                <div class="ha-state">${g(C.state)}${C.unit?` · ${g(C.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const F=m.querySelector("[data-avatar-archive]"),Y=m.querySelector("[data-action='choose-avatar-archive']");Y==null||Y.addEventListener("click",()=>{if(!F||F.disabled)return;F.value="";const C=F;try{if(typeof C.showPicker=="function"){C.showPicker();return}}catch{}F.click()}),F==null||F.addEventListener("click",()=>{F.value=""}),F==null||F.addEventListener("change",()=>{var R;const C=((R=F.files)==null?void 0:R[0])||null;k(C),F.value=""});for(const C of Array.from(m.querySelectorAll(".page-chip[data-page-id]")))C.draggable=!0,C.addEventListener("dragstart",R=>{const K=String(C.dataset.pageId||"").trim();U=K?{kind:"page",pageId:K}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),C.addEventListener("dragover",R=>{!U||U.kind!=="page"||(R.preventDefault(),oe(n),C.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),C.addEventListener("drop",R=>{if(!U||U.kind!=="page")return;R.preventDefault();const K=String(C.dataset.pageId||"").trim();K&&ke(U.pageId,K),U=null,oe(n)}),C.addEventListener("dragend",()=>{U=null,oe(n)});for(const C of Array.from(m.querySelectorAll(".card-list-item[data-card-index]")))C.draggable=!0,C.addEventListener("dragstart",R=>{const K=Number(C.dataset.cardIndex||"-1");U=Number.isFinite(K)&&K>=0?{kind:"card",cardIndex:K}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),C.addEventListener("dragover",R=>{!U||U.kind!=="card"||(R.preventDefault(),oe(n),C.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),C.addEventListener("drop",R=>{if(!U||U.kind!=="card")return;R.preventDefault();const K=Number(C.dataset.cardIndex||"-1");Number.isFinite(K)&&K>=0&&Ce(U.cardIndex,K),U=null,oe(n)}),C.addEventListener("dragend",()=>{U=null,oe(n)});w(),W()},z=(p,h)=>{i.status=p,i.statusTone=h,E()},B=()=>{if(!i.config)return;const p=J(i.config);if(!p.length){i.selectedPageId=null;return}(!i.selectedPageId||!p.some(b=>b.id===i.selectedPageId))&&(i.selectedPageId=p[0].id);const h=p.find(b=>b.id===i.selectedPageId)||null,u=Array.isArray(h==null?void 0:h.cards)?h.cards:[];u.length?(i.selectedCardIndex===null||i.selectedCardIndex>=u.length)&&(i.selectedCardIndex=0):(i.selectedCardIndex=null,i.focusedBinding=null),lr(i.selectedPageId),or(ar(i.config,i.selectedPageId))},M=()=>{i.dirty=!0,z(e.statusDirty,"muted")},Q=()=>{const p=new URL(window.location.href);p.searchParams.set("editor","1"),i.selectedPageId&&p.searchParams.set("editorPage",i.selectedPageId),p.searchParams.set("v",String(Date.now())),window.location.replace(p.toString())},we=(p,h)=>{if(!i.config||!i.selectedPageId)return;const u=i.config.pages.find(b=>b.id===i.selectedPageId);if(u){if(p==="slot")u.slot=h===""?void 0:Number(h);else if(p==="id"){const b=Nt(i.config,h||"page"),A=u.id;u.id=b,i.config.rotation.order=i.config.rotation.order.map(T=>T===A?b:T),i.selectedPageId=b}else p==="title"||p==="subtitle"||p==="stampCaption"||p==="stampValue"?u[p]=h:p==="kind"?u.kind=h:p==="cardStyle"&&(u.cardStyle=h);M(),B()}},Se=(p,h)=>{if(!i.config)return;const u=nr(i.config),b=u.safeArea||{},A=h===""?null:Number(h),T=Number.isFinite(A)?A:null;p==="safeTop"?b.top=T??0:p==="safeRight"?b.right=T??0:p==="safeBottom"?b.bottom=T??0:p==="safeLeft"?b.left=T??0:p==="layoutPaddingPx"?u.layoutPaddingPx=T??16:p==="layoutGapPx"?u.layoutGapPx=T??16:p==="globalScale"&&(u.globalScale=T??1),u.safeArea=b,M()},xe=(p,h,u)=>{var T;if(!i.config||!i.selectedPageId)return;const b=i.config.pages.find(N=>N.id===i.selectedPageId);if(!b)return;Array.isArray(b.cards)||(b.cards=[]);const A=b.cards[p];if(A){if(h==="type"){const N=ut(u);if(b.cards[p]={...N,caption:V(A,"caption")||N.caption},((T=i.focusedBinding)==null?void 0:T.cardIndex)===p){const I=gt(u);i.focusedBinding=I?{cardIndex:p,field:I}:null}}else h==="digits"?A[h]=u===""?0:Number(u):A[h]=u;M()}},ke=(p,h)=>{if(!i.config||!p||!h||p===h)return;const u=J(i.config).map(T=>T.id),b=u.indexOf(p),A=u.indexOf(h);b<0||A<0||(u.splice(b,1),u.splice(A,0,p),i.config.rotation.order=u,i.selectedPageId=p,i.selectedCardIndex=0,i.focusedBinding=null,M(),B(),E())},Ce=(p,h)=>{if(!i.config||!i.selectedPageId||p===h)return;const u=i.config.pages.find(A=>A.id===i.selectedPageId);if(!u||!Array.isArray(u.cards)||p<0||h<0||p>=u.cards.length||h>=u.cards.length)return;const[b]=u.cards.splice(p,1);u.cards.splice(h,0,b),i.selectedCardIndex=h,i.focusedBinding=null,M(),E()},$e=p=>{if(!i.config||!i.selectedPageId||!i.focusedBinding)return;const h=i.config.pages.find(A=>A.id===i.selectedPageId),u=i.haEntities.find(A=>A.entityId===p);if(!h||!Array.isArray(h.cards)||!u)return;const b=h.cards[i.focusedBinding.cardIndex];b&&(Ur(b,i.focusedBinding.field,u),M(),E())},Pe=(p,h)=>{i.selectedCardIndex=p,i.focusedBinding={cardIndex:p,field:h},E(),window.requestAnimationFrame(()=>{const u=n.querySelector("#ha-entity-search");u==null||u.scrollIntoView({behavior:"smooth",block:"center"}),u==null||u.focus(),u==null||u.select()})};n.addEventListener("click",async p=>{var ae,Ie;const h=p.target,u=h==null?void 0:h.closest("[data-action]"),b=u==null?void 0:u.dataset.action;if(!b||!i.config)return;const A=J(i.config),T=(u==null?void 0:u.dataset.pageId)||null,N=T?A.findIndex($=>$.id===T):-1;if(b==="select-page"&&T){i.selectedPageId=T,i.selectedCardIndex=0,i.focusedBinding=null,B(),E();return}if(b==="page-up"&&N>0){const $=A.map(H=>H.id);[$[N-1],$[N]]=[$[N],$[N-1]],i.config.rotation.order=$,i.selectedPageId=T,M(),B(),E();return}if(b==="page-down"&&N>=0&&N<A.length-1){const $=A.map(H=>H.id);[$[N],$[N+1]]=[$[N+1],$[N]],i.config.rotation.order=$,i.selectedPageId=T,M(),B(),E();return}if(b==="page-remove"&&T&&A.length>1){i.config.pages=i.config.pages.filter($=>$.id!==T),i.config.rotation.order=J(i.config).map($=>$.id),i.selectedPageId=((ae=J(i.config)[Math.max(0,N-1)])==null?void 0:ae.id)||((Ie=J(i.config)[0])==null?void 0:Ie.id)||null,i.selectedCardIndex=0,i.focusedBinding=null,M(),B(),E();return}if(b==="add-page"){const $=ir(i.config);i.config.pages.push($),i.config.rotation.order=J(i.config).map(H=>H.id),i.selectedPageId=$.id,i.selectedCardIndex=null,i.focusedBinding=null,M(),B(),E();return}if(b==="add-card-template"&&i.selectedPageId){const $=i.config.pages.find(ee=>ee.id===i.selectedPageId),H=(u==null?void 0:u.dataset.cardType)||"entity";if($){Array.isArray($.cards)||($.cards=[]),$.cards.push(ut(H));const ee=$.cards.length-1;i.selectedCardIndex=ee;const F=gt(H);i.focusedBinding=F?{cardIndex:ee,field:F}:null,M(),E(),F&&window.requestAnimationFrame(()=>{const Y=n.querySelector("#ha-entity-search");Y==null||Y.scrollIntoView({behavior:"smooth",block:"center"}),Y==null||Y.focus()})}return}if(b==="focus-binding"){const $=Number((u==null?void 0:u.dataset.cardIndex)||"-1"),H=(u==null?void 0:u.dataset.bindingField)||"";$>=0&&H&&Pe($,H);return}const I=Number((u==null?void 0:u.dataset.cardIndex)||"-1");if(I>=0&&i.selectedPageId){const $=i.config.pages.find(H=>H.id===i.selectedPageId);if(!$||!Array.isArray($.cards))return;if(b==="select-card"){i.selectedCardIndex=I,E();return}if(b==="card-remove"){$.cards=$.cards.filter((H,ee)=>ee!==I),i.selectedCardIndex!==null&&(i.selectedCardIndex===I?i.selectedCardIndex=$.cards.length?Math.min(I,$.cards.length-1):null:i.selectedCardIndex>I&&(i.selectedCardIndex-=1)),i.focusedBinding&&(i.focusedBinding.cardIndex===I?i.focusedBinding=null:i.focusedBinding.cardIndex>I&&(i.focusedBinding={cardIndex:i.focusedBinding.cardIndex-1,field:i.focusedBinding.field})),M(),E();return}if(b==="card-up"&&I>0){[$.cards[I-1],$.cards[I]]=[$.cards[I],$.cards[I-1]],i.selectedCardIndex===I?i.selectedCardIndex=I-1:i.selectedCardIndex===I-1&&(i.selectedCardIndex=I),i.focusedBinding&&(i.focusedBinding.cardIndex===I?i.focusedBinding={cardIndex:I-1,field:i.focusedBinding.field}:i.focusedBinding.cardIndex===I-1&&(i.focusedBinding={cardIndex:I,field:i.focusedBinding.field})),M(),E();return}if(b==="card-down"&&I<$.cards.length-1){[$.cards[I],$.cards[I+1]]=[$.cards[I+1],$.cards[I]],i.selectedCardIndex===I?i.selectedCardIndex=I+1:i.selectedCardIndex===I+1&&(i.selectedCardIndex=I),i.focusedBinding&&(i.focusedBinding.cardIndex===I?i.focusedBinding={cardIndex:I+1,field:i.focusedBinding.field}:i.focusedBinding.cardIndex===I+1&&(i.focusedBinding={cardIndex:I,field:i.focusedBinding.field})),M(),E();return}}if(b==="save"){i.saving=!0,i.avatarPackSaving=i.avatarPackDirty,z(e.saving,"muted");try{if(i.avatarPackDirty&&i.avatarPackDetails&&t.avatarPackApiUrl){try{i.avatarPackDetails=await xr(t.avatarPackApiUrl,i.avatarPackDetails)}catch($){throw new Error(`${e.avatarMappingSaveError}: ${String($)}`)}i.avatarPackDirty=!1}i.config=await ur(t.sceneApiUrl,Xe(i.config)),i.dirty=!1,i.saving=!1,i.avatarPackSaving=!1,B(),z(e.statusSaved,"ok"),window.setTimeout(()=>Q(),250)}catch($){i.saving=!1,i.avatarPackSaving=!1,z(`${e.saveError}: ${String($)}`,"bad")}return}if(b==="bind-entity"){const $=(u==null?void 0:u.dataset.entityId)||"";$e($)}}),n.addEventListener("input",p=>{const h=p.target;if(!h||!i.config){h&&h.dataset.previewDisplay!==void 0&&y(h.value);return}if(h.dataset.previewDisplay!==void 0){y(h.value);return}if(h.dataset.avatarSemantic!==void 0){const u=String(i.avatarInspectorPackId||"").trim()||He(i.config);if(!i.avatarPackDetails||!u||i.avatarPackDetails.packId!==u)return;const b=h.value.trim();b?i.avatarPackDetails.motionMap.semantic[h.dataset.avatarSemantic]=Number(b):delete i.avatarPackDetails.motionMap.semantic[h.dataset.avatarSemantic],i.avatarPackDirty=!0,z(e.statusDirty,"muted"),E();return}if(h.dataset.pageField){we(h.dataset.pageField,h.value),E();return}if(h.dataset.displayField){Se(h.dataset.displayField,h.value),E();return}if(h.dataset.cardField&&h.dataset.cardIndex){i.selectedCardIndex=Number(h.dataset.cardIndex),xe(Number(h.dataset.cardIndex),h.dataset.cardField,h.value),E();return}h.hasAttribute("data-ha-search")&&(i.entitySearch=h.value,E())}),n.addEventListener("click",p=>{var b;const h=(b=p.target)==null?void 0:b.closest("[data-action='select-avatar-pack']");if(!h||!i.config)return;const u=String(h.dataset.packId||"").trim();sr(i.config).packId=u||null,i.avatarInspectorPackId=u||null,M(),f(u||null).finally(()=>E()),E()}),a.addEventListener("click",p=>{if(!i.config)return;const h=p.target,u=h==null?void 0:h.closest("[data-scene-card-index][data-scene-page-id]");if(u){const A=String(u.dataset.scenePageId||"").trim(),T=Number(u.dataset.sceneCardIndex||"-1");A&&Number.isFinite(T)&&T>=0&&(i.selectedPageId=A,i.selectedCardIndex=T,i.focusedBinding=null,B(),E(),mt("cards"));return}const b=h==null?void 0:h.closest("[data-scene-page-id]");if(b){const A=String(b.dataset.scenePageId||"").trim();A&&(i.selectedPageId=A,i.selectedCardIndex=0,i.focusedBinding=null,B(),E(),mt("pages"));return}}),n.addEventListener("change",p=>{var u;const h=p.target;!h||h.dataset.avatarArchive===void 0||k(((u=h.files)==null?void 0:u[0])||null)}),n.addEventListener("focusin",p=>{const h=p.target;if(!(h!=null&&h.dataset.bindingField))return;const u=Number(h.dataset.cardIndex||"-1");u<0||(i.selectedCardIndex=u,i.focusedBinding={cardIndex:u,field:h.dataset.bindingField})});try{if(i.config=await cr(t.sceneApiUrl),t.sceneAvatarManifestUrl)try{i.bundledAvatar=await br(t.sceneAvatarManifestUrl,t.packId)}catch{i.bundledAvatar=null}if(t.avatarCatalogUrl)try{i.avatarCatalog=await ft(t.avatarCatalogUrl)}catch{i.avatarCatalog=[]}i.haEntities=fr(((he=Et())==null?void 0:he.states)||null),i.selectedPageId=dr(i.config),i.selectedCardIndex=0,i.status=e.statusSaved,i.statusTone="ok",i.avatarInspectorPackId=He(i.config)||null,await f(i.avatarInspectorPackId),B()}catch(p){i.status=`${e.loadError}: ${String(p)}`,i.statusTone="bad"}E()}const Lr="../scene-api/bootstrap",Rr="weather.forecast_home_assistant",Dr="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Te="/local/live2d/",yt="/scene-legacy/live2d/",Mr={...Tt,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Nr={...Lt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},Br={...Rt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Fr={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},_r={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:t=>`Pack: ${t||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:t=>`Pack: ${t||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Or(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Hr(){return new URLSearchParams(window.location.search).get("bootstrap")||Lr}function zr(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);if(a)return new URL(a[0],e.origin).toString();for(const r of["/scene-api/","/scene-runtime/","/scene-editor/"]){const n=e.pathname.indexOf(r);if(n>=0)return new URL(e.pathname.slice(0,n+1),e.origin).toString()}return null}function D(t,e){const a=jr(String(t||"").trim(),e);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(e,window.location.href);if(a.startsWith("/")){const n=zr(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,r).toString()}function jr(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Te))return`${yt}${a.slice(Te.length)}`;if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const r=new URL(a,new URL(e,window.location.href));if(r.pathname.startsWith(Te)){const n=r.pathname.slice(Te.length);return D(`${yt}${n}${r.search}${r.hash}`,e)||a}}catch{return a}return a}function Vr(t,e){const a=Ge(t),r=a.adapter==="live2d"?D("../../scene-runtime/avatar.html",e):"",n=D(String(a.assetRoot||"").trim(),e),s=c=>{const m=String(c||"").trim();return m?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(m)||m.startsWith("/")?D(m,e):m:""},d=c=>{const m=String(c||"").trim();return m?D(m,e):""},o=Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([c,m])=>[c,D(String(m||""),e)]).filter(([,c])=>!!c));return{...a,assetRoot:n,runtimeUrl:r||D(String(a.runtimeUrl||"").trim(),e),entry:s(String(a.entry||"").trim()),modelUrl:s(String(a.modelUrl||"").trim()),fallbackPortrait:s(String(a.fallbackPortrait||"").trim()),motionMapUrl:d(String(a.motionMapUrl||"").trim()),presetThumbs:o}}function qe(t,e,a,r){t.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${a}</p>
        ${r?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${r}</pre>`:""}
      </div>
    </section>
  `}function Me(){return new URLSearchParams(window.location.search).get("editor")==="1"}function Wr(){document.body.classList.toggle("ks-display-runtime",!Me()),document.body.classList.toggle("ks-editor-runtime",Me())}function Kr(){if(!Me())return;const t=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),t(),window.addEventListener("pageshow",t,{once:!0}),window.addEventListener("load",t,{once:!0}),window.requestAnimationFrame(()=>{t(),window.setTimeout(t,120)});let e=!1;const a=()=>{e=!0},r=["pointerdown","wheel","touchstart","keydown"];for(const d of r)window.addEventListener(d,a,{once:!0,passive:!0});let n=0;const s=window.setInterval(()=>{if(e||n>=24){window.clearInterval(s);return}t(),n+=1},80)}async function qr(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return a}async function ge(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return e.json()}function Gr(t,e){var a,r,n,s,d,o,c,m,i,f,w,y;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([k,x])=>[k,D(x,e)]).filter(([,k])=>!!k)),avatar:{manifestUrl:D(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:D(String(((r=t.scene)==null?void 0:r.configUrl)||"").trim(),e)},state:{provider:((n=t.state)==null?void 0:n.provider)||"json",stateUrl:D(String(((s=t.state)==null?void 0:s.stateUrl)||"").trim(),e),apiUrl:D(String(((d=t.state)==null?void 0:d.apiUrl)||"").trim(),e)||void 0,haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:D(String(((c=t.state)==null?void 0:c.idleLinesUrl)||"").trim(),e),entityMapUrl:D(String(((m=t.state)==null?void 0:m.entityMapUrl)||"").trim(),e)},control:{provider:((i=t.control)==null?void 0:i.provider)||"json",controlUrl:D(String(((f=t.control)==null?void 0:f.controlUrl)||"").trim(),e),apiUrl:D(String(((w=t.control)==null?void 0:w.apiUrl)||"").trim(),e)||void 0,entityMapUrl:D(String(((y=t.control)==null?void 0:y.entityMapUrl)||"").trim(),e)||void 0}}}async function Jr(t,e){var k,x,P,U,W,G,E,z;const a=D(String(((k=t.files)==null?void 0:k.rendererConfigUrl)||"").trim(),e);if(!a)return"";const r=D(String(((x=t.files)==null?void 0:x.sceneConfigUrl)||"").trim(),e),n=D(String(((P=t.files)==null?void 0:P.avatarCatalogUrl)||"").trim(),e);let s="";if(r&&n)try{const B=await ge(r);s=String(((U=B.avatar)==null?void 0:U.packId)||"").trim()}catch{s=""}let d="";if(s&&n)try{const B=await ge(n),M=Array.isArray(B.items)?B.items.find(Q=>String(Q.id||"").trim()===s):null;d=D(String((M==null?void 0:M.manifestUrl)||"").trim(),e)}catch{d=""}const o=Gr(await ge(a),a);r&&(o.scene={...o.scene||{},configUrl:r});const c=D(String(((W=t.files)==null?void 0:W.haStatesUrl)||"").trim(),e);c&&(o.state={...o.state||{},apiUrl:((G=o.state)==null?void 0:G.apiUrl)||c},o.control={...o.control||{},apiUrl:((E=o.control)==null?void 0:E.apiUrl)||c});const m=d||String(((z=o.avatar)==null?void 0:z.manifestUrl)||"").trim();if(!m)return URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));const i=D(m,e),f=Vr(await ge(i),i),w=URL.createObjectURL(new Blob([JSON.stringify(f)],{type:"application/json"})),y={...o,avatar:{manifestUrl:w}};return URL.createObjectURL(new Blob([JSON.stringify(y)],{type:"application/json"}))}const ye=document.getElementById("app");if(!ye)throw new Error("Missing #app root element");const de=_r[Or()];Wr();Kr();qe(ye,de.startingTitle,de.startingBody);(async()=>{var e,a,r,n,s,d;const t=Hr();try{const o=await qr(t),c=String(o.packId||"").trim(),m=c.toLowerCase()==="neiri",i=await Jr(o,t),f=i?await ge(i):null;if(!i){qe(ye,de.missingRendererTitle,de.missingRendererBody,JSON.stringify(o,null,2));return}document.documentElement.dataset.packId=c,document.title=m?"Нейри":c?`kiosk-scene hosted runtime (${c})`:"kiosk-scene hosted runtime",await Ka(ye,{rendererConfigUrl:i,stateStreamUrl:D(String(((e=o.files)==null?void 0:e.haStatesStreamUrl)||"").trim(),t)||void 0,weatherUrl:m?"./weather.json":void 0,weatherReader:m?Va({weatherEntity:Rr,openMeteoUrl:Dr,locale:"ru-RU",iconBaseUrl:"./assets",apiUrl:String(((a=f==null?void 0:f.state)==null?void 0:a.apiUrl)||"").trim()||void 0,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:m?Mr:void 0,labels:m?Nr:void 0,presetLabels:m?Br:void 0,defaultWeather:m?Fr:void 0}),Me()&&await Tr({packId:c,sceneApiUrl:D(String(o.sceneEditorApiUrl||"").trim(),t),sceneAvatarManifestUrl:D(String(((r=o.files)==null?void 0:r.avatarManifestUrl)||"").trim(),t),avatarCatalogUrl:D(String(((n=o.files)==null?void 0:n.avatarCatalogUrl)||"").trim(),t),avatarImportUrl:D(String(((s=o.files)==null?void 0:s.avatarImportUrl)||"").trim(),t),avatarPackApiUrl:D(String(((d=o.files)==null?void 0:d.avatarPackApiUrl)||"").trim(),t),sceneUrl:D(String(o.entryUrl||o.runtimeBaseUrl||"./").trim(),t)})}catch(o){qe(ye,de.failedTitle,de.failedBody,String(o))}})();
