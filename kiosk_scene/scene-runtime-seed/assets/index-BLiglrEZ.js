var wt=Object.defineProperty;var St=(a,e,t)=>e in a?wt(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var b=(a,e,t)=>St(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function U(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function d(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function je(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ge(a,e){if(!U(a)||!U(e))return e??a;const t={...a};for(const[i,r]of Object.entries(e)){if(Array.isArray(r)){t[i]=r.slice();continue}if(U(r)&&U(t[i])){t[i]=ge(t[i],r);continue}t[i]=r}return t}function xt(a,e=40){return Array.isArray(a)?a.map(t=>d(t,e).toLowerCase()).filter(Boolean):[]}const ee={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},ze={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function De(a){var t,i,r,s,o,l,f,n,w,S;const e=ge(ee,U(a)?a:{});return{version:1,assistant:{name:d((t=e.assistant)==null?void 0:t.name,40)||ee.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:U(e.links)?Object.fromEntries(Object.entries(e.links).map(([C,x])=>[d(C,64),d(x,1024)]).filter(([C,x])=>C&&x)):{},avatar:{manifestUrl:d((r=e.avatar)==null?void 0:r.manifestUrl,1024)||ee.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||ee.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||ee.state.stateUrl,haApiFallback:((f=e.state)==null?void 0:f.haApiFallback)===!0,idleLinesUrl:d((n=e.state)==null?void 0:n.idleLinesUrl,1024)||ee.state.idleLinesUrl,entityMapUrl:d((w=e.state)==null?void 0:w.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d((S=e.control)==null?void 0:S.controlUrl,1024)||ee.control.controlUrl}}}function st(a){var t,i,r,s,o;const e=ge(ze,U(a)?a:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||ze.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:U(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,f])=>[d(l,32),d(f,1024)]).filter(([l,f])=>l&&f)):{},viewPresets:U(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,f])=>d(l,32)&&U(f))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((r=e.capabilities)==null?void 0:r.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const ie={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},kt=["full","torso","head"];function fe(a,e=Date.now()){var l,f,n,w,S,C,x;const t=ge(ie,U(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((l=t.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((f=t.page)==null?void 0:f.target,40)||null,until:d((n=t.page)==null?void 0:n.until,64)||null},cue:{cue:d((w=t.cue)==null?void 0:w.cue,32)||null,emotion:d((S=t.cue)==null?void 0:S.emotion,32)||null,motion:d((C=t.cue)==null?void 0:C.motion,32)||null,until:d((x=t.cue)==null?void 0:x.until,64)||null}},r=d(t.viewPreset,16).toLowerCase();i.viewPreset=kt.includes(r)?r:null;const s=je(i.page.until);i.page.mode==="pinned"&&(!s||s<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=je(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function Pe(a,e,t=Date.now()){return fe(ge(fe(a,t),U(e)?e:{}),t)}function $t(a,e,t=Date.now()){return fe({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function Ct(a,e,t=3e4,i=Date.now()){const r=d(e,40),s=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return fe({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:r?"pinned":"auto",target:r||null,until:r?s:null}},i)}function ot(a,e){var o,l,f;const t={...a||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),r=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),s=d((f=e==null?void 0:e.cue)==null?void 0:f.motion,32);return i&&(t.cue=i),r&&(t.emotion=r),s&&(t.motion=s),t}function V(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function Ve(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function It(a){return U(a)&&U(a.config)?a.config:a}function Pt(a,e){const t={...a};return U(e)&&(typeof e.id=="string"&&(t.id=d(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>U(i)))),t}function Ee(a,e){const t=It(a),i=Array.isArray(e.pages)?e.pages.slice():[],r=U(t)&&Array.isArray(t.pages)?t.pages:[],s=i.map(x=>{const L=r.find(A=>d(U(A)?A.id:"",40)===x.id);return Pt(x,L)}),o=U(t)&&U(t.rotation)?t.rotation:{},l=U(e.display)?e.display:{},f=U(t)&&U(t.display)?t.display:{},n=U(l.safeArea)?l.safeArea:{},w=U(f.safeArea)?f.safeArea:{},S=Array.isArray(o.order)?o.order:e.rotation.order,C=xt(S).filter((x,L,A)=>s.some(P=>P.id===x)&&A.indexOf(x)===L);return{version:1,rotation:{order:C.length?C:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:V(w.top,V(n.top,0)),right:V(w.right,V(n.right,0)),bottom:V(w.bottom,V(n.bottom,0)),left:V(w.left,V(n.left,0))},layoutPaddingPx:V(f.layoutPaddingPx,V(l.layoutPaddingPx,16)),layoutGapPx:V(f.layoutGapPx,V(l.layoutGapPx,16)),globalScale:Ve(f.globalScale,Ve(l.globalScale,1))},pages:s}}function Et(a,e=220){const t=d(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},r=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(s,o,l)=>{const f=d(o,16).toLowerCase(),n=d(l,32).toLowerCase();return(f==="emotion"||f==="activity"||f==="cue"||f==="motion")&&n&&(i[f]=n)," "});return{text:d(r,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const At={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function de(a,e={}){const t=U(a)?a:{},i={...At,...e};return{version:1,assistant:d(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:d(t.status??i.status,255),message:d(t.message??i.message,255),source:d(t.source??i.source,64),updatedAt:d(t.updatedAt??i.updatedAt,64),emotion:d(t.emotion??i.emotion,32)||null,activity:d(t.activity??i.activity,32)||null,cue:d(t.cue??i.cue,32)||null,intensity:Tt(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:d(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:d(t.event??i.event,64)}}function Tt(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Lt(a,e){return a.order[e]||a.order[0]||""}function Ut(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function Dt(a,e,t,i){const r=Array.isArray(a.order)?a.order:[];if(!r.length)return 0;const s=Math.max(0,Math.min(e,r.length-1));for(let o=1;o<=r.length;o+=1){const l=(s+o*t+r.length)%r.length;if(i(r[l]))return l}return s}function Nt(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const r=a.control.page;if(r.mode==="pinned"&&r.target)return{nextIndex:Ut(a.rotation,r.target),nextAutoRotateAt:e,pinnedKey:`${r.target}:${r.until||""}`};if(a.force){const o=Lt(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(o)?a.activeIndex:Math.max(0,t.findIndex(f=>a.isEligible(f))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let s=a.activeIndex;for(let o=1;o<=t.length;o+=1){const l=(a.activeIndex+o)%t.length;if(a.isEligible(t[l])){s=l;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const lt={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Mt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function We(a){const e=d(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Mt.some(t=>e.includes(t)):!1}function Rt(a,e){const t=de(a),i=d(t.status,72),r=d(t.message,220);if(!(t.online!==!1&&(We(i)||We(r))))return{state:t,hasTechnicalFailure:!1};const l=d(t.emotion,32).toLowerCase(),f=d(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(t.activity,32).toLowerCase()==="error"?"idle":d(t.activity,32)||null,cue:d(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:f==="error"?"idle_soft":f||null},hasTechnicalFailure:!0}}function Bt(a,e){const t=(e==null?void 0:e.copy)??lt,i=de(a),r=Et(i.message,220),s=Rt({...i,message:r.text,emotion:d(i.emotion,32)||r.emotion||null,activity:d(i.activity,32)||r.activity||null,cue:d(i.cue,32)||r.cue||null,motion:d(i.motion,32)||r.motion||null},{healthyStatus:t.technicalHealthyLabel}),o=s.state,l=d(o.message,180),f=d(o.activity,32).toLowerCase(),n=o.online!==!1&&f!=="offline",w=!!o.busy||f==="thinking"||f==="busy"||f==="acting",S=o.speaking===!0||f==="speaking",C=n?w?t.busyLabel:l||S?t.speakingLabel:s.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,x=l?t.messageCaption:s.hasTechnicalFailure?t.statusCaption:t.modeCaption,L=l||(n?w?t.busyBody:d(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:o,hasTechnicalFailure:s.hasTechnicalFailure,caption:x,label:C,body:L,bodyKey:[x,C,L].join(":")}}function Ft(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function qe(a,e=-1){const t=Array.isArray(a)?a.map(r=>d(r,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function _t(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!d(a==null?void 0:a.message,180);return e&&!t&&!i}const Ot={cue:null,emotion:null,motion:null,until:null},Ht={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function jt(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function dt(a){return a.endsWith("/")?a:`${a}/`}function Se(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(dt(d(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function ke(a){const e=d(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function zt(a,e,t){const i=d(a.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?ke(i):new URL("../avatar.html",new URL(dt(d(t,1024)||"."),window.location.href)).toString()}function Vt(a,e){const t=d(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function Wt(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[r,s]of Object.entries(i)){const o=d(r,64);if(!o||s==null)continue;const l=typeof s=="boolean"?s?"1":"0":String(s);t.searchParams.set(o,l)}return t.toString()}function qt(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([r,s])=>[d(r,32),Se(t,s)]).filter(([r,s])=>r&&s));return{version:1,assistant:{name:d(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([r,s])=>[d(r,64),ke(s)]).filter(([r,s])=>r&&s)),state:{stateUrl:ke(a.state.stateUrl),idleLinesUrl:ke(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:Se(t,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:Se(t,e.fallbackPortrait||""),motionMapUrl:Se(t,e.motionMapUrl||""),presetThumbs:i}}}class Kt{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"currentState");b(this,"currentCue",{...Ot});b(this,"currentPreset","full");b(this,"currentBubble",{...Ht});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var r;const t=(r=this.iframeEl)==null?void 0:r.contentWindow;if(!t||e.source!==t||!jt(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=st({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=De(e.rendererConfig||{}),this.currentState=de({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const t=zt(this.options,this.manifest,this.assetRoot),i=Wt(t,this.options);this.targetOrigin=Vt(i,this.options.targetOrigin);const r=document.createElement("div");r.className="ks-live2d-frame",Object.assign(r.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const s=document.createElement("iframe");s.className="ks-live2d-iframe",s.src=i,s.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,s.loading="eager",s.allow="autoplay",Object.assign(s.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&s.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);r.append(s,o),this.host.append(r),s.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=r,this.iframeEl=s,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=de(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const r=document.createElement("div");r.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(r.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(r,s),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:qt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=ot(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function Gt(a={}){return new Kt(a)}const Jt={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Ke={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Yt{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const r=document.createElement("div");r.className="ks-static-avatar-fallback",r.textContent=this.options.alt||"Avatar",Object.assign(r.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,r,s),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=r;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||Ke,i=t[e]||t.full||Ke.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Jt}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");return i?`${i}/${r}`:r}}function Zt(a={}){return new Yt(a)}function Xt(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function ct(){var a;for(const e of Xt())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function Qt(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function ea(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=d(t.entity_id,255);i&&(e[i]=t)}return e}function ta(a,e,t="Assistant"){const i=a[e.status],r=a[e.message],s=a[e.online],o=a[e.busy],l=a[e.source],f=a[e.updatedAt],n=e.emotion?a[e.emotion]:null,w=e.activity?a[e.activity]:null,S=e.cue?a[e.cue]:null,C=e.speaking?a[e.speaking]:null,x=e.intensity?a[e.intensity]:null,L=e.motion?a[e.motion]:null,A=a[e.revision];if(!i&&!r&&!s&&!o)return null;const P=d(i==null?void 0:i.state,72),O=d(r==null?void 0:r.state,220),q=d(f==null?void 0:f.state,64),I=Ae(s,!0),z=Ae(o,!1),R=d(w==null?void 0:w.state,32)||"",Z=Ae(C)??R==="speaking",re=R||(I?Z?"speaking":z?"thinking":"idle":"offline");return de({version:1,assistant:d(t,40)||"Assistant",online:I,busy:z,status:P&&P!=="unknown"&&P!=="unavailable"?P:"",message:O&&O!=="unknown"&&O!=="unavailable"?O:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:q&&q!=="unknown"&&q!=="unavailable"?q:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(n==null?void 0:n.state,32)||null,activity:re,cue:d(S==null?void 0:S.state,32)||null,intensity:aa(x),speaking:Z,motion:d(L==null?void 0:L.state,32)||null,revision:Number(A==null?void 0:A.state)||0})}function Ae(a,e){const t=d(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function aa(a){const e=d(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function ia(a){const e=Be(a);return{id:"ha-state",async read(){const t=await e.read();return t?ta(t,a.entityMap,a.assistantName):null}}}function Be(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let r=null,s=0,o=null,l=0;async function f(){var C;const n=ct();if(n!=null&&n.states)return n.states;const w=Date.now();if(r&&w-s<t||!a.allowApiFallback||typeof e!="function"||w<l)return r;if(o)return o;const S=d(((C=a.readToken)==null?void 0:C.call(a))??Qt(),4096);return S?(o=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${S}`}}).then(async x=>{if(!x.ok){const L=new Error(`HA states HTTP ${x.status}`);throw L.status=x.status,L}return x.json()}).then(x=>{const L=ea(x);return L&&(r=L,s=Date.now()),L||r}).catch(x=>(((x==null?void 0:x.status)===401||(x==null?void 0:x.status)===403)&&(l=Date.now()+i),r)).finally(()=>{o=null}),o):r}return{id:"ha-states",async read(){return f()}}}async function Fe(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=d(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const r=await e(i.toString(),{cache:"no-store"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json();return a.sanitize?a.sanitize(s):s}catch(r){if(a.defaultValue!==void 0)return a.defaultValue;throw r}}function ra(a){return{id:"json-state",async read(){const e=await Fe({...a,defaultValue:a.defaultValue});return de(e)}}}function Ge(a){return{id:"json-control",async read(){const e=await Fe({...a,defaultValue:a.defaultValue??ie});return fe(e)}}}function na(a){return{id:"json-lines",async read(){const e=await Fe({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>d(t,220)).filter(Boolean):[]}}}function F(a,e,t=64){return d(a[e],t)}function ue(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function sa(a,e="en-US"){const t=d(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function xe(a,e){return!a||!e?null:a[e]||null}function oa(a,e=null,t="en-US"){var S,C,x,L;const i=F(a,"caption",40)||F(a,"type",24)||"Card",r=F(a,"hint",72),s=F(a,"type",32).toLowerCase()||"entity",o=F(a,"entity",255),l=xe(e,o),f=xe(e,F(a,"stateEntity",255)),n=xe(e,F(a,"downEntity",255)),w=xe(e,F(a,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:F(a,"value",64)||"—",hint:r||"static card"};if(s==="todo"){const A=Number(l==null?void 0:l.state);return!Number.isFinite(A)||A<=0?{caption:i,value:"Clear",hint:r||"nothing pending"}:{caption:i,value:`${A} item${A===1?"":"s"}`,hint:r||"pending tasks"}}if(s==="onoff"){const A=(l==null?void 0:l.state)==="on";return{caption:i,value:A?F(a,"onText",48)||"On":F(a,"offText",48)||"Off",hint:r||"device state"}}if(s==="battery"){const A=ue(l==null?void 0:l.state,0);return{caption:i,value:A?`${A}%`:"—",hint:d(f==null?void 0:f.state,48)||r||"battery level"}}if(s==="network"){const A=ue(n==null?void 0:n.state,0),P=ue(w==null?void 0:w.state,0);return{caption:i,value:A||P?`↓ ${A||"0"} · ↑ ${P||"0"}`:"—",hint:r||"throughput"}}if(s==="time")return{caption:i,value:sa(l==null?void 0:l.state,t)||"—",hint:r||"next event"};if(s==="percent"){const A=ue(l==null?void 0:l.state,Number(F(a,"digits",4))||0);return{caption:i,value:A?`${A}%`:"—",hint:r||d((S=l==null?void 0:l.attributes)==null?void 0:S.friendly_name,48)||"state percentage"}}if(s==="number"){const A=Number(F(a,"digits",4))||0,P=ue(l==null?void 0:l.state,A),O=F(a,"unit",16)||d((C=l==null?void 0:l.attributes)==null?void 0:C.unit_of_measurement,16);return{caption:i,value:P?`${P}${O?` ${O}`:""}`:"—",hint:r||d((x=l==null?void 0:l.attributes)==null?void 0:x.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||F(a,"value",64)||"—",hint:r||d((L=l==null?void 0:l.attributes)==null?void 0:L.friendly_name,48)||"entity state"}}function la(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>oa(i,e,t)):[]}const ut={...lt,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},pt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},ft={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},da={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},$e={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function h(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function gt(a){return a.endsWith("/")?a:`${a}/`}function W(a,e){const t=d(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function mt(a){return new URL(".",a).toString()}function ca(a,e){const t=mt(e),i=W(t,d(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:W(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([r,s])=>[r,W(t,s)]).filter(([,r])=>!!r))}}function Te(a){return{...$e,...a||{},metrics:{...$e.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):$e.forecast.map(e=>({...e}))}}function Je(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function j(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function ua(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${j(t)} мм рт. ст.`:`${j(t*.750061683,0)} мм рт. ст.`}function pa(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${j(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${j(t/3.6,1)} м/с`:`${j(t,1)} м/с`}function fa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ga(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function ma(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function ha(a,e="ru-RU"){const t=d(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||d(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function Ye(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function va(a,e="./assets/icons"){const t=Number(a),i=gt(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function ya(a){const e=d(a.locale,32)||"ru-RU",t=d(a.iconBaseUrl,1024)||"./assets/icons",i=Be({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var L,A,P,O,q,I,z,R,M,Z,re,me,he,ve,ye,be,we,ce,u,p;const r=await i.read(),s=a.fetchImpl??globalThis.fetch,o=r==null?void 0:r[a.weatherEntity];let l=null;const f=d(a.openMeteoUrl,4096);if(f&&typeof s=="function")try{const c=await s(`${f}${f.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});c.ok&&(l=await c.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const n=d(o==null?void 0:o.last_changed,64)||d((L=l==null?void 0:l.current)==null?void 0:L.time,64)||new Date().toISOString(),w=o?ha(o.state,e):Ye((A=l==null?void 0:l.current)==null?void 0:A.weather_code,e),S=Array.isArray((P=l==null?void 0:l.daily)==null?void 0:P.time)?l.daily.time.map((c,m)=>{var T,N,k,X,Q;const $=new Date(`${c}T12:00:00+03:00`);return{name:$.toLocaleDateString(e,{weekday:"short"}),dayNumber:$.toLocaleDateString(e,{day:"numeric"}),monthShort:$.toLocaleDateString(e,{month:"short"}),note:d(Ye((T=l.daily.weather_code)==null?void 0:T[m],e),28),max:`${j((N=l.daily.temperature_2m_max)==null?void 0:N[m])}°`,min:`${j((k=l.daily.temperature_2m_min)==null?void 0:k[m])}° · ${j((X=l.daily.precipitation_probability_max)==null?void 0:X[m])}%`,icon:va((Q=l.daily.weather_code)==null?void 0:Q[m],t)}}):[],C=S[0]||null,x=S.slice(1,6);return{todayValue:ga(n,e),todayLabel:ma(n,e),updatedAt:fa(n,e),temperature:j(((O=o==null?void 0:o.attributes)==null?void 0:O.temperature)??((q=l==null?void 0:l.current)==null?void 0:q.temperature_2m),1),condition:w,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${j(((I=o==null?void 0:o.attributes)==null?void 0:I.apparent_temperature)??((z=l==null?void 0:l.current)==null?void 0:z.apparent_temperature)??((R=o==null?void 0:o.attributes)==null?void 0:R.temperature),1)}°C`,badgeSummary:w,badgeRange:C?`${C.max} / ${j((Z=(M=l==null?void 0:l.daily)==null?void 0:M.temperature_2m_min)==null?void 0:Z[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${j(((re=o==null?void 0:o.attributes)==null?void 0:re.humidity)??((me=l==null?void 0:l.current)==null?void 0:me.relative_humidity_2m))}%`,pressure:ua(((he=o==null?void 0:o.attributes)==null?void 0:he.pressure)??((ve=l==null?void 0:l.current)==null?void 0:ve.surface_pressure),((ye=o==null?void 0:o.attributes)==null?void 0:ye.pressure_unit)??"hPa"),wind:pa(((be=o==null?void 0:o.attributes)==null?void 0:be.wind_speed)??((we=l==null?void 0:l.current)==null?void 0:we.wind_speed_10m),((ce=o==null?void 0:o.attributes)==null?void 0:ce.wind_speed_unit)??"km/h"),clouds:`${j(((u=o==null?void 0:o.attributes)==null?void 0:u.cloud_coverage)??((p=l==null?void 0:l.current)==null?void 0:p.cloud_cover))}%`},forecast:x}}}class ba{constructor(e,t={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"entityMap",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",ie);b(this,"uiControl",ie);b(this,"currentControl",ie);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...ut,...t.copy||{}},this.labels={...pt,...t.labels||{}},this.presetLabels={...ft,...t.presetLabels||{}},this.weatherData=Te(t.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="Avatar view presets">
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
            <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="Scene carousel">
              <div class="carousel-track" data-carousel-track></div>
              <div class="carousel-dots" data-dots aria-label="Display pages"></div>
            </div>
          </section>
        </div>
      </div>
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=W(window.location.href,this.getRendererConfigUrl()),t=mt(e),i=De(await this.readJson(e)),r=De({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,W(t,l)])),avatar:{...i.avatar,manifestUrl:W(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:W(t,i.scene.configUrl)},state:{...i.state,stateUrl:W(t,i.state.stateUrl),idleLinesUrl:W(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?W(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:W(t,i.control.controlUrl)}});this.rendererConfig=r;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=ca(st(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await na({url:this.rendererConfig.state.idleLinesUrl||W(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Ge({url:this.rendererConfig.control.controlUrl,defaultValue:ie}).read(),this.currentControl=Pe(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=$t(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,r;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(r=(i=this.carouselShellEl).setPointerCapture)==null||r.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:r}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(r)>=s*.16,l=r<0?1:-1;if(this.clearDragState(t.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Ge({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=Pe(ie,this.uiControl),this.currentControl=Pe(this.remoteControl,this.uiControl);const e=ot(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=Bt(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=Ee(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const r=this.getOrderedPages(i.pages,i.rotation.order),s=Nt({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>r.some(l=>l.id===o)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(r,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,r)=>i.kind==="overview"?this.renderOverviewSlide(i,t,r):this.renderDynamicSlide(i,r,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,r)=>`
      <button
        class="carousel-dot ${r===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${r}"
        data-scene-page-id="${h(i.id)}"
        aria-label="${h(d(i.title,40)||`Page ${r+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t,i){const r=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||$e,o=s.forecast.slice(0,5).map(l=>this.renderForecastDay(l)).join("");return`
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
                <div class="neiri-mark"><img src="${h(this.resolveIconUrl("sparkles"))}" alt="${h(r)}"></div>
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
            <div class="forecast-grid">${o}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,t,i){const r=la(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${t+1} / ${i}`),f=e.cardStyle==="mini"?r.map((S,C)=>`
          <article class="mini-card" data-scene-card-index="${C}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(S.caption)}</span>
            <strong>${h(S.value)}</strong>
          </article>
        `).join(""):r.map((S,C)=>`
          <article class="home-card" data-scene-card-index="${C}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(S.caption)}</span>
            <strong>${h(S.value)}</strong>
            <small>${h(S.hint)}</small>
          </article>
        `).join(""),n=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(S=>this.renderForecastDay(S)).join("")}</div>`:"",w=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
      <section class="slide slide-dynamic" data-slide-id="${h(e.id)}" data-scene-page-id="${h(e.id)}" data-slide-order="${t}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${h(e.kind)}" data-dynamic-card-style="${h(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${h(d(e.title,64)||"Scene")}</h1>
              <p class="subline">${h(d(e.subtitle,140)||"Configured by scene.json")}</p>
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${h(o)}</span>
              <span class="value">${h(l)}</span>
            </div>
          </div>
          ${n}
          <div class="${w}">
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],i=e[e.length-1];return`${d(t.dayNumber,4)} ${d(t.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var r;const t=d((r=this.options.iconUrls)==null?void 0:r[e],1024);return t||`${gt(d(this.options.iconBaseUrl,1024)||"./assets")}${da[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:r,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${r}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,t){const i=t.map(s=>e.find(o=>o.id===s)).filter(Boolean),r=e.filter(s=>!i.some(o=>o.id===s.id));return i.concat(r)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,r;!t&&((r=(i=this.carouselShellEl).hasPointerCapture)!=null&&r.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=Ee(this.sceneConfig,this.sceneConfig),i=Dt(t.rotation,this.activeIndex,e,r=>this.orderedPages.some(s=>s.id===r));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const r=Ee(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,r.rotation.defaultDwellMs*2);this.uiControl=Ct(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!_t(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=qe(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=qe(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},Ft(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>ra({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await ia({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:Be({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=Je(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=Je(e,t)}catch{}try{return Te(e)}catch{return Te(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Gt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Zt({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",r=t.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),r&&(s?(r.src=s,r.removeAttribute("hidden")):(r.src="",r.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function wa(a,e={}){const t=new ba(a,e);return await t.init(),t}const Sa=["overview","cards","forecast+cards"],xa=["full","mini"],ht=["entity","text","todo","onoff","battery","network","time","percent","number"],J=["caption","hint"],ka={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},$a={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается честный 1:1 viewport выбранного экрана. Если не влезает по ширине, страница просто прокручивается.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Подставить в настройки экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Сейчас сцена использует аватар из текущего scene-pack. Ниже можно импортировать отдельные Live2D-модели и переключаться между ними.",avatarPack:"Набор аватара",avatarPackCurrent:"Встроенный avatar.manifest.json",avatarPackHint:"Ниже можно выбрать встроенный аватар текущего пакета или один из отдельно импортированных avatar-pack.",avatarPackEmpty:"Отдельные avatar-pack ещё не импортированы. Пока используется встроенный аватар текущего scene-pack.",avatarPackAppliedAfterSave:"Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",avatarPackDefaultTile:"Аватар текущего пакета",avatarPackDefaultHint:"Использовать встроенный аватар из scene-pack без отдельного avatar-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:a=>`${a} motion`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Импорт аватара",avatarImportHint:"Выбери zip-архив с Live2D-моделью. Kiosk Scene сразу импортирует его в avatar-packs, найдёт model3.json и создаст draft motion-map.",avatarImportSelect:"Выбрать ZIP аватара",avatarImportSelected:a=>`Выбран архив: ${a}`,avatarImportButton:"Выбрать и импортировать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:a=>`Импортирован avatar-pack: ${a}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для semantic cue/activity в runtime.",avatarMappingEmpty:"Выбери отдельный avatar-pack, чтобы редактировать его motion-map.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Idle / ожидание",avatarSemanticTouch:"Touch / касание",avatarSemanticReplySoft:"Reply soft / мягкий ответ",avatarSemanticThink:"Think / размышление",avatarSemanticBusy:"Busy / занята",avatarSemanticCalm:"Calm / спокойствие",avatarSemanticHappy:"Happy / радость",avatarSemanticSurprise:"Surprise / удивление",avatarSemanticWarning:"Warning / предупреждение",avatarSemanticGreet:"Greet / приветствие",avatarSemanticSpeaking:"Speaking / говорит",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardsSubtitle:"Сначала выбери или добавь карточку, затем настрой её ниже. Порядок здесь же влияет на правую карусель.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку из шаблона выше или выбери существующую карточку из списка.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingActive:(a,e)=>`Сейчас связываем: ${a} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage renders a true 1:1 viewport of the selected screen. If it does not fit, the editor page simply scrolls.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Fill display settings below",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"The scene currently uses the avatar bundled with this scene-pack. You can import separate Live2D models below and switch between them.",avatarPack:"Avatar pack",avatarPackCurrent:"Bundled avatar.manifest.json",avatarPackHint:"Choose either the bundled avatar from the current scene-pack or one of the imported avatar packs below.",avatarPackEmpty:"No separate avatar packs have been imported yet. The bundled scene-pack avatar is active for now.",avatarPackAppliedAfterSave:"The selected avatar pack will apply after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene avatar",avatarPackDefaultHint:"Use the avatar bundled directly with the scene-pack, without a separate avatar-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:a=>`${a} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Import avatar",avatarImportHint:"Choose a Live2D zip archive. Kiosk Scene will immediately import it into avatar-packs, detect model3.json and create a draft motion map.",avatarImportSelect:"Choose avatar ZIP",avatarImportSelected:a=>`Selected archive: ${a}`,avatarImportButton:"Choose and import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:a=>`Imported avatar pack: ${a}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map semantic cue/activity slots to actual model motions used by the runtime.",avatarMappingEmpty:"Choose a separate avatar pack to edit its motion map.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardsSubtitle:"Add or choose a card first, then edit it below. The order here drives the right-hand carousel.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card from the templates above or choose an existing one from the list.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingActive:(a,e)=>`Binding now: ${a} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Ca=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Ce=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Ne="mellow-fly-7";function Me(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Ze(a){return Ce.find(e=>e.id===a)||Ce.find(e=>e.id===Ne)||Ce[0]}function Ia(a){return`${a.width} × ${a.height}`}function g(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function _e(a){return JSON.parse(JSON.stringify(a))}function G(a){const e=new Map(a.pages.map(r=>[r.id,r])),t=a.rotation.order.map(r=>e.get(r)).filter(Boolean),i=a.pages.filter(r=>!t.some(s=>s.id===r.id));return[...t,...i]}function Pa(a,e){return e?Math.max(0,G(a).findIndex(t=>t.id===e)):0}function Ea(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function vt(a,e){const t=Ea(e);let i=t,r=2;for(;a.pages.some(s=>s.id===i);)i=`${t}-${r}`,r+=1;return i}function Aa(a){const e=a.pages.length+1;return{id:vt(a,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function Xe(a){switch(a){case"text":return{type:a,caption:"Text",value:"—",hint:""};case"todo":return{type:a,caption:"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:a,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:"Time",entity:"",hint:""};case"percent":return{type:a,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function _(a,e){const t=a[e];return t==null?"":String(t)}function Y(a,e){const t=a[e];return t==null?"":String(t)}function te(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function yt(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function Le(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function Qe(a){return a.avatar||(a.avatar={}),a.avatar}function Ta(a,e){const t=yt(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function La(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function Ua(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Da(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&G(a).some(r=>r.id===t)?t:((i=G(a)[0])==null?void 0:i.id)||null}async function Na(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return _e(t.config)}async function Ma(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return _e(i.config)}function Oe(a){switch(a){case"text":return[...J,"value"];case"todo":return[...J,"entity"];case"onoff":return[...J,"entity","onText","offText"];case"battery":return[...J,"entity","stateEntity"];case"network":return[...J,"downEntity","upEntity"];case"time":return[...J,"entity"];case"percent":return[...J,"entity","digits"];case"number":return[...J,"entity","digits","unit"];default:return[...J,"entity"]}}function et(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function le(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function bt(a){const e=Me();return ka[e][a]||""}function Ie(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Ra(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),r=a.includes(".")&&a.split(".",1)[0]||"other",s=String(e.state||""),o=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:r,state:s,unit:o}}function Ba(a){return a?Object.entries(a).map(([e,t])=>Ra(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function Fa(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function tt(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(r=>({id:String(r.id||"").trim(),name:String(r.name||r.id||"").trim(),manifestUrl:String(r.manifestUrl||"").trim(),previewUrl:String(r.previewUrl||"").trim(),motionCount:Number(r.motionCount||0),capabilities:typeof r.capabilities=="object"&&r.capabilities?{supportsMotion:!!r.capabilities.supportsMotion,supportsEmotion:!!r.capabilities.supportsEmotion,supportsLipSync:!!r.capabilities.supportsLipSync}:void 0})).filter(r=>r.id&&r.manifestUrl):[]}async function _a(a,e){const t=String(a||"").trim();if(!t)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const r=await fetch(t,{method:"POST",body:i}),s=await r.json();if(!r.ok||s.success===!1||!s.item)throw new Error(String(s.error||`HTTP ${r.status}`));return{id:String(s.item.id||"").trim(),name:String(s.item.name||s.item.id||"").trim(),manifestUrl:String(s.item.manifestUrl||"").trim(),previewUrl:String(s.item.previewUrl||"").trim(),motionCount:Number(s.item.motionCount||0),capabilities:typeof s.item.capabilities=="object"&&s.item.capabilities?{supportsMotion:!!s.item.capabilities.supportsMotion,supportsEmotion:!!s.item.capabilities.supportsEmotion,supportsLipSync:!!s.item.capabilities.supportsLipSync}:void 0}}async function Oa(a,e){var o,l,f,n;const t=String(a||"").trim(),i=String(e||"").trim();if(!t||!i)throw new Error("Avatar pack API is not configured.");const r=await fetch(`${t}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await r.json();if(!r.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${r.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((o=s.motionMap)==null?void 0:o.motions)?(l=s.motionMap)==null?void 0:l.motions.map(w=>({index:Number(w.index),id:String(w.id||"").trim(),label:String(w.label||w.id||"").trim(),group:String(w.group||"").trim(),tags:Array.isArray(w.tags)?w.tags.map(S=>String(S||"").trim()).filter(Boolean):[]})).filter(w=>Number.isFinite(w.index)):[],semantic:typeof((f=s.motionMap)==null?void 0:f.semantic)=="object"&&((n=s.motionMap)!=null&&n.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function Ha(a,e){var s,o,l;const t=String(a||"").trim();if(!t||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${t}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),r=await i.json();if(!i.ok||r.success===!1||!r.packId)throw new Error(String(r.error||`HTTP ${i.status}`));return{packId:String(r.packId||"").trim(),manifest:r.manifest||e.manifest,motionMap:{motions:Array.isArray((s=r.motionMap)==null?void 0:s.motions)?r.motionMap.motions:e.motionMap.motions,semantic:typeof((o=r.motionMap)==null?void 0:o.semantic)=="object"&&((l=r.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(r.motionMap.semantic)):e.motionMap.semantic}}}function ja(a){if(Array.isArray(a)){const e=a.find(t=>Number.isFinite(Number(t)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(a))?String(Number(a)):""}function za(a,e){const t=a[e.labelKey];return typeof t=="string"?t:e.key}function Va(a,e){const t=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${a.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Ca.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${g(i.key)}">${g(za(a,i))}</label>
            <select id="avatar-semantic-${g(i.key)}" data-avatar-semantic="${g(i.key)}">
              <option value="">${g(a.avatarMotionNone)}</option>
              ${t.map(r=>`
                <option value="${g(String(r.index))}"${ja(e.motionMap.semantic[i.key])===String(r.index)?" selected":""}>
                  ${g(`${r.label||r.id} · #${r.index}`)}
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
              <strong>${g(i.label||i.id||`Motion ${i.index}`)}</strong>
              <span class="meta">${g(`${a.avatarMappingMotion} #${i.index} · ${i.group||"motion"}`)}</span>
              <code>${g(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${a.avatarMappingSaveHint}</div>
    </div>
  `}function at(a,e,t){var n,w,S;const i=(e==null?void 0:e.id)||"",r=t===i,s=(e==null?void 0:e.name)||a.avatarPackDefaultTile,o=(e==null?void 0:e.id)||a.avatarPackCurrent,l=(e==null?void 0:e.previewUrl)||"",f=e?[e.motionCount>0?a.avatarPackMotionCount(e.motionCount):"",(n=e.capabilities)!=null&&n.supportsMotion?a.avatarCapabilityMotion:"",(w=e.capabilities)!=null&&w.supportsEmotion?a.avatarCapabilityEmotion:"",(S=e.capabilities)!=null&&S.supportsLipSync?a.avatarCapabilityLipSync:""].filter(Boolean):[a.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${r?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${l?`<img src="${g(l)}" alt="${g(s)}">`:`<span>${g(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${g(s)}</strong>
        <div class="meta">${g(o)}</div>
        <div class="avatar-pack-card-meta">
          ${f.map(C=>`<span>${g(C)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${r?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${g(i)}">
          ${g(r?a.avatarPackSelected:a.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function He(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function Wa(a,e,t,i){if(!e||t===null)return`<div class="meta">${g(a.entityBindingEmpty)}</div>`;const r=Oe(_(e,"type")||"entity").filter(s=>He(s));return r.length?`
    <div class="binding-targets">
      ${r.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===t&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${t}" data-binding-field="${g(s)}">
            ${g(Ie(a,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${g(a.entityBindingEmpty)}</div>`}function it(a){const e=document.querySelector(`[data-editor-section="${a}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function ne(a){for(const e of Array.from(a.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function rt(a){return Oe(a).find(e=>He(e))||null}function se(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${g(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${g(e)}" value="${g(t)}">
    </div>
  `}function ae(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${g(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${g(e)}" value="${g(t)}">
    </div>
  `}function nt(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${g(a)}</label>
      <select id="page-select-${e}" data-page-field="${g(e)}">
        ${i.map(r=>`<option value="${g(r.value)}"${r.value===t?" selected":""}>${g(r.label)}</option>`).join("")}
      </select>
    </div>
  `}function qa(a,e,t,i){const r=_(e,"type")||"entity",s=Oe(r);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${g(_(e,"caption")||le(a,r))}</strong>
          <div class="meta">${g(le(a,r))}</div>
        </div>
        <div class="meta">#${t+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${g(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${ht.map(o=>`<option value="${o}"${o===r?" selected":""}>${g(le(a,o))}</option>`).join("")}
          </select>
        </div>
        ${s.map(o=>{const l=He(o),f=l&&(i==null?void 0:i.cardIndex)===t&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${f?" is-active":""}">
                <label>${g(Ie(a,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${g(o)}"
                    data-binding-field="${g(o)}"
                    value="${g(_(e,o))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${t}"
                    data-binding-field="${g(o)}"
                  >${a.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${o==="hint"?"is-wide":""}">
              <label>${g(Ie(a,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${g(o)}"
                value="${g(_(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Ka(a,e,t,i,r){const s=_(e,"type")||"entity",o=_(e,"caption")||le(a,s),l=_(e,"entity")||_(e,"stateEntity")||_(e,"downEntity")||_(e,"upEntity")||_(e,"value")||_(e,"hint")||bt(s);return`
    <article class="card-list-item${r?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${t}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${t}">
        <strong>${g(o)}</strong>
        <span class="meta">${g(le(a,s))}</span>
        <div class="meta">${g(l)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
      </div>
    </article>
  `}function Ga(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${g(e)}"
    >
      <strong>${g(le(a,e))}</strong>
      <span>${g(bt(e))}</span>
    </button>
  `}function Ja(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function Ya(a){var ce;const e=$a[Me()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const r=document.createElement("section");r.id="scene-editor-shell",r.innerHTML=`
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
                ${Ce.map(u=>`<option value="${g(u.id)}">${g(u.label[Me()])}</option>`).join("")}
              </select>
            </div>
            <div class="scene-preview-resolution">
              <span>${e.previewResolution}</span>
              <strong data-preview-resolution>1920 × 1080</strong>
            </div>
            <button class="scene-editor-button" type="button" data-action="apply-display-profile">${e.previewApplyProfile}</button>
          </div>
        </div>
        <div class="scene-preview-hint">
          <span>${e.previewSelectPage}</span>
          <span>${e.previewSelectCard}</span>
        </div>
        <div class="scene-preview-frame">
          <div class="scene-preview-stage" data-preview-stage></div>
        </div>
      </section>
      <section class="scene-dashboard" data-dashboard></section>
    </div>
  `,document.body.appendChild(r),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=r.querySelector("[data-preview-stage]"),o=r.querySelector("[data-preview-resolution]"),l=r.querySelector("[data-preview-display]"),f=r.querySelector("[data-dashboard]");if(!s||!o||!l||!f)throw new Error("Missing native editor shell elements");s.appendChild(t);const n={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Ne,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},w=async u=>{const p=String(u||"").trim();if(!p||!a.avatarPackApiUrl){n.avatarPackDetails=null,n.avatarPackLoading=!1,n.avatarPackDirty=!1;return}n.avatarPackLoading=!0,I();try{n.avatarPackDetails=await Oa(a.avatarPackApiUrl,p),n.avatarPackDirty=!1}catch(c){n.avatarPackDetails=null,n.avatarPackDirty=!1,z(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{n.avatarPackLoading=!1}},S=()=>{const u=Ze(n.previewDisplayId);l.value=u.id,o.textContent=Ia(u),s.style.width=`${u.width}px`,s.style.height=`${u.height}px`,t.style.width=`${u.width}px`,t.style.height=`${u.height}px`},C=u=>{n.previewDisplayId=String(u||"").trim()||Ne,S()},x=u=>{n.pendingAvatarZip=u,n.pendingAvatarZipName=(u==null?void 0:u.name)||"",n.avatarImportStatus="",n.avatarImportTone="muted",I()},L=async u=>{if(!(!n.config||!a.avatarImportUrl||n.avatarImporting)){n.avatarImporting=!0,n.avatarImportStatus=e.avatarImporting,n.avatarImportTone="muted",I();try{const p=await _a(a.avatarImportUrl,u);n.avatarCatalog=a.avatarCatalogUrl?await tt(a.avatarCatalogUrl):[p],Qe(n.config).packId=p.id,await w(p.id),n.pendingAvatarZip=null,n.pendingAvatarZipName="",n.avatarImporting=!1,n.avatarImportStatus=e.avatarImportSuccess(p.name||p.id),n.avatarImportTone="ok",M(),I()}catch(p){n.avatarImporting=!1,n.avatarImportStatus=`${e.avatarImportError}: ${String(p)}`,n.avatarImportTone="bad",I()}}},A=typeof ResizeObserver<"u"?new ResizeObserver(()=>S()):null;A==null||A.observe(s);let P=null;const O=()=>{const u=n.selectedPageId||"",p=n.selectedCardIndex;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=t.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&p!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${p}"]`,m=t.querySelector(c);m&&(m.dataset.editorSelectedCard="true")}},q=typeof MutationObserver<"u"?new MutationObserver(()=>O()):null;q==null||q.observe(t,{childList:!0,subtree:!0});const I=()=>{const u=n.config,p=u?G(u):[],c=p.find(y=>y.id===n.selectedPageId)||p[0]||null,m=Array.isArray(c==null?void 0:c.cards)?c.cards:[],$=n.selectedCardIndex!==null&&m[n.selectedCardIndex]||null,T=Fa(n.haEntities,n.entitySearch),N=n.focusedBinding?e.entityBindingActive(_(m[n.focusedBinding.cardIndex],"caption")||`${e.cards} #${n.focusedBinding.cardIndex+1}`,Ie(e,n.focusedBinding.field)):e.entityBindingEmpty,k=u?Le(u):"",X=n.pendingAvatarZipName?e.avatarImportSelected(n.pendingAvatarZipName):e.avatarImportHint,Q=n.avatarImportStatus?`<div class="scene-editor-status" data-tone="${n.avatarImportTone}">${g(n.avatarImportStatus)}</div>`:"",v=n.avatarCatalog.length>0;f.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${n.statusTone}">${g(n.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${g(a.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${n.saving||n.avatarPackSaving||!u?" disabled":""}>${n.saving||n.avatarPackSaving?e.saving:e.save}</button>
          <button class="scene-editor-button" type="button" data-action="add-page"${u?"":" disabled"}>${e.addPage}</button>
        </div>
      </div>
      <div class="scene-dashboard-body">
        <div class="scene-settings-stack">
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.avatar}</h2>
              <div class="meta">${e.avatarSubtitle}</div>
            </div>
          ${u?`
            <div class="avatar-pack-box">
              <div class="meta">${v?e.avatarPackHint:e.avatarPackEmpty}</div>
              ${v?`<div class="meta">${e.avatarPackAppliedAfterSave}</div>`:""}
              <div class="avatar-pack-grid">
                ${at(e,null,k)}
                ${n.avatarCatalog.map(y=>at(e,y,k)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label for="avatar-pack-archive">${e.avatarImportSelect}</label>
                <input id="avatar-pack-archive" type="file" accept=".zip,application/zip" data-avatar-archive hidden>
                <button class="scene-editor-button" type="button" data-action="open-avatar-archive"${n.avatarImporting||!a.avatarImportUrl?" disabled":""}>
                  ${n.avatarImporting?e.avatarImporting:e.avatarImportButton}
                </button>
              </div>
              <div class="meta">${g(X)}</div>
              ${Q}
            </div>
            ${k?n.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:n.avatarPackDetails?Va(e,n.avatarPackDetails):`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`:`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="cards">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(a.packId)}</div>
            </div>
            <div class="page-list">
            ${p.map((y,E)=>`
              <article class="page-chip ${y.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${g(y.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${g(y.id)}">
                  <strong>${g(y.title||y.id||`Page ${E+1}`)}</strong>
                  <span class="meta">${g(et(e,y.kind))} · ${g(e.pageCards(Array.isArray(y.cards)?y.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${g(y.id)}"${E===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${g(y.id)}"${E===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${g(y.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card" data-editor-section="homeAssistant">
            <div class="scene-settings-head">
              <h2>${e.inspector}</h2>
              <div class="meta">${e.pageSettings}</div>
            </div>
          ${c?`
            <div class="inspector-grid">
              ${se(e.fieldPageId,"id",Y(c,"id"),!0)}
              ${nt(e.fieldKind,"kind",Y(c,"kind"),Sa.map(y=>({value:y,label:et(e,y)})))}
              ${se(e.fieldTitle,"title",Y(c,"title"),!0)}
              ${se(e.fieldSubtitle,"subtitle",Y(c,"subtitle"),!0)}
              ${se(e.fieldSlot,"slot",Y(c,"slot"))}
              ${nt(e.fieldCardStyle,"cardStyle",Y(c,"cardStyle")||"full",xa.map(y=>({value:y,label:y==="mini"?e.styleMini:e.styleFull})))}
              ${se(e.fieldStampCaption,"stampCaption",Y(c,"stampCaption"))}
              ${se(e.fieldStampValue,"stampValue",Y(c,"stampValue"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.cards}</h2>
              <div class="meta">${e.cardsSubtitle}</div>
            </div>
          ${c?`
            <div class="card-stack">
              <div>
                <div class="meta">${e.cardTemplates}</div>
                <div class="card-template-grid" style="margin-top:12px;">
                  ${ht.map(y=>Ga(e,y)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${m.length?m.map((y,E)=>Ka(e,y,E,m.length,E===n.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${$?qa(e,$,n.selectedCardIndex||0,n.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              ${ae(e.fieldDisplaySafeTop,"safeTop",te(u,"safeTop"))}
              ${ae(e.fieldDisplaySafeRight,"safeRight",te(u,"safeRight"))}
              ${ae(e.fieldDisplaySafeBottom,"safeBottom",te(u,"safeBottom"))}
              ${ae(e.fieldDisplaySafeLeft,"safeLeft",te(u,"safeLeft"))}
              ${ae(e.fieldDisplayPadding,"layoutPaddingPx",te(u,"layoutPaddingPx"))}
              ${ae(e.fieldDisplayGap,"layoutGapPx",te(u,"layoutGapPx"))}
              ${ae(e.fieldDisplayScale,"globalScale",te(u,"globalScale"))}
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
            ${Wa(e,$,n.selectedCardIndex,n.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${g(n.entitySearch)}">
          </div>
          <div class="ha-list">
            ${T.length?T.map(y=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${g(y.name)}</strong>
                    <div class="meta">${g(y.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${g(y.entityId)}"${n.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${g(y.entityId)}</code>
                <div class="ha-state">${g(y.state)}${y.unit?` · ${g(y.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const D=f.querySelector("[data-preview-display]");D==null||D.addEventListener("change",()=>{C(D.value)}),D==null||D.addEventListener("input",()=>{C(D.value)});const K=f.querySelector("[data-avatar-archive]");K==null||K.addEventListener("change",()=>{var E;const y=((E=K.files)==null?void 0:E[0])||null;x(y),y&&L(y)});for(const y of Array.from(f.querySelectorAll(".page-chip[data-page-id]")))y.draggable=!0,y.addEventListener("dragstart",E=>{const H=String(y.dataset.pageId||"").trim();P=H?{kind:"page",pageId:H}:null,!(!P||!E.dataTransfer)&&(E.dataTransfer.effectAllowed="move",E.dataTransfer.setData("text/plain",JSON.stringify(P)))}),y.addEventListener("dragover",E=>{!P||P.kind!=="page"||(E.preventDefault(),ne(r),y.classList.add("is-drop-target"),E.dataTransfer&&(E.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",E=>{if(!P||P.kind!=="page")return;E.preventDefault();const H=String(y.dataset.pageId||"").trim();H&&ve(P.pageId,H),P=null,ne(r)}),y.addEventListener("dragend",()=>{P=null,ne(r)});for(const y of Array.from(f.querySelectorAll(".card-list-item[data-card-index]")))y.draggable=!0,y.addEventListener("dragstart",E=>{const H=Number(y.dataset.cardIndex||"-1");P=Number.isFinite(H)&&H>=0?{kind:"card",cardIndex:H}:null,!(!P||!E.dataTransfer)&&(E.dataTransfer.effectAllowed="move",E.dataTransfer.setData("text/plain",JSON.stringify(P)))}),y.addEventListener("dragover",E=>{!P||P.kind!=="card"||(E.preventDefault(),ne(r),y.classList.add("is-drop-target"),E.dataTransfer&&(E.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",E=>{if(!P||P.kind!=="card")return;E.preventDefault();const H=Number(y.dataset.cardIndex||"-1");Number.isFinite(H)&&H>=0&&ye(P.cardIndex,H),P=null,ne(r)}),y.addEventListener("dragend",()=>{P=null,ne(r)});S(),O()},z=(u,p)=>{n.status=u,n.statusTone=p,I()},R=()=>{if(!n.config)return;const u=G(n.config);if(!u.length){n.selectedPageId=null;return}(!n.selectedPageId||!u.some(m=>m.id===n.selectedPageId))&&(n.selectedPageId=u[0].id);const p=u.find(m=>m.id===n.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(n.selectedCardIndex===null||n.selectedCardIndex>=c.length)&&(n.selectedCardIndex=0):(n.selectedCardIndex=null,n.focusedBinding=null),Ua(n.selectedPageId),La(Pa(n.config,n.selectedPageId))},M=()=>{n.dirty=!0,z(e.statusDirty,"muted")},Z=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),n.selectedPageId&&u.searchParams.set("editorPage",n.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},re=(u,p)=>{if(!n.config||!n.selectedPageId)return;const c=n.config.pages.find(m=>m.id===n.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const m=vt(n.config,p||"page"),$=c.id;c.id=m,n.config.rotation.order=n.config.rotation.order.map(T=>T===$?m:T),n.selectedPageId=m}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);M(),R()}},me=(u,p)=>{if(!n.config)return;const c=yt(n.config),m=c.safeArea||{},$=p===""?null:Number(p),T=Number.isFinite($)?$:null;u==="safeTop"?m.top=T??0:u==="safeRight"?m.right=T??0:u==="safeBottom"?m.bottom=T??0:u==="safeLeft"?m.left=T??0:u==="layoutPaddingPx"?c.layoutPaddingPx=T??16:u==="layoutGapPx"?c.layoutGapPx=T??16:u==="globalScale"&&(c.globalScale=T??1),c.safeArea=m,M()},he=(u,p,c)=>{var T;if(!n.config||!n.selectedPageId)return;const m=n.config.pages.find(N=>N.id===n.selectedPageId);if(!m)return;Array.isArray(m.cards)||(m.cards=[]);const $=m.cards[u];if($){if(p==="type"){const N=Xe(c);if(m.cards[u]={...N,caption:_($,"caption")||N.caption},((T=n.focusedBinding)==null?void 0:T.cardIndex)===u){const k=rt(c);n.focusedBinding=k?{cardIndex:u,field:k}:null}}else p==="digits"?$[p]=c===""?0:Number(c):$[p]=c;M()}},ve=(u,p)=>{if(!n.config||!u||!p||u===p)return;const c=G(n.config).map(T=>T.id),m=c.indexOf(u),$=c.indexOf(p);m<0||$<0||(c.splice(m,1),c.splice($,0,u),n.config.rotation.order=c,n.selectedPageId=u,n.selectedCardIndex=0,n.focusedBinding=null,M(),R(),I())},ye=(u,p)=>{if(!n.config||!n.selectedPageId||u===p)return;const c=n.config.pages.find($=>$.id===n.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||p<0||u>=c.cards.length||p>=c.cards.length)return;const[m]=c.cards.splice(u,1);c.cards.splice(p,0,m),n.selectedCardIndex=p,n.focusedBinding=null,M(),I()},be=u=>{if(!n.config||!n.selectedPageId||!n.focusedBinding)return;const p=n.config.pages.find($=>$.id===n.selectedPageId),c=n.haEntities.find($=>$.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const m=p.cards[n.focusedBinding.cardIndex];m&&(Ja(m,n.focusedBinding.field,c),M(),I())},we=(u,p)=>{n.selectedCardIndex=u,n.focusedBinding={cardIndex:u,field:p},I(),window.requestAnimationFrame(()=>{const c=r.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};r.addEventListener("click",async u=>{var X,Q;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),m=c==null?void 0:c.dataset.action;if(!m)return;if(m==="apply-display-profile"&&n.config){const v=l.value||n.previewDisplayId;Ta(n.config,Ze(v)),M(),I();return}if(m==="open-avatar-archive"){const v=f.querySelector("[data-avatar-archive]");v==null||v.click();return}if(!n.config)return;const $=G(n.config),T=(c==null?void 0:c.dataset.pageId)||null,N=T?$.findIndex(v=>v.id===T):-1;if(m==="select-page"&&T){n.selectedPageId=T,n.selectedCardIndex=0,n.focusedBinding=null,R(),I();return}if(m==="page-up"&&N>0){const v=$.map(D=>D.id);[v[N-1],v[N]]=[v[N],v[N-1]],n.config.rotation.order=v,n.selectedPageId=T,M(),R(),I();return}if(m==="page-down"&&N>=0&&N<$.length-1){const v=$.map(D=>D.id);[v[N],v[N+1]]=[v[N+1],v[N]],n.config.rotation.order=v,n.selectedPageId=T,M(),R(),I();return}if(m==="page-remove"&&T&&$.length>1){n.config.pages=n.config.pages.filter(v=>v.id!==T),n.config.rotation.order=G(n.config).map(v=>v.id),n.selectedPageId=((X=G(n.config)[Math.max(0,N-1)])==null?void 0:X.id)||((Q=G(n.config)[0])==null?void 0:Q.id)||null,n.selectedCardIndex=0,n.focusedBinding=null,M(),R(),I();return}if(m==="add-page"){const v=Aa(n.config);n.config.pages.push(v),n.config.rotation.order=G(n.config).map(D=>D.id),n.selectedPageId=v.id,n.selectedCardIndex=null,n.focusedBinding=null,M(),R(),I();return}if(m==="add-card-template"&&n.selectedPageId){const v=n.config.pages.find(K=>K.id===n.selectedPageId),D=(c==null?void 0:c.dataset.cardType)||"entity";if(v){Array.isArray(v.cards)||(v.cards=[]),v.cards.push(Xe(D));const K=v.cards.length-1;n.selectedCardIndex=K;const y=rt(D);n.focusedBinding=y?{cardIndex:K,field:y}:null,M(),I(),y&&window.requestAnimationFrame(()=>{const E=r.querySelector("#ha-entity-search");E==null||E.scrollIntoView({behavior:"smooth",block:"center"}),E==null||E.focus()})}return}if(m==="focus-binding"){const v=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),D=(c==null?void 0:c.dataset.bindingField)||"";v>=0&&D&&we(v,D);return}const k=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(k>=0&&n.selectedPageId){const v=n.config.pages.find(D=>D.id===n.selectedPageId);if(!v||!Array.isArray(v.cards))return;if(m==="select-card"){n.selectedCardIndex=k,I();return}if(m==="card-remove"){v.cards=v.cards.filter((D,K)=>K!==k),n.selectedCardIndex!==null&&(n.selectedCardIndex===k?n.selectedCardIndex=v.cards.length?Math.min(k,v.cards.length-1):null:n.selectedCardIndex>k&&(n.selectedCardIndex-=1)),n.focusedBinding&&(n.focusedBinding.cardIndex===k?n.focusedBinding=null:n.focusedBinding.cardIndex>k&&(n.focusedBinding={cardIndex:n.focusedBinding.cardIndex-1,field:n.focusedBinding.field})),M(),I();return}if(m==="card-up"&&k>0){[v.cards[k-1],v.cards[k]]=[v.cards[k],v.cards[k-1]],n.selectedCardIndex===k?n.selectedCardIndex=k-1:n.selectedCardIndex===k-1&&(n.selectedCardIndex=k),n.focusedBinding&&(n.focusedBinding.cardIndex===k?n.focusedBinding={cardIndex:k-1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===k-1&&(n.focusedBinding={cardIndex:k,field:n.focusedBinding.field})),M(),I();return}if(m==="card-down"&&k<v.cards.length-1){[v.cards[k],v.cards[k+1]]=[v.cards[k+1],v.cards[k]],n.selectedCardIndex===k?n.selectedCardIndex=k+1:n.selectedCardIndex===k+1&&(n.selectedCardIndex=k),n.focusedBinding&&(n.focusedBinding.cardIndex===k?n.focusedBinding={cardIndex:k+1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===k+1&&(n.focusedBinding={cardIndex:k,field:n.focusedBinding.field})),M(),I();return}}if(m==="save"){n.saving=!0,n.avatarPackSaving=n.avatarPackDirty,z(e.saving,"muted");try{if(n.avatarPackDirty&&n.avatarPackDetails&&a.avatarPackApiUrl){try{n.avatarPackDetails=await Ha(a.avatarPackApiUrl,n.avatarPackDetails)}catch(v){throw new Error(`${e.avatarMappingSaveError}: ${String(v)}`)}n.avatarPackDirty=!1}n.config=await Ma(a.sceneApiUrl,_e(n.config)),n.dirty=!1,n.saving=!1,n.avatarPackSaving=!1,R(),z(e.statusSaved,"ok"),window.setTimeout(()=>Z(),250)}catch(v){n.saving=!1,n.avatarPackSaving=!1,z(`${e.saveError}: ${String(v)}`,"bad")}return}if(m==="bind-entity"){const v=(c==null?void 0:c.dataset.entityId)||"";be(v)}}),r.addEventListener("input",u=>{const p=u.target;if(!p||!n.config){p&&p.dataset.previewDisplay!==void 0&&C(p.value);return}if(p.dataset.previewDisplay!==void 0){C(p.value);return}if(p.dataset.avatarSemantic!==void 0){const c=Le(n.config);if(!n.avatarPackDetails||!c||n.avatarPackDetails.packId!==c)return;const m=p.value.trim();m?n.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic]=Number(m):delete n.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic],n.avatarPackDirty=!0,z(e.statusDirty,"muted"),I();return}if(p.dataset.pageField){re(p.dataset.pageField,p.value),I();return}if(p.dataset.displayField){me(p.dataset.displayField,p.value),I();return}if(p.dataset.cardField&&p.dataset.cardIndex){n.selectedCardIndex=Number(p.dataset.cardIndex),he(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),I();return}p.hasAttribute("data-ha-search")&&(n.entitySearch=p.value,I())}),r.addEventListener("click",u=>{var m;const p=(m=u.target)==null?void 0:m.closest("[data-action='select-avatar-pack']");if(!p||!n.config)return;const c=String(p.dataset.packId||"").trim();Qe(n.config).packId=c||null,M(),w(c||null).finally(()=>I()),I()}),t.addEventListener("click",u=>{if(!n.config)return;const p=u.target,c=p==null?void 0:p.closest("[data-scene-card-index][data-scene-page-id]");if(c){const $=String(c.dataset.scenePageId||"").trim(),T=Number(c.dataset.sceneCardIndex||"-1");$&&Number.isFinite(T)&&T>=0&&(n.selectedPageId=$,n.selectedCardIndex=T,n.focusedBinding=null,R(),I(),it("cards"));return}const m=p==null?void 0:p.closest("[data-scene-page-id]");if(m){const $=String(m.dataset.scenePageId||"").trim();$&&(n.selectedPageId=$,n.selectedCardIndex=0,n.focusedBinding=null,R(),I(),it("pages"));return}}),r.addEventListener("change",u=>{var c;const p=u.target;!p||p.dataset.avatarArchive===void 0||x(((c=p.files)==null?void 0:c[0])||null)}),r.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(n.selectedCardIndex=c,n.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(n.config=await Na(a.sceneApiUrl),a.avatarCatalogUrl)try{n.avatarCatalog=await tt(a.avatarCatalogUrl)}catch{n.avatarCatalog=[]}n.haEntities=Ba(((ce=ct())==null?void 0:ce.states)||null),n.selectedPageId=Da(n.config),n.selectedCardIndex=0,n.status=e.statusSaved,n.statusTone="ok",await w(Le(n.config)),R()}catch(u){n.status=`${e.loadError}: ${String(u)}`,n.statusTone="bad"}I()}const Za="../scene-api/bootstrap",Xa="weather.forecast_home_assistant",Qa="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",ei={...ut,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},ti={...pt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},ai={...ft,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},ii={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},ri={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function ni(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function si(){return new URLSearchParams(window.location.search).get("bootstrap")||Za}function oi(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function B(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const r=oi(e);if(r)return new URL(t.slice(1),r).toString()}return new URL(t,i).toString()}function Re(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function li(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function di(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function Ue(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function ci(a,e){var t,i,r,s,o,l,f,n;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([w,S])=>[w,B(S,e)]).filter(([,w])=>!!w)),avatar:{manifestUrl:B(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:B(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((r=a.state)==null?void 0:r.provider)||"json",stateUrl:B(String(((s=a.state)==null?void 0:s.stateUrl)||"").trim(),e),haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:B(String(((l=a.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:B(String(((f=a.state)==null?void 0:f.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:B(String(((n=a.control)==null?void 0:n.controlUrl)||"").trim(),e)}}}async function ui(a,e){var n,w,S,C;const t=B(String(((n=a.files)==null?void 0:n.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=B(String(((w=a.files)==null?void 0:w.sceneConfigUrl)||"").trim(),e),r=B(String(((S=a.files)==null?void 0:S.avatarCatalogUrl)||"").trim(),e);if(!i||!r)return t;let s="";try{const x=await Ue(i);s=String(((C=x.avatar)==null?void 0:C.packId)||"").trim()}catch{s=""}if(!s)return t;let o="";try{const x=await Ue(r),L=Array.isArray(x.items)?x.items.find(A=>String(A.id||"").trim()===s):null;o=B(String((L==null?void 0:L.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return t;const f={...ci(await Ue(t),t),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(f)],{type:"application/json"}))}const pe=document.getElementById("app");if(!pe)throw new Error("Missing #app root element");const oe=ri[ni()];Re(pe,oe.startingTitle,oe.startingBody);(async()=>{var e,t,i;const a=si();try{const r=await di(a),s=String(r.packId||"").trim(),o=s.toLowerCase()==="neiri",l=await ui(r,a);if(!l){Re(pe,oe.missingRendererTitle,oe.missingRendererBody,JSON.stringify(r,null,2));return}document.documentElement.dataset.packId=s,document.title=o?"Нейри":s?`kiosk-scene hosted runtime (${s})`:"kiosk-scene hosted runtime",await wa(pe,{rendererConfigUrl:l,weatherUrl:o?"./weather.json":void 0,weatherReader:o?ya({weatherEntity:Xa,openMeteoUrl:Qa,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:o?ei:void 0,labels:o?ti:void 0,presetLabels:o?ai:void 0,defaultWeather:o?ii:void 0}),li()&&await Ya({packId:s,sceneApiUrl:B(String(r.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:B(String(((e=r.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),avatarImportUrl:B(String(((t=r.files)==null?void 0:t.avatarImportUrl)||"").trim(),a),avatarPackApiUrl:B(String(((i=r.files)==null?void 0:i.avatarPackApiUrl)||"").trim(),a),sceneUrl:B(String(r.entryUrl||r.runtimeBaseUrl||"./").trim(),a)})}catch(r){Re(pe,oe.failedTitle,oe.failedBody,String(r))}})();
