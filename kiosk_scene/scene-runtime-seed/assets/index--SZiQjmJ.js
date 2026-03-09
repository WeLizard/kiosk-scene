var ut=Object.defineProperty;var pt=(a,e,t)=>e in a?ut(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var b=(a,e,t)=>pt(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function A(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function d(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function De(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ce(a,e){if(!A(a)||!A(e))return e??a;const t={...a};for(const[i,r]of Object.entries(e)){if(Array.isArray(r)){t[i]=r.slice();continue}if(A(r)&&A(t[i])){t[i]=ce(t[i],r);continue}t[i]=r}return t}function ft(a,e=40){return Array.isArray(a)?a.map(t=>d(t,e).toLowerCase()).filter(Boolean):[]}const Z={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},Ne={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function ke(a){var t,i,r,s,o,l,m,n,S,k;const e=ce(Z,A(a)?a:{});return{version:1,assistant:{name:d((t=e.assistant)==null?void 0:t.name,40)||Z.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:A(e.links)?Object.fromEntries(Object.entries(e.links).map(([P,f])=>[d(P,64),d(f,1024)]).filter(([P,f])=>P&&f)):{},avatar:{manifestUrl:d((r=e.avatar)==null?void 0:r.manifestUrl,1024)||Z.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||Z.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||Z.state.stateUrl,haApiFallback:((m=e.state)==null?void 0:m.haApiFallback)===!0,idleLinesUrl:d((n=e.state)==null?void 0:n.idleLinesUrl,1024)||Z.state.idleLinesUrl,entityMapUrl:d((S=e.state)==null?void 0:S.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d((k=e.control)==null?void 0:k.controlUrl,1024)||Z.control.controlUrl}}}function Je(a){var t,i,r,s,o;const e=ce(Ne,A(a)?a:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||Ne.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:A(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,m])=>[d(l,32),d(m,1024)]).filter(([l,m])=>l&&m)):{},viewPresets:A(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,m])=>d(l,32)&&A(m))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((r=e.capabilities)==null?void 0:r.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const ee={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},mt=["full","torso","head"];function de(a,e=Date.now()){var l,m,n,S,k,P,f;const t=ce(ee,A(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((l=t.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((m=t.page)==null?void 0:m.target,40)||null,until:d((n=t.page)==null?void 0:n.until,64)||null},cue:{cue:d((S=t.cue)==null?void 0:S.cue,32)||null,emotion:d((k=t.cue)==null?void 0:k.emotion,32)||null,motion:d((P=t.cue)==null?void 0:P.motion,32)||null,until:d((f=t.cue)==null?void 0:f.until,64)||null}},r=d(t.viewPreset,16).toLowerCase();i.viewPreset=mt.includes(r)?r:null;const s=De(i.page.until);i.page.mode==="pinned"&&(!s||s<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=De(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function ve(a,e,t=Date.now()){return de(ce(de(a,t),A(e)?e:{}),t)}function gt(a,e,t=Date.now()){return de({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function ht(a,e,t=3e4,i=Date.now()){const r=d(e,40),s=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return de({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:r?"pinned":"auto",target:r||null,until:r?s:null}},i)}function Ye(a,e){var o,l,m;const t={...a||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),r=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),s=d((m=e==null?void 0:e.cue)==null?void 0:m.motion,32);return i&&(t.cue=i),r&&(t.emotion=r),s&&(t.motion=s),t}function _(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function Re(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function vt(a){return A(a)&&A(a.config)?a.config:a}function yt(a,e){const t={...a};return A(e)&&(typeof e.id=="string"&&(t.id=d(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>A(i)))),t}function ye(a,e){const t=vt(a),i=Array.isArray(e.pages)?e.pages.slice():[],r=A(t)&&Array.isArray(t.pages)?t.pages:[],s=i.map(f=>{const C=r.find($=>d(A($)?$.id:"",40)===f.id);return yt(f,C)}),o=A(t)&&A(t.rotation)?t.rotation:{},l=A(e.display)?e.display:{},m=A(t)&&A(t.display)?t.display:{},n=A(l.safeArea)?l.safeArea:{},S=A(m.safeArea)?m.safeArea:{},k=Array.isArray(o.order)?o.order:e.rotation.order,P=ft(k).filter((f,C,$)=>s.some(I=>I.id===f)&&$.indexOf(f)===C);return{version:1,rotation:{order:P.length?P:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:_(S.top,_(n.top,0)),right:_(S.right,_(n.right,0)),bottom:_(S.bottom,_(n.bottom,0)),left:_(S.left,_(n.left,0))},layoutPaddingPx:_(m.layoutPaddingPx,_(l.layoutPaddingPx,16)),layoutGapPx:_(m.layoutGapPx,_(l.layoutGapPx,16)),globalScale:Re(m.globalScale,Re(l.globalScale,1))},pages:s}}function bt(a,e=220){const t=d(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},r=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(s,o,l)=>{const m=d(o,16).toLowerCase(),n=d(l,32).toLowerCase();return(m==="emotion"||m==="activity"||m==="cue"||m==="motion")&&n&&(i[m]=n)," "});return{text:d(r,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const wt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function ne(a,e={}){const t=A(a)?a:{},i={...wt,...e};return{version:1,assistant:d(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:d(t.status??i.status,255),message:d(t.message??i.message,255),source:d(t.source??i.source,64),updatedAt:d(t.updatedAt??i.updatedAt,64),emotion:d(t.emotion??i.emotion,32)||null,activity:d(t.activity??i.activity,32)||null,cue:d(t.cue??i.cue,32)||null,intensity:St(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:d(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:d(t.event??i.event,64)}}function St(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function xt(a,e){return a.order[e]||a.order[0]||""}function kt(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function $t(a,e,t,i){const r=Array.isArray(a.order)?a.order:[];if(!r.length)return 0;const s=Math.max(0,Math.min(e,r.length-1));for(let o=1;o<=r.length;o+=1){const l=(s+o*t+r.length)%r.length;if(i(r[l]))return l}return s}function Ct(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const r=a.control.page;if(r.mode==="pinned"&&r.target)return{nextIndex:kt(a.rotation,r.target),nextAutoRotateAt:e,pinnedKey:`${r.target}:${r.until||""}`};if(a.force){const o=xt(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(o)?a.activeIndex:Math.max(0,t.findIndex(m=>a.isEligible(m))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let s=a.activeIndex;for(let o=1;o<=t.length;o+=1){const l=(a.activeIndex+o)%t.length;if(a.isEligible(t[l])){s=l;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const Ze={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},It=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function Me(a){const e=d(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:It.some(t=>e.includes(t)):!1}function Pt(a,e){const t=ne(a),i=d(t.status,72),r=d(t.message,220);if(!(t.online!==!1&&(Me(i)||Me(r))))return{state:t,hasTechnicalFailure:!1};const l=d(t.emotion,32).toLowerCase(),m=d(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(t.activity,32).toLowerCase()==="error"?"idle":d(t.activity,32)||null,cue:d(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:m==="error"?"idle_soft":m||null},hasTechnicalFailure:!0}}function Et(a,e){const t=(e==null?void 0:e.copy)??Ze,i=ne(a),r=bt(i.message,220),s=Pt({...i,message:r.text,emotion:d(i.emotion,32)||r.emotion||null,activity:d(i.activity,32)||r.activity||null,cue:d(i.cue,32)||r.cue||null,motion:d(i.motion,32)||r.motion||null},{healthyStatus:t.technicalHealthyLabel}),o=s.state,l=d(o.message,180),m=d(o.activity,32).toLowerCase(),n=o.online!==!1&&m!=="offline",S=!!o.busy||m==="thinking"||m==="busy"||m==="acting",k=o.speaking===!0||m==="speaking",P=n?S?t.busyLabel:l||k?t.speakingLabel:s.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,f=l?t.messageCaption:s.hasTechnicalFailure?t.statusCaption:t.modeCaption,C=l||(n?S?t.busyBody:d(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:o,hasTechnicalFailure:s.hasTechnicalFailure,caption:f,label:P,body:C,bodyKey:[f,P,C].join(":")}}function At(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function Be(a,e=-1){const t=Array.isArray(a)?a.map(r=>d(r,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function Tt(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!d(a==null?void 0:a.message,180);return e&&!t&&!i}const Lt={cue:null,emotion:null,motion:null,until:null},Ut={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Dt(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function Xe(a){return a.endsWith("/")?a:`${a}/`}function ue(a,e){const t=d(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(Xe(d(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function fe(a){const e=d(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function Nt(a,e,t){const i=d(a.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?fe(i):new URL("../avatar.html",new URL(Xe(d(t,1024)||"."),window.location.href)).toString()}function Rt(a,e){const t=d(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function Mt(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[r,s]of Object.entries(i)){const o=d(r,64);if(!o||s==null)continue;const l=typeof s=="boolean"?s?"1":"0":String(s);t.searchParams.set(o,l)}return t.toString()}function Bt(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([r,s])=>[d(r,32),ue(t,s)]).filter(([r,s])=>r&&s));return{version:1,assistant:{name:d(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([r,s])=>[d(r,64),fe(s)]).filter(([r,s])=>r&&s)),state:{stateUrl:fe(a.state.stateUrl),idleLinesUrl:fe(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:ue(t,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:ue(t,e.fallbackPortrait||""),motionMapUrl:ue(t,e.motionMapUrl||""),presetThumbs:i}}}class Ft{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"currentState");b(this,"currentCue",{...Lt});b(this,"currentPreset","full");b(this,"currentBubble",{...Ut});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var r;const t=(r=this.iframeEl)==null?void 0:r.contentWindow;if(!t||e.source!==t||!Dt(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Je({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=ke(e.rendererConfig||{}),this.currentState=ne({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const t=Nt(this.options,this.manifest,this.assetRoot),i=Mt(t,this.options);this.targetOrigin=Rt(i,this.options.targetOrigin);const r=document.createElement("div");r.className="ks-live2d-frame",Object.assign(r.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const s=document.createElement("iframe");s.className="ks-live2d-iframe",s.src=i,s.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,s.loading="eager",s.allow="autoplay",Object.assign(s.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&s.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);r.append(s,o),this.host.append(r),s.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=r,this.iframeEl=s,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=ne(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const r=document.createElement("div");r.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(r.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(r,s),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Bt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=Ye(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function _t(a={}){return new Ft(a)}const Ot={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Fe={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Ht{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const r=document.createElement("div");r.className="ks-static-avatar-fallback",r.textContent=this.options.alt||"Avatar",Object.assign(r.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,r,s),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=r;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||Fe,i=t[e]||t.full||Fe.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Ot}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),r=t.replace(/^\.?\//,"");return i?`${i}/${r}`:r}}function jt(a={}){return new Ht(a)}function zt(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function Qe(){var a;for(const e of zt())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function Vt(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function Wt(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=d(t.entity_id,255);i&&(e[i]=t)}return e}function Kt(a,e,t="Assistant"){const i=a[e.status],r=a[e.message],s=a[e.online],o=a[e.busy],l=a[e.source],m=a[e.updatedAt],n=e.emotion?a[e.emotion]:null,S=e.activity?a[e.activity]:null,k=e.cue?a[e.cue]:null,P=e.speaking?a[e.speaking]:null,f=e.intensity?a[e.intensity]:null,C=e.motion?a[e.motion]:null,$=a[e.revision];if(!i&&!r&&!s&&!o)return null;const I=d(i==null?void 0:i.state,72),F=d(r==null?void 0:r.state,220),j=d(m==null?void 0:m.state,64),G=be(s,!0),q=be(o,!1),J=d(S==null?void 0:S.state,32)||"",W=be(P)??J==="speaking",p=J||(G?W?"speaking":q?"thinking":"idle":"offline");return ne({version:1,assistant:d(t,40)||"Assistant",online:G,busy:q,status:I&&I!=="unknown"&&I!=="unavailable"?I:"",message:F&&F!=="unknown"&&F!=="unavailable"?F:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:j&&j!=="unknown"&&j!=="unavailable"?j:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(n==null?void 0:n.state,32)||null,activity:p,cue:d(k==null?void 0:k.state,32)||null,intensity:Gt(f),speaking:W,motion:d(C==null?void 0:C.state,32)||null,revision:Number($==null?void 0:$.state)||0})}function be(a,e){const t=d(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function Gt(a){const e=d(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function qt(a){const e=Pe(a);return{id:"ha-state",async read(){const t=await e.read();return t?Kt(t,a.entityMap,a.assistantName):null}}}function Pe(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let r=null,s=0,o=null,l=0;async function m(){var P;const n=Qe();if(n!=null&&n.states)return n.states;const S=Date.now();if(r&&S-s<t||!a.allowApiFallback||typeof e!="function"||S<l)return r;if(o)return o;const k=d(((P=a.readToken)==null?void 0:P.call(a))??Vt(),4096);return k?(o=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${k}`}}).then(async f=>{if(!f.ok){const C=new Error(`HA states HTTP ${f.status}`);throw C.status=f.status,C}return f.json()}).then(f=>{const C=Wt(f);return C&&(r=C,s=Date.now()),C||r}).catch(f=>(((f==null?void 0:f.status)===401||(f==null?void 0:f.status)===403)&&(l=Date.now()+i),r)).finally(()=>{o=null}),o):r}return{id:"ha-states",async read(){return m()}}}async function Ee(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=d(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const r=await e(i.toString(),{cache:"no-store"});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json();return a.sanitize?a.sanitize(s):s}catch(r){if(a.defaultValue!==void 0)return a.defaultValue;throw r}}function Jt(a){return{id:"json-state",async read(){const e=await Ee({...a,defaultValue:a.defaultValue});return ne(e)}}}function _e(a){return{id:"json-control",async read(){const e=await Ee({...a,defaultValue:a.defaultValue??ee});return de(e)}}}function Yt(a){return{id:"json-lines",async read(){const e=await Ee({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>d(t,220)).filter(Boolean):[]}}}function R(a,e,t=64){return d(a[e],t)}function oe(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Zt(a,e="en-US"){const t=d(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function pe(a,e){return!a||!e?null:a[e]||null}function Xt(a,e=null,t="en-US"){var k,P,f,C;const i=R(a,"caption",40)||R(a,"type",24)||"Card",r=R(a,"hint",72),s=R(a,"type",32).toLowerCase()||"entity",o=R(a,"entity",255),l=pe(e,o),m=pe(e,R(a,"stateEntity",255)),n=pe(e,R(a,"downEntity",255)),S=pe(e,R(a,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:R(a,"value",64)||"—",hint:r||"static card"};if(s==="todo"){const $=Number(l==null?void 0:l.state);return!Number.isFinite($)||$<=0?{caption:i,value:"Clear",hint:r||"nothing pending"}:{caption:i,value:`${$} item${$===1?"":"s"}`,hint:r||"pending tasks"}}if(s==="onoff"){const $=(l==null?void 0:l.state)==="on";return{caption:i,value:$?R(a,"onText",48)||"On":R(a,"offText",48)||"Off",hint:r||"device state"}}if(s==="battery"){const $=oe(l==null?void 0:l.state,0);return{caption:i,value:$?`${$}%`:"—",hint:d(m==null?void 0:m.state,48)||r||"battery level"}}if(s==="network"){const $=oe(n==null?void 0:n.state,0),I=oe(S==null?void 0:S.state,0);return{caption:i,value:$||I?`↓ ${$||"0"} · ↑ ${I||"0"}`:"—",hint:r||"throughput"}}if(s==="time")return{caption:i,value:Zt(l==null?void 0:l.state,t)||"—",hint:r||"next event"};if(s==="percent"){const $=oe(l==null?void 0:l.state,Number(R(a,"digits",4))||0);return{caption:i,value:$?`${$}%`:"—",hint:r||d((k=l==null?void 0:l.attributes)==null?void 0:k.friendly_name,48)||"state percentage"}}if(s==="number"){const $=Number(R(a,"digits",4))||0,I=oe(l==null?void 0:l.state,$),F=R(a,"unit",16)||d((P=l==null?void 0:l.attributes)==null?void 0:P.unit_of_measurement,16);return{caption:i,value:I?`${I}${F?` ${F}`:""}`:"—",hint:r||d((f=l==null?void 0:l.attributes)==null?void 0:f.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||R(a,"value",64)||"—",hint:r||d((C=l==null?void 0:l.attributes)==null?void 0:C.friendly_name,48)||"entity state"}}function Qt(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>Xt(i,e,t)):[]}const et={...Ze,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},tt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},at={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},ea={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},me={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function v(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function it(a){return a.endsWith("/")?a:`${a}/`}function O(a,e){const t=d(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function rt(a){return new URL(".",a).toString()}function ta(a,e){const t=rt(e),i=O(t,d(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:O(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([r,s])=>[r,O(t,s)]).filter(([,r])=>!!r))}}function we(a){return{...me,...a||{},metrics:{...me.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):me.forecast.map(e=>({...e}))}}function Oe(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function B(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function aa(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${B(t)} мм рт. ст.`:`${B(t*.750061683,0)} мм рт. ст.`}function ia(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${B(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${B(t/3.6,1)} м/с`:`${B(t,1)} м/с`}function ra(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function na(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function sa(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function oa(a,e="ru-RU"){const t=d(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||d(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function He(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function la(a,e="./assets/icons"){const t=Number(a),i=it(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function da(a){const e=d(a.locale,32)||"ru-RU",t=d(a.iconBaseUrl,1024)||"./assets/icons",i=Pe({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var C,$,I,F,j,G,q,J,se,W,p,u,c,w,T,E,L,x,N,Y;const r=await i.read(),s=a.fetchImpl??globalThis.fetch,o=r==null?void 0:r[a.weatherEntity];let l=null;const m=d(a.openMeteoUrl,4096);if(m&&typeof s=="function")try{const g=await s(`${m}${m.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});g.ok&&(l=await g.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const n=d(o==null?void 0:o.last_changed,64)||d((C=l==null?void 0:l.current)==null?void 0:C.time,64)||new Date().toISOString(),S=o?oa(o.state,e):He(($=l==null?void 0:l.current)==null?void 0:$.weather_code,e),k=Array.isArray((I=l==null?void 0:l.daily)==null?void 0:I.time)?l.daily.time.map((g,y)=>{var te,z,Te,Le,Ue;const U=new Date(`${g}T12:00:00+03:00`);return{name:U.toLocaleDateString(e,{weekday:"short"}),dayNumber:U.toLocaleDateString(e,{day:"numeric"}),monthShort:U.toLocaleDateString(e,{month:"short"}),note:d(He((te=l.daily.weather_code)==null?void 0:te[y],e),28),max:`${B((z=l.daily.temperature_2m_max)==null?void 0:z[y])}°`,min:`${B((Te=l.daily.temperature_2m_min)==null?void 0:Te[y])}° · ${B((Le=l.daily.precipitation_probability_max)==null?void 0:Le[y])}%`,icon:la((Ue=l.daily.weather_code)==null?void 0:Ue[y],t)}}):[],P=k[0]||null,f=k.slice(1,6);return{todayValue:na(n,e),todayLabel:sa(n,e),updatedAt:ra(n,e),temperature:B(((F=o==null?void 0:o.attributes)==null?void 0:F.temperature)??((j=l==null?void 0:l.current)==null?void 0:j.temperature_2m),1),condition:S,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${B(((G=o==null?void 0:o.attributes)==null?void 0:G.apparent_temperature)??((q=l==null?void 0:l.current)==null?void 0:q.apparent_temperature)??((J=o==null?void 0:o.attributes)==null?void 0:J.temperature),1)}°C`,badgeSummary:S,badgeRange:P?`${P.max} / ${B((W=(se=l==null?void 0:l.daily)==null?void 0:se.temperature_2m_min)==null?void 0:W[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${B(((p=o==null?void 0:o.attributes)==null?void 0:p.humidity)??((u=l==null?void 0:l.current)==null?void 0:u.relative_humidity_2m))}%`,pressure:aa(((c=o==null?void 0:o.attributes)==null?void 0:c.pressure)??((w=l==null?void 0:l.current)==null?void 0:w.surface_pressure),((T=o==null?void 0:o.attributes)==null?void 0:T.pressure_unit)??"hPa"),wind:ia(((E=o==null?void 0:o.attributes)==null?void 0:E.wind_speed)??((L=l==null?void 0:l.current)==null?void 0:L.wind_speed_10m),((x=o==null?void 0:o.attributes)==null?void 0:x.wind_speed_unit)??"km/h"),clouds:`${B(((N=o==null?void 0:o.attributes)==null?void 0:N.cloud_coverage)??((Y=l==null?void 0:l.current)==null?void 0:Y.cloud_cover))}%`},forecast:f}}}class ca{constructor(e,t={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"entityMap",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",ee);b(this,"uiControl",ee);b(this,"currentControl",ee);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...et,...t.copy||{}},this.labels={...tt,...t.labels||{}},this.presetLabels={...at,...t.presetLabels||{}},this.weatherData=we(t.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=O(window.location.href,this.getRendererConfigUrl()),t=rt(e),i=ke(await this.readJson(e)),r=ke({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,O(t,l)])),avatar:{...i.avatar,manifestUrl:O(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:O(t,i.scene.configUrl)},state:{...i.state,stateUrl:O(t,i.state.stateUrl),idleLinesUrl:O(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?O(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:O(t,i.control.controlUrl)}});this.rendererConfig=r;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=ta(Je(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await Yt({url:this.rendererConfig.state.idleLinesUrl||O(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await _e({url:this.rendererConfig.control.controlUrl,defaultValue:ee}).read(),this.currentControl=ve(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=gt(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,r;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(r=(i=this.carouselShellEl).setPointerCapture)==null||r.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:r}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(r)>=s*.16,l=r<0?1:-1;if(this.clearDragState(t.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await _e({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=ve(ee,this.uiControl),this.currentControl=ve(this.remoteControl,this.uiControl);const e=Ye(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=Et(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=ye(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const r=this.getOrderedPages(i.pages,i.rotation.order),s=Ct({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>r.some(l=>l.id===o)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(r,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,r)=>i.kind==="overview"?this.renderOverviewSlide(t,r):this.renderDynamicSlide(i,r,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,r)=>`
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
    `}renderDynamicSlide(e,t,i){const r=Qt(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${t+1} / ${i}`),m=e.cardStyle==="mini"?r.map(k=>`
          <article class="mini-card">
            <span class="caption">${v(k.caption)}</span>
            <strong>${v(k.value)}</strong>
          </article>
        `).join(""):r.map(k=>`
          <article class="home-card">
            <span class="caption">${v(k.caption)}</span>
            <strong>${v(k.value)}</strong>
            <small>${v(k.hint)}</small>
          </article>
        `).join(""),n=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(k=>this.renderForecastDay(k)).join("")}</div>`:"",S=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
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
          <div class="${S}">
            ${m||`<div class="empty">${v(this.labels.noCardsConfigured)}</div>`}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],i=e[e.length-1];return`${d(t.dayNumber,4)} ${d(t.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var r;const t=d((r=this.options.iconUrls)==null?void 0:r[e],1024);return t||`${it(d(this.options.iconBaseUrl,1024)||"./assets")}${ea[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:r,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${r}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,t){const i=t.map(s=>e.find(o=>o.id===s)).filter(Boolean),r=e.filter(s=>!i.some(o=>o.id===s.id));return i.concat(r)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,r;!t&&((r=(i=this.carouselShellEl).hasPointerCapture)!=null&&r.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=ye(this.sceneConfig,this.sceneConfig),i=$t(t.rotation,this.activeIndex,e,r=>this.orderedPages.some(s=>s.id===r));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const r=ye(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,r.rotation.defaultDwellMs*2);this.uiControl=ht(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!Tt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=Be(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=Be(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},At(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>Jt({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await qt({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:Pe({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=Oe(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=Oe(e,t)}catch{}try{return we(e)}catch{return we(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return _t({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return jt({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",r=t.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),r&&(s?(r.src=s,r.removeAttribute("hidden")):(r.src="",r.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function ua(a,e={}){const t=new ca(a,e);return await t.init(),t}const pa=["overview","cards","forecast+cards"],fa=["full","mini"],nt=["entity","text","todo","onoff","battery","network","time","percent","number"],V=["caption","hint"],ma={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},ga={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается честный 1:1 viewport выбранного экрана. Если не влезает по ширине, страница просто прокручивается.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Подставить в настройки экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Выбор Live2D-модели для текущего instance-pack. Применяется после сохранения и перезагрузки превью.",avatarPack:"Набор аватара",avatarPackCurrent:"Текущий avatar.manifest.json instance-pack",avatarPackHint:"Другие модели лежат отдельно в /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"В каталоге avatar-packs пока нет отдельных моделей.",avatarPackAppliedAfterSave:"Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",avatarImport:"Импорт аватара",avatarImportHint:"Загрузи zip-архив с Live2D-моделью. Kiosk Scene сам распакует его в avatar-packs, найдёт model3.json и создаст draft motion-map.",avatarImportSelect:"ZIP архив аватара",avatarImportSelected:a=>`Выбран архив: ${a}`,avatarImportButton:"Импортировать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:a=>`Импортирован avatar-pack: ${a}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для semantic cue/activity в runtime.",avatarMappingEmpty:"Выбери отдельный avatar-pack, чтобы редактировать его motion-map.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Idle / ожидание",avatarSemanticTouch:"Touch / касание",avatarSemanticReplySoft:"Reply soft / мягкий ответ",avatarSemanticThink:"Think / размышление",avatarSemanticBusy:"Busy / занята",avatarSemanticCalm:"Calm / спокойствие",avatarSemanticHappy:"Happy / радость",avatarSemanticSurprise:"Surprise / удивление",avatarSemanticWarning:"Warning / предупреждение",avatarSemanticGreet:"Greet / приветствие",avatarSemanticSpeaking:"Speaking / говорит",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardsSubtitle:"Сначала выбери или добавь карточку, затем настрой её ниже. Порядок здесь же влияет на правую карусель.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку из шаблона выше или выбери существующую карточку из списка.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingActive:(a,e)=>`Сейчас связываем: ${a} → ${e}`,noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage renders a true 1:1 viewport of the selected screen. If it does not fit, the editor page simply scrolls.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Fill display settings below",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the Live2D model for this instance-pack. It applies after save and preview reload.",avatarPack:"Avatar pack",avatarPackCurrent:"Use the instance-pack avatar.manifest.json",avatarPackHint:"Additional models live in /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"No separate avatar packs are available yet.",avatarPackAppliedAfterSave:"The selected avatar pack will apply after saving and reloading the preview.",avatarImport:"Import avatar",avatarImportHint:"Upload a Live2D zip archive. Kiosk Scene will unpack it into avatar-packs, detect model3.json and create a draft motion map.",avatarImportSelect:"Avatar ZIP archive",avatarImportSelected:a=>`Selected archive: ${a}`,avatarImportButton:"Import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:a=>`Imported avatar pack: ${a}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map semantic cue/activity slots to actual model motions used by the runtime.",avatarMappingEmpty:"Choose a separate avatar pack to edit its motion map.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardsSubtitle:"Add or choose a card first, then edit it below. The order here drives the right-hand carousel.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card from the templates above or choose an existing one from the list.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingActive:(a,e)=>`Binding now: ${a} → ${e}`,noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},ha=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],ge=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],he="mellow-fly-7";function $e(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function je(a){return ge.find(e=>e.id===a)||ge.find(e=>e.id===he)||ge[0]}function va(a){return`${a.width} × ${a.height}`}function h(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ae(a){return JSON.parse(JSON.stringify(a))}function H(a){const e=new Map(a.pages.map(r=>[r.id,r])),t=a.rotation.order.map(r=>e.get(r)).filter(Boolean),i=a.pages.filter(r=>!t.some(s=>s.id===r.id));return[...t,...i]}function ya(a,e){return e?Math.max(0,H(a).findIndex(t=>t.id===e)):0}function ba(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function st(a,e){const t=ba(e);let i=t,r=2;for(;a.pages.some(s=>s.id===i);)i=`${t}-${r}`,r+=1;return i}function wa(a){const e=a.pages.length+1;return{id:st(a,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function ze(a){switch(a){case"text":return{type:a,caption:"Text",value:"—",hint:""};case"todo":return{type:a,caption:"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:a,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:"Time",entity:"",hint:""};case"percent":return{type:a,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function M(a,e){const t=a[e];return t==null?"":String(t)}function K(a,e){const t=a[e];return t==null?"":String(t)}function X(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function ot(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function Se(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function Ve(a){return a.avatar||(a.avatar={}),a.avatar}function Sa(a,e){const t=ot(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function xa(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function ka(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function $a(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&H(a).some(r=>r.id===t)?t:((i=H(a)[0])==null?void 0:i.id)||null}async function Ca(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return Ae(t.config)}async function Ia(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return Ae(i.config)}function lt(a){switch(a){case"text":return[...V,"value"];case"todo":return[...V,"entity"];case"onoff":return[...V,"entity","onText","offText"];case"battery":return[...V,"entity","stateEntity"];case"network":return[...V,"downEntity","upEntity"];case"time":return[...V,"entity"];case"percent":return[...V,"entity","digits"];case"number":return[...V,"entity","digits","unit"];default:return[...V,"entity"]}}function We(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function re(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function dt(a){const e=$e();return ma[e][a]||""}function Ce(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Pa(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),r=a.includes(".")&&a.split(".",1)[0]||"other",s=String(e.state||""),o=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:r,state:s,unit:o}}function Ea(a){return a?Object.entries(a).map(([e,t])=>Pa(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function Aa(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function Ke(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(r=>({id:String(r.id||"").trim(),name:String(r.name||r.id||"").trim(),manifestUrl:String(r.manifestUrl||"").trim(),previewUrl:String(r.previewUrl||"").trim()})).filter(r=>r.id&&r.manifestUrl):[]}async function Ta(a,e){const t=String(a||"").trim();if(!t)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const r=await fetch(t,{method:"POST",body:i}),s=await r.json();if(!r.ok||s.success===!1||!s.item)throw new Error(String(s.error||`HTTP ${r.status}`));return{id:String(s.item.id||"").trim(),name:String(s.item.name||s.item.id||"").trim(),manifestUrl:String(s.item.manifestUrl||"").trim(),previewUrl:String(s.item.previewUrl||"").trim()}}async function La(a,e){var o,l,m,n;const t=String(a||"").trim(),i=String(e||"").trim();if(!t||!i)throw new Error("Avatar pack API is not configured.");const r=await fetch(`${t}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await r.json();if(!r.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${r.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((o=s.motionMap)==null?void 0:o.motions)?(l=s.motionMap)==null?void 0:l.motions.map(S=>({index:Number(S.index),id:String(S.id||"").trim(),label:String(S.label||S.id||"").trim(),group:String(S.group||"").trim(),tags:Array.isArray(S.tags)?S.tags.map(k=>String(k||"").trim()).filter(Boolean):[]})).filter(S=>Number.isFinite(S.index)):[],semantic:typeof((m=s.motionMap)==null?void 0:m.semantic)=="object"&&((n=s.motionMap)!=null&&n.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function Ua(a,e){var s,o,l;const t=String(a||"").trim();if(!t||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${t}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),r=await i.json();if(!i.ok||r.success===!1||!r.packId)throw new Error(String(r.error||`HTTP ${i.status}`));return{packId:String(r.packId||"").trim(),manifest:r.manifest||e.manifest,motionMap:{motions:Array.isArray((s=r.motionMap)==null?void 0:s.motions)?r.motionMap.motions:e.motionMap.motions,semantic:typeof((o=r.motionMap)==null?void 0:o.semantic)=="object"&&((l=r.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(r.motionMap.semantic)):e.motionMap.semantic}}}function Da(a){if(Array.isArray(a)){const e=a.find(t=>Number.isFinite(Number(t)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(a))?String(Number(a)):""}function Na(a,e){const t=a[e.labelKey];return typeof t=="string"?t:e.key}function Ra(a,e){const t=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${a.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${ha.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${h(i.key)}">${h(Na(a,i))}</label>
            <select id="avatar-semantic-${h(i.key)}" data-avatar-semantic="${h(i.key)}">
              <option value="">${h(a.avatarMotionNone)}</option>
              ${t.map(r=>`
                <option value="${h(String(r.index))}"${Da(e.motionMap.semantic[i.key])===String(r.index)?" selected":""}>
                  ${h(`${r.label||r.id} · #${r.index}`)}
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
              <strong>${h(i.label||i.id||`Motion ${i.index}`)}</strong>
              <span class="meta">${h(`${a.avatarMappingMotion} #${i.index} · ${i.group||"motion"}`)}</span>
              <code>${h(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${a.avatarMappingSaveHint}</div>
    </div>
  `}function ct(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function Ge(a){return lt(a).find(e=>ct(e))||null}function ae(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${h(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${h(e)}" value="${h(t)}">
    </div>
  `}function Q(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${h(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${h(e)}" value="${h(t)}">
    </div>
  `}function qe(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${h(a)}</label>
      <select id="page-select-${e}" data-page-field="${h(e)}">
        ${i.map(r=>`<option value="${h(r.value)}"${r.value===t?" selected":""}>${h(r.label)}</option>`).join("")}
      </select>
    </div>
  `}function Ma(a,e,t,i){const r=M(e,"type")||"entity",s=lt(r);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${h(M(e,"caption")||re(a,r))}</strong>
          <div class="meta">${h(re(a,r))}</div>
        </div>
        <div class="meta">#${t+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${h(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${nt.map(o=>`<option value="${o}"${o===r?" selected":""}>${h(re(a,o))}</option>`).join("")}
          </select>
        </div>
        ${s.map(o=>{const l=ct(o),m=l&&(i==null?void 0:i.cardIndex)===t&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${m?" is-active":""}">
                <label>${h(Ce(a,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${t}"
                    data-card-field="${h(o)}"
                    data-binding-field="${h(o)}"
                    value="${h(M(e,o))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${t}"
                    data-binding-field="${h(o)}"
                  >${a.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${o==="hint"?"is-wide":""}">
              <label>${h(Ce(a,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${t}"
                data-card-field="${h(o)}"
                value="${h(M(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function Ba(a,e,t,i,r){const s=M(e,"type")||"entity",o=M(e,"caption")||re(a,s),l=M(e,"entity")||M(e,"stateEntity")||M(e,"downEntity")||M(e,"upEntity")||M(e,"value")||M(e,"hint")||dt(s);return`
    <article class="card-list-item${r?" is-active":""}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${t}">
        <strong>${h(o)}</strong>
        <span class="meta">${h(re(a,s))}</span>
        <div class="meta">${h(l)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
      </div>
    </article>
  `}function Fa(a,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${h(e)}"
    >
      <strong>${h(re(a,e))}</strong>
      <span>${h(dt(e))}</span>
    </button>
  `}function _a(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function Oa(a){var W;const e=ga[$e()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const r=document.createElement("section");r.id="scene-editor-shell",r.innerHTML=`
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
                ${ge.map(p=>`<option value="${h(p.id)}">${h(p.label[$e()])}</option>`).join("")}
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
  `,document.body.appendChild(r),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=r.querySelector("[data-preview-stage]"),o=r.querySelector("[data-preview-resolution]"),l=r.querySelector("[data-preview-display]"),m=r.querySelector("[data-dashboard]");if(!s||!o||!l||!m)throw new Error("Missing native editor shell elements");s.appendChild(t);const n={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:he,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},S=async p=>{const u=String(p||"").trim();if(!u||!a.avatarPackApiUrl){n.avatarPackDetails=null,n.avatarPackLoading=!1,n.avatarPackDirty=!1;return}n.avatarPackLoading=!0,f();try{n.avatarPackDetails=await La(a.avatarPackApiUrl,u),n.avatarPackDirty=!1}catch(c){n.avatarPackDetails=null,n.avatarPackDirty=!1,C(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{n.avatarPackLoading=!1}},k=()=>{const p=je(n.previewDisplayId);l.value=p.id,o.textContent=va(p),s.style.width=`${p.width}px`,s.style.height=`${p.height}px`,t.style.width=`${p.width}px`,t.style.height=`${p.height}px`},P=typeof ResizeObserver<"u"?new ResizeObserver(()=>k()):null;P==null||P.observe(s);const f=()=>{const p=n.config,u=p?H(p):[],c=u.find(y=>y.id===n.selectedPageId)||u[0]||null,w=Array.isArray(c==null?void 0:c.cards)?c.cards:[],T=n.selectedCardIndex!==null&&w[n.selectedCardIndex]||null,E=Aa(n.haEntities,n.entitySearch),L=n.focusedBinding?e.entityBindingActive(M(w[n.focusedBinding.cardIndex],"caption")||`${e.cards} #${n.focusedBinding.cardIndex+1}`,Ce(e,n.focusedBinding.field)):e.entityBindingEmpty,x=p?Se(p):"",N=n.avatarCatalog.find(y=>y.id===x)||null,Y=n.pendingAvatarZipName?e.avatarImportSelected(n.pendingAvatarZipName):e.avatarImportHint,g=n.avatarImportStatus?`<div class="scene-editor-status" data-tone="${n.avatarImportTone}">${h(n.avatarImportStatus)}</div>`:"";m.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${n.statusTone}">${h(n.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${h(a.sceneUrl)}">${e.viewOnly}</a>
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
              <div class="avatar-pack-meta">
                <div class="field is-wide">
                  <label for="avatar-pack-select">${e.avatarPack}</label>
                  <select id="avatar-pack-select" data-avatar-pack>
                    <option value="">${e.avatarPackCurrent}</option>
                    ${n.avatarCatalog.map(y=>`<option value="${h(y.id)}"${y.id===x?" selected":""}>${h(y.name||y.id)}</option>`).join("")}
                  </select>
                </div>
                <div class="meta">${n.avatarCatalog.length?e.avatarPackHint:e.avatarPackEmpty}</div>
                <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              </div>
              <div class="avatar-pack-preview">
                ${N!=null&&N.previewUrl?`<img src="${h(N.previewUrl)}" alt="${h(N.name||N.id)}">`:`<span>${h((N==null?void 0:N.name)||e.avatarPackCurrent)}</span>`}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <label for="avatar-pack-archive">${e.avatarImportSelect}</label>
                <input id="avatar-pack-archive" type="file" accept=".zip,application/zip" data-avatar-archive>
              </div>
              <div class="meta">${h(Y)}</div>
              <div class="page-chip-actions">
                <button class="scene-editor-button" type="button" data-action="import-avatar"${n.avatarImporting||!n.pendingAvatarZip||!a.avatarImportUrl?" disabled":""}>
                  ${n.avatarImporting?e.avatarImporting:e.avatarImportButton}
                </button>
              </div>
              ${g}
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
            ${u.map((y,U)=>`
              <article class="page-chip ${y.id===((c==null?void 0:c.id)||"")?"is-active":""}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${h(y.id)}">
                  <strong>${h(y.title||y.id||`Page ${U+1}`)}</strong>
                  <span class="meta">${h(We(e,y.kind))} · ${h(e.pageCards(Array.isArray(y.cards)?y.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${h(y.id)}"${U===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${h(y.id)}"${U===u.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${h(y.id)}"${u.length<=1?" disabled":""}>${e.remove}</button>
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
              ${ae(e.fieldPageId,"id",K(c,"id"),!0)}
              ${qe(e.fieldKind,"kind",K(c,"kind"),pa.map(y=>({value:y,label:We(e,y)})))}
              ${ae(e.fieldTitle,"title",K(c,"title"),!0)}
              ${ae(e.fieldSubtitle,"subtitle",K(c,"subtitle"),!0)}
              ${ae(e.fieldSlot,"slot",K(c,"slot"))}
              ${qe(e.fieldCardStyle,"cardStyle",K(c,"cardStyle")||"full",fa.map(y=>({value:y,label:y==="mini"?e.styleMini:e.styleFull})))}
              ${ae(e.fieldStampCaption,"stampCaption",K(c,"stampCaption"))}
              ${ae(e.fieldStampValue,"stampValue",K(c,"stampValue"))}
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
                  ${nt.map(y=>Fa(e,y)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${w.length?w.map((y,U)=>Ba(e,y,U,w.length,U===n.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${T?Ma(e,T,n.selectedCardIndex||0,n.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              <div class="meta">${h(L)}</div>
            </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${h(n.entitySearch)}">
          </div>
          <div class="ha-list">
            ${E.length?E.map(y=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${h(y.name)}</strong>
                    <div class="meta">${h(y.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${h(y.entityId)}"${n.focusedBinding?"":" disabled"}>${e.useEntity}</button>
                </div>
                <code>${h(y.entityId)}</code>
                <div class="ha-state">${h(y.state)}${y.unit?` · ${h(y.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `,k()},C=(p,u)=>{n.status=p,n.statusTone=u,f()},$=()=>{if(!n.config)return;const p=H(n.config);if(!p.length){n.selectedPageId=null;return}(!n.selectedPageId||!p.some(w=>w.id===n.selectedPageId))&&(n.selectedPageId=p[0].id);const u=p.find(w=>w.id===n.selectedPageId)||null,c=Array.isArray(u==null?void 0:u.cards)?u.cards:[];c.length?(n.selectedCardIndex===null||n.selectedCardIndex>=c.length)&&(n.selectedCardIndex=0):(n.selectedCardIndex=null,n.focusedBinding=null),ka(n.selectedPageId),xa(ya(n.config,n.selectedPageId))},I=()=>{n.dirty=!0,C(e.statusDirty,"muted")},F=()=>{const p=new URL(window.location.href);p.searchParams.set("editor","1"),n.selectedPageId&&p.searchParams.set("editorPage",n.selectedPageId),p.searchParams.set("v",String(Date.now())),window.location.replace(p.toString())},j=(p,u)=>{if(!n.config||!n.selectedPageId)return;const c=n.config.pages.find(w=>w.id===n.selectedPageId);if(c){if(p==="slot")c.slot=u===""?void 0:Number(u);else if(p==="id"){const w=st(n.config,u||"page"),T=c.id;c.id=w,n.config.rotation.order=n.config.rotation.order.map(E=>E===T?w:E),n.selectedPageId=w}else p==="title"||p==="subtitle"||p==="stampCaption"||p==="stampValue"?c[p]=u:p==="kind"?c.kind=u:p==="cardStyle"&&(c.cardStyle=u);I(),$()}},G=(p,u)=>{if(!n.config)return;const c=ot(n.config),w=c.safeArea||{},T=u===""?null:Number(u),E=Number.isFinite(T)?T:null;p==="safeTop"?w.top=E??0:p==="safeRight"?w.right=E??0:p==="safeBottom"?w.bottom=E??0:p==="safeLeft"?w.left=E??0:p==="layoutPaddingPx"?c.layoutPaddingPx=E??16:p==="layoutGapPx"?c.layoutGapPx=E??16:p==="globalScale"&&(c.globalScale=E??1),c.safeArea=w,I()},q=(p,u,c)=>{var E;if(!n.config||!n.selectedPageId)return;const w=n.config.pages.find(L=>L.id===n.selectedPageId);if(!w)return;Array.isArray(w.cards)||(w.cards=[]);const T=w.cards[p];if(T){if(u==="type"){const L=ze(c);if(w.cards[p]={...L,caption:M(T,"caption")||L.caption},((E=n.focusedBinding)==null?void 0:E.cardIndex)===p){const x=Ge(c);n.focusedBinding=x?{cardIndex:p,field:x}:null}}else u==="digits"?T[u]=c===""?0:Number(c):T[u]=c;I()}},J=p=>{if(!n.config||!n.selectedPageId||!n.focusedBinding)return;const u=n.config.pages.find(T=>T.id===n.selectedPageId),c=n.haEntities.find(T=>T.entityId===p);if(!u||!Array.isArray(u.cards)||!c)return;const w=u.cards[n.focusedBinding.cardIndex];w&&(_a(w,n.focusedBinding.field,c),I(),f())},se=(p,u)=>{n.selectedCardIndex=p,n.focusedBinding={cardIndex:p,field:u},f(),window.requestAnimationFrame(()=>{const c=r.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};r.addEventListener("click",async p=>{var N,Y;const u=p.target,c=u==null?void 0:u.closest("[data-action]"),w=c==null?void 0:c.dataset.action;if(!w)return;if(w==="apply-display-profile"&&n.config){Sa(n.config,je(n.previewDisplayId)),I(),f();return}if(w==="import-avatar"){if(!n.config||!a.avatarImportUrl||!n.pendingAvatarZip||n.avatarImporting)return;n.avatarImporting=!0,n.avatarImportStatus=e.avatarImporting,n.avatarImportTone="muted",f();try{const g=await Ta(a.avatarImportUrl,n.pendingAvatarZip);n.avatarCatalog=a.avatarCatalogUrl?await Ke(a.avatarCatalogUrl):[g],Ve(n.config).packId=g.id,await S(g.id),n.pendingAvatarZip=null,n.pendingAvatarZipName="",n.avatarImporting=!1,n.avatarImportStatus=e.avatarImportSuccess(g.name||g.id),n.avatarImportTone="ok",I(),f()}catch(g){n.avatarImporting=!1,n.avatarImportStatus=`${e.avatarImportError}: ${String(g)}`,n.avatarImportTone="bad",f()}return}if(!n.config)return;const T=H(n.config),E=(c==null?void 0:c.dataset.pageId)||null,L=E?T.findIndex(g=>g.id===E):-1;if(w==="select-page"&&E){n.selectedPageId=E,n.selectedCardIndex=0,n.focusedBinding=null,$(),f();return}if(w==="page-up"&&L>0){const g=T.map(y=>y.id);[g[L-1],g[L]]=[g[L],g[L-1]],n.config.rotation.order=g,n.selectedPageId=E,I(),$(),f();return}if(w==="page-down"&&L>=0&&L<T.length-1){const g=T.map(y=>y.id);[g[L],g[L+1]]=[g[L+1],g[L]],n.config.rotation.order=g,n.selectedPageId=E,I(),$(),f();return}if(w==="page-remove"&&E&&T.length>1){n.config.pages=n.config.pages.filter(g=>g.id!==E),n.config.rotation.order=H(n.config).map(g=>g.id),n.selectedPageId=((N=H(n.config)[Math.max(0,L-1)])==null?void 0:N.id)||((Y=H(n.config)[0])==null?void 0:Y.id)||null,n.selectedCardIndex=0,n.focusedBinding=null,I(),$(),f();return}if(w==="add-page"){const g=wa(n.config);n.config.pages.push(g),n.config.rotation.order=H(n.config).map(y=>y.id),n.selectedPageId=g.id,n.selectedCardIndex=null,n.focusedBinding=null,I(),$(),f();return}if(w==="add-card-template"&&n.selectedPageId){const g=n.config.pages.find(U=>U.id===n.selectedPageId),y=(c==null?void 0:c.dataset.cardType)||"entity";if(g){Array.isArray(g.cards)||(g.cards=[]),g.cards.push(ze(y));const U=g.cards.length-1;n.selectedCardIndex=U;const te=Ge(y);n.focusedBinding=te?{cardIndex:U,field:te}:null,I(),f(),te&&window.requestAnimationFrame(()=>{const z=r.querySelector("#ha-entity-search");z==null||z.scrollIntoView({behavior:"smooth",block:"center"}),z==null||z.focus()})}return}if(w==="focus-binding"){const g=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),y=(c==null?void 0:c.dataset.bindingField)||"";g>=0&&y&&se(g,y);return}const x=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(x>=0&&n.selectedPageId){const g=n.config.pages.find(y=>y.id===n.selectedPageId);if(!g||!Array.isArray(g.cards))return;if(w==="select-card"){n.selectedCardIndex=x,f();return}if(w==="card-remove"){g.cards=g.cards.filter((y,U)=>U!==x),n.selectedCardIndex!==null&&(n.selectedCardIndex===x?n.selectedCardIndex=g.cards.length?Math.min(x,g.cards.length-1):null:n.selectedCardIndex>x&&(n.selectedCardIndex-=1)),n.focusedBinding&&(n.focusedBinding.cardIndex===x?n.focusedBinding=null:n.focusedBinding.cardIndex>x&&(n.focusedBinding={cardIndex:n.focusedBinding.cardIndex-1,field:n.focusedBinding.field})),I(),f();return}if(w==="card-up"&&x>0){[g.cards[x-1],g.cards[x]]=[g.cards[x],g.cards[x-1]],n.selectedCardIndex===x?n.selectedCardIndex=x-1:n.selectedCardIndex===x-1&&(n.selectedCardIndex=x),n.focusedBinding&&(n.focusedBinding.cardIndex===x?n.focusedBinding={cardIndex:x-1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===x-1&&(n.focusedBinding={cardIndex:x,field:n.focusedBinding.field})),I(),f();return}if(w==="card-down"&&x<g.cards.length-1){[g.cards[x],g.cards[x+1]]=[g.cards[x+1],g.cards[x]],n.selectedCardIndex===x?n.selectedCardIndex=x+1:n.selectedCardIndex===x+1&&(n.selectedCardIndex=x),n.focusedBinding&&(n.focusedBinding.cardIndex===x?n.focusedBinding={cardIndex:x+1,field:n.focusedBinding.field}:n.focusedBinding.cardIndex===x+1&&(n.focusedBinding={cardIndex:x,field:n.focusedBinding.field})),I(),f();return}}if(w==="save"){n.saving=!0,n.avatarPackSaving=n.avatarPackDirty,C(e.saving,"muted");try{if(n.avatarPackDirty&&n.avatarPackDetails&&a.avatarPackApiUrl){try{n.avatarPackDetails=await Ua(a.avatarPackApiUrl,n.avatarPackDetails)}catch(g){throw new Error(`${e.avatarMappingSaveError}: ${String(g)}`)}n.avatarPackDirty=!1}n.config=await Ia(a.sceneApiUrl,Ae(n.config)),n.dirty=!1,n.saving=!1,n.avatarPackSaving=!1,$(),C(e.statusSaved,"ok"),window.setTimeout(()=>F(),250)}catch(g){n.saving=!1,n.avatarPackSaving=!1,C(`${e.saveError}: ${String(g)}`,"bad")}return}if(w==="bind-entity"){const g=(c==null?void 0:c.dataset.entityId)||"";J(g)}}),r.addEventListener("input",p=>{const u=p.target;if(!u||!n.config){u!=null&&u.dataset.previewDisplay&&(n.previewDisplayId=u.value||he,k());return}if(u.dataset.previewDisplay){n.previewDisplayId=u.value||he,k();return}if(u.dataset.avatarPack!==void 0){Ve(n.config).packId=u.value.trim()||null,I(),S(u.value.trim()||null).finally(()=>f()),f();return}if(u.dataset.avatarSemantic!==void 0){const c=Se(n.config);if(!n.avatarPackDetails||!c||n.avatarPackDetails.packId!==c)return;const w=u.value.trim();w?n.avatarPackDetails.motionMap.semantic[u.dataset.avatarSemantic]=Number(w):delete n.avatarPackDetails.motionMap.semantic[u.dataset.avatarSemantic],n.avatarPackDirty=!0,C(e.statusDirty,"muted"),f();return}if(u.dataset.pageField){j(u.dataset.pageField,u.value),f();return}if(u.dataset.displayField){G(u.dataset.displayField,u.value),f();return}if(u.dataset.cardField&&u.dataset.cardIndex){n.selectedCardIndex=Number(u.dataset.cardIndex),q(Number(u.dataset.cardIndex),u.dataset.cardField,u.value),f();return}u.hasAttribute("data-ha-search")&&(n.entitySearch=u.value,f())}),r.addEventListener("change",p=>{var w;const u=p.target;if(!(u!=null&&u.dataset.avatarArchive))return;const c=((w=u.files)==null?void 0:w[0])||null;n.pendingAvatarZip=c,n.pendingAvatarZipName=(c==null?void 0:c.name)||"",n.avatarImportStatus="",n.avatarImportTone="muted",f()}),r.addEventListener("focusin",p=>{const u=p.target;if(!(u!=null&&u.dataset.bindingField))return;const c=Number(u.dataset.cardIndex||"-1");c<0||(n.selectedCardIndex=c,n.focusedBinding={cardIndex:c,field:u.dataset.bindingField})});try{if(n.config=await Ca(a.sceneApiUrl),a.avatarCatalogUrl)try{n.avatarCatalog=await Ke(a.avatarCatalogUrl)}catch{n.avatarCatalog=[]}n.haEntities=Ea(((W=Qe())==null?void 0:W.states)||null),n.selectedPageId=$a(n.config),n.selectedCardIndex=0,n.status=e.statusSaved,n.statusTone="ok",await S(Se(n.config)),$()}catch(p){n.status=`${e.loadError}: ${String(p)}`,n.statusTone="bad"}f()}const Ha="../scene-api/bootstrap",ja="weather.forecast_home_assistant",za="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Va={...et,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Wa={...tt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},Ka={...at,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Ga={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},qa={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Ja(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Ya(){return new URLSearchParams(window.location.search).get("bootstrap")||Ha}function Za(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function D(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const r=Za(e);if(r)return new URL(t.slice(1),r).toString()}return new URL(t,i).toString()}function Ie(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function Xa(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function Qa(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function xe(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function ei(a,e){var t,i,r,s,o,l,m,n;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([S,k])=>[S,D(k,e)]).filter(([,S])=>!!S)),avatar:{manifestUrl:D(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:D(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((r=a.state)==null?void 0:r.provider)||"json",stateUrl:D(String(((s=a.state)==null?void 0:s.stateUrl)||"").trim(),e),haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:D(String(((l=a.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:D(String(((m=a.state)==null?void 0:m.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:D(String(((n=a.control)==null?void 0:n.controlUrl)||"").trim(),e)}}}async function ti(a,e){var n,S,k,P;const t=D(String(((n=a.files)==null?void 0:n.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=D(String(((S=a.files)==null?void 0:S.sceneConfigUrl)||"").trim(),e),r=D(String(((k=a.files)==null?void 0:k.avatarCatalogUrl)||"").trim(),e);if(!i||!r)return t;let s="";try{const f=await xe(i);s=String(((P=f.avatar)==null?void 0:P.packId)||"").trim()}catch{s=""}if(!s)return t;let o="";try{const f=await xe(r),C=Array.isArray(f.items)?f.items.find($=>String($.id||"").trim()===s):null;o=D(String((C==null?void 0:C.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return t;const m={...ei(await xe(t),t),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(m)],{type:"application/json"}))}const le=document.getElementById("app");if(!le)throw new Error("Missing #app root element");const ie=qa[Ja()];Ie(le,ie.startingTitle,ie.startingBody);(async()=>{var e,t,i;const a=Ya();try{const r=await Qa(a),s=String(r.packId||"").trim(),o=s.toLowerCase()==="neiri",l=await ti(r,a);if(!l){Ie(le,ie.missingRendererTitle,ie.missingRendererBody,JSON.stringify(r,null,2));return}document.documentElement.dataset.packId=s,document.title=o?"Нейри":s?`kiosk-scene hosted runtime (${s})`:"kiosk-scene hosted runtime",await ua(le,{rendererConfigUrl:l,weatherUrl:o?"./weather.json":void 0,weatherReader:o?da({weatherEntity:ja,openMeteoUrl:za,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:o?Va:void 0,labels:o?Wa:void 0,presetLabels:o?Ka:void 0,defaultWeather:o?Ga:void 0}),Xa()&&await Oa({packId:s,sceneApiUrl:D(String(r.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:D(String(((e=r.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),avatarImportUrl:D(String(((t=r.files)==null?void 0:t.avatarImportUrl)||"").trim(),a),avatarPackApiUrl:D(String(((i=r.files)==null?void 0:i.avatarPackApiUrl)||"").trim(),a),sceneUrl:D(String(r.entryUrl||r.runtimeBaseUrl||"./").trim(),a)})}catch(r){Ie(le,ie.failedTitle,ie.failedBody,String(r))}})();
