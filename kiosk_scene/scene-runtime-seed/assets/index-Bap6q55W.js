var it=Object.defineProperty;var st=(a,e,t)=>e in a?it(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var g=(a,e,t)=>st(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function A(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function n(a,e=160){const t=String(a??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Le(a){const e=new Date(String(a??""));return Number.isNaN(e.getTime())?0:e.getTime()}function ne(a,e){if(!A(a)||!A(e))return e??a;const t={...a};for(const[i,s]of Object.entries(e)){if(Array.isArray(s)){t[i]=s.slice();continue}if(A(s)&&A(t[i])){t[i]=ne(t[i],s);continue}t[i]=s}return t}function rt(a,e=40){return Array.isArray(a)?a.map(t=>n(t,e).toLowerCase()).filter(Boolean):[]}const K={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},Ue={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function we(a){var t,i,s,r,o,d,p,v,l,S;const e=ne(K,A(a)?a:{});return{version:1,assistant:{name:n((t=e.assistant)==null?void 0:t.name,40)||K.assistant.name,locale:n((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:A(e.links)?Object.fromEntries(Object.entries(e.links).map(([E,f])=>[n(E,64),n(f,1024)]).filter(([E,f])=>E&&f)):{},avatar:{manifestUrl:n((s=e.avatar)==null?void 0:s.manifestUrl,1024)||K.avatar.manifestUrl},scene:{configUrl:n((r=e.scene)==null?void 0:r.configUrl,1024)||K.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:n((d=e.state)==null?void 0:d.stateUrl,1024)||K.state.stateUrl,haApiFallback:((p=e.state)==null?void 0:p.haApiFallback)===!0,idleLinesUrl:n((v=e.state)==null?void 0:v.idleLinesUrl,1024)||K.state.idleLinesUrl,entityMapUrl:n((l=e.state)==null?void 0:l.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:n((S=e.control)==null?void 0:S.controlUrl,1024)||K.control.controlUrl}}}function ze(a){var t,i,s,r,o;const e=ne(Ue,A(a)?a:{});return{version:1,adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:n(e.assetRoot,1024)||Ue.assetRoot,runtimeUrl:n(e.runtimeUrl,1024)||"",entry:n(e.entry,1024)||"",modelUrl:n(e.modelUrl,1024)||"",fallbackPortrait:n(e.fallbackPortrait,1024)||"",motionMapUrl:n(e.motionMapUrl,1024)||"",expressionMapUrl:n(e.expressionMapUrl,1024)||"",presetThumbs:A(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([d,p])=>[n(d,32),n(p,1024)]).filter(([d,p])=>d&&p)):{},viewPresets:A(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([d,p])=>n(d,32)&&A(p))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((s=e.capabilities)==null?void 0:s.supportsViewPresets)!==!1,supportsLipSync:((r=e.capabilities)==null?void 0:r.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const X={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},nt=["full","torso","head"];function re(a,e=Date.now()){var d,p,v,l,S,E,f;const t=ne(X,A(a)?a:{}),i={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((d=t.page)==null?void 0:d.mode)==="pinned"?"pinned":"auto",target:n((p=t.page)==null?void 0:p.target,40)||null,until:n((v=t.page)==null?void 0:v.until,64)||null},cue:{cue:n((l=t.cue)==null?void 0:l.cue,32)||null,emotion:n((S=t.cue)==null?void 0:S.emotion,32)||null,motion:n((E=t.cue)==null?void 0:E.motion,32)||null,until:n((f=t.cue)==null?void 0:f.until,64)||null}},s=n(t.viewPreset,16).toLowerCase();i.viewPreset=nt.includes(s)?s:null;const r=Le(i.page.until);i.page.mode==="pinned"&&(!r||r<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=Le(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function ge(a,e,t=Date.now()){return re(ne(re(a,t),A(e)?e:{}),t)}function ot(a,e,t=Date.now()){return re({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,viewPreset:e},t)}function lt(a,e,t=3e4,i=Date.now()){const s=n(e,40),r=new Date(i+Math.max(5e3,Number(t)||0)).toISOString();return re({...a,revision:Math.max(0,Number(a==null?void 0:a.revision)||0)+1,page:{mode:s?"pinned":"auto",target:s||null,until:s?r:null}},i)}function We(a,e){var o,d,p;const t={...a||{}},i=n((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),s=n((d=e==null?void 0:e.cue)==null?void 0:d.emotion,32),r=n((p=e==null?void 0:e.cue)==null?void 0:p.motion,32);return i&&(t.cue=i),s&&(t.emotion=s),r&&(t.motion=r),t}function M(a,e){const t=Number(a);return Number.isFinite(t)?Math.max(0,t):e}function Ie(a,e=1){const t=Number(a);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function dt(a){return A(a)&&A(a.config)?a.config:a}function ct(a,e){const t={...a};return A(e)&&(typeof e.id=="string"&&(t.id=n(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(i=>A(i)))),t}function me(a,e){const t=dt(a),i=Array.isArray(e.pages)?e.pages.slice():[],s=A(t)&&Array.isArray(t.pages)?t.pages:[],r=i.map(f=>{const C=s.find($=>n(A($)?$.id:"",40)===f.id);return ct(f,C)}),o=A(t)&&A(t.rotation)?t.rotation:{},d=A(e.display)?e.display:{},p=A(t)&&A(t.display)?t.display:{},v=A(d.safeArea)?d.safeArea:{},l=A(p.safeArea)?p.safeArea:{},S=Array.isArray(o.order)?o.order:e.rotation.order,E=rt(S).filter((f,C,$)=>r.some(P=>P.id===f)&&$.indexOf(f)===C);return{version:1,rotation:{order:E.length?E:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:M(l.top,M(v.top,0)),right:M(l.right,M(v.right,0)),bottom:M(l.bottom,M(v.bottom,0)),left:M(l.left,M(v.left,0))},layoutPaddingPx:M(p.layoutPaddingPx,M(d.layoutPaddingPx,16)),layoutGapPx:M(p.layoutGapPx,M(d.layoutGapPx,16)),globalScale:Ie(p.globalScale,Ie(d.globalScale,1))},pages:r}}function ut(a,e=220){const t=n(a,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},s=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(r,o,d)=>{const p=n(o,16).toLowerCase(),v=n(d,32).toLowerCase();return(p==="emotion"||p==="activity"||p==="cue"||p==="motion")&&v&&(i[p]=v)," "});return{text:n(s,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const pt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function te(a,e={}){const t=A(a)?a:{},i={...pt,...e};return{version:1,assistant:n(t.assistant??i.assistant,40),online:typeof t.online=="boolean"?t.online:i.online,busy:typeof t.busy=="boolean"?t.busy:i.busy,status:n(t.status??i.status,255),message:n(t.message??i.message,255),source:n(t.source??i.source,64),updatedAt:n(t.updatedAt??i.updatedAt,64),emotion:n(t.emotion??i.emotion,32)||null,activity:n(t.activity??i.activity,32)||null,cue:n(t.cue??i.cue,32)||null,intensity:ft(t.intensity??i.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!i.speaking,motion:n(t.motion??i.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):i.revision,event:n(t.event??i.event,64)}}function ft(a){if(a==null||a==="")return null;const e=Number(a);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function ht(a,e){return a.order[e]||a.order[0]||""}function gt(a,e){const t=a.order.findIndex(i=>i===e);return t>=0?t:0}function mt(a,e,t,i){const s=Array.isArray(a.order)?a.order:[];if(!s.length)return 0;const r=Math.max(0,Math.min(e,s.length-1));for(let o=1;o<=s.length;o+=1){const d=(r+o*t+s.length)%s.length;if(i(s[d]))return d}return r}function yt(a){const e=a.now??Date.now(),t=Array.isArray(a.rotation.order)&&a.rotation.order.length?a.rotation.order:[],i=Math.max(5e3,Number(a.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const s=a.control.page;if(s.mode==="pinned"&&s.target)return{nextIndex:gt(a.rotation,s.target),nextAutoRotateAt:e,pinnedKey:`${s.target}:${s.until||""}`};if(a.force){const o=ht(a.rotation,a.activeIndex);return{nextIndex:a.isEligible(o)?a.activeIndex:Math.max(0,t.findIndex(p=>a.isEligible(p))),nextAutoRotateAt:e,pinnedKey:""}}if(e-a.lastAutoRotateAt<i)return{nextIndex:a.activeIndex,nextAutoRotateAt:a.lastAutoRotateAt,pinnedKey:""};let r=a.activeIndex;for(let o=1;o<=t.length;o+=1){const d=(a.activeIndex+o)%t.length;if(a.isEligible(t[d])){r=d;break}}return{nextIndex:r,nextAutoRotateAt:e,pinnedKey:""}}const Ge={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},vt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function De(a){const e=n(a,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:vt.some(t=>e.includes(t)):!1}function bt(a,e){const t=te(a),i=n(t.status,72),s=n(t.message,220);if(!(t.online!==!1&&(De(i)||De(s))))return{state:t,hasTechnicalFailure:!1};const d=n(t.emotion,32).toLowerCase(),p=n(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:n(e==null?void 0:e.healthyStatus,72),message:"",emotion:d==="error"?"calm":d||null,activity:n(t.activity,32).toLowerCase()==="error"?"idle":n(t.activity,32)||null,cue:n(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:p==="error"?"idle_soft":p||null},hasTechnicalFailure:!0}}function wt(a,e){const t=(e==null?void 0:e.copy)??Ge,i=te(a),s=ut(i.message,220),r=bt({...i,message:s.text,emotion:n(i.emotion,32)||s.emotion||null,activity:n(i.activity,32)||s.activity||null,cue:n(i.cue,32)||s.cue||null,motion:n(i.motion,32)||s.motion||null},{healthyStatus:t.technicalHealthyLabel}),o=r.state,d=n(o.message,180),p=n(o.activity,32).toLowerCase(),v=o.online!==!1&&p!=="offline",l=!!o.busy||p==="thinking"||p==="busy"||p==="acting",S=o.speaking===!0||p==="speaking",E=v?l?t.busyLabel:d||S?t.speakingLabel:r.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,f=d?t.messageCaption:r.hasTechnicalFailure?t.statusCaption:t.modeCaption,C=d||(v?l?t.busyBody:n(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:o,hasTechnicalFailure:r.hasTechnicalFailure,caption:f,label:E,body:C,bodyKey:[f,E,C].join(":")}}function St(a=28e3,e=52e3){return a+Math.floor(Math.random()*e)}function Re(a,e=-1){const t=Array.isArray(a)?a.map(s=>n(s,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*t.length);return t.length>1&&i===e&&(i=(i+1)%t.length),{line:t[i],index:i}}function xt(a){const e=(a==null?void 0:a.online)!==!1,t=!!(a!=null&&a.busy),i=!!n(a==null?void 0:a.message,180);return e&&!t&&!i}const $t={cue:null,emotion:null,motion:null,until:null},Ct={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Et(a){return!!a&&typeof a=="object"&&!Array.isArray(a)}function qe(a){return a.endsWith("/")?a:`${a}/`}function oe(a,e){const t=n(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const i=new URL(qe(n(a,1024)||"."),window.location.href);return new URL(t,i).toString()}function de(a){const e=n(a,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function Pt(a,e,t){const i=n(a.runtimeUrl,1024)||n(e.runtimeUrl,1024);return i?de(i):new URL("../avatar.html",new URL(qe(n(t,1024)||"."),window.location.href)).toString()}function kt(a,e){const t=n(e,512);if(t)return t;try{return new URL(a,window.location.href).origin||"*"}catch{return"*"}}function At(a,e){const t=new URL(a,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[s,r]of Object.entries(i)){const o=n(s,64);if(!o||r==null)continue;const d=typeof r=="boolean"?r?"1":"0":String(r);t.searchParams.set(o,d)}return t.toString()}function Tt(a,e,t){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([s,r])=>[n(s,32),oe(t,r)]).filter(([s,r])=>s&&r));return{version:1,assistant:{name:n(a.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(a.links||{}).map(([s,r])=>[n(s,64),de(r)]).filter(([s,r])=>s&&r)),state:{stateUrl:de(a.state.stateUrl),idleLinesUrl:de(a.state.idleLinesUrl||""),haApiFallback:a.state.haApiFallback===!0},assetPack:{modelJson:oe(t,n(e.modelUrl,1024)||n(e.entry,1024)),fallbackPortrait:oe(t,e.fallbackPortrait||""),motionMapUrl:oe(t,e.motionMapUrl||""),presetThumbs:i}}}class Lt{constructor(e={}){g(this,"id","live2d");g(this,"options");g(this,"manifest");g(this,"rendererConfig");g(this,"host",null);g(this,"containerEl",null);g(this,"iframeEl",null);g(this,"splashEl",null);g(this,"splashTextEl",null);g(this,"assetRoot","");g(this,"currentState");g(this,"currentCue",{...$t});g(this,"currentPreset","full");g(this,"currentBubble",{...Ct});g(this,"targetOrigin","*");g(this,"isReady",!1);g(this,"bubbleRevision",0);g(this,"handleWindowMessage",e=>{var s;const t=(s=this.iframeEl)==null?void 0:s.contentWindow;if(!t||e.source!==t||!Et(e.data))return;const i=n(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=ze({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=we(e.rendererConfig||{}),this.currentState=te({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=n(e.assetRoot,1024)||this.manifest.assetRoot;const t=Pt(this.options,this.manifest,this.assetRoot),i=At(t,this.options);this.targetOrigin=kt(i,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const r=document.createElement("iframe");r.className="ks-live2d-iframe",r.src=i,r.title=n(this.options.iframeTitle,80)||`${n(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,r.loading="eager",r.allow="autoplay",Object.assign(r.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),n(this.options.iframeSandbox,255)&&r.setAttribute("sandbox",n(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);s.append(r,o),this.host.append(s),r.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=r,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=te(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:n(e==null?void 0:e.cue,32)||null,emotion:n(e==null?void 0:e.emotion,32)||null,motion:n(e==null?void 0:e.motion,32)||null,until:n(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const i=n(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const s=document.createElement("div");s.textContent=n(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(s.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const r=document.createElement("div");return r.dataset.live2dSplashText="true",r.textContent="Loading compatibility renderer...",Object.assign(r.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(s,r),t.append(i),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Tt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=We(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const t=(i=this.iframeEl)==null?void 0:i.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function Ut(a={}){return new Lt(a)}const It={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Ne={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Dt{constructor(e={}){g(this,"id","static");g(this,"options");g(this,"host",null);g(this,"frameEl",null);g(this,"imageEl",null);g(this,"bubbleEl",null);g(this,"fallbackEl",null);g(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const s=document.createElement("div");s.className="ks-static-avatar-fallback",s.textContent=this.options.alt||"Avatar",Object.assign(s.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const r=document.createElement("div");r.className="ks-static-avatar-bubble",Object.assign(r.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(i,s,r),this.host.append(t),this.frameEl=t,this.imageEl=i,this.bubbleEl=r,this.fallbackEl=s;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||Ne,i=t[e]||t.full||Ne.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return It}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const i=e.replace(/\/+$/,""),s=t.replace(/^\.?\//,"");return i?`${i}/${s}`:s}}function Rt(a={}){return new Dt(a)}function Nt(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function Ke(){var a;for(const e of Nt())try{const t=(a=e==null?void 0:e.document)==null?void 0:a.querySelector("home-assistant"),i=t==null?void 0:t.hass;if(i!=null&&i.states)return i}catch{continue}return null}function Ft(){if(typeof window>"u"||!window.localStorage)return"";try{const a=window.localStorage.getItem("hassTokens");if(!a)return"";const e=JSON.parse(a);return n(e==null?void 0:e.access_token,4096)}catch{return""}}function Mt(a){if(!Array.isArray(a))return null;const e={};for(const t of a){if(!t||typeof t!="object")continue;const i=n(t.entity_id,255);i&&(e[i]=t)}return e}function _t(a,e,t="Assistant"){const i=a[e.status],s=a[e.message],r=a[e.online],o=a[e.busy],d=a[e.source],p=a[e.updatedAt],v=e.emotion?a[e.emotion]:null,l=e.activity?a[e.activity]:null,S=e.cue?a[e.cue]:null,E=e.speaking?a[e.speaking]:null,f=e.intensity?a[e.intensity]:null,C=e.motion?a[e.motion]:null,$=a[e.revision];if(!i&&!s&&!r&&!o)return null;const P=n(i==null?void 0:i.state,72),F=n(s==null?void 0:s.state,220),H=n(p==null?void 0:p.state,64),z=ye(r,!0),W=ye(o,!1),G=n(l==null?void 0:l.state,32)||"",c=ye(E)??G==="speaking",u=G||(z?c?"speaking":W?"thinking":"idle":"offline");return te({version:1,assistant:n(t,40)||"Assistant",online:z,busy:W,status:P&&P!=="unknown"&&P!=="unavailable"?P:"",message:F&&F!=="unknown"&&F!=="unavailable"?F:"",source:n(d==null?void 0:d.state,64)||"ha",updatedAt:H&&H!=="unknown"&&H!=="unavailable"?H:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:n(v==null?void 0:v.state,32)||null,activity:u,cue:n(S==null?void 0:S.state,32)||null,intensity:Bt(f),speaking:c,motion:n(C==null?void 0:C.state,32)||null,revision:Number($==null?void 0:$.state)||0})}function ye(a,e){const t=n(a==null?void 0:a.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function Bt(a){const e=n(a==null?void 0:a.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function Ot(a){const e=xe(a);return{id:"ha-state",async read(){const t=await e.read();return t?_t(t,a.entityMap,a.assistantName):null}}}function xe(a={}){const e=a.fetchImpl??globalThis.fetch,t=Math.max(500,a.cacheTtlMs??2500),i=Math.max(6e4,a.authCooldownMs??600*1e3);let s=null,r=0,o=null,d=0;async function p(){var E;const v=Ke();if(v!=null&&v.states)return v.states;const l=Date.now();if(s&&l-r<t||!a.allowApiFallback||typeof e!="function"||l<d)return s;if(o)return o;const S=n(((E=a.readToken)==null?void 0:E.call(a))??Ft(),4096);return S?(o=e(a.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${S}`}}).then(async f=>{if(!f.ok){const C=new Error(`HA states HTTP ${f.status}`);throw C.status=f.status,C}return f.json()}).then(f=>{const C=Mt(f);return C&&(s=C,r=Date.now()),C||s}).catch(f=>(((f==null?void 0:f.status)===401||(f==null?void 0:f.status)===403)&&(d=Date.now()+i),s)).finally(()=>{o=null}),o):s}return{id:"ha-states",async read(){return p()}}}async function $e(a){const e=a.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=n(a.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const i=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(a.timestampParam||"ts",String(Date.now()));try{const s=await e(i.toString(),{cache:"no-store"});if(!s.ok)throw new Error(`HTTP ${s.status}`);const r=await s.json();return a.sanitize?a.sanitize(r):r}catch(s){if(a.defaultValue!==void 0)return a.defaultValue;throw s}}function Ht(a){return{id:"json-state",async read(){const e=await $e({...a,defaultValue:a.defaultValue});return te(e)}}}function Fe(a){return{id:"json-control",async read(){const e=await $e({...a,defaultValue:a.defaultValue??X});return re(e)}}}function jt(a){return{id:"json-lines",async read(){const e=await $e({...a,defaultValue:a.defaultValue??[]});return Array.isArray(e)?e.map(t=>n(t,220)).filter(Boolean):[]}}}function D(a,e,t=64){return n(a[e],t)}function ie(a,e=0){const t=Number(a);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Vt(a,e="en-US"){const t=n(a,64);if(!t)return"";const i=new Date(t);return Number.isNaN(i.getTime())?t:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function le(a,e){return!a||!e?null:a[e]||null}function zt(a,e=null,t="en-US"){var S,E,f,C;const i=D(a,"caption",40)||D(a,"type",24)||"Card",s=D(a,"hint",72),r=D(a,"type",32).toLowerCase()||"entity",o=D(a,"entity",255),d=le(e,o),p=le(e,D(a,"stateEntity",255)),v=le(e,D(a,"downEntity",255)),l=le(e,D(a,"upEntity",255));if(r==="text"||r==="static"||r==="note")return{caption:i,value:D(a,"value",64)||"—",hint:s||"static card"};if(r==="todo"){const $=Number(d==null?void 0:d.state);return!Number.isFinite($)||$<=0?{caption:i,value:"Clear",hint:s||"nothing pending"}:{caption:i,value:`${$} item${$===1?"":"s"}`,hint:s||"pending tasks"}}if(r==="onoff"){const $=(d==null?void 0:d.state)==="on";return{caption:i,value:$?D(a,"onText",48)||"On":D(a,"offText",48)||"Off",hint:s||"device state"}}if(r==="battery"){const $=ie(d==null?void 0:d.state,0);return{caption:i,value:$?`${$}%`:"—",hint:n(p==null?void 0:p.state,48)||s||"battery level"}}if(r==="network"){const $=ie(v==null?void 0:v.state,0),P=ie(l==null?void 0:l.state,0);return{caption:i,value:$||P?`↓ ${$||"0"} · ↑ ${P||"0"}`:"—",hint:s||"throughput"}}if(r==="time")return{caption:i,value:Vt(d==null?void 0:d.state,t)||"—",hint:s||"next event"};if(r==="percent"){const $=ie(d==null?void 0:d.state,Number(D(a,"digits",4))||0);return{caption:i,value:$?`${$}%`:"—",hint:s||n((S=d==null?void 0:d.attributes)==null?void 0:S.friendly_name,48)||"state percentage"}}if(r==="number"){const $=Number(D(a,"digits",4))||0,P=ie(d==null?void 0:d.state,$),F=D(a,"unit",16)||n((E=d==null?void 0:d.attributes)==null?void 0:E.unit_of_measurement,16);return{caption:i,value:P?`${P}${F?` ${F}`:""}`:"—",hint:s||n((f=d==null?void 0:d.attributes)==null?void 0:f.friendly_name,48)||"numeric value"}}return{caption:i,value:n(d==null?void 0:d.state,64)||D(a,"value",64)||"—",hint:s||n((C=d==null?void 0:d.attributes)==null?void 0:C.friendly_name,48)||"entity state"}}function Wt(a,e=null,t="en-US"){return Array.isArray(a)?a.map(i=>zt(i,e,t)):[]}const Je={...Ge,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Ye={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},Xe={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},Gt={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},ce={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function h(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Qe(a){return a.endsWith("/")?a:`${a}/`}function _(a,e){const t=n(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,a).toString():""}function Ze(a){return new URL(".",a).toString()}function qt(a,e){const t=Ze(e),i=_(t,n(a.assetRoot,1024)||"./assets");return{...a,assetRoot:i,runtimeUrl:_(t,a.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([s,r])=>[s,_(t,r)]).filter(([,s])=>!!s))}}function ve(a){return{...ce,...a||{},metrics:{...ce.metrics,...(a==null?void 0:a.metrics)||{}},forecast:Array.isArray(a==null?void 0:a.forecast)&&a.forecast.length?a.forecast.map(e=>({...e})):ce.forecast.map(e=>({...e}))}}function Me(a,e){return e?{...a,...e,metrics:{...a.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):a.forecast||[]}:a}function N(a,e=0){const t=Number(a);if(!Number.isFinite(t))return"--";const i=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function Kt(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=n(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${N(t)} мм рт. ст.`:`${N(t*.750061683,0)} мм рт. ст.`}function Jt(a,e){const t=Number(a);if(!Number.isFinite(t))return"--";const i=n(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${N(t,1)} м/с`:i==="km/h"||i==="км/ч"?`${N(t/3.6,1)} м/с`:`${N(t,1)} м/с`}function Yt(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Xt(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function Qt(a,e="ru-RU"){const t=new Date(String(a||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function Zt(a,e="ru-RU"){const t=n(a,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||n(a,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function _e(a,e="ru-RU"){const t=Number(a);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function ea(a,e="./assets/icons"){const t=Number(a),i=Qe(e);return t===0?`${i}sun.svg`:[1,2].includes(t)?`${i}cloud-sun.svg`:[3].includes(t)?`${i}cloud.svg`:[45,48].includes(t)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${i}cloud-snow.svg`:[95,96,99].includes(t)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function ta(a){const e=n(a.locale,32)||"ru-RU",t=n(a.iconBaseUrl,1024)||"./assets/icons",i=xe({allowApiFallback:a.allowApiFallback,fetchImpl:a.fetchImpl});return async()=>{var C,$,P,F,H,z,W,G,Q,c,u,m,x,T,k,U,L,b,B,ae;const s=await i.read(),r=a.fetchImpl??globalThis.fetch,o=s==null?void 0:s[a.weatherEntity];let d=null;const p=n(a.openMeteoUrl,4096);if(p&&typeof r=="function")try{const y=await r(`${p}${p.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});y.ok&&(d=await y.json())}catch{d=null}if(!o&&!(d!=null&&d.current))return null;const v=n(o==null?void 0:o.last_changed,64)||n((C=d==null?void 0:d.current)==null?void 0:C.time,64)||new Date().toISOString(),l=o?Zt(o.state,e):_e(($=d==null?void 0:d.current)==null?void 0:$.weather_code,e),S=Array.isArray((P=d==null?void 0:d.daily)==null?void 0:P.time)?d.daily.time.map((y,I)=>{var Ee,Pe,ke,Ae,Te;const q=new Date(`${y}T12:00:00+03:00`);return{name:q.toLocaleDateString(e,{weekday:"short"}),dayNumber:q.toLocaleDateString(e,{day:"numeric"}),monthShort:q.toLocaleDateString(e,{month:"short"}),note:n(_e((Ee=d.daily.weather_code)==null?void 0:Ee[I],e),28),max:`${N((Pe=d.daily.temperature_2m_max)==null?void 0:Pe[I])}°`,min:`${N((ke=d.daily.temperature_2m_min)==null?void 0:ke[I])}° · ${N((Ae=d.daily.precipitation_probability_max)==null?void 0:Ae[I])}%`,icon:ea((Te=d.daily.weather_code)==null?void 0:Te[I],t)}}):[],E=S[0]||null,f=S.slice(1,6);return{todayValue:Xt(v,e),todayLabel:Qt(v,e),updatedAt:Yt(v,e),temperature:N(((F=o==null?void 0:o.attributes)==null?void 0:F.temperature)??((H=d==null?void 0:d.current)==null?void 0:H.temperature_2m),1),condition:l,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${N(((z=o==null?void 0:o.attributes)==null?void 0:z.apparent_temperature)??((W=d==null?void 0:d.current)==null?void 0:W.apparent_temperature)??((G=o==null?void 0:o.attributes)==null?void 0:G.temperature),1)}°C`,badgeSummary:l,badgeRange:E?`${E.max} / ${N((c=(Q=d==null?void 0:d.daily)==null?void 0:Q.temperature_2m_min)==null?void 0:c[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${N(((u=o==null?void 0:o.attributes)==null?void 0:u.humidity)??((m=d==null?void 0:d.current)==null?void 0:m.relative_humidity_2m))}%`,pressure:Kt(((x=o==null?void 0:o.attributes)==null?void 0:x.pressure)??((T=d==null?void 0:d.current)==null?void 0:T.surface_pressure),((k=o==null?void 0:o.attributes)==null?void 0:k.pressure_unit)??"hPa"),wind:Jt(((U=o==null?void 0:o.attributes)==null?void 0:U.wind_speed)??((L=d==null?void 0:d.current)==null?void 0:L.wind_speed_10m),((b=o==null?void 0:o.attributes)==null?void 0:b.wind_speed_unit)??"km/h"),clouds:`${N(((B=o==null?void 0:o.attributes)==null?void 0:B.cloud_coverage)??((ae=d==null?void 0:d.current)==null?void 0:ae.cloud_cover))}%`},forecast:f}}}class aa{constructor(e,t={}){g(this,"root");g(this,"options");g(this,"avatarMountEl");g(this,"carouselShellEl");g(this,"carouselTrackEl");g(this,"dotsEl");g(this,"presetButtons");g(this,"copy");g(this,"labels");g(this,"presetLabels");g(this,"rendererConfig");g(this,"avatarManifest");g(this,"sceneConfig");g(this,"entityMap",null);g(this,"weatherData");g(this,"hassStates",null);g(this,"currentState");g(this,"remoteControl",X);g(this,"uiControl",X);g(this,"currentControl",X);g(this,"idleLines",[]);g(this,"activeIndex",0);g(this,"lastAutoRotateAt",0);g(this,"currentIdleLine","");g(this,"lastIdleIndex",-1);g(this,"currentPreset","full");g(this,"idleTimer",null);g(this,"avatarAdapter",null);g(this,"refreshIntervalHandle",null);g(this,"orderedPages",[]);g(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...Je,...t.copy||{}},this.labels={...Ye,...t.labels||{}},this.presetLabels={...Xe,...t.presetLabels||{}},this.weatherData=ve(t.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=_(window.location.href,this.getRendererConfigUrl()),t=Ze(e),i=we(await this.readJson(e)),s=we({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,d])=>[o,_(t,d)])),avatar:{...i.avatar,manifestUrl:_(t,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:_(t,i.scene.configUrl)},state:{...i.state,stateUrl:_(t,i.state.stateUrl),idleLinesUrl:_(t,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?_(t,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:_(t,i.control.controlUrl)}});this.rendererConfig=s;const r=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=qt(ze(await this.readJson(r)),r),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await jt({url:this.rendererConfig.state.idleLinesUrl||_(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Fe({url:this.rendererConfig.control.controlUrl,defaultValue:X}).read(),this.currentControl=ge(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return n(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return n(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=ot(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var i,s;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(s=(i=this.carouselShellEl).setPointerCapture)==null||s.call(i,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:s}=this.carouselDragState,r=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(s)>=r*.16,d=s<0?1:-1;if(this.clearDragState(t.pointerId,!1),o){this.stepPage(d);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Fe({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=ge(X,this.uiControl),this.currentControl=ge(this.remoteControl,this.uiControl);const e=We(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=wt(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=me(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const s=this.getOrderedPages(i.pages,i.rotation.order),r=yt({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>s.some(d=>d.id===o)});if(this.activeIndex=r.nextIndex,this.lastAutoRotateAt=r.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(s,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,s)=>i.kind==="overview"?this.renderOverviewSlide(t,s):this.renderDynamicSlide(i,s,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,s)=>`
      <button
        class="carousel-dot ${s===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${s}"
        aria-label="${h(n(i.title,40)||`Page ${s+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t){const i=n(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||ce,r=s.forecast.slice(0,5).map(o=>this.renderForecastDay(o)).join("");return`
      <section class="slide slide-overview" data-slide-id="weather" data-slide-order="${t}">
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
                  <strong>${h(e.caption)}</strong>
                  <div class="neiri-label">${h(e.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${h(this.resolveIconUrl("sparkles"))}" alt="${h(i)}"></div>
              </div>
              <div class="neiri-meta">${h(e.body)}</div>
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
            <div class="forecast-grid">${r}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,t,i){const s=Wt(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),r=this.resolveForecastRange(),o=n(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),d=n(e.stampValue,32)||(e.kind==="forecast+cards"?r:`${t+1} / ${i}`),p=e.cardStyle==="mini"?s.map(S=>`
          <article class="mini-card">
            <span class="caption">${h(S.caption)}</span>
            <strong>${h(S.value)}</strong>
          </article>
        `).join(""):s.map(S=>`
          <article class="home-card">
            <span class="caption">${h(S.caption)}</span>
            <strong>${h(S.value)}</strong>
            <small>${h(S.hint)}</small>
          </article>
        `).join(""),v=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(S=>this.renderForecastDay(S)).join("")}</div>`:"",l=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
      <section class="slide slide-dynamic" data-slide-id="${h(e.id)}" data-slide-order="${t}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${h(e.kind)}" data-dynamic-card-style="${h(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${h(n(e.title,64)||"Scene")}</h1>
              <p class="subline">${h(n(e.subtitle,140)||"Configured by scene.json")}</p>
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${h(o)}</span>
              <span class="value">${h(d)}</span>
            </div>
          </div>
          ${v}
          <div class="${l}">
            ${p||`<div class="empty">${h(this.labels.noCardsConfigured)}</div>`}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],i=e[e.length-1];return`${n(t.dayNumber,4)} ${n(t.monthShort,8)} → ${n(i.dayNumber,4)} ${n(i.monthShort,8)}`}resolveIconUrl(e){var s;const t=n((s=this.options.iconUrls)==null?void 0:s[e],1024);return t||`${Qe(n(this.options.iconBaseUrl,1024)||"./assets")}${Gt[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:i,layoutGapPx:s,globalScale:r}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${s}px`),this.root.style.setProperty("--scene-global-scale",String(r))}getOrderedPages(e,t){const i=t.map(r=>e.find(o=>o.id===r)).filter(Boolean),s=e.filter(r=>!i.some(o=>o.id===r.id));return i.concat(s)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var i,s;!t&&((s=(i=this.carouselShellEl).hasPointerCapture)!=null&&s.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=me(this.sceneConfig,this.sceneConfig),i=mt(t.rotation,this.activeIndex,e,s=>this.orderedPages.some(r=>r.id===s));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const s=me(this.sceneConfig,this.sceneConfig),r=Math.max(18e3,s.rotation.defaultDwellMs*2);this.uiControl=lt(this.uiControl,i.id,r),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!xt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=Re(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=Re(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},St(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>Ht({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await Ot({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:xe({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=Me(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=Me(e,t)}catch{}try{return ve(e)}catch{return ve(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Ut({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Rt({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const i=t.dataset.avatarPreset||"",s=t.querySelector("[data-preset-thumb]"),r=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];t.classList.toggle("is-active",i===this.currentPreset),s&&(r?(s.src=r,s.removeAttribute("hidden")):(s.src="",s.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function ia(a,e={}){const t=new aa(a,e);return await t.init(),t}const sa=["overview","cards","forecast+cards"],ra=["full","mini"],et=["entity","text","todo","onoff","battery","network","time","percent","number"],j=["caption","hint"],na={ru:{title:"Редактор сцены",subtitle:a=>`Пакет: ${a||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается честный 1:1 viewport выбранного экрана. Если не влезает по ширине, страница просто прокручивается.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",previewApplyProfile:"Применить пресет экрана",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Выбор Live2D-модели для текущего instance-pack. Применяется после сохранения и перезагрузки превью.",avatarPack:"Набор аватара",avatarPackCurrent:"Текущий avatar.manifest.json instance-pack",avatarPackHint:"Другие модели лежат отдельно в /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"В каталоге avatar-packs пока нет отдельных моделей.",avatarPackAppliedAfterSave:"Выбранный avatar-pack вступит в силу после сохранения и автоматической перезагрузки превью.",pages:"Страницы",pageKind:"Тип",pageCards:a=>`${a} карточ${a===1?"ка":a<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:a=>`Pack: ${a||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage renders a true 1:1 viewport of the selected screen. If it does not fit, the editor page simply scrolls.",previewDisplay:"Screen profile",previewResolution:"Resolution",previewApplyProfile:"Apply screen preset",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the Live2D model for this instance-pack. It applies after save and preview reload.",avatarPack:"Avatar pack",avatarPackCurrent:"Use the instance-pack avatar.manifest.json",avatarPackHint:"Additional models live in /config/kiosk-scene/avatar-packs/<id>/avatar.manifest.json.",avatarPackEmpty:"No separate avatar packs are available yet.",avatarPackAppliedAfterSave:"The selected avatar pack will apply after saving and reloading the preview.",pages:"Pages",pageKind:"Kind",pageCards:a=>`${a} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},ue=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],pe="mellow-fly-7";function Be(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Oe(a){return ue.find(e=>e.id===a)||ue.find(e=>e.id===pe)||ue[0]}function oa(a){return`${a.width} × ${a.height}`}function w(a){return String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ce(a){return JSON.parse(JSON.stringify(a))}function O(a){const e=new Map(a.pages.map(s=>[s.id,s])),t=a.rotation.order.map(s=>e.get(s)).filter(Boolean),i=a.pages.filter(s=>!t.some(r=>r.id===s.id));return[...t,...i]}function la(a,e){return e?Math.max(0,O(a).findIndex(t=>t.id===e)):0}function da(a){return String(a||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function tt(a,e){const t=da(e);let i=t,s=2;for(;a.pages.some(r=>r.id===i);)i=`${t}-${s}`,s+=1;return i}function ca(a){const e=a.pages.length+1;return{id:tt(a,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function He(a){switch(a){case"text":return{type:a,caption:"Text",value:"—",hint:""};case"todo":return{type:a,caption:"Todo",entity:"",hint:""};case"onoff":return{type:a,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:a,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:a,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:a,caption:"Time",entity:"",hint:""};case"percent":return{type:a,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:a,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function fe(a,e){const t=a[e];return t==null?"":String(t)}function V(a,e){const t=a[e];return t==null?"":String(t)}function J(a,e){const t=a.display||{},i=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function at(a){return a.display||(a.display={}),a.display.safeArea||(a.display.safeArea={}),a.display}function ua(a){var t;return String(((t=a.avatar)==null?void 0:t.packId)||"").trim()}function pa(a){return a.avatar||(a.avatar={}),a.avatar}function fa(a,e){const t=at(a),i=t.safeArea||{};i.top=e.displayDefaults.safeTop,i.right=e.displayDefaults.safeRight,i.bottom=e.displayDefaults.safeBottom,i.left=e.displayDefaults.safeLeft,t.safeArea=i,t.layoutPaddingPx=e.displayDefaults.layoutPaddingPx,t.layoutGapPx=e.displayDefaults.layoutGapPx,t.globalScale=e.displayDefaults.globalScale}function ha(a){const e=document.querySelector(`.carousel-dot[data-slide-index="${a}"]`);e==null||e.click()}function ga(a){const e=new URL(window.location.href);a?e.searchParams.set("editorPage",a):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function ma(a){var i;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&O(a).some(s=>s.id===t)?t:((i=O(a)[0])==null?void 0:i.id)||null}async function ya(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${a} failed: HTTP ${e.status}`);return Ce(t.config)}async function va(a,e){const t=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await t.json();if(!t.ok||i.success===!1||!i.config)throw new Error(`POST ${a} failed: HTTP ${t.status}`);return Ce(i.config)}function ba(a){switch(a){case"text":return[...j,"value"];case"todo":return[...j,"entity"];case"onoff":return[...j,"entity","onText","offText"];case"battery":return[...j,"entity","stateEntity"];case"network":return[...j,"downEntity","upEntity"];case"time":return[...j,"entity"];case"percent":return[...j,"entity","digits"];case"number":return[...j,"entity","digits","unit"];default:return[...j,"entity"]}}function je(a,e){return e==="cards"?a.kindCards:e==="forecast+cards"?a.kindForecastCards:a.kindOverview}function he(a,e){return{entity:a.cardEntity,text:a.cardText,todo:a.cardTodo,onoff:a.cardOnOff,battery:a.cardBattery,network:a.cardNetwork,time:a.cardTime,percent:a.cardPercent,number:a.cardNumber}[e]||e}function wa(a,e){return{caption:a.fieldCardCaption,hint:a.fieldCardHint,entity:a.fieldCardEntity,value:a.fieldCardValue,onText:a.fieldCardOnText,offText:a.fieldCardOffText,stateEntity:a.fieldCardStateEntity,downEntity:a.fieldCardDownEntity,upEntity:a.fieldCardUpEntity,digits:a.fieldCardDigits,unit:a.fieldCardUnit}[e]||e}function Sa(a,e){const t=e.attributes||{},i=String(t.friendly_name||a),s=a.includes(".")&&a.split(".",1)[0]||"other",r=String(e.state||""),o=String(t.unit_of_measurement||"");return{entityId:a,name:i,domain:s,state:r,unit:o}}function xa(a){return a?Object.entries(a).map(([e,t])=>Sa(e,t)).sort((e,t)=>{const i=e.domain.localeCompare(t.domain);return i!==0?i:e.name.localeCompare(t.name,"ru")}):[]}function $a(a,e){const t=e.trim().toLowerCase();return t?a.filter(i=>i.entityId.toLowerCase().includes(t)||i.name.toLowerCase().includes(t)||i.domain.toLowerCase().includes(t)||i.state.toLowerCase().includes(t)).slice(0,48):a.slice(0,48)}async function Ca(a){const e=String(a||"").trim();if(!e)return[];const t=await fetch(e,{cache:"no-store"}),i=await t.json();if(!t.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${t.status}`);return Array.isArray(i.items)?i.items.map(s=>({id:String(s.id||"").trim(),name:String(s.name||s.id||"").trim(),manifestUrl:String(s.manifestUrl||"").trim(),previewUrl:String(s.previewUrl||"").trim()})).filter(s=>s.id&&s.manifestUrl):[]}function Ea(a){return["entity","stateEntity","downEntity","upEntity"].includes(a)}function Z(a,e,t,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${w(a)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${w(e)}" value="${w(t)}">
    </div>
  `}function Y(a,e,t){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${w(a)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${w(e)}" value="${w(t)}">
    </div>
  `}function Ve(a,e,t,i){return`
    <div class="field">
      <label for="page-select-${e}">${w(a)}</label>
      <select id="page-select-${e}" data-page-field="${w(e)}">
        ${i.map(s=>`<option value="${w(s.value)}"${s.value===t?" selected":""}>${w(s.label)}</option>`).join("")}
      </select>
    </div>
  `}function Pa(a,e,t,i){const s=fe(e,"type")||"entity",r=ba(s);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${w(fe(e,"caption")||he(a,s))}</strong>
          <div class="meta">${w(he(a,s))}</div>
        </div>
        <div class="card-actions">
          <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${a.up}</button>
          <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===i-1?" disabled":""}>${a.down}</button>
          <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${a.remove}</button>
        </div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${w(a.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${et.map(o=>`<option value="${o}"${o===s?" selected":""}>${w(he(a,o))}</option>`).join("")}
          </select>
        </div>
        ${r.map(o=>`
          <div class="field ${o==="hint"?"is-wide":""}">
            <label>${w(wa(a,o))}</label>
            <input
              type="${o==="digits"?"number":"text"}"
              data-card-index="${t}"
              data-card-field="${w(o)}"
              ${Ea(o)?`data-binding-field="${w(o)}"`:""}
              value="${w(fe(e,o))}"
            >
          </div>
        `).join("")}
      </div>
    </article>
  `}function ka(a,e,t){a[e]=t.entityId;const i=a;String(i.caption||"").trim()||(i.caption=t.name),String(i.hint||"").trim()||(i.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&t.unit&&(i.unit=t.unit)}async function Aa(a){var Q;const e=na[Be()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(t)&&document.body.insertBefore(t,i),i==null||i.remove();const s=document.createElement("section");s.id="scene-editor-shell",s.innerHTML=`
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
        border-radius: 24px;
        border: 1px solid rgba(32,48,65,0.1);
        background: #dae5ec;
        overflow: visible;
      }
      #scene-editor-shell .scene-preview-stage {
        overflow: hidden;
        border-radius: 24px;
        background: #dbe8f2;
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
      #scene-editor-shell .ha-list,
      #scene-editor-shell .scene-settings-stack {
        display: grid;
        gap: 10px;
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
      #scene-editor-shell .ha-entity code {
        font: 12px/1.25 Consolas, monospace;
        color: #385268;
      }
      #scene-editor-shell .ha-entity-row {
        display: flex;
        align-items: center;
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
                ${ue.map(c=>`<option value="${w(c.id)}">${w(c.label[Be()])}</option>`).join("")}
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
  `,document.body.appendChild(s),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const r=s.querySelector("[data-preview-screen]"),o=s.querySelector("[data-preview-stage]"),d=s.querySelector("[data-preview-resolution]"),p=s.querySelector("[data-preview-display]"),v=s.querySelector("[data-dashboard]");if(!r||!o||!d||!p||!v)throw new Error("Missing native editor shell elements");o.appendChild(t);const l={config:null,selectedPageId:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:pe},S=()=>{const c=Oe(l.previewDisplayId);p.value=c.id,d.textContent=oa(c),o.style.width=`${c.width}px`,o.style.height=`${c.height}px`,t.style.width=`${c.width}px`,t.style.height=`${c.height}px`,r.style.width=`${c.width}px`},E=typeof ResizeObserver<"u"?new ResizeObserver(()=>S()):null;E==null||E.observe(o);const f=()=>{const c=l.config,u=c?O(c):[],m=u.find(b=>b.id===l.selectedPageId)||u[0]||null,x=Array.isArray(m==null?void 0:m.cards)?m.cards:[],T=$a(l.haEntities,l.entitySearch),k=l.focusedBinding?`${e.entityBinding}: #${l.focusedBinding.cardIndex+1} → ${l.focusedBinding.field}`:e.entityBindingEmpty,U=c?ua(c):"",L=l.avatarCatalog.find(b=>b.id===U)||null;v.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${l.statusTone}">${w(l.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${w(a.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${l.saving||!c?" disabled":""}>${l.saving?e.saving:e.save}</button>
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
                    ${l.avatarCatalog.map(b=>`<option value="${w(b.id)}"${b.id===U?" selected":""}>${w(b.name||b.id)}</option>`).join("")}
                  </select>
                </div>
                <div class="meta">${l.avatarCatalog.length?e.avatarPackHint:e.avatarPackEmpty}</div>
                <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              </div>
              <div class="avatar-pack-preview">
                ${L!=null&&L.previewUrl?`<img src="${w(L.previewUrl)}" alt="${w(L.name||L.id)}">`:`<span>${w((L==null?void 0:L.name)||e.avatarPackCurrent)}</span>`}
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
            ${u.map((b,B)=>`
              <article class="page-chip ${b.id===((m==null?void 0:m.id)||"")?"is-active":""}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${w(b.id)}">
                  <strong>${w(b.title||b.id||`Page ${B+1}`)}</strong>
                  <span class="meta">${w(je(e,b.kind))} · ${w(e.pageCards(Array.isArray(b.cards)?b.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${w(b.id)}"${B===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${w(b.id)}"${B===u.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${w(b.id)}"${u.length<=1?" disabled":""}>${e.remove}</button>
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
          ${m?`
            <div class="inspector-grid">
              ${Z(e.fieldPageId,"id",V(m,"id"),!0)}
              ${Ve(e.fieldKind,"kind",V(m,"kind"),sa.map(b=>({value:b,label:je(e,b)})))}
              ${Z(e.fieldTitle,"title",V(m,"title"),!0)}
              ${Z(e.fieldSubtitle,"subtitle",V(m,"subtitle"),!0)}
              ${Z(e.fieldSlot,"slot",V(m,"slot"))}
              ${Ve(e.fieldCardStyle,"cardStyle",V(m,"cardStyle")||"full",ra.map(b=>({value:b,label:b==="mini"?e.styleMini:e.styleFull})))}
              ${Z(e.fieldStampCaption,"stampCaption",V(m,"stampCaption"))}
              ${Z(e.fieldStampValue,"stampValue",V(m,"stampValue"))}
            </div>
            <h2 style="margin-top:18px;">${e.cards}</h2>
            <div class="card-add">
              <select data-add-card-type>
                ${et.map(b=>`<option value="${b}">${w(he(e,b))}</option>`).join("")}
              </select>
              <button class="scene-editor-button" type="button" data-action="add-card">${e.addCard}</button>
            </div>
            <div class="cards-list" style="margin-top:12px;">
              ${x.length?x.map((b,B)=>Pa(e,b,B,x.length)).join(""):`<div class="meta">${e.noCards}</div>`}
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
              ${Y(e.fieldDisplaySafeTop,"safeTop",J(c,"safeTop"))}
              ${Y(e.fieldDisplaySafeRight,"safeRight",J(c,"safeRight"))}
              ${Y(e.fieldDisplaySafeBottom,"safeBottom",J(c,"safeBottom"))}
              ${Y(e.fieldDisplaySafeLeft,"safeLeft",J(c,"safeLeft"))}
              ${Y(e.fieldDisplayPadding,"layoutPaddingPx",J(c,"layoutPaddingPx"))}
              ${Y(e.fieldDisplayGap,"layoutGapPx",J(c,"layoutGapPx"))}
              ${Y(e.fieldDisplayScale,"globalScale",J(c,"globalScale"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.homeAssistant}</h2>
              <div class="meta">${w(k)}</div>
            </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${w(l.entitySearch)}">
          </div>
          <div class="ha-list">
            ${T.length?T.map(b=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${w(b.name)}</strong>
                    <div class="meta">${w(b.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${w(b.entityId)}">${e.useEntity}</button>
                </div>
                <code>${w(b.entityId)}</code>
                <div class="ha-state">${w(b.state)}${b.unit?` · ${w(b.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `,S()},C=(c,u)=>{l.status=c,l.statusTone=u,f()},$=()=>{if(!l.config)return;const c=O(l.config);if(!c.length){l.selectedPageId=null;return}(!l.selectedPageId||!c.some(u=>u.id===l.selectedPageId))&&(l.selectedPageId=c[0].id),ga(l.selectedPageId),ha(la(l.config,l.selectedPageId))},P=()=>{l.dirty=!0,C(e.statusDirty,"muted")},F=()=>{const c=new URL(window.location.href);c.searchParams.set("editor","1"),l.selectedPageId&&c.searchParams.set("editorPage",l.selectedPageId),c.searchParams.set("v",String(Date.now())),window.location.replace(c.toString())},H=(c,u)=>{if(!l.config||!l.selectedPageId)return;const m=l.config.pages.find(x=>x.id===l.selectedPageId);if(m){if(c==="slot")m.slot=u===""?void 0:Number(u);else if(c==="id"){const x=tt(l.config,u||"page"),T=m.id;m.id=x,l.config.rotation.order=l.config.rotation.order.map(k=>k===T?x:k),l.selectedPageId=x}else c==="title"||c==="subtitle"||c==="stampCaption"||c==="stampValue"?m[c]=u:c==="kind"?m.kind=u:c==="cardStyle"&&(m.cardStyle=u);P(),$()}},z=(c,u)=>{if(!l.config)return;const m=at(l.config),x=m.safeArea||{},T=u===""?null:Number(u),k=Number.isFinite(T)?T:null;c==="safeTop"?x.top=k??0:c==="safeRight"?x.right=k??0:c==="safeBottom"?x.bottom=k??0:c==="safeLeft"?x.left=k??0:c==="layoutPaddingPx"?m.layoutPaddingPx=k??16:c==="layoutGapPx"?m.layoutGapPx=k??16:c==="globalScale"&&(m.globalScale=k??1),m.safeArea=x,P()},W=(c,u,m)=>{if(!l.config||!l.selectedPageId)return;const x=l.config.pages.find(k=>k.id===l.selectedPageId);if(!x)return;Array.isArray(x.cards)||(x.cards=[]);const T=x.cards[c];if(T){if(u==="type"){const k=He(m);x.cards[c]={...k,caption:fe(T,"caption")||k.caption}}else u==="digits"?T[u]=m===""?0:Number(m):T[u]=m;P()}},G=c=>{if(!l.config||!l.selectedPageId||!l.focusedBinding)return;const u=l.config.pages.find(T=>T.id===l.selectedPageId),m=l.haEntities.find(T=>T.entityId===c);if(!u||!Array.isArray(u.cards)||!m)return;const x=u.cards[l.focusedBinding.cardIndex];x&&(ka(x,l.focusedBinding.field,m),P(),f())};s.addEventListener("click",async c=>{var b,B,ae;const u=c.target,m=u==null?void 0:u.closest("[data-action]"),x=m==null?void 0:m.dataset.action;if(!x)return;if(x==="apply-display-profile"&&l.config){fa(l.config,Oe(l.previewDisplayId)),P(),f();return}if(!l.config)return;const T=O(l.config),k=(m==null?void 0:m.dataset.pageId)||null,U=k?T.findIndex(y=>y.id===k):-1;if(x==="select-page"&&k){l.selectedPageId=k,$(),f();return}if(x==="page-up"&&U>0){const y=T.map(I=>I.id);[y[U-1],y[U]]=[y[U],y[U-1]],l.config.rotation.order=y,l.selectedPageId=k,P(),$(),f();return}if(x==="page-down"&&U>=0&&U<T.length-1){const y=T.map(I=>I.id);[y[U],y[U+1]]=[y[U+1],y[U]],l.config.rotation.order=y,l.selectedPageId=k,P(),$(),f();return}if(x==="page-remove"&&k&&T.length>1){l.config.pages=l.config.pages.filter(y=>y.id!==k),l.config.rotation.order=O(l.config).map(y=>y.id),l.selectedPageId=((b=O(l.config)[Math.max(0,U-1)])==null?void 0:b.id)||((B=O(l.config)[0])==null?void 0:B.id)||null,P(),$(),f();return}if(x==="add-page"){const y=ca(l.config);l.config.pages.push(y),l.config.rotation.order=O(l.config).map(I=>I.id),l.selectedPageId=y.id,P(),$(),f();return}if(x==="add-card"&&l.selectedPageId){const y=l.config.pages.find(q=>q.id===l.selectedPageId),I=((ae=s.querySelector("[data-add-card-type]"))==null?void 0:ae.value)||"entity";y&&(Array.isArray(y.cards)||(y.cards=[]),y.cards.push(He(I)),P(),f());return}const L=Number((m==null?void 0:m.dataset.cardIndex)||"-1");if(L>=0&&l.selectedPageId){const y=l.config.pages.find(I=>I.id===l.selectedPageId);if(!y||!Array.isArray(y.cards))return;if(x==="card-remove"){y.cards=y.cards.filter((I,q)=>q!==L),P(),f();return}if(x==="card-up"&&L>0){[y.cards[L-1],y.cards[L]]=[y.cards[L],y.cards[L-1]],P(),f();return}if(x==="card-down"&&L<y.cards.length-1){[y.cards[L],y.cards[L+1]]=[y.cards[L+1],y.cards[L]],P(),f();return}}if(x==="save"){l.saving=!0,C(e.saving,"muted");try{l.config=await va(a.sceneApiUrl,Ce(l.config)),l.dirty=!1,l.saving=!1,$(),C(e.statusSaved,"ok"),window.setTimeout(()=>F(),250)}catch(y){l.saving=!1,C(`${e.saveError}: ${String(y)}`,"bad")}return}if(x==="bind-entity"){const y=(m==null?void 0:m.dataset.entityId)||"";G(y)}}),s.addEventListener("input",c=>{const u=c.target;if(!u||!l.config){u!=null&&u.dataset.previewDisplay&&(l.previewDisplayId=u.value||pe,S());return}if(u.dataset.previewDisplay){l.previewDisplayId=u.value||pe,S();return}if(u.dataset.avatarPack!==void 0){pa(l.config).packId=u.value.trim()||null,P(),f();return}if(u.dataset.pageField){H(u.dataset.pageField,u.value),f();return}if(u.dataset.displayField){z(u.dataset.displayField,u.value),f();return}if(u.dataset.cardField&&u.dataset.cardIndex){W(Number(u.dataset.cardIndex),u.dataset.cardField,u.value),f();return}u.hasAttribute("data-ha-search")&&(l.entitySearch=u.value,f())}),s.addEventListener("focusin",c=>{const u=c.target;if(!(u!=null&&u.dataset.bindingField))return;const m=Number(u.dataset.cardIndex||"-1");m<0||(l.focusedBinding={cardIndex:m,field:u.dataset.bindingField})});try{if(l.config=await ya(a.sceneApiUrl),a.avatarCatalogUrl)try{l.avatarCatalog=await Ca(a.avatarCatalogUrl)}catch{l.avatarCatalog=[]}l.haEntities=xa(((Q=Ke())==null?void 0:Q.states)||null),l.selectedPageId=ma(l.config),l.status=e.statusSaved,l.statusTone="ok",$()}catch(c){l.status=`${e.loadError}: ${String(c)}`,l.statusTone="bad"}f()}const Ta="../scene-api/bootstrap",La="weather.forecast_home_assistant",Ua="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ia={...Je,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},Da={...Ye,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},Ra={...Xe,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Na={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Fa={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:a=>`Pack: ${a||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:a=>`Pack: ${a||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Ma(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function _a(){return new URLSearchParams(window.location.search).get("bootstrap")||Ta}function Ba(a){const e=new URL(a,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(t);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function R(a,e){const t=String(a||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const i=new URL(e,window.location.href);if(t.startsWith("/")){const s=Ba(e);if(s)return new URL(t.slice(1),s).toString()}return new URL(t,i).toString()}function Se(a,e,t,i){a.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function Oa(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function Ha(a){const e=await fetch(a,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return t}async function be(a){const e=await fetch(a,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${a}: HTTP ${e.status}`);return e.json()}function ja(a,e){var t,i,s,r,o,d,p,v;return{...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([l,S])=>[l,R(S,e)]).filter(([,l])=>!!l)),avatar:{manifestUrl:R(String(((t=a.avatar)==null?void 0:t.manifestUrl)||"").trim(),e)},scene:{configUrl:R(String(((i=a.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((s=a.state)==null?void 0:s.provider)||"json",stateUrl:R(String(((r=a.state)==null?void 0:r.stateUrl)||"").trim(),e),haApiFallback:((o=a.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:R(String(((d=a.state)==null?void 0:d.idleLinesUrl)||"").trim(),e),entityMapUrl:R(String(((p=a.state)==null?void 0:p.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:R(String(((v=a.control)==null?void 0:v.controlUrl)||"").trim(),e)}}}async function Va(a,e){var v,l,S,E;const t=R(String(((v=a.files)==null?void 0:v.rendererConfigUrl)||"").trim(),e);if(!t)return"";const i=R(String(((l=a.files)==null?void 0:l.sceneConfigUrl)||"").trim(),e),s=R(String(((S=a.files)==null?void 0:S.avatarCatalogUrl)||"").trim(),e);if(!i||!s)return t;let r="";try{const f=await be(i);r=String(((E=f.avatar)==null?void 0:E.packId)||"").trim()}catch{r=""}if(!r)return t;let o="";try{const f=await be(s),C=Array.isArray(f.items)?f.items.find($=>String($.id||"").trim()===r):null;o=R(String((C==null?void 0:C.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return t;const p={...ja(await be(t),t),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(p)],{type:"application/json"}))}const se=document.getElementById("app");if(!se)throw new Error("Missing #app root element");const ee=Fa[Ma()];Se(se,ee.startingTitle,ee.startingBody);(async()=>{var e;const a=_a();try{const t=await Ha(a),i=String(t.packId||"").trim(),s=i.toLowerCase()==="neiri",r=await Va(t,a);if(!r){Se(se,ee.missingRendererTitle,ee.missingRendererBody,JSON.stringify(t,null,2));return}document.documentElement.dataset.packId=i,document.title=s?"Нейри":i?`kiosk-scene hosted runtime (${i})`:"kiosk-scene hosted runtime",await ia(se,{rendererConfigUrl:r,weatherUrl:s?"./weather.json":void 0,weatherReader:s?ta({weatherEntity:La,openMeteoUrl:Ua,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:s?Ia:void 0,labels:s?Da:void 0,presetLabels:s?Ra:void 0,defaultWeather:s?Na:void 0}),Oa()&&await Aa({packId:i,sceneApiUrl:R(String(t.sceneEditorApiUrl||"").trim(),a),avatarCatalogUrl:R(String(((e=t.files)==null?void 0:e.avatarCatalogUrl)||"").trim(),a),sceneUrl:R(String(t.entryUrl||t.runtimeBaseUrl||"./").trim(),a)})}catch(t){Se(se,ee.failedTitle,ee.failedBody,String(t))}})();
