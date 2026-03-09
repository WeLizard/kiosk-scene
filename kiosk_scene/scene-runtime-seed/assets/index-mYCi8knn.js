var ct=Object.defineProperty;var ut=(a,e,t)=>e in a?ct(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var g=(a,e,t)=>ut(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();function P(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function d(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Le(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function de(a,e){if(!P(a)||!P(e))return e??a;const t={...a};for(const[i,r]of Object.entries(e)){if(Array.isArray(r)){t[i]=r.slice();continue}if(P(r)&&P(t[i])){t[i]=de(t[i],r);continue}t[i]=r}return t}function pt(a,e=40){return Array.isArray(a)?a.map(t=>d(t,e).toLowerCase()).filter(Boolean):[]}const Z={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},De={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function xe(a){var t,i,r,n,o,l,f,s,$,I;const e=de(Z,P(a)?a:{});return{version:1,assistant:{name:d((t=e.assistant)==null?void 0:t.name,40)||Z.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:P(e.links)?Object.fromEntries(Object.entries(e.links).map(([w,S])=>[d(w,64),d(S,1024)]).filter(([w,S])=>w&&S)):{},avatar:{manifestUrl:d((r=e.avatar)==null?void 0:r.manifestUrl,1024)||Z.avatar.manifestUrl},scene:{configUrl:d((n=e.scene)==null?void 0:n.configUrl,1024)||Z.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||Z.state.stateUrl,haApiFallback:((f=e.state)==null?void 0:f.haApiFallback)===!0,idleLinesUrl:d((s=e.state)==null?void 0:s.idleLinesUrl,1024)||Z.state.idleLinesUrl,entityMapUrl:d(($=e.state)==null?void 0:$.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d((I=e.control)==null?void 0:I.controlUrl,1024)||Z.control.controlUrl}}}function Ke(a){var t,i,r,n,o;const e=de(De,P(a)?a:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||De.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:P(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,f])=>[d(l,32),d(f,1024)]).filter(([l,f])=>l&&f)):{},viewPresets:P(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,f])=>d(l,32)&&P(f))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((r=e.capabilities)==null?void 0:r.supportsViewPresets)!==!1,supportsLipSync:((n=e.capabilities)==null?void 0:n.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const ee={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},ft=["full","torso","head"];function le(a,e=Date.now()){var l,f,s,$,I,w,S;const t=de(ee,P(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((l=t.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((f=t.page)==null?void 0:f.target,40)||null,until:d((s=t.page)==null?void 0:s.until,64)||null},cue:{cue:d(($=t.cue)==null?void 0:$.cue,32)||null,emotion:d((I=t.cue)==null?void 0:I.emotion,32)||null,motion:d((w=t.cue)==null?void 0:w.motion,32)||null,until:d((S=t.cue)==null?void 0:S.until,64)||null}},r=d(t.viewPreset,16).toLowerCase();i.viewPreset=ft.includes(r)?r:null;const n=Le(i.page.until);i.page.mode==="pinned"&&(!n||n<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=Le(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function ge(a,e,t=Date.now()){return le(de(le(a,t),P(e)?e:{}),t)}function ht(a,e,t=Date.now()){return le({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function mt(a,e,t=3e4,i=Date.now()){const r=d(e,40),n=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return le({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:r?"pinned":"auto",target:r||null,until:r?n:null}},i)}function Ye(a,e){var o,l,f;const t={...a||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),r=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),n=d((f=e==null?void 0:e.cue)==null?void 0:f.motion,32);return i&&(t.cue=i),r&&(t.emotion=r),n&&(t.motion=n),t}function _(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function Re(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function gt(a){return P(a)&&P(a.config)?a.config:a}function vt(a,e){const t={...a};return P(e)&&(typeof e.id=="string"&&(t.id=d(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>P(i)))),t}function ve(a,e){const t=gt(a),i=Array.isArray(e.pages)?e.pages.slice():[],r=P(t)&&Array.isArray(t.pages)?t.pages:[],n=i.map(S=>{const k=r.find(x=>d(P(x)?x.id:"",40)===S.id);return vt(S,k)}),o=P(t)&&P(t.rotation)?t.rotation:{},l=P(e.display)?e.display:{},f=P(t)&&P(t.display)?t.display:{},s=P(l.safeArea)?l.safeArea:{},$=P(f.safeArea)?f.safeArea:{},I=Array.isArray(o.order)?o.order:e.rotation.order,w=pt(I).filter((S,k,x)=>n.some(L=>L.id===S)&&x.indexOf(S)===k);return{version:1,rotation:{order:w.length?w:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:_($.top,_(s.top,0)),right:_($.right,_(s.right,0)),bottom:_($.bottom,_(s.bottom,0)),left:_($.left,_(s.left,0))},layoutPaddingPx:_(f.layoutPaddingPx,_(l.layoutPaddingPx,16)),layoutGapPx:_(f.layoutGapPx,_(l.layoutGapPx,16)),globalScale:Re(f.globalScale,Re(l.globalScale,1))},pages:n}}function yt(a,e=220){const t=d(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},r=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(n,o,l)=>{const f=d(o,16).toLowerCase(),s=d(l,32).toLowerCase();return(f==="emotion"||f==="activity"||f==="cue"||f==="motion")&&s&&(i[f]=s)," "});return{text:d(r,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const bt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function se(a,e={}){const t=P(a)?a:{},i={...bt,...e};return{version:1,assistant:d(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:d(t.status??i.status,255),message:d(t.message??i.message,255),source:d(t.source??i.source,64),updatedAt:d(t.updatedAt??i.updatedAt,64),emotion:d(t.emotion??i.emotion,32)||null,activity:d(t.activity??i.activity,32)||null,cue:d(t.cue??i.cue,32)||null,intensity:wt(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:d(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:d(t.event??i.event,64)}}function wt(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function xt(a,e){return a.order[e]||a.order[0]||""}function St(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function Ct(a,e,t,i){const r=Array.isArray(a.order)?a.order:[];if(!r.length)return 0;const n=Math.max(0,Math.min(e,r.length-1));for(let o=1;o<=r.length;o+=1){const l=(n+o*t+r.length)%r.length;if(i(r[l]))return l}return n}function $t(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const r=a.control.page;if(r.mode==="pinned"&&r.target)return{nextIndex:St(a.rotation,r.target),nextAutoRotateAt:e,pinnedKey:`${r.target}:${r.until||""}`};if(a.force){const o=xt(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(o)?a.activeIndex:Math.max(0,t.findIndex(f=>a.isEligible(f))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let n=a.activeIndex;for(let o=1;o<=t.length;o+=1){const l=(a.activeIndex+o)%t.length;if(a.isEligible(t[l])){n=l;break}}return{nextIndex:n,nextAutoRotateAt:e,pinnedKey:""}}const Je={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},It=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function Ne(a){const e=d(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:It.some(t=>e.includes(t)):!1}function kt(a,e){const t=se(a),i=d(t.status,72),r=d(t.message,220);if(!(t.online!==!1&&(Ne(i)||Ne(r))))return{state:t,hasTechnicalFailure:!1};const l=d(t.emotion,32).toLowerCase(),f=d(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(t.activity,32).toLowerCase()==="error"?"idle":d(t.activity,32)||null,cue:d(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:f==="error"?"idle_soft":f||null},hasTechnicalFailure:!0}}function Et(a,e){const t=(e==null?void 0:e.copy)??Je,i=se(a),r=yt(i.message,220),n=kt({...i,message:r.text,emotion:d(i.emotion,32)||r.emotion||null,activity:d(i.activity,32)||r.activity||null,cue:d(i.cue,32)||r.cue||null,motion:d(i.motion,32)||r.motion||null},{healthyStatus:t.technicalHealthyLabel}),o=n.state,l=d(o.message,180),f=d(o.activity,32).toLowerCase(),s=o.online!==!1&&f!=="offline",$=!!o.busy||f==="thinking"||f==="busy"||f==="acting",I=o.speaking===!0||f==="speaking",w=s?$?t.busyLabel:l||I?t.speakingLabel:n.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,S=l?t.messageCaption:n.hasTechnicalFailure?t.statusCaption:t.modeCaption,k=l||(s?$?t.busyBody:d(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:o,hasTechnicalFailure:n.hasTechnicalFailure,caption:S,label:w,body:k,bodyKey:[S,w,k].join(":")}}function Pt(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function Be(a,e=-1){const t=Array.isArray(a)?a.map(r=>d(r,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function At(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!d(a==null?void 0:a.message,180);return e&&!t&&!i}const Tt={cue:null,emotion:null,motion:null,until:null},Ut={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Lt(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function Ze(a){return a.endsWith("/")?a:`${a}/`}function ce(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(Ze(d(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function pe(a){const e=d(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function Dt(a,e,t){const i=d(a.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?pe(i):new URL("../avatar.html",new URL(Ze(d(t,1024)||"."),window.location.href)).toString()}function Rt(a,e){const t=d(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function Nt(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[r,n]of Object.entries(i)){const o=d(r,64);if(!o||n==null)continue;const l=typeof n=="boolean"?n?"1":"0":String(n);t.searchParams.set(o,l)}return t.toString()}function Bt(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([r,n])=>[d(r,32),ce(t,n)]).filter(([r,n])=>r&&n));return{version:1,assistant:{name:d(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([r,n])=>[d(r,64),pe(n)]).filter(([r,n])=>r&&n)),state:{stateUrl:pe(a.state.stateUrl),idleLinesUrl:pe(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:ce(t,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:ce(t,e.fallbackPortrait||""),motionMapUrl:ce(t,e.motionMapUrl||""),presetThumbs:i}}}class Ft{constructor(e={}){g(this,"id","live2d");g(this,"options");g(this,"manifest");g(this,"rendererConfig");g(this,"host",null);g(this,"containerEl",null);g(this,"iframeEl",null);g(this,"splashEl",null);g(this,"splashTextEl",null);g(this,"assetRoot","");g(this,"currentState");g(this,"currentCue",{...Tt});g(this,"currentPreset","full");g(this,"currentBubble",{...Ut});g(this,"targetOrigin","*");g(this,"isReady",!1);g(this,"bubbleRevision",0);g(this,"handleWindowMessage",e=>{var r;const t=(r=this.iframeEl)==null?void 0:r.contentWindow;if(!t||e.source!==t||!Lt(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Ke({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=xe(e.rendererConfig||{}),this.currentState=se({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const t=Dt(this.options,this.manifest,this.assetRoot),i=Nt(t,this.options);this.targetOrigin=Rt(i,this.options.targetOrigin);const r=document.createElement("div");r.className="ks-live2d-frame",Object.assign(r.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const n=document.createElement("iframe");n.className="ks-live2d-iframe",n.src=i,n.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,n.loading="eager",n.allow="autoplay",Object.assign(n.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&n.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);r.append(n,o),this.host.append(r),n.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=r,this.iframeEl=n,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=se(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const r=document.createElement("div");r.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(r.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const n=document.createElement("div");return n.dataset.live2dSplashText="true",n.textContent="Loading compatibility renderer...",Object.assign(n.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(r,n),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Bt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=Ye(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function Mt(a={}){return new Ft(a)}const _t={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Fe={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Ot{constructor(e={}){g(this,"id","static");g(this,"options");g(this,"host",null);g(this,"frameEl",null);g(this,"imageEl",null);g(this,"bubbleEl",null);g(this,"fallbackEl",null);g(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const r=document.createElement("div");r.className="ks-static-avatar-fallback",r.textContent=this.options.alt||"Avatar",Object.assign(r.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const n=document.createElement("div");n.className="ks-static-avatar-bubble",Object.assign(n.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,r,n),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=n,this.fallbackEl=r;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||Fe,i=t[e]||t.full||Fe.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return _t}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");return i?`${i}/${r}`:r}}function Ht(a={}){return new Ot(a)}function jt(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function Xe(){var a;for(const e of jt())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function zt(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function Vt(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=d(t.entity_id,255);i&&(e[i]=t)}return e}function Wt(a,e,t="Assistant"){const i=a[e.status],r=a[e.message],n=a[e.online],o=a[e.busy],l=a[e.source],f=a[e.updatedAt],s=e.emotion?a[e.emotion]:null,$=e.activity?a[e.activity]:null,I=e.cue?a[e.cue]:null,w=e.speaking?a[e.speaking]:null,S=e.intensity?a[e.intensity]:null,k=e.motion?a[e.motion]:null,x=a[e.revision];if(!i&&!r&&!n&&!o)return null;const L=d(i==null?void 0:i.state,72),M=d(r==null?void 0:r.state,220),j=d(f==null?void 0:f.state,64),q=ye(n,!0),G=ye(o,!1),K=d($==null?void 0:$.state,32)||"",u=ye(w)??K==="speaking",p=K||(q?u?"speaking":G?"thinking":"idle":"offline");return se({version:1,assistant:d(t,40)||"Assistant",online:q,busy:G,status:L&&L!=="unknown"&&L!=="unavailable"?L:"",message:M&&M!=="unknown"&&M!=="unavailable"?M:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:j&&j!=="unknown"&&j!=="unavailable"?j:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(s==null?void 0:s.state,32)||null,activity:p,cue:d(I==null?void 0:I.state,32)||null,intensity:qt(S),speaking:u,motion:d(k==null?void 0:k.state,32)||null,revision:Number(x==null?void 0:x.state)||0})}function ye(a,e){const t=d(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function qt(a){const e=d(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function Gt(a){const e=Ie(a);return{id:"ha-state",async read(){const t=await e.read();return t?Wt(t,a.entityMap,a.assistantName):null}}}function Ie(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let r=null,n=0,o=null,l=0;async function f(){var w;const s=Xe();if(s!=null&&s.states)return s.states;const $=Date.now();if(r&&$-n<t||!a.allowApiFallback||typeof e!="function"||$<l)return r;if(o)return o;const I=d(((w=a.readToken)==null?void 0:w.call(a))??zt(),4096);return I?(o=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${I}`}}).then(async S=>{if(!S.ok){const k=new Error(`HA states HTTP ${S.status}`);throw k.status=S.status,k}return S.json()}).then(S=>{const k=Vt(S);return k&&(r=k,n=Date.now()),k||r}).catch(S=>(((S==null?void 0:S.status)===401||(S==null?void 0:S.status)===403)&&(l=Date.now()+i),r)).finally(()=>{o=null}),o):r}return{id:"ha-states",async read(){return f()}}}async function ke(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=d(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const r=await e(i.toString(),{cache:"no-store"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const n=await r.json();return a.sanitize?a.sanitize(n):n}catch(r){if(a.defaultValue!==void 0)return a.defaultValue;throw r}}function Kt(a){return{id:"json-state",async read(){const e=await ke({...a,defaultValue:a.defaultValue});return se(e)}}}function Me(a){return{id:"json-control",async read(){const e=await ke({...a,defaultValue:a.defaultValue??ee});return le(e)}}}function Yt(a){return{id:"json-lines",async read(){const e=await ke({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>d(t,220)).filter(Boolean):[]}}}function R(a,e,t=64){return d(a[e],t)}function ne(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Jt(a,e="en-US"){const t=d(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ue(a,e){return!a||!e?null:a[e]||null}function Zt(a,e=null,t="en-US"){var I,w,S,k;const i=R(a,"caption",40)||R(a,"type",24)||"Card",r=R(a,"hint",72),n=R(a,"type",32).toLowerCase()||"entity",o=R(a,"entity",255),l=ue(e,o),f=ue(e,R(a,"stateEntity",255)),s=ue(e,R(a,"downEntity",255)),$=ue(e,R(a,"upEntity",255));if(n==="text"||n==="static"||n==="note")return{caption:i,value:R(a,"value",64)||"—",hint:r||"static card"};if(n==="todo"){const x=Number(l==null?void 0:l.state);return!Number.isFinite(x)||x<=0?{caption:i,value:"Clear",hint:r||"nothing pending"}:{caption:i,value:`${x} item${x===1?"":"s"}`,hint:r||"pending tasks"}}if(n==="onoff"){const x=(l==null?void 0:l.state)==="on";return{caption:i,value:x?R(a,"onText",48)||"On":R(a,"offText",48)||"Off",hint:r||"device state"}}if(n==="battery"){const x=ne(l==null?void 0:l.state,0);return{caption:i,value:x?`${x}%`:"—",hint:d(f==null?void 0:f.state,48)||r||"battery level"}}if(n==="network"){const x=ne(s==null?void 0:s.state,0),L=ne($==null?void 0:$.state,0);return{caption:i,value:x||L?`↓ ${x||"0"} · ↑ ${L||"0"}`:"—",hint:r||"throughput"}}if(n==="time")return{caption:i,value:Jt(l==null?void 0:l.state,t)||"—",hint:r||"next event"};if(n==="percent"){const x=ne(l==null?void 0:l.state,Number(R(a,"digits",4))||0);return{caption:i,value:x?`${x}%`:"—",hint:r||d((I=l==null?void 0:l.attributes)==null?void 0:I.friendly_name,48)||"state percentage"}}if(n==="number"){const x=Number(R(a,"digits",4))||0,L=ne(l==null?void 0:l.state,x),M=R(a,"unit",16)||d((w=l==null?void 0:l.attributes)==null?void 0:w.unit_of_measurement,16);return{caption:i,value:L?`${L}${M?` ${M}`:""}`:"—",hint:r||d((S=l==null?void 0:l.attributes)==null?void 0:S.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||R(a,"value",64)||"—",hint:r||d((k=l==null?void 0:l.attributes)==null?void 0:k.friendly_name,48)||"entity state"}}function Xt(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>Zt(i,e,t)):[]}const Qe={...Je,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},et={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},tt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Qt={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},fe={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function m(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function at(a){return a.endsWith("/")?a:`${a}/`}function O(a,e){const t=d(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function it(a){return new URL(".",a).toString()}function ea(a,e){const t=it(e),i=O(t,d(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:O(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([r,n])=>[r,O(t,n)]).filter(([,r])=>!!r))}}function be(a){return{...fe,...a||{},metrics:{...fe.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):fe.forecast.map(e=>({...e}))}}function _e(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function F(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function ta(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${F(t)} мм рт. ст.`:`${F(t*.750061683,0)} мм рт. ст.`}function aa(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${F(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${F(t/3.6,1)} м/с`:`${F(t,1)} м/с`}function ia(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ra(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function sa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function na(a,e="ru-RU"){const t=d(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||d(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function Oe(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function oa(a,e="./assets/icons"){const t=Number(a),i=at(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function la(a){const e=d(a.locale,32)||"ru-RU",t=d(a.iconBaseUrl,1024)||"./assets/icons",i=Ie({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var k,x,L,M,j,q,G,K,te,u,p,c,b,A,E,T,C,D,Y,h;const r=await i.read(),n=a.fetchImpl??globalThis.fetch,o=r==null?void 0:r[a.weatherEntity];let l=null;const f=d(a.openMeteoUrl,4096);if(f&&typeof n=="function")try{const v=await n(`${f}${f.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});v.ok&&(l=await v.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const s=d(o==null?void 0:o.last_changed,64)||d((k=l==null?void 0:l.current)==null?void 0:k.time,64)||new Date().toISOString(),$=o?na(o.state,e):Oe((x=l==null?void 0:l.current)==null?void 0:x.weather_code,e),I=Array.isArray((L=l==null?void 0:l.daily)==null?void 0:L.time)?l.daily.time.map((v,U)=>{var z,Pe,Ae,Te,Ue;const J=new Date(`${v}T12:00:00+03:00`);return{name:J.toLocaleDateString(e,{weekday:"short"}),dayNumber:J.toLocaleDateString(e,{day:"numeric"}),monthShort:J.toLocaleDateString(e,{month:"short"}),note:d(Oe((z=l.daily.weather_code)==null?void 0:z[U],e),28),max:`${F((Pe=l.daily.temperature_2m_max)==null?void 0:Pe[U])}°`,min:`${F((Ae=l.daily.temperature_2m_min)==null?void 0:Ae[U])}° · ${F((Te=l.daily.precipitation_probability_max)==null?void 0:Te[U])}%`,icon:oa((Ue=l.daily.weather_code)==null?void 0:Ue[U],t)}}):[],w=I[0]||null,S=I.slice(1,6);return{todayValue:ra(s,e),todayLabel:sa(s,e),updatedAt:ia(s,e),temperature:F(((M=o==null?void 0:o.attributes)==null?void 0:M.temperature)??((j=l==null?void 0:l.current)==null?void 0:j.temperature_2m),1),condition:$,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${F(((q=o==null?void 0:o.attributes)==null?void 0:q.apparent_temperature)??((G=l==null?void 0:l.current)==null?void 0:G.apparent_temperature)??((K=o==null?void 0:o.attributes)==null?void 0:K.temperature),1)}°C`,badgeSummary:$,badgeRange:w?`${w.max} / ${F((u=(te=l==null?void 0:l.daily)==null?void 0:te.temperature_2m_min)==null?void 0:u[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${F(((p=o==null?void 0:o.attributes)==null?void 0:p.humidity)??((c=l==null?void 0:l.current)==null?void 0:c.relative_humidity_2m))}%`,pressure:ta(((b=o==null?void 0:o.attributes)==null?void 0:b.pressure)??((A=l==null?void 0:l.current)==null?void 0:A.surface_pressure),((E=o==null?void 0:o.attributes)==null?void 0:E.pressure_unit)??"hPa"),wind:aa(((T=o==null?void 0:o.attributes)==null?void 0:T.wind_speed)??((C=l==null?void 0:l.current)==null?void 0:C.wind_speed_10m),((D=o==null?void 0:o.attributes)==null?void 0:D.wind_speed_unit)??"km/h"),clouds:`${F(((Y=o==null?void 0:o.attributes)==null?void 0:Y.cloud_coverage)??((h=l==null?void 0:l.current)==null?void 0:h.cloud_cover))}%`},forecast:S}}}class da{constructor(e,t={}){g(this,"root");g(this,"options");g(this,"avatarMountEl");g(this,"carouselShellEl");g(this,"carouselTrackEl");g(this,"dotsEl");g(this,"presetButtons");g(this,"copy");g(this,"labels");g(this,"presetLabels");g(this,"rendererConfig");g(this,"avatarManifest");g(this,"sceneConfig");g(this,"entityMap",null);g(this,"weatherData");g(this,"hassStates",null);g(this,"currentState");g(this,"remoteControl",ee);g(this,"uiControl",ee);g(this,"currentControl",ee);g(this,"idleLines",[]);g(this,"activeIndex",0);g(this,"lastAutoRotateAt",0);g(this,"currentIdleLine","");g(this,"lastIdleIndex",-1);g(this,"currentPreset","full");g(this,"idleTimer",null);g(this,"avatarAdapter",null);g(this,"refreshIntervalHandle",null);g(this,"orderedPages",[]);g(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...Qe,...t.copy||{}},this.labels={...et,...t.labels||{}},this.presetLabels={...tt,...t.presetLabels||{}},this.weatherData=be(t.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="Avatar view presets">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${m(this.presetLabels.full)}" aria-label="${m(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${m(this.presetLabels.torso)}" aria-label="${m(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${m(this.presetLabels.head)}" aria-label="${m(this.presetLabels.head)}">
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=O(window.location.href,this.getRendererConfigUrl()),t=it(e),i=xe(await this.readJson(e)),r=xe({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,O(t,l)])),avatar:{...i.avatar,manifestUrl:O(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:O(t,i.scene.configUrl)},state:{...i.state,stateUrl:O(t,i.state.stateUrl),idleLinesUrl:O(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?O(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:O(t,i.control.controlUrl)}});this.rendererConfig=r;const n=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=ea(Ke(await this.readJson(n)),n),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await Yt({url:this.rendererConfig.state.idleLinesUrl||O(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Me({url:this.rendererConfig.control.controlUrl,defaultValue:ee}).read(),this.currentControl=ge(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=ht(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,r;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(r=(i=this.carouselShellEl).setPointerCapture)==null||r.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:r}=this.carouselDragState,n=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(r)>=n*.16,l=r<0?1:-1;if(this.clearDragState(t.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Me({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=ge(ee,this.uiControl),this.currentControl=ge(this.remoteControl,this.uiControl);const e=Ye(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=Et(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=ve(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const r=this.getOrderedPages(i.pages,i.rotation.order),n=$t({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>r.some(l=>l.id===o)});if(this.activeIndex=n.nextIndex,this.lastAutoRotateAt=n.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(r,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,r)=>i.kind==="overview"?this.renderOverviewSlide(t,r):this.renderDynamicSlide(i,r,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,r)=>`
      <button
        class="carousel-dot ${r===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${r}"
        aria-label="${m(d(i.title,40)||`Page ${r+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t){const i=d(this.rendererConfig.assistant.name,40)||"Assistant",r=this.weatherData||fe,n=r.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="weather" data-slide-order="${t}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${m(r.title)}</h1>
              <p class="subline">${m(r.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${m(r.todayCaption)}</span>
                <span class="value">${m(r.todayValue)}</span>
                <span class="meta">${m(r.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${m(r.updatedCaption)}</span>
                <span class="value">${m(r.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${m(r.temperature)}</span>
                <span class="unit">°${m(r.unit)}</span>
              </div>
              <div class="condition">${m(r.condition)}</div>
              <div class="feels">${m(r.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${m(this.resolveIconUrl("thermometer"))}" alt=""><span>${m(r.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${m(this.resolveIconUrl("calendarDays"))}" alt=""><span>${m(r.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${m(e.caption)}</strong>
                  <div class="neiri-label">${m(e.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${m(this.resolveIconUrl("sparkles"))}" alt="${m(i)}"></div>
              </div>
              <div class="neiri-meta">${m(e.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${m(this.labels.humidity)}</span><i><img src="${m(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${m(r.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${m(this.labels.pressure)}</span><i><img src="${m(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${m(r.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${m(this.labels.wind)}</span><i><img src="${m(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${m(r.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${m(this.labels.clouds)}</span><i><img src="${m(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${m(r.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${m(r.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${n}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,t,i){const r=Xt(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),n=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?n:`${t+1} / ${i}`),f=e.cardStyle==="mini"?r.map(I=>`
          <article class="mini-card">
            <span class="caption">${m(I.caption)}</span>
            <strong>${m(I.value)}</strong>
          </article>
        `).join(""):r.map(I=>`
          <article class="home-card">
            <span class="caption">${m(I.caption)}</span>
            <strong>${m(I.value)}</strong>
            <small>${m(I.hint)}</small>
          </article>
        `).join(""),s=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(I=>this.renderForecastDay(I)).join("")}</div>`:"",$=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
      <section class="slide slide-dynamic" data-slide-id="${m(e.id)}" data-slide-order="${t}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${m(e.kind)}" data-dynamic-card-style="${m(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${m(d(e.title,64)||"Scene")}</h1>
              <p class="subline">${m(d(e.subtitle,140)||"Configured by scene.json")}</p>
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${m(o)}</span>
              <span class="value">${m(l)}</span>
            </div>
          </div>
          ${s}
          <div class="${$}">
            ${f||`<div class="empty">${m(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `}renderForecastDay(e){return`
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${m(e.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${m(e.name)}</span>
            <span class="meta"><span class="day-number">${m(e.dayNumber)}</span><span class="day-month">${m(e.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${m(e.max)}</strong>
          <small>${m(e.min)}</small>
        </div>
        <div class="day-note">${m(e.note)}</div>
      </article>
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],i=e[e.length-1];return`${d(t.dayNumber,4)} ${d(t.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var r;const t=d((r=this.options.iconUrls)==null?void 0:r[e],1024);return t||`${at(d(this.options.iconBaseUrl,1024)||"./assets")}${Qt[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:r,globalScale:n}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${r}px`),this.root.style.setProperty("--scene-global-scale",String(n))}getOrderedPages(e,t){const i=t.map(n=>e.find(o=>o.id===n)).filter(Boolean),r=e.filter(n=>!i.some(o=>o.id===n.id));return i.concat(r)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,r;!t&&((r=(i=this.carouselShellEl).hasPointerCapture)!=null&&r.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=ve(this.sceneConfig,this.sceneConfig),i=Ct(t.rotation,this.activeIndex,e,r=>this.orderedPages.some(n=>n.id===r));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const r=ve(this.sceneConfig,this.sceneConfig),n=Math.max(18e3,r.rotation.defaultDwellMs*2);this.uiControl=mt(this.uiControl,i.id,n),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!At(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=Be(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=Be(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},Pt(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>Kt({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await Gt({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:Ie({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=_e(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=_e(e,t)}catch{}try{return be(e)}catch{return be(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Mt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Ht({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",r=t.querySelector("[data-preset-thumb]"),n=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),r&&(n?(r.src=n,r.removeAttribute("hidden")):(r.src="",r.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function ca(a,e={}){const t=new da(a,e);return await t.init(),t}const ua=["overview","cards","forecast+cards"],pa=["full","mini"],rt=["entity","text","todo","onoff","battery","network","time","percent","number"],V=["caption","hint"],fa={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},ha={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается честный 1:1 viewport выбранного экрана. Если не влезает по ширине, страница просто прокручивается.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Подставить в настройки экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Выбор Live2D-модели для текущего instance-pack. Применяется после сохранения и перезагрузки превью.",avatarPack:"Набор аватара",avatarPackCurrent:"Текущий avatar.manifest.json instance-pack",avatarPackHint:"Другие модели лежат отдельно в /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"В каталоге avatar-packs пока нет отдельных моделей.",avatarPackAppliedAfterSave:"Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",avatarImport:"Импорт аватара",avatarImportHint:"Загрузи zip-архив с Live2D-моделью. Kiosk Scene сам распакует его в avatar-packs, найдёт model3.json и создаст draft motion-map.",avatarImportSelect:"ZIP архив аватара",avatarImportSelected:a=>`Выбран архив: ${a}`,avatarImportButton:"Импортировать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:a=>`Импортирован avatar-pack: ${a}`,avatarImportError:"Не удалось импортировать avatar-pack",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardsSubtitle:"Сначала выбери или добавь карточку, затем настрой её ниже. Порядок здесь же влияет на правую карусель.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку из шаблона выше или выбери существующую карточку из списка.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingActive:(a,e)=>`Сейчас связываем: ${a} → ${e}`,noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage renders a true 1:1 viewport of the selected screen. If it does not fit, the editor page simply scrolls.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Fill display settings below",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the Live2D model for this instance-pack. It applies after save and preview reload.",avatarPack:"Avatar pack",avatarPackCurrent:"Use the instance-pack avatar.manifest.json",avatarPackHint:"Additional models live in /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"No separate avatar packs are available yet.",avatarPackAppliedAfterSave:"The selected avatar pack will apply after saving and reloading the preview.",avatarImport:"Import avatar",avatarImportHint:"Upload a Live2D zip archive. Kiosk Scene will unpack it into avatar-packs, detect model3.json and create a draft motion map.",avatarImportSelect:"Avatar ZIP archive",avatarImportSelected:a=>`Selected archive: ${a}`,avatarImportButton:"Import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:a=>`Imported avatar pack: ${a}`,avatarImportError:"Failed to import avatar pack",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardsSubtitle:"Add or choose a card first, then edit it below. The order here drives the right-hand carousel.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card from the templates above or choose an existing one from the list.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingActive:(a,e)=>`Binding now: ${a} → ${e}`,noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},he=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],me="mellow-fly-7";function Se(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function He(a){return he.find(e=>e.id===a)||he.find(e=>e.id===me)||he[0]}function ma(a){return`${a.width} × ${a.height}`}function y(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ee(a){return JSON.parse(JSON.stringify(a))}function H(a){const e=new Map(a.pages.map(r=>[r.id,r])),t=a.rotation.order.map(r=>e.get(r)).filter(Boolean),i=a.pages.filter(r=>!t.some(n=>n.id===r.id));return[...t,...i]}function ga(a,e){return e?Math.max(0,H(a).findIndex(t=>t.id===e)):0}function va(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function st(a,e){const t=va(e);let i=t,r=2;for(;a.pages.some(n=>n.id===i);)i=`${t}-${r}`,r+=1;return i}function ya(a){const e=a.pages.length+1;return{id:st(a,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function je(a){switch(a){case"text":return{type:a,caption:"Text",value:"—",hint:""};case"todo":return{type:a,caption:"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:a,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:"Time",entity:"",hint:""};case"percent":return{type:a,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function B(a,e){const t=a[e];return t==null?"":String(t)}function W(a,e){const t=a[e];return t==null?"":String(t)}function X(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function nt(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function ba(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function ze(a){return a.avatar||(a.avatar={}),a.avatar}function wa(a,e){const t=nt(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function xa(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function Sa(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Ca(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&H(a).some(r=>r.id===t)?t:((i=H(a)[0])==null?void 0:i.id)||null}async function $a(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return Ee(t.config)}async function Ia(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return Ee(i.config)}function ot(a){switch(a){case"text":return[...V,"value"];case"todo":return[...V,"entity"];case"onoff":return[...V,"entity","onText","offText"];case"battery":return[...V,"entity","stateEntity"];case"network":return[...V,"downEntity","upEntity"];case"time":return[...V,"entity"];case"percent":return[...V,"entity","digits"];case"number":return[...V,"entity","digits","unit"];default:return[...V,"entity"]}}function Ve(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function re(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function lt(a){const e=Se();return fa[e][a]||""}function Ce(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function ka(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),r=a.includes(".")&&a.split(".",1)[0]||"other",n=String(e.state||""),o=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:r,state:n,unit:o}}function Ea(a){return a?Object.entries(a).map(([e,t])=>ka(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function Pa(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function We(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(r=>({id:String(r.id||"").trim(),name:String(r.name||r.id||"").trim(),manifestUrl:String(r.manifestUrl||"").trim(),previewUrl:String(r.previewUrl||"").trim()})).filter(r=>r.id&&r.manifestUrl):[]}async function Aa(a,e){const t=String(a||"").trim();if(!t)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const r=await fetch(t,{method:"POST",body:i}),n=await r.json();if(!r.ok||n.success===!1||!n.item)throw new Error(String(n.error||`HTTP ${r.status}`));return{id:String(n.item.id||"").trim(),name:String(n.item.name||n.item.id||"").trim(),manifestUrl:String(n.item.manifestUrl||"").trim(),previewUrl:String(n.item.previewUrl||"").trim()}}function dt(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function qe(a){return ot(a).find(e=>dt(e))||null}function ae(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${y(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${y(e)}" value="${y(t)}">
    </div>
  `}function Q(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${y(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${y(e)}" value="${y(t)}">
    </div>
  `}function Ge(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${y(a)}</label>
      <select id="page-select-${e}" data-page-field="${y(e)}">
        ${i.map(r=>`<option value="${y(r.value)}"${r.value===t?" selected":""}>${y(r.label)}</option>`).join("")}
      </select>
    </div>
  `}function Ta(a,e,t,i){const r=B(e,"type")||"entity",n=ot(r);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${y(B(e,"caption")||re(a,r))}</strong>
          <div class="meta">${y(re(a,r))}</div>
        </div>
        <div class="meta">#${t+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${y(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${rt.map(o=>`<option value="${o}"${o===r?" selected":""}>${y(re(a,o))}</option>`).join("")}
          </select>
        </div>
        ${n.map(o=>{const l=dt(o),f=l&&(i==null?void 0:i.cardIndex)===t&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${f?" is-active":""}">
                <label>${y(Ce(a,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${y(o)}"
                    data-binding-field="${y(o)}"
                    value="${y(B(e,o))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${t}"
                    data-binding-field="${y(o)}"
                  >${a.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${o==="hint"?"is-wide":""}">
              <label>${y(Ce(a,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${y(o)}"
                value="${y(B(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Ua(a,e,t,i,r){const n=B(e,"type")||"entity",o=B(e,"caption")||re(a,n),l=B(e,"entity")||B(e,"stateEntity")||B(e,"downEntity")||B(e,"upEntity")||B(e,"value")||B(e,"hint")||lt(n);return`
    <article class="card-list-item${r?" is-active":""}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${t}">
        <strong>${y(o)}</strong>
        <span class="meta">${y(re(a,n))}</span>
        <div class="meta">${y(l)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
      </div>
    </article>
  `}function La(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${y(e)}"
    >
      <strong>${y(re(a,e))}</strong>
      <span>${y(lt(e))}</span>
    </button>
  `}function Da(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function Ra(a){var te;const e=ha[Se()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const r=document.createElement("section");r.id="scene-editor-shell",r.innerHTML=`
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
                ${he.map(u=>`<option value="${y(u.id)}">${y(u.label[Se()])}</option>`).join("")}
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
  `,document.body.appendChild(r),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const n=r.querySelector("[data-preview-stage]"),o=r.querySelector("[data-preview-resolution]"),l=r.querySelector("[data-preview-display]"),f=r.querySelector("[data-dashboard]");if(!n||!o||!l||!f)throw new Error("Missing native editor shell elements");n.appendChild(t);const s={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:me,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted"},$=()=>{const u=He(s.previewDisplayId);l.value=u.id,o.textContent=ma(u),n.style.width=`${u.width}px`,n.style.height=`${u.height}px`,t.style.width=`${u.width}px`,t.style.height=`${u.height}px`},I=typeof ResizeObserver<"u"?new ResizeObserver(()=>$()):null;I==null||I.observe(n);const w=()=>{const u=s.config,p=u?H(u):[],c=p.find(v=>v.id===s.selectedPageId)||p[0]||null,b=Array.isArray(c==null?void 0:c.cards)?c.cards:[],A=s.selectedCardIndex!==null&&b[s.selectedCardIndex]||null,E=Pa(s.haEntities,s.entitySearch),T=s.focusedBinding?e.entityBindingActive(B(b[s.focusedBinding.cardIndex],"caption")||`${e.cards} #${s.focusedBinding.cardIndex+1}`,Ce(e,s.focusedBinding.field)):e.entityBindingEmpty,C=u?ba(u):"",D=s.avatarCatalog.find(v=>v.id===C)||null,Y=s.pendingAvatarZipName?e.avatarImportSelected(s.pendingAvatarZipName):e.avatarImportHint,h=s.avatarImportStatus?`<div class="scene-editor-status" data-tone="${s.avatarImportTone}">${y(s.avatarImportStatus)}</div>`:"";f.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${s.statusTone}">${y(s.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${y(a.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${s.saving||!u?" disabled":""}>${s.saving?e.saving:e.save}</button>
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
              <div class="avatar-pack-meta">
                <div class="field is-wide">
                  <label for="avatar-pack-select">${e.avatarPack}</label>
                  <select id="avatar-pack-select" data-avatar-pack>
                    <option value="">${e.avatarPackCurrent}</option>
                    ${s.avatarCatalog.map(v=>`<option value="${y(v.id)}"${v.id===C?" selected":""}>${y(v.name||v.id)}</option>`).join("")}
                  </select>
                </div>
                <div class="meta">${s.avatarCatalog.length?e.avatarPackHint:e.avatarPackEmpty}</div>
                <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              </div>
              <div class="avatar-pack-preview">
                ${D!=null&&D.previewUrl?`<img src="${y(D.previewUrl)}" alt="${y(D.name||D.id)}">`:`<span>${y((D==null?void 0:D.name)||e.avatarPackCurrent)}</span>`}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label for="avatar-pack-archive">${e.avatarImportSelect}</label>
                <input id="avatar-pack-archive" type="file" accept=".zip,application/zip" data-avatar-archive>
              </div>
              <div class="meta">${y(Y)}</div>
              <div class="page-chip-actions">
                <button class="scene-editor-button" type="button" data-action="import-avatar"${s.avatarImporting||!s.pendingAvatarZip||!a.avatarImportUrl?" disabled":""}>
                  ${s.avatarImporting?e.avatarImporting:e.avatarImportButton}
                </button>
              </div>
              ${h}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(a.packId)}</div>
            </div>
            <div class="page-list">
            ${p.map((v,U)=>`
              <article class="page-chip ${v.id===((c==null?void 0:c.id)||"")?"is-active":""}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${y(v.id)}">
                  <strong>${y(v.title||v.id||`Page ${U+1}`)}</strong>
                  <span class="meta">${y(Ve(e,v.kind))} · ${y(e.pageCards(Array.isArray(v.cards)?v.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${y(v.id)}"${U===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${y(v.id)}"${U===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${y(v.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
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
          ${c?`
            <div class="inspector-grid">
              ${ae(e.fieldPageId,"id",W(c,"id"),!0)}
              ${Ge(e.fieldKind,"kind",W(c,"kind"),ua.map(v=>({value:v,label:Ve(e,v)})))}
              ${ae(e.fieldTitle,"title",W(c,"title"),!0)}
              ${ae(e.fieldSubtitle,"subtitle",W(c,"subtitle"),!0)}
              ${ae(e.fieldSlot,"slot",W(c,"slot"))}
              ${Ge(e.fieldCardStyle,"cardStyle",W(c,"cardStyle")||"full",pa.map(v=>({value:v,label:v==="mini"?e.styleMini:e.styleFull})))}
              ${ae(e.fieldStampCaption,"stampCaption",W(c,"stampCaption"))}
              ${ae(e.fieldStampValue,"stampValue",W(c,"stampValue"))}
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
                  ${rt.map(v=>La(e,v)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${b.length?b.map((v,U)=>Ua(e,v,U,b.length,U===s.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${A?Ta(e,A,s.selectedCardIndex||0,s.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              ${Q(e.fieldDisplaySafeTop,"safeTop",X(u,"safeTop"))}
              ${Q(e.fieldDisplaySafeRight,"safeRight",X(u,"safeRight"))}
              ${Q(e.fieldDisplaySafeBottom,"safeBottom",X(u,"safeBottom"))}
              ${Q(e.fieldDisplaySafeLeft,"safeLeft",X(u,"safeLeft"))}
              ${Q(e.fieldDisplayPadding,"layoutPaddingPx",X(u,"layoutPaddingPx"))}
              ${Q(e.fieldDisplayGap,"layoutGapPx",X(u,"layoutGapPx"))}
              ${Q(e.fieldDisplayScale,"globalScale",X(u,"globalScale"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.homeAssistant}</h2>
              <div class="meta">${y(T)}</div>
            </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${y(s.entitySearch)}">
          </div>
          <div class="ha-list">
            ${E.length?E.map(v=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${y(v.name)}</strong>
                    <div class="meta">${y(v.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${y(v.entityId)}"${s.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${y(v.entityId)}</code>
                <div class="ha-state">${y(v.state)}${v.unit?` · ${y(v.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `,$()},S=(u,p)=>{s.status=u,s.statusTone=p,w()},k=()=>{if(!s.config)return;const u=H(s.config);if(!u.length){s.selectedPageId=null;return}(!s.selectedPageId||!u.some(b=>b.id===s.selectedPageId))&&(s.selectedPageId=u[0].id);const p=u.find(b=>b.id===s.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(s.selectedCardIndex===null||s.selectedCardIndex>=c.length)&&(s.selectedCardIndex=0):(s.selectedCardIndex=null,s.focusedBinding=null),Sa(s.selectedPageId),xa(ga(s.config,s.selectedPageId))},x=()=>{s.dirty=!0,S(e.statusDirty,"muted")},L=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),s.selectedPageId&&u.searchParams.set("editorPage",s.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},M=(u,p)=>{if(!s.config||!s.selectedPageId)return;const c=s.config.pages.find(b=>b.id===s.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const b=st(s.config,p||"page"),A=c.id;c.id=b,s.config.rotation.order=s.config.rotation.order.map(E=>E===A?b:E),s.selectedPageId=b}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);x(),k()}},j=(u,p)=>{if(!s.config)return;const c=nt(s.config),b=c.safeArea||{},A=p===""?null:Number(p),E=Number.isFinite(A)?A:null;u==="safeTop"?b.top=E??0:u==="safeRight"?b.right=E??0:u==="safeBottom"?b.bottom=E??0:u==="safeLeft"?b.left=E??0:u==="layoutPaddingPx"?c.layoutPaddingPx=E??16:u==="layoutGapPx"?c.layoutGapPx=E??16:u==="globalScale"&&(c.globalScale=E??1),c.safeArea=b,x()},q=(u,p,c)=>{var E;if(!s.config||!s.selectedPageId)return;const b=s.config.pages.find(T=>T.id===s.selectedPageId);if(!b)return;Array.isArray(b.cards)||(b.cards=[]);const A=b.cards[u];if(A){if(p==="type"){const T=je(c);if(b.cards[u]={...T,caption:B(A,"caption")||T.caption},((E=s.focusedBinding)==null?void 0:E.cardIndex)===u){const C=qe(c);s.focusedBinding=C?{cardIndex:u,field:C}:null}}else p==="digits"?A[p]=c===""?0:Number(c):A[p]=c;x()}},G=u=>{if(!s.config||!s.selectedPageId||!s.focusedBinding)return;const p=s.config.pages.find(A=>A.id===s.selectedPageId),c=s.haEntities.find(A=>A.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const b=p.cards[s.focusedBinding.cardIndex];b&&(Da(b,s.focusedBinding.field,c),x(),w())},K=(u,p)=>{s.selectedCardIndex=u,s.focusedBinding={cardIndex:u,field:p},w(),window.requestAnimationFrame(()=>{const c=r.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};r.addEventListener("click",async u=>{var D,Y;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),b=c==null?void 0:c.dataset.action;if(!b)return;if(b==="apply-display-profile"&&s.config){wa(s.config,He(s.previewDisplayId)),x(),w();return}if(b==="import-avatar"){if(!s.config||!a.avatarImportUrl||!s.pendingAvatarZip||s.avatarImporting)return;s.avatarImporting=!0,s.avatarImportStatus=e.avatarImporting,s.avatarImportTone="muted",w();try{const h=await Aa(a.avatarImportUrl,s.pendingAvatarZip);s.avatarCatalog=a.avatarCatalogUrl?await We(a.avatarCatalogUrl):[h],ze(s.config).packId=h.id,s.pendingAvatarZip=null,s.pendingAvatarZipName="",s.avatarImporting=!1,s.avatarImportStatus=e.avatarImportSuccess(h.name||h.id),s.avatarImportTone="ok",x(),w()}catch(h){s.avatarImporting=!1,s.avatarImportStatus=`${e.avatarImportError}: ${String(h)}`,s.avatarImportTone="bad",w()}return}if(!s.config)return;const A=H(s.config),E=(c==null?void 0:c.dataset.pageId)||null,T=E?A.findIndex(h=>h.id===E):-1;if(b==="select-page"&&E){s.selectedPageId=E,s.selectedCardIndex=0,s.focusedBinding=null,k(),w();return}if(b==="page-up"&&T>0){const h=A.map(v=>v.id);[h[T-1],h[T]]=[h[T],h[T-1]],s.config.rotation.order=h,s.selectedPageId=E,x(),k(),w();return}if(b==="page-down"&&T>=0&&T<A.length-1){const h=A.map(v=>v.id);[h[T],h[T+1]]=[h[T+1],h[T]],s.config.rotation.order=h,s.selectedPageId=E,x(),k(),w();return}if(b==="page-remove"&&E&&A.length>1){s.config.pages=s.config.pages.filter(h=>h.id!==E),s.config.rotation.order=H(s.config).map(h=>h.id),s.selectedPageId=((D=H(s.config)[Math.max(0,T-1)])==null?void 0:D.id)||((Y=H(s.config)[0])==null?void 0:Y.id)||null,s.selectedCardIndex=0,s.focusedBinding=null,x(),k(),w();return}if(b==="add-page"){const h=ya(s.config);s.config.pages.push(h),s.config.rotation.order=H(s.config).map(v=>v.id),s.selectedPageId=h.id,s.selectedCardIndex=null,s.focusedBinding=null,x(),k(),w();return}if(b==="add-card-template"&&s.selectedPageId){const h=s.config.pages.find(U=>U.id===s.selectedPageId),v=(c==null?void 0:c.dataset.cardType)||"entity";if(h){Array.isArray(h.cards)||(h.cards=[]),h.cards.push(je(v));const U=h.cards.length-1;s.selectedCardIndex=U;const J=qe(v);s.focusedBinding=J?{cardIndex:U,field:J}:null,x(),w(),J&&window.requestAnimationFrame(()=>{const z=r.querySelector("#ha-entity-search");z==null||z.scrollIntoView({behavior:"smooth",block:"center"}),z==null||z.focus()})}return}if(b==="focus-binding"){const h=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),v=(c==null?void 0:c.dataset.bindingField)||"";h>=0&&v&&K(h,v);return}const C=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(C>=0&&s.selectedPageId){const h=s.config.pages.find(v=>v.id===s.selectedPageId);if(!h||!Array.isArray(h.cards))return;if(b==="select-card"){s.selectedCardIndex=C,w();return}if(b==="card-remove"){h.cards=h.cards.filter((v,U)=>U!==C),s.selectedCardIndex!==null&&(s.selectedCardIndex===C?s.selectedCardIndex=h.cards.length?Math.min(C,h.cards.length-1):null:s.selectedCardIndex>C&&(s.selectedCardIndex-=1)),s.focusedBinding&&(s.focusedBinding.cardIndex===C?s.focusedBinding=null:s.focusedBinding.cardIndex>C&&(s.focusedBinding={cardIndex:s.focusedBinding.cardIndex-1,field:s.focusedBinding.field})),x(),w();return}if(b==="card-up"&&C>0){[h.cards[C-1],h.cards[C]]=[h.cards[C],h.cards[C-1]],s.selectedCardIndex===C?s.selectedCardIndex=C-1:s.selectedCardIndex===C-1&&(s.selectedCardIndex=C),s.focusedBinding&&(s.focusedBinding.cardIndex===C?s.focusedBinding={cardIndex:C-1,field:s.focusedBinding.field}:s.focusedBinding.cardIndex===C-1&&(s.focusedBinding={cardIndex:C,field:s.focusedBinding.field})),x(),w();return}if(b==="card-down"&&C<h.cards.length-1){[h.cards[C],h.cards[C+1]]=[h.cards[C+1],h.cards[C]],s.selectedCardIndex===C?s.selectedCardIndex=C+1:s.selectedCardIndex===C+1&&(s.selectedCardIndex=C),s.focusedBinding&&(s.focusedBinding.cardIndex===C?s.focusedBinding={cardIndex:C+1,field:s.focusedBinding.field}:s.focusedBinding.cardIndex===C+1&&(s.focusedBinding={cardIndex:C,field:s.focusedBinding.field})),x(),w();return}}if(b==="save"){s.saving=!0,S(e.saving,"muted");try{s.config=await Ia(a.sceneApiUrl,Ee(s.config)),s.dirty=!1,s.saving=!1,k(),S(e.statusSaved,"ok"),window.setTimeout(()=>L(),250)}catch(h){s.saving=!1,S(`${e.saveError}: ${String(h)}`,"bad")}return}if(b==="bind-entity"){const h=(c==null?void 0:c.dataset.entityId)||"";G(h)}}),r.addEventListener("input",u=>{const p=u.target;if(!p||!s.config){p!=null&&p.dataset.previewDisplay&&(s.previewDisplayId=p.value||me,$());return}if(p.dataset.previewDisplay){s.previewDisplayId=p.value||me,$();return}if(p.dataset.avatarPack!==void 0){ze(s.config).packId=p.value.trim()||null,x(),w();return}if(p.dataset.pageField){M(p.dataset.pageField,p.value),w();return}if(p.dataset.displayField){j(p.dataset.displayField,p.value),w();return}if(p.dataset.cardField&&p.dataset.cardIndex){s.selectedCardIndex=Number(p.dataset.cardIndex),q(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),w();return}p.hasAttribute("data-ha-search")&&(s.entitySearch=p.value,w())}),r.addEventListener("change",u=>{var b;const p=u.target;if(!(p!=null&&p.dataset.avatarArchive))return;const c=((b=p.files)==null?void 0:b[0])||null;s.pendingAvatarZip=c,s.pendingAvatarZipName=(c==null?void 0:c.name)||"",s.avatarImportStatus="",s.avatarImportTone="muted",w()}),r.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(s.selectedCardIndex=c,s.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(s.config=await $a(a.sceneApiUrl),a.avatarCatalogUrl)try{s.avatarCatalog=await We(a.avatarCatalogUrl)}catch{s.avatarCatalog=[]}s.haEntities=Ea(((te=Xe())==null?void 0:te.states)||null),s.selectedPageId=Ca(s.config),s.selectedCardIndex=0,s.status=e.statusSaved,s.statusTone="ok",k()}catch(u){s.status=`${e.loadError}: ${String(u)}`,s.statusTone="bad"}w()}const Na="../scene-api/bootstrap",Ba="weather.forecast_home_assistant",Fa="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ma={...Qe,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},_a={...et,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},Oa={...tt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Ha={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},ja={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function za(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Va(){return new URLSearchParams(window.location.search).get("bootstrap")||Na}function Wa(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function N(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const r=Wa(e);if(r)return new URL(t.slice(1),r).toString()}return new URL(t,i).toString()}function $e(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function qa(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function Ga(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function we(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function Ka(a,e){var t,i,r,n,o,l,f,s;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([$,I])=>[$,N(I,e)]).filter(([,$])=>!!$)),avatar:{manifestUrl:N(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:N(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((r=a.state)==null?void 0:r.provider)||"json",stateUrl:N(String(((n=a.state)==null?void 0:n.stateUrl)||"").trim(),e),haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:N(String(((l=a.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:N(String(((f=a.state)==null?void 0:f.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:N(String(((s=a.control)==null?void 0:s.controlUrl)||"").trim(),e)}}}async function Ya(a,e){var s,$,I,w;const t=N(String(((s=a.files)==null?void 0:s.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=N(String((($=a.files)==null?void 0:$.sceneConfigUrl)||"").trim(),e),r=N(String(((I=a.files)==null?void 0:I.avatarCatalogUrl)||"").trim(),e);if(!i||!r)return t;let n="";try{const S=await we(i);n=String(((w=S.avatar)==null?void 0:w.packId)||"").trim()}catch{n=""}if(!n)return t;let o="";try{const S=await we(r),k=Array.isArray(S.items)?S.items.find(x=>String(x.id||"").trim()===n):null;o=N(String((k==null?void 0:k.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return t;const f={...Ka(await we(t),t),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(f)],{type:"application/json"}))}const oe=document.getElementById("app");if(!oe)throw new Error("Missing #app root element");const ie=ja[za()];$e(oe,ie.startingTitle,ie.startingBody);(async()=>{var e,t;const a=Va();try{const i=await Ga(a),r=String(i.packId||"").trim(),n=r.toLowerCase()==="neiri",o=await Ya(i,a);if(!o){$e(oe,ie.missingRendererTitle,ie.missingRendererBody,JSON.stringify(i,null,2));return}document.documentElement.dataset.packId=r,document.title=n?"Нейри":r?`kiosk-scene hosted runtime (${r})`:"kiosk-scene hosted runtime",await ca(oe,{rendererConfigUrl:o,weatherUrl:n?"./weather.json":void 0,weatherReader:n?la({weatherEntity:Ba,openMeteoUrl:Fa,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:n?Ma:void 0,labels:n?_a:void 0,presetLabels:n?Oa:void 0,defaultWeather:n?Ha:void 0}),qa()&&await Ra({packId:r,sceneApiUrl:N(String(i.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:N(String(((e=i.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),avatarImportUrl:N(String(((t=i.files)==null?void 0:t.avatarImportUrl)||"").trim(),a),sceneUrl:N(String(i.entryUrl||i.runtimeBaseUrl||"./").trim(),a)})}catch(i){$e(oe,ie.failedTitle,ie.failedBody,String(i))}})();
