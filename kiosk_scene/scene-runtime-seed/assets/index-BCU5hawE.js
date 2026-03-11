var Mt=Object.defineProperty;var Nt=(t,e,a)=>e in t?Mt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var x=(t,e,a)=>Nt(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function L(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function d(t,e=160){const a=String(t??"").replace(/\s+/g," ").trim();return a?a.length<=e?a:`${a.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Xe(t){const e=new Date(String(t??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ve(t,e){if(!L(t)||!L(e))return e??t;const a={...t};for(const[i,n]of Object.entries(e)){if(Array.isArray(n)){a[i]=n.slice();continue}if(L(n)&&L(a[i])){a[i]=ve(a[i],n);continue}a[i]=n}return a}function mt(t,e=40){return Array.isArray(t)?t.map(a=>d(a,e).toLowerCase()).filter(Boolean):[]}const ae={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},Qe={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function _e(t){var a,i,n,s,l,o,f,h,r,g,b,w,$,k;const e=ve(ae,L(t)?t:{});return{version:1,assistant:{name:d((a=e.assistant)==null?void 0:a.name,40)||ae.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:L(e.links)?Object.fromEntries(Object.entries(e.links).map(([I,U])=>[d(I,64),d(U,1024)]).filter(([I,U])=>I&&U)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||ae.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||ae.scene.configUrl},state:{provider:((l=e.state)==null?void 0:l.provider)==="ha"?"ha":"json",stateUrl:d((o=e.state)==null?void 0:o.stateUrl,1024)||ae.state.stateUrl,apiUrl:d((f=e.state)==null?void 0:f.apiUrl,1024)||void 0,haApiFallback:((h=e.state)==null?void 0:h.haApiFallback)===!0,idleLinesUrl:d((r=e.state)==null?void 0:r.idleLinesUrl,1024)||ae.state.idleLinesUrl,entityMapUrl:d((g=e.state)==null?void 0:g.entityMapUrl,1024)||void 0},control:{provider:((b=e.control)==null?void 0:b.provider)==="ha"?"ha":"json",controlUrl:d((w=e.control)==null?void 0:w.controlUrl,1024)||ae.control.controlUrl,apiUrl:d(($=e.control)==null?void 0:$.apiUrl,1024)||void 0,entityMapUrl:d((k=e.control)==null?void 0:k.entityMapUrl,1024)||void 0}}}function Ve(t){var a,i,n,s,l;const e=ve(Qe,L(t)?t:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||Qe.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:L(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,f])=>[d(o,32),d(f,1024)]).filter(([o,f])=>o&&f)):{},viewPresets:L(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,f])=>d(o,32)&&L(f))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((l=e.capabilities)==null?void 0:l.supportsPointerFocus)===!0}}}const Q={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},Bt=["full","torso","head"];function ue(t,e=Date.now()){var o,f,h,r,g,b,w;const a=ve(Q,L(t)?t:{}),i={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((o=a.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:d((f=a.page)==null?void 0:f.target,40)||null,until:d((h=a.page)==null?void 0:h.until,64)||null},cue:{cue:d((r=a.cue)==null?void 0:r.cue,32)||null,emotion:d((g=a.cue)==null?void 0:g.emotion,32)||null,motion:d((b=a.cue)==null?void 0:b.motion,32)||null,until:d((w=a.cue)==null?void 0:w.until,64)||null}},n=d(a.viewPreset,16).toLowerCase();i.viewPreset=Bt.includes(n)?n:null;const s=Xe(i.page.until);i.page.mode==="pinned"&&(i.page.target?i.page.until&&(!s||s<=e)&&(i.page={mode:"auto",target:null,until:null}):i.page={mode:"auto",target:null,until:null});const l=Xe(i.cue.until);return i.cue.until&&(!l||l<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function De(t,e,a=Date.now()){return ue(ve(ue(t,a),L(e)?e:{}),a)}function Ft(t,e,a=Date.now()){return ue({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function _t(t,e,a=3e4,i=Date.now()){const n=d(e,40),s=new Date(i+Math.max(5e3,Number(a)||0)).toISOString();return ue({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},i)}function vt(t,e){var l,o,f;const a={...t||{}},i=d((l=e==null?void 0:e.cue)==null?void 0:l.cue,32),n=d((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),s=d((f=e==null?void 0:e.cue)==null?void 0:f.motion,32);return i&&(a.cue=i),n&&(a.emotion=n),s&&(a.motion=s),a}function _(t,e){const a=Number(t);return Number.isFinite(a)?Math.max(0,a):e}function Oe(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function We(t){return L(t)&&L(t.config)?t.config:t}function yt(t,e){const a=e.map(n=>t.find(s=>s.id===n)).filter(Boolean),i=t.filter(n=>!a.some(s=>s.id===n.id));return a.concat(i)}function Ot(t,e){const a={...t};return L(e)&&(typeof e.id=="string"&&(a.id=d(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(i=>L(i)))),a}function Ht(t,e){const a=We(t),i=Array.isArray(e.pages)?e.pages.slice():[],n=L(a)&&Array.isArray(a.pages)?a.pages:[],s=i.map(w=>{const $=n.find(k=>d(L(k)?k.id:"",40)===w.id);return Ot(w,$)}),l=L(a)&&L(a.rotation)?a.rotation:{},o=L(e.display)?e.display:{},f=L(a)&&L(a.display)?a.display:{},h=L(o.safeArea)?o.safeArea:{},r=L(f.safeArea)?f.safeArea:{},g=Array.isArray(l.order)?l.order:e.rotation.order,b=mt(g).filter((w,$,k)=>s.some(I=>I.id===w)&&k.indexOf(w)===$);return{version:1,rotation:{order:b.length?b:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(l.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:_(r.top,_(h.top,0)),right:_(r.right,_(h.right,0)),bottom:_(r.bottom,_(h.bottom,0)),left:_(r.left,_(h.left,0))},layoutPaddingPx:_(f.layoutPaddingPx,_(o.layoutPaddingPx,16)),layoutGapPx:_(f.layoutGapPx,_(o.layoutGapPx,16)),globalScale:Oe(f.globalScale,Oe(o.globalScale,1))},pages:s}}function jt(t,e){var s;const a=Ht(t,e),i=We(t),n=L(i)&&L(i.avatar)?{packId:typeof i.avatar.packId=="string"&&d(i.avatar.packId,120)||null}:{packId:typeof((s=e.avatar)==null?void 0:s.packId)=="string"&&d(e.avatar.packId,120)||null};return{version:1,kind:"scene.display",rotation:{order:a.rotation.order.slice(),defaultDwellMs:a.rotation.defaultDwellMs},display:{safeAreaPx:{...a.display.safeAreaPx},layoutPaddingPx:a.display.layoutPaddingPx,layoutGapPx:a.display.layoutGapPx,globalScale:a.display.globalScale},avatar:n,pages:yt(a.pages,a.rotation.order)}}function zt(t){return L(t)&&t.kind==="scene.display"&&Number(t.version)===1&&L(t.rotation)&&Array.isArray(t.pages)&&L(t.display)&&L(t.display.safeAreaPx)}function Vt(t){var l,o;const e=Array.isArray(t.pages)?t.pages.filter(f=>L(f)):[],a=Array.isArray((l=t.rotation)==null?void 0:l.order)?t.rotation.order:e.map(f=>f.id),i=mt(a).filter((f,h,r)=>e.some(g=>g.id===f)&&r.indexOf(f)===h),n=t.display.safeAreaPx,s=L(t.avatar)?{packId:typeof t.avatar.packId=="string"&&d(t.avatar.packId,120)||null}:{packId:null};return{version:1,kind:"scene.display",rotation:{order:i.length?i:e.map(f=>f.id),defaultDwellMs:Math.max(5e3,Number((o=t.rotation)==null?void 0:o.defaultDwellMs)||18e3)},display:{safeAreaPx:{top:_(n.top,0),right:_(n.right,0),bottom:_(n.bottom,0),left:_(n.left,0)},layoutPaddingPx:_(t.display.layoutPaddingPx,16),layoutGapPx:_(t.display.layoutGapPx,16),globalScale:Oe(t.display.globalScale,1)},avatar:s,pages:yt(e,i)}}function Wt(t,e){if(zt(t))return Vt(t);const a=We(t);if(!L(a))throw new Error("Scene runtime config must be a JSON object.");return jt(a,a)}function qt(t,e=220){const a=d(t,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},n=a.replace(/\[(emotion|activity|cue|motion|page|preset|view|size)\s*:\s*([a-z0-9_-]+)\]/gi,(s,l,o)=>{const f=d(l,16).toLowerCase(),h=d(o,32).toLowerCase();return(f==="emotion"||f==="activity"||f==="cue"||f==="motion")&&h&&(i[f]=h)," "});return{text:d(n,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const bt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function pe(t,e={}){const a=L(t)?t:{},i={...bt,...e};return{version:1,assistant:d(a.assistant??i.assistant,40),online:typeof a.online=="boolean"?a.online:i.online,busy:typeof a.busy=="boolean"?a.busy:i.busy,status:d(a.status??i.status,255),message:d(a.message??i.message,255),source:d(a.source??i.source,64),updatedAt:d(a.updatedAt??i.updatedAt,64),emotion:d(a.emotion??i.emotion,32)||null,activity:d(a.activity??i.activity,32)||null,cue:d(a.cue??i.cue,32)||null,intensity:Gt(a.intensity??i.intensity),speaking:typeof a.speaking=="boolean"?a.speaking:!!i.speaking,motion:d(a.motion??i.motion,32)||null,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):i.revision,event:d(a.event??i.event,64)}}function Gt(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Kt(t,e){return t.order[e]||t.order[0]||""}function Yt(t,e){const a=t.order.findIndex(i=>i===e);return a>=0?a:0}function Jt(t,e,a,i){const n=Array.isArray(t.order)?t.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let l=1;l<=n.length;l+=1){const o=(s+l*a+n.length)%n.length;if(i(n[o]))return o}return s}function Zt(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],i=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=t.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:Yt(t.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(t.force){const l=Kt(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(l)?t.activeIndex:Math.max(0,a.findIndex(f=>t.isEligible(f))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<i)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let s=t.activeIndex;for(let l=1;l<=a.length;l+=1){const o=(t.activeIndex+l)%a.length;if(t.isEligible(a[o])){s=o;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const wt={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Xt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function et(t){const e=d(t,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Xt.some(a=>e.includes(a)):!1}function Qt(t,e){const a=pe(t),i=d(a.status,72),n=d(a.message,220);if(!(a.online!==!1&&(et(i)||et(n))))return{state:a,hasTechnicalFailure:!1};const o=d(a.emotion,32).toLowerCase(),f=d(a.motion,32).toLowerCase();return{state:{...a,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:o==="error"?"calm":o||null,activity:d(a.activity,32).toLowerCase()==="error"?"idle":d(a.activity,32)||null,cue:d(a.cue,32)||null,intensity:a.intensity??null,speaking:!1,motion:f==="error"?"idle_soft":f||null},hasTechnicalFailure:!0}}function ea(t,e){const a=(e==null?void 0:e.copy)??wt,i=pe(t),n=qt(i.message,220),s=Qt({...i,message:n.text,emotion:d(i.emotion,32)||n.emotion||null,activity:d(i.activity,32)||n.activity||null,cue:d(i.cue,32)||n.cue||null,motion:d(i.motion,32)||n.motion||null},{healthyStatus:a.technicalHealthyLabel}),l=s.state,o=d(l.message,180),f=d(l.activity,32).toLowerCase(),h=l.online!==!1&&f!=="offline",r=!!l.busy||f==="thinking"||f==="busy"||f==="acting",g=l.speaking===!0||f==="speaking",b=h?r?a.busyLabel:o||g?a.speakingLabel:s.hasTechnicalFailure?a.technicalHealthyLabel:a.idleLabel:a.offlineLabel,w=o?a.messageCaption:s.hasTechnicalFailure?a.statusCaption:a.modeCaption,$=o||(h?r?a.busyBody:d(e==null?void 0:e.idleMonologue,220)||a.idleBody:a.offlineBody);return{state:l,hasTechnicalFailure:s.hasTechnicalFailure,caption:w,label:b,body:$,bodyKey:[w,b,$].join(":")}}function ta(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function tt(t,e=-1){const a=Array.isArray(t)?t.map(n=>d(n,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*a.length);return a.length>1&&i===e&&(i=(i+1)%a.length),{line:a[i],index:i}}function aa(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),i=!!d(t==null?void 0:t.message,180);return e&&!a&&!i}const ia={cue:null,emotion:null,motion:null,until:null},ra={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0},na=15e3;function sa(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function St(t){return t.endsWith("/")?t:`${t}/`}function xt(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function Ce(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;if(a.startsWith("/")){const n=xt(t||window.location.href);if(n)return new URL(a.slice(1),n).toString();const s=new URL(window.location.href).origin;return new URL(a,s).toString()}const i=new URL(St(d(t,1024)||"."),window.location.href);return new URL(a,i).toString()}function Ae(t){const e=d(t,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const a=xt(window.location.href);return a?new URL(e.slice(1),a).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function oa(t,e,a){const i=d(t.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?Ae(i):new URL("../avatar.html",new URL(St(d(a,1024)||"."),window.location.href)).toString()}function la(t,e){const a=d(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function da(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"Поднимаю рендер аватара…":"Loading compatibility renderer..."}function kt(t){return String(t||navigator.language||"").toLowerCase().startsWith("ru")?"Ассистент":"Assistant"}function ca(t,e){const a=String(t||navigator.language||"").toLowerCase(),i=d(e,40)||kt(a);return a.startsWith("ru")?`${i}: аватар`:`${i} avatar`}function ua(t,e){const a=new URL(t,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[n,s]of Object.entries(i)){const l=d(n,64);if(!l||s==null)continue;const o=typeof s=="boolean"?s?"1":"0":String(s);a.searchParams.set(l,o)}return a.toString()}function at(t,e,a){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),Ce(a,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([n,s])=>[d(n,64),Ae(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Ae(t.state.stateUrl),idleLinesUrl:Ae(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:Ce(a,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:Ce(a,e.fallbackPortrait||""),motionMapUrl:Ce(a,e.motionMapUrl||""),presetThumbs:i}}}class pa{constructor(e={}){x(this,"id","live2d");x(this,"options");x(this,"manifest");x(this,"rendererConfig");x(this,"host",null);x(this,"containerEl",null);x(this,"iframeEl",null);x(this,"splashEl",null);x(this,"splashTextEl",null);x(this,"assetRoot","");x(this,"rendererConfigBlobUrl","");x(this,"currentState");x(this,"currentCue",{...ia});x(this,"currentPreset","full");x(this,"currentBubble",{...ra});x(this,"targetOrigin","*");x(this,"isReady",!1);x(this,"bubbleRevision",0);x(this,"readyTimeoutHandle",null);x(this,"handleWindowMessage",e=>{var n;const a=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!a||e.source!==a||!sa(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.clearReadyTimeout(),this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Ve({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=_e(e.rendererConfig||{}),this.currentState=pe({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const a=oa(this.options,this.manifest,this.assetRoot),i={...this.options.query||{}};try{if(new URL(a,window.location.href).origin===window.location.origin){const h=at(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(h)],{type:"application/json"})),i.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const n=ua(a,{...this.options,query:i});this.targetOrigin=la(n,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const l=document.createElement("iframe");l.className="ks-live2d-iframe",l.src=n,l.title=d(this.options.iframeTitle,80)||ca(this.rendererConfig.assistant.locale||"",this.rendererConfig.assistant.name),l.loading="eager",l.allow="autoplay",Object.assign(l.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&l.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);s.append(l,o),this.host.append(s),l.addEventListener("load",()=>{this.armReadyTimeout(),this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=l,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.clearReadyTimeout(),this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=pe(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||kt(this.rendererConfig.assistant.locale||""),Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent=da(),Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(n,s),a.append(i),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}clearReadyTimeout(){this.readyTimeoutHandle!=null&&(window.clearTimeout(this.readyTimeoutHandle),this.readyTimeoutHandle=null)}armReadyTimeout(){this.clearReadyTimeout(),this.readyTimeoutHandle=window.setTimeout(()=>{this.isReady||(console.warn("Live2D iframe did not report ready in time; hiding splash guard."),this.setSplashVisible(!1))},na)}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:at(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=vt(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const a=(i=this.iframeEl)==null?void 0:i.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function fa(t={}){return new pa(t)}const ga={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},it={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class ha{constructor(e={}){x(this,"id","static");x(this,"options");x(this,"host",null);x(this,"frameEl",null);x(this,"imageEl",null);x(this,"bubbleEl",null);x(this,"fallbackEl",null);x(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(i,n,s),this.host.append(a),this.frameEl=a,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=n;const l=this.resolveImageUrl(e.assetRoot);l&&(i.src=l,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||it,i=a[e]||a.full||it.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return ga}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const i=e.replace(/\/+$/,""),n=a.replace(/^\.?\//,"");return i?`${i}/${n}`:n}}function ma(t={}){return new ha(t)}function va(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function $t(){var t;for(const e of va())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),i=a==null?void 0:a.hass;if(i!=null&&i.states)return i}catch{continue}return null}function ya(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function ba(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const i=d(a.entity_id,255);i&&(e[i]=a)}return e}function wa(t,e,a="Assistant"){const i=t[e.status],n=t[e.message],s=t[e.online],l=t[e.busy],o=t[e.source],f=t[e.updatedAt],h=e.emotion?t[e.emotion]:null,r=e.activity?t[e.activity]:null,g=e.cue?t[e.cue]:null,b=e.speaking?t[e.speaking]:null,w=e.intensity?t[e.intensity]:null,$=e.motion?t[e.motion]:null,k=t[e.revision];if(!i&&!n&&!s&&!l)return null;const I=d(i==null?void 0:i.state,72),U=d(n==null?void 0:n.state,220),W=d(f==null?void 0:f.state,64),K=Me(s,!0),E=Me(l,!1),j=d(r==null?void 0:r.state,32)||"",M=Me(b)??j==="speaking",Z=j||(K?M?"speaking":E?"thinking":"idle":"offline");return pe({version:1,assistant:d(a,40)||"Assistant",online:K,busy:E,status:I&&I!=="unknown"&&I!=="unavailable"?I:"",message:U&&U!=="unknown"&&U!=="unavailable"?U:"",source:d(o==null?void 0:o.state,64)||"ha",updatedAt:W&&W!=="unknown"&&W!=="unavailable"?W:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(h==null?void 0:h.state,32)||null,activity:Z,cue:d(g==null?void 0:g.state,32)||null,intensity:$a(w),speaking:M,motion:d($==null?void 0:$.state,32)||null,revision:Number(k==null?void 0:k.state)||0})}const Sa=["full","torso","head"];function xa(t){const e=d(t==null?void 0:t.state,16).toLowerCase();return Sa.includes(e)?e:null}function ka(t,e){const a=e.viewPreset?t[e.viewPreset]:null,i=e.pageMode?t[e.pageMode]:null,n=e.pageTarget?t[e.pageTarget]:null,s=e.pageUntil?t[e.pageUntil]:null,l=e.cue?t[e.cue]:null,o=e.emotion?t[e.emotion]:null,f=e.motion?t[e.motion]:null,h=e.cueUntil?t[e.cueUntil]:null,r=e.revision?t[e.revision]:null;if(!a&&!i&&!n&&!l&&!o&&!f)return null;const g=d(n==null?void 0:n.state,40)||null,b=d(s==null?void 0:s.state,64)||null,w=d(i==null?void 0:i.state,16).toLowerCase(),$=w==="auto"?"auto":w==="pinned"||g||b?"pinned":"auto";return ue({...Q,revision:Number(r==null?void 0:r.state)||0,viewPreset:xa(a),page:{mode:$,target:$==="pinned"?g:null,until:$==="pinned"?b:null},cue:{cue:d(l==null?void 0:l.state,32)||null,emotion:d(o==null?void 0:o.state,32)||null,motion:d(f==null?void 0:f.state,32)||null,until:d(h==null?void 0:h.state,64)||null}})}function Me(t,e){const a=d(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function $a(t){const e=d(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function Ct(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),i=Math.max(6e4,t.authCooldownMs??600*1e3),n=d(t.apiUrl,4096);let s=null,l=0,o=null,f=0;async function h(){var $;const r=$t();if(r!=null&&r.states)return r.states;const g=Date.now();if(s&&g-l<a||!n&&!t.allowApiFallback||typeof e!="function"||g<f)return s;if(o)return o;const b=n?"":d((($=t.readToken)==null?void 0:$.call(t))??ya(),4096);if(!n&&!b)return s;const w={};return b&&(w.Authorization=`Bearer ${b}`),o=e(n||"/api/states",{cache:"no-store",headers:w}).then(async k=>{if(!k.ok){const I=new Error(`HA states HTTP ${k.status}`);throw I.status=k.status,I}return k.json()}).then(k=>{const I=ba(k);return I&&(s=I,l=Date.now()),I||s}).catch(k=>(((k==null?void 0:k.status)===401||(k==null?void 0:k.status)===403)&&(f=Date.now()+i),s)).finally(()=>{o=null}),o}return{id:"ha-states",async read(){return h()}}}async function qe(t){const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=d(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const i=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await e(i.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return t.sanitize?t.sanitize(s):s}catch(n){if(t.defaultValue!==void 0)return t.defaultValue;throw n}}function Ca(t){return{id:"json-state",async read(){const e=await qe({...t,defaultValue:t.defaultValue});return pe(e)}}}function Pa(t){return{id:"json-control",async read(){const e=await qe({...t,defaultValue:t.defaultValue??Q});return ue(e)}}}function Ia(t){return{id:"json-lines",async read(){const e=await qe({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>d(a,220)).filter(Boolean):[]}}}function z(t,e,a=64){return d(t[e],a)}function ge(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Ea(t,e="en-US"){const a=d(t,64);if(!a)return"";const i=new Date(a);return Number.isNaN(i.getTime())?a:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Pe(t,e){return!t||!e?null:t[e]||null}function Aa(t,e=null,a="en-US"){var g,b,w,$;const i=z(t,"caption",40)||z(t,"type",24)||"Card",n=z(t,"hint",72),s=z(t,"type",32).toLowerCase()||"entity",l=z(t,"entity",255),o=Pe(e,l),f=Pe(e,z(t,"stateEntity",255)),h=Pe(e,z(t,"downEntity",255)),r=Pe(e,z(t,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:z(t,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const k=Number(o==null?void 0:o.state);return!Number.isFinite(k)||k<=0?{caption:i,value:"Clear",hint:n||"nothing pending"}:{caption:i,value:`${k} item${k===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const k=(o==null?void 0:o.state)==="on";return{caption:i,value:k?z(t,"onText",48)||"On":z(t,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const k=ge(o==null?void 0:o.state,0);return{caption:i,value:k?`${k}%`:"—",hint:d(f==null?void 0:f.state,48)||n||"battery level"}}if(s==="network"){const k=ge(h==null?void 0:h.state,0),I=ge(r==null?void 0:r.state,0);return{caption:i,value:k||I?`↓ ${k||"0"} · ↑ ${I||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:i,value:Ea(o==null?void 0:o.state,a)||"—",hint:n||"next event"};if(s==="percent"){const k=ge(o==null?void 0:o.state,Number(z(t,"digits",4))||0);return{caption:i,value:k?`${k}%`:"—",hint:n||d((g=o==null?void 0:o.attributes)==null?void 0:g.friendly_name,48)||"state percentage"}}if(s==="number"){const k=Number(z(t,"digits",4))||0,I=ge(o==null?void 0:o.state,k),U=z(t,"unit",16)||d((b=o==null?void 0:o.attributes)==null?void 0:b.unit_of_measurement,16);return{caption:i,value:I?`${I}${U?` ${U}`:""}`:"—",hint:n||d((w=o==null?void 0:o.attributes)==null?void 0:w.friendly_name,48)||"numeric value"}}return{caption:i,value:d(o==null?void 0:o.state,64)||z(t,"value",64)||"—",hint:n||d(($=o==null?void 0:o.attributes)==null?void 0:$.friendly_name,48)||"entity state"}}function Ua(t,e=null,a="en-US"){return Array.isArray(t)?t.map(i=>Aa(i,e,a)):[]}const Pt={...wt,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},It={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},Et={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Ta={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Ue={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function y(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ge(t){return t.endsWith("/")?t:`${t}/`}function La(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function H(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(t,window.location.href);if(a.startsWith("/")){const n=La(i.toString());return n?new URL(a.slice(1),n).toString():new URL(a,i.origin).toString()}return new URL(a,i).toString()}function At(t){try{return new URL(".",t).toString()}catch{return new URL(".",window.location.href).toString()}}function Ra(t,e){const a=At(e),i=H(a,d(t.assetRoot,1024)||"./assets"),n=i?Ge(i):a,s=l=>{const o=d(l,1024);return o?H(n,o):""};return{...t,assetRoot:i,runtimeUrl:H(a,t.runtimeUrl||""),entry:s(t.entry||""),modelUrl:s(t.modelUrl||""),fallbackPortrait:s(t.fallbackPortrait||""),motionMapUrl:s(t.motionMapUrl||""),expressionMapUrl:s(t.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([l,o])=>[l,H(a,o)]).filter(([,l])=>!!l))}}function Ne(t){return{...Ue,...t||{},metrics:{...Ue.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)&&t.forecast.length?t.forecast.map(e=>({...e})):Ue.forecast.map(e=>({...e}))}}function rt(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function G(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const i=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function Da(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${G(a)} мм рт. ст.`:`${G(a*.750061683,0)} мм рт. ст.`}function Ma(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${G(a,1)} м/с`:i==="km/h"||i==="км/ч"?`${G(a/3.6,1)} м/с`:`${G(a,1)} м/с`}function Na(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ba(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function Fa(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function _a(t,e="ru-RU"){const a=d(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||d(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function nt(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function Oa(t,e="./assets/icons"){const a=Number(t),i=Ge(e);return a===0?`${i}sun.svg`:[1,2].includes(a)?`${i}cloud-sun.svg`:[3].includes(a)?`${i}cloud.svg`:[45,48].includes(a)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${i}cloud-snow.svg`:[95,96,99].includes(a)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function Ha(t){const e=d(t.locale,32)||"ru-RU",a=d(t.iconBaseUrl,1024)||"./assets/icons",i=Ct({allowApiFallback:t.allowApiFallback,apiUrl:t.apiUrl,fetchImpl:t.fetchImpl});return async()=>{var $,k,I,U,W,K,E,j,F,M,Z,ye,be,we,Se,xe,ke,$e,fe,u;const n=await i.read(),s=t.fetchImpl??globalThis.fetch,l=n==null?void 0:n[t.weatherEntity];let o=null;const f=d(t.openMeteoUrl,4096);if(f&&typeof s=="function")try{const p=await s(`${f}${f.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});p.ok&&(o=await p.json())}catch{o=null}if(!l&&!(o!=null&&o.current))return null;const h=d(l==null?void 0:l.last_changed,64)||d(($=o==null?void 0:o.current)==null?void 0:$.time,64)||new Date().toISOString(),r=l?_a(l.state,e):nt((k=o==null?void 0:o.current)==null?void 0:k.weather_code,e),g=Array.isArray((I=o==null?void 0:o.daily)==null?void 0:I.time)?o.daily.time.map((p,c)=>{var A,T,N,P,ee;const v=new Date(`${p}T12:00:00+03:00`);return{name:v.toLocaleDateString(e,{weekday:"short"}),dayNumber:v.toLocaleDateString(e,{day:"numeric"}),monthShort:v.toLocaleDateString(e,{month:"short"}),note:d(nt((A=o.daily.weather_code)==null?void 0:A[c],e),28),max:`${G((T=o.daily.temperature_2m_max)==null?void 0:T[c])}°`,min:`${G((N=o.daily.temperature_2m_min)==null?void 0:N[c])}° · ${G((P=o.daily.precipitation_probability_max)==null?void 0:P[c])}%`,icon:Oa((ee=o.daily.weather_code)==null?void 0:ee[c],a)}}):[],b=g[0]||null,w=g.slice(1,6);return{todayValue:Ba(h,e),todayLabel:Fa(h,e),updatedAt:Na(h,e),temperature:G(((U=l==null?void 0:l.attributes)==null?void 0:U.temperature)??((W=o==null?void 0:o.current)==null?void 0:W.temperature_2m),1),condition:r,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${G(((K=l==null?void 0:l.attributes)==null?void 0:K.apparent_temperature)??((E=o==null?void 0:o.current)==null?void 0:E.apparent_temperature)??((j=l==null?void 0:l.attributes)==null?void 0:j.temperature),1)}°C`,badgeSummary:r,badgeRange:b?`${b.max} / ${G((M=(F=o==null?void 0:o.daily)==null?void 0:F.temperature_2m_min)==null?void 0:M[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${G(((Z=l==null?void 0:l.attributes)==null?void 0:Z.humidity)??((ye=o==null?void 0:o.current)==null?void 0:ye.relative_humidity_2m))}%`,pressure:Da(((be=l==null?void 0:l.attributes)==null?void 0:be.pressure)??((we=o==null?void 0:o.current)==null?void 0:we.surface_pressure),((Se=l==null?void 0:l.attributes)==null?void 0:Se.pressure_unit)??"hPa"),wind:Ma(((xe=l==null?void 0:l.attributes)==null?void 0:xe.wind_speed)??((ke=o==null?void 0:o.current)==null?void 0:ke.wind_speed_10m),(($e=l==null?void 0:l.attributes)==null?void 0:$e.wind_speed_unit)??"km/h"),clouds:`${G(((fe=l==null?void 0:l.attributes)==null?void 0:fe.cloud_coverage)??((u=o==null?void 0:o.current)==null?void 0:u.cloud_cover))}%`},forecast:w}}}class ja{constructor(e,a={}){x(this,"root");x(this,"options");x(this,"avatarMountEl");x(this,"carouselShellEl");x(this,"carouselTrackEl");x(this,"dotsEl");x(this,"presetButtons");x(this,"copy");x(this,"labels");x(this,"presetLabels");x(this,"rendererConfig");x(this,"avatarManifest");x(this,"sceneConfig");x(this,"sceneRuntimeConfig");x(this,"entityMap",null);x(this,"controlEntityMap",null);x(this,"haStatesReader",null);x(this,"weatherData");x(this,"hassStates",null);x(this,"currentState");x(this,"remoteControl",Q);x(this,"uiControl",Q);x(this,"currentControl",Q);x(this,"idleLines",[]);x(this,"activeIndex",0);x(this,"lastAutoRotateAt",0);x(this,"currentIdleLine","");x(this,"lastIdleIndex",-1);x(this,"currentPreset","full");x(this,"idleTimer",null);x(this,"avatarAdapter",null);x(this,"refreshIntervalHandle",null);x(this,"orderedPages",[]);x(this,"carouselDragState",null);this.root=e,this.options=a,this.copy={...Pt,...a.copy||{}},this.labels={...It,...a.labels||{}},this.presetLabels={...Et,...a.presetLabels||{}},this.weatherData=Ne(a.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="${y(this.labels.avatarPresetGroup)}">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${y(this.presetLabels.full)}" aria-label="${y(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${y(this.presetLabels.torso)}" aria-label="${y(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${y(this.presetLabels.head)}" aria-label="${y(this.presetLabels.head)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="head">
                </button>
              </div>
              <div class="avatar-mount" data-avatar-mount></div>
            </div>
          </section>

          <section class="panel content-panel">
            <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="${y(this.labels.carouselRegion)}">
              <div class="carousel-track" data-carousel-track></div>
              <div class="carousel-dots" data-dots aria-label="${y(this.labels.pagesRegion)}"></div>
            </div>
          </section>
        </div>
      </div>
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=H(window.location.href,this.getRendererConfigUrl()),a=At(e),i=_e(await this.readJson(e)),n=_e({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([l,o])=>[l,H(a,o)])),avatar:{...i.avatar,manifestUrl:H(a,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:H(a,i.scene.configUrl)},state:{...i.state,stateUrl:H(a,i.state.stateUrl),apiUrl:i.state.apiUrl?H(a,i.state.apiUrl):void 0,idleLinesUrl:H(a,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?H(a,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:H(a,i.control.controlUrl),apiUrl:i.control.apiUrl?H(a,i.control.apiUrl):void 0,entityMapUrl:i.control.entityMapUrl?H(a,i.control.entityMapUrl):void 0}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=Ra(Ve(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.sceneRuntimeConfig=Wt(this.sceneConfig),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await Ia({url:this.rendererConfig.state.idleLinesUrl||H(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=De(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=Ft(this.uiControl,a||"full"),this.refresh()})}bindCarouselControls(){let e=0,a=0,i=0;const n=(g,b,w,$)=>this.orderedPages.length<2||this.isCarouselInteractiveTarget($)?!1:(this.carouselDragState={pointerId:g,startX:b,startY:w,deltaX:0,deltaY:0,locked:!1},!0),s=(g,b,w)=>{if(!this.carouselDragState||g!==this.carouselDragState.pointerId)return!1;if(this.carouselDragState.deltaX=b-this.carouselDragState.startX,this.carouselDragState.deltaY=w-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return!1;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX))return this.clearDragState(g,!1),!1;this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}return this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX}),!0},l=g=>{if(!this.carouselDragState||g!==this.carouselDragState.pointerId)return;const{locked:b,deltaX:w}=this.carouselDragState,$=this.carouselShellEl.clientWidth||1,k=b&&Math.abs(w)>=$*.16,I=w<0?1:-1;if(this.clearDragState(g,!1),k){this.stepPage(I);return}this.updateCarouselPosition()},o=()=>Date.now()-e>500&&Date.now()-i>500,f=()=>Date.now()-e>500&&Date.now()-a>500;this.carouselShellEl.addEventListener("keydown",g=>{if(g.key==="ArrowLeft"){g.preventDefault(),this.stepPage(-1);return}g.key==="ArrowRight"&&(g.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",g=>{var b,w;g.button!==0||g.pointerType==="mouse"&&Date.now()-a<500||(e=Date.now(),n(g.pointerId,g.clientX,g.clientY,g.target)&&(g.preventDefault(),(w=(b=this.carouselShellEl).setPointerCapture)==null||w.call(b,g.pointerId)))}),this.carouselShellEl.addEventListener("pointermove",g=>{!this.carouselDragState||g.pointerId!==this.carouselDragState.pointerId||(e=Date.now(),s(g.pointerId,g.clientX,g.clientY)&&g.preventDefault())});const h=g=>{e=Date.now(),l(g.pointerId)};this.carouselShellEl.addEventListener("pointerup",h),this.carouselShellEl.addEventListener("pointercancel",h),this.carouselShellEl.addEventListener("lostpointercapture",h),this.carouselShellEl.addEventListener("touchstart",g=>{var w;if(!o())return;const b=(w=g.changedTouches)==null?void 0:w[0];b&&n(`touch-${b.identifier}`,b.clientX,b.clientY,g.target)&&(a=Date.now(),g.preventDefault(),g.stopPropagation())},{passive:!1}),this.carouselShellEl.addEventListener("touchmove",g=>{if(!o()||!this.carouselDragState)return;const b=Array.from(g.changedTouches||[]).find(w=>{var $;return`touch-${w.identifier}`===(($=this.carouselDragState)==null?void 0:$.pointerId)});b&&(a=Date.now(),s(`touch-${b.identifier}`,b.clientX,b.clientY)&&(g.preventDefault(),g.stopPropagation()))},{passive:!1});const r=g=>{if(!o()||!this.carouselDragState)return;const b=Array.from(g.changedTouches||[]).find(w=>{var $;return`touch-${w.identifier}`===(($=this.carouselDragState)==null?void 0:$.pointerId)});b&&(a=Date.now(),g.preventDefault(),g.stopPropagation(),l(`touch-${b.identifier}`))};this.carouselShellEl.addEventListener("touchend",r,{passive:!1}),this.carouselShellEl.addEventListener("touchcancel",r,{passive:!1}),this.carouselShellEl.addEventListener("mousedown",g=>{g.button!==0||!f()||n("mouse-fallback",g.clientX,g.clientY,g.target)&&(i=Date.now(),g.preventDefault())}),window.addEventListener("mousemove",g=>{!this.carouselDragState||this.carouselDragState.pointerId!=="mouse-fallback"||(i=Date.now(),s("mouse-fallback",g.clientX,g.clientY)&&g.preventDefault())}),window.addEventListener("mouseup",g=>{!this.carouselDragState||this.carouselDragState.pointerId!=="mouse-fallback"||(i=Date.now(),g.button===0&&g.preventDefault(),l("mouse-fallback"))})}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(this.currentControl),this.uiControl=De(Q,this.uiControl),this.currentControl=De(this.remoteControl,this.uiControl);const e=vt(this.currentState,this.currentControl);this.syncIdleMonologue(e);const a=ea(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=this.sceneRuntimeConfig;this.applyDisplayConfig(i);const n=i.pages,s=Zt({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:l=>n.some(o=>o.id===l)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(a.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(a.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(n,a)}renderCarousel(e,a){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,n)=>i.kind==="overview"?this.renderOverviewSlide(i,a,n):this.renderDynamicSlide(i,n,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,n)=>`
      <button
        class="carousel-dot ${n===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${n}"
        data-scene-page-id="${y(i.id)}"
        aria-label="${y(d(i.title,40)||d(i.id,40)||`${this.labels.pageStamp} ${n+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,a,i){const n=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||Ue,l=s.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="${y(e.id)}" data-scene-page-id="${y(e.id)}" data-slide-order="${i}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${y(s.title)}</h1>
              <p class="subline">${y(s.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${y(s.todayCaption)}</span>
                <span class="value">${y(s.todayValue)}</span>
                <span class="meta">${y(s.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${y(s.updatedCaption)}</span>
                <span class="value">${y(s.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${y(s.temperature)}</span>
                <span class="unit">°${y(s.unit)}</span>
              </div>
              <div class="condition">${y(s.condition)}</div>
              <div class="feels">${y(s.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${y(this.resolveIconUrl("thermometer"))}" alt=""><span>${y(s.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${y(this.resolveIconUrl("calendarDays"))}" alt=""><span>${y(s.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${y(a.caption)}</strong>
                  <div class="neiri-label">${y(a.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${y(this.resolveIconUrl("sparkles"))}" alt="${y(n)}"></div>
              </div>
              <div class="neiri-meta">${y(a.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${y(this.labels.humidity)}</span><i><img src="${y(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${y(s.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${y(this.labels.pressure)}</span><i><img src="${y(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${y(s.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${y(this.labels.wind)}</span><i><img src="${y(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${y(s.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${y(this.labels.clouds)}</span><i><img src="${y(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${y(s.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${y(s.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${l}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,a,i){const n=Ua(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),l=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),o=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${a+1} / ${i}`),f=e.cardStyle==="mini"?n.map((w,$)=>`
          <article class="mini-card" data-scene-card-index="${$}" data-scene-page-id="${y(e.id)}">
            <span class="caption">${y(w.caption)}</span>
            <strong>${y(w.value)}</strong>
          </article>
        `).join(""):n.map((w,$)=>`
          <article class="home-card" data-scene-card-index="${$}" data-scene-page-id="${y(e.id)}">
            <span class="caption">${y(w.caption)}</span>
            <strong>${y(w.value)}</strong>
            <small>${y(w.hint)}</small>
          </article>
        `).join(""),h=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(w=>this.renderForecastDay(w)).join("")}</div>`:"",r=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",g=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${a+1}`,b=d(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${y(e.id)}" data-scene-page-id="${y(e.id)}" data-slide-order="${a}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${y(e.kind)}" data-dynamic-card-style="${y(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${y(g)}</h1>
              ${b?`<p class="subline">${y(b)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${y(l)}</span>
              <span class="value">${y(o)}</span>
            </div>
          </div>
          ${h}
          <div class="${r}">
            ${f||`<div class="empty">${y(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `}renderForecastDay(e){return`
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${y(e.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${y(e.name)}</span>
            <span class="meta"><span class="day-number">${y(e.dayNumber)}</span><span class="day-month">${y(e.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${y(e.max)}</strong>
          <small>${y(e.min)}</small>
        </div>
        <div class="day-note">${y(e.note)}</div>
      </article>
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const a=e[0],i=e[e.length-1];return`${d(a.dayNumber,4)} ${d(a.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var n;const a=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return a||`${Ge(d(this.options.iconBaseUrl,1024)||"./assets")}${Ta[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:i,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,a){var i,n;typeof e=="number"&&!a&&((n=(i=this.carouselShellEl).hasPointerCapture)!=null&&n.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=Jt(this.sceneRuntimeConfig.rotation,this.activeIndex,e,i=>this.orderedPages.some(n=>n.id===i));this.pinPageByIndex(a)}pinPageByIndex(e){const i=(this.orderedPages.length?this.orderedPages:this.sceneRuntimeConfig.pages)[e];if(!i)return;const n=Math.max(18e3,this.sceneRuntimeConfig.rotation.defaultDwellMs*2);this.uiControl=_t(this.uiControl,i.id,n),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!aa(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=tt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const a=tt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refresh()},ta(18e3,18e3))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: HTTP ${a.status}`);return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:Ct({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl})}async readAssistantState(){const e=async()=>Ca({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??bt}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap||!this.haStatesReader)return e();const a=await this.haStatesReader.read();return wa(a||{},this.entityMap,this.rendererConfig.assistant.name)||e()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=Q){const a=async()=>Pa({url:this.rendererConfig.control.controlUrl,defaultValue:e}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap||!this.haStatesReader)return a();const i=await this.haStatesReader.read();return ka(i||{},this.controlEntityMap)||a()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const a=await this.readJson(this.getWeatherUrl());e=rt(e,a)}catch{}if(this.options.weatherReader)try{const a=await this.options.weatherReader();e=rt(e,a)}catch{}try{return Ne(e)}catch{return Ne(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return fa({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return ma({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const i=a.dataset.avatarPreset||"",n=a.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];a.classList.toggle("is-active",i===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function za(t,e={}){const a=new ja(t,e);return await a.init(),a}const Va=["overview","cards","forecast+cards"],Wa=["full","mini"],Ut=["entity","text","todo","onoff","battery","network","time","percent","number"],J=["caption","hint"],Ie="/local/live2d/",st="/scene-legacy/live2d/",qa={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Ga={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Ka=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Ya=4*1024*1024,Ja=192*1024,Te=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],He="mellow-fly-7";function de(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Za(t){return Te.find(e=>e.id===t)||Te.find(e=>e.id===He)||Te[0]}function Xa(t){return`${t.width} × ${t.height}`}function m(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ke(t){return JSON.parse(JSON.stringify(t))}function Y(t){const e=new Map(t.pages.map(n=>[n.id,n])),a=t.rotation.order.map(n=>e.get(n)).filter(Boolean),i=t.pages.filter(n=>!a.some(s=>s.id===n.id));return[...a,...i]}function Qa(t,e){return e?Math.max(0,Y(t).findIndex(a=>a.id===e)):0}function ei(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Tt(t,e){const a=ei(e);let i=a,n=2;for(;t.pages.some(s=>s.id===i);)i=`${a}-${n}`,n+=1;return i}function ti(t){const e=t.pages.length+1,a=de()==="ru";return{id:Tt(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function ot(t){const e=de()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function V(t,e){const a=t[e];return a==null?"":String(a)}function X(t,e){const a=t[e];return a==null?"":String(a)}function ie(t,e){const a=t.display||{},i=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function ai(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function Be(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function lt(t){return t.avatar||(t.avatar={}),t.avatar}function ii(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function ri(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function ni(t){var i;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&Y(t).some(n=>n.id===a)?a:((i=Y(t)[0])==null?void 0:i.id)||null}async function si(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return Ke(a.config)}async function oi(t,e){const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await a.json();if(!a.ok||i.success===!1||!i.config)throw new Error(`POST ${t} failed: HTTP ${a.status}`);return Ke(i.config)}function Ye(t){switch(t){case"text":return[...J,"value"];case"todo":return[...J,"entity"];case"onoff":return[...J,"entity","onText","offText"];case"battery":return[...J,"entity","stateEntity"];case"network":return[...J,"downEntity","upEntity"];case"time":return[...J,"entity"];case"percent":return[...J,"entity","digits"];case"number":return[...J,"entity","digits","unit"];default:return[...J,"entity"]}}function Fe(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:t.kindOverview}function ce(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function Lt(t){const e=de();return qa[e][t]||""}function Le(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function li(t,e){const a=e.attributes||{},i=String(a.friendly_name||t),n=t.includes(".")&&t.split(".",1)[0]||"other",s=String(e.state||""),l=String(a.unit_of_measurement||"");return{entityId:t,name:i,domain:n,state:s,unit:l}}function di(t){return t?Object.entries(t).map(([e,a])=>li(e,a)).sort((e,a)=>{const i=e.domain.localeCompare(a.domain);return i!==0?i:e.name.localeCompare(a.name,"ru")}):[]}function ci(t,e){const a=e.trim().toLowerCase();return a?t.filter(i=>i.entityId.toLowerCase().includes(a)||i.name.toLowerCase().includes(a)||i.domain.toLowerCase().includes(a)||i.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function ui(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():null}function ne(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const n=ui(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,i).toString()}function Je(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ie))return ne(`${st}${a.slice(Ie.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const i=new URL(a,e);if(i.pathname.startsWith(Ie)){const n=i.pathname.slice(Ie.length);return ne(`${st}${n}${i.search}${i.hash}`,e)}}catch{return a}return a}function pi(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function fi(t,e){const a=new URL("./",t).toString(),i=ne(Je(e,a)||e,a);return pi(i||a)}function dt(t,e,a){const i=String(a||"").trim();return i?ne(Je(i,t)||i,fi(t,e)):""}function gi(t,e){const a=String(e||"").trim();return a?ne(Je(a,t)||a,new URL("./",t).toString()):""}function Rt(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}function je(t,e){const a=Rt(t);return{...a,manifestUrl:a.manifestUrl?ne(a.manifestUrl,e):"",previewUrl:a.previewUrl?ne(a.previewUrl,e):""}}async function hi(t,e){var h;const a=String(t||"").trim();if(!a)return null;const i=await fetch(a,{cache:"no-store"}),n=await i.json();if(!i.ok)throw new Error(`GET ${a} failed: HTTP ${i.status}`);const s=String(n.assetRoot||"").trim();let l=0;const o=dt(a,s,String(n.motionMapUrl||"").trim());if(o)try{const r=await fetch(o,{cache:"no-store"}),g=await r.json();r.ok&&Array.isArray(g.motions)&&(l=g.motions.length)}catch{l=0}const f=gi(a,String(((h=n.presetThumbs)==null?void 0:h.full)||"").trim())||dt(a,s,String(n.fallbackPortrait||"").trim());return Rt({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:a,previewUrl:f,motionCount:l,capabilities:n.capabilities})}async function ct(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),i=await a.json();if(!a.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(i.items)?i.items.map(n=>je(n,e)).filter(n=>n.id&&n.manifestUrl):[]}async function mi(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const i=/\/api\/hassio_ingress\//.test(a),n=i?Ja:Ya;if(i||e.size>n){const f=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,h=Math.max(1,Math.ceil(e.size/n));let r=null;for(let g=0;g<h;g+=1){const b=g*n,w=Math.min(e.size,b+n),$=new FormData;$.set("uploadId",f),$.set("filename",e.name),$.set("chunkIndex",String(g)),$.set("chunkCount",String(h)),$.set("archive",e.slice(b,w,"application/zip"),`${e.name}.part-${g+1}-of-${h}`);const k=await fetch(a,{method:"POST",body:$}),I=await k.json();if(!k.ok||I.success===!1)throw new Error(String(I.error||`HTTP ${k.status}`));I.item&&(r=je(I.item,a))}if(!r)throw new Error("Avatar import did not return the imported pack.");return r}const s=new FormData;s.set("archive",e,e.name);const l=await fetch(a,{method:"POST",body:s}),o=await l.json();if(!l.ok||o.success===!1||!o.item)throw new Error(String(o.error||`HTTP ${l.status}`));return je(o.item,a)}async function vi(t,e){var l,o,f,h;const a=String(t||"").trim(),i=String(e||"").trim();if(!a||!i)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${a}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((l=s.motionMap)==null?void 0:l.motions)?(o=s.motionMap)==null?void 0:o.motions.map(r=>({index:Number(r.index),id:String(r.id||"").trim(),label:String(r.label||r.id||"").trim(),group:String(r.group||"").trim(),tags:Array.isArray(r.tags)?r.tags.map(g=>String(g||"").trim()).filter(Boolean):[]})).filter(r=>Number.isFinite(r.index)):[],semantic:typeof((f=s.motionMap)==null?void 0:f.semantic)=="object"&&((h=s.motionMap)!=null&&h.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function yi(t,e){var s,l,o;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await i.json();if(!i.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${i.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((l=n.motionMap)==null?void 0:l.semantic)=="object"&&((o=n.motionMap)!=null&&o.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function bi(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function wi(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function Si(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Ka.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${m(i.key)}">${m(wi(t,i))}</label>
            <select id="avatar-semantic-${m(i.key)}" data-avatar-semantic="${m(i.key)}">
              <option value="">${m(t.avatarMotionNone)}</option>
              ${a.map(n=>`
                <option value="${m(String(n.index))}"${bi(e.motionMap.semantic[i.key])===String(n.index)?" selected":""}>
                  ${m(`${n.label||n.id} · #${n.index}`)}
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
              <strong>${m(i.label||i.id||`${t.avatarMappingMotion} ${i.index}`)}</strong>
              <span class="meta">${m(`${t.avatarMappingMotion} #${i.index} · ${i.group||t.avatarMappingMotion.toLowerCase()}`)}</span>
              <code>${m(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${t.avatarMappingSaveHint}</div>
    </div>
  `}function ut(t,e,a){var r,g,b,w,$;const i=(e==null?void 0:e.id)||"",n=a===i,s=(e==null?void 0:e.name)||t.avatarPackDefaultTile,l=(e==null?void 0:e.id)||t.avatarPackCurrent,o=(e==null?void 0:e.previewUrl)||"",f=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(r=e.capabilities)!=null&&r.supportsMotion?t.avatarCapabilityMotion:"",(g=e.capabilities)!=null&&g.supportsEmotion?t.avatarCapabilityEmotion:"",(b=e.capabilities)!=null&&b.supportsLipSync?t.avatarCapabilityLipSync:"",(w=e.capabilities)!=null&&w.supportsViewPresets?t.avatarCapabilityViewPresets:"",($=e.capabilities)!=null&&$.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],h=f.length?f:[t.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${o?`<img src="${m(o)}" alt="${m(s)}">`:`<span>${m(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${m(s)}</strong>
        <div class="meta">${m(l)}</div>
        <div class="avatar-pack-card-meta">
          ${h.map(k=>`<span>${m(k)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${m(i)}">
          ${m(n?t.avatarPackSelected:t.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function Ze(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function xi(t,e,a,i){if(!e||a===null)return`<div class="meta">${m(t.entityBindingEmpty)}</div>`;const n=Ye(V(e,"type")||"entity").filter(s=>Ze(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===a&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${m(s)}">
            ${m(Le(t,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${m(t.entityBindingNoTargets)}</div>`}function pt(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function se(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function ft(t){return Ye(t).find(e=>Ze(e))||null}function oe(t,e,a,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${m(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${m(e)}" value="${m(a)}">
    </div>
  `}function re(t,e,a){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${m(t)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${m(e)}" value="${m(a)}">
    </div>
  `}function gt(t,e,a,i){return`
    <div class="field">
      <label for="page-select-${e}">${m(t)}</label>
      <select id="page-select-${e}" data-page-field="${m(e)}">
        ${i.map(n=>`<option value="${m(n.value)}"${n.value===a?" selected":""}>${m(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function ki(t,e,a,i){const n=V(e,"type")||"entity",s=Ye(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${m(V(e,"caption")||ce(t,n))}</strong>
          <div class="meta">${m(ce(t,n))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${m(t.cardType)}</label>
          <select data-card-index="${a}" data-card-field="type">
            ${Ut.map(l=>`<option value="${l}"${l===n?" selected":""}>${m(ce(t,l))}</option>`).join("")}
          </select>
        </div>
        ${s.map(l=>{const o=Ze(l),f=o&&(i==null?void 0:i.cardIndex)===a&&i.field===l;return o?`
              <div class="field ${l==="hint"?"is-wide":""} is-binding-field${f?" is-active":""}">
                <label>${m(Le(t,l))}</label>
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
              <label>${m(Le(t,l))}</label>
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
  `}function $i(t,e,a,i,n){const s=V(e,"type")||"entity",l=V(e,"caption")||ce(t,s),o=V(e,"entity")||V(e,"stateEntity")||V(e,"downEntity")||V(e,"upEntity")||V(e,"value")||V(e,"hint")||Lt(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
        <strong>${m(l)}</strong>
        <span class="meta">${m(ce(t,s))}</span>
        <div class="meta">${m(o)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===i-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function Ci(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${m(e)}"
    >
      <strong>${m(ce(t,e))}</strong>
      <span>${m(Lt(e))}</span>
    </button>
  `}function Pi(t,e,a){t[e]=a.entityId;const i=t;String(i.caption||"").trim()||(i.caption=a.name),String(i.hint||"").trim()||(i.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&a.unit&&(i.unit=a.unit)}async function Ii(t){var fe;const e=Ga[de()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(a)&&document.body.insertBefore(a,i),i==null||i.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
                ${Te.map(u=>`<option value="${m(u.id)}">${m(u.label[de()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),l=n.querySelector("[data-preview-canvas]"),o=n.querySelector("[data-preview-resolution]"),f=n.querySelector("[data-preview-display]"),h=n.querySelector("[data-dashboard]");if(!s||!l||!o||!f||!h)throw new Error("Missing native editor shell elements");l.appendChild(a);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:He,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},g=async u=>{const p=String(u||"").trim();if(!p||!t.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,E();try{r.avatarPackDetails=await vi(t.avatarPackApiUrl,p),r.avatarPackDirty=!1}catch(c){r.avatarPackDetails=null,r.avatarPackDirty=!1,j(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{r.avatarPackLoading=!1}},b=()=>{var N;const u=Za(r.previewDisplayId),p=Math.max(320,((N=s.parentElement)==null?void 0:N.clientWidth)||s.clientWidth||u.width),c=Math.max(260,Math.min(window.innerHeight*.62,760)),v=Math.min(1,p/u.width,c/u.height),A=Math.round(u.width*v),T=Math.round(u.height*v);f.value=u.id,o.textContent=Xa(u),s.style.aspectRatio=`${u.width} / ${u.height}`,s.style.width=`${A}px`,s.style.height=`${T}px`,l.style.width=`${u.width}px`,l.style.height=`${u.height}px`,l.style.transform=`scale(${v})`,a.style.width=`${u.width}px`,a.style.height=`${u.height}px`},w=u=>{r.previewDisplayId=String(u||"").trim()||He,b()},$=u=>{r.pendingAvatarZip=u,r.pendingAvatarZipName=(u==null?void 0:u.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",E(),u&&k(u)},k=async u=>{if(!(!r.config||!t.avatarImportUrl||r.avatarImporting)){r.pendingAvatarZip=null,r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",E();try{const p=await mi(t.avatarImportUrl,u);r.avatarCatalog=t.avatarCatalogUrl?await ct(t.avatarCatalogUrl):[p],lt(r.config).packId=p.id,await g(p.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(p.name||p.id),r.avatarImportTone="ok",M(),E()}catch(p){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(p)}`,r.avatarImportTone="bad",E()}}},I=typeof ResizeObserver<"u"?new ResizeObserver(()=>b()):null;I==null||I.observe(s.parentElement||s);let U=null;const W=()=>{const u=r.selectedPageId||"",p=r.selectedCardIndex;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=a.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&p!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${p}"]`,v=a.querySelector(c);v&&(v.dataset.editorSelectedCard="true")}},K=typeof MutationObserver<"u"?new MutationObserver(()=>W()):null;K==null||K.observe(a,{childList:!0,subtree:!0});const E=()=>{const u=r.config,p=u?Y(u):[],c=p.find(S=>S.id===r.selectedPageId)||p[0]||null,v=Array.isArray(c==null?void 0:c.cards)?c.cards:[],A=r.selectedCardIndex!==null&&v[r.selectedCardIndex]||null,T=ci(r.haEntities,r.entitySearch),N=r.focusedBinding?e.entityBindingActive(V(v[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,Le(e,r.focusedBinding.field)):e.entityBindingEmpty,P=u?Be(u):"",ee=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${m(r.avatarImportStatus)}</div>`:"",C=r.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,O=c?`${c.title||c.id||e.pageSettings} · ${Fe(e,c.kind)}`:e.statusLoading;h.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${m(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${m(t.sceneUrl)}">${e.viewOnly}</a>
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
              <div class="meta">${C}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${ut(e,r.bundledAvatar,P)}
                ${r.avatarCatalog.map(S=>ut(e,S,P)).join("")}
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
              ${r.pendingAvatarZipName?`<div class="meta">${m(e.avatarImportSelected(r.pendingAvatarZipName))}</div>`:""}
              <div class="meta">${e.avatarImportHint}</div>
              ${ee}
            </div>
            ${P?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?Si(e,r.avatarPackDetails):"":""}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(t.packId)}</div>
              <div class="meta">${e.pageOrderHint}</div>
            </div>
            <div class="page-list">
            ${p.map((S,R)=>`
              <article class="page-chip ${S.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${m(S.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${m(S.id)}">
                  <strong>${m(S.title||S.id||(de()==="ru"?`Страница ${R+1}`:`Page ${R+1}`))}</strong>
                  <span class="meta">${m(Fe(e,S.kind))} · ${m(e.pageCards(Array.isArray(S.cards)?S.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${m(S.id)}"${R===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${m(S.id)}"${R===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${m(S.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
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
              ${oe(e.fieldPageId,"id",X(c,"id"),!0)}
              ${gt(e.fieldKind,"kind",X(c,"kind"),Va.map(S=>({value:S,label:Fe(e,S)})))}
              ${oe(e.fieldTitle,"title",X(c,"title"),!0)}
              ${oe(e.fieldSubtitle,"subtitle",X(c,"subtitle"),!0)}
              ${oe(e.fieldSlot,"slot",X(c,"slot"))}
              ${gt(e.fieldCardStyle,"cardStyle",X(c,"cardStyle")||"full",Wa.map(S=>({value:S,label:S==="mini"?e.styleMini:e.styleFull})))}
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
                  ${Ut.map(S=>Ci(e,S)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${v.length?v.map((S,R)=>$i(e,S,R,v.length,R===r.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${A?ki(e,A,r.selectedCardIndex||0,r.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              <div class="meta">${m(N)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${xi(e,A,r.selectedCardIndex,r.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${m(r.entitySearch)}">
          </div>
          <div class="ha-list">
            ${T.length?T.map(S=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${m(S.name)}</strong>
                    <div class="meta">${m(S.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${m(S.entityId)}"${r.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${m(S.entityId)}</code>
                <div class="ha-state">${m(S.state)}${S.unit?` · ${m(S.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const B=h.querySelector("[data-avatar-archive]"),te=h.querySelector("[data-action='choose-avatar-archive']");te==null||te.addEventListener("click",()=>{if(!B||B.disabled)return;B.value="";const S=B;try{if(typeof S.showPicker=="function"){S.showPicker();return}}catch{}B.click()}),B==null||B.addEventListener("click",()=>{B.value=""}),B==null||B.addEventListener("change",()=>{var R;const S=((R=B.files)==null?void 0:R[0])||null;$(S),B.value=""});for(const S of Array.from(h.querySelectorAll(".page-chip[data-page-id]")))S.draggable=!0,S.addEventListener("dragstart",R=>{const q=String(S.dataset.pageId||"").trim();U=q?{kind:"page",pageId:q}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),S.addEventListener("dragover",R=>{!U||U.kind!=="page"||(R.preventDefault(),se(n),S.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),S.addEventListener("drop",R=>{if(!U||U.kind!=="page")return;R.preventDefault();const q=String(S.dataset.pageId||"").trim();q&&Se(U.pageId,q),U=null,se(n)}),S.addEventListener("dragend",()=>{U=null,se(n)});for(const S of Array.from(h.querySelectorAll(".card-list-item[data-card-index]")))S.draggable=!0,S.addEventListener("dragstart",R=>{const q=Number(S.dataset.cardIndex||"-1");U=Number.isFinite(q)&&q>=0?{kind:"card",cardIndex:q}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),S.addEventListener("dragover",R=>{!U||U.kind!=="card"||(R.preventDefault(),se(n),S.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),S.addEventListener("drop",R=>{if(!U||U.kind!=="card")return;R.preventDefault();const q=Number(S.dataset.cardIndex||"-1");Number.isFinite(q)&&q>=0&&xe(U.cardIndex,q),U=null,se(n)}),S.addEventListener("dragend",()=>{U=null,se(n)});b(),W()},j=(u,p)=>{r.status=u,r.statusTone=p,E()},F=()=>{if(!r.config)return;const u=Y(r.config);if(!u.length){r.selectedPageId=null;return}(!r.selectedPageId||!u.some(v=>v.id===r.selectedPageId))&&(r.selectedPageId=u[0].id);const p=u.find(v=>v.id===r.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(r.selectedCardIndex===null||r.selectedCardIndex>=c.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),ri(r.selectedPageId),ii(Qa(r.config,r.selectedPageId))},M=()=>{r.dirty=!0,j(e.statusDirty,"muted")},Z=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),r.selectedPageId&&u.searchParams.set("editorPage",r.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},ye=(u,p)=>{if(!r.config||!r.selectedPageId)return;const c=r.config.pages.find(v=>v.id===r.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const v=Tt(r.config,p||"page"),A=c.id;c.id=v,r.config.rotation.order=r.config.rotation.order.map(T=>T===A?v:T),r.selectedPageId=v}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);M(),F()}},be=(u,p)=>{if(!r.config)return;const c=ai(r.config),v=c.safeArea||{},A=p===""?null:Number(p),T=Number.isFinite(A)?A:null;u==="safeTop"?v.top=T??0:u==="safeRight"?v.right=T??0:u==="safeBottom"?v.bottom=T??0:u==="safeLeft"?v.left=T??0:u==="layoutPaddingPx"?c.layoutPaddingPx=T??16:u==="layoutGapPx"?c.layoutGapPx=T??16:u==="globalScale"&&(c.globalScale=T??1),c.safeArea=v,M()},we=(u,p,c)=>{var T;if(!r.config||!r.selectedPageId)return;const v=r.config.pages.find(N=>N.id===r.selectedPageId);if(!v)return;Array.isArray(v.cards)||(v.cards=[]);const A=v.cards[u];if(A){if(p==="type"){const N=ot(c);if(v.cards[u]={...N,caption:V(A,"caption")||N.caption},((T=r.focusedBinding)==null?void 0:T.cardIndex)===u){const P=ft(c);r.focusedBinding=P?{cardIndex:u,field:P}:null}}else p==="digits"?A[p]=c===""?0:Number(c):A[p]=c;M()}},Se=(u,p)=>{if(!r.config||!u||!p||u===p)return;const c=Y(r.config).map(T=>T.id),v=c.indexOf(u),A=c.indexOf(p);v<0||A<0||(c.splice(v,1),c.splice(A,0,u),r.config.rotation.order=c,r.selectedPageId=u,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),E())},xe=(u,p)=>{if(!r.config||!r.selectedPageId||u===p)return;const c=r.config.pages.find(A=>A.id===r.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||p<0||u>=c.cards.length||p>=c.cards.length)return;const[v]=c.cards.splice(u,1);c.cards.splice(p,0,v),r.selectedCardIndex=p,r.focusedBinding=null,M(),E()},ke=u=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const p=r.config.pages.find(A=>A.id===r.selectedPageId),c=r.haEntities.find(A=>A.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const v=p.cards[r.focusedBinding.cardIndex];v&&(Pi(v,r.focusedBinding.field,c),M(),E())},$e=(u,p)=>{r.selectedCardIndex=u,r.focusedBinding={cardIndex:u,field:p},E(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async u=>{var ee,Re;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),v=c==null?void 0:c.dataset.action;if(!v||!r.config)return;const A=Y(r.config),T=(c==null?void 0:c.dataset.pageId)||null,N=T?A.findIndex(C=>C.id===T):-1;if(v==="select-page"&&T){r.selectedPageId=T,r.selectedCardIndex=0,r.focusedBinding=null,F(),E();return}if(v==="page-up"&&N>0){const C=A.map(O=>O.id);[C[N-1],C[N]]=[C[N],C[N-1]],r.config.rotation.order=C,r.selectedPageId=T,M(),F(),E();return}if(v==="page-down"&&N>=0&&N<A.length-1){const C=A.map(O=>O.id);[C[N],C[N+1]]=[C[N+1],C[N]],r.config.rotation.order=C,r.selectedPageId=T,M(),F(),E();return}if(v==="page-remove"&&T&&A.length>1){r.config.pages=r.config.pages.filter(C=>C.id!==T),r.config.rotation.order=Y(r.config).map(C=>C.id),r.selectedPageId=((ee=Y(r.config)[Math.max(0,N-1)])==null?void 0:ee.id)||((Re=Y(r.config)[0])==null?void 0:Re.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),E();return}if(v==="add-page"){const C=ti(r.config);r.config.pages.push(C),r.config.rotation.order=Y(r.config).map(O=>O.id),r.selectedPageId=C.id,r.selectedCardIndex=null,r.focusedBinding=null,M(),F(),E();return}if(v==="add-card-template"&&r.selectedPageId){const C=r.config.pages.find(B=>B.id===r.selectedPageId),O=(c==null?void 0:c.dataset.cardType)||"entity";if(C){Array.isArray(C.cards)||(C.cards=[]),C.cards.push(ot(O));const B=C.cards.length-1;r.selectedCardIndex=B;const te=ft(O);r.focusedBinding=te?{cardIndex:B,field:te}:null,M(),E(),te&&window.requestAnimationFrame(()=>{const S=n.querySelector("#ha-entity-search");S==null||S.scrollIntoView({behavior:"smooth",block:"center"}),S==null||S.focus()})}return}if(v==="focus-binding"){const C=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),O=(c==null?void 0:c.dataset.bindingField)||"";C>=0&&O&&$e(C,O);return}const P=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(P>=0&&r.selectedPageId){const C=r.config.pages.find(O=>O.id===r.selectedPageId);if(!C||!Array.isArray(C.cards))return;if(v==="select-card"){r.selectedCardIndex=P,E();return}if(v==="card-remove"){C.cards=C.cards.filter((O,B)=>B!==P),r.selectedCardIndex!==null&&(r.selectedCardIndex===P?r.selectedCardIndex=C.cards.length?Math.min(P,C.cards.length-1):null:r.selectedCardIndex>P&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===P?r.focusedBinding=null:r.focusedBinding.cardIndex>P&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),M(),E();return}if(v==="card-up"&&P>0){[C.cards[P-1],C.cards[P]]=[C.cards[P],C.cards[P-1]],r.selectedCardIndex===P?r.selectedCardIndex=P-1:r.selectedCardIndex===P-1&&(r.selectedCardIndex=P),r.focusedBinding&&(r.focusedBinding.cardIndex===P?r.focusedBinding={cardIndex:P-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===P-1&&(r.focusedBinding={cardIndex:P,field:r.focusedBinding.field})),M(),E();return}if(v==="card-down"&&P<C.cards.length-1){[C.cards[P],C.cards[P+1]]=[C.cards[P+1],C.cards[P]],r.selectedCardIndex===P?r.selectedCardIndex=P+1:r.selectedCardIndex===P+1&&(r.selectedCardIndex=P),r.focusedBinding&&(r.focusedBinding.cardIndex===P?r.focusedBinding={cardIndex:P+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===P+1&&(r.focusedBinding={cardIndex:P,field:r.focusedBinding.field})),M(),E();return}}if(v==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,j(e.saving,"muted");try{if(r.avatarPackDirty&&r.avatarPackDetails&&t.avatarPackApiUrl){try{r.avatarPackDetails=await yi(t.avatarPackApiUrl,r.avatarPackDetails)}catch(C){throw new Error(`${e.avatarMappingSaveError}: ${String(C)}`)}r.avatarPackDirty=!1}r.config=await oi(t.sceneApiUrl,Ke(r.config)),r.dirty=!1,r.saving=!1,r.avatarPackSaving=!1,F(),j(e.statusSaved,"ok"),window.setTimeout(()=>Z(),250)}catch(C){r.saving=!1,r.avatarPackSaving=!1,j(`${e.saveError}: ${String(C)}`,"bad")}return}if(v==="bind-entity"){const C=(c==null?void 0:c.dataset.entityId)||"";ke(C)}}),n.addEventListener("input",u=>{const p=u.target;if(!p||!r.config){p&&p.dataset.previewDisplay!==void 0&&w(p.value);return}if(p.dataset.previewDisplay!==void 0){w(p.value);return}if(p.dataset.avatarSemantic!==void 0){const c=Be(r.config);if(!r.avatarPackDetails||!c||r.avatarPackDetails.packId!==c)return;const v=p.value.trim();v?r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic]=Number(v):delete r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic],r.avatarPackDirty=!0,j(e.statusDirty,"muted"),E();return}if(p.dataset.pageField){ye(p.dataset.pageField,p.value),E();return}if(p.dataset.displayField){be(p.dataset.displayField,p.value),E();return}if(p.dataset.cardField&&p.dataset.cardIndex){r.selectedCardIndex=Number(p.dataset.cardIndex),we(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),E();return}p.hasAttribute("data-ha-search")&&(r.entitySearch=p.value,E())}),n.addEventListener("click",u=>{var v;const p=(v=u.target)==null?void 0:v.closest("[data-action='select-avatar-pack']");if(!p||!r.config)return;const c=String(p.dataset.packId||"").trim();lt(r.config).packId=c||null,M(),g(c||null).finally(()=>E()),E()}),a.addEventListener("click",u=>{if(!r.config)return;const p=u.target,c=p==null?void 0:p.closest("[data-scene-card-index][data-scene-page-id]");if(c){const A=String(c.dataset.scenePageId||"").trim(),T=Number(c.dataset.sceneCardIndex||"-1");A&&Number.isFinite(T)&&T>=0&&(r.selectedPageId=A,r.selectedCardIndex=T,r.focusedBinding=null,F(),E(),pt("cards"));return}const v=p==null?void 0:p.closest("[data-scene-page-id]");if(v){const A=String(v.dataset.scenePageId||"").trim();A&&(r.selectedPageId=A,r.selectedCardIndex=0,r.focusedBinding=null,F(),E(),pt("pages"));return}}),n.addEventListener("change",u=>{var c;const p=u.target;!p||p.dataset.avatarArchive===void 0||$(((c=p.files)==null?void 0:c[0])||null)}),n.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(r.selectedCardIndex=c,r.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(r.config=await si(t.sceneApiUrl),t.sceneAvatarManifestUrl)try{r.bundledAvatar=await hi(t.sceneAvatarManifestUrl,t.packId)}catch{r.bundledAvatar=null}if(t.avatarCatalogUrl)try{r.avatarCatalog=await ct(t.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=di(((fe=$t())==null?void 0:fe.states)||null),r.selectedPageId=ni(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",await g(Be(r.config)),F()}catch(u){r.status=`${e.loadError}: ${String(u)}`,r.statusTone="bad"}E()}const Ei="../scene-api/bootstrap",Ai="weather.forecast_home_assistant",Ui="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ee="/local/live2d/",ht="/scene-legacy/live2d/",Ti={...Pt,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Li={...It,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},Ri={...Et,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Di={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Mi={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:t=>`Pack: ${t||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:t=>`Pack: ${t||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Ni(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Bi(){return new URLSearchParams(window.location.search).get("bootstrap")||Ei}function Fi(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);if(a)return new URL(a[0],e.origin).toString();for(const i of["/scene-api/","/scene-runtime/","/scene-editor/"]){const n=e.pathname.indexOf(i);if(n>=0)return new URL(e.pathname.slice(0,n+1),e.origin).toString()}return null}function D(t,e){const a=_i(String(t||"").trim(),e);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const n=Fi(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,i).toString()}function _i(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ee))return`${ht}${a.slice(Ee.length)}`;if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const i=new URL(a,new URL(e,window.location.href));if(i.pathname.startsWith(Ee)){const n=i.pathname.slice(Ee.length);return D(`${ht}${n}${i.search}${i.hash}`,e)||a}}catch{return a}return a}function Oi(t,e){const a=Ve(t),i=a.adapter==="live2d"?D("../../scene-runtime/avatar.html",e):"",n=D(String(a.assetRoot||"").trim(),e),s=f=>{const h=String(f||"").trim();return h?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(h)||h.startsWith("/")?D(h,e):h:""},l=f=>{const h=String(f||"").trim();return h?D(h,e):""},o=Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([f,h])=>[f,D(String(h||""),e)]).filter(([,f])=>!!f));return{...a,assetRoot:n,runtimeUrl:i||D(String(a.runtimeUrl||"").trim(),e),entry:s(String(a.entry||"").trim()),modelUrl:s(String(a.modelUrl||"").trim()),fallbackPortrait:s(String(a.fallbackPortrait||"").trim()),motionMapUrl:l(String(a.motionMapUrl||"").trim()),presetThumbs:o}}function ze(t,e,a,i){t.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${a}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function Dt(){return new URLSearchParams(window.location.search).get("editor")==="1"}function Hi(){if(!Dt())return;const t=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),t(),window.addEventListener("pageshow",t,{once:!0}),window.addEventListener("load",t,{once:!0}),window.requestAnimationFrame(()=>{t(),window.setTimeout(t,120)});let e=!1;const a=()=>{e=!0},i=["pointerdown","wheel","touchstart","keydown"];for(const l of i)window.addEventListener(l,a,{once:!0,passive:!0});let n=0;const s=window.setInterval(()=>{if(e||n>=24){window.clearInterval(s);return}t(),n+=1},80)}async function ji(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return a}async function he(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return e.json()}function zi(t,e){var a,i,n,s,l,o,f,h,r,g,b,w;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([$,k])=>[$,D(k,e)]).filter(([,$])=>!!$)),avatar:{manifestUrl:D(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:D(String(((i=t.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((n=t.state)==null?void 0:n.provider)||"json",stateUrl:D(String(((s=t.state)==null?void 0:s.stateUrl)||"").trim(),e),apiUrl:D(String(((l=t.state)==null?void 0:l.apiUrl)||"").trim(),e)||void 0,haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:D(String(((f=t.state)==null?void 0:f.idleLinesUrl)||"").trim(),e),entityMapUrl:D(String(((h=t.state)==null?void 0:h.entityMapUrl)||"").trim(),e)},control:{provider:((r=t.control)==null?void 0:r.provider)||"json",controlUrl:D(String(((g=t.control)==null?void 0:g.controlUrl)||"").trim(),e),apiUrl:D(String(((b=t.control)==null?void 0:b.apiUrl)||"").trim(),e)||void 0,entityMapUrl:D(String(((w=t.control)==null?void 0:w.entityMapUrl)||"").trim(),e)||void 0}}}async function Vi(t,e){var $,k,I,U,W,K,E,j;const a=D(String((($=t.files)==null?void 0:$.rendererConfigUrl)||"").trim(),e);if(!a)return"";const i=D(String(((k=t.files)==null?void 0:k.sceneConfigUrl)||"").trim(),e),n=D(String(((I=t.files)==null?void 0:I.avatarCatalogUrl)||"").trim(),e);let s="";if(i&&n)try{const F=await he(i);s=String(((U=F.avatar)==null?void 0:U.packId)||"").trim()}catch{s=""}let l="";if(s&&n)try{const F=await he(n),M=Array.isArray(F.items)?F.items.find(Z=>String(Z.id||"").trim()===s):null;l=D(String((M==null?void 0:M.manifestUrl)||"").trim(),e)}catch{l=""}const o=zi(await he(a),a);i&&(o.scene={...o.scene||{},configUrl:i});const f=D(String(((W=t.files)==null?void 0:W.haStatesUrl)||"").trim(),e);f&&(o.state={...o.state||{},apiUrl:((K=o.state)==null?void 0:K.apiUrl)||f},o.control={...o.control||{},apiUrl:((E=o.control)==null?void 0:E.apiUrl)||f});const h=l||String(((j=o.avatar)==null?void 0:j.manifestUrl)||"").trim();if(!h)return URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));const r=D(h,e),g=Oi(await he(r),r),b=URL.createObjectURL(new Blob([JSON.stringify(g)],{type:"application/json"})),w={...o,avatar:{manifestUrl:b}};return URL.createObjectURL(new Blob([JSON.stringify(w)],{type:"application/json"}))}const me=document.getElementById("app");if(!me)throw new Error("Missing #app root element");const le=Mi[Ni()];Hi();ze(me,le.startingTitle,le.startingBody);(async()=>{var e,a,i,n,s;const t=Bi();try{const l=await ji(t),o=String(l.packId||"").trim(),f=o.toLowerCase()==="neiri",h=await Vi(l,t),r=h?await he(h):null;if(!h){ze(me,le.missingRendererTitle,le.missingRendererBody,JSON.stringify(l,null,2));return}document.documentElement.dataset.packId=o,document.title=f?"Нейри":o?`kiosk-scene hosted runtime (${o})`:"kiosk-scene hosted runtime",await za(me,{rendererConfigUrl:h,weatherUrl:f?"./weather.json":void 0,weatherReader:f?Ha({weatherEntity:Ai,openMeteoUrl:Ui,locale:"ru-RU",iconBaseUrl:"./assets",apiUrl:String(((e=r==null?void 0:r.state)==null?void 0:e.apiUrl)||"").trim()||void 0,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:f?Ti:void 0,labels:f?Li:void 0,presetLabels:f?Ri:void 0,defaultWeather:f?Di:void 0}),Dt()&&await Ii({packId:o,sceneApiUrl:D(String(l.sceneEditorApiUrl||"").trim(),t),sceneAvatarManifestUrl:D(String(((a=l.files)==null?void 0:a.avatarManifestUrl)||"").trim(),t),avatarCatalogUrl:D(String(((i=l.files)==null?void 0:i.avatarCatalogUrl)||"").trim(),t),avatarImportUrl:D(String(((n=l.files)==null?void 0:n.avatarImportUrl)||"").trim(),t),avatarPackApiUrl:D(String(((s=l.files)==null?void 0:s.avatarPackApiUrl)||"").trim(),t),sceneUrl:D(String(l.entryUrl||l.runtimeBaseUrl||"./").trim(),t)})}catch(l){ze(me,le.failedTitle,le.failedBody,String(l))}})();
