var ot=Object.defineProperty;var lt=(a,e,t)=>e in a?ot(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var m=(a,e,t)=>lt(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();function T(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function l(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Ue(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function de(a,e){if(!T(a)||!T(e))return e??a;const t={...a};for(const[i,s]of Object.entries(e)){if(Array.isArray(s)){t[i]=s.slice();continue}if(T(s)&&T(t[i])){t[i]=de(t[i],s);continue}t[i]=s}return t}function dt(a,e=40){return Array.isArray(a)?a.map(t=>l(t,e).toLowerCase()).filter(Boolean):[]}const J={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},De={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function xe(a){var t,i,s,o,d,n,f,b,r,x;const e=de(J,T(a)?a:{});return{version:1,assistant:{name:l((t=e.assistant)==null?void 0:t.name,40)||J.assistant.name,locale:l((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:T(e.links)?Object.fromEntries(Object.entries(e.links).map(([k,h])=>[l(k,64),l(h,1024)]).filter(([k,h])=>k&&h)):{},avatar:{manifestUrl:l((s=e.avatar)==null?void 0:s.manifestUrl,1024)||J.avatar.manifestUrl},scene:{configUrl:l((o=e.scene)==null?void 0:o.configUrl,1024)||J.scene.configUrl},state:{provider:((d=e.state)==null?void 0:d.provider)==="ha"?"ha":"json",stateUrl:l((n=e.state)==null?void 0:n.stateUrl,1024)||J.state.stateUrl,haApiFallback:((f=e.state)==null?void 0:f.haApiFallback)===!0,idleLinesUrl:l((b=e.state)==null?void 0:b.idleLinesUrl,1024)||J.state.idleLinesUrl,entityMapUrl:l((r=e.state)==null?void 0:r.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:l((x=e.control)==null?void 0:x.controlUrl,1024)||J.control.controlUrl}}}function qe(a){var t,i,s,o,d;const e=de(De,T(a)?a:{});return{version:1,adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:l(e.assetRoot,1024)||De.assetRoot,runtimeUrl:l(e.runtimeUrl,1024)||"",entry:l(e.entry,1024)||"",modelUrl:l(e.modelUrl,1024)||"",fallbackPortrait:l(e.fallbackPortrait,1024)||"",motionMapUrl:l(e.motionMapUrl,1024)||"",expressionMapUrl:l(e.expressionMapUrl,1024)||"",presetThumbs:T(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([n,f])=>[l(n,32),l(f,1024)]).filter(([n,f])=>n&&f)):{},viewPresets:T(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([n,f])=>l(n,32)&&T(f))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((s=e.capabilities)==null?void 0:s.supportsViewPresets)!==!1,supportsLipSync:((o=e.capabilities)==null?void 0:o.supportsLipSync)===!0,supportsPointerFocus:((d=e.capabilities)==null?void 0:d.supportsPointerFocus)===!0}}}const Z={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},ct=["full","torso","head"];function le(a,e=Date.now()){var n,f,b,r,x,k,h;const t=de(Z,T(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((n=t.page)==null?void 0:n.mode)==="pinned"?"pinned":"auto",target:l((f=t.page)==null?void 0:f.target,40)||null,until:l((b=t.page)==null?void 0:b.until,64)||null},cue:{cue:l((r=t.cue)==null?void 0:r.cue,32)||null,emotion:l((x=t.cue)==null?void 0:x.emotion,32)||null,motion:l((k=t.cue)==null?void 0:k.motion,32)||null,until:l((h=t.cue)==null?void 0:h.until,64)||null}},s=l(t.viewPreset,16).toLowerCase();i.viewPreset=ct.includes(s)?s:null;const o=Ue(i.page.until);i.page.mode==="pinned"&&(!o||o<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const d=Ue(i.cue.until);return(!d||d<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function ye(a,e,t=Date.now()){return le(de(le(a,t),T(e)?e:{}),t)}function ut(a,e,t=Date.now()){return le({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function pt(a,e,t=3e4,i=Date.now()){const s=l(e,40),o=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return le({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:s?"pinned":"auto",target:s||null,until:s?o:null}},i)}function Ge(a,e){var d,n,f;const t={...a||{}},i=l((d=e==null?void 0:e.cue)==null?void 0:d.cue,32),s=l((n=e==null?void 0:e.cue)==null?void 0:n.emotion,32),o=l((f=e==null?void 0:e.cue)==null?void 0:f.motion,32);return i&&(t.cue=i),s&&(t.emotion=s),o&&(t.motion=o),t}function F(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function Re(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function ft(a){return T(a)&&T(a.config)?a.config:a}function ht(a,e){const t={...a};return T(e)&&(typeof e.id=="string"&&(t.id=l(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>T(i)))),t}function ve(a,e){const t=ft(a),i=Array.isArray(e.pages)?e.pages.slice():[],s=T(t)&&Array.isArray(t.pages)?t.pages:[],o=i.map(h=>{const E=s.find($=>l(T($)?$.id:"",40)===h.id);return ht(h,E)}),d=T(t)&&T(t.rotation)?t.rotation:{},n=T(e.display)?e.display:{},f=T(t)&&T(t.display)?t.display:{},b=T(n.safeArea)?n.safeArea:{},r=T(f.safeArea)?f.safeArea:{},x=Array.isArray(d.order)?d.order:e.rotation.order,k=dt(x).filter((h,E,$)=>o.some(P=>P.id===h)&&$.indexOf(h)===E);return{version:1,rotation:{order:k.length?k:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(d.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:F(r.top,F(b.top,0)),right:F(r.right,F(b.right,0)),bottom:F(r.bottom,F(b.bottom,0)),left:F(r.left,F(b.left,0))},layoutPaddingPx:F(f.layoutPaddingPx,F(n.layoutPaddingPx,16)),layoutGapPx:F(f.layoutGapPx,F(n.layoutGapPx,16)),globalScale:Re(f.globalScale,Re(n.globalScale,1))},pages:o}}function gt(a,e=220){const t=l(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},s=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(o,d,n)=>{const f=l(d,16).toLowerCase(),b=l(n,32).toLowerCase();return(f==="emotion"||f==="activity"||f==="cue"||f==="motion")&&b&&(i[f]=b)," "});return{text:l(s,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const mt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function ie(a,e={}){const t=T(a)?a:{},i={...mt,...e};return{version:1,assistant:l(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:l(t.status??i.status,255),message:l(t.message??i.message,255),source:l(t.source??i.source,64),updatedAt:l(t.updatedAt??i.updatedAt,64),emotion:l(t.emotion??i.emotion,32)||null,activity:l(t.activity??i.activity,32)||null,cue:l(t.cue??i.cue,32)||null,intensity:yt(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:l(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:l(t.event??i.event,64)}}function yt(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function vt(a,e){return a.order[e]||a.order[0]||""}function bt(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function wt(a,e,t,i){const s=Array.isArray(a.order)?a.order:[];if(!s.length)return 0;const o=Math.max(0,Math.min(e,s.length-1));for(let d=1;d<=s.length;d+=1){const n=(o+d*t+s.length)%s.length;if(i(s[n]))return n}return o}function St(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const s=a.control.page;if(s.mode==="pinned"&&s.target)return{nextIndex:bt(a.rotation,s.target),nextAutoRotateAt:e,pinnedKey:`${s.target}:${s.until||""}`};if(a.force){const d=vt(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(d)?a.activeIndex:Math.max(0,t.findIndex(f=>a.isEligible(f))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let o=a.activeIndex;for(let d=1;d<=t.length;d+=1){const n=(a.activeIndex+d)%t.length;if(a.isEligible(t[n])){o=n;break}}return{nextIndex:o,nextAutoRotateAt:e,pinnedKey:""}}const Ke={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},xt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function Ne(a){const e=l(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:xt.some(t=>e.includes(t)):!1}function $t(a,e){const t=ie(a),i=l(t.status,72),s=l(t.message,220);if(!(t.online!==!1&&(Ne(i)||Ne(s))))return{state:t,hasTechnicalFailure:!1};const n=l(t.emotion,32).toLowerCase(),f=l(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:l(e==null?void 0:e.healthyStatus,72),message:"",emotion:n==="error"?"calm":n||null,activity:l(t.activity,32).toLowerCase()==="error"?"idle":l(t.activity,32)||null,cue:l(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:f==="error"?"idle_soft":f||null},hasTechnicalFailure:!0}}function Ct(a,e){const t=(e==null?void 0:e.copy)??Ke,i=ie(a),s=gt(i.message,220),o=$t({...i,message:s.text,emotion:l(i.emotion,32)||s.emotion||null,activity:l(i.activity,32)||s.activity||null,cue:l(i.cue,32)||s.cue||null,motion:l(i.motion,32)||s.motion||null},{healthyStatus:t.technicalHealthyLabel}),d=o.state,n=l(d.message,180),f=l(d.activity,32).toLowerCase(),b=d.online!==!1&&f!=="offline",r=!!d.busy||f==="thinking"||f==="busy"||f==="acting",x=d.speaking===!0||f==="speaking",k=b?r?t.busyLabel:n||x?t.speakingLabel:o.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,h=n?t.messageCaption:o.hasTechnicalFailure?t.statusCaption:t.modeCaption,E=n||(b?r?t.busyBody:l(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:d,hasTechnicalFailure:o.hasTechnicalFailure,caption:h,label:k,body:E,bodyKey:[h,k,E].join(":")}}function Et(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function Be(a,e=-1){const t=Array.isArray(a)?a.map(s=>l(s,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function kt(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!l(a==null?void 0:a.message,180);return e&&!t&&!i}const Pt={cue:null,emotion:null,motion:null,until:null},At={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Tt(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function Ye(a){return a.endsWith("/")?a:`${a}/`}function ce(a,e){const t=l(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(Ye(l(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function pe(a){const e=l(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function It(a,e,t){const i=l(a.runtimeUrl,1024)||l(e.runtimeUrl,1024);return i?pe(i):new URL("../avatar.html",new URL(Ye(l(t,1024)||"."),window.location.href)).toString()}function Lt(a,e){const t=l(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function Ut(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[s,o]of Object.entries(i)){const d=l(s,64);if(!d||o==null)continue;const n=typeof o=="boolean"?o?"1":"0":String(o);t.searchParams.set(d,n)}return t.toString()}function Dt(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([s,o])=>[l(s,32),ce(t,o)]).filter(([s,o])=>s&&o));return{version:1,assistant:{name:l(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([s,o])=>[l(s,64),pe(o)]).filter(([s,o])=>s&&o)),state:{stateUrl:pe(a.state.stateUrl),idleLinesUrl:pe(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:ce(t,l(e.modelUrl,1024)||l(e.entry,1024)),fallbackPortrait:ce(t,e.fallbackPortrait||""),motionMapUrl:ce(t,e.motionMapUrl||""),presetThumbs:i}}}class Rt{constructor(e={}){m(this,"id","live2d");m(this,"options");m(this,"manifest");m(this,"rendererConfig");m(this,"host",null);m(this,"containerEl",null);m(this,"iframeEl",null);m(this,"splashEl",null);m(this,"splashTextEl",null);m(this,"assetRoot","");m(this,"currentState");m(this,"currentCue",{...Pt});m(this,"currentPreset","full");m(this,"currentBubble",{...At});m(this,"targetOrigin","*");m(this,"isReady",!1);m(this,"bubbleRevision",0);m(this,"handleWindowMessage",e=>{var s;const t=(s=this.iframeEl)==null?void 0:s.contentWindow;if(!t||e.source!==t||!Tt(e.data))return;const i=l(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=qe({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=xe(e.rendererConfig||{}),this.currentState=ie({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=l(e.assetRoot,1024)||this.manifest.assetRoot;const t=It(this.options,this.manifest,this.assetRoot),i=Ut(t,this.options);this.targetOrigin=Lt(i,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const o=document.createElement("iframe");o.className="ks-live2d-iframe",o.src=i,o.title=l(this.options.iframeTitle,80)||`${l(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,o.loading="eager",o.allow="autoplay",Object.assign(o.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),l(this.options.iframeSandbox,255)&&o.setAttribute("sandbox",l(this.options.iframeSandbox,255));const d=this.createSplash(this.assetRoot);s.append(o,d),this.host.append(s),o.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=o,this.splashEl=d,this.splashTextEl=d.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=ie(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:l(e==null?void 0:e.cue,32)||null,emotion:l(e==null?void 0:e.emotion,32)||null,motion:l(e==null?void 0:e.motion,32)||null,until:l(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=l(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const s=document.createElement("div");s.textContent=l(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(s.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const o=document.createElement("div");return o.dataset.live2dSplashText="true",o.textContent="Loading compatibility renderer...",Object.assign(o.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(s,o),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Dt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=Ge(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function Nt(a={}){return new Rt(a)}const Bt={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Fe={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Ft{constructor(e={}){m(this,"id","static");m(this,"options");m(this,"host",null);m(this,"frameEl",null);m(this,"imageEl",null);m(this,"bubbleEl",null);m(this,"fallbackEl",null);m(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const s=document.createElement("div");s.className="ks-static-avatar-fallback",s.textContent=this.options.alt||"Avatar",Object.assign(s.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const o=document.createElement("div");o.className="ks-static-avatar-bubble",Object.assign(o.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,s,o),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=o,this.fallbackEl=s;const d=this.resolveImageUrl(e.assetRoot);d&&(i.src=d,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||Fe,i=t[e]||t.full||Fe.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Bt}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),s=t.replace(/^\.?\//,"");return i?`${i}/${s}`:s}}function Mt(a={}){return new Ft(a)}function _t(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function Je(){var a;for(const e of _t())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function Ot(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return l(e==null?void 0:e.access_token,4096)}catch{return""}}function Ht(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=l(t.entity_id,255);i&&(e[i]=t)}return e}function jt(a,e,t="Assistant"){const i=a[e.status],s=a[e.message],o=a[e.online],d=a[e.busy],n=a[e.source],f=a[e.updatedAt],b=e.emotion?a[e.emotion]:null,r=e.activity?a[e.activity]:null,x=e.cue?a[e.cue]:null,k=e.speaking?a[e.speaking]:null,h=e.intensity?a[e.intensity]:null,E=e.motion?a[e.motion]:null,$=a[e.revision];if(!i&&!s&&!o&&!d)return null;const P=l(i==null?void 0:i.state,72),B=l(s==null?void 0:s.state,220),H=l(f==null?void 0:f.state,64),G=be(o,!0),K=be(d,!1),Y=l(r==null?void 0:r.state,32)||"",W=be(k)??Y==="speaking",c=Y||(G?W?"speaking":K?"thinking":"idle":"offline");return ie({version:1,assistant:l(t,40)||"Assistant",online:G,busy:K,status:P&&P!=="unknown"&&P!=="unavailable"?P:"",message:B&&B!=="unknown"&&B!=="unavailable"?B:"",source:l(n==null?void 0:n.state,64)||"ha",updatedAt:H&&H!=="unknown"&&H!=="unavailable"?H:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:l(b==null?void 0:b.state,32)||null,activity:c,cue:l(x==null?void 0:x.state,32)||null,intensity:Vt(h),speaking:W,motion:l(E==null?void 0:E.state,32)||null,revision:Number($==null?void 0:$.state)||0})}function be(a,e){const t=l(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function Vt(a){const e=l(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function zt(a){const e=ke(a);return{id:"ha-state",async read(){const t=await e.read();return t?jt(t,a.entityMap,a.assistantName):null}}}function ke(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let s=null,o=0,d=null,n=0;async function f(){var k;const b=Je();if(b!=null&&b.states)return b.states;const r=Date.now();if(s&&r-o<t||!a.allowApiFallback||typeof e!="function"||r<n)return s;if(d)return d;const x=l(((k=a.readToken)==null?void 0:k.call(a))??Ot(),4096);return x?(d=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${x}`}}).then(async h=>{if(!h.ok){const E=new Error(`HA states HTTP ${h.status}`);throw E.status=h.status,E}return h.json()}).then(h=>{const E=Ht(h);return E&&(s=E,o=Date.now()),E||s}).catch(h=>(((h==null?void 0:h.status)===401||(h==null?void 0:h.status)===403)&&(n=Date.now()+i),s)).finally(()=>{d=null}),d):s}return{id:"ha-states",async read(){return f()}}}async function Pe(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=l(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const s=await e(i.toString(),{cache:"no-store"});if(!s.ok)throw new Error(`HTTP ${s.status}`);const o=await s.json();return a.sanitize?a.sanitize(o):o}catch(s){if(a.defaultValue!==void 0)return a.defaultValue;throw s}}function Wt(a){return{id:"json-state",async read(){const e=await Pe({...a,defaultValue:a.defaultValue});return ie(e)}}}function Me(a){return{id:"json-control",async read(){const e=await Pe({...a,defaultValue:a.defaultValue??Z});return le(e)}}}function qt(a){return{id:"json-lines",async read(){const e=await Pe({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>l(t,220)).filter(Boolean):[]}}}function D(a,e,t=64){return l(a[e],t)}function re(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Gt(a,e="en-US"){const t=l(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ue(a,e){return!a||!e?null:a[e]||null}function Kt(a,e=null,t="en-US"){var x,k,h,E;const i=D(a,"caption",40)||D(a,"type",24)||"Card",s=D(a,"hint",72),o=D(a,"type",32).toLowerCase()||"entity",d=D(a,"entity",255),n=ue(e,d),f=ue(e,D(a,"stateEntity",255)),b=ue(e,D(a,"downEntity",255)),r=ue(e,D(a,"upEntity",255));if(o==="text"||o==="static"||o==="note")return{caption:i,value:D(a,"value",64)||"—",hint:s||"static card"};if(o==="todo"){const $=Number(n==null?void 0:n.state);return!Number.isFinite($)||$<=0?{caption:i,value:"Clear",hint:s||"nothing pending"}:{caption:i,value:`${$} item${$===1?"":"s"}`,hint:s||"pending tasks"}}if(o==="onoff"){const $=(n==null?void 0:n.state)==="on";return{caption:i,value:$?D(a,"onText",48)||"On":D(a,"offText",48)||"Off",hint:s||"device state"}}if(o==="battery"){const $=re(n==null?void 0:n.state,0);return{caption:i,value:$?`${$}%`:"—",hint:l(f==null?void 0:f.state,48)||s||"battery level"}}if(o==="network"){const $=re(b==null?void 0:b.state,0),P=re(r==null?void 0:r.state,0);return{caption:i,value:$||P?`↓ ${$||"0"} · ↑ ${P||"0"}`:"—",hint:s||"throughput"}}if(o==="time")return{caption:i,value:Gt(n==null?void 0:n.state,t)||"—",hint:s||"next event"};if(o==="percent"){const $=re(n==null?void 0:n.state,Number(D(a,"digits",4))||0);return{caption:i,value:$?`${$}%`:"—",hint:s||l((x=n==null?void 0:n.attributes)==null?void 0:x.friendly_name,48)||"state percentage"}}if(o==="number"){const $=Number(D(a,"digits",4))||0,P=re(n==null?void 0:n.state,$),B=D(a,"unit",16)||l((k=n==null?void 0:n.attributes)==null?void 0:k.unit_of_measurement,16);return{caption:i,value:P?`${P}${B?` ${B}`:""}`:"—",hint:s||l((h=n==null?void 0:n.attributes)==null?void 0:h.friendly_name,48)||"numeric value"}}return{caption:i,value:l(n==null?void 0:n.state,64)||D(a,"value",64)||"—",hint:s||l((E=n==null?void 0:n.attributes)==null?void 0:E.friendly_name,48)||"entity state"}}function Yt(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>Kt(i,e,t)):[]}const Xe={...Ke,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Qe={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},Ze={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Jt={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},fe={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function g(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function et(a){return a.endsWith("/")?a:`${a}/`}function M(a,e){const t=l(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function tt(a){return new URL(".",a).toString()}function Xt(a,e){const t=tt(e),i=M(t,l(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:M(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([s,o])=>[s,M(t,o)]).filter(([,s])=>!!s))}}function we(a){return{...fe,...a||{},metrics:{...fe.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):fe.forecast.map(e=>({...e}))}}function _e(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function N(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function Qt(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=l(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${N(t)} мм рт. ст.`:`${N(t*.750061683,0)} мм рт. ст.`}function Zt(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=l(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${N(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${N(t/3.6,1)} м/с`:`${N(t,1)} м/с`}function ea(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ta(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function aa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function ia(a,e="ru-RU"){const t=l(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||l(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function Oe(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function sa(a,e="./assets/icons"){const t=Number(a),i=et(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function ra(a){const e=l(a.locale,32)||"ru-RU",t=l(a.iconBaseUrl,1024)||"./assets/icons",i=ke({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var E,$,P,B,H,G,K,Y,se,W,c,p,u,S,I,A,L,C,w,_;const s=await i.read(),o=a.fetchImpl??globalThis.fetch,d=s==null?void 0:s[a.weatherEntity];let n=null;const f=l(a.openMeteoUrl,4096);if(f&&typeof o=="function")try{const y=await o(`${f}${f.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});y.ok&&(n=await y.json())}catch{n=null}if(!d&&!(n!=null&&n.current))return null;const b=l(d==null?void 0:d.last_changed,64)||l((E=n==null?void 0:n.current)==null?void 0:E.time,64)||new Date().toISOString(),r=d?ia(d.state,e):Oe(($=n==null?void 0:n.current)==null?void 0:$.weather_code,e),x=Array.isArray((P=n==null?void 0:n.daily)==null?void 0:P.time)?n.daily.time.map((y,U)=>{var ee,V,Te,Ie,Le;const j=new Date(`${y}T12:00:00+03:00`);return{name:j.toLocaleDateString(e,{weekday:"short"}),dayNumber:j.toLocaleDateString(e,{day:"numeric"}),monthShort:j.toLocaleDateString(e,{month:"short"}),note:l(Oe((ee=n.daily.weather_code)==null?void 0:ee[U],e),28),max:`${N((V=n.daily.temperature_2m_max)==null?void 0:V[U])}°`,min:`${N((Te=n.daily.temperature_2m_min)==null?void 0:Te[U])}° · ${N((Ie=n.daily.precipitation_probability_max)==null?void 0:Ie[U])}%`,icon:sa((Le=n.daily.weather_code)==null?void 0:Le[U],t)}}):[],k=x[0]||null,h=x.slice(1,6);return{todayValue:ta(b,e),todayLabel:aa(b,e),updatedAt:ea(b,e),temperature:N(((B=d==null?void 0:d.attributes)==null?void 0:B.temperature)??((H=n==null?void 0:n.current)==null?void 0:H.temperature_2m),1),condition:r,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${N(((G=d==null?void 0:d.attributes)==null?void 0:G.apparent_temperature)??((K=n==null?void 0:n.current)==null?void 0:K.apparent_temperature)??((Y=d==null?void 0:d.attributes)==null?void 0:Y.temperature),1)}°C`,badgeSummary:r,badgeRange:k?`${k.max} / ${N((W=(se=n==null?void 0:n.daily)==null?void 0:se.temperature_2m_min)==null?void 0:W[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${N(((c=d==null?void 0:d.attributes)==null?void 0:c.humidity)??((p=n==null?void 0:n.current)==null?void 0:p.relative_humidity_2m))}%`,pressure:Qt(((u=d==null?void 0:d.attributes)==null?void 0:u.pressure)??((S=n==null?void 0:n.current)==null?void 0:S.surface_pressure),((I=d==null?void 0:d.attributes)==null?void 0:I.pressure_unit)??"hPa"),wind:Zt(((A=d==null?void 0:d.attributes)==null?void 0:A.wind_speed)??((L=n==null?void 0:n.current)==null?void 0:L.wind_speed_10m),((C=d==null?void 0:d.attributes)==null?void 0:C.wind_speed_unit)??"km/h"),clouds:`${N(((w=d==null?void 0:d.attributes)==null?void 0:w.cloud_coverage)??((_=n==null?void 0:n.current)==null?void 0:_.cloud_cover))}%`},forecast:h}}}class na{constructor(e,t={}){m(this,"root");m(this,"options");m(this,"avatarMountEl");m(this,"carouselShellEl");m(this,"carouselTrackEl");m(this,"dotsEl");m(this,"presetButtons");m(this,"copy");m(this,"labels");m(this,"presetLabels");m(this,"rendererConfig");m(this,"avatarManifest");m(this,"sceneConfig");m(this,"entityMap",null);m(this,"weatherData");m(this,"hassStates",null);m(this,"currentState");m(this,"remoteControl",Z);m(this,"uiControl",Z);m(this,"currentControl",Z);m(this,"idleLines",[]);m(this,"activeIndex",0);m(this,"lastAutoRotateAt",0);m(this,"currentIdleLine","");m(this,"lastIdleIndex",-1);m(this,"currentPreset","full");m(this,"idleTimer",null);m(this,"avatarAdapter",null);m(this,"refreshIntervalHandle",null);m(this,"orderedPages",[]);m(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...Xe,...t.copy||{}},this.labels={...Qe,...t.labels||{}},this.presetLabels={...Ze,...t.presetLabels||{}},this.weatherData=we(t.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="Avatar view presets">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${g(this.presetLabels.full)}" aria-label="${g(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${g(this.presetLabels.torso)}" aria-label="${g(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${g(this.presetLabels.head)}" aria-label="${g(this.presetLabels.head)}">
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=M(window.location.href,this.getRendererConfigUrl()),t=tt(e),i=xe(await this.readJson(e)),s=xe({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([d,n])=>[d,M(t,n)])),avatar:{...i.avatar,manifestUrl:M(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:M(t,i.scene.configUrl)},state:{...i.state,stateUrl:M(t,i.state.stateUrl),idleLinesUrl:M(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?M(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:M(t,i.control.controlUrl)}});this.rendererConfig=s;const o=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=Xt(qe(await this.readJson(o)),o),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await qt({url:this.rendererConfig.state.idleLinesUrl||M(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Me({url:this.rendererConfig.control.controlUrl,defaultValue:Z}).read(),this.currentControl=ye(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return l(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return l(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=ut(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,s;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(s=(i=this.carouselShellEl).setPointerCapture)==null||s.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:s}=this.carouselDragState,o=this.carouselShellEl.clientWidth||1,d=i&&Math.abs(s)>=o*.16,n=s<0?1:-1;if(this.clearDragState(t.pointerId,!1),d){this.stepPage(n);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Me({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=ye(Z,this.uiControl),this.currentControl=ye(this.remoteControl,this.uiControl);const e=Ge(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=Ct(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=ve(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const s=this.getOrderedPages(i.pages,i.rotation.order),o=St({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:d=>s.some(n=>n.id===d)});if(this.activeIndex=o.nextIndex,this.lastAutoRotateAt=o.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(s,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,s)=>i.kind==="overview"?this.renderOverviewSlide(t,s):this.renderDynamicSlide(i,s,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,s)=>`
      <button
        class="carousel-dot ${s===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${s}"
        aria-label="${g(l(i.title,40)||`Page ${s+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t){const i=l(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||fe,o=s.forecast.slice(0,5).map(d=>this.renderForecastDay(d)).join("");return`
      <section class="slide slide-overview" data-slide-id="weather" data-slide-order="${t}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${g(s.title)}</h1>
              <p class="subline">${g(s.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${g(s.todayCaption)}</span>
                <span class="value">${g(s.todayValue)}</span>
                <span class="meta">${g(s.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${g(s.updatedCaption)}</span>
                <span class="value">${g(s.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${g(s.temperature)}</span>
                <span class="unit">°${g(s.unit)}</span>
              </div>
              <div class="condition">${g(s.condition)}</div>
              <div class="feels">${g(s.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${g(this.resolveIconUrl("thermometer"))}" alt=""><span>${g(s.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${g(this.resolveIconUrl("calendarDays"))}" alt=""><span>${g(s.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${g(e.caption)}</strong>
                  <div class="neiri-label">${g(e.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${g(this.resolveIconUrl("sparkles"))}" alt="${g(i)}"></div>
              </div>
              <div class="neiri-meta">${g(e.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${g(this.labels.humidity)}</span><i><img src="${g(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${g(s.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${g(this.labels.pressure)}</span><i><img src="${g(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${g(s.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${g(this.labels.wind)}</span><i><img src="${g(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${g(s.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${g(this.labels.clouds)}</span><i><img src="${g(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${g(s.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${g(s.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${o}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,t,i){const s=Yt(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),o=this.resolveForecastRange(),d=l(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),n=l(e.stampValue,32)||(e.kind==="forecast+cards"?o:`${t+1} / ${i}`),f=e.cardStyle==="mini"?s.map(x=>`
          <article class="mini-card">
            <span class="caption">${g(x.caption)}</span>
            <strong>${g(x.value)}</strong>
          </article>
        `).join(""):s.map(x=>`
          <article class="home-card">
            <span class="caption">${g(x.caption)}</span>
            <strong>${g(x.value)}</strong>
            <small>${g(x.hint)}</small>
          </article>
        `).join(""),b=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(x=>this.renderForecastDay(x)).join("")}</div>`:"",r=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
      <section class="slide slide-dynamic" data-slide-id="${g(e.id)}" data-slide-order="${t}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${g(e.kind)}" data-dynamic-card-style="${g(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${g(l(e.title,64)||"Scene")}</h1>
              <p class="subline">${g(l(e.subtitle,140)||"Configured by scene.json")}</p>
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${g(d)}</span>
              <span class="value">${g(n)}</span>
            </div>
          </div>
          ${b}
          <div class="${r}">
            ${f||`<div class="empty">${g(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `}renderForecastDay(e){return`
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${g(e.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${g(e.name)}</span>
            <span class="meta"><span class="day-number">${g(e.dayNumber)}</span><span class="day-month">${g(e.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${g(e.max)}</strong>
          <small>${g(e.min)}</small>
        </div>
        <div class="day-note">${g(e.note)}</div>
      </article>
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],i=e[e.length-1];return`${l(t.dayNumber,4)} ${l(t.monthShort,8)} → ${l(i.dayNumber,4)} ${l(i.monthShort,8)}`}resolveIconUrl(e){var s;const t=l((s=this.options.iconUrls)==null?void 0:s[e],1024);return t||`${et(l(this.options.iconBaseUrl,1024)||"./assets")}${Jt[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:s,globalScale:o}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${s}px`),this.root.style.setProperty("--scene-global-scale",String(o))}getOrderedPages(e,t){const i=t.map(o=>e.find(d=>d.id===o)).filter(Boolean),s=e.filter(o=>!i.some(d=>d.id===o.id));return i.concat(s)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,s;!t&&((s=(i=this.carouselShellEl).hasPointerCapture)!=null&&s.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=ve(this.sceneConfig,this.sceneConfig),i=wt(t.rotation,this.activeIndex,e,s=>this.orderedPages.some(o=>o.id===s));this.pinPageByIndex(i)}pinPageByIndex(e){var d;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((d=this.sceneConfig.rotation)==null?void 0:d.order)||[]))[e];if(!i)return;const s=ve(this.sceneConfig,this.sceneConfig),o=Math.max(18e3,s.rotation.defaultDwellMs*2);this.uiControl=pt(this.uiControl,i.id,o),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!kt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=Be(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=Be(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},Et(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>Wt({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await zt({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:ke({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=_e(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=_e(e,t)}catch{}try{return we(e)}catch{return we(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Nt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Mt({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",s=t.querySelector("[data-preset-thumb]"),o=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),s&&(o?(s.src=o,s.removeAttribute("hidden")):(s.src="",s.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function oa(a,e={}){const t=new na(a,e);return await t.init(),t}const la=["overview","cards","forecast+cards"],da=["full","mini"],at=["entity","text","todo","onoff","battery","network","time","percent","number"],z=["caption","hint"],ca={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},ua={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается честный 1:1 viewport выбранного экрана. Если не влезает по ширине, страница просто прокручивается.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Применить пресет экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Выбор Live2D-модели для текущего instance-pack. Применяется после сохранения и перезагрузки превью.",avatarPack:"Набор аватара",avatarPackCurrent:"Текущий avatar.manifest.json instance-pack",avatarPackHint:"Другие модели лежат отдельно в /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"В каталоге avatar-packs пока нет отдельных моделей.",avatarPackAppliedAfterSave:"Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage renders a true 1:1 viewport of the selected screen. If it does not fit, the editor page simply scrolls.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Apply screen preset",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the Live2D model for this instance-pack. It applies after save and preview reload.",avatarPack:"Avatar pack",avatarPackCurrent:"Use the instance-pack avatar.manifest.json",avatarPackHint:"Additional models live in /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"No separate avatar packs are available yet.",avatarPackAppliedAfterSave:"The selected avatar pack will apply after saving and reloading the preview.",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},he=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],ge="mellow-fly-7";function $e(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function He(a){return he.find(e=>e.id===a)||he.find(e=>e.id===ge)||he[0]}function pa(a){return`${a.width} × ${a.height}`}function v(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ae(a){return JSON.parse(JSON.stringify(a))}function O(a){const e=new Map(a.pages.map(s=>[s.id,s])),t=a.rotation.order.map(s=>e.get(s)).filter(Boolean),i=a.pages.filter(s=>!t.some(o=>o.id===s.id));return[...t,...i]}function fa(a,e){return e?Math.max(0,O(a).findIndex(t=>t.id===e)):0}function ha(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function it(a,e){const t=ha(e);let i=t,s=2;for(;a.pages.some(o=>o.id===i);)i=`${t}-${s}`,s+=1;return i}function ga(a){const e=a.pages.length+1;return{id:it(a,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function je(a){switch(a){case"text":return{type:a,caption:"Text",value:"—",hint:""};case"todo":return{type:a,caption:"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:a,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:"Time",entity:"",hint:""};case"percent":return{type:a,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function ne(a,e){const t=a[e];return t==null?"":String(t)}function q(a,e){const t=a[e];return t==null?"":String(t)}function X(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function st(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function ma(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function ya(a){return a.avatar||(a.avatar={}),a.avatar}function va(a,e){const t=st(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function ba(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function wa(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Sa(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&O(a).some(s=>s.id===t)?t:((i=O(a)[0])==null?void 0:i.id)||null}async function xa(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return Ae(t.config)}async function $a(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return Ae(i.config)}function rt(a){switch(a){case"text":return[...z,"value"];case"todo":return[...z,"entity"];case"onoff":return[...z,"entity","onText","offText"];case"battery":return[...z,"entity","stateEntity"];case"network":return[...z,"downEntity","upEntity"];case"time":return[...z,"entity"];case"percent":return[...z,"entity","digits"];case"number":return[...z,"entity","digits","unit"];default:return[...z,"entity"]}}function Ve(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function me(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function Ca(a){const e=$e();return ca[e][a]||""}function Ce(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Ea(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),s=a.includes(".")&&a.split(".",1)[0]||"other",o=String(e.state||""),d=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:s,state:o,unit:d}}function ka(a){return a?Object.entries(a).map(([e,t])=>Ea(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function Pa(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function Aa(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(s=>({id:String(s.id||"").trim(),name:String(s.name||s.id||"").trim(),manifestUrl:String(s.manifestUrl||"").trim(),previewUrl:String(s.previewUrl||"").trim()})).filter(s=>s.id&&s.manifestUrl):[]}function nt(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function ze(a){return rt(a).find(e=>nt(e))||null}function te(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${v(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${v(e)}" value="${v(t)}">
    </div>
  `}function Q(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${v(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${v(e)}" value="${v(t)}">
    </div>
  `}function We(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${v(a)}</label>
      <select id="page-select-${e}" data-page-field="${v(e)}">
        ${i.map(s=>`<option value="${v(s.value)}"${s.value===t?" selected":""}>${v(s.label)}</option>`).join("")}
      </select>
    </div>
  `}function Ta(a,e,t,i,s){const o=ne(e,"type")||"entity",d=rt(o);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${v(ne(e,"caption")||me(a,o))}</strong>
          <div class="meta">${v(me(a,o))}</div>
        </div>
        <div class="card-actions">
          <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
          <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
          <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
        </div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${v(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${at.map(n=>`<option value="${n}"${n===o?" selected":""}>${v(me(a,n))}</option>`).join("")}
          </select>
        </div>
        ${d.map(n=>{const f=nt(n),b=f&&(s==null?void 0:s.cardIndex)===t&&s.field===n;return f?`
              <div class="field ${n==="hint"?"is-wide":""} is-binding-field${b?" is-active":""}">
                <label>${v(Ce(a,n))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${v(n)}"
                    data-binding-field="${v(n)}"
                    value="${v(ne(e,n))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${t}"
                    data-binding-field="${v(n)}"
                  >${a.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${n==="hint"?"is-wide":""}">
              <label>${v(Ce(a,n))}</label>
              <input
                type="${n==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${v(n)}"
                value="${v(ne(e,n))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Ia(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${v(e)}"
    >
      <strong>${v(me(a,e))}</strong>
      <span>${v(Ca(e))}</span>
    </button>
  `}function La(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function Ua(a){var W;const e=ua[$e()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const s=document.createElement("section");s.id="scene-editor-shell",s.innerHTML=`
    <style>
      #scene-editor-shell {
        --preview-stage-width: min(100%, 1280px);
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
        border-radius: 30px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(248, 251, 253, 0.86);
        box-shadow: 0 24px 64px rgba(46,72,94,0.18);
        backdrop-filter: blur(14px);
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
        padding-bottom: 6px;
      }
      #scene-editor-shell .scene-preview-screen {
        display: inline-block;
        width: max-content;
        max-width: none;
        border-radius: 0;
        border: 0;
        background: transparent;
        overflow: visible;
      }
      #scene-editor-shell .scene-preview-stage {
        overflow: hidden;
        border-radius: 0;
        background: transparent;
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
        grid-template-columns: minmax(0, 1fr) 124px;
        gap: 14px;
        align-items: start;
      }
      #scene-editor-shell .avatar-pack-meta {
        display: grid;
        gap: 8px;
      }
      #scene-editor-shell .avatar-pack-preview {
        width: 124px;
        min-height: 124px;
        border-radius: 18px;
        border: 1px solid rgba(32,48,65,0.08);
        background: linear-gradient(180deg, rgba(223,232,239,0.82), rgba(236,242,246,0.92));
        display: grid;
        place-items: center;
        overflow: hidden;
      }
      #scene-editor-shell .avatar-pack-preview img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      #scene-editor-shell .avatar-pack-preview span {
        padding: 12px;
        text-align: center;
        font: 12px/1.35 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.62);
      }
      #scene-editor-shell .page-chip,
      #scene-editor-shell .card-item,
      #scene-editor-shell .ha-entity {
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
      #scene-editor-shell .page-chip-header {
        display: grid;
        gap: 4px;
        cursor: pointer;
      }
      #scene-editor-shell .page-chip-header strong,
      #scene-editor-shell .card-item-head strong,
      #scene-editor-shell .ha-entity strong {
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
      #scene-editor-shell .ha-entity code {
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
                ${he.map(c=>`<option value="${v(c.id)}">${v(c.label[$e()])}</option>`).join("")}
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
          <div class="scene-preview-screen" data-preview-screen>
            <div class="scene-preview-stage" data-preview-stage></div>
          </div>
        </div>
      </section>
      <section class="scene-dashboard" data-dashboard></section>
    </div>
  `,document.body.appendChild(s),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const o=s.querySelector("[data-preview-screen]"),d=s.querySelector("[data-preview-stage]"),n=s.querySelector("[data-preview-resolution]"),f=s.querySelector("[data-preview-display]"),b=s.querySelector("[data-dashboard]");if(!o||!d||!n||!f||!b)throw new Error("Missing native editor shell elements");d.appendChild(t);const r={config:null,selectedPageId:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:ge},x=()=>{const c=He(r.previewDisplayId);f.value=c.id,n.textContent=pa(c),d.style.width=`${c.width}px`,d.style.height=`${c.height}px`,t.style.width=`${c.width}px`,t.style.height=`${c.height}px`,o.style.width=`${c.width}px`},k=typeof ResizeObserver<"u"?new ResizeObserver(()=>x()):null;k==null||k.observe(d);const h=()=>{const c=r.config,p=c?O(c):[],u=p.find(w=>w.id===r.selectedPageId)||p[0]||null,S=Array.isArray(u==null?void 0:u.cards)?u.cards:[],I=Pa(r.haEntities,r.entitySearch),A=r.focusedBinding?`${e.entityBinding}: #${r.focusedBinding.cardIndex+1} → ${Ce(e,r.focusedBinding.field)}`:e.entityBindingEmpty,L=c?ma(c):"",C=r.avatarCatalog.find(w=>w.id===L)||null;b.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${v(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${v(a.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${r.saving||!c?" disabled":""}>${r.saving?e.saving:e.save}</button>
          <button class="scene-editor-button" type="button" data-action="add-page"${c?"":" disabled"}>${e.addPage}</button>
        </div>
      </div>
      <div class="scene-dashboard-body">
        <div class="scene-settings-stack">
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.avatar}</h2>
              <div class="meta">${e.avatarSubtitle}</div>
            </div>
          ${c?`
            <div class="avatar-pack-box">
              <div class="avatar-pack-meta">
                <div class="field is-wide">
                  <label for="avatar-pack-select">${e.avatarPack}</label>
                  <select id="avatar-pack-select" data-avatar-pack>
                    <option value="">${e.avatarPackCurrent}</option>
                    ${r.avatarCatalog.map(w=>`<option value="${v(w.id)}"${w.id===L?" selected":""}>${v(w.name||w.id)}</option>`).join("")}
                  </select>
                </div>
                <div class="meta">${r.avatarCatalog.length?e.avatarPackHint:e.avatarPackEmpty}</div>
                <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              </div>
              <div class="avatar-pack-preview">
                ${C!=null&&C.previewUrl?`<img src="${v(C.previewUrl)}" alt="${v(C.name||C.id)}">`:`<span>${v((C==null?void 0:C.name)||e.avatarPackCurrent)}</span>`}
              </div>
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(a.packId)}</div>
            </div>
            <div class="page-list">
            ${p.map((w,_)=>`
              <article class="page-chip ${w.id===((u==null?void 0:u.id)||"")?"is-active":""}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${v(w.id)}">
                  <strong>${v(w.title||w.id||`Page ${_+1}`)}</strong>
                  <span class="meta">${v(Ve(e,w.kind))} · ${v(e.pageCards(Array.isArray(w.cards)?w.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${v(w.id)}"${_===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${v(w.id)}"${_===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${v(w.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
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
              ${te(e.fieldPageId,"id",q(u,"id"),!0)}
              ${We(e.fieldKind,"kind",q(u,"kind"),la.map(w=>({value:w,label:Ve(e,w)})))}
              ${te(e.fieldTitle,"title",q(u,"title"),!0)}
              ${te(e.fieldSubtitle,"subtitle",q(u,"subtitle"),!0)}
              ${te(e.fieldSlot,"slot",q(u,"slot"))}
              ${We(e.fieldCardStyle,"cardStyle",q(u,"cardStyle")||"full",da.map(w=>({value:w,label:w==="mini"?e.styleMini:e.styleFull})))}
              ${te(e.fieldStampCaption,"stampCaption",q(u,"stampCaption"))}
              ${te(e.fieldStampValue,"stampValue",q(u,"stampValue"))}
            </div>
            <h2 style="margin-top:18px;">${e.cards}</h2>
            <div class="meta">${e.cardTemplates}</div>
            <div class="card-template-grid" style="margin-top:12px;">
              ${at.map(w=>Ia(e,w)).join("")}
            </div>
            <div class="cards-list" style="margin-top:12px;">
              ${S.length?S.map((w,_)=>Ta(e,w,_,S.length,r.focusedBinding)).join(""):`<div class="meta">${e.noCards}</div>`}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.displaySettings}</h2>
              <div class="meta">${e.displaySubtitle}</div>
            </div>
          ${c?`
            <div class="inspector-grid">
              ${Q(e.fieldDisplaySafeTop,"safeTop",X(c,"safeTop"))}
              ${Q(e.fieldDisplaySafeRight,"safeRight",X(c,"safeRight"))}
              ${Q(e.fieldDisplaySafeBottom,"safeBottom",X(c,"safeBottom"))}
              ${Q(e.fieldDisplaySafeLeft,"safeLeft",X(c,"safeLeft"))}
              ${Q(e.fieldDisplayPadding,"layoutPaddingPx",X(c,"layoutPaddingPx"))}
              ${Q(e.fieldDisplayGap,"layoutGapPx",X(c,"layoutGapPx"))}
              ${Q(e.fieldDisplayScale,"globalScale",X(c,"globalScale"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.homeAssistant}</h2>
              <div class="meta">${v(A)}</div>
            </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${v(r.entitySearch)}">
          </div>
          <div class="ha-list">
            ${I.length?I.map(w=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${v(w.name)}</strong>
                    <div class="meta">${v(w.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${v(w.entityId)}"${r.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${v(w.entityId)}</code>
                <div class="ha-state">${v(w.state)}${w.unit?` · ${v(w.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `,x()},E=(c,p)=>{r.status=c,r.statusTone=p,h()},$=()=>{if(!r.config)return;const c=O(r.config);if(!c.length){r.selectedPageId=null;return}(!r.selectedPageId||!c.some(p=>p.id===r.selectedPageId))&&(r.selectedPageId=c[0].id),wa(r.selectedPageId),ba(fa(r.config,r.selectedPageId))},P=()=>{r.dirty=!0,E(e.statusDirty,"muted")},B=()=>{const c=new URL(window.location.href);c.searchParams.set("editor","1"),r.selectedPageId&&c.searchParams.set("editorPage",r.selectedPageId),c.searchParams.set("v",String(Date.now())),window.location.replace(c.toString())},H=(c,p)=>{if(!r.config||!r.selectedPageId)return;const u=r.config.pages.find(S=>S.id===r.selectedPageId);if(u){if(c==="slot")u.slot=p===""?void 0:Number(p);else if(c==="id"){const S=it(r.config,p||"page"),I=u.id;u.id=S,r.config.rotation.order=r.config.rotation.order.map(A=>A===I?S:A),r.selectedPageId=S}else c==="title"||c==="subtitle"||c==="stampCaption"||c==="stampValue"?u[c]=p:c==="kind"?u.kind=p:c==="cardStyle"&&(u.cardStyle=p);P(),$()}},G=(c,p)=>{if(!r.config)return;const u=st(r.config),S=u.safeArea||{},I=p===""?null:Number(p),A=Number.isFinite(I)?I:null;c==="safeTop"?S.top=A??0:c==="safeRight"?S.right=A??0:c==="safeBottom"?S.bottom=A??0:c==="safeLeft"?S.left=A??0:c==="layoutPaddingPx"?u.layoutPaddingPx=A??16:c==="layoutGapPx"?u.layoutGapPx=A??16:c==="globalScale"&&(u.globalScale=A??1),u.safeArea=S,P()},K=(c,p,u)=>{var A;if(!r.config||!r.selectedPageId)return;const S=r.config.pages.find(L=>L.id===r.selectedPageId);if(!S)return;Array.isArray(S.cards)||(S.cards=[]);const I=S.cards[c];if(I){if(p==="type"){const L=je(u);if(S.cards[c]={...L,caption:ne(I,"caption")||L.caption},((A=r.focusedBinding)==null?void 0:A.cardIndex)===c){const C=ze(u);r.focusedBinding=C?{cardIndex:c,field:C}:null}}else p==="digits"?I[p]=u===""?0:Number(u):I[p]=u;P()}},Y=c=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const p=r.config.pages.find(I=>I.id===r.selectedPageId),u=r.haEntities.find(I=>I.entityId===c);if(!p||!Array.isArray(p.cards)||!u)return;const S=p.cards[r.focusedBinding.cardIndex];S&&(La(S,r.focusedBinding.field,u),P(),h())},se=(c,p)=>{r.focusedBinding={cardIndex:c,field:p},h(),window.requestAnimationFrame(()=>{const u=s.querySelector("#ha-entity-search");u==null||u.scrollIntoView({behavior:"smooth",block:"center"}),u==null||u.focus(),u==null||u.select()})};s.addEventListener("click",async c=>{var w,_;const p=c.target,u=p==null?void 0:p.closest("[data-action]"),S=u==null?void 0:u.dataset.action;if(!S)return;if(S==="apply-display-profile"&&r.config){va(r.config,He(r.previewDisplayId)),P(),h();return}if(!r.config)return;const I=O(r.config),A=(u==null?void 0:u.dataset.pageId)||null,L=A?I.findIndex(y=>y.id===A):-1;if(S==="select-page"&&A){r.selectedPageId=A,r.focusedBinding=null,$(),h();return}if(S==="page-up"&&L>0){const y=I.map(U=>U.id);[y[L-1],y[L]]=[y[L],y[L-1]],r.config.rotation.order=y,r.selectedPageId=A,P(),$(),h();return}if(S==="page-down"&&L>=0&&L<I.length-1){const y=I.map(U=>U.id);[y[L],y[L+1]]=[y[L+1],y[L]],r.config.rotation.order=y,r.selectedPageId=A,P(),$(),h();return}if(S==="page-remove"&&A&&I.length>1){r.config.pages=r.config.pages.filter(y=>y.id!==A),r.config.rotation.order=O(r.config).map(y=>y.id),r.selectedPageId=((w=O(r.config)[Math.max(0,L-1)])==null?void 0:w.id)||((_=O(r.config)[0])==null?void 0:_.id)||null,r.focusedBinding=null,P(),$(),h();return}if(S==="add-page"){const y=ga(r.config);r.config.pages.push(y),r.config.rotation.order=O(r.config).map(U=>U.id),r.selectedPageId=y.id,r.focusedBinding=null,P(),$(),h();return}if(S==="add-card-template"&&r.selectedPageId){const y=r.config.pages.find(j=>j.id===r.selectedPageId),U=(u==null?void 0:u.dataset.cardType)||"entity";if(y){Array.isArray(y.cards)||(y.cards=[]),y.cards.push(je(U));const j=y.cards.length-1,ee=ze(U);r.focusedBinding=ee?{cardIndex:j,field:ee}:null,P(),h(),ee&&window.requestAnimationFrame(()=>{const V=s.querySelector("#ha-entity-search");V==null||V.scrollIntoView({behavior:"smooth",block:"center"}),V==null||V.focus()})}return}if(S==="focus-binding"){const y=Number((u==null?void 0:u.dataset.cardIndex)||"-1"),U=(u==null?void 0:u.dataset.bindingField)||"";y>=0&&U&&se(y,U);return}const C=Number((u==null?void 0:u.dataset.cardIndex)||"-1");if(C>=0&&r.selectedPageId){const y=r.config.pages.find(U=>U.id===r.selectedPageId);if(!y||!Array.isArray(y.cards))return;if(S==="card-remove"){y.cards=y.cards.filter((U,j)=>j!==C),r.focusedBinding&&(r.focusedBinding.cardIndex===C?r.focusedBinding=null:r.focusedBinding.cardIndex>C&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),P(),h();return}if(S==="card-up"&&C>0){[y.cards[C-1],y.cards[C]]=[y.cards[C],y.cards[C-1]],r.focusedBinding&&(r.focusedBinding.cardIndex===C?r.focusedBinding={cardIndex:C-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===C-1&&(r.focusedBinding={cardIndex:C,field:r.focusedBinding.field})),P(),h();return}if(S==="card-down"&&C<y.cards.length-1){[y.cards[C],y.cards[C+1]]=[y.cards[C+1],y.cards[C]],r.focusedBinding&&(r.focusedBinding.cardIndex===C?r.focusedBinding={cardIndex:C+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===C+1&&(r.focusedBinding={cardIndex:C,field:r.focusedBinding.field})),P(),h();return}}if(S==="save"){r.saving=!0,E(e.saving,"muted");try{r.config=await $a(a.sceneApiUrl,Ae(r.config)),r.dirty=!1,r.saving=!1,$(),E(e.statusSaved,"ok"),window.setTimeout(()=>B(),250)}catch(y){r.saving=!1,E(`${e.saveError}: ${String(y)}`,"bad")}return}if(S==="bind-entity"){const y=(u==null?void 0:u.dataset.entityId)||"";Y(y)}}),s.addEventListener("input",c=>{const p=c.target;if(!p||!r.config){p!=null&&p.dataset.previewDisplay&&(r.previewDisplayId=p.value||ge,x());return}if(p.dataset.previewDisplay){r.previewDisplayId=p.value||ge,x();return}if(p.dataset.avatarPack!==void 0){ya(r.config).packId=p.value.trim()||null,P(),h();return}if(p.dataset.pageField){H(p.dataset.pageField,p.value),h();return}if(p.dataset.displayField){G(p.dataset.displayField,p.value),h();return}if(p.dataset.cardField&&p.dataset.cardIndex){K(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),h();return}p.hasAttribute("data-ha-search")&&(r.entitySearch=p.value,h())}),s.addEventListener("focusin",c=>{const p=c.target;if(!(p!=null&&p.dataset.bindingField))return;const u=Number(p.dataset.cardIndex||"-1");u<0||(r.focusedBinding={cardIndex:u,field:p.dataset.bindingField})});try{if(r.config=await xa(a.sceneApiUrl),a.avatarCatalogUrl)try{r.avatarCatalog=await Aa(a.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=ka(((W=Je())==null?void 0:W.states)||null),r.selectedPageId=Sa(r.config),r.status=e.statusSaved,r.statusTone="ok",$()}catch(c){r.status=`${e.loadError}: ${String(c)}`,r.statusTone="bad"}h()}const Da="../scene-api/bootstrap",Ra="weather.forecast_home_assistant",Na="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ba={...Xe,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Fa={...Qe,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},Ma={...Ze,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},_a={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Oa={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Ha(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function ja(){return new URLSearchParams(window.location.search).get("bootstrap")||Da}function Va(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function R(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const s=Va(e);if(s)return new URL(t.slice(1),s).toString()}return new URL(t,i).toString()}function Ee(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function za(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function Wa(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function Se(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function qa(a,e){var t,i,s,o,d,n,f,b;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([r,x])=>[r,R(x,e)]).filter(([,r])=>!!r)),avatar:{manifestUrl:R(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:R(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((s=a.state)==null?void 0:s.provider)||"json",stateUrl:R(String(((o=a.state)==null?void 0:o.stateUrl)||"").trim(),e),haApiFallback:((d=a.state)==null?void 0:d.haApiFallback)===!0,idleLinesUrl:R(String(((n=a.state)==null?void 0:n.idleLinesUrl)||"").trim(),e),entityMapUrl:R(String(((f=a.state)==null?void 0:f.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:R(String(((b=a.control)==null?void 0:b.controlUrl)||"").trim(),e)}}}async function Ga(a,e){var b,r,x,k;const t=R(String(((b=a.files)==null?void 0:b.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=R(String(((r=a.files)==null?void 0:r.sceneConfigUrl)||"").trim(),e),s=R(String(((x=a.files)==null?void 0:x.avatarCatalogUrl)||"").trim(),e);if(!i||!s)return t;let o="";try{const h=await Se(i);o=String(((k=h.avatar)==null?void 0:k.packId)||"").trim()}catch{o=""}if(!o)return t;let d="";try{const h=await Se(s),E=Array.isArray(h.items)?h.items.find($=>String($.id||"").trim()===o):null;d=R(String((E==null?void 0:E.manifestUrl)||"").trim(),e)}catch{d=""}if(!d)return t;const f={...qa(await Se(t),t),avatar:{manifestUrl:d}};return URL.createObjectURL(new Blob([JSON.stringify(f)],{type:"application/json"}))}const oe=document.getElementById("app");if(!oe)throw new Error("Missing #app root element");const ae=Oa[Ha()];Ee(oe,ae.startingTitle,ae.startingBody);(async()=>{var e;const a=ja();try{const t=await Wa(a),i=String(t.packId||"").trim(),s=i.toLowerCase()==="neiri",o=await Ga(t,a);if(!o){Ee(oe,ae.missingRendererTitle,ae.missingRendererBody,JSON.stringify(t,null,2));return}document.documentElement.dataset.packId=i,document.title=s?"Нейри":i?`kiosk-scene hosted runtime (${i})`:"kiosk-scene hosted runtime",await oa(oe,{rendererConfigUrl:o,weatherUrl:s?"./weather.json":void 0,weatherReader:s?ra({weatherEntity:Ra,openMeteoUrl:Na,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:s?Ba:void 0,labels:s?Fa:void 0,presetLabels:s?Ma:void 0,defaultWeather:s?_a:void 0}),za()&&await Ua({packId:i,sceneApiUrl:R(String(t.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:R(String(((e=t.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),sceneUrl:R(String(t.entryUrl||t.runtimeBaseUrl||"./").trim(),a)})}catch(t){Ee(oe,ae.failedTitle,ae.failedBody,String(t))}})();
