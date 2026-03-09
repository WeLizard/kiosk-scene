var xt=Object.defineProperty;var kt=(a,e,t)=>e in a?xt(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var b=(a,e,t)=>kt(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function U(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function d(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Ve(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function me(a,e){if(!U(a)||!U(e))return e??a;const t={...a};for(const[i,r]of Object.entries(e)){if(Array.isArray(r)){t[i]=r.slice();continue}if(U(r)&&U(t[i])){t[i]=me(t[i],r);continue}t[i]=r}return t}function $t(a,e=40){return Array.isArray(a)?a.map(t=>d(t,e).toLowerCase()).filter(Boolean):[]}const ee={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},We={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function Re(a){var t,i,r,s,o,l,m,w,n,$;const e=me(ee,U(a)?a:{});return{version:1,assistant:{name:d((t=e.assistant)==null?void 0:t.name,40)||ee.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:U(e.links)?Object.fromEntries(Object.entries(e.links).map(([P,S])=>[d(P,64),d(S,1024)]).filter(([P,S])=>P&&S)):{},avatar:{manifestUrl:d((r=e.avatar)==null?void 0:r.manifestUrl,1024)||ee.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||ee.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||ee.state.stateUrl,haApiFallback:((m=e.state)==null?void 0:m.haApiFallback)===!0,idleLinesUrl:d((w=e.state)==null?void 0:w.idleLinesUrl,1024)||ee.state.idleLinesUrl,entityMapUrl:d((n=e.state)==null?void 0:n.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d(($=e.control)==null?void 0:$.controlUrl,1024)||ee.control.controlUrl}}}function lt(a){var t,i,r,s,o;const e=me(We,U(a)?a:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||We.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:U(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,m])=>[d(l,32),d(m,1024)]).filter(([l,m])=>l&&m)):{},viewPresets:U(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,m])=>d(l,32)&&U(m))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((r=e.capabilities)==null?void 0:r.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const ie={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},Ct=["full","torso","head"];function ge(a,e=Date.now()){var l,m,w,n,$,P,S;const t=me(ie,U(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((l=t.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((m=t.page)==null?void 0:m.target,40)||null,until:d((w=t.page)==null?void 0:w.until,64)||null},cue:{cue:d((n=t.cue)==null?void 0:n.cue,32)||null,emotion:d(($=t.cue)==null?void 0:$.emotion,32)||null,motion:d((P=t.cue)==null?void 0:P.motion,32)||null,until:d((S=t.cue)==null?void 0:S.until,64)||null}},r=d(t.viewPreset,16).toLowerCase();i.viewPreset=Ct.includes(r)?r:null;const s=Ve(i.page.until);i.page.mode==="pinned"&&(!s||s<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=Ve(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function Te(a,e,t=Date.now()){return ge(me(ge(a,t),U(e)?e:{}),t)}function It(a,e,t=Date.now()){return ge({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function Pt(a,e,t=3e4,i=Date.now()){const r=d(e,40),s=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return ge({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:r?"pinned":"auto",target:r||null,until:r?s:null}},i)}function dt(a,e){var o,l,m;const t={...a||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),r=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),s=d((m=e==null?void 0:e.cue)==null?void 0:m.motion,32);return i&&(t.cue=i),r&&(t.emotion=r),s&&(t.motion=s),t}function W(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function qe(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function Et(a){return U(a)&&U(a.config)?a.config:a}function At(a,e){const t={...a};return U(e)&&(typeof e.id=="string"&&(t.id=d(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>U(i)))),t}function Le(a,e){const t=Et(a),i=Array.isArray(e.pages)?e.pages.slice():[],r=U(t)&&Array.isArray(t.pages)?t.pages:[],s=i.map(S=>{const E=r.find(A=>d(U(A)?A.id:"",40)===S.id);return At(S,E)}),o=U(t)&&U(t.rotation)?t.rotation:{},l=U(e.display)?e.display:{},m=U(t)&&U(t.display)?t.display:{},w=U(l.safeArea)?l.safeArea:{},n=U(m.safeArea)?m.safeArea:{},$=Array.isArray(o.order)?o.order:e.rotation.order,P=$t($).filter((S,E,A)=>s.some(M=>M.id===S)&&A.indexOf(S)===E);return{version:1,rotation:{order:P.length?P:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:W(n.top,W(w.top,0)),right:W(n.right,W(w.right,0)),bottom:W(n.bottom,W(w.bottom,0)),left:W(n.left,W(w.left,0))},layoutPaddingPx:W(m.layoutPaddingPx,W(l.layoutPaddingPx,16)),layoutGapPx:W(m.layoutGapPx,W(l.layoutGapPx,16)),globalScale:qe(m.globalScale,qe(l.globalScale,1))},pages:s}}function Tt(a,e=220){const t=d(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},r=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(s,o,l)=>{const m=d(o,16).toLowerCase(),w=d(l,32).toLowerCase();return(m==="emotion"||m==="activity"||m==="cue"||m==="motion")&&w&&(i[m]=w)," "});return{text:d(r,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const Lt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function ce(a,e={}){const t=U(a)?a:{},i={...Lt,...e};return{version:1,assistant:d(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:d(t.status??i.status,255),message:d(t.message??i.message,255),source:d(t.source??i.source,64),updatedAt:d(t.updatedAt??i.updatedAt,64),emotion:d(t.emotion??i.emotion,32)||null,activity:d(t.activity??i.activity,32)||null,cue:d(t.cue??i.cue,32)||null,intensity:Ut(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:d(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:d(t.event??i.event,64)}}function Ut(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Dt(a,e){return a.order[e]||a.order[0]||""}function Nt(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function Mt(a,e,t,i){const r=Array.isArray(a.order)?a.order:[];if(!r.length)return 0;const s=Math.max(0,Math.min(e,r.length-1));for(let o=1;o<=r.length;o+=1){const l=(s+o*t+r.length)%r.length;if(i(r[l]))return l}return s}function Rt(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const r=a.control.page;if(r.mode==="pinned"&&r.target)return{nextIndex:Nt(a.rotation,r.target),nextAutoRotateAt:e,pinnedKey:`${r.target}:${r.until||""}`};if(a.force){const o=Dt(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(o)?a.activeIndex:Math.max(0,t.findIndex(m=>a.isEligible(m))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let s=a.activeIndex;for(let o=1;o<=t.length;o+=1){const l=(a.activeIndex+o)%t.length;if(a.isEligible(t[l])){s=l;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const ct={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Bt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function Ge(a){const e=d(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Bt.some(t=>e.includes(t)):!1}function Ft(a,e){const t=ce(a),i=d(t.status,72),r=d(t.message,220);if(!(t.online!==!1&&(Ge(i)||Ge(r))))return{state:t,hasTechnicalFailure:!1};const l=d(t.emotion,32).toLowerCase(),m=d(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(t.activity,32).toLowerCase()==="error"?"idle":d(t.activity,32)||null,cue:d(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:m==="error"?"idle_soft":m||null},hasTechnicalFailure:!0}}function _t(a,e){const t=(e==null?void 0:e.copy)??ct,i=ce(a),r=Tt(i.message,220),s=Ft({...i,message:r.text,emotion:d(i.emotion,32)||r.emotion||null,activity:d(i.activity,32)||r.activity||null,cue:d(i.cue,32)||r.cue||null,motion:d(i.motion,32)||r.motion||null},{healthyStatus:t.technicalHealthyLabel}),o=s.state,l=d(o.message,180),m=d(o.activity,32).toLowerCase(),w=o.online!==!1&&m!=="offline",n=!!o.busy||m==="thinking"||m==="busy"||m==="acting",$=o.speaking===!0||m==="speaking",P=w?n?t.busyLabel:l||$?t.speakingLabel:s.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,S=l?t.messageCaption:s.hasTechnicalFailure?t.statusCaption:t.modeCaption,E=l||(w?n?t.busyBody:d(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:o,hasTechnicalFailure:s.hasTechnicalFailure,caption:S,label:P,body:E,bodyKey:[S,P,E].join(":")}}function Ot(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function Ke(a,e=-1){const t=Array.isArray(a)?a.map(r=>d(r,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function Ht(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!d(a==null?void 0:a.message,180);return e&&!t&&!i}const jt={cue:null,emotion:null,motion:null,until:null},zt={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Vt(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function ut(a){return a.endsWith("/")?a:`${a}/`}function $e(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(ut(d(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function Ie(a){const e=d(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function Wt(a,e,t){const i=d(a.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?Ie(i):new URL("../avatar.html",new URL(ut(d(t,1024)||"."),window.location.href)).toString()}function qt(a,e){const t=d(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function Gt(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[r,s]of Object.entries(i)){const o=d(r,64);if(!o||s==null)continue;const l=typeof s=="boolean"?s?"1":"0":String(s);t.searchParams.set(o,l)}return t.toString()}function Kt(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([r,s])=>[d(r,32),$e(t,s)]).filter(([r,s])=>r&&s));return{version:1,assistant:{name:d(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([r,s])=>[d(r,64),Ie(s)]).filter(([r,s])=>r&&s)),state:{stateUrl:Ie(a.state.stateUrl),idleLinesUrl:Ie(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:$e(t,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:$e(t,e.fallbackPortrait||""),motionMapUrl:$e(t,e.motionMapUrl||""),presetThumbs:i}}}class Jt{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"currentState");b(this,"currentCue",{...jt});b(this,"currentPreset","full");b(this,"currentBubble",{...zt});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var r;const t=(r=this.iframeEl)==null?void 0:r.contentWindow;if(!t||e.source!==t||!Vt(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=lt({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Re(e.rendererConfig||{}),this.currentState=ce({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const t=Wt(this.options,this.manifest,this.assetRoot),i=Gt(t,this.options);this.targetOrigin=qt(i,this.options.targetOrigin);const r=document.createElement("div");r.className="ks-live2d-frame",Object.assign(r.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const s=document.createElement("iframe");s.className="ks-live2d-iframe",s.src=i,s.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,s.loading="eager",s.allow="autoplay",Object.assign(s.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&s.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);r.append(s,o),this.host.append(r),s.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=r,this.iframeEl=s,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=ce(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const r=document.createElement("div");r.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(r.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(r,s),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Kt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=dt(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function Yt(a={}){return new Jt(a)}const Zt={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Je={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Xt{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const r=document.createElement("div");r.className="ks-static-avatar-fallback",r.textContent=this.options.alt||"Avatar",Object.assign(r.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,r,s),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=r;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||Je,i=t[e]||t.full||Je.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Zt}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");return i?`${i}/${r}`:r}}function Qt(a={}){return new Xt(a)}function ea(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function pt(){var a;for(const e of ea())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function ta(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function aa(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=d(t.entity_id,255);i&&(e[i]=t)}return e}function ia(a,e,t="Assistant"){const i=a[e.status],r=a[e.message],s=a[e.online],o=a[e.busy],l=a[e.source],m=a[e.updatedAt],w=e.emotion?a[e.emotion]:null,n=e.activity?a[e.activity]:null,$=e.cue?a[e.cue]:null,P=e.speaking?a[e.speaking]:null,S=e.intensity?a[e.intensity]:null,E=e.motion?a[e.motion]:null,A=a[e.revision];if(!i&&!r&&!s&&!o)return null;const M=d(i==null?void 0:i.state,72),T=d(r==null?void 0:r.state,220),K=d(m==null?void 0:m.state,64),J=Ue(s,!0),C=Ue(o,!1),V=d(n==null?void 0:n.state,32)||"",D=Ue(P)??V==="speaking",re=V||(J?D?"speaking":C?"thinking":"idle":"offline");return ce({version:1,assistant:d(t,40)||"Assistant",online:J,busy:C,status:M&&M!=="unknown"&&M!=="unavailable"?M:"",message:T&&T!=="unknown"&&T!=="unavailable"?T:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:K&&K!=="unknown"&&K!=="unavailable"?K:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(w==null?void 0:w.state,32)||null,activity:re,cue:d($==null?void 0:$.state,32)||null,intensity:ra(S),speaking:D,motion:d(E==null?void 0:E.state,32)||null,revision:Number(A==null?void 0:A.state)||0})}function Ue(a,e){const t=d(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function ra(a){const e=d(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function na(a){const e=_e(a);return{id:"ha-state",async read(){const t=await e.read();return t?ia(t,a.entityMap,a.assistantName):null}}}function _e(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let r=null,s=0,o=null,l=0;async function m(){var P;const w=pt();if(w!=null&&w.states)return w.states;const n=Date.now();if(r&&n-s<t||!a.allowApiFallback||typeof e!="function"||n<l)return r;if(o)return o;const $=d(((P=a.readToken)==null?void 0:P.call(a))??ta(),4096);return $?(o=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${$}`}}).then(async S=>{if(!S.ok){const E=new Error(`HA states HTTP ${S.status}`);throw E.status=S.status,E}return S.json()}).then(S=>{const E=aa(S);return E&&(r=E,s=Date.now()),E||r}).catch(S=>(((S==null?void 0:S.status)===401||(S==null?void 0:S.status)===403)&&(l=Date.now()+i),r)).finally(()=>{o=null}),o):r}return{id:"ha-states",async read(){return m()}}}async function Oe(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=d(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const r=await e(i.toString(),{cache:"no-store"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json();return a.sanitize?a.sanitize(s):s}catch(r){if(a.defaultValue!==void 0)return a.defaultValue;throw r}}function sa(a){return{id:"json-state",async read(){const e=await Oe({...a,defaultValue:a.defaultValue});return ce(e)}}}function Ye(a){return{id:"json-control",async read(){const e=await Oe({...a,defaultValue:a.defaultValue??ie});return ge(e)}}}function oa(a){return{id:"json-lines",async read(){const e=await Oe({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>d(t,220)).filter(Boolean):[]}}}function O(a,e,t=64){return d(a[e],t)}function pe(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function la(a,e="en-US"){const t=d(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ce(a,e){return!a||!e?null:a[e]||null}function da(a,e=null,t="en-US"){var $,P,S,E;const i=O(a,"caption",40)||O(a,"type",24)||"Card",r=O(a,"hint",72),s=O(a,"type",32).toLowerCase()||"entity",o=O(a,"entity",255),l=Ce(e,o),m=Ce(e,O(a,"stateEntity",255)),w=Ce(e,O(a,"downEntity",255)),n=Ce(e,O(a,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:O(a,"value",64)||"—",hint:r||"static card"};if(s==="todo"){const A=Number(l==null?void 0:l.state);return!Number.isFinite(A)||A<=0?{caption:i,value:"Clear",hint:r||"nothing pending"}:{caption:i,value:`${A} item${A===1?"":"s"}`,hint:r||"pending tasks"}}if(s==="onoff"){const A=(l==null?void 0:l.state)==="on";return{caption:i,value:A?O(a,"onText",48)||"On":O(a,"offText",48)||"Off",hint:r||"device state"}}if(s==="battery"){const A=pe(l==null?void 0:l.state,0);return{caption:i,value:A?`${A}%`:"—",hint:d(m==null?void 0:m.state,48)||r||"battery level"}}if(s==="network"){const A=pe(w==null?void 0:w.state,0),M=pe(n==null?void 0:n.state,0);return{caption:i,value:A||M?`↓ ${A||"0"} · ↑ ${M||"0"}`:"—",hint:r||"throughput"}}if(s==="time")return{caption:i,value:la(l==null?void 0:l.state,t)||"—",hint:r||"next event"};if(s==="percent"){const A=pe(l==null?void 0:l.state,Number(O(a,"digits",4))||0);return{caption:i,value:A?`${A}%`:"—",hint:r||d(($=l==null?void 0:l.attributes)==null?void 0:$.friendly_name,48)||"state percentage"}}if(s==="number"){const A=Number(O(a,"digits",4))||0,M=pe(l==null?void 0:l.state,A),T=O(a,"unit",16)||d((P=l==null?void 0:l.attributes)==null?void 0:P.unit_of_measurement,16);return{caption:i,value:M?`${M}${T?` ${T}`:""}`:"—",hint:r||d((S=l==null?void 0:l.attributes)==null?void 0:S.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||O(a,"value",64)||"—",hint:r||d((E=l==null?void 0:l.attributes)==null?void 0:E.friendly_name,48)||"entity state"}}function ca(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>da(i,e,t)):[]}const ft={...ct,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},gt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},mt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},ua={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Pe={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function h(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ht(a){return a.endsWith("/")?a:`${a}/`}function q(a,e){const t=d(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function vt(a){return new URL(".",a).toString()}function pa(a,e){const t=vt(e),i=q(t,d(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:q(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([r,s])=>[r,q(t,s)]).filter(([,r])=>!!r))}}function De(a){return{...Pe,...a||{},metrics:{...Pe.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):Pe.forecast.map(e=>({...e}))}}function Ze(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function z(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function fa(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${z(t)} мм рт. ст.`:`${z(t*.750061683,0)} мм рт. ст.`}function ga(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${z(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${z(t/3.6,1)} м/с`:`${z(t,1)} м/с`}function ma(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ha(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function va(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function ya(a,e="ru-RU"){const t=d(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||d(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function Xe(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function ba(a,e="./assets/icons"){const t=Number(a),i=ht(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function wa(a){const e=d(a.locale,32)||"ru-RU",t=d(a.iconBaseUrl,1024)||"./assets/icons",i=_e({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var E,A,M,T,K,J,C,V,F,D,re,he,ve,ye,be,we,Se,xe,ue,u;const r=await i.read(),s=a.fetchImpl??globalThis.fetch,o=r==null?void 0:r[a.weatherEntity];let l=null;const m=d(a.openMeteoUrl,4096);if(m&&typeof s=="function")try{const p=await s(`${m}${m.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});p.ok&&(l=await p.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const w=d(o==null?void 0:o.last_changed,64)||d((E=l==null?void 0:l.current)==null?void 0:E.time,64)||new Date().toISOString(),n=o?ya(o.state,e):Xe((A=l==null?void 0:l.current)==null?void 0:A.weather_code,e),$=Array.isArray((M=l==null?void 0:l.daily)==null?void 0:M.time)?l.daily.time.map((p,c)=>{var k,I,N,x,Q;const g=new Date(`${p}T12:00:00+03:00`);return{name:g.toLocaleDateString(e,{weekday:"short"}),dayNumber:g.toLocaleDateString(e,{day:"numeric"}),monthShort:g.toLocaleDateString(e,{month:"short"}),note:d(Xe((k=l.daily.weather_code)==null?void 0:k[c],e),28),max:`${z((I=l.daily.temperature_2m_max)==null?void 0:I[c])}°`,min:`${z((N=l.daily.temperature_2m_min)==null?void 0:N[c])}° · ${z((x=l.daily.precipitation_probability_max)==null?void 0:x[c])}%`,icon:ba((Q=l.daily.weather_code)==null?void 0:Q[c],t)}}):[],P=$[0]||null,S=$.slice(1,6);return{todayValue:ha(w,e),todayLabel:va(w,e),updatedAt:ma(w,e),temperature:z(((T=o==null?void 0:o.attributes)==null?void 0:T.temperature)??((K=l==null?void 0:l.current)==null?void 0:K.temperature_2m),1),condition:n,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${z(((J=o==null?void 0:o.attributes)==null?void 0:J.apparent_temperature)??((C=l==null?void 0:l.current)==null?void 0:C.apparent_temperature)??((V=o==null?void 0:o.attributes)==null?void 0:V.temperature),1)}°C`,badgeSummary:n,badgeRange:P?`${P.max} / ${z((D=(F=l==null?void 0:l.daily)==null?void 0:F.temperature_2m_min)==null?void 0:D[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${z(((re=o==null?void 0:o.attributes)==null?void 0:re.humidity)??((he=l==null?void 0:l.current)==null?void 0:he.relative_humidity_2m))}%`,pressure:fa(((ve=o==null?void 0:o.attributes)==null?void 0:ve.pressure)??((ye=l==null?void 0:l.current)==null?void 0:ye.surface_pressure),((be=o==null?void 0:o.attributes)==null?void 0:be.pressure_unit)??"hPa"),wind:ga(((we=o==null?void 0:o.attributes)==null?void 0:we.wind_speed)??((Se=l==null?void 0:l.current)==null?void 0:Se.wind_speed_10m),((xe=o==null?void 0:o.attributes)==null?void 0:xe.wind_speed_unit)??"km/h"),clouds:`${z(((ue=o==null?void 0:o.attributes)==null?void 0:ue.cloud_coverage)??((u=l==null?void 0:l.current)==null?void 0:u.cloud_cover))}%`},forecast:S}}}class Sa{constructor(e,t={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"entityMap",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",ie);b(this,"uiControl",ie);b(this,"currentControl",ie);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...ft,...t.copy||{}},this.labels={...gt,...t.labels||{}},this.presetLabels={...mt,...t.presetLabels||{}},this.weatherData=De(t.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=q(window.location.href,this.getRendererConfigUrl()),t=vt(e),i=Re(await this.readJson(e)),r=Re({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,q(t,l)])),avatar:{...i.avatar,manifestUrl:q(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:q(t,i.scene.configUrl)},state:{...i.state,stateUrl:q(t,i.state.stateUrl),idleLinesUrl:q(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?q(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:q(t,i.control.controlUrl)}});this.rendererConfig=r;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=pa(lt(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await oa({url:this.rendererConfig.state.idleLinesUrl||q(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Ye({url:this.rendererConfig.control.controlUrl,defaultValue:ie}).read(),this.currentControl=Te(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=It(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,r;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(r=(i=this.carouselShellEl).setPointerCapture)==null||r.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:r}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(r)>=s*.16,l=r<0?1:-1;if(this.clearDragState(t.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Ye({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=Te(ie,this.uiControl),this.currentControl=Te(this.remoteControl,this.uiControl);const e=dt(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=_t(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=Le(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const r=this.getOrderedPages(i.pages,i.rotation.order),s=Rt({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>r.some(l=>l.id===o)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(r,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,r)=>i.kind==="overview"?this.renderOverviewSlide(i,t,r):this.renderDynamicSlide(i,r,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,r)=>`
      <button
        class="carousel-dot ${r===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${r}"
        data-scene-page-id="${h(i.id)}"
        aria-label="${h(d(i.title,40)||d(i.id,40)||`${this.labels.pageStamp} ${r+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t,i){const r=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||Pe,o=s.forecast.slice(0,5).map(l=>this.renderForecastDay(l)).join("");return`
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
    `}renderDynamicSlide(e,t,i){const r=ca(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${t+1} / ${i}`),m=e.cardStyle==="mini"?r.map((S,E)=>`
          <article class="mini-card" data-scene-card-index="${E}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(S.caption)}</span>
            <strong>${h(S.value)}</strong>
          </article>
        `).join(""):r.map((S,E)=>`
          <article class="home-card" data-scene-card-index="${E}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(S.caption)}</span>
            <strong>${h(S.value)}</strong>
            <small>${h(S.hint)}</small>
          </article>
        `).join(""),w=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(S=>this.renderForecastDay(S)).join("")}</div>`:"",n=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",$=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${t+1}`,P=d(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${h(e.id)}" data-scene-page-id="${h(e.id)}" data-slide-order="${t}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${h(e.kind)}" data-dynamic-card-style="${h(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${h($)}</h1>
              ${P?`<p class="subline">${h(P)}</p>`:""}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const t=e[0],i=e[e.length-1];return`${d(t.dayNumber,4)} ${d(t.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var r;const t=d((r=this.options.iconUrls)==null?void 0:r[e],1024);return t||`${ht(d(this.options.iconBaseUrl,1024)||"./assets")}${ua[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:r,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${r}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,t){const i=t.map(s=>e.find(o=>o.id===s)).filter(Boolean),r=e.filter(s=>!i.some(o=>o.id===s.id));return i.concat(r)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,r;!t&&((r=(i=this.carouselShellEl).hasPointerCapture)!=null&&r.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=Le(this.sceneConfig,this.sceneConfig),i=Mt(t.rotation,this.activeIndex,e,r=>this.orderedPages.some(s=>s.id===r));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const r=Le(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,r.rotation.defaultDwellMs*2);this.uiControl=Pt(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!Ht(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=Ke(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=Ke(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},Ot(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>sa({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await na({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:_e({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=Ze(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=Ze(e,t)}catch{}try{return De(e)}catch{return De(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Yt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Qt({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",r=t.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),r&&(s?(r.src=s,r.removeAttribute("hidden")):(r.src="",r.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function xa(a,e={}){const t=new Sa(a,e);return await t.init(),t}const ka=["overview","cards","forecast+cards"],$a=["full","mini"],yt=["entity","text","todo","onoff","battery","network","time","percent","number"],Y=["caption","hint"],Ca={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Ia={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Подставить в настройки экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Можно оставить встроенную модель или добавить новую Live2D-модель из ZIP.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. Встроенная модель доступна всегда, отдельные модели появляются после импорта ZIP.",avatarPackEmpty:"Сейчас доступна только встроенная модель сцены. Новые модели можно добавить ZIP-архивом ниже.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:a=>`${a} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarImport:"Импорт аватара",avatarImportHint:"Импорт сразу создаёт отдельный avatar-pack, находит model3.json и подготавливает черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportSelected:a=>`Выбран архив: ${a}`,avatarImportButton:"Выбрать ZIP и импортировать",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:a=>`Импортирован avatar-pack: ${a}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для semantic cue/activity в runtime.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardsSubtitle:"Сначала выбери или добавь карточку, затем настрой её ниже. Порядок здесь же влияет на правую карусель.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку из шаблона выше или выбери существующую карточку из списка.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(a,e)=>`Сейчас связываем: ${a} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Fill display settings below",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. You can keep the bundled model or import a new Live2D model from a ZIP archive.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. The bundled scene model is always available; imported models appear here after ZIP import.",avatarPackEmpty:"Only the bundled scene model is available right now. Import a ZIP archive below to add more models.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:a=>`${a} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Import avatar",avatarImportHint:"Import creates a separate avatar pack, detects model3.json and prepares a draft motion map.",avatarImportSelect:"Choose avatar ZIP",avatarImportSelected:a=>`Selected archive: ${a}`,avatarImportButton:"Choose and import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:a=>`Imported avatar pack: ${a}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map semantic cue/activity slots to actual model motions used by the runtime.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardsSubtitle:"Add or choose a card first, then edit it below. The order here drives the right-hand carousel.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card from the templates above or choose an existing one from the list.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(a,e)=>`Binding now: ${a} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Pa=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Ee=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Be="mellow-fly-7";function le(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Qe(a){return Ee.find(e=>e.id===a)||Ee.find(e=>e.id===Be)||Ee[0]}function Ea(a){return`${a.width} × ${a.height}`}function f(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function He(a){return JSON.parse(JSON.stringify(a))}function G(a){const e=new Map(a.pages.map(r=>[r.id,r])),t=a.rotation.order.map(r=>e.get(r)).filter(Boolean),i=a.pages.filter(r=>!t.some(s=>s.id===r.id));return[...t,...i]}function Aa(a,e){return e?Math.max(0,G(a).findIndex(t=>t.id===e)):0}function Ta(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function bt(a,e){const t=Ta(e);let i=t,r=2;for(;a.pages.some(s=>s.id===i);)i=`${t}-${r}`,r+=1;return i}function La(a){const e=a.pages.length+1,t=le()==="ru";return{id:bt(a,`page-${e}`),kind:"cards",title:t?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:t?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function et(a){const e=le()==="ru";switch(a){case"text":return{type:a,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:a,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:a,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:a,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function H(a,e){const t=a[e];return t==null?"":String(t)}function X(a,e){const t=a[e];return t==null?"":String(t)}function te(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function wt(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function Ne(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function tt(a){return a.avatar||(a.avatar={}),a.avatar}function Ua(a,e){const t=wt(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function Da(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function Na(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Ma(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&G(a).some(r=>r.id===t)?t:((i=G(a)[0])==null?void 0:i.id)||null}async function Ra(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return He(t.config)}async function Ba(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return He(i.config)}function je(a){switch(a){case"text":return[...Y,"value"];case"todo":return[...Y,"entity"];case"onoff":return[...Y,"entity","onText","offText"];case"battery":return[...Y,"entity","stateEntity"];case"network":return[...Y,"downEntity","upEntity"];case"time":return[...Y,"entity"];case"percent":return[...Y,"entity","digits"];case"number":return[...Y,"entity","digits","unit"];default:return[...Y,"entity"]}}function at(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function de(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function St(a){const e=le();return Ca[e][a]||""}function Ae(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Fa(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),r=a.includes(".")&&a.split(".",1)[0]||"other",s=String(e.state||""),o=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:r,state:s,unit:o}}function _a(a){return a?Object.entries(a).map(([e,t])=>Fa(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function Oa(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function it(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(r=>({id:String(r.id||"").trim(),name:String(r.name||r.id||"").trim(),manifestUrl:String(r.manifestUrl||"").trim(),previewUrl:String(r.previewUrl||"").trim(),motionCount:Number(r.motionCount||0),capabilities:typeof r.capabilities=="object"&&r.capabilities?{supportsMotion:!!r.capabilities.supportsMotion,supportsEmotion:!!r.capabilities.supportsEmotion,supportsLipSync:!!r.capabilities.supportsLipSync}:void 0})).filter(r=>r.id&&r.manifestUrl):[]}async function Ha(a,e){const t=String(a||"").trim();if(!t)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const r=await fetch(t,{method:"POST",body:i}),s=await r.json();if(!r.ok||s.success===!1||!s.item)throw new Error(String(s.error||`HTTP ${r.status}`));return{id:String(s.item.id||"").trim(),name:String(s.item.name||s.item.id||"").trim(),manifestUrl:String(s.item.manifestUrl||"").trim(),previewUrl:String(s.item.previewUrl||"").trim(),motionCount:Number(s.item.motionCount||0),capabilities:typeof s.item.capabilities=="object"&&s.item.capabilities?{supportsMotion:!!s.item.capabilities.supportsMotion,supportsEmotion:!!s.item.capabilities.supportsEmotion,supportsLipSync:!!s.item.capabilities.supportsLipSync}:void 0}}async function ja(a,e){var o,l,m,w;const t=String(a||"").trim(),i=String(e||"").trim();if(!t||!i)throw new Error("Avatar pack API is not configured.");const r=await fetch(`${t}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await r.json();if(!r.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${r.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((o=s.motionMap)==null?void 0:o.motions)?(l=s.motionMap)==null?void 0:l.motions.map(n=>({index:Number(n.index),id:String(n.id||"").trim(),label:String(n.label||n.id||"").trim(),group:String(n.group||"").trim(),tags:Array.isArray(n.tags)?n.tags.map($=>String($||"").trim()).filter(Boolean):[]})).filter(n=>Number.isFinite(n.index)):[],semantic:typeof((m=s.motionMap)==null?void 0:m.semantic)=="object"&&((w=s.motionMap)!=null&&w.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function za(a,e){var s,o,l;const t=String(a||"").trim();if(!t||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${t}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),r=await i.json();if(!i.ok||r.success===!1||!r.packId)throw new Error(String(r.error||`HTTP ${i.status}`));return{packId:String(r.packId||"").trim(),manifest:r.manifest||e.manifest,motionMap:{motions:Array.isArray((s=r.motionMap)==null?void 0:s.motions)?r.motionMap.motions:e.motionMap.motions,semantic:typeof((o=r.motionMap)==null?void 0:o.semantic)=="object"&&((l=r.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(r.motionMap.semantic)):e.motionMap.semantic}}}function Va(a){if(Array.isArray(a)){const e=a.find(t=>Number.isFinite(Number(t)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(a))?String(Number(a)):""}function Wa(a,e){const t=a[e.labelKey];return typeof t=="string"?t:e.key}function qa(a,e){const t=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${a.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Pa.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${f(i.key)}">${f(Wa(a,i))}</label>
            <select id="avatar-semantic-${f(i.key)}" data-avatar-semantic="${f(i.key)}">
              <option value="">${f(a.avatarMotionNone)}</option>
              ${t.map(r=>`
                <option value="${f(String(r.index))}"${Va(e.motionMap.semantic[i.key])===String(r.index)?" selected":""}>
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
              <strong>${f(i.label||i.id||`${a.avatarMappingMotion} ${i.index}`)}</strong>
              <span class="meta">${f(`${a.avatarMappingMotion} #${i.index} · ${i.group||a.avatarMappingMotion.toLowerCase()}`)}</span>
              <code>${f(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${a.avatarMappingSaveHint}</div>
    </div>
  `}function rt(a,e,t){var w,n,$;const i=(e==null?void 0:e.id)||"",r=t===i,s=(e==null?void 0:e.name)||a.avatarPackDefaultTile,o=(e==null?void 0:e.id)||a.avatarPackCurrent,l=(e==null?void 0:e.previewUrl)||"",m=e?[e.motionCount>0?a.avatarPackMotionCount(e.motionCount):"",(w=e.capabilities)!=null&&w.supportsMotion?a.avatarCapabilityMotion:"",(n=e.capabilities)!=null&&n.supportsEmotion?a.avatarCapabilityEmotion:"",($=e.capabilities)!=null&&$.supportsLipSync?a.avatarCapabilityLipSync:""].filter(Boolean):[a.avatarPackDefaultHint];return`
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
  `}function ze(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function Ga(a,e,t,i){if(!e||t===null)return`<div class="meta">${f(a.entityBindingEmpty)}</div>`;const r=je(H(e,"type")||"entity").filter(s=>ze(s));return r.length?`
    <div class="binding-targets">
      ${r.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===t&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${t}" data-binding-field="${f(s)}">
            ${f(Ae(a,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${f(a.entityBindingNoTargets)}</div>`}function nt(a){const e=document.querySelector(`[data-editor-section="${a}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function ne(a){for(const e of Array.from(a.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function st(a){return je(a).find(e=>ze(e))||null}function se(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${f(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${f(e)}" value="${f(t)}">
    </div>
  `}function ae(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${f(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${f(e)}" value="${f(t)}">
    </div>
  `}function ot(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${f(a)}</label>
      <select id="page-select-${e}" data-page-field="${f(e)}">
        ${i.map(r=>`<option value="${f(r.value)}"${r.value===t?" selected":""}>${f(r.label)}</option>`).join("")}
      </select>
    </div>
  `}function Ka(a,e,t,i){const r=H(e,"type")||"entity",s=je(r);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${f(H(e,"caption")||de(a,r))}</strong>
          <div class="meta">${f(de(a,r))}</div>
        </div>
        <div class="meta">#${t+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${f(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${yt.map(o=>`<option value="${o}"${o===r?" selected":""}>${f(de(a,o))}</option>`).join("")}
          </select>
        </div>
        ${s.map(o=>{const l=ze(o),m=l&&(i==null?void 0:i.cardIndex)===t&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${m?" is-active":""}">
                <label>${f(Ae(a,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${f(o)}"
                    data-binding-field="${f(o)}"
                    value="${f(H(e,o))}"
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
              <label>${f(Ae(a,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${f(o)}"
                value="${f(H(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Ja(a,e,t,i,r){const s=H(e,"type")||"entity",o=H(e,"caption")||de(a,s),l=H(e,"entity")||H(e,"stateEntity")||H(e,"downEntity")||H(e,"upEntity")||H(e,"value")||H(e,"hint")||St(s);return`
    <article class="card-list-item${r?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${t}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${t}">
        <strong>${f(o)}</strong>
        <span class="meta">${f(de(a,s))}</span>
        <div class="meta">${f(l)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
      </div>
    </article>
  `}function Ya(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${f(e)}"
    >
      <strong>${f(de(a,e))}</strong>
      <span>${f(St(e))}</span>
    </button>
  `}function Za(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function Xa(a){var ue;const e=Ia[le()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const r=document.createElement("section");r.id="scene-editor-shell",r.innerHTML=`
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
                ${Ee.map(u=>`<option value="${f(u.id)}">${f(u.label[le()])}</option>`).join("")}
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
  `,document.body.appendChild(r),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=r.querySelector("[data-preview-stage]"),o=r.querySelector("[data-preview-canvas]"),l=r.querySelector("[data-preview-resolution]"),m=r.querySelector("[data-preview-display]"),w=r.querySelector("[data-dashboard]");if(!s||!o||!l||!m||!w)throw new Error("Missing native editor shell elements");o.appendChild(t);const n={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Be,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},$=async u=>{const p=String(u||"").trim();if(!p||!a.avatarPackApiUrl){n.avatarPackDetails=null,n.avatarPackLoading=!1,n.avatarPackDirty=!1;return}n.avatarPackLoading=!0,C();try{n.avatarPackDetails=await ja(a.avatarPackApiUrl,p),n.avatarPackDirty=!1}catch(c){n.avatarPackDetails=null,n.avatarPackDirty=!1,V(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{n.avatarPackLoading=!1}},P=()=>{var I;const u=Qe(n.previewDisplayId),p=Math.max(320,((I=s.parentElement)==null?void 0:I.clientWidth)||s.clientWidth||u.width),c=Math.min(1,p/u.width),g=Math.round(u.width*c),k=Math.round(u.height*c);m.value=u.id,l.textContent=Ea(u),s.style.width=`${g}px`,s.style.height=`${k}px`,o.style.width=`${u.width}px`,o.style.height=`${u.height}px`,o.style.transform=`scale(${c})`,t.style.width=`${u.width}px`,t.style.height=`${u.height}px`},S=u=>{n.previewDisplayId=String(u||"").trim()||Be,P()},E=u=>{n.pendingAvatarZip=u,n.pendingAvatarZipName=(u==null?void 0:u.name)||"",n.avatarImportStatus="",n.avatarImportTone="muted",C()},A=async u=>{if(!(!n.config||!a.avatarImportUrl||n.avatarImporting)){n.avatarImporting=!0,n.avatarImportStatus=e.avatarImporting,n.avatarImportTone="muted",C();try{const p=await Ha(a.avatarImportUrl,u);n.avatarCatalog=a.avatarCatalogUrl?await it(a.avatarCatalogUrl):[p],tt(n.config).packId=p.id,await $(p.id),n.pendingAvatarZip=null,n.pendingAvatarZipName="",n.avatarImporting=!1,n.avatarImportStatus=e.avatarImportSuccess(p.name||p.id),n.avatarImportTone="ok",D(),C()}catch(p){n.avatarImporting=!1,n.avatarImportStatus=`${e.avatarImportError}: ${String(p)}`,n.avatarImportTone="bad",C()}}},M=typeof ResizeObserver<"u"?new ResizeObserver(()=>P()):null;M==null||M.observe(s.parentElement||s);let T=null;const K=()=>{const u=n.selectedPageId||"",p=n.selectedCardIndex;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=t.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&p!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${p}"]`,g=t.querySelector(c);g&&(g.dataset.editorSelectedCard="true")}},J=typeof MutationObserver<"u"?new MutationObserver(()=>K()):null;J==null||J.observe(t,{childList:!0,subtree:!0});const C=()=>{const u=n.config,p=u?G(u):[],c=p.find(v=>v.id===n.selectedPageId)||p[0]||null,g=Array.isArray(c==null?void 0:c.cards)?c.cards:[],k=n.selectedCardIndex!==null&&g[n.selectedCardIndex]||null,I=Oa(n.haEntities,n.entitySearch),N=n.focusedBinding?e.entityBindingActive(H(g[n.focusedBinding.cardIndex],"caption")||`${e.cards} #${n.focusedBinding.cardIndex+1}`,Ae(e,n.focusedBinding.field)):e.entityBindingEmpty,x=u?Ne(u):"",Q=n.pendingAvatarZipName?e.avatarImportSelected(n.pendingAvatarZipName):e.avatarImportHint,ke=n.avatarImportStatus?`<div class="scene-editor-status" data-tone="${n.avatarImportTone}">${f(n.avatarImportStatus)}</div>`:"",R=n.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty;w.innerHTML=`
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
              <div class="meta">${R}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${rt(e,null,x)}
                ${n.avatarCatalog.map(v=>rt(e,v,x)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <input id="avatar-pack-archive" type="file" accept=".zip,application/zip" data-avatar-archive hidden>
                <button class="scene-editor-button" type="button" data-action="open-avatar-archive"${n.avatarImporting||!a.avatarImportUrl?" disabled":""}>
                  ${n.avatarImporting?e.avatarImporting:e.avatarImportButton}
                </button>
                <div class="meta">${e.avatarImportSelect}</div>
              </div>
              <div class="meta">${f(Q)}</div>
              ${ke}
            </div>
            ${x?n.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:n.avatarPackDetails?qa(e,n.avatarPackDetails):"":""}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="cards">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(a.packId)}</div>
            </div>
            <div class="page-list">
            ${p.map((v,L)=>`
              <article class="page-chip ${v.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${f(v.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${f(v.id)}">
                  <strong>${f(v.title||v.id||(le()==="ru"?`Страница ${L+1}`:`Page ${L+1}`))}</strong>
                  <span class="meta">${f(at(e,v.kind))} · ${f(e.pageCards(Array.isArray(v.cards)?v.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${f(v.id)}"${L===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${f(v.id)}"${L===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${f(v.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
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
              ${se(e.fieldPageId,"id",X(c,"id"),!0)}
              ${ot(e.fieldKind,"kind",X(c,"kind"),ka.map(v=>({value:v,label:at(e,v)})))}
              ${se(e.fieldTitle,"title",X(c,"title"),!0)}
              ${se(e.fieldSubtitle,"subtitle",X(c,"subtitle"),!0)}
              ${se(e.fieldSlot,"slot",X(c,"slot"))}
              ${ot(e.fieldCardStyle,"cardStyle",X(c,"cardStyle")||"full",$a.map(v=>({value:v,label:v==="mini"?e.styleMini:e.styleFull})))}
              ${se(e.fieldStampCaption,"stampCaption",X(c,"stampCaption"))}
              ${se(e.fieldStampValue,"stampValue",X(c,"stampValue"))}
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
                  ${yt.map(v=>Ya(e,v)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${g.length?g.map((v,L)=>Ja(e,v,L,g.length,L===n.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${k?Ka(e,k,n.selectedCardIndex||0,n.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              <div class="meta">${f(N)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${Ga(e,k,n.selectedCardIndex,n.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${f(n.entitySearch)}">
          </div>
          <div class="ha-list">
            ${I.length?I.map(v=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${f(v.name)}</strong>
                    <div class="meta">${f(v.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${f(v.entityId)}"${n.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${f(v.entityId)}</code>
                <div class="ha-state">${f(v.state)}${v.unit?` · ${f(v.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const _=w.querySelector("[data-preview-display]");_==null||_.addEventListener("change",()=>{S(_.value)}),_==null||_.addEventListener("input",()=>{S(_.value)});const Z=w.querySelector("[data-avatar-archive]");Z==null||Z.addEventListener("change",()=>{var L;const v=((L=Z.files)==null?void 0:L[0])||null;E(v),v&&A(v)});for(const v of Array.from(w.querySelectorAll(".page-chip[data-page-id]")))v.draggable=!0,v.addEventListener("dragstart",L=>{const j=String(v.dataset.pageId||"").trim();T=j?{kind:"page",pageId:j}:null,!(!T||!L.dataTransfer)&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain",JSON.stringify(T)))}),v.addEventListener("dragover",L=>{!T||T.kind!=="page"||(L.preventDefault(),ne(r),v.classList.add("is-drop-target"),L.dataTransfer&&(L.dataTransfer.dropEffect="move"))}),v.addEventListener("drop",L=>{if(!T||T.kind!=="page")return;L.preventDefault();const j=String(v.dataset.pageId||"").trim();j&&be(T.pageId,j),T=null,ne(r)}),v.addEventListener("dragend",()=>{T=null,ne(r)});for(const v of Array.from(w.querySelectorAll(".card-list-item[data-card-index]")))v.draggable=!0,v.addEventListener("dragstart",L=>{const j=Number(v.dataset.cardIndex||"-1");T=Number.isFinite(j)&&j>=0?{kind:"card",cardIndex:j}:null,!(!T||!L.dataTransfer)&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain",JSON.stringify(T)))}),v.addEventListener("dragover",L=>{!T||T.kind!=="card"||(L.preventDefault(),ne(r),v.classList.add("is-drop-target"),L.dataTransfer&&(L.dataTransfer.dropEffect="move"))}),v.addEventListener("drop",L=>{if(!T||T.kind!=="card")return;L.preventDefault();const j=Number(v.dataset.cardIndex||"-1");Number.isFinite(j)&&j>=0&&we(T.cardIndex,j),T=null,ne(r)}),v.addEventListener("dragend",()=>{T=null,ne(r)});P(),K()},V=(u,p)=>{n.status=u,n.statusTone=p,C()},F=()=>{if(!n.config)return;const u=G(n.config);if(!u.length){n.selectedPageId=null;return}(!n.selectedPageId||!u.some(g=>g.id===n.selectedPageId))&&(n.selectedPageId=u[0].id);const p=u.find(g=>g.id===n.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(n.selectedCardIndex===null||n.selectedCardIndex>=c.length)&&(n.selectedCardIndex=0):(n.selectedCardIndex=null,n.focusedBinding=null),Na(n.selectedPageId),Da(Aa(n.config,n.selectedPageId))},D=()=>{n.dirty=!0,V(e.statusDirty,"muted")},re=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),n.selectedPageId&&u.searchParams.set("editorPage",n.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},he=(u,p)=>{if(!n.config||!n.selectedPageId)return;const c=n.config.pages.find(g=>g.id===n.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const g=bt(n.config,p||"page"),k=c.id;c.id=g,n.config.rotation.order=n.config.rotation.order.map(I=>I===k?g:I),n.selectedPageId=g}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);D(),F()}},ve=(u,p)=>{if(!n.config)return;const c=wt(n.config),g=c.safeArea||{},k=p===""?null:Number(p),I=Number.isFinite(k)?k:null;u==="safeTop"?g.top=I??0:u==="safeRight"?g.right=I??0:u==="safeBottom"?g.bottom=I??0:u==="safeLeft"?g.left=I??0:u==="layoutPaddingPx"?c.layoutPaddingPx=I??16:u==="layoutGapPx"?c.layoutGapPx=I??16:u==="globalScale"&&(c.globalScale=I??1),c.safeArea=g,D()},ye=(u,p,c)=>{var I;if(!n.config||!n.selectedPageId)return;const g=n.config.pages.find(N=>N.id===n.selectedPageId);if(!g)return;Array.isArray(g.cards)||(g.cards=[]);const k=g.cards[u];if(k){if(p==="type"){const N=et(c);if(g.cards[u]={...N,caption:H(k,"caption")||N.caption},((I=n.focusedBinding)==null?void 0:I.cardIndex)===u){const x=st(c);n.focusedBinding=x?{cardIndex:u,field:x}:null}}else p==="digits"?k[p]=c===""?0:Number(c):k[p]=c;D()}},be=(u,p)=>{if(!n.config||!u||!p||u===p)return;const c=G(n.config).map(I=>I.id),g=c.indexOf(u),k=c.indexOf(p);g<0||k<0||(c.splice(g,1),c.splice(k,0,u),n.config.rotation.order=c,n.selectedPageId=u,n.selectedCardIndex=0,n.focusedBinding=null,D(),F(),C())},we=(u,p)=>{if(!n.config||!n.selectedPageId||u===p)return;const c=n.config.pages.find(k=>k.id===n.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||p<0||u>=c.cards.length||p>=c.cards.length)return;const[g]=c.cards.splice(u,1);c.cards.splice(p,0,g),n.selectedCardIndex=p,n.focusedBinding=null,D(),C()},Se=u=>{if(!n.config||!n.selectedPageId||!n.focusedBinding)return;const p=n.config.pages.find(k=>k.id===n.selectedPageId),c=n.haEntities.find(k=>k.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const g=p.cards[n.focusedBinding.cardIndex];g&&(Za(g,n.focusedBinding.field,c),D(),C())},xe=(u,p)=>{n.selectedCardIndex=u,n.focusedBinding={cardIndex:u,field:p},C(),window.requestAnimationFrame(()=>{const c=r.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};r.addEventListener("click",async u=>{var Q,ke;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),g=c==null?void 0:c.dataset.action;if(!g)return;if(g==="apply-display-profile"&&n.config){const y=m.value||n.previewDisplayId;Ua(n.config,Qe(y)),D(),C();return}if(g==="open-avatar-archive"){const y=w.querySelector("[data-avatar-archive]");y==null||y.click();return}if(!n.config)return;const k=G(n.config),I=(c==null?void 0:c.dataset.pageId)||null,N=I?k.findIndex(y=>y.id===I):-1;if(g==="select-page"&&I){n.selectedPageId=I,n.selectedCardIndex=0,n.focusedBinding=null,F(),C();return}if(g==="page-up"&&N>0){const y=k.map(R=>R.id);[y[N-1],y[N]]=[y[N],y[N-1]],n.config.rotation.order=y,n.selectedPageId=I,D(),F(),C();return}if(g==="page-down"&&N>=0&&N<k.length-1){const y=k.map(R=>R.id);[y[N],y[N+1]]=[y[N+1],y[N]],n.config.rotation.order=y,n.selectedPageId=I,D(),F(),C();return}if(g==="page-remove"&&I&&k.length>1){n.config.pages=n.config.pages.filter(y=>y.id!==I),n.config.rotation.order=G(n.config).map(y=>y.id),n.selectedPageId=((Q=G(n.config)[Math.max(0,N-1)])==null?void 0:Q.id)||((ke=G(n.config)[0])==null?void 0:ke.id)||null,n.selectedCardIndex=0,n.focusedBinding=null,D(),F(),C();return}if(g==="add-page"){const y=La(n.config);n.config.pages.push(y),n.config.rotation.order=G(n.config).map(R=>R.id),n.selectedPageId=y.id,n.selectedCardIndex=null,n.focusedBinding=null,D(),F(),C();return}if(g==="add-card-template"&&n.selectedPageId){const y=n.config.pages.find(_=>_.id===n.selectedPageId),R=(c==null?void 0:c.dataset.cardType)||"entity";if(y){Array.isArray(y.cards)||(y.cards=[]),y.cards.push(et(R));const _=y.cards.length-1;n.selectedCardIndex=_;const Z=st(R);n.focusedBinding=Z?{cardIndex:_,field:Z}:null,D(),C(),Z&&window.requestAnimationFrame(()=>{const v=r.querySelector("#ha-entity-search");v==null||v.scrollIntoView({behavior:"smooth",block:"center"}),v==null||v.focus()})}return}if(g==="focus-binding"){const y=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),R=(c==null?void 0:c.dataset.bindingField)||"";y>=0&&R&&xe(y,R);return}const x=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(x>=0&&n.selectedPageId){const y=n.config.pages.find(R=>R.id===n.selectedPageId);if(!y||!Array.isArray(y.cards))return;if(g==="select-card"){n.selectedCardIndex=x,C();return}if(g==="card-remove"){y.cards=y.cards.filter((R,_)=>_!==x),n.selectedCardIndex!==null&&(n.selectedCardIndex===x?n.selectedCardIndex=y.cards.length?Math.min(x,y.cards.length-1):null:n.selectedCardIndex>x&&(n.selectedCardIndex-=1)),n.focusedBinding&&(n.focusedBinding.cardIndex===x?n.focusedBinding=null:n.focusedBinding.cardIndex>x&&(n.focusedBinding={cardIndex:n.focusedBinding.cardIndex-1,field:n.focusedBinding.field})),D(),C();return}if(g==="card-up"&&x>0){[y.cards[x-1],y.cards[x]]=[y.cards[x],y.cards[x-1]],n.selectedCardIndex===x?n.selectedCardIndex=x-1:n.selectedCardIndex===x-1&&(n.selectedCardIndex=x),n.focusedBinding&&(n.focusedBinding.cardIndex===x?n.focusedBinding={cardIndex:x-1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===x-1&&(n.focusedBinding={cardIndex:x,field:n.focusedBinding.field})),D(),C();return}if(g==="card-down"&&x<y.cards.length-1){[y.cards[x],y.cards[x+1]]=[y.cards[x+1],y.cards[x]],n.selectedCardIndex===x?n.selectedCardIndex=x+1:n.selectedCardIndex===x+1&&(n.selectedCardIndex=x),n.focusedBinding&&(n.focusedBinding.cardIndex===x?n.focusedBinding={cardIndex:x+1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===x+1&&(n.focusedBinding={cardIndex:x,field:n.focusedBinding.field})),D(),C();return}}if(g==="save"){n.saving=!0,n.avatarPackSaving=n.avatarPackDirty,V(e.saving,"muted");try{if(n.avatarPackDirty&&n.avatarPackDetails&&a.avatarPackApiUrl){try{n.avatarPackDetails=await za(a.avatarPackApiUrl,n.avatarPackDetails)}catch(y){throw new Error(`${e.avatarMappingSaveError}: ${String(y)}`)}n.avatarPackDirty=!1}n.config=await Ba(a.sceneApiUrl,He(n.config)),n.dirty=!1,n.saving=!1,n.avatarPackSaving=!1,F(),V(e.statusSaved,"ok"),window.setTimeout(()=>re(),250)}catch(y){n.saving=!1,n.avatarPackSaving=!1,V(`${e.saveError}: ${String(y)}`,"bad")}return}if(g==="bind-entity"){const y=(c==null?void 0:c.dataset.entityId)||"";Se(y)}}),r.addEventListener("input",u=>{const p=u.target;if(!p||!n.config){p&&p.dataset.previewDisplay!==void 0&&S(p.value);return}if(p.dataset.previewDisplay!==void 0){S(p.value);return}if(p.dataset.avatarSemantic!==void 0){const c=Ne(n.config);if(!n.avatarPackDetails||!c||n.avatarPackDetails.packId!==c)return;const g=p.value.trim();g?n.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic]=Number(g):delete n.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic],n.avatarPackDirty=!0,V(e.statusDirty,"muted"),C();return}if(p.dataset.pageField){he(p.dataset.pageField,p.value),C();return}if(p.dataset.displayField){ve(p.dataset.displayField,p.value),C();return}if(p.dataset.cardField&&p.dataset.cardIndex){n.selectedCardIndex=Number(p.dataset.cardIndex),ye(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),C();return}p.hasAttribute("data-ha-search")&&(n.entitySearch=p.value,C())}),r.addEventListener("click",u=>{var g;const p=(g=u.target)==null?void 0:g.closest("[data-action='select-avatar-pack']");if(!p||!n.config)return;const c=String(p.dataset.packId||"").trim();tt(n.config).packId=c||null,D(),$(c||null).finally(()=>C()),C()}),t.addEventListener("click",u=>{if(!n.config)return;const p=u.target,c=p==null?void 0:p.closest("[data-scene-card-index][data-scene-page-id]");if(c){const k=String(c.dataset.scenePageId||"").trim(),I=Number(c.dataset.sceneCardIndex||"-1");k&&Number.isFinite(I)&&I>=0&&(n.selectedPageId=k,n.selectedCardIndex=I,n.focusedBinding=null,F(),C(),nt("cards"));return}const g=p==null?void 0:p.closest("[data-scene-page-id]");if(g){const k=String(g.dataset.scenePageId||"").trim();k&&(n.selectedPageId=k,n.selectedCardIndex=0,n.focusedBinding=null,F(),C(),nt("pages"));return}}),r.addEventListener("change",u=>{var c;const p=u.target;!p||p.dataset.avatarArchive===void 0||E(((c=p.files)==null?void 0:c[0])||null)}),r.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(n.selectedCardIndex=c,n.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(n.config=await Ra(a.sceneApiUrl),a.avatarCatalogUrl)try{n.avatarCatalog=await it(a.avatarCatalogUrl)}catch{n.avatarCatalog=[]}n.haEntities=_a(((ue=pt())==null?void 0:ue.states)||null),n.selectedPageId=Ma(n.config),n.selectedCardIndex=0,n.status=e.statusSaved,n.statusTone="ok",await $(Ne(n.config)),F()}catch(u){n.status=`${e.loadError}: ${String(u)}`,n.statusTone="bad"}C()}const Qa="../scene-api/bootstrap",ei="weather.forecast_home_assistant",ti="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",ai={...ft,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},ii={...gt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},ri={...mt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},ni={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},si={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function oi(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function li(){return new URLSearchParams(window.location.search).get("bootstrap")||Qa}function di(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function B(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const r=di(e);if(r)return new URL(t.slice(1),r).toString()}return new URL(t,i).toString()}function Fe(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function ci(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function ui(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function Me(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function pi(a,e){var t,i,r,s,o,l,m,w;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([n,$])=>[n,B($,e)]).filter(([,n])=>!!n)),avatar:{manifestUrl:B(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:B(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((r=a.state)==null?void 0:r.provider)||"json",stateUrl:B(String(((s=a.state)==null?void 0:s.stateUrl)||"").trim(),e),haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:B(String(((l=a.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:B(String(((m=a.state)==null?void 0:m.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:B(String(((w=a.control)==null?void 0:w.controlUrl)||"").trim(),e)}}}async function fi(a,e){var w,n,$,P;const t=B(String(((w=a.files)==null?void 0:w.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=B(String(((n=a.files)==null?void 0:n.sceneConfigUrl)||"").trim(),e),r=B(String((($=a.files)==null?void 0:$.avatarCatalogUrl)||"").trim(),e);if(!i||!r)return t;let s="";try{const S=await Me(i);s=String(((P=S.avatar)==null?void 0:P.packId)||"").trim()}catch{s=""}if(!s)return t;let o="";try{const S=await Me(r),E=Array.isArray(S.items)?S.items.find(A=>String(A.id||"").trim()===s):null;o=B(String((E==null?void 0:E.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return t;const m={...pi(await Me(t),t),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(m)],{type:"application/json"}))}const fe=document.getElementById("app");if(!fe)throw new Error("Missing #app root element");const oe=si[oi()];Fe(fe,oe.startingTitle,oe.startingBody);(async()=>{var e,t,i;const a=li();try{const r=await ui(a),s=String(r.packId||"").trim(),o=s.toLowerCase()==="neiri",l=await fi(r,a);if(!l){Fe(fe,oe.missingRendererTitle,oe.missingRendererBody,JSON.stringify(r,null,2));return}document.documentElement.dataset.packId=s,document.title=o?"Нейри":s?`kiosk-scene hosted runtime (${s})`:"kiosk-scene hosted runtime",await xa(fe,{rendererConfigUrl:l,weatherUrl:o?"./weather.json":void 0,weatherReader:o?wa({weatherEntity:ei,openMeteoUrl:ti,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:o?ai:void 0,labels:o?ii:void 0,presetLabels:o?ri:void 0,defaultWeather:o?ni:void 0}),ci()&&await Xa({packId:s,sceneApiUrl:B(String(r.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:B(String(((e=r.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),avatarImportUrl:B(String(((t=r.files)==null?void 0:t.avatarImportUrl)||"").trim(),a),avatarPackApiUrl:B(String(((i=r.files)==null?void 0:i.avatarPackApiUrl)||"").trim(),a),sceneUrl:B(String(r.entryUrl||r.runtimeBaseUrl||"./").trim(),a)})}catch(r){Fe(fe,oe.failedTitle,oe.failedBody,String(r))}})();
