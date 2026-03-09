var St=Object.defineProperty;var xt=(a,e,t)=>e in a?St(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var b=(a,e,t)=>xt(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function U(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function d(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function ze(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function fe(a,e){if(!U(a)||!U(e))return e??a;const t={...a};for(const[i,r]of Object.entries(e)){if(Array.isArray(r)){t[i]=r.slice();continue}if(U(r)&&U(t[i])){t[i]=fe(t[i],r);continue}t[i]=r}return t}function kt(a,e=40){return Array.isArray(a)?a.map(t=>d(t,e).toLowerCase()).filter(Boolean):[]}const Q={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},Ve={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function Ne(a){var t,i,r,s,o,l,m,w,n,x;const e=fe(Q,U(a)?a:{});return{version:1,assistant:{name:d((t=e.assistant)==null?void 0:t.name,40)||Q.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:U(e.links)?Object.fromEntries(Object.entries(e.links).map(([P,S])=>[d(P,64),d(S,1024)]).filter(([P,S])=>P&&S)):{},avatar:{manifestUrl:d((r=e.avatar)==null?void 0:r.manifestUrl,1024)||Q.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||Q.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||Q.state.stateUrl,haApiFallback:((m=e.state)==null?void 0:m.haApiFallback)===!0,idleLinesUrl:d((w=e.state)==null?void 0:w.idleLinesUrl,1024)||Q.state.idleLinesUrl,entityMapUrl:d((n=e.state)==null?void 0:n.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d((x=e.control)==null?void 0:x.controlUrl,1024)||Q.control.controlUrl}}}function ot(a){var t,i,r,s,o;const e=fe(Ve,U(a)?a:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||Ve.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:U(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,m])=>[d(l,32),d(m,1024)]).filter(([l,m])=>l&&m)):{},viewPresets:U(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,m])=>d(l,32)&&U(m))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((r=e.capabilities)==null?void 0:r.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const ae={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},$t=["full","torso","head"];function pe(a,e=Date.now()){var l,m,w,n,x,P,S;const t=fe(ae,U(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((l=t.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((m=t.page)==null?void 0:m.target,40)||null,until:d((w=t.page)==null?void 0:w.until,64)||null},cue:{cue:d((n=t.cue)==null?void 0:n.cue,32)||null,emotion:d((x=t.cue)==null?void 0:x.emotion,32)||null,motion:d((P=t.cue)==null?void 0:P.motion,32)||null,until:d((S=t.cue)==null?void 0:S.until,64)||null}},r=d(t.viewPreset,16).toLowerCase();i.viewPreset=$t.includes(r)?r:null;const s=ze(i.page.until);i.page.mode==="pinned"&&(!s||s<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=ze(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function Ee(a,e,t=Date.now()){return pe(fe(pe(a,t),U(e)?e:{}),t)}function Ct(a,e,t=Date.now()){return pe({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function It(a,e,t=3e4,i=Date.now()){const r=d(e,40),s=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return pe({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:r?"pinned":"auto",target:r||null,until:r?s:null}},i)}function lt(a,e){var o,l,m;const t={...a||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),r=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),s=d((m=e==null?void 0:e.cue)==null?void 0:m.motion,32);return i&&(t.cue=i),r&&(t.emotion=r),s&&(t.motion=s),t}function V(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function We(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function Pt(a){return U(a)&&U(a.config)?a.config:a}function Et(a,e){const t={...a};return U(e)&&(typeof e.id=="string"&&(t.id=d(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>U(i)))),t}function Ae(a,e){const t=Pt(a),i=Array.isArray(e.pages)?e.pages.slice():[],r=U(t)&&Array.isArray(t.pages)?t.pages:[],s=i.map(S=>{const L=r.find(A=>d(U(A)?A.id:"",40)===S.id);return Et(S,L)}),o=U(t)&&U(t.rotation)?t.rotation:{},l=U(e.display)?e.display:{},m=U(t)&&U(t.display)?t.display:{},w=U(l.safeArea)?l.safeArea:{},n=U(m.safeArea)?m.safeArea:{},x=Array.isArray(o.order)?o.order:e.rotation.order,P=kt(x).filter((S,L,A)=>s.some(B=>B.id===S)&&A.indexOf(S)===L);return{version:1,rotation:{order:P.length?P:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:V(n.top,V(w.top,0)),right:V(n.right,V(w.right,0)),bottom:V(n.bottom,V(w.bottom,0)),left:V(n.left,V(w.left,0))},layoutPaddingPx:V(m.layoutPaddingPx,V(l.layoutPaddingPx,16)),layoutGapPx:V(m.layoutGapPx,V(l.layoutGapPx,16)),globalScale:We(m.globalScale,We(l.globalScale,1))},pages:s}}function At(a,e=220){const t=d(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},r=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(s,o,l)=>{const m=d(o,16).toLowerCase(),w=d(l,32).toLowerCase();return(m==="emotion"||m==="activity"||m==="cue"||m==="motion")&&w&&(i[m]=w)," "});return{text:d(r,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const Tt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function le(a,e={}){const t=U(a)?a:{},i={...Tt,...e};return{version:1,assistant:d(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:d(t.status??i.status,255),message:d(t.message??i.message,255),source:d(t.source??i.source,64),updatedAt:d(t.updatedAt??i.updatedAt,64),emotion:d(t.emotion??i.emotion,32)||null,activity:d(t.activity??i.activity,32)||null,cue:d(t.cue??i.cue,32)||null,intensity:Lt(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:d(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:d(t.event??i.event,64)}}function Lt(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Ut(a,e){return a.order[e]||a.order[0]||""}function Dt(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function Nt(a,e,t,i){const r=Array.isArray(a.order)?a.order:[];if(!r.length)return 0;const s=Math.max(0,Math.min(e,r.length-1));for(let o=1;o<=r.length;o+=1){const l=(s+o*t+r.length)%r.length;if(i(r[l]))return l}return s}function Mt(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const r=a.control.page;if(r.mode==="pinned"&&r.target)return{nextIndex:Dt(a.rotation,r.target),nextAutoRotateAt:e,pinnedKey:`${r.target}:${r.until||""}`};if(a.force){const o=Ut(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(o)?a.activeIndex:Math.max(0,t.findIndex(m=>a.isEligible(m))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let s=a.activeIndex;for(let o=1;o<=t.length;o+=1){const l=(a.activeIndex+o)%t.length;if(a.isEligible(t[l])){s=l;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const dt={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Bt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function qe(a){const e=d(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Bt.some(t=>e.includes(t)):!1}function Rt(a,e){const t=le(a),i=d(t.status,72),r=d(t.message,220);if(!(t.online!==!1&&(qe(i)||qe(r))))return{state:t,hasTechnicalFailure:!1};const l=d(t.emotion,32).toLowerCase(),m=d(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(t.activity,32).toLowerCase()==="error"?"idle":d(t.activity,32)||null,cue:d(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:m==="error"?"idle_soft":m||null},hasTechnicalFailure:!0}}function Ft(a,e){const t=(e==null?void 0:e.copy)??dt,i=le(a),r=At(i.message,220),s=Rt({...i,message:r.text,emotion:d(i.emotion,32)||r.emotion||null,activity:d(i.activity,32)||r.activity||null,cue:d(i.cue,32)||r.cue||null,motion:d(i.motion,32)||r.motion||null},{healthyStatus:t.technicalHealthyLabel}),o=s.state,l=d(o.message,180),m=d(o.activity,32).toLowerCase(),w=o.online!==!1&&m!=="offline",n=!!o.busy||m==="thinking"||m==="busy"||m==="acting",x=o.speaking===!0||m==="speaking",P=w?n?t.busyLabel:l||x?t.speakingLabel:s.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,S=l?t.messageCaption:s.hasTechnicalFailure?t.statusCaption:t.modeCaption,L=l||(w?n?t.busyBody:d(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:o,hasTechnicalFailure:s.hasTechnicalFailure,caption:S,label:P,body:L,bodyKey:[S,P,L].join(":")}}function _t(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function Ke(a,e=-1){const t=Array.isArray(a)?a.map(r=>d(r,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function Ot(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!d(a==null?void 0:a.message,180);return e&&!t&&!i}const Ht={cue:null,emotion:null,motion:null,until:null},jt={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function zt(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function ct(a){return a.endsWith("/")?a:`${a}/`}function xe(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(ct(d(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function $e(a){const e=d(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function Vt(a,e,t){const i=d(a.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?$e(i):new URL("../avatar.html",new URL(ct(d(t,1024)||"."),window.location.href)).toString()}function Wt(a,e){const t=d(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function qt(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[r,s]of Object.entries(i)){const o=d(r,64);if(!o||s==null)continue;const l=typeof s=="boolean"?s?"1":"0":String(s);t.searchParams.set(o,l)}return t.toString()}function Kt(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([r,s])=>[d(r,32),xe(t,s)]).filter(([r,s])=>r&&s));return{version:1,assistant:{name:d(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([r,s])=>[d(r,64),$e(s)]).filter(([r,s])=>r&&s)),state:{stateUrl:$e(a.state.stateUrl),idleLinesUrl:$e(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:xe(t,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:xe(t,e.fallbackPortrait||""),motionMapUrl:xe(t,e.motionMapUrl||""),presetThumbs:i}}}class Gt{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"currentState");b(this,"currentCue",{...Ht});b(this,"currentPreset","full");b(this,"currentBubble",{...jt});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var r;const t=(r=this.iframeEl)==null?void 0:r.contentWindow;if(!t||e.source!==t||!zt(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=ot({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Ne(e.rendererConfig||{}),this.currentState=le({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const t=Vt(this.options,this.manifest,this.assetRoot),i=qt(t,this.options);this.targetOrigin=Wt(i,this.options.targetOrigin);const r=document.createElement("div");r.className="ks-live2d-frame",Object.assign(r.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const s=document.createElement("iframe");s.className="ks-live2d-iframe",s.src=i,s.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,s.loading="eager",s.allow="autoplay",Object.assign(s.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&s.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);r.append(s,o),this.host.append(r),s.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=r,this.iframeEl=s,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=le(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const r=document.createElement("div");r.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(r.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(r,s),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Kt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=lt(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function Jt(a={}){return new Gt(a)}const Yt={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Ge={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Zt{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const r=document.createElement("div");r.className="ks-static-avatar-fallback",r.textContent=this.options.alt||"Avatar",Object.assign(r.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,r,s),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=r;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||Ge,i=t[e]||t.full||Ge.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Yt}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");return i?`${i}/${r}`:r}}function Xt(a={}){return new Zt(a)}function Qt(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function ut(){var a;for(const e of Qt())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function ea(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function ta(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=d(t.entity_id,255);i&&(e[i]=t)}return e}function aa(a,e,t="Assistant"){const i=a[e.status],r=a[e.message],s=a[e.online],o=a[e.busy],l=a[e.source],m=a[e.updatedAt],w=e.emotion?a[e.emotion]:null,n=e.activity?a[e.activity]:null,x=e.cue?a[e.cue]:null,P=e.speaking?a[e.speaking]:null,S=e.intensity?a[e.intensity]:null,L=e.motion?a[e.motion]:null,A=a[e.revision];if(!i&&!r&&!s&&!o)return null;const B=d(i==null?void 0:i.state,72),T=d(r==null?void 0:r.state,220),G=d(m==null?void 0:m.state,64),J=Te(s,!0),C=Te(o,!1),z=d(n==null?void 0:n.state,32)||"",D=Te(P)??z==="speaking",ie=z||(J?D?"speaking":C?"thinking":"idle":"offline");return le({version:1,assistant:d(t,40)||"Assistant",online:J,busy:C,status:B&&B!=="unknown"&&B!=="unavailable"?B:"",message:T&&T!=="unknown"&&T!=="unavailable"?T:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:G&&G!=="unknown"&&G!=="unavailable"?G:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(w==null?void 0:w.state,32)||null,activity:ie,cue:d(x==null?void 0:x.state,32)||null,intensity:ia(S),speaking:D,motion:d(L==null?void 0:L.state,32)||null,revision:Number(A==null?void 0:A.state)||0})}function Te(a,e){const t=d(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function ia(a){const e=d(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function ra(a){const e=Fe(a);return{id:"ha-state",async read(){const t=await e.read();return t?aa(t,a.entityMap,a.assistantName):null}}}function Fe(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let r=null,s=0,o=null,l=0;async function m(){var P;const w=ut();if(w!=null&&w.states)return w.states;const n=Date.now();if(r&&n-s<t||!a.allowApiFallback||typeof e!="function"||n<l)return r;if(o)return o;const x=d(((P=a.readToken)==null?void 0:P.call(a))??ea(),4096);return x?(o=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${x}`}}).then(async S=>{if(!S.ok){const L=new Error(`HA states HTTP ${S.status}`);throw L.status=S.status,L}return S.json()}).then(S=>{const L=ta(S);return L&&(r=L,s=Date.now()),L||r}).catch(S=>(((S==null?void 0:S.status)===401||(S==null?void 0:S.status)===403)&&(l=Date.now()+i),r)).finally(()=>{o=null}),o):r}return{id:"ha-states",async read(){return m()}}}async function _e(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=d(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const r=await e(i.toString(),{cache:"no-store"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json();return a.sanitize?a.sanitize(s):s}catch(r){if(a.defaultValue!==void 0)return a.defaultValue;throw r}}function na(a){return{id:"json-state",async read(){const e=await _e({...a,defaultValue:a.defaultValue});return le(e)}}}function Je(a){return{id:"json-control",async read(){const e=await _e({...a,defaultValue:a.defaultValue??ae});return pe(e)}}}function sa(a){return{id:"json-lines",async read(){const e=await _e({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>d(t,220)).filter(Boolean):[]}}}function _(a,e,t=64){return d(a[e],t)}function ce(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function oa(a,e="en-US"){const t=d(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ke(a,e){return!a||!e?null:a[e]||null}function la(a,e=null,t="en-US"){var x,P,S,L;const i=_(a,"caption",40)||_(a,"type",24)||"Card",r=_(a,"hint",72),s=_(a,"type",32).toLowerCase()||"entity",o=_(a,"entity",255),l=ke(e,o),m=ke(e,_(a,"stateEntity",255)),w=ke(e,_(a,"downEntity",255)),n=ke(e,_(a,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:_(a,"value",64)||"—",hint:r||"static card"};if(s==="todo"){const A=Number(l==null?void 0:l.state);return!Number.isFinite(A)||A<=0?{caption:i,value:"Clear",hint:r||"nothing pending"}:{caption:i,value:`${A} item${A===1?"":"s"}`,hint:r||"pending tasks"}}if(s==="onoff"){const A=(l==null?void 0:l.state)==="on";return{caption:i,value:A?_(a,"onText",48)||"On":_(a,"offText",48)||"Off",hint:r||"device state"}}if(s==="battery"){const A=ce(l==null?void 0:l.state,0);return{caption:i,value:A?`${A}%`:"—",hint:d(m==null?void 0:m.state,48)||r||"battery level"}}if(s==="network"){const A=ce(w==null?void 0:w.state,0),B=ce(n==null?void 0:n.state,0);return{caption:i,value:A||B?`↓ ${A||"0"} · ↑ ${B||"0"}`:"—",hint:r||"throughput"}}if(s==="time")return{caption:i,value:oa(l==null?void 0:l.state,t)||"—",hint:r||"next event"};if(s==="percent"){const A=ce(l==null?void 0:l.state,Number(_(a,"digits",4))||0);return{caption:i,value:A?`${A}%`:"—",hint:r||d((x=l==null?void 0:l.attributes)==null?void 0:x.friendly_name,48)||"state percentage"}}if(s==="number"){const A=Number(_(a,"digits",4))||0,B=ce(l==null?void 0:l.state,A),T=_(a,"unit",16)||d((P=l==null?void 0:l.attributes)==null?void 0:P.unit_of_measurement,16);return{caption:i,value:B?`${B}${T?` ${T}`:""}`:"—",hint:r||d((S=l==null?void 0:l.attributes)==null?void 0:S.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||_(a,"value",64)||"—",hint:r||d((L=l==null?void 0:l.attributes)==null?void 0:L.friendly_name,48)||"entity state"}}function da(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>la(i,e,t)):[]}const pt={...dt,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},ft={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},gt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},ca={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Ce={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function h(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function mt(a){return a.endsWith("/")?a:`${a}/`}function W(a,e){const t=d(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function ht(a){return new URL(".",a).toString()}function ua(a,e){const t=ht(e),i=W(t,d(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:W(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([r,s])=>[r,W(t,s)]).filter(([,r])=>!!r))}}function Le(a){return{...Ce,...a||{},metrics:{...Ce.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):Ce.forecast.map(e=>({...e}))}}function Ye(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function j(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function pa(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${j(t)} мм рт. ст.`:`${j(t*.750061683,0)} мм рт. ст.`}function fa(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${j(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${j(t/3.6,1)} м/с`:`${j(t,1)} м/с`}function ga(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ma(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function ha(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function va(a,e="ru-RU"){const t=d(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||d(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function Ze(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function ya(a,e="./assets/icons"){const t=Number(a),i=mt(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function ba(a){const e=d(a.locale,32)||"ru-RU",t=d(a.iconBaseUrl,1024)||"./assets/icons",i=Fe({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var L,A,B,T,G,J,C,z,F,D,ie,ge,me,he,ve,ye,be,we,de,u;const r=await i.read(),s=a.fetchImpl??globalThis.fetch,o=r==null?void 0:r[a.weatherEntity];let l=null;const m=d(a.openMeteoUrl,4096);if(m&&typeof s=="function")try{const p=await s(`${m}${m.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});p.ok&&(l=await p.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const w=d(o==null?void 0:o.last_changed,64)||d((L=l==null?void 0:l.current)==null?void 0:L.time,64)||new Date().toISOString(),n=o?va(o.state,e):Ze((A=l==null?void 0:l.current)==null?void 0:A.weather_code,e),x=Array.isArray((B=l==null?void 0:l.daily)==null?void 0:B.time)?l.daily.time.map((p,c)=>{var $,I,M,k,X;const g=new Date(`${p}T12:00:00+03:00`);return{name:g.toLocaleDateString(e,{weekday:"short"}),dayNumber:g.toLocaleDateString(e,{day:"numeric"}),monthShort:g.toLocaleDateString(e,{month:"short"}),note:d(Ze(($=l.daily.weather_code)==null?void 0:$[c],e),28),max:`${j((I=l.daily.temperature_2m_max)==null?void 0:I[c])}°`,min:`${j((M=l.daily.temperature_2m_min)==null?void 0:M[c])}° · ${j((k=l.daily.precipitation_probability_max)==null?void 0:k[c])}%`,icon:ya((X=l.daily.weather_code)==null?void 0:X[c],t)}}):[],P=x[0]||null,S=x.slice(1,6);return{todayValue:ma(w,e),todayLabel:ha(w,e),updatedAt:ga(w,e),temperature:j(((T=o==null?void 0:o.attributes)==null?void 0:T.temperature)??((G=l==null?void 0:l.current)==null?void 0:G.temperature_2m),1),condition:n,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${j(((J=o==null?void 0:o.attributes)==null?void 0:J.apparent_temperature)??((C=l==null?void 0:l.current)==null?void 0:C.apparent_temperature)??((z=o==null?void 0:o.attributes)==null?void 0:z.temperature),1)}°C`,badgeSummary:n,badgeRange:P?`${P.max} / ${j((D=(F=l==null?void 0:l.daily)==null?void 0:F.temperature_2m_min)==null?void 0:D[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${j(((ie=o==null?void 0:o.attributes)==null?void 0:ie.humidity)??((ge=l==null?void 0:l.current)==null?void 0:ge.relative_humidity_2m))}%`,pressure:pa(((me=o==null?void 0:o.attributes)==null?void 0:me.pressure)??((he=l==null?void 0:l.current)==null?void 0:he.surface_pressure),((ve=o==null?void 0:o.attributes)==null?void 0:ve.pressure_unit)??"hPa"),wind:fa(((ye=o==null?void 0:o.attributes)==null?void 0:ye.wind_speed)??((be=l==null?void 0:l.current)==null?void 0:be.wind_speed_10m),((we=o==null?void 0:o.attributes)==null?void 0:we.wind_speed_unit)??"km/h"),clouds:`${j(((de=o==null?void 0:o.attributes)==null?void 0:de.cloud_coverage)??((u=l==null?void 0:l.current)==null?void 0:u.cloud_cover))}%`},forecast:S}}}class wa{constructor(e,t={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"entityMap",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",ae);b(this,"uiControl",ae);b(this,"currentControl",ae);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...pt,...t.copy||{}},this.labels={...ft,...t.labels||{}},this.presetLabels={...gt,...t.presetLabels||{}},this.weatherData=Le(t.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=W(window.location.href,this.getRendererConfigUrl()),t=ht(e),i=Ne(await this.readJson(e)),r=Ne({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,W(t,l)])),avatar:{...i.avatar,manifestUrl:W(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:W(t,i.scene.configUrl)},state:{...i.state,stateUrl:W(t,i.state.stateUrl),idleLinesUrl:W(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?W(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:W(t,i.control.controlUrl)}});this.rendererConfig=r;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=ua(ot(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await sa({url:this.rendererConfig.state.idleLinesUrl||W(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Je({url:this.rendererConfig.control.controlUrl,defaultValue:ae}).read(),this.currentControl=Ee(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=Ct(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,r;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(r=(i=this.carouselShellEl).setPointerCapture)==null||r.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:r}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(r)>=s*.16,l=r<0?1:-1;if(this.clearDragState(t.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Je({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=Ee(ae,this.uiControl),this.currentControl=Ee(this.remoteControl,this.uiControl);const e=lt(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=Ft(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=Ae(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const r=this.getOrderedPages(i.pages,i.rotation.order),s=Mt({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>r.some(l=>l.id===o)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(r,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,r)=>i.kind==="overview"?this.renderOverviewSlide(i,t,r):this.renderDynamicSlide(i,r,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,r)=>`
      <button
        class="carousel-dot ${r===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${r}"
        data-scene-page-id="${h(i.id)}"
        aria-label="${h(d(i.title,40)||`Page ${r+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t,i){const r=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||Ce,o=s.forecast.slice(0,5).map(l=>this.renderForecastDay(l)).join("");return`
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
    `}renderDynamicSlide(e,t,i){const r=da(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${t+1} / ${i}`),m=e.cardStyle==="mini"?r.map((x,P)=>`
          <article class="mini-card" data-scene-card-index="${P}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(x.caption)}</span>
            <strong>${h(x.value)}</strong>
          </article>
        `).join(""):r.map((x,P)=>`
          <article class="home-card" data-scene-card-index="${P}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(x.caption)}</span>
            <strong>${h(x.value)}</strong>
            <small>${h(x.hint)}</small>
          </article>
        `).join(""),w=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(x=>this.renderForecastDay(x)).join("")}</div>`:"",n=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
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
          ${w}
          <div class="${n}">
            ${m||`<div class="empty">${h(this.labels.noCardsConfigured)}</div>`}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],i=e[e.length-1];return`${d(t.dayNumber,4)} ${d(t.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var r;const t=d((r=this.options.iconUrls)==null?void 0:r[e],1024);return t||`${mt(d(this.options.iconBaseUrl,1024)||"./assets")}${ca[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:r,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${r}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,t){const i=t.map(s=>e.find(o=>o.id===s)).filter(Boolean),r=e.filter(s=>!i.some(o=>o.id===s.id));return i.concat(r)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,r;!t&&((r=(i=this.carouselShellEl).hasPointerCapture)!=null&&r.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=Ae(this.sceneConfig,this.sceneConfig),i=Nt(t.rotation,this.activeIndex,e,r=>this.orderedPages.some(s=>s.id===r));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const r=Ae(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,r.rotation.defaultDwellMs*2);this.uiControl=It(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!Ot(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=Ke(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=Ke(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},_t(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>na({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await ra({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:Fe({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=Ye(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=Ye(e,t)}catch{}try{return Le(e)}catch{return Le(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Jt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Xt({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",r=t.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),r&&(s?(r.src=s,r.removeAttribute("hidden")):(r.src="",r.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function Sa(a,e={}){const t=new wa(a,e);return await t.init(),t}const xa=["overview","cards","forecast+cards"],ka=["full","mini"],vt=["entity","text","todo","onoff","battery","network","time","percent","number"],Y=["caption","hint"],$a={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Ca={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Подставить в настройки экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Сейчас сцена использует аватар из текущего scene-pack. Ниже можно импортировать отдельные Live2D-модели и переключаться между ними.",avatarPack:"Набор аватара",avatarPackCurrent:"Встроенный avatar.manifest.json",avatarPackHint:"Ниже можно выбрать встроенный аватар текущего пакета или один из отдельно импортированных avatar-pack.",avatarPackEmpty:"Отдельные avatar-pack ещё не импортированы. Пока используется встроенный аватар текущего scene-pack.",avatarPackAppliedAfterSave:"Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",avatarPackDefaultTile:"Аватар текущего пакета",avatarPackDefaultHint:"Использовать встроенный аватар из scene-pack без отдельного avatar-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:a=>`${a} motion`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Импорт аватара",avatarImportHint:"Выбери zip-архив с Live2D-моделью. Kiosk Scene сразу импортирует его в avatar-packs, найдёт model3.json и создаст draft motion-map.",avatarImportSelect:"Выбрать ZIP аватара",avatarImportSelected:a=>`Выбран архив: ${a}`,avatarImportButton:"Выбрать и импортировать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:a=>`Импортирован avatar-pack: ${a}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для semantic cue/activity в runtime.",avatarMappingEmpty:"Выбери отдельный avatar-pack, чтобы редактировать его motion-map.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Idle / ожидание",avatarSemanticTouch:"Touch / касание",avatarSemanticReplySoft:"Reply soft / мягкий ответ",avatarSemanticThink:"Think / размышление",avatarSemanticBusy:"Busy / занята",avatarSemanticCalm:"Calm / спокойствие",avatarSemanticHappy:"Happy / радость",avatarSemanticSurprise:"Surprise / удивление",avatarSemanticWarning:"Warning / предупреждение",avatarSemanticGreet:"Greet / приветствие",avatarSemanticSpeaking:"Speaking / говорит",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardsSubtitle:"Сначала выбери или добавь карточку, затем настрой её ниже. Порядок здесь же влияет на правую карусель.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку из шаблона выше или выбери существующую карточку из списка.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(a,e)=>`Сейчас связываем: ${a} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Fill display settings below",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"The scene currently uses the avatar bundled with this scene-pack. You can import separate Live2D models below and switch between them.",avatarPack:"Avatar pack",avatarPackCurrent:"Bundled avatar.manifest.json",avatarPackHint:"Choose either the bundled avatar from the current scene-pack or one of the imported avatar packs below.",avatarPackEmpty:"No separate avatar packs have been imported yet. The bundled scene-pack avatar is active for now.",avatarPackAppliedAfterSave:"The selected avatar pack will apply after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene avatar",avatarPackDefaultHint:"Use the avatar bundled directly with the scene-pack, without a separate avatar-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:a=>`${a} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Import avatar",avatarImportHint:"Choose a Live2D zip archive. Kiosk Scene will immediately import it into avatar-packs, detect model3.json and create a draft motion map.",avatarImportSelect:"Choose avatar ZIP",avatarImportSelected:a=>`Selected archive: ${a}`,avatarImportButton:"Choose and import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:a=>`Imported avatar pack: ${a}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map semantic cue/activity slots to actual model motions used by the runtime.",avatarMappingEmpty:"Choose a separate avatar pack to edit its motion map.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardsSubtitle:"Add or choose a card first, then edit it below. The order here drives the right-hand carousel.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card from the templates above or choose an existing one from the list.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(a,e)=>`Binding now: ${a} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Ia=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Ie=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Me="mellow-fly-7";function Be(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Xe(a){return Ie.find(e=>e.id===a)||Ie.find(e=>e.id===Me)||Ie[0]}function Pa(a){return`${a.width} × ${a.height}`}function f(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Oe(a){return JSON.parse(JSON.stringify(a))}function K(a){const e=new Map(a.pages.map(r=>[r.id,r])),t=a.rotation.order.map(r=>e.get(r)).filter(Boolean),i=a.pages.filter(r=>!t.some(s=>s.id===r.id));return[...t,...i]}function Ea(a,e){return e?Math.max(0,K(a).findIndex(t=>t.id===e)):0}function Aa(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function yt(a,e){const t=Aa(e);let i=t,r=2;for(;a.pages.some(s=>s.id===i);)i=`${t}-${r}`,r+=1;return i}function Ta(a){const e=a.pages.length+1;return{id:yt(a,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function Qe(a){switch(a){case"text":return{type:a,caption:"Text",value:"—",hint:""};case"todo":return{type:a,caption:"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:a,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:"Time",entity:"",hint:""};case"percent":return{type:a,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function O(a,e){const t=a[e];return t==null?"":String(t)}function Z(a,e){const t=a[e];return t==null?"":String(t)}function ee(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function bt(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function Ue(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function et(a){return a.avatar||(a.avatar={}),a.avatar}function La(a,e){const t=bt(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function Ua(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function Da(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Na(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&K(a).some(r=>r.id===t)?t:((i=K(a)[0])==null?void 0:i.id)||null}async function Ma(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return Oe(t.config)}async function Ba(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return Oe(i.config)}function He(a){switch(a){case"text":return[...Y,"value"];case"todo":return[...Y,"entity"];case"onoff":return[...Y,"entity","onText","offText"];case"battery":return[...Y,"entity","stateEntity"];case"network":return[...Y,"downEntity","upEntity"];case"time":return[...Y,"entity"];case"percent":return[...Y,"entity","digits"];case"number":return[...Y,"entity","digits","unit"];default:return[...Y,"entity"]}}function tt(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function oe(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function wt(a){const e=Be();return $a[e][a]||""}function Pe(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Ra(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),r=a.includes(".")&&a.split(".",1)[0]||"other",s=String(e.state||""),o=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:r,state:s,unit:o}}function Fa(a){return a?Object.entries(a).map(([e,t])=>Ra(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function _a(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function at(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(r=>({id:String(r.id||"").trim(),name:String(r.name||r.id||"").trim(),manifestUrl:String(r.manifestUrl||"").trim(),previewUrl:String(r.previewUrl||"").trim(),motionCount:Number(r.motionCount||0),capabilities:typeof r.capabilities=="object"&&r.capabilities?{supportsMotion:!!r.capabilities.supportsMotion,supportsEmotion:!!r.capabilities.supportsEmotion,supportsLipSync:!!r.capabilities.supportsLipSync}:void 0})).filter(r=>r.id&&r.manifestUrl):[]}async function Oa(a,e){const t=String(a||"").trim();if(!t)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const r=await fetch(t,{method:"POST",body:i}),s=await r.json();if(!r.ok||s.success===!1||!s.item)throw new Error(String(s.error||`HTTP ${r.status}`));return{id:String(s.item.id||"").trim(),name:String(s.item.name||s.item.id||"").trim(),manifestUrl:String(s.item.manifestUrl||"").trim(),previewUrl:String(s.item.previewUrl||"").trim(),motionCount:Number(s.item.motionCount||0),capabilities:typeof s.item.capabilities=="object"&&s.item.capabilities?{supportsMotion:!!s.item.capabilities.supportsMotion,supportsEmotion:!!s.item.capabilities.supportsEmotion,supportsLipSync:!!s.item.capabilities.supportsLipSync}:void 0}}async function Ha(a,e){var o,l,m,w;const t=String(a||"").trim(),i=String(e||"").trim();if(!t||!i)throw new Error("Avatar pack API is not configured.");const r=await fetch(`${t}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await r.json();if(!r.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${r.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((o=s.motionMap)==null?void 0:o.motions)?(l=s.motionMap)==null?void 0:l.motions.map(n=>({index:Number(n.index),id:String(n.id||"").trim(),label:String(n.label||n.id||"").trim(),group:String(n.group||"").trim(),tags:Array.isArray(n.tags)?n.tags.map(x=>String(x||"").trim()).filter(Boolean):[]})).filter(n=>Number.isFinite(n.index)):[],semantic:typeof((m=s.motionMap)==null?void 0:m.semantic)=="object"&&((w=s.motionMap)!=null&&w.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function ja(a,e){var s,o,l;const t=String(a||"").trim();if(!t||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${t}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),r=await i.json();if(!i.ok||r.success===!1||!r.packId)throw new Error(String(r.error||`HTTP ${i.status}`));return{packId:String(r.packId||"").trim(),manifest:r.manifest||e.manifest,motionMap:{motions:Array.isArray((s=r.motionMap)==null?void 0:s.motions)?r.motionMap.motions:e.motionMap.motions,semantic:typeof((o=r.motionMap)==null?void 0:o.semantic)=="object"&&((l=r.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(r.motionMap.semantic)):e.motionMap.semantic}}}function za(a){if(Array.isArray(a)){const e=a.find(t=>Number.isFinite(Number(t)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(a))?String(Number(a)):""}function Va(a,e){const t=a[e.labelKey];return typeof t=="string"?t:e.key}function Wa(a,e){const t=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${a.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Ia.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${f(i.key)}">${f(Va(a,i))}</label>
            <select id="avatar-semantic-${f(i.key)}" data-avatar-semantic="${f(i.key)}">
              <option value="">${f(a.avatarMotionNone)}</option>
              ${t.map(r=>`
                <option value="${f(String(r.index))}"${za(e.motionMap.semantic[i.key])===String(r.index)?" selected":""}>
                  ${f(`${r.label||r.id} · #${r.index}`)}
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
              <strong>${f(i.label||i.id||`Motion ${i.index}`)}</strong>
              <span class="meta">${f(`${a.avatarMappingMotion} #${i.index} · ${i.group||"motion"}`)}</span>
              <code>${f(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${a.avatarMappingSaveHint}</div>
    </div>
  `}function it(a,e,t){var w,n,x;const i=(e==null?void 0:e.id)||"",r=t===i,s=(e==null?void 0:e.name)||a.avatarPackDefaultTile,o=(e==null?void 0:e.id)||a.avatarPackCurrent,l=(e==null?void 0:e.previewUrl)||"",m=e?[e.motionCount>0?a.avatarPackMotionCount(e.motionCount):"",(w=e.capabilities)!=null&&w.supportsMotion?a.avatarCapabilityMotion:"",(n=e.capabilities)!=null&&n.supportsEmotion?a.avatarCapabilityEmotion:"",(x=e.capabilities)!=null&&x.supportsLipSync?a.avatarCapabilityLipSync:""].filter(Boolean):[a.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${r?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${l?`<img src="${f(l)}" alt="${f(s)}">`:`<span>${f(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${f(s)}</strong>
        <div class="meta">${f(o)}</div>
        <div class="avatar-pack-card-meta">
          ${m.map(P=>`<span>${f(P)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${r?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${f(i)}">
          ${f(r?a.avatarPackSelected:a.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function je(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function qa(a,e,t,i){if(!e||t===null)return`<div class="meta">${f(a.entityBindingEmpty)}</div>`;const r=He(O(e,"type")||"entity").filter(s=>je(s));return r.length?`
    <div class="binding-targets">
      ${r.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===t&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${t}" data-binding-field="${f(s)}">
            ${f(Pe(a,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${f(a.entityBindingNoTargets)}</div>`}function rt(a){const e=document.querySelector(`[data-editor-section="${a}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function re(a){for(const e of Array.from(a.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function nt(a){return He(a).find(e=>je(e))||null}function ne(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${f(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${f(e)}" value="${f(t)}">
    </div>
  `}function te(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${f(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${f(e)}" value="${f(t)}">
    </div>
  `}function st(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${f(a)}</label>
      <select id="page-select-${e}" data-page-field="${f(e)}">
        ${i.map(r=>`<option value="${f(r.value)}"${r.value===t?" selected":""}>${f(r.label)}</option>`).join("")}
      </select>
    </div>
  `}function Ka(a,e,t,i){const r=O(e,"type")||"entity",s=He(r);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${f(O(e,"caption")||oe(a,r))}</strong>
          <div class="meta">${f(oe(a,r))}</div>
        </div>
        <div class="meta">#${t+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${f(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${vt.map(o=>`<option value="${o}"${o===r?" selected":""}>${f(oe(a,o))}</option>`).join("")}
          </select>
        </div>
        ${s.map(o=>{const l=je(o),m=l&&(i==null?void 0:i.cardIndex)===t&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${m?" is-active":""}">
                <label>${f(Pe(a,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${f(o)}"
                    data-binding-field="${f(o)}"
                    value="${f(O(e,o))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${t}"
                    data-binding-field="${f(o)}"
                  >${a.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${o==="hint"?"is-wide":""}">
              <label>${f(Pe(a,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${f(o)}"
                value="${f(O(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Ga(a,e,t,i,r){const s=O(e,"type")||"entity",o=O(e,"caption")||oe(a,s),l=O(e,"entity")||O(e,"stateEntity")||O(e,"downEntity")||O(e,"upEntity")||O(e,"value")||O(e,"hint")||wt(s);return`
    <article class="card-list-item${r?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${t}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${t}">
        <strong>${f(o)}</strong>
        <span class="meta">${f(oe(a,s))}</span>
        <div class="meta">${f(l)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
      </div>
    </article>
  `}function Ja(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${f(e)}"
    >
      <strong>${f(oe(a,e))}</strong>
      <span>${f(wt(e))}</span>
    </button>
  `}function Ya(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function Za(a){var de;const e=Ca[Be()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const r=document.createElement("section");r.id="scene-editor-shell",r.innerHTML=`
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
                ${Ie.map(u=>`<option value="${f(u.id)}">${f(u.label[Be()])}</option>`).join("")}
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
          <div class="scene-preview-stage" data-preview-stage>
            <div class="scene-preview-canvas" data-preview-canvas></div>
          </div>
        </div>
      </section>
      <section class="scene-dashboard" data-dashboard></section>
    </div>
  `,document.body.appendChild(r),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=r.querySelector("[data-preview-stage]"),o=r.querySelector("[data-preview-canvas]"),l=r.querySelector("[data-preview-resolution]"),m=r.querySelector("[data-preview-display]"),w=r.querySelector("[data-dashboard]");if(!s||!o||!l||!m||!w)throw new Error("Missing native editor shell elements");o.appendChild(t);const n={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Me,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},x=async u=>{const p=String(u||"").trim();if(!p||!a.avatarPackApiUrl){n.avatarPackDetails=null,n.avatarPackLoading=!1,n.avatarPackDirty=!1;return}n.avatarPackLoading=!0,C();try{n.avatarPackDetails=await Ha(a.avatarPackApiUrl,p),n.avatarPackDirty=!1}catch(c){n.avatarPackDetails=null,n.avatarPackDirty=!1,z(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{n.avatarPackLoading=!1}},P=()=>{var I;const u=Xe(n.previewDisplayId),p=Math.max(320,((I=s.parentElement)==null?void 0:I.clientWidth)||s.clientWidth||u.width),c=Math.min(1,p/u.width),g=Math.round(u.width*c),$=Math.round(u.height*c);m.value=u.id,l.textContent=Pa(u),s.style.width=`${g}px`,s.style.height=`${$}px`,o.style.width=`${u.width}px`,o.style.height=`${u.height}px`,o.style.transform=`scale(${c})`,t.style.width=`${u.width}px`,t.style.height=`${u.height}px`},S=u=>{n.previewDisplayId=String(u||"").trim()||Me,P()},L=u=>{n.pendingAvatarZip=u,n.pendingAvatarZipName=(u==null?void 0:u.name)||"",n.avatarImportStatus="",n.avatarImportTone="muted",C()},A=async u=>{if(!(!n.config||!a.avatarImportUrl||n.avatarImporting)){n.avatarImporting=!0,n.avatarImportStatus=e.avatarImporting,n.avatarImportTone="muted",C();try{const p=await Oa(a.avatarImportUrl,u);n.avatarCatalog=a.avatarCatalogUrl?await at(a.avatarCatalogUrl):[p],et(n.config).packId=p.id,await x(p.id),n.pendingAvatarZip=null,n.pendingAvatarZipName="",n.avatarImporting=!1,n.avatarImportStatus=e.avatarImportSuccess(p.name||p.id),n.avatarImportTone="ok",D(),C()}catch(p){n.avatarImporting=!1,n.avatarImportStatus=`${e.avatarImportError}: ${String(p)}`,n.avatarImportTone="bad",C()}}},B=typeof ResizeObserver<"u"?new ResizeObserver(()=>P()):null;B==null||B.observe(s.parentElement||s);let T=null;const G=()=>{const u=n.selectedPageId||"",p=n.selectedCardIndex;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=t.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&p!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${p}"]`,g=t.querySelector(c);g&&(g.dataset.editorSelectedCard="true")}},J=typeof MutationObserver<"u"?new MutationObserver(()=>G()):null;J==null||J.observe(t,{childList:!0,subtree:!0});const C=()=>{const u=n.config,p=u?K(u):[],c=p.find(y=>y.id===n.selectedPageId)||p[0]||null,g=Array.isArray(c==null?void 0:c.cards)?c.cards:[],$=n.selectedCardIndex!==null&&g[n.selectedCardIndex]||null,I=_a(n.haEntities,n.entitySearch),M=n.focusedBinding?e.entityBindingActive(O(g[n.focusedBinding.cardIndex],"caption")||`${e.cards} #${n.focusedBinding.cardIndex+1}`,Pe(e,n.focusedBinding.field)):e.entityBindingEmpty,k=u?Ue(u):"",X=n.pendingAvatarZipName?e.avatarImportSelected(n.pendingAvatarZipName):e.avatarImportHint,Se=n.avatarImportStatus?`<div class="scene-editor-status" data-tone="${n.avatarImportTone}">${f(n.avatarImportStatus)}</div>`:"",v=n.avatarCatalog.length>0;w.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${n.statusTone}">${f(n.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${f(a.sceneUrl)}">${e.viewOnly}</a>
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
                ${it(e,null,k)}
                ${n.avatarCatalog.map(y=>it(e,y,k)).join("")}
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
              <div class="meta">${f(X)}</div>
              ${Se}
            </div>
            ${k?n.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:n.avatarPackDetails?Wa(e,n.avatarPackDetails):`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`:`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="cards">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(a.packId)}</div>
            </div>
            <div class="page-list">
            ${p.map((y,E)=>`
              <article class="page-chip ${y.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${f(y.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${f(y.id)}">
                  <strong>${f(y.title||y.id||`Page ${E+1}`)}</strong>
                  <span class="meta">${f(tt(e,y.kind))} · ${f(e.pageCards(Array.isArray(y.cards)?y.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${f(y.id)}"${E===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${f(y.id)}"${E===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${f(y.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
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
              ${ne(e.fieldPageId,"id",Z(c,"id"),!0)}
              ${st(e.fieldKind,"kind",Z(c,"kind"),xa.map(y=>({value:y,label:tt(e,y)})))}
              ${ne(e.fieldTitle,"title",Z(c,"title"),!0)}
              ${ne(e.fieldSubtitle,"subtitle",Z(c,"subtitle"),!0)}
              ${ne(e.fieldSlot,"slot",Z(c,"slot"))}
              ${st(e.fieldCardStyle,"cardStyle",Z(c,"cardStyle")||"full",ka.map(y=>({value:y,label:y==="mini"?e.styleMini:e.styleFull})))}
              ${ne(e.fieldStampCaption,"stampCaption",Z(c,"stampCaption"))}
              ${ne(e.fieldStampValue,"stampValue",Z(c,"stampValue"))}
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
                  ${vt.map(y=>Ja(e,y)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${g.length?g.map((y,E)=>Ga(e,y,E,g.length,E===n.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${$?Ka(e,$,n.selectedCardIndex||0,n.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              ${te(e.fieldDisplaySafeTop,"safeTop",ee(u,"safeTop"))}
              ${te(e.fieldDisplaySafeRight,"safeRight",ee(u,"safeRight"))}
              ${te(e.fieldDisplaySafeBottom,"safeBottom",ee(u,"safeBottom"))}
              ${te(e.fieldDisplaySafeLeft,"safeLeft",ee(u,"safeLeft"))}
              ${te(e.fieldDisplayPadding,"layoutPaddingPx",ee(u,"layoutPaddingPx"))}
              ${te(e.fieldDisplayGap,"layoutGapPx",ee(u,"layoutGapPx"))}
              ${te(e.fieldDisplayScale,"globalScale",ee(u,"globalScale"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.homeAssistant}</h2>
              <div class="meta">${f(M)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${qa(e,$,n.selectedCardIndex,n.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${f(n.entitySearch)}">
          </div>
          <div class="ha-list">
            ${I.length?I.map(y=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${f(y.name)}</strong>
                    <div class="meta">${f(y.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${f(y.entityId)}"${n.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${f(y.entityId)}</code>
                <div class="ha-state">${f(y.state)}${y.unit?` · ${f(y.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const N=w.querySelector("[data-preview-display]");N==null||N.addEventListener("change",()=>{S(N.value)}),N==null||N.addEventListener("input",()=>{S(N.value)});const q=w.querySelector("[data-avatar-archive]");q==null||q.addEventListener("change",()=>{var E;const y=((E=q.files)==null?void 0:E[0])||null;L(y),y&&A(y)});for(const y of Array.from(w.querySelectorAll(".page-chip[data-page-id]")))y.draggable=!0,y.addEventListener("dragstart",E=>{const H=String(y.dataset.pageId||"").trim();T=H?{kind:"page",pageId:H}:null,!(!T||!E.dataTransfer)&&(E.dataTransfer.effectAllowed="move",E.dataTransfer.setData("text/plain",JSON.stringify(T)))}),y.addEventListener("dragover",E=>{!T||T.kind!=="page"||(E.preventDefault(),re(r),y.classList.add("is-drop-target"),E.dataTransfer&&(E.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",E=>{if(!T||T.kind!=="page")return;E.preventDefault();const H=String(y.dataset.pageId||"").trim();H&&ve(T.pageId,H),T=null,re(r)}),y.addEventListener("dragend",()=>{T=null,re(r)});for(const y of Array.from(w.querySelectorAll(".card-list-item[data-card-index]")))y.draggable=!0,y.addEventListener("dragstart",E=>{const H=Number(y.dataset.cardIndex||"-1");T=Number.isFinite(H)&&H>=0?{kind:"card",cardIndex:H}:null,!(!T||!E.dataTransfer)&&(E.dataTransfer.effectAllowed="move",E.dataTransfer.setData("text/plain",JSON.stringify(T)))}),y.addEventListener("dragover",E=>{!T||T.kind!=="card"||(E.preventDefault(),re(r),y.classList.add("is-drop-target"),E.dataTransfer&&(E.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",E=>{if(!T||T.kind!=="card")return;E.preventDefault();const H=Number(y.dataset.cardIndex||"-1");Number.isFinite(H)&&H>=0&&ye(T.cardIndex,H),T=null,re(r)}),y.addEventListener("dragend",()=>{T=null,re(r)});P(),G()},z=(u,p)=>{n.status=u,n.statusTone=p,C()},F=()=>{if(!n.config)return;const u=K(n.config);if(!u.length){n.selectedPageId=null;return}(!n.selectedPageId||!u.some(g=>g.id===n.selectedPageId))&&(n.selectedPageId=u[0].id);const p=u.find(g=>g.id===n.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(n.selectedCardIndex===null||n.selectedCardIndex>=c.length)&&(n.selectedCardIndex=0):(n.selectedCardIndex=null,n.focusedBinding=null),Da(n.selectedPageId),Ua(Ea(n.config,n.selectedPageId))},D=()=>{n.dirty=!0,z(e.statusDirty,"muted")},ie=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),n.selectedPageId&&u.searchParams.set("editorPage",n.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},ge=(u,p)=>{if(!n.config||!n.selectedPageId)return;const c=n.config.pages.find(g=>g.id===n.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const g=yt(n.config,p||"page"),$=c.id;c.id=g,n.config.rotation.order=n.config.rotation.order.map(I=>I===$?g:I),n.selectedPageId=g}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);D(),F()}},me=(u,p)=>{if(!n.config)return;const c=bt(n.config),g=c.safeArea||{},$=p===""?null:Number(p),I=Number.isFinite($)?$:null;u==="safeTop"?g.top=I??0:u==="safeRight"?g.right=I??0:u==="safeBottom"?g.bottom=I??0:u==="safeLeft"?g.left=I??0:u==="layoutPaddingPx"?c.layoutPaddingPx=I??16:u==="layoutGapPx"?c.layoutGapPx=I??16:u==="globalScale"&&(c.globalScale=I??1),c.safeArea=g,D()},he=(u,p,c)=>{var I;if(!n.config||!n.selectedPageId)return;const g=n.config.pages.find(M=>M.id===n.selectedPageId);if(!g)return;Array.isArray(g.cards)||(g.cards=[]);const $=g.cards[u];if($){if(p==="type"){const M=Qe(c);if(g.cards[u]={...M,caption:O($,"caption")||M.caption},((I=n.focusedBinding)==null?void 0:I.cardIndex)===u){const k=nt(c);n.focusedBinding=k?{cardIndex:u,field:k}:null}}else p==="digits"?$[p]=c===""?0:Number(c):$[p]=c;D()}},ve=(u,p)=>{if(!n.config||!u||!p||u===p)return;const c=K(n.config).map(I=>I.id),g=c.indexOf(u),$=c.indexOf(p);g<0||$<0||(c.splice(g,1),c.splice($,0,u),n.config.rotation.order=c,n.selectedPageId=u,n.selectedCardIndex=0,n.focusedBinding=null,D(),F(),C())},ye=(u,p)=>{if(!n.config||!n.selectedPageId||u===p)return;const c=n.config.pages.find($=>$.id===n.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||p<0||u>=c.cards.length||p>=c.cards.length)return;const[g]=c.cards.splice(u,1);c.cards.splice(p,0,g),n.selectedCardIndex=p,n.focusedBinding=null,D(),C()},be=u=>{if(!n.config||!n.selectedPageId||!n.focusedBinding)return;const p=n.config.pages.find($=>$.id===n.selectedPageId),c=n.haEntities.find($=>$.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const g=p.cards[n.focusedBinding.cardIndex];g&&(Ya(g,n.focusedBinding.field,c),D(),C())},we=(u,p)=>{n.selectedCardIndex=u,n.focusedBinding={cardIndex:u,field:p},C(),window.requestAnimationFrame(()=>{const c=r.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};r.addEventListener("click",async u=>{var X,Se;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),g=c==null?void 0:c.dataset.action;if(!g)return;if(g==="apply-display-profile"&&n.config){const v=m.value||n.previewDisplayId;La(n.config,Xe(v)),D(),C();return}if(g==="open-avatar-archive"){const v=w.querySelector("[data-avatar-archive]");v==null||v.click();return}if(!n.config)return;const $=K(n.config),I=(c==null?void 0:c.dataset.pageId)||null,M=I?$.findIndex(v=>v.id===I):-1;if(g==="select-page"&&I){n.selectedPageId=I,n.selectedCardIndex=0,n.focusedBinding=null,F(),C();return}if(g==="page-up"&&M>0){const v=$.map(N=>N.id);[v[M-1],v[M]]=[v[M],v[M-1]],n.config.rotation.order=v,n.selectedPageId=I,D(),F(),C();return}if(g==="page-down"&&M>=0&&M<$.length-1){const v=$.map(N=>N.id);[v[M],v[M+1]]=[v[M+1],v[M]],n.config.rotation.order=v,n.selectedPageId=I,D(),F(),C();return}if(g==="page-remove"&&I&&$.length>1){n.config.pages=n.config.pages.filter(v=>v.id!==I),n.config.rotation.order=K(n.config).map(v=>v.id),n.selectedPageId=((X=K(n.config)[Math.max(0,M-1)])==null?void 0:X.id)||((Se=K(n.config)[0])==null?void 0:Se.id)||null,n.selectedCardIndex=0,n.focusedBinding=null,D(),F(),C();return}if(g==="add-page"){const v=Ta(n.config);n.config.pages.push(v),n.config.rotation.order=K(n.config).map(N=>N.id),n.selectedPageId=v.id,n.selectedCardIndex=null,n.focusedBinding=null,D(),F(),C();return}if(g==="add-card-template"&&n.selectedPageId){const v=n.config.pages.find(q=>q.id===n.selectedPageId),N=(c==null?void 0:c.dataset.cardType)||"entity";if(v){Array.isArray(v.cards)||(v.cards=[]),v.cards.push(Qe(N));const q=v.cards.length-1;n.selectedCardIndex=q;const y=nt(N);n.focusedBinding=y?{cardIndex:q,field:y}:null,D(),C(),y&&window.requestAnimationFrame(()=>{const E=r.querySelector("#ha-entity-search");E==null||E.scrollIntoView({behavior:"smooth",block:"center"}),E==null||E.focus()})}return}if(g==="focus-binding"){const v=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),N=(c==null?void 0:c.dataset.bindingField)||"";v>=0&&N&&we(v,N);return}const k=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(k>=0&&n.selectedPageId){const v=n.config.pages.find(N=>N.id===n.selectedPageId);if(!v||!Array.isArray(v.cards))return;if(g==="select-card"){n.selectedCardIndex=k,C();return}if(g==="card-remove"){v.cards=v.cards.filter((N,q)=>q!==k),n.selectedCardIndex!==null&&(n.selectedCardIndex===k?n.selectedCardIndex=v.cards.length?Math.min(k,v.cards.length-1):null:n.selectedCardIndex>k&&(n.selectedCardIndex-=1)),n.focusedBinding&&(n.focusedBinding.cardIndex===k?n.focusedBinding=null:n.focusedBinding.cardIndex>k&&(n.focusedBinding={cardIndex:n.focusedBinding.cardIndex-1,field:n.focusedBinding.field})),D(),C();return}if(g==="card-up"&&k>0){[v.cards[k-1],v.cards[k]]=[v.cards[k],v.cards[k-1]],n.selectedCardIndex===k?n.selectedCardIndex=k-1:n.selectedCardIndex===k-1&&(n.selectedCardIndex=k),n.focusedBinding&&(n.focusedBinding.cardIndex===k?n.focusedBinding={cardIndex:k-1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===k-1&&(n.focusedBinding={cardIndex:k,field:n.focusedBinding.field})),D(),C();return}if(g==="card-down"&&k<v.cards.length-1){[v.cards[k],v.cards[k+1]]=[v.cards[k+1],v.cards[k]],n.selectedCardIndex===k?n.selectedCardIndex=k+1:n.selectedCardIndex===k+1&&(n.selectedCardIndex=k),n.focusedBinding&&(n.focusedBinding.cardIndex===k?n.focusedBinding={cardIndex:k+1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===k+1&&(n.focusedBinding={cardIndex:k,field:n.focusedBinding.field})),D(),C();return}}if(g==="save"){n.saving=!0,n.avatarPackSaving=n.avatarPackDirty,z(e.saving,"muted");try{if(n.avatarPackDirty&&n.avatarPackDetails&&a.avatarPackApiUrl){try{n.avatarPackDetails=await ja(a.avatarPackApiUrl,n.avatarPackDetails)}catch(v){throw new Error(`${e.avatarMappingSaveError}: ${String(v)}`)}n.avatarPackDirty=!1}n.config=await Ba(a.sceneApiUrl,Oe(n.config)),n.dirty=!1,n.saving=!1,n.avatarPackSaving=!1,F(),z(e.statusSaved,"ok"),window.setTimeout(()=>ie(),250)}catch(v){n.saving=!1,n.avatarPackSaving=!1,z(`${e.saveError}: ${String(v)}`,"bad")}return}if(g==="bind-entity"){const v=(c==null?void 0:c.dataset.entityId)||"";be(v)}}),r.addEventListener("input",u=>{const p=u.target;if(!p||!n.config){p&&p.dataset.previewDisplay!==void 0&&S(p.value);return}if(p.dataset.previewDisplay!==void 0){S(p.value);return}if(p.dataset.avatarSemantic!==void 0){const c=Ue(n.config);if(!n.avatarPackDetails||!c||n.avatarPackDetails.packId!==c)return;const g=p.value.trim();g?n.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic]=Number(g):delete n.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic],n.avatarPackDirty=!0,z(e.statusDirty,"muted"),C();return}if(p.dataset.pageField){ge(p.dataset.pageField,p.value),C();return}if(p.dataset.displayField){me(p.dataset.displayField,p.value),C();return}if(p.dataset.cardField&&p.dataset.cardIndex){n.selectedCardIndex=Number(p.dataset.cardIndex),he(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),C();return}p.hasAttribute("data-ha-search")&&(n.entitySearch=p.value,C())}),r.addEventListener("click",u=>{var g;const p=(g=u.target)==null?void 0:g.closest("[data-action='select-avatar-pack']");if(!p||!n.config)return;const c=String(p.dataset.packId||"").trim();et(n.config).packId=c||null,D(),x(c||null).finally(()=>C()),C()}),t.addEventListener("click",u=>{if(!n.config)return;const p=u.target,c=p==null?void 0:p.closest("[data-scene-card-index][data-scene-page-id]");if(c){const $=String(c.dataset.scenePageId||"").trim(),I=Number(c.dataset.sceneCardIndex||"-1");$&&Number.isFinite(I)&&I>=0&&(n.selectedPageId=$,n.selectedCardIndex=I,n.focusedBinding=null,F(),C(),rt("cards"));return}const g=p==null?void 0:p.closest("[data-scene-page-id]");if(g){const $=String(g.dataset.scenePageId||"").trim();$&&(n.selectedPageId=$,n.selectedCardIndex=0,n.focusedBinding=null,F(),C(),rt("pages"));return}}),r.addEventListener("change",u=>{var c;const p=u.target;!p||p.dataset.avatarArchive===void 0||L(((c=p.files)==null?void 0:c[0])||null)}),r.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(n.selectedCardIndex=c,n.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(n.config=await Ma(a.sceneApiUrl),a.avatarCatalogUrl)try{n.avatarCatalog=await at(a.avatarCatalogUrl)}catch{n.avatarCatalog=[]}n.haEntities=Fa(((de=ut())==null?void 0:de.states)||null),n.selectedPageId=Na(n.config),n.selectedCardIndex=0,n.status=e.statusSaved,n.statusTone="ok",await x(Ue(n.config)),F()}catch(u){n.status=`${e.loadError}: ${String(u)}`,n.statusTone="bad"}C()}const Xa="../scene-api/bootstrap",Qa="weather.forecast_home_assistant",ei="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",ti={...pt,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},ai={...ft,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},ii={...gt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},ri={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},ni={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function si(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function oi(){return new URLSearchParams(window.location.search).get("bootstrap")||Xa}function li(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function R(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const r=li(e);if(r)return new URL(t.slice(1),r).toString()}return new URL(t,i).toString()}function Re(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function di(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function ci(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function De(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function ui(a,e){var t,i,r,s,o,l,m,w;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([n,x])=>[n,R(x,e)]).filter(([,n])=>!!n)),avatar:{manifestUrl:R(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:R(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((r=a.state)==null?void 0:r.provider)||"json",stateUrl:R(String(((s=a.state)==null?void 0:s.stateUrl)||"").trim(),e),haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:R(String(((l=a.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:R(String(((m=a.state)==null?void 0:m.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:R(String(((w=a.control)==null?void 0:w.controlUrl)||"").trim(),e)}}}async function pi(a,e){var w,n,x,P;const t=R(String(((w=a.files)==null?void 0:w.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=R(String(((n=a.files)==null?void 0:n.sceneConfigUrl)||"").trim(),e),r=R(String(((x=a.files)==null?void 0:x.avatarCatalogUrl)||"").trim(),e);if(!i||!r)return t;let s="";try{const S=await De(i);s=String(((P=S.avatar)==null?void 0:P.packId)||"").trim()}catch{s=""}if(!s)return t;let o="";try{const S=await De(r),L=Array.isArray(S.items)?S.items.find(A=>String(A.id||"").trim()===s):null;o=R(String((L==null?void 0:L.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return t;const m={...ui(await De(t),t),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(m)],{type:"application/json"}))}const ue=document.getElementById("app");if(!ue)throw new Error("Missing #app root element");const se=ni[si()];Re(ue,se.startingTitle,se.startingBody);(async()=>{var e,t,i;const a=oi();try{const r=await ci(a),s=String(r.packId||"").trim(),o=s.toLowerCase()==="neiri",l=await pi(r,a);if(!l){Re(ue,se.missingRendererTitle,se.missingRendererBody,JSON.stringify(r,null,2));return}document.documentElement.dataset.packId=s,document.title=o?"Нейри":s?`kiosk-scene hosted runtime (${s})`:"kiosk-scene hosted runtime",await Sa(ue,{rendererConfigUrl:l,weatherUrl:o?"./weather.json":void 0,weatherReader:o?ba({weatherEntity:Qa,openMeteoUrl:ei,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:o?ti:void 0,labels:o?ai:void 0,presetLabels:o?ii:void 0,defaultWeather:o?ri:void 0}),di()&&await Za({packId:s,sceneApiUrl:R(String(r.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:R(String(((e=r.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),avatarImportUrl:R(String(((t=r.files)==null?void 0:t.avatarImportUrl)||"").trim(),a),avatarPackApiUrl:R(String(((i=r.files)==null?void 0:i.avatarPackApiUrl)||"").trim(),a),sceneUrl:R(String(r.entryUrl||r.runtimeBaseUrl||"./").trim(),a)})}catch(r){Re(ue,se.failedTitle,se.failedBody,String(r))}})();
