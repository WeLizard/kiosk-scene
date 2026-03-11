var Ft=Object.defineProperty;var _t=(t,e,a)=>e in t?Ft(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var v=(t,e,a)=>_t(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function L(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function d(t,e=160){const a=String(t??"").replace(/\s+/g," ").trim();return a?a.length<=e?a:`${a.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function et(t){const e=new Date(String(t??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ve(t,e){if(!L(t)||!L(e))return e??t;const a={...t};for(const[r,n]of Object.entries(e)){if(Array.isArray(n)){a[r]=n.slice();continue}if(L(n)&&L(a[r])){a[r]=ve(a[r],n);continue}a[r]=n}return a}function vt(t,e=40){return Array.isArray(t)?t.map(a=>d(a,e).toLowerCase()).filter(Boolean):[]}const ae={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},tt={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function He(t){var a,r,n,s,l,o,h,m,i,p,b,S,$,x;const e=ve(ae,L(t)?t:{});return{version:1,assistant:{name:d((a=e.assistant)==null?void 0:a.name,40)||ae.assistant.name,locale:d((r=e.assistant)==null?void 0:r.locale,16)||void 0},links:L(e.links)?Object.fromEntries(Object.entries(e.links).map(([P,U])=>[d(P,64),d(U,1024)]).filter(([P,U])=>P&&U)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||ae.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||ae.scene.configUrl},state:{provider:((l=e.state)==null?void 0:l.provider)==="ha"?"ha":"json",stateUrl:d((o=e.state)==null?void 0:o.stateUrl,1024)||ae.state.stateUrl,apiUrl:d((h=e.state)==null?void 0:h.apiUrl,1024)||void 0,haApiFallback:((m=e.state)==null?void 0:m.haApiFallback)===!0,idleLinesUrl:d((i=e.state)==null?void 0:i.idleLinesUrl,1024)||ae.state.idleLinesUrl,entityMapUrl:d((p=e.state)==null?void 0:p.entityMapUrl,1024)||void 0},control:{provider:((b=e.control)==null?void 0:b.provider)==="ha"?"ha":"json",controlUrl:d((S=e.control)==null?void 0:S.controlUrl,1024)||ae.control.controlUrl,apiUrl:d(($=e.control)==null?void 0:$.apiUrl,1024)||void 0,entityMapUrl:d((x=e.control)==null?void 0:x.entityMapUrl,1024)||void 0}}}function Ke(t){var a,r,n,s,l;const e=ve(tt,L(t)?t:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||tt.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:L(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,h])=>[d(o,32),d(h,1024)]).filter(([o,h])=>o&&h)):{},viewPresets:L(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,h])=>d(o,32)&&L(h))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((r=e.capabilities)==null?void 0:r.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((l=e.capabilities)==null?void 0:l.supportsPointerFocus)===!0}}}const Z={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},Ot=["full","torso","head"];function ue(t,e=Date.now()){var o,h,m,i,p,b,S;const a=ve(Z,L(t)?t:{}),r={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((o=a.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:d((h=a.page)==null?void 0:h.target,40)||null,until:d((m=a.page)==null?void 0:m.until,64)||null},cue:{cue:d((i=a.cue)==null?void 0:i.cue,32)||null,emotion:d((p=a.cue)==null?void 0:p.emotion,32)||null,motion:d((b=a.cue)==null?void 0:b.motion,32)||null,until:d((S=a.cue)==null?void 0:S.until,64)||null}},n=d(a.viewPreset,16).toLowerCase();r.viewPreset=Ot.includes(n)?n:null;const s=et(r.page.until);r.page.mode==="pinned"&&(r.page.target?r.page.until&&(!s||s<=e)&&(r.page={mode:"auto",target:null,until:null}):r.page={mode:"auto",target:null,until:null});const l=et(r.cue.until);return r.cue.until&&(!l||l<=e)&&(r.cue={cue:null,emotion:null,motion:null,until:null}),r}function De(t,e,a=Date.now()){return ue(ve(ue(t,a),L(e)?e:{}),a)}function Ht(t,e,a=Date.now()){return ue({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function zt(t,e,a=3e4,r=Date.now()){const n=d(e,40),s=new Date(r+Math.max(5e3,Number(a)||0)).toISOString();return ue({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},r)}function yt(t,e){var l,o,h;const a={...t||{}},r=d((l=e==null?void 0:e.cue)==null?void 0:l.cue,32),n=d((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),s=d((h=e==null?void 0:e.cue)==null?void 0:h.motion,32);return r&&(a.cue=r),n&&(a.emotion=n),s&&(a.motion=s),a}function Me(t){const e=d(t,64).toLowerCase();return e==="page"||/^page\s+\d+$/.test(e)}function bt(t){if(!L(t))return!1;for(const[e,a]of Object.entries(t))if(e!=="type"&&(typeof a=="string"&&d(a,255)||typeof a=="number"&&Number.isFinite(a)||typeof a=="boolean"))return!0;return!1}function jt(t,e){if(t.kind==="overview"||t.kind==="forecast+cards"||(Array.isArray(t.cards)?t.cards.filter(o=>bt(o)):[]).length>0)return!0;const r=d(t.title,64),n=d(t.subtitle||"",140),s=d(t.stampCaption||"",32),l=d(t.stampValue||"",32);return n||l?!0:!r||Me(r)||Me(t.id)||e>=1&&r===`Page ${e+1}`?!1:!Me(s)}function _(t,e){const a=Number(t);return Number.isFinite(a)?Math.max(0,a):e}function ze(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function qe(t){return L(t)&&L(t.config)?t.config:t}function wt(t,e){const a=e.map(n=>t.find(s=>s.id===n)).filter(Boolean),r=t.filter(n=>!a.some(s=>s.id===n.id));return a.concat(r)}function Vt(t,e){const a={...t};return L(e)&&(typeof e.id=="string"&&(a.id=d(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(r=>L(r)))),a}function Wt(t,e){const a=qe(t),r=Array.isArray(e.pages)?e.pages.slice():[],n=L(a)&&Array.isArray(a.pages)?a.pages:[],s=r.map(S=>{const $=n.find(P=>d(L(P)?P.id:"",40)===S.id),x=Vt(S,$);return Array.isArray(x.cards)&&(x.cards=x.cards.filter(P=>bt(P))),x}).filter((S,$)=>jt(S,$)),l=L(a)&&L(a.rotation)?a.rotation:{},o=L(e.display)?e.display:{},h=L(a)&&L(a.display)?a.display:{},m=L(o.safeArea)?o.safeArea:{},i=L(h.safeArea)?h.safeArea:{},p=Array.isArray(l.order)?l.order:e.rotation.order,b=vt(p).filter((S,$,x)=>s.some(P=>P.id===S)&&x.indexOf(S)===$);return{version:1,rotation:{order:b.length?b:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(l.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:_(i.top,_(m.top,0)),right:_(i.right,_(m.right,0)),bottom:_(i.bottom,_(m.bottom,0)),left:_(i.left,_(m.left,0))},layoutPaddingPx:_(h.layoutPaddingPx,_(o.layoutPaddingPx,16)),layoutGapPx:_(h.layoutGapPx,_(o.layoutGapPx,16)),globalScale:ze(h.globalScale,ze(o.globalScale,1))},pages:s}}function Kt(t,e){var s;const a=Wt(t,e),r=qe(t),n=L(r)&&L(r.avatar)?{packId:typeof r.avatar.packId=="string"&&d(r.avatar.packId,120)||null}:{packId:typeof((s=e.avatar)==null?void 0:s.packId)=="string"&&d(e.avatar.packId,120)||null};return{version:1,kind:"scene.display",rotation:{order:a.rotation.order.slice(),defaultDwellMs:a.rotation.defaultDwellMs},display:{safeAreaPx:{...a.display.safeAreaPx},layoutPaddingPx:a.display.layoutPaddingPx,layoutGapPx:a.display.layoutGapPx,globalScale:a.display.globalScale},avatar:n,pages:wt(a.pages,a.rotation.order)}}function qt(t){return L(t)&&t.kind==="scene.display"&&Number(t.version)===1&&L(t.rotation)&&Array.isArray(t.pages)&&L(t.display)&&L(t.display.safeAreaPx)}function Gt(t){var l,o;const e=Array.isArray(t.pages)?t.pages.filter(h=>L(h)):[],a=Array.isArray((l=t.rotation)==null?void 0:l.order)?t.rotation.order:e.map(h=>h.id),r=vt(a).filter((h,m,i)=>e.some(p=>p.id===h)&&i.indexOf(h)===m),n=t.display.safeAreaPx,s=L(t.avatar)?{packId:typeof t.avatar.packId=="string"&&d(t.avatar.packId,120)||null}:{packId:null};return{version:1,kind:"scene.display",rotation:{order:r.length?r:e.map(h=>h.id),defaultDwellMs:Math.max(5e3,Number((o=t.rotation)==null?void 0:o.defaultDwellMs)||18e3)},display:{safeAreaPx:{top:_(n.top,0),right:_(n.right,0),bottom:_(n.bottom,0),left:_(n.left,0)},layoutPaddingPx:_(t.display.layoutPaddingPx,16),layoutGapPx:_(t.display.layoutGapPx,16),globalScale:ze(t.display.globalScale,1)},avatar:s,pages:wt(e,r)}}function Jt(t,e){if(qt(t))return Gt(t);const a=qe(t);if(!L(a))throw new Error("Scene runtime config must be a JSON object.");return Kt(a,a)}function Yt(t,e=220){const a=d(t,Math.max(e+20,e)),r={emotion:"",activity:"",cue:"",motion:""},n=a.replace(/\[(emotion|activity|cue|motion|page|preset|view|size)\s*:\s*([a-z0-9_-]+)\]/gi,(s,l,o)=>{const h=d(l,16).toLowerCase(),m=d(o,32).toLowerCase();return(h==="emotion"||h==="activity"||h==="cue"||h==="motion")&&m&&(r[h]=m)," "});return{text:d(n,e),emotion:r.emotion,activity:r.activity,cue:r.cue,motion:r.motion}}const St={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function pe(t,e={}){const a=L(t)?t:{},r={...St,...e};return{version:1,assistant:d(a.assistant??r.assistant,40),online:typeof a.online=="boolean"?a.online:r.online,busy:typeof a.busy=="boolean"?a.busy:r.busy,status:d(a.status??r.status,255),message:d(a.message??r.message,255),source:d(a.source??r.source,64),updatedAt:d(a.updatedAt??r.updatedAt,64),emotion:d(a.emotion??r.emotion,32)||null,activity:d(a.activity??r.activity,32)||null,cue:d(a.cue??r.cue,32)||null,intensity:Zt(a.intensity??r.intensity),speaking:typeof a.speaking=="boolean"?a.speaking:!!r.speaking,motion:d(a.motion??r.motion,32)||null,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):r.revision,event:d(a.event??r.event,64)}}function Zt(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Xt(t,e){return t.order[e]||t.order[0]||""}function Qt(t,e){const a=t.order.findIndex(r=>r===e);return a>=0?a:0}function ea(t,e,a,r){const n=Array.isArray(t.order)?t.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let l=1;l<=n.length;l+=1){const o=(s+l*a+n.length)%n.length;if(r(n[o]))return o}return s}function ta(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],r=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=t.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:Qt(t.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(t.force){const l=Xt(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(l)?t.activeIndex:Math.max(0,a.findIndex(h=>t.isEligible(h))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<r)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let s=t.activeIndex;for(let l=1;l<=a.length;l+=1){const o=(t.activeIndex+l)%a.length;if(t.isEligible(a[o])){s=o;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const xt={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},aa=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function at(t){const e=d(t,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:aa.some(a=>e.includes(a)):!1}function ra(t,e){const a=pe(t),r=d(a.status,72),n=d(a.message,220);if(!(a.online!==!1&&(at(r)||at(n))))return{state:a,hasTechnicalFailure:!1};const o=d(a.emotion,32).toLowerCase(),h=d(a.motion,32).toLowerCase();return{state:{...a,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:o==="error"?"calm":o||null,activity:d(a.activity,32).toLowerCase()==="error"?"idle":d(a.activity,32)||null,cue:d(a.cue,32)||null,intensity:a.intensity??null,speaking:!1,motion:h==="error"?"idle_soft":h||null},hasTechnicalFailure:!0}}function ia(t,e){const a=(e==null?void 0:e.copy)??xt,r=pe(t),n=Yt(r.message,220),s=ra({...r,message:n.text,emotion:d(r.emotion,32)||n.emotion||null,activity:d(r.activity,32)||n.activity||null,cue:d(r.cue,32)||n.cue||null,motion:d(r.motion,32)||n.motion||null},{healthyStatus:a.technicalHealthyLabel}),l=s.state,o=d(l.message,180),h=d(l.activity,32).toLowerCase(),m=l.online!==!1&&h!=="offline",i=!!l.busy||h==="thinking"||h==="busy"||h==="acting",p=l.speaking===!0||h==="speaking",b=m?i?a.busyLabel:o||p?a.speakingLabel:s.hasTechnicalFailure?a.technicalHealthyLabel:a.idleLabel:a.offlineLabel,S=o?a.messageCaption:s.hasTechnicalFailure?a.statusCaption:a.modeCaption,$=o||(m?i?a.busyBody:d(e==null?void 0:e.idleMonologue,220)||a.idleBody:a.offlineBody);return{state:l,hasTechnicalFailure:s.hasTechnicalFailure,caption:S,label:b,body:$,bodyKey:[S,b,$].join(":")}}function na(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function rt(t,e=-1){const a=Array.isArray(t)?t.map(n=>d(n,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let r=Math.floor(Math.random()*a.length);return a.length>1&&r===e&&(r=(r+1)%a.length),{line:a[r],index:r}}function sa(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),r=!!d(t==null?void 0:t.message,180);return e&&!a&&!r}const oa={cue:null,emotion:null,motion:null,until:null},la={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0},da=15e3;function ca(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function kt(t){return t.endsWith("/")?t:`${t}/`}function $t(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function Ce(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;if(a.startsWith("/")){const n=$t(t||window.location.href);if(n)return new URL(a.slice(1),n).toString();const s=new URL(window.location.href).origin;return new URL(a,s).toString()}const r=new URL(kt(d(t,1024)||"."),window.location.href);return new URL(a,r).toString()}function Ae(t){const e=d(t,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const a=$t(window.location.href);return a?new URL(e.slice(1),a).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function ua(t,e,a){const r=d(t.runtimeUrl,1024)||d(e.runtimeUrl,1024);return r?Ae(r):new URL("../avatar.html",new URL(kt(d(a,1024)||"."),window.location.href)).toString()}function pa(t,e){const a=d(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function fa(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"Поднимаю рендер аватара…":"Loading compatibility renderer..."}function Ct(t){return String(t||navigator.language||"").toLowerCase().startsWith("ru")?"Ассистент":"Assistant"}function ha(t,e){const a=String(t||navigator.language||"").toLowerCase(),r=d(e,40)||Ct(a);return a.startsWith("ru")?`${r}: аватар`:`${r} avatar`}function ma(t,e){const a=new URL(t,window.location.href),r={...e.query||{}};e.displayMode!==!1&&r.display==null&&(r.display=!0),r.externalState==null&&(r.externalState=!0);for(const[n,s]of Object.entries(r)){const l=d(n,64);if(!l||s==null)continue;const o=typeof s=="boolean"?s?"1":"0":String(s);a.searchParams.set(l,o)}return a.toString()}function it(t,e,a){const r=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),Ce(a,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([n,s])=>[d(n,64),Ae(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Ae(t.state.stateUrl),idleLinesUrl:Ae(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:Ce(a,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:Ce(a,e.fallbackPortrait||""),motionMapUrl:Ce(a,e.motionMapUrl||""),presetThumbs:r}}}class ga{constructor(e={}){v(this,"id","live2d");v(this,"options");v(this,"manifest");v(this,"rendererConfig");v(this,"host",null);v(this,"containerEl",null);v(this,"iframeEl",null);v(this,"splashEl",null);v(this,"splashTextEl",null);v(this,"assetRoot","");v(this,"rendererConfigBlobUrl","");v(this,"currentState");v(this,"currentCue",{...oa});v(this,"currentPreset","full");v(this,"currentBubble",{...la});v(this,"targetOrigin","*");v(this,"isReady",!1);v(this,"bubbleRevision",0);v(this,"readyTimeoutHandle",null);v(this,"handleWindowMessage",e=>{var n;const a=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!a||e.source!==a||!ca(e.data))return;const r=d(e.data.type,64);if(r==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}r==="neiri-avatar-ready"&&(this.isReady=!0,this.clearReadyTimeout(),this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Ke({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=He(e.rendererConfig||{}),this.currentState=pe({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const a=ua(this.options,this.manifest,this.assetRoot),r={...this.options.query||{}};try{if(new URL(a,window.location.href).origin===window.location.origin){const m=it(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(m)],{type:"application/json"})),r.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const n=ma(a,{...this.options,query:r});this.targetOrigin=pa(n,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const l=document.createElement("iframe");l.className="ks-live2d-iframe",l.src=n,l.title=d(this.options.iframeTitle,80)||ha(this.rendererConfig.assistant.locale||"",this.rendererConfig.assistant.name),l.loading="eager",l.allow="autoplay",Object.assign(l.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&l.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);s.append(l,o),this.host.append(s),l.addEventListener("load",()=>{this.armReadyTimeout(),this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=l,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.clearReadyTimeout(),this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=pe(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const r=d(e,255);this.currentBubble={text:r,key:r?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const r=document.createElement("div");Object.assign(r.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||Ct(this.rendererConfig.assistant.locale||""),Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent=fa(),Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),r.append(n,s),a.append(r),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}clearReadyTimeout(){this.readyTimeoutHandle!=null&&(window.clearTimeout(this.readyTimeoutHandle),this.readyTimeoutHandle=null)}armReadyTimeout(){this.clearReadyTimeout(),this.readyTimeoutHandle=window.setTimeout(()=>{this.isReady||(console.warn("Live2D iframe did not report ready in time; hiding splash guard."),this.setSplashVisible(!1))},da)}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:it(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=yt(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var r;const a=(r=this.iframeEl)==null?void 0:r.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function va(t={}){return new ga(t)}const ya={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},nt={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class ba{constructor(e={}){v(this,"id","static");v(this,"options");v(this,"host",null);v(this,"frameEl",null);v(this,"imageEl",null);v(this,"bubbleEl",null);v(this,"fallbackEl",null);v(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const r=document.createElement("img");r.className="ks-static-avatar-image",Object.assign(r.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),r.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(r,n,s),this.host.append(a),this.frameEl=a,this.imageEl=r,this.bubbleEl=s,this.fallbackEl=n;const l=this.resolveImageUrl(e.assetRoot);l&&(r.src=l,r.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),r.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||nt,r=a[e]||a.full||nt.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(r.x)||0}px, ${Number(r.y)||0}px) scale(${Number(r.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const r=String(e||"").trim();if(!r){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=r,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return ya}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const r=e.replace(/\/+$/,""),n=a.replace(/^\.?\//,"");return r?`${r}/${n}`:n}}function wa(t={}){return new ba(t)}function Sa(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function Pt(){var t;for(const e of Sa())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),r=a==null?void 0:a.hass;if(r!=null&&r.states)return r}catch{continue}return null}function xa(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function It(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const r=d(a.entity_id,255);r&&(e[r]=a)}return e}function ka(t,e,a="Assistant"){const r=t[e.status],n=t[e.message],s=t[e.online],l=t[e.busy],o=t[e.source],h=t[e.updatedAt],m=e.emotion?t[e.emotion]:null,i=e.activity?t[e.activity]:null,p=e.cue?t[e.cue]:null,b=e.speaking?t[e.speaking]:null,S=e.intensity?t[e.intensity]:null,$=e.motion?t[e.motion]:null,x=t[e.revision];if(!r&&!n&&!s&&!l)return null;const P=d(r==null?void 0:r.state,72),U=d(n==null?void 0:n.state,220),W=d(h==null?void 0:h.state,64),G=Ne(s,!0),E=Ne(l,!1),z=d(i==null?void 0:i.state,32)||"",M=Ne(b)??z==="speaking",X=z||(G?M?"speaking":E?"thinking":"idle":"offline");return pe({version:1,assistant:d(a,40)||"Assistant",online:G,busy:E,status:P&&P!=="unknown"&&P!=="unavailable"?P:"",message:U&&U!=="unknown"&&U!=="unavailable"?U:"",source:d(o==null?void 0:o.state,64)||"ha",updatedAt:W&&W!=="unknown"&&W!=="unavailable"?W:(r==null?void 0:r.last_changed)||new Date().toISOString(),emotion:d(m==null?void 0:m.state,32)||null,activity:X,cue:d(p==null?void 0:p.state,32)||null,intensity:Ia(S),speaking:M,motion:d($==null?void 0:$.state,32)||null,revision:Number(x==null?void 0:x.state)||0})}const $a=["full","torso","head"];function Ca(t){const e=d(t==null?void 0:t.state,16).toLowerCase();return $a.includes(e)?e:null}function Pa(t,e){const a=e.viewPreset?t[e.viewPreset]:null,r=e.pageMode?t[e.pageMode]:null,n=e.pageTarget?t[e.pageTarget]:null,s=e.pageUntil?t[e.pageUntil]:null,l=e.cue?t[e.cue]:null,o=e.emotion?t[e.emotion]:null,h=e.motion?t[e.motion]:null,m=e.cueUntil?t[e.cueUntil]:null,i=e.revision?t[e.revision]:null;if(!a&&!r&&!n&&!l&&!o&&!h)return null;const p=d(n==null?void 0:n.state,40)||null,b=d(s==null?void 0:s.state,64)||null,S=d(r==null?void 0:r.state,16).toLowerCase(),$=S==="auto"?"auto":S==="pinned"||p||b?"pinned":"auto";return ue({...Z,revision:Number(i==null?void 0:i.state)||0,viewPreset:Ca(a),page:{mode:$,target:$==="pinned"?p:null,until:$==="pinned"?b:null},cue:{cue:d(l==null?void 0:l.state,32)||null,emotion:d(o==null?void 0:o.state,32)||null,motion:d(h==null?void 0:h.state,32)||null,until:d(m==null?void 0:m.state,64)||null}})}function Ne(t,e){const a=d(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function Ia(t){const e=d(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function Et(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),r=Math.max(6e4,t.authCooldownMs??600*1e3),n=d(t.apiUrl,4096);let s=null,l=0,o=null,h=0;async function m(){var $;const i=Pt();if(i!=null&&i.states)return i.states;const p=Date.now();if(s&&p-l<a||!n&&!t.allowApiFallback||typeof e!="function"||p<h)return s;if(o)return o;const b=n?"":d((($=t.readToken)==null?void 0:$.call(t))??xa(),4096);if(!n&&!b)return s;const S={};return b&&(S.Authorization=`Bearer ${b}`),o=e(n||"/api/states",{cache:"no-store",headers:S}).then(async x=>{if(!x.ok){const P=new Error(`HA states HTTP ${x.status}`);throw P.status=x.status,P}return x.json()}).then(x=>{const P=It(x);return P&&(s=P,l=Date.now()),P||s}).catch(x=>(((x==null?void 0:x.status)===401||(x==null?void 0:x.status)===403)&&(h=Date.now()+r),s)).finally(()=>{o=null}),o}return{id:"ha-states",async read(){return m()}}}async function Ge(t){const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=d(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const r=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");r.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await e(r.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return t.sanitize?t.sanitize(s):s}catch(n){if(t.defaultValue!==void 0)return t.defaultValue;throw n}}function Ea(t){return{id:"json-state",async read(){const e=await Ge({...t,defaultValue:t.defaultValue});return pe(e)}}}function Aa(t){return{id:"json-control",async read(){const e=await Ge({...t,defaultValue:t.defaultValue??Z});return ue(e)}}}function Ua(t){return{id:"json-lines",async read(){const e=await Ge({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>d(a,220)).filter(Boolean):[]}}}function j(t,e,a=64){return d(t[e],a)}function he(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Ta(t,e="en-US"){const a=d(t,64);if(!a)return"";const r=new Date(a);return Number.isNaN(r.getTime())?a:r.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Pe(t,e){return!t||!e?null:t[e]||null}function La(t,e=null,a="en-US"){var p,b,S,$;const r=j(t,"caption",40)||j(t,"type",24)||"Card",n=j(t,"hint",72),s=j(t,"type",32).toLowerCase()||"entity",l=j(t,"entity",255),o=Pe(e,l),h=Pe(e,j(t,"stateEntity",255)),m=Pe(e,j(t,"downEntity",255)),i=Pe(e,j(t,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:r,value:j(t,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const x=Number(o==null?void 0:o.state);return!Number.isFinite(x)||x<=0?{caption:r,value:"Clear",hint:n||"nothing pending"}:{caption:r,value:`${x} item${x===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const x=(o==null?void 0:o.state)==="on";return{caption:r,value:x?j(t,"onText",48)||"On":j(t,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const x=he(o==null?void 0:o.state,0);return{caption:r,value:x?`${x}%`:"—",hint:d(h==null?void 0:h.state,48)||n||"battery level"}}if(s==="network"){const x=he(m==null?void 0:m.state,0),P=he(i==null?void 0:i.state,0);return{caption:r,value:x||P?`↓ ${x||"0"} · ↑ ${P||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:r,value:Ta(o==null?void 0:o.state,a)||"—",hint:n||"next event"};if(s==="percent"){const x=he(o==null?void 0:o.state,Number(j(t,"digits",4))||0);return{caption:r,value:x?`${x}%`:"—",hint:n||d((p=o==null?void 0:o.attributes)==null?void 0:p.friendly_name,48)||"state percentage"}}if(s==="number"){const x=Number(j(t,"digits",4))||0,P=he(o==null?void 0:o.state,x),U=j(t,"unit",16)||d((b=o==null?void 0:o.attributes)==null?void 0:b.unit_of_measurement,16);return{caption:r,value:P?`${P}${U?` ${U}`:""}`:"—",hint:n||d((S=o==null?void 0:o.attributes)==null?void 0:S.friendly_name,48)||"numeric value"}}return{caption:r,value:d(o==null?void 0:o.state,64)||j(t,"value",64)||"—",hint:n||d(($=o==null?void 0:o.attributes)==null?void 0:$.friendly_name,48)||"entity state"}}function Ra(t,e=null,a="en-US"){return Array.isArray(t)?t.map(r=>La(r,e,a)):[]}const At={...xt,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Ut={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},Tt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Da={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Ue={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function w(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Je(t){return t.endsWith("/")?t:`${t}/`}function Ma(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function O(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(t,window.location.href);if(a.startsWith("/")){const n=Ma(r.toString());return n?new URL(a.slice(1),n).toString():new URL(a,r.origin).toString()}return new URL(a,r).toString()}function Lt(t){try{return new URL(".",t).toString()}catch{return new URL(".",window.location.href).toString()}}function Na(t,e){const a=Lt(e),r=O(a,d(t.assetRoot,1024)||"./assets"),n=r?Je(r):a,s=l=>{const o=d(l,1024);return o?O(n,o):""};return{...t,assetRoot:r,runtimeUrl:O(a,t.runtimeUrl||""),entry:s(t.entry||""),modelUrl:s(t.modelUrl||""),fallbackPortrait:s(t.fallbackPortrait||""),motionMapUrl:s(t.motionMapUrl||""),expressionMapUrl:s(t.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([l,o])=>[l,O(a,o)]).filter(([,l])=>!!l))}}function Be(t){return{...Ue,...t||{},metrics:{...Ue.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)&&t.forecast.length?t.forecast.map(e=>({...e})):Ue.forecast.map(e=>({...e}))}}function Fe(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function q(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const r=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:r})}function Ba(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const r=d(e,24).toLowerCase();return r==="mmhg"||r==="мм рт. ст."?`${q(a)} мм рт. ст.`:`${q(a*.750061683,0)} мм рт. ст.`}function Fa(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const r=d(e,24).toLowerCase();return r==="m/s"||r==="м/с"?`${q(a,1)} м/с`:r==="km/h"||r==="км/ч"?`${q(a/3.6,1)} м/с`:`${q(a,1)} м/с`}function _a(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Oa(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function Ha(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function za(t,e="ru-RU"){const a=d(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||d(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function st(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function ja(t,e="./assets/icons"){const a=Number(t),r=Je(e);return a===0?`${r}sun.svg`:[1,2].includes(a)?`${r}cloud-sun.svg`:[3].includes(a)?`${r}cloud.svg`:[45,48].includes(a)?`${r}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${r}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${r}cloud-snow.svg`:[95,96,99].includes(a)?`${r}cloud-lightning.svg`:`${r}cloud.svg`}function Va(t){const e=d(t.locale,32)||"ru-RU",a=d(t.iconBaseUrl,1024)||"./assets/icons",r=Et({allowApiFallback:t.allowApiFallback,apiUrl:t.apiUrl,fetchImpl:t.fetchImpl});return async()=>{var $,x,P,U,W,G,E,z,F,M,X,ye,be,we,Se,xe,ke,$e,fe,u;const n=await r.read(),s=t.fetchImpl??globalThis.fetch,l=n==null?void 0:n[t.weatherEntity];let o=null;const h=d(t.openMeteoUrl,4096);if(h&&typeof s=="function")try{const f=await s(`${h}${h.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});f.ok&&(o=await f.json())}catch{o=null}if(!l&&!(o!=null&&o.current))return null;const m=d(l==null?void 0:l.last_changed,64)||d(($=o==null?void 0:o.current)==null?void 0:$.time,64)||new Date().toISOString(),i=l?za(l.state,e):st((x=o==null?void 0:o.current)==null?void 0:x.weather_code,e),p=Array.isArray((P=o==null?void 0:o.daily)==null?void 0:P.time)?o.daily.time.map((f,c)=>{var A,T,N,I,ee;const y=new Date(`${f}T12:00:00+03:00`);return{name:y.toLocaleDateString(e,{weekday:"short"}),dayNumber:y.toLocaleDateString(e,{day:"numeric"}),monthShort:y.toLocaleDateString(e,{month:"short"}),note:d(st((A=o.daily.weather_code)==null?void 0:A[c],e),28),max:`${q((T=o.daily.temperature_2m_max)==null?void 0:T[c])}°`,min:`${q((N=o.daily.temperature_2m_min)==null?void 0:N[c])}° · ${q((I=o.daily.precipitation_probability_max)==null?void 0:I[c])}%`,icon:ja((ee=o.daily.weather_code)==null?void 0:ee[c],a)}}):[],b=p[0]||null,S=p.slice(1,6);return{todayValue:Oa(m,e),todayLabel:Ha(m,e),updatedAt:_a(m,e),temperature:q(((U=l==null?void 0:l.attributes)==null?void 0:U.temperature)??((W=o==null?void 0:o.current)==null?void 0:W.temperature_2m),1),condition:i,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${q(((G=l==null?void 0:l.attributes)==null?void 0:G.apparent_temperature)??((E=o==null?void 0:o.current)==null?void 0:E.apparent_temperature)??((z=l==null?void 0:l.attributes)==null?void 0:z.temperature),1)}°C`,badgeSummary:i,badgeRange:b?`${b.max} / ${q((M=(F=o==null?void 0:o.daily)==null?void 0:F.temperature_2m_min)==null?void 0:M[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${q(((X=l==null?void 0:l.attributes)==null?void 0:X.humidity)??((ye=o==null?void 0:o.current)==null?void 0:ye.relative_humidity_2m))}%`,pressure:Ba(((be=l==null?void 0:l.attributes)==null?void 0:be.pressure)??((we=o==null?void 0:o.current)==null?void 0:we.surface_pressure),((Se=l==null?void 0:l.attributes)==null?void 0:Se.pressure_unit)??"hPa"),wind:Fa(((xe=l==null?void 0:l.attributes)==null?void 0:xe.wind_speed)??((ke=o==null?void 0:o.current)==null?void 0:ke.wind_speed_10m),(($e=l==null?void 0:l.attributes)==null?void 0:$e.wind_speed_unit)??"km/h"),clouds:`${q(((fe=l==null?void 0:l.attributes)==null?void 0:fe.cloud_coverage)??((u=o==null?void 0:o.current)==null?void 0:u.cloud_cover))}%`},forecast:S}}}class Wa{constructor(e,a={}){v(this,"root");v(this,"options");v(this,"avatarMountEl");v(this,"carouselShellEl");v(this,"carouselTrackEl");v(this,"dotsEl");v(this,"presetButtons");v(this,"copy");v(this,"labels");v(this,"presetLabels");v(this,"rendererConfig");v(this,"avatarManifest");v(this,"sceneConfig");v(this,"sceneRuntimeConfig");v(this,"entityMap",null);v(this,"controlEntityMap",null);v(this,"haStatesReader",null);v(this,"weatherData");v(this,"hassStates",null);v(this,"currentState");v(this,"remoteControl",Z);v(this,"uiControl",Z);v(this,"currentControl",Z);v(this,"idleLines",[]);v(this,"activeIndex",0);v(this,"lastAutoRotateAt",0);v(this,"currentIdleLine","");v(this,"lastIdleIndex",-1);v(this,"currentPreset","full");v(this,"idleTimer",null);v(this,"avatarAdapter",null);v(this,"refreshIntervalHandle",null);v(this,"stateStream",null);v(this,"orderedPages",[]);v(this,"carouselDragState",null);v(this,"lastPageStructureKey","");v(this,"slideMarkupCache",new Map);v(this,"lastDotsMarkup","");v(this,"lastAvatarStateKey","");v(this,"lastAvatarCueKey","");v(this,"lastAvatarBubbleKey","");v(this,"lastAvatarPreset","");this.root=e,this.options=a,this.copy={...At,...a.copy||{}},this.labels={...Ut,...a.labels||{}},this.presetLabels={...Tt,...a.presetLabels||{}},this.weatherData=Be(a.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="${w(this.labels.avatarPresetGroup)}">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${w(this.presetLabels.full)}" aria-label="${w(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${w(this.presetLabels.torso)}" aria-label="${w(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${w(this.presetLabels.head)}" aria-label="${w(this.presetLabels.head)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="head">
                </button>
              </div>
              <div class="avatar-mount" data-avatar-mount></div>
            </div>
          </section>

          <section class="panel content-panel">
            <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="${w(this.labels.carouselRegion)}">
              <div class="carousel-track" data-carousel-track></div>
              <div class="carousel-dots" data-dots aria-label="${w(this.labels.pagesRegion)}"></div>
            </div>
          </section>
        </div>
      </div>
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=O(window.location.href,this.getRendererConfigUrl()),a=Lt(e),r=He(await this.readJson(e)),n=He({...r,links:Object.fromEntries(Object.entries(r.links||{}).map(([l,o])=>[l,O(a,o)])),avatar:{...r.avatar,manifestUrl:O(a,r.avatar.manifestUrl)},scene:{...r.scene,configUrl:O(a,r.scene.configUrl)},state:{...r.state,stateUrl:O(a,r.state.stateUrl),apiUrl:r.state.apiUrl?O(a,r.state.apiUrl):void 0,idleLinesUrl:O(a,r.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:r.state.entityMapUrl?O(a,r.state.entityMapUrl):void 0},control:{...r.control,controlUrl:O(a,r.control.controlUrl),apiUrl:r.control.apiUrl?O(a,r.control.apiUrl):void 0,entityMapUrl:r.control.entityMapUrl?O(a,r.control.entityMapUrl):void 0}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=Na(Ke(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.sceneRuntimeConfig=Jt(this.sceneConfig),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await Ua({url:this.rendererConfig.state.idleLinesUrl||O(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=De(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.connectStateStream()||(this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??1e4))}async dispose(){var e,a;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null,(a=this.stateStream)==null||a.close(),this.stateStream=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}getStateStreamUrl(){return d(this.options.stateStreamUrl,2048)}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=Ht(this.uiControl,a||"full"),this.refresh()})}bindCarouselControls(){let e=0,a=0,r=0;const n=(p,b,S,$)=>this.orderedPages.length<2||this.isCarouselInteractiveTarget($)?!1:(this.carouselDragState={pointerId:p,startX:b,startY:S,deltaX:0,deltaY:0,locked:!1},!0),s=(p,b,S)=>{if(!this.carouselDragState||p!==this.carouselDragState.pointerId)return!1;if(this.carouselDragState.deltaX=b-this.carouselDragState.startX,this.carouselDragState.deltaY=S-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return!1;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX))return this.clearDragState(p,!1),!1;this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}return this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX}),!0},l=p=>{if(!this.carouselDragState||p!==this.carouselDragState.pointerId)return;const{locked:b,deltaX:S}=this.carouselDragState,$=this.carouselShellEl.clientWidth||1,x=b&&Math.abs(S)>=$*.16,P=S<0?1:-1;if(this.clearDragState(p,!1),x){this.stepPage(P);return}this.updateCarouselPosition()},o=()=>Date.now()-e>500&&Date.now()-r>500,h=()=>Date.now()-e>500&&Date.now()-a>500;this.carouselShellEl.addEventListener("keydown",p=>{if(p.key==="ArrowLeft"){p.preventDefault(),this.stepPage(-1);return}p.key==="ArrowRight"&&(p.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",p=>{var b,S;p.button!==0||p.pointerType==="mouse"&&Date.now()-a<500||(e=Date.now(),n(p.pointerId,p.clientX,p.clientY,p.target)&&(p.preventDefault(),(S=(b=this.carouselShellEl).setPointerCapture)==null||S.call(b,p.pointerId)))}),this.carouselShellEl.addEventListener("pointermove",p=>{!this.carouselDragState||p.pointerId!==this.carouselDragState.pointerId||(e=Date.now(),s(p.pointerId,p.clientX,p.clientY)&&p.preventDefault())});const m=p=>{e=Date.now(),l(p.pointerId)};this.carouselShellEl.addEventListener("pointerup",m),this.carouselShellEl.addEventListener("pointercancel",m),this.carouselShellEl.addEventListener("lostpointercapture",m),this.carouselShellEl.addEventListener("touchstart",p=>{var S;if(!o())return;const b=(S=p.changedTouches)==null?void 0:S[0];b&&n(`touch-${b.identifier}`,b.clientX,b.clientY,p.target)&&(a=Date.now(),p.preventDefault(),p.stopPropagation())},{passive:!1}),this.carouselShellEl.addEventListener("touchmove",p=>{if(!o()||!this.carouselDragState)return;const b=Array.from(p.changedTouches||[]).find(S=>{var $;return`touch-${S.identifier}`===(($=this.carouselDragState)==null?void 0:$.pointerId)});b&&(a=Date.now(),s(`touch-${b.identifier}`,b.clientX,b.clientY)&&(p.preventDefault(),p.stopPropagation()))},{passive:!1});const i=p=>{if(!o()||!this.carouselDragState)return;const b=Array.from(p.changedTouches||[]).find(S=>{var $;return`touch-${S.identifier}`===(($=this.carouselDragState)==null?void 0:$.pointerId)});b&&(a=Date.now(),p.preventDefault(),p.stopPropagation(),l(`touch-${b.identifier}`))};this.carouselShellEl.addEventListener("touchend",i,{passive:!1}),this.carouselShellEl.addEventListener("touchcancel",i,{passive:!1}),this.carouselShellEl.addEventListener("mousedown",p=>{p.button!==0||!h()||n("mouse-fallback",p.clientX,p.clientY,p.target)&&(r=Date.now(),p.preventDefault())}),window.addEventListener("mousemove",p=>{!this.carouselDragState||this.carouselDragState.pointerId!=="mouse-fallback"||(r=Date.now(),s("mouse-fallback",p.clientX,p.clientY)&&p.preventDefault())}),window.addEventListener("mouseup",p=>{!this.carouselDragState||this.carouselDragState.pointerId!=="mouse-fallback"||(r=Date.now(),p.button===0&&p.preventDefault(),l("mouse-fallback"))})}connectStateStream(){const e=this.getStateStreamUrl();if(!e||typeof EventSource>"u")return!1;const a=O(window.location.href,e),r=new EventSource(a);return r.onmessage=n=>{try{const s=JSON.parse(String(n.data||"null")),l=It(Array.isArray(s)?s:s==null?void 0:s.states);if(!l)return;this.refresh(l)}catch(s){console.warn("Failed to parse state stream payload",s)}},r.onerror=()=>{console.warn("Scene state stream disconnected; keeping EventSource reconnect logic active.")},this.stateStream=r,!0}async refresh(e){const a=e??await this.readSceneStates();this.currentState=await this.readAssistantState(a),this.hassStates=a,this.remoteControl=await this.readRemoteControl(this.currentControl,a),this.uiControl=De(Z,this.uiControl),this.currentControl=De(this.remoteControl,this.uiControl);const r=yt(this.currentState,this.currentControl);this.syncIdleMonologue(r);const n=ia(r,{idleMonologue:this.currentIdleLine,copy:this.copy}),s=this.sceneRuntimeConfig;this.applyDisplayConfig(s);const l=s.pages,o=ta({control:this.currentControl,rotation:s.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:h=>l.some(m=>m.id===h)});if(this.activeIndex=o.nextIndex,this.lastAutoRotateAt=o.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.syncAvatarPresentation(n),this.renderCarousel(l,n)}renderCarousel(e,a){this.orderedPages=e.slice();const r=JSON.stringify(e.map(l=>({id:l.id,kind:l.kind,title:l.title,subtitle:l.subtitle||"",slot:l.slot??null,cardStyle:l.cardStyle||"",stampCaption:l.stampCaption||"",stampValue:l.stampValue||"",cards:Array.isArray(l.cards)?l.cards.map(o=>({type:d(o.type,32),entity:d(o.entity,255),stateEntity:d(o.stateEntity,255),downEntity:d(o.downEntity,255),upEntity:d(o.upEntity,255),caption:d(o.caption,48),hint:d(o.hint,72)})):[]}))),n=e.map((l,o)=>l.kind==="overview"?this.renderOverviewSlide(l,a,o):this.renderDynamicSlide(l,o,e.length)),s=e.map((l,o)=>`
      <button
        class="carousel-dot ${o===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${o}"
        data-scene-page-id="${w(l.id)}"
        aria-label="${w(d(l.title,40)||d(l.id,40)||`${this.labels.pageStamp} ${o+1}`)}"
      ></button>
    `).join("");if(r!==this.lastPageStructureKey){this.carouselTrackEl.innerHTML=n.join(""),this.dotsEl.innerHTML=s,this.lastPageStructureKey=r,this.lastDotsMarkup=s,this.slideMarkupCache=new Map(e.map((l,o)=>[l.id,n[o]]));for(const l of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))l.addEventListener("click",()=>{this.pinPageByIndex(Number(l.dataset.slideIndex)||0)})}else{const l=Array.from(this.carouselTrackEl.children);if(n.forEach((o,h)=>{const m=e[h];if(this.slideMarkupCache.get(m.id)===o)return;const i=l[h];if(!i)return;const p=document.createElement("template");p.innerHTML=o.trim();const b=p.content.firstElementChild;b&&(i.replaceWith(b),this.slideMarkupCache.set(m.id,o))}),this.lastDotsMarkup!==s){this.dotsEl.innerHTML=s,this.lastDotsMarkup=s;for(const o of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))o.addEventListener("click",()=>{this.pinPageByIndex(Number(o.dataset.slideIndex)||0)})}}this.updateCarouselPosition(),this.updateDotState()}renderOverviewSlide(e,a,r){const n=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||Ue,l=s.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="${w(e.id)}" data-scene-page-id="${w(e.id)}" data-slide-order="${r}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${w(s.title)}</h1>
              <p class="subline">${w(s.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${w(s.todayCaption)}</span>
                <span class="value">${w(s.todayValue)}</span>
                <span class="meta">${w(s.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${w(s.updatedCaption)}</span>
                <span class="value">${w(s.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${w(s.temperature)}</span>
                <span class="unit">°${w(s.unit)}</span>
              </div>
              <div class="condition">${w(s.condition)}</div>
              <div class="feels">${w(s.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${w(this.resolveIconUrl("thermometer"))}" alt=""><span>${w(s.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${w(this.resolveIconUrl("calendarDays"))}" alt=""><span>${w(s.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${w(a.caption)}</strong>
                  <div class="neiri-label">${w(a.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${w(this.resolveIconUrl("sparkles"))}" alt="${w(n)}"></div>
              </div>
              <div class="neiri-meta">${w(a.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${w(this.labels.humidity)}</span><i><img src="${w(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${w(s.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${w(this.labels.pressure)}</span><i><img src="${w(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${w(s.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${w(this.labels.wind)}</span><i><img src="${w(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${w(s.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${w(this.labels.clouds)}</span><i><img src="${w(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${w(s.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${w(s.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${l}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,a,r){const n=Ra(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),l=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),o=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${a+1} / ${r}`),h=e.cardStyle==="mini"?n.map((S,$)=>`
          <article class="mini-card" data-scene-card-index="${$}" data-scene-page-id="${w(e.id)}">
            <span class="caption">${w(S.caption)}</span>
            <strong>${w(S.value)}</strong>
          </article>
        `).join(""):n.map((S,$)=>`
          <article class="home-card" data-scene-card-index="${$}" data-scene-page-id="${w(e.id)}">
            <span class="caption">${w(S.caption)}</span>
            <strong>${w(S.value)}</strong>
            <small>${w(S.hint)}</small>
          </article>
        `).join(""),m=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(S=>this.renderForecastDay(S)).join("")}</div>`:"",i=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",p=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${a+1}`,b=d(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${w(e.id)}" data-scene-page-id="${w(e.id)}" data-slide-order="${a}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${w(e.kind)}" data-dynamic-card-style="${w(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${w(p)}</h1>
              ${b?`<p class="subline">${w(b)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${w(l)}</span>
              <span class="value">${w(o)}</span>
            </div>
          </div>
          ${m}
          <div class="${i}">
            ${h||`<div class="empty">${w(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `}renderForecastDay(e){return`
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${w(e.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${w(e.name)}</span>
            <span class="meta"><span class="day-number">${w(e.dayNumber)}</span><span class="day-month">${w(e.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${w(e.max)}</strong>
          <small>${w(e.min)}</small>
        </div>
        <div class="day-note">${w(e.note)}</div>
      </article>
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const a=e[0],r=e[e.length-1];return`${d(a.dayNumber,4)} ${d(a.monthShort,8)} → ${d(r.dayNumber,4)} ${d(r.monthShort,8)}`}resolveIconUrl(e){var n;const a=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return a||`${Je(d(this.options.iconBaseUrl,1024)||"./assets")}${Da[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:r,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${r}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,r=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${r}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,a){var r,n;typeof e=="number"&&!a&&((n=(r=this.carouselShellEl).hasPointerCapture)!=null&&n.call(r,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=ea(this.sceneRuntimeConfig.rotation,this.activeIndex,e,r=>this.orderedPages.some(n=>n.id===r));this.pinPageByIndex(a)}pinPageByIndex(e){const r=(this.orderedPages.length?this.orderedPages:this.sceneRuntimeConfig.pages)[e];if(!r)return;const n=Math.max(18e3,this.sceneRuntimeConfig.rotation.defaultDwellMs*2);this.uiControl=zt(this.uiControl,r.id,n),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!sa(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=rt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const a=rt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refresh()},na(18e3,18e3))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: HTTP ${a.status}`);return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:Et({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl})}async readAssistantState(e){var n;const a=async()=>Ea({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??St}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap)return a();const r=e??await((n=this.haStatesReader)==null?void 0:n.read())??null;return r&&ka(r||{},this.entityMap,this.rendererConfig.assistant.name)||a()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=Z,a){var s;const r=async()=>Aa({url:this.rendererConfig.control.controlUrl,defaultValue:e}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap)return r();const n=a??await((s=this.haStatesReader)==null?void 0:s.read())??null;return n&&Pa(n||{},this.controlEntityMap)||r()}async syncAvatarPresentation(e){if(!this.avatarAdapter)return;const a=JSON.stringify(e.state);a!==this.lastAvatarStateKey&&(await this.avatarAdapter.setState(e.state),this.lastAvatarStateKey=a);const r=JSON.stringify(this.currentControl.cue||Z.cue);r!==this.lastAvatarCueKey&&(await this.avatarAdapter.setCue(this.currentControl.cue),this.lastAvatarCueKey=r),this.currentPreset!==this.lastAvatarPreset&&(await this.avatarAdapter.setViewPreset(this.currentPreset),this.lastAvatarPreset=this.currentPreset);const n=e.body||"";n!==this.lastAvatarBubbleKey&&(await this.avatarAdapter.showBubble(e.body,{ttlMs:0,speak:!1,typewriter:!1}),this.lastAvatarBubbleKey=n)}async readWeatherData(){const e={...this.options.defaultWeather||{}};let a={...e};try{const r=await this.readJson(this.getWeatherUrl());a=Fe(a,r)}catch{}if(a=Fe(a,e),this.options.weatherReader)try{const r=await this.options.weatherReader();a=Fe(a,r)}catch{}try{return Be(a)}catch{return Be(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return va({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return wa({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const r=a.dataset.avatarPreset||"",n=a.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[r];a.classList.toggle("is-active",r===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function Ka(t,e={}){const a=new Wa(t,e);return await a.init(),a}const qa=["overview","cards","forecast+cards"],Ga=["full","mini"],Rt=["entity","text","todo","onoff","battery","network","time","percent","number"],Y=["caption","hint"],Ie="/local/live2d/",ot="/scene-legacy/live2d/",Ja={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Ya={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Za=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Xa=4*1024*1024,Qa=192*1024,Te=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],je="mellow-fly-7";function de(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function er(t){return Te.find(e=>e.id===t)||Te.find(e=>e.id===je)||Te[0]}function tr(t){return`${t.width} × ${t.height}`}function g(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ye(t){return JSON.parse(JSON.stringify(t))}function J(t){const e=new Map(t.pages.map(n=>[n.id,n])),a=t.rotation.order.map(n=>e.get(n)).filter(Boolean),r=t.pages.filter(n=>!a.some(s=>s.id===n.id));return[...a,...r]}function ar(t,e){return e?Math.max(0,J(t).findIndex(a=>a.id===e)):0}function rr(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Dt(t,e){const a=rr(e);let r=a,n=2;for(;t.pages.some(s=>s.id===r);)r=`${a}-${n}`,n+=1;return r}function ir(t){const e=t.pages.length+1,a=de()==="ru";return{id:Dt(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function lt(t){const e=de()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function V(t,e){const a=t[e];return a==null?"":String(a)}function Q(t,e){const a=t[e];return a==null?"":String(a)}function re(t,e){const a=t.display||{},r=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(r.top))?Number(r.top):0);case"safeRight":return String(Number.isFinite(Number(r.right))?Number(r.right):0);case"safeBottom":return String(Number.isFinite(Number(r.bottom))?Number(r.bottom):0);case"safeLeft":return String(Number.isFinite(Number(r.left))?Number(r.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function nr(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function _e(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function dt(t){return t.avatar||(t.avatar={}),t.avatar}function sr(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function or(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function lr(t){var r;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&J(t).some(n=>n.id===a)?a:((r=J(t)[0])==null?void 0:r.id)||null}async function dr(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return Ye(a.config)}async function cr(t,e){const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),r=await a.json();if(!a.ok||r.success===!1||!r.config)throw new Error(`POST ${t} failed: HTTP ${a.status}`);return Ye(r.config)}function Ze(t){switch(t){case"text":return[...Y,"value"];case"todo":return[...Y,"entity"];case"onoff":return[...Y,"entity","onText","offText"];case"battery":return[...Y,"entity","stateEntity"];case"network":return[...Y,"downEntity","upEntity"];case"time":return[...Y,"entity"];case"percent":return[...Y,"entity","digits"];case"number":return[...Y,"entity","digits","unit"];default:return[...Y,"entity"]}}function Oe(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:t.kindOverview}function ce(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function Mt(t){const e=de();return Ja[e][t]||""}function Le(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function ur(t,e){const a=e.attributes||{},r=String(a.friendly_name||t),n=t.includes(".")&&t.split(".",1)[0]||"other",s=String(e.state||""),l=String(a.unit_of_measurement||"");return{entityId:t,name:r,domain:n,state:s,unit:l}}function pr(t){return t?Object.entries(t).map(([e,a])=>ur(e,a)).sort((e,a)=>{const r=e.domain.localeCompare(a.domain);return r!==0?r:e.name.localeCompare(a.name,"ru")}):[]}function fr(t,e){const a=e.trim().toLowerCase();return a?t.filter(r=>r.entityId.toLowerCase().includes(a)||r.name.toLowerCase().includes(a)||r.domain.toLowerCase().includes(a)||r.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function hr(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():null}function ne(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(e,window.location.href);if(a.startsWith("/")){const n=hr(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,r).toString()}function Xe(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ie))return ne(`${ot}${a.slice(Ie.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const r=new URL(a,e);if(r.pathname.startsWith(Ie)){const n=r.pathname.slice(Ie.length);return ne(`${ot}${n}${r.search}${r.hash}`,e)}}catch{return a}return a}function mr(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function gr(t,e){const a=new URL("./",t).toString(),r=ne(Xe(e,a)||e,a);return mr(r||a)}function ct(t,e,a){const r=String(a||"").trim();return r?ne(Xe(r,t)||r,gr(t,e)):""}function vr(t,e){const a=String(e||"").trim();return a?ne(Xe(a,t)||a,new URL("./",t).toString()):""}function Nt(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}function Ve(t,e){const a=Nt(t);return{...a,manifestUrl:a.manifestUrl?ne(a.manifestUrl,e):"",previewUrl:a.previewUrl?ne(a.previewUrl,e):""}}async function yr(t,e){var m;const a=String(t||"").trim();if(!a)return null;const r=await fetch(a,{cache:"no-store"}),n=await r.json();if(!r.ok)throw new Error(`GET ${a} failed: HTTP ${r.status}`);const s=String(n.assetRoot||"").trim();let l=0;const o=ct(a,s,String(n.motionMapUrl||"").trim());if(o)try{const i=await fetch(o,{cache:"no-store"}),p=await i.json();i.ok&&Array.isArray(p.motions)&&(l=p.motions.length)}catch{l=0}const h=vr(a,String(((m=n.presetThumbs)==null?void 0:m.full)||"").trim())||ct(a,s,String(n.fallbackPortrait||"").trim());return Nt({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:a,previewUrl:h,motionCount:l,capabilities:n.capabilities})}async function ut(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),r=await a.json();if(!a.ok||r.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(r.items)?r.items.map(n=>Ve(n,e)).filter(n=>n.id&&n.manifestUrl):[]}async function br(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const r=/\/api\/hassio_ingress\//.test(a),n=r?Qa:Xa;if(r||e.size>n){const h=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,m=Math.max(1,Math.ceil(e.size/n));let i=null;for(let p=0;p<m;p+=1){const b=p*n,S=Math.min(e.size,b+n),$=new FormData;$.set("uploadId",h),$.set("filename",e.name),$.set("chunkIndex",String(p)),$.set("chunkCount",String(m)),$.set("archive",e.slice(b,S,"application/zip"),`${e.name}.part-${p+1}-of-${m}`);const x=await fetch(a,{method:"POST",body:$}),P=await x.json();if(!x.ok||P.success===!1)throw new Error(String(P.error||`HTTP ${x.status}`));P.item&&(i=Ve(P.item,a))}if(!i)throw new Error("Avatar import did not return the imported pack.");return i}const s=new FormData;s.set("archive",e,e.name);const l=await fetch(a,{method:"POST",body:s}),o=await l.json();if(!l.ok||o.success===!1||!o.item)throw new Error(String(o.error||`HTTP ${l.status}`));return Ve(o.item,a)}async function wr(t,e){var l,o,h,m;const a=String(t||"").trim(),r=String(e||"").trim();if(!a||!r)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${a}?packId=${encodeURIComponent(r)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((l=s.motionMap)==null?void 0:l.motions)?(o=s.motionMap)==null?void 0:o.motions.map(i=>({index:Number(i.index),id:String(i.id||"").trim(),label:String(i.label||i.id||"").trim(),group:String(i.group||"").trim(),tags:Array.isArray(i.tags)?i.tags.map(p=>String(p||"").trim()).filter(Boolean):[]})).filter(i=>Number.isFinite(i.index)):[],semantic:typeof((h=s.motionMap)==null?void 0:h.semantic)=="object"&&((m=s.motionMap)!=null&&m.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function Sr(t,e){var s,l,o;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const r=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await r.json();if(!r.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${r.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((l=n.motionMap)==null?void 0:l.semantic)=="object"&&((o=n.motionMap)!=null&&o.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function xr(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function kr(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function $r(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Za.map(r=>`
          <div class="field">
            <label for="avatar-semantic-${g(r.key)}">${g(kr(t,r))}</label>
            <select id="avatar-semantic-${g(r.key)}" data-avatar-semantic="${g(r.key)}">
              <option value="">${g(t.avatarMotionNone)}</option>
              ${a.map(n=>`
                <option value="${g(String(n.index))}"${xr(e.motionMap.semantic[r.key])===String(n.index)?" selected":""}>
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
  `}function pt(t,e,a){var i,p,b,S,$;const r=(e==null?void 0:e.id)||"",n=a===r,s=(e==null?void 0:e.name)||t.avatarPackDefaultTile,l=(e==null?void 0:e.id)||t.avatarPackCurrent,o=(e==null?void 0:e.previewUrl)||"",h=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(i=e.capabilities)!=null&&i.supportsMotion?t.avatarCapabilityMotion:"",(p=e.capabilities)!=null&&p.supportsEmotion?t.avatarCapabilityEmotion:"",(b=e.capabilities)!=null&&b.supportsLipSync?t.avatarCapabilityLipSync:"",(S=e.capabilities)!=null&&S.supportsViewPresets?t.avatarCapabilityViewPresets:"",($=e.capabilities)!=null&&$.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],m=h.length?h:[t.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${o?`<img src="${g(o)}" alt="${g(s)}">`:`<span>${g(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${g(s)}</strong>
        <div class="meta">${g(l)}</div>
        <div class="avatar-pack-card-meta">
          ${m.map(x=>`<span>${g(x)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${g(r)}">
          ${g(n?t.avatarPackSelected:t.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function Qe(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function Cr(t,e,a,r){if(!e||a===null)return`<div class="meta">${g(t.entityBindingEmpty)}</div>`;const n=Ze(V(e,"type")||"entity").filter(s=>Qe(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(r==null?void 0:r.cardIndex)===a&&r.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${g(s)}">
            ${g(Le(t,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${g(t.entityBindingNoTargets)}</div>`}function ft(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function se(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function ht(t){return Ze(t).find(e=>Qe(e))||null}function oe(t,e,a,r=!1){return`
    <div class="field ${r?"is-wide":""}">
      <label for="page-field-${e}">${g(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${g(e)}" value="${g(a)}">
    </div>
  `}function ie(t,e,a){const r=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${g(t)}</label>
      <input id="display-field-${e}" type="number" step="${r}" data-display-field="${g(e)}" value="${g(a)}">
    </div>
  `}function mt(t,e,a,r){return`
    <div class="field">
      <label for="page-select-${e}">${g(t)}</label>
      <select id="page-select-${e}" data-page-field="${g(e)}">
        ${r.map(n=>`<option value="${g(n.value)}"${n.value===a?" selected":""}>${g(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function Pr(t,e,a,r){const n=V(e,"type")||"entity",s=Ze(n);return`
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
            ${Rt.map(l=>`<option value="${l}"${l===n?" selected":""}>${g(ce(t,l))}</option>`).join("")}
          </select>
        </div>
        ${s.map(l=>{const o=Qe(l),h=o&&(r==null?void 0:r.cardIndex)===a&&r.field===l;return o?`
              <div class="field ${l==="hint"?"is-wide":""} is-binding-field${h?" is-active":""}">
                <label>${g(Le(t,l))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${a}"
                    data-card-field="${g(l)}"
                    data-binding-field="${g(l)}"
                    value="${g(V(e,l))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${a}"
                    data-binding-field="${g(l)}"
                  >${t.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${l==="hint"?"is-wide":""}">
              <label>${g(Le(t,l))}</label>
              <input
                type="${l==="digits"?"number":"text"}"
                data-card-index="${a}"
                data-card-field="${g(l)}"
                value="${g(V(e,l))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Ir(t,e,a,r,n){const s=V(e,"type")||"entity",l=V(e,"caption")||ce(t,s),o=V(e,"entity")||V(e,"stateEntity")||V(e,"downEntity")||V(e,"upEntity")||V(e,"value")||V(e,"hint")||Mt(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
        <strong>${g(l)}</strong>
        <span class="meta">${g(ce(t,s))}</span>
        <div class="meta">${g(o)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===r-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function Er(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${g(e)}"
    >
      <strong>${g(ce(t,e))}</strong>
      <span>${g(Mt(e))}</span>
    </button>
  `}function Ar(t,e,a){t[e]=a.entityId;const r=t;String(r.caption||"").trim()||(r.caption=a.name),String(r.hint||"").trim()||(r.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(r.type==="number"||r.type==="percent")&&!String(r.unit||"").trim()&&a.unit&&(r.unit=a.unit)}async function Ur(t){var fe;const e=Ya[de()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const r=document.getElementById("scene-editor-shell");r!=null&&r.contains(a)&&document.body.insertBefore(a,r),r==null||r.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
                ${Te.map(u=>`<option value="${g(u.id)}">${g(u.label[de()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),l=n.querySelector("[data-preview-canvas]"),o=n.querySelector("[data-preview-resolution]"),h=n.querySelector("[data-preview-display]"),m=n.querySelector("[data-dashboard]");if(!s||!l||!o||!h||!m)throw new Error("Missing native editor shell elements");l.appendChild(a);const i={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:je,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},p=async u=>{const f=String(u||"").trim();if(!f||!t.avatarPackApiUrl){i.avatarPackDetails=null,i.avatarPackLoading=!1,i.avatarPackDirty=!1;return}i.avatarPackLoading=!0,E();try{i.avatarPackDetails=await wr(t.avatarPackApiUrl,f),i.avatarPackDirty=!1}catch(c){i.avatarPackDetails=null,i.avatarPackDirty=!1,z(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{i.avatarPackLoading=!1}},b=()=>{var N;const u=er(i.previewDisplayId),f=Math.max(320,((N=s.parentElement)==null?void 0:N.clientWidth)||s.clientWidth||u.width),c=Math.max(260,Math.min(window.innerHeight*.62,760)),y=Math.min(1,f/u.width,c/u.height),A=Math.round(u.width*y),T=Math.round(u.height*y);h.value=u.id,o.textContent=tr(u),s.style.aspectRatio=`${u.width} / ${u.height}`,s.style.width=`${A}px`,s.style.height=`${T}px`,l.style.width=`${u.width}px`,l.style.height=`${u.height}px`,l.style.transform=`scale(${y})`,a.style.width=`${u.width}px`,a.style.height=`${u.height}px`},S=u=>{i.previewDisplayId=String(u||"").trim()||je,b()},$=u=>{i.pendingAvatarZip=u,i.pendingAvatarZipName=(u==null?void 0:u.name)||"",i.avatarImportStatus="",i.avatarImportTone="muted",E(),u&&x(u)},x=async u=>{if(!(!i.config||!t.avatarImportUrl||i.avatarImporting)){i.pendingAvatarZip=null,i.avatarImporting=!0,i.avatarImportStatus=e.avatarImporting,i.avatarImportTone="muted",E();try{const f=await br(t.avatarImportUrl,u);i.avatarCatalog=t.avatarCatalogUrl?await ut(t.avatarCatalogUrl):[f],dt(i.config).packId=f.id,await p(f.id),i.pendingAvatarZip=null,i.pendingAvatarZipName="",i.avatarImporting=!1,i.avatarImportStatus=e.avatarImportSuccess(f.name||f.id),i.avatarImportTone="ok",M(),E()}catch(f){i.avatarImporting=!1,i.avatarImportStatus=`${e.avatarImportError}: ${String(f)}`,i.avatarImportTone="bad",E()}}},P=typeof ResizeObserver<"u"?new ResizeObserver(()=>b()):null;P==null||P.observe(s.parentElement||s);let U=null;const W=()=>{const u=i.selectedPageId||"",f=i.selectedCardIndex;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=a.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&f!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${f}"]`,y=a.querySelector(c);y&&(y.dataset.editorSelectedCard="true")}},G=typeof MutationObserver<"u"?new MutationObserver(()=>W()):null;G==null||G.observe(a,{childList:!0,subtree:!0});const E=()=>{const u=i.config,f=u?J(u):[],c=f.find(k=>k.id===i.selectedPageId)||f[0]||null,y=Array.isArray(c==null?void 0:c.cards)?c.cards:[],A=i.selectedCardIndex!==null&&y[i.selectedCardIndex]||null,T=fr(i.haEntities,i.entitySearch),N=i.focusedBinding?e.entityBindingActive(V(y[i.focusedBinding.cardIndex],"caption")||`${e.cards} #${i.focusedBinding.cardIndex+1}`,Le(e,i.focusedBinding.field)):e.entityBindingEmpty,I=u?_e(u):"",ee=i.avatarImportStatus?`<div class="scene-editor-status" data-tone="${i.avatarImportTone}">${g(i.avatarImportStatus)}</div>`:"",C=i.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,H=c?`${c.title||c.id||e.pageSettings} · ${Oe(e,c.kind)}`:e.statusLoading;m.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${i.statusTone}">${g(i.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${g(t.sceneUrl)}">${e.viewOnly}</a>
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
              <div class="meta">${C}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${pt(e,i.bundledAvatar,I)}
                ${i.avatarCatalog.map(k=>pt(e,k,I)).join("")}
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
              ${ee}
            </div>
            ${I?i.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:i.avatarPackDetails?$r(e,i.avatarPackDetails):"":""}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(t.packId)}</div>
              <div class="meta">${e.pageOrderHint}</div>
            </div>
            <div class="page-list">
            ${f.map((k,R)=>`
              <article class="page-chip ${k.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${g(k.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${g(k.id)}">
                  <strong>${g(k.title||k.id||(de()==="ru"?`Страница ${R+1}`:`Page ${R+1}`))}</strong>
                  <span class="meta">${g(Oe(e,k.kind))} · ${g(e.pageCards(Array.isArray(k.cards)?k.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${g(k.id)}"${R===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${g(k.id)}"${R===f.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${g(k.id)}"${f.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pageSettings}</h2>
              <div class="meta">${g(H)}</div>
            </div>
          ${c?`
            <div class="inspector-grid">
              ${oe(e.fieldPageId,"id",Q(c,"id"),!0)}
              ${mt(e.fieldKind,"kind",Q(c,"kind"),qa.map(k=>({value:k,label:Oe(e,k)})))}
              ${oe(e.fieldTitle,"title",Q(c,"title"),!0)}
              ${oe(e.fieldSubtitle,"subtitle",Q(c,"subtitle"),!0)}
              ${oe(e.fieldSlot,"slot",Q(c,"slot"))}
              ${mt(e.fieldCardStyle,"cardStyle",Q(c,"cardStyle")||"full",Ga.map(k=>({value:k,label:k==="mini"?e.styleMini:e.styleFull})))}
              ${oe(e.fieldStampCaption,"stampCaption",Q(c,"stampCaption"))}
              ${oe(e.fieldStampValue,"stampValue",Q(c,"stampValue"))}
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
                  ${Rt.map(k=>Er(e,k)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${y.length?y.map((k,R)=>Ir(e,k,R,y.length,R===i.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${A?Pr(e,A,i.selectedCardIndex||0,i.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              <div class="meta">${g(N)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${Cr(e,A,i.selectedCardIndex,i.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${g(i.entitySearch)}">
          </div>
          <div class="ha-list">
            ${T.length?T.map(k=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${g(k.name)}</strong>
                    <div class="meta">${g(k.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${g(k.entityId)}"${i.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${g(k.entityId)}</code>
                <div class="ha-state">${g(k.state)}${k.unit?` · ${g(k.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const B=m.querySelector("[data-avatar-archive]"),te=m.querySelector("[data-action='choose-avatar-archive']");te==null||te.addEventListener("click",()=>{if(!B||B.disabled)return;B.value="";const k=B;try{if(typeof k.showPicker=="function"){k.showPicker();return}}catch{}B.click()}),B==null||B.addEventListener("click",()=>{B.value=""}),B==null||B.addEventListener("change",()=>{var R;const k=((R=B.files)==null?void 0:R[0])||null;$(k),B.value=""});for(const k of Array.from(m.querySelectorAll(".page-chip[data-page-id]")))k.draggable=!0,k.addEventListener("dragstart",R=>{const K=String(k.dataset.pageId||"").trim();U=K?{kind:"page",pageId:K}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),k.addEventListener("dragover",R=>{!U||U.kind!=="page"||(R.preventDefault(),se(n),k.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),k.addEventListener("drop",R=>{if(!U||U.kind!=="page")return;R.preventDefault();const K=String(k.dataset.pageId||"").trim();K&&Se(U.pageId,K),U=null,se(n)}),k.addEventListener("dragend",()=>{U=null,se(n)});for(const k of Array.from(m.querySelectorAll(".card-list-item[data-card-index]")))k.draggable=!0,k.addEventListener("dragstart",R=>{const K=Number(k.dataset.cardIndex||"-1");U=Number.isFinite(K)&&K>=0?{kind:"card",cardIndex:K}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),k.addEventListener("dragover",R=>{!U||U.kind!=="card"||(R.preventDefault(),se(n),k.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),k.addEventListener("drop",R=>{if(!U||U.kind!=="card")return;R.preventDefault();const K=Number(k.dataset.cardIndex||"-1");Number.isFinite(K)&&K>=0&&xe(U.cardIndex,K),U=null,se(n)}),k.addEventListener("dragend",()=>{U=null,se(n)});b(),W()},z=(u,f)=>{i.status=u,i.statusTone=f,E()},F=()=>{if(!i.config)return;const u=J(i.config);if(!u.length){i.selectedPageId=null;return}(!i.selectedPageId||!u.some(y=>y.id===i.selectedPageId))&&(i.selectedPageId=u[0].id);const f=u.find(y=>y.id===i.selectedPageId)||null,c=Array.isArray(f==null?void 0:f.cards)?f.cards:[];c.length?(i.selectedCardIndex===null||i.selectedCardIndex>=c.length)&&(i.selectedCardIndex=0):(i.selectedCardIndex=null,i.focusedBinding=null),or(i.selectedPageId),sr(ar(i.config,i.selectedPageId))},M=()=>{i.dirty=!0,z(e.statusDirty,"muted")},X=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),i.selectedPageId&&u.searchParams.set("editorPage",i.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},ye=(u,f)=>{if(!i.config||!i.selectedPageId)return;const c=i.config.pages.find(y=>y.id===i.selectedPageId);if(c){if(u==="slot")c.slot=f===""?void 0:Number(f);else if(u==="id"){const y=Dt(i.config,f||"page"),A=c.id;c.id=y,i.config.rotation.order=i.config.rotation.order.map(T=>T===A?y:T),i.selectedPageId=y}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=f:u==="kind"?c.kind=f:u==="cardStyle"&&(c.cardStyle=f);M(),F()}},be=(u,f)=>{if(!i.config)return;const c=nr(i.config),y=c.safeArea||{},A=f===""?null:Number(f),T=Number.isFinite(A)?A:null;u==="safeTop"?y.top=T??0:u==="safeRight"?y.right=T??0:u==="safeBottom"?y.bottom=T??0:u==="safeLeft"?y.left=T??0:u==="layoutPaddingPx"?c.layoutPaddingPx=T??16:u==="layoutGapPx"?c.layoutGapPx=T??16:u==="globalScale"&&(c.globalScale=T??1),c.safeArea=y,M()},we=(u,f,c)=>{var T;if(!i.config||!i.selectedPageId)return;const y=i.config.pages.find(N=>N.id===i.selectedPageId);if(!y)return;Array.isArray(y.cards)||(y.cards=[]);const A=y.cards[u];if(A){if(f==="type"){const N=lt(c);if(y.cards[u]={...N,caption:V(A,"caption")||N.caption},((T=i.focusedBinding)==null?void 0:T.cardIndex)===u){const I=ht(c);i.focusedBinding=I?{cardIndex:u,field:I}:null}}else f==="digits"?A[f]=c===""?0:Number(c):A[f]=c;M()}},Se=(u,f)=>{if(!i.config||!u||!f||u===f)return;const c=J(i.config).map(T=>T.id),y=c.indexOf(u),A=c.indexOf(f);y<0||A<0||(c.splice(y,1),c.splice(A,0,u),i.config.rotation.order=c,i.selectedPageId=u,i.selectedCardIndex=0,i.focusedBinding=null,M(),F(),E())},xe=(u,f)=>{if(!i.config||!i.selectedPageId||u===f)return;const c=i.config.pages.find(A=>A.id===i.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||f<0||u>=c.cards.length||f>=c.cards.length)return;const[y]=c.cards.splice(u,1);c.cards.splice(f,0,y),i.selectedCardIndex=f,i.focusedBinding=null,M(),E()},ke=u=>{if(!i.config||!i.selectedPageId||!i.focusedBinding)return;const f=i.config.pages.find(A=>A.id===i.selectedPageId),c=i.haEntities.find(A=>A.entityId===u);if(!f||!Array.isArray(f.cards)||!c)return;const y=f.cards[i.focusedBinding.cardIndex];y&&(Ar(y,i.focusedBinding.field,c),M(),E())},$e=(u,f)=>{i.selectedCardIndex=u,i.focusedBinding={cardIndex:u,field:f},E(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async u=>{var ee,Re;const f=u.target,c=f==null?void 0:f.closest("[data-action]"),y=c==null?void 0:c.dataset.action;if(!y||!i.config)return;const A=J(i.config),T=(c==null?void 0:c.dataset.pageId)||null,N=T?A.findIndex(C=>C.id===T):-1;if(y==="select-page"&&T){i.selectedPageId=T,i.selectedCardIndex=0,i.focusedBinding=null,F(),E();return}if(y==="page-up"&&N>0){const C=A.map(H=>H.id);[C[N-1],C[N]]=[C[N],C[N-1]],i.config.rotation.order=C,i.selectedPageId=T,M(),F(),E();return}if(y==="page-down"&&N>=0&&N<A.length-1){const C=A.map(H=>H.id);[C[N],C[N+1]]=[C[N+1],C[N]],i.config.rotation.order=C,i.selectedPageId=T,M(),F(),E();return}if(y==="page-remove"&&T&&A.length>1){i.config.pages=i.config.pages.filter(C=>C.id!==T),i.config.rotation.order=J(i.config).map(C=>C.id),i.selectedPageId=((ee=J(i.config)[Math.max(0,N-1)])==null?void 0:ee.id)||((Re=J(i.config)[0])==null?void 0:Re.id)||null,i.selectedCardIndex=0,i.focusedBinding=null,M(),F(),E();return}if(y==="add-page"){const C=ir(i.config);i.config.pages.push(C),i.config.rotation.order=J(i.config).map(H=>H.id),i.selectedPageId=C.id,i.selectedCardIndex=null,i.focusedBinding=null,M(),F(),E();return}if(y==="add-card-template"&&i.selectedPageId){const C=i.config.pages.find(B=>B.id===i.selectedPageId),H=(c==null?void 0:c.dataset.cardType)||"entity";if(C){Array.isArray(C.cards)||(C.cards=[]),C.cards.push(lt(H));const B=C.cards.length-1;i.selectedCardIndex=B;const te=ht(H);i.focusedBinding=te?{cardIndex:B,field:te}:null,M(),E(),te&&window.requestAnimationFrame(()=>{const k=n.querySelector("#ha-entity-search");k==null||k.scrollIntoView({behavior:"smooth",block:"center"}),k==null||k.focus()})}return}if(y==="focus-binding"){const C=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),H=(c==null?void 0:c.dataset.bindingField)||"";C>=0&&H&&$e(C,H);return}const I=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(I>=0&&i.selectedPageId){const C=i.config.pages.find(H=>H.id===i.selectedPageId);if(!C||!Array.isArray(C.cards))return;if(y==="select-card"){i.selectedCardIndex=I,E();return}if(y==="card-remove"){C.cards=C.cards.filter((H,B)=>B!==I),i.selectedCardIndex!==null&&(i.selectedCardIndex===I?i.selectedCardIndex=C.cards.length?Math.min(I,C.cards.length-1):null:i.selectedCardIndex>I&&(i.selectedCardIndex-=1)),i.focusedBinding&&(i.focusedBinding.cardIndex===I?i.focusedBinding=null:i.focusedBinding.cardIndex>I&&(i.focusedBinding={cardIndex:i.focusedBinding.cardIndex-1,field:i.focusedBinding.field})),M(),E();return}if(y==="card-up"&&I>0){[C.cards[I-1],C.cards[I]]=[C.cards[I],C.cards[I-1]],i.selectedCardIndex===I?i.selectedCardIndex=I-1:i.selectedCardIndex===I-1&&(i.selectedCardIndex=I),i.focusedBinding&&(i.focusedBinding.cardIndex===I?i.focusedBinding={cardIndex:I-1,field:i.focusedBinding.field}:i.focusedBinding.cardIndex===I-1&&(i.focusedBinding={cardIndex:I,field:i.focusedBinding.field})),M(),E();return}if(y==="card-down"&&I<C.cards.length-1){[C.cards[I],C.cards[I+1]]=[C.cards[I+1],C.cards[I]],i.selectedCardIndex===I?i.selectedCardIndex=I+1:i.selectedCardIndex===I+1&&(i.selectedCardIndex=I),i.focusedBinding&&(i.focusedBinding.cardIndex===I?i.focusedBinding={cardIndex:I+1,field:i.focusedBinding.field}:i.focusedBinding.cardIndex===I+1&&(i.focusedBinding={cardIndex:I,field:i.focusedBinding.field})),M(),E();return}}if(y==="save"){i.saving=!0,i.avatarPackSaving=i.avatarPackDirty,z(e.saving,"muted");try{if(i.avatarPackDirty&&i.avatarPackDetails&&t.avatarPackApiUrl){try{i.avatarPackDetails=await Sr(t.avatarPackApiUrl,i.avatarPackDetails)}catch(C){throw new Error(`${e.avatarMappingSaveError}: ${String(C)}`)}i.avatarPackDirty=!1}i.config=await cr(t.sceneApiUrl,Ye(i.config)),i.dirty=!1,i.saving=!1,i.avatarPackSaving=!1,F(),z(e.statusSaved,"ok"),window.setTimeout(()=>X(),250)}catch(C){i.saving=!1,i.avatarPackSaving=!1,z(`${e.saveError}: ${String(C)}`,"bad")}return}if(y==="bind-entity"){const C=(c==null?void 0:c.dataset.entityId)||"";ke(C)}}),n.addEventListener("input",u=>{const f=u.target;if(!f||!i.config){f&&f.dataset.previewDisplay!==void 0&&S(f.value);return}if(f.dataset.previewDisplay!==void 0){S(f.value);return}if(f.dataset.avatarSemantic!==void 0){const c=_e(i.config);if(!i.avatarPackDetails||!c||i.avatarPackDetails.packId!==c)return;const y=f.value.trim();y?i.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic]=Number(y):delete i.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic],i.avatarPackDirty=!0,z(e.statusDirty,"muted"),E();return}if(f.dataset.pageField){ye(f.dataset.pageField,f.value),E();return}if(f.dataset.displayField){be(f.dataset.displayField,f.value),E();return}if(f.dataset.cardField&&f.dataset.cardIndex){i.selectedCardIndex=Number(f.dataset.cardIndex),we(Number(f.dataset.cardIndex),f.dataset.cardField,f.value),E();return}f.hasAttribute("data-ha-search")&&(i.entitySearch=f.value,E())}),n.addEventListener("click",u=>{var y;const f=(y=u.target)==null?void 0:y.closest("[data-action='select-avatar-pack']");if(!f||!i.config)return;const c=String(f.dataset.packId||"").trim();dt(i.config).packId=c||null,M(),p(c||null).finally(()=>E()),E()}),a.addEventListener("click",u=>{if(!i.config)return;const f=u.target,c=f==null?void 0:f.closest("[data-scene-card-index][data-scene-page-id]");if(c){const A=String(c.dataset.scenePageId||"").trim(),T=Number(c.dataset.sceneCardIndex||"-1");A&&Number.isFinite(T)&&T>=0&&(i.selectedPageId=A,i.selectedCardIndex=T,i.focusedBinding=null,F(),E(),ft("cards"));return}const y=f==null?void 0:f.closest("[data-scene-page-id]");if(y){const A=String(y.dataset.scenePageId||"").trim();A&&(i.selectedPageId=A,i.selectedCardIndex=0,i.focusedBinding=null,F(),E(),ft("pages"));return}}),n.addEventListener("change",u=>{var c;const f=u.target;!f||f.dataset.avatarArchive===void 0||$(((c=f.files)==null?void 0:c[0])||null)}),n.addEventListener("focusin",u=>{const f=u.target;if(!(f!=null&&f.dataset.bindingField))return;const c=Number(f.dataset.cardIndex||"-1");c<0||(i.selectedCardIndex=c,i.focusedBinding={cardIndex:c,field:f.dataset.bindingField})});try{if(i.config=await dr(t.sceneApiUrl),t.sceneAvatarManifestUrl)try{i.bundledAvatar=await yr(t.sceneAvatarManifestUrl,t.packId)}catch{i.bundledAvatar=null}if(t.avatarCatalogUrl)try{i.avatarCatalog=await ut(t.avatarCatalogUrl)}catch{i.avatarCatalog=[]}i.haEntities=pr(((fe=Pt())==null?void 0:fe.states)||null),i.selectedPageId=lr(i.config),i.selectedCardIndex=0,i.status=e.statusSaved,i.statusTone="ok",await p(_e(i.config)),F()}catch(u){i.status=`${e.loadError}: ${String(u)}`,i.statusTone="bad"}E()}const Tr="../scene-api/bootstrap",Lr="weather.forecast_home_assistant",Rr="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ee="/local/live2d/",gt="/scene-legacy/live2d/",Dr={...At,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Mr={...Ut,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},Nr={...Tt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Br={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Fr={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:t=>`Pack: ${t||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:t=>`Pack: ${t||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function _r(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Or(){return new URLSearchParams(window.location.search).get("bootstrap")||Tr}function Hr(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);if(a)return new URL(a[0],e.origin).toString();for(const r of["/scene-api/","/scene-runtime/","/scene-editor/"]){const n=e.pathname.indexOf(r);if(n>=0)return new URL(e.pathname.slice(0,n+1),e.origin).toString()}return null}function D(t,e){const a=zr(String(t||"").trim(),e);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(e,window.location.href);if(a.startsWith("/")){const n=Hr(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,r).toString()}function zr(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ee))return`${gt}${a.slice(Ee.length)}`;if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const r=new URL(a,new URL(e,window.location.href));if(r.pathname.startsWith(Ee)){const n=r.pathname.slice(Ee.length);return D(`${gt}${n}${r.search}${r.hash}`,e)||a}}catch{return a}return a}function jr(t,e){const a=Ke(t),r=a.adapter==="live2d"?D("../../scene-runtime/avatar.html",e):"",n=D(String(a.assetRoot||"").trim(),e),s=h=>{const m=String(h||"").trim();return m?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(m)||m.startsWith("/")?D(m,e):m:""},l=h=>{const m=String(h||"").trim();return m?D(m,e):""},o=Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([h,m])=>[h,D(String(m||""),e)]).filter(([,h])=>!!h));return{...a,assetRoot:n,runtimeUrl:r||D(String(a.runtimeUrl||"").trim(),e),entry:s(String(a.entry||"").trim()),modelUrl:s(String(a.modelUrl||"").trim()),fallbackPortrait:s(String(a.fallbackPortrait||"").trim()),motionMapUrl:l(String(a.motionMapUrl||"").trim()),presetThumbs:o}}function We(t,e,a,r){t.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${a}</p>
        ${r?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${r}</pre>`:""}
      </div>
    </section>
  `}function Bt(){return new URLSearchParams(window.location.search).get("editor")==="1"}function Vr(){if(!Bt())return;const t=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),t(),window.addEventListener("pageshow",t,{once:!0}),window.addEventListener("load",t,{once:!0}),window.requestAnimationFrame(()=>{t(),window.setTimeout(t,120)});let e=!1;const a=()=>{e=!0},r=["pointerdown","wheel","touchstart","keydown"];for(const l of r)window.addEventListener(l,a,{once:!0,passive:!0});let n=0;const s=window.setInterval(()=>{if(e||n>=24){window.clearInterval(s);return}t(),n+=1},80)}async function Wr(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return a}async function me(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return e.json()}function Kr(t,e){var a,r,n,s,l,o,h,m,i,p,b,S;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([$,x])=>[$,D(x,e)]).filter(([,$])=>!!$)),avatar:{manifestUrl:D(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:D(String(((r=t.scene)==null?void 0:r.configUrl)||"").trim(),e)},state:{provider:((n=t.state)==null?void 0:n.provider)||"json",stateUrl:D(String(((s=t.state)==null?void 0:s.stateUrl)||"").trim(),e),apiUrl:D(String(((l=t.state)==null?void 0:l.apiUrl)||"").trim(),e)||void 0,haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:D(String(((h=t.state)==null?void 0:h.idleLinesUrl)||"").trim(),e),entityMapUrl:D(String(((m=t.state)==null?void 0:m.entityMapUrl)||"").trim(),e)},control:{provider:((i=t.control)==null?void 0:i.provider)||"json",controlUrl:D(String(((p=t.control)==null?void 0:p.controlUrl)||"").trim(),e),apiUrl:D(String(((b=t.control)==null?void 0:b.apiUrl)||"").trim(),e)||void 0,entityMapUrl:D(String(((S=t.control)==null?void 0:S.entityMapUrl)||"").trim(),e)||void 0}}}async function qr(t,e){var $,x,P,U,W,G,E,z;const a=D(String((($=t.files)==null?void 0:$.rendererConfigUrl)||"").trim(),e);if(!a)return"";const r=D(String(((x=t.files)==null?void 0:x.sceneConfigUrl)||"").trim(),e),n=D(String(((P=t.files)==null?void 0:P.avatarCatalogUrl)||"").trim(),e);let s="";if(r&&n)try{const F=await me(r);s=String(((U=F.avatar)==null?void 0:U.packId)||"").trim()}catch{s=""}let l="";if(s&&n)try{const F=await me(n),M=Array.isArray(F.items)?F.items.find(X=>String(X.id||"").trim()===s):null;l=D(String((M==null?void 0:M.manifestUrl)||"").trim(),e)}catch{l=""}const o=Kr(await me(a),a);r&&(o.scene={...o.scene||{},configUrl:r});const h=D(String(((W=t.files)==null?void 0:W.haStatesUrl)||"").trim(),e);h&&(o.state={...o.state||{},apiUrl:((G=o.state)==null?void 0:G.apiUrl)||h},o.control={...o.control||{},apiUrl:((E=o.control)==null?void 0:E.apiUrl)||h});const m=l||String(((z=o.avatar)==null?void 0:z.manifestUrl)||"").trim();if(!m)return URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));const i=D(m,e),p=jr(await me(i),i),b=URL.createObjectURL(new Blob([JSON.stringify(p)],{type:"application/json"})),S={...o,avatar:{manifestUrl:b}};return URL.createObjectURL(new Blob([JSON.stringify(S)],{type:"application/json"}))}const ge=document.getElementById("app");if(!ge)throw new Error("Missing #app root element");const le=Fr[_r()];Vr();We(ge,le.startingTitle,le.startingBody);(async()=>{var e,a,r,n,s,l;const t=Or();try{const o=await Wr(t),h=String(o.packId||"").trim(),m=h.toLowerCase()==="neiri",i=await qr(o,t),p=i?await me(i):null;if(!i){We(ge,le.missingRendererTitle,le.missingRendererBody,JSON.stringify(o,null,2));return}document.documentElement.dataset.packId=h,document.title=m?"Нейри":h?`kiosk-scene hosted runtime (${h})`:"kiosk-scene hosted runtime",await Ka(ge,{rendererConfigUrl:i,stateStreamUrl:D(String(((e=o.files)==null?void 0:e.haStatesStreamUrl)||"").trim(),t)||void 0,weatherUrl:m?"./weather.json":void 0,weatherReader:m?Va({weatherEntity:Lr,openMeteoUrl:Rr,locale:"ru-RU",iconBaseUrl:"./assets",apiUrl:String(((a=p==null?void 0:p.state)==null?void 0:a.apiUrl)||"").trim()||void 0,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:m?Dr:void 0,labels:m?Mr:void 0,presetLabels:m?Nr:void 0,defaultWeather:m?Br:void 0}),Bt()&&await Ur({packId:h,sceneApiUrl:D(String(o.sceneEditorApiUrl||"").trim(),t),sceneAvatarManifestUrl:D(String(((r=o.files)==null?void 0:r.avatarManifestUrl)||"").trim(),t),avatarCatalogUrl:D(String(((n=o.files)==null?void 0:n.avatarCatalogUrl)||"").trim(),t),avatarImportUrl:D(String(((s=o.files)==null?void 0:s.avatarImportUrl)||"").trim(),t),avatarPackApiUrl:D(String(((l=o.files)==null?void 0:l.avatarPackApiUrl)||"").trim(),t),sceneUrl:D(String(o.entryUrl||o.runtimeBaseUrl||"./").trim(),t)})}catch(o){We(ge,le.failedTitle,le.failedBody,String(o))}})();
