var pt=Object.defineProperty;var ft=(a,e,t)=>e in a?pt(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var b=(a,e,t)=>ft(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function T(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function d(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Ne(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ce(a,e){if(!T(a)||!T(e))return e??a;const t={...a};for(const[i,r]of Object.entries(e)){if(Array.isArray(r)){t[i]=r.slice();continue}if(T(r)&&T(t[i])){t[i]=ce(t[i],r);continue}t[i]=r}return t}function mt(a,e=40){return Array.isArray(a)?a.map(t=>d(t,e).toLowerCase()).filter(Boolean):[]}const Z={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},Re={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function $e(a){var t,i,r,s,o,l,h,n,w,S;const e=ce(Z,T(a)?a:{});return{version:1,assistant:{name:d((t=e.assistant)==null?void 0:t.name,40)||Z.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:T(e.links)?Object.fromEntries(Object.entries(e.links).map(([C,g])=>[d(C,64),d(g,1024)]).filter(([C,g])=>C&&g)):{},avatar:{manifestUrl:d((r=e.avatar)==null?void 0:r.manifestUrl,1024)||Z.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||Z.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||Z.state.stateUrl,haApiFallback:((h=e.state)==null?void 0:h.haApiFallback)===!0,idleLinesUrl:d((n=e.state)==null?void 0:n.idleLinesUrl,1024)||Z.state.idleLinesUrl,entityMapUrl:d((w=e.state)==null?void 0:w.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d((S=e.control)==null?void 0:S.controlUrl,1024)||Z.control.controlUrl}}}function Xe(a){var t,i,r,s,o;const e=ce(Re,T(a)?a:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||Re.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:T(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,h])=>[d(l,32),d(h,1024)]).filter(([l,h])=>l&&h)):{},viewPresets:T(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,h])=>d(l,32)&&T(h))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((r=e.capabilities)==null?void 0:r.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const ee={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},gt=["full","torso","head"];function de(a,e=Date.now()){var l,h,n,w,S,C,g;const t=ce(ee,T(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((l=t.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((h=t.page)==null?void 0:h.target,40)||null,until:d((n=t.page)==null?void 0:n.until,64)||null},cue:{cue:d((w=t.cue)==null?void 0:w.cue,32)||null,emotion:d((S=t.cue)==null?void 0:S.emotion,32)||null,motion:d((C=t.cue)==null?void 0:C.motion,32)||null,until:d((g=t.cue)==null?void 0:g.until,64)||null}},r=d(t.viewPreset,16).toLowerCase();i.viewPreset=gt.includes(r)?r:null;const s=Ne(i.page.until);i.page.mode==="pinned"&&(!s||s<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=Ne(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function ye(a,e,t=Date.now()){return de(ce(de(a,t),T(e)?e:{}),t)}function ht(a,e,t=Date.now()){return de({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function vt(a,e,t=3e4,i=Date.now()){const r=d(e,40),s=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return de({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:r?"pinned":"auto",target:r||null,until:r?s:null}},i)}function Qe(a,e){var o,l,h;const t={...a||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),r=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),s=d((h=e==null?void 0:e.cue)==null?void 0:h.motion,32);return i&&(t.cue=i),r&&(t.emotion=r),s&&(t.motion=s),t}function B(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function Be(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function yt(a){return T(a)&&T(a.config)?a.config:a}function bt(a,e){const t={...a};return T(e)&&(typeof e.id=="string"&&(t.id=d(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>T(i)))),t}function be(a,e){const t=yt(a),i=Array.isArray(e.pages)?e.pages.slice():[],r=T(t)&&Array.isArray(t.pages)?t.pages:[],s=i.map(g=>{const $=r.find(k=>d(T(k)?k.id:"",40)===g.id);return bt(g,$)}),o=T(t)&&T(t.rotation)?t.rotation:{},l=T(e.display)?e.display:{},h=T(t)&&T(t.display)?t.display:{},n=T(l.safeArea)?l.safeArea:{},w=T(h.safeArea)?h.safeArea:{},S=Array.isArray(o.order)?o.order:e.rotation.order,C=mt(S).filter((g,$,k)=>s.some(I=>I.id===g)&&k.indexOf(g)===$);return{version:1,rotation:{order:C.length?C:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:B(w.top,B(n.top,0)),right:B(w.right,B(n.right,0)),bottom:B(w.bottom,B(n.bottom,0)),left:B(w.left,B(n.left,0))},layoutPaddingPx:B(h.layoutPaddingPx,B(l.layoutPaddingPx,16)),layoutGapPx:B(h.layoutGapPx,B(l.layoutGapPx,16)),globalScale:Be(h.globalScale,Be(l.globalScale,1))},pages:s}}function wt(a,e=220){const t=d(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},r=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(s,o,l)=>{const h=d(o,16).toLowerCase(),n=d(l,32).toLowerCase();return(h==="emotion"||h==="activity"||h==="cue"||h==="motion")&&n&&(i[h]=n)," "});return{text:d(r,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const St={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function ne(a,e={}){const t=T(a)?a:{},i={...St,...e};return{version:1,assistant:d(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:d(t.status??i.status,255),message:d(t.message??i.message,255),source:d(t.source??i.source,64),updatedAt:d(t.updatedAt??i.updatedAt,64),emotion:d(t.emotion??i.emotion,32)||null,activity:d(t.activity??i.activity,32)||null,cue:d(t.cue??i.cue,32)||null,intensity:xt(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:d(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:d(t.event??i.event,64)}}function xt(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function kt(a,e){return a.order[e]||a.order[0]||""}function $t(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function Ct(a,e,t,i){const r=Array.isArray(a.order)?a.order:[];if(!r.length)return 0;const s=Math.max(0,Math.min(e,r.length-1));for(let o=1;o<=r.length;o+=1){const l=(s+o*t+r.length)%r.length;if(i(r[l]))return l}return s}function It(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const r=a.control.page;if(r.mode==="pinned"&&r.target)return{nextIndex:$t(a.rotation,r.target),nextAutoRotateAt:e,pinnedKey:`${r.target}:${r.until||""}`};if(a.force){const o=kt(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(o)?a.activeIndex:Math.max(0,t.findIndex(h=>a.isEligible(h))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let s=a.activeIndex;for(let o=1;o<=t.length;o+=1){const l=(a.activeIndex+o)%t.length;if(a.isEligible(t[l])){s=l;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const et={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Pt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function Fe(a){const e=d(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Pt.some(t=>e.includes(t)):!1}function Et(a,e){const t=ne(a),i=d(t.status,72),r=d(t.message,220);if(!(t.online!==!1&&(Fe(i)||Fe(r))))return{state:t,hasTechnicalFailure:!1};const l=d(t.emotion,32).toLowerCase(),h=d(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(t.activity,32).toLowerCase()==="error"?"idle":d(t.activity,32)||null,cue:d(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:h==="error"?"idle_soft":h||null},hasTechnicalFailure:!0}}function At(a,e){const t=(e==null?void 0:e.copy)??et,i=ne(a),r=wt(i.message,220),s=Et({...i,message:r.text,emotion:d(i.emotion,32)||r.emotion||null,activity:d(i.activity,32)||r.activity||null,cue:d(i.cue,32)||r.cue||null,motion:d(i.motion,32)||r.motion||null},{healthyStatus:t.technicalHealthyLabel}),o=s.state,l=d(o.message,180),h=d(o.activity,32).toLowerCase(),n=o.online!==!1&&h!=="offline",w=!!o.busy||h==="thinking"||h==="busy"||h==="acting",S=o.speaking===!0||h==="speaking",C=n?w?t.busyLabel:l||S?t.speakingLabel:s.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,g=l?t.messageCaption:s.hasTechnicalFailure?t.statusCaption:t.modeCaption,$=l||(n?w?t.busyBody:d(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:o,hasTechnicalFailure:s.hasTechnicalFailure,caption:g,label:C,body:$,bodyKey:[g,C,$].join(":")}}function Tt(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function _e(a,e=-1){const t=Array.isArray(a)?a.map(r=>d(r,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function Lt(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!d(a==null?void 0:a.message,180);return e&&!t&&!i}const Ut={cue:null,emotion:null,motion:null,until:null},Dt={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Mt(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function tt(a){return a.endsWith("/")?a:`${a}/`}function ue(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(tt(d(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function fe(a){const e=d(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function Nt(a,e,t){const i=d(a.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?fe(i):new URL("../avatar.html",new URL(tt(d(t,1024)||"."),window.location.href)).toString()}function Rt(a,e){const t=d(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function Bt(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[r,s]of Object.entries(i)){const o=d(r,64);if(!o||s==null)continue;const l=typeof s=="boolean"?s?"1":"0":String(s);t.searchParams.set(o,l)}return t.toString()}function Ft(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([r,s])=>[d(r,32),ue(t,s)]).filter(([r,s])=>r&&s));return{version:1,assistant:{name:d(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([r,s])=>[d(r,64),fe(s)]).filter(([r,s])=>r&&s)),state:{stateUrl:fe(a.state.stateUrl),idleLinesUrl:fe(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:ue(t,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:ue(t,e.fallbackPortrait||""),motionMapUrl:ue(t,e.motionMapUrl||""),presetThumbs:i}}}class _t{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"currentState");b(this,"currentCue",{...Ut});b(this,"currentPreset","full");b(this,"currentBubble",{...Dt});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var r;const t=(r=this.iframeEl)==null?void 0:r.contentWindow;if(!t||e.source!==t||!Mt(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Xe({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=$e(e.rendererConfig||{}),this.currentState=ne({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const t=Nt(this.options,this.manifest,this.assetRoot),i=Bt(t,this.options);this.targetOrigin=Rt(i,this.options.targetOrigin);const r=document.createElement("div");r.className="ks-live2d-frame",Object.assign(r.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const s=document.createElement("iframe");s.className="ks-live2d-iframe",s.src=i,s.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,s.loading="eager",s.allow="autoplay",Object.assign(s.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&s.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);r.append(s,o),this.host.append(r),s.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=r,this.iframeEl=s,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=ne(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const r=document.createElement("div");r.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(r.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(r,s),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Ft(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=Qe(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function Ot(a={}){return new _t(a)}const Ht={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Oe={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class jt{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const r=document.createElement("div");r.className="ks-static-avatar-fallback",r.textContent=this.options.alt||"Avatar",Object.assign(r.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,r,s),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=r;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||Oe,i=t[e]||t.full||Oe.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Ht}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");return i?`${i}/${r}`:r}}function zt(a={}){return new jt(a)}function Vt(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function at(){var a;for(const e of Vt())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function Wt(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function Kt(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=d(t.entity_id,255);i&&(e[i]=t)}return e}function Gt(a,e,t="Assistant"){const i=a[e.status],r=a[e.message],s=a[e.online],o=a[e.busy],l=a[e.source],h=a[e.updatedAt],n=e.emotion?a[e.emotion]:null,w=e.activity?a[e.activity]:null,S=e.cue?a[e.cue]:null,C=e.speaking?a[e.speaking]:null,g=e.intensity?a[e.intensity]:null,$=e.motion?a[e.motion]:null,k=a[e.revision];if(!i&&!r&&!s&&!o)return null;const I=d(i==null?void 0:i.state,72),R=d(r==null?void 0:r.state,220),H=d(h==null?void 0:h.state,64),K=we(s,!0),G=we(o,!1),q=d(w==null?void 0:w.state,32)||"",V=we(C)??q==="speaking",p=q||(K?V?"speaking":G?"thinking":"idle":"offline");return ne({version:1,assistant:d(t,40)||"Assistant",online:K,busy:G,status:I&&I!=="unknown"&&I!=="unavailable"?I:"",message:R&&R!=="unknown"&&R!=="unavailable"?R:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:H&&H!=="unknown"&&H!=="unavailable"?H:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(n==null?void 0:n.state,32)||null,activity:p,cue:d(S==null?void 0:S.state,32)||null,intensity:qt(g),speaking:V,motion:d($==null?void 0:$.state,32)||null,revision:Number(k==null?void 0:k.state)||0})}function we(a,e){const t=d(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function qt(a){const e=d(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function Jt(a){const e=Pe(a);return{id:"ha-state",async read(){const t=await e.read();return t?Gt(t,a.entityMap,a.assistantName):null}}}function Pe(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let r=null,s=0,o=null,l=0;async function h(){var C;const n=at();if(n!=null&&n.states)return n.states;const w=Date.now();if(r&&w-s<t||!a.allowApiFallback||typeof e!="function"||w<l)return r;if(o)return o;const S=d(((C=a.readToken)==null?void 0:C.call(a))??Wt(),4096);return S?(o=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${S}`}}).then(async g=>{if(!g.ok){const $=new Error(`HA states HTTP ${g.status}`);throw $.status=g.status,$}return g.json()}).then(g=>{const $=Kt(g);return $&&(r=$,s=Date.now()),$||r}).catch(g=>(((g==null?void 0:g.status)===401||(g==null?void 0:g.status)===403)&&(l=Date.now()+i),r)).finally(()=>{o=null}),o):r}return{id:"ha-states",async read(){return h()}}}async function Ee(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=d(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const r=await e(i.toString(),{cache:"no-store"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json();return a.sanitize?a.sanitize(s):s}catch(r){if(a.defaultValue!==void 0)return a.defaultValue;throw r}}function Yt(a){return{id:"json-state",async read(){const e=await Ee({...a,defaultValue:a.defaultValue});return ne(e)}}}function He(a){return{id:"json-control",async read(){const e=await Ee({...a,defaultValue:a.defaultValue??ee});return de(e)}}}function Zt(a){return{id:"json-lines",async read(){const e=await Ee({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>d(t,220)).filter(Boolean):[]}}}function D(a,e,t=64){return d(a[e],t)}function oe(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Xt(a,e="en-US"){const t=d(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function pe(a,e){return!a||!e?null:a[e]||null}function Qt(a,e=null,t="en-US"){var S,C,g,$;const i=D(a,"caption",40)||D(a,"type",24)||"Card",r=D(a,"hint",72),s=D(a,"type",32).toLowerCase()||"entity",o=D(a,"entity",255),l=pe(e,o),h=pe(e,D(a,"stateEntity",255)),n=pe(e,D(a,"downEntity",255)),w=pe(e,D(a,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:D(a,"value",64)||"—",hint:r||"static card"};if(s==="todo"){const k=Number(l==null?void 0:l.state);return!Number.isFinite(k)||k<=0?{caption:i,value:"Clear",hint:r||"nothing pending"}:{caption:i,value:`${k} item${k===1?"":"s"}`,hint:r||"pending tasks"}}if(s==="onoff"){const k=(l==null?void 0:l.state)==="on";return{caption:i,value:k?D(a,"onText",48)||"On":D(a,"offText",48)||"Off",hint:r||"device state"}}if(s==="battery"){const k=oe(l==null?void 0:l.state,0);return{caption:i,value:k?`${k}%`:"—",hint:d(h==null?void 0:h.state,48)||r||"battery level"}}if(s==="network"){const k=oe(n==null?void 0:n.state,0),I=oe(w==null?void 0:w.state,0);return{caption:i,value:k||I?`↓ ${k||"0"} · ↑ ${I||"0"}`:"—",hint:r||"throughput"}}if(s==="time")return{caption:i,value:Xt(l==null?void 0:l.state,t)||"—",hint:r||"next event"};if(s==="percent"){const k=oe(l==null?void 0:l.state,Number(D(a,"digits",4))||0);return{caption:i,value:k?`${k}%`:"—",hint:r||d((S=l==null?void 0:l.attributes)==null?void 0:S.friendly_name,48)||"state percentage"}}if(s==="number"){const k=Number(D(a,"digits",4))||0,I=oe(l==null?void 0:l.state,k),R=D(a,"unit",16)||d((C=l==null?void 0:l.attributes)==null?void 0:C.unit_of_measurement,16);return{caption:i,value:I?`${I}${R?` ${R}`:""}`:"—",hint:r||d((g=l==null?void 0:l.attributes)==null?void 0:g.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||D(a,"value",64)||"—",hint:r||d(($=l==null?void 0:l.attributes)==null?void 0:$.friendly_name,48)||"entity state"}}function ea(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>Qt(i,e,t)):[]}const it={...et,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},rt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},nt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},ta={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},me={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function v(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function st(a){return a.endsWith("/")?a:`${a}/`}function F(a,e){const t=d(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function ot(a){return new URL(".",a).toString()}function aa(a,e){const t=ot(e),i=F(t,d(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:F(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([r,s])=>[r,F(t,s)]).filter(([,r])=>!!r))}}function Se(a){return{...me,...a||{},metrics:{...me.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):me.forecast.map(e=>({...e}))}}function je(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function N(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function ia(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${N(t)} мм рт. ст.`:`${N(t*.750061683,0)} мм рт. ст.`}function ra(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${N(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${N(t/3.6,1)} м/с`:`${N(t,1)} м/с`}function na(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function sa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function oa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function la(a,e="ru-RU"){const t=d(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||d(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function ze(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function da(a,e="./assets/icons"){const t=Number(a),i=st(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function ca(a){const e=d(a.locale,32)||"ru-RU",t=d(a.iconBaseUrl,1024)||"./assets/icons",i=Pe({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var $,k,I,R,H,K,G,q,se,V,p,f,u,y,A,P,L,x,J,Y;const r=await i.read(),s=a.fetchImpl??globalThis.fetch,o=r==null?void 0:r[a.weatherEntity];let l=null;const h=d(a.openMeteoUrl,4096);if(h&&typeof s=="function")try{const c=await s(`${h}${h.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});c.ok&&(l=await c.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const n=d(o==null?void 0:o.last_changed,64)||d(($=l==null?void 0:l.current)==null?void 0:$.time,64)||new Date().toISOString(),w=o?la(o.state,e):ze((k=l==null?void 0:l.current)==null?void 0:k.weather_code,e),S=Array.isArray((I=l==null?void 0:l.daily)==null?void 0:I.time)?l.daily.time.map((c,E)=>{var te,j,Ue,De,Me;const _=new Date(`${c}T12:00:00+03:00`);return{name:_.toLocaleDateString(e,{weekday:"short"}),dayNumber:_.toLocaleDateString(e,{day:"numeric"}),monthShort:_.toLocaleDateString(e,{month:"short"}),note:d(ze((te=l.daily.weather_code)==null?void 0:te[E],e),28),max:`${N((j=l.daily.temperature_2m_max)==null?void 0:j[E])}°`,min:`${N((Ue=l.daily.temperature_2m_min)==null?void 0:Ue[E])}° · ${N((De=l.daily.precipitation_probability_max)==null?void 0:De[E])}%`,icon:da((Me=l.daily.weather_code)==null?void 0:Me[E],t)}}):[],C=S[0]||null,g=S.slice(1,6);return{todayValue:sa(n,e),todayLabel:oa(n,e),updatedAt:na(n,e),temperature:N(((R=o==null?void 0:o.attributes)==null?void 0:R.temperature)??((H=l==null?void 0:l.current)==null?void 0:H.temperature_2m),1),condition:w,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${N(((K=o==null?void 0:o.attributes)==null?void 0:K.apparent_temperature)??((G=l==null?void 0:l.current)==null?void 0:G.apparent_temperature)??((q=o==null?void 0:o.attributes)==null?void 0:q.temperature),1)}°C`,badgeSummary:w,badgeRange:C?`${C.max} / ${N((V=(se=l==null?void 0:l.daily)==null?void 0:se.temperature_2m_min)==null?void 0:V[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${N(((p=o==null?void 0:o.attributes)==null?void 0:p.humidity)??((f=l==null?void 0:l.current)==null?void 0:f.relative_humidity_2m))}%`,pressure:ia(((u=o==null?void 0:o.attributes)==null?void 0:u.pressure)??((y=l==null?void 0:l.current)==null?void 0:y.surface_pressure),((A=o==null?void 0:o.attributes)==null?void 0:A.pressure_unit)??"hPa"),wind:ra(((P=o==null?void 0:o.attributes)==null?void 0:P.wind_speed)??((L=l==null?void 0:l.current)==null?void 0:L.wind_speed_10m),((x=o==null?void 0:o.attributes)==null?void 0:x.wind_speed_unit)??"km/h"),clouds:`${N(((J=o==null?void 0:o.attributes)==null?void 0:J.cloud_coverage)??((Y=l==null?void 0:l.current)==null?void 0:Y.cloud_cover))}%`},forecast:g}}}class ua{constructor(e,t={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"entityMap",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",ee);b(this,"uiControl",ee);b(this,"currentControl",ee);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...it,...t.copy||{}},this.labels={...rt,...t.labels||{}},this.presetLabels={...nt,...t.presetLabels||{}},this.weatherData=Se(t.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="Avatar view presets">
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
            <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="Scene carousel">
              <div class="carousel-track" data-carousel-track></div>
              <div class="carousel-dots" data-dots aria-label="Display pages"></div>
            </div>
          </section>
        </div>
      </div>
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=F(window.location.href,this.getRendererConfigUrl()),t=ot(e),i=$e(await this.readJson(e)),r=$e({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,F(t,l)])),avatar:{...i.avatar,manifestUrl:F(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:F(t,i.scene.configUrl)},state:{...i.state,stateUrl:F(t,i.state.stateUrl),idleLinesUrl:F(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?F(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:F(t,i.control.controlUrl)}});this.rendererConfig=r;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=aa(Xe(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await Zt({url:this.rendererConfig.state.idleLinesUrl||F(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await He({url:this.rendererConfig.control.controlUrl,defaultValue:ee}).read(),this.currentControl=ye(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=ht(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,r;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(r=(i=this.carouselShellEl).setPointerCapture)==null||r.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:r}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(r)>=s*.16,l=r<0?1:-1;if(this.clearDragState(t.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await He({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=ye(ee,this.uiControl),this.currentControl=ye(this.remoteControl,this.uiControl);const e=Qe(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=At(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=be(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const r=this.getOrderedPages(i.pages,i.rotation.order),s=It({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>r.some(l=>l.id===o)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(r,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,r)=>i.kind==="overview"?this.renderOverviewSlide(t,r):this.renderDynamicSlide(i,r,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,r)=>`
      <button
        class="carousel-dot ${r===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${r}"
        aria-label="${v(d(i.title,40)||`Page ${r+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t){const i=d(this.rendererConfig.assistant.name,40)||"Assistant",r=this.weatherData||me,s=r.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="weather" data-slide-order="${t}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${v(r.title)}</h1>
              <p class="subline">${v(r.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${v(r.todayCaption)}</span>
                <span class="value">${v(r.todayValue)}</span>
                <span class="meta">${v(r.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${v(r.updatedCaption)}</span>
                <span class="value">${v(r.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${v(r.temperature)}</span>
                <span class="unit">°${v(r.unit)}</span>
              </div>
              <div class="condition">${v(r.condition)}</div>
              <div class="feels">${v(r.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${v(this.resolveIconUrl("thermometer"))}" alt=""><span>${v(r.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${v(this.resolveIconUrl("calendarDays"))}" alt=""><span>${v(r.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${v(e.caption)}</strong>
                  <div class="neiri-label">${v(e.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${v(this.resolveIconUrl("sparkles"))}" alt="${v(i)}"></div>
              </div>
              <div class="neiri-meta">${v(e.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${v(this.labels.humidity)}</span><i><img src="${v(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${v(r.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${v(this.labels.pressure)}</span><i><img src="${v(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${v(r.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${v(this.labels.wind)}</span><i><img src="${v(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${v(r.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${v(this.labels.clouds)}</span><i><img src="${v(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${v(r.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${v(r.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${s}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,t,i){const r=ea(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${t+1} / ${i}`),h=e.cardStyle==="mini"?r.map(S=>`
          <article class="mini-card">
            <span class="caption">${v(S.caption)}</span>
            <strong>${v(S.value)}</strong>
          </article>
        `).join(""):r.map(S=>`
          <article class="home-card">
            <span class="caption">${v(S.caption)}</span>
            <strong>${v(S.value)}</strong>
            <small>${v(S.hint)}</small>
          </article>
        `).join(""),n=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(S=>this.renderForecastDay(S)).join("")}</div>`:"",w=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
      <section class="slide slide-dynamic" data-slide-id="${v(e.id)}" data-slide-order="${t}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${v(e.kind)}" data-dynamic-card-style="${v(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${v(d(e.title,64)||"Scene")}</h1>
              <p class="subline">${v(d(e.subtitle,140)||"Configured by scene.json")}</p>
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${v(o)}</span>
              <span class="value">${v(l)}</span>
            </div>
          </div>
          ${n}
          <div class="${w}">
            ${h||`<div class="empty">${v(this.labels.noCardsConfigured)}</div>`}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],i=e[e.length-1];return`${d(t.dayNumber,4)} ${d(t.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var r;const t=d((r=this.options.iconUrls)==null?void 0:r[e],1024);return t||`${st(d(this.options.iconBaseUrl,1024)||"./assets")}${ta[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:r,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${r}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,t){const i=t.map(s=>e.find(o=>o.id===s)).filter(Boolean),r=e.filter(s=>!i.some(o=>o.id===s.id));return i.concat(r)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,r;!t&&((r=(i=this.carouselShellEl).hasPointerCapture)!=null&&r.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=be(this.sceneConfig,this.sceneConfig),i=Ct(t.rotation,this.activeIndex,e,r=>this.orderedPages.some(s=>s.id===r));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const r=be(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,r.rotation.defaultDwellMs*2);this.uiControl=vt(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!Lt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=_e(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=_e(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},Tt(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>Yt({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await Jt({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:Pe({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=je(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=je(e,t)}catch{}try{return Se(e)}catch{return Se(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Ot({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return zt({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",r=t.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),r&&(s?(r.src=s,r.removeAttribute("hidden")):(r.src="",r.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function pa(a,e={}){const t=new ua(a,e);return await t.init(),t}const fa=["overview","cards","forecast+cards"],ma=["full","mini"],lt=["entity","text","todo","onoff","battery","network","time","percent","number"],z=["caption","hint"],ga={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},ha={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается честный 1:1 viewport выбранного экрана. Если не влезает по ширине, страница просто прокручивается.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Подставить в настройки экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Выбор Live2D-модели для текущего instance-pack. Применяется после сохранения и перезагрузки превью.",avatarPack:"Набор аватара",avatarPackCurrent:"Текущий avatar.manifest.json instance-pack",avatarPackHint:"Другие модели лежат отдельно в /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"В каталоге avatar-packs пока нет отдельных моделей.",avatarPackAppliedAfterSave:"Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",avatarPackDefaultTile:"Текущий instance-pack",avatarPackDefaultHint:"Оставить аватар из scene-pack без отдельного avatar-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Будет применён после сохранения",avatarPackMotionCount:a=>`${a} motion`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Импорт аватара",avatarImportHint:"Загрузи zip-архив с Live2D-моделью. Kiosk Scene сам распакует его в avatar-packs, найдёт model3.json и создаст draft motion-map.",avatarImportSelect:"ZIP архив аватара",avatarImportSelected:a=>`Выбран архив: ${a}`,avatarImportButton:"Импортировать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:a=>`Импортирован avatar-pack: ${a}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для semantic cue/activity в runtime.",avatarMappingEmpty:"Выбери отдельный avatar-pack, чтобы редактировать его motion-map.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Idle / ожидание",avatarSemanticTouch:"Touch / касание",avatarSemanticReplySoft:"Reply soft / мягкий ответ",avatarSemanticThink:"Think / размышление",avatarSemanticBusy:"Busy / занята",avatarSemanticCalm:"Calm / спокойствие",avatarSemanticHappy:"Happy / радость",avatarSemanticSurprise:"Surprise / удивление",avatarSemanticWarning:"Warning / предупреждение",avatarSemanticGreet:"Greet / приветствие",avatarSemanticSpeaking:"Speaking / говорит",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardsSubtitle:"Сначала выбери или добавь карточку, затем настрой её ниже. Порядок здесь же влияет на правую карусель.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку из шаблона выше или выбери существующую карточку из списка.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingActive:(a,e)=>`Сейчас связываем: ${a} → ${e}`,noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage renders a true 1:1 viewport of the selected screen. If it does not fit, the editor page simply scrolls.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Fill display settings below",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the Live2D model for this instance-pack. It applies after save and preview reload.",avatarPack:"Avatar pack",avatarPackCurrent:"Use the instance-pack avatar.manifest.json",avatarPackHint:"Additional models live in /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"No separate avatar packs are available yet.",avatarPackAppliedAfterSave:"The selected avatar pack will apply after saving and reloading the preview.",avatarPackDefaultTile:"Current instance-pack",avatarPackDefaultHint:"Keep the avatar bundled directly with the scene pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Will apply after save",avatarPackMotionCount:a=>`${a} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Import avatar",avatarImportHint:"Upload a Live2D zip archive. Kiosk Scene will unpack it into avatar-packs, detect model3.json and create a draft motion map.",avatarImportSelect:"Avatar ZIP archive",avatarImportSelected:a=>`Selected archive: ${a}`,avatarImportButton:"Import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:a=>`Imported avatar pack: ${a}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map semantic cue/activity slots to actual model motions used by the runtime.",avatarMappingEmpty:"Choose a separate avatar pack to edit its motion map.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardsSubtitle:"Add or choose a card first, then edit it below. The order here drives the right-hand carousel.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card from the templates above or choose an existing one from the list.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingActive:(a,e)=>`Binding now: ${a} → ${e}`,noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},va=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],ge=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],he="mellow-fly-7";function Ce(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Ve(a){return ge.find(e=>e.id===a)||ge.find(e=>e.id===he)||ge[0]}function ya(a){return`${a.width} × ${a.height}`}function m(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ae(a){return JSON.parse(JSON.stringify(a))}function O(a){const e=new Map(a.pages.map(r=>[r.id,r])),t=a.rotation.order.map(r=>e.get(r)).filter(Boolean),i=a.pages.filter(r=>!t.some(s=>s.id===r.id));return[...t,...i]}function ba(a,e){return e?Math.max(0,O(a).findIndex(t=>t.id===e)):0}function wa(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function dt(a,e){const t=wa(e);let i=t,r=2;for(;a.pages.some(s=>s.id===i);)i=`${t}-${r}`,r+=1;return i}function Sa(a){const e=a.pages.length+1;return{id:dt(a,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function We(a){switch(a){case"text":return{type:a,caption:"Text",value:"—",hint:""};case"todo":return{type:a,caption:"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:a,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:"Time",entity:"",hint:""};case"percent":return{type:a,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function M(a,e){const t=a[e];return t==null?"":String(t)}function W(a,e){const t=a[e];return t==null?"":String(t)}function X(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function ct(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function xe(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function Ke(a){return a.avatar||(a.avatar={}),a.avatar}function xa(a,e){const t=ct(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function ka(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function $a(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Ca(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&O(a).some(r=>r.id===t)?t:((i=O(a)[0])==null?void 0:i.id)||null}async function Ia(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return Ae(t.config)}async function Pa(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return Ae(i.config)}function Te(a){switch(a){case"text":return[...z,"value"];case"todo":return[...z,"entity"];case"onoff":return[...z,"entity","onText","offText"];case"battery":return[...z,"entity","stateEntity"];case"network":return[...z,"downEntity","upEntity"];case"time":return[...z,"entity"];case"percent":return[...z,"entity","digits"];case"number":return[...z,"entity","digits","unit"];default:return[...z,"entity"]}}function Ge(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function re(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function ut(a){const e=Ce();return ga[e][a]||""}function ve(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Ea(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),r=a.includes(".")&&a.split(".",1)[0]||"other",s=String(e.state||""),o=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:r,state:s,unit:o}}function Aa(a){return a?Object.entries(a).map(([e,t])=>Ea(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function Ta(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function qe(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(r=>({id:String(r.id||"").trim(),name:String(r.name||r.id||"").trim(),manifestUrl:String(r.manifestUrl||"").trim(),previewUrl:String(r.previewUrl||"").trim(),motionCount:Number(r.motionCount||0),capabilities:typeof r.capabilities=="object"&&r.capabilities?{supportsMotion:!!r.capabilities.supportsMotion,supportsEmotion:!!r.capabilities.supportsEmotion,supportsLipSync:!!r.capabilities.supportsLipSync}:void 0})).filter(r=>r.id&&r.manifestUrl):[]}async function La(a,e){const t=String(a||"").trim();if(!t)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const r=await fetch(t,{method:"POST",body:i}),s=await r.json();if(!r.ok||s.success===!1||!s.item)throw new Error(String(s.error||`HTTP ${r.status}`));return{id:String(s.item.id||"").trim(),name:String(s.item.name||s.item.id||"").trim(),manifestUrl:String(s.item.manifestUrl||"").trim(),previewUrl:String(s.item.previewUrl||"").trim(),motionCount:Number(s.item.motionCount||0),capabilities:typeof s.item.capabilities=="object"&&s.item.capabilities?{supportsMotion:!!s.item.capabilities.supportsMotion,supportsEmotion:!!s.item.capabilities.supportsEmotion,supportsLipSync:!!s.item.capabilities.supportsLipSync}:void 0}}async function Ua(a,e){var o,l,h,n;const t=String(a||"").trim(),i=String(e||"").trim();if(!t||!i)throw new Error("Avatar pack API is not configured.");const r=await fetch(`${t}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await r.json();if(!r.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${r.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((o=s.motionMap)==null?void 0:o.motions)?(l=s.motionMap)==null?void 0:l.motions.map(w=>({index:Number(w.index),id:String(w.id||"").trim(),label:String(w.label||w.id||"").trim(),group:String(w.group||"").trim(),tags:Array.isArray(w.tags)?w.tags.map(S=>String(S||"").trim()).filter(Boolean):[]})).filter(w=>Number.isFinite(w.index)):[],semantic:typeof((h=s.motionMap)==null?void 0:h.semantic)=="object"&&((n=s.motionMap)!=null&&n.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function Da(a,e){var s,o,l;const t=String(a||"").trim();if(!t||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${t}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),r=await i.json();if(!i.ok||r.success===!1||!r.packId)throw new Error(String(r.error||`HTTP ${i.status}`));return{packId:String(r.packId||"").trim(),manifest:r.manifest||e.manifest,motionMap:{motions:Array.isArray((s=r.motionMap)==null?void 0:s.motions)?r.motionMap.motions:e.motionMap.motions,semantic:typeof((o=r.motionMap)==null?void 0:o.semantic)=="object"&&((l=r.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(r.motionMap.semantic)):e.motionMap.semantic}}}function Ma(a){if(Array.isArray(a)){const e=a.find(t=>Number.isFinite(Number(t)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(a))?String(Number(a)):""}function Na(a,e){const t=a[e.labelKey];return typeof t=="string"?t:e.key}function Ra(a,e){const t=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${a.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${va.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${m(i.key)}">${m(Na(a,i))}</label>
            <select id="avatar-semantic-${m(i.key)}" data-avatar-semantic="${m(i.key)}">
              <option value="">${m(a.avatarMotionNone)}</option>
              ${t.map(r=>`
                <option value="${m(String(r.index))}"${Ma(e.motionMap.semantic[i.key])===String(r.index)?" selected":""}>
                  ${m(`${r.label||r.id} · #${r.index}`)}
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
              <strong>${m(i.label||i.id||`Motion ${i.index}`)}</strong>
              <span class="meta">${m(`${a.avatarMappingMotion} #${i.index} · ${i.group||"motion"}`)}</span>
              <code>${m(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${a.avatarMappingSaveHint}</div>
    </div>
  `}function Je(a,e,t){var n,w,S;const i=(e==null?void 0:e.id)||"",r=t===i,s=(e==null?void 0:e.name)||a.avatarPackDefaultTile,o=(e==null?void 0:e.id)||a.avatarPackCurrent,l=(e==null?void 0:e.previewUrl)||"",h=e?[e.motionCount>0?a.avatarPackMotionCount(e.motionCount):"",(n=e.capabilities)!=null&&n.supportsMotion?a.avatarCapabilityMotion:"",(w=e.capabilities)!=null&&w.supportsEmotion?a.avatarCapabilityEmotion:"",(S=e.capabilities)!=null&&S.supportsLipSync?a.avatarCapabilityLipSync:""].filter(Boolean):[a.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${r?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${l?`<img src="${m(l)}" alt="${m(s)}">`:`<span>${m(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${m(s)}</strong>
        <div class="meta">${m(o)}</div>
        <div class="avatar-pack-card-meta">
          ${h.map(C=>`<span>${m(C)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${r?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${m(i)}">
          ${m(r?a.avatarPackSelected:a.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function Le(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function Ba(a,e,t,i){if(!e||t===null)return`<div class="meta">${m(a.entityBindingEmpty)}</div>`;const r=Te(M(e,"type")||"entity").filter(s=>Le(s));return r.length?`
    <div class="binding-targets">
      ${r.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===t&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${t}" data-binding-field="${m(s)}">
            ${m(ve(a,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${m(a.entityBindingEmpty)}</div>`}function Ye(a){return Te(a).find(e=>Le(e))||null}function ae(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${m(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${m(e)}" value="${m(t)}">
    </div>
  `}function Q(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${m(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${m(e)}" value="${m(t)}">
    </div>
  `}function Ze(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${m(a)}</label>
      <select id="page-select-${e}" data-page-field="${m(e)}">
        ${i.map(r=>`<option value="${m(r.value)}"${r.value===t?" selected":""}>${m(r.label)}</option>`).join("")}
      </select>
    </div>
  `}function Fa(a,e,t,i){const r=M(e,"type")||"entity",s=Te(r);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${m(M(e,"caption")||re(a,r))}</strong>
          <div class="meta">${m(re(a,r))}</div>
        </div>
        <div class="meta">#${t+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${m(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${lt.map(o=>`<option value="${o}"${o===r?" selected":""}>${m(re(a,o))}</option>`).join("")}
          </select>
        </div>
        ${s.map(o=>{const l=Le(o),h=l&&(i==null?void 0:i.cardIndex)===t&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${h?" is-active":""}">
                <label>${m(ve(a,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${m(o)}"
                    data-binding-field="${m(o)}"
                    value="${m(M(e,o))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${t}"
                    data-binding-field="${m(o)}"
                  >${a.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${o==="hint"?"is-wide":""}">
              <label>${m(ve(a,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${m(o)}"
                value="${m(M(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function _a(a,e,t,i,r){const s=M(e,"type")||"entity",o=M(e,"caption")||re(a,s),l=M(e,"entity")||M(e,"stateEntity")||M(e,"downEntity")||M(e,"upEntity")||M(e,"value")||M(e,"hint")||ut(s);return`
    <article class="card-list-item${r?" is-active":""}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${t}">
        <strong>${m(o)}</strong>
        <span class="meta">${m(re(a,s))}</span>
        <div class="meta">${m(l)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
      </div>
    </article>
  `}function Oa(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${m(e)}"
    >
      <strong>${m(re(a,e))}</strong>
      <span>${m(ut(e))}</span>
    </button>
  `}function Ha(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function ja(a){var V;const e=ha[Ce()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const r=document.createElement("section");r.id="scene-editor-shell",r.innerHTML=`
    <style>
      #scene-editor-shell {
        max-width: 1420px;
        margin: 0 auto;
        padding: 24px 18px 64px;
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
        overflow-x: auto;
        overflow-y: hidden;
        padding: 4px 0 8px;
      }
      #scene-editor-shell .scene-preview-stage {
        overflow: hidden;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.1);
        background: #e6eef4;
        display: block;
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
      #scene-editor-shell .page-list,
      #scene-editor-shell .cards-list,
      #scene-editor-shell .scene-settings-stack {
        display: grid;
        gap: 10px;
      }
      #scene-editor-shell .ha-list {
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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
      #scene-editor-shell .page-chip.is-active {
        border-color: rgba(77,147,121,0.34);
        box-shadow: 0 0 0 2px rgba(111,191,162,0.18);
      }
      #scene-editor-shell .card-list-item.is-active {
        border-color: rgba(77,147,121,0.34);
        box-shadow: 0 0 0 2px rgba(111,191,162,0.18);
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
        font: 12px/1.25 Consolas, monospace;
        color: #385268;
      }
      #scene-editor-shell code {
        font: 12px/1.25 Consolas, monospace;
        color: #385268;
      }
      #scene-editor-shell .ha-entity-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }
      #scene-editor-shell .ha-state {
        font: 12px/1.3 "Aptos","Segoe UI",sans-serif;
        color: #4f6a7c;
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
                ${ge.map(p=>`<option value="${m(p.id)}">${m(p.label[Ce()])}</option>`).join("")}
              </select>
            </div>
            <div class="scene-preview-resolution">
              <span>${e.previewResolution}</span>
              <strong data-preview-resolution>1920 × 1080</strong>
            </div>
            <button class="scene-editor-button" type="button" data-action="apply-display-profile">${e.previewApplyProfile}</button>
          </div>
        </div>
        <div class="scene-preview-frame">
          <div class="scene-preview-stage" data-preview-stage></div>
        </div>
      </section>
      <section class="scene-dashboard" data-dashboard></section>
    </div>
  `,document.body.appendChild(r),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=r.querySelector("[data-preview-stage]"),o=r.querySelector("[data-preview-resolution]"),l=r.querySelector("[data-preview-display]"),h=r.querySelector("[data-dashboard]");if(!s||!o||!l||!h)throw new Error("Missing native editor shell elements");s.appendChild(t);const n={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:he,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},w=async p=>{const f=String(p||"").trim();if(!f||!a.avatarPackApiUrl){n.avatarPackDetails=null,n.avatarPackLoading=!1,n.avatarPackDirty=!1;return}n.avatarPackLoading=!0,g();try{n.avatarPackDetails=await Ua(a.avatarPackApiUrl,f),n.avatarPackDirty=!1}catch(u){n.avatarPackDetails=null,n.avatarPackDirty=!1,$(`${e.avatarMappingLoadError}: ${String(u)}`,"bad")}finally{n.avatarPackLoading=!1}},S=()=>{const p=Ve(n.previewDisplayId);l.value=p.id,o.textContent=ya(p),s.style.width=`${p.width}px`,s.style.height=`${p.height}px`,t.style.width=`${p.width}px`,t.style.height=`${p.height}px`},C=typeof ResizeObserver<"u"?new ResizeObserver(()=>S()):null;C==null||C.observe(s);const g=()=>{const p=n.config,f=p?O(p):[],u=f.find(c=>c.id===n.selectedPageId)||f[0]||null,y=Array.isArray(u==null?void 0:u.cards)?u.cards:[],A=n.selectedCardIndex!==null&&y[n.selectedCardIndex]||null,P=Ta(n.haEntities,n.entitySearch),L=n.focusedBinding?e.entityBindingActive(M(y[n.focusedBinding.cardIndex],"caption")||`${e.cards} #${n.focusedBinding.cardIndex+1}`,ve(e,n.focusedBinding.field)):e.entityBindingEmpty,x=p?xe(p):"",J=n.pendingAvatarZipName?e.avatarImportSelected(n.pendingAvatarZipName):e.avatarImportHint,Y=n.avatarImportStatus?`<div class="scene-editor-status" data-tone="${n.avatarImportTone}">${m(n.avatarImportStatus)}</div>`:"";h.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${n.statusTone}">${m(n.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${m(a.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${n.saving||n.avatarPackSaving||!p?" disabled":""}>${n.saving||n.avatarPackSaving?e.saving:e.save}</button>
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
              <div class="meta">${n.avatarCatalog.length?e.avatarPackHint:e.avatarPackEmpty}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${Je(e,null,x)}
                ${n.avatarCatalog.map(c=>Je(e,c,x)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label for="avatar-pack-archive">${e.avatarImportSelect}</label>
                <input id="avatar-pack-archive" type="file" accept=".zip,application/zip" data-avatar-archive>
              </div>
              <div class="meta">${m(J)}</div>
              <div class="page-chip-actions">
                <button class="scene-editor-button" type="button" data-action="import-avatar"${n.avatarImporting||!n.pendingAvatarZip||!a.avatarImportUrl?" disabled":""}>
                  ${n.avatarImporting?e.avatarImporting:e.avatarImportButton}
                </button>
              </div>
              ${Y}
            </div>
            ${x?n.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:n.avatarPackDetails?Ra(e,n.avatarPackDetails):`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`:`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(a.packId)}</div>
            </div>
            <div class="page-list">
            ${f.map((c,E)=>`
              <article class="page-chip ${c.id===((u==null?void 0:u.id)||"")?"is-active":""}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${m(c.id)}">
                  <strong>${m(c.title||c.id||`Page ${E+1}`)}</strong>
                  <span class="meta">${m(Ge(e,c.kind))} · ${m(e.pageCards(Array.isArray(c.cards)?c.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${m(c.id)}"${E===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${m(c.id)}"${E===f.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${m(c.id)}"${f.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.inspector}</h2>
              <div class="meta">${e.pageSettings}</div>
            </div>
          ${u?`
            <div class="inspector-grid">
              ${ae(e.fieldPageId,"id",W(u,"id"),!0)}
              ${Ze(e.fieldKind,"kind",W(u,"kind"),fa.map(c=>({value:c,label:Ge(e,c)})))}
              ${ae(e.fieldTitle,"title",W(u,"title"),!0)}
              ${ae(e.fieldSubtitle,"subtitle",W(u,"subtitle"),!0)}
              ${ae(e.fieldSlot,"slot",W(u,"slot"))}
              ${Ze(e.fieldCardStyle,"cardStyle",W(u,"cardStyle")||"full",ma.map(c=>({value:c,label:c==="mini"?e.styleMini:e.styleFull})))}
              ${ae(e.fieldStampCaption,"stampCaption",W(u,"stampCaption"))}
              ${ae(e.fieldStampValue,"stampValue",W(u,"stampValue"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.cards}</h2>
              <div class="meta">${e.cardsSubtitle}</div>
            </div>
          ${u?`
            <div class="card-stack">
              <div>
                <div class="meta">${e.cardTemplates}</div>
                <div class="card-template-grid" style="margin-top:12px;">
                  ${lt.map(c=>Oa(e,c)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${y.length?y.map((c,E)=>_a(e,c,E,y.length,E===n.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${A?Fa(e,A,n.selectedCardIndex||0,n.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              ${Q(e.fieldDisplaySafeTop,"safeTop",X(p,"safeTop"))}
              ${Q(e.fieldDisplaySafeRight,"safeRight",X(p,"safeRight"))}
              ${Q(e.fieldDisplaySafeBottom,"safeBottom",X(p,"safeBottom"))}
              ${Q(e.fieldDisplaySafeLeft,"safeLeft",X(p,"safeLeft"))}
              ${Q(e.fieldDisplayPadding,"layoutPaddingPx",X(p,"layoutPaddingPx"))}
              ${Q(e.fieldDisplayGap,"layoutGapPx",X(p,"layoutGapPx"))}
              ${Q(e.fieldDisplayScale,"globalScale",X(p,"globalScale"))}
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
            ${Ba(e,A,n.selectedCardIndex,n.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${m(n.entitySearch)}">
          </div>
          <div class="ha-list">
            ${P.length?P.map(c=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${m(c.name)}</strong>
                    <div class="meta">${m(c.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${m(c.entityId)}"${n.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${m(c.entityId)}</code>
                <div class="ha-state">${m(c.state)}${c.unit?` · ${m(c.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `,S()},$=(p,f)=>{n.status=p,n.statusTone=f,g()},k=()=>{if(!n.config)return;const p=O(n.config);if(!p.length){n.selectedPageId=null;return}(!n.selectedPageId||!p.some(y=>y.id===n.selectedPageId))&&(n.selectedPageId=p[0].id);const f=p.find(y=>y.id===n.selectedPageId)||null,u=Array.isArray(f==null?void 0:f.cards)?f.cards:[];u.length?(n.selectedCardIndex===null||n.selectedCardIndex>=u.length)&&(n.selectedCardIndex=0):(n.selectedCardIndex=null,n.focusedBinding=null),$a(n.selectedPageId),ka(ba(n.config,n.selectedPageId))},I=()=>{n.dirty=!0,$(e.statusDirty,"muted")},R=()=>{const p=new URL(window.location.href);p.searchParams.set("editor","1"),n.selectedPageId&&p.searchParams.set("editorPage",n.selectedPageId),p.searchParams.set("v",String(Date.now())),window.location.replace(p.toString())},H=(p,f)=>{if(!n.config||!n.selectedPageId)return;const u=n.config.pages.find(y=>y.id===n.selectedPageId);if(u){if(p==="slot")u.slot=f===""?void 0:Number(f);else if(p==="id"){const y=dt(n.config,f||"page"),A=u.id;u.id=y,n.config.rotation.order=n.config.rotation.order.map(P=>P===A?y:P),n.selectedPageId=y}else p==="title"||p==="subtitle"||p==="stampCaption"||p==="stampValue"?u[p]=f:p==="kind"?u.kind=f:p==="cardStyle"&&(u.cardStyle=f);I(),k()}},K=(p,f)=>{if(!n.config)return;const u=ct(n.config),y=u.safeArea||{},A=f===""?null:Number(f),P=Number.isFinite(A)?A:null;p==="safeTop"?y.top=P??0:p==="safeRight"?y.right=P??0:p==="safeBottom"?y.bottom=P??0:p==="safeLeft"?y.left=P??0:p==="layoutPaddingPx"?u.layoutPaddingPx=P??16:p==="layoutGapPx"?u.layoutGapPx=P??16:p==="globalScale"&&(u.globalScale=P??1),u.safeArea=y,I()},G=(p,f,u)=>{var P;if(!n.config||!n.selectedPageId)return;const y=n.config.pages.find(L=>L.id===n.selectedPageId);if(!y)return;Array.isArray(y.cards)||(y.cards=[]);const A=y.cards[p];if(A){if(f==="type"){const L=We(u);if(y.cards[p]={...L,caption:M(A,"caption")||L.caption},((P=n.focusedBinding)==null?void 0:P.cardIndex)===p){const x=Ye(u);n.focusedBinding=x?{cardIndex:p,field:x}:null}}else f==="digits"?A[f]=u===""?0:Number(u):A[f]=u;I()}},q=p=>{if(!n.config||!n.selectedPageId||!n.focusedBinding)return;const f=n.config.pages.find(A=>A.id===n.selectedPageId),u=n.haEntities.find(A=>A.entityId===p);if(!f||!Array.isArray(f.cards)||!u)return;const y=f.cards[n.focusedBinding.cardIndex];y&&(Ha(y,n.focusedBinding.field,u),I(),g())},se=(p,f)=>{n.selectedCardIndex=p,n.focusedBinding={cardIndex:p,field:f},g(),window.requestAnimationFrame(()=>{const u=r.querySelector("#ha-entity-search");u==null||u.scrollIntoView({behavior:"smooth",block:"center"}),u==null||u.focus(),u==null||u.select()})};r.addEventListener("click",async p=>{var J,Y;const f=p.target,u=f==null?void 0:f.closest("[data-action]"),y=u==null?void 0:u.dataset.action;if(!y)return;if(y==="apply-display-profile"&&n.config){xa(n.config,Ve(n.previewDisplayId)),I(),g();return}if(y==="import-avatar"){if(!n.config||!a.avatarImportUrl||!n.pendingAvatarZip||n.avatarImporting)return;n.avatarImporting=!0,n.avatarImportStatus=e.avatarImporting,n.avatarImportTone="muted",g();try{const c=await La(a.avatarImportUrl,n.pendingAvatarZip);n.avatarCatalog=a.avatarCatalogUrl?await qe(a.avatarCatalogUrl):[c],Ke(n.config).packId=c.id,await w(c.id),n.pendingAvatarZip=null,n.pendingAvatarZipName="",n.avatarImporting=!1,n.avatarImportStatus=e.avatarImportSuccess(c.name||c.id),n.avatarImportTone="ok",I(),g()}catch(c){n.avatarImporting=!1,n.avatarImportStatus=`${e.avatarImportError}: ${String(c)}`,n.avatarImportTone="bad",g()}return}if(!n.config)return;const A=O(n.config),P=(u==null?void 0:u.dataset.pageId)||null,L=P?A.findIndex(c=>c.id===P):-1;if(y==="select-page"&&P){n.selectedPageId=P,n.selectedCardIndex=0,n.focusedBinding=null,k(),g();return}if(y==="page-up"&&L>0){const c=A.map(E=>E.id);[c[L-1],c[L]]=[c[L],c[L-1]],n.config.rotation.order=c,n.selectedPageId=P,I(),k(),g();return}if(y==="page-down"&&L>=0&&L<A.length-1){const c=A.map(E=>E.id);[c[L],c[L+1]]=[c[L+1],c[L]],n.config.rotation.order=c,n.selectedPageId=P,I(),k(),g();return}if(y==="page-remove"&&P&&A.length>1){n.config.pages=n.config.pages.filter(c=>c.id!==P),n.config.rotation.order=O(n.config).map(c=>c.id),n.selectedPageId=((J=O(n.config)[Math.max(0,L-1)])==null?void 0:J.id)||((Y=O(n.config)[0])==null?void 0:Y.id)||null,n.selectedCardIndex=0,n.focusedBinding=null,I(),k(),g();return}if(y==="add-page"){const c=Sa(n.config);n.config.pages.push(c),n.config.rotation.order=O(n.config).map(E=>E.id),n.selectedPageId=c.id,n.selectedCardIndex=null,n.focusedBinding=null,I(),k(),g();return}if(y==="add-card-template"&&n.selectedPageId){const c=n.config.pages.find(_=>_.id===n.selectedPageId),E=(u==null?void 0:u.dataset.cardType)||"entity";if(c){Array.isArray(c.cards)||(c.cards=[]),c.cards.push(We(E));const _=c.cards.length-1;n.selectedCardIndex=_;const te=Ye(E);n.focusedBinding=te?{cardIndex:_,field:te}:null,I(),g(),te&&window.requestAnimationFrame(()=>{const j=r.querySelector("#ha-entity-search");j==null||j.scrollIntoView({behavior:"smooth",block:"center"}),j==null||j.focus()})}return}if(y==="focus-binding"){const c=Number((u==null?void 0:u.dataset.cardIndex)||"-1"),E=(u==null?void 0:u.dataset.bindingField)||"";c>=0&&E&&se(c,E);return}const x=Number((u==null?void 0:u.dataset.cardIndex)||"-1");if(x>=0&&n.selectedPageId){const c=n.config.pages.find(E=>E.id===n.selectedPageId);if(!c||!Array.isArray(c.cards))return;if(y==="select-card"){n.selectedCardIndex=x,g();return}if(y==="card-remove"){c.cards=c.cards.filter((E,_)=>_!==x),n.selectedCardIndex!==null&&(n.selectedCardIndex===x?n.selectedCardIndex=c.cards.length?Math.min(x,c.cards.length-1):null:n.selectedCardIndex>x&&(n.selectedCardIndex-=1)),n.focusedBinding&&(n.focusedBinding.cardIndex===x?n.focusedBinding=null:n.focusedBinding.cardIndex>x&&(n.focusedBinding={cardIndex:n.focusedBinding.cardIndex-1,field:n.focusedBinding.field})),I(),g();return}if(y==="card-up"&&x>0){[c.cards[x-1],c.cards[x]]=[c.cards[x],c.cards[x-1]],n.selectedCardIndex===x?n.selectedCardIndex=x-1:n.selectedCardIndex===x-1&&(n.selectedCardIndex=x),n.focusedBinding&&(n.focusedBinding.cardIndex===x?n.focusedBinding={cardIndex:x-1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===x-1&&(n.focusedBinding={cardIndex:x,field:n.focusedBinding.field})),I(),g();return}if(y==="card-down"&&x<c.cards.length-1){[c.cards[x],c.cards[x+1]]=[c.cards[x+1],c.cards[x]],n.selectedCardIndex===x?n.selectedCardIndex=x+1:n.selectedCardIndex===x+1&&(n.selectedCardIndex=x),n.focusedBinding&&(n.focusedBinding.cardIndex===x?n.focusedBinding={cardIndex:x+1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===x+1&&(n.focusedBinding={cardIndex:x,field:n.focusedBinding.field})),I(),g();return}}if(y==="save"){n.saving=!0,n.avatarPackSaving=n.avatarPackDirty,$(e.saving,"muted");try{if(n.avatarPackDirty&&n.avatarPackDetails&&a.avatarPackApiUrl){try{n.avatarPackDetails=await Da(a.avatarPackApiUrl,n.avatarPackDetails)}catch(c){throw new Error(`${e.avatarMappingSaveError}: ${String(c)}`)}n.avatarPackDirty=!1}n.config=await Pa(a.sceneApiUrl,Ae(n.config)),n.dirty=!1,n.saving=!1,n.avatarPackSaving=!1,k(),$(e.statusSaved,"ok"),window.setTimeout(()=>R(),250)}catch(c){n.saving=!1,n.avatarPackSaving=!1,$(`${e.saveError}: ${String(c)}`,"bad")}return}if(y==="bind-entity"){const c=(u==null?void 0:u.dataset.entityId)||"";q(c)}}),r.addEventListener("input",p=>{const f=p.target;if(!f||!n.config){f!=null&&f.dataset.previewDisplay&&(n.previewDisplayId=f.value||he,S());return}if(f.dataset.previewDisplay){n.previewDisplayId=f.value||he,S();return}if(f.dataset.avatarSemantic!==void 0){const u=xe(n.config);if(!n.avatarPackDetails||!u||n.avatarPackDetails.packId!==u)return;const y=f.value.trim();y?n.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic]=Number(y):delete n.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic],n.avatarPackDirty=!0,$(e.statusDirty,"muted"),g();return}if(f.dataset.pageField){H(f.dataset.pageField,f.value),g();return}if(f.dataset.displayField){K(f.dataset.displayField,f.value),g();return}if(f.dataset.cardField&&f.dataset.cardIndex){n.selectedCardIndex=Number(f.dataset.cardIndex),G(Number(f.dataset.cardIndex),f.dataset.cardField,f.value),g();return}f.hasAttribute("data-ha-search")&&(n.entitySearch=f.value,g())}),r.addEventListener("click",p=>{var y;const f=(y=p.target)==null?void 0:y.closest("[data-action='select-avatar-pack']");if(!f||!n.config)return;const u=String(f.dataset.packId||"").trim();Ke(n.config).packId=u||null,I(),w(u||null).finally(()=>g()),g()}),r.addEventListener("change",p=>{var y;const f=p.target;if(!(f!=null&&f.dataset.avatarArchive))return;const u=((y=f.files)==null?void 0:y[0])||null;n.pendingAvatarZip=u,n.pendingAvatarZipName=(u==null?void 0:u.name)||"",n.avatarImportStatus="",n.avatarImportTone="muted",g()}),r.addEventListener("focusin",p=>{const f=p.target;if(!(f!=null&&f.dataset.bindingField))return;const u=Number(f.dataset.cardIndex||"-1");u<0||(n.selectedCardIndex=u,n.focusedBinding={cardIndex:u,field:f.dataset.bindingField})});try{if(n.config=await Ia(a.sceneApiUrl),a.avatarCatalogUrl)try{n.avatarCatalog=await qe(a.avatarCatalogUrl)}catch{n.avatarCatalog=[]}n.haEntities=Aa(((V=at())==null?void 0:V.states)||null),n.selectedPageId=Ca(n.config),n.selectedCardIndex=0,n.status=e.statusSaved,n.statusTone="ok",await w(xe(n.config)),k()}catch(p){n.status=`${e.loadError}: ${String(p)}`,n.statusTone="bad"}g()}const za="../scene-api/bootstrap",Va="weather.forecast_home_assistant",Wa="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ka={...it,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Ga={...rt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},qa={...nt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Ja={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Ya={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Za(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Xa(){return new URLSearchParams(window.location.search).get("bootstrap")||za}function Qa(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function U(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const r=Qa(e);if(r)return new URL(t.slice(1),r).toString()}return new URL(t,i).toString()}function Ie(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function ei(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function ti(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function ke(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function ai(a,e){var t,i,r,s,o,l,h,n;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([w,S])=>[w,U(S,e)]).filter(([,w])=>!!w)),avatar:{manifestUrl:U(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:U(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((r=a.state)==null?void 0:r.provider)||"json",stateUrl:U(String(((s=a.state)==null?void 0:s.stateUrl)||"").trim(),e),haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:U(String(((l=a.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:U(String(((h=a.state)==null?void 0:h.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:U(String(((n=a.control)==null?void 0:n.controlUrl)||"").trim(),e)}}}async function ii(a,e){var n,w,S,C;const t=U(String(((n=a.files)==null?void 0:n.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=U(String(((w=a.files)==null?void 0:w.sceneConfigUrl)||"").trim(),e),r=U(String(((S=a.files)==null?void 0:S.avatarCatalogUrl)||"").trim(),e);if(!i||!r)return t;let s="";try{const g=await ke(i);s=String(((C=g.avatar)==null?void 0:C.packId)||"").trim()}catch{s=""}if(!s)return t;let o="";try{const g=await ke(r),$=Array.isArray(g.items)?g.items.find(k=>String(k.id||"").trim()===s):null;o=U(String(($==null?void 0:$.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return t;const h={...ai(await ke(t),t),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(h)],{type:"application/json"}))}const le=document.getElementById("app");if(!le)throw new Error("Missing #app root element");const ie=Ya[Za()];Ie(le,ie.startingTitle,ie.startingBody);(async()=>{var e,t,i;const a=Xa();try{const r=await ti(a),s=String(r.packId||"").trim(),o=s.toLowerCase()==="neiri",l=await ii(r,a);if(!l){Ie(le,ie.missingRendererTitle,ie.missingRendererBody,JSON.stringify(r,null,2));return}document.documentElement.dataset.packId=s,document.title=o?"Нейри":s?`kiosk-scene hosted runtime (${s})`:"kiosk-scene hosted runtime",await pa(le,{rendererConfigUrl:l,weatherUrl:o?"./weather.json":void 0,weatherReader:o?ca({weatherEntity:Va,openMeteoUrl:Wa,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:o?Ka:void 0,labels:o?Ga:void 0,presetLabels:o?qa:void 0,defaultWeather:o?Ja:void 0}),ei()&&await ja({packId:s,sceneApiUrl:U(String(r.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:U(String(((e=r.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),avatarImportUrl:U(String(((t=r.files)==null?void 0:t.avatarImportUrl)||"").trim(),a),avatarPackApiUrl:U(String(((i=r.files)==null?void 0:i.avatarPackApiUrl)||"").trim(),a),sceneUrl:U(String(r.entryUrl||r.runtimeBaseUrl||"./").trim(),a)})}catch(r){Ie(le,ie.failedTitle,ie.failedBody,String(r))}})();
