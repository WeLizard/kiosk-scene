var Dt=Object.defineProperty;var Mt=(t,e,a)=>e in t?Dt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var w=(t,e,a)=>Mt(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function L(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function d(t,e=160){const a=String(t??"").replace(/\s+/g," ").trim();return a?a.length<=e?a:`${a.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Xe(t){const e=new Date(String(t??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ve(t,e){if(!L(t)||!L(e))return e??t;const a={...t};for(const[i,n]of Object.entries(e)){if(Array.isArray(n)){a[i]=n.slice();continue}if(L(n)&&L(a[i])){a[i]=ve(a[i],n);continue}a[i]=n}return a}function mt(t,e=40){return Array.isArray(t)?t.map(a=>d(a,e).toLowerCase()).filter(Boolean):[]}const ae={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},Qe={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function _e(t){var a,i,n,s,l,o,g,u,r,v,x,C,$,S;const e=ve(ae,L(t)?t:{});return{version:1,assistant:{name:d((a=e.assistant)==null?void 0:a.name,40)||ae.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:L(e.links)?Object.fromEntries(Object.entries(e.links).map(([A,U])=>[d(A,64),d(U,1024)]).filter(([A,U])=>A&&U)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||ae.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||ae.scene.configUrl},state:{provider:((l=e.state)==null?void 0:l.provider)==="ha"?"ha":"json",stateUrl:d((o=e.state)==null?void 0:o.stateUrl,1024)||ae.state.stateUrl,apiUrl:d((g=e.state)==null?void 0:g.apiUrl,1024)||void 0,haApiFallback:((u=e.state)==null?void 0:u.haApiFallback)===!0,idleLinesUrl:d((r=e.state)==null?void 0:r.idleLinesUrl,1024)||ae.state.idleLinesUrl,entityMapUrl:d((v=e.state)==null?void 0:v.entityMapUrl,1024)||void 0},control:{provider:((x=e.control)==null?void 0:x.provider)==="ha"?"ha":"json",controlUrl:d((C=e.control)==null?void 0:C.controlUrl,1024)||ae.control.controlUrl,apiUrl:d(($=e.control)==null?void 0:$.apiUrl,1024)||void 0,entityMapUrl:d((S=e.control)==null?void 0:S.entityMapUrl,1024)||void 0}}}function Ve(t){var a,i,n,s,l;const e=ve(Qe,L(t)?t:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||Qe.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:L(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,g])=>[d(o,32),d(g,1024)]).filter(([o,g])=>o&&g)):{},viewPresets:L(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,g])=>d(o,32)&&L(g))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((l=e.capabilities)==null?void 0:l.supportsPointerFocus)===!0}}}const Q={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},Nt=["full","torso","head"];function ue(t,e=Date.now()){var o,g,u,r,v,x,C;const a=ve(Q,L(t)?t:{}),i={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((o=a.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:d((g=a.page)==null?void 0:g.target,40)||null,until:d((u=a.page)==null?void 0:u.until,64)||null},cue:{cue:d((r=a.cue)==null?void 0:r.cue,32)||null,emotion:d((v=a.cue)==null?void 0:v.emotion,32)||null,motion:d((x=a.cue)==null?void 0:x.motion,32)||null,until:d((C=a.cue)==null?void 0:C.until,64)||null}},n=d(a.viewPreset,16).toLowerCase();i.viewPreset=Nt.includes(n)?n:null;const s=Xe(i.page.until);i.page.mode==="pinned"&&(i.page.target?i.page.until&&(!s||s<=e)&&(i.page={mode:"auto",target:null,until:null}):i.page={mode:"auto",target:null,until:null});const l=Xe(i.cue.until);return i.cue.until&&(!l||l<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function De(t,e,a=Date.now()){return ue(ve(ue(t,a),L(e)?e:{}),a)}function Bt(t,e,a=Date.now()){return ue({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function Ft(t,e,a=3e4,i=Date.now()){const n=d(e,40),s=new Date(i+Math.max(5e3,Number(a)||0)).toISOString();return ue({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},i)}function vt(t,e){var l,o,g;const a={...t||{}},i=d((l=e==null?void 0:e.cue)==null?void 0:l.cue,32),n=d((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),s=d((g=e==null?void 0:e.cue)==null?void 0:g.motion,32);return i&&(a.cue=i),n&&(a.emotion=n),s&&(a.motion=s),a}function _(t,e){const a=Number(t);return Number.isFinite(a)?Math.max(0,a):e}function Oe(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function We(t){return L(t)&&L(t.config)?t.config:t}function yt(t,e){const a=e.map(n=>t.find(s=>s.id===n)).filter(Boolean),i=t.filter(n=>!a.some(s=>s.id===n.id));return a.concat(i)}function _t(t,e){const a={...t};return L(e)&&(typeof e.id=="string"&&(a.id=d(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(i=>L(i)))),a}function Ot(t,e){const a=We(t),i=Array.isArray(e.pages)?e.pages.slice():[],n=L(a)&&Array.isArray(a.pages)?a.pages:[],s=i.map(C=>{const $=n.find(S=>d(L(S)?S.id:"",40)===C.id);return _t(C,$)}),l=L(a)&&L(a.rotation)?a.rotation:{},o=L(e.display)?e.display:{},g=L(a)&&L(a.display)?a.display:{},u=L(o.safeArea)?o.safeArea:{},r=L(g.safeArea)?g.safeArea:{},v=Array.isArray(l.order)?l.order:e.rotation.order,x=mt(v).filter((C,$,S)=>s.some(A=>A.id===C)&&S.indexOf(C)===$);return{version:1,rotation:{order:x.length?x:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(l.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:_(r.top,_(u.top,0)),right:_(r.right,_(u.right,0)),bottom:_(r.bottom,_(u.bottom,0)),left:_(r.left,_(u.left,0))},layoutPaddingPx:_(g.layoutPaddingPx,_(o.layoutPaddingPx,16)),layoutGapPx:_(g.layoutGapPx,_(o.layoutGapPx,16)),globalScale:Oe(g.globalScale,Oe(o.globalScale,1))},pages:s}}function Ht(t,e){var s;const a=Ot(t,e),i=We(t),n=L(i)&&L(i.avatar)?{packId:typeof i.avatar.packId=="string"&&d(i.avatar.packId,120)||null}:{packId:typeof((s=e.avatar)==null?void 0:s.packId)=="string"&&d(e.avatar.packId,120)||null};return{version:1,kind:"scene.display",rotation:{order:a.rotation.order.slice(),defaultDwellMs:a.rotation.defaultDwellMs},display:{safeAreaPx:{...a.display.safeAreaPx},layoutPaddingPx:a.display.layoutPaddingPx,layoutGapPx:a.display.layoutGapPx,globalScale:a.display.globalScale},avatar:n,pages:yt(a.pages,a.rotation.order)}}function jt(t){return L(t)&&t.kind==="scene.display"&&Number(t.version)===1&&L(t.rotation)&&Array.isArray(t.pages)&&L(t.display)&&L(t.display.safeAreaPx)}function zt(t){var l,o;const e=Array.isArray(t.pages)?t.pages.filter(g=>L(g)):[],a=Array.isArray((l=t.rotation)==null?void 0:l.order)?t.rotation.order:e.map(g=>g.id),i=mt(a).filter((g,u,r)=>e.some(v=>v.id===g)&&r.indexOf(g)===u),n=t.display.safeAreaPx,s=L(t.avatar)?{packId:typeof t.avatar.packId=="string"&&d(t.avatar.packId,120)||null}:{packId:null};return{version:1,kind:"scene.display",rotation:{order:i.length?i:e.map(g=>g.id),defaultDwellMs:Math.max(5e3,Number((o=t.rotation)==null?void 0:o.defaultDwellMs)||18e3)},display:{safeAreaPx:{top:_(n.top,0),right:_(n.right,0),bottom:_(n.bottom,0),left:_(n.left,0)},layoutPaddingPx:_(t.display.layoutPaddingPx,16),layoutGapPx:_(t.display.layoutGapPx,16),globalScale:Oe(t.display.globalScale,1)},avatar:s,pages:yt(e,i)}}function Vt(t,e){if(jt(t))return zt(t);const a=We(t);if(!L(a))throw new Error("Scene runtime config must be a JSON object.");return Ht(a,a)}function Wt(t,e=220){const a=d(t,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},n=a.replace(/\[(emotion|activity|cue|motion|page|preset|view|size)\s*:\s*([a-z0-9_-]+)\]/gi,(s,l,o)=>{const g=d(l,16).toLowerCase(),u=d(o,32).toLowerCase();return(g==="emotion"||g==="activity"||g==="cue"||g==="motion")&&u&&(i[g]=u)," "});return{text:d(n,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const bt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function pe(t,e={}){const a=L(t)?t:{},i={...bt,...e};return{version:1,assistant:d(a.assistant??i.assistant,40),online:typeof a.online=="boolean"?a.online:i.online,busy:typeof a.busy=="boolean"?a.busy:i.busy,status:d(a.status??i.status,255),message:d(a.message??i.message,255),source:d(a.source??i.source,64),updatedAt:d(a.updatedAt??i.updatedAt,64),emotion:d(a.emotion??i.emotion,32)||null,activity:d(a.activity??i.activity,32)||null,cue:d(a.cue??i.cue,32)||null,intensity:qt(a.intensity??i.intensity),speaking:typeof a.speaking=="boolean"?a.speaking:!!i.speaking,motion:d(a.motion??i.motion,32)||null,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):i.revision,event:d(a.event??i.event,64)}}function qt(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Gt(t,e){return t.order[e]||t.order[0]||""}function Kt(t,e){const a=t.order.findIndex(i=>i===e);return a>=0?a:0}function Yt(t,e,a,i){const n=Array.isArray(t.order)?t.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let l=1;l<=n.length;l+=1){const o=(s+l*a+n.length)%n.length;if(i(n[o]))return o}return s}function Jt(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],i=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=t.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:Kt(t.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(t.force){const l=Gt(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(l)?t.activeIndex:Math.max(0,a.findIndex(g=>t.isEligible(g))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<i)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let s=t.activeIndex;for(let l=1;l<=a.length;l+=1){const o=(t.activeIndex+l)%a.length;if(t.isEligible(a[o])){s=o;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const wt={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Zt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function et(t){const e=d(t,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Zt.some(a=>e.includes(a)):!1}function Xt(t,e){const a=pe(t),i=d(a.status,72),n=d(a.message,220);if(!(a.online!==!1&&(et(i)||et(n))))return{state:a,hasTechnicalFailure:!1};const o=d(a.emotion,32).toLowerCase(),g=d(a.motion,32).toLowerCase();return{state:{...a,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:o==="error"?"calm":o||null,activity:d(a.activity,32).toLowerCase()==="error"?"idle":d(a.activity,32)||null,cue:d(a.cue,32)||null,intensity:a.intensity??null,speaking:!1,motion:g==="error"?"idle_soft":g||null},hasTechnicalFailure:!0}}function Qt(t,e){const a=(e==null?void 0:e.copy)??wt,i=pe(t),n=Wt(i.message,220),s=Xt({...i,message:n.text,emotion:d(i.emotion,32)||n.emotion||null,activity:d(i.activity,32)||n.activity||null,cue:d(i.cue,32)||n.cue||null,motion:d(i.motion,32)||n.motion||null},{healthyStatus:a.technicalHealthyLabel}),l=s.state,o=d(l.message,180),g=d(l.activity,32).toLowerCase(),u=l.online!==!1&&g!=="offline",r=!!l.busy||g==="thinking"||g==="busy"||g==="acting",v=l.speaking===!0||g==="speaking",x=u?r?a.busyLabel:o||v?a.speakingLabel:s.hasTechnicalFailure?a.technicalHealthyLabel:a.idleLabel:a.offlineLabel,C=o?a.messageCaption:s.hasTechnicalFailure?a.statusCaption:a.modeCaption,$=o||(u?r?a.busyBody:d(e==null?void 0:e.idleMonologue,220)||a.idleBody:a.offlineBody);return{state:l,hasTechnicalFailure:s.hasTechnicalFailure,caption:C,label:x,body:$,bodyKey:[C,x,$].join(":")}}function ea(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function tt(t,e=-1){const a=Array.isArray(t)?t.map(n=>d(n,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*a.length);return a.length>1&&i===e&&(i=(i+1)%a.length),{line:a[i],index:i}}function ta(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),i=!!d(t==null?void 0:t.message,180);return e&&!a&&!i}const aa={cue:null,emotion:null,motion:null,until:null},ia={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function ra(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function St(t){return t.endsWith("/")?t:`${t}/`}function xt(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function Ce(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;if(a.startsWith("/")){const n=xt(t||window.location.href);if(n)return new URL(a.slice(1),n).toString();const s=new URL(window.location.href).origin;return new URL(a,s).toString()}const i=new URL(St(d(t,1024)||"."),window.location.href);return new URL(a,i).toString()}function Ae(t){const e=d(t,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const a=xt(window.location.href);return a?new URL(e.slice(1),a).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function na(t,e,a){const i=d(t.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?Ae(i):new URL("../avatar.html",new URL(St(d(a,1024)||"."),window.location.href)).toString()}function sa(t,e){const a=d(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function oa(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"Поднимаю рендер аватара…":"Loading compatibility renderer..."}function la(t,e){const a=new URL(t,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[n,s]of Object.entries(i)){const l=d(n,64);if(!l||s==null)continue;const o=typeof s=="boolean"?s?"1":"0":String(s);a.searchParams.set(l,o)}return a.toString()}function at(t,e,a){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),Ce(a,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([n,s])=>[d(n,64),Ae(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Ae(t.state.stateUrl),idleLinesUrl:Ae(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:Ce(a,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:Ce(a,e.fallbackPortrait||""),motionMapUrl:Ce(a,e.motionMapUrl||""),presetThumbs:i}}}class da{constructor(e={}){w(this,"id","live2d");w(this,"options");w(this,"manifest");w(this,"rendererConfig");w(this,"host",null);w(this,"containerEl",null);w(this,"iframeEl",null);w(this,"splashEl",null);w(this,"splashTextEl",null);w(this,"assetRoot","");w(this,"rendererConfigBlobUrl","");w(this,"currentState");w(this,"currentCue",{...aa});w(this,"currentPreset","full");w(this,"currentBubble",{...ia});w(this,"targetOrigin","*");w(this,"isReady",!1);w(this,"bubbleRevision",0);w(this,"handleWindowMessage",e=>{var n;const a=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!a||e.source!==a||!ra(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Ve({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=_e(e.rendererConfig||{}),this.currentState=pe({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const a=na(this.options,this.manifest,this.assetRoot),i={...this.options.query||{}};try{if(new URL(a,window.location.href).origin===window.location.origin){const u=at(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(u)],{type:"application/json"})),i.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const n=la(a,{...this.options,query:i});this.targetOrigin=sa(n,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const l=document.createElement("iframe");l.className="ks-live2d-iframe",l.src=n,l.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,l.loading="eager",l.allow="autoplay",Object.assign(l.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&l.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);s.append(l,o),this.host.append(s),l.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=l,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=pe(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent=oa(),Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(n,s),a.append(i),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:at(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=vt(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const a=(i=this.iframeEl)==null?void 0:i.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function ca(t={}){return new da(t)}const ua={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},it={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class pa{constructor(e={}){w(this,"id","static");w(this,"options");w(this,"host",null);w(this,"frameEl",null);w(this,"imageEl",null);w(this,"bubbleEl",null);w(this,"fallbackEl",null);w(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(i,n,s),this.host.append(a),this.frameEl=a,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=n;const l=this.resolveImageUrl(e.assetRoot);l&&(i.src=l,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||it,i=a[e]||a.full||it.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return ua}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const i=e.replace(/\/+$/,""),n=a.replace(/^\.?\//,"");return i?`${i}/${n}`:n}}function fa(t={}){return new pa(t)}function ga(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function kt(){var t;for(const e of ga())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),i=a==null?void 0:a.hass;if(i!=null&&i.states)return i}catch{continue}return null}function ha(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function ma(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const i=d(a.entity_id,255);i&&(e[i]=a)}return e}function va(t,e,a="Assistant"){const i=t[e.status],n=t[e.message],s=t[e.online],l=t[e.busy],o=t[e.source],g=t[e.updatedAt],u=e.emotion?t[e.emotion]:null,r=e.activity?t[e.activity]:null,v=e.cue?t[e.cue]:null,x=e.speaking?t[e.speaking]:null,C=e.intensity?t[e.intensity]:null,$=e.motion?t[e.motion]:null,S=t[e.revision];if(!i&&!n&&!s&&!l)return null;const A=d(i==null?void 0:i.state,72),U=d(n==null?void 0:n.state,220),W=d(g==null?void 0:g.state,64),K=Me(s,!0),I=Me(l,!1),j=d(r==null?void 0:r.state,32)||"",M=Me(x)??j==="speaking",Z=j||(K?M?"speaking":I?"thinking":"idle":"offline");return pe({version:1,assistant:d(a,40)||"Assistant",online:K,busy:I,status:A&&A!=="unknown"&&A!=="unavailable"?A:"",message:U&&U!=="unknown"&&U!=="unavailable"?U:"",source:d(o==null?void 0:o.state,64)||"ha",updatedAt:W&&W!=="unknown"&&W!=="unavailable"?W:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(u==null?void 0:u.state,32)||null,activity:Z,cue:d(v==null?void 0:v.state,32)||null,intensity:Sa(C),speaking:M,motion:d($==null?void 0:$.state,32)||null,revision:Number(S==null?void 0:S.state)||0})}const ya=["full","torso","head"];function ba(t){const e=d(t==null?void 0:t.state,16).toLowerCase();return ya.includes(e)?e:null}function wa(t,e){const a=e.viewPreset?t[e.viewPreset]:null,i=e.pageMode?t[e.pageMode]:null,n=e.pageTarget?t[e.pageTarget]:null,s=e.pageUntil?t[e.pageUntil]:null,l=e.cue?t[e.cue]:null,o=e.emotion?t[e.emotion]:null,g=e.motion?t[e.motion]:null,u=e.cueUntil?t[e.cueUntil]:null,r=e.revision?t[e.revision]:null;if(!a&&!i&&!n&&!l&&!o&&!g)return null;const v=d(n==null?void 0:n.state,40)||null,x=d(s==null?void 0:s.state,64)||null,C=d(i==null?void 0:i.state,16).toLowerCase(),$=C==="auto"?"auto":C==="pinned"||v||x?"pinned":"auto";return ue({...Q,revision:Number(r==null?void 0:r.state)||0,viewPreset:ba(a),page:{mode:$,target:$==="pinned"?v:null,until:$==="pinned"?x:null},cue:{cue:d(l==null?void 0:l.state,32)||null,emotion:d(o==null?void 0:o.state,32)||null,motion:d(g==null?void 0:g.state,32)||null,until:d(u==null?void 0:u.state,64)||null}})}function Me(t,e){const a=d(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function Sa(t){const e=d(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function $t(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),i=Math.max(6e4,t.authCooldownMs??600*1e3),n=d(t.apiUrl,4096);let s=null,l=0,o=null,g=0;async function u(){var $;const r=kt();if(r!=null&&r.states)return r.states;const v=Date.now();if(s&&v-l<a||!n&&!t.allowApiFallback||typeof e!="function"||v<g)return s;if(o)return o;const x=n?"":d((($=t.readToken)==null?void 0:$.call(t))??ha(),4096);if(!n&&!x)return s;const C={};return x&&(C.Authorization=`Bearer ${x}`),o=e(n||"/api/states",{cache:"no-store",headers:C}).then(async S=>{if(!S.ok){const A=new Error(`HA states HTTP ${S.status}`);throw A.status=S.status,A}return S.json()}).then(S=>{const A=ma(S);return A&&(s=A,l=Date.now()),A||s}).catch(S=>(((S==null?void 0:S.status)===401||(S==null?void 0:S.status)===403)&&(g=Date.now()+i),s)).finally(()=>{o=null}),o}return{id:"ha-states",async read(){return u()}}}async function qe(t){const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=d(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const i=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await e(i.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return t.sanitize?t.sanitize(s):s}catch(n){if(t.defaultValue!==void 0)return t.defaultValue;throw n}}function xa(t){return{id:"json-state",async read(){const e=await qe({...t,defaultValue:t.defaultValue});return pe(e)}}}function ka(t){return{id:"json-control",async read(){const e=await qe({...t,defaultValue:t.defaultValue??Q});return ue(e)}}}function $a(t){return{id:"json-lines",async read(){const e=await qe({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>d(a,220)).filter(Boolean):[]}}}function z(t,e,a=64){return d(t[e],a)}function ge(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Ca(t,e="en-US"){const a=d(t,64);if(!a)return"";const i=new Date(a);return Number.isNaN(i.getTime())?a:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Pe(t,e){return!t||!e?null:t[e]||null}function Pa(t,e=null,a="en-US"){var v,x,C,$;const i=z(t,"caption",40)||z(t,"type",24)||"Card",n=z(t,"hint",72),s=z(t,"type",32).toLowerCase()||"entity",l=z(t,"entity",255),o=Pe(e,l),g=Pe(e,z(t,"stateEntity",255)),u=Pe(e,z(t,"downEntity",255)),r=Pe(e,z(t,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:z(t,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const S=Number(o==null?void 0:o.state);return!Number.isFinite(S)||S<=0?{caption:i,value:"Clear",hint:n||"nothing pending"}:{caption:i,value:`${S} item${S===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const S=(o==null?void 0:o.state)==="on";return{caption:i,value:S?z(t,"onText",48)||"On":z(t,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const S=ge(o==null?void 0:o.state,0);return{caption:i,value:S?`${S}%`:"—",hint:d(g==null?void 0:g.state,48)||n||"battery level"}}if(s==="network"){const S=ge(u==null?void 0:u.state,0),A=ge(r==null?void 0:r.state,0);return{caption:i,value:S||A?`↓ ${S||"0"} · ↑ ${A||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:i,value:Ca(o==null?void 0:o.state,a)||"—",hint:n||"next event"};if(s==="percent"){const S=ge(o==null?void 0:o.state,Number(z(t,"digits",4))||0);return{caption:i,value:S?`${S}%`:"—",hint:n||d((v=o==null?void 0:o.attributes)==null?void 0:v.friendly_name,48)||"state percentage"}}if(s==="number"){const S=Number(z(t,"digits",4))||0,A=ge(o==null?void 0:o.state,S),U=z(t,"unit",16)||d((x=o==null?void 0:o.attributes)==null?void 0:x.unit_of_measurement,16);return{caption:i,value:A?`${A}${U?` ${U}`:""}`:"—",hint:n||d((C=o==null?void 0:o.attributes)==null?void 0:C.friendly_name,48)||"numeric value"}}return{caption:i,value:d(o==null?void 0:o.state,64)||z(t,"value",64)||"—",hint:n||d(($=o==null?void 0:o.attributes)==null?void 0:$.friendly_name,48)||"entity state"}}function Ia(t,e=null,a="en-US"){return Array.isArray(t)?t.map(i=>Pa(i,e,a)):[]}const Ct={...wt,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Pt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},It={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Ea={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Ue={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function y(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ge(t){return t.endsWith("/")?t:`${t}/`}function Aa(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function H(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(t,window.location.href);if(a.startsWith("/")){const n=Aa(i.toString());return n?new URL(a.slice(1),n).toString():new URL(a,i.origin).toString()}return new URL(a,i).toString()}function Et(t){try{return new URL(".",t).toString()}catch{return new URL(".",window.location.href).toString()}}function Ua(t,e){const a=Et(e),i=H(a,d(t.assetRoot,1024)||"./assets"),n=i?Ge(i):a,s=l=>{const o=d(l,1024);return o?H(n,o):""};return{...t,assetRoot:i,runtimeUrl:H(a,t.runtimeUrl||""),entry:s(t.entry||""),modelUrl:s(t.modelUrl||""),fallbackPortrait:s(t.fallbackPortrait||""),motionMapUrl:s(t.motionMapUrl||""),expressionMapUrl:s(t.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([l,o])=>[l,H(a,o)]).filter(([,l])=>!!l))}}function Ne(t){return{...Ue,...t||{},metrics:{...Ue.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)&&t.forecast.length?t.forecast.map(e=>({...e})):Ue.forecast.map(e=>({...e}))}}function rt(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function G(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const i=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function Ta(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${G(a)} мм рт. ст.`:`${G(a*.750061683,0)} мм рт. ст.`}function La(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${G(a,1)} м/с`:i==="km/h"||i==="км/ч"?`${G(a/3.6,1)} м/с`:`${G(a,1)} м/с`}function Ra(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Da(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function Ma(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function Na(t,e="ru-RU"){const a=d(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||d(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function nt(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function Ba(t,e="./assets/icons"){const a=Number(t),i=Ge(e);return a===0?`${i}sun.svg`:[1,2].includes(a)?`${i}cloud-sun.svg`:[3].includes(a)?`${i}cloud.svg`:[45,48].includes(a)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${i}cloud-snow.svg`:[95,96,99].includes(a)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function Fa(t){const e=d(t.locale,32)||"ru-RU",a=d(t.iconBaseUrl,1024)||"./assets/icons",i=$t({allowApiFallback:t.allowApiFallback,apiUrl:t.apiUrl,fetchImpl:t.fetchImpl});return async()=>{var $,S,A,U,W,K,I,j,F,M,Z,ye,be,we,Se,xe,ke,$e,fe,p;const n=await i.read(),s=t.fetchImpl??globalThis.fetch,l=n==null?void 0:n[t.weatherEntity];let o=null;const g=d(t.openMeteoUrl,4096);if(g&&typeof s=="function")try{const f=await s(`${g}${g.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});f.ok&&(o=await f.json())}catch{o=null}if(!l&&!(o!=null&&o.current))return null;const u=d(l==null?void 0:l.last_changed,64)||d(($=o==null?void 0:o.current)==null?void 0:$.time,64)||new Date().toISOString(),r=l?Na(l.state,e):nt((S=o==null?void 0:o.current)==null?void 0:S.weather_code,e),v=Array.isArray((A=o==null?void 0:o.daily)==null?void 0:A.time)?o.daily.time.map((f,c)=>{var E,T,N,P,ee;const m=new Date(`${f}T12:00:00+03:00`);return{name:m.toLocaleDateString(e,{weekday:"short"}),dayNumber:m.toLocaleDateString(e,{day:"numeric"}),monthShort:m.toLocaleDateString(e,{month:"short"}),note:d(nt((E=o.daily.weather_code)==null?void 0:E[c],e),28),max:`${G((T=o.daily.temperature_2m_max)==null?void 0:T[c])}°`,min:`${G((N=o.daily.temperature_2m_min)==null?void 0:N[c])}° · ${G((P=o.daily.precipitation_probability_max)==null?void 0:P[c])}%`,icon:Ba((ee=o.daily.weather_code)==null?void 0:ee[c],a)}}):[],x=v[0]||null,C=v.slice(1,6);return{todayValue:Da(u,e),todayLabel:Ma(u,e),updatedAt:Ra(u,e),temperature:G(((U=l==null?void 0:l.attributes)==null?void 0:U.temperature)??((W=o==null?void 0:o.current)==null?void 0:W.temperature_2m),1),condition:r,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${G(((K=l==null?void 0:l.attributes)==null?void 0:K.apparent_temperature)??((I=o==null?void 0:o.current)==null?void 0:I.apparent_temperature)??((j=l==null?void 0:l.attributes)==null?void 0:j.temperature),1)}°C`,badgeSummary:r,badgeRange:x?`${x.max} / ${G((M=(F=o==null?void 0:o.daily)==null?void 0:F.temperature_2m_min)==null?void 0:M[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${G(((Z=l==null?void 0:l.attributes)==null?void 0:Z.humidity)??((ye=o==null?void 0:o.current)==null?void 0:ye.relative_humidity_2m))}%`,pressure:Ta(((be=l==null?void 0:l.attributes)==null?void 0:be.pressure)??((we=o==null?void 0:o.current)==null?void 0:we.surface_pressure),((Se=l==null?void 0:l.attributes)==null?void 0:Se.pressure_unit)??"hPa"),wind:La(((xe=l==null?void 0:l.attributes)==null?void 0:xe.wind_speed)??((ke=o==null?void 0:o.current)==null?void 0:ke.wind_speed_10m),(($e=l==null?void 0:l.attributes)==null?void 0:$e.wind_speed_unit)??"km/h"),clouds:`${G(((fe=l==null?void 0:l.attributes)==null?void 0:fe.cloud_coverage)??((p=o==null?void 0:o.current)==null?void 0:p.cloud_cover))}%`},forecast:C}}}class _a{constructor(e,a={}){w(this,"root");w(this,"options");w(this,"avatarMountEl");w(this,"carouselShellEl");w(this,"carouselTrackEl");w(this,"dotsEl");w(this,"presetButtons");w(this,"copy");w(this,"labels");w(this,"presetLabels");w(this,"rendererConfig");w(this,"avatarManifest");w(this,"sceneConfig");w(this,"sceneRuntimeConfig");w(this,"entityMap",null);w(this,"controlEntityMap",null);w(this,"haStatesReader",null);w(this,"weatherData");w(this,"hassStates",null);w(this,"currentState");w(this,"remoteControl",Q);w(this,"uiControl",Q);w(this,"currentControl",Q);w(this,"idleLines",[]);w(this,"activeIndex",0);w(this,"lastAutoRotateAt",0);w(this,"currentIdleLine","");w(this,"lastIdleIndex",-1);w(this,"currentPreset","full");w(this,"idleTimer",null);w(this,"avatarAdapter",null);w(this,"refreshIntervalHandle",null);w(this,"orderedPages",[]);w(this,"carouselDragState",null);this.root=e,this.options=a,this.copy={...Ct,...a.copy||{}},this.labels={...Pt,...a.labels||{}},this.presetLabels={...It,...a.presetLabels||{}},this.weatherData=Ne(a.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=H(window.location.href,this.getRendererConfigUrl()),a=Et(e),i=_e(await this.readJson(e)),n=_e({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([l,o])=>[l,H(a,o)])),avatar:{...i.avatar,manifestUrl:H(a,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:H(a,i.scene.configUrl)},state:{...i.state,stateUrl:H(a,i.state.stateUrl),apiUrl:i.state.apiUrl?H(a,i.state.apiUrl):void 0,idleLinesUrl:H(a,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?H(a,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:H(a,i.control.controlUrl),apiUrl:i.control.apiUrl?H(a,i.control.apiUrl):void 0,entityMapUrl:i.control.entityMapUrl?H(a,i.control.entityMapUrl):void 0}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=Ua(Ve(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.sceneRuntimeConfig=Vt(this.sceneConfig),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await $a({url:this.rendererConfig.state.idleLinesUrl||H(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=De(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=Bt(this.uiControl,a||"full"),this.refresh()})}bindCarouselControls(){let e=0,a=0;const i=(u,r,v,x)=>this.orderedPages.length<2||this.isCarouselInteractiveTarget(x)?!1:(this.carouselDragState={pointerId:u,startX:r,startY:v,deltaX:0,deltaY:0,locked:!1},!0),n=(u,r,v)=>{if(!this.carouselDragState||u!==this.carouselDragState.pointerId)return!1;if(this.carouselDragState.deltaX=r-this.carouselDragState.startX,this.carouselDragState.deltaY=v-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return!1;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX))return this.clearDragState(u,!1),!1;this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}return this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX}),!0},s=u=>{if(!this.carouselDragState||u!==this.carouselDragState.pointerId)return;const{locked:r,deltaX:v}=this.carouselDragState,x=this.carouselShellEl.clientWidth||1,C=r&&Math.abs(v)>=x*.16,$=v<0?1:-1;if(this.clearDragState(u,!1),C){this.stepPage($);return}this.updateCarouselPosition()},l=()=>Date.now()-e>500;this.carouselShellEl.addEventListener("keydown",u=>{if(u.key==="ArrowLeft"){u.preventDefault(),this.stepPage(-1);return}u.key==="ArrowRight"&&(u.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",u=>{var r,v;u.button!==0||u.pointerType==="mouse"&&Date.now()-a<500||(e=Date.now(),i(u.pointerId,u.clientX,u.clientY,u.target)&&(u.preventDefault(),(v=(r=this.carouselShellEl).setPointerCapture)==null||v.call(r,u.pointerId)))}),this.carouselShellEl.addEventListener("pointermove",u=>{!this.carouselDragState||u.pointerId!==this.carouselDragState.pointerId||(e=Date.now(),n(u.pointerId,u.clientX,u.clientY)&&u.preventDefault())});const o=u=>{e=Date.now(),s(u.pointerId)};this.carouselShellEl.addEventListener("pointerup",o),this.carouselShellEl.addEventListener("pointercancel",o),this.carouselShellEl.addEventListener("lostpointercapture",o),this.carouselShellEl.addEventListener("touchstart",u=>{var v;if(!l())return;const r=(v=u.changedTouches)==null?void 0:v[0];r&&i(`touch-${r.identifier}`,r.clientX,r.clientY,u.target)&&(a=Date.now(),u.preventDefault(),u.stopPropagation())},{passive:!1}),this.carouselShellEl.addEventListener("touchmove",u=>{if(!l()||!this.carouselDragState)return;const r=Array.from(u.changedTouches||[]).find(v=>{var x;return`touch-${v.identifier}`===((x=this.carouselDragState)==null?void 0:x.pointerId)});r&&(a=Date.now(),n(`touch-${r.identifier}`,r.clientX,r.clientY)&&(u.preventDefault(),u.stopPropagation()))},{passive:!1});const g=u=>{if(!l()||!this.carouselDragState)return;const r=Array.from(u.changedTouches||[]).find(v=>{var x;return`touch-${v.identifier}`===((x=this.carouselDragState)==null?void 0:x.pointerId)});r&&(a=Date.now(),u.preventDefault(),u.stopPropagation(),s(`touch-${r.identifier}`))};this.carouselShellEl.addEventListener("touchend",g,{passive:!1}),this.carouselShellEl.addEventListener("touchcancel",g,{passive:!1})}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(this.currentControl),this.uiControl=De(Q,this.uiControl),this.currentControl=De(this.remoteControl,this.uiControl);const e=vt(this.currentState,this.currentControl);this.syncIdleMonologue(e);const a=Qt(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=this.sceneRuntimeConfig;this.applyDisplayConfig(i);const n=i.pages,s=Jt({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:l=>n.some(o=>o.id===l)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(a.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(a.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(n,a)}renderCarousel(e,a){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,n)=>i.kind==="overview"?this.renderOverviewSlide(i,a,n):this.renderDynamicSlide(i,n,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,n)=>`
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
    `}renderDynamicSlide(e,a,i){const n=Ia(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),l=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),o=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${a+1} / ${i}`),g=e.cardStyle==="mini"?n.map((C,$)=>`
          <article class="mini-card" data-scene-card-index="${$}" data-scene-page-id="${y(e.id)}">
            <span class="caption">${y(C.caption)}</span>
            <strong>${y(C.value)}</strong>
          </article>
        `).join(""):n.map((C,$)=>`
          <article class="home-card" data-scene-card-index="${$}" data-scene-page-id="${y(e.id)}">
            <span class="caption">${y(C.caption)}</span>
            <strong>${y(C.value)}</strong>
            <small>${y(C.hint)}</small>
          </article>
        `).join(""),u=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(C=>this.renderForecastDay(C)).join("")}</div>`:"",r=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",v=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${a+1}`,x=d(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${y(e.id)}" data-scene-page-id="${y(e.id)}" data-slide-order="${a}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${y(e.kind)}" data-dynamic-card-style="${y(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${y(v)}</h1>
              ${x?`<p class="subline">${y(x)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${y(l)}</span>
              <span class="value">${y(o)}</span>
            </div>
          </div>
          ${u}
          <div class="${r}">
            ${g||`<div class="empty">${y(this.labels.noCardsConfigured)}</div>`}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const a=e[0],i=e[e.length-1];return`${d(a.dayNumber,4)} ${d(a.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var n;const a=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return a||`${Ge(d(this.options.iconBaseUrl,1024)||"./assets")}${Ea[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:i,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,a){var i,n;typeof e=="number"&&!a&&((n=(i=this.carouselShellEl).hasPointerCapture)!=null&&n.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=Yt(this.sceneRuntimeConfig.rotation,this.activeIndex,e,i=>this.orderedPages.some(n=>n.id===i));this.pinPageByIndex(a)}pinPageByIndex(e){const i=(this.orderedPages.length?this.orderedPages:this.sceneRuntimeConfig.pages)[e];if(!i)return;const n=Math.max(18e3,this.sceneRuntimeConfig.rotation.defaultDwellMs*2);this.uiControl=Ft(this.uiControl,i.id,n),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!ta(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=tt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const a=tt(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refresh()},ea(18e3,18e3))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: HTTP ${a.status}`);return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:$t({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl})}async readAssistantState(){const e=async()=>xa({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??bt}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap||!this.haStatesReader)return e();const a=await this.haStatesReader.read();return va(a||{},this.entityMap,this.rendererConfig.assistant.name)||e()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=Q){const a=async()=>ka({url:this.rendererConfig.control.controlUrl,defaultValue:e}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap||!this.haStatesReader)return a();const i=await this.haStatesReader.read();return wa(i||{},this.controlEntityMap)||a()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const a=await this.readJson(this.getWeatherUrl());e=rt(e,a)}catch{}if(this.options.weatherReader)try{const a=await this.options.weatherReader();e=rt(e,a)}catch{}try{return Ne(e)}catch{return Ne(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return ca({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return fa({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const i=a.dataset.avatarPreset||"",n=a.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];a.classList.toggle("is-active",i===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function Oa(t,e={}){const a=new _a(t,e);return await a.init(),a}const Ha=["overview","cards","forecast+cards"],ja=["full","mini"],At=["entity","text","todo","onoff","battery","network","time","percent","number"],J=["caption","hint"],Ie="/local/live2d/",st="/scene-legacy/live2d/",za={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Va={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Wa=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],qa=4*1024*1024,Ga=192*1024,Te=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],He="mellow-fly-7";function de(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Ka(t){return Te.find(e=>e.id===t)||Te.find(e=>e.id===He)||Te[0]}function Ya(t){return`${t.width} × ${t.height}`}function h(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ke(t){return JSON.parse(JSON.stringify(t))}function Y(t){const e=new Map(t.pages.map(n=>[n.id,n])),a=t.rotation.order.map(n=>e.get(n)).filter(Boolean),i=t.pages.filter(n=>!a.some(s=>s.id===n.id));return[...a,...i]}function Ja(t,e){return e?Math.max(0,Y(t).findIndex(a=>a.id===e)):0}function Za(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Ut(t,e){const a=Za(e);let i=a,n=2;for(;t.pages.some(s=>s.id===i);)i=`${a}-${n}`,n+=1;return i}function Xa(t){const e=t.pages.length+1,a=de()==="ru";return{id:Ut(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function ot(t){const e=de()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function V(t,e){const a=t[e];return a==null?"":String(a)}function X(t,e){const a=t[e];return a==null?"":String(a)}function ie(t,e){const a=t.display||{},i=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function Qa(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function Be(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function lt(t){return t.avatar||(t.avatar={}),t.avatar}function ei(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function ti(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function ai(t){var i;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&Y(t).some(n=>n.id===a)?a:((i=Y(t)[0])==null?void 0:i.id)||null}async function ii(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return Ke(a.config)}async function ri(t,e){const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await a.json();if(!a.ok||i.success===!1||!i.config)throw new Error(`POST ${t} failed: HTTP ${a.status}`);return Ke(i.config)}function Ye(t){switch(t){case"text":return[...J,"value"];case"todo":return[...J,"entity"];case"onoff":return[...J,"entity","onText","offText"];case"battery":return[...J,"entity","stateEntity"];case"network":return[...J,"downEntity","upEntity"];case"time":return[...J,"entity"];case"percent":return[...J,"entity","digits"];case"number":return[...J,"entity","digits","unit"];default:return[...J,"entity"]}}function Fe(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:t.kindOverview}function ce(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function Tt(t){const e=de();return za[e][t]||""}function Le(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function ni(t,e){const a=e.attributes||{},i=String(a.friendly_name||t),n=t.includes(".")&&t.split(".",1)[0]||"other",s=String(e.state||""),l=String(a.unit_of_measurement||"");return{entityId:t,name:i,domain:n,state:s,unit:l}}function si(t){return t?Object.entries(t).map(([e,a])=>ni(e,a)).sort((e,a)=>{const i=e.domain.localeCompare(a.domain);return i!==0?i:e.name.localeCompare(a.name,"ru")}):[]}function oi(t,e){const a=e.trim().toLowerCase();return a?t.filter(i=>i.entityId.toLowerCase().includes(a)||i.name.toLowerCase().includes(a)||i.domain.toLowerCase().includes(a)||i.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function li(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():null}function ne(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const n=li(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,i).toString()}function Je(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ie))return ne(`${st}${a.slice(Ie.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const i=new URL(a,e);if(i.pathname.startsWith(Ie)){const n=i.pathname.slice(Ie.length);return ne(`${st}${n}${i.search}${i.hash}`,e)}}catch{return a}return a}function di(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function ci(t,e){const a=new URL("./",t).toString(),i=ne(Je(e,a)||e,a);return di(i||a)}function dt(t,e,a){const i=String(a||"").trim();return i?ne(Je(i,t)||i,ci(t,e)):""}function ui(t,e){const a=String(e||"").trim();return a?ne(Je(a,t)||a,new URL("./",t).toString()):""}function Lt(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}function je(t,e){const a=Lt(t);return{...a,manifestUrl:a.manifestUrl?ne(a.manifestUrl,e):"",previewUrl:a.previewUrl?ne(a.previewUrl,e):""}}async function pi(t,e){var u;const a=String(t||"").trim();if(!a)return null;const i=await fetch(a,{cache:"no-store"}),n=await i.json();if(!i.ok)throw new Error(`GET ${a} failed: HTTP ${i.status}`);const s=String(n.assetRoot||"").trim();let l=0;const o=dt(a,s,String(n.motionMapUrl||"").trim());if(o)try{const r=await fetch(o,{cache:"no-store"}),v=await r.json();r.ok&&Array.isArray(v.motions)&&(l=v.motions.length)}catch{l=0}const g=ui(a,String(((u=n.presetThumbs)==null?void 0:u.full)||"").trim())||dt(a,s,String(n.fallbackPortrait||"").trim());return Lt({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:a,previewUrl:g,motionCount:l,capabilities:n.capabilities})}async function ct(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),i=await a.json();if(!a.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(i.items)?i.items.map(n=>je(n,e)).filter(n=>n.id&&n.manifestUrl):[]}async function fi(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const i=/\/api\/hassio_ingress\//.test(a),n=i?Ga:qa;if(i||e.size>n){const g=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,u=Math.max(1,Math.ceil(e.size/n));let r=null;for(let v=0;v<u;v+=1){const x=v*n,C=Math.min(e.size,x+n),$=new FormData;$.set("uploadId",g),$.set("filename",e.name),$.set("chunkIndex",String(v)),$.set("chunkCount",String(u)),$.set("archive",e.slice(x,C,"application/zip"),`${e.name}.part-${v+1}-of-${u}`);const S=await fetch(a,{method:"POST",body:$}),A=await S.json();if(!S.ok||A.success===!1)throw new Error(String(A.error||`HTTP ${S.status}`));A.item&&(r=je(A.item,a))}if(!r)throw new Error("Avatar import did not return the imported pack.");return r}const s=new FormData;s.set("archive",e,e.name);const l=await fetch(a,{method:"POST",body:s}),o=await l.json();if(!l.ok||o.success===!1||!o.item)throw new Error(String(o.error||`HTTP ${l.status}`));return je(o.item,a)}async function gi(t,e){var l,o,g,u;const a=String(t||"").trim(),i=String(e||"").trim();if(!a||!i)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${a}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((l=s.motionMap)==null?void 0:l.motions)?(o=s.motionMap)==null?void 0:o.motions.map(r=>({index:Number(r.index),id:String(r.id||"").trim(),label:String(r.label||r.id||"").trim(),group:String(r.group||"").trim(),tags:Array.isArray(r.tags)?r.tags.map(v=>String(v||"").trim()).filter(Boolean):[]})).filter(r=>Number.isFinite(r.index)):[],semantic:typeof((g=s.motionMap)==null?void 0:g.semantic)=="object"&&((u=s.motionMap)!=null&&u.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function hi(t,e){var s,l,o;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await i.json();if(!i.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${i.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((l=n.motionMap)==null?void 0:l.semantic)=="object"&&((o=n.motionMap)!=null&&o.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function mi(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function vi(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function yi(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Wa.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${h(i.key)}">${h(vi(t,i))}</label>
            <select id="avatar-semantic-${h(i.key)}" data-avatar-semantic="${h(i.key)}">
              <option value="">${h(t.avatarMotionNone)}</option>
              ${a.map(n=>`
                <option value="${h(String(n.index))}"${mi(e.motionMap.semantic[i.key])===String(n.index)?" selected":""}>
                  ${h(`${n.label||n.id} · #${n.index}`)}
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
              <strong>${h(i.label||i.id||`${t.avatarMappingMotion} ${i.index}`)}</strong>
              <span class="meta">${h(`${t.avatarMappingMotion} #${i.index} · ${i.group||t.avatarMappingMotion.toLowerCase()}`)}</span>
              <code>${h(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${t.avatarMappingSaveHint}</div>
    </div>
  `}function ut(t,e,a){var r,v,x,C,$;const i=(e==null?void 0:e.id)||"",n=a===i,s=(e==null?void 0:e.name)||t.avatarPackDefaultTile,l=(e==null?void 0:e.id)||t.avatarPackCurrent,o=(e==null?void 0:e.previewUrl)||"",g=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(r=e.capabilities)!=null&&r.supportsMotion?t.avatarCapabilityMotion:"",(v=e.capabilities)!=null&&v.supportsEmotion?t.avatarCapabilityEmotion:"",(x=e.capabilities)!=null&&x.supportsLipSync?t.avatarCapabilityLipSync:"",(C=e.capabilities)!=null&&C.supportsViewPresets?t.avatarCapabilityViewPresets:"",($=e.capabilities)!=null&&$.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],u=g.length?g:[t.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${o?`<img src="${h(o)}" alt="${h(s)}">`:`<span>${h(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${h(s)}</strong>
        <div class="meta">${h(l)}</div>
        <div class="avatar-pack-card-meta">
          ${u.map(S=>`<span>${h(S)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${h(i)}">
          ${h(n?t.avatarPackSelected:t.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function Ze(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function bi(t,e,a,i){if(!e||a===null)return`<div class="meta">${h(t.entityBindingEmpty)}</div>`;const n=Ye(V(e,"type")||"entity").filter(s=>Ze(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===a&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${h(s)}">
            ${h(Le(t,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${h(t.entityBindingNoTargets)}</div>`}function pt(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function se(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function ft(t){return Ye(t).find(e=>Ze(e))||null}function oe(t,e,a,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${h(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${h(e)}" value="${h(a)}">
    </div>
  `}function re(t,e,a){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${h(t)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${h(e)}" value="${h(a)}">
    </div>
  `}function gt(t,e,a,i){return`
    <div class="field">
      <label for="page-select-${e}">${h(t)}</label>
      <select id="page-select-${e}" data-page-field="${h(e)}">
        ${i.map(n=>`<option value="${h(n.value)}"${n.value===a?" selected":""}>${h(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function wi(t,e,a,i){const n=V(e,"type")||"entity",s=Ye(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${h(V(e,"caption")||ce(t,n))}</strong>
          <div class="meta">${h(ce(t,n))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${h(t.cardType)}</label>
          <select data-card-index="${a}" data-card-field="type">
            ${At.map(l=>`<option value="${l}"${l===n?" selected":""}>${h(ce(t,l))}</option>`).join("")}
          </select>
        </div>
        ${s.map(l=>{const o=Ze(l),g=o&&(i==null?void 0:i.cardIndex)===a&&i.field===l;return o?`
              <div class="field ${l==="hint"?"is-wide":""} is-binding-field${g?" is-active":""}">
                <label>${h(Le(t,l))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${a}"
                    data-card-field="${h(l)}"
                    data-binding-field="${h(l)}"
                    value="${h(V(e,l))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${a}"
                    data-binding-field="${h(l)}"
                  >${t.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${l==="hint"?"is-wide":""}">
              <label>${h(Le(t,l))}</label>
              <input
                type="${l==="digits"?"number":"text"}"
                data-card-index="${a}"
                data-card-field="${h(l)}"
                value="${h(V(e,l))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Si(t,e,a,i,n){const s=V(e,"type")||"entity",l=V(e,"caption")||ce(t,s),o=V(e,"entity")||V(e,"stateEntity")||V(e,"downEntity")||V(e,"upEntity")||V(e,"value")||V(e,"hint")||Tt(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
        <strong>${h(l)}</strong>
        <span class="meta">${h(ce(t,s))}</span>
        <div class="meta">${h(o)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===i-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function xi(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${h(e)}"
    >
      <strong>${h(ce(t,e))}</strong>
      <span>${h(Tt(e))}</span>
    </button>
  `}function ki(t,e,a){t[e]=a.entityId;const i=t;String(i.caption||"").trim()||(i.caption=a.name),String(i.hint||"").trim()||(i.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&a.unit&&(i.unit=a.unit)}async function $i(t){var fe;const e=Va[de()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(a)&&document.body.insertBefore(a,i),i==null||i.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
                ${Te.map(p=>`<option value="${h(p.id)}">${h(p.label[de()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),l=n.querySelector("[data-preview-canvas]"),o=n.querySelector("[data-preview-resolution]"),g=n.querySelector("[data-preview-display]"),u=n.querySelector("[data-dashboard]");if(!s||!l||!o||!g||!u)throw new Error("Missing native editor shell elements");l.appendChild(a);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:He,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},v=async p=>{const f=String(p||"").trim();if(!f||!t.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,I();try{r.avatarPackDetails=await gi(t.avatarPackApiUrl,f),r.avatarPackDirty=!1}catch(c){r.avatarPackDetails=null,r.avatarPackDirty=!1,j(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{r.avatarPackLoading=!1}},x=()=>{var N;const p=Ka(r.previewDisplayId),f=Math.max(320,((N=s.parentElement)==null?void 0:N.clientWidth)||s.clientWidth||p.width),c=Math.max(260,Math.min(window.innerHeight*.62,760)),m=Math.min(1,f/p.width,c/p.height),E=Math.round(p.width*m),T=Math.round(p.height*m);g.value=p.id,o.textContent=Ya(p),s.style.aspectRatio=`${p.width} / ${p.height}`,s.style.width=`${E}px`,s.style.height=`${T}px`,l.style.width=`${p.width}px`,l.style.height=`${p.height}px`,l.style.transform=`scale(${m})`,a.style.width=`${p.width}px`,a.style.height=`${p.height}px`},C=p=>{r.previewDisplayId=String(p||"").trim()||He,x()},$=p=>{r.pendingAvatarZip=p,r.pendingAvatarZipName=(p==null?void 0:p.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",I(),p&&S(p)},S=async p=>{if(!(!r.config||!t.avatarImportUrl||r.avatarImporting)){r.pendingAvatarZip=null,r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",I();try{const f=await fi(t.avatarImportUrl,p);r.avatarCatalog=t.avatarCatalogUrl?await ct(t.avatarCatalogUrl):[f],lt(r.config).packId=f.id,await v(f.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(f.name||f.id),r.avatarImportTone="ok",M(),I()}catch(f){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(f)}`,r.avatarImportTone="bad",I()}}},A=typeof ResizeObserver<"u"?new ResizeObserver(()=>x()):null;A==null||A.observe(s.parentElement||s);let U=null;const W=()=>{const p=r.selectedPageId||"",f=r.selectedCardIndex;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(p){const c=a.querySelector(`[data-slide-id="${CSS.escape(p)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(p&&f!==null){const c=`[data-scene-page-id="${CSS.escape(p)}"][data-scene-card-index="${f}"]`,m=a.querySelector(c);m&&(m.dataset.editorSelectedCard="true")}},K=typeof MutationObserver<"u"?new MutationObserver(()=>W()):null;K==null||K.observe(a,{childList:!0,subtree:!0});const I=()=>{const p=r.config,f=p?Y(p):[],c=f.find(b=>b.id===r.selectedPageId)||f[0]||null,m=Array.isArray(c==null?void 0:c.cards)?c.cards:[],E=r.selectedCardIndex!==null&&m[r.selectedCardIndex]||null,T=oi(r.haEntities,r.entitySearch),N=r.focusedBinding?e.entityBindingActive(V(m[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,Le(e,r.focusedBinding.field)):e.entityBindingEmpty,P=p?Be(p):"",ee=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${h(r.avatarImportStatus)}</div>`:"",k=r.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,O=c?`${c.title||c.id||e.pageSettings} · ${Fe(e,c.kind)}`:e.statusLoading;u.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${h(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${h(t.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${r.saving||r.avatarPackSaving||!p?" disabled":""}>${r.saving||r.avatarPackSaving?e.saving:e.save}</button>
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
              <div class="meta">${k}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${ut(e,r.bundledAvatar,P)}
                ${r.avatarCatalog.map(b=>ut(e,b,P)).join("")}
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
              ${r.pendingAvatarZipName?`<div class="meta">${h(e.avatarImportSelected(r.pendingAvatarZipName))}</div>`:""}
              <div class="meta">${e.avatarImportHint}</div>
              ${ee}
            </div>
            ${P?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?yi(e,r.avatarPackDetails):"":""}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(t.packId)}</div>
              <div class="meta">${e.pageOrderHint}</div>
            </div>
            <div class="page-list">
            ${f.map((b,R)=>`
              <article class="page-chip ${b.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${h(b.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${h(b.id)}">
                  <strong>${h(b.title||b.id||(de()==="ru"?`Страница ${R+1}`:`Page ${R+1}`))}</strong>
                  <span class="meta">${h(Fe(e,b.kind))} · ${h(e.pageCards(Array.isArray(b.cards)?b.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${h(b.id)}"${R===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${h(b.id)}"${R===f.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${h(b.id)}"${f.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pageSettings}</h2>
              <div class="meta">${h(O)}</div>
            </div>
          ${c?`
            <div class="inspector-grid">
              ${oe(e.fieldPageId,"id",X(c,"id"),!0)}
              ${gt(e.fieldKind,"kind",X(c,"kind"),Ha.map(b=>({value:b,label:Fe(e,b)})))}
              ${oe(e.fieldTitle,"title",X(c,"title"),!0)}
              ${oe(e.fieldSubtitle,"subtitle",X(c,"subtitle"),!0)}
              ${oe(e.fieldSlot,"slot",X(c,"slot"))}
              ${gt(e.fieldCardStyle,"cardStyle",X(c,"cardStyle")||"full",ja.map(b=>({value:b,label:b==="mini"?e.styleMini:e.styleFull})))}
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
                  ${At.map(b=>xi(e,b)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${m.length?m.map((b,R)=>Si(e,b,R,m.length,R===r.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${E?wi(e,E,r.selectedCardIndex||0,r.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              <div class="meta">${h(N)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${bi(e,E,r.selectedCardIndex,r.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${h(r.entitySearch)}">
          </div>
          <div class="ha-list">
            ${T.length?T.map(b=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${h(b.name)}</strong>
                    <div class="meta">${h(b.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${h(b.entityId)}"${r.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${h(b.entityId)}</code>
                <div class="ha-state">${h(b.state)}${b.unit?` · ${h(b.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const B=u.querySelector("[data-avatar-archive]"),te=u.querySelector("[data-action='choose-avatar-archive']");te==null||te.addEventListener("click",()=>{if(!B||B.disabled)return;B.value="";const b=B;try{if(typeof b.showPicker=="function"){b.showPicker();return}}catch{}B.click()}),B==null||B.addEventListener("click",()=>{B.value=""}),B==null||B.addEventListener("change",()=>{var R;const b=((R=B.files)==null?void 0:R[0])||null;$(b),B.value=""});for(const b of Array.from(u.querySelectorAll(".page-chip[data-page-id]")))b.draggable=!0,b.addEventListener("dragstart",R=>{const q=String(b.dataset.pageId||"").trim();U=q?{kind:"page",pageId:q}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),b.addEventListener("dragover",R=>{!U||U.kind!=="page"||(R.preventDefault(),se(n),b.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),b.addEventListener("drop",R=>{if(!U||U.kind!=="page")return;R.preventDefault();const q=String(b.dataset.pageId||"").trim();q&&Se(U.pageId,q),U=null,se(n)}),b.addEventListener("dragend",()=>{U=null,se(n)});for(const b of Array.from(u.querySelectorAll(".card-list-item[data-card-index]")))b.draggable=!0,b.addEventListener("dragstart",R=>{const q=Number(b.dataset.cardIndex||"-1");U=Number.isFinite(q)&&q>=0?{kind:"card",cardIndex:q}:null,!(!U||!R.dataTransfer)&&(R.dataTransfer.effectAllowed="move",R.dataTransfer.setData("text/plain",JSON.stringify(U)))}),b.addEventListener("dragover",R=>{!U||U.kind!=="card"||(R.preventDefault(),se(n),b.classList.add("is-drop-target"),R.dataTransfer&&(R.dataTransfer.dropEffect="move"))}),b.addEventListener("drop",R=>{if(!U||U.kind!=="card")return;R.preventDefault();const q=Number(b.dataset.cardIndex||"-1");Number.isFinite(q)&&q>=0&&xe(U.cardIndex,q),U=null,se(n)}),b.addEventListener("dragend",()=>{U=null,se(n)});x(),W()},j=(p,f)=>{r.status=p,r.statusTone=f,I()},F=()=>{if(!r.config)return;const p=Y(r.config);if(!p.length){r.selectedPageId=null;return}(!r.selectedPageId||!p.some(m=>m.id===r.selectedPageId))&&(r.selectedPageId=p[0].id);const f=p.find(m=>m.id===r.selectedPageId)||null,c=Array.isArray(f==null?void 0:f.cards)?f.cards:[];c.length?(r.selectedCardIndex===null||r.selectedCardIndex>=c.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),ti(r.selectedPageId),ei(Ja(r.config,r.selectedPageId))},M=()=>{r.dirty=!0,j(e.statusDirty,"muted")},Z=()=>{const p=new URL(window.location.href);p.searchParams.set("editor","1"),r.selectedPageId&&p.searchParams.set("editorPage",r.selectedPageId),p.searchParams.set("v",String(Date.now())),window.location.replace(p.toString())},ye=(p,f)=>{if(!r.config||!r.selectedPageId)return;const c=r.config.pages.find(m=>m.id===r.selectedPageId);if(c){if(p==="slot")c.slot=f===""?void 0:Number(f);else if(p==="id"){const m=Ut(r.config,f||"page"),E=c.id;c.id=m,r.config.rotation.order=r.config.rotation.order.map(T=>T===E?m:T),r.selectedPageId=m}else p==="title"||p==="subtitle"||p==="stampCaption"||p==="stampValue"?c[p]=f:p==="kind"?c.kind=f:p==="cardStyle"&&(c.cardStyle=f);M(),F()}},be=(p,f)=>{if(!r.config)return;const c=Qa(r.config),m=c.safeArea||{},E=f===""?null:Number(f),T=Number.isFinite(E)?E:null;p==="safeTop"?m.top=T??0:p==="safeRight"?m.right=T??0:p==="safeBottom"?m.bottom=T??0:p==="safeLeft"?m.left=T??0:p==="layoutPaddingPx"?c.layoutPaddingPx=T??16:p==="layoutGapPx"?c.layoutGapPx=T??16:p==="globalScale"&&(c.globalScale=T??1),c.safeArea=m,M()},we=(p,f,c)=>{var T;if(!r.config||!r.selectedPageId)return;const m=r.config.pages.find(N=>N.id===r.selectedPageId);if(!m)return;Array.isArray(m.cards)||(m.cards=[]);const E=m.cards[p];if(E){if(f==="type"){const N=ot(c);if(m.cards[p]={...N,caption:V(E,"caption")||N.caption},((T=r.focusedBinding)==null?void 0:T.cardIndex)===p){const P=ft(c);r.focusedBinding=P?{cardIndex:p,field:P}:null}}else f==="digits"?E[f]=c===""?0:Number(c):E[f]=c;M()}},Se=(p,f)=>{if(!r.config||!p||!f||p===f)return;const c=Y(r.config).map(T=>T.id),m=c.indexOf(p),E=c.indexOf(f);m<0||E<0||(c.splice(m,1),c.splice(E,0,p),r.config.rotation.order=c,r.selectedPageId=p,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),I())},xe=(p,f)=>{if(!r.config||!r.selectedPageId||p===f)return;const c=r.config.pages.find(E=>E.id===r.selectedPageId);if(!c||!Array.isArray(c.cards)||p<0||f<0||p>=c.cards.length||f>=c.cards.length)return;const[m]=c.cards.splice(p,1);c.cards.splice(f,0,m),r.selectedCardIndex=f,r.focusedBinding=null,M(),I()},ke=p=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const f=r.config.pages.find(E=>E.id===r.selectedPageId),c=r.haEntities.find(E=>E.entityId===p);if(!f||!Array.isArray(f.cards)||!c)return;const m=f.cards[r.focusedBinding.cardIndex];m&&(ki(m,r.focusedBinding.field,c),M(),I())},$e=(p,f)=>{r.selectedCardIndex=p,r.focusedBinding={cardIndex:p,field:f},I(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async p=>{var ee,Re;const f=p.target,c=f==null?void 0:f.closest("[data-action]"),m=c==null?void 0:c.dataset.action;if(!m||!r.config)return;const E=Y(r.config),T=(c==null?void 0:c.dataset.pageId)||null,N=T?E.findIndex(k=>k.id===T):-1;if(m==="select-page"&&T){r.selectedPageId=T,r.selectedCardIndex=0,r.focusedBinding=null,F(),I();return}if(m==="page-up"&&N>0){const k=E.map(O=>O.id);[k[N-1],k[N]]=[k[N],k[N-1]],r.config.rotation.order=k,r.selectedPageId=T,M(),F(),I();return}if(m==="page-down"&&N>=0&&N<E.length-1){const k=E.map(O=>O.id);[k[N],k[N+1]]=[k[N+1],k[N]],r.config.rotation.order=k,r.selectedPageId=T,M(),F(),I();return}if(m==="page-remove"&&T&&E.length>1){r.config.pages=r.config.pages.filter(k=>k.id!==T),r.config.rotation.order=Y(r.config).map(k=>k.id),r.selectedPageId=((ee=Y(r.config)[Math.max(0,N-1)])==null?void 0:ee.id)||((Re=Y(r.config)[0])==null?void 0:Re.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),I();return}if(m==="add-page"){const k=Xa(r.config);r.config.pages.push(k),r.config.rotation.order=Y(r.config).map(O=>O.id),r.selectedPageId=k.id,r.selectedCardIndex=null,r.focusedBinding=null,M(),F(),I();return}if(m==="add-card-template"&&r.selectedPageId){const k=r.config.pages.find(B=>B.id===r.selectedPageId),O=(c==null?void 0:c.dataset.cardType)||"entity";if(k){Array.isArray(k.cards)||(k.cards=[]),k.cards.push(ot(O));const B=k.cards.length-1;r.selectedCardIndex=B;const te=ft(O);r.focusedBinding=te?{cardIndex:B,field:te}:null,M(),I(),te&&window.requestAnimationFrame(()=>{const b=n.querySelector("#ha-entity-search");b==null||b.scrollIntoView({behavior:"smooth",block:"center"}),b==null||b.focus()})}return}if(m==="focus-binding"){const k=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),O=(c==null?void 0:c.dataset.bindingField)||"";k>=0&&O&&$e(k,O);return}const P=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(P>=0&&r.selectedPageId){const k=r.config.pages.find(O=>O.id===r.selectedPageId);if(!k||!Array.isArray(k.cards))return;if(m==="select-card"){r.selectedCardIndex=P,I();return}if(m==="card-remove"){k.cards=k.cards.filter((O,B)=>B!==P),r.selectedCardIndex!==null&&(r.selectedCardIndex===P?r.selectedCardIndex=k.cards.length?Math.min(P,k.cards.length-1):null:r.selectedCardIndex>P&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===P?r.focusedBinding=null:r.focusedBinding.cardIndex>P&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),M(),I();return}if(m==="card-up"&&P>0){[k.cards[P-1],k.cards[P]]=[k.cards[P],k.cards[P-1]],r.selectedCardIndex===P?r.selectedCardIndex=P-1:r.selectedCardIndex===P-1&&(r.selectedCardIndex=P),r.focusedBinding&&(r.focusedBinding.cardIndex===P?r.focusedBinding={cardIndex:P-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===P-1&&(r.focusedBinding={cardIndex:P,field:r.focusedBinding.field})),M(),I();return}if(m==="card-down"&&P<k.cards.length-1){[k.cards[P],k.cards[P+1]]=[k.cards[P+1],k.cards[P]],r.selectedCardIndex===P?r.selectedCardIndex=P+1:r.selectedCardIndex===P+1&&(r.selectedCardIndex=P),r.focusedBinding&&(r.focusedBinding.cardIndex===P?r.focusedBinding={cardIndex:P+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===P+1&&(r.focusedBinding={cardIndex:P,field:r.focusedBinding.field})),M(),I();return}}if(m==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,j(e.saving,"muted");try{if(r.avatarPackDirty&&r.avatarPackDetails&&t.avatarPackApiUrl){try{r.avatarPackDetails=await hi(t.avatarPackApiUrl,r.avatarPackDetails)}catch(k){throw new Error(`${e.avatarMappingSaveError}: ${String(k)}`)}r.avatarPackDirty=!1}r.config=await ri(t.sceneApiUrl,Ke(r.config)),r.dirty=!1,r.saving=!1,r.avatarPackSaving=!1,F(),j(e.statusSaved,"ok"),window.setTimeout(()=>Z(),250)}catch(k){r.saving=!1,r.avatarPackSaving=!1,j(`${e.saveError}: ${String(k)}`,"bad")}return}if(m==="bind-entity"){const k=(c==null?void 0:c.dataset.entityId)||"";ke(k)}}),n.addEventListener("input",p=>{const f=p.target;if(!f||!r.config){f&&f.dataset.previewDisplay!==void 0&&C(f.value);return}if(f.dataset.previewDisplay!==void 0){C(f.value);return}if(f.dataset.avatarSemantic!==void 0){const c=Be(r.config);if(!r.avatarPackDetails||!c||r.avatarPackDetails.packId!==c)return;const m=f.value.trim();m?r.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic]=Number(m):delete r.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic],r.avatarPackDirty=!0,j(e.statusDirty,"muted"),I();return}if(f.dataset.pageField){ye(f.dataset.pageField,f.value),I();return}if(f.dataset.displayField){be(f.dataset.displayField,f.value),I();return}if(f.dataset.cardField&&f.dataset.cardIndex){r.selectedCardIndex=Number(f.dataset.cardIndex),we(Number(f.dataset.cardIndex),f.dataset.cardField,f.value),I();return}f.hasAttribute("data-ha-search")&&(r.entitySearch=f.value,I())}),n.addEventListener("click",p=>{var m;const f=(m=p.target)==null?void 0:m.closest("[data-action='select-avatar-pack']");if(!f||!r.config)return;const c=String(f.dataset.packId||"").trim();lt(r.config).packId=c||null,M(),v(c||null).finally(()=>I()),I()}),a.addEventListener("click",p=>{if(!r.config)return;const f=p.target,c=f==null?void 0:f.closest("[data-scene-card-index][data-scene-page-id]");if(c){const E=String(c.dataset.scenePageId||"").trim(),T=Number(c.dataset.sceneCardIndex||"-1");E&&Number.isFinite(T)&&T>=0&&(r.selectedPageId=E,r.selectedCardIndex=T,r.focusedBinding=null,F(),I(),pt("cards"));return}const m=f==null?void 0:f.closest("[data-scene-page-id]");if(m){const E=String(m.dataset.scenePageId||"").trim();E&&(r.selectedPageId=E,r.selectedCardIndex=0,r.focusedBinding=null,F(),I(),pt("pages"));return}}),n.addEventListener("change",p=>{var c;const f=p.target;!f||f.dataset.avatarArchive===void 0||$(((c=f.files)==null?void 0:c[0])||null)}),n.addEventListener("focusin",p=>{const f=p.target;if(!(f!=null&&f.dataset.bindingField))return;const c=Number(f.dataset.cardIndex||"-1");c<0||(r.selectedCardIndex=c,r.focusedBinding={cardIndex:c,field:f.dataset.bindingField})});try{if(r.config=await ii(t.sceneApiUrl),t.sceneAvatarManifestUrl)try{r.bundledAvatar=await pi(t.sceneAvatarManifestUrl,t.packId)}catch{r.bundledAvatar=null}if(t.avatarCatalogUrl)try{r.avatarCatalog=await ct(t.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=si(((fe=kt())==null?void 0:fe.states)||null),r.selectedPageId=ai(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",await v(Be(r.config)),F()}catch(p){r.status=`${e.loadError}: ${String(p)}`,r.statusTone="bad"}I()}const Ci="../scene-api/bootstrap",Pi="weather.forecast_home_assistant",Ii="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ee="/local/live2d/",ht="/scene-legacy/live2d/",Ei={...Ct,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Ai={...Pt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},Ui={...It,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Ti={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Li={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:t=>`Pack: ${t||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:t=>`Pack: ${t||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Ri(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Di(){return new URLSearchParams(window.location.search).get("bootstrap")||Ci}function Mi(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);if(a)return new URL(a[0],e.origin).toString();for(const i of["/scene-api/","/scene-runtime/","/scene-editor/"]){const n=e.pathname.indexOf(i);if(n>=0)return new URL(e.pathname.slice(0,n+1),e.origin).toString()}return null}function D(t,e){const a=Ni(String(t||"").trim(),e);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const n=Mi(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,i).toString()}function Ni(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ee))return`${ht}${a.slice(Ee.length)}`;if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const i=new URL(a,new URL(e,window.location.href));if(i.pathname.startsWith(Ee)){const n=i.pathname.slice(Ee.length);return D(`${ht}${n}${i.search}${i.hash}`,e)||a}}catch{return a}return a}function Bi(t,e){const a=Ve(t),i=a.adapter==="live2d"?D("../../scene-runtime/avatar.html",e):"",n=D(String(a.assetRoot||"").trim(),e),s=g=>{const u=String(g||"").trim();return u?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(u)||u.startsWith("/")?D(u,e):u:""},l=g=>{const u=String(g||"").trim();return u?D(u,e):""},o=Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([g,u])=>[g,D(String(u||""),e)]).filter(([,g])=>!!g));return{...a,assetRoot:n,runtimeUrl:i||D(String(a.runtimeUrl||"").trim(),e),entry:s(String(a.entry||"").trim()),modelUrl:s(String(a.modelUrl||"").trim()),fallbackPortrait:s(String(a.fallbackPortrait||"").trim()),motionMapUrl:l(String(a.motionMapUrl||"").trim()),presetThumbs:o}}function ze(t,e,a,i){t.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${a}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function Rt(){return new URLSearchParams(window.location.search).get("editor")==="1"}function Fi(){if(!Rt())return;const t=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),t(),window.addEventListener("pageshow",t,{once:!0}),window.addEventListener("load",t,{once:!0}),window.requestAnimationFrame(()=>{t(),window.setTimeout(t,120)});let e=!1;const a=()=>{e=!0},i=["pointerdown","wheel","touchstart","keydown"];for(const l of i)window.addEventListener(l,a,{once:!0,passive:!0});let n=0;const s=window.setInterval(()=>{if(e||n>=24){window.clearInterval(s);return}t(),n+=1},80)}async function _i(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return a}async function he(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return e.json()}function Oi(t,e){var a,i,n,s,l,o,g,u,r,v,x,C;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([$,S])=>[$,D(S,e)]).filter(([,$])=>!!$)),avatar:{manifestUrl:D(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:D(String(((i=t.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((n=t.state)==null?void 0:n.provider)||"json",stateUrl:D(String(((s=t.state)==null?void 0:s.stateUrl)||"").trim(),e),apiUrl:D(String(((l=t.state)==null?void 0:l.apiUrl)||"").trim(),e)||void 0,haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:D(String(((g=t.state)==null?void 0:g.idleLinesUrl)||"").trim(),e),entityMapUrl:D(String(((u=t.state)==null?void 0:u.entityMapUrl)||"").trim(),e)},control:{provider:((r=t.control)==null?void 0:r.provider)||"json",controlUrl:D(String(((v=t.control)==null?void 0:v.controlUrl)||"").trim(),e),apiUrl:D(String(((x=t.control)==null?void 0:x.apiUrl)||"").trim(),e)||void 0,entityMapUrl:D(String(((C=t.control)==null?void 0:C.entityMapUrl)||"").trim(),e)||void 0}}}async function Hi(t,e){var $,S,A,U,W,K,I,j;const a=D(String((($=t.files)==null?void 0:$.rendererConfigUrl)||"").trim(),e);if(!a)return"";const i=D(String(((S=t.files)==null?void 0:S.sceneConfigUrl)||"").trim(),e),n=D(String(((A=t.files)==null?void 0:A.avatarCatalogUrl)||"").trim(),e);let s="";if(i&&n)try{const F=await he(i);s=String(((U=F.avatar)==null?void 0:U.packId)||"").trim()}catch{s=""}let l="";if(s&&n)try{const F=await he(n),M=Array.isArray(F.items)?F.items.find(Z=>String(Z.id||"").trim()===s):null;l=D(String((M==null?void 0:M.manifestUrl)||"").trim(),e)}catch{l=""}const o=Oi(await he(a),a);i&&(o.scene={...o.scene||{},configUrl:i});const g=D(String(((W=t.files)==null?void 0:W.haStatesUrl)||"").trim(),e);g&&(o.state={...o.state||{},apiUrl:((K=o.state)==null?void 0:K.apiUrl)||g},o.control={...o.control||{},apiUrl:((I=o.control)==null?void 0:I.apiUrl)||g});const u=l||String(((j=o.avatar)==null?void 0:j.manifestUrl)||"").trim();if(!u)return URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));const r=D(u,e),v=Bi(await he(r),r),x=URL.createObjectURL(new Blob([JSON.stringify(v)],{type:"application/json"})),C={...o,avatar:{manifestUrl:x}};return URL.createObjectURL(new Blob([JSON.stringify(C)],{type:"application/json"}))}const me=document.getElementById("app");if(!me)throw new Error("Missing #app root element");const le=Li[Ri()];Fi();ze(me,le.startingTitle,le.startingBody);(async()=>{var e,a,i,n,s;const t=Di();try{const l=await _i(t),o=String(l.packId||"").trim(),g=o.toLowerCase()==="neiri",u=await Hi(l,t),r=u?await he(u):null;if(!u){ze(me,le.missingRendererTitle,le.missingRendererBody,JSON.stringify(l,null,2));return}document.documentElement.dataset.packId=o,document.title=g?"Нейри":o?`kiosk-scene hosted runtime (${o})`:"kiosk-scene hosted runtime",await Oa(me,{rendererConfigUrl:u,weatherUrl:g?"./weather.json":void 0,weatherReader:g?Fa({weatherEntity:Pi,openMeteoUrl:Ii,locale:"ru-RU",iconBaseUrl:"./assets",apiUrl:String(((e=r==null?void 0:r.state)==null?void 0:e.apiUrl)||"").trim()||void 0,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:g?Ei:void 0,labels:g?Ai:void 0,presetLabels:g?Ui:void 0,defaultWeather:g?Ti:void 0}),Rt()&&await $i({packId:o,sceneApiUrl:D(String(l.sceneEditorApiUrl||"").trim(),t),sceneAvatarManifestUrl:D(String(((a=l.files)==null?void 0:a.avatarManifestUrl)||"").trim(),t),avatarCatalogUrl:D(String(((i=l.files)==null?void 0:i.avatarCatalogUrl)||"").trim(),t),avatarImportUrl:D(String(((n=l.files)==null?void 0:n.avatarImportUrl)||"").trim(),t),avatarPackApiUrl:D(String(((s=l.files)==null?void 0:s.avatarPackApiUrl)||"").trim(),t),sceneUrl:D(String(l.entryUrl||l.runtimeBaseUrl||"./").trim(),t)})}catch(l){ze(me,le.failedTitle,le.failedBody,String(l))}})();
