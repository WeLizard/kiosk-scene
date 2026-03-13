var Ft=Object.defineProperty;var _t=(t,e,a)=>e in t?Ft(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var x=(t,e,a)=>_t(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function R(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function d(t,e=160){const a=String(t??"").replace(/\s+/g," ").trim();return a?a.length<=e?a:`${a.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function rt(t){const e=new Date(String(t??""));return Number.isNaN(e.getTime())?0:e.getTime()}function be(t,e){if(!R(t)||!R(e))return e??t;const a={...t};for(const[r,n]of Object.entries(e)){if(Array.isArray(n)){a[r]=n.slice();continue}if(R(n)&&R(a[r])){a[r]=be(a[r],n);continue}a[r]=n}return a}function wt(t,e=40){return Array.isArray(t)?t.map(a=>d(a,e).toLowerCase()).filter(Boolean):[]}const re={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},it={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function ze(t){var a,r,n,s,l,o,u,g,i,S,C,$,k,b;const e=be(re,R(t)?t:{});return{version:1,assistant:{name:d((a=e.assistant)==null?void 0:a.name,40)||re.assistant.name,locale:d((r=e.assistant)==null?void 0:r.locale,16)||void 0},links:R(e.links)?Object.fromEntries(Object.entries(e.links).map(([I,E])=>[d(I,64),d(E,1024)]).filter(([I,E])=>I&&E)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||re.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||re.scene.configUrl},state:{provider:((l=e.state)==null?void 0:l.provider)==="ha"?"ha":"json",stateUrl:d((o=e.state)==null?void 0:o.stateUrl,1024)||re.state.stateUrl,apiUrl:d((u=e.state)==null?void 0:u.apiUrl,1024)||void 0,haApiFallback:((g=e.state)==null?void 0:g.haApiFallback)===!0,idleLinesUrl:d((i=e.state)==null?void 0:i.idleLinesUrl,1024)||re.state.idleLinesUrl,entityMapUrl:d((S=e.state)==null?void 0:S.entityMapUrl,1024)||void 0},control:{provider:((C=e.control)==null?void 0:C.provider)==="ha"?"ha":"json",controlUrl:d(($=e.control)==null?void 0:$.controlUrl,1024)||re.control.controlUrl,apiUrl:d((k=e.control)==null?void 0:k.apiUrl,1024)||void 0,entityMapUrl:d((b=e.control)==null?void 0:b.entityMapUrl,1024)||void 0}}}function Je(t){var a,r,n,s,l;const e=be(it,R(t)?t:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||it.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:R(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,u])=>[d(o,32),d(u,1024)]).filter(([o,u])=>o&&u)):{},viewPresets:R(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,u])=>d(o,32)&&R(u))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((r=e.capabilities)==null?void 0:r.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((l=e.capabilities)==null?void 0:l.supportsPointerFocus)===!0}}}const ae={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},Ot=["full","torso","head"];function pe(t,e=Date.now()){var o,u,g,i,S,C,$;const a=be(ae,R(t)?t:{}),r={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((o=a.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:d((u=a.page)==null?void 0:u.target,40)||null,until:d((g=a.page)==null?void 0:g.until,64)||null},cue:{cue:d((i=a.cue)==null?void 0:i.cue,32)||null,emotion:d((S=a.cue)==null?void 0:S.emotion,32)||null,motion:d((C=a.cue)==null?void 0:C.motion,32)||null,until:d(($=a.cue)==null?void 0:$.until,64)||null}},n=d(a.viewPreset,16).toLowerCase();r.viewPreset=Ot.includes(n)?n:null;const s=rt(r.page.until);r.page.mode==="pinned"&&(r.page.target?r.page.until&&(!s||s<=e)&&(r.page={mode:"auto",target:null,until:null}):r.page={mode:"auto",target:null,until:null});const l=rt(r.cue.until);return r.cue.until&&(!l||l<=e)&&(r.cue={cue:null,emotion:null,motion:null,until:null}),r}function Be(t,e,a=Date.now()){return pe(be(pe(t,a),R(e)?e:{}),a)}function Ht(t,e,a=Date.now()){return pe({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function jt(t,e,a=3e4,r=Date.now()){const n=d(e,40),s=new Date(r+Math.max(5e3,Number(a)||0)).toISOString();return pe({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},r)}function St(t,e){var l,o,u;const a={...t||{}},r=d((l=e==null?void 0:e.cue)==null?void 0:l.cue,32),n=d((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),s=d((u=e==null?void 0:e.cue)==null?void 0:u.motion,32);return r&&(a.cue=r),n&&(a.emotion=n),s&&(a.motion=s),a}function z(t,e){const a=Number(t);return Number.isFinite(a)?Math.max(0,a):e}function Ve(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function Ye(t){return R(t)&&R(t.config)?t.config:t}function xt(t,e){const a=e.map(n=>t.find(s=>s.id===n)).filter(Boolean),r=t.filter(n=>!a.some(s=>s.id===n.id));return a.concat(r)}function zt(t,e){const a={...t};return R(e)&&(typeof e.id=="string"&&(a.id=d(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="grid"?"grid":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Number.isFinite(Number(e.gridColumns))&&(a.gridColumns=Math.max(1,Math.min(12,Math.round(Number(e.gridColumns))))),Number.isFinite(Number(e.gridRows))&&(a.gridRows=Math.max(1,Math.min(12,Math.round(Number(e.gridRows))))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(r=>R(r)))),a}function Vt(t,e){const a=Ye(t),r=Array.isArray(e.pages)?e.pages.slice():[],n=R(a)&&Array.isArray(a.pages)?a.pages:[],s=r.map($=>{const k=n.find(b=>d(R(b)?b.id:"",40)===$.id);return zt($,k)}),l=R(a)&&R(a.rotation)?a.rotation:{},o=R(e.display)?e.display:{},u=R(a)&&R(a.display)?a.display:{},g=R(o.safeArea)?o.safeArea:{},i=R(u.safeArea)?u.safeArea:{},S=Array.isArray(l.order)?l.order:e.rotation.order,C=wt(S).filter(($,k,b)=>s.some(I=>I.id===$)&&b.indexOf($)===k);return{version:1,rotation:{order:C.length?C:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(l.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:z(i.top,z(g.top,0)),right:z(i.right,z(g.right,0)),bottom:z(i.bottom,z(g.bottom,0)),left:z(i.left,z(g.left,0))},layoutPaddingPx:z(u.layoutPaddingPx,z(o.layoutPaddingPx,16)),layoutGapPx:z(u.layoutGapPx,z(o.layoutGapPx,16)),globalScale:Ve(u.globalScale,Ve(o.globalScale,1))},pages:s}}function Wt(t,e){var s;const a=Vt(t,e),r=Ye(t),n=R(r)&&R(r.avatar)?{packId:typeof r.avatar.packId=="string"&&d(r.avatar.packId,120)||null}:{packId:typeof((s=e.avatar)==null?void 0:s.packId)=="string"&&d(e.avatar.packId,120)||null};return{version:1,kind:"scene.display",rotation:{order:a.rotation.order.slice(),defaultDwellMs:a.rotation.defaultDwellMs},display:{safeAreaPx:{...a.display.safeAreaPx},layoutPaddingPx:a.display.layoutPaddingPx,layoutGapPx:a.display.layoutGapPx,globalScale:a.display.globalScale},avatar:n,pages:xt(a.pages,a.rotation.order)}}function Gt(t){return R(t)&&t.kind==="scene.display"&&Number(t.version)===1&&R(t.rotation)&&Array.isArray(t.pages)&&R(t.display)&&R(t.display.safeAreaPx)}function qt(t){var o,u;const e=Array.isArray(t.pages)?t.pages.filter(g=>R(g)):[],a=Array.isArray((o=t.rotation)==null?void 0:o.order)?t.rotation.order:e.map(g=>g.id),r=wt(a).filter((g,i,S)=>e.some(C=>C.id===g)&&S.indexOf(g)===i),n=t.display,s=t.display.safeAreaPx,l=R(t.avatar)?{packId:typeof t.avatar.packId=="string"&&d(t.avatar.packId,120)||null}:{packId:null};return{version:1,kind:"scene.display",rotation:{order:r.length?r:e.map(g=>g.id),defaultDwellMs:Math.max(5e3,Number((u=t.rotation)==null?void 0:u.defaultDwellMs)||18e3)},display:{safeAreaPx:{top:z(s.top,0),right:z(s.right,0),bottom:z(s.bottom,0),left:z(s.left,0)},layoutPaddingPx:z(n.layoutPaddingPx,16),layoutGapPx:z(n.layoutGapPx,16),globalScale:Ve(n.globalScale,1)},avatar:l,pages:xt(e,r)}}function Kt(t,e){if(Gt(t))return qt(t);const a=Ye(t);if(!R(a))throw new Error("Scene runtime config must be a JSON object.");return Wt(a,a)}function Jt(t,e=220){const a=d(t,Math.max(e+20,e)),r={emotion:"",activity:"",cue:"",motion:""},n=a.replace(/\[(emotion|activity|cue|motion|page|preset|view|size)\s*:\s*([a-z0-9_-]+)\]/gi,(s,l,o)=>{const u=d(l,16).toLowerCase(),g=d(o,32).toLowerCase();return(u==="emotion"||u==="activity"||u==="cue"||u==="motion")&&g&&(r[u]=g)," "});return{text:d(n,e),emotion:r.emotion,activity:r.activity,cue:r.cue,motion:r.motion}}const $t={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function fe(t,e={}){const a=R(t)?t:{},r={...$t,...e};return{version:1,assistant:d(a.assistant??r.assistant,40),online:typeof a.online=="boolean"?a.online:r.online,busy:typeof a.busy=="boolean"?a.busy:r.busy,status:d(a.status??r.status,255),message:d(a.message??r.message,255),source:d(a.source??r.source,64),updatedAt:d(a.updatedAt??r.updatedAt,64),emotion:d(a.emotion??r.emotion,32)||null,activity:d(a.activity??r.activity,32)||null,cue:d(a.cue??r.cue,32)||null,intensity:Yt(a.intensity??r.intensity),speaking:typeof a.speaking=="boolean"?a.speaking:!!r.speaking,motion:d(a.motion??r.motion,32)||null,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):r.revision,event:d(a.event??r.event,64)}}function Yt(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Zt(t,e){return t.order[e]||t.order[0]||""}function Xt(t,e){const a=t.order.findIndex(r=>r===e);return a>=0?a:0}function Qt(t,e,a,r){const n=Array.isArray(t.order)?t.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let l=1;l<=n.length;l+=1){const o=(s+l*a+n.length)%n.length;if(r(n[o]))return o}return s}function ea(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],r=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=t.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:Xt(t.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(t.force){const l=Zt(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(l)?t.activeIndex:Math.max(0,a.findIndex(u=>t.isEligible(u))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<r)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let s=t.activeIndex;for(let l=1;l<=a.length;l+=1){const o=(t.activeIndex+l)%a.length;if(t.isEligible(a[o])){s=o;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const kt={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},ta=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function nt(t){const e=d(t,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:ta.some(a=>e.includes(a)):!1}function aa(t,e){const a=fe(t),r=d(a.status,72),n=d(a.message,220);if(!(a.online!==!1&&(nt(r)||nt(n))))return{state:a,hasTechnicalFailure:!1};const o=d(a.emotion,32).toLowerCase(),u=d(a.motion,32).toLowerCase();return{state:{...a,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:o==="error"?"calm":o||null,activity:d(a.activity,32).toLowerCase()==="error"?"idle":d(a.activity,32)||null,cue:d(a.cue,32)||null,intensity:a.intensity??null,speaking:!1,motion:u==="error"?"idle_soft":u||null},hasTechnicalFailure:!0}}function ra(t,e){const a=(e==null?void 0:e.copy)??kt,r=fe(t),n=Jt(r.message,220),s=aa({...r,message:n.text,emotion:d(r.emotion,32)||n.emotion||null,activity:d(r.activity,32)||n.activity||null,cue:d(r.cue,32)||n.cue||null,motion:d(r.motion,32)||n.motion||null},{healthyStatus:a.technicalHealthyLabel}),l=s.state,o=d(l.message,180),u=d(l.activity,32).toLowerCase(),g=l.online!==!1&&u!=="offline",i=!!l.busy||u==="thinking"||u==="busy"||u==="acting",S=l.speaking===!0||u==="speaking",C=g?i?a.busyLabel:o||S?a.speakingLabel:s.hasTechnicalFailure?a.technicalHealthyLabel:a.idleLabel:a.offlineLabel,$=o?a.messageCaption:s.hasTechnicalFailure?a.statusCaption:a.modeCaption,k=o||(g?i?a.busyBody:d(e==null?void 0:e.idleMonologue,220)||a.idleBody:a.offlineBody);return{state:l,hasTechnicalFailure:s.hasTechnicalFailure,caption:$,label:C,body:k,bodyKey:[$,C,k].join(":")}}function ia(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function st(t,e=-1){const a=Array.isArray(t)?t.map(n=>d(n,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let r=Math.floor(Math.random()*a.length);return a.length>1&&r===e&&(r=(r+1)%a.length),{line:a[r],index:r}}function na(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),r=!!d(t==null?void 0:t.message,180);return e&&!a&&!r}const sa={cue:null,emotion:null,motion:null,until:null},oa={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function la(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Ct(t){return t.endsWith("/")?t:`${t}/`}function Pt(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function Pe(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;if(a.startsWith("/")){const n=Pt(t||window.location.href);if(n)return new URL(a.slice(1),n).toString();const s=new URL(window.location.href).origin;return new URL(a,s).toString()}const r=new URL(Ct(d(t,1024)||"."),window.location.href);return new URL(a,r).toString()}function Le(t){const e=d(t,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const a=Pt(window.location.href);return a?new URL(e.slice(1),a).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function da(t,e,a){const r=d(t.runtimeUrl,1024)||d(e.runtimeUrl,1024);return r?Le(r):new URL("../avatar.html",new URL(Ct(d(a,1024)||"."),window.location.href)).toString()}function ca(t,e){const a=d(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function ua(t,e){const a=new URL(t,window.location.href),r={...e.query||{}};e.displayMode!==!1&&r.display==null&&(r.display=!0);for(const[n,s]of Object.entries(r)){const l=d(n,64);if(!l||s==null)continue;const o=typeof s=="boolean"?s?"1":"0":String(s);a.searchParams.set(l,o)}return a.toString()}function ot(t,e,a){const r=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),Pe(a,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([n,s])=>[d(n,64),Le(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Le(t.state.stateUrl),idleLinesUrl:Le(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:Pe(a,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:Pe(a,e.fallbackPortrait||""),motionMapUrl:Pe(a,e.motionMapUrl||""),presetThumbs:r}}}class pa{constructor(e={}){x(this,"id","live2d");x(this,"options");x(this,"manifest");x(this,"rendererConfig");x(this,"host",null);x(this,"containerEl",null);x(this,"iframeEl",null);x(this,"splashEl",null);x(this,"splashTextEl",null);x(this,"assetRoot","");x(this,"rendererConfigBlobUrl","");x(this,"currentState");x(this,"currentCue",{...sa});x(this,"currentPreset","full");x(this,"currentBubble",{...oa});x(this,"targetOrigin","*");x(this,"isReady",!1);x(this,"bubbleRevision",0);x(this,"handleWindowMessage",e=>{var n;const a=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!a||e.source!==a||!la(e.data))return;const r=d(e.data.type,64);if(r==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}r==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Je({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=ze(e.rendererConfig||{}),this.currentState=fe({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const a=da(this.options,this.manifest,this.assetRoot),r={...this.options.query||{}};try{if(new URL(a,window.location.href).origin===window.location.origin){const g=ot(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(g)],{type:"application/json"})),r.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const n=ua(a,{...this.options,query:r});this.targetOrigin=ca(n,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const l=document.createElement("iframe");l.className="ks-live2d-iframe",l.src=n,l.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,l.loading="eager",l.allow="autoplay",Object.assign(l.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&l.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);s.append(l,o),this.host.append(s),l.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=l,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=fe(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const r=d(e,255);this.currentBubble={text:r,key:r?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const r=document.createElement("div");Object.assign(r.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),r.append(n,s),a.append(r),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:ot(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=St(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var r;const a=(r=this.iframeEl)==null?void 0:r.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function fa(t={}){return new pa(t)}const ga={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},lt={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class ma{constructor(e={}){x(this,"id","static");x(this,"options");x(this,"host",null);x(this,"frameEl",null);x(this,"imageEl",null);x(this,"bubbleEl",null);x(this,"fallbackEl",null);x(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const r=document.createElement("img");r.className="ks-static-avatar-image",Object.assign(r.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),r.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(r,n,s),this.host.append(a),this.frameEl=a,this.imageEl=r,this.bubbleEl=s,this.fallbackEl=n;const l=this.resolveImageUrl(e.assetRoot);l&&(r.src=l,r.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),r.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||lt,r=a[e]||a.full||lt.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(r.x)||0}px, ${Number(r.y)||0}px) scale(${Number(r.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const r=String(e||"").trim();if(!r){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=r,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return ga}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const r=e.replace(/\/+$/,""),n=a.replace(/^\.?\//,"");return r?`${r}/${n}`:n}}function ha(t={}){return new ma(t)}function va(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function It(){var t;for(const e of va())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),r=a==null?void 0:a.hass;if(r!=null&&r.states)return r}catch{continue}return null}function ba(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function ya(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const r=d(a.entity_id,255);r&&(e[r]=a)}return e}function wa(t,e,a="Assistant"){const r=t[e.status],n=t[e.message],s=t[e.online],l=t[e.busy],o=t[e.source],u=t[e.updatedAt],g=e.emotion?t[e.emotion]:null,i=e.activity?t[e.activity]:null,S=e.cue?t[e.cue]:null,C=e.speaking?t[e.speaking]:null,$=e.intensity?t[e.intensity]:null,k=e.motion?t[e.motion]:null,b=t[e.revision];if(!r&&!n&&!s&&!l)return null;const I=d(r==null?void 0:r.state,72),E=d(n==null?void 0:n.state,220),O=d(u==null?void 0:u.state,64),H=Fe(s,!0),U=Fe(l,!1),V=d(i==null?void 0:i.state,32)||"",N=Fe(C)??V==="speaking",Q=V||(H?N?"speaking":U?"thinking":"idle":"offline");return fe({version:1,assistant:d(a,40)||"Assistant",online:H,busy:U,status:I&&I!=="unknown"&&I!=="unavailable"?I:"",message:E&&E!=="unknown"&&E!=="unavailable"?E:"",source:d(o==null?void 0:o.state,64)||"ha",updatedAt:O&&O!=="unknown"&&O!=="unavailable"?O:(r==null?void 0:r.last_changed)||new Date().toISOString(),emotion:d(g==null?void 0:g.state,32)||null,activity:Q,cue:d(S==null?void 0:S.state,32)||null,intensity:ka($),speaking:N,motion:d(k==null?void 0:k.state,32)||null,revision:Number(b==null?void 0:b.state)||0})}const Sa=["full","torso","head"];function xa(t){const e=d(t==null?void 0:t.state,16).toLowerCase();return Sa.includes(e)?e:null}function $a(t,e){const a=e.viewPreset?t[e.viewPreset]:null,r=e.pageMode?t[e.pageMode]:null,n=e.pageTarget?t[e.pageTarget]:null,s=e.pageUntil?t[e.pageUntil]:null,l=e.cue?t[e.cue]:null,o=e.emotion?t[e.emotion]:null,u=e.motion?t[e.motion]:null,g=e.cueUntil?t[e.cueUntil]:null,i=e.revision?t[e.revision]:null;if(!a&&!r&&!n&&!l&&!o&&!u)return null;const S=d(n==null?void 0:n.state,40)||null,C=d(s==null?void 0:s.state,64)||null,$=d(r==null?void 0:r.state,16).toLowerCase(),k=$==="auto"?"auto":$==="pinned"||S||C?"pinned":"auto";return pe({...ae,revision:Number(i==null?void 0:i.state)||0,viewPreset:xa(a),page:{mode:k,target:k==="pinned"?S:null,until:k==="pinned"?C:null},cue:{cue:d(l==null?void 0:l.state,32)||null,emotion:d(o==null?void 0:o.state,32)||null,motion:d(u==null?void 0:u.state,32)||null,until:d(g==null?void 0:g.state,64)||null}})}function Fe(t,e){const a=d(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function ka(t){const e=d(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function Et(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),r=Math.max(6e4,t.authCooldownMs??600*1e3),n=d(t.apiUrl,4096);let s=null,l=0,o=null,u=0;async function g(){var k;const i=It();if(i!=null&&i.states)return i.states;const S=Date.now();if(s&&S-l<a||!n&&!t.allowApiFallback||typeof e!="function"||S<u)return s;if(o)return o;const C=n?"":d(((k=t.readToken)==null?void 0:k.call(t))??ba(),4096);if(!n&&!C)return s;const $={};return C&&($.Authorization=`Bearer ${C}`),o=e(n||"/api/states",{cache:"no-store",headers:$}).then(async b=>{if(!b.ok){const I=new Error(`HA states HTTP ${b.status}`);throw I.status=b.status,I}return b.json()}).then(b=>{const I=ya(b);return I&&(s=I,l=Date.now()),I||s}).catch(b=>(((b==null?void 0:b.status)===401||(b==null?void 0:b.status)===403)&&(u=Date.now()+r),s)).finally(()=>{o=null}),o}return{id:"ha-states",async read(){return g()}}}async function Ze(t){const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=d(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const r=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");r.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await e(r.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return t.sanitize?t.sanitize(s):s}catch(n){if(t.defaultValue!==void 0)return t.defaultValue;throw n}}function Ca(t){return{id:"json-state",async read(){const e=await Ze({...t,defaultValue:t.defaultValue});return fe(e)}}}function Pa(t){return{id:"json-control",async read(){const e=await Ze({...t,defaultValue:t.defaultValue??ae});return pe(e)}}}function Ia(t){return{id:"json-lines",async read(){const e=await Ze({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>d(a,220)).filter(Boolean):[]}}}function q(t,e,a=64){return d(t[e],a)}function me(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Ea(t,e="en-US"){const a=d(t,64);if(!a)return"";const r=new Date(a);return Number.isNaN(r.getTime())?a:r.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ie(t,e){return!t||!e?null:t[e]||null}function Aa(t,e=null,a="en-US"){var S,C,$,k;const r=q(t,"caption",40)||q(t,"type",24)||"Card",n=q(t,"hint",72),s=q(t,"type",32).toLowerCase()||"entity",l=q(t,"entity",255),o=Ie(e,l),u=Ie(e,q(t,"stateEntity",255)),g=Ie(e,q(t,"downEntity",255)),i=Ie(e,q(t,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:r,value:q(t,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const b=Number(o==null?void 0:o.state);return!Number.isFinite(b)||b<=0?{caption:r,value:"Clear",hint:n||"nothing pending"}:{caption:r,value:`${b} item${b===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const b=(o==null?void 0:o.state)==="on";return{caption:r,value:b?q(t,"onText",48)||"On":q(t,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const b=me(o==null?void 0:o.state,0);return{caption:r,value:b?`${b}%`:"—",hint:d(u==null?void 0:u.state,48)||n||"battery level"}}if(s==="network"){const b=me(g==null?void 0:g.state,0),I=me(i==null?void 0:i.state,0);return{caption:r,value:b||I?`↓ ${b||"0"} · ↑ ${I||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:r,value:Ea(o==null?void 0:o.state,a)||"—",hint:n||"next event"};if(s==="percent"){const b=me(o==null?void 0:o.state,Number(q(t,"digits",4))||0);return{caption:r,value:b?`${b}%`:"—",hint:n||d((S=o==null?void 0:o.attributes)==null?void 0:S.friendly_name,48)||"state percentage"}}if(s==="number"){const b=Number(q(t,"digits",4))||0,I=me(o==null?void 0:o.state,b),E=q(t,"unit",16)||d((C=o==null?void 0:o.attributes)==null?void 0:C.unit_of_measurement,16);return{caption:r,value:I?`${I}${E?` ${E}`:""}`:"—",hint:n||d(($=o==null?void 0:o.attributes)==null?void 0:$.friendly_name,48)||"numeric value"}}return{caption:r,value:d(o==null?void 0:o.state,64)||q(t,"value",64)||"—",hint:n||d((k=o==null?void 0:o.attributes)==null?void 0:k.friendly_name,48)||"entity state"}}function dt(t,e=null,a="en-US"){return Array.isArray(t)?t.map(r=>Aa(r,e,a)):[]}const At={...kt,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Ut={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},Tt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Ua={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Re={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function h(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Xe(t){return t.endsWith("/")?t:`${t}/`}function Ta(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function W(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(t,window.location.href);if(a.startsWith("/")){const n=Ta(r.toString());return n?new URL(a.slice(1),n).toString():new URL(a,r.origin).toString()}return new URL(a,r).toString()}function Lt(t){try{return new URL(".",t).toString()}catch{return new URL(".",window.location.href).toString()}}function La(t,e){const a=Lt(e),r=W(a,d(t.assetRoot,1024)||"./assets"),n=r?Xe(r):a,s=l=>{const o=d(l,1024);return o?W(n,o):""};return{...t,assetRoot:r,runtimeUrl:W(a,t.runtimeUrl||""),entry:s(t.entry||""),modelUrl:s(t.modelUrl||""),fallbackPortrait:s(t.fallbackPortrait||""),motionMapUrl:s(t.motionMapUrl||""),expressionMapUrl:s(t.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([l,o])=>[l,W(a,o)]).filter(([,l])=>!!l))}}function _e(t){return{...Re,...t||{},metrics:{...Re.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)&&t.forecast.length?t.forecast.map(e=>({...e})):Re.forecast.map(e=>({...e}))}}function ct(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function J(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const r=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:r})}function Ra(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const r=d(e,24).toLowerCase();return r==="mmhg"||r==="мм рт. ст."?`${J(a)} мм рт. ст.`:`${J(a*.750061683,0)} мм рт. ст.`}function Ma(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const r=d(e,24).toLowerCase();return r==="m/s"||r==="м/с"?`${J(a,1)} м/с`:r==="km/h"||r==="км/ч"?`${J(a/3.6,1)} м/с`:`${J(a,1)} м/с`}function Da(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Na(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function Ba(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function Fa(t,e="ru-RU"){const a=d(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||d(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function ut(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function _a(t,e="./assets/icons"){const a=Number(t),r=Xe(e);return a===0?`${r}sun.svg`:[1,2].includes(a)?`${r}cloud-sun.svg`:[3].includes(a)?`${r}cloud.svg`:[45,48].includes(a)?`${r}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${r}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${r}cloud-snow.svg`:[95,96,99].includes(a)?`${r}cloud-lightning.svg`:`${r}cloud.svg`}function Oa(t){const e=d(t.locale,32)||"ru-RU",a=d(t.iconBaseUrl,1024)||"./assets/icons",r=Et({allowApiFallback:t.allowApiFallback,apiUrl:t.apiUrl,fetchImpl:t.fetchImpl});return async()=>{var k,b,I,E,O,H,U,V,_,N,Q,ye,we,Se,xe,$e,ke,Ce,ge,p;const n=await r.read(),s=t.fetchImpl??globalThis.fetch,l=n==null?void 0:n[t.weatherEntity];let o=null;const u=d(t.openMeteoUrl,4096);if(u&&typeof s=="function")try{const f=await s(`${u}${u.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});f.ok&&(o=await f.json())}catch{o=null}if(!l&&!(o!=null&&o.current))return null;const g=d(l==null?void 0:l.last_changed,64)||d((k=o==null?void 0:o.current)==null?void 0:k.time,64)||new Date().toISOString(),i=l?Fa(l.state,e):ut((b=o==null?void 0:o.current)==null?void 0:b.weather_code,e),S=Array.isArray((I=o==null?void 0:o.daily)==null?void 0:I.time)?o.daily.time.map((f,c)=>{var A,T,L,P,Z;const v=new Date(`${f}T12:00:00+03:00`);return{name:v.toLocaleDateString(e,{weekday:"short"}),dayNumber:v.toLocaleDateString(e,{day:"numeric"}),monthShort:v.toLocaleDateString(e,{month:"short"}),note:d(ut((A=o.daily.weather_code)==null?void 0:A[c],e),28),max:`${J((T=o.daily.temperature_2m_max)==null?void 0:T[c])}°`,min:`${J((L=o.daily.temperature_2m_min)==null?void 0:L[c])}° · ${J((P=o.daily.precipitation_probability_max)==null?void 0:P[c])}%`,icon:_a((Z=o.daily.weather_code)==null?void 0:Z[c],a)}}):[],C=S[0]||null,$=S.slice(1,6);return{todayValue:Na(g,e),todayLabel:Ba(g,e),updatedAt:Da(g,e),temperature:J(((E=l==null?void 0:l.attributes)==null?void 0:E.temperature)??((O=o==null?void 0:o.current)==null?void 0:O.temperature_2m),1),condition:i,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${J(((H=l==null?void 0:l.attributes)==null?void 0:H.apparent_temperature)??((U=o==null?void 0:o.current)==null?void 0:U.apparent_temperature)??((V=l==null?void 0:l.attributes)==null?void 0:V.temperature),1)}°C`,badgeSummary:i,badgeRange:C?`${C.max} / ${J((N=(_=o==null?void 0:o.daily)==null?void 0:_.temperature_2m_min)==null?void 0:N[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${J(((Q=l==null?void 0:l.attributes)==null?void 0:Q.humidity)??((ye=o==null?void 0:o.current)==null?void 0:ye.relative_humidity_2m))}%`,pressure:Ra(((we=l==null?void 0:l.attributes)==null?void 0:we.pressure)??((Se=o==null?void 0:o.current)==null?void 0:Se.surface_pressure),((xe=l==null?void 0:l.attributes)==null?void 0:xe.pressure_unit)??"hPa"),wind:Ma((($e=l==null?void 0:l.attributes)==null?void 0:$e.wind_speed)??((ke=o==null?void 0:o.current)==null?void 0:ke.wind_speed_10m),((Ce=l==null?void 0:l.attributes)==null?void 0:Ce.wind_speed_unit)??"km/h"),clouds:`${J(((ge=l==null?void 0:l.attributes)==null?void 0:ge.cloud_coverage)??((p=o==null?void 0:o.current)==null?void 0:p.cloud_cover))}%`},forecast:$}}}class Ha{constructor(e,a={}){x(this,"root");x(this,"options");x(this,"avatarMountEl");x(this,"carouselShellEl");x(this,"carouselTrackEl");x(this,"dotsEl");x(this,"presetButtons");x(this,"copy");x(this,"labels");x(this,"presetLabels");x(this,"rendererConfig");x(this,"avatarManifest");x(this,"sceneConfig");x(this,"sceneRuntimeConfig");x(this,"entityMap",null);x(this,"controlEntityMap",null);x(this,"haStatesReader",null);x(this,"weatherData");x(this,"hassStates",null);x(this,"currentState");x(this,"remoteControl",ae);x(this,"uiControl",ae);x(this,"currentControl",ae);x(this,"idleLines",[]);x(this,"activeIndex",0);x(this,"lastAutoRotateAt",0);x(this,"currentIdleLine","");x(this,"lastIdleIndex",-1);x(this,"currentPreset","full");x(this,"idleTimer",null);x(this,"avatarAdapter",null);x(this,"refreshIntervalHandle",null);x(this,"orderedPages",[]);x(this,"carouselDragState",null);this.root=e,this.options=a,this.copy={...At,...a.copy||{}},this.labels={...Ut,...a.labels||{}},this.presetLabels={...Tt,...a.presetLabels||{}},this.weatherData=_e(a.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=W(window.location.href,this.getRendererConfigUrl()),a=Lt(e),r=ze(await this.readJson(e)),n=ze({...r,links:Object.fromEntries(Object.entries(r.links||{}).map(([l,o])=>[l,W(a,o)])),avatar:{...r.avatar,manifestUrl:W(a,r.avatar.manifestUrl)},scene:{...r.scene,configUrl:W(a,r.scene.configUrl)},state:{...r.state,stateUrl:W(a,r.state.stateUrl),apiUrl:r.state.apiUrl?W(a,r.state.apiUrl):void 0,idleLinesUrl:W(a,r.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:r.state.entityMapUrl?W(a,r.state.entityMapUrl):void 0},control:{...r.control,controlUrl:W(a,r.control.controlUrl),apiUrl:r.control.apiUrl?W(a,r.control.apiUrl):void 0,entityMapUrl:r.control.entityMapUrl?W(a,r.control.entityMapUrl):void 0}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=La(Je(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.sceneRuntimeConfig=Kt(this.sceneConfig),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await Ia({url:this.rendererConfig.state.idleLinesUrl||W(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=Be(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=Ht(this.uiControl,a||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",a=>{if(a.key==="ArrowLeft"){a.preventDefault(),this.stepPage(-1);return}a.key==="ArrowRight"&&(a.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",a=>{var r,n;a.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(a.target)||(this.carouselDragState={pointerId:a.pointerId,startX:a.clientX,startY:a.clientY,deltaX:0,deltaY:0,locked:!1},(n=(r=this.carouselShellEl).setPointerCapture)==null||n.call(r,a.pointerId))}),this.carouselShellEl.addEventListener("pointermove",a=>{if(!(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=a.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=a.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(a.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}a.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=a=>{if(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)return;const{locked:r,deltaX:n}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,l=r&&Math.abs(n)>=s*.16,o=n<0?1:-1;if(this.clearDragState(a.pointerId,!1),l){this.stepPage(o);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(this.currentControl),this.uiControl=Be(ae,this.uiControl),this.currentControl=Be(this.remoteControl,this.uiControl);const e=St(this.currentState,this.currentControl);this.syncIdleMonologue(e);const a=ra(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),r=this.sceneRuntimeConfig;this.applyDisplayConfig(r);const n=r.pages,s=ea({control:this.currentControl,rotation:r.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:l=>n.some(o=>o.id===l)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(a.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(a.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(n,a)}renderCarousel(e,a){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((r,n)=>r.kind==="overview"?this.renderOverviewSlide(r,a,n):r.kind==="grid"?this.renderGridSlide(r,n,e.length):this.renderDynamicSlide(r,n,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((r,n)=>`
      <button
        class="carousel-dot ${n===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${n}"
        data-scene-page-id="${h(r.id)}"
        aria-label="${h(d(r.title,40)||d(r.id,40)||`${this.labels.pageStamp} ${n+1}`)}"
      ></button>
    `).join("");for(const r of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))r.addEventListener("click",()=>{this.pinPageByIndex(Number(r.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,a,r){const n=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||Re,l=s.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="${h(e.id)}" data-scene-page-id="${h(e.id)}" data-slide-order="${r}">
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
                  <strong>${h(a.caption)}</strong>
                  <div class="neiri-label">${h(a.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${h(this.resolveIconUrl("sparkles"))}" alt="${h(n)}"></div>
              </div>
              <div class="neiri-meta">${h(a.body)}</div>
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
    `}renderDynamicSlide(e,a,r){const n=dt(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),l=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),o=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${a+1} / ${r}`),u=e.cardStyle==="mini"?n.map(($,k)=>`
          <article class="mini-card" data-scene-card-index="${k}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h($.caption)}</span>
            <strong>${h($.value)}</strong>
          </article>
        `).join(""):n.map(($,k)=>`
          <article class="home-card" data-scene-card-index="${k}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h($.caption)}</span>
            <strong>${h($.value)}</strong>
            <small>${h($.hint)}</small>
          </article>
        `).join(""),g=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map($=>this.renderForecastDay($)).join("")}</div>`:"",i=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",S=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${a+1}`,C=d(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${h(e.id)}" data-scene-page-id="${h(e.id)}" data-slide-order="${a}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${h(e.kind)}" data-dynamic-card-style="${h(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${h(S)}</h1>
              ${C?`<p class="subline">${h(C)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${h(l)}</span>
              <span class="value">${h(o)}</span>
            </div>
          </div>
          ${g}
          <div class="${i}">
            ${u||`<div class="empty">${h(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `}renderGridSlide(e,a,r){const n=dt(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=e.cards||[],l=e.gridColumns||4,o=e.gridRows||3,u=d(e.stampCaption,24)||this.labels.pageStamp,g=d(e.stampValue,32)||`${a+1} / ${r}`,i=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${a+1}`,S=d(e.subtitle,140),C=n.map(($,k)=>{const b=s[k]||{},I=Number(b.col),E=Number(b.row),O=Math.max(1,Number(b.w)||1),H=Math.max(1,Number(b.h)||1);return`
        <article class="grid-card" style="${Number.isFinite(I)&&Number.isFinite(E)?`grid-column: ${I+1} / span ${O}; grid-row: ${E+1} / span ${H};`:""}" data-scene-card-index="${k}" data-scene-page-id="${h(e.id)}">
          <span class="caption">${h($.caption)}</span>
          <strong>${h($.value)}</strong>
          <small>${h($.hint)}</small>
        </article>
      `}).join("");return`
      <section class="slide slide-dynamic" data-slide-id="${h(e.id)}" data-scene-page-id="${h(e.id)}" data-slide-order="${a}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="grid">
          <div class="slide-top">
            <div>
              <h1 class="headline">${h(i)}</h1>
              ${S?`<p class="subline">${h(S)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${h(u)}</span>
              <span class="value">${h(g)}</span>
            </div>
          </div>
          <div class="grid-cards-container" style="--grid-cols: ${l}; --grid-rows: ${o};">
            ${C||`<div class="empty">${h(this.labels.noCardsConfigured)}</div>`}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const a=e[0],r=e[e.length-1];return`${d(a.dayNumber,4)} ${d(a.monthShort,8)} → ${d(r.dayNumber,4)} ${d(r.monthShort,8)}`}resolveIconUrl(e){var n;const a=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return a||`${Xe(d(this.options.iconBaseUrl,1024)||"./assets")}${Ua[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:r,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${r}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,r=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${r}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,a){var r,n;!a&&((n=(r=this.carouselShellEl).hasPointerCapture)!=null&&n.call(r,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=Qt(this.sceneRuntimeConfig.rotation,this.activeIndex,e,r=>this.orderedPages.some(n=>n.id===r));this.pinPageByIndex(a)}pinPageByIndex(e){const r=(this.orderedPages.length?this.orderedPages:this.sceneRuntimeConfig.pages)[e];if(!r)return;const n=Math.max(18e3,this.sceneRuntimeConfig.rotation.defaultDwellMs*2);this.uiControl=jt(this.uiControl,r.id,n),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!na(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=st(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const a=st(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refresh()},ia(18e3,18e3))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: HTTP ${a.status}`);return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:Et({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl})}async readAssistantState(){const e=async()=>Ca({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??$t}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap||!this.haStatesReader)return e();const a=await this.haStatesReader.read();return wa(a||{},this.entityMap,this.rendererConfig.assistant.name)||e()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=ae){const a=async()=>Pa({url:this.rendererConfig.control.controlUrl,defaultValue:e}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap||!this.haStatesReader)return a();const r=await this.haStatesReader.read();return $a(r||{},this.controlEntityMap)||a()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const a=await this.readJson(this.getWeatherUrl());e=ct(e,a)}catch{}if(this.options.weatherReader)try{const a=await this.options.weatherReader();e=ct(e,a)}catch{}try{return _e(e)}catch{return _e(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return fa({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return ha({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const r=a.dataset.avatarPreset||"",n=a.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[r];a.classList.toggle("is-active",r===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function ja(t,e={}){const a=new Ha(t,e);return await a.init(),a}const za=["overview","cards","forecast+cards","grid"],Va=["full","mini"],Rt=["entity","text","todo","onoff","battery","network","time","percent","number"],X=["caption","hint"],Ee="/local/live2d/",pt="/scene-legacy/live2d/",Wa={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Ga={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackDelete:"Удалить",avatarPackDeleteConfirm:t=>`Удалить аватар «${t}»? Это действие нельзя отменить.`,avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",kindGrid:"Сетка",fieldGridColumns:"Столбцы",fieldGridRows:"Строки",fieldCardCol:"Столбец",fieldCardRow:"Строка",fieldCardW:"Ширина",fieldCardH:"Высота",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackDelete:"Delete",avatarPackDeleteConfirm:t=>`Delete avatar "${t}"? This cannot be undone.`,avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",kindGrid:"Grid",fieldGridColumns:"Columns",fieldGridRows:"Rows",fieldCardCol:"Column",fieldCardRow:"Row",fieldCardW:"Width",fieldCardH:"Height",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},qa=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Ka=4*1024*1024,Ja=192*1024,Me=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],We="mellow-fly-7";function ce(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Ya(t){return Me.find(e=>e.id===t)||Me.find(e=>e.id===We)||Me[0]}function Za(t){return`${t.width} × ${t.height}`}function m(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Qe(t){return JSON.parse(JSON.stringify(t))}function Y(t){const e=new Map(t.pages.map(n=>[n.id,n])),a=t.rotation.order.map(n=>e.get(n)).filter(Boolean),r=t.pages.filter(n=>!a.some(s=>s.id===n.id));return[...a,...r]}function Xa(t,e){return e?Math.max(0,Y(t).findIndex(a=>a.id===e)):0}function Qa(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Mt(t,e){const a=Qa(e);let r=a,n=2;for(;t.pages.some(s=>s.id===r);)r=`${a}-${n}`,n+=1;return r}function er(t){const e=t.pages.length+1,a=ce()==="ru";return{id:Mt(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function Oe(t){const e=ce()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function B(t,e){const a=t[e];return a==null?"":String(a)}function ee(t,e){const a=t[e];return a==null?"":String(a)}function ie(t,e){const a=t.display||{},r=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(r.top))?Number(r.top):0);case"safeRight":return String(Number.isFinite(Number(r.right))?Number(r.right):0);case"safeBottom":return String(Number.isFinite(Number(r.bottom))?Number(r.bottom):0);case"safeLeft":return String(Number.isFinite(Number(r.left))?Number(r.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function tr(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function Ae(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function He(t){return t.avatar||(t.avatar={}),t.avatar}function ar(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function rr(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function ir(t){var r;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&Y(t).some(n=>n.id===a)?a:((r=Y(t)[0])==null?void 0:r.id)||null}async function nr(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return Qe(a.config)}async function sr(t,e){const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),r=await a.json();if(!a.ok||r.success===!1||!r.config)throw new Error(`POST ${t} failed: HTTP ${a.status}`);return Qe(r.config)}function et(t){switch(t){case"text":return[...X,"value"];case"todo":return[...X,"entity"];case"onoff":return[...X,"entity","onText","offText"];case"battery":return[...X,"entity","stateEntity"];case"network":return[...X,"downEntity","upEntity"];case"time":return[...X,"entity"];case"percent":return[...X,"entity","digits"];case"number":return[...X,"entity","digits","unit"];default:return[...X,"entity"]}}function je(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:e==="grid"?t.kindGrid:t.kindOverview}function ue(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function Dt(t){const e=ce();return Wa[e][t]||""}function De(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function or(t,e){const a=e.attributes||{},r=String(a.friendly_name||t),n=t.includes(".")&&t.split(".",1)[0]||"other",s=String(e.state||""),l=String(a.unit_of_measurement||"");return{entityId:t,name:r,domain:n,state:s,unit:l}}function lr(t){return t?Object.entries(t).map(([e,a])=>or(e,a)).sort((e,a)=>{const r=e.domain.localeCompare(a.domain);return r!==0?r:e.name.localeCompare(a.name,"ru")}):[]}function dr(t,e){const a=e.trim().toLowerCase();return a?t.filter(r=>r.entityId.toLowerCase().includes(a)||r.name.toLowerCase().includes(a)||r.domain.toLowerCase().includes(a)||r.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function cr(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():null}function se(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(e,window.location.href);if(a.startsWith("/")){const n=cr(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,r).toString()}function tt(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ee))return se(`${pt}${a.slice(Ee.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const r=new URL(a,e);if(r.pathname.startsWith(Ee)){const n=r.pathname.slice(Ee.length);return se(`${pt}${n}${r.search}${r.hash}`,e)}}catch{return a}return a}function ur(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function pr(t,e){const a=new URL("./",t).toString(),r=se(tt(e,a)||e,a);return ur(r||a)}function ft(t,e,a){const r=String(a||"").trim();return r?se(tt(r,t)||r,pr(t,e)):""}function fr(t,e){const a=String(e||"").trim();return a?se(tt(a,t)||a,new URL("./",t).toString()):""}function Nt(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}function Ge(t,e){const a=Nt(t);return{...a,manifestUrl:a.manifestUrl?se(a.manifestUrl,e):"",previewUrl:a.previewUrl?se(a.previewUrl,e):""}}async function gr(t,e){var g;const a=String(t||"").trim();if(!a)return null;const r=await fetch(a,{cache:"no-store"}),n=await r.json();if(!r.ok)throw new Error(`GET ${a} failed: HTTP ${r.status}`);const s=String(n.assetRoot||"").trim();let l=0;const o=ft(a,s,String(n.motionMapUrl||"").trim());if(o)try{const i=await fetch(o,{cache:"no-store"}),S=await i.json();i.ok&&Array.isArray(S.motions)&&(l=S.motions.length)}catch{l=0}const u=fr(a,String(((g=n.presetThumbs)==null?void 0:g.full)||"").trim())||ft(a,s,String(n.fallbackPortrait||"").trim());return Nt({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:a,previewUrl:u,motionCount:l,capabilities:n.capabilities})}async function gt(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),r=await a.json();if(!a.ok||r.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(r.items)?r.items.map(n=>Ge(n,e)).filter(n=>n.id&&n.manifestUrl):[]}async function mr(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const r=/\/api\/hassio_ingress\//.test(a),n=r?Ja:Ka;if(r||e.size>n){const u=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,g=Math.max(1,Math.ceil(e.size/n));let i=null;for(let S=0;S<g;S+=1){const C=S*n,$=Math.min(e.size,C+n),k=new FormData;k.set("uploadId",u),k.set("filename",e.name),k.set("chunkIndex",String(S)),k.set("chunkCount",String(g)),k.set("archive",e.slice(C,$,"application/zip"),`${e.name}.part-${S+1}-of-${g}`);const b=await fetch(a,{method:"POST",body:k}),I=await b.json();if(!b.ok||I.success===!1)throw new Error(String(I.error||`HTTP ${b.status}`));I.item&&(i=Ge(I.item,a))}if(!i)throw new Error("Avatar import did not return the imported pack.");return i}const s=new FormData;s.set("archive",e,e.name);const l=await fetch(a,{method:"POST",body:s}),o=await l.json();if(!l.ok||o.success===!1||!o.item)throw new Error(String(o.error||`HTTP ${l.status}`));return Ge(o.item,a)}async function hr(t,e){var l,o,u,g;const a=String(t||"").trim(),r=String(e||"").trim();if(!a||!r)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${a}?packId=${encodeURIComponent(r)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((l=s.motionMap)==null?void 0:l.motions)?(o=s.motionMap)==null?void 0:o.motions.map(i=>({index:Number(i.index),id:String(i.id||"").trim(),label:String(i.label||i.id||"").trim(),group:String(i.group||"").trim(),tags:Array.isArray(i.tags)?i.tags.map(S=>String(S||"").trim()).filter(Boolean):[]})).filter(i=>Number.isFinite(i.index)):[],semantic:typeof((u=s.motionMap)==null?void 0:u.semantic)=="object"&&((g=s.motionMap)!=null&&g.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function vr(t,e){var s,l,o;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const r=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await r.json();if(!r.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${r.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((l=n.motionMap)==null?void 0:l.semantic)=="object"&&((o=n.motionMap)!=null&&o.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function br(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function yr(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function wr(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${qa.map(r=>`
          <div class="field">
            <label for="avatar-semantic-${m(r.key)}">${m(yr(t,r))}</label>
            <select id="avatar-semantic-${m(r.key)}" data-avatar-semantic="${m(r.key)}">
              <option value="">${m(t.avatarMotionNone)}</option>
              ${a.map(n=>`
                <option value="${m(String(n.index))}"${br(e.motionMap.semantic[r.key])===String(n.index)?" selected":""}>
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
  `}function mt(t,e,a){var S,C,$,k,b;const r=(e==null?void 0:e.id)||"",n=a===r,s=(e==null?void 0:e.name)||t.avatarPackDefaultTile,l=(e==null?void 0:e.id)||t.avatarPackCurrent,o=(e==null?void 0:e.previewUrl)||"",u=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(S=e.capabilities)!=null&&S.supportsMotion?t.avatarCapabilityMotion:"",(C=e.capabilities)!=null&&C.supportsEmotion?t.avatarCapabilityEmotion:"",($=e.capabilities)!=null&&$.supportsLipSync?t.avatarCapabilityLipSync:"",(k=e.capabilities)!=null&&k.supportsViewPresets?t.avatarCapabilityViewPresets:"",(b=e.capabilities)!=null&&b.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],g=u.length?u:[t.avatarPackDefaultHint],i=e!==null;return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${o?`<img src="${m(o)}" alt="${m(s)}">`:`<span>${m(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${m(s)}</strong>
        <div class="meta">${m(l)}</div>
        <div class="avatar-pack-card-meta">
          ${g.map(I=>`<span>${m(I)}</span>`).join("")}
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
  `}function at(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function Sr(t,e,a,r){if(!e||a===null)return`<div class="meta">${m(t.entityBindingEmpty)}</div>`;const n=et(B(e,"type")||"entity").filter(s=>at(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(r==null?void 0:r.cardIndex)===a&&r.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${m(s)}">
            ${m(De(t,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${m(t.entityBindingNoTargets)}</div>`}function ht(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function le(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function vt(t){return et(t).find(e=>at(e))||null}function te(t,e,a,r=!1){return`
    <div class="field ${r?"is-wide":""}">
      <label for="page-field-${e}">${m(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${m(e)}" value="${m(a)}">
    </div>
  `}function ne(t,e,a){const r=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${m(t)}</label>
      <input id="display-field-${e}" type="number" step="${r}" data-display-field="${m(e)}" value="${m(a)}">
    </div>
  `}function bt(t,e,a,r){return`
    <div class="field">
      <label for="page-select-${e}">${m(t)}</label>
      <select id="page-select-${e}" data-page-field="${m(e)}">
        ${r.map(n=>`<option value="${m(n.value)}"${n.value===a?" selected":""}>${m(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function xr(t,e,a,r){for(let n=0;n<t.length;n++){if(n===r)continue;const s=t[n],l=Number(s.col)||0,o=Number(s.row)||0,u=Math.max(1,Number(s.w)||1),g=Math.max(1,Number(s.h)||1);if(e>=l&&e<l+u&&a>=o&&a<o+g)return{occupied:!0,cardIndex:n}}return{occupied:!1,cardIndex:-1}}function $r(t,e){const a=t.gridColumns||4,r=t.gridRows||3,n=t.cards||[],s=new Set;let l="";for(let o=0;o<r;o++)for(let u=0;u<a;u++){const g=`${u},${o}`;if(s.has(g))continue;const i=xr(n,u,o);if(i.occupied){const S=n[i.cardIndex],C=Number(S.col)||0,$=Number(S.row)||0,k=Math.max(1,Number(S.w)||1),b=Math.max(1,Number(S.h)||1);if(u===C&&o===$){for(let O=0;O<b;O++)for(let H=0;H<k;H++)s.add(`${C+H},${$+O}`);const I=i.cardIndex===e,E=B(S,"caption")||B(S,"type")||"entity";l+=`<div class="grid-preview-cell is-occupied${I?" is-selected":""}"
            style="grid-column: ${C+1} / span ${k}; grid-row: ${$+1} / span ${b};"
            data-action="select-card" data-card-index="${i.cardIndex}"
            title="#${i.cardIndex+1} ${m(E)}"
          ><span>${m(E)}</span></div>`}}else l+=`<div class="grid-preview-cell"
          style="grid-column: ${u+1}; grid-row: ${o+1};"
          data-action="grid-add-card-at" data-col="${u}" data-row="${o}"
          title="+">+</div>`}return`<div class="grid-preview" style="--grid-cols: ${a}; --grid-rows: ${r};">${l}</div>`}function kr(t,e,a,r,n=!1){const s=B(e,"type")||"entity",l=et(s),o=n?`
    <div class="field">
      <label>${m(t.fieldCardCol)}</label>
      <input type="number" min="0" data-card-index="${a}" data-card-field="col" value="${m(B(e,"col"))}">
    </div>
    <div class="field">
      <label>${m(t.fieldCardRow)}</label>
      <input type="number" min="0" data-card-index="${a}" data-card-field="row" value="${m(B(e,"row"))}">
    </div>
    <div class="field">
      <label>${m(t.fieldCardW)}</label>
      <input type="number" min="1" data-card-index="${a}" data-card-field="w" value="${m(B(e,"w")||"1")}">
    </div>
    <div class="field">
      <label>${m(t.fieldCardH)}</label>
      <input type="number" min="1" data-card-index="${a}" data-card-field="h" value="${m(B(e,"h")||"1")}">
    </div>
  `:"";return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${m(B(e,"caption")||ue(t,s))}</strong>
          <div class="meta">${m(ue(t,s))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        ${o}
        <div class="field is-wide">
          <label>${m(t.cardType)}</label>
          <select data-card-index="${a}" data-card-field="type">
            ${Rt.map(u=>`<option value="${u}"${u===s?" selected":""}>${m(ue(t,u))}</option>`).join("")}
          </select>
        </div>
        ${l.map(u=>{const g=at(u),i=g&&(r==null?void 0:r.cardIndex)===a&&r.field===u;return g?`
              <div class="field ${u==="hint"?"is-wide":""} is-binding-field${i?" is-active":""}">
                <label>${m(De(t,u))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${a}"
                    data-card-field="${m(u)}"
                    data-binding-field="${m(u)}"
                    value="${m(B(e,u))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${a}"
                    data-binding-field="${m(u)}"
                  >${t.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${u==="hint"?"is-wide":""}">
              <label>${m(De(t,u))}</label>
              <input
                type="${u==="digits"?"number":"text"}"
                data-card-index="${a}"
                data-card-field="${m(u)}"
                value="${m(B(e,u))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Cr(t,e,a,r,n,s=!1){const l=B(e,"type")||"entity",o=B(e,"caption")||ue(t,l),g=(s?`[${B(e,"col")||"0"},${B(e,"row")||"0"} ${B(e,"w")||"1"}×${B(e,"h")||"1"}] `:"")+(B(e,"entity")||B(e,"stateEntity")||B(e,"downEntity")||B(e,"upEntity")||B(e,"value")||B(e,"hint")||Dt(l));return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
        <strong>${m(o)}</strong>
        <span class="meta">${m(ue(t,l))}</span>
        <div class="meta">${m(g)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===r-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function Pr(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${m(e)}"
    >
      <strong>${m(ue(t,e))}</strong>
      <span>${m(Dt(e))}</span>
    </button>
  `}function Ir(t,e,a){t[e]=a.entityId;const r=t;String(r.caption||"").trim()||(r.caption=a.name),String(r.hint||"").trim()||(r.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(r.type==="number"||r.type==="percent")&&!String(r.unit||"").trim()&&a.unit&&(r.unit=a.unit)}async function Er(t){var ge;const e=Ga[ce()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const r=document.getElementById("scene-editor-shell");r!=null&&r.contains(a)&&document.body.insertBefore(a,r),r==null||r.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
      #scene-editor-shell .grid-preview {
        display: grid;
        grid-template-columns: repeat(var(--grid-cols, 4), minmax(0, 1fr));
        grid-template-rows: repeat(var(--grid-rows, 3), minmax(44px, 1fr));
        gap: 4px;
        padding: 8px;
        border-radius: 14px;
        background: rgba(214,225,237,0.42);
        border: 1px solid rgba(32,48,65,0.08);
        margin-bottom: 12px;
        max-height: 240px;
      }
      #scene-editor-shell .grid-preview-cell {
        border-radius: 10px;
        border: 1px dashed rgba(32,48,65,0.14);
        display: grid;
        place-items: center;
        font-size: 10px;
        color: rgba(32,48,65,0.4);
        cursor: pointer;
        min-height: 0;
        overflow: hidden;
        padding: 2px;
        text-align: center;
        word-break: break-all;
      }
      #scene-editor-shell .grid-preview-cell:hover {
        background: rgba(32,48,65,0.06);
      }
      #scene-editor-shell .grid-preview-cell.is-occupied {
        background: rgba(111,191,162,0.18);
        border-style: solid;
        border-color: rgba(77,147,121,0.24);
        color: rgba(32,48,65,0.7);
        font-weight: 500;
      }
      #scene-editor-shell .grid-preview-cell.is-selected {
        background: rgba(45,98,162,0.18);
        border-color: rgba(45,98,162,0.35);
        color: rgba(45,98,162,0.9);
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
        min-width: 140px;
        max-width: 140px;
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
                ${Me.map(p=>`<option value="${m(p.id)}">${m(p.label[ce()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),l=n.querySelector("[data-preview-canvas]"),o=n.querySelector("[data-preview-resolution]"),u=n.querySelector("[data-preview-display]"),g=n.querySelector("[data-dashboard]");if(!s||!l||!o||!u||!g)throw new Error("Missing native editor shell elements");l.appendChild(a);const i={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:We,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},S=async p=>{const f=String(p||"").trim();if(!f||!t.avatarPackApiUrl){i.avatarPackDetails=null,i.avatarPackLoading=!1,i.avatarPackDirty=!1;return}i.avatarPackLoading=!0,U();try{i.avatarPackDetails=await hr(t.avatarPackApiUrl,f),i.avatarPackDirty=!1}catch(c){i.avatarPackDetails=null,i.avatarPackDirty=!1,V(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{i.avatarPackLoading=!1}},C=()=>{var L;const p=Ya(i.previewDisplayId),f=Math.max(320,((L=s.parentElement)==null?void 0:L.clientWidth)||s.clientWidth||p.width),c=Math.max(260,Math.min(window.innerHeight*.62,760)),v=Math.min(1,f/p.width,c/p.height),A=Math.round(p.width*v),T=Math.round(p.height*v);u.value=p.id,o.textContent=Za(p),s.style.aspectRatio=`${p.width} / ${p.height}`,s.style.width=`${A}px`,s.style.height=`${T}px`,l.style.width=`${p.width}px`,l.style.height=`${p.height}px`,l.style.transform=`scale(${v})`,a.style.width=`${p.width}px`,a.style.height=`${p.height}px`},$=p=>{i.previewDisplayId=String(p||"").trim()||We,C()},k=p=>{i.pendingAvatarZip=p,i.pendingAvatarZipName=(p==null?void 0:p.name)||"",i.avatarImportStatus="",i.avatarImportTone="muted",U(),p&&b(p)},b=async p=>{if(!(!i.config||!t.avatarImportUrl||i.avatarImporting)){i.pendingAvatarZip=null,i.avatarImporting=!0,i.avatarImportStatus=e.avatarImporting,i.avatarImportTone="muted",U();try{const f=await mr(t.avatarImportUrl,p);i.avatarCatalog=t.avatarCatalogUrl?await gt(t.avatarCatalogUrl):[f],He(i.config).packId=f.id,await S(f.id),i.pendingAvatarZip=null,i.pendingAvatarZipName="",i.avatarImporting=!1,i.avatarImportStatus=e.avatarImportSuccess(f.name||f.id),i.avatarImportTone="ok",N(),U()}catch(f){i.avatarImporting=!1,i.avatarImportStatus=`${e.avatarImportError}: ${String(f)}`,i.avatarImportTone="bad",U()}}},I=typeof ResizeObserver<"u"?new ResizeObserver(()=>C()):null;I==null||I.observe(s.parentElement||s);let E=null;const O=()=>{const p=i.selectedPageId||"",f=i.selectedCardIndex;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(p){const c=a.querySelector(`[data-slide-id="${CSS.escape(p)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(p&&f!==null){const c=`[data-scene-page-id="${CSS.escape(p)}"][data-scene-card-index="${f}"]`,v=a.querySelector(c);v&&(v.dataset.editorSelectedCard="true")}},H=typeof MutationObserver<"u"?new MutationObserver(()=>O()):null;H==null||H.observe(a,{childList:!0,subtree:!0});const U=()=>{const p=i.config,f=p?Y(p):[],c=f.find(w=>w.id===i.selectedPageId)||f[0]||null,v=Array.isArray(c==null?void 0:c.cards)?c.cards:[],A=i.selectedCardIndex!==null&&v[i.selectedCardIndex]||null,T=dr(i.haEntities,i.entitySearch),L=i.focusedBinding?e.entityBindingActive(B(v[i.focusedBinding.cardIndex],"caption")||`${e.cards} #${i.focusedBinding.cardIndex+1}`,De(e,i.focusedBinding.field)):e.entityBindingEmpty,P=p?Ae(p):"",Z=i.avatarImportStatus?`<div class="scene-editor-status" data-tone="${i.avatarImportTone}">${m(i.avatarImportStatus)}</div>`:"",y=i.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,j=c?`${c.title||c.id||e.pageSettings} · ${je(e,c.kind)}`:e.statusLoading;g.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${i.statusTone}">${m(i.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${m(t.sceneUrl)}">${e.viewOnly}</a>
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
              <div class="meta">${y}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${mt(e,i.bundledAvatar,P)}
                ${i.avatarCatalog.map(w=>mt(e,w,P)).join("")}
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
              ${Z}
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
            ${f.map((w,M)=>`
              <article class="page-chip ${w.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${m(w.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${m(w.id)}">
                  <strong>${m(w.title||w.id||(ce()==="ru"?`Страница ${M+1}`:`Page ${M+1}`))}</strong>
                  <span class="meta">${m(je(e,w.kind))} · ${m(e.pageCards(Array.isArray(w.cards)?w.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${m(w.id)}"${M===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${m(w.id)}"${M===f.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${m(w.id)}"${f.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pageSettings}</h2>
              <div class="meta">${m(j)}</div>
            </div>
          ${c?`
            <div class="inspector-grid">
              ${te(e.fieldPageId,"id",ee(c,"id"),!0)}
              ${bt(e.fieldKind,"kind",ee(c,"kind"),za.map(w=>({value:w,label:je(e,w)})))}
              ${te(e.fieldTitle,"title",ee(c,"title"),!0)}
              ${te(e.fieldSubtitle,"subtitle",ee(c,"subtitle"),!0)}
              ${te(e.fieldSlot,"slot",ee(c,"slot"))}
              ${c.kind==="grid"?`
              ${te(e.fieldGridColumns,"gridColumns",String(c.gridColumns||4))}
              ${te(e.fieldGridRows,"gridRows",String(c.gridRows||3))}
              `:`
              ${bt(e.fieldCardStyle,"cardStyle",ee(c,"cardStyle")||"full",Va.map(w=>({value:w,label:w==="mini"?e.styleMini:e.styleFull})))}
              `}
              ${te(e.fieldStampCaption,"stampCaption",ee(c,"stampCaption"))}
              ${te(e.fieldStampValue,"stampValue",ee(c,"stampValue"))}
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
              ${c.kind==="grid"?$r(c,i.selectedCardIndex):""}
              <div>
                <div class="meta">${e.cardTemplates}</div>
                <div class="card-template-grid" style="margin-top:12px;">
                  ${Rt.map(w=>Pr(e,w)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${v.length?v.map((w,M)=>Cr(e,w,M,v.length,M===i.selectedCardIndex,c.kind==="grid")).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${A?kr(e,A,i.selectedCardIndex||0,i.focusedBinding,c.kind==="grid"):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              <div class="meta">${m(L)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${Sr(e,A,i.selectedCardIndex,i.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${m(i.entitySearch)}">
          </div>
          <div class="ha-list">
            ${T.length?T.map(w=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${m(w.name)}</strong>
                    <div class="meta">${m(w.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${m(w.entityId)}"${i.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${m(w.entityId)}</code>
                <div class="ha-state">${m(w.state)}${w.unit?` · ${m(w.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const F=g.querySelector("[data-avatar-archive]"),G=g.querySelector("[data-action='choose-avatar-archive']");G==null||G.addEventListener("click",()=>{if(!F||F.disabled)return;F.value="";const w=F;try{if(typeof w.showPicker=="function"){w.showPicker();return}}catch{}F.click()}),F==null||F.addEventListener("click",()=>{F.value=""}),F==null||F.addEventListener("change",()=>{var M;const w=((M=F.files)==null?void 0:M[0])||null;k(w),F.value=""});for(const w of Array.from(g.querySelectorAll(".page-chip[data-page-id]")))w.draggable=!0,w.addEventListener("dragstart",M=>{const K=String(w.dataset.pageId||"").trim();E=K?{kind:"page",pageId:K}:null,!(!E||!M.dataTransfer)&&(M.dataTransfer.effectAllowed="move",M.dataTransfer.setData("text/plain",JSON.stringify(E)))}),w.addEventListener("dragover",M=>{!E||E.kind!=="page"||(M.preventDefault(),le(n),w.classList.add("is-drop-target"),M.dataTransfer&&(M.dataTransfer.dropEffect="move"))}),w.addEventListener("drop",M=>{if(!E||E.kind!=="page")return;M.preventDefault();const K=String(w.dataset.pageId||"").trim();K&&xe(E.pageId,K),E=null,le(n)}),w.addEventListener("dragend",()=>{E=null,le(n)});for(const w of Array.from(g.querySelectorAll(".card-list-item[data-card-index]")))w.draggable=!0,w.addEventListener("dragstart",M=>{const K=Number(w.dataset.cardIndex||"-1");E=Number.isFinite(K)&&K>=0?{kind:"card",cardIndex:K}:null,!(!E||!M.dataTransfer)&&(M.dataTransfer.effectAllowed="move",M.dataTransfer.setData("text/plain",JSON.stringify(E)))}),w.addEventListener("dragover",M=>{!E||E.kind!=="card"||(M.preventDefault(),le(n),w.classList.add("is-drop-target"),M.dataTransfer&&(M.dataTransfer.dropEffect="move"))}),w.addEventListener("drop",M=>{if(!E||E.kind!=="card")return;M.preventDefault();const K=Number(w.dataset.cardIndex||"-1");Number.isFinite(K)&&K>=0&&$e(E.cardIndex,K),E=null,le(n)}),w.addEventListener("dragend",()=>{E=null,le(n)});C(),O()},V=(p,f)=>{i.status=p,i.statusTone=f,U()},_=()=>{if(!i.config)return;const p=Y(i.config);if(!p.length){i.selectedPageId=null;return}(!i.selectedPageId||!p.some(v=>v.id===i.selectedPageId))&&(i.selectedPageId=p[0].id);const f=p.find(v=>v.id===i.selectedPageId)||null,c=Array.isArray(f==null?void 0:f.cards)?f.cards:[];c.length?(i.selectedCardIndex===null||i.selectedCardIndex>=c.length)&&(i.selectedCardIndex=0):(i.selectedCardIndex=null,i.focusedBinding=null),rr(i.selectedPageId),ar(Xa(i.config,i.selectedPageId))},N=()=>{i.dirty=!0,V(e.statusDirty,"muted")},Q=()=>{const p=new URL(window.location.href);p.searchParams.set("editor","1"),i.selectedPageId&&p.searchParams.set("editorPage",i.selectedPageId),p.searchParams.set("v",String(Date.now())),window.location.replace(p.toString())},ye=(p,f)=>{if(!i.config||!i.selectedPageId)return;const c=i.config.pages.find(v=>v.id===i.selectedPageId);if(c){if(p==="slot")c.slot=f===""?void 0:Number(f);else if(p==="id"){const v=Mt(i.config,f||"page"),A=c.id;c.id=v,i.config.rotation.order=i.config.rotation.order.map(T=>T===A?v:T),i.selectedPageId=v}else if(p==="title"||p==="subtitle"||p==="stampCaption"||p==="stampValue")c[p]=f;else if(p==="kind")c.kind=f;else if(p==="cardStyle")c.cardStyle=f;else if(p==="gridColumns"||p==="gridRows"){const v=f===""?void 0:Math.max(1,Math.min(12,Math.round(Number(f))));c[p]=Number.isFinite(v)?v:void 0}N(),_()}},we=(p,f)=>{if(!i.config)return;const c=tr(i.config),v=c.safeArea||{},A=f===""?null:Number(f),T=Number.isFinite(A)?A:null;p==="safeTop"?v.top=T??0:p==="safeRight"?v.right=T??0:p==="safeBottom"?v.bottom=T??0:p==="safeLeft"?v.left=T??0:p==="layoutPaddingPx"?c.layoutPaddingPx=T??16:p==="layoutGapPx"?c.layoutGapPx=T??16:p==="globalScale"&&(c.globalScale=T??1),c.safeArea=v,N()},Se=(p,f,c)=>{var T;if(!i.config||!i.selectedPageId)return;const v=i.config.pages.find(L=>L.id===i.selectedPageId);if(!v)return;Array.isArray(v.cards)||(v.cards=[]);const A=v.cards[p];if(A){if(f==="type"){const L=Oe(c);if(v.cards[p]={...L,caption:B(A,"caption")||L.caption},((T=i.focusedBinding)==null?void 0:T.cardIndex)===p){const P=vt(c);i.focusedBinding=P?{cardIndex:p,field:P}:null}}else if(f==="digits")A[f]=c===""?0:Number(c);else if(f==="col"||f==="row"||f==="w"||f==="h"){const L=c===""?void 0:Math.max(0,Number(c));A[f]=Number.isFinite(L)?L:void 0}else A[f]=c;N()}},xe=(p,f)=>{if(!i.config||!p||!f||p===f)return;const c=Y(i.config).map(T=>T.id),v=c.indexOf(p),A=c.indexOf(f);v<0||A<0||(c.splice(v,1),c.splice(A,0,p),i.config.rotation.order=c,i.selectedPageId=p,i.selectedCardIndex=0,i.focusedBinding=null,N(),_(),U())},$e=(p,f)=>{if(!i.config||!i.selectedPageId||p===f)return;const c=i.config.pages.find(A=>A.id===i.selectedPageId);if(!c||!Array.isArray(c.cards)||p<0||f<0||p>=c.cards.length||f>=c.cards.length)return;const[v]=c.cards.splice(p,1);c.cards.splice(f,0,v),i.selectedCardIndex=f,i.focusedBinding=null,N(),U()},ke=p=>{if(!i.config||!i.selectedPageId||!i.focusedBinding)return;const f=i.config.pages.find(A=>A.id===i.selectedPageId),c=i.haEntities.find(A=>A.entityId===p);if(!f||!Array.isArray(f.cards)||!c)return;const v=f.cards[i.focusedBinding.cardIndex];v&&(Ir(v,i.focusedBinding.field,c),N(),U())},Ce=(p,f)=>{i.selectedCardIndex=p,i.focusedBinding={cardIndex:p,field:f},U(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async p=>{var Z,oe;const f=p.target,c=f==null?void 0:f.closest("[data-action]"),v=c==null?void 0:c.dataset.action;if(!v||!i.config)return;const A=Y(i.config),T=(c==null?void 0:c.dataset.pageId)||null,L=T?A.findIndex(y=>y.id===T):-1;if(v==="select-page"&&T){i.selectedPageId=T,i.selectedCardIndex=0,i.focusedBinding=null,_(),U();return}if(v==="page-up"&&L>0){const y=A.map(j=>j.id);[y[L-1],y[L]]=[y[L],y[L-1]],i.config.rotation.order=y,i.selectedPageId=T,N(),_(),U();return}if(v==="page-down"&&L>=0&&L<A.length-1){const y=A.map(j=>j.id);[y[L],y[L+1]]=[y[L+1],y[L]],i.config.rotation.order=y,i.selectedPageId=T,N(),_(),U();return}if(v==="page-remove"&&T&&A.length>1){i.config.pages=i.config.pages.filter(y=>y.id!==T),i.config.rotation.order=Y(i.config).map(y=>y.id),i.selectedPageId=((Z=Y(i.config)[Math.max(0,L-1)])==null?void 0:Z.id)||((oe=Y(i.config)[0])==null?void 0:oe.id)||null,i.selectedCardIndex=0,i.focusedBinding=null,N(),_(),U();return}if(v==="add-page"){const y=er(i.config);i.config.pages.push(y),i.config.rotation.order=Y(i.config).map(j=>j.id),i.selectedPageId=y.id,i.selectedCardIndex=null,i.focusedBinding=null,N(),_(),U();return}if(v==="add-card-template"&&i.selectedPageId){const y=i.config.pages.find(F=>F.id===i.selectedPageId),j=(c==null?void 0:c.dataset.cardType)||"entity";if(y){Array.isArray(y.cards)||(y.cards=[]),y.cards.push(Oe(j));const F=y.cards.length-1;i.selectedCardIndex=F;const G=vt(j);i.focusedBinding=G?{cardIndex:F,field:G}:null,N(),U(),G&&window.requestAnimationFrame(()=>{const w=n.querySelector("#ha-entity-search");w==null||w.scrollIntoView({behavior:"smooth",block:"center"}),w==null||w.focus()})}return}if(v==="grid-add-card-at"&&i.selectedPageId){const y=i.config.pages.find(G=>G.id===i.selectedPageId),j=Number((c==null?void 0:c.dataset.col)||"0"),F=Number((c==null?void 0:c.dataset.row)||"0");if(y){Array.isArray(y.cards)||(y.cards=[]);const G=Oe("entity");G.col=j,G.row=F,G.w=1,G.h=1,y.cards.push(G),i.selectedCardIndex=y.cards.length-1,N(),U()}return}if(v==="focus-binding"){const y=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),j=(c==null?void 0:c.dataset.bindingField)||"";y>=0&&j&&Ce(y,j);return}const P=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(P>=0&&i.selectedPageId){const y=i.config.pages.find(j=>j.id===i.selectedPageId);if(!y||!Array.isArray(y.cards))return;if(v==="select-card"){i.selectedCardIndex=P,U();return}if(v==="card-remove"){y.cards=y.cards.filter((j,F)=>F!==P),i.selectedCardIndex!==null&&(i.selectedCardIndex===P?i.selectedCardIndex=y.cards.length?Math.min(P,y.cards.length-1):null:i.selectedCardIndex>P&&(i.selectedCardIndex-=1)),i.focusedBinding&&(i.focusedBinding.cardIndex===P?i.focusedBinding=null:i.focusedBinding.cardIndex>P&&(i.focusedBinding={cardIndex:i.focusedBinding.cardIndex-1,field:i.focusedBinding.field})),N(),U();return}if(v==="card-up"&&P>0){[y.cards[P-1],y.cards[P]]=[y.cards[P],y.cards[P-1]],i.selectedCardIndex===P?i.selectedCardIndex=P-1:i.selectedCardIndex===P-1&&(i.selectedCardIndex=P),i.focusedBinding&&(i.focusedBinding.cardIndex===P?i.focusedBinding={cardIndex:P-1,field:i.focusedBinding.field}:i.focusedBinding.cardIndex===P-1&&(i.focusedBinding={cardIndex:P,field:i.focusedBinding.field})),N(),U();return}if(v==="card-down"&&P<y.cards.length-1){[y.cards[P],y.cards[P+1]]=[y.cards[P+1],y.cards[P]],i.selectedCardIndex===P?i.selectedCardIndex=P+1:i.selectedCardIndex===P+1&&(i.selectedCardIndex=P),i.focusedBinding&&(i.focusedBinding.cardIndex===P?i.focusedBinding={cardIndex:P+1,field:i.focusedBinding.field}:i.focusedBinding.cardIndex===P+1&&(i.focusedBinding={cardIndex:P,field:i.focusedBinding.field})),N(),U();return}}if(v==="save"){i.saving=!0,i.avatarPackSaving=i.avatarPackDirty,V(e.saving,"muted");try{if(i.avatarPackDirty&&i.avatarPackDetails&&t.avatarPackApiUrl){try{i.avatarPackDetails=await vr(t.avatarPackApiUrl,i.avatarPackDetails)}catch(y){throw new Error(`${e.avatarMappingSaveError}: ${String(y)}`)}i.avatarPackDirty=!1}i.config=await sr(t.sceneApiUrl,Qe(i.config)),i.dirty=!1,i.saving=!1,i.avatarPackSaving=!1,_(),V(e.statusSaved,"ok"),window.setTimeout(()=>Q(),250)}catch(y){i.saving=!1,i.avatarPackSaving=!1,V(`${e.saveError}: ${String(y)}`,"bad")}return}if(v==="bind-entity"){const y=(c==null?void 0:c.dataset.entityId)||"";ke(y)}}),n.addEventListener("input",p=>{const f=p.target;if(!f||!i.config){f&&f.dataset.previewDisplay!==void 0&&$(f.value);return}if(f.dataset.previewDisplay!==void 0){$(f.value);return}if(f.dataset.avatarSemantic!==void 0){const c=Ae(i.config);if(!i.avatarPackDetails||!c||i.avatarPackDetails.packId!==c)return;const v=f.value.trim();v?i.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic]=Number(v):delete i.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic],i.avatarPackDirty=!0,V(e.statusDirty,"muted"),U();return}if(f.dataset.pageField){ye(f.dataset.pageField,f.value),U();return}if(f.dataset.displayField){we(f.dataset.displayField,f.value),U();return}if(f.dataset.cardField&&f.dataset.cardIndex){i.selectedCardIndex=Number(f.dataset.cardIndex),Se(Number(f.dataset.cardIndex),f.dataset.cardField,f.value),U();return}f.hasAttribute("data-ha-search")&&(i.entitySearch=f.value,U())}),n.addEventListener("click",p=>{var A,T;const f=(A=p.target)==null?void 0:A.closest("[data-action='delete-avatar-pack']");if(f&&t.avatarPackApiUrl){const L=String(f.dataset.packId||"").trim(),P=String(f.dataset.packName||L).trim();if(!L||!window.confirm(e.avatarPackDeleteConfirm(P)))return;const Z=`${t.avatarPackApiUrl}?packId=${encodeURIComponent(L)}`;fetch(Z,{method:"DELETE"}).then(async oe=>{if(!oe.ok){const y=await oe.json().catch(()=>({}));console.warn("Failed to delete avatar pack",L,y);return}i.config&&Ae(i.config)===L&&(He(i.config).packId=null,i.avatarPackDetails=null,N()),i.avatarCatalog=i.avatarCatalog.filter(y=>y.id!==L),U()});return}const c=(T=p.target)==null?void 0:T.closest("[data-action='select-avatar-pack']");if(!c||!i.config)return;const v=String(c.dataset.packId||"").trim();He(i.config).packId=v||null,N(),S(v||null).finally(()=>U()),U()}),a.addEventListener("click",p=>{if(!i.config)return;const f=p.target,c=f==null?void 0:f.closest("[data-scene-card-index][data-scene-page-id]");if(c){const A=String(c.dataset.scenePageId||"").trim(),T=Number(c.dataset.sceneCardIndex||"-1");A&&Number.isFinite(T)&&T>=0&&(i.selectedPageId=A,i.selectedCardIndex=T,i.focusedBinding=null,_(),U(),ht("cards"));return}const v=f==null?void 0:f.closest("[data-scene-page-id]");if(v){const A=String(v.dataset.scenePageId||"").trim();A&&(i.selectedPageId=A,i.selectedCardIndex=0,i.focusedBinding=null,_(),U(),ht("pages"));return}}),n.addEventListener("change",p=>{var c;const f=p.target;!f||f.dataset.avatarArchive===void 0||k(((c=f.files)==null?void 0:c[0])||null)}),n.addEventListener("focusin",p=>{const f=p.target;if(!(f!=null&&f.dataset.bindingField))return;const c=Number(f.dataset.cardIndex||"-1");c<0||(i.selectedCardIndex=c,i.focusedBinding={cardIndex:c,field:f.dataset.bindingField})});try{if(i.config=await nr(t.sceneApiUrl),t.sceneAvatarManifestUrl)try{i.bundledAvatar=await gr(t.sceneAvatarManifestUrl,t.packId)}catch{i.bundledAvatar=null}if(t.avatarCatalogUrl)try{i.avatarCatalog=await gt(t.avatarCatalogUrl)}catch{i.avatarCatalog=[]}i.haEntities=lr(((ge=It())==null?void 0:ge.states)||null),i.selectedPageId=ir(i.config),i.selectedCardIndex=0,i.status=e.statusSaved,i.statusTone="ok",await S(Ae(i.config)),_()}catch(p){i.status=`${e.loadError}: ${String(p)}`,i.statusTone="bad"}U()}const Ar="../scene-api/bootstrap",Ur="weather.forecast_home_assistant",Tr="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ue="/local/live2d/",yt="/scene-legacy/live2d/",Lr={...At,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Rr={...Ut,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},Mr={...Tt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Dr={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Nr={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:t=>`Pack: ${t||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:t=>`Pack: ${t||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Br(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Fr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function _r(t){if(!Fr(t))return null;const e=String(t.type||"").trim();return e!=="kiosk-display-off"&&e!=="kiosk-display-on"?null:{type:e,displayOn:t.displayOn===void 0?e==="kiosk-display-on":t.displayOn===!0,source:String(t.source||"").trim()||void 0,timestamp:Number.isFinite(Number(t.timestamp))?Number(t.timestamp):void 0}}function Or(){return new URLSearchParams(window.location.search).get("bootstrap")||Ar}function Hr(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);if(a)return new URL(a[0],e.origin).toString();for(const r of["/scene-api/","/scene-runtime/","/scene-editor/"]){const n=e.pathname.indexOf(r);if(n>=0)return new URL(e.pathname.slice(0,n+1),e.origin).toString()}return null}function D(t,e){const a=jr(String(t||"").trim(),e);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const r=new URL(e,window.location.href);if(a.startsWith("/")){const n=Hr(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,r).toString()}function jr(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Ue))return`${yt}${a.slice(Ue.length)}`;if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const r=new URL(a,new URL(e,window.location.href));if(r.pathname.startsWith(Ue)){const n=r.pathname.slice(Ue.length);return D(`${yt}${n}${r.search}${r.hash}`,e)||a}}catch{return a}return a}function zr(t,e){const a=Je(t),r=a.adapter==="live2d"?D("../../scene-runtime/avatar.html",e):"",n=D(String(a.assetRoot||"").trim(),e),s=u=>{const g=String(u||"").trim();return g?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(g)||g.startsWith("/")?D(g,e):g:""},l=u=>{const g=String(u||"").trim();return g?D(g,e):""},o=Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([u,g])=>[u,D(String(g||""),e)]).filter(([,u])=>!!u));return{...a,assetRoot:n,runtimeUrl:r||D(String(a.runtimeUrl||"").trim(),e),entry:s(String(a.entry||"").trim()),modelUrl:s(String(a.modelUrl||"").trim()),fallbackPortrait:s(String(a.fallbackPortrait||"").trim()),motionMapUrl:l(String(a.motionMapUrl||"").trim()),presetThumbs:o}}function qe(t,e,a,r){t.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${a}</p>
        ${r?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${r}</pre>`:""}
      </div>
    </section>
  `}let Ke=null,Te=null;function Vr(t){const e=Array.from(document.querySelectorAll("iframe.ks-live2d-iframe"));let a=!1;for(const r of e)r.contentWindow&&(r.contentWindow.postMessage(t,"*"),a=!0);return a}function Ne(t=24){Te!==null&&(window.clearTimeout(Te),Te=null),Ke&&(Vr(Ke)||t<=0||(Te=window.setTimeout(()=>{Ne(t-1)},120)))}window.addEventListener("message",t=>{const e=_r(t.data);e&&(Ke=e,Ne())});function Bt(){return new URLSearchParams(window.location.search).get("editor")==="1"}function Wr(){if(!Bt())return;const t=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),t(),window.addEventListener("pageshow",t,{once:!0}),window.addEventListener("load",t,{once:!0}),window.requestAnimationFrame(()=>{t(),window.setTimeout(t,120)});let e=!1;const a=()=>{e=!0},r=["pointerdown","wheel","touchstart","keydown"];for(const l of r)window.addEventListener(l,a,{once:!0,passive:!0});let n=0;const s=window.setInterval(()=>{if(e||n>=24){window.clearInterval(s);return}t(),n+=1},80)}async function Gr(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return a}async function he(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return e.json()}function qr(t,e){var a,r,n,s,l,o,u,g,i,S,C,$;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([k,b])=>[k,D(b,e)]).filter(([,k])=>!!k)),avatar:{manifestUrl:D(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:D(String(((r=t.scene)==null?void 0:r.configUrl)||"").trim(),e)},state:{provider:((n=t.state)==null?void 0:n.provider)||"json",stateUrl:D(String(((s=t.state)==null?void 0:s.stateUrl)||"").trim(),e),apiUrl:D(String(((l=t.state)==null?void 0:l.apiUrl)||"").trim(),e)||void 0,haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:D(String(((u=t.state)==null?void 0:u.idleLinesUrl)||"").trim(),e),entityMapUrl:D(String(((g=t.state)==null?void 0:g.entityMapUrl)||"").trim(),e)},control:{provider:((i=t.control)==null?void 0:i.provider)||"json",controlUrl:D(String(((S=t.control)==null?void 0:S.controlUrl)||"").trim(),e),apiUrl:D(String(((C=t.control)==null?void 0:C.apiUrl)||"").trim(),e)||void 0,entityMapUrl:D(String((($=t.control)==null?void 0:$.entityMapUrl)||"").trim(),e)||void 0}}}async function Kr(t,e){var k,b,I,E,O,H,U,V;const a=D(String(((k=t.files)==null?void 0:k.rendererConfigUrl)||"").trim(),e);if(!a)return"";const r=D(String(((b=t.files)==null?void 0:b.sceneConfigUrl)||"").trim(),e),n=D(String(((I=t.files)==null?void 0:I.avatarCatalogUrl)||"").trim(),e);let s="";if(r&&n)try{const _=await he(r);s=String(((E=_.avatar)==null?void 0:E.packId)||"").trim()}catch{s=""}let l="";if(s&&n)try{const _=await he(n),N=Array.isArray(_.items)?_.items.find(Q=>String(Q.id||"").trim()===s):null;l=D(String((N==null?void 0:N.manifestUrl)||"").trim(),e)}catch{l=""}const o=qr(await he(a),a);r&&(o.scene={...o.scene||{},configUrl:r});const u=D(String(((O=t.files)==null?void 0:O.haStatesUrl)||"").trim(),e);u&&(o.state={...o.state||{},apiUrl:((H=o.state)==null?void 0:H.apiUrl)||u},o.control={...o.control||{},apiUrl:((U=o.control)==null?void 0:U.apiUrl)||u});const g=l||String(((V=o.avatar)==null?void 0:V.manifestUrl)||"").trim();if(!g)return URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));const i=D(g,e),S=zr(await he(i),i),C=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:"application/json"})),$={...o,avatar:{manifestUrl:C}};return URL.createObjectURL(new Blob([JSON.stringify($)],{type:"application/json"}))}const ve=document.getElementById("app");if(!ve)throw new Error("Missing #app root element");const de=Nr[Br()];Wr();qe(ve,de.startingTitle,de.startingBody);(async()=>{var e,a,r,n,s;const t=Or();try{const l=await Gr(t),o=String(l.packId||"").trim(),u=o.toLowerCase()==="neiri",g=await Kr(l,t),i=g?await he(g):null;if(!g){qe(ve,de.missingRendererTitle,de.missingRendererBody,JSON.stringify(l,null,2));return}document.documentElement.dataset.packId=o,document.title=u?"Нейри":o?`kiosk-scene hosted runtime (${o})`:"kiosk-scene hosted runtime",await ja(ve,{rendererConfigUrl:g,weatherUrl:u?"./weather.json":void 0,weatherReader:u?Oa({weatherEntity:Ur,openMeteoUrl:Tr,locale:"ru-RU",iconBaseUrl:"./assets",apiUrl:String(((e=i==null?void 0:i.state)==null?void 0:e.apiUrl)||"").trim()||void 0,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:u?Lr:void 0,labels:u?Rr:void 0,presetLabels:u?Mr:void 0,defaultWeather:u?Dr:void 0}),Ne(),Bt()&&(await Er({packId:o,sceneApiUrl:D(String(l.sceneEditorApiUrl||"").trim(),t),sceneAvatarManifestUrl:D(String(((a=l.files)==null?void 0:a.avatarManifestUrl)||"").trim(),t),avatarCatalogUrl:D(String(((r=l.files)==null?void 0:r.avatarCatalogUrl)||"").trim(),t),avatarImportUrl:D(String(((n=l.files)==null?void 0:n.avatarImportUrl)||"").trim(),t),avatarPackApiUrl:D(String(((s=l.files)==null?void 0:s.avatarPackApiUrl)||"").trim(),t),sceneUrl:D(String(l.entryUrl||l.runtimeBaseUrl||"./").trim(),t)}),Ne())}catch(l){qe(ve,de.failedTitle,de.failedBody,String(l))}})();
