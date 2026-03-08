var et=Object.defineProperty;var tt=(i,e,t)=>e in i?et(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var h=(i,e,t)=>tt(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function k(i){return!!i&&typeof i=="object"&&!Array.isArray(i)}function n(i,e=160){const t=String(i??"").replace(/\s+/g," ").trim();return t?t.length<=e?t:`${t.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Te(i){const e=new Date(String(i??""));return Number.isNaN(e.getTime())?0:e.getTime()}function re(i,e){if(!k(i)||!k(e))return e??i;const t={...i};for(const[a,s]of Object.entries(e)){if(Array.isArray(s)){t[a]=s.slice();continue}if(k(s)&&k(t[a])){t[a]=re(t[a],s);continue}t[a]=s}return t}function it(i,e=40){return Array.isArray(i)?i.map(t=>n(t,e).toLowerCase()).filter(Boolean):[]}const W={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},Le={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function ve(i){var t,a,s,r,l,o,m,w,d,$;const e=re(W,k(i)?i:{});return{version:1,assistant:{name:n((t=e.assistant)==null?void 0:t.name,40)||W.assistant.name,locale:n((a=e.assistant)==null?void 0:a.locale,16)||void 0},links:k(e.links)?Object.fromEntries(Object.entries(e.links).map(([A,g])=>[n(A,64),n(g,1024)]).filter(([A,g])=>A&&g)):{},avatar:{manifestUrl:n((s=e.avatar)==null?void 0:s.manifestUrl,1024)||W.avatar.manifestUrl},scene:{configUrl:n((r=e.scene)==null?void 0:r.configUrl,1024)||W.scene.configUrl},state:{provider:((l=e.state)==null?void 0:l.provider)==="ha"?"ha":"json",stateUrl:n((o=e.state)==null?void 0:o.stateUrl,1024)||W.state.stateUrl,haApiFallback:((m=e.state)==null?void 0:m.haApiFallback)===!0,idleLinesUrl:n((w=e.state)==null?void 0:w.idleLinesUrl,1024)||W.state.idleLinesUrl,entityMapUrl:n((d=e.state)==null?void 0:d.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:n(($=e.control)==null?void 0:$.controlUrl,1024)||W.control.controlUrl}}}function Ve(i){var t,a,s,r,l;const e=re(Le,k(i)?i:{});return{version:1,adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:n(e.assetRoot,1024)||Le.assetRoot,runtimeUrl:n(e.runtimeUrl,1024)||"",entry:n(e.entry,1024)||"",modelUrl:n(e.modelUrl,1024)||"",fallbackPortrait:n(e.fallbackPortrait,1024)||"",motionMapUrl:n(e.motionMapUrl,1024)||"",expressionMapUrl:n(e.expressionMapUrl,1024)||"",presetThumbs:k(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,m])=>[n(o,32),n(m,1024)]).filter(([o,m])=>o&&m)):{},viewPresets:k(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,m])=>n(o,32)&&k(m))):{},capabilities:{supportsEmotion:((t=e.capabilities)==null?void 0:t.supportsEmotion)===!0,supportsMotion:((a=e.capabilities)==null?void 0:a.supportsMotion)===!0,supportsViewPresets:((s=e.capabilities)==null?void 0:s.supportsViewPresets)!==!1,supportsLipSync:((r=e.capabilities)==null?void 0:r.supportsLipSync)===!0,supportsPointerFocus:((l=e.capabilities)==null?void 0:l.supportsPointerFocus)===!0}}}const G={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},at=["full","torso","head"];function se(i,e=Date.now()){var o,m,w,d,$,A,g;const t=re(G,k(i)?i:{}),a={version:1,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):0,viewPreset:null,page:{mode:((o=t.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:n((m=t.page)==null?void 0:m.target,40)||null,until:n((w=t.page)==null?void 0:w.until,64)||null},cue:{cue:n((d=t.cue)==null?void 0:d.cue,32)||null,emotion:n(($=t.cue)==null?void 0:$.emotion,32)||null,motion:n((A=t.cue)==null?void 0:A.motion,32)||null,until:n((g=t.cue)==null?void 0:g.until,64)||null}},s=n(t.viewPreset,16).toLowerCase();a.viewPreset=at.includes(s)?s:null;const r=Te(a.page.until);a.page.mode==="pinned"&&(!r||r<=e||!a.page.target)&&(a.page={mode:"auto",target:null,until:null});const l=Te(a.cue.until);return(!l||l<=e)&&(a.cue={cue:null,emotion:null,motion:null,until:null}),a}function he(i,e,t=Date.now()){return se(re(se(i,t),k(e)?e:{}),t)}function st(i,e,t=Date.now()){return se({...i,revision:Math.max(0,Number(i==null?void 0:i.revision)||0)+1,viewPreset:e},t)}function rt(i,e,t=3e4,a=Date.now()){const s=n(e,40),r=new Date(a+Math.max(5e3,Number(t)||0)).toISOString();return se({...i,revision:Math.max(0,Number(i==null?void 0:i.revision)||0)+1,page:{mode:s?"pinned":"auto",target:s||null,until:s?r:null}},a)}function ze(i,e){var l,o,m;const t={...i||{}},a=n((l=e==null?void 0:e.cue)==null?void 0:l.cue,32),s=n((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),r=n((m=e==null?void 0:e.cue)==null?void 0:m.motion,32);return a&&(t.cue=a),s&&(t.emotion=s),r&&(t.motion=r),t}function R(i,e){const t=Number(i);return Number.isFinite(t)?Math.max(0,t):e}function Ie(i,e=1){const t=Number(i);return Number.isFinite(t)?Math.min(1,Math.max(.75,t)):e}function nt(i){return k(i)&&k(i.config)?i.config:i}function ot(i,e){const t={...i};return k(e)&&(typeof e.id=="string"&&(t.id=n(e.id,40)||t.id),typeof e.kind=="string"&&(t.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(t.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(t.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(t.title=e.title),typeof e.subtitle=="string"&&(t.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(t.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(t.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(t.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(t.cards=e.cards.filter(a=>k(a)))),t}function me(i,e){const t=nt(i),a=Array.isArray(e.pages)?e.pages.slice():[],s=k(t)&&Array.isArray(t.pages)?t.pages:[],r=a.map(g=>{const E=s.find(S=>n(k(S)?S.id:"",40)===g.id);return ot(g,E)}),l=k(t)&&k(t.rotation)?t.rotation:{},o=k(e.display)?e.display:{},m=k(t)&&k(t.display)?t.display:{},w=k(o.safeArea)?o.safeArea:{},d=k(m.safeArea)?m.safeArea:{},$=Array.isArray(l.order)?l.order:e.rotation.order,A=it($).filter((g,E,S)=>r.some(P=>P.id===g)&&S.indexOf(g)===E);return{version:1,rotation:{order:A.length?A:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(l.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:R(d.top,R(w.top,0)),right:R(d.right,R(w.right,0)),bottom:R(d.bottom,R(w.bottom,0)),left:R(d.left,R(w.left,0))},layoutPaddingPx:R(m.layoutPaddingPx,R(o.layoutPaddingPx,16)),layoutGapPx:R(m.layoutGapPx,R(o.layoutGapPx,16)),globalScale:Ie(m.globalScale,Ie(o.globalScale,1))},pages:r}}function lt(i,e=220){const t=n(i,Math.max(e+20,e)),a={emotion:"",activity:"",cue:"",motion:""},s=t.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(r,l,o)=>{const m=n(l,16).toLowerCase(),w=n(o,32).toLowerCase();return(m==="emotion"||m==="activity"||m==="cue"||m==="motion")&&w&&(a[m]=w)," "});return{text:n(s,e),emotion:a.emotion,activity:a.activity,cue:a.cue,motion:a.motion}}const dt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function Q(i,e={}){const t=k(i)?i:{},a={...dt,...e};return{version:1,assistant:n(t.assistant??a.assistant,40),online:typeof t.online=="boolean"?t.online:a.online,busy:typeof t.busy=="boolean"?t.busy:a.busy,status:n(t.status??a.status,255),message:n(t.message??a.message,255),source:n(t.source??a.source,64),updatedAt:n(t.updatedAt??a.updatedAt,64),emotion:n(t.emotion??a.emotion,32)||null,activity:n(t.activity??a.activity,32)||null,cue:n(t.cue??a.cue,32)||null,intensity:ct(t.intensity??a.intensity),speaking:typeof t.speaking=="boolean"?t.speaking:!!a.speaking,motion:n(t.motion??a.motion,32)||null,revision:Number.isFinite(Number(t.revision))?Math.max(0,Number(t.revision)):a.revision,event:n(t.event??a.event,64)}}function ct(i){if(i==null||i==="")return null;const e=Number(i);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function ut(i,e){return i.order[e]||i.order[0]||""}function pt(i,e){const t=i.order.findIndex(a=>a===e);return t>=0?t:0}function ft(i,e,t,a){const s=Array.isArray(i.order)?i.order:[];if(!s.length)return 0;const r=Math.max(0,Math.min(e,s.length-1));for(let l=1;l<=s.length;l+=1){const o=(r+l*t+s.length)%s.length;if(a(s[o]))return o}return r}function ht(i){const e=i.now??Date.now(),t=Array.isArray(i.rotation.order)&&i.rotation.order.length?i.rotation.order:[],a=Math.max(5e3,Number(i.rotation.defaultDwellMs)||18e3);if(!t.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const s=i.control.page;if(s.mode==="pinned"&&s.target)return{nextIndex:pt(i.rotation,s.target),nextAutoRotateAt:e,pinnedKey:`${s.target}:${s.until||""}`};if(i.force){const l=ut(i.rotation,i.activeIndex);return{nextIndex:i.isEligible(l)?i.activeIndex:Math.max(0,t.findIndex(m=>i.isEligible(m))),nextAutoRotateAt:e,pinnedKey:""}}if(e-i.lastAutoRotateAt<a)return{nextIndex:i.activeIndex,nextAutoRotateAt:i.lastAutoRotateAt,pinnedKey:""};let r=i.activeIndex;for(let l=1;l<=t.length;l+=1){const o=(i.activeIndex+l)%t.length;if(i.isEligible(t[o])){r=o;break}}return{nextIndex:r,nextAutoRotateAt:e,pinnedKey:""}}const je={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},mt=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function Ue(i){const e=n(i,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:mt.some(t=>e.includes(t)):!1}function gt(i,e){const t=Q(i),a=n(t.status,72),s=n(t.message,220);if(!(t.online!==!1&&(Ue(a)||Ue(s))))return{state:t,hasTechnicalFailure:!1};const o=n(t.emotion,32).toLowerCase(),m=n(t.motion,32).toLowerCase();return{state:{...t,busy:!1,status:n(e==null?void 0:e.healthyStatus,72),message:"",emotion:o==="error"?"calm":o||null,activity:n(t.activity,32).toLowerCase()==="error"?"idle":n(t.activity,32)||null,cue:n(t.cue,32)||null,intensity:t.intensity??null,speaking:!1,motion:m==="error"?"idle_soft":m||null},hasTechnicalFailure:!0}}function yt(i,e){const t=(e==null?void 0:e.copy)??je,a=Q(i),s=lt(a.message,220),r=gt({...a,message:s.text,emotion:n(a.emotion,32)||s.emotion||null,activity:n(a.activity,32)||s.activity||null,cue:n(a.cue,32)||s.cue||null,motion:n(a.motion,32)||s.motion||null},{healthyStatus:t.technicalHealthyLabel}),l=r.state,o=n(l.message,180),m=n(l.activity,32).toLowerCase(),w=l.online!==!1&&m!=="offline",d=!!l.busy||m==="thinking"||m==="busy"||m==="acting",$=l.speaking===!0||m==="speaking",A=w?d?t.busyLabel:o||$?t.speakingLabel:r.hasTechnicalFailure?t.technicalHealthyLabel:t.idleLabel:t.offlineLabel,g=o?t.messageCaption:r.hasTechnicalFailure?t.statusCaption:t.modeCaption,E=o||(w?d?t.busyBody:n(e==null?void 0:e.idleMonologue,220)||t.idleBody:t.offlineBody);return{state:l,hasTechnicalFailure:r.hasTechnicalFailure,caption:g,label:A,body:E,bodyKey:[g,A,E].join(":")}}function bt(i=28e3,e=52e3){return i+Math.floor(Math.random()*e)}function De(i,e=-1){const t=Array.isArray(i)?i.map(s=>n(s,220)).filter(Boolean):[];if(!t.length)return{line:"Waiting for input.",index:-1};let a=Math.floor(Math.random()*t.length);return t.length>1&&a===e&&(a=(a+1)%t.length),{line:t[a],index:a}}function vt(i){const e=(i==null?void 0:i.online)!==!1,t=!!(i!=null&&i.busy),a=!!n(i==null?void 0:i.message,180);return e&&!t&&!a}const wt={cue:null,emotion:null,motion:null,until:null},St={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function xt(i){return!!i&&typeof i=="object"&&!Array.isArray(i)}function We(i){return i.endsWith("/")?i:`${i}/`}function ne(i,e){const t=n(e,1024);if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/"))return t;const a=new URL(We(n(i,1024)||"."),window.location.href);return new URL(t,a).toString()}function le(i){const e=n(i,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function $t(i,e,t){const a=n(i.runtimeUrl,1024)||n(e.runtimeUrl,1024);return a?le(a):new URL("../avatar.html",new URL(We(n(t,1024)||"."),window.location.href)).toString()}function Ct(i,e){const t=n(e,512);if(t)return t;try{return new URL(i,window.location.href).origin||"*"}catch{return"*"}}function Et(i,e){const t=new URL(i,window.location.href),a={...e.query||{}};e.displayMode!==!1&&a.display==null&&(a.display=!0);for(const[s,r]of Object.entries(a)){const l=n(s,64);if(!l||r==null)continue;const o=typeof r=="boolean"?r?"1":"0":String(r);t.searchParams.set(l,o)}return t.toString()}function Pt(i,e,t){const a=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([s,r])=>[n(s,32),ne(t,r)]).filter(([s,r])=>s&&r));return{version:1,assistant:{name:n(i.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(i.links||{}).map(([s,r])=>[n(s,64),le(r)]).filter(([s,r])=>s&&r)),state:{stateUrl:le(i.state.stateUrl),idleLinesUrl:le(i.state.idleLinesUrl||""),haApiFallback:i.state.haApiFallback===!0},assetPack:{modelJson:ne(t,n(e.modelUrl,1024)||n(e.entry,1024)),fallbackPortrait:ne(t,e.fallbackPortrait||""),motionMapUrl:ne(t,e.motionMapUrl||""),presetThumbs:a}}}class At{constructor(e={}){h(this,"id","live2d");h(this,"options");h(this,"manifest");h(this,"rendererConfig");h(this,"host",null);h(this,"containerEl",null);h(this,"iframeEl",null);h(this,"splashEl",null);h(this,"splashTextEl",null);h(this,"assetRoot","");h(this,"currentState");h(this,"currentCue",{...wt});h(this,"currentPreset","full");h(this,"currentBubble",{...St});h(this,"targetOrigin","*");h(this,"isReady",!1);h(this,"bubbleRevision",0);h(this,"handleWindowMessage",e=>{var s;const t=(s=this.iframeEl)==null?void 0:s.contentWindow;if(!t||e.source!==t||!xt(e.data))return;const a=n(e.data.type,64);if(a==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}a==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=Ve({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=ve(e.rendererConfig||{}),this.currentState=Q({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=n(e.assetRoot,1024)||this.manifest.assetRoot;const t=$t(this.options,this.manifest,this.assetRoot),a=Et(t,this.options);this.targetOrigin=Ct(a,this.options.targetOrigin);const s=document.createElement("div");s.className="ks-live2d-frame",Object.assign(s.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const r=document.createElement("iframe");r.className="ks-live2d-iframe",r.src=a,r.title=n(this.options.iframeTitle,80)||`${n(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,r.loading="eager",r.allow="autoplay",Object.assign(r.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),n(this.options.iframeSandbox,255)&&r.setAttribute("sandbox",n(this.options.iframeSandbox,255));const l=this.createSplash(this.assetRoot);s.append(r,l),this.host.append(s),r.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=s,this.iframeEl=r,this.splashEl=l,this.splashTextEl=l.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=Q(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:n(e==null?void 0:e.cue,32)||null,emotion:n(e==null?void 0:e.emotion,32)||null,motion:n(e==null?void 0:e.motion,32)||null,until:n(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,t){const a=n(e,255);this.currentBubble={text:a,key:a?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(t==null?void 0:t.ttlMs))?Math.max(0,Number(t==null?void 0:t.ttlMs)):0,speak:(t==null?void 0:t.speak)!==!1,typewriter:(t==null?void 0:t.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const t=document.createElement("div");t.className="ks-live2d-splash",Object.assign(t.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const a=document.createElement("div");Object.assign(a.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const s=document.createElement("div");s.textContent=n(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(s.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const r=document.createElement("div");return r.dataset.live2dSplashText="true",r.textContent="Loading compatibility renderer...",Object.assign(r.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),a.append(s,r),t.append(a),t}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Pt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=ze(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var a;const t=(a=this.iframeEl)==null?void 0:a.contentWindow;t&&t.postMessage(e,this.targetOrigin)}}function kt(i={}){return new At(i)}const Tt={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Ne={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Lt{constructor(e={}){h(this,"id","static");h(this,"options");h(this,"host",null);h(this,"frameEl",null);h(this,"imageEl",null);h(this,"bubbleEl",null);h(this,"fallbackEl",null);h(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const t=document.createElement("div");t.className="ks-static-avatar",Object.assign(t.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const a=document.createElement("img");a.className="ks-static-avatar-image",Object.assign(a.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),a.alt=this.options.alt||"Avatar";const s=document.createElement("div");s.className="ks-static-avatar-fallback",s.textContent=this.options.alt||"Avatar",Object.assign(s.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const r=document.createElement("div");r.className="ks-static-avatar-bubble",Object.assign(r.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),t.append(a,s,r),this.host.append(t),this.frameEl=t,this.imageEl=a,this.bubbleEl=r,this.fallbackEl=s;const l=this.resolveImageUrl(e.assetRoot);l&&(a.src=l,a.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),a.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const t=this.options.viewPresets||Ne,a=t[e]||t.full||Ne.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(a.x)||0}px, ${Number(a.y)||0}px) scale(${Number(a.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,t){if(!this.bubbleEl)return;const a=String(e||"").trim();if(!a){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=a,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Tt}resolveImageUrl(e){const t=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!t)return"";if(/^(?:https?:)?\/\//.test(t)||t.startsWith("/"))return t;const a=e.replace(/\/+$/,""),s=t.replace(/^\.?\//,"");return a?`${a}/${s}`:s}}function It(i={}){return new Lt(i)}function Ut(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function qe(){var i;for(const e of Ut())try{const t=(i=e==null?void 0:e.document)==null?void 0:i.querySelector("home-assistant"),a=t==null?void 0:t.hass;if(a!=null&&a.states)return a}catch{continue}return null}function Dt(){if(typeof window>"u"||!window.localStorage)return"";try{const i=window.localStorage.getItem("hassTokens");if(!i)return"";const e=JSON.parse(i);return n(e==null?void 0:e.access_token,4096)}catch{return""}}function Nt(i){if(!Array.isArray(i))return null;const e={};for(const t of i){if(!t||typeof t!="object")continue;const a=n(t.entity_id,255);a&&(e[a]=t)}return e}function Rt(i,e,t="Assistant"){const a=i[e.status],s=i[e.message],r=i[e.online],l=i[e.busy],o=i[e.source],m=i[e.updatedAt],w=e.emotion?i[e.emotion]:null,d=e.activity?i[e.activity]:null,$=e.cue?i[e.cue]:null,A=e.speaking?i[e.speaking]:null,g=e.intensity?i[e.intensity]:null,E=e.motion?i[e.motion]:null,S=i[e.revision];if(!a&&!s&&!r&&!l)return null;const P=n(a==null?void 0:a.state,72),N=n(s==null?void 0:s.state,220),_=n(m==null?void 0:m.state,64),H=ge(r,!0),V=ge(l,!1),z=n(d==null?void 0:d.state,32)||"",c=ge(A)??z==="speaking",u=z||(H?c?"speaking":V?"thinking":"idle":"offline");return Q({version:1,assistant:n(t,40)||"Assistant",online:H,busy:V,status:P&&P!=="unknown"&&P!=="unavailable"?P:"",message:N&&N!=="unknown"&&N!=="unavailable"?N:"",source:n(o==null?void 0:o.state,64)||"ha",updatedAt:_&&_!=="unknown"&&_!=="unavailable"?_:(a==null?void 0:a.last_changed)||new Date().toISOString(),emotion:n(w==null?void 0:w.state,32)||null,activity:u,cue:n($==null?void 0:$.state,32)||null,intensity:Ft(g),speaking:c,motion:n(E==null?void 0:E.state,32)||null,revision:Number(S==null?void 0:S.state)||0})}function ge(i,e){const t=n(i==null?void 0:i.state,16).toLowerCase();return t?["on","true","yes","open","home","1"].includes(t)?!0:["off","false","no","closed","not_home","0"].includes(t)?!1:e:e}function Ft(i){const e=n(i==null?void 0:i.state,32);if(!e)return null;const t=Number(e);return Number.isFinite(t)?Math.max(0,Math.min(1,t)):null}function Mt(i){const e=Se(i);return{id:"ha-state",async read(){const t=await e.read();return t?Rt(t,i.entityMap,i.assistantName):null}}}function Se(i={}){const e=i.fetchImpl??globalThis.fetch,t=Math.max(500,i.cacheTtlMs??2500),a=Math.max(6e4,i.authCooldownMs??600*1e3);let s=null,r=0,l=null,o=0;async function m(){var A;const w=qe();if(w!=null&&w.states)return w.states;const d=Date.now();if(s&&d-r<t||!i.allowApiFallback||typeof e!="function"||d<o)return s;if(l)return l;const $=n(((A=i.readToken)==null?void 0:A.call(i))??Dt(),4096);return $?(l=e(i.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${$}`}}).then(async g=>{if(!g.ok){const E=new Error(`HA states HTTP ${g.status}`);throw E.status=g.status,E}return g.json()}).then(g=>{const E=Nt(g);return E&&(s=E,r=Date.now()),E||s}).catch(g=>(((g==null?void 0:g.status)===401||(g==null?void 0:g.status)===403)&&(o=Date.now()+a),s)).finally(()=>{l=null}),l):s}return{id:"ha-states",async read(){return m()}}}async function xe(i){const e=i.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const t=n(i.url,2048);if(!t)throw new Error("JSON provider URL is empty.");const a=new URL(t,typeof window<"u"?window.location.href:"http://localhost/");a.searchParams.set(i.timestampParam||"ts",String(Date.now()));try{const s=await e(a.toString(),{cache:"no-store"});if(!s.ok)throw new Error(`HTTP ${s.status}`);const r=await s.json();return i.sanitize?i.sanitize(r):r}catch(s){if(i.defaultValue!==void 0)return i.defaultValue;throw s}}function _t(i){return{id:"json-state",async read(){const e=await xe({...i,defaultValue:i.defaultValue});return Q(e)}}}function Re(i){return{id:"json-control",async read(){const e=await xe({...i,defaultValue:i.defaultValue??G});return se(e)}}}function Bt(i){return{id:"json-lines",async read(){const e=await xe({...i,defaultValue:i.defaultValue??[]});return Array.isArray(e)?e.map(t=>n(t,220)).filter(Boolean):[]}}}function U(i,e,t=64){return n(i[e],t)}function ie(i,e=0){const t=Number(i);return Number.isFinite(t)?t.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function Ot(i,e="en-US"){const t=n(i,64);if(!t)return"";const a=new Date(t);return Number.isNaN(a.getTime())?t:a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function oe(i,e){return!i||!e?null:i[e]||null}function Ht(i,e=null,t="en-US"){var $,A,g,E;const a=U(i,"caption",40)||U(i,"type",24)||"Card",s=U(i,"hint",72),r=U(i,"type",32).toLowerCase()||"entity",l=U(i,"entity",255),o=oe(e,l),m=oe(e,U(i,"stateEntity",255)),w=oe(e,U(i,"downEntity",255)),d=oe(e,U(i,"upEntity",255));if(r==="text"||r==="static"||r==="note")return{caption:a,value:U(i,"value",64)||"—",hint:s||"static card"};if(r==="todo"){const S=Number(o==null?void 0:o.state);return!Number.isFinite(S)||S<=0?{caption:a,value:"Clear",hint:s||"nothing pending"}:{caption:a,value:`${S} item${S===1?"":"s"}`,hint:s||"pending tasks"}}if(r==="onoff"){const S=(o==null?void 0:o.state)==="on";return{caption:a,value:S?U(i,"onText",48)||"On":U(i,"offText",48)||"Off",hint:s||"device state"}}if(r==="battery"){const S=ie(o==null?void 0:o.state,0);return{caption:a,value:S?`${S}%`:"—",hint:n(m==null?void 0:m.state,48)||s||"battery level"}}if(r==="network"){const S=ie(w==null?void 0:w.state,0),P=ie(d==null?void 0:d.state,0);return{caption:a,value:S||P?`↓ ${S||"0"} · ↑ ${P||"0"}`:"—",hint:s||"throughput"}}if(r==="time")return{caption:a,value:Ot(o==null?void 0:o.state,t)||"—",hint:s||"next event"};if(r==="percent"){const S=ie(o==null?void 0:o.state,Number(U(i,"digits",4))||0);return{caption:a,value:S?`${S}%`:"—",hint:s||n(($=o==null?void 0:o.attributes)==null?void 0:$.friendly_name,48)||"state percentage"}}if(r==="number"){const S=Number(U(i,"digits",4))||0,P=ie(o==null?void 0:o.state,S),N=U(i,"unit",16)||n((A=o==null?void 0:o.attributes)==null?void 0:A.unit_of_measurement,16);return{caption:a,value:P?`${P}${N?` ${N}`:""}`:"—",hint:s||n((g=o==null?void 0:o.attributes)==null?void 0:g.friendly_name,48)||"numeric value"}}return{caption:a,value:n(o==null?void 0:o.state,64)||U(i,"value",64)||"—",hint:s||n((E=o==null?void 0:o.attributes)==null?void 0:E.friendly_name,48)||"entity state"}}function Vt(i,e=null,t="en-US"){return Array.isArray(i)?i.map(a=>Ht(a,e,t)):[]}const Ke={...je,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Ge={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured"},Ye={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},zt={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},de={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function p(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Je(i){return i.endsWith("/")?i:`${i}/`}function F(i,e){const t=n(e,1024);return t?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)||t.startsWith("/")?t:new URL(t,i).toString():""}function Xe(i){return new URL(".",i).toString()}function jt(i,e){const t=Xe(e),a=F(t,n(i.assetRoot,1024)||"./assets");return{...i,assetRoot:a,runtimeUrl:F(t,i.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(i.presetThumbs||{}).map(([s,r])=>[s,F(t,r)]).filter(([,s])=>!!s))}}function ye(i){return{...de,...i||{},metrics:{...de.metrics,...(i==null?void 0:i.metrics)||{}},forecast:Array.isArray(i==null?void 0:i.forecast)&&i.forecast.length?i.forecast.map(e=>({...e})):de.forecast.map(e=>({...e}))}}function Fe(i,e){return e?{...i,...e,metrics:{...i.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(t=>({...t})):i.forecast||[]}:i}function D(i,e=0){const t=Number(i);if(!Number.isFinite(t))return"--";const a=Math.max(0,e);return t.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:a})}function Wt(i,e){const t=Number(i);if(!Number.isFinite(t))return"--";const a=n(e,24).toLowerCase();return a==="mmhg"||a==="мм рт. ст."?`${D(t)} мм рт. ст.`:`${D(t*.750061683,0)} мм рт. ст.`}function qt(i,e){const t=Number(i);if(!Number.isFinite(t))return"--";const a=n(e,24).toLowerCase();return a==="m/s"||a==="м/с"?`${D(t,1)} м/с`:a==="km/h"||a==="км/ч"?`${D(t/3.6,1)} м/с`:`${D(t,1)} м/с`}function Kt(i,e="ru-RU"){const t=new Date(String(i||""));return Number.isNaN(t.getTime())?"--:--":t.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Gt(i,e="ru-RU"){const t=new Date(String(i||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{day:"numeric",month:"long"})}function Yt(i,e="ru-RU"){const t=new Date(String(i||""));return Number.isNaN(t.getTime())?"--":t.toLocaleDateString(e,{weekday:"long"})}function Jt(i,e="ru-RU"){const t=n(i,64).toLowerCase();return t?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[t]||n(i,64):t:e.startsWith("ru")?"Неизвестно":"Unknown"}function Me(i,e="ru-RU"){const t=Number(i);return Number.isFinite(t)?e.startsWith("ru")?t===0?"Ясно":[1,2].includes(t)?"Переменная облачность":t===3?"Пасмурно":[45,48].includes(t)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(t)?"Морось":[71,73,75,77,85,86].includes(t)?"Снег":[95,96,99].includes(t)?"Гроза":"Облачно":t===0?"Clear":[1,2].includes(t)?"Partly cloudy":t===3?"Cloudy":[45,48].includes(t)?"Fog":[51,53,55,61,63,65,80,81,82].includes(t)?"Rain":[71,73,75,77,85,86].includes(t)?"Snow":[95,96,99].includes(t)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function Xt(i,e="./assets/icons"){const t=Number(i),a=Je(e);return t===0?`${a}sun.svg`:[1,2].includes(t)?`${a}cloud-sun.svg`:[3].includes(t)?`${a}cloud.svg`:[45,48].includes(t)?`${a}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(t)?`${a}cloud-rain.svg`:[71,73,75,77,85,86].includes(t)?`${a}cloud-snow.svg`:[95,96,99].includes(t)?`${a}cloud-lightning.svg`:`${a}cloud.svg`}function Qt(i){const e=n(i.locale,32)||"ru-RU",t=n(i.iconBaseUrl,1024)||"./assets/icons",a=Se({allowApiFallback:i.allowApiFallback,fetchImpl:i.fetchImpl});return async()=>{var E,S,P,N,_,H,V,z,Y,c,u,f,v,T,C,b,L,Z,ee,te;const s=await a.read(),r=i.fetchImpl??globalThis.fetch,l=s==null?void 0:s[i.weatherEntity];let o=null;const m=n(i.openMeteoUrl,4096);if(m&&typeof r=="function")try{const y=await r(`${m}${m.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});y.ok&&(o=await y.json())}catch{o=null}if(!l&&!(o!=null&&o.current))return null;const w=n(l==null?void 0:l.last_changed,64)||n((E=o==null?void 0:o.current)==null?void 0:E.time,64)||new Date().toISOString(),d=l?Jt(l.state,e):Me((S=o==null?void 0:o.current)==null?void 0:S.weather_code,e),$=Array.isArray((P=o==null?void 0:o.daily)==null?void 0:P.time)?o.daily.time.map((y,I)=>{var Ce,Ee,Pe,Ae,ke;const j=new Date(`${y}T12:00:00+03:00`);return{name:j.toLocaleDateString(e,{weekday:"short"}),dayNumber:j.toLocaleDateString(e,{day:"numeric"}),monthShort:j.toLocaleDateString(e,{month:"short"}),note:n(Me((Ce=o.daily.weather_code)==null?void 0:Ce[I],e),28),max:`${D((Ee=o.daily.temperature_2m_max)==null?void 0:Ee[I])}°`,min:`${D((Pe=o.daily.temperature_2m_min)==null?void 0:Pe[I])}° · ${D((Ae=o.daily.precipitation_probability_max)==null?void 0:Ae[I])}%`,icon:Xt((ke=o.daily.weather_code)==null?void 0:ke[I],t)}}):[],A=$[0]||null,g=$.slice(1,6);return{todayValue:Gt(w,e),todayLabel:Yt(w,e),updatedAt:Kt(w,e),temperature:D(((N=l==null?void 0:l.attributes)==null?void 0:N.temperature)??((_=o==null?void 0:o.current)==null?void 0:_.temperature_2m),1),condition:d,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${D(((H=l==null?void 0:l.attributes)==null?void 0:H.apparent_temperature)??((V=o==null?void 0:o.current)==null?void 0:V.apparent_temperature)??((z=l==null?void 0:l.attributes)==null?void 0:z.temperature),1)}°C`,badgeSummary:d,badgeRange:A?`${A.max} / ${D((c=(Y=o==null?void 0:o.daily)==null?void 0:Y.temperature_2m_min)==null?void 0:c[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${D(((u=l==null?void 0:l.attributes)==null?void 0:u.humidity)??((f=o==null?void 0:o.current)==null?void 0:f.relative_humidity_2m))}%`,pressure:Wt(((v=l==null?void 0:l.attributes)==null?void 0:v.pressure)??((T=o==null?void 0:o.current)==null?void 0:T.surface_pressure),((C=l==null?void 0:l.attributes)==null?void 0:C.pressure_unit)??"hPa"),wind:qt(((b=l==null?void 0:l.attributes)==null?void 0:b.wind_speed)??((L=o==null?void 0:o.current)==null?void 0:L.wind_speed_10m),((Z=l==null?void 0:l.attributes)==null?void 0:Z.wind_speed_unit)??"km/h"),clouds:`${D(((ee=l==null?void 0:l.attributes)==null?void 0:ee.cloud_coverage)??((te=o==null?void 0:o.current)==null?void 0:te.cloud_cover))}%`},forecast:g}}}class Zt{constructor(e,t={}){h(this,"root");h(this,"options");h(this,"avatarMountEl");h(this,"carouselShellEl");h(this,"carouselTrackEl");h(this,"dotsEl");h(this,"presetButtons");h(this,"copy");h(this,"labels");h(this,"presetLabels");h(this,"rendererConfig");h(this,"avatarManifest");h(this,"sceneConfig");h(this,"entityMap",null);h(this,"weatherData");h(this,"hassStates",null);h(this,"currentState");h(this,"remoteControl",G);h(this,"uiControl",G);h(this,"currentControl",G);h(this,"idleLines",[]);h(this,"activeIndex",0);h(this,"lastAutoRotateAt",0);h(this,"currentIdleLine","");h(this,"lastIdleIndex",-1);h(this,"currentPreset","full");h(this,"idleTimer",null);h(this,"avatarAdapter",null);h(this,"refreshIntervalHandle",null);h(this,"orderedPages",[]);h(this,"carouselDragState",null);this.root=e,this.options=t,this.copy={...Ke,...t.copy||{}},this.labels={...Ge,...t.labels||{}},this.presetLabels={...Ye,...t.presetLabels||{}},this.weatherData=ye(t.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="Avatar view presets">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${p(this.presetLabels.full)}" aria-label="${p(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${p(this.presetLabels.torso)}" aria-label="${p(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${p(this.presetLabels.head)}" aria-label="${p(this.presetLabels.head)}">
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=F(window.location.href,this.getRendererConfigUrl()),t=Xe(e),a=ve(await this.readJson(e)),s=ve({...a,links:Object.fromEntries(Object.entries(a.links||{}).map(([l,o])=>[l,F(t,o)])),avatar:{...a.avatar,manifestUrl:F(t,a.avatar.manifestUrl)},scene:{...a.scene,configUrl:F(t,a.scene.configUrl)},state:{...a.state,stateUrl:F(t,a.state.stateUrl),idleLinesUrl:F(t,a.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:a.state.entityMapUrl?F(t,a.state.entityMapUrl):void 0},control:{...a.control,controlUrl:F(t,a.control.controlUrl)}});this.rendererConfig=s;const r=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=jt(Ve(await this.readJson(r)),r),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await Bt({url:this.rendererConfig.state.idleLinesUrl||F(t,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Re({url:this.rendererConfig.control.controlUrl,defaultValue:G}).read(),this.currentControl=he(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return n(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return n(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const t=e.dataset.avatarPreset;this.uiControl=st(this.uiControl,t||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",t=>{if(t.key==="ArrowLeft"){t.preventDefault(),this.stepPage(-1);return}t.key==="ArrowRight"&&(t.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",t=>{var a,s;t.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(t.target)||(this.carouselDragState={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,deltaX:0,deltaY:0,locked:!1},(s=(a=this.carouselShellEl).setPointerCapture)==null||s.call(a,t.pointerId))}),this.carouselShellEl.addEventListener("pointermove",t=>{if(!(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=t.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=t.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(t.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}t.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=t=>{if(!this.carouselDragState||t.pointerId!==this.carouselDragState.pointerId)return;const{locked:a,deltaX:s}=this.carouselDragState,r=this.carouselShellEl.clientWidth||1,l=a&&Math.abs(s)>=r*.16,o=s<0?1:-1;if(this.clearDragState(t.pointerId,!1),l){this.stepPage(o);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await Re({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=he(G,this.uiControl),this.currentControl=he(this.remoteControl,this.uiControl);const e=ze(this.currentState,this.currentControl);this.syncIdleMonologue(e);const t=yt(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),a=me(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(a);const s=this.getOrderedPages(a.pages,a.rotation.order),r=ht({control:this.currentControl,rotation:a.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:l=>s.some(o=>o.id===l)});if(this.activeIndex=r.nextIndex,this.lastAutoRotateAt=r.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(t.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(t.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(s,t)}renderCarousel(e,t){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((a,s)=>a.kind==="overview"?this.renderOverviewSlide(t,s):this.renderDynamicSlide(a,s,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((a,s)=>`
      <button
        class="carousel-dot ${s===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${s}"
        aria-label="${p(n(a.title,40)||`Page ${s+1}`)}"
      ></button>
    `).join("");for(const a of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))a.addEventListener("click",()=>{this.pinPageByIndex(Number(a.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,t){const a=n(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||de,r=s.forecast.slice(0,5).map(l=>this.renderForecastDay(l)).join("");return`
      <section class="slide slide-overview" data-slide-id="weather" data-slide-order="${t}">
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${p(s.title)}</h1>
              <p class="subline">${p(s.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${p(s.todayCaption)}</span>
                <span class="value">${p(s.todayValue)}</span>
                <span class="meta">${p(s.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${p(s.updatedCaption)}</span>
                <span class="value">${p(s.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${p(s.temperature)}</span>
                <span class="unit">°${p(s.unit)}</span>
              </div>
              <div class="condition">${p(s.condition)}</div>
              <div class="feels">${p(s.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${p(this.resolveIconUrl("thermometer"))}" alt=""><span>${p(s.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${p(this.resolveIconUrl("calendarDays"))}" alt=""><span>${p(s.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${p(e.caption)}</strong>
                  <div class="neiri-label">${p(e.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${p(this.resolveIconUrl("sparkles"))}" alt="${p(a)}"></div>
              </div>
              <div class="neiri-meta">${p(e.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${p(this.labels.humidity)}</span><i><img src="${p(this.resolveIconUrl("droplets"))}" alt=""></i></div><strong>${p(s.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${p(this.labels.pressure)}</span><i><img src="${p(this.resolveIconUrl("gauge"))}" alt=""></i></div><strong>${p(s.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${p(this.labels.wind)}</span><i><img src="${p(this.resolveIconUrl("wind"))}" alt=""></i></div><strong>${p(s.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${p(this.labels.clouds)}</span><i><img src="${p(this.resolveIconUrl("cloud"))}" alt=""></i></div><strong>${p(s.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${p(s.forecastTitle)}</h2>
              <p></p>
            </div>
            <div class="forecast-grid">${r}</div>
          </div>
        </div>
      </section>
    `}renderDynamicSlide(e,t,a){const s=Vt(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),r=this.resolveForecastRange(),l=n(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),o=n(e.stampValue,32)||(e.kind==="forecast+cards"?r:`${t+1} / ${a}`),m=e.cardStyle==="mini"?s.map($=>`
          <article class="mini-card">
            <span class="caption">${p($.caption)}</span>
            <strong>${p($.value)}</strong>
          </article>
        `).join(""):s.map($=>`
          <article class="home-card">
            <span class="caption">${p($.caption)}</span>
            <strong>${p($.value)}</strong>
            <small>${p($.hint)}</small>
          </article>
        `).join(""),w=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map($=>this.renderForecastDay($)).join("")}</div>`:"",d=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
      <section class="slide slide-dynamic" data-slide-id="${p(e.id)}" data-slide-order="${t}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${p(e.kind)}" data-dynamic-card-style="${p(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${p(n(e.title,64)||"Scene")}</h1>
              <p class="subline">${p(n(e.subtitle,140)||"Configured by scene.json")}</p>
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${p(l)}</span>
              <span class="value">${p(o)}</span>
            </div>
          </div>
          ${w}
          <div class="${d}">
            ${m||`<div class="empty">${p(this.labels.noCardsConfigured)}</div>`}
          </div>
        </div>
      </section>
    `}renderForecastDay(e){return`
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${p(e.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${p(e.name)}</span>
            <span class="meta"><span class="day-number">${p(e.dayNumber)}</span><span class="day-month">${p(e.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${p(e.max)}</strong>
          <small>${p(e.min)}</small>
        </div>
        <div class="day-note">${p(e.note)}</div>
      </article>
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return"5 days";const t=e[0],a=e[e.length-1];return`${n(t.dayNumber,4)} ${n(t.monthShort,8)} → ${n(a.dayNumber,4)} ${n(a.monthShort,8)}`}resolveIconUrl(e){var s;const t=n((s=this.options.iconUrls)==null?void 0:s[e],1024);return t||`${Je(n(this.options.iconBaseUrl,1024)||"./assets")}${zt[e]}`}applyDisplayConfig(e){const{safeAreaPx:t,layoutPaddingPx:a,layoutGapPx:s,globalScale:r}=e.display;this.root.style.setProperty("--scene-safe-top",`${t.top}px`),this.root.style.setProperty("--scene-safe-right",`${t.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${t.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${t.left}px`),this.root.style.setProperty("--scene-layout-padding",`${a}px`),this.root.style.setProperty("--scene-layout-gap",`${s}px`),this.root.style.setProperty("--scene-global-scale",String(r))}getOrderedPages(e,t){const a=t.map(r=>e.find(l=>l.id===r)).filter(Boolean),s=e.filter(r=>!a.some(l=>l.id===r.id));return a.concat(s)}updateCarouselPosition(e){const t=this.carouselShellEl.clientWidth||1,a=-(this.activeIndex*t)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${a}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,t){var a,s;!t&&((s=(a=this.carouselShellEl).hasPointerCapture)!=null&&s.call(a,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const t=me(this.sceneConfig,this.sceneConfig),a=ft(t.rotation,this.activeIndex,e,s=>this.orderedPages.some(r=>r.id===s));this.pinPageByIndex(a)}pinPageByIndex(e){var l;const a=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((l=this.sceneConfig.rotation)==null?void 0:l.order)||[]))[e];if(!a)return;const s=me(this.sceneConfig,this.sceneConfig),r=Math.max(18e3,s.rotation.defaultDwellMs*2);this.uiControl=rt(this.uiControl,a.id,r),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!vt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const t=De(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const t=De(this.idleLines,this.lastIdleIndex);this.currentIdleLine=t.line,this.lastIdleIndex=t.index,this.refresh()},bt(18e3,18e3))}requireEl(e){const t=this.root.querySelector(e);if(!t)throw new Error(`Missing element: ${e}`);return t}async readJson(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`Failed to load ${e}: HTTP ${t.status}`);return t.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>_t({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await Mt({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:Se({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const t=await this.readJson(this.getWeatherUrl());e=Fe(e,t)}catch{}if(this.options.weatherReader)try{const t=await this.options.weatherReader();e=Fe(e,t)}catch{}try{return ye(e)}catch{return ye(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return kt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return It({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const t of this.presetButtons){const a=t.dataset.avatarPreset||"",s=t.querySelector("[data-preset-thumb]"),r=(e=this.avatarManifest.presetThumbs)==null?void 0:e[a];t.classList.toggle("is-active",a===this.currentPreset),s&&(r?(s.src=r,s.removeAttribute("hidden")):(s.src="",s.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function ei(i,e={}){const t=new Zt(i,e);return await t.init(),t}const ti=["overview","cards","forecast+cards"],ii=["full","mini"],Qe=["entity","text","todo","onoff","battery","network","time","percent","number"],B=["caption","hint"],ai={ru:{title:"Редактор сцены",subtitle:i=>`Пакет: ${i||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается та сцена, которую увидит выбранный экран.",previewDisplay:"Профиль дисплея",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",hidePanel:"Скрыть панель",showPanel:"Показать панель",pages:"Страницы",pageKind:"Тип",pageCards:i=>`${i} карточ${i===1?"ка":i<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Параметры страницы",displaySettings:"Дисплей и врезка",displaySubtitle:"Подстройка под физический экран, safe area и общий масштаб сцены.",cards:"Карточки",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",remove:"Удалить",up:"Выше",down:"Ниже",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Home Assistant",entitySearch:"Поиск сущностей",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:i=>`Pack: ${i||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage mirrors how the selected screen should look.",previewDisplay:"Display profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",hidePanel:"Hide Panel",showPanel:"Show Panel",pages:"Pages",pageKind:"Kind",pageCards:i=>`${i} cards`,inspector:"Inspector",pageSettings:"Page settings",displaySettings:"Display fit",displaySubtitle:"Tune safe areas, spacing and overall scale for the physical screen.",cards:"Cards",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",remove:"Remove",up:"Up",down:"Down",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant",entitySearch:"Search entities",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},ce=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"}}],ue="mellow-fly-7";function _e(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function si(i){return ce.find(e=>e.id===i)||ce.find(e=>e.id===ue)||ce[0]}function ri(i){return`${i.width} × ${i.height}`}function x(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function $e(i){return JSON.parse(JSON.stringify(i))}function M(i){const e=new Map(i.pages.map(s=>[s.id,s])),t=i.rotation.order.map(s=>e.get(s)).filter(Boolean),a=i.pages.filter(s=>!t.some(r=>r.id===s.id));return[...t,...a]}function ni(i,e){return e?Math.max(0,M(i).findIndex(t=>t.id===e)):0}function oi(i){return String(i||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Ze(i,e){const t=oi(e);let a=t,s=2;for(;i.pages.some(r=>r.id===a);)a=`${t}-${s}`,s+=1;return a}function li(i){const e=i.pages.length+1;return{id:Ze(i,`page-${e}`),kind:"cards",title:`Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:"Page",stampValue:`${e} / ${e}`,cards:[]}}function Be(i){switch(i){case"text":return{type:i,caption:"Text",value:"—",hint:""};case"todo":return{type:i,caption:"Todo",entity:"",hint:""};case"onoff":return{type:i,caption:"Switch",entity:"",hint:"",onText:"On",offText:"Off"};case"battery":return{type:i,caption:"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:i,caption:"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:i,caption:"Time",entity:"",hint:""};case"percent":return{type:i,caption:"Percent",entity:"",digits:0,hint:""};case"number":return{type:i,caption:"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:"Entity",entity:"",hint:""}}}function pe(i,e){const t=i[e];return t==null?"":String(t)}function O(i,e){const t=i[e];return t==null?"":String(t)}function q(i,e){const t=i.display||{},a=t.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(a.top))?Number(a.top):0);case"safeRight":return String(Number.isFinite(Number(a.right))?Number(a.right):0);case"safeBottom":return String(Number.isFinite(Number(a.bottom))?Number(a.bottom):0);case"safeLeft":return String(Number.isFinite(Number(a.left))?Number(a.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(t.layoutPaddingPx))?Number(t.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(t.layoutGapPx))?Number(t.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(t.globalScale))?Number(t.globalScale):1);default:return""}}function di(i){return i.display||(i.display={}),i.display.safeArea||(i.display.safeArea={}),i.display}function ci(i){const e=document.querySelector(`.carousel-dot[data-slide-index="${i}"]`);e==null||e.click()}function ui(i){const e=new URL(window.location.href);i?e.searchParams.set("editorPage",i):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function pi(i){var a;const t=new URL(window.location.href).searchParams.get("editorPage");return t&&M(i).some(s=>s.id===t)?t:((a=M(i)[0])==null?void 0:a.id)||null}async function fi(i){const e=await fetch(i,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1||!t.config)throw new Error(`GET ${i} failed: HTTP ${e.status}`);return $e(t.config)}async function hi(i,e){const t=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),a=await t.json();if(!t.ok||a.success===!1||!a.config)throw new Error(`POST ${i} failed: HTTP ${t.status}`);return $e(a.config)}function mi(i){switch(i){case"text":return[...B,"value"];case"todo":return[...B,"entity"];case"onoff":return[...B,"entity","onText","offText"];case"battery":return[...B,"entity","stateEntity"];case"network":return[...B,"downEntity","upEntity"];case"time":return[...B,"entity"];case"percent":return[...B,"entity","digits"];case"number":return[...B,"entity","digits","unit"];default:return[...B,"entity"]}}function Oe(i,e){return e==="cards"?i.kindCards:e==="forecast+cards"?i.kindForecastCards:i.kindOverview}function fe(i,e){return{entity:i.cardEntity,text:i.cardText,todo:i.cardTodo,onoff:i.cardOnOff,battery:i.cardBattery,network:i.cardNetwork,time:i.cardTime,percent:i.cardPercent,number:i.cardNumber}[e]||e}function gi(i,e){return{caption:i.fieldCardCaption,hint:i.fieldCardHint,entity:i.fieldCardEntity,value:i.fieldCardValue,onText:i.fieldCardOnText,offText:i.fieldCardOffText,stateEntity:i.fieldCardStateEntity,downEntity:i.fieldCardDownEntity,upEntity:i.fieldCardUpEntity,digits:i.fieldCardDigits,unit:i.fieldCardUnit}[e]||e}function yi(i,e){const t=e.attributes||{},a=String(t.friendly_name||i),s=i.includes(".")&&i.split(".",1)[0]||"other",r=String(e.state||""),l=String(t.unit_of_measurement||"");return{entityId:i,name:a,domain:s,state:r,unit:l}}function bi(i){return i?Object.entries(i).map(([e,t])=>yi(e,t)).sort((e,t)=>{const a=e.domain.localeCompare(t.domain);return a!==0?a:e.name.localeCompare(t.name,"ru")}):[]}function vi(i,e){const t=e.trim().toLowerCase();return t?i.filter(a=>a.entityId.toLowerCase().includes(t)||a.name.toLowerCase().includes(t)||a.domain.toLowerCase().includes(t)||a.state.toLowerCase().includes(t)).slice(0,48):i.slice(0,48)}function wi(i){return["entity","stateEntity","downEntity","upEntity"].includes(i)}function J(i,e,t,a=!1){return`
    <div class="field ${a?"is-wide":""}">
      <label for="page-field-${e}">${x(i)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${x(e)}" value="${x(t)}">
    </div>
  `}function K(i,e,t){const a=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${x(i)}</label>
      <input id="display-field-${e}" type="number" step="${a}" data-display-field="${x(e)}" value="${x(t)}">
    </div>
  `}function He(i,e,t,a){return`
    <div class="field">
      <label for="page-select-${e}">${x(i)}</label>
      <select id="page-select-${e}" data-page-field="${x(e)}">
        ${a.map(s=>`<option value="${x(s.value)}"${s.value===t?" selected":""}>${x(s.label)}</option>`).join("")}
      </select>
    </div>
  `}function Si(i,e,t,a){const s=pe(e,"type")||"entity",r=mi(s);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${x(pe(e,"caption")||fe(i,s))}</strong>
          <div class="meta">${x(fe(i,s))}</div>
        </div>
        <div class="card-actions">
          <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${t}"${t===0?" disabled":""}>${i.up}</button>
          <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${t}"${t===a-1?" disabled":""}>${i.down}</button>
          <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${t}">${i.remove}</button>
        </div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${x(i.cardType)}</label>
          <select data-card-index="${t}" data-card-field="type">
            ${Qe.map(l=>`<option value="${l}"${l===s?" selected":""}>${x(fe(i,l))}</option>`).join("")}
          </select>
        </div>
        ${r.map(l=>`
          <div class="field ${l==="hint"?"is-wide":""}">
            <label>${x(gi(i,l))}</label>
            <input
              type="${l==="digits"?"number":"text"}"
              data-card-index="${t}"
              data-card-field="${x(l)}"
              ${wi(l)?`data-binding-field="${x(l)}"`:""}
              value="${x(pe(e,l))}"
            >
          </div>
        `).join("")}
      </div>
    </article>
  `}function xi(i,e,t){i[e]=t.entityId;const a=i;String(a.caption||"").trim()||(a.caption=t.name),String(a.hint||"").trim()||(a.hint=t.unit?`${t.state} ${t.unit}`.trim():t.state),(a.type==="number"||a.type==="percent")&&!String(a.unit||"").trim()&&t.unit&&(a.unit=t.unit)}async function $i(i){var Y;const e=ai[_e()],t=document.getElementById("app");if(!t)throw new Error("Missing #app root");const a=document.getElementById("scene-editor-shell");a!=null&&a.contains(t)&&document.body.insertBefore(t,a),a==null||a.remove();const s=document.createElement("section");s.id="scene-editor-shell",s.innerHTML=`
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
        display: grid;
        justify-items: center;
      }
      #scene-editor-shell .scene-preview-screen {
        width: var(--preview-stage-width);
        max-width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 30px;
        padding: 16px;
        border: 1px solid rgba(32,48,65,0.08);
        background:
          radial-gradient(circle at top left, rgba(255,255,255,0.92), transparent 28%),
          linear-gradient(165deg, #edf5fb 0%, #dbeaf3 52%, #f8fbfd 100%);
        overflow: hidden;
      }
      #scene-editor-shell .scene-preview-stage {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 22px;
        background: rgba(231, 240, 247, 0.68);
        border: 1px solid rgba(32,48,65,0.08);
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
      }
      #scene-editor-shell #app {
        flex: none;
        margin: 0;
        min-height: 0;
        transform-origin: top left;
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
        #scene-editor-shell .scene-preview-screen {
          padding: 10px;
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
                ${ce.map(c=>`<option value="${x(c.id)}">${x(c.label[_e()])}</option>`).join("")}
              </select>
            </div>
            <div class="scene-preview-resolution">
              <span>${e.previewResolution}</span>
              <strong data-preview-resolution>1920 × 1080</strong>
            </div>
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
  `,document.body.appendChild(s),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const r=s.querySelector("[data-preview-screen]"),l=s.querySelector("[data-preview-stage]"),o=s.querySelector("[data-preview-resolution]"),m=s.querySelector("[data-preview-display]"),w=s.querySelector("[data-dashboard]");if(!r||!l||!o||!m||!w)throw new Error("Missing native editor shell elements");l.appendChild(t);const d={config:null,selectedPageId:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],entitySearch:"",focusedBinding:null,previewDisplayId:ue},$=()=>{const c=si(d.previewDisplayId);m.value=c.id,o.textContent=ri(c),r.style.aspectRatio=`${c.width} / ${c.height}`,t.style.width=`${c.width}px`,t.style.height=`${c.height}px`;const u=r.clientWidth||c.width,f=Math.min(1,u/c.width);t.style.transform=`scale(${f})`},A=typeof ResizeObserver<"u"?new ResizeObserver(()=>$()):null;A==null||A.observe(r),window.addEventListener("resize",$);const g=()=>{const c=d.config,u=c?M(c):[],f=u.find(b=>b.id===d.selectedPageId)||u[0]||null,v=Array.isArray(f==null?void 0:f.cards)?f.cards:[],T=vi(d.haEntities,d.entitySearch),C=d.focusedBinding?`${e.entityBinding}: #${d.focusedBinding.cardIndex+1} → ${d.focusedBinding.field}`:e.entityBindingEmpty;w.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${d.statusTone}">${x(d.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${x(i.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${d.saving||!c?" disabled":""}>${d.saving?e.saving:e.save}</button>
          <button class="scene-editor-button" type="button" data-action="add-page"${c?"":" disabled"}>${e.addPage}</button>
          <button class="scene-editor-button" type="button" data-action="toggle-panel">${s.dataset.collapsed==="true"?e.showPanel:e.hidePanel}</button>
        </div>
      </div>
      <div class="scene-dashboard-body">
        <div class="scene-settings-stack">
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.pages}</h2>
              <div class="meta">${e.subtitle(i.packId)}</div>
            </div>
            <div class="page-list">
            ${u.map((b,L)=>`
              <article class="page-chip ${b.id===((f==null?void 0:f.id)||"")?"is-active":""}">
                <div class="page-chip-header" data-action="select-page" data-page-id="${x(b.id)}">
                  <strong>${x(b.title||b.id||`Page ${L+1}`)}</strong>
                  <span class="meta">${x(Oe(e,b.kind))} · ${x(e.pageCards(Array.isArray(b.cards)?b.cards.length:0))}</span>
                </div>
                <div class="page-chip-actions">
                  <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${x(b.id)}"${L===0?" disabled":""}>${e.up}</button>
                  <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${x(b.id)}"${L===u.length-1?" disabled":""}>${e.down}</button>
                  <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${x(b.id)}"${u.length<=1?" disabled":""}>${e.remove}</button>
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
          ${f?`
            <div class="inspector-grid">
              ${J(e.fieldPageId,"id",O(f,"id"),!0)}
              ${He(e.fieldKind,"kind",O(f,"kind"),ti.map(b=>({value:b,label:Oe(e,b)})))}
              ${J(e.fieldTitle,"title",O(f,"title"),!0)}
              ${J(e.fieldSubtitle,"subtitle",O(f,"subtitle"),!0)}
              ${J(e.fieldSlot,"slot",O(f,"slot"))}
              ${He(e.fieldCardStyle,"cardStyle",O(f,"cardStyle")||"full",ii.map(b=>({value:b,label:b==="mini"?e.styleMini:e.styleFull})))}
              ${J(e.fieldStampCaption,"stampCaption",O(f,"stampCaption"))}
              ${J(e.fieldStampValue,"stampValue",O(f,"stampValue"))}
            </div>
            <h2 style="margin-top:18px;">${e.cards}</h2>
            <div class="card-add">
              <select data-add-card-type>
                ${Qe.map(b=>`<option value="${b}">${x(fe(e,b))}</option>`).join("")}
              </select>
              <button class="scene-editor-button" type="button" data-action="add-card">${e.addCard}</button>
            </div>
            <div class="cards-list" style="margin-top:12px;">
              ${v.length?v.map((b,L)=>Si(e,b,L,v.length)).join(""):`<div class="meta">${e.noCards}</div>`}
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
              ${K(e.fieldDisplaySafeTop,"safeTop",q(c,"safeTop"))}
              ${K(e.fieldDisplaySafeRight,"safeRight",q(c,"safeRight"))}
              ${K(e.fieldDisplaySafeBottom,"safeBottom",q(c,"safeBottom"))}
              ${K(e.fieldDisplaySafeLeft,"safeLeft",q(c,"safeLeft"))}
              ${K(e.fieldDisplayPadding,"layoutPaddingPx",q(c,"layoutPaddingPx"))}
              ${K(e.fieldDisplayGap,"layoutGapPx",q(c,"layoutGapPx"))}
              ${K(e.fieldDisplayScale,"globalScale",q(c,"globalScale"))}
            </div>
          `:`<div class="meta">${e.statusLoading}</div>`}
          </section>
          <section class="scene-settings-card">
            <div class="scene-settings-head">
              <h2>${e.homeAssistant}</h2>
              <div class="meta">${x(C)}</div>
            </div>
          <div class="field ha-search" style="margin-top:12px;">
            <label for="ha-entity-search">${e.entitySearch}</label>
            <input id="ha-entity-search" type="text" data-ha-search value="${x(d.entitySearch)}">
          </div>
          <div class="ha-list">
            ${T.length?T.map(b=>`
              <article class="ha-entity">
                <div class="ha-entity-row">
                  <div>
                    <strong>${x(b.name)}</strong>
                    <div class="meta">${x(b.domain)}</div>
                  </div>
                  <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${x(b.entityId)}">${e.useEntity}</button>
                </div>
                <code>${x(b.entityId)}</code>
                <div class="ha-state">${x(b.state)}${b.unit?` · ${x(b.unit)}`:""}</div>
              </article>
            `).join(""):`<div class="meta">${e.noEntities}</div>`}
          </div>
          </section>
        </div>
      </div>
    `,$()},E=(c,u)=>{d.status=c,d.statusTone=u,g()},S=()=>{if(!d.config)return;const c=M(d.config);if(!c.length){d.selectedPageId=null;return}(!d.selectedPageId||!c.some(u=>u.id===d.selectedPageId))&&(d.selectedPageId=c[0].id),ui(d.selectedPageId),ci(ni(d.config,d.selectedPageId))},P=()=>{d.dirty=!0,E(e.statusDirty,"muted")},N=()=>{const c=new URL(window.location.href);c.searchParams.set("editor","1"),d.selectedPageId&&c.searchParams.set("editorPage",d.selectedPageId),c.searchParams.set("v",String(Date.now())),window.location.replace(c.toString())},_=(c,u)=>{if(!d.config||!d.selectedPageId)return;const f=d.config.pages.find(v=>v.id===d.selectedPageId);if(f){if(c==="slot")f.slot=u===""?void 0:Number(u);else if(c==="id"){const v=Ze(d.config,u||"page"),T=f.id;f.id=v,d.config.rotation.order=d.config.rotation.order.map(C=>C===T?v:C),d.selectedPageId=v}else c==="title"||c==="subtitle"||c==="stampCaption"||c==="stampValue"?f[c]=u:c==="kind"?f.kind=u:c==="cardStyle"&&(f.cardStyle=u);P(),S()}},H=(c,u)=>{if(!d.config)return;const f=di(d.config),v=f.safeArea||{},T=u===""?null:Number(u),C=Number.isFinite(T)?T:null;c==="safeTop"?v.top=C??0:c==="safeRight"?v.right=C??0:c==="safeBottom"?v.bottom=C??0:c==="safeLeft"?v.left=C??0:c==="layoutPaddingPx"?f.layoutPaddingPx=C??16:c==="layoutGapPx"?f.layoutGapPx=C??16:c==="globalScale"&&(f.globalScale=C??1),f.safeArea=v,P()},V=(c,u,f)=>{if(!d.config||!d.selectedPageId)return;const v=d.config.pages.find(C=>C.id===d.selectedPageId);if(!v)return;Array.isArray(v.cards)||(v.cards=[]);const T=v.cards[c];if(T){if(u==="type"){const C=Be(f);v.cards[c]={...C,caption:pe(T,"caption")||C.caption}}else u==="digits"?T[u]=f===""?0:Number(f):T[u]=f;P()}},z=c=>{if(!d.config||!d.selectedPageId||!d.focusedBinding)return;const u=d.config.pages.find(T=>T.id===d.selectedPageId),f=d.haEntities.find(T=>T.entityId===c);if(!u||!Array.isArray(u.cards)||!f)return;const v=u.cards[d.focusedBinding.cardIndex];v&&(xi(v,d.focusedBinding.field,f),P(),g())};s.addEventListener("click",async c=>{var Z,ee,te;const u=c.target,f=u==null?void 0:u.closest("[data-action]"),v=f==null?void 0:f.dataset.action;if(!v)return;if(v==="toggle-panel"){const y=s.dataset.collapsed==="true";s.dataset.collapsed=y?"false":"true",g();return}if(!d.config)return;const T=M(d.config),C=(f==null?void 0:f.dataset.pageId)||null,b=C?T.findIndex(y=>y.id===C):-1;if(v==="select-page"&&C){d.selectedPageId=C,S(),g();return}if(v==="page-up"&&b>0){const y=T.map(I=>I.id);[y[b-1],y[b]]=[y[b],y[b-1]],d.config.rotation.order=y,d.selectedPageId=C,P(),S(),g();return}if(v==="page-down"&&b>=0&&b<T.length-1){const y=T.map(I=>I.id);[y[b],y[b+1]]=[y[b+1],y[b]],d.config.rotation.order=y,d.selectedPageId=C,P(),S(),g();return}if(v==="page-remove"&&C&&T.length>1){d.config.pages=d.config.pages.filter(y=>y.id!==C),d.config.rotation.order=M(d.config).map(y=>y.id),d.selectedPageId=((Z=M(d.config)[Math.max(0,b-1)])==null?void 0:Z.id)||((ee=M(d.config)[0])==null?void 0:ee.id)||null,P(),S(),g();return}if(v==="add-page"){const y=li(d.config);d.config.pages.push(y),d.config.rotation.order=M(d.config).map(I=>I.id),d.selectedPageId=y.id,P(),S(),g();return}if(v==="add-card"&&d.selectedPageId){const y=d.config.pages.find(j=>j.id===d.selectedPageId),I=((te=s.querySelector("[data-add-card-type]"))==null?void 0:te.value)||"entity";y&&(Array.isArray(y.cards)||(y.cards=[]),y.cards.push(Be(I)),P(),g());return}const L=Number((f==null?void 0:f.dataset.cardIndex)||"-1");if(L>=0&&d.selectedPageId){const y=d.config.pages.find(I=>I.id===d.selectedPageId);if(!y||!Array.isArray(y.cards))return;if(v==="card-remove"){y.cards=y.cards.filter((I,j)=>j!==L),P(),g();return}if(v==="card-up"&&L>0){[y.cards[L-1],y.cards[L]]=[y.cards[L],y.cards[L-1]],P(),g();return}if(v==="card-down"&&L<y.cards.length-1){[y.cards[L],y.cards[L+1]]=[y.cards[L+1],y.cards[L]],P(),g();return}}if(v==="save"){d.saving=!0,E(e.saving,"muted");try{d.config=await hi(i.sceneApiUrl,$e(d.config)),d.dirty=!1,d.saving=!1,S(),E(e.statusSaved,"ok"),window.setTimeout(()=>N(),250)}catch(y){d.saving=!1,E(`${e.saveError}: ${String(y)}`,"bad")}return}if(v==="bind-entity"){const y=(f==null?void 0:f.dataset.entityId)||"";z(y)}}),s.addEventListener("input",c=>{const u=c.target;if(!u||!d.config){u!=null&&u.dataset.previewDisplay&&(d.previewDisplayId=u.value||ue,$());return}if(u.dataset.previewDisplay){d.previewDisplayId=u.value||ue,$();return}if(u.dataset.pageField){_(u.dataset.pageField,u.value),g();return}if(u.dataset.displayField){H(u.dataset.displayField,u.value),g();return}if(u.dataset.cardField&&u.dataset.cardIndex){V(Number(u.dataset.cardIndex),u.dataset.cardField,u.value),g();return}u.hasAttribute("data-ha-search")&&(d.entitySearch=u.value,g())}),s.addEventListener("focusin",c=>{const u=c.target;if(!(u!=null&&u.dataset.bindingField))return;const f=Number(u.dataset.cardIndex||"-1");f<0||(d.focusedBinding={cardIndex:f,field:u.dataset.bindingField})});try{d.config=await fi(i.sceneApiUrl),d.haEntities=bi(((Y=qe())==null?void 0:Y.states)||null),d.selectedPageId=pi(d.config),d.status=e.statusSaved,d.statusTone="ok",S()}catch(c){d.status=`${e.loadError}: ${String(c)}`,d.statusTone="bad"}g()}const Ci="../scene-api/bootstrap",Ei="weather.forecast_home_assistant",Pi="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Ai={...Ke,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},ki={...Ge,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены"},Ti={...Ye,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},Li={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},Ii={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:i=>`Pack: ${i||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:i=>`Pack: ${i||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function Ui(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Di(){return new URLSearchParams(window.location.search).get("bootstrap")||Ci}function Ni(i){const e=new URL(i,window.location.href);for(const t of["/scene-api/","/scene-runtime/","/scene-editor/"]){const a=e.pathname.indexOf(t);if(a>=0)return new URL(e.pathname.slice(0,a+1),e.origin).toString()}return null}function be(i,e){const t=String(i||"").trim();if(!t)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t))return t;const a=new URL(e,window.location.href);if(t.startsWith("/")){const s=Ni(e);if(s)return new URL(t.slice(1),s).toString()}return new URL(t,a).toString()}function we(i,e,t,a){i.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${t}</p>
        ${a?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${a}</pre>`:""}
      </div>
    </section>
  `}function Ri(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function Fi(i){const e=await fetch(i,{cache:"no-store"}),t=await e.json();if(!e.ok||t.success===!1)throw new Error(`Failed to load ${i}: HTTP ${e.status}`);return t}const ae=document.getElementById("app");if(!ae)throw new Error("Missing #app root element");const X=Ii[Ui()];we(ae,X.startingTitle,X.startingBody);(async()=>{var e;const i=Di();try{const t=await Fi(i),a=String(t.packId||"").trim(),s=a.toLowerCase()==="neiri",r=be(String(((e=t.files)==null?void 0:e.rendererConfigUrl)||"").trim(),i);if(!r){we(ae,X.missingRendererTitle,X.missingRendererBody,JSON.stringify(t,null,2));return}document.documentElement.dataset.packId=a,document.title=s?"Нейри":a?`kiosk-scene hosted runtime (${a})`:"kiosk-scene hosted runtime",await ei(ae,{rendererConfigUrl:r,weatherUrl:s?"./weather.json":void 0,weatherReader:s?Qt({weatherEntity:Ei,openMeteoUrl:Pi,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:s?Ai:void 0,labels:s?ki:void 0,presetLabels:s?Ti:void 0,defaultWeather:s?Li:void 0}),Ri()&&await $i({packId:a,sceneApiUrl:be(String(t.sceneEditorApiUrl||"").trim(),i),sceneUrl:be(String(t.entryUrl||t.runtimeBaseUrl||"./").trim(),i)})}catch(t){we(ae,X.failedTitle,X.failedBody,String(t))}})();
