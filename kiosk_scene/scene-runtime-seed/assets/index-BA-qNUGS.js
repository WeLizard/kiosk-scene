var ht=Object.defineProperty;var vt=(a,e,t)=>e in a?ht(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var b=(a,e,t)=>vt(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();function A(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function d(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Fe(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ue(a,e){if(!A(a)||!A(e))return e??a;const t={...a};for(const[i,n]of Object.entries(e)){if(Array.isArray(n)){t[i]=n.slice();continue}if(A(n)&&A(t[i])){t[i]=ue(t[i],n);continue}t[i]=n}return t}function yt(a,e=40){return Array.isArray(a)?a.map(t=>d(t,e).toLowerCase()).filter(Boolean):[]}const Y={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},_e={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function Te(a){var t,i,n,s,o,l,h,r,w,x;const e=ue(Y,A(a)?a:{});return{version:1,assistant:{name:d((t=e.assistant)==null?void 0:t.name,40)||Y.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:A(e.links)?Object.fromEntries(Object.entries(e.links).map(([C,y])=>[d(C,64),d(y,1024)]).filter(([C,y])=>C&&y)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||Y.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||Y.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||Y.state.stateUrl,haApiFallback:((h=e.state)==null?void 0:h.haApiFallback)===!0,idleLinesUrl:d((r=e.state)==null?void 0:r.idleLinesUrl,1024)||Y.state.idleLinesUrl,entityMapUrl:d((w=e.state)==null?void 0:w.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d((x=e.control)==null?void 0:x.controlUrl,1024)||Y.control.controlUrl}}}function at(a){var t,i,n,s,o;const e=ue(_e,A(a)?a:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||_e.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:A(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,h])=>[d(l,32),d(h,1024)]).filter(([l,h])=>l&&h)):{},viewPresets:A(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,h])=>d(l,32)&&A(h))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const Q={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},bt=["full","torso","head"];function ce(a,e=Date.now()){var l,h,r,w,x,C,y;const t=ue(Q,A(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((l=t.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((h=t.page)==null?void 0:h.target,40)||null,until:d((r=t.page)==null?void 0:r.until,64)||null},cue:{cue:d((w=t.cue)==null?void 0:w.cue,32)||null,emotion:d((x=t.cue)==null?void 0:x.emotion,32)||null,motion:d((C=t.cue)==null?void 0:C.motion,32)||null,until:d((y=t.cue)==null?void 0:y.until,64)||null}},n=d(t.viewPreset,16).toLowerCase();i.viewPreset=bt.includes(n)?n:null;const s=Fe(i.page.until);i.page.mode==="pinned"&&(!s||s<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=Fe(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function $e(a,e,t=Date.now()){return ce(ue(ce(a,t),A(e)?e:{}),t)}function wt(a,e,t=Date.now()){return ce({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function St(a,e,t=3e4,i=Date.now()){const n=d(e,40),s=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return ce({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},i)}function it(a,e){var o,l,h;const t={...a||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),n=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),s=d((h=e==null?void 0:e.cue)==null?void 0:h.motion,32);return i&&(t.cue=i),n&&(t.emotion=n),s&&(t.motion=s),t}function _(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function Oe(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function xt(a){return A(a)&&A(a.config)?a.config:a}function kt(a,e){const t={...a};return A(e)&&(typeof e.id=="string"&&(t.id=d(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>A(i)))),t}function Ce(a,e){const t=xt(a),i=Array.isArray(e.pages)?e.pages.slice():[],n=A(t)&&Array.isArray(t.pages)?t.pages:[],s=i.map(y=>{const E=n.find(P=>d(A(P)?P.id:"",40)===y.id);return kt(y,E)}),o=A(t)&&A(t.rotation)?t.rotation:{},l=A(e.display)?e.display:{},h=A(t)&&A(t.display)?t.display:{},r=A(l.safeArea)?l.safeArea:{},w=A(h.safeArea)?h.safeArea:{},x=Array.isArray(o.order)?o.order:e.rotation.order,C=yt(x).filter((y,E,P)=>s.some(S=>S.id===y)&&P.indexOf(y)===E);return{version:1,rotation:{order:C.length?C:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:_(w.top,_(r.top,0)),right:_(w.right,_(r.right,0)),bottom:_(w.bottom,_(r.bottom,0)),left:_(w.left,_(r.left,0))},layoutPaddingPx:_(h.layoutPaddingPx,_(l.layoutPaddingPx,16)),layoutGapPx:_(h.layoutGapPx,_(l.layoutGapPx,16)),globalScale:Oe(h.globalScale,Oe(l.globalScale,1))},pages:s}}function $t(a,e=220){const t=d(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},n=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(s,o,l)=>{const h=d(o,16).toLowerCase(),r=d(l,32).toLowerCase();return(h==="emotion"||h==="activity"||h==="cue"||h==="motion")&&r&&(i[h]=r)," "});return{text:d(n,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const Ct={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function ne(a,e={}){const t=A(a)?a:{},i={...Ct,...e};return{version:1,assistant:d(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:d(t.status??i.status,255),message:d(t.message??i.message,255),source:d(t.source??i.source,64),updatedAt:d(t.updatedAt??i.updatedAt,64),emotion:d(t.emotion??i.emotion,32)||null,activity:d(t.activity??i.activity,32)||null,cue:d(t.cue??i.cue,32)||null,intensity:It(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:d(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:d(t.event??i.event,64)}}function It(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Pt(a,e){return a.order[e]||a.order[0]||""}function Et(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function At(a,e,t,i){const n=Array.isArray(a.order)?a.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let o=1;o<=n.length;o+=1){const l=(s+o*t+n.length)%n.length;if(i(n[l]))return l}return s}function Tt(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=a.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:Et(a.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(a.force){const o=Pt(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(o)?a.activeIndex:Math.max(0,t.findIndex(h=>a.isEligible(h))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let s=a.activeIndex;for(let o=1;o<=t.length;o+=1){const l=(a.activeIndex+o)%t.length;if(a.isEligible(t[l])){s=l;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const rt={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Lt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function He(a){const e=d(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Lt.some(t=>e.includes(t)):!1}function Ut(a,e){const t=ne(a),i=d(t.status,72),n=d(t.message,220);if(!(t.online!==!1&&(He(i)||He(n))))return{state:t,hasTechnicalFailure:!1};const l=d(t.emotion,32).toLowerCase(),h=d(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(t.activity,32).toLowerCase()==="error"?"idle":d(t.activity,32)||null,cue:d(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:h==="error"?"idle_soft":h||null},hasTechnicalFailure:!0}}function Dt(a,e){const t=(e==null?void 0:e.copy)??rt,i=ne(a),n=$t(i.message,220),s=Ut({...i,message:n.text,emotion:d(i.emotion,32)||n.emotion||null,activity:d(i.activity,32)||n.activity||null,cue:d(i.cue,32)||n.cue||null,motion:d(i.motion,32)||n.motion||null},{healthyStatus:t.technicalHealthyLabel}),o=s.state,l=d(o.message,180),h=d(o.activity,32).toLowerCase(),r=o.online!==!1&&h!=="offline",w=!!o.busy||h==="thinking"||h==="busy"||h==="acting",x=o.speaking===!0||h==="speaking",C=r?w?t.busyLabel:l||x?t.speakingLabel:s.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,y=l?t.messageCaption:s.hasTechnicalFailure?t.statusCaption:t.modeCaption,E=l||(r?w?t.busyBody:d(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:o,hasTechnicalFailure:s.hasTechnicalFailure,caption:y,label:C,body:E,bodyKey:[y,C,E].join(":")}}function Nt(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function je(a,e=-1){const t=Array.isArray(a)?a.map(n=>d(n,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function Mt(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!d(a==null?void 0:a.message,180);return e&&!t&&!i}const Rt={cue:null,emotion:null,motion:null,until:null},Bt={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Ft(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function nt(a){return a.endsWith("/")?a:`${a}/`}function me(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(nt(d(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function ye(a){const e=d(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function _t(a,e,t){const i=d(a.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?ye(i):new URL("../avatar.html",new URL(nt(d(t,1024)||"."),window.location.href)).toString()}function Ot(a,e){const t=d(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function Ht(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[n,s]of Object.entries(i)){const o=d(n,64);if(!o||s==null)continue;const l=typeof s=="boolean"?s?"1":"0":String(s);t.searchParams.set(o,l)}return t.toString()}function jt(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),me(t,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([n,s])=>[d(n,64),ye(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:ye(a.state.stateUrl),idleLinesUrl:ye(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:me(t,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:me(t,e.fallbackPortrait||""),motionMapUrl:me(t,e.motionMapUrl||""),presetThumbs:i}}}class zt{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"currentState");b(this,"currentCue",{...Rt});b(this,"currentPreset","full");b(this,"currentBubble",{...Bt});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var n;const t=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!t||e.source!==t||!Ft(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=at({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Te(e.rendererConfig||{}),this.currentState=ne({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const t=_t(this.options,this.manifest,this.assetRoot),i=Ht(t,this.options);this.targetOrigin=Ot(i,this.options.targetOrigin);const n=document.createElement("div");n.className="ks-live2d-frame",Object.assign(n.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const s=document.createElement("iframe");s.className="ks-live2d-iframe",s.src=i,s.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,s.loading="eager",s.allow="autoplay",Object.assign(s.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&s.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);n.append(s,o),this.host.append(n),s.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=n,this.iframeEl=s,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=ne(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(n,s),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:jt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=it(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function Vt(a={}){return new zt(a)}const Wt={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},ze={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Kt{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,n,s),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=n;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||ze,i=t[e]||t.full||ze.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Wt}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),n=t.replace(/^\.?\//,"");return i?`${i}/${n}`:n}}function qt(a={}){return new Kt(a)}function Gt(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function st(){var a;for(const e of Gt())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function Jt(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function Yt(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=d(t.entity_id,255);i&&(e[i]=t)}return e}function Zt(a,e,t="Assistant"){const i=a[e.status],n=a[e.message],s=a[e.online],o=a[e.busy],l=a[e.source],h=a[e.updatedAt],r=e.emotion?a[e.emotion]:null,w=e.activity?a[e.activity]:null,x=e.cue?a[e.cue]:null,C=e.speaking?a[e.speaking]:null,y=e.intensity?a[e.intensity]:null,E=e.motion?a[e.motion]:null,P=a[e.revision];if(!i&&!n&&!s&&!o)return null;const S=d(i==null?void 0:i.state,72),N=d(n==null?void 0:n.state,220),D=d(h==null?void 0:h.state,64),U=Ie(s,!0),W=Ie(o,!1),K=d(w==null?void 0:w.state,32)||"",q=Ie(C)??K==="speaking",ee=K||(U?q?"speaking":W?"thinking":"idle":"offline");return ne({version:1,assistant:d(t,40)||"Assistant",online:U,busy:W,status:S&&S!=="unknown"&&S!=="unavailable"?S:"",message:N&&N!=="unknown"&&N!=="unavailable"?N:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:D&&D!=="unknown"&&D!=="unavailable"?D:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(r==null?void 0:r.state,32)||null,activity:ee,cue:d(x==null?void 0:x.state,32)||null,intensity:Xt(y),speaking:q,motion:d(E==null?void 0:E.state,32)||null,revision:Number(P==null?void 0:P.state)||0})}function Ie(a,e){const t=d(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function Xt(a){const e=d(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function Qt(a){const e=De(a);return{id:"ha-state",async read(){const t=await e.read();return t?Zt(t,a.entityMap,a.assistantName):null}}}function De(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let n=null,s=0,o=null,l=0;async function h(){var C;const r=st();if(r!=null&&r.states)return r.states;const w=Date.now();if(n&&w-s<t||!a.allowApiFallback||typeof e!="function"||w<l)return n;if(o)return o;const x=d(((C=a.readToken)==null?void 0:C.call(a))??Jt(),4096);return x?(o=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${x}`}}).then(async y=>{if(!y.ok){const E=new Error(`HA states HTTP ${y.status}`);throw E.status=y.status,E}return y.json()}).then(y=>{const E=Yt(y);return E&&(n=E,s=Date.now()),E||n}).catch(y=>(((y==null?void 0:y.status)===401||(y==null?void 0:y.status)===403)&&(l=Date.now()+i),n)).finally(()=>{o=null}),o):n}return{id:"ha-states",async read(){return h()}}}async function Ne(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=d(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const n=await e(i.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return a.sanitize?a.sanitize(s):s}catch(n){if(a.defaultValue!==void 0)return a.defaultValue;throw n}}function ea(a){return{id:"json-state",async read(){const e=await Ne({...a,defaultValue:a.defaultValue});return ne(e)}}}function Ve(a){return{id:"json-control",async read(){const e=await Ne({...a,defaultValue:a.defaultValue??Q});return ce(e)}}}function ta(a){return{id:"json-lines",async read(){const e=await Ne({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>d(t,220)).filter(Boolean):[]}}}function R(a,e,t=64){return d(a[e],t)}function le(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function aa(a,e="en-US"){const t=d(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function he(a,e){return!a||!e?null:a[e]||null}function ia(a,e=null,t="en-US"){var x,C,y,E;const i=R(a,"caption",40)||R(a,"type",24)||"Card",n=R(a,"hint",72),s=R(a,"type",32).toLowerCase()||"entity",o=R(a,"entity",255),l=he(e,o),h=he(e,R(a,"stateEntity",255)),r=he(e,R(a,"downEntity",255)),w=he(e,R(a,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:R(a,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const P=Number(l==null?void 0:l.state);return!Number.isFinite(P)||P<=0?{caption:i,value:"Clear",hint:n||"nothing pending"}:{caption:i,value:`${P} item${P===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const P=(l==null?void 0:l.state)==="on";return{caption:i,value:P?R(a,"onText",48)||"On":R(a,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const P=le(l==null?void 0:l.state,0);return{caption:i,value:P?`${P}%`:"—",hint:d(h==null?void 0:h.state,48)||n||"battery level"}}if(s==="network"){const P=le(r==null?void 0:r.state,0),S=le(w==null?void 0:w.state,0);return{caption:i,value:P||S?`↓ ${P||"0"} · ↑ ${S||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:i,value:aa(l==null?void 0:l.state,t)||"—",hint:n||"next event"};if(s==="percent"){const P=le(l==null?void 0:l.state,Number(R(a,"digits",4))||0);return{caption:i,value:P?`${P}%`:"—",hint:n||d((x=l==null?void 0:l.attributes)==null?void 0:x.friendly_name,48)||"state percentage"}}if(s==="number"){const P=Number(R(a,"digits",4))||0,S=le(l==null?void 0:l.state,P),N=R(a,"unit",16)||d((C=l==null?void 0:l.attributes)==null?void 0:C.unit_of_measurement,16);return{caption:i,value:S?`${S}${N?` ${N}`:""}`:"—",hint:n||d((y=l==null?void 0:l.attributes)==null?void 0:y.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||R(a,"value",64)||"—",hint:n||d((E=l==null?void 0:l.attributes)==null?void 0:E.friendly_name,48)||"entity state"}}function ra(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>ia(i,e,t)):[]}const ot={...rt,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},lt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},dt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},na={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},be={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function v(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ct(a){return a.endsWith("/")?a:`${a}/`}function O(a,e){const t=d(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function ut(a){return new URL(".",a).toString()}function sa(a,e){const t=ut(e),i=O(t,d(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:O(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([n,s])=>[n,O(t,s)]).filter(([,n])=>!!n))}}function Pe(a){return{...be,...a||{},metrics:{...be.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):be.forecast.map(e=>({...e}))}}function We(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function F(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function oa(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${F(t)} мм рт. ст.`:`${F(t*.750061683,0)} мм рт. ст.`}function la(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${F(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${F(t/3.6,1)} м/с`:`${F(t,1)} м/с`}function da(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ca(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function ua(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function pa(a,e="ru-RU"){const t=d(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||d(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function Ke(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function fa(a,e="./assets/icons"){const t=Number(a),i=ct(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function ga(a){const e=d(a.locale,32)||"ru-RU",t=d(a.iconBaseUrl,1024)||"./assets/icons",i=De({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var E,P,S,N,D,U,W,K,se,q,ee,pe,fe,ge,oe,p,u,c,g,$;const n=await i.read(),s=a.fetchImpl??globalThis.fetch,o=n==null?void 0:n[a.weatherEntity];let l=null;const h=d(a.openMeteoUrl,4096);if(h&&typeof s=="function")try{const I=await s(`${h}${h.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});I.ok&&(l=await I.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const r=d(o==null?void 0:o.last_changed,64)||d((E=l==null?void 0:l.current)==null?void 0:E.time,64)||new Date().toISOString(),w=o?pa(o.state,e):Ke((P=l==null?void 0:l.current)==null?void 0:P.weather_code,e),x=Array.isArray((S=l==null?void 0:l.daily)==null?void 0:S.time)?l.daily.time.map((I,T)=>{var G,J,f,L,j;const k=new Date(`${I}T12:00:00+03:00`);return{name:k.toLocaleDateString(e,{weekday:"short"}),dayNumber:k.toLocaleDateString(e,{day:"numeric"}),monthShort:k.toLocaleDateString(e,{month:"short"}),note:d(Ke((G=l.daily.weather_code)==null?void 0:G[T],e),28),max:`${F((J=l.daily.temperature_2m_max)==null?void 0:J[T])}°`,min:`${F((f=l.daily.temperature_2m_min)==null?void 0:f[T])}° · ${F((L=l.daily.precipitation_probability_max)==null?void 0:L[T])}%`,icon:fa((j=l.daily.weather_code)==null?void 0:j[T],t)}}):[],C=x[0]||null,y=x.slice(1,6);return{todayValue:ca(r,e),todayLabel:ua(r,e),updatedAt:da(r,e),temperature:F(((N=o==null?void 0:o.attributes)==null?void 0:N.temperature)??((D=l==null?void 0:l.current)==null?void 0:D.temperature_2m),1),condition:w,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${F(((U=o==null?void 0:o.attributes)==null?void 0:U.apparent_temperature)??((W=l==null?void 0:l.current)==null?void 0:W.apparent_temperature)??((K=o==null?void 0:o.attributes)==null?void 0:K.temperature),1)}°C`,badgeSummary:w,badgeRange:C?`${C.max} / ${F((q=(se=l==null?void 0:l.daily)==null?void 0:se.temperature_2m_min)==null?void 0:q[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${F(((ee=o==null?void 0:o.attributes)==null?void 0:ee.humidity)??((pe=l==null?void 0:l.current)==null?void 0:pe.relative_humidity_2m))}%`,pressure:oa(((fe=o==null?void 0:o.attributes)==null?void 0:fe.pressure)??((ge=l==null?void 0:l.current)==null?void 0:ge.surface_pressure),((oe=o==null?void 0:o.attributes)==null?void 0:oe.pressure_unit)??"hPa"),wind:la(((p=o==null?void 0:o.attributes)==null?void 0:p.wind_speed)??((u=l==null?void 0:l.current)==null?void 0:u.wind_speed_10m),((c=o==null?void 0:o.attributes)==null?void 0:c.wind_speed_unit)??"km/h"),clouds:`${F(((g=o==null?void 0:o.attributes)==null?void 0:g.cloud_coverage)??(($=l==null?void 0:l.current)==null?void 0:$.cloud_cover))}%`},forecast:y}}}class ma{constructor(e,t={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"entityMap",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",Q);b(this,"uiControl",Q);b(this,"currentControl",Q);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...ot,...t.copy||{}},this.labels={...lt,...t.labels||{}},this.presetLabels={...dt,...t.presetLabels||{}},this.weatherData=Pe(t.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=O(window.location.href,this.getRendererConfigUrl()),t=ut(e),i=Te(await this.readJson(e)),n=Te({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,O(t,l)])),avatar:{...i.avatar,manifestUrl:O(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:O(t,i.scene.configUrl)},state:{...i.state,stateUrl:O(t,i.state.stateUrl),idleLinesUrl:O(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?O(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:O(t,i.control.controlUrl)}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=sa(at(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await ta({url:this.rendererConfig.state.idleLinesUrl||O(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Ve({url:this.rendererConfig.control.controlUrl,defaultValue:Q}).read(),this.currentControl=$e(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=wt(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,n;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(n=(i=this.carouselShellEl).setPointerCapture)==null||n.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:n}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(n)>=s*.16,l=n<0?1:-1;if(this.clearDragState(t.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Ve({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=$e(Q,this.uiControl),this.currentControl=$e(this.remoteControl,this.uiControl);const e=it(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=Dt(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=Ce(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const n=this.getOrderedPages(i.pages,i.rotation.order),s=Tt({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>n.some(l=>l.id===o)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(n,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,n)=>i.kind==="overview"?this.renderOverviewSlide(i,t,n):this.renderDynamicSlide(i,n,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,n)=>`
      <button
        class="carousel-dot ${n===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${n}"
        data-scene-page-id="${v(i.id)}"
        aria-label="${v(d(i.title,40)||`Page ${n+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t,i){const n=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||be,o=s.forecast.slice(0,5).map(l=>this.renderForecastDay(l)).join("");return`
      <section class="slide slide-overview" data-slide-id="${v(e.id)}" data-scene-page-id="${v(e.id)}" data-slide-order="${i}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${v(s.title)}</h1>
              <p class="subline">${v(s.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${v(s.todayCaption)}</span>
                <span class="value">${v(s.todayValue)}</span>
                <span class="meta">${v(s.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${v(s.updatedCaption)}</span>
                <span class="value">${v(s.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${v(s.temperature)}</span>
                <span class="unit">°${v(s.unit)}</span>
              </div>
              <div class="condition">${v(s.condition)}</div>
              <div class="feels">${v(s.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${v(this.resolveIconUrl("thermometer"))}" alt=""><span>${v(s.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${v(this.resolveIconUrl("calendarDays"))}" alt=""><span>${v(s.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${v(t.caption)}</strong>
                  <div class="neiri-label">${v(t.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${v(this.resolveIconUrl("sparkles"))}" alt="${v(n)}"></div>
              </div>
              <div class="neiri-meta">${v(t.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${v(this.labels.humidity)}</span><i><img src="${v(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${v(s.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${v(this.labels.pressure)}</span><i><img src="${v(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${v(s.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${v(this.labels.wind)}</span><i><img src="${v(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${v(s.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${v(this.labels.clouds)}</span><i><img src="${v(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${v(s.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${v(s.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${o}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,t,i){const n=ra(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${t+1} / ${i}`),h=e.cardStyle==="mini"?n.map((x,C)=>`
          <article class="mini-card" data-scene-card-index="${C}" data-scene-page-id="${v(e.id)}">
            <span class="caption">${v(x.caption)}</span>
            <strong>${v(x.value)}</strong>
          </article>
        `).join(""):n.map((x,C)=>`
          <article class="home-card" data-scene-card-index="${C}" data-scene-page-id="${v(e.id)}">
            <span class="caption">${v(x.caption)}</span>
            <strong>${v(x.value)}</strong>
            <small>${v(x.hint)}</small>
          </article>
        `).join(""),r=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(x=>this.renderForecastDay(x)).join("")}</div>`:"",w=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
      <section class="slide slide-dynamic" data-slide-id="${v(e.id)}" data-scene-page-id="${v(e.id)}" data-slide-order="${t}">
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
          ${r}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],i=e[e.length-1];return`${d(t.dayNumber,4)} ${d(t.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var n;const t=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return t||`${ct(d(this.options.iconBaseUrl,1024)||"./assets")}${na[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,t){const i=t.map(s=>e.find(o=>o.id===s)).filter(Boolean),n=e.filter(s=>!i.some(o=>o.id===s.id));return i.concat(n)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,n;!t&&((n=(i=this.carouselShellEl).hasPointerCapture)!=null&&n.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=Ce(this.sceneConfig,this.sceneConfig),i=At(t.rotation,this.activeIndex,e,n=>this.orderedPages.some(s=>s.id===n));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const n=Ce(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,n.rotation.defaultDwellMs*2);this.uiControl=St(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!Mt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=je(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=je(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},Nt(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>ea({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await Qt({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:De({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=We(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=We(e,t)}catch{}try{return Pe(e)}catch{return Pe(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Vt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return qt({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",n=t.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function ha(a,e={}){const t=new ma(a,e);return await t.init(),t}const va=["overview","cards","forecast+cards"],ya=["full","mini"],pt=["entity","text","todo","onoff","battery","network","time","percent","number"],z=["caption","hint"],ba={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},wa={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается честный 1:1 viewport выбранного экрана. Если не влезает по ширине, страница просто прокручивается.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Подставить в настройки экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Выбор Live2D-модели для текущего instance-pack. Применяется после сохранения и перезагрузки превью.",avatarPack:"Набор аватара",avatarPackCurrent:"Текущий avatar.manifest.json instance-pack",avatarPackHint:"Другие модели лежат отдельно в /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"В каталоге avatar-packs пока нет отдельных моделей.",avatarPackAppliedAfterSave:"Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",avatarPackDefaultTile:"Текущий instance-pack",avatarPackDefaultHint:"Оставить аватар из scene-pack без отдельного avatar-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Будет применён после сохранения",avatarPackMotionCount:a=>`${a} motion`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Импорт аватара",avatarImportHint:"Загрузи zip-архив с Live2D-моделью. Kiosk Scene сам распакует его в avatar-packs, найдёт model3.json и создаст draft motion-map.",avatarImportSelect:"ZIP архив аватара",avatarImportSelected:a=>`Выбран архив: ${a}`,avatarImportButton:"Импортировать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:a=>`Импортирован avatar-pack: ${a}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для semantic cue/activity в runtime.",avatarMappingEmpty:"Выбери отдельный avatar-pack, чтобы редактировать его motion-map.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Idle / ожидание",avatarSemanticTouch:"Touch / касание",avatarSemanticReplySoft:"Reply soft / мягкий ответ",avatarSemanticThink:"Think / размышление",avatarSemanticBusy:"Busy / занята",avatarSemanticCalm:"Calm / спокойствие",avatarSemanticHappy:"Happy / радость",avatarSemanticSurprise:"Surprise / удивление",avatarSemanticWarning:"Warning / предупреждение",avatarSemanticGreet:"Greet / приветствие",avatarSemanticSpeaking:"Speaking / говорит",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardsSubtitle:"Сначала выбери или добавь карточку, затем настрой её ниже. Порядок здесь же влияет на правую карусель.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку из шаблона выше или выбери существующую карточку из списка.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingActive:(a,e)=>`Сейчас связываем: ${a} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage renders a true 1:1 viewport of the selected screen. If it does not fit, the editor page simply scrolls.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Fill display settings below",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the Live2D model for this instance-pack. It applies after save and preview reload.",avatarPack:"Avatar pack",avatarPackCurrent:"Use the instance-pack avatar.manifest.json",avatarPackHint:"Additional models live in /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"No separate avatar packs are available yet.",avatarPackAppliedAfterSave:"The selected avatar pack will apply after saving and reloading the preview.",avatarPackDefaultTile:"Current instance-pack",avatarPackDefaultHint:"Keep the avatar bundled directly with the scene pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Will apply after save",avatarPackMotionCount:a=>`${a} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Import avatar",avatarImportHint:"Upload a Live2D zip archive. Kiosk Scene will unpack it into avatar-packs, detect model3.json and create a draft motion map.",avatarImportSelect:"Avatar ZIP archive",avatarImportSelected:a=>`Selected archive: ${a}`,avatarImportButton:"Import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:a=>`Imported avatar pack: ${a}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map semantic cue/activity slots to actual model motions used by the runtime.",avatarMappingEmpty:"Choose a separate avatar pack to edit its motion map.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardsSubtitle:"Add or choose a card first, then edit it below. The order here drives the right-hand carousel.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card from the templates above or choose an existing one from the list.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingActive:(a,e)=>`Binding now: ${a} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Sa=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],we=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Se="mellow-fly-7";function Le(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function qe(a){return we.find(e=>e.id===a)||we.find(e=>e.id===Se)||we[0]}function xa(a){return`${a.width} × ${a.height}`}function m(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Me(a){return JSON.parse(JSON.stringify(a))}function H(a){const e=new Map(a.pages.map(n=>[n.id,n])),t=a.rotation.order.map(n=>e.get(n)).filter(Boolean),i=a.pages.filter(n=>!t.some(s=>s.id===n.id));return[...t,...i]}function ka(a,e){return e?Math.max(0,H(a).findIndex(t=>t.id===e)):0}function $a(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function ft(a,e){const t=$a(e);let i=t,n=2;for(;a.pages.some(s=>s.id===i);)i=`${t}-${n}`,n+=1;return i}function Ca(a){const e=a.pages.length+1;return{id:ft(a,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function Ge(a){switch(a){case"text":return{type:a,caption:"Text",value:"—",hint:""};case"todo":return{type:a,caption:"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:a,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:"Time",entity:"",hint:""};case"percent":return{type:a,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function B(a,e){const t=a[e];return t==null?"":String(t)}function V(a,e){const t=a[e];return t==null?"":String(t)}function Z(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function gt(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function Ee(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function Je(a){return a.avatar||(a.avatar={}),a.avatar}function Ia(a,e){const t=gt(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function Pa(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function Ea(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Aa(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&H(a).some(n=>n.id===t)?t:((i=H(a)[0])==null?void 0:i.id)||null}async function Ta(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return Me(t.config)}async function La(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return Me(i.config)}function Re(a){switch(a){case"text":return[...z,"value"];case"todo":return[...z,"entity"];case"onoff":return[...z,"entity","onText","offText"];case"battery":return[...z,"entity","stateEntity"];case"network":return[...z,"downEntity","upEntity"];case"time":return[...z,"entity"];case"percent":return[...z,"entity","digits"];case"number":return[...z,"entity","digits","unit"];default:return[...z,"entity"]}}function Ye(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function re(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function mt(a){const e=Le();return ba[e][a]||""}function xe(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Ua(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),n=a.includes(".")&&a.split(".",1)[0]||"other",s=String(e.state||""),o=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:n,state:s,unit:o}}function Da(a){return a?Object.entries(a).map(([e,t])=>Ua(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function Na(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function Ze(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(n=>({id:String(n.id||"").trim(),name:String(n.name||n.id||"").trim(),manifestUrl:String(n.manifestUrl||"").trim(),previewUrl:String(n.previewUrl||"").trim(),motionCount:Number(n.motionCount||0),capabilities:typeof n.capabilities=="object"&&n.capabilities?{supportsMotion:!!n.capabilities.supportsMotion,supportsEmotion:!!n.capabilities.supportsEmotion,supportsLipSync:!!n.capabilities.supportsLipSync}:void 0})).filter(n=>n.id&&n.manifestUrl):[]}async function Ma(a,e){const t=String(a||"").trim();if(!t)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const n=await fetch(t,{method:"POST",body:i}),s=await n.json();if(!n.ok||s.success===!1||!s.item)throw new Error(String(s.error||`HTTP ${n.status}`));return{id:String(s.item.id||"").trim(),name:String(s.item.name||s.item.id||"").trim(),manifestUrl:String(s.item.manifestUrl||"").trim(),previewUrl:String(s.item.previewUrl||"").trim(),motionCount:Number(s.item.motionCount||0),capabilities:typeof s.item.capabilities=="object"&&s.item.capabilities?{supportsMotion:!!s.item.capabilities.supportsMotion,supportsEmotion:!!s.item.capabilities.supportsEmotion,supportsLipSync:!!s.item.capabilities.supportsLipSync}:void 0}}async function Ra(a,e){var o,l,h,r;const t=String(a||"").trim(),i=String(e||"").trim();if(!t||!i)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${t}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((o=s.motionMap)==null?void 0:o.motions)?(l=s.motionMap)==null?void 0:l.motions.map(w=>({index:Number(w.index),id:String(w.id||"").trim(),label:String(w.label||w.id||"").trim(),group:String(w.group||"").trim(),tags:Array.isArray(w.tags)?w.tags.map(x=>String(x||"").trim()).filter(Boolean):[]})).filter(w=>Number.isFinite(w.index)):[],semantic:typeof((h=s.motionMap)==null?void 0:h.semantic)=="object"&&((r=s.motionMap)!=null&&r.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function Ba(a,e){var s,o,l;const t=String(a||"").trim();if(!t||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${t}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await i.json();if(!i.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${i.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((o=n.motionMap)==null?void 0:o.semantic)=="object"&&((l=n.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function Fa(a){if(Array.isArray(a)){const e=a.find(t=>Number.isFinite(Number(t)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(a))?String(Number(a)):""}function _a(a,e){const t=a[e.labelKey];return typeof t=="string"?t:e.key}function Oa(a,e){const t=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${a.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Sa.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${m(i.key)}">${m(_a(a,i))}</label>
            <select id="avatar-semantic-${m(i.key)}" data-avatar-semantic="${m(i.key)}">
              <option value="">${m(a.avatarMotionNone)}</option>
              ${t.map(n=>`
                <option value="${m(String(n.index))}"${Fa(e.motionMap.semantic[i.key])===String(n.index)?" selected":""}>
                  ${m(`${n.label||n.id} · #${n.index}`)}
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
  `}function Xe(a,e,t){var r,w,x;const i=(e==null?void 0:e.id)||"",n=t===i,s=(e==null?void 0:e.name)||a.avatarPackDefaultTile,o=(e==null?void 0:e.id)||a.avatarPackCurrent,l=(e==null?void 0:e.previewUrl)||"",h=e?[e.motionCount>0?a.avatarPackMotionCount(e.motionCount):"",(r=e.capabilities)!=null&&r.supportsMotion?a.avatarCapabilityMotion:"",(w=e.capabilities)!=null&&w.supportsEmotion?a.avatarCapabilityEmotion:"",(x=e.capabilities)!=null&&x.supportsLipSync?a.avatarCapabilityLipSync:""].filter(Boolean):[a.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${l?`<img src="${m(l)}" alt="${m(s)}">`:`<span>${m(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${m(s)}</strong>
        <div class="meta">${m(o)}</div>
        <div class="avatar-pack-card-meta">
          ${h.map(C=>`<span>${m(C)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${m(i)}">
          ${m(n?a.avatarPackSelected:a.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function Be(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function Ha(a,e,t,i){if(!e||t===null)return`<div class="meta">${m(a.entityBindingEmpty)}</div>`;const n=Re(B(e,"type")||"entity").filter(s=>Be(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===t&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${t}" data-binding-field="${m(s)}">
            ${m(xe(a,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${m(a.entityBindingEmpty)}</div>`}function Qe(a){const e=document.querySelector(`[data-editor-section="${a}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function ve(a){for(const e of Array.from(a.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function et(a){return Re(a).find(e=>Be(e))||null}function ae(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${m(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${m(e)}" value="${m(t)}">
    </div>
  `}function X(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${m(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${m(e)}" value="${m(t)}">
    </div>
  `}function tt(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${m(a)}</label>
      <select id="page-select-${e}" data-page-field="${m(e)}">
        ${i.map(n=>`<option value="${m(n.value)}"${n.value===t?" selected":""}>${m(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function ja(a,e,t,i){const n=B(e,"type")||"entity",s=Re(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${m(B(e,"caption")||re(a,n))}</strong>
          <div class="meta">${m(re(a,n))}</div>
        </div>
        <div class="meta">#${t+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${m(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${pt.map(o=>`<option value="${o}"${o===n?" selected":""}>${m(re(a,o))}</option>`).join("")}
          </select>
        </div>
        ${s.map(o=>{const l=Be(o),h=l&&(i==null?void 0:i.cardIndex)===t&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${h?" is-active":""}">
                <label>${m(xe(a,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${m(o)}"
                    data-binding-field="${m(o)}"
                    value="${m(B(e,o))}"
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
              <label>${m(xe(a,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${m(o)}"
                value="${m(B(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function za(a,e,t,i,n){const s=B(e,"type")||"entity",o=B(e,"caption")||re(a,s),l=B(e,"entity")||B(e,"stateEntity")||B(e,"downEntity")||B(e,"upEntity")||B(e,"value")||B(e,"hint")||mt(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${t}">
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
  `}function Va(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${m(e)}"
    >
      <strong>${m(re(a,e))}</strong>
      <span>${m(mt(e))}</span>
    </button>
  `}function Wa(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function Ka(a){var oe;const e=wa[Le()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
                ${we.map(p=>`<option value="${m(p.id)}">${m(p.label[Le()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),o=n.querySelector("[data-preview-resolution]"),l=n.querySelector("[data-preview-display]"),h=n.querySelector("[data-dashboard]");if(!s||!o||!l||!h)throw new Error("Missing native editor shell elements");s.appendChild(t);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Se,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},w=async p=>{const u=String(p||"").trim();if(!u||!a.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,S();try{r.avatarPackDetails=await Ra(a.avatarPackApiUrl,u),r.avatarPackDirty=!1}catch(c){r.avatarPackDetails=null,r.avatarPackDirty=!1,N(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{r.avatarPackLoading=!1}},x=()=>{const p=qe(r.previewDisplayId);l.value=p.id,o.textContent=xa(p),s.style.width=`${p.width}px`,s.style.height=`${p.height}px`,t.style.width=`${p.width}px`,t.style.height=`${p.height}px`},C=typeof ResizeObserver<"u"?new ResizeObserver(()=>x()):null;C==null||C.observe(s);let y=null;const E=()=>{const p=r.selectedPageId||"",u=r.selectedCardIndex;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(p){const c=t.querySelector(`[data-slide-id="${CSS.escape(p)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(p&&u!==null){const c=`[data-scene-page-id="${CSS.escape(p)}"][data-scene-card-index="${u}"]`,g=t.querySelector(c);g&&(g.dataset.editorSelectedCard="true")}},P=typeof MutationObserver<"u"?new MutationObserver(()=>E()):null;P==null||P.observe(t,{childList:!0,subtree:!0});const S=()=>{const p=r.config,u=p?H(p):[],c=u.find(f=>f.id===r.selectedPageId)||u[0]||null,g=Array.isArray(c==null?void 0:c.cards)?c.cards:[],$=r.selectedCardIndex!==null&&g[r.selectedCardIndex]||null,I=Na(r.haEntities,r.entitySearch),T=r.focusedBinding?e.entityBindingActive(B(g[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,xe(e,r.focusedBinding.field)):e.entityBindingEmpty,k=p?Ee(p):"",G=r.pendingAvatarZipName?e.avatarImportSelected(r.pendingAvatarZipName):e.avatarImportHint,J=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${m(r.avatarImportStatus)}</div>`:"";h.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${m(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${m(a.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${r.saving||r.avatarPackSaving||!p?" disabled":""}>${r.saving||r.avatarPackSaving?e.saving:e.save}</button>
          <button class="scene-editor-button" type="button" data-action="add-page"${p?"":" disabled"}>${e.addPage}</button>
        </div>
      </div>
      <div class="scene-dashboard-body">
        <div class="scene-settings-stack">
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.avatar}</h2>
              <div class="meta">${e.avatarSubtitle}</div>
            </div>
          ${p?`
            <div class="avatar-pack-box">
              <div class="meta">${r.avatarCatalog.length?e.avatarPackHint:e.avatarPackEmpty}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${Xe(e,null,k)}
                ${r.avatarCatalog.map(f=>Xe(e,f,k)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label for="avatar-pack-archive">${e.avatarImportSelect}</label>
                <input id="avatar-pack-archive" type="file" accept=".zip,application/zip" data-avatar-archive>
              </div>
              <div class="meta">${m(G)}</div>
              <div class="page-chip-actions">
                <button class="scene-editor-button" type="button" data-action="import-avatar"${r.avatarImporting||!r.pendingAvatarZip||!a.avatarImportUrl?" disabled":""}>
                  ${r.avatarImporting?e.avatarImporting:e.avatarImportButton}
                </button>
              </div>
              ${J}
            </div>
            ${k?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?Oa(e,r.avatarPackDetails):`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`:`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="cards">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(a.packId)}</div>
            </div>
            <div class="page-list">
            ${u.map((f,L)=>`
              <article class="page-chip ${f.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${m(f.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${m(f.id)}">
                  <strong>${m(f.title||f.id||`Page ${L+1}`)}</strong>
                  <span class="meta">${m(Ye(e,f.kind))} · ${m(e.pageCards(Array.isArray(f.cards)?f.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${m(f.id)}"${L===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${m(f.id)}"${L===u.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${m(f.id)}"${u.length<=1?" disabled":""}>${e.remove}</button>
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
              ${ae(e.fieldPageId,"id",V(c,"id"),!0)}
              ${tt(e.fieldKind,"kind",V(c,"kind"),va.map(f=>({value:f,label:Ye(e,f)})))}
              ${ae(e.fieldTitle,"title",V(c,"title"),!0)}
              ${ae(e.fieldSubtitle,"subtitle",V(c,"subtitle"),!0)}
              ${ae(e.fieldSlot,"slot",V(c,"slot"))}
              ${tt(e.fieldCardStyle,"cardStyle",V(c,"cardStyle")||"full",ya.map(f=>({value:f,label:f==="mini"?e.styleMini:e.styleFull})))}
              ${ae(e.fieldStampCaption,"stampCaption",V(c,"stampCaption"))}
              ${ae(e.fieldStampValue,"stampValue",V(c,"stampValue"))}
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
                  ${pt.map(f=>Va(e,f)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${g.length?g.map((f,L)=>za(e,f,L,g.length,L===r.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${$?ja(e,$,r.selectedCardIndex||0,r.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              ${X(e.fieldDisplaySafeTop,"safeTop",Z(p,"safeTop"))}
              ${X(e.fieldDisplaySafeRight,"safeRight",Z(p,"safeRight"))}
              ${X(e.fieldDisplaySafeBottom,"safeBottom",Z(p,"safeBottom"))}
              ${X(e.fieldDisplaySafeLeft,"safeLeft",Z(p,"safeLeft"))}
              ${X(e.fieldDisplayPadding,"layoutPaddingPx",Z(p,"layoutPaddingPx"))}
              ${X(e.fieldDisplayGap,"layoutGapPx",Z(p,"layoutGapPx"))}
              ${X(e.fieldDisplayScale,"globalScale",Z(p,"globalScale"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.homeAssistant}</h2>
              <div class="meta">${m(T)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${Ha(e,$,r.selectedCardIndex,r.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${m(r.entitySearch)}">
          </div>
          <div class="ha-list">
            ${I.length?I.map(f=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${m(f.name)}</strong>
                    <div class="meta">${m(f.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${m(f.entityId)}"${r.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${m(f.entityId)}</code>
                <div class="ha-state">${m(f.state)}${f.unit?` · ${m(f.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `,x(),E()},N=(p,u)=>{r.status=p,r.statusTone=u,S()},D=()=>{if(!r.config)return;const p=H(r.config);if(!p.length){r.selectedPageId=null;return}(!r.selectedPageId||!p.some(g=>g.id===r.selectedPageId))&&(r.selectedPageId=p[0].id);const u=p.find(g=>g.id===r.selectedPageId)||null,c=Array.isArray(u==null?void 0:u.cards)?u.cards:[];c.length?(r.selectedCardIndex===null||r.selectedCardIndex>=c.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),Ea(r.selectedPageId),Pa(ka(r.config,r.selectedPageId))},U=()=>{r.dirty=!0,N(e.statusDirty,"muted")},W=()=>{const p=new URL(window.location.href);p.searchParams.set("editor","1"),r.selectedPageId&&p.searchParams.set("editorPage",r.selectedPageId),p.searchParams.set("v",String(Date.now())),window.location.replace(p.toString())},K=(p,u)=>{if(!r.config||!r.selectedPageId)return;const c=r.config.pages.find(g=>g.id===r.selectedPageId);if(c){if(p==="slot")c.slot=u===""?void 0:Number(u);else if(p==="id"){const g=ft(r.config,u||"page"),$=c.id;c.id=g,r.config.rotation.order=r.config.rotation.order.map(I=>I===$?g:I),r.selectedPageId=g}else p==="title"||p==="subtitle"||p==="stampCaption"||p==="stampValue"?c[p]=u:p==="kind"?c.kind=u:p==="cardStyle"&&(c.cardStyle=u);U(),D()}},se=(p,u)=>{if(!r.config)return;const c=gt(r.config),g=c.safeArea||{},$=u===""?null:Number(u),I=Number.isFinite($)?$:null;p==="safeTop"?g.top=I??0:p==="safeRight"?g.right=I??0:p==="safeBottom"?g.bottom=I??0:p==="safeLeft"?g.left=I??0:p==="layoutPaddingPx"?c.layoutPaddingPx=I??16:p==="layoutGapPx"?c.layoutGapPx=I??16:p==="globalScale"&&(c.globalScale=I??1),c.safeArea=g,U()},q=(p,u,c)=>{var I;if(!r.config||!r.selectedPageId)return;const g=r.config.pages.find(T=>T.id===r.selectedPageId);if(!g)return;Array.isArray(g.cards)||(g.cards=[]);const $=g.cards[p];if($){if(u==="type"){const T=Ge(c);if(g.cards[p]={...T,caption:B($,"caption")||T.caption},((I=r.focusedBinding)==null?void 0:I.cardIndex)===p){const k=et(c);r.focusedBinding=k?{cardIndex:p,field:k}:null}}else u==="digits"?$[u]=c===""?0:Number(c):$[u]=c;U()}},ee=(p,u)=>{if(!r.config||!p||!u||p===u)return;const c=H(r.config).map(I=>I.id),g=c.indexOf(p),$=c.indexOf(u);g<0||$<0||(c.splice(g,1),c.splice($,0,p),r.config.rotation.order=c,r.selectedPageId=p,r.selectedCardIndex=0,r.focusedBinding=null,U(),D(),S())},pe=(p,u)=>{if(!r.config||!r.selectedPageId||p===u)return;const c=r.config.pages.find($=>$.id===r.selectedPageId);if(!c||!Array.isArray(c.cards)||p<0||u<0||p>=c.cards.length||u>=c.cards.length)return;const[g]=c.cards.splice(p,1);c.cards.splice(u,0,g),r.selectedCardIndex=u,r.focusedBinding=null,U(),S()},fe=p=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const u=r.config.pages.find($=>$.id===r.selectedPageId),c=r.haEntities.find($=>$.entityId===p);if(!u||!Array.isArray(u.cards)||!c)return;const g=u.cards[r.focusedBinding.cardIndex];g&&(Wa(g,r.focusedBinding.field,c),U(),S())},ge=(p,u)=>{r.selectedCardIndex=p,r.focusedBinding={cardIndex:p,field:u},S(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async p=>{var G,J;const u=p.target,c=u==null?void 0:u.closest("[data-action]"),g=c==null?void 0:c.dataset.action;if(!g)return;if(g==="apply-display-profile"&&r.config){Ia(r.config,qe(r.previewDisplayId)),U(),S();return}if(g==="import-avatar"){if(!r.config||!a.avatarImportUrl||!r.pendingAvatarZip||r.avatarImporting)return;r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",S();try{const f=await Ma(a.avatarImportUrl,r.pendingAvatarZip);r.avatarCatalog=a.avatarCatalogUrl?await Ze(a.avatarCatalogUrl):[f],Je(r.config).packId=f.id,await w(f.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(f.name||f.id),r.avatarImportTone="ok",U(),S()}catch(f){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(f)}`,r.avatarImportTone="bad",S()}return}if(!r.config)return;const $=H(r.config),I=(c==null?void 0:c.dataset.pageId)||null,T=I?$.findIndex(f=>f.id===I):-1;if(g==="select-page"&&I){r.selectedPageId=I,r.selectedCardIndex=0,r.focusedBinding=null,D(),S();return}if(g==="page-up"&&T>0){const f=$.map(L=>L.id);[f[T-1],f[T]]=[f[T],f[T-1]],r.config.rotation.order=f,r.selectedPageId=I,U(),D(),S();return}if(g==="page-down"&&T>=0&&T<$.length-1){const f=$.map(L=>L.id);[f[T],f[T+1]]=[f[T+1],f[T]],r.config.rotation.order=f,r.selectedPageId=I,U(),D(),S();return}if(g==="page-remove"&&I&&$.length>1){r.config.pages=r.config.pages.filter(f=>f.id!==I),r.config.rotation.order=H(r.config).map(f=>f.id),r.selectedPageId=((G=H(r.config)[Math.max(0,T-1)])==null?void 0:G.id)||((J=H(r.config)[0])==null?void 0:J.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,U(),D(),S();return}if(g==="add-page"){const f=Ca(r.config);r.config.pages.push(f),r.config.rotation.order=H(r.config).map(L=>L.id),r.selectedPageId=f.id,r.selectedCardIndex=null,r.focusedBinding=null,U(),D(),S();return}if(g==="add-card-template"&&r.selectedPageId){const f=r.config.pages.find(j=>j.id===r.selectedPageId),L=(c==null?void 0:c.dataset.cardType)||"entity";if(f){Array.isArray(f.cards)||(f.cards=[]),f.cards.push(Ge(L));const j=f.cards.length-1;r.selectedCardIndex=j;const ke=et(L);r.focusedBinding=ke?{cardIndex:j,field:ke}:null,U(),S(),ke&&window.requestAnimationFrame(()=>{const te=n.querySelector("#ha-entity-search");te==null||te.scrollIntoView({behavior:"smooth",block:"center"}),te==null||te.focus()})}return}if(g==="focus-binding"){const f=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),L=(c==null?void 0:c.dataset.bindingField)||"";f>=0&&L&&ge(f,L);return}const k=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(k>=0&&r.selectedPageId){const f=r.config.pages.find(L=>L.id===r.selectedPageId);if(!f||!Array.isArray(f.cards))return;if(g==="select-card"){r.selectedCardIndex=k,S();return}if(g==="card-remove"){f.cards=f.cards.filter((L,j)=>j!==k),r.selectedCardIndex!==null&&(r.selectedCardIndex===k?r.selectedCardIndex=f.cards.length?Math.min(k,f.cards.length-1):null:r.selectedCardIndex>k&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===k?r.focusedBinding=null:r.focusedBinding.cardIndex>k&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),U(),S();return}if(g==="card-up"&&k>0){[f.cards[k-1],f.cards[k]]=[f.cards[k],f.cards[k-1]],r.selectedCardIndex===k?r.selectedCardIndex=k-1:r.selectedCardIndex===k-1&&(r.selectedCardIndex=k),r.focusedBinding&&(r.focusedBinding.cardIndex===k?r.focusedBinding={cardIndex:k-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===k-1&&(r.focusedBinding={cardIndex:k,field:r.focusedBinding.field})),U(),S();return}if(g==="card-down"&&k<f.cards.length-1){[f.cards[k],f.cards[k+1]]=[f.cards[k+1],f.cards[k]],r.selectedCardIndex===k?r.selectedCardIndex=k+1:r.selectedCardIndex===k+1&&(r.selectedCardIndex=k),r.focusedBinding&&(r.focusedBinding.cardIndex===k?r.focusedBinding={cardIndex:k+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===k+1&&(r.focusedBinding={cardIndex:k,field:r.focusedBinding.field})),U(),S();return}}if(g==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,N(e.saving,"muted");try{if(r.avatarPackDirty&&r.avatarPackDetails&&a.avatarPackApiUrl){try{r.avatarPackDetails=await Ba(a.avatarPackApiUrl,r.avatarPackDetails)}catch(f){throw new Error(`${e.avatarMappingSaveError}: ${String(f)}`)}r.avatarPackDirty=!1}r.config=await La(a.sceneApiUrl,Me(r.config)),r.dirty=!1,r.saving=!1,r.avatarPackSaving=!1,D(),N(e.statusSaved,"ok"),window.setTimeout(()=>W(),250)}catch(f){r.saving=!1,r.avatarPackSaving=!1,N(`${e.saveError}: ${String(f)}`,"bad")}return}if(g==="bind-entity"){const f=(c==null?void 0:c.dataset.entityId)||"";fe(f)}}),n.addEventListener("input",p=>{const u=p.target;if(!u||!r.config){u!=null&&u.dataset.previewDisplay&&(r.previewDisplayId=u.value||Se,x());return}if(u.dataset.previewDisplay){r.previewDisplayId=u.value||Se,x();return}if(u.dataset.avatarSemantic!==void 0){const c=Ee(r.config);if(!r.avatarPackDetails||!c||r.avatarPackDetails.packId!==c)return;const g=u.value.trim();g?r.avatarPackDetails.motionMap.semantic[u.dataset.avatarSemantic]=Number(g):delete r.avatarPackDetails.motionMap.semantic[u.dataset.avatarSemantic],r.avatarPackDirty=!0,N(e.statusDirty,"muted"),S();return}if(u.dataset.pageField){K(u.dataset.pageField,u.value),S();return}if(u.dataset.displayField){se(u.dataset.displayField,u.value),S();return}if(u.dataset.cardField&&u.dataset.cardIndex){r.selectedCardIndex=Number(u.dataset.cardIndex),q(Number(u.dataset.cardIndex),u.dataset.cardField,u.value),S();return}u.hasAttribute("data-ha-search")&&(r.entitySearch=u.value,S())}),n.addEventListener("click",p=>{var g;const u=(g=p.target)==null?void 0:g.closest("[data-action='select-avatar-pack']");if(!u||!r.config)return;const c=String(u.dataset.packId||"").trim();Je(r.config).packId=c||null,U(),w(c||null).finally(()=>S()),S()}),t.addEventListener("click",p=>{if(!r.config)return;const u=p.target,c=u==null?void 0:u.closest("[data-scene-card-index][data-scene-page-id]");if(c){const $=String(c.dataset.scenePageId||"").trim(),I=Number(c.dataset.sceneCardIndex||"-1");$&&Number.isFinite(I)&&I>=0&&(r.selectedPageId=$,r.selectedCardIndex=I,r.focusedBinding=null,D(),S(),Qe("cards"));return}const g=u==null?void 0:u.closest("[data-scene-page-id]");if(g){const $=String(g.dataset.scenePageId||"").trim();$&&(r.selectedPageId=$,r.selectedCardIndex=0,r.focusedBinding=null,D(),S(),Qe("pages"));return}}),n.addEventListener("dragstart",p=>{var c;const u=(c=p.target)==null?void 0:c.closest("[data-drag-kind]");if(!u){y=null;return}if(u.dataset.dragKind==="page"){const g=String(u.dataset.pageId||"").trim();y=g?{kind:"page",pageId:g}:null}else if(u.dataset.dragKind==="card"){const g=Number(u.dataset.cardIndex||"-1");y=Number.isFinite(g)&&g>=0?{kind:"card",cardIndex:g}:null}else y=null;y&&p.dataTransfer&&(p.dataTransfer.effectAllowed="move",p.dataTransfer.setData("text/plain",JSON.stringify(y)))}),n.addEventListener("dragover",p=>{if(!y)return;const u=p.target,c=y.kind==="page"?u==null?void 0:u.closest(".page-chip[data-page-id]"):null,g=y.kind==="card"?u==null?void 0:u.closest(".card-list-item[data-card-index]"):null,$=c||g;if(!$){ve(n);return}p.preventDefault(),ve(n),$.classList.add("is-drop-target"),p.dataTransfer&&(p.dataTransfer.dropEffect="move")}),n.addEventListener("drop",p=>{if(!y)return;const u=p.target;if(y.kind==="page"){const c=u==null?void 0:u.closest(".page-chip[data-page-id]"),g=String((c==null?void 0:c.dataset.pageId)||"").trim();g&&(p.preventDefault(),ee(y.pageId,g))}else if(y.kind==="card"){const c=u==null?void 0:u.closest(".card-list-item[data-card-index]"),g=Number((c==null?void 0:c.dataset.cardIndex)||"-1");Number.isFinite(g)&&g>=0&&(p.preventDefault(),pe(y.cardIndex,g))}y=null,ve(n)}),n.addEventListener("dragend",()=>{y=null,ve(n)}),n.addEventListener("change",p=>{var g;const u=p.target;if(!(u!=null&&u.dataset.avatarArchive))return;const c=((g=u.files)==null?void 0:g[0])||null;r.pendingAvatarZip=c,r.pendingAvatarZipName=(c==null?void 0:c.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",S()}),n.addEventListener("focusin",p=>{const u=p.target;if(!(u!=null&&u.dataset.bindingField))return;const c=Number(u.dataset.cardIndex||"-1");c<0||(r.selectedCardIndex=c,r.focusedBinding={cardIndex:c,field:u.dataset.bindingField})});try{if(r.config=await Ta(a.sceneApiUrl),a.avatarCatalogUrl)try{r.avatarCatalog=await Ze(a.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=Da(((oe=st())==null?void 0:oe.states)||null),r.selectedPageId=Aa(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",await w(Ee(r.config)),D()}catch(p){r.status=`${e.loadError}: ${String(p)}`,r.statusTone="bad"}S()}const qa="../scene-api/bootstrap",Ga="weather.forecast_home_assistant",Ja="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ya={...ot,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Za={...lt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},Xa={...dt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Qa={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},ei={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function ti(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function ai(){return new URLSearchParams(window.location.search).get("bootstrap")||qa}function ii(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function M(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const n=ii(e);if(n)return new URL(t.slice(1),n).toString()}return new URL(t,i).toString()}function Ue(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function ri(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function ni(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function Ae(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function si(a,e){var t,i,n,s,o,l,h,r;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([w,x])=>[w,M(x,e)]).filter(([,w])=>!!w)),avatar:{manifestUrl:M(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:M(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((n=a.state)==null?void 0:n.provider)||"json",stateUrl:M(String(((s=a.state)==null?void 0:s.stateUrl)||"").trim(),e),haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:M(String(((l=a.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:M(String(((h=a.state)==null?void 0:h.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:M(String(((r=a.control)==null?void 0:r.controlUrl)||"").trim(),e)}}}async function oi(a,e){var r,w,x,C;const t=M(String(((r=a.files)==null?void 0:r.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=M(String(((w=a.files)==null?void 0:w.sceneConfigUrl)||"").trim(),e),n=M(String(((x=a.files)==null?void 0:x.avatarCatalogUrl)||"").trim(),e);if(!i||!n)return t;let s="";try{const y=await Ae(i);s=String(((C=y.avatar)==null?void 0:C.packId)||"").trim()}catch{s=""}if(!s)return t;let o="";try{const y=await Ae(n),E=Array.isArray(y.items)?y.items.find(P=>String(P.id||"").trim()===s):null;o=M(String((E==null?void 0:E.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return t;const h={...si(await Ae(t),t),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(h)],{type:"application/json"}))}const de=document.getElementById("app");if(!de)throw new Error("Missing #app root element");const ie=ei[ti()];Ue(de,ie.startingTitle,ie.startingBody);(async()=>{var e,t,i;const a=ai();try{const n=await ni(a),s=String(n.packId||"").trim(),o=s.toLowerCase()==="neiri",l=await oi(n,a);if(!l){Ue(de,ie.missingRendererTitle,ie.missingRendererBody,JSON.stringify(n,null,2));return}document.documentElement.dataset.packId=s,document.title=o?"Нейри":s?`kiosk-scene hosted runtime (${s})`:"kiosk-scene hosted runtime",await ha(de,{rendererConfigUrl:l,weatherUrl:o?"./weather.json":void 0,weatherReader:o?ga({weatherEntity:Ga,openMeteoUrl:Ja,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:o?Ya:void 0,labels:o?Za:void 0,presetLabels:o?Xa:void 0,defaultWeather:o?Qa:void 0}),ri()&&await Ka({packId:s,sceneApiUrl:M(String(n.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:M(String(((e=n.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),avatarImportUrl:M(String(((t=n.files)==null?void 0:t.avatarImportUrl)||"").trim(),a),avatarPackApiUrl:M(String(((i=n.files)==null?void 0:i.avatarPackApiUrl)||"").trim(),a),sceneUrl:M(String(n.entryUrl||n.runtimeBaseUrl||"./").trim(),a)})}catch(n){Ue(de,ie.failedTitle,ie.failedBody,String(n))}})();
