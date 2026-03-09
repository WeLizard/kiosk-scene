var yt=Object.defineProperty;var bt=(a,e,t)=>e in a?yt(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var b=(a,e,t)=>bt(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();function L(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function d(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Oe(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function fe(a,e){if(!L(a)||!L(e))return e??a;const t={...a};for(const[i,n]of Object.entries(e)){if(Array.isArray(n)){t[i]=n.slice();continue}if(L(n)&&L(t[i])){t[i]=fe(t[i],n);continue}t[i]=n}return t}function St(a,e=40){return Array.isArray(a)?a.map(t=>d(t,e).toLowerCase()).filter(Boolean):[]}const X={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},He={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function Le(a){var t,i,n,s,o,l,g,r,S,x;const e=fe(X,L(a)?a:{});return{version:1,assistant:{name:d((t=e.assistant)==null?void 0:t.name,40)||X.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:L(e.links)?Object.fromEntries(Object.entries(e.links).map(([P,k])=>[d(P,64),d(k,1024)]).filter(([P,k])=>P&&k)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||X.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||X.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||X.state.stateUrl,haApiFallback:((g=e.state)==null?void 0:g.haApiFallback)===!0,idleLinesUrl:d((r=e.state)==null?void 0:r.idleLinesUrl,1024)||X.state.idleLinesUrl,entityMapUrl:d((S=e.state)==null?void 0:S.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d((x=e.control)==null?void 0:x.controlUrl,1024)||X.control.controlUrl}}}function rt(a){var t,i,n,s,o;const e=fe(He,L(a)?a:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||He.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:L(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,g])=>[d(l,32),d(g,1024)]).filter(([l,g])=>l&&g)):{},viewPresets:L(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,g])=>d(l,32)&&L(g))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const te={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},wt=["full","torso","head"];function pe(a,e=Date.now()){var l,g,r,S,x,P,k;const t=fe(te,L(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((l=t.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((g=t.page)==null?void 0:g.target,40)||null,until:d((r=t.page)==null?void 0:r.until,64)||null},cue:{cue:d((S=t.cue)==null?void 0:S.cue,32)||null,emotion:d((x=t.cue)==null?void 0:x.emotion,32)||null,motion:d((P=t.cue)==null?void 0:P.motion,32)||null,until:d((k=t.cue)==null?void 0:k.until,64)||null}},n=d(t.viewPreset,16).toLowerCase();i.viewPreset=wt.includes(n)?n:null;const s=Oe(i.page.until);i.page.mode==="pinned"&&(!s||s<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=Oe(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function Ce(a,e,t=Date.now()){return pe(fe(pe(a,t),L(e)?e:{}),t)}function xt(a,e,t=Date.now()){return pe({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function kt(a,e,t=3e4,i=Date.now()){const n=d(e,40),s=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return pe({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},i)}function nt(a,e){var o,l,g;const t={...a||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),n=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),s=d((g=e==null?void 0:e.cue)==null?void 0:g.motion,32);return i&&(t.cue=i),n&&(t.emotion=n),s&&(t.motion=s),t}function V(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function je(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function $t(a){return L(a)&&L(a.config)?a.config:a}function Ct(a,e){const t={...a};return L(e)&&(typeof e.id=="string"&&(t.id=d(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>L(i)))),t}function Ie(a,e){const t=$t(a),i=Array.isArray(e.pages)?e.pages.slice():[],n=L(t)&&Array.isArray(t.pages)?t.pages:[],s=i.map(k=>{const A=n.find(w=>d(L(w)?w.id:"",40)===k.id);return Ct(k,A)}),o=L(t)&&L(t.rotation)?t.rotation:{},l=L(e.display)?e.display:{},g=L(t)&&L(t.display)?t.display:{},r=L(l.safeArea)?l.safeArea:{},S=L(g.safeArea)?g.safeArea:{},x=Array.isArray(o.order)?o.order:e.rotation.order,P=St(x).filter((k,A,w)=>s.some(R=>R.id===k)&&w.indexOf(k)===A);return{version:1,rotation:{order:P.length?P:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:V(S.top,V(r.top,0)),right:V(S.right,V(r.right,0)),bottom:V(S.bottom,V(r.bottom,0)),left:V(S.left,V(r.left,0))},layoutPaddingPx:V(g.layoutPaddingPx,V(l.layoutPaddingPx,16)),layoutGapPx:V(g.layoutGapPx,V(l.layoutGapPx,16)),globalScale:je(g.globalScale,je(l.globalScale,1))},pages:s}}function It(a,e=220){const t=d(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},n=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(s,o,l)=>{const g=d(o,16).toLowerCase(),r=d(l,32).toLowerCase();return(g==="emotion"||g==="activity"||g==="cue"||g==="motion")&&r&&(i[g]=r)," "});return{text:d(n,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const Pt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function oe(a,e={}){const t=L(a)?a:{},i={...Pt,...e};return{version:1,assistant:d(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:d(t.status??i.status,255),message:d(t.message??i.message,255),source:d(t.source??i.source,64),updatedAt:d(t.updatedAt??i.updatedAt,64),emotion:d(t.emotion??i.emotion,32)||null,activity:d(t.activity??i.activity,32)||null,cue:d(t.cue??i.cue,32)||null,intensity:Et(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:d(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:d(t.event??i.event,64)}}function Et(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function At(a,e){return a.order[e]||a.order[0]||""}function Tt(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function Lt(a,e,t,i){const n=Array.isArray(a.order)?a.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let o=1;o<=n.length;o+=1){const l=(s+o*t+n.length)%n.length;if(i(n[l]))return l}return s}function Ut(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=a.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:Tt(a.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(a.force){const o=At(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(o)?a.activeIndex:Math.max(0,t.findIndex(g=>a.isEligible(g))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let s=a.activeIndex;for(let o=1;o<=t.length;o+=1){const l=(a.activeIndex+o)%t.length;if(a.isEligible(t[l])){s=l;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const st={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Dt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function ze(a){const e=d(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Dt.some(t=>e.includes(t)):!1}function Nt(a,e){const t=oe(a),i=d(t.status,72),n=d(t.message,220);if(!(t.online!==!1&&(ze(i)||ze(n))))return{state:t,hasTechnicalFailure:!1};const l=d(t.emotion,32).toLowerCase(),g=d(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(t.activity,32).toLowerCase()==="error"?"idle":d(t.activity,32)||null,cue:d(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:g==="error"?"idle_soft":g||null},hasTechnicalFailure:!0}}function Mt(a,e){const t=(e==null?void 0:e.copy)??st,i=oe(a),n=It(i.message,220),s=Nt({...i,message:n.text,emotion:d(i.emotion,32)||n.emotion||null,activity:d(i.activity,32)||n.activity||null,cue:d(i.cue,32)||n.cue||null,motion:d(i.motion,32)||n.motion||null},{healthyStatus:t.technicalHealthyLabel}),o=s.state,l=d(o.message,180),g=d(o.activity,32).toLowerCase(),r=o.online!==!1&&g!=="offline",S=!!o.busy||g==="thinking"||g==="busy"||g==="acting",x=o.speaking===!0||g==="speaking",P=r?S?t.busyLabel:l||x?t.speakingLabel:s.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,k=l?t.messageCaption:s.hasTechnicalFailure?t.statusCaption:t.modeCaption,A=l||(r?S?t.busyBody:d(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:o,hasTechnicalFailure:s.hasTechnicalFailure,caption:k,label:P,body:A,bodyKey:[k,P,A].join(":")}}function Rt(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function Ve(a,e=-1){const t=Array.isArray(a)?a.map(n=>d(n,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function Bt(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!d(a==null?void 0:a.message,180);return e&&!t&&!i}const Ft={cue:null,emotion:null,motion:null,until:null},_t={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Ot(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function ot(a){return a.endsWith("/")?a:`${a}/`}function be(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(ot(d(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function we(a){const e=d(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function Ht(a,e,t){const i=d(a.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?we(i):new URL("../avatar.html",new URL(ot(d(t,1024)||"."),window.location.href)).toString()}function jt(a,e){const t=d(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function zt(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[n,s]of Object.entries(i)){const o=d(n,64);if(!o||s==null)continue;const l=typeof s=="boolean"?s?"1":"0":String(s);t.searchParams.set(o,l)}return t.toString()}function Vt(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),be(t,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([n,s])=>[d(n,64),we(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:we(a.state.stateUrl),idleLinesUrl:we(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:be(t,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:be(t,e.fallbackPortrait||""),motionMapUrl:be(t,e.motionMapUrl||""),presetThumbs:i}}}class Wt{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"currentState");b(this,"currentCue",{...Ft});b(this,"currentPreset","full");b(this,"currentBubble",{..._t});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var n;const t=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!t||e.source!==t||!Ot(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=rt({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Le(e.rendererConfig||{}),this.currentState=oe({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const t=Ht(this.options,this.manifest,this.assetRoot),i=zt(t,this.options);this.targetOrigin=jt(i,this.options.targetOrigin);const n=document.createElement("div");n.className="ks-live2d-frame",Object.assign(n.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const s=document.createElement("iframe");s.className="ks-live2d-iframe",s.src=i,s.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,s.loading="eager",s.allow="autoplay",Object.assign(s.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&s.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);n.append(s,o),this.host.append(n),s.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=n,this.iframeEl=s,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=oe(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(n,s),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Vt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=nt(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function qt(a={}){return new Wt(a)}const Kt={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},We={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Gt{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,n,s),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=n;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||We,i=t[e]||t.full||We.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Kt}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),n=t.replace(/^\.?\//,"");return i?`${i}/${n}`:n}}function Jt(a={}){return new Gt(a)}function Yt(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function lt(){var a;for(const e of Yt())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function Zt(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function Xt(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=d(t.entity_id,255);i&&(e[i]=t)}return e}function Qt(a,e,t="Assistant"){const i=a[e.status],n=a[e.message],s=a[e.online],o=a[e.busy],l=a[e.source],g=a[e.updatedAt],r=e.emotion?a[e.emotion]:null,S=e.activity?a[e.activity]:null,x=e.cue?a[e.cue]:null,P=e.speaking?a[e.speaking]:null,k=e.intensity?a[e.intensity]:null,A=e.motion?a[e.motion]:null,w=a[e.revision];if(!i&&!n&&!s&&!o)return null;const R=d(i==null?void 0:i.state,72),H=d(n==null?void 0:n.state,220),I=d(g==null?void 0:g.state,64),z=Pe(s,!0),B=Pe(o,!1),U=d(S==null?void 0:S.state,32)||"",J=Pe(P)??U==="speaking",ae=U||(z?J?"speaking":B?"thinking":"idle":"offline");return oe({version:1,assistant:d(t,40)||"Assistant",online:z,busy:B,status:R&&R!=="unknown"&&R!=="unavailable"?R:"",message:H&&H!=="unknown"&&H!=="unavailable"?H:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:I&&I!=="unknown"&&I!=="unavailable"?I:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(r==null?void 0:r.state,32)||null,activity:ae,cue:d(x==null?void 0:x.state,32)||null,intensity:ea(k),speaking:J,motion:d(A==null?void 0:A.state,32)||null,revision:Number(w==null?void 0:w.state)||0})}function Pe(a,e){const t=d(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function ea(a){const e=d(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function ta(a){const e=Me(a);return{id:"ha-state",async read(){const t=await e.read();return t?Qt(t,a.entityMap,a.assistantName):null}}}function Me(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let n=null,s=0,o=null,l=0;async function g(){var P;const r=lt();if(r!=null&&r.states)return r.states;const S=Date.now();if(n&&S-s<t||!a.allowApiFallback||typeof e!="function"||S<l)return n;if(o)return o;const x=d(((P=a.readToken)==null?void 0:P.call(a))??Zt(),4096);return x?(o=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${x}`}}).then(async k=>{if(!k.ok){const A=new Error(`HA states HTTP ${k.status}`);throw A.status=k.status,A}return k.json()}).then(k=>{const A=Xt(k);return A&&(n=A,s=Date.now()),A||n}).catch(k=>(((k==null?void 0:k.status)===401||(k==null?void 0:k.status)===403)&&(l=Date.now()+i),n)).finally(()=>{o=null}),o):n}return{id:"ha-states",async read(){return g()}}}async function Re(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=d(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const n=await e(i.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return a.sanitize?a.sanitize(s):s}catch(n){if(a.defaultValue!==void 0)return a.defaultValue;throw n}}function aa(a){return{id:"json-state",async read(){const e=await Re({...a,defaultValue:a.defaultValue});return oe(e)}}}function qe(a){return{id:"json-control",async read(){const e=await Re({...a,defaultValue:a.defaultValue??te});return pe(e)}}}function ia(a){return{id:"json-lines",async read(){const e=await Re({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>d(t,220)).filter(Boolean):[]}}}function _(a,e,t=64){return d(a[e],t)}function ce(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function ra(a,e="en-US"){const t=d(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Se(a,e){return!a||!e?null:a[e]||null}function na(a,e=null,t="en-US"){var x,P,k,A;const i=_(a,"caption",40)||_(a,"type",24)||"Card",n=_(a,"hint",72),s=_(a,"type",32).toLowerCase()||"entity",o=_(a,"entity",255),l=Se(e,o),g=Se(e,_(a,"stateEntity",255)),r=Se(e,_(a,"downEntity",255)),S=Se(e,_(a,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:_(a,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const w=Number(l==null?void 0:l.state);return!Number.isFinite(w)||w<=0?{caption:i,value:"Clear",hint:n||"nothing pending"}:{caption:i,value:`${w} item${w===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const w=(l==null?void 0:l.state)==="on";return{caption:i,value:w?_(a,"onText",48)||"On":_(a,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const w=ce(l==null?void 0:l.state,0);return{caption:i,value:w?`${w}%`:"—",hint:d(g==null?void 0:g.state,48)||n||"battery level"}}if(s==="network"){const w=ce(r==null?void 0:r.state,0),R=ce(S==null?void 0:S.state,0);return{caption:i,value:w||R?`↓ ${w||"0"} · ↑ ${R||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:i,value:ra(l==null?void 0:l.state,t)||"—",hint:n||"next event"};if(s==="percent"){const w=ce(l==null?void 0:l.state,Number(_(a,"digits",4))||0);return{caption:i,value:w?`${w}%`:"—",hint:n||d((x=l==null?void 0:l.attributes)==null?void 0:x.friendly_name,48)||"state percentage"}}if(s==="number"){const w=Number(_(a,"digits",4))||0,R=ce(l==null?void 0:l.state,w),H=_(a,"unit",16)||d((P=l==null?void 0:l.attributes)==null?void 0:P.unit_of_measurement,16);return{caption:i,value:R?`${R}${H?` ${H}`:""}`:"—",hint:n||d((k=l==null?void 0:l.attributes)==null?void 0:k.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||_(a,"value",64)||"—",hint:n||d((A=l==null?void 0:l.attributes)==null?void 0:A.friendly_name,48)||"entity state"}}function sa(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>na(i,e,t)):[]}const dt={...st,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},ct={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},ut={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},oa={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},xe={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function v(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function pt(a){return a.endsWith("/")?a:`${a}/`}function W(a,e){const t=d(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function ft(a){return new URL(".",a).toString()}function la(a,e){const t=ft(e),i=W(t,d(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:W(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([n,s])=>[n,W(t,s)]).filter(([,n])=>!!n))}}function Ee(a){return{...xe,...a||{},metrics:{...xe.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):xe.forecast.map(e=>({...e}))}}function Ke(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function j(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function da(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${j(t)} мм рт. ст.`:`${j(t*.750061683,0)} мм рт. ст.`}function ca(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${j(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${j(t/3.6,1)} м/с`:`${j(t,1)} м/с`}function ua(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function pa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function fa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function ga(a,e="ru-RU"){const t=d(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||d(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function Ge(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function ma(a,e="./assets/icons"){const t=Number(a),i=pt(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function ha(a){const e=d(a.locale,32)||"ru-RU",t=d(a.iconBaseUrl,1024)||"./assets/icons",i=Me({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var A,w,R,H,I,z,B,U,le,J,ae,ge,me,he,ve,ye,de,u,p,c;const n=await i.read(),s=a.fetchImpl??globalThis.fetch,o=n==null?void 0:n[a.weatherEntity];let l=null;const g=d(a.openMeteoUrl,4096);if(g&&typeof s=="function")try{const h=await s(`${g}${g.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});h.ok&&(l=await h.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const r=d(o==null?void 0:o.last_changed,64)||d((A=l==null?void 0:l.current)==null?void 0:A.time,64)||new Date().toISOString(),S=o?ga(o.state,e):Ge((w=l==null?void 0:l.current)==null?void 0:w.weather_code,e),x=Array.isArray((R=l==null?void 0:l.daily)==null?void 0:R.time)?l.daily.time.map((h,C)=>{var D,$,Y,Z,f;const E=new Date(`${h}T12:00:00+03:00`);return{name:E.toLocaleDateString(e,{weekday:"short"}),dayNumber:E.toLocaleDateString(e,{day:"numeric"}),monthShort:E.toLocaleDateString(e,{month:"short"}),note:d(Ge((D=l.daily.weather_code)==null?void 0:D[C],e),28),max:`${j(($=l.daily.temperature_2m_max)==null?void 0:$[C])}°`,min:`${j((Y=l.daily.temperature_2m_min)==null?void 0:Y[C])}° · ${j((Z=l.daily.precipitation_probability_max)==null?void 0:Z[C])}%`,icon:ma((f=l.daily.weather_code)==null?void 0:f[C],t)}}):[],P=x[0]||null,k=x.slice(1,6);return{todayValue:pa(r,e),todayLabel:fa(r,e),updatedAt:ua(r,e),temperature:j(((H=o==null?void 0:o.attributes)==null?void 0:H.temperature)??((I=l==null?void 0:l.current)==null?void 0:I.temperature_2m),1),condition:S,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${j(((z=o==null?void 0:o.attributes)==null?void 0:z.apparent_temperature)??((B=l==null?void 0:l.current)==null?void 0:B.apparent_temperature)??((U=o==null?void 0:o.attributes)==null?void 0:U.temperature),1)}°C`,badgeSummary:S,badgeRange:P?`${P.max} / ${j((J=(le=l==null?void 0:l.daily)==null?void 0:le.temperature_2m_min)==null?void 0:J[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${j(((ae=o==null?void 0:o.attributes)==null?void 0:ae.humidity)??((ge=l==null?void 0:l.current)==null?void 0:ge.relative_humidity_2m))}%`,pressure:da(((me=o==null?void 0:o.attributes)==null?void 0:me.pressure)??((he=l==null?void 0:l.current)==null?void 0:he.surface_pressure),((ve=o==null?void 0:o.attributes)==null?void 0:ve.pressure_unit)??"hPa"),wind:ca(((ye=o==null?void 0:o.attributes)==null?void 0:ye.wind_speed)??((de=l==null?void 0:l.current)==null?void 0:de.wind_speed_10m),((u=o==null?void 0:o.attributes)==null?void 0:u.wind_speed_unit)??"km/h"),clouds:`${j(((p=o==null?void 0:o.attributes)==null?void 0:p.cloud_coverage)??((c=l==null?void 0:l.current)==null?void 0:c.cloud_cover))}%`},forecast:k}}}class va{constructor(e,t={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"entityMap",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",te);b(this,"uiControl",te);b(this,"currentControl",te);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...dt,...t.copy||{}},this.labels={...ct,...t.labels||{}},this.presetLabels={...ut,...t.presetLabels||{}},this.weatherData=Ee(t.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=W(window.location.href,this.getRendererConfigUrl()),t=ft(e),i=Le(await this.readJson(e)),n=Le({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,W(t,l)])),avatar:{...i.avatar,manifestUrl:W(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:W(t,i.scene.configUrl)},state:{...i.state,stateUrl:W(t,i.state.stateUrl),idleLinesUrl:W(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?W(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:W(t,i.control.controlUrl)}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=la(rt(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await ia({url:this.rendererConfig.state.idleLinesUrl||W(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await qe({url:this.rendererConfig.control.controlUrl,defaultValue:te}).read(),this.currentControl=Ce(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=xt(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,n;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(n=(i=this.carouselShellEl).setPointerCapture)==null||n.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:n}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(n)>=s*.16,l=n<0?1:-1;if(this.clearDragState(t.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await qe({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=Ce(te,this.uiControl),this.currentControl=Ce(this.remoteControl,this.uiControl);const e=nt(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=Mt(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=Ie(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const n=this.getOrderedPages(i.pages,i.rotation.order),s=Ut({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>n.some(l=>l.id===o)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(n,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,n)=>i.kind==="overview"?this.renderOverviewSlide(i,t,n):this.renderDynamicSlide(i,n,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,n)=>`
      <button
        class="carousel-dot ${n===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${n}"
        data-scene-page-id="${v(i.id)}"
        aria-label="${v(d(i.title,40)||`Page ${n+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t,i){const n=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||xe,o=s.forecast.slice(0,5).map(l=>this.renderForecastDay(l)).join("");return`
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
    `}renderDynamicSlide(e,t,i){const n=sa(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${t+1} / ${i}`),g=e.cardStyle==="mini"?n.map((x,P)=>`
          <article class="mini-card" data-scene-card-index="${P}" data-scene-page-id="${v(e.id)}">
            <span class="caption">${v(x.caption)}</span>
            <strong>${v(x.value)}</strong>
          </article>
        `).join(""):n.map((x,P)=>`
          <article class="home-card" data-scene-card-index="${P}" data-scene-page-id="${v(e.id)}">
            <span class="caption">${v(x.caption)}</span>
            <strong>${v(x.value)}</strong>
            <small>${v(x.hint)}</small>
          </article>
        `).join(""),r=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(x=>this.renderForecastDay(x)).join("")}</div>`:"",S=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
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
          <div class="${S}">
            ${g||`<div class="empty">${v(this.labels.noCardsConfigured)}</div>`}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],i=e[e.length-1];return`${d(t.dayNumber,4)} ${d(t.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var n;const t=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return t||`${pt(d(this.options.iconBaseUrl,1024)||"./assets")}${oa[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,t){const i=t.map(s=>e.find(o=>o.id===s)).filter(Boolean),n=e.filter(s=>!i.some(o=>o.id===s.id));return i.concat(n)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,n;!t&&((n=(i=this.carouselShellEl).hasPointerCapture)!=null&&n.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=Ie(this.sceneConfig,this.sceneConfig),i=Lt(t.rotation,this.activeIndex,e,n=>this.orderedPages.some(s=>s.id===n));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const n=Ie(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,n.rotation.defaultDwellMs*2);this.uiControl=kt(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!Bt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=Ve(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=Ve(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},Rt(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>aa({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await ta({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:Me({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=Ke(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=Ke(e,t)}catch{}try{return Ee(e)}catch{return Ee(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return qt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Jt({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",n=t.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function ya(a,e={}){const t=new va(a,e);return await t.init(),t}const ba=["overview","cards","forecast+cards"],Sa=["full","mini"],gt=["entity","text","todo","onoff","battery","network","time","percent","number"],K=["caption","hint"],wa={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},xa={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается честный 1:1 viewport выбранного экрана. Если не влезает по ширине, страница просто прокручивается.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Подставить в настройки экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Выбор Live2D-модели для текущего instance-pack. Применяется после сохранения и перезагрузки превью.",avatarPack:"Набор аватара",avatarPackCurrent:"Текущий avatar.manifest.json instance-pack",avatarPackHint:"Другие модели лежат отдельно в /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"В каталоге avatar-packs пока нет отдельных моделей.",avatarPackAppliedAfterSave:"Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",avatarPackDefaultTile:"Текущий instance-pack",avatarPackDefaultHint:"Оставить аватар из scene-pack без отдельного avatar-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Будет применён после сохранения",avatarPackMotionCount:a=>`${a} motion`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Импорт аватара",avatarImportHint:"Загрузи zip-архив с Live2D-моделью. Kiosk Scene сам распакует его в avatar-packs, найдёт model3.json и создаст draft motion-map.",avatarImportSelect:"ZIP архив аватара",avatarImportSelected:a=>`Выбран архив: ${a}`,avatarImportButton:"Импортировать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:a=>`Импортирован avatar-pack: ${a}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для semantic cue/activity в runtime.",avatarMappingEmpty:"Выбери отдельный avatar-pack, чтобы редактировать его motion-map.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Idle / ожидание",avatarSemanticTouch:"Touch / касание",avatarSemanticReplySoft:"Reply soft / мягкий ответ",avatarSemanticThink:"Think / размышление",avatarSemanticBusy:"Busy / занята",avatarSemanticCalm:"Calm / спокойствие",avatarSemanticHappy:"Happy / радость",avatarSemanticSurprise:"Surprise / удивление",avatarSemanticWarning:"Warning / предупреждение",avatarSemanticGreet:"Greet / приветствие",avatarSemanticSpeaking:"Speaking / говорит",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardsSubtitle:"Сначала выбери или добавь карточку, затем настрой её ниже. Порядок здесь же влияет на правую карусель.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку из шаблона выше или выбери существующую карточку из списка.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingActive:(a,e)=>`Сейчас связываем: ${a} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage renders a true 1:1 viewport of the selected screen. If it does not fit, the editor page simply scrolls.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Fill display settings below",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the Live2D model for this instance-pack. It applies after save and preview reload.",avatarPack:"Avatar pack",avatarPackCurrent:"Use the instance-pack avatar.manifest.json",avatarPackHint:"Additional models live in /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"No separate avatar packs are available yet.",avatarPackAppliedAfterSave:"The selected avatar pack will apply after saving and reloading the preview.",avatarPackDefaultTile:"Current instance-pack",avatarPackDefaultHint:"Keep the avatar bundled directly with the scene pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Will apply after save",avatarPackMotionCount:a=>`${a} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarImport:"Import avatar",avatarImportHint:"Upload a Live2D zip archive. Kiosk Scene will unpack it into avatar-packs, detect model3.json and create a draft motion map.",avatarImportSelect:"Avatar ZIP archive",avatarImportSelected:a=>`Selected archive: ${a}`,avatarImportButton:"Import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:a=>`Imported avatar pack: ${a}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map semantic cue/activity slots to actual model motions used by the runtime.",avatarMappingEmpty:"Choose a separate avatar pack to edit its motion map.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardsSubtitle:"Add or choose a card first, then edit it below. The order here drives the right-hand carousel.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card from the templates above or choose an existing one from the list.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingActive:(a,e)=>`Binding now: ${a} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},ka=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],ke=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Ue="mellow-fly-7";function De(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Je(a){return ke.find(e=>e.id===a)||ke.find(e=>e.id===Ue)||ke[0]}function $a(a){return`${a.width} × ${a.height}`}function m(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Be(a){return JSON.parse(JSON.stringify(a))}function q(a){const e=new Map(a.pages.map(n=>[n.id,n])),t=a.rotation.order.map(n=>e.get(n)).filter(Boolean),i=a.pages.filter(n=>!t.some(s=>s.id===n.id));return[...t,...i]}function Ca(a,e){return e?Math.max(0,q(a).findIndex(t=>t.id===e)):0}function Ia(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function mt(a,e){const t=Ia(e);let i=t,n=2;for(;a.pages.some(s=>s.id===i);)i=`${t}-${n}`,n+=1;return i}function Pa(a){const e=a.pages.length+1;return{id:mt(a,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function Ye(a){switch(a){case"text":return{type:a,caption:"Text",value:"—",hint:""};case"todo":return{type:a,caption:"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:a,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:"Time",entity:"",hint:""};case"percent":return{type:a,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function O(a,e){const t=a[e];return t==null?"":String(t)}function G(a,e){const t=a[e];return t==null?"":String(t)}function Q(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function ht(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function Ae(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function Ze(a){return a.avatar||(a.avatar={}),a.avatar}function Ea(a,e){const t=ht(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function Aa(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function Ta(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function La(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&q(a).some(n=>n.id===t)?t:((i=q(a)[0])==null?void 0:i.id)||null}async function Ua(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return Be(t.config)}async function Da(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return Be(i.config)}function Fe(a){switch(a){case"text":return[...K,"value"];case"todo":return[...K,"entity"];case"onoff":return[...K,"entity","onText","offText"];case"battery":return[...K,"entity","stateEntity"];case"network":return[...K,"downEntity","upEntity"];case"time":return[...K,"entity"];case"percent":return[...K,"entity","digits"];case"number":return[...K,"entity","digits","unit"];default:return[...K,"entity"]}}function Xe(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function se(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function vt(a){const e=De();return wa[e][a]||""}function $e(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Na(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),n=a.includes(".")&&a.split(".",1)[0]||"other",s=String(e.state||""),o=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:n,state:s,unit:o}}function Ma(a){return a?Object.entries(a).map(([e,t])=>Na(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function Ra(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function Qe(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(n=>({id:String(n.id||"").trim(),name:String(n.name||n.id||"").trim(),manifestUrl:String(n.manifestUrl||"").trim(),previewUrl:String(n.previewUrl||"").trim(),motionCount:Number(n.motionCount||0),capabilities:typeof n.capabilities=="object"&&n.capabilities?{supportsMotion:!!n.capabilities.supportsMotion,supportsEmotion:!!n.capabilities.supportsEmotion,supportsLipSync:!!n.capabilities.supportsLipSync}:void 0})).filter(n=>n.id&&n.manifestUrl):[]}async function Ba(a,e){const t=String(a||"").trim();if(!t)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const n=await fetch(t,{method:"POST",body:i}),s=await n.json();if(!n.ok||s.success===!1||!s.item)throw new Error(String(s.error||`HTTP ${n.status}`));return{id:String(s.item.id||"").trim(),name:String(s.item.name||s.item.id||"").trim(),manifestUrl:String(s.item.manifestUrl||"").trim(),previewUrl:String(s.item.previewUrl||"").trim(),motionCount:Number(s.item.motionCount||0),capabilities:typeof s.item.capabilities=="object"&&s.item.capabilities?{supportsMotion:!!s.item.capabilities.supportsMotion,supportsEmotion:!!s.item.capabilities.supportsEmotion,supportsLipSync:!!s.item.capabilities.supportsLipSync}:void 0}}async function Fa(a,e){var o,l,g,r;const t=String(a||"").trim(),i=String(e||"").trim();if(!t||!i)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${t}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((o=s.motionMap)==null?void 0:o.motions)?(l=s.motionMap)==null?void 0:l.motions.map(S=>({index:Number(S.index),id:String(S.id||"").trim(),label:String(S.label||S.id||"").trim(),group:String(S.group||"").trim(),tags:Array.isArray(S.tags)?S.tags.map(x=>String(x||"").trim()).filter(Boolean):[]})).filter(S=>Number.isFinite(S.index)):[],semantic:typeof((g=s.motionMap)==null?void 0:g.semantic)=="object"&&((r=s.motionMap)!=null&&r.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function _a(a,e){var s,o,l;const t=String(a||"").trim();if(!t||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${t}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await i.json();if(!i.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${i.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((o=n.motionMap)==null?void 0:o.semantic)=="object"&&((l=n.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function Oa(a){if(Array.isArray(a)){const e=a.find(t=>Number.isFinite(Number(t)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(a))?String(Number(a)):""}function Ha(a,e){const t=a[e.labelKey];return typeof t=="string"?t:e.key}function ja(a,e){const t=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${a.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${ka.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${m(i.key)}">${m(Ha(a,i))}</label>
            <select id="avatar-semantic-${m(i.key)}" data-avatar-semantic="${m(i.key)}">
              <option value="">${m(a.avatarMotionNone)}</option>
              ${t.map(n=>`
                <option value="${m(String(n.index))}"${Oa(e.motionMap.semantic[i.key])===String(n.index)?" selected":""}>
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
  `}function et(a,e,t){var r,S,x;const i=(e==null?void 0:e.id)||"",n=t===i,s=(e==null?void 0:e.name)||a.avatarPackDefaultTile,o=(e==null?void 0:e.id)||a.avatarPackCurrent,l=(e==null?void 0:e.previewUrl)||"",g=e?[e.motionCount>0?a.avatarPackMotionCount(e.motionCount):"",(r=e.capabilities)!=null&&r.supportsMotion?a.avatarCapabilityMotion:"",(S=e.capabilities)!=null&&S.supportsEmotion?a.avatarCapabilityEmotion:"",(x=e.capabilities)!=null&&x.supportsLipSync?a.avatarCapabilityLipSync:""].filter(Boolean):[a.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${l?`<img src="${m(l)}" alt="${m(s)}">`:`<span>${m(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${m(s)}</strong>
        <div class="meta">${m(o)}</div>
        <div class="avatar-pack-card-meta">
          ${g.map(P=>`<span>${m(P)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${m(i)}">
          ${m(n?a.avatarPackSelected:a.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function _e(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function za(a,e,t,i){if(!e||t===null)return`<div class="meta">${m(a.entityBindingEmpty)}</div>`;const n=Fe(O(e,"type")||"entity").filter(s=>_e(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===t&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${t}" data-binding-field="${m(s)}">
            ${m($e(a,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${m(a.entityBindingEmpty)}</div>`}function tt(a){const e=document.querySelector(`[data-editor-section="${a}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function ie(a){for(const e of Array.from(a.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function at(a){return Fe(a).find(e=>_e(e))||null}function re(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${m(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${m(e)}" value="${m(t)}">
    </div>
  `}function ee(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${m(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${m(e)}" value="${m(t)}">
    </div>
  `}function it(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${m(a)}</label>
      <select id="page-select-${e}" data-page-field="${m(e)}">
        ${i.map(n=>`<option value="${m(n.value)}"${n.value===t?" selected":""}>${m(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function Va(a,e,t,i){const n=O(e,"type")||"entity",s=Fe(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${m(O(e,"caption")||se(a,n))}</strong>
          <div class="meta">${m(se(a,n))}</div>
        </div>
        <div class="meta">#${t+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${m(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${gt.map(o=>`<option value="${o}"${o===n?" selected":""}>${m(se(a,o))}</option>`).join("")}
          </select>
        </div>
        ${s.map(o=>{const l=_e(o),g=l&&(i==null?void 0:i.cardIndex)===t&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${g?" is-active":""}">
                <label>${m($e(a,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${m(o)}"
                    data-binding-field="${m(o)}"
                    value="${m(O(e,o))}"
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
              <label>${m($e(a,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${m(o)}"
                value="${m(O(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Wa(a,e,t,i,n){const s=O(e,"type")||"entity",o=O(e,"caption")||se(a,s),l=O(e,"entity")||O(e,"stateEntity")||O(e,"downEntity")||O(e,"upEntity")||O(e,"value")||O(e,"hint")||vt(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${t}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${t}">
        <strong>${m(o)}</strong>
        <span class="meta">${m(se(a,s))}</span>
        <div class="meta">${m(l)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
      </div>
    </article>
  `}function qa(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${m(e)}"
    >
      <strong>${m(se(a,e))}</strong>
      <span>${m(vt(e))}</span>
    </button>
  `}function Ka(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function Ga(a){var de;const e=xa[De()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
                ${ke.map(u=>`<option value="${m(u.id)}">${m(u.label[De()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),o=n.querySelector("[data-preview-resolution]"),l=n.querySelector("[data-preview-display]"),g=n.querySelector("[data-dashboard]");if(!s||!o||!l||!g)throw new Error("Missing native editor shell elements");s.appendChild(t);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Ue,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},S=async u=>{const p=String(u||"").trim();if(!p||!a.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,I();try{r.avatarPackDetails=await Fa(a.avatarPackApiUrl,p),r.avatarPackDirty=!1}catch(c){r.avatarPackDetails=null,r.avatarPackDirty=!1,z(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{r.avatarPackLoading=!1}},x=()=>{const u=Je(r.previewDisplayId);l.value=u.id,o.textContent=$a(u),s.style.width=`${u.width}px`,s.style.height=`${u.height}px`,t.style.width=`${u.width}px`,t.style.height=`${u.height}px`},P=u=>{r.previewDisplayId=String(u||"").trim()||Ue,x()},k=u=>{r.pendingAvatarZip=u,r.pendingAvatarZipName=(u==null?void 0:u.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",I()},A=typeof ResizeObserver<"u"?new ResizeObserver(()=>x()):null;A==null||A.observe(s);let w=null;const R=()=>{const u=r.selectedPageId||"",p=r.selectedCardIndex;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(t.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=t.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&p!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${p}"]`,h=t.querySelector(c);h&&(h.dataset.editorSelectedCard="true")}},H=typeof MutationObserver<"u"?new MutationObserver(()=>R()):null;H==null||H.observe(t,{childList:!0,subtree:!0});const I=()=>{const u=r.config,p=u?q(u):[],c=p.find(y=>y.id===r.selectedPageId)||p[0]||null,h=Array.isArray(c==null?void 0:c.cards)?c.cards:[],C=r.selectedCardIndex!==null&&h[r.selectedCardIndex]||null,E=Ra(r.haEntities,r.entitySearch),D=r.focusedBinding?e.entityBindingActive(O(h[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,$e(e,r.focusedBinding.field)):e.entityBindingEmpty,$=u?Ae(u):"",Y=r.pendingAvatarZipName?e.avatarImportSelected(r.pendingAvatarZipName):e.avatarImportHint,Z=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${m(r.avatarImportStatus)}</div>`:"";g.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${m(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${m(a.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${r.saving||r.avatarPackSaving||!u?" disabled":""}>${r.saving||r.avatarPackSaving?e.saving:e.save}</button>
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
              <div class="meta">${r.avatarCatalog.length?e.avatarPackHint:e.avatarPackEmpty}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${et(e,null,$)}
                ${r.avatarCatalog.map(y=>et(e,y,$)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label for="avatar-pack-archive">${e.avatarImportSelect}</label>
                <input id="avatar-pack-archive" type="file" accept=".zip,application/zip" data-avatar-archive>
              </div>
              <div class="meta">${m(Y)}</div>
              <div class="page-chip-actions">
                <button class="scene-editor-button" type="button" data-action="import-avatar"${r.avatarImporting||!r.pendingAvatarZip||!a.avatarImportUrl?" disabled":""}>
                  ${r.avatarImporting?e.avatarImporting:e.avatarImportButton}
                </button>
              </div>
              ${Z}
            </div>
            ${$?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?ja(e,r.avatarPackDetails):`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`:`<div class="meta" style="margin-top:16px;">${e.avatarMappingEmpty}</div>`}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="cards">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(a.packId)}</div>
            </div>
            <div class="page-list">
            ${p.map((y,T)=>`
              <article class="page-chip ${y.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${m(y.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${m(y.id)}">
                  <strong>${m(y.title||y.id||`Page ${T+1}`)}</strong>
                  <span class="meta">${m(Xe(e,y.kind))} · ${m(e.pageCards(Array.isArray(y.cards)?y.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${m(y.id)}"${T===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${m(y.id)}"${T===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${m(y.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
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
              ${re(e.fieldPageId,"id",G(c,"id"),!0)}
              ${it(e.fieldKind,"kind",G(c,"kind"),ba.map(y=>({value:y,label:Xe(e,y)})))}
              ${re(e.fieldTitle,"title",G(c,"title"),!0)}
              ${re(e.fieldSubtitle,"subtitle",G(c,"subtitle"),!0)}
              ${re(e.fieldSlot,"slot",G(c,"slot"))}
              ${it(e.fieldCardStyle,"cardStyle",G(c,"cardStyle")||"full",Sa.map(y=>({value:y,label:y==="mini"?e.styleMini:e.styleFull})))}
              ${re(e.fieldStampCaption,"stampCaption",G(c,"stampCaption"))}
              ${re(e.fieldStampValue,"stampValue",G(c,"stampValue"))}
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
                  ${gt.map(y=>qa(e,y)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${h.length?h.map((y,T)=>Wa(e,y,T,h.length,T===r.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${C?Va(e,C,r.selectedCardIndex||0,r.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              ${ee(e.fieldDisplaySafeTop,"safeTop",Q(u,"safeTop"))}
              ${ee(e.fieldDisplaySafeRight,"safeRight",Q(u,"safeRight"))}
              ${ee(e.fieldDisplaySafeBottom,"safeBottom",Q(u,"safeBottom"))}
              ${ee(e.fieldDisplaySafeLeft,"safeLeft",Q(u,"safeLeft"))}
              ${ee(e.fieldDisplayPadding,"layoutPaddingPx",Q(u,"layoutPaddingPx"))}
              ${ee(e.fieldDisplayGap,"layoutGapPx",Q(u,"layoutGapPx"))}
              ${ee(e.fieldDisplayScale,"globalScale",Q(u,"globalScale"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.homeAssistant}</h2>
              <div class="meta">${m(D)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${za(e,C,r.selectedCardIndex,r.focusedBinding)}
          </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${m(r.entitySearch)}">
          </div>
          <div class="ha-list">
            ${E.length?E.map(y=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${m(y.name)}</strong>
                    <div class="meta">${m(y.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${m(y.entityId)}"${r.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${m(y.entityId)}</code>
                <div class="ha-state">${m(y.state)}${y.unit?` · ${m(y.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `;const f=g.querySelector("[data-preview-display]");f==null||f.addEventListener("change",()=>{P(f.value)}),f==null||f.addEventListener("input",()=>{P(f.value)});const M=g.querySelector("[data-avatar-archive]");M==null||M.addEventListener("change",()=>{var y;k(((y=M.files)==null?void 0:y[0])||null)});for(const y of Array.from(g.querySelectorAll(".page-chip[data-page-id]")))y.draggable=!0,y.addEventListener("dragstart",T=>{const N=String(y.dataset.pageId||"").trim();w=N?{kind:"page",pageId:N}:null,!(!w||!T.dataTransfer)&&(T.dataTransfer.effectAllowed="move",T.dataTransfer.setData("text/plain",JSON.stringify(w)))}),y.addEventListener("dragover",T=>{!w||w.kind!=="page"||(T.preventDefault(),ie(n),y.classList.add("is-drop-target"),T.dataTransfer&&(T.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",T=>{if(!w||w.kind!=="page")return;T.preventDefault();const N=String(y.dataset.pageId||"").trim();N&&me(w.pageId,N),w=null,ie(n)}),y.addEventListener("dragend",()=>{w=null,ie(n)});for(const y of Array.from(g.querySelectorAll(".card-list-item[data-card-index]")))y.draggable=!0,y.addEventListener("dragstart",T=>{const N=Number(y.dataset.cardIndex||"-1");w=Number.isFinite(N)&&N>=0?{kind:"card",cardIndex:N}:null,!(!w||!T.dataTransfer)&&(T.dataTransfer.effectAllowed="move",T.dataTransfer.setData("text/plain",JSON.stringify(w)))}),y.addEventListener("dragover",T=>{!w||w.kind!=="card"||(T.preventDefault(),ie(n),y.classList.add("is-drop-target"),T.dataTransfer&&(T.dataTransfer.dropEffect="move"))}),y.addEventListener("drop",T=>{if(!w||w.kind!=="card")return;T.preventDefault();const N=Number(y.dataset.cardIndex||"-1");Number.isFinite(N)&&N>=0&&he(w.cardIndex,N),w=null,ie(n)}),y.addEventListener("dragend",()=>{w=null,ie(n)});x(),R()},z=(u,p)=>{r.status=u,r.statusTone=p,I()},B=()=>{if(!r.config)return;const u=q(r.config);if(!u.length){r.selectedPageId=null;return}(!r.selectedPageId||!u.some(h=>h.id===r.selectedPageId))&&(r.selectedPageId=u[0].id);const p=u.find(h=>h.id===r.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(r.selectedCardIndex===null||r.selectedCardIndex>=c.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),Ta(r.selectedPageId),Aa(Ca(r.config,r.selectedPageId))},U=()=>{r.dirty=!0,z(e.statusDirty,"muted")},le=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),r.selectedPageId&&u.searchParams.set("editorPage",r.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},J=(u,p)=>{if(!r.config||!r.selectedPageId)return;const c=r.config.pages.find(h=>h.id===r.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const h=mt(r.config,p||"page"),C=c.id;c.id=h,r.config.rotation.order=r.config.rotation.order.map(E=>E===C?h:E),r.selectedPageId=h}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);U(),B()}},ae=(u,p)=>{if(!r.config)return;const c=ht(r.config),h=c.safeArea||{},C=p===""?null:Number(p),E=Number.isFinite(C)?C:null;u==="safeTop"?h.top=E??0:u==="safeRight"?h.right=E??0:u==="safeBottom"?h.bottom=E??0:u==="safeLeft"?h.left=E??0:u==="layoutPaddingPx"?c.layoutPaddingPx=E??16:u==="layoutGapPx"?c.layoutGapPx=E??16:u==="globalScale"&&(c.globalScale=E??1),c.safeArea=h,U()},ge=(u,p,c)=>{var E;if(!r.config||!r.selectedPageId)return;const h=r.config.pages.find(D=>D.id===r.selectedPageId);if(!h)return;Array.isArray(h.cards)||(h.cards=[]);const C=h.cards[u];if(C){if(p==="type"){const D=Ye(c);if(h.cards[u]={...D,caption:O(C,"caption")||D.caption},((E=r.focusedBinding)==null?void 0:E.cardIndex)===u){const $=at(c);r.focusedBinding=$?{cardIndex:u,field:$}:null}}else p==="digits"?C[p]=c===""?0:Number(c):C[p]=c;U()}},me=(u,p)=>{if(!r.config||!u||!p||u===p)return;const c=q(r.config).map(E=>E.id),h=c.indexOf(u),C=c.indexOf(p);h<0||C<0||(c.splice(h,1),c.splice(C,0,u),r.config.rotation.order=c,r.selectedPageId=u,r.selectedCardIndex=0,r.focusedBinding=null,U(),B(),I())},he=(u,p)=>{if(!r.config||!r.selectedPageId||u===p)return;const c=r.config.pages.find(C=>C.id===r.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||p<0||u>=c.cards.length||p>=c.cards.length)return;const[h]=c.cards.splice(u,1);c.cards.splice(p,0,h),r.selectedCardIndex=p,r.focusedBinding=null,U(),I()},ve=u=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const p=r.config.pages.find(C=>C.id===r.selectedPageId),c=r.haEntities.find(C=>C.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const h=p.cards[r.focusedBinding.cardIndex];h&&(Ka(h,r.focusedBinding.field,c),U(),I())},ye=(u,p)=>{r.selectedCardIndex=u,r.focusedBinding={cardIndex:u,field:p},I(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async u=>{var Y,Z;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),h=c==null?void 0:c.dataset.action;if(!h)return;if(h==="apply-display-profile"&&r.config){const f=l.value||r.previewDisplayId;Ea(r.config,Je(f)),U(),I();return}if(h==="import-avatar"){if(!r.config||!a.avatarImportUrl||!r.pendingAvatarZip||r.avatarImporting)return;r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",I();try{const f=await Ba(a.avatarImportUrl,r.pendingAvatarZip);r.avatarCatalog=a.avatarCatalogUrl?await Qe(a.avatarCatalogUrl):[f],Ze(r.config).packId=f.id,await S(f.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(f.name||f.id),r.avatarImportTone="ok",U(),I()}catch(f){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(f)}`,r.avatarImportTone="bad",I()}return}if(!r.config)return;const C=q(r.config),E=(c==null?void 0:c.dataset.pageId)||null,D=E?C.findIndex(f=>f.id===E):-1;if(h==="select-page"&&E){r.selectedPageId=E,r.selectedCardIndex=0,r.focusedBinding=null,B(),I();return}if(h==="page-up"&&D>0){const f=C.map(M=>M.id);[f[D-1],f[D]]=[f[D],f[D-1]],r.config.rotation.order=f,r.selectedPageId=E,U(),B(),I();return}if(h==="page-down"&&D>=0&&D<C.length-1){const f=C.map(M=>M.id);[f[D],f[D+1]]=[f[D+1],f[D]],r.config.rotation.order=f,r.selectedPageId=E,U(),B(),I();return}if(h==="page-remove"&&E&&C.length>1){r.config.pages=r.config.pages.filter(f=>f.id!==E),r.config.rotation.order=q(r.config).map(f=>f.id),r.selectedPageId=((Y=q(r.config)[Math.max(0,D-1)])==null?void 0:Y.id)||((Z=q(r.config)[0])==null?void 0:Z.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,U(),B(),I();return}if(h==="add-page"){const f=Pa(r.config);r.config.pages.push(f),r.config.rotation.order=q(r.config).map(M=>M.id),r.selectedPageId=f.id,r.selectedCardIndex=null,r.focusedBinding=null,U(),B(),I();return}if(h==="add-card-template"&&r.selectedPageId){const f=r.config.pages.find(y=>y.id===r.selectedPageId),M=(c==null?void 0:c.dataset.cardType)||"entity";if(f){Array.isArray(f.cards)||(f.cards=[]),f.cards.push(Ye(M));const y=f.cards.length-1;r.selectedCardIndex=y;const T=at(M);r.focusedBinding=T?{cardIndex:y,field:T}:null,U(),I(),T&&window.requestAnimationFrame(()=>{const N=n.querySelector("#ha-entity-search");N==null||N.scrollIntoView({behavior:"smooth",block:"center"}),N==null||N.focus()})}return}if(h==="focus-binding"){const f=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),M=(c==null?void 0:c.dataset.bindingField)||"";f>=0&&M&&ye(f,M);return}const $=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if($>=0&&r.selectedPageId){const f=r.config.pages.find(M=>M.id===r.selectedPageId);if(!f||!Array.isArray(f.cards))return;if(h==="select-card"){r.selectedCardIndex=$,I();return}if(h==="card-remove"){f.cards=f.cards.filter((M,y)=>y!==$),r.selectedCardIndex!==null&&(r.selectedCardIndex===$?r.selectedCardIndex=f.cards.length?Math.min($,f.cards.length-1):null:r.selectedCardIndex>$&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===$?r.focusedBinding=null:r.focusedBinding.cardIndex>$&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),U(),I();return}if(h==="card-up"&&$>0){[f.cards[$-1],f.cards[$]]=[f.cards[$],f.cards[$-1]],r.selectedCardIndex===$?r.selectedCardIndex=$-1:r.selectedCardIndex===$-1&&(r.selectedCardIndex=$),r.focusedBinding&&(r.focusedBinding.cardIndex===$?r.focusedBinding={cardIndex:$-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===$-1&&(r.focusedBinding={cardIndex:$,field:r.focusedBinding.field})),U(),I();return}if(h==="card-down"&&$<f.cards.length-1){[f.cards[$],f.cards[$+1]]=[f.cards[$+1],f.cards[$]],r.selectedCardIndex===$?r.selectedCardIndex=$+1:r.selectedCardIndex===$+1&&(r.selectedCardIndex=$),r.focusedBinding&&(r.focusedBinding.cardIndex===$?r.focusedBinding={cardIndex:$+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===$+1&&(r.focusedBinding={cardIndex:$,field:r.focusedBinding.field})),U(),I();return}}if(h==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,z(e.saving,"muted");try{if(r.avatarPackDirty&&r.avatarPackDetails&&a.avatarPackApiUrl){try{r.avatarPackDetails=await _a(a.avatarPackApiUrl,r.avatarPackDetails)}catch(f){throw new Error(`${e.avatarMappingSaveError}: ${String(f)}`)}r.avatarPackDirty=!1}r.config=await Da(a.sceneApiUrl,Be(r.config)),r.dirty=!1,r.saving=!1,r.avatarPackSaving=!1,B(),z(e.statusSaved,"ok"),window.setTimeout(()=>le(),250)}catch(f){r.saving=!1,r.avatarPackSaving=!1,z(`${e.saveError}: ${String(f)}`,"bad")}return}if(h==="bind-entity"){const f=(c==null?void 0:c.dataset.entityId)||"";ve(f)}}),n.addEventListener("input",u=>{const p=u.target;if(!p||!r.config){p&&p.dataset.previewDisplay!==void 0&&P(p.value);return}if(p.dataset.previewDisplay!==void 0){P(p.value);return}if(p.dataset.avatarSemantic!==void 0){const c=Ae(r.config);if(!r.avatarPackDetails||!c||r.avatarPackDetails.packId!==c)return;const h=p.value.trim();h?r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic]=Number(h):delete r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic],r.avatarPackDirty=!0,z(e.statusDirty,"muted"),I();return}if(p.dataset.pageField){J(p.dataset.pageField,p.value),I();return}if(p.dataset.displayField){ae(p.dataset.displayField,p.value),I();return}if(p.dataset.cardField&&p.dataset.cardIndex){r.selectedCardIndex=Number(p.dataset.cardIndex),ge(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),I();return}p.hasAttribute("data-ha-search")&&(r.entitySearch=p.value,I())}),n.addEventListener("click",u=>{var h;const p=(h=u.target)==null?void 0:h.closest("[data-action='select-avatar-pack']");if(!p||!r.config)return;const c=String(p.dataset.packId||"").trim();Ze(r.config).packId=c||null,U(),S(c||null).finally(()=>I()),I()}),t.addEventListener("click",u=>{if(!r.config)return;const p=u.target,c=p==null?void 0:p.closest("[data-scene-card-index][data-scene-page-id]");if(c){const C=String(c.dataset.scenePageId||"").trim(),E=Number(c.dataset.sceneCardIndex||"-1");C&&Number.isFinite(E)&&E>=0&&(r.selectedPageId=C,r.selectedCardIndex=E,r.focusedBinding=null,B(),I(),tt("cards"));return}const h=p==null?void 0:p.closest("[data-scene-page-id]");if(h){const C=String(h.dataset.scenePageId||"").trim();C&&(r.selectedPageId=C,r.selectedCardIndex=0,r.focusedBinding=null,B(),I(),tt("pages"));return}}),n.addEventListener("change",u=>{var c;const p=u.target;!p||p.dataset.avatarArchive===void 0||k(((c=p.files)==null?void 0:c[0])||null)}),n.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(r.selectedCardIndex=c,r.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(r.config=await Ua(a.sceneApiUrl),a.avatarCatalogUrl)try{r.avatarCatalog=await Qe(a.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=Ma(((de=lt())==null?void 0:de.states)||null),r.selectedPageId=La(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",await S(Ae(r.config)),B()}catch(u){r.status=`${e.loadError}: ${String(u)}`,r.statusTone="bad"}I()}const Ja="../scene-api/bootstrap",Ya="weather.forecast_home_assistant",Za="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Xa={...dt,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Qa={...ct,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},ei={...ut,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},ti={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},ai={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function ii(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function ri(){return new URLSearchParams(window.location.search).get("bootstrap")||Ja}function ni(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function F(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const n=ni(e);if(n)return new URL(t.slice(1),n).toString()}return new URL(t,i).toString()}function Ne(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function si(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function oi(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function Te(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function li(a,e){var t,i,n,s,o,l,g,r;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([S,x])=>[S,F(x,e)]).filter(([,S])=>!!S)),avatar:{manifestUrl:F(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:F(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((n=a.state)==null?void 0:n.provider)||"json",stateUrl:F(String(((s=a.state)==null?void 0:s.stateUrl)||"").trim(),e),haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:F(String(((l=a.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:F(String(((g=a.state)==null?void 0:g.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:F(String(((r=a.control)==null?void 0:r.controlUrl)||"").trim(),e)}}}async function di(a,e){var r,S,x,P;const t=F(String(((r=a.files)==null?void 0:r.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=F(String(((S=a.files)==null?void 0:S.sceneConfigUrl)||"").trim(),e),n=F(String(((x=a.files)==null?void 0:x.avatarCatalogUrl)||"").trim(),e);if(!i||!n)return t;let s="";try{const k=await Te(i);s=String(((P=k.avatar)==null?void 0:P.packId)||"").trim()}catch{s=""}if(!s)return t;let o="";try{const k=await Te(n),A=Array.isArray(k.items)?k.items.find(w=>String(w.id||"").trim()===s):null;o=F(String((A==null?void 0:A.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return t;const g={...li(await Te(t),t),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(g)],{type:"application/json"}))}const ue=document.getElementById("app");if(!ue)throw new Error("Missing #app root element");const ne=ai[ii()];Ne(ue,ne.startingTitle,ne.startingBody);(async()=>{var e,t,i;const a=ri();try{const n=await oi(a),s=String(n.packId||"").trim(),o=s.toLowerCase()==="neiri",l=await di(n,a);if(!l){Ne(ue,ne.missingRendererTitle,ne.missingRendererBody,JSON.stringify(n,null,2));return}document.documentElement.dataset.packId=s,document.title=o?"Нейри":s?`kiosk-scene hosted runtime (${s})`:"kiosk-scene hosted runtime",await ya(ue,{rendererConfigUrl:l,weatherUrl:o?"./weather.json":void 0,weatherReader:o?ha({weatherEntity:Ya,openMeteoUrl:Za,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:o?Xa:void 0,labels:o?Qa:void 0,presetLabels:o?ei:void 0,defaultWeather:o?ti:void 0}),si()&&await Ga({packId:s,sceneApiUrl:F(String(n.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:F(String(((e=n.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),avatarImportUrl:F(String(((t=n.files)==null?void 0:t.avatarImportUrl)||"").trim(),a),avatarPackApiUrl:F(String(((i=n.files)==null?void 0:i.avatarPackApiUrl)||"").trim(),a),sceneUrl:F(String(n.entryUrl||n.runtimeBaseUrl||"./").trim(),a)})}catch(n){Ne(ue,ne.failedTitle,ne.failedBody,String(n))}})();
