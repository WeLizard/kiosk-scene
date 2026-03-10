var Ct=Object.defineProperty;var Pt=(t,e,a)=>e in t?Ct(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var y=(t,e,a)=>Pt(t,typeof e!="symbol"?e+"":e,a);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function U(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function d(t,e=160){const a=String(t??"").replace(/\s+/g," ").trim();return a?a.length<=e?a:`${a.slice(0,Math.max(0,e-1)).trimEnd()}…`:""}function Ke(t){const e=new Date(String(t??""));return Number.isNaN(e.getTime())?0:e.getTime()}function me(t,e){if(!U(t)||!U(e))return e??t;const a={...t};for(const[i,n]of Object.entries(e)){if(Array.isArray(n)){a[i]=n.slice();continue}if(U(n)&&U(a[i])){a[i]=me(a[i],n);continue}a[i]=n}return a}function It(t,e=40){return Array.isArray(t)?t.map(a=>d(a,e).toLowerCase()).filter(Boolean):[]}const ee={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json"}},Je={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function Fe(t){var a,i,n,s,o,l,f,b,r,C;const e=me(ee,U(t)?t:{});return{version:1,assistant:{name:d((a=e.assistant)==null?void 0:a.name,40)||ee.assistant.name,locale:d((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:U(e.links)?Object.fromEntries(Object.entries(e.links).map(([A,w])=>[d(A,64),d(w,1024)]).filter(([A,w])=>A&&w)):{},avatar:{manifestUrl:d((n=e.avatar)==null?void 0:n.manifestUrl,1024)||ee.avatar.manifestUrl},scene:{configUrl:d((s=e.scene)==null?void 0:s.configUrl,1024)||ee.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:d((l=e.state)==null?void 0:l.stateUrl,1024)||ee.state.stateUrl,haApiFallback:((f=e.state)==null?void 0:f.haApiFallback)===!0,idleLinesUrl:d((b=e.state)==null?void 0:b.idleLinesUrl,1024)||ee.state.idleLinesUrl,entityMapUrl:d((r=e.state)==null?void 0:r.entityMapUrl,1024)||void 0},control:{provider:"json",controlUrl:d((C=e.control)==null?void 0:C.controlUrl,1024)||ee.control.controlUrl}}}function He(t){var a,i,n,s,o;const e=me(Je,U(t)?t:{});return{version:1,name:d(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"?e.adapter:"static",assetRoot:d(e.assetRoot,1024)||Je.assetRoot,runtimeUrl:d(e.runtimeUrl,1024)||"",entry:d(e.entry,1024)||"",modelUrl:d(e.modelUrl,1024)||"",fallbackPortrait:d(e.fallbackPortrait,1024)||"",motionMapUrl:d(e.motionMapUrl,1024)||"",expressionMapUrl:d(e.expressionMapUrl,1024)||"",presetThumbs:U(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,f])=>[d(l,32),d(f,1024)]).filter(([l,f])=>l&&f)):{},viewPresets:U(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,f])=>d(l,32)&&U(f))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((n=e.capabilities)==null?void 0:n.supportsViewPresets)!==!1,supportsLipSync:((s=e.capabilities)==null?void 0:s.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const ie={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},Et=["full","torso","head"];function ge(t,e=Date.now()){var l,f,b,r,C,A,w;const a=me(ie,U(t)?t:{}),i={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((l=a.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:d((f=a.page)==null?void 0:f.target,40)||null,until:d((b=a.page)==null?void 0:b.until,64)||null},cue:{cue:d((r=a.cue)==null?void 0:r.cue,32)||null,emotion:d((C=a.cue)==null?void 0:C.emotion,32)||null,motion:d((A=a.cue)==null?void 0:A.motion,32)||null,until:d((w=a.cue)==null?void 0:w.until,64)||null}},n=d(a.viewPreset,16).toLowerCase();i.viewPreset=Et.includes(n)?n:null;const s=Ke(i.page.until);i.page.mode==="pinned"&&(!s||s<=e||!i.page.target)&&(i.page={mode:"auto",target:null,until:null});const o=Ke(i.cue.until);return(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function Ue(t,e,a=Date.now()){return ge(me(ge(t,a),U(e)?e:{}),a)}function At(t,e,a=Date.now()){return ge({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function Tt(t,e,a=3e4,i=Date.now()){const n=d(e,40),s=new Date(i+Math.max(5e3,Number(a)||0)).toISOString();return ge({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:n?"pinned":"auto",target:n||null,until:n?s:null}},i)}function pt(t,e){var o,l,f;const a={...t||{}},i=d((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),n=d((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),s=d((f=e==null?void 0:e.cue)==null?void 0:f.motion,32);return i&&(a.cue=i),n&&(a.emotion=n),s&&(a.motion=s),a}function q(t,e){const a=Number(t);return Number.isFinite(a)?Math.max(0,a):e}function Ye(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function Lt(t){return U(t)&&U(t.config)?t.config:t}function Ut(t,e){const a={...t};return U(e)&&(typeof e.id=="string"&&(a.id=d(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=e.kind==="forecast+cards"?"forecast+cards":e.kind==="overview"?"overview":"cards"),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(i=>U(i)))),a}function De(t,e){const a=Lt(t),i=Array.isArray(e.pages)?e.pages.slice():[],n=U(a)&&Array.isArray(a.pages)?a.pages:[],s=i.map(w=>{const P=n.find(I=>d(U(I)?I.id:"",40)===w.id);return Ut(w,P)}),o=U(a)&&U(a.rotation)?a.rotation:{},l=U(e.display)?e.display:{},f=U(a)&&U(a.display)?a.display:{},b=U(l.safeArea)?l.safeArea:{},r=U(f.safeArea)?f.safeArea:{},C=Array.isArray(o.order)?o.order:e.rotation.order,A=It(C).filter((w,P,I)=>s.some(R=>R.id===w)&&I.indexOf(w)===P);return{version:1,rotation:{order:A.length?A:e.rotation.order.slice(),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:q(r.top,q(b.top,0)),right:q(r.right,q(b.right,0)),bottom:q(r.bottom,q(b.bottom,0)),left:q(r.left,q(b.left,0))},layoutPaddingPx:q(f.layoutPaddingPx,q(l.layoutPaddingPx,16)),layoutGapPx:q(f.layoutGapPx,q(l.layoutGapPx,16)),globalScale:Ye(f.globalScale,Ye(l.globalScale,1))},pages:s}}function Dt(t,e=220){const a=d(t,Math.max(e+20,e)),i={emotion:"",activity:"",cue:"",motion:""},n=a.replace(/\[(emotion|activity|cue|motion)\s*:\s*([a-z0-9_-]+)\]/gi,(s,o,l)=>{const f=d(o,16).toLowerCase(),b=d(l,32).toLowerCase();return(f==="emotion"||f==="activity"||f==="cue"||f==="motion")&&b&&(i[f]=b)," "});return{text:d(n,e),emotion:i.emotion,activity:i.activity,cue:i.cue,motion:i.motion}}const Mt={version:1,assistant:"",online:!0,busy:!1,status:"",message:"",source:"",updatedAt:"",emotion:null,activity:null,cue:null,intensity:null,speaking:!1,motion:null,revision:0,event:""};function ce(t,e={}){const a=U(t)?t:{},i={...Mt,...e};return{version:1,assistant:d(a.assistant??i.assistant,40),online:typeof a.online=="boolean"?a.online:i.online,busy:typeof a.busy=="boolean"?a.busy:i.busy,status:d(a.status??i.status,255),message:d(a.message??i.message,255),source:d(a.source??i.source,64),updatedAt:d(a.updatedAt??i.updatedAt,64),emotion:d(a.emotion??i.emotion,32)||null,activity:d(a.activity??i.activity,32)||null,cue:d(a.cue??i.cue,32)||null,intensity:Rt(a.intensity??i.intensity),speaking:typeof a.speaking=="boolean"?a.speaking:!!i.speaking,motion:d(a.motion??i.motion,32)||null,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):i.revision,event:d(a.event??i.event,64)}}function Rt(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?Math.max(0,Math.min(1,e)):null}function Nt(t,e){return t.order[e]||t.order[0]||""}function Bt(t,e){const a=t.order.findIndex(i=>i===e);return a>=0?a:0}function Ft(t,e,a,i){const n=Array.isArray(t.order)?t.order:[];if(!n.length)return 0;const s=Math.max(0,Math.min(e,n.length-1));for(let o=1;o<=n.length;o+=1){const l=(s+o*a+n.length)%n.length;if(i(n[l]))return l}return s}function _t(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],i=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const n=t.control.page;if(n.mode==="pinned"&&n.target)return{nextIndex:Bt(t.rotation,n.target),nextAutoRotateAt:e,pinnedKey:`${n.target}:${n.until||""}`};if(t.force){const o=Nt(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(o)?t.activeIndex:Math.max(0,a.findIndex(f=>t.isEligible(f))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<i)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let s=t.activeIndex;for(let o=1;o<=a.length;o+=1){const l=(t.activeIndex+o)%a.length;if(t.isEligible(a[l])){s=l;break}}return{nextIndex:s,nextAutoRotateAt:e,pinnedKey:""}}const ft={offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},Ot=["provider","model provider","gateway","forbidden","unauthorized","rate limit","too many requests","quota","service unavailable","timed out","timeout","context length","провайдер","модель","модели","шлюз","доступ запрещ","слишком много запросов","квота","таймаут","недоступен сервис"];function Ze(t){const e=d(t,280).toLowerCase();return e?/(?:^|[^0-9])(403|408|409|422|429|500|502|503|504)(?:[^0-9]|$)/.test(e)?!0:Ot.some(a=>e.includes(a)):!1}function Ht(t,e){const a=ce(t),i=d(a.status,72),n=d(a.message,220);if(!(a.online!==!1&&(Ze(i)||Ze(n))))return{state:a,hasTechnicalFailure:!1};const l=d(a.emotion,32).toLowerCase(),f=d(a.motion,32).toLowerCase();return{state:{...a,busy:!1,status:d(e==null?void 0:e.healthyStatus,72),message:"",emotion:l==="error"?"calm":l||null,activity:d(a.activity,32).toLowerCase()==="error"?"idle":d(a.activity,32)||null,cue:d(a.cue,32)||null,intensity:a.intensity??null,speaking:!1,motion:f==="error"?"idle_soft":f||null},hasTechnicalFailure:!0}}function jt(t,e){const a=(e==null?void 0:e.copy)??ft,i=ce(t),n=Dt(i.message,220),s=Ht({...i,message:n.text,emotion:d(i.emotion,32)||n.emotion||null,activity:d(i.activity,32)||n.activity||null,cue:d(i.cue,32)||n.cue||null,motion:d(i.motion,32)||n.motion||null},{healthyStatus:a.technicalHealthyLabel}),o=s.state,l=d(o.message,180),f=d(o.activity,32).toLowerCase(),b=o.online!==!1&&f!=="offline",r=!!o.busy||f==="thinking"||f==="busy"||f==="acting",C=o.speaking===!0||f==="speaking",A=b?r?a.busyLabel:l||C?a.speakingLabel:s.hasTechnicalFailure?a.technicalHealthyLabel:a.idleLabel:a.offlineLabel,w=l?a.messageCaption:s.hasTechnicalFailure?a.statusCaption:a.modeCaption,P=l||(b?r?a.busyBody:d(e==null?void 0:e.idleMonologue,220)||a.idleBody:a.offlineBody);return{state:o,hasTechnicalFailure:s.hasTechnicalFailure,caption:w,label:A,body:P,bodyKey:[w,A,P].join(":")}}function zt(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function Xe(t,e=-1){const a=Array.isArray(t)?t.map(n=>d(n,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*a.length);return a.length>1&&i===e&&(i=(i+1)%a.length),{line:a[i],index:i}}function Vt(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),i=!!d(t==null?void 0:t.message,180);return e&&!a&&!i}const Wt={cue:null,emotion:null,motion:null,until:null},qt={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Gt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function gt(t){return t.endsWith("/")?t:`${t}/`}function ke(t,e){const a=d(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a)||a.startsWith("/"))return a;const i=new URL(gt(d(t,1024)||"."),window.location.href);return new URL(a,i).toString()}function Ee(t){const e=d(t,1024);return e?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e)||e.startsWith("/")?e:new URL(e,window.location.href).toString():""}function Kt(t,e,a){const i=d(t.runtimeUrl,1024)||d(e.runtimeUrl,1024);return i?Ee(i):new URL("../avatar.html",new URL(gt(d(a,1024)||"."),window.location.href)).toString()}function Jt(t,e){const a=d(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function Yt(t,e){const a=new URL(t,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[n,s]of Object.entries(i)){const o=d(n,64);if(!o||s==null)continue;const l=typeof s=="boolean"?s?"1":"0":String(s);a.searchParams.set(o,l)}return a.toString()}function Zt(t,e,a){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([n,s])=>[d(n,32),ke(a,s)]).filter(([n,s])=>n&&s));return{version:1,assistant:{name:d(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([n,s])=>[d(n,64),Ee(s)]).filter(([n,s])=>n&&s)),state:{stateUrl:Ee(t.state.stateUrl),idleLinesUrl:Ee(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:ke(a,d(e.modelUrl,1024)||d(e.entry,1024)),fallbackPortrait:ke(a,e.fallbackPortrait||""),motionMapUrl:ke(a,e.motionMapUrl||""),presetThumbs:i}}}class Xt{constructor(e={}){y(this,"id","live2d");y(this,"options");y(this,"manifest");y(this,"rendererConfig");y(this,"host",null);y(this,"containerEl",null);y(this,"iframeEl",null);y(this,"splashEl",null);y(this,"splashTextEl",null);y(this,"assetRoot","");y(this,"currentState");y(this,"currentCue",{...Wt});y(this,"currentPreset","full");y(this,"currentBubble",{...qt});y(this,"targetOrigin","*");y(this,"isReady",!1);y(this,"bubbleRevision",0);y(this,"handleWindowMessage",e=>{var n;const a=(n=this.iframeEl)==null?void 0:n.contentWindow;if(!a||e.source!==a||!Gt(e.data))return;const i=d(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=He({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Fe(e.rendererConfig||{}),this.currentState=ce({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=d(e.assetRoot,1024)||this.manifest.assetRoot;const a=Kt(this.options,this.manifest,this.assetRoot),i=Yt(a,this.options);this.targetOrigin=Jt(i,this.options.targetOrigin);const n=document.createElement("div");n.className="ks-live2d-frame",Object.assign(n.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const s=document.createElement("iframe");s.className="ks-live2d-iframe",s.src=i,s.title=d(this.options.iframeTitle,80)||`${d(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,s.loading="eager",s.allow="autoplay",Object.assign(s.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),d(this.options.iframeSandbox,255)&&s.setAttribute("sandbox",d(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);n.append(s,o),this.host.append(n),s.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=n,this.iframeEl=s,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=ce(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:d(e==null?void 0:e.cue,32)||null,emotion:d(e==null?void 0:e.emotion,32)||null,motion:d(e==null?void 0:e.motion,32)||null,until:d(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const i=d(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const n=document.createElement("div");n.textContent=d(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(n.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const s=document.createElement("div");return s.dataset.live2dSplashText="true",s.textContent="Loading compatibility renderer...",Object.assign(s.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(n,s),a.append(i),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:Zt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=pt(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const a=(i=this.iframeEl)==null?void 0:i.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function Qt(t={}){return new Xt(t)}const ea={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},Qe={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class ta{constructor(e={}){y(this,"id","static");y(this,"options");y(this,"host",null);y(this,"frameEl",null);y(this,"imageEl",null);y(this,"bubbleEl",null);y(this,"fallbackEl",null);y(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const n=document.createElement("div");n.className="ks-static-avatar-fallback",n.textContent=this.options.alt||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const s=document.createElement("div");s.className="ks-static-avatar-bubble",Object.assign(s.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(i,n,s),this.host.append(a),this.frameEl=a,this.imageEl=i,this.bubbleEl=s,this.fallbackEl=n;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||Qe,i=a[e]||a.full||Qe.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return ea}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const i=e.replace(/\/+$/,""),n=a.replace(/^\.?\//,"");return i?`${i}/${n}`:n}}function aa(t={}){return new ta(t)}function ia(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function mt(){var t;for(const e of ia())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),i=a==null?void 0:a.hass;if(i!=null&&i.states)return i}catch{continue}return null}function ra(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return d(e==null?void 0:e.access_token,4096)}catch{return""}}function na(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const i=d(a.entity_id,255);i&&(e[i]=a)}return e}function sa(t,e,a="Assistant"){const i=t[e.status],n=t[e.message],s=t[e.online],o=t[e.busy],l=t[e.source],f=t[e.updatedAt],b=e.emotion?t[e.emotion]:null,r=e.activity?t[e.activity]:null,C=e.cue?t[e.cue]:null,A=e.speaking?t[e.speaking]:null,w=e.intensity?t[e.intensity]:null,P=e.motion?t[e.motion]:null,I=t[e.revision];if(!i&&!n&&!s&&!o)return null;const R=d(i==null?void 0:i.state,72),T=d(n==null?void 0:n.state,220),F=d(f==null?void 0:f.state,64),j=Me(s,!0),k=Me(o,!1),W=d(r==null?void 0:r.state,32)||"",N=Me(A)??W==="speaking",re=W||(j?N?"speaking":k?"thinking":"idle":"offline");return ce({version:1,assistant:d(a,40)||"Assistant",online:j,busy:k,status:R&&R!=="unknown"&&R!=="unavailable"?R:"",message:T&&T!=="unknown"&&T!=="unavailable"?T:"",source:d(l==null?void 0:l.state,64)||"ha",updatedAt:F&&F!=="unknown"&&F!=="unavailable"?F:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:d(b==null?void 0:b.state,32)||null,activity:re,cue:d(C==null?void 0:C.state,32)||null,intensity:oa(w),speaking:N,motion:d(P==null?void 0:P.state,32)||null,revision:Number(I==null?void 0:I.state)||0})}function Me(t,e){const a=d(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function oa(t){const e=d(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function la(t){const e=je(t);return{id:"ha-state",async read(){const a=await e.read();return a?sa(a,t.entityMap,t.assistantName):null}}}function je(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),i=Math.max(6e4,t.authCooldownMs??600*1e3);let n=null,s=0,o=null,l=0;async function f(){var A;const b=mt();if(b!=null&&b.states)return b.states;const r=Date.now();if(n&&r-s<a||!t.allowApiFallback||typeof e!="function"||r<l)return n;if(o)return o;const C=d(((A=t.readToken)==null?void 0:A.call(t))??ra(),4096);return C?(o=e(t.apiUrl||"/api/states",{cache:"no-store",headers:{Authorization:`Bearer ${C}`}}).then(async w=>{if(!w.ok){const P=new Error(`HA states HTTP ${w.status}`);throw P.status=w.status,P}return w.json()}).then(w=>{const P=na(w);return P&&(n=P,s=Date.now()),P||n}).catch(w=>(((w==null?void 0:w.status)===401||(w==null?void 0:w.status)===403)&&(l=Date.now()+i),n)).finally(()=>{o=null}),o):n}return{id:"ha-states",async read(){return f()}}}async function ze(t){const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=d(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const i=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await e(i.toString(),{cache:"no-store"});if(!n.ok)throw new Error(`HTTP ${n.status}`);const s=await n.json();return t.sanitize?t.sanitize(s):s}catch(n){if(t.defaultValue!==void 0)return t.defaultValue;throw n}}function da(t){return{id:"json-state",async read(){const e=await ze({...t,defaultValue:t.defaultValue});return ce(e)}}}function et(t){return{id:"json-control",async read(){const e=await ze({...t,defaultValue:t.defaultValue??ie});return ge(e)}}}function ca(t){return{id:"json-lines",async read(){const e=await ze({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>d(a,220)).filter(Boolean):[]}}}function O(t,e,a=64){return d(t[e],a)}function pe(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function ua(t,e="en-US"){const a=d(t,64);if(!a)return"";const i=new Date(a);return Number.isNaN(i.getTime())?a:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ce(t,e){return!t||!e?null:t[e]||null}function pa(t,e=null,a="en-US"){var C,A,w,P;const i=O(t,"caption",40)||O(t,"type",24)||"Card",n=O(t,"hint",72),s=O(t,"type",32).toLowerCase()||"entity",o=O(t,"entity",255),l=Ce(e,o),f=Ce(e,O(t,"stateEntity",255)),b=Ce(e,O(t,"downEntity",255)),r=Ce(e,O(t,"upEntity",255));if(s==="text"||s==="static"||s==="note")return{caption:i,value:O(t,"value",64)||"—",hint:n||"static card"};if(s==="todo"){const I=Number(l==null?void 0:l.state);return!Number.isFinite(I)||I<=0?{caption:i,value:"Clear",hint:n||"nothing pending"}:{caption:i,value:`${I} item${I===1?"":"s"}`,hint:n||"pending tasks"}}if(s==="onoff"){const I=(l==null?void 0:l.state)==="on";return{caption:i,value:I?O(t,"onText",48)||"On":O(t,"offText",48)||"Off",hint:n||"device state"}}if(s==="battery"){const I=pe(l==null?void 0:l.state,0);return{caption:i,value:I?`${I}%`:"—",hint:d(f==null?void 0:f.state,48)||n||"battery level"}}if(s==="network"){const I=pe(b==null?void 0:b.state,0),R=pe(r==null?void 0:r.state,0);return{caption:i,value:I||R?`↓ ${I||"0"} · ↑ ${R||"0"}`:"—",hint:n||"throughput"}}if(s==="time")return{caption:i,value:ua(l==null?void 0:l.state,a)||"—",hint:n||"next event"};if(s==="percent"){const I=pe(l==null?void 0:l.state,Number(O(t,"digits",4))||0);return{caption:i,value:I?`${I}%`:"—",hint:n||d((C=l==null?void 0:l.attributes)==null?void 0:C.friendly_name,48)||"state percentage"}}if(s==="number"){const I=Number(O(t,"digits",4))||0,R=pe(l==null?void 0:l.state,I),T=O(t,"unit",16)||d((A=l==null?void 0:l.attributes)==null?void 0:A.unit_of_measurement,16);return{caption:i,value:R?`${R}${T?` ${T}`:""}`:"—",hint:n||d((w=l==null?void 0:l.attributes)==null?void 0:w.friendly_name,48)||"numeric value"}}return{caption:i,value:d(l==null?void 0:l.state,64)||O(t,"value",64)||"—",hint:n||d((P=l==null?void 0:l.attributes)==null?void 0:P.friendly_name,48)||"entity state"}}function fa(t,e=null,a="en-US"){return Array.isArray(t)?t.map(i=>pa(i,e,a)):[]}const ht={...ft,offlineLabel:"Offline",busyLabel:"Thinking",speakingLabel:"Speaking",idleLabel:"Waiting",technicalHealthyLabel:"Online",messageCaption:"Monologue",statusCaption:"Status",modeCaption:"Mode",offlineBody:"The assistant is temporarily unreachable.",busyBody:"The assistant is preparing a response.",idleBody:"The assistant is nearby and still running in the background."},vt={humidity:"Humidity",pressure:"Pressure",wind:"Wind",clouds:"Clouds",rangeStamp:"Range",pageStamp:"Page",noCardsConfigured:"No cards configured",avatarPresetGroup:"Avatar view presets",carouselRegion:"Scene carousel",pagesRegion:"Display pages",forecastRangeFallback:"Five-day forecast"},yt={full:"Full avatar view",torso:"Torso avatar view",head:"Head avatar view"},ga={calendarDays:"calendar-days.svg",thermometer:"thermometer.svg",droplets:"droplets.svg",gauge:"gauge.svg",wind:"wind.svg",cloud:"cloud.svg",sparkles:"sparkles.svg"},Ae={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function h(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function bt(t){return t.endsWith("/")?t:`${t}/`}function G(t,e){const a=d(e,1024);return a?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a)||a.startsWith("/")?a:new URL(a,t).toString():""}function wt(t){try{return new URL(".",t).toString()}catch{return new URL(".",window.location.href).toString()}}function ma(t,e){const a=wt(e),i=G(a,d(t.assetRoot,1024)||"./assets");return{...t,assetRoot:i,runtimeUrl:G(a,t.runtimeUrl||""),presetThumbs:Object.fromEntries(Object.entries(t.presetThumbs||{}).map(([n,s])=>[n,G(a,s)]).filter(([,n])=>!!n))}}function Re(t){return{...Ae,...t||{},metrics:{...Ae.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)&&t.forecast.length?t.forecast.map(e=>({...e})):Ae.forecast.map(e=>({...e}))}}function tt(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function V(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const i=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function ha(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=d(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${V(a)} мм рт. ст.`:`${V(a*.750061683,0)} мм рт. ст.`}function va(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=d(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${V(a,1)} м/с`:i==="km/h"||i==="км/ч"?`${V(a/3.6,1)} м/с`:`${V(a,1)} м/с`}function ya(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ba(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function wa(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function Sa(t,e="ru-RU"){const a=d(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||d(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function at(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function xa(t,e="./assets/icons"){const a=Number(t),i=bt(e);return a===0?`${i}sun.svg`:[1,2].includes(a)?`${i}cloud-sun.svg`:[3].includes(a)?`${i}cloud.svg`:[45,48].includes(a)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${i}cloud-snow.svg`:[95,96,99].includes(a)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function $a(t){const e=d(t.locale,32)||"ru-RU",a=d(t.iconBaseUrl,1024)||"./assets/icons",i=je({allowApiFallback:t.allowApiFallback,fetchImpl:t.fetchImpl});return async()=>{var P,I,R,T,F,j,k,W,_,N,re,he,ve,ye,be,we,Se,xe,ue,u;const n=await i.read(),s=t.fetchImpl??globalThis.fetch,o=n==null?void 0:n[t.weatherEntity];let l=null;const f=d(t.openMeteoUrl,4096);if(f&&typeof s=="function")try{const p=await s(`${f}${f.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});p.ok&&(l=await p.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const b=d(o==null?void 0:o.last_changed,64)||d((P=l==null?void 0:l.current)==null?void 0:P.time,64)||new Date().toISOString(),r=o?Sa(o.state,e):at((I=l==null?void 0:l.current)==null?void 0:I.weather_code,e),C=Array.isArray((R=l==null?void 0:l.daily)==null?void 0:R.time)?l.daily.time.map((p,c)=>{var $,E,M,x,Q;const m=new Date(`${p}T12:00:00+03:00`);return{name:m.toLocaleDateString(e,{weekday:"short"}),dayNumber:m.toLocaleDateString(e,{day:"numeric"}),monthShort:m.toLocaleDateString(e,{month:"short"}),note:d(at(($=l.daily.weather_code)==null?void 0:$[c],e),28),max:`${V((E=l.daily.temperature_2m_max)==null?void 0:E[c])}°`,min:`${V((M=l.daily.temperature_2m_min)==null?void 0:M[c])}° · ${V((x=l.daily.precipitation_probability_max)==null?void 0:x[c])}%`,icon:xa((Q=l.daily.weather_code)==null?void 0:Q[c],a)}}):[],A=C[0]||null,w=C.slice(1,6);return{todayValue:ba(b,e),todayLabel:wa(b,e),updatedAt:ya(b,e),temperature:V(((T=o==null?void 0:o.attributes)==null?void 0:T.temperature)??((F=l==null?void 0:l.current)==null?void 0:F.temperature_2m),1),condition:r,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${V(((j=o==null?void 0:o.attributes)==null?void 0:j.apparent_temperature)??((k=l==null?void 0:l.current)==null?void 0:k.apparent_temperature)??((W=o==null?void 0:o.attributes)==null?void 0:W.temperature),1)}°C`,badgeSummary:r,badgeRange:A?`${A.max} / ${V((N=(_=l==null?void 0:l.daily)==null?void 0:_.temperature_2m_min)==null?void 0:N[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${V(((re=o==null?void 0:o.attributes)==null?void 0:re.humidity)??((he=l==null?void 0:l.current)==null?void 0:he.relative_humidity_2m))}%`,pressure:ha(((ve=o==null?void 0:o.attributes)==null?void 0:ve.pressure)??((ye=l==null?void 0:l.current)==null?void 0:ye.surface_pressure),((be=o==null?void 0:o.attributes)==null?void 0:be.pressure_unit)??"hPa"),wind:va(((we=o==null?void 0:o.attributes)==null?void 0:we.wind_speed)??((Se=l==null?void 0:l.current)==null?void 0:Se.wind_speed_10m),((xe=o==null?void 0:o.attributes)==null?void 0:xe.wind_speed_unit)??"km/h"),clouds:`${V(((ue=o==null?void 0:o.attributes)==null?void 0:ue.cloud_coverage)??((u=l==null?void 0:l.current)==null?void 0:u.cloud_cover))}%`},forecast:w}}}class ka{constructor(e,a={}){y(this,"root");y(this,"options");y(this,"avatarMountEl");y(this,"carouselShellEl");y(this,"carouselTrackEl");y(this,"dotsEl");y(this,"presetButtons");y(this,"copy");y(this,"labels");y(this,"presetLabels");y(this,"rendererConfig");y(this,"avatarManifest");y(this,"sceneConfig");y(this,"entityMap",null);y(this,"weatherData");y(this,"hassStates",null);y(this,"currentState");y(this,"remoteControl",ie);y(this,"uiControl",ie);y(this,"currentControl",ie);y(this,"idleLines",[]);y(this,"activeIndex",0);y(this,"lastAutoRotateAt",0);y(this,"currentIdleLine","");y(this,"lastIdleIndex",-1);y(this,"currentPreset","full");y(this,"idleTimer",null);y(this,"avatarAdapter",null);y(this,"refreshIntervalHandle",null);y(this,"orderedPages",[]);y(this,"carouselDragState",null);this.root=e,this.options=a,this.copy={...ht,...a.copy||{}},this.labels={...vt,...a.labels||{}},this.presetLabels={...yt,...a.presetLabels||{}},this.weatherData=Re(a.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){const e=G(window.location.href,this.getRendererConfigUrl()),a=wt(e),i=Fe(await this.readJson(e)),n=Fe({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,l])=>[o,G(a,l)])),avatar:{...i.avatar,manifestUrl:G(a,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:G(a,i.scene.configUrl)},state:{...i.state,stateUrl:G(a,i.state.stateUrl),idleLinesUrl:G(a,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:i.state.entityMapUrl?G(a,i.state.entityMapUrl):void 0},control:{...i.control,controlUrl:G(a,i.control.controlUrl)}});this.rendererConfig=n;const s=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=ma(He(await this.readJson(s)),s),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.entityMap=await this.readEntityMap(),this.idleLines=await ca({url:this.rendererConfig.state.idleLinesUrl||G(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await et({url:this.rendererConfig.control.controlUrl,defaultValue:ie}).read(),this.currentControl=Ue(this.remoteControl,this.uiControl),this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refresh(),this.refreshIntervalHandle&&window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=window.setInterval(()=>{this.refresh()},this.options.refreshIntervalMs??3e3)}async dispose(){var e;this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),await((e=this.avatarAdapter)==null?void 0:e.dispose()),this.avatarAdapter=null}getRendererConfigUrl(){return d(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return d(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=At(this.uiControl,a||"full"),this.refresh()})}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",a=>{if(a.key==="ArrowLeft"){a.preventDefault(),this.stepPage(-1);return}a.key==="ArrowRight"&&(a.preventDefault(),this.stepPage(1))}),this.carouselShellEl.addEventListener("pointerdown",a=>{var i,n;a.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(a.target)||(this.carouselDragState={pointerId:a.pointerId,startX:a.clientX,startY:a.clientY,deltaX:0,deltaY:0,locked:!1},(n=(i=this.carouselShellEl).setPointerCapture)==null||n.call(i,a.pointerId))}),this.carouselShellEl.addEventListener("pointermove",a=>{if(!(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=a.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=a.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(a.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}a.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=a=>{if(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:n}=this.carouselDragState,s=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(n)>=s*.16,l=n<0?1:-1;if(this.clearDragState(a.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refresh(){this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await et({url:this.rendererConfig.control.controlUrl,defaultValue:this.currentControl}).read(),this.uiControl=Ue(ie,this.uiControl),this.currentControl=Ue(this.remoteControl,this.uiControl);const e=pt(this.currentState,this.currentControl);this.syncIdleMonologue(e);const a=jt(e,{idleMonologue:this.currentIdleLine,copy:this.copy}),i=De(this.sceneConfig,this.sceneConfig);this.applyDisplayConfig(i);const n=this.getOrderedPages(i.pages,i.rotation.order),s=_t({control:this.currentControl,rotation:i.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:o=>n.some(l=>l.id===o)});if(this.activeIndex=s.nextIndex,this.lastAutoRotateAt=s.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),!this.avatarAdapter)throw new Error("Avatar adapter is not initialized.");await this.avatarAdapter.setState(a.state),await this.avatarAdapter.setCue(this.currentControl.cue),await this.avatarAdapter.setViewPreset(this.currentPreset),await this.avatarAdapter.showBubble(a.body,{ttlMs:0,speak:!1,typewriter:!1}),this.renderCarousel(n,a)}renderCarousel(e,a){this.orderedPages=e.slice(),this.carouselTrackEl.innerHTML=e.map((i,n)=>i.kind==="overview"?this.renderOverviewSlide(i,a,n):this.renderDynamicSlide(i,n,e.length)).join(""),this.updateCarouselPosition(),this.dotsEl.innerHTML=e.map((i,n)=>`
      <button
        class="carousel-dot ${n===this.activeIndex?"is-active":""}"
        type="button"
        data-slide-index="${n}"
        data-scene-page-id="${h(i.id)}"
        aria-label="${h(d(i.title,40)||d(i.id,40)||`${this.labels.pageStamp} ${n+1}`)}"
      ></button>
    `).join("");for(const i of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))i.addEventListener("click",()=>{this.pinPageByIndex(Number(i.dataset.slideIndex)||0)},{once:!0})}renderOverviewSlide(e,a,i){const n=d(this.rendererConfig.assistant.name,40)||"Assistant",s=this.weatherData||Ae,o=s.forecast.slice(0,5).map(l=>this.renderForecastDay(l)).join("");return`
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
    `}renderDynamicSlide(e,a,i){const n=fa(e.cards||[],this.hassStates,this.rendererConfig.assistant.locale||"en-US"),s=this.resolveForecastRange(),o=d(e.stampCaption,24)||(e.kind==="forecast+cards"?this.labels.rangeStamp:this.labels.pageStamp),l=d(e.stampValue,32)||(e.kind==="forecast+cards"?s:`${a+1} / ${i}`),f=e.cardStyle==="mini"?n.map((w,P)=>`
          <article class="mini-card" data-scene-card-index="${P}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(w.caption)}</span>
            <strong>${h(w.value)}</strong>
          </article>
        `).join(""):n.map((w,P)=>`
          <article class="home-card" data-scene-card-index="${P}" data-scene-page-id="${h(e.id)}">
            <span class="caption">${h(w.caption)}</span>
            <strong>${h(w.value)}</strong>
            <small>${h(w.hint)}</small>
          </article>
        `).join(""),b=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${this.weatherData.forecast.slice(0,5).map(w=>this.renderForecastDay(w)).join("")}</div>`:"",r=e.cardStyle==="mini"?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full",C=d(e.title,64)||d(e.id,64)||`${this.labels.pageStamp} ${a+1}`,A=d(e.subtitle,140);return`
      <section class="slide slide-dynamic" data-slide-id="${h(e.id)}" data-scene-page-id="${h(e.id)}" data-slide-order="${a}">
        <div class="dynamic-slide slide-body" data-dynamic-layout="${h(e.kind)}" data-dynamic-card-style="${h(e.cardStyle||"full")}">
          <div class="slide-top">
            <div>
              <h1 class="headline">${h(C)}</h1>
              ${A?`<p class="subline">${h(A)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${h(o)}</span>
              <span class="value">${h(l)}</span>
            </div>
          </div>
          ${b}
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
    `}resolveForecastRange(){const e=this.weatherData.forecast||[];if(!e.length)return this.labels.forecastRangeFallback;const a=e[0],i=e[e.length-1];return`${d(a.dayNumber,4)} ${d(a.monthShort,8)} → ${d(i.dayNumber,4)} ${d(i.monthShort,8)}`}resolveIconUrl(e){var n;const a=d((n=this.options.iconUrls)==null?void 0:n[e],1024);return a||`${bt(d(this.options.iconBaseUrl,1024)||"./assets")}${ga[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:i,layoutGapPx:n,globalScale:s}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${n}px`),this.root.style.setProperty("--scene-global-scale",String(s))}getOrderedPages(e,a){const i=a.map(s=>e.find(o=>o.id===s)).filter(Boolean),n=e.filter(s=>!i.some(o=>o.id===s.id));return i.concat(n)}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]")))e.classList.toggle("is-active",Number(e.dataset.slideIndex)===this.activeIndex)}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label"):!1}clearDragState(e,a){var i,n;!a&&((n=(i=this.carouselShellEl).hasPointerCapture)!=null&&n.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=De(this.sceneConfig,this.sceneConfig),i=Ft(a.rotation,this.activeIndex,e,n=>this.orderedPages.some(s=>s.id===n));this.pinPageByIndex(i)}pinPageByIndex(e){var o;const i=(this.orderedPages.length?this.orderedPages:this.getOrderedPages(this.sceneConfig.pages||[],((o=this.sceneConfig.rotation)==null?void 0:o.order)||[]))[e];if(!i)return;const n=De(this.sceneConfig,this.sceneConfig),s=Math.max(18e3,n.rotation.defaultDwellMs*2);this.uiControl=Tt(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.refresh()}syncIdleMonologue(e){if(!Vt(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=Xe(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}this.idleTimer&&window.clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{const a=Xe(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refresh()},zt(18e3,18e3))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await fetch(e,{cache:"no-store"});if(!a.ok)throw new Error(`Failed to load ${e}: HTTP ${a.status}`);return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readAssistantState(){const e=async()=>da({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState}).read();return this.rendererConfig.state.provider!=="ha"||!this.entityMap?e():await la({assistantName:this.rendererConfig.assistant.name,entityMap:this.entityMap,allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()||e()}async readSceneStates(){return this.rendererConfig.state.provider!=="ha"?null:je({allowApiFallback:this.rendererConfig.state.haApiFallback===!0}).read()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const a=await this.readJson(this.getWeatherUrl());e=tt(e,a)}catch{}if(this.options.weatherReader)try{const a=await this.options.weatherReader();e=tt(e,a)}catch{}try{return Re(e)}catch{return Re(this.options.defaultWeather)}}createAvatarAdapter(){if(this.avatarManifest.adapter==="live2d")return Qt({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return aa({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const i=a.dataset.avatarPreset||"",n=a.querySelector("[data-preset-thumb]"),s=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];a.classList.toggle("is-active",i===this.currentPreset),n&&(s?(n.src=s,n.removeAttribute("hidden")):(n.src="",n.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function Ca(t,e={}){const a=new ka(t,e);return await a.init(),a}const Pa=["overview","cards","forecast+cards"],Ia=["full","mini"],St=["entity","text","todo","onoff","battery","network","time","percent","number"],Y=["caption","hint"],Ea={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Aa={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Можно оставить встроенную модель или добавить новую Live2D-модель из ZIP.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. Встроенная модель доступна всегда, отдельные модели появляются после импорта ZIP.",avatarPackEmpty:"Сейчас доступна только встроенная модель сцены. Новые модели можно добавить ZIP-архивом ниже.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"Импорт сразу создаёт отдельный avatar-pack, находит model3.json и подготавливает черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportButton:"Выбрать ZIP и импортировать",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. You can keep the bundled model or import a new Live2D model from a ZIP archive.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. The bundled scene model is always available; imported models appear here after ZIP import.",avatarPackEmpty:"Only the bundled scene model is available right now. Import a ZIP archive below to add more models.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import creates a separate avatar pack, detects model3.json and prepares a draft motion map.",avatarImportSelect:"Choose avatar ZIP",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportButton:"Choose and import ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use"}},Ta=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Te=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],_e="mellow-fly-7";function le(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function La(t){return Te.find(e=>e.id===t)||Te.find(e=>e.id===_e)||Te[0]}function Ua(t){return`${t.width} × ${t.height}`}function g(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ve(t){return JSON.parse(JSON.stringify(t))}function K(t){const e=new Map(t.pages.map(n=>[n.id,n])),a=t.rotation.order.map(n=>e.get(n)).filter(Boolean),i=t.pages.filter(n=>!a.some(s=>s.id===n.id));return[...a,...i]}function Da(t,e){return e?Math.max(0,K(t).findIndex(a=>a.id===e)):0}function Ma(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function xt(t,e){const a=Ma(e);let i=a,n=2;for(;t.pages.some(s=>s.id===i);)i=`${a}-${n}`,n+=1;return i}function Ra(t){const e=t.pages.length+1,a=le()==="ru";return{id:xt(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function it(t){const e=le()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function H(t,e){const a=t[e];return a==null?"":String(a)}function X(t,e){const a=t[e];return a==null?"":String(a)}function te(t,e){const a=t.display||{},i=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function Na(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function Ne(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function rt(t){return t.avatar||(t.avatar={}),t.avatar}function Ba(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function Fa(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function _a(t){var i;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&K(t).some(n=>n.id===a)?a:((i=K(t)[0])==null?void 0:i.id)||null}async function Oa(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return Ve(a.config)}async function Ha(t,e){const a=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),i=await a.json();if(!a.ok||i.success===!1||!i.config)throw new Error(`POST ${t} failed: HTTP ${a.status}`);return Ve(i.config)}function We(t){switch(t){case"text":return[...Y,"value"];case"todo":return[...Y,"entity"];case"onoff":return[...Y,"entity","onText","offText"];case"battery":return[...Y,"entity","stateEntity"];case"network":return[...Y,"downEntity","upEntity"];case"time":return[...Y,"entity"];case"percent":return[...Y,"entity","digits"];case"number":return[...Y,"entity","digits","unit"];default:return[...Y,"entity"]}}function Be(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:t.kindOverview}function de(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function $t(t){const e=le();return Ea[e][t]||""}function Le(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function ja(t,e){const a=e.attributes||{},i=String(a.friendly_name||t),n=t.includes(".")&&t.split(".",1)[0]||"other",s=String(e.state||""),o=String(a.unit_of_measurement||"");return{entityId:t,name:i,domain:n,state:s,unit:o}}function za(t){return t?Object.entries(t).map(([e,a])=>ja(e,a)).sort((e,a)=>{const i=e.domain.localeCompare(a.domain);return i!==0?i:e.name.localeCompare(a.name,"ru")}):[]}function Va(t,e){const a=e.trim().toLowerCase();return a?t.filter(i=>i.entityId.toLowerCase().includes(a)||i.name.toLowerCase().includes(a)||i.domain.toLowerCase().includes(a)||i.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function kt(t,e){const a=String(t||"").trim();return a?new URL(a,e).toString():""}function Wa(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function qa(t,e){const a=new URL("./",t).toString(),i=kt(e,a);return Wa(i||a)}function nt(t,e,a){const i=String(a||"").trim();return i?kt(i,qa(t,e)):""}function qe(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}async function Ga(t,e){const a=String(t||"").trim();if(!a)return null;const i=await fetch(a,{cache:"no-store"}),n=await i.json();if(!i.ok)throw new Error(`GET ${a} failed: HTTP ${i.status}`);const s=String(n.assetRoot||"").trim();let o=0;const l=nt(a,s,String(n.motionMapUrl||"").trim());if(l)try{const f=await fetch(l,{cache:"no-store"}),b=await f.json();f.ok&&Array.isArray(b.motions)&&(o=b.motions.length)}catch{o=0}return qe({id:"",name:String(n.name||"").trim()||e||"",manifestUrl:a,previewUrl:nt(a,s,String(n.fallbackPortrait||"").trim()),motionCount:o,capabilities:n.capabilities})}async function st(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),i=await a.json();if(!a.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(i.items)?i.items.map(n=>qe(n)).filter(n=>n.id&&n.manifestUrl):[]}async function Ka(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const i=new FormData;i.set("archive",e,e.name);const n=await fetch(a,{method:"POST",body:i}),s=await n.json();if(!n.ok||s.success===!1||!s.item)throw new Error(String(s.error||`HTTP ${n.status}`));return qe(s.item)}async function Ja(t,e){var o,l,f,b;const a=String(t||"").trim(),i=String(e||"").trim();if(!a||!i)throw new Error("Avatar pack API is not configured.");const n=await fetch(`${a}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),s=await n.json();if(!n.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${n.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||{},motionMap:{motions:Array.isArray((o=s.motionMap)==null?void 0:o.motions)?(l=s.motionMap)==null?void 0:l.motions.map(r=>({index:Number(r.index),id:String(r.id||"").trim(),label:String(r.label||r.id||"").trim(),group:String(r.group||"").trim(),tags:Array.isArray(r.tags)?r.tags.map(C=>String(C||"").trim()).filter(Boolean):[]})).filter(r=>Number.isFinite(r.index)):[],semantic:typeof((f=s.motionMap)==null?void 0:f.semantic)=="object"&&((b=s.motionMap)!=null&&b.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):{}}}}async function Ya(t,e){var s,o,l;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),n=await i.json();if(!i.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${i.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||e.manifest,motionMap:{motions:Array.isArray((s=n.motionMap)==null?void 0:s.motions)?n.motionMap.motions:e.motionMap.motions,semantic:typeof((o=n.motionMap)==null?void 0:o.semantic)=="object"&&((l=n.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):e.motionMap.semantic}}}function Za(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function Xa(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function Qa(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Ta.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${g(i.key)}">${g(Xa(t,i))}</label>
            <select id="avatar-semantic-${g(i.key)}" data-avatar-semantic="${g(i.key)}">
              <option value="">${g(t.avatarMotionNone)}</option>
              ${a.map(n=>`
                <option value="${g(String(n.index))}"${Za(e.motionMap.semantic[i.key])===String(n.index)?" selected":""}>
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
  `}function ot(t,e,a){var r,C,A,w,P;const i=(e==null?void 0:e.id)||"",n=a===i,s=(e==null?void 0:e.name)||t.avatarPackDefaultTile,o=(e==null?void 0:e.id)||t.avatarPackCurrent,l=(e==null?void 0:e.previewUrl)||"",f=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(r=e.capabilities)!=null&&r.supportsMotion?t.avatarCapabilityMotion:"",(C=e.capabilities)!=null&&C.supportsEmotion?t.avatarCapabilityEmotion:"",(A=e.capabilities)!=null&&A.supportsLipSync?t.avatarCapabilityLipSync:"",(w=e.capabilities)!=null&&w.supportsViewPresets?t.avatarCapabilityViewPresets:"",(P=e.capabilities)!=null&&P.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],b=f.length?f:[t.avatarPackDefaultHint];return`
    <article class="avatar-pack-card${n?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${l?`<img src="${g(l)}" alt="${g(s)}">`:`<span>${g(s)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${g(s)}</strong>
        <div class="meta">${g(o)}</div>
        <div class="avatar-pack-card-meta">
          ${b.map(I=>`<span>${g(I)}</span>`).join("")}
        </div>
        <button class="scene-editor-button${n?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${g(i)}">
          ${g(n?t.avatarPackSelected:t.avatarPackSelect)}
        </button>
      </div>
    </article>
  `}function Ge(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function ei(t,e,a,i){if(!e||a===null)return`<div class="meta">${g(t.entityBindingEmpty)}</div>`;const n=We(H(e,"type")||"entity").filter(s=>Ge(s));return n.length?`
    <div class="binding-targets">
      ${n.map(s=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===a&&i.field===s?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${g(s)}">
            ${g(Le(t,s))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${g(t.entityBindingNoTargets)}</div>`}function lt(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function ne(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function dt(t){return We(t).find(e=>Ge(e))||null}function se(t,e,a,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${g(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${g(e)}" value="${g(a)}">
    </div>
  `}function ae(t,e,a){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${g(t)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${g(e)}" value="${g(a)}">
    </div>
  `}function ct(t,e,a,i){return`
    <div class="field">
      <label for="page-select-${e}">${g(t)}</label>
      <select id="page-select-${e}" data-page-field="${g(e)}">
        ${i.map(n=>`<option value="${g(n.value)}"${n.value===a?" selected":""}>${g(n.label)}</option>`).join("")}
      </select>
    </div>
  `}function ti(t,e,a,i){const n=H(e,"type")||"entity",s=We(n);return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${g(H(e,"caption")||de(t,n))}</strong>
          <div class="meta">${g(de(t,n))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        <div class="field is-wide">
          <label>${g(t.cardType)}</label>
          <select data-card-index="${a}" data-card-field="type">
            ${St.map(o=>`<option value="${o}"${o===n?" selected":""}>${g(de(t,o))}</option>`).join("")}
          </select>
        </div>
        ${s.map(o=>{const l=Ge(o),f=l&&(i==null?void 0:i.cardIndex)===a&&i.field===o;return l?`
              <div class="field ${o==="hint"?"is-wide":""} is-binding-field${f?" is-active":""}">
                <label>${g(Le(t,o))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${a}"
                    data-card-field="${g(o)}"
                    data-binding-field="${g(o)}"
                    value="${g(H(e,o))}"
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
              <label>${g(Le(t,o))}</label>
              <input
                type="${o==="digits"?"number":"text"}"
                data-card-index="${a}"
                data-card-field="${g(o)}"
                value="${g(H(e,o))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function ai(t,e,a,i,n){const s=H(e,"type")||"entity",o=H(e,"caption")||de(t,s),l=H(e,"entity")||H(e,"stateEntity")||H(e,"downEntity")||H(e,"upEntity")||H(e,"value")||H(e,"hint")||$t(s);return`
    <article class="card-list-item${n?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
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
  `}function ii(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${g(e)}"
    >
      <strong>${g(de(t,e))}</strong>
      <span>${g($t(e))}</span>
    </button>
  `}function ri(t,e,a){t[e]=a.entityId;const i=t;String(i.caption||"").trim()||(i.caption=a.name),String(i.hint||"").trim()||(i.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&a.unit&&(i.unit=a.unit)}async function ni(t){var ue;const e=Aa[le()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(a)&&document.body.insertBefore(a,i),i==null||i.remove();const n=document.createElement("section");n.id="scene-editor-shell",n.innerHTML=`
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
      #scene-editor-shell .cards-list {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(220px, 260px);
        gap: 12px;
        overflow-x: auto;
        padding: 2px 2px 8px;
        align-items: stretch;
        scrollbar-width: thin;
      }
      #scene-editor-shell .ha-list {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
      #scene-editor-shell .card-list-item {
        min-width: 0;
        align-content: space-between;
        gap: 8px;
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
      #scene-editor-shell .card-list-index {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        padding: 3px 8px;
        border-radius: 999px;
        background: rgba(214,225,237,0.72);
        font: 11px/1 "Aptos","Segoe UI",sans-serif;
        color: #385268;
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
      #scene-editor-shell .card-actions {
        justify-content: space-between;
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
        display: block;
        font: 11px/1.2 Consolas, monospace;
        color: #385268;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #scene-editor-shell code {
        font: 12px/1.25 Consolas, monospace;
        color: #385268;
      }
      #scene-editor-shell .ha-entity {
        gap: 6px;
        padding: 10px;
        border-radius: 16px;
      }
      #scene-editor-shell .ha-entity-row {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }
      #scene-editor-shell .ha-entity .tiny-btn {
        min-height: 26px;
        padding: 0 8px;
      }
      #scene-editor-shell .ha-state {
        font: 11px/1.25 "Aptos","Segoe UI",sans-serif;
        color: #4f6a7c;
      }
      #scene-editor-shell .avatar-import-input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
      #scene-editor-shell .avatar-import-trigger.is-disabled {
        pointer-events: none;
        opacity: 0.55;
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
        #scene-editor-shell .cards-list {
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
                ${Te.map(u=>`<option value="${g(u.id)}">${g(u.label[le()])}</option>`).join("")}
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
  `,document.body.appendChild(n),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const s=n.querySelector("[data-preview-stage]"),o=n.querySelector("[data-preview-canvas]"),l=n.querySelector("[data-preview-resolution]"),f=n.querySelector("[data-preview-display]"),b=n.querySelector("[data-dashboard]");if(!s||!o||!l||!f||!b)throw new Error("Missing native editor shell elements");o.appendChild(a);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:_e,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1},C=async u=>{const p=String(u||"").trim();if(!p||!t.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,k();try{r.avatarPackDetails=await Ja(t.avatarPackApiUrl,p),r.avatarPackDirty=!1}catch(c){r.avatarPackDetails=null,r.avatarPackDirty=!1,W(`${e.avatarMappingLoadError}: ${String(c)}`,"bad")}finally{r.avatarPackLoading=!1}},A=()=>{var M;const u=La(r.previewDisplayId),p=Math.max(320,((M=s.parentElement)==null?void 0:M.clientWidth)||s.clientWidth||u.width),c=Math.max(260,Math.min(window.innerHeight*.62,760)),m=Math.min(1,p/u.width,c/u.height),$=Math.round(u.width*m),E=Math.round(u.height*m);f.value=u.id,l.textContent=Ua(u),s.style.aspectRatio=`${u.width} / ${u.height}`,s.style.width=`${$}px`,s.style.height=`${E}px`,o.style.width=`${u.width}px`,o.style.height=`${u.height}px`,o.style.transform=`scale(${m})`,a.style.width=`${u.width}px`,a.style.height=`${u.height}px`},w=u=>{r.previewDisplayId=String(u||"").trim()||_e,A()},P=u=>{r.pendingAvatarZip=u,r.pendingAvatarZipName=(u==null?void 0:u.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",k()},I=async u=>{if(!(!r.config||!t.avatarImportUrl||r.avatarImporting)){r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",k();try{const p=await Ka(t.avatarImportUrl,u);r.avatarCatalog=t.avatarCatalogUrl?await st(t.avatarCatalogUrl):[p],rt(r.config).packId=p.id,await C(p.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(p.name||p.id),r.avatarImportTone="ok",N(),k()}catch(p){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(p)}`,r.avatarImportTone="bad",k()}}},R=typeof ResizeObserver<"u"?new ResizeObserver(()=>A()):null;R==null||R.observe(s.parentElement||s);let T=null;const F=()=>{const u=r.selectedPageId||"",p=r.selectedCardIndex;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete c.dataset.editorSelectedPage;for(const c of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete c.dataset.editorSelectedCard;if(u){const c=a.querySelector(`[data-slide-id="${CSS.escape(u)}"]`);c&&(c.dataset.editorSelectedPage="true")}if(u&&p!==null){const c=`[data-scene-page-id="${CSS.escape(u)}"][data-scene-card-index="${p}"]`,m=a.querySelector(c);m&&(m.dataset.editorSelectedCard="true")}},j=typeof MutationObserver<"u"?new MutationObserver(()=>F()):null;j==null||j.observe(a,{childList:!0,subtree:!0});const k=()=>{const u=r.config,p=u?K(u):[],c=p.find(v=>v.id===r.selectedPageId)||p[0]||null,m=Array.isArray(c==null?void 0:c.cards)?c.cards:[],$=r.selectedCardIndex!==null&&m[r.selectedCardIndex]||null,E=Va(r.haEntities,r.entitySearch),M=r.focusedBinding?e.entityBindingActive(H(m[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,Le(e,r.focusedBinding.field)):e.entityBindingEmpty,x=u?Ne(u):"",Q=r.pendingAvatarZipName?e.avatarImportSelected(r.pendingAvatarZipName):e.avatarImportHint,$e=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${g(r.avatarImportStatus)}</div>`:"",B=r.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,Z=c?`${c.title||c.id||e.pageSettings} · ${Be(e,c.kind)}`:e.statusLoading;b.innerHTML=`
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
                ${ot(e,r.bundledAvatar,x)}
                ${r.avatarCatalog.map(v=>ot(e,v,x)).join("")}
              </div>
            </div>
            <div class="card-stack" style="margin-top:16px;">
              <div class="field is-wide">
                <input id="avatar-pack-archive" class="avatar-import-input" type="file" accept=".zip,application/zip" data-avatar-archive>
                <label class="scene-editor-button avatar-import-trigger${r.avatarImporting||!t.avatarImportUrl?" is-disabled":""}" for="avatar-pack-archive">
                  ${r.avatarImporting?e.avatarImporting:e.avatarImportButton}
                </label>
                <div class="meta">${e.avatarImportSelect}</div>
              </div>
              <div class="meta">${g(Q)}</div>
              ${$e}
            </div>
            ${x?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?Qa(e,r.avatarPackDetails):"":""}
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
                  <span class="meta">${g(Be(e,v.kind))} · ${g(e.pageCards(Array.isArray(v.cards)?v.cards.length:0))}</span>
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
              ${ct(e.fieldKind,"kind",X(c,"kind"),Pa.map(v=>({value:v,label:Be(e,v)})))}
              ${se(e.fieldTitle,"title",X(c,"title"),!0)}
              ${se(e.fieldSubtitle,"subtitle",X(c,"subtitle"),!0)}
              ${se(e.fieldSlot,"slot",X(c,"slot"))}
              ${ct(e.fieldCardStyle,"cardStyle",X(c,"cardStyle")||"full",Ia.map(v=>({value:v,label:v==="mini"?e.styleMini:e.styleFull})))}
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
                  ${St.map(v=>ii(e,v)).join("")}
                </div>
              </div>
              <div class="cards-list">
                ${m.length?m.map((v,L)=>ai(e,v,L,m.length,L===r.selectedCardIndex)).join(""):`<div class="meta">${e.noCards}</div>`}
              </div>
              <div>
                <h2>${e.cardInspector}</h2>
                ${$?ti(e,$,r.selectedCardIndex||0,r.focusedBinding):`<div class="meta">${e.cardInspectorEmpty}</div>`}
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
              <div class="meta">${g(M)}</div>
            </div>
          <div>
            <div class="meta">${e.entityBindingTargets}</div>
            ${ei(e,$,r.selectedCardIndex,r.focusedBinding)}
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
    `;const J=b.querySelector("[data-avatar-archive]");J==null||J.addEventListener("change",()=>{var L;const v=((L=J.files)==null?void 0:L[0])||null;P(v),J.value="",v&&I(v)});for(const v of Array.from(b.querySelectorAll(".page-chip[data-page-id]")))v.draggable=!0,v.addEventListener("dragstart",L=>{const z=String(v.dataset.pageId||"").trim();T=z?{kind:"page",pageId:z}:null,!(!T||!L.dataTransfer)&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain",JSON.stringify(T)))}),v.addEventListener("dragover",L=>{!T||T.kind!=="page"||(L.preventDefault(),ne(n),v.classList.add("is-drop-target"),L.dataTransfer&&(L.dataTransfer.dropEffect="move"))}),v.addEventListener("drop",L=>{if(!T||T.kind!=="page")return;L.preventDefault();const z=String(v.dataset.pageId||"").trim();z&&be(T.pageId,z),T=null,ne(n)}),v.addEventListener("dragend",()=>{T=null,ne(n)});for(const v of Array.from(b.querySelectorAll(".card-list-item[data-card-index]")))v.draggable=!0,v.addEventListener("dragstart",L=>{const z=Number(v.dataset.cardIndex||"-1");T=Number.isFinite(z)&&z>=0?{kind:"card",cardIndex:z}:null,!(!T||!L.dataTransfer)&&(L.dataTransfer.effectAllowed="move",L.dataTransfer.setData("text/plain",JSON.stringify(T)))}),v.addEventListener("dragover",L=>{!T||T.kind!=="card"||(L.preventDefault(),ne(n),v.classList.add("is-drop-target"),L.dataTransfer&&(L.dataTransfer.dropEffect="move"))}),v.addEventListener("drop",L=>{if(!T||T.kind!=="card")return;L.preventDefault();const z=Number(v.dataset.cardIndex||"-1");Number.isFinite(z)&&z>=0&&we(T.cardIndex,z),T=null,ne(n)}),v.addEventListener("dragend",()=>{T=null,ne(n)});A(),F()},W=(u,p)=>{r.status=u,r.statusTone=p,k()},_=()=>{if(!r.config)return;const u=K(r.config);if(!u.length){r.selectedPageId=null;return}(!r.selectedPageId||!u.some(m=>m.id===r.selectedPageId))&&(r.selectedPageId=u[0].id);const p=u.find(m=>m.id===r.selectedPageId)||null,c=Array.isArray(p==null?void 0:p.cards)?p.cards:[];c.length?(r.selectedCardIndex===null||r.selectedCardIndex>=c.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),Fa(r.selectedPageId),Ba(Da(r.config,r.selectedPageId))},N=()=>{r.dirty=!0,W(e.statusDirty,"muted")},re=()=>{const u=new URL(window.location.href);u.searchParams.set("editor","1"),r.selectedPageId&&u.searchParams.set("editorPage",r.selectedPageId),u.searchParams.set("v",String(Date.now())),window.location.replace(u.toString())},he=(u,p)=>{if(!r.config||!r.selectedPageId)return;const c=r.config.pages.find(m=>m.id===r.selectedPageId);if(c){if(u==="slot")c.slot=p===""?void 0:Number(p);else if(u==="id"){const m=xt(r.config,p||"page"),$=c.id;c.id=m,r.config.rotation.order=r.config.rotation.order.map(E=>E===$?m:E),r.selectedPageId=m}else u==="title"||u==="subtitle"||u==="stampCaption"||u==="stampValue"?c[u]=p:u==="kind"?c.kind=p:u==="cardStyle"&&(c.cardStyle=p);N(),_()}},ve=(u,p)=>{if(!r.config)return;const c=Na(r.config),m=c.safeArea||{},$=p===""?null:Number(p),E=Number.isFinite($)?$:null;u==="safeTop"?m.top=E??0:u==="safeRight"?m.right=E??0:u==="safeBottom"?m.bottom=E??0:u==="safeLeft"?m.left=E??0:u==="layoutPaddingPx"?c.layoutPaddingPx=E??16:u==="layoutGapPx"?c.layoutGapPx=E??16:u==="globalScale"&&(c.globalScale=E??1),c.safeArea=m,N()},ye=(u,p,c)=>{var E;if(!r.config||!r.selectedPageId)return;const m=r.config.pages.find(M=>M.id===r.selectedPageId);if(!m)return;Array.isArray(m.cards)||(m.cards=[]);const $=m.cards[u];if($){if(p==="type"){const M=it(c);if(m.cards[u]={...M,caption:H($,"caption")||M.caption},((E=r.focusedBinding)==null?void 0:E.cardIndex)===u){const x=dt(c);r.focusedBinding=x?{cardIndex:u,field:x}:null}}else p==="digits"?$[p]=c===""?0:Number(c):$[p]=c;N()}},be=(u,p)=>{if(!r.config||!u||!p||u===p)return;const c=K(r.config).map(E=>E.id),m=c.indexOf(u),$=c.indexOf(p);m<0||$<0||(c.splice(m,1),c.splice($,0,u),r.config.rotation.order=c,r.selectedPageId=u,r.selectedCardIndex=0,r.focusedBinding=null,N(),_(),k())},we=(u,p)=>{if(!r.config||!r.selectedPageId||u===p)return;const c=r.config.pages.find($=>$.id===r.selectedPageId);if(!c||!Array.isArray(c.cards)||u<0||p<0||u>=c.cards.length||p>=c.cards.length)return;const[m]=c.cards.splice(u,1);c.cards.splice(p,0,m),r.selectedCardIndex=p,r.focusedBinding=null,N(),k()},Se=u=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const p=r.config.pages.find($=>$.id===r.selectedPageId),c=r.haEntities.find($=>$.entityId===u);if(!p||!Array.isArray(p.cards)||!c)return;const m=p.cards[r.focusedBinding.cardIndex];m&&(ri(m,r.focusedBinding.field,c),N(),k())},xe=(u,p)=>{r.selectedCardIndex=u,r.focusedBinding={cardIndex:u,field:p},k(),window.requestAnimationFrame(()=>{const c=n.querySelector("#ha-entity-search");c==null||c.scrollIntoView({behavior:"smooth",block:"center"}),c==null||c.focus(),c==null||c.select()})};n.addEventListener("click",async u=>{var Q,$e;const p=u.target,c=p==null?void 0:p.closest("[data-action]"),m=c==null?void 0:c.dataset.action;if(!m||!r.config)return;const $=K(r.config),E=(c==null?void 0:c.dataset.pageId)||null,M=E?$.findIndex(S=>S.id===E):-1;if(m==="select-page"&&E){r.selectedPageId=E,r.selectedCardIndex=0,r.focusedBinding=null,_(),k();return}if(m==="page-up"&&M>0){const S=$.map(B=>B.id);[S[M-1],S[M]]=[S[M],S[M-1]],r.config.rotation.order=S,r.selectedPageId=E,N(),_(),k();return}if(m==="page-down"&&M>=0&&M<$.length-1){const S=$.map(B=>B.id);[S[M],S[M+1]]=[S[M+1],S[M]],r.config.rotation.order=S,r.selectedPageId=E,N(),_(),k();return}if(m==="page-remove"&&E&&$.length>1){r.config.pages=r.config.pages.filter(S=>S.id!==E),r.config.rotation.order=K(r.config).map(S=>S.id),r.selectedPageId=((Q=K(r.config)[Math.max(0,M-1)])==null?void 0:Q.id)||(($e=K(r.config)[0])==null?void 0:$e.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,N(),_(),k();return}if(m==="add-page"){const S=Ra(r.config);r.config.pages.push(S),r.config.rotation.order=K(r.config).map(B=>B.id),r.selectedPageId=S.id,r.selectedCardIndex=null,r.focusedBinding=null,N(),_(),k();return}if(m==="add-card-template"&&r.selectedPageId){const S=r.config.pages.find(Z=>Z.id===r.selectedPageId),B=(c==null?void 0:c.dataset.cardType)||"entity";if(S){Array.isArray(S.cards)||(S.cards=[]),S.cards.push(it(B));const Z=S.cards.length-1;r.selectedCardIndex=Z;const J=dt(B);r.focusedBinding=J?{cardIndex:Z,field:J}:null,N(),k(),J&&window.requestAnimationFrame(()=>{const v=n.querySelector("#ha-entity-search");v==null||v.scrollIntoView({behavior:"smooth",block:"center"}),v==null||v.focus()})}return}if(m==="focus-binding"){const S=Number((c==null?void 0:c.dataset.cardIndex)||"-1"),B=(c==null?void 0:c.dataset.bindingField)||"";S>=0&&B&&xe(S,B);return}const x=Number((c==null?void 0:c.dataset.cardIndex)||"-1");if(x>=0&&r.selectedPageId){const S=r.config.pages.find(B=>B.id===r.selectedPageId);if(!S||!Array.isArray(S.cards))return;if(m==="select-card"){r.selectedCardIndex=x,k();return}if(m==="card-remove"){S.cards=S.cards.filter((B,Z)=>Z!==x),r.selectedCardIndex!==null&&(r.selectedCardIndex===x?r.selectedCardIndex=S.cards.length?Math.min(x,S.cards.length-1):null:r.selectedCardIndex>x&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===x?r.focusedBinding=null:r.focusedBinding.cardIndex>x&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),N(),k();return}if(m==="card-up"&&x>0){[S.cards[x-1],S.cards[x]]=[S.cards[x],S.cards[x-1]],r.selectedCardIndex===x?r.selectedCardIndex=x-1:r.selectedCardIndex===x-1&&(r.selectedCardIndex=x),r.focusedBinding&&(r.focusedBinding.cardIndex===x?r.focusedBinding={cardIndex:x-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===x-1&&(r.focusedBinding={cardIndex:x,field:r.focusedBinding.field})),N(),k();return}if(m==="card-down"&&x<S.cards.length-1){[S.cards[x],S.cards[x+1]]=[S.cards[x+1],S.cards[x]],r.selectedCardIndex===x?r.selectedCardIndex=x+1:r.selectedCardIndex===x+1&&(r.selectedCardIndex=x),r.focusedBinding&&(r.focusedBinding.cardIndex===x?r.focusedBinding={cardIndex:x+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===x+1&&(r.focusedBinding={cardIndex:x,field:r.focusedBinding.field})),N(),k();return}}if(m==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,W(e.saving,"muted");try{if(r.avatarPackDirty&&r.avatarPackDetails&&t.avatarPackApiUrl){try{r.avatarPackDetails=await Ya(t.avatarPackApiUrl,r.avatarPackDetails)}catch(S){throw new Error(`${e.avatarMappingSaveError}: ${String(S)}`)}r.avatarPackDirty=!1}r.config=await Ha(t.sceneApiUrl,Ve(r.config)),r.dirty=!1,r.saving=!1,r.avatarPackSaving=!1,_(),W(e.statusSaved,"ok"),window.setTimeout(()=>re(),250)}catch(S){r.saving=!1,r.avatarPackSaving=!1,W(`${e.saveError}: ${String(S)}`,"bad")}return}if(m==="bind-entity"){const S=(c==null?void 0:c.dataset.entityId)||"";Se(S)}}),n.addEventListener("input",u=>{const p=u.target;if(!p||!r.config){p&&p.dataset.previewDisplay!==void 0&&w(p.value);return}if(p.dataset.previewDisplay!==void 0){w(p.value);return}if(p.dataset.avatarSemantic!==void 0){const c=Ne(r.config);if(!r.avatarPackDetails||!c||r.avatarPackDetails.packId!==c)return;const m=p.value.trim();m?r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic]=Number(m):delete r.avatarPackDetails.motionMap.semantic[p.dataset.avatarSemantic],r.avatarPackDirty=!0,W(e.statusDirty,"muted"),k();return}if(p.dataset.pageField){he(p.dataset.pageField,p.value),k();return}if(p.dataset.displayField){ve(p.dataset.displayField,p.value),k();return}if(p.dataset.cardField&&p.dataset.cardIndex){r.selectedCardIndex=Number(p.dataset.cardIndex),ye(Number(p.dataset.cardIndex),p.dataset.cardField,p.value),k();return}p.hasAttribute("data-ha-search")&&(r.entitySearch=p.value,k())}),n.addEventListener("click",u=>{var m;const p=(m=u.target)==null?void 0:m.closest("[data-action='select-avatar-pack']");if(!p||!r.config)return;const c=String(p.dataset.packId||"").trim();rt(r.config).packId=c||null,N(),C(c||null).finally(()=>k()),k()}),a.addEventListener("click",u=>{if(!r.config)return;const p=u.target,c=p==null?void 0:p.closest("[data-scene-card-index][data-scene-page-id]");if(c){const $=String(c.dataset.scenePageId||"").trim(),E=Number(c.dataset.sceneCardIndex||"-1");$&&Number.isFinite(E)&&E>=0&&(r.selectedPageId=$,r.selectedCardIndex=E,r.focusedBinding=null,_(),k(),lt("cards"));return}const m=p==null?void 0:p.closest("[data-scene-page-id]");if(m){const $=String(m.dataset.scenePageId||"").trim();$&&(r.selectedPageId=$,r.selectedCardIndex=0,r.focusedBinding=null,_(),k(),lt("pages"));return}}),n.addEventListener("change",u=>{var c;const p=u.target;!p||p.dataset.avatarArchive===void 0||P(((c=p.files)==null?void 0:c[0])||null)}),n.addEventListener("focusin",u=>{const p=u.target;if(!(p!=null&&p.dataset.bindingField))return;const c=Number(p.dataset.cardIndex||"-1");c<0||(r.selectedCardIndex=c,r.focusedBinding={cardIndex:c,field:p.dataset.bindingField})});try{if(r.config=await Oa(t.sceneApiUrl),t.sceneAvatarManifestUrl)try{r.bundledAvatar=await Ga(t.sceneAvatarManifestUrl,t.packId)}catch{r.bundledAvatar=null}if(t.avatarCatalogUrl)try{r.avatarCatalog=await st(t.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=za(((ue=mt())==null?void 0:ue.states)||null),r.selectedPageId=_a(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",await C(Ne(r.config)),_()}catch(u){r.status=`${e.loadError}: ${String(u)}`,r.statusTone="bad"}k()}const si="../scene-api/bootstrap",oi="weather.forecast_home_assistant",li="https://api.open-meteo.com/v1/forecast?latitude=60.0712&longitude=30.3923&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Europe%2FMoscow&forecast_days=6",Pe="/local/live2d/",ut="/scene-legacy/live2d/",di={...ht,offlineLabel:"Не в сети",busyLabel:"Думаю",speakingLabel:"Отвечаю",idleLabel:"Жду",technicalHealthyLabel:"Онлайн",messageCaption:"Монолог",statusCaption:"Статус",modeCaption:"Режим",offlineBody:"Нейри временно недоступна.",busyBody:"Нейри готовит ответ.",idleBody:"Нейри рядом и продолжает работать в фоне."},ci={...vt,humidity:"Влажность",pressure:"Давление",wind:"Ветер",clouds:"Облачность",rangeStamp:"Период",pageStamp:"Страница",noCardsConfigured:"Карточки ещё не настроены",avatarPresetGroup:"Варианты ракурса аватара",carouselRegion:"Карусель сцены",pagesRegion:"Переключение страниц",forecastRangeFallback:"Прогноз на несколько дней"},ui={...yt,full:"Полный рост",torso:"Голова и туловище",head:"Только лицо"},pi={title:"Погода",location:"Санкт-Петербург",todayCaption:"Сегодня",todayValue:"7 марта",todayLabel:"суббота",updatedCaption:"Обновлено",updatedAt:"13:52",temperature:"4,3",unit:"C",condition:"Ясно",feelsLike:"Ощущается как 1,5°C",badgeSummary:"Ясно",badgeRange:"6° / 0° сегодня",metrics:{humidity:"66%",pressure:"765 мм рт. ст.",wind:"4,1 м/с",clouds:"0%"},forecastTitle:"Недельный ритм",forecast:[{name:"вс",dayNumber:"8",monthShort:"март",note:"Пасмурно",max:"4°",min:"-1° · 0%",icon:"./assets/cloud.svg"},{name:"пн",dayNumber:"9",monthShort:"март",note:"Морось",max:"2°",min:"0° · 18%",icon:"./assets/cloud-rain.svg"},{name:"вт",dayNumber:"10",monthShort:"март",note:"Морось",max:"3°",min:"0° · 4%",icon:"./assets/cloud-rain.svg"},{name:"ср",dayNumber:"11",monthShort:"март",note:"Пасмурно",max:"2°",min:"1° · 6%",icon:"./assets/cloud.svg"},{name:"чт",dayNumber:"12",monthShort:"март",note:"Морось",max:"5°",min:"1° · 8%",icon:"./assets/cloud-rain.svg"}]},fi={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Hosted runtime не смог загрузить bootstrap из add-on Kiosk Scene.",editorTitle:"Режим редактора сцены",editorSubtitle:t=>`Pack: ${t||"default"} · Редактирование поверх живого runtime`,viewOnly:"Только просмотр",openForm:"Открыть форму",hidePanel:"Скрыть панель",showPanel:"Показать панель",iframeTitle:"Форма редактора сцены"},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on.",editorTitle:"Scene Editor Mode",editorSubtitle:t=>`Pack: ${t||"default"} · Preview-first editing on the live kiosk runtime`,viewOnly:"View Only",openForm:"Open Form",hidePanel:"Hide Panel",showPanel:"Show Panel",iframeTitle:"Scene editor form"}};function gi(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function mi(){return new URLSearchParams(window.location.search).get("bootstrap")||si}function hi(t){const e=new URL(t,window.location.href);for(const a of["/scene-api/","/scene-runtime/","/scene-editor/"]){const i=e.pathname.indexOf(a);if(i>=0)return new URL(e.pathname.slice(0,i+1),e.origin).toString()}return null}function D(t,e){const a=vi(String(t||"").trim(),e);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const n=hi(e);if(n)return new URL(a.slice(1),n).toString()}return new URL(a,i).toString()}function vi(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Pe))return`${ut}${a.slice(Pe.length)}`;if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const i=new URL(a,new URL(e,window.location.href));if(i.pathname.startsWith(Pe)){const n=i.pathname.slice(Pe.length);return D(`${ut}${n}${i.search}${i.hash}`,e)||a}}catch{return a}return a}function yi(t,e,a){const i=He(t),n=Object.fromEntries(Object.entries(i.presetThumbs||{}).map(([s,o])=>[s,D(String(o||""),e)]).filter(([,s])=>!!s));return{...i,assetRoot:D(String(i.assetRoot||"").trim(),e),runtimeUrl:D(String(i.runtimeUrl||"").trim(),e),entry:D(String(i.entry||"").trim(),e),modelUrl:D(String(i.modelUrl||"").trim(),e),fallbackPortrait:D(String(i.fallbackPortrait||"").trim(),e),motionMapUrl:D(String(i.motionMapUrl||"").trim(),e),presetThumbs:n}}function Oe(t,e,a,i){t.innerHTML=`
    <section style="min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(180deg,#eef4f8 0%,#dce8f0 100%);color:#203041;font-family:'Aptos','Segoe UI',sans-serif;">
      <div style="max-width:720px;padding:28px;border-radius:28px;background:rgba(255,255,255,0.82);border:1px solid rgba(32,48,65,0.08);box-shadow:0 24px 60px rgba(90,112,132,0.18);">
        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.05;letter-spacing:-0.04em;">${e}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:rgba(32,48,65,0.78);">${a}</p>
        ${i?`<pre style="margin:0;padding:14px 16px;border-radius:18px;background:#f4f8fb;border:1px solid rgba(32,48,65,0.08);overflow:auto;font-size:12px;line-height:1.45;">${i}</pre>`:""}
      </div>
    </section>
  `}function bi(){return new URLSearchParams(window.location.search).get("editor")==="1"}async function wi(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return a}async function Ie(t){const e=await fetch(t,{cache:"no-store"});if(!e.ok)throw new Error(`Failed to load ${t}: HTTP ${e.status}`);return e.json()}function Si(t,e){var a,i,n,s,o,l,f,b;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([r,C])=>[r,D(C,e)]).filter(([,r])=>!!r)),avatar:{manifestUrl:D(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:D(String(((i=t.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((n=t.state)==null?void 0:n.provider)||"json",stateUrl:D(String(((s=t.state)==null?void 0:s.stateUrl)||"").trim(),e),haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:D(String(((l=t.state)==null?void 0:l.idleLinesUrl)||"").trim(),e),entityMapUrl:D(String(((f=t.state)==null?void 0:f.entityMapUrl)||"").trim(),e)},control:{provider:"json",controlUrl:D(String(((b=t.control)==null?void 0:b.controlUrl)||"").trim(),e)}}}async function xi(t,e){var w,P,I,R,T;const a=D(String(((w=t.files)==null?void 0:w.rendererConfigUrl)||"").trim(),e);if(!a)return"";const i=D(String(((P=t.files)==null?void 0:P.sceneConfigUrl)||"").trim(),e),n=D(String(((I=t.files)==null?void 0:I.avatarCatalogUrl)||"").trim(),e);let s="";if(i&&n)try{const F=await Ie(i);s=String(((R=F.avatar)==null?void 0:R.packId)||"").trim()}catch{s=""}let o="";if(s&&n)try{const F=await Ie(n),j=Array.isArray(F.items)?F.items.find(k=>String(k.id||"").trim()===s):null;o=D(String((j==null?void 0:j.manifestUrl)||"").trim(),e)}catch{o=""}const l=Si(await Ie(a),a),f=o||String(((T=l.avatar)==null?void 0:T.manifestUrl)||"").trim();if(!f)return URL.createObjectURL(new Blob([JSON.stringify(l)],{type:"application/json"}));const b=D(f,e),r=yi(await Ie(b),b),C=URL.createObjectURL(new Blob([JSON.stringify(r)],{type:"application/json"})),A={...l,avatar:{manifestUrl:C}};return URL.createObjectURL(new Blob([JSON.stringify(A)],{type:"application/json"}))}const fe=document.getElementById("app");if(!fe)throw new Error("Missing #app root element");const oe=fi[gi()];Oe(fe,oe.startingTitle,oe.startingBody);(async()=>{var e,a,i,n;const t=mi();try{const s=await wi(t),o=String(s.packId||"").trim(),l=o.toLowerCase()==="neiri",f=await xi(s,t);if(!f){Oe(fe,oe.missingRendererTitle,oe.missingRendererBody,JSON.stringify(s,null,2));return}document.documentElement.dataset.packId=o,document.title=l?"Нейри":o?`kiosk-scene hosted runtime (${o})`:"kiosk-scene hosted runtime",await Ca(fe,{rendererConfigUrl:f,weatherUrl:l?"./weather.json":void 0,weatherReader:l?$a({weatherEntity:oi,openMeteoUrl:li,locale:"ru-RU",iconBaseUrl:"./assets",allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:l?di:void 0,labels:l?ci:void 0,presetLabels:l?ui:void 0,defaultWeather:l?pi:void 0}),bi()&&await ni({packId:o,sceneApiUrl:D(String(s.sceneEditorApiUrl||"").trim(),t),sceneAvatarManifestUrl:D(String(((e=s.files)==null?void 0:e.avatarManifestUrl)||"").trim(),t),avatarCatalogUrl:D(String(((a=s.files)==null?void 0:a.avatarCatalogUrl)||"").trim(),t),avatarImportUrl:D(String(((i=s.files)==null?void 0:i.avatarImportUrl)||"").trim(),t),avatarPackApiUrl:D(String(((n=s.files)==null?void 0:n.avatarPackApiUrl)||"").trim(),t),sceneUrl:D(String(s.entryUrl||s.runtimeBaseUrl||"./").trim(),t)})}catch(s){Oe(fe,oe.failedTitle,oe.failedBody,String(s))}})();
