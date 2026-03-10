var kt=Object.defineProperty;var $t=(t,e,a)=>e in t?kt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var b=(t,e,a)=>$t(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function U(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function d(t,e=160){const a=String(t??"").replace(/\s+/g," ").trim();return a?a.length<=e?a:`${a.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function qe(t){const e=new Date(String(t??""));return Number.isNaN(e.getTime())?0:e.getTime()}function me(t,e){if(!U(t)||!U(e))return e??t;const a={...t};for(const[i,n]of Object.entries(e)){if(Array.isArray(n)){a[i]=n.slice();continue}if(U(n)&&U(a[i])){a[i]=me(a[i],n);continue}a[i]=n}return a}function Ct(t,e=40){return Array.isArray(t)?t.map(a=>d(a,e).toLowerCase()).filter(Boolean):[]}const ee={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},Ge={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function Be(t){var a,i,n,s,o,l,f,w,r,$;const e=me(ee,U(t)?t:{});return{version:1,assistant:{name:d((a=e.assistant)==null?void 0:a.name,40)||ee.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:U(e.links)?Object.fromEntries(Object.entries(e.links).map(([P,S])=>[d(P,64),d(S,1024)]).filter(([P,S])=>P&&S)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||ee.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||ee.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||ee.state.stateUrl,haApiFallback:((f=e.state)==null?void 0:f.haApiFallback)===!0,idleLinesUrl:d((w=e.state)==null?void 0:w.idleLinesUrl,1024)||ee.state.idleLinesUrl,entityMapUrl:d((r=e.state)==null?void 0:r.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d(($=e.control)==null?void 0:$.controlUrl,1024)||ee.control.controlUrl}}}function dt(t){var a,i,n,s,o;const e=me(Ge,U(t)?t:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||Ge.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:U(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,f])=>[d(l,32),d(f,1024)]).filter(([l,f])=>l&&f)):{},viewPresets:U(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,f])=>d(l,32)&&U(f))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const ie={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},Pt=["full","torso","head"];function ge(t,e=Date.now()){var l,f,w,r,$,P,S;const a=me(ie,U(t)?t:{}),i={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((l=a.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((f=a.page)==null?void 0:f.target,40)||null,until:d((w=a.page)==null?void 0:w.until,64)||null},cue:{cue:d((r=a.cue)==null?void 0:r.cue,32)||null,emotion:d(($=a.cue)==null?void 0:$.emotion,32)||null,motion:d((P=a.cue)==null?void 0:P.motion,32)||null,until:d((S=a.cue)==null?void 0:S.until,64)||null}},n=d(a.viewPreset,16).toLowerCase();i.viewPreset=Pt.includes(n)?n:null;const s=qe(i.page.until);i.page.mode==="pinned"&&(!s||s<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=qe(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function Te(t,e,a=Date.now()){return ge(me(ge(t,a),U(e)?e:{}),a)}function It(t,e,a=Date.now()){return ge({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function Et(t,e,a=3e4,i=Date.now()){const n=d(e,40),s=new Date(i+Math.max(5e3,Number(a)||0)).toISOString();return ge({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},i)}function ct(t,e){var o,l,f;const a={...t||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),n=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),s=d((f=e==null?void 0:e.cue)==null?void 0:f.motion,32);return i&&(a.cue=i),n&&(a.emotion=n),s&&(a.motion=s),a}function z(t,e){const a=Number(t);return Number.isFinite(a)?Math.max(0,a):e}function Ke(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function At(t){return U(t)&&U(t.config)?t.config:t}function Tt(t,e){const a={...t};return U(e)&&(typeof e.id=="string"&&(a.id=d(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(i=>U(i)))),a}function Le(t,e){const a=At(t),i=Array.isArray(e.pages)?e.pages.slice():[],n=U(a)&&Array.isArray(a.pages)?a.pages:[],s=i.map(S=>{const C=n.find(A=>d(U(A)?A.id:"",40)===S.id);return Tt(S,C)}),o=U(a)&&U(a.rotation)?a.rotation:{},l=U(e.display)?e.display:{},f=U(a)&&U(a.display)?a.display:{},w=U(l.safeArea)?l.safeArea:{},r=U(f.safeArea)?f.safeArea:{},$=Array.isArray(o.order)?o.order:e.rotation.order,P=Ct($).filter((S,C,A)=>s.some(N=>N.id===S)&&A.indexOf(S)===C);return{version:1,rotation:{order:P.length?P:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:z(r.top,z(w.top,0)),right:z(r.right,z(w.right,0)),bottom:z(r.bottom,z(w.bottom,0)),left:z(r.left,z(w.left,0))},layoutPaddingPx:z(f.layoutPaddingPx,z(l.layoutPaddingPx,16)),layoutGapPx:z(f.layoutGapPx,z(l.layoutGapPx,16)),globalScale:Ke(f.globalScale,Ke(l.globalScale,1))},pages:s}}function Lt(t,e=220){const a=d(t,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},n=a.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(s,o,l)=>{const f=d(o,16).toLowerCase(),w=d(l,32).toLowerCase();return(f==="emotion"||f==="activity"||f==="cue"||f==="motion")&&w&&(i[f]=w)," "});return{text:d(n,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const Ut={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function ce(t,e={}){const a=U(t)?t:{},i={...Ut,...e};return{version:1,assistant:d(a.assistant??i.assistant,40),online:typeof a.online=="boolean"?a.online:i.online,busy:typeof a.busy=="boolean"?a.busy:i.busy,status:d(a.status??i.status,255),message:d(a.message??i.message,255),source:d(a.source??i.source,64),updatedAt:d(a.updatedAt??i.updatedAt,64),emotion:d(a.emotion??i.emotion,32)||null,activity:d(a.activity??i.activity,32)||null,cue:d(a.cue??i.cue,32)||null,intensity:Dt(a.intensity??i.intensity),speaking:typeof a.speaking=="boolean"?a.speaking:!!i.speaking,motion:d(a.motion??i.motion,32)||null,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):i.revision,event:d(a.event??i.event,64)}}function Dt(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Mt(t,e){return t.order[e]||t.order[0]||""}function Nt(t,e){const a=t.order.findIndex(i=>i===e);return a>=0?a:0}function Rt(t,e,a,i){const n=Array.isArray(t.order)?t.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let o=1;o<=n.length;o+=1){const l=(s+o*a+n.length)%n.length;if(i(n[l]))return l}return s}function Bt(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],i=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=t.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:Nt(t.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(t.force){const o=Mt(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(o)?t.activeIndex:Math.max(0,a.findIndex(f=>t.isEligible(f))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<i)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let s=t.activeIndex;for(let o=1;o<=a.length;o+=1){const l=(t.activeIndex+o)%a.length;if(t.isEligible(a[l])){s=l;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const ut={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Ft=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function Je(t){const e=d(t,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Ft.some(a=>e.includes(a)):!1}function _t(t,e){const a=ce(t),i=d(a.status,72),n=d(a.message,220);if(!(a.online!==!1&&(Je(i)||Je(n))))return{state:a,hasTechnicalFailure:!1};const l=d(a.emotion,32).toLowerCase(),f=d(a.motion,32).toLowerCase();return{state:{...a,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(a.activity,32).toLowerCase()==="error"?"idle":d(a.activity,32)||null,cue:d(a.cue,32)||null,intensity:a.intensity??null,speaking:!1,motion:f==="error"?"idle_soft":f||null},hasTechnicalFailure:!0}}function Ot(t,e){const a=(e==null?void 0:e.copy)??ut,i=ce(t),n=Lt(i.message,220),s=_t({...i,message:n.text,emotion:d(i.emotion,32)||n.emotion||null,activity:d(i.activity,32)||n.activity||null,cue:d(i.cue,32)||n.cue||null,motion:d(i.motion,32)||n.motion||null},{healthyStatus:a.technicalHealthyLabel}),o=s.state,l=d(o.message,180),f=d(o.activity,32).toLowerCase(),w=o.online!==!1&&f!=="offline",r=!!o.busy||f==="thinking"||f==="busy"||f==="acting",$=o.speaking===!0||f==="speaking",P=w?r?a.busyLabel:l||$?a.speakingLabel:s.hasTechnicalFailure?a.technicalHealthyLabel:a.idleLabel:a.offlineLabel,S=l?a.messageCaption:s.hasTechnicalFailure?a.statusCaption:a.modeCaption,C=l||(w?r?a.busyBody:d(e==null?void 0:e.idleMonologue,220)||a.idleBody:a.offlineBody);return{state:o,hasTechnicalFailure:s.hasTechnicalFailure,caption:S,label:P,body:C,bodyKey:[S,P,C].join(":")}}function Ht(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function Ye(t,e=-1){const a=Array.isArray(t)?t.map(n=>d(n,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*a.length);return a.length>1&&i===e&&(i=(i+1)%a.length),{line:a[i],index:i}}function jt(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),i=!!d(t==null?void 0:t.message,180);return e&&!a&&!i}const Vt={cue:null,emotion:null,motion:null,until:null},zt={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Wt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function pt(t){return t.endsWith("/")?t:`${t}/`}function $e(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a)||a.startsWith("/"))return a;const i=new URL(pt(d(t,1024)||"."),window.location.href);return new URL(a,i).toString()}function Pe(t){const e=d(t,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function qt(t,e,a){const i=d(t.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?Pe(i):new URL("../avatar.html",new URL(pt(d(a,1024)||"."),window.location.href)).toString()}function Gt(t,e){const a=d(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function Kt(t,e){const a=new URL(t,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[n,s]of Object.entries(i)){const o=d(n,64);if(!o||s==null)continue;const l=typeof s=="boolean"?s?"1":"0":String(s);a.searchParams.set(o,l)}return a.toString()}function Jt(t,e,a){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),$e(a,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([n,s])=>[d(n,64),Pe(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Pe(t.state.stateUrl),idleLinesUrl:Pe(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:$e(a,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:$e(a,e.fallbackPortrait||""),motionMapUrl:$e(a,e.motionMapUrl||""),presetThumbs:i}}}class Yt{constructor(e={}){b(this,"id","live2d");b(this,"options");b(this,"manifest");b(this,"rendererConfig");b(this,"host",null);b(this,"containerEl",null);b(this,"iframeEl",null);b(this,"splashEl",null);b(this,"splashTextEl",null);b(this,"assetRoot","");b(this,"currentState");b(this,"currentCue",{...Vt});b(this,"currentPreset","full");b(this,"currentBubble",{...zt});b(this,"targetOrigin","*");b(this,"isReady",!1);b(this,"bubbleRevision",0);b(this,"handleWindowMessage",e=>{var n;const a=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!a||e.source!==a||!Wt(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=dt({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Be(e.rendererConfig||{}),this.currentState=ce({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const a=qt(this.options,this.manifest,this.assetRoot),i=Kt(a,this.options);this.targetOrigin=Gt(i,this.options.targetOrigin);const n=document.createElement("div");n.className="ks-live2d-frame",Object.assign(n.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const s=document.createElement("iframe");s.className="ks-live2d-iframe",s.src=i,s.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,s.loading="eager",s.allow="autoplay",Object.assign(s.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&s.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);n.append(s,o),this.host.append(n),s.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=n,this.iframeEl=s,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=ce(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(n,s),a.append(i),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Jt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=ct(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const a=(i=this.iframeEl)==null?void 0:i.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function Zt(t={}){return new Yt(t)}const Xt={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Ze={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Qt{constructor(e={}){b(this,"id","static");b(this,"options");b(this,"host",null);b(this,"frameEl",null);b(this,"imageEl",null);b(this,"bubbleEl",null);b(this,"fallbackEl",null);b(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(i,n,s),this.host.append(a),this.frameEl=a,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=n;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||Ze,i=a[e]||a.full||Ze.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Xt}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const i=e.replace(/\/+$/,""),n=a.replace(/^\.?\//,"");return i?`${i}/${n}`:n}}function ea(t={}){return new Qt(t)}function ta(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function ft(){var t;for(const e of ta())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),i=a==null?void 0:a.hass;if(i!=null&&i.states)return i}catch{continue}return null}function aa(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function ia(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const i=d(a.entity_id,255);i&&(e[i]=a)}return e}function ra(t,e,a="Assistant"){const i=t[e.status],n=t[e.message],s=t[e.online],o=t[e.busy],l=t[e.source],f=t[e.updatedAt],w=e.emotion?t[e.emotion]:null,r=e.activity?t[e.activity]:null,$=e.cue?t[e.cue]:null,P=e.speaking?t[e.speaking]:null,S=e.intensity?t[e.intensity]:null,C=e.motion?t[e.motion]:null,A=t[e.revision];if(!i&&!n&&!s&&!o)return null;const N=d(i==null?void 0:i.state,72),T=d(n==null?void 0:n.state,220),G=d(f==null?void 0:f.state,64),K=Ue(s,!0),I=Ue(o,!1),V=d(r==null?void 0:r.state,32)||"",M=Ue(P)??V==="speaking",re=V||(K?M?"speaking":I?"thinking":"idle":"offline");return ce({version:1,assistant:d(a,40)||"Assistant",online:K,busy:I,status:N&&N!=="unknown"&&N!=="unavailable"?N:"",message:T&&T!=="unknown"&&T!=="unavailable"?T:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:G&&G!=="unknown"&&G!=="unavailable"?G:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(w==null?void 0:w.state,32)||null,activity:re,cue:d($==null?void 0:$.state,32)||null,intensity:na(S),speaking:M,motion:d(C==null?void 0:C.state,32)||null,revision:Number(A==null?void 0:A.state)||0})}function Ue(t,e){const a=d(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function na(t){const e=d(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function sa(t){const e=Oe(t);return{id:"ha-state",async read(){const a=await e.read();return a?ra(a,t.entityMap,t.assistantName):null}}}function Oe(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),i=Math.max(6e4,t.authCooldownMs??600*1e3);let n=null,s=0,o=null,l=0;async function f(){var P;const w=ft();if(w!=null&&w.states)return w.states;const r=Date.now();if(n&&r-s<a||!t.allowApiFallback||typeof e!="function"||r<l)return n;if(o)return o;const $=d(((P=t.readToken)==null?void 0:P.call(t))??aa(),4096);return $?(o=e(t.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${$}`}}).then(async S=>{if(!S.ok){const C=new Error(`HA states HTTP ${S.status}`);throw C.status=S.status,C}return S.json()}).then(S=>{const C=ia(S);return C&&(n=C,s=Date.now()),C||n}).catch(S=>(((S==null?void 0:S.status)===401||(S==null?void 0:S.status)===403)&&(l=Date.now()+i),n)).finally(()=>{o=null}),o):n}return{id:"ha-states",async read(){return f()}}}async function He(t){const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=d(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const i=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await e(i.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return t.sanitize?t.sanitize(s):s}catch(n){if(t.defaultValue!==void 0)return t.defaultValue;throw n}}function oa(t){return{id:"json-state",async read(){const e=await He({...t,defaultValue:t.defaultValue});return ce(e)}}}function Xe(t){return{id:"json-control",async read(){const e=await He({...t,defaultValue:t.defaultValue??ie});return ge(e)}}}function la(t){return{id:"json-lines",async read(){const e=await He({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>d(a,220)).filter(Boolean):[]}}}function _(t,e,a=64){return d(t[e],a)}function pe(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function da(t,e="en-US"){const a=d(t,64);if(!a)return"";const i=new Date(a);return Number.isNaN(i.getTime())?a:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ce(t,e){return!t||!e?null:t[e]||null}function ca(t,e=null,a="en-US"){var $,P,S,C;const i=_(t,"caption",40)||_(t,"type",24)||"Card",n=_(t,"hint",72),s=_(t,"type",32).toLowerCase()||"entity",o=_(t,"entity",255),l=Ce(e,o),f=Ce(e,_(t,"stateEntity",255)),w=Ce(e,_(t,"downEntity",255)),r=Ce(e,_(t,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:_(t,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const A=Number(l==null?void 0:l.state);return!Number.isFinite(A)||A<=0?{caption:i,value:"Clear",hint:n||"nothing pending"}:{caption:i,value:`${A} item${A===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const A=(l==null?void 0:l.state)==="on";return{caption:i,value:A?_(t,"onText",48)||"On":_(t,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const A=pe(l==null?void 0:l.state,0);return{caption:i,value:A?`${A}%`:"—",hint:d(f==null?void 0:f.state,48)||n||"battery level"}}if(s==="network"){const A=pe(w==null?void 0:w.state,0),N=pe(r==null?void 0:r.state,0);return{caption:i,value:A||N?`↓ ${A||"0"} · ↑ ${N||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:i,value:da(l==null?void 0:l.state,a)||"—",hint:n||"next event"};if(s==="percent"){const A=pe(l==null?void 0:l.state,Number(_(t,"digits",4))||0);return{caption:i,value:A?`${A}%`:"—",hint:n||d(($=l==null?void 0:l.attributes)==null?void 0:$.friendly_name,48)||"state percentage"}}if(s==="number"){const A=Number(_(t,"digits",4))||0,N=pe(l==null?void 0:l.state,A),T=_(t,"unit",16)||d((P=l==null?void 0:l.attributes)==null?void 0:P.unit_of_measurement,16);return{caption:i,value:N?`${N}${T?` ${T}`:""}`:"—",hint:n||d((S=l==null?void 0:l.attributes)==null?void 0:S.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||_(t,"value",64)||"—",hint:n||d((C=l==null?void 0:l.attributes)==null?void 0:C.friendly_name,48)||"entity state"}}function ua(t,e=null,a="en-US"){return Array.isArray(t)?t.map(i=>ca(i,e,a)):[]}const gt={...ut,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},mt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},ht={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},pa={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Ie={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function h(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function vt(t){return t.endsWith("/")?t:`${t}/`}function W(t,e){const a=d(e,1024);return a?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a)||a.startsWith("/")?a:new URL(a,t).toString():""}function yt(t){return new URL(".",t).toString()}function fa(t,e){const a=yt(e),i=W(a,d(t.assetRoot,1024)||"./assets");return{...t,assetRoot:i,runtimeUrl:W(a,t.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([n,s])=>[n,W(a,s)]).filter(([,n])=>!!n))}}function De(t){return{...Ie,...t||{},metrics:{...Ie.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)&&t.forecast.length?t.forecast.map(e=>({...e})):Ie.forecast.map(e=>({...e}))}}function Qe(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function j(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const i=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function ga(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${j(a)} мм рт. ст.`:`${j(a*.750061683,0)} мм рт. ст.`}function ma(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${j(a,1)} м/с`:i==="km/h"||i==="км/ч"?`${j(a/3.6,1)} м/с`:`${j(a,1)} м/с`}function ha(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function va(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function ya(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function ba(t,e="ru-RU"){const a=d(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||d(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function et(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function wa(t,e="./assets/icons"){const a=Number(t),i=vt(e);return a===0?`${i}sun.svg`:[1,2].includes(a)?`${i}cloud-sun.svg`:[3].includes(a)?`${i}cloud.svg`:[45,48].includes(a)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${i}cloud-snow.svg`:[95,96,99].includes(a)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function Sa(t){const e=d(t.locale,32)||"ru-RU",a=d(t.iconBaseUrl,1024)||"./assets/icons",i=Oe({allowApiFallback:t.allowApiFallback,fetchImpl:t.fetchImpl});return async()=>{var C,A,N,T,G,K,I,V,F,M,re,he,ve,ye,be,we,Se,xe,ue,u;const n=await i.read(),s=t.fetchImpl??globalThis.fetch,o=n==null?void 0:n[t.weatherEntity];let l=null;const f=d(t.openMeteoUrl,4096);if(f&&typeof s=="function")try{const p=await s(`${f}${f.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});p.ok&&(l=await p.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const w=d(o==null?void 0:o.last_changed,64)||d((C=l==null?void 0:l.current)==null?void 0:C.time,64)||new Date().toISOString(),r=o?ba(o.state,e):et((A=l==null?void 0:l.current)==null?void 0:A.weather_code,e),$=Array.isArray((N=l==null?void 0:l.daily)==null?void 0:N.time)?l.daily.time.map((p,c)=>{var k,E,D,x,Q;const m=new Date(`${p}T12:00:00+03:00`);return{name:m.toLocaleDateString(e,{weekday:"short"}),dayNumber:m.toLocaleDateString(e,{day:"numeric"}),monthShort:m.toLocaleDateString(e,{month:"short"}),note:d(et((k=l.daily.weather_code)==null?void 0:k[c],e),28),max:`${j((E=l.daily.temperature_2m_max)==null?void 0:E[c])}°`,min:`${j((D=l.daily.temperature_2m_min)==null?void 0:D[c])}° · ${j((x=l.daily.precipitation_probability_max)==null?void 0:x[c])}%`,icon:wa((Q=l.daily.weather_code)==null?void 0:Q[c],a)}}):[],P=$[0]||null,S=$.slice(1,6);return{todayValue:va(w,e),todayLabel:ya(w,e),updatedAt:ha(w,e),temperature:j(((T=o==null?void 0:o.attributes)==null?void 0:T.temperature)??((G=l==null?void 0:l.current)==null?void 0:G.temperature_2m),1),condition:r,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${j(((K=o==null?void 0:o.attributes)==null?void 0:K.apparent_temperature)??((I=l==null?void 0:l.current)==null?void 0:I.apparent_temperature)??((V=o==null?void 0:o.attributes)==null?void 0:V.temperature),1)}°C`,badgeSummary:r,badgeRange:P?`${P.max} / ${j((M=(F=l==null?void 0:l.daily)==null?void 0:F.temperature_2m_min)==null?void 0:M[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${j(((re=o==null?void 0:o.attributes)==null?void 0:re.humidity)??((he=l==null?void 0:l.current)==null?void 0:he.relative_humidity_2m))}%`,pressure:ga(((ve=o==null?void 0:o.attributes)==null?void 0:ve.pressure)??((ye=l==null?void 0:l.current)==null?void 0:ye.surface_pressure),((be=o==null?void 0:o.attributes)==null?void 0:be.pressure_unit)??"hPa"),wind:ma(((we=o==null?void 0:o.attributes)==null?void 0:we.wind_speed)??((Se=l==null?void 0:l.current)==null?void 0:Se.wind_speed_10m),((xe=o==null?void 0:o.attributes)==null?void 0:xe.wind_speed_unit)??"km/h"),clouds:`${j(((ue=o==null?void 0:o.attributes)==null?void 0:ue.cloud_coverage)??((u=l==null?void 0:l.current)==null?void 0:u.cloud_cover))}%`},forecast:S}}}class xa{constructor(e,a={}){b(this,"root");b(this,"options");b(this,"avatarMountEl");b(this,"carouselShellEl");b(this,"carouselTrackEl");b(this,"dotsEl");b(this,"presetButtons");b(this,"copy");b(this,"labels");b(this,"presetLabels");b(this,"rendererConfig");b(this,"avatarManifest");b(this,"sceneConfig");b(this,"entityMap",null);b(this,"weatherData");b(this,"hassStates",null);b(this,"currentState");b(this,"remoteControl",ie);b(this,"uiControl",ie);b(this,"currentControl",ie);b(this,"idleLines",[]);b(this,"activeIndex",0);b(this,"lastAutoRotateAt",0);b(this,"currentIdleLine","");b(this,"lastIdleIndex",-1);b(this,"currentPreset","full");b(this,"idleTimer",null);b(this,"avatarAdapter",null);b(this,"refreshIntervalHandle",null);b(this,"orderedPages",[]);b(this,"carouselDragState",null);this.root=e,this.options=a,this.copy={...gt,...a.copy||{}},this.labels={...mt,...a.labels||{}},this.presetLabels={...ht,...a.presetLabels||{}},this.weatherData=De(a.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=W(window.location.href,this.getRendererConfigUrl()),a=yt(e),i=Be(await this.readJson(e)),n=Be({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,W(a,l)])),avatar:{...i.avatar,manifestUrl:W(a,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:W(a,i.scene.configUrl)},state:{...i.state,stateUrl:W(a,i.state.stateUrl),idleLinesUrl:W(a,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?W(a,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:W(a,i.control.controlUrl)}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=fa(dt(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await la({url:this.rendererConfig.state.idleLinesUrl||W(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Xe({url:this.rendererConfig.control.controlUrl,defaultValue:ie}).read(),this.currentControl=Te(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=It(this.uiControl,a||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",a=>{if(a.key==="ArrowLeft"){a.preventDefault(),this.stepPage(-1);return}a.key==="ArrowRight"&&(a.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",a=>{var i,n;a.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(a.target)||(this.carouselDragState={pointerId:a.pointerId,startX:a.clientX,startY:a.clientY,deltaX:0,deltaY:0,locked:!1},(n=(i=this.carouselShellEl).setPointerCapture)==null||n.call(i,a.pointerId))}),this.carouselShellEl.addEventListener("pointermove",a=>{if(!(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=a.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=a.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(a.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}a.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=a=>{if(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:n}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(n)>=s*.16,l=n<0?1:-1;if(this.clearDragState(a.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Xe({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=Te(ie,this.uiControl),this.currentControl=Te(this.remoteControl,this.uiControl);const e=ct(this.currentState,this.currentControl);this.syncIdleMonologue(e);const a=Ot(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=Le(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const n=this.getOrderedPages(i.pages,i.rotation.order),s=Bt({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>n.some(l=>l.id===o)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(a.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(a.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(n,a)}renderCarousel(e,a){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,n)=>i.kind==="overview"?this.renderOverviewSlide(i,a,n):this.renderDynamicSlide(i,n,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,n)=>`
      <button
        class="carousel-dot ${n===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${n}"
        data-scene-page-id="${h(i.id)}"
        aria-label="${h(d(i.title,40)||d(i.id,40)||`${this.labels.pageStamp} ${n+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,a,i){const n=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||Ie,o=s.forecast.slice(0,5).map(l=>this.renderForecastDay(l)).join("");return`
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
                  <strong>${h(a.caption)}</strong>
                  <div class="neiri-label">${h(a.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${h(this.resolveIconUrl("sparkles"))}" alt="${h(n)}"></div>
              </div>
              <div class="neiri-meta">${h(a.body)}</div>
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
    `}renderDynamicSlide(e,a,i){const n=ua(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${a+1} / ${i}`),f=e.cardStyle==="mini"?n.map((S,C)=>`
          <article class="mini-card" data-scene-card-index="${C}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(S.caption)}</span>
            <strong>${h(S.value)}</strong>
          </article>
        `).join(""):n.map((S,C)=>`
          <article class="home-card" data-scene-card-index="${C}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(S.caption)}</span>
            <strong>${h(S.value)}</strong>
            <small>${h(S.hint)}</small>
          </article>
        `).join(""),w=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(S=>this.renderForecastDay(S)).join("")}</div>`:"",r=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",$=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${a+1}`,P=d(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${h(e.id)}" data-scene-page-id="${h(e.id)}" data-slide-order="${a}">
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
          <div class="${r}">
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const a=e[0],i=e[e.length-1];return`${d(a.dayNumber,4)} ${d(a.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var n;const a=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return a||`${vt(d(this.options.iconBaseUrl,1024)||"./assets")}${pa[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:i,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,a){const i=a.map(s=>e.find(o=>o.id===s)).filter(Boolean),n=e.filter(s=>!i.some(o=>o.id===s.id));return i.concat(n)}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,a){var i,n;!a&&((n=(i=this.carouselShellEl).hasPointerCapture)!=null&&n.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=Le(this.sceneConfig,this.sceneConfig),i=Rt(a.rotation,this.activeIndex,e,n=>this.orderedPages.some(s=>s.id===n));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const n=Le(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,n.rotation.defaultDwellMs*2);this.uiControl=Et(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!jt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=Ye(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const a=Ye(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refresh()},Ht(18e3,18e3))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: HTTP ${a.status}`);return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>oa({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await sa({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:Oe({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const a=await this.readJson(this.getWeatherUrl());e=Qe(e,a)}catch{}if(this.options.weatherReader)try{const a=await this.options.weatherReader();e=Qe(e,a)}catch{}try{return De(e)}catch{return De(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Zt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return ea({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const i=a.dataset.avatarPreset||"",n=a.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];a.classList.toggle("is-active",i===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function ka(t,e={}){const a=new xa(t,e);return await a.init(),a}const $a=["overview","cards","forecast+cards"],Ca=["full","mini"],bt=["entity","text","todo","onoff","battery","network","time","percent","number"],Y=["caption","hint"],Pa={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Ia={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Можно оставить встроенную модель или добавить новую Live2D-модель из ZIP.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. Встроенная модель доступна всегда, отдельные модели появляются после импорта ZIP.",avatarPackEmpty:"Сейчас доступна только встроенная модель сцены. Новые модели можно добавить ZIP-архивом ниже.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"Импорт сразу создаёт отдельный avatar-pack, находит model3.json и подготавливает черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportButton:"Выбрать ZIP и импортировать",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон или выбери карточку из списка, затем настрой её ниже.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку из шаблона выше или выбери существующую карточку из списка.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"из HA",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. You can keep the bundled model or import a new Live2D model from a ZIP archive.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. The bundled scene model is always available; imported models appear here after ZIP import.",avatarPackEmpty:"Only the bundled scene model is available right now. Import a ZIP archive below to add more models.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import creates a separate avatar pack, detects model3.json and prepares a draft motion map.",avatarImportSelect:"Choose avatar ZIP",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportButton:"Choose and import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template or choose an existing card first, then edit it below.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card from the templates above or choose an existing one from the list.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"from HA",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Ea=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Ee=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Fe="mellow-fly-7";function le(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Aa(t){return Ee.find(e=>e.id===t)||Ee.find(e=>e.id===Fe)||Ee[0]}function Ta(t){return`${t.width} × ${t.height}`}function g(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function je(t){return JSON.parse(JSON.stringify(t))}function q(t){const e=new Map(t.pages.map(n=>[n.id,n])),a=t.rotation.order.map(n=>e.get(n)).filter(Boolean),i=t.pages.filter(n=>!a.some(s=>s.id===n.id));return[...a,...i]}function La(t,e){return e?Math.max(0,q(t).findIndex(a=>a.id===e)):0}function Ua(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function wt(t,e){const a=Ua(e);let i=a,n=2;for(;t.pages.some(s=>s.id===i);)i=`${a}-${n}`,n+=1;return i}function Da(t){const e=t.pages.length+1,a=le()==="ru";return{id:wt(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function tt(t){const e=le()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function O(t,e){const a=t[e];return a==null?"":String(a)}function X(t,e){const a=t[e];return a==null?"":String(a)}function te(t,e){const a=t.display||{},i=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function Ma(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function Me(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function at(t){return t.avatar||(t.avatar={}),t.avatar}function Na(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function Ra(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Ba(t){var i;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&q(t).some(n=>n.id===a)?a:((i=q(t)[0])==null?void 0:i.id)||null}async function Fa(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return je(a.config)}async function _a(t,e){const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await a.json();if(!a.ok||i.success===!1||!i.config)throw new Error(`POST ${t} failed: HTTP ${a.status}`);return je(i.config)}function Ve(t){switch(t){case"text":return[...Y,"value"];case"todo":return[...Y,"entity"];case"onoff":return[...Y,"entity","onText","offText"];case"battery":return[...Y,"entity","stateEntity"];case"network":return[...Y,"downEntity","upEntity"];case"time":return[...Y,"entity"];case"percent":return[...Y,"entity","digits"];case"number":return[...Y,"entity","digits","unit"];default:return[...Y,"entity"]}}function Ne(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:t.kindOverview}function de(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function St(t){const e=le();return Pa[e][t]||""}function Ae(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function Oa(t,e){const a=e.attributes||{},i=String(a.friendly_name||t),n=t.includes(".")&&t.split(".",1)[0]||"other",s=String(e.state||""),o=String(a.unit_of_measurement||"");return{entityId:t,name:i,domain:n,state:s,unit:o}}function Ha(t){return t?Object.entries(t).map(([e,a])=>Oa(e,a)).sort((e,a)=>{const i=e.domain.localeCompare(a.domain);return i!==0?i:e.name.localeCompare(a.name,"ru")}):[]}function ja(t,e){const a=e.trim().toLowerCase();return a?t.filter(i=>i.entityId.toLowerCase().includes(a)||i.name.toLowerCase().includes(a)||i.domain.toLowerCase().includes(a)||i.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function xt(t,e){const a=String(t||"").trim();return a?new URL(a,e).toString():""}function Va(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function za(t,e){const a=new URL("./",t).toString(),i=xt(e,a);return Va(i||a)}function it(t,e,a){const i=String(a||"").trim();return i?xt(i,za(t,e)):""}function ze(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}async function Wa(t,e){const a=String(t||"").trim();if(!a)return null;const i=await fetch(a,{cache:"no-store"}),n=await i.json();if(!i.ok)throw new Error(`GET ${a} failed: HTTP ${i.status}`);const s=String(n.assetRoot||"").trim();let o=0;const l=it(a,s,String(n.motionMapUrl||"").trim());if(l)try{const f=await fetch(l,{cache:"no-store"}),w=await f.json();f.ok&&Array.isArray(w.motions)&&(o=w.motions.length)}catch{o=0}return ze({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:a,previewUrl:it(a,s,String(n.fallbackPortrait||"").trim()),motionCount:o,capabilities:n.capabilities})}async function rt(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),i=await a.json();if(!a.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(i.items)?i.items.map(n=>ze(n)).filter(n=>n.id&&n.manifestUrl):[]}async function qa(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const n=await fetch(a,{method:"POST",body:i}),s=await n.json();if(!n.ok||s.success===!1||!s.item)throw new Error(String(s.error||`HTTP ${n.status}`));return ze(s.item)}async function Ga(t,e){var o,l,f,w;const a=String(t||"").trim(),i=String(e||"").trim();if(!a||!i)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${a}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((o=s.motionMap)==null?void 0:o.motions)?(l=s.motionMap)==null?void 0:l.motions.map(r=>({index:Number(r.index),id:String(r.id||"").trim(),label:String(r.label||r.id||"").trim(),group:String(r.group||"").trim(),tags:Array.isArray(r.tags)?r.tags.map($=>String($||"").trim()).filter(Boolean):[]})).filter(r=>Number.isFinite(r.index)):[],semantic:typeof((f=s.motionMap)==null?void 0:f.semantic)=="object"&&((w=s.motionMap)!=null&&w.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function Ka(t,e){var s,o,l;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await i.json();if(!i.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${i.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((o=n.motionMap)==null?void 0:o.semantic)=="object"&&((l=n.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function Ja(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function Ya(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function Za(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Ea.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${g(i.key)}">${g(Ya(t,i))}</label>
            <select id="avatar-semantic-${g(i.key)}" data-avatar-semantic="${g(i.key)}">
              <option value="">${g(t.avatarMotionNone)}</option>
              ${a.map(n=>`
                <option value="${g(String(n.index))}"${Ja(e.motionMap.semantic[i.key])===String(n.index)?" selected":""}>
                  ${g(`${n.label||n.id} · #${n.index}`)}
                </option>
              `).join("")}
            </select>
          </div>
        `).join("")}
      </div>
      <div class="cards-list">
        ${a.map(i=>`
          <article class="card-list-item">
            <div class="card-list-select">
              <strong>${g(i.label||i.id||`${t.avatarMappingMotion} ${i.index}`)}</strong>
              <span class="meta">${g(`${t.avatarMappingMotion} #${i.index} · ${i.group||t.avatarMappingMotion.toLowerCase()}`)}</span>
              <code>${g(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${t.avatarMappingSaveHint}</div>
    </div>
  `}function nt(t,e,a){var r,$,P,S,C;const i=(e==null?void 0:e.id)||"",n=a===i,s=(e==null?void 0:e.name)||t.avatarPackDefaultTile,o=(e==null?void 0:e.id)||t.avatarPackCurrent,l=(e==null?void 0:e.previewUrl)||"",f=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(r=e.capabilities)!=null&&r.supportsMotion?t.avatarCapabilityMotion:"",($=e.capabilities)!=null&&$.supportsEmotion?t.avatarCapabilityEmotion:"",(P=e.capabilities)!=null&&P.supportsLipSync?t.avatarCapabilityLipSync:"",(S=e.capabilities)!=null&&S.supportsViewPresets?t.avatarCapabilityViewPresets:"",(C=e.capabilities)!=null&&C.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],w=f.length?f:[t.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${l?`<img src="${g(l)}" alt="${g(s)}">`:`<span>${g(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${g(s)}</strong>
        <div class="meta">${g(o)}</div>
        <div class="avatar-pack-card-meta">
          ${w.map(A=>`<span>${g(A)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${g(i)}">
          ${g(n?t.avatarPackSelected:t.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function We(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function Xa(t,e,a,i){if(!e||a===null)return`<div class="meta">${g(t.entityBindingEmpty)}</div>`;const n=Ve(O(e,"type")||"entity").filter(s=>We(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===a&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${g(s)}">
            ${g(Ae(t,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${g(t.entityBindingNoTargets)}</div>`}function st(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function ne(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function ot(t){return Ve(t).find(e=>We(e))||null}function se(t,e,a,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${g(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${g(e)}" value="${g(a)}">
    </div>
  `}function ae(t,e,a){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${g(t)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${g(e)}" value="${g(a)}">
    </div>
  `}function lt(t,e,a,i){return`
    <div class="field">
      <label for="page-select-${e}">${g(t)}</label>
      <select id="page-select-${e}" data-page-field="${g(e)}">
        ${i.map(n=>`<option value="${g(n.value)}"${n.value===a?" selected":""}>${g(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function Qa(t,e,a,i){const n=O(e,"type")||"entity",s=Ve(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${g(O(e,"caption")||de(t,n))}</strong>
          <div class="meta">${g(de(t,n))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${g(t.cardType)}</label>
          <select data-card-index="${a}" data-card-field="type">
            ${bt.map(o=>`<option value="${o}"${o===n?" selected":""}>${g(de(t,o))}</option>`).join("")}
          </select>
        </div>
        ${s.map(o=>{const l=We(o),f=l&&(i==null?void 0:i.cardIndex)===a&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${f?" is-active":""}">
                <label>${g(Ae(t,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${a}"
                    data-card-field="${g(o)}"
                    data-binding-field="${g(o)}"
                    value="${g(O(e,o))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${a}"
                    data-binding-field="${g(o)}"
                  >${t.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${o==="hint"?"is-wide":""}">
              <label>${g(Ae(t,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${a}"
                data-card-field="${g(o)}"
                value="${g(O(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function ei(t,e,a,i,n){const s=O(e,"type")||"entity",o=O(e,"caption")||de(t,s),l=O(e,"entity")||O(e,"stateEntity")||O(e,"downEntity")||O(e,"upEntity")||O(e,"value")||O(e,"hint")||St(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <strong>${g(o)}</strong>
        <span class="meta">${g(de(t,s))}</span>
        <div class="meta">${g(l)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===i-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function ti(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${g(e)}"
    >
      <strong>${g(de(t,e))}</strong>
      <span>${g(St(e))}</span>
    </button>
  `}function ai(t,e,a){t[e]=a.entityId;const i=t;String(i.caption||"").trim()||(i.caption=a.name),String(i.hint||"").trim()||(i.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&a.unit&&(i.unit=a.unit)}async function ii(t){var ue;const e=Ia[le()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(a)&&document.body.insertBefore(a,i),i==null||i.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
        align-items: flex-start;
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
      #scene-editor-shell .cards-list,
      #scene-editor-shell .scene-settings-stack {
        display: grid;
        gap: 10px;
      }
      #scene-editor-shell .page-list {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(240px, 280px);
        gap: 12px;
        overflow-x: auto;
        padding: 2px 2px 8px;
        align-items: stretch;
        scrollbar-width: thin;
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
      #scene-editor-shell .page-chip {
        min-width: 0;
        align-content: space-between;
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
        #scene-editor-shell .page-list {
          grid-auto-columns: minmax(220px, 84vw);
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
                ${Ee.map(u=>`<option value="${g(u.id)}">${g(u.label[le()])}</option>`).join("")}
              </select>
            </div>
            <div class="scene-preview-resolution">
              <span>${e.previewResolution}</span>
              <strong data-preview-resolution>1920 × 1080</strong>
            </div>
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),o=n.querySelector("[data-preview-canvas]"),l=n.querySelector("[data-preview-resolution]"),f=n.querySelector("[data-preview-display]"),w=n.querySelector("[data-dashboard]");if(!s||!o||!l||!f||!w)throw new Error("Missing native editor shell elements");o.appendChild(a);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Fe,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},$=async u=>{const p=String(u||"").trim();if(!p||!t.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,I();try{r.avatarPackDetails=await Ga(t.avatarPackApiUrl,p),r.avatarPackDirty=!1}catch(c){r.avatarPackDetails=null,r.avatarPackDirty=!1,V(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{r.avatarPackLoading=!1}},P=()=>{var D;const u=Aa(r.previewDisplayId),p=Math.max(320,((D=s.parentElement)==null?void 0:D.clientWidth)||s.clientWidth||u.width),c=Math.max(260,Math.min(window.innerHeight*.62,760)),m=Math.min(1,p/u.width,c/u.height),k=Math.round(u.width*m),E=Math.round(u.height*m);f.value=u.id,l.textContent=Ta(u),s.style.aspectRatio=`${u.width} / ${u.height}`,s.style.width=`${k}px`,s.style.height=`${E}px`,o.style.width=`${u.width}px`,o.style.height=`${u.height}px`,o.style.transform=`scale(${m})`,a.style.width=`${u.width}px`,a.style.height=`${u.height}px`},S=u=>{r.previewDisplayId=String(u||"").trim()||Fe,P()},C=u=>{r.pendingAvatarZip=u,r.pendingAvatarZipName=(u==null?void 0:u.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",I()},A=async u=>{if(!(!r.config||!t.avatarImportUrl||r.avatarImporting)){r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",I();try{const p=await qa(t.avatarImportUrl,u);r.avatarCatalog=t.avatarCatalogUrl?await rt(t.avatarCatalogUrl):[p],at(r.config).packId=p.id,await $(p.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(p.name||p.id),r.avatarImportTone="ok",M(),I()}catch(p){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(p)}`,r.avatarImportTone="bad",I()}}},N=typeof ResizeObserver<"u"?new ResizeObserver(()=>P()):null;N==null||N.observe(s.parentElement||s);let T=null;const G=()=>{const u=r.selectedPageId||"",p=r.selectedCardIndex;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=a.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&p!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${p}"]`,m=a.querySelector(c);m&&(m.dataset.editorSelectedCard="true")}},K=typeof MutationObserver<"u"?new MutationObserver(()=>G()):null;K==null||K.observe(a,{childList:!0,subtree:!0});const I=()=>{const u=r.config,p=u?q(u):[],c=p.find(v=>v.id===r.selectedPageId)||p[0]||null,m=Array.isArray(c==null?void 0:c.cards)?c.cards:[],k=r.selectedCardIndex!==null&&m[r.selectedCardIndex]||null,E=ja(r.haEntities,r.entitySearch),D=r.focusedBinding?e.entityBindingActive(O(m[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,Ae(e,r.focusedBinding.field)):e.entityBindingEmpty,x=u?Me(u):"",Q=r.pendingAvatarZipName?e.avatarImportSelected(r.pendingAvatarZipName):e.avatarImportHint,ke=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${g(r.avatarImportStatus)}</div>`:"",B=r.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,Z=c?`${c.title||c.id||e.pageSettings} · ${Ne(e,c.kind)}`:e.statusLoading;w.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${g(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${g(t.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${r.saving||r.avatarPackSaving||!u?" disabled":""}>${r.saving||r.avatarPackSaving?e.saving:e.save}</button>
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
              <div class="meta">${B}</div>
              <div class="meta">${e.avatarPackAppliedAfterSave}</div>
              <div class="avatar-pack-grid">
                ${nt(e,r.bundledAvatar,x)}
                ${r.avatarCatalog.map(v=>nt(e,v,x)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <input id="avatar-pack-archive" type="file" accept=".zip,application/zip" data-avatar-archive hidden>
                <button class="scene-editor-button" type="button" data-action="open-avatar-archive"${r.avatarImporting||!t.avatarImportUrl?" disabled":""}>
                  ${r.avatarImporting?e.avatarImporting:e.avatarImportButton}
                </button>
                <div class="meta">${e.avatarImportSelect}</div>
              </div>
              <div class="meta">${g(Q)}</div>
              ${ke}
            </div>
            ${x?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?Za(e,r.avatarPackDetails):"":""}
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="pages">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(t.packId)}</div>
              <div class="meta">${e.pageOrderHint}</div>
            </div>
            <div class="page-list">
            ${p.map((v,L)=>`
              <article class="page-chip ${v.id===((c==null?void 0:c.id)||"")?"is-active":""}" draggable="true" data-drag-kind="page" data-page-id="${g(v.id)}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${g(v.id)}">
                  <strong>${g(v.title||v.id||(le()==="ru"?`Страница ${L+1}`:`Page ${L+1}`))}</strong>
                  <span class="meta">${g(Ne(e,v.kind))} · ${g(e.pageCards(Array.isArray(v.cards)?v.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${g(v.id)}"${L===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${g(v.id)}"${L===p.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${g(v.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
                </div>
              </article>
            `).join("")||`<div class="meta">${e.statusLoading}</div>`}
            </div>
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pageSettings}</h2>
              <div class="meta">${g(Z)}</div>
            </div>
          ${c?`
            <div class="inspector-grid">
              ${se(e.fieldPageId,"id",X(c,"id"),!0)}
              ${lt(e.fieldKind,"kind",X(c,"kind"),$a.map(v=>({value:v,label:Ne(e,v)})))}
              ${se(e.fieldTitle,"title",X(c,"title"),!0)}
              ${se(e.fieldSubtitle,"subtitle",X(c,"subtitle"),!0)}
              ${se(e.fieldSlot,"slot",X(c,"slot"))}
              ${lt(e.fieldCardStyle,"cardStyle",X(c,"cardStyle")||"full",Ca.map(v=>({value:v,label:v==="mini"?e.styleMini:e.styleFull})))}
              ${se(e.fieldStampCaption,"stampCaption",X(c,"stampCaption"))}
              ${se(e.fieldStampValue,"stampValue",X(c,"stampValue"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card" data-editor-section="cards">
            <div class="scene-settings-head">
              <h2>${e.cards}</h2>
              <div class="meta">${e.cardsSubtitle}</div>
              <div class="meta">${e.cardOrderHint}</div>
            </div>
          ${c?`
            <div class="card-stack">
              <div>
                <div class="meta">${e.cardTemplates}</div>
                <div class="card-template-grid" style="margin-top:12px;">
                  ${bt.map(v=>ti(e,v)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${m.length?m.map((v,L)=>ei(e,v,L,m.length,L===r.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${k?Qa(e,k,r.selectedCardIndex||0,r.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              <div class="meta">${g(D)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${Xa(e,k,r.selectedCardIndex,r.focusedBinding)}
          </div>
          ${r.focusedBinding?`
            <div class="field ha-search" style="margin-top:12px;">
              <label for="ha-entity-search">${e.entitySearch}</label>
              <input id="ha-entity-search" type="text" data-ha-search value="${g(r.entitySearch)}">
            </div>
            <div class="ha-list">
              ${E.length?E.map(v=>`
                <article class="ha-entity">
                  <div class="ha-entity-row">
                    <div>
                      <strong>${g(v.name)}</strong>
                      <div class="meta">${g(v.domain)}</div>
                    </div>
                    <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${g(v.entityId)}">${e.useEntity}</button>
                  </div>
                  <code>${g(v.entityId)}</code>
                  <div class="ha-state">${g(v.state)}${v.unit?` · ${g(v.unit)}`:""}</div>
                </article>
              `).join(""):`<div class="meta">${e.noEntities}</div>`}
            </div>
          `:""}
          </section>
        </div>
      </div>
    `;const J=w.querySelector("[data-avatar-archive]");J==null||J.addEventListener("change",()=>{var L;const v=((L=J.files)==null?void 0:L[0])||null;C(v),J.value="",v&&A(v)});for(const v of Array.from(w.querySelectorAll(".page-chip[data-page-id]")))v.draggable=!0,v.addEventListener("dragstart",L=>{const H=String(v.dataset.pageId||"").trim();T=H?{kind:"page",pageId:H}:null,!(!T||!L.dataTransfer)&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain",JSON.stringify(T)))}),v.addEventListener("dragover",L=>{!T||T.kind!=="page"||(L.preventDefault(),ne(n),v.classList.add("is-drop-target"),L.dataTransfer&&(L.dataTransfer.dropEffect="move"))}),v.addEventListener("drop",L=>{if(!T||T.kind!=="page")return;L.preventDefault();const H=String(v.dataset.pageId||"").trim();H&&be(T.pageId,H),T=null,ne(n)}),v.addEventListener("dragend",()=>{T=null,ne(n)});for(const v of Array.from(w.querySelectorAll(".card-list-item[data-card-index]")))v.draggable=!0,v.addEventListener("dragstart",L=>{const H=Number(v.dataset.cardIndex||"-1");T=Number.isFinite(H)&&H>=0?{kind:"card",cardIndex:H}:null,!(!T||!L.dataTransfer)&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain",JSON.stringify(T)))}),v.addEventListener("dragover",L=>{!T||T.kind!=="card"||(L.preventDefault(),ne(n),v.classList.add("is-drop-target"),L.dataTransfer&&(L.dataTransfer.dropEffect="move"))}),v.addEventListener("drop",L=>{if(!T||T.kind!=="card")return;L.preventDefault();const H=Number(v.dataset.cardIndex||"-1");Number.isFinite(H)&&H>=0&&we(T.cardIndex,H),T=null,ne(n)}),v.addEventListener("dragend",()=>{T=null,ne(n)});P(),G()},V=(u,p)=>{r.status=u,r.statusTone=p,I()},F=()=>{if(!r.config)return;const u=q(r.config);if(!u.length){r.selectedPageId=null;return}(!r.selectedPageId||!u.some(m=>m.id===r.selectedPageId))&&(r.selectedPageId=u[0].id);const p=u.find(m=>m.id===r.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(r.selectedCardIndex===null||r.selectedCardIndex>=c.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),Ra(r.selectedPageId),Na(La(r.config,r.selectedPageId))},M=()=>{r.dirty=!0,V(e.statusDirty,"muted")},re=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),r.selectedPageId&&u.searchParams.set("editorPage",r.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},he=(u,p)=>{if(!r.config||!r.selectedPageId)return;const c=r.config.pages.find(m=>m.id===r.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const m=wt(r.config,p||"page"),k=c.id;c.id=m,r.config.rotation.order=r.config.rotation.order.map(E=>E===k?m:E),r.selectedPageId=m}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);M(),F()}},ve=(u,p)=>{if(!r.config)return;const c=Ma(r.config),m=c.safeArea||{},k=p===""?null:Number(p),E=Number.isFinite(k)?k:null;u==="safeTop"?m.top=E??0:u==="safeRight"?m.right=E??0:u==="safeBottom"?m.bottom=E??0:u==="safeLeft"?m.left=E??0:u==="layoutPaddingPx"?c.layoutPaddingPx=E??16:u==="layoutGapPx"?c.layoutGapPx=E??16:u==="globalScale"&&(c.globalScale=E??1),c.safeArea=m,M()},ye=(u,p,c)=>{var E;if(!r.config||!r.selectedPageId)return;const m=r.config.pages.find(D=>D.id===r.selectedPageId);if(!m)return;Array.isArray(m.cards)||(m.cards=[]);const k=m.cards[u];if(k){if(p==="type"){const D=tt(c);if(m.cards[u]={...D,caption:O(k,"caption")||D.caption},((E=r.focusedBinding)==null?void 0:E.cardIndex)===u){const x=ot(c);r.focusedBinding=x?{cardIndex:u,field:x}:null}}else p==="digits"?k[p]=c===""?0:Number(c):k[p]=c;M()}},be=(u,p)=>{if(!r.config||!u||!p||u===p)return;const c=q(r.config).map(E=>E.id),m=c.indexOf(u),k=c.indexOf(p);m<0||k<0||(c.splice(m,1),c.splice(k,0,u),r.config.rotation.order=c,r.selectedPageId=u,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),I())},we=(u,p)=>{if(!r.config||!r.selectedPageId||u===p)return;const c=r.config.pages.find(k=>k.id===r.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||p<0||u>=c.cards.length||p>=c.cards.length)return;const[m]=c.cards.splice(u,1);c.cards.splice(p,0,m),r.selectedCardIndex=p,r.focusedBinding=null,M(),I()},Se=u=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const p=r.config.pages.find(k=>k.id===r.selectedPageId),c=r.haEntities.find(k=>k.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const m=p.cards[r.focusedBinding.cardIndex];m&&(ai(m,r.focusedBinding.field,c),M(),I())},xe=(u,p)=>{r.selectedCardIndex=u,r.focusedBinding={cardIndex:u,field:p},I(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async u=>{var Q,ke;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),m=c==null?void 0:c.dataset.action;if(!m)return;if(m==="open-avatar-archive"){const y=w.querySelector("[data-avatar-archive]");y&&(y.value=""),y==null||y.click();return}if(!r.config)return;const k=q(r.config),E=(c==null?void 0:c.dataset.pageId)||null,D=E?k.findIndex(y=>y.id===E):-1;if(m==="select-page"&&E){r.selectedPageId=E,r.selectedCardIndex=0,r.focusedBinding=null,F(),I();return}if(m==="page-up"&&D>0){const y=k.map(B=>B.id);[y[D-1],y[D]]=[y[D],y[D-1]],r.config.rotation.order=y,r.selectedPageId=E,M(),F(),I();return}if(m==="page-down"&&D>=0&&D<k.length-1){const y=k.map(B=>B.id);[y[D],y[D+1]]=[y[D+1],y[D]],r.config.rotation.order=y,r.selectedPageId=E,M(),F(),I();return}if(m==="page-remove"&&E&&k.length>1){r.config.pages=r.config.pages.filter(y=>y.id!==E),r.config.rotation.order=q(r.config).map(y=>y.id),r.selectedPageId=((Q=q(r.config)[Math.max(0,D-1)])==null?void 0:Q.id)||((ke=q(r.config)[0])==null?void 0:ke.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,M(),F(),I();return}if(m==="add-page"){const y=Da(r.config);r.config.pages.push(y),r.config.rotation.order=q(r.config).map(B=>B.id),r.selectedPageId=y.id,r.selectedCardIndex=null,r.focusedBinding=null,M(),F(),I();return}if(m==="add-card-template"&&r.selectedPageId){const y=r.config.pages.find(Z=>Z.id===r.selectedPageId),B=(c==null?void 0:c.dataset.cardType)||"entity";if(y){Array.isArray(y.cards)||(y.cards=[]),y.cards.push(tt(B));const Z=y.cards.length-1;r.selectedCardIndex=Z;const J=ot(B);r.focusedBinding=J?{cardIndex:Z,field:J}:null,M(),I(),J&&window.requestAnimationFrame(()=>{const v=n.querySelector("#ha-entity-search");v==null||v.scrollIntoView({behavior:"smooth",block:"center"}),v==null||v.focus()})}return}if(m==="focus-binding"){const y=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),B=(c==null?void 0:c.dataset.bindingField)||"";y>=0&&B&&xe(y,B);return}const x=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(x>=0&&r.selectedPageId){const y=r.config.pages.find(B=>B.id===r.selectedPageId);if(!y||!Array.isArray(y.cards))return;if(m==="select-card"){r.selectedCardIndex=x,I();return}if(m==="card-remove"){y.cards=y.cards.filter((B,Z)=>Z!==x),r.selectedCardIndex!==null&&(r.selectedCardIndex===x?r.selectedCardIndex=y.cards.length?Math.min(x,y.cards.length-1):null:r.selectedCardIndex>x&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===x?r.focusedBinding=null:r.focusedBinding.cardIndex>x&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),M(),I();return}if(m==="card-up"&&x>0){[y.cards[x-1],y.cards[x]]=[y.cards[x],y.cards[x-1]],r.selectedCardIndex===x?r.selectedCardIndex=x-1:r.selectedCardIndex===x-1&&(r.selectedCardIndex=x),r.focusedBinding&&(r.focusedBinding.cardIndex===x?r.focusedBinding={cardIndex:x-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===x-1&&(r.focusedBinding={cardIndex:x,field:r.focusedBinding.field})),M(),I();return}if(m==="card-down"&&x<y.cards.length-1){[y.cards[x],y.cards[x+1]]=[y.cards[x+1],y.cards[x]],r.selectedCardIndex===x?r.selectedCardIndex=x+1:r.selectedCardIndex===x+1&&(r.selectedCardIndex=x),r.focusedBinding&&(r.focusedBinding.cardIndex===x?r.focusedBinding={cardIndex:x+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===x+1&&(r.focusedBinding={cardIndex:x,field:r.focusedBinding.field})),M(),I();return}}if(m==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,V(e.saving,"muted");try{if(r.avatarPackDirty&&r.avatarPackDetails&&t.avatarPackApiUrl){try{r.avatarPackDetails=await Ka(t.avatarPackApiUrl,r.avatarPackDetails)}catch(y){throw new Error(`${e.avatarMappingSaveError}: ${String(y)}`)}r.avatarPackDirty=!1}r.config=await _a(t.sceneApiUrl,je(r.config)),r.dirty=!1,r.saving=!1,r.avatarPackSaving=!1,F(),V(e.statusSaved,"ok"),window.setTimeout(()=>re(),250)}catch(y){r.saving=!1,r.avatarPackSaving=!1,V(`${e.saveError}: ${String(y)}`,"bad")}return}if(m==="bind-entity"){const y=(c==null?void 0:c.dataset.entityId)||"";Se(y)}}),n.addEventListener("input",u=>{const p=u.target;if(!p||!r.config){p&&p.dataset.previewDisplay!==void 0&&S(p.value);return}if(p.dataset.previewDisplay!==void 0){S(p.value);return}if(p.dataset.avatarSemantic!==void 0){const c=Me(r.config);if(!r.avatarPackDetails||!c||r.avatarPackDetails.packId!==c)return;const m=p.value.trim();m?r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic]=Number(m):delete r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic],r.avatarPackDirty=!0,V(e.statusDirty,"muted"),I();return}if(p.dataset.pageField){he(p.dataset.pageField,p.value),I();return}if(p.dataset.displayField){ve(p.dataset.displayField,p.value),I();return}if(p.dataset.cardField&&p.dataset.cardIndex){r.selectedCardIndex=Number(p.dataset.cardIndex),ye(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),I();return}p.hasAttribute("data-ha-search")&&(r.entitySearch=p.value,I())}),n.addEventListener("click",u=>{var m;const p=(m=u.target)==null?void 0:m.closest("[data-action='select-avatar-pack']");if(!p||!r.config)return;const c=String(p.dataset.packId||"").trim();at(r.config).packId=c||null,M(),$(c||null).finally(()=>I()),I()}),a.addEventListener("click",u=>{if(!r.config)return;const p=u.target,c=p==null?void 0:p.closest("[data-scene-card-index][data-scene-page-id]");if(c){const k=String(c.dataset.scenePageId||"").trim(),E=Number(c.dataset.sceneCardIndex||"-1");k&&Number.isFinite(E)&&E>=0&&(r.selectedPageId=k,r.selectedCardIndex=E,r.focusedBinding=null,F(),I(),st("cards"));return}const m=p==null?void 0:p.closest("[data-scene-page-id]");if(m){const k=String(m.dataset.scenePageId||"").trim();k&&(r.selectedPageId=k,r.selectedCardIndex=0,r.focusedBinding=null,F(),I(),st("pages"));return}}),n.addEventListener("change",u=>{var c;const p=u.target;!p||p.dataset.avatarArchive===void 0||C(((c=p.files)==null?void 0:c[0])||null)}),n.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(r.selectedCardIndex=c,r.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(r.config=await Fa(t.sceneApiUrl),t.sceneAvatarManifestUrl)try{r.bundledAvatar=await Wa(t.sceneAvatarManifestUrl,t.packId)}catch{r.bundledAvatar=null}if(t.avatarCatalogUrl)try{r.avatarCatalog=await rt(t.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=Ha(((ue=ft())==null?void 0:ue.states)||null),r.selectedPageId=Ba(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",await $(Me(r.config)),F()}catch(u){r.status=`${e.loadError}: ${String(u)}`,r.statusTone="bad"}I()}const ri="../scene-api/bootstrap",ni="weather.forecast_home_assistant",si="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",oi={...gt,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},li={...mt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},di={...ht,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},ci={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},ui={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:t=>`Pack: ${t||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:t=>`Pack: ${t||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function pi(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function fi(){return new URLSearchParams(window.location.search).get("bootstrap")||ri}function gi(t){const e=new URL(t,window.location.href);for(const a of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(a);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function R(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const n=gi(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,i).toString()}function _e(t,e,a,i){t.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${a}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function mi(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function hi(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return a}async function Re(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return e.json()}function vi(t,e){var a,i,n,s,o,l,f,w;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([r,$])=>[r,R($,e)]).filter(([,r])=>!!r)),avatar:{manifestUrl:R(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:R(String(((i=t.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((n=t.state)==null?void 0:n.provider)||"json",stateUrl:R(String(((s=t.state)==null?void 0:s.stateUrl)||"").trim(),e),haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:R(String(((l=t.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:R(String(((f=t.state)==null?void 0:f.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:R(String(((w=t.control)==null?void 0:w.controlUrl)||"").trim(),e)}}}async function yi(t,e){var w,r,$,P;const a=R(String(((w=t.files)==null?void 0:w.rendererConfigUrl)||"").trim(),e);if(!a)return"";const i=R(String(((r=t.files)==null?void 0:r.sceneConfigUrl)||"").trim(),e),n=R(String((($=t.files)==null?void 0:$.avatarCatalogUrl)||"").trim(),e);if(!i||!n)return a;let s="";try{const S=await Re(i);s=String(((P=S.avatar)==null?void 0:P.packId)||"").trim()}catch{s=""}if(!s)return a;let o="";try{const S=await Re(n),C=Array.isArray(S.items)?S.items.find(A=>String(A.id||"").trim()===s):null;o=R(String((C==null?void 0:C.manifestUrl)||"").trim(),e)}catch{o=""}if(!o)return a;const f={...vi(await Re(a),a),avatar:{manifestUrl:o}};return URL.createObjectURL(new Blob([JSON.stringify(f)],{type:"application/json"}))}const fe=document.getElementById("app");if(!fe)throw new Error("Missing #app root element");const oe=ui[pi()];_e(fe,oe.startingTitle,oe.startingBody);(async()=>{var e,a,i,n;const t=fi();try{const s=await hi(t),o=String(s.packId||"").trim(),l=o.toLowerCase()==="neiri",f=await yi(s,t);if(!f){_e(fe,oe.missingRendererTitle,oe.missingRendererBody,JSON.stringify(s,null,2));return}document.documentElement.dataset.packId=o,document.title=l?"Нейри":o?`kiosk-scene hosted runtime (${o})`:"kiosk-scene hosted runtime",await ka(fe,{rendererConfigUrl:f,weatherUrl:l?"./weather.json":void 0,weatherReader:l?Sa({weatherEntity:ni,openMeteoUrl:si,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:l?oi:void 0,labels:l?li:void 0,presetLabels:l?di:void 0,defaultWeather:l?ci:void 0}),mi()&&await ii({packId:o,sceneApiUrl:R(String(s.sceneEditorApiUrl||"").trim(),t),sceneAvatarManifestUrl:R(String(((e=s.files)==null?void 0:e.avatarManifestUrl)||"").trim(),t),avatarCatalogUrl:R(String(((a=s.files)==null?void 0:a.avatarCatalogUrl)||"").trim(),t),avatarImportUrl:R(String(((i=s.files)==null?void 0:i.avatarImportUrl)||"").trim(),t),avatarPackApiUrl:R(String(((n=s.files)==null?void 0:n.avatarPackApiUrl)||"").trim(),t),sceneUrl:R(String(s.entryUrl||s.runtimeBaseUrl||"./").trim(),t)})}catch(s){_e(fe,oe.failedTitle,oe.failedBody,String(s))}})();
