var Ot=Object.defineProperty;var Ht=(t,e,a)=>e in t?Ot(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var v=(t,e,a)=>Ht(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function T(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function l(t,e=160){const a=String(t??"").replace(/\s+/g," ").trim();return a?a.length<=e?a:`${a.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function it(t){const e=new Date(String(t??""));return Number.isNaN(e.getTime())?0:e.getTime()}function be(t,e){if(!T(t)||!T(e))return e??t;const a={...t};for(const[i,n]of Object.entries(e)){if(Array.isArray(n)){a[i]=n.slice();continue}if(T(n)&&T(a[i])){a[i]=be(a[i],n);continue}a[i]=n}return a}function wt(t,e=40){return Array.isArray(t)?t.map(a=>l(a,e).toLowerCase()).filter(Boolean):[]}const ae={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},rt={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function Ve(t){var a,i,n,s,d,o,c,m,r,f,y,b,$,k;const e=be(ae,T(t)?t:{});return{version:1,assistant:{name:l((a=e.assistant)==null?void 0:a.name,40)||ae.assistant.name,locale:l((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:T(e.links)?Object.fromEntries(Object.entries(e.links).map(([P,U])=>[l(P,64),l(U,1024)]).filter(([P,U])=>P&&U)):{},avatar:{manifestUrl:l((n=e.avatar)==null?void 0:n.manifestUrl,1024)||ae.avatar.manifestUrl},scene:{configUrl:l((s=e.scene)==null?void 0:s.configUrl,1024)||ae.scene.configUrl},state:{provider:((d=e.state)==null?void 0:d.provider)==="ha"?"ha":"json",stateUrl:l((o=e.state)==null?void 0:o.stateUrl,1024)||ae.state.stateUrl,apiUrl:l((c=e.state)==null?void 0:c.apiUrl,1024)||void 0,haApiFallback:((m=e.state)==null?void 0:m.haApiFallback)===!0,idleLinesUrl:l((r=e.state)==null?void 0:r.idleLinesUrl,1024)||ae.state.idleLinesUrl,entityMapUrl:l((f=e.state)==null?void 0:f.entityMapUrl,1024)||void 0},control:{provider:((y=e.control)==null?void 0:y.provider)==="ha"?"ha":"json",controlUrl:l((b=e.control)==null?void 0:b.controlUrl,1024)||ae.control.controlUrl,apiUrl:l(($=e.control)==null?void 0:$.apiUrl,1024)||void 0,entityMapUrl:l((k=e.control)==null?void 0:k.entityMapUrl,1024)||void 0}}}function Je(t){var a,i,n,s,d;const e=be(rt,T(t)?t:{});return{version:1,name:l(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:l(e.assetRoot,1024)||rt.assetRoot,runtimeUrl:l(e.runtimeUrl,1024)||"",entry:l(e.entry,1024)||"",modelUrl:l(e.modelUrl,1024)||"",fallbackPortrait:l(e.fallbackPortrait,1024)||"",motionMapUrl:l(e.motionMapUrl,1024)||"",expressionMapUrl:l(e.expressionMapUrl,1024)||"",presetThumbs:T(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,c])=>[l(o,32),l(c,1024)]).filter(([o,c])=>o&&c)):{},viewPresets:T(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,c])=>l(o,32)&&T(c))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((d=e.capabilities)==null?void 0:d.supportsPointerFocus)===!0}}}const Z={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},zt=["full","torso","head"];function ue(t,e=Date.now()){var o,c,m,r,f,y,b;const a=be(Z,T(t)?t:{}),i={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((o=a.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:l((c=a.page)==null?void 0:c.target,40)||null,until:l((m=a.page)==null?void 0:m.until,64)||null},cue:{cue:l((r=a.cue)==null?void 0:r.cue,32)||null,emotion:l((f=a.cue)==null?void 0:f.emotion,32)||null,motion:l((y=a.cue)==null?void 0:y.motion,32)||null,until:l((b=a.cue)==null?void 0:b.until,64)||null}},n=l(a.viewPreset,16).toLowerCase();i.viewPreset=zt.includes(n)?n:null;const s=it(i.page.until);i.page.mode==="pinned"&&(i.page.target?i.page.until&&(!s||s<=e)&&(i.page={mode:"auto",target:null,until:null}):i.page={mode:"auto",target:null,until:null});const d=it(i.cue.until);return i.cue.until&&(!d||d<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function Be(t,e,a=Date.now()){return ue(be(ue(t,a),T(e)?e:{}),a)}function jt(t,e,a=Date.now()){return ue({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function Vt(t,e,a=3e4,i=Date.now()){const n=l(e,40),s=new Date(i+Math.max(5e3,Number(a)||0)).toISOString();return ue({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},i)}function St(t,e){var d,o,c;const a={...t||{}},i=l((d=e==null?void 0:e.cue)==null?void 0:d.cue,32),n=l((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),s=l((c=e==null?void 0:e.cue)==null?void 0:c.motion,32);return i&&(a.cue=i),n&&(a.emotion=n),s&&(a.motion=s),a}function Fe(t){const e=l(t,64).toLowerCase();return e==="page"||/^page\s+\d+$/.test(e)}function xt(t){if(!T(t))return!1;const e=["entity","stateEntity","downEntity","upEntity"];for(const a of e)if(typeof t[a]=="string"&&l(t[a],255))return!0;for(const[a,i]of Object.entries(t))if(!(a==="type"||a==="caption"||a==="hint"||a==="onText"||a==="offText")&&(typeof i=="string"&&l(i,255)||typeof i=="number"&&Number.isFinite(i)||typeof i=="boolean"))return!0;return!1}function Wt(t,e){if(t.kind==="overview"||t.kind==="forecast+cards"||(Array.isArray(t.cards)?t.cards.filter(o=>xt(o)):[]).length>0)return!0;const i=l(t.title,64),n=l(t.subtitle||"",140),s=l(t.stampCaption||"",32),d=l(t.stampValue||"",32);return n||d?!0:!i||Fe(i)||Fe(t.id)||e>=1&&i===`Page ${e+1}`?!1:!Fe(s)}function _(t,e){const a=Number(t);return Number.isFinite(a)?Math.max(0,a):e}function We(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function Ye(t){return T(t)&&T(t.config)?t.config:t}function kt(t,e){const a=e.map(n=>t.find(s=>s.id===n)).filter(Boolean),i=t.filter(n=>!a.some(s=>s.id===n.id));return a.concat(i)}function Kt(t,e){const a={...t};return T(e)&&(typeof e.id=="string"&&(a.id=l(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(i=>T(i)))),a}function qt(t,e){const a=Ye(t),i=Array.isArray(e.pages)?e.pages.slice():[],n=T(a)&&Array.isArray(a.pages)?a.pages:[],s=i.map(b=>{const $=n.find(P=>l(T(P)?P.id:"",40)===b.id),k=Kt(b,$);return Array.isArray(k.cards)&&(k.cards=k.cards.filter(P=>xt(P))),k}).filter((b,$)=>Wt(b,$)),d=T(a)&&T(a.rotation)?a.rotation:{},o=T(e.display)?e.display:{},c=T(a)&&T(a.display)?a.display:{},m=T(o.safeArea)?o.safeArea:{},r=T(c.safeArea)?c.safeArea:{},f=Array.isArray(d.order)?d.order:e.rotation.order,y=wt(f).filter((b,$,k)=>s.some(P=>P.id===b)&&k.indexOf(b)===$);return{version:1,rotation:{order:y.length?y:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(d.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:_(r.top,_(m.top,0)),right:_(r.right,_(m.right,0)),bottom:_(r.bottom,_(m.bottom,0)),left:_(r.left,_(m.left,0))},layoutPaddingPx:_(c.layoutPaddingPx,_(o.layoutPaddingPx,16)),layoutGapPx:_(c.layoutGapPx,_(o.layoutGapPx,16)),globalScale:We(c.globalScale,We(o.globalScale,1))},pages:s}}function Gt(t,e){var s;const a=qt(t,e),i=Ye(t),n=T(i)&&T(i.avatar)?{packId:typeof i.avatar.packId=="string"&&l(i.avatar.packId,120)||null}:{packId:typeof((s=e.avatar)==null?void 0:s.packId)=="string"&&l(e.avatar.packId,120)||null};return{version:1,kind:"scene.display",rotation:{order:a.rotation.order.slice(),defaultDwellMs:a.rotation.defaultDwellMs},display:{safeAreaPx:{...a.display.safeAreaPx},layoutPaddingPx:a.display.layoutPaddingPx,layoutGapPx:a.display.layoutGapPx,globalScale:a.display.globalScale},avatar:n,pages:kt(a.pages,a.rotation.order)}}function Jt(t){return T(t)&&t.kind==="scene.display"&&Number(t.version)===1&&T(t.rotation)&&Array.isArray(t.pages)&&T(t.display)&&T(t.display.safeAreaPx)}function Yt(t){var d,o;const e=Array.isArray(t.pages)?t.pages.filter(c=>T(c)):[],a=Array.isArray((d=t.rotation)==null?void 0:d.order)?t.rotation.order:e.map(c=>c.id),i=wt(a).filter((c,m,r)=>e.some(f=>f.id===c)&&r.indexOf(c)===m),n=t.display.safeAreaPx,s=T(t.avatar)?{packId:typeof t.avatar.packId=="string"&&l(t.avatar.packId,120)||null}:{packId:null};return{version:1,kind:"scene.display",rotation:{order:i.length?i:e.map(c=>c.id),defaultDwellMs:Math.max(5e3,Number((o=t.rotation)==null?void 0:o.defaultDwellMs)||18e3)},display:{safeAreaPx:{top:_(n.top,0),right:_(n.right,0),bottom:_(n.bottom,0),left:_(n.left,0)},layoutPaddingPx:_(t.display.layoutPaddingPx,16),layoutGapPx:_(t.display.layoutGapPx,16),globalScale:We(t.display.globalScale,1)},avatar:s,pages:kt(e,i)}}function Zt(t,e){if(Jt(t))return Yt(t);const a=Ye(t);if(!T(a))throw new Error("Scene runtime config must be a JSON object.");return Gt(a,a)}function Xt(t,e=220){const a=l(t,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},n=a.replace(/\[(emotion|activity|cue|motion|page|preset|view|size)\s*:\s*([a-z0-9_-]+)\]/gi,(s,d,o)=>{const c=l(d,16).toLowerCase(),m=l(o,32).toLowerCase();return(c==="emotion"||c==="activity"||c==="cue"||c==="motion")&&m&&(i[c]=m)," "});return{text:l(n,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const $t={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function pe(t,e={}){const a=T(t)?t:{},i={...$t,...e};return{version:1,assistant:l(a.assistant??i.assistant,40),online:typeof a.online=="boolean"?a.online:i.online,busy:typeof a.busy=="boolean"?a.busy:i.busy,status:l(a.status??i.status,255),message:l(a.message??i.message,255),source:l(a.source??i.source,64),updatedAt:l(a.updatedAt??i.updatedAt,64),emotion:l(a.emotion??i.emotion,32)||null,activity:l(a.activity??i.activity,32)||null,cue:l(a.cue??i.cue,32)||null,intensity:Qt(a.intensity??i.intensity),speaking:typeof a.speaking=="boolean"?a.speaking:!!i.speaking,motion:l(a.motion??i.motion,32)||null,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):i.revision,event:l(a.event??i.event,64)}}function Qt(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function ea(t,e){return t.order[e]||t.order[0]||""}function ta(t,e){const a=t.order.findIndex(i=>i===e);return a>=0?a:0}function aa(t,e,a,i){const n=Array.isArray(t.order)?t.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let d=1;d<=n.length;d+=1){const o=(s+d*a+n.length)%n.length;if(i(n[o]))return o}return s}function ia(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],i=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=t.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:ta(t.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(t.force){const d=ea(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(d)?t.activeIndex:Math.max(0,a.findIndex(c=>t.isEligible(c))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<i)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let s=t.activeIndex;for(let d=1;d<=a.length;d+=1){const o=(t.activeIndex+d)%a.length;if(t.isEligible(a[o])){s=o;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const Ct={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},ra=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function nt(t){const e=l(t,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:ra.some(a=>e.includes(a)):!1}function na(t,e){const a=pe(t),i=l(a.status,72),n=l(a.message,220);if(!(a.online!==!1&&(nt(i)||nt(n))))return{state:a,hasTechnicalFailure:!1};const o=l(a.emotion,32).toLowerCase(),c=l(a.motion,32).toLowerCase();return{state:{...a,busy:!1,status:l(e==null?void 0:e.healthyStatus,72),message:"",emotion:o==="error"?"calm":o||null,activity:l(a.activity,32).toLowerCase()==="error"?"idle":l(a.activity,32)||null,cue:l(a.cue,32)||null,intensity:a.intensity??null,speaking:!1,motion:c==="error"?"idle_soft":c||null},hasTechnicalFailure:!0}}function sa(t,e){const a=(e==null?void 0:e.copy)??Ct,i=pe(t),n=Xt(i.message,220),s=na({...i,message:n.text,emotion:l(i.emotion,32)||n.emotion||null,activity:l(i.activity,32)||n.activity||null,cue:l(i.cue,32)||n.cue||null,motion:l(i.motion,32)||n.motion||null},{healthyStatus:a.technicalHealthyLabel}),d=s.state,o=l(d.message,180),c=l(d.activity,32).toLowerCase(),m=d.online!==!1&&c!=="offline",r=!!d.busy||c==="thinking"||c==="busy"||c==="acting",f=d.speaking===!0||c==="speaking",y=m?r?a.busyLabel:o||f?a.speakingLabel:s.hasTechnicalFailure?a.technicalHealthyLabel:a.idleLabel:a.offlineLabel,b=o?a.messageCaption:s.hasTechnicalFailure?a.statusCaption:a.modeCaption,$=o||(m?r?a.busyBody:l(e==null?void 0:e.idleMonologue,220)||a.idleBody:a.offlineBody);return{state:d,hasTechnicalFailure:s.hasTechnicalFailure,caption:b,label:y,body:$,bodyKey:[b,y,$].join(":")}}function oa(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function st(t,e=-1){const a=Array.isArray(t)?t.map(n=>l(n,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*a.length);return a.length>1&&i===e&&(i=(i+1)%a.length),{line:a[i],index:i}}function la(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),i=!!l(t==null?void 0:t.message,180);return e&&!a&&!i}const da={cue:null,emotion:null,motion:null,until:null},ca={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0},ua=15e3;function pa(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Pt(t){return t.endsWith("/")?t:`${t}/`}function It(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function Ee(t,e){const a=l(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;if(a.startsWith("/")){const n=It(t||window.location.href);if(n)return new URL(a.slice(1),n).toString();const s=new URL(window.location.href).origin;return new URL(a,s).toString()}const i=new URL(Pt(l(t,1024)||"."),window.location.href);return new URL(a,i).toString()}function Te(t){const e=l(t,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const a=It(window.location.href);return a?new URL(e.slice(1),a).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function fa(t,e,a){const i=l(t.runtimeUrl,1024)||l(e.runtimeUrl,1024);return i?Te(i):new URL("../avatar.html",new URL(Pt(l(a,1024)||"."),window.location.href)).toString()}function ha(t,e){const a=l(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function ma(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"Поднимаю рендер аватара…":"Loading compatibility renderer..."}function Et(t){return String(t||navigator.language||"").toLowerCase().startsWith("ru")?"Ассистент":"Assistant"}function ga(t,e){const a=String(t||navigator.language||"").toLowerCase(),i=l(e,40)||Et(a);return a.startsWith("ru")?`${i}: аватар`:`${i} avatar`}function va(t,e){const a=new URL(t,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0),i.externalState==null&&(i.externalState=!0);for(const[n,s]of Object.entries(i)){const d=l(n,64);if(!d||s==null)continue;const o=typeof s=="boolean"?s?"1":"0":String(s);a.searchParams.set(d,o)}return a.toString()}function ot(t,e,a){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[l(n,32),Ee(a,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:l(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([n,s])=>[l(n,64),Te(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Te(t.state.stateUrl),idleLinesUrl:Te(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:Ee(a,l(e.modelUrl,1024)||l(e.entry,1024)),fallbackPortrait:Ee(a,e.fallbackPortrait||""),motionMapUrl:Ee(a,e.motionMapUrl||""),presetThumbs:i}}}class ya{constructor(e={}){v(this,"id","live2d");v(this,"options");v(this,"manifest");v(this,"rendererConfig");v(this,"host",null);v(this,"containerEl",null);v(this,"iframeEl",null);v(this,"splashEl",null);v(this,"splashTextEl",null);v(this,"assetRoot","");v(this,"rendererConfigBlobUrl","");v(this,"currentState");v(this,"currentCue",{...da});v(this,"currentPreset","full");v(this,"currentBubble",{...ca});v(this,"targetOrigin","*");v(this,"isReady",!1);v(this,"bubbleRevision",0);v(this,"readyTimeoutHandle",null);v(this,"handleWindowMessage",e=>{var n;const a=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!a||e.source!==a||!pa(e.data))return;const i=l(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.clearReadyTimeout(),this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Je({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Ve(e.rendererConfig||{}),this.currentState=pe({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=l(e.assetRoot,1024)||this.manifest.assetRoot;const a=fa(this.options,this.manifest,this.assetRoot),i={...this.options.query||{}};try{if(new URL(a,window.location.href).origin===window.location.origin){const m=ot(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(m)],{type:"application/json"})),i.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const n=va(a,{...this.options,query:i});this.targetOrigin=ha(n,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const d=document.createElement("iframe");d.className="ks-live2d-iframe",d.src=n,d.title=l(this.options.iframeTitle,80)||ga(this.rendererConfig.assistant.locale||"",this.rendererConfig.assistant.name),d.loading="eager",d.allow="autoplay",Object.assign(d.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),l(this.options.iframeSandbox,255)&&d.setAttribute("sandbox",l(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);s.append(d,o),this.host.append(s),d.addEventListener("load",()=>{this.armReadyTimeout(),this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=d,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.clearReadyTimeout(),this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=pe(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:l(e==null?void 0:e.cue,32)||null,emotion:l(e==null?void 0:e.emotion,32)||null,motion:l(e==null?void 0:e.motion,32)||null,until:l(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const i=l(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=l(this.rendererConfig.assistant.name,40)||Et(this.rendererConfig.assistant.locale||""),Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent=ma(),Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(n,s),a.append(i),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}clearReadyTimeout(){this.readyTimeoutHandle!=null&&(window.clearTimeout(this.readyTimeoutHandle),this.readyTimeoutHandle=null)}armReadyTimeout(){this.clearReadyTimeout(),this.readyTimeoutHandle=window.setTimeout(()=>{this.isReady||(console.warn("Live2D iframe did not report ready in time; hiding splash guard."),this.setSplashVisible(!1))},ua)}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:ot(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=St(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const a=(i=this.iframeEl)==null?void 0:i.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function ba(t={}){return new ya(t)}const wa={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},lt={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Sa{constructor(e={}){v(this,"id","static");v(this,"options");v(this,"host",null);v(this,"frameEl",null);v(this,"imageEl",null);v(this,"bubbleEl",null);v(this,"fallbackEl",null);v(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(i,n,s),this.host.append(a),this.frameEl=a,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=n;const d=this.resolveImageUrl(e.assetRoot);d&&(i.src=d,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||lt,i=a[e]||a.full||lt.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return wa}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const i=e.replace(/\/+$/,""),n=a.replace(/^\.?\//,"");return i?`${i}/${n}`:n}}function xa(t={}){return new Sa(t)}function ka(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function At(){var t;for(const e of ka())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),i=a==null?void 0:a.hass;if(i!=null&&i.states)return i}catch{continue}return null}function $a(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return l(e==null?void 0:e.access_token,4096)}catch{return""}}function Ut(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const i=l(a.entity_id,255);i&&(e[i]=a)}return e}function Ca(t,e,a="Assistant"){const i=t[e.status],n=t[e.message],s=t[e.online],d=t[e.busy],o=t[e.source],c=t[e.updatedAt],m=e.emotion?t[e.emotion]:null,r=e.activity?t[e.activity]:null,f=e.cue?t[e.cue]:null,y=e.speaking?t[e.speaking]:null,b=e.intensity?t[e.intensity]:null,$=e.motion?t[e.motion]:null,k=t[e.revision];if(!i&&!n&&!s&&!d)return null;const P=l(i==null?void 0:i.state,72),U=l(n==null?void 0:n.state,220),W=l(c==null?void 0:c.state,64),G=_e(s,!0),E=_e(d,!1),O=l(r==null?void 0:r.state,32)||"",M=_e(y)??O==="speaking",X=O||(G?M?"speaking":E?"thinking":"idle":"offline");return pe({version:1,assistant:l(a,40)||"Assistant",online:G,busy:E,status:P&&P!=="unknown"&&P!=="unavailable"?P:"",message:U&&U!=="unknown"&&U!=="unavailable"?U:"",source:l(o==null?void 0:o.state,64)||"ha",updatedAt:W&&W!=="unknown"&&W!=="unavailable"?W:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:l(m==null?void 0:m.state,32)||null,activity:X,cue:l(f==null?void 0:f.state,32)||null,intensity:Aa(b),speaking:M,motion:l($==null?void 0:$.state,32)||null,revision:Number(k==null?void 0:k.state)||0})}const Pa=["full","torso","head"];function Ia(t){const e=l(t==null?void 0:t.state,16).toLowerCase();return Pa.includes(e)?e:null}function Ea(t,e){const a=e.viewPreset?t[e.viewPreset]:null,i=e.pageMode?t[e.pageMode]:null,n=e.pageTarget?t[e.pageTarget]:null,s=e.pageUntil?t[e.pageUntil]:null,d=e.cue?t[e.cue]:null,o=e.emotion?t[e.emotion]:null,c=e.motion?t[e.motion]:null,m=e.cueUntil?t[e.cueUntil]:null,r=e.revision?t[e.revision]:null;if(!a&&!i&&!n&&!d&&!o&&!c)return null;const f=l(n==null?void 0:n.state,40)||null,y=l(s==null?void 0:s.state,64)||null,b=l(i==null?void 0:i.state,16).toLowerCase(),$=b==="auto"?"auto":b==="pinned"||f||y?"pinned":"auto";return ue({...Z,revision:Number(r==null?void 0:r.state)||0,viewPreset:Ia(a),page:{mode:$,target:$==="pinned"?f:null,until:$==="pinned"?y:null},cue:{cue:l(d==null?void 0:d.state,32)||null,emotion:l(o==null?void 0:o.state,32)||null,motion:l(c==null?void 0:c.state,32)||null,until:l(m==null?void 0:m.state,64)||null}})}function _e(t,e){const a=l(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function Aa(t){const e=l(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function Lt(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),i=Math.max(6e4,t.authCooldownMs??600*1e3),n=l(t.apiUrl,4096);let s=null,d=0,o=null,c=0;async function m(){var $;const r=At();if(r!=null&&r.states)return r.states;const f=Date.now();if(s&&f-d<a||!n&&!t.allowApiFallback||typeof e!="function"||f<c)return s;if(o)return o;const y=n?"":l((($=t.readToken)==null?void 0:$.call(t))??$a(),4096);if(!n&&!y)return s;const b={};return y&&(b.Authorization=`Bearer ${y}`),o=e(n||"/api/states",{cache:"no-store",headers:b}).then(async k=>{if(!k.ok){const P=new Error(`HA states HTTP ${k.status}`);throw P.status=k.status,P}return k.json()}).then(k=>{const P=Ut(k);return P&&(s=P,d=Date.now()),P||s}).catch(k=>(((k==null?void 0:k.status)===401||(k==null?void 0:k.status)===403)&&(c=Date.now()+i),s)).finally(()=>{o=null}),o}return{id:"ha-states",async read(){return m()}}}async function Ze(t){const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=l(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const i=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await e(i.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return t.sanitize?t.sanitize(s):s}catch(n){if(t.defaultValue!==void 0)return t.defaultValue;throw n}}function Ua(t){return{id:"json-state",async read(){const e=await Ze({...t,defaultValue:t.defaultValue});return pe(e)}}}function La(t){return{id:"json-control",async read(){const e=await Ze({...t,defaultValue:t.defaultValue??Z});return ue(e)}}}function Ta(t){return{id:"json-lines",async read(){const e=await Ze({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>l(a,220)).filter(Boolean):[]}}}function j(t,e,a=64){return l(t[e],a)}function me(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Ra(t,e="en-US"){const a=l(t,64);if(!a)return"";const i=new Date(a);return Number.isNaN(i.getTime())?a:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ae(t,e){return!t||!e?null:t[e]||null}function Da(t,e=null,a="en-US"){var f,y,b,$;const i=j(t,"caption",40)||j(t,"type",24)||"Card",n=j(t,"hint",72),s=j(t,"type",32).toLowerCase()||"entity",d=j(t,"entity",255),o=Ae(e,d),c=Ae(e,j(t,"stateEntity",255)),m=Ae(e,j(t,"downEntity",255)),r=Ae(e,j(t,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:j(t,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const k=Number(o==null?void 0:o.state);return!Number.isFinite(k)||k<=0?{caption:i,value:"Clear",hint:n||"nothing pending"}:{caption:i,value:`${k} item${k===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const k=(o==null?void 0:o.state)==="on";return{caption:i,value:k?j(t,"onText",48)||"On":j(t,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const k=me(o==null?void 0:o.state,0);return{caption:i,value:k?`${k}%`:"—",hint:l(c==null?void 0:c.state,48)||n||"battery level"}}if(s==="network"){const k=me(m==null?void 0:m.state,0),P=me(r==null?void 0:r.state,0);return{caption:i,value:k||P?`↓ ${k||"0"} · ↑ ${P||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:i,value:Ra(o==null?void 0:o.state,a)||"—",hint:n||"next event"};if(s==="percent"){const k=me(o==null?void 0:o.state,Number(j(t,"digits",4))||0);return{caption:i,value:k?`${k}%`:"—",hint:n||l((f=o==null?void 0:o.attributes)==null?void 0:f.friendly_name,48)||"state percentage"}}if(s==="number"){const k=Number(j(t,"digits",4))||0,P=me(o==null?void 0:o.state,k),U=j(t,"unit",16)||l((y=o==null?void 0:o.attributes)==null?void 0:y.unit_of_measurement,16);return{caption:i,value:P?`${P}${U?` ${U}`:""}`:"—",hint:n||l((b=o==null?void 0:o.attributes)==null?void 0:b.friendly_name,48)||"numeric value"}}return{caption:i,value:l(o==null?void 0:o.state,64)||j(t,"value",64)||"—",hint:n||l(($=o==null?void 0:o.attributes)==null?void 0:$.friendly_name,48)||"entity state"}}function dt(t,e=null,a="en-US"){return Array.isArray(t)?t.map(i=>Da(i,e,a)):[]}const Tt={...Ct,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Rt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},Dt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Ma={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},ve={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function S(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Xe(t){return t.endsWith("/")?t:`${t}/`}function Na(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function H(t,e){const a=l(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(t,window.location.href);if(a.startsWith("/")){const n=Na(i.toString());return n?new URL(a.slice(1),n).toString():new URL(a,i.origin).toString()}return new URL(a,i).toString()}function Mt(t){try{return new URL(".",t).toString()}catch{return new URL(".",window.location.href).toString()}}function Ba(t,e){const a=Mt(e),i=H(a,l(t.assetRoot,1024)||"./assets"),n=i?Xe(i):a,s=d=>{const o=l(d,1024);return o?H(n,o):""};return{...t,assetRoot:i,runtimeUrl:H(a,t.runtimeUrl||""),entry:s(t.entry||""),modelUrl:s(t.modelUrl||""),fallbackPortrait:s(t.fallbackPortrait||""),motionMapUrl:s(t.motionMapUrl||""),expressionMapUrl:s(t.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([d,o])=>[d,H(a,o)]).filter(([,d])=>!!d))}}function Oe(t){return{...ve,...t||{},metrics:{...ve.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)&&t.forecast.length?t.forecast.map(e=>({...e})):ve.forecast.map(e=>({...e}))}}function He(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function q(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const i=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function Fa(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=l(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${q(a)} мм рт. ст.`:`${q(a*.750061683,0)} мм рт. ст.`}function _a(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=l(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${q(a,1)} м/с`:i==="km/h"||i==="км/ч"?`${q(a/3.6,1)} м/с`:`${q(a,1)} м/с`}function Oa(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ha(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function za(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function ja(t,e="ru-RU"){const a=l(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||l(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function ct(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function Va(t,e="./assets/icons"){const a=Number(t),i=Xe(e);return a===0?`${i}sun.svg`:[1,2].includes(a)?`${i}cloud-sun.svg`:[3].includes(a)?`${i}cloud.svg`:[45,48].includes(a)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${i}cloud-snow.svg`:[95,96,99].includes(a)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function Wa(t){const e=l(t.locale,32)||"ru-RU",a=l(t.iconBaseUrl,1024)||"./assets/icons",i=Lt({allowApiFallback:t.allowApiFallback,apiUrl:t.apiUrl,fetchImpl:t.fetchImpl});return async()=>{var $,k,P,U,W,G,E,O,F,M,X,we,Se,xe,ke,$e,Ce,Pe,fe,p;const n=await i.read(),s=t.fetchImpl??globalThis.fetch,d=n==null?void 0:n[t.weatherEntity];let o=null;const c=l(t.openMeteoUrl,4096);if(c&&typeof s=="function")try{const h=await s(`${c}${c.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});h.ok&&(o=await h.json())}catch{o=null}if(!d&&!(o!=null&&o.current))return null;const m=l(d==null?void 0:d.last_changed,64)||l(($=o==null?void 0:o.current)==null?void 0:$.time,64)||new Date().toISOString(),r=d?ja(d.state,e):ct((k=o==null?void 0:o.current)==null?void 0:k.weather_code,e),f=Array.isArray((P=o==null?void 0:o.daily)==null?void 0:P.time)?o.daily.time.map((h,u)=>{var A,L,N,I,te;const w=new Date(`${h}T12:00:00+03:00`);return{name:w.toLocaleDateString(e,{weekday:"short"}),dayNumber:w.toLocaleDateString(e,{day:"numeric"}),monthShort:w.toLocaleDateString(e,{month:"short"}),note:l(ct((A=o.daily.weather_code)==null?void 0:A[u],e),28),max:`${q((L=o.daily.temperature_2m_max)==null?void 0:L[u])}°`,min:`${q((N=o.daily.temperature_2m_min)==null?void 0:N[u])}° · ${q((I=o.daily.precipitation_probability_max)==null?void 0:I[u])}%`,icon:Va((te=o.daily.weather_code)==null?void 0:te[u],a)}}):[],y=f[0]||null,b=f.slice(1,6);return{todayValue:Ha(m,e),todayLabel:za(m,e),updatedAt:Oa(m,e),temperature:q(((U=d==null?void 0:d.attributes)==null?void 0:U.temperature)??((W=o==null?void 0:o.current)==null?void 0:W.temperature_2m),1),condition:r,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${q(((G=d==null?void 0:d.attributes)==null?void 0:G.apparent_temperature)??((E=o==null?void 0:o.current)==null?void 0:E.apparent_temperature)??((O=d==null?void 0:d.attributes)==null?void 0:O.temperature),1)}°C`,badgeSummary:r,badgeRange:y?`${y.max} / ${q((M=(F=o==null?void 0:o.daily)==null?void 0:F.temperature_2m_min)==null?void 0:M[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${q(((X=d==null?void 0:d.attributes)==null?void 0:X.humidity)??((we=o==null?void 0:o.current)==null?void 0:we.relative_humidity_2m))}%`,pressure:Fa(((Se=d==null?void 0:d.attributes)==null?void 0:Se.pressure)??((xe=o==null?void 0:o.current)==null?void 0:xe.surface_pressure),((ke=d==null?void 0:d.attributes)==null?void 0:ke.pressure_unit)??"hPa"),wind:_a((($e=d==null?void 0:d.attributes)==null?void 0:$e.wind_speed)??((Ce=o==null?void 0:o.current)==null?void 0:Ce.wind_speed_10m),((Pe=d==null?void 0:d.attributes)==null?void 0:Pe.wind_speed_unit)??"km/h"),clouds:`${q(((fe=d==null?void 0:d.attributes)==null?void 0:fe.cloud_coverage)??((p=o==null?void 0:o.current)==null?void 0:p.cloud_cover))}%`},forecast:b}}}class Ka{constructor(e,a={}){v(this,"root");v(this,"options");v(this,"avatarMountEl");v(this,"carouselShellEl");v(this,"carouselTrackEl");v(this,"dotsEl");v(this,"presetButtons");v(this,"copy");v(this,"labels");v(this,"presetLabels");v(this,"rendererConfig");v(this,"avatarManifest");v(this,"sceneConfig");v(this,"sceneRuntimeConfig");v(this,"entityMap",null);v(this,"controlEntityMap",null);v(this,"haStatesReader",null);v(this,"weatherData");v(this,"hassStates",null);v(this,"currentState");v(this,"remoteControl",Z);v(this,"uiControl",Z);v(this,"currentControl",Z);v(this,"idleLines",[]);v(this,"activeIndex",0);v(this,"lastAutoRotateAt",0);v(this,"currentIdleLine","");v(this,"lastIdleIndex",-1);v(this,"currentPreset","full");v(this,"idleTimer",null);v(this,"avatarAdapter",null);v(this,"refreshIntervalHandle",null);v(this,"stateStream",null);v(this,"orderedPages",[]);v(this,"carouselDragState",null);v(this,"lastPageStructureKey","");v(this,"lastCarouselRenderKey","");v(this,"slideMarkupCache",new Map);v(this,"lastDotsMarkup","");v(this,"lastAvatarStateKey","");v(this,"lastAvatarCueKey","");v(this,"lastAvatarBubbleKey","");v(this,"lastAvatarPreset","");this.root=e,this.options=a,this.copy={...Tt,...a.copy||{}},this.labels={...Rt,...a.labels||{}},this.presetLabels={...Dt,...a.presetLabels||{}},this.weatherData=Oe(a.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=H(window.location.href,this.getRendererConfigUrl()),a=Mt(e),i=Ve(await this.readJson(e)),n=Ve({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([d,o])=>[d,H(a,o)])),avatar:{...i.avatar,manifestUrl:H(a,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:H(a,i.scene.configUrl)},state:{...i.state,stateUrl:H(a,i.state.stateUrl),apiUrl:i.state.apiUrl?H(a,i.state.apiUrl):void 0,idleLinesUrl:H(a,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?H(a,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:H(a,i.control.controlUrl),apiUrl:i.control.apiUrl?H(a,i.control.apiUrl):void 0,entityMapUrl:i.control.entityMapUrl?H(a,i.control.entityMapUrl):void 0}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=Ba(Je(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.sceneRuntimeConfig=Zt(this.sceneConfig),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await Ta({url:this.rendererConfig.state.idleLinesUrl||H(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=Be(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.connectStateStream()||(this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??1e4))}async dispose(){var e,a;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null,(a=this.stateStream)==null||a.close(),this.stateStream=null}getRendererConfigUrl(){return l(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return l(this.options.weatherUrl,1024)||"./weather.json"}getStateStreamUrl(){return l(this.options.stateStreamUrl,2048)}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=jt(this.uiControl,a||"full"),this.refresh()})}bindCarouselControls(){let e=0,a=0,i=0;const n=(f,y,b,$)=>this.orderedPages.length<2||this.isCarouselInteractiveTarget($)?!1:(this.carouselDragState={pointerId:f,startX:y,startY:b,deltaX:0,deltaY:0,locked:!1},!0),s=(f,y,b)=>{if(!this.carouselDragState||f!==this.carouselDragState.pointerId)return!1;if(this.carouselDragState.deltaX=y-this.carouselDragState.startX,this.carouselDragState.deltaY=b-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return!1;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX))return this.clearDragState(f,!1),!1;this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}return this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX}),!0},d=f=>{if(!this.carouselDragState||f!==this.carouselDragState.pointerId)return;const{locked:y,deltaX:b}=this.carouselDragState,$=this.carouselShellEl.clientWidth||1,k=y&&Math.abs(b)>=$*.16,P=b<0?1:-1;if(this.clearDragState(f,!1),k){this.stepPage(P);return}this.updateCarouselPosition()},o=()=>Date.now()-e>500&&Date.now()-i>500,c=()=>Date.now()-e>500&&Date.now()-a>500;this.carouselShellEl.addEventListener("keydown",f=>{if(f.key==="ArrowLeft"){f.preventDefault(),this.stepPage(-1);return}f.key==="ArrowRight"&&(f.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",f=>{var y,b;f.button!==0||f.pointerType==="mouse"&&Date.now()-a<500||(e=Date.now(),n(f.pointerId,f.clientX,f.clientY,f.target)&&(f.preventDefault(),(b=(y=this.carouselShellEl).setPointerCapture)==null||b.call(y,f.pointerId)))}),this.carouselShellEl.addEventListener("pointermove",f=>{!this.carouselDragState||f.pointerId!==this.carouselDragState.pointerId||(e=Date.now(),s(f.pointerId,f.clientX,f.clientY)&&f.preventDefault())});const m=f=>{e=Date.now(),d(f.pointerId)};this.carouselShellEl.addEventListener("pointerup",m),this.carouselShellEl.addEventListener("pointercancel",m),this.carouselShellEl.addEventListener("lostpointercapture",m),this.carouselShellEl.addEventListener("touchstart",f=>{var b;if(!o())return;const y=(b=f.changedTouches)==null?void 0:b[0];y&&n(`touch-${y.identifier}`,y.clientX,y.clientY,f.target)&&(a=Date.now(),f.preventDefault(),f.stopPropagation())},{passive:!1}),this.carouselShellEl.addEventListener("touchmove",f=>{if(!o()||!this.carouselDragState)return;const y=Array.from(f.changedTouches||[]).find(b=>{var $;return`touch-${b.identifier}`===(($=this.carouselDragState)==null?void 0:$.pointerId)});y&&(a=Date.now(),s(`touch-${y.identifier}`,y.clientX,y.clientY)&&(f.preventDefault(),f.stopPropagation()))},{passive:!1});const r=f=>{if(!o()||!this.carouselDragState)return;const y=Array.from(f.changedTouches||[]).find(b=>{var $;return`touch-${b.identifier}`===(($=this.carouselDragState)==null?void 0:$.pointerId)});y&&(a=Date.now(),f.preventDefault(),f.stopPropagation(),d(`touch-${y.identifier}`))};this.carouselShellEl.addEventListener("touchend",r,{passive:!1}),this.carouselShellEl.addEventListener("touchcancel",r,{passive:!1}),this.carouselShellEl.addEventListener("mousedown",f=>{f.button!==0||!c()||n("mouse-fallback",f.clientX,f.clientY,f.target)&&(i=Date.now(),f.preventDefault())}),window.addEventListener("mousemove",f=>{!this.carouselDragState||this.carouselDragState.pointerId!=="mouse-fallback"||(i=Date.now(),s("mouse-fallback",f.clientX,f.clientY)&&f.preventDefault())}),window.addEventListener("mouseup",f=>{!this.carouselDragState||this.carouselDragState.pointerId!=="mouse-fallback"||(i=Date.now(),f.button===0&&f.preventDefault(),d("mouse-fallback"))})}connectStateStream(){const e=this.getStateStreamUrl();if(!e||typeof EventSource>"u")return!1;const a=H(window.location.href,e),i=new EventSource(a);return i.onmessage=n=>{try{const s=JSON.parse(String(n.data||"null")),d=Ut(Array.isArray(s)?s:s==null?void 0:s.states);if(!d)return;this.refresh(d)}catch(s){console.warn("Failed to parse state stream payload",s)}},i.onerror=()=>{console.warn("Scene state stream disconnected; keeping EventSource reconnect logic active.")},this.stateStream=i,!0}async refresh(e){const a=e??await this.readSceneStates();this.currentState=await this.readAssistantState(a),this.hassStates=a,this.remoteControl=await this.readRemoteControl(this.currentControl,a),this.uiControl=Be(Z,this.uiControl),this.currentControl=Be(this.remoteControl,this.uiControl);const i=St(this.currentState,this.currentControl);this.syncIdleMonologue(i);const n=sa(i,{idleMonologue:this.currentIdleLine,copy:this.copy}),s=this.sceneRuntimeConfig;this.applyDisplayConfig(s);const d=s.pages,o=ia({control:this.currentControl,rotation:s.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:c=>d.some(m=>m.id===c)});if(this.activeIndex=o.nextIndex,this.lastAutoRotateAt=o.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.syncAvatarPresentation(n),this.renderCarousel(d,n)}renderCarousel(e,a){this.orderedPages=e.slice();const i=JSON.stringify(e.map(o=>({id:o.id,kind:o.kind,title:o.title,subtitle:o.subtitle||"",slot:o.slot??null,cardStyle:o.cardStyle||"",stampCaption:o.stampCaption||"",stampValue:o.stampValue||"",cards:Array.isArray(o.cards)?o.cards.map(c=>({type:l(c.type,32),entity:l(c.entity,255),stateEntity:l(c.stateEntity,255),downEntity:l(c.downEntity,255),upEntity:l(c.upEntity,255),caption:l(c.caption,48),hint:l(c.hint,72)})):[]}))),n=this.buildCarouselRenderKey(e,a);if(i===this.lastPageStructureKey&&n===this.lastCarouselRenderKey){this.updateCarouselPosition(),this.updateDotState();return}const s=e.map((o,c)=>o.kind==="overview"?this.renderOverviewSlide(o,a,c):this.renderDynamicSlide(o,c,e.length)),d=e.map((o,c)=>`
      <button
        class="carousel-dot ${c===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${c}"
        data-scene-page-id="${S(o.id)}"
        aria-label="${S(l(o.title,40)||l(o.id,40)||`${this.labels.pageStamp} ${c+1}`)}"
      ></button>
    `).join("");if(i!==this.lastPageStructureKey){this.carouselTrackEl.innerHTML=s.join(""),this.dotsEl.innerHTML=d,this.lastPageStructureKey=i,this.lastCarouselRenderKey=n,this.lastDotsMarkup=d,this.slideMarkupCache=new Map(e.map((o,c)=>[o.id,s[c]]));for(const o of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))o.addEventListener("click",()=>{this.pinPageByIndex(Number(o.dataset.slideIndex)||0)})}else{const o=Array.from(this.carouselTrackEl.children);if(s.forEach((c,m)=>{const r=e[m];if(this.slideMarkupCache.get(r.id)===c)return;const f=o[m];if(!f)return;const y=document.createElement("template");y.innerHTML=c.trim();const b=y.content.firstElementChild;b&&(f.replaceWith(b),this.slideMarkupCache.set(r.id,c))}),this.lastDotsMarkup!==d){this.dotsEl.innerHTML=d,this.lastDotsMarkup=d;for(const c of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))c.addEventListener("click",()=>{this.pinPageByIndex(Number(c.dataset.slideIndex)||0)})}this.lastCarouselRenderKey=n}this.updateCarouselPosition(),this.updateDotState()}buildCarouselRenderKey(e,a){const i=this.weatherData||ve,n=this.rendererConfig.assistant.locale||"en-US";return JSON.stringify({presentation:{caption:l(a.caption,64),label:l(a.label,96),body:l(a.body,280)},weather:{title:l(i.title,64),location:l(i.location,96),todayCaption:l(i.todayCaption,48),todayValue:l(i.todayValue,48),todayLabel:l(i.todayLabel,48),updatedCaption:l(i.updatedCaption,48),updatedAt:l(i.updatedAt,48),temperature:l(i.temperature,24),unit:l(i.unit,8),condition:l(i.condition,96),feelsLike:l(i.feelsLike,140),badgeSummary:l(i.badgeSummary,96),badgeRange:l(i.badgeRange,96),metrics:i.metrics,forecastTitle:l(i.forecastTitle,64),forecast:i.forecast.map(s=>({name:l(s.name,24),dayNumber:l(s.dayNumber,8),monthShort:l(s.monthShort,16),note:l(s.note,48),max:l(s.max,16),min:l(s.min,24),icon:l(s.icon,255)}))},pages:e.map((s,d)=>({id:l(s.id,64),kind:l(s.kind,32),title:l(s.title,96),subtitle:l(s.subtitle,160),stampCaption:l(s.stampCaption,48),stampValue:l(s.stampValue,48),cardStyle:l(s.cardStyle,16),index:d,cards:dt(s.cards||[],this.hassStates,n).map(o=>({caption:l(o.caption,64),value:l(o.value,96),hint:l(o.hint,160)}))}))})}renderOverviewSlide(e,a,i){const n=l(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||ve,d=s.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="${S(e.id)}" data-scene-page-id="${S(e.id)}" data-slide-order="${i}">
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
    `}renderDynamicSlide(e,a,i){const n=dt(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),d=l(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),o=l(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${a+1} / ${i}`),c=e.cardStyle==="mini"?n.map((b,$)=>`
          <article class="mini-card" data-scene-card-index="${$}" data-scene-page-id="${S(e.id)}">
            <span class="caption">${S(b.caption)}</span>
            <strong>${S(b.value)}</strong>
          </article>
        `).join(""):n.map((b,$)=>`
          <article class="home-card" data-scene-card-index="${$}" data-scene-page-id="${S(e.id)}">
            <span class="caption">${S(b.caption)}</span>
            <strong>${S(b.value)}</strong>
            <small>${S(b.hint)}</small>
          </article>
        `).join(""),m=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(b=>this.renderForecastDay(b)).join("")}</div>`:"",r=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",f=l(e.title,64)||l(e.id,64)||`${this.labels.pageStamp} ${a+1}`,y=l(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${S(e.id)}" data-scene-page-id="${S(e.id)}" data-slide-order="${a}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${S(e.kind)}" data-dynamic-card-style="${S(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${S(f)}</h1>
              ${y?`<p class="subline">${S(y)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${S(d)}</span>
              <span class="value">${S(o)}</span>
            </div>
          </div>
          ${m}
          <div class="${r}">
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const a=e[0],i=e[e.length-1];return`${l(a.dayNumber,4)} ${l(a.monthShort,8)} → ${l(i.dayNumber,4)} ${l(i.monthShort,8)}`}resolveIconUrl(e){var n;const a=l((n=this.options.iconUrls)==null?void 0:n[e],1024);return a||`${Xe(l(this.options.iconBaseUrl,1024)||"./assets")}${Ma[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:i,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,a){var i,n;typeof e=="number"&&!a&&((n=(i=this.carouselShellEl).hasPointerCapture)!=null&&n.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=aa(this.sceneRuntimeConfig.rotation,this.activeIndex,e,i=>this.orderedPages.some(n=>n.id===i));this.pinPageByIndex(a)}pinPageByIndex(e){const i=(this.orderedPages.length?this.orderedPages:this.sceneRuntimeConfig.pages)[e];if(!i)return;const n=Math.max(18e3,this.sceneRuntimeConfig.rotation.defaultDwellMs*2);this.uiControl=Vt(this.uiControl,i.id,n),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!la(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=st(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const a=st(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refresh()},oa(18e3,18e3))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: HTTP ${a.status}`);return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:Lt({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl})}async readAssistantState(e){var n;const a=async()=>Ua({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??$t}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap)return a();const i=e??await((n=this.haStatesReader)==null?void 0:n.read())??null;return i&&Ca(i||{},this.entityMap,this.rendererConfig.assistant.name)||a()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=Z,a){var s;const i=async()=>La({url:this.rendererConfig.control.controlUrl,defaultValue:e}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap)return i();const n=a??await((s=this.haStatesReader)==null?void 0:s.read())??null;return n&&Ea(n||{},this.controlEntityMap)||i()}async syncAvatarPresentation(e){if(!this.avatarAdapter)return;const a=JSON.stringify(e.state);a!==this.lastAvatarStateKey&&(await this.avatarAdapter.setState(e.state),this.lastAvatarStateKey=a);const i=JSON.stringify(this.currentControl.cue||Z.cue);i!==this.lastAvatarCueKey&&(await this.avatarAdapter.setCue(this.currentControl.cue),this.lastAvatarCueKey=i),this.currentPreset!==this.lastAvatarPreset&&(await this.avatarAdapter.setViewPreset(this.currentPreset),this.lastAvatarPreset=this.currentPreset);const n=e.body||"";n!==this.lastAvatarBubbleKey&&(await this.avatarAdapter.showBubble(e.body,{ttlMs:0,speak:!1,typewriter:!1}),this.lastAvatarBubbleKey=n)}async readWeatherData(){const e={...this.options.defaultWeather||{}};let a={...e};try{const i=await this.readJson(this.getWeatherUrl());a=He(a,i)}catch{}if(a=He(a,e),this.options.weatherReader)try{const i=await this.options.weatherReader();a=He(a,i)}catch{}try{return Oe(a)}catch{return Oe(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return ba({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return xa({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const i=a.dataset.avatarPreset||"",n=a.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];a.classList.toggle("is-active",i===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function qa(t,e={}){const a=new Ka(t,e);return await a.init(),a}const Ga=["overview","cards","forecast+cards"],Ja=["full","mini"],Nt=["entity","text","todo","onoff","battery","network","time","percent","number"],Y=["caption","hint"],Ue="/local/live2d/",ut="/scene-legacy/live2d/",Ya={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Za={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",publication:"Публикация на дисплей",publicationSubtitle:"Здесь видно, что именно Kiosk Scene сейчас отдаёт наружу. Эти URL можно дать HAOS Kiosk Display или любому внешнему дисплей-хосту.",publicationTargetLabel:"Активный pack и опубликованный runtime config",publicationSourceReady:"Готовый display artefact",publicationSourceFallback:"Fallback на editor-config",publicationLocalUrl:"URL для локального display host на этой же машине",publicationExternalUrl:"URL для внешнего дисплея или обычного браузера",publicationOpen:"Открыть",publicationCopy:"Копировать",publicationCopied:"URL скопирован",publicationCopyError:"Не удалось скопировать URL",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",publication:"Display publication",publicationSubtitle:"This shows what Kiosk Scene currently serves to display hosts. Use these URLs in HAOS Kiosk Display or any other external display runtime.",publicationTargetLabel:"Active pack and published runtime config",publicationSourceReady:"Compiled display artifact",publicationSourceFallback:"Fallback to editor config",publicationLocalUrl:"URL for a local display host on the same machine",publicationExternalUrl:"URL for an external display or regular browser",publicationOpen:"Open",publicationCopy:"Copy",publicationCopied:"URL copied",publicationCopyError:"Failed to copy URL",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Xa=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Qa=4*1024*1024,ei=192*1024,Re=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Ke="mellow-fly-7";function de(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function ti(t){return Re.find(e=>e.id===t)||Re.find(e=>e.id===Ke)||Re[0]}function ai(t){return`${t.width} × ${t.height}`}function g(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Qe(t){return JSON.parse(JSON.stringify(t))}function J(t){const e=new Map(t.pages.map(n=>[n.id,n])),a=t.rotation.order.map(n=>e.get(n)).filter(Boolean),i=t.pages.filter(n=>!a.some(s=>s.id===n.id));return[...a,...i]}function ii(t,e){return e?Math.max(0,J(t).findIndex(a=>a.id===e)):0}function ri(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Bt(t,e){const a=ri(e);let i=a,n=2;for(;t.pages.some(s=>s.id===i);)i=`${a}-${n}`,n+=1;return i}function ni(t){const e=t.pages.length+1,a=de()==="ru";return{id:Bt(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function pt(t){const e=de()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function V(t,e){const a=t[e];return a==null?"":String(a)}function ee(t,e){const a=t[e];return a==null?"":String(a)}function ie(t,e){const a=t.display||{},i=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function si(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function ze(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function oi(t){return t.avatar||(t.avatar={}),t.avatar}function li(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function di(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function ci(t){var i;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&J(t).some(n=>n.id===a)?a:((i=J(t)[0])==null?void 0:i.id)||null}async function ui(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return Qe(a.config)}async function pi(t,e){const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await a.json();if(!a.ok||i.success===!1||!i.config)throw new Error(`POST ${t} failed: HTTP ${a.status}`);return Qe(i.config)}function et(t){switch(t){case"text":return[...Y,"value"];case"todo":return[...Y,"entity"];case"onoff":return[...Y,"entity","onText","offText"];case"battery":return[...Y,"entity","stateEntity"];case"network":return[...Y,"downEntity","upEntity"];case"time":return[...Y,"entity"];case"percent":return[...Y,"entity","digits"];case"number":return[...Y,"entity","digits","unit"];default:return[...Y,"entity"]}}function je(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:t.kindOverview}function ce(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function Ft(t){const e=de();return Ya[e][t]||""}function De(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function fi(t,e){const a=e.attributes||{},i=String(a.friendly_name||t),n=t.includes(".")&&t.split(".",1)[0]||"other",s=String(e.state||""),d=String(a.unit_of_measurement||"");return{entityId:t,name:i,domain:n,state:s,unit:d}}function hi(t){return t?Object.entries(t).map(([e,a])=>fi(e,a)).sort((e,a)=>{const i=e.domain.localeCompare(a.domain);return i!==0?i:e.name.localeCompare(a.name,"ru")}):[]}function mi(t,e){const a=e.trim().toLowerCase();return a?t.filter(i=>i.entityId.toLowerCase().includes(a)||i.name.toLowerCase().includes(a)||i.domain.toLowerCase().includes(a)||i.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function gi(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():null}function ne(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const n=gi(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,i).toString()}function tt(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ue))return ne(`${ut}${a.slice(Ue.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const i=new URL(a,e);if(i.pathname.startsWith(Ue)){const n=i.pathname.slice(Ue.length);return ne(`${ut}${n}${i.search}${i.hash}`,e)}}catch{return a}return a}function vi(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function yi(t,e){const a=new URL("./",t).toString(),i=ne(tt(e,a)||e,a);return vi(i||a)}function ft(t,e,a){const i=String(a||"").trim();return i?ne(tt(i,t)||i,yi(t,e)):""}function bi(t,e){const a=String(e||"").trim();return a?ne(tt(a,t)||a,new URL("./",t).toString()):""}function _t(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}function qe(t,e){const a=_t(t);return{...a,manifestUrl:a.manifestUrl?ne(a.manifestUrl,e):"",previewUrl:a.previewUrl?ne(a.previewUrl,e):""}}async function wi(t,e){var m;const a=String(t||"").trim();if(!a)return null;const i=await fetch(a,{cache:"no-store"}),n=await i.json();if(!i.ok)throw new Error(`GET ${a} failed: HTTP ${i.status}`);const s=String(n.assetRoot||"").trim();let d=0;const o=ft(a,s,String(n.motionMapUrl||"").trim());if(o)try{const r=await fetch(o,{cache:"no-store"}),f=await r.json();r.ok&&Array.isArray(f.motions)&&(d=f.motions.length)}catch{d=0}const c=bi(a,String(((m=n.presetThumbs)==null?void 0:m.full)||"").trim())||ft(a,s,String(n.fallbackPortrait||"").trim());return _t({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:a,previewUrl:c,motionCount:d,capabilities:n.capabilities})}async function ht(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),i=await a.json();if(!a.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(i.items)?i.items.map(n=>qe(n,e)).filter(n=>n.id&&n.manifestUrl):[]}async function Si(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const i=/\/api\/hassio_ingress\//.test(a),n=i?ei:Qa;if(i||e.size>n){const c=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,m=Math.max(1,Math.ceil(e.size/n));let r=null;for(let f=0;f<m;f+=1){const y=f*n,b=Math.min(e.size,y+n),$=new FormData;$.set("uploadId",c),$.set("filename",e.name),$.set("chunkIndex",String(f)),$.set("chunkCount",String(m)),$.set("archive",e.slice(y,b,"application/zip"),`${e.name}.part-${f+1}-of-${m}`);const k=await fetch(a,{method:"POST",body:$}),P=await k.json();if(!k.ok||P.success===!1)throw new Error(String(P.error||`HTTP ${k.status}`));P.item&&(r=qe(P.item,a))}if(!r)throw new Error("Avatar import did not return the imported pack.");return r}const s=new FormData;s.set("archive",e,e.name);const d=await fetch(a,{method:"POST",body:s}),o=await d.json();if(!d.ok||o.success===!1||!o.item)throw new Error(String(o.error||`HTTP ${d.status}`));return qe(o.item,a)}async function xi(t,e){var d,o,c,m;const a=String(t||"").trim(),i=String(e||"").trim();if(!a||!i)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${a}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((d=s.motionMap)==null?void 0:d.motions)?(o=s.motionMap)==null?void 0:o.motions.map(r=>({index:Number(r.index),id:String(r.id||"").trim(),label:String(r.label||r.id||"").trim(),group:String(r.group||"").trim(),tags:Array.isArray(r.tags)?r.tags.map(f=>String(f||"").trim()).filter(Boolean):[]})).filter(r=>Number.isFinite(r.index)):[],semantic:typeof((c=s.motionMap)==null?void 0:c.semantic)=="object"&&((m=s.motionMap)!=null&&m.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function ki(t,e){var s,d,o;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await i.json();if(!i.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${i.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((d=n.motionMap)==null?void 0:d.semantic)=="object"&&((o=n.motionMap)!=null&&o.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function $i(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function Ci(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function Pi(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Xa.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${g(i.key)}">${g(Ci(t,i))}</label>
            <select id="avatar-semantic-${g(i.key)}" data-avatar-semantic="${g(i.key)}">
              <option value="">${g(t.avatarMotionNone)}</option>
              ${a.map(n=>`
                <option value="${g(String(n.index))}"${$i(e.motionMap.semantic[i.key])===String(n.index)?" selected":""}>
                  ${g(`${n.label||n.id} · #${n.index}`)}
                </option>
              `).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      <div class="cards-list">
        ${a.map(i=>`
          <article class="card-list-item">
            <div class="card-list-select">
              <strong>${g(i.label||i.id||`${t.avatarMappingMotion} ${i.index}`)}</strong>
              <span class="meta">${g(`${t.avatarMappingMotion} #${i.index} · ${i.group||t.avatarMappingMotion.toLowerCase()}`)}</span>
              <code>${g(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${t.avatarMappingSaveHint}</div>
    </div>
  `}function mt(t,e,a){var r,f,y,b,$;const i=(e==null?void 0:e.id)||"",n=a===i,s=(e==null?void 0:e.name)||t.avatarPackDefaultTile,d=(e==null?void 0:e.id)||t.avatarPackCurrent,o=(e==null?void 0:e.previewUrl)||"",c=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(r=e.capabilities)!=null&&r.supportsMotion?t.avatarCapabilityMotion:"",(f=e.capabilities)!=null&&f.supportsEmotion?t.avatarCapabilityEmotion:"",(y=e.capabilities)!=null&&y.supportsLipSync?t.avatarCapabilityLipSync:"",(b=e.capabilities)!=null&&b.supportsViewPresets?t.avatarCapabilityViewPresets:"",($=e.capabilities)!=null&&$.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],m=c.length?c:[t.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${o?`<img src="${g(o)}" alt="${g(s)}">`:`<span>${g(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${g(s)}</strong>
        <div class="meta">${g(d)}</div>
        <div class="avatar-pack-card-meta">
          ${m.map(k=>`<span>${g(k)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${g(i)}">
          ${g(n?t.avatarPackSelected:t.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function at(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function Ii(t,e,a,i){if(!e||a===null)return`<div class="meta">${g(t.entityBindingEmpty)}</div>`;const n=et(V(e,"type")||"entity").filter(s=>at(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===a&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${g(s)}">
            ${g(De(t,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${g(t.entityBindingNoTargets)}</div>`}function gt(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function se(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function vt(t){return et(t).find(e=>at(e))||null}function oe(t,e,a,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${g(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${g(e)}" value="${g(a)}">
    </div>
  `}function re(t,e,a){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${g(t)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${g(e)}" value="${g(a)}">
    </div>
  `}function yt(t,e,a,i){return`
    <div class="field">
      <label for="page-select-${e}">${g(t)}</label>
      <select id="page-select-${e}" data-page-field="${g(e)}">
        ${i.map(n=>`<option value="${g(n.value)}"${n.value===a?" selected":""}>${g(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function Ei(t,e,a,i){const n=V(e,"type")||"entity",s=et(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${g(V(e,"caption")||ce(t,n))}</strong>
          <div class="meta">${g(ce(t,n))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${g(t.cardType)}</label>
          <select data-card-index="${a}" data-card-field="type">
            ${Nt.map(d=>`<option value="${d}"${d===n?" selected":""}>${g(ce(t,d))}</option>`).join("")}
          </select>
        </div>
        ${s.map(d=>{const o=at(d),c=o&&(i==null?void 0:i.cardIndex)===a&&i.field===d;return o?`
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
  `}function Ai(t,e,a,i,n){const s=V(e,"type")||"entity",d=V(e,"caption")||ce(t,s),o=V(e,"entity")||V(e,"stateEntity")||V(e,"downEntity")||V(e,"upEntity")||V(e,"value")||V(e,"hint")||Ft(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
        <strong>${g(d)}</strong>
        <span class="meta">${g(ce(t,s))}</span>
        <div class="meta">${g(o)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===i-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function Ui(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${g(e)}"
    >
      <strong>${g(ce(t,e))}</strong>
      <span>${g(Ft(e))}</span>
    </button>
  `}function Li(t,e,a){t[e]=a.entityId;const i=t;String(i.caption||"").trim()||(i.caption=a.name),String(i.hint||"").trim()||(i.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&a.unit&&(i.unit=a.unit)}async function Ti(t){var fe;const e=Za[de()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(a)&&document.body.insertBefore(a,i),i==null||i.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
      #scene-editor-shell .scene-publication-grid {
        display: grid;
        gap: 12px;
      }
      #scene-editor-shell .scene-publication-target {
        padding: 12px 14px;
        border-radius: 16px;
        border: 1px solid rgba(32,48,65,0.08);
        background: rgba(246,249,252,0.82);
      }
      #scene-editor-shell .scene-publication-target strong {
        display: block;
        font: 700 14px/1.15 "Aptos","Segoe UI",sans-serif;
        color: #203041;
      }
      #scene-editor-shell .scene-publication-url {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto auto;
        gap: 8px;
        align-items: center;
      }
      #scene-editor-shell .scene-publication-url input[readonly] {
        cursor: text;
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
        #scene-editor-shell .scene-publication-url {
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
                ${Re.map(p=>`<option value="${g(p.id)}">${g(p.label[de()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),d=n.querySelector("[data-preview-canvas]"),o=n.querySelector("[data-preview-resolution]"),c=n.querySelector("[data-preview-display]"),m=n.querySelector("[data-dashboard]");if(!s||!d||!o||!c||!m)throw new Error("Missing native editor shell elements");d.appendChild(a);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Ke,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarInspectorPackId:null,avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},f=async p=>{const h=String(p||"").trim();if(!h||!t.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,E();try{r.avatarPackDetails=await xi(t.avatarPackApiUrl,h),r.avatarPackDirty=!1}catch(u){r.avatarPackDetails=null,r.avatarPackDirty=!1,O(`${e.avatarMappingLoadError}: ${String(u)}`,"bad")}finally{r.avatarPackLoading=!1}},y=()=>{var N;const p=ti(r.previewDisplayId),h=Math.max(320,((N=s.parentElement)==null?void 0:N.clientWidth)||s.clientWidth||p.width),u=Math.max(260,Math.min(window.innerHeight*.62,760)),w=Math.min(1,h/p.width,u/p.height),A=Math.round(p.width*w),L=Math.round(p.height*w);c.value=p.id,o.textContent=ai(p),s.style.aspectRatio=`${p.width} / ${p.height}`,s.style.width=`${A}px`,s.style.height=`${L}px`,d.style.width=`${p.width}px`,d.style.height=`${p.height}px`,d.style.transform=`scale(${w})`,a.style.width=`${p.width}px`,a.style.height=`${p.height}px`},b=p=>{r.previewDisplayId=String(p||"").trim()||Ke,y()},$=p=>{r.pendingAvatarZip=p,r.pendingAvatarZipName=(p==null?void 0:p.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",E(),p&&k(p)},k=async p=>{if(!(!r.config||!t.avatarImportUrl||r.avatarImporting)){r.pendingAvatarZip=null,r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",E();try{const h=await Si(t.avatarImportUrl,p);r.avatarCatalog=t.avatarCatalogUrl?await ht(t.avatarCatalogUrl):[h],r.avatarInspectorPackId=h.id,await f(h.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(h.name||h.id),r.avatarImportTone="ok",E()}catch(h){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(h)}`,r.avatarImportTone="bad",E()}}},P=typeof ResizeObserver<"u"?new ResizeObserver(()=>y()):null;P==null||P.observe(s.parentElement||s);let U=null;const W=()=>{const p=r.selectedPageId||"",h=r.selectedCardIndex;for(const u of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete u.dataset.editorSelectedPage;for(const u of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete u.dataset.editorSelectedCard;if(p){const u=a.querySelector(`[data-slide-id="${CSS.escape(p)}"]`);u&&(u.dataset.editorSelectedPage="true")}if(p&&h!==null){const u=`[data-scene-page-id="${CSS.escape(p)}"][data-scene-card-index="${h}"]`,w=a.querySelector(u);w&&(w.dataset.editorSelectedCard="true")}},G=typeof MutationObserver<"u"?new MutationObserver(()=>W()):null;G==null||G.observe(a,{childList:!0,subtree:!0});const E=()=>{const p=r.config,h=p?J(p):[],u=h.find(x=>x.id===r.selectedPageId)||h[0]||null,w=Array.isArray(u==null?void 0:u.cards)?u.cards:[],A=r.selectedCardIndex!==null&&w[r.selectedCardIndex]||null,L=mi(r.haEntities,r.entitySearch),N=r.focusedBinding?e.entityBindingActive(V(w[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,De(e,r.focusedBinding.field)):e.entityBindingEmpty,I=p?ze(p):"",te=r.avatarInspectorPackId||I,Ie=t.publishedScene.usesDisplayArtifact?`${e.publicationSourceReady} · ${t.publishedScene.sceneConfigName}`:`${e.publicationSourceFallback} · ${t.publishedScene.sceneConfigName}`,C=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${g(r.avatarImportStatus)}</div>`:"",Q=r.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,he=u?`${u.title||u.id||e.pageSettings} · ${je(e,u.kind)}`:e.statusLoading;m.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${g(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${g(t.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${r.saving||r.avatarPackSaving||!p?" disabled":""}>${r.saving||r.avatarPackSaving?e.saving:e.save}</button>
          <button class="scene-editor-button" type="button" data-action="add-page"${p?"":" disabled"}>${e.addPage}</button>
        </div>
      </div>
      <div class="scene-dashboard-body">
        <div class="scene-settings-stack">
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.publication}</h2>
              <div class="meta">${e.publicationSubtitle}</div>
            </div>
            <div class="scene-publication-grid">
              <div class="scene-publication-target">
                <div class="meta">${e.publicationTargetLabel}</div>
                <strong><code>${g(t.packId||"default")}</code> · <code>${g(t.publishedScene.sceneConfigName)}</code></strong>
                <div class="meta" style="margin-top:6px;">${g(Ie)}</div>
              </div>
              <div class="field is-wide">
                <label for="scene-publication-local-url">${e.publicationLocalUrl}</label>
                <div class="scene-publication-url">
                  <input id="scene-publication-local-url" type="text" readonly data-publication-url-input value="${g(t.publishedScene.localDisplayUrl)}">
                  <a class="tiny-btn" href="${g(t.publishedScene.localDisplayUrl)}" target="_blank" rel="noreferrer">${e.publicationOpen}</a>
                  <button class="tiny-btn" type="button" data-action="copy-publication-url" data-url="${g(t.publishedScene.localDisplayUrl)}">${e.publicationCopy}</button>
                </div>
              </div>
              <div class="field is-wide">
                <label for="scene-publication-external-url">${e.publicationExternalUrl}</label>
                <div class="scene-publication-url">
                  <input id="scene-publication-external-url" type="text" readonly data-publication-url-input value="${g(t.publishedScene.externalDisplayUrl)}">
                  <a class="tiny-btn" href="${g(t.publishedScene.externalDisplayUrl)}" target="_blank" rel="noreferrer">${e.publicationOpen}</a>
                  <button class="tiny-btn" type="button" data-action="copy-publication-url" data-url="${g(t.publishedScene.externalDisplayUrl)}">${e.publicationCopy}</button>
                </div>
              </div>
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.avatar}</h2>
              <div class="meta">${e.avatarSubtitle}</div>
            </div>
          ${p?`
            <div class="avatar-pack-box">
              <div class="meta">${Q}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${mt(e,r.bundledAvatar,I)}
                ${r.avatarCatalog.map(x=>mt(e,x,I)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label>${e.avatarImportSelect}</label>
              </div>
              <div class="avatar-import-actions">
                <button
                  class="scene-editor-button avatar-import-button${r.avatarImporting||!t.avatarImportUrl?" is-disabled":""}"
                  type="button"
                  data-action="choose-avatar-archive"
                  ${r.avatarImporting||!t.avatarImportUrl?" disabled":""}
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
                  ${r.avatarImporting||!t.avatarImportUrl?" disabled":""}
                >
              </div>
              ${r.pendingAvatarZipName?`<div class="meta">${g(e.avatarImportSelected(r.pendingAvatarZipName))}</div>`:""}
              <div class="meta">${e.avatarImportHint}</div>
              ${C}
            </div>
            ${te?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?Pi(e,r.avatarPackDetails):"":""}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(t.packId)}</div>
              <div class="meta">${e.pageOrderHint}</div>
            </div>
            <div class="page-list">
            ${h.map((x,R)=>`
              <article class="page-chip ${x.id===((u==null?void 0:u.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${g(x.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${g(x.id)}">
                  <strong>${g(x.title||x.id||(de()==="ru"?`Страница ${R+1}`:`Page ${R+1}`))}</strong>
                  <span class="meta">${g(je(e,x.kind))} · ${g(e.pageCards(Array.isArray(x.cards)?x.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${g(x.id)}"${R===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${g(x.id)}"${R===h.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${g(x.id)}"${h.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pageSettings}</h2>
              <div class="meta">${g(he)}</div>
            </div>
          ${u?`
            <div class="inspector-grid">
              ${oe(e.fieldPageId,"id",ee(u,"id"),!0)}
              ${yt(e.fieldKind,"kind",ee(u,"kind"),Ga.map(x=>({value:x,label:je(e,x)})))}
              ${oe(e.fieldTitle,"title",ee(u,"title"),!0)}
              ${oe(e.fieldSubtitle,"subtitle",ee(u,"subtitle"),!0)}
              ${oe(e.fieldSlot,"slot",ee(u,"slot"))}
              ${yt(e.fieldCardStyle,"cardStyle",ee(u,"cardStyle")||"full",Ja.map(x=>({value:x,label:x==="mini"?e.styleMini:e.styleFull})))}
              ${oe(e.fieldStampCaption,"stampCaption",ee(u,"stampCaption"))}
              ${oe(e.fieldStampValue,"stampValue",ee(u,"stampValue"))}
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
                  ${Nt.map(x=>Ui(e,x)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${w.length?w.map((x,R)=>Ai(e,x,R,w.length,R===r.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${A?Ei(e,A,r.selectedCardIndex||0,r.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              ${re(e.fieldDisplaySafeTop,"safeTop",ie(p,"safeTop"))}
              ${re(e.fieldDisplaySafeRight,"safeRight",ie(p,"safeRight"))}
              ${re(e.fieldDisplaySafeBottom,"safeBottom",ie(p,"safeBottom"))}
              ${re(e.fieldDisplaySafeLeft,"safeLeft",ie(p,"safeLeft"))}
              ${re(e.fieldDisplayPadding,"layoutPaddingPx",ie(p,"layoutPaddingPx"))}
              ${re(e.fieldDisplayGap,"layoutGapPx",ie(p,"layoutGapPx"))}
              ${re(e.fieldDisplayScale,"globalScale",ie(p,"globalScale"))}
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
            ${Ii(e,A,r.selectedCardIndex,r.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${g(r.entitySearch)}">
          </div>
          <div class="ha-list">
            ${L.length?L.map(x=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${g(x.name)}</strong>
                    <div class="meta">${g(x.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${g(x.entityId)}"${r.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${g(x.entityId)}</code>
                <div class="ha-state">${g(x.state)}${x.unit?` · ${g(x.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const B=m.querySelector("[data-avatar-archive]"),Ne=m.querySelector("[data-action='choose-avatar-archive']");Ne==null||Ne.addEventListener("click",()=>{if(!B||B.disabled)return;B.value="";const x=B;try{if(typeof x.showPicker=="function"){x.showPicker();return}}catch{}B.click()}),B==null||B.addEventListener("click",()=>{B.value=""}),B==null||B.addEventListener("change",()=>{var R;const x=((R=B.files)==null?void 0:R[0])||null;$(x),B.value=""});for(const x of Array.from(m.querySelectorAll("[data-publication-url-input]")))x.addEventListener("click",()=>{x.select()}),x.addEventListener("focus",()=>{x.select()});for(const x of Array.from(m.querySelectorAll("[data-action='copy-publication-url']")))x.addEventListener("click",async()=>{const R=String(x.dataset.url||"").trim();if(R)try{await navigator.clipboard.writeText(R),O(e.publicationCopied,"ok")}catch{O(e.publicationCopyError,"bad")}});for(const x of Array.from(m.querySelectorAll(".page-chip[data-page-id]")))x.draggable=!0,x.addEventListener("dragstart",R=>{const K=String(x.dataset.pageId||"").trim();U=K?{kind:"page",pageId:K}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),x.addEventListener("dragover",R=>{!U||U.kind!=="page"||(R.preventDefault(),se(n),x.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),x.addEventListener("drop",R=>{if(!U||U.kind!=="page")return;R.preventDefault();const K=String(x.dataset.pageId||"").trim();K&&ke(U.pageId,K),U=null,se(n)}),x.addEventListener("dragend",()=>{U=null,se(n)});for(const x of Array.from(m.querySelectorAll(".card-list-item[data-card-index]")))x.draggable=!0,x.addEventListener("dragstart",R=>{const K=Number(x.dataset.cardIndex||"-1");U=Number.isFinite(K)&&K>=0?{kind:"card",cardIndex:K}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),x.addEventListener("dragover",R=>{!U||U.kind!=="card"||(R.preventDefault(),se(n),x.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),x.addEventListener("drop",R=>{if(!U||U.kind!=="card")return;R.preventDefault();const K=Number(x.dataset.cardIndex||"-1");Number.isFinite(K)&&K>=0&&$e(U.cardIndex,K),U=null,se(n)}),x.addEventListener("dragend",()=>{U=null,se(n)});y(),W()},O=(p,h)=>{r.status=p,r.statusTone=h,E()},F=()=>{if(!r.config)return;const p=J(r.config);if(!p.length){r.selectedPageId=null;return}(!r.selectedPageId||!p.some(w=>w.id===r.selectedPageId))&&(r.selectedPageId=p[0].id);const h=p.find(w=>w.id===r.selectedPageId)||null,u=Array.isArray(h==null?void 0:h.cards)?h.cards:[];u.length?(r.selectedCardIndex===null||r.selectedCardIndex>=u.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),di(r.selectedPageId),li(ii(r.config,r.selectedPageId))},M=()=>{r.dirty=!0,O(e.statusDirty,"muted")},X=()=>{const p=new URL(window.location.href);p.searchParams.set("editor","1"),r.selectedPageId&&p.searchParams.set("editorPage",r.selectedPageId),p.searchParams.set("v",String(Date.now())),window.location.replace(p.toString())},we=(p,h)=>{if(!r.config||!r.selectedPageId)return;const u=r.config.pages.find(w=>w.id===r.selectedPageId);if(u){if(p==="slot")u.slot=h===""?void 0:Number(h);else if(p==="id"){const w=Bt(r.config,h||"page"),A=u.id;u.id=w,r.config.rotation.order=r.config.rotation.order.map(L=>L===A?w:L),r.selectedPageId=w}else p==="title"||p==="subtitle"||p==="stampCaption"||p==="stampValue"?u[p]=h:p==="kind"?u.kind=h:p==="cardStyle"&&(u.cardStyle=h);M(),F()}},Se=(p,h)=>{if(!r.config)return;const u=si(r.config),w=u.safeArea||{},A=h===""?null:Number(h),L=Number.isFinite(A)?A:null;p==="safeTop"?w.top=L??0:p==="safeRight"?w.right=L??0:p==="safeBottom"?w.bottom=L??0:p==="safeLeft"?w.left=L??0:p==="layoutPaddingPx"?u.layoutPaddingPx=L??16:p==="layoutGapPx"?u.layoutGapPx=L??16:p==="globalScale"&&(u.globalScale=L??1),u.safeArea=w,M()},xe=(p,h,u)=>{var L;if(!r.config||!r.selectedPageId)return;const w=r.config.pages.find(N=>N.id===r.selectedPageId);if(!w)return;Array.isArray(w.cards)||(w.cards=[]);const A=w.cards[p];if(A){if(h==="type"){const N=pt(u);if(w.cards[p]={...N,caption:V(A,"caption")||N.caption},((L=r.focusedBinding)==null?void 0:L.cardIndex)===p){const I=vt(u);r.focusedBinding=I?{cardIndex:p,field:I}:null}}else h==="digits"?A[h]=u===""?0:Number(u):A[h]=u;M()}},ke=(p,h)=>{if(!r.config||!p||!h||p===h)return;const u=J(r.config).map(L=>L.id),w=u.indexOf(p),A=u.indexOf(h);w<0||A<0||(u.splice(w,1),u.splice(A,0,p),r.config.rotation.order=u,r.selectedPageId=p,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),E())},$e=(p,h)=>{if(!r.config||!r.selectedPageId||p===h)return;const u=r.config.pages.find(A=>A.id===r.selectedPageId);if(!u||!Array.isArray(u.cards)||p<0||h<0||p>=u.cards.length||h>=u.cards.length)return;const[w]=u.cards.splice(p,1);u.cards.splice(h,0,w),r.selectedCardIndex=h,r.focusedBinding=null,M(),E()},Ce=p=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const h=r.config.pages.find(A=>A.id===r.selectedPageId),u=r.haEntities.find(A=>A.entityId===p);if(!h||!Array.isArray(h.cards)||!u)return;const w=h.cards[r.focusedBinding.cardIndex];w&&(Li(w,r.focusedBinding.field,u),M(),E())},Pe=(p,h)=>{r.selectedCardIndex=p,r.focusedBinding={cardIndex:p,field:h},E(),window.requestAnimationFrame(()=>{const u=n.querySelector("#ha-entity-search");u==null||u.scrollIntoView({behavior:"smooth",block:"center"}),u==null||u.focus(),u==null||u.select()})};n.addEventListener("click",async p=>{var te,Ie;const h=p.target,u=h==null?void 0:h.closest("[data-action]"),w=u==null?void 0:u.dataset.action;if(!w||!r.config)return;const A=J(r.config),L=(u==null?void 0:u.dataset.pageId)||null,N=L?A.findIndex(C=>C.id===L):-1;if(w==="select-page"&&L){r.selectedPageId=L,r.selectedCardIndex=0,r.focusedBinding=null,F(),E();return}if(w==="page-up"&&N>0){const C=A.map(z=>z.id);[C[N-1],C[N]]=[C[N],C[N-1]],r.config.rotation.order=C,r.selectedPageId=L,M(),F(),E();return}if(w==="page-down"&&N>=0&&N<A.length-1){const C=A.map(z=>z.id);[C[N],C[N+1]]=[C[N+1],C[N]],r.config.rotation.order=C,r.selectedPageId=L,M(),F(),E();return}if(w==="page-remove"&&L&&A.length>1){r.config.pages=r.config.pages.filter(C=>C.id!==L),r.config.rotation.order=J(r.config).map(C=>C.id),r.selectedPageId=((te=J(r.config)[Math.max(0,N-1)])==null?void 0:te.id)||((Ie=J(r.config)[0])==null?void 0:Ie.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),E();return}if(w==="add-page"){const C=ni(r.config);r.config.pages.push(C),r.config.rotation.order=J(r.config).map(z=>z.id),r.selectedPageId=C.id,r.selectedCardIndex=null,r.focusedBinding=null,M(),F(),E();return}if(w==="add-card-template"&&r.selectedPageId){const C=r.config.pages.find(Q=>Q.id===r.selectedPageId),z=(u==null?void 0:u.dataset.cardType)||"entity";if(C){Array.isArray(C.cards)||(C.cards=[]),C.cards.push(pt(z));const Q=C.cards.length-1;r.selectedCardIndex=Q;const he=vt(z);r.focusedBinding=he?{cardIndex:Q,field:he}:null,M(),E(),he&&window.requestAnimationFrame(()=>{const B=n.querySelector("#ha-entity-search");B==null||B.scrollIntoView({behavior:"smooth",block:"center"}),B==null||B.focus()})}return}if(w==="focus-binding"){const C=Number((u==null?void 0:u.dataset.cardIndex)||"-1"),z=(u==null?void 0:u.dataset.bindingField)||"";C>=0&&z&&Pe(C,z);return}const I=Number((u==null?void 0:u.dataset.cardIndex)||"-1");if(I>=0&&r.selectedPageId){const C=r.config.pages.find(z=>z.id===r.selectedPageId);if(!C||!Array.isArray(C.cards))return;if(w==="select-card"){r.selectedCardIndex=I,E();return}if(w==="card-remove"){C.cards=C.cards.filter((z,Q)=>Q!==I),r.selectedCardIndex!==null&&(r.selectedCardIndex===I?r.selectedCardIndex=C.cards.length?Math.min(I,C.cards.length-1):null:r.selectedCardIndex>I&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===I?r.focusedBinding=null:r.focusedBinding.cardIndex>I&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),M(),E();return}if(w==="card-up"&&I>0){[C.cards[I-1],C.cards[I]]=[C.cards[I],C.cards[I-1]],r.selectedCardIndex===I?r.selectedCardIndex=I-1:r.selectedCardIndex===I-1&&(r.selectedCardIndex=I),r.focusedBinding&&(r.focusedBinding.cardIndex===I?r.focusedBinding={cardIndex:I-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===I-1&&(r.focusedBinding={cardIndex:I,field:r.focusedBinding.field})),M(),E();return}if(w==="card-down"&&I<C.cards.length-1){[C.cards[I],C.cards[I+1]]=[C.cards[I+1],C.cards[I]],r.selectedCardIndex===I?r.selectedCardIndex=I+1:r.selectedCardIndex===I+1&&(r.selectedCardIndex=I),r.focusedBinding&&(r.focusedBinding.cardIndex===I?r.focusedBinding={cardIndex:I+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===I+1&&(r.focusedBinding={cardIndex:I,field:r.focusedBinding.field})),M(),E();return}}if(w==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,O(e.saving,"muted");try{if(r.avatarPackDirty&&r.avatarPackDetails&&t.avatarPackApiUrl){try{r.avatarPackDetails=await ki(t.avatarPackApiUrl,r.avatarPackDetails)}catch(C){throw new Error(`${e.avatarMappingSaveError}: ${String(C)}`)}r.avatarPackDirty=!1}r.config=await pi(t.sceneApiUrl,Qe(r.config)),r.dirty=!1,r.saving=!1,r.avatarPackSaving=!1,F(),O(e.statusSaved,"ok"),window.setTimeout(()=>X(),250)}catch(C){r.saving=!1,r.avatarPackSaving=!1,O(`${e.saveError}: ${String(C)}`,"bad")}return}if(w==="bind-entity"){const C=(u==null?void 0:u.dataset.entityId)||"";Ce(C)}}),n.addEventListener("input",p=>{const h=p.target;if(!h||!r.config){h&&h.dataset.previewDisplay!==void 0&&b(h.value);return}if(h.dataset.previewDisplay!==void 0){b(h.value);return}if(h.dataset.avatarSemantic!==void 0){const u=String(r.avatarInspectorPackId||"").trim()||ze(r.config);if(!r.avatarPackDetails||!u||r.avatarPackDetails.packId!==u)return;const w=h.value.trim();w?r.avatarPackDetails.motionMap.semantic[h.dataset.avatarSemantic]=Number(w):delete r.avatarPackDetails.motionMap.semantic[h.dataset.avatarSemantic],r.avatarPackDirty=!0,O(e.statusDirty,"muted"),E();return}if(h.dataset.pageField){we(h.dataset.pageField,h.value),E();return}if(h.dataset.displayField){Se(h.dataset.displayField,h.value),E();return}if(h.dataset.cardField&&h.dataset.cardIndex){r.selectedCardIndex=Number(h.dataset.cardIndex),xe(Number(h.dataset.cardIndex),h.dataset.cardField,h.value),E();return}h.hasAttribute("data-ha-search")&&(r.entitySearch=h.value,E())}),n.addEventListener("click",p=>{var w;const h=(w=p.target)==null?void 0:w.closest("[data-action='select-avatar-pack']");if(!h||!r.config)return;const u=String(h.dataset.packId||"").trim();oi(r.config).packId=u||null,r.avatarInspectorPackId=u||null,M(),f(u||null).finally(()=>E()),E()}),a.addEventListener("click",p=>{if(!r.config)return;const h=p.target,u=h==null?void 0:h.closest("[data-scene-card-index][data-scene-page-id]");if(u){const A=String(u.dataset.scenePageId||"").trim(),L=Number(u.dataset.sceneCardIndex||"-1");A&&Number.isFinite(L)&&L>=0&&(r.selectedPageId=A,r.selectedCardIndex=L,r.focusedBinding=null,F(),E(),gt("cards"));return}const w=h==null?void 0:h.closest("[data-scene-page-id]");if(w){const A=String(w.dataset.scenePageId||"").trim();A&&(r.selectedPageId=A,r.selectedCardIndex=0,r.focusedBinding=null,F(),E(),gt("pages"));return}}),n.addEventListener("change",p=>{var u;const h=p.target;!h||h.dataset.avatarArchive===void 0||$(((u=h.files)==null?void 0:u[0])||null)}),n.addEventListener("focusin",p=>{const h=p.target;if(!(h!=null&&h.dataset.bindingField))return;const u=Number(h.dataset.cardIndex||"-1");u<0||(r.selectedCardIndex=u,r.focusedBinding={cardIndex:u,field:h.dataset.bindingField})});try{if(r.config=await ui(t.sceneApiUrl),t.sceneAvatarManifestUrl)try{r.bundledAvatar=await wi(t.sceneAvatarManifestUrl,t.packId)}catch{r.bundledAvatar=null}if(t.avatarCatalogUrl)try{r.avatarCatalog=await ht(t.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=hi(((fe=At())==null?void 0:fe.states)||null),r.selectedPageId=ci(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",r.avatarInspectorPackId=ze(r.config)||null,await f(r.avatarInspectorPackId),F()}catch(p){r.status=`${e.loadError}: ${String(p)}`,r.statusTone="bad"}E()}const Ri="../scene-api/bootstrap",Di="weather.forecast_home_assistant",Mi="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Le="/local/live2d/",bt="/scene-legacy/live2d/",Ni={...Tt,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Bi={...Rt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},Fi={...Dt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},_i={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Oi={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:t=>`Pack: ${t||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:t=>`Pack: ${t||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Hi(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function zi(){return new URLSearchParams(window.location.search).get("bootstrap")||Ri}function ji(t,e){const a=String(t||"").trim();return a?a.startsWith("/")?a:`/${a}`:e}function Vi(t){const e=t.publication||{},a=String(e.directScheme||"").trim()||"http",i=Number(e.directPort),n=Number.isFinite(i)&&i>0?i:48123,s=ji(e.directPath,"/scene/"),d=String(e.localDisplayUrl||"").trim()||`${a}://localhost:${n}${s}`,o=String(window.location.hostname||"").trim()||"homeassistant.local",c=`${a}://${o}:${n}${s}`;return{localDisplayUrl:d,externalDisplayUrl:c,directPath:s,sceneConfigName:String(e.sceneConfigName||"").trim()||"scene.default.json",usesDisplayArtifact:!!e.usesDisplayArtifact,source:String(e.source||"").trim()||"editor-config-fallback"}}function Wi(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);if(a)return new URL(a[0],e.origin).toString();for(const i of["/scene-api/","/scene-runtime/","/scene-editor/"]){const n=e.pathname.indexOf(i);if(n>=0)return new URL(e.pathname.slice(0,n+1),e.origin).toString()}return null}function D(t,e){const a=Ki(String(t||"").trim(),e);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const n=Wi(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,i).toString()}function Ki(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Le))return`${bt}${a.slice(Le.length)}`;if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const i=new URL(a,new URL(e,window.location.href));if(i.pathname.startsWith(Le)){const n=i.pathname.slice(Le.length);return D(`${bt}${n}${i.search}${i.hash}`,e)||a}}catch{return a}return a}function qi(t,e){const a=Je(t),i=a.adapter==="live2d"?D("../../scene-runtime/avatar.html",e):"",n=D(String(a.assetRoot||"").trim(),e),s=c=>{const m=String(c||"").trim();return m?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(m)||m.startsWith("/")?D(m,e):m:""},d=c=>{const m=String(c||"").trim();return m?D(m,e):""},o=Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([c,m])=>[c,D(String(m||""),e)]).filter(([,c])=>!!c));return{...a,assetRoot:n,runtimeUrl:i||D(String(a.runtimeUrl||"").trim(),e),entry:s(String(a.entry||"").trim()),modelUrl:s(String(a.modelUrl||"").trim()),fallbackPortrait:s(String(a.fallbackPortrait||"").trim()),motionMapUrl:d(String(a.motionMapUrl||"").trim()),presetThumbs:o}}function Ge(t,e,a,i){t.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${a}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function Me(){return new URLSearchParams(window.location.search).get("editor")==="1"}function Gi(){document.body.classList.toggle("ks-display-runtime",!Me()),document.body.classList.toggle("ks-editor-runtime",Me())}function Ji(){if(!Me())return;const t=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),t(),window.addEventListener("pageshow",t,{once:!0}),window.addEventListener("load",t,{once:!0}),window.requestAnimationFrame(()=>{t(),window.setTimeout(t,120)});let e=!1;const a=()=>{e=!0},i=["pointerdown","wheel","touchstart","keydown"];for(const d of i)window.addEventListener(d,a,{once:!0,passive:!0});let n=0;const s=window.setInterval(()=>{if(e||n>=24){window.clearInterval(s);return}t(),n+=1},80)}async function Yi(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return a}async function ge(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return e.json()}function Zi(t,e){var a,i,n,s,d,o,c,m,r,f,y,b;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([$,k])=>[$,D(k,e)]).filter(([,$])=>!!$)),avatar:{manifestUrl:D(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:D(String(((i=t.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((n=t.state)==null?void 0:n.provider)||"json",stateUrl:D(String(((s=t.state)==null?void 0:s.stateUrl)||"").trim(),e),apiUrl:D(String(((d=t.state)==null?void 0:d.apiUrl)||"").trim(),e)||void 0,haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:D(String(((c=t.state)==null?void 0:c.idleLinesUrl)||"").trim(),e),entityMapUrl:D(String(((m=t.state)==null?void 0:m.entityMapUrl)||"").trim(),e)},control:{provider:((r=t.control)==null?void 0:r.provider)||"json",controlUrl:D(String(((f=t.control)==null?void 0:f.controlUrl)||"").trim(),e),apiUrl:D(String(((y=t.control)==null?void 0:y.apiUrl)||"").trim(),e)||void 0,entityMapUrl:D(String(((b=t.control)==null?void 0:b.entityMapUrl)||"").trim(),e)||void 0}}}async function Xi(t,e){var $,k,P,U,W,G,E,O;const a=D(String((($=t.files)==null?void 0:$.rendererConfigUrl)||"").trim(),e);if(!a)return"";const i=D(String(((k=t.files)==null?void 0:k.sceneConfigUrl)||"").trim(),e),n=D(String(((P=t.files)==null?void 0:P.avatarCatalogUrl)||"").trim(),e);let s="";if(i&&n)try{const F=await ge(i);s=String(((U=F.avatar)==null?void 0:U.packId)||"").trim()}catch{s=""}let d="";if(s&&n)try{const F=await ge(n),M=Array.isArray(F.items)?F.items.find(X=>String(X.id||"").trim()===s):null;d=D(String((M==null?void 0:M.manifestUrl)||"").trim(),e)}catch{d=""}const o=Zi(await ge(a),a);i&&(o.scene={...o.scene||{},configUrl:i});const c=D(String(((W=t.files)==null?void 0:W.haStatesUrl)||"").trim(),e);c&&(o.state={...o.state||{},apiUrl:((G=o.state)==null?void 0:G.apiUrl)||c},o.control={...o.control||{},apiUrl:((E=o.control)==null?void 0:E.apiUrl)||c});const m=d||String(((O=o.avatar)==null?void 0:O.manifestUrl)||"").trim();if(!m)return URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));const r=D(m,e),f=qi(await ge(r),r),y=URL.createObjectURL(new Blob([JSON.stringify(f)],{type:"application/json"})),b={...o,avatar:{manifestUrl:y}};return URL.createObjectURL(new Blob([JSON.stringify(b)],{type:"application/json"}))}const ye=document.getElementById("app");if(!ye)throw new Error("Missing #app root element");const le=Oi[Hi()];Gi();Ji();Ge(ye,le.startingTitle,le.startingBody);(async()=>{var e,a,i,n,s,d;const t=zi();try{const o=await Yi(t),c=String(o.packId||"").trim(),m=c.toLowerCase()==="neiri",r=await Xi(o,t),f=r?await ge(r):null;if(!r){Ge(ye,le.missingRendererTitle,le.missingRendererBody,JSON.stringify(o,null,2));return}if(document.documentElement.dataset.packId=c,document.title=m?"Нейри":c?`kiosk-scene hosted runtime (${c})`:"kiosk-scene hosted runtime",await qa(ye,{rendererConfigUrl:r,stateStreamUrl:D(String(((e=o.files)==null?void 0:e.haStatesStreamUrl)||"").trim(),t)||void 0,weatherUrl:m?"./weather.json":void 0,weatherReader:m?Wa({weatherEntity:Di,openMeteoUrl:Mi,locale:"ru-RU",iconBaseUrl:"./assets",apiUrl:String(((a=f==null?void 0:f.state)==null?void 0:a.apiUrl)||"").trim()||void 0,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:m?Ni:void 0,labels:m?Bi:void 0,presetLabels:m?Fi:void 0,defaultWeather:m?_i:void 0}),Me()){const y=Vi(o);await Ti({packId:c,sceneApiUrl:D(String(o.sceneEditorApiUrl||"").trim(),t),sceneAvatarManifestUrl:D(String(((i=o.files)==null?void 0:i.avatarManifestUrl)||"").trim(),t),avatarCatalogUrl:D(String(((n=o.files)==null?void 0:n.avatarCatalogUrl)||"").trim(),t),avatarImportUrl:D(String(((s=o.files)==null?void 0:s.avatarImportUrl)||"").trim(),t),avatarPackApiUrl:D(String(((d=o.files)==null?void 0:d.avatarPackApiUrl)||"").trim(),t),sceneUrl:D(String(o.entryUrl||o.runtimeBaseUrl||"./").trim(),t),publishedScene:y})}}catch(o){Ge(ye,le.failedTitle,le.failedBody,String(o))}})();
