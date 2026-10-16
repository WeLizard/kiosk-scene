var Wt=Object.defineProperty;var zt=(t,e,a)=>e in t?Wt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var m=(t,e,a)=>zt(t,typeof e!="symbol"?e+"":e,a);import{d as _e,i as L,t as c,p as lt,n as Gt,s as Ne,f as Qe,w as qe,D as qt,a as Kt,b as Jt,r as G,c as dt,e as Yt,S as Zt,g as Xt,h as Qt,j as ea,k as N,l as ve,m as ta,o as Be,q as aa,u as ia,v as ra,x as sa,y as na,z as oa,E as la,A as da,B as ca}from"./status-CXhJZYM4.js";const ne={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},ct={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function ua(t){if(!L(t))return;const e={},a=c(t.entity,255);a&&(e.entity=a);const i=c(t.location,80);i&&(e.location=i);const s=L(t.openMeteo)?t.openMeteo:null,n=Number(s==null?void 0:s.latitude),l=Number(s==null?void 0:s.longitude);return s&&Number.isFinite(n)&&Number.isFinite(l)&&Math.abs(n)<=90&&Math.abs(l)<=180&&(e.openMeteo={latitude:n,longitude:l,timezone:c(s.timezone,64)||void 0}),Object.keys(e).length?e:void 0}function Ke(t){var a,i,s,n,l,o,u,h,r,x,$,S,k,v;const e=_e(ne,L(t)?t:{});return{version:1,assistant:{name:c((a=e.assistant)==null?void 0:a.name,40)||ne.assistant.name,locale:c((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:L(e.links)?Object.fromEntries(Object.entries(e.links).map(([C,M])=>[c(C,64),c(M,1024)]).filter(([C,M])=>C&&M)):{},weather:ua(e.weather),avatar:{manifestUrl:c((s=e.avatar)==null?void 0:s.manifestUrl,1024)||ne.avatar.manifestUrl},scene:{configUrl:c((n=e.scene)==null?void 0:n.configUrl,1024)||ne.scene.configUrl},state:{provider:((l=e.state)==null?void 0:l.provider)==="ha"?"ha":"json",stateUrl:c((o=e.state)==null?void 0:o.stateUrl,1024)||ne.state.stateUrl,apiUrl:c((u=e.state)==null?void 0:u.apiUrl,1024)||void 0,haApiFallback:((h=e.state)==null?void 0:h.haApiFallback)===!0,idleLinesUrl:c((r=e.state)==null?void 0:r.idleLinesUrl,1024)||ne.state.idleLinesUrl,entityMapUrl:c((x=e.state)==null?void 0:x.entityMapUrl,1024)||void 0},control:{provider:(($=e.control)==null?void 0:$.provider)==="ha"?"ha":"json",controlUrl:c((S=e.control)==null?void 0:S.controlUrl,1024)||ne.control.controlUrl,apiUrl:c((k=e.control)==null?void 0:k.apiUrl,1024)||void 0,entityMapUrl:c((v=e.control)==null?void 0:v.entityMapUrl,1024)||void 0}}}function et(t){var a,i,s,n,l;const e=_e(ct,L(t)?t:{});return{version:1,name:c(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"||e.adapter==="module"?e.adapter:"static",assetRoot:c(e.assetRoot,1024)||ct.assetRoot,runtimeUrl:c(e.runtimeUrl,1024)||"",entry:c(e.entry,1024)||"",modelUrl:c(e.modelUrl,1024)||"",fallbackPortrait:c(e.fallbackPortrait,1024)||"",motionMapUrl:c(e.motionMapUrl,1024)||"",expressionMapUrl:c(e.expressionMapUrl,1024)||"",presetThumbs:L(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([o,u])=>[c(o,32),c(u,1024)]).filter(([o,u])=>o&&u)):{},viewPresets:L(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([o,u])=>c(o,32)&&L(u))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((s=e.capabilities)==null?void 0:s.supportsViewPresets)!==!1,supportsLipSync:((n=e.capabilities)==null?void 0:n.supportsLipSync)===!0,supportsPointerFocus:((l=e.capabilities)==null?void 0:l.supportsPointerFocus)===!0}}}const re={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},pa=["full","torso","head"];function he(t,e=Date.now()){var o,u,h,r,x,$,S;const a=_e(re,L(t)?t:{}),i={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((o=a.page)==null?void 0:o.mode)==="pinned"?"pinned":"auto",target:c((u=a.page)==null?void 0:u.target,40)||null,until:c((h=a.page)==null?void 0:h.until,64)||null},cue:{cue:c((r=a.cue)==null?void 0:r.cue,32)||null,emotion:c((x=a.cue)==null?void 0:x.emotion,32)||null,motion:c(($=a.cue)==null?void 0:$.motion,32)||null,until:c((S=a.cue)==null?void 0:S.until,64)||null}},s=c(a.viewPreset,16).toLowerCase();i.viewPreset=pa.includes(s)?s:null;const n=lt(i.page.until);i.page.mode==="pinned"&&(i.page.target?i.page.until&&(!n||n<=e)&&(i.page={mode:"auto",target:null,until:null}):i.page={mode:"auto",target:null,until:null});const l=lt(i.cue.until);return i.cue.until&&(!l||l<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function He(t,e,a=Date.now()){return he(_e(he(t,a),L(e)?e:{}),a)}function fa(t,e,a=Date.now()){return he({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,viewPreset:e},a)}function ha(t,e,a=3e4,i=Date.now()){const s=c(e,40),n=new Date(i+Math.max(5e3,Number(a)||0)).toISOString();return he({...t,revision:Math.max(0,Number(t==null?void 0:t.revision)||0)+1,page:{mode:s?"pinned":"auto",target:s||null,until:s?n:null}},i)}function It(t,e){var l,o,u;const a={...t||{}},i=c((l=e==null?void 0:e.cue)==null?void 0:l.cue,32),s=c((o=e==null?void 0:e.cue)==null?void 0:o.emotion,32),n=c((u=e==null?void 0:e.cue)==null?void 0:u.motion,32);return i&&(a.cue=i),s&&(a.emotion=s),n&&(a.motion=n),a}function V(t,e){if(t==null||typeof t=="string"&&!t.trim())return e;const a=Number(t);return Number.isFinite(a)?Math.max(0,Math.round(a)):e}function Pt(t){const e=new Set;return t.map((a,i)=>{const s=c(a.id,40)||`page-${i+1}`;let n=s,l=2;for(;e.has(n);)n=`${s}-${l}`,l+=1;return e.add(n),n===a.id?a:{...a,id:n}})}function Et(t,e){const a=new Set(t.map(n=>n.id)),i=new Set,s=[];for(const n of Gt(e))a.has(n)&&!i.has(n)&&(i.add(n),s.push(n));for(const n of t)i.has(n.id)||(i.add(n.id),s.push(n.id));return s}function Je(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function tt(t){return L(t)&&L(t.config)?t.config:t}function At(t,e){const a=e.map(s=>t.find(n=>n.id===s)).filter(Boolean),i=t.filter(s=>!a.some(n=>n.id===s.id));return a.concat(i)}const ga=["overview","cards","forecast+cards","grid","app"];function ma(t){return ga.includes(t)?t:"cards"}function va(t,e){const a={...t};if(!L(e))return a;if(typeof e.id=="string"&&(a.id=c(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=ma(e.kind)),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.app=="string"){const i=c(e.app,96);i?a.app=i:delete a.app}return L(e.props)&&(a.props={...e.props}),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Number.isFinite(Number(e.gridColumns))&&(a.gridColumns=Math.max(1,Math.min(12,Math.round(Number(e.gridColumns))))),Number.isFinite(Number(e.gridRows))&&(a.gridRows=Math.max(1,Math.min(12,Math.round(Number(e.gridRows))))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(i=>L(i))),a}function ba(t,e){const a=tt(t),i=Pt(Array.isArray(e.pages)?e.pages.slice():[]),s=L(a)&&Array.isArray(a.pages)?a.pages:[],n=i.map(S=>{const k=s.find(v=>c(L(v)?v.id:"",40)===S.id);return va(S,k)}),l=L(a)&&L(a.rotation)?a.rotation:{},o=L(e.display)?e.display:{},u=L(a)&&L(a.display)?a.display:{},h=L(o.safeArea)?o.safeArea:{},r=L(u.safeArea)?u.safeArea:{},x=Array.isArray(l.order)?l.order:e.rotation.order;return{version:1,rotation:{order:Et(n,x),defaultDwellMs:Math.max(5e3,(Number(l.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:V(r.top,V(h.top,0)),right:V(r.right,V(h.right,0)),bottom:V(r.bottom,V(h.bottom,0)),left:V(r.left,V(h.left,0))},layoutPaddingPx:V(u.layoutPaddingPx,V(o.layoutPaddingPx,16)),layoutGapPx:V(u.layoutGapPx,V(o.layoutGapPx,16)),globalScale:Je(u.globalScale,Je(o.globalScale,1))},pages:n}}function ya(t,e){var n;const a=ba(t,e),i=tt(t),s=L(i)&&L(i.avatar)?{packId:typeof i.avatar.packId=="string"&&c(i.avatar.packId,120)||null}:{packId:typeof((n=e.avatar)==null?void 0:n.packId)=="string"&&c(e.avatar.packId,120)||null};return{version:1,kind:"scene.display",rotation:{order:a.rotation.order.slice(),defaultDwellMs:a.rotation.defaultDwellMs},display:{safeAreaPx:{...a.display.safeAreaPx},layoutPaddingPx:a.display.layoutPaddingPx,layoutGapPx:a.display.layoutGapPx,globalScale:a.display.globalScale},avatar:s,pages:At(a.pages,a.rotation.order)}}function wa(t){return L(t)&&t.kind==="scene.display"&&Number(t.version)===1&&L(t.rotation)&&Array.isArray(t.pages)&&L(t.display)&&L(t.display.safeAreaPx)}function Sa(t){var l,o;const e=Pt(Array.isArray(t.pages)?t.pages.filter(u=>L(u)):[]),a=Et(e,(l=t.rotation)==null?void 0:l.order),i=t.display,s=t.display.safeAreaPx,n=L(t.avatar)?{packId:typeof t.avatar.packId=="string"&&c(t.avatar.packId,120)||null}:{packId:null};return{version:1,kind:"scene.display",rotation:{order:a,defaultDwellMs:Math.max(5e3,Number((o=t.rotation)==null?void 0:o.defaultDwellMs)||18e3)},display:{safeAreaPx:{top:V(s.top,0),right:V(s.right,0),bottom:V(s.bottom,0),left:V(s.left,0)},layoutPaddingPx:V(i.layoutPaddingPx,16),layoutGapPx:V(i.layoutGapPx,16),globalScale:Je(i.globalScale,1)},avatar:n,pages:At(e,a)}}function xa(t,e){if(wa(t))return Sa(t);const a=tt(t);if(!L(a))throw new Error("Scene runtime config must be a JSON object.");return ya(a,a)}function ka(t,e){return t.order[e]||t.order[0]||""}function $a(t,e){const a=t.order.findIndex(i=>i===e);return a>=0?a:0}function Ca(t,e,a,i){const s=Array.isArray(t.order)?t.order:[];if(!s.length)return 0;const n=Math.max(0,Math.min(e,s.length-1));for(let l=1;l<=s.length;l+=1){const o=(n+l*a+s.length)%s.length;if(i(s[o]))return o}return n}function Ia(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],i=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const s=t.control.page;if(s.mode==="pinned"&&s.target&&a.includes(s.target))return{nextIndex:$a(t.rotation,s.target),nextAutoRotateAt:e,pinnedKey:`${s.target}:${s.until||""}`};if(t.force){const l=ka(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(l)?t.activeIndex:Math.max(0,a.findIndex(u=>t.isEligible(u))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<i)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let n=t.activeIndex;for(let l=1;l<=a.length;l+=1){const o=(t.activeIndex+l)%a.length;if(t.isEligible(a[o])){n=o;break}}return{nextIndex:n,nextAutoRotateAt:e,pinnedKey:""}}function Pa(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function ut(t,e=-1){const a=Array.isArray(t)?t.map(s=>c(s,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*a.length);return a.length>1&&i===e&&(i=(i+1)%a.length),{line:a[i],index:i}}function Ea(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),i=!!c(t==null?void 0:t.message,180);return e&&!a&&!i}const Aa={cue:null,emotion:null,motion:null,until:null},Ua={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Ta(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Ut(t){return t.endsWith("/")?t:`${t}/`}function Tt(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function Ee(t,e){const a=c(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;if(a.startsWith("/")){const s=Tt(t||window.location.href);if(s)return new URL(a.slice(1),s).toString();const n=new URL(window.location.href).origin;return new URL(a,n).toString()}const i=new URL(Ut(c(t,1024)||"."),window.location.href);return new URL(a,i).toString()}function Me(t){const e=c(t,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const a=Tt(window.location.href);return a?new URL(e.slice(1),a).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function Ra(t,e,a){const i=c(t.runtimeUrl,1024)||c(e.runtimeUrl,1024);return i?Me(i):new URL("../avatar.html",new URL(Ut(c(a,1024)||"."),window.location.href)).toString()}function La(t,e){const a=c(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function Ma(t,e){const a=new URL(t,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[s,n]of Object.entries(i)){const l=c(s,64);if(!l||n==null)continue;const o=typeof n=="boolean"?n?"1":"0":String(n);a.searchParams.set(l,o)}return a.toString()}function pt(t,e,a){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([s,n])=>[c(s,32),Ee(a,n)]).filter(([s,n])=>s&&n));return{version:1,assistant:{name:c(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([s,n])=>[c(s,64),Me(n)]).filter(([s,n])=>s&&n)),state:{stateUrl:Me(t.state.stateUrl),idleLinesUrl:Me(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:Ee(a,c(e.modelUrl,1024)||c(e.entry,1024)),fallbackPortrait:Ee(a,e.fallbackPortrait||""),motionMapUrl:Ee(a,e.motionMapUrl||""),presetThumbs:i}}}class Da{constructor(e={}){m(this,"id","live2d");m(this,"options");m(this,"manifest");m(this,"rendererConfig");m(this,"host",null);m(this,"containerEl",null);m(this,"iframeEl",null);m(this,"splashEl",null);m(this,"splashTextEl",null);m(this,"assetRoot","");m(this,"rendererConfigBlobUrl","");m(this,"currentState");m(this,"currentCue",{...Aa});m(this,"currentPreset","full");m(this,"currentBubble",{...Ua});m(this,"targetOrigin","*");m(this,"isReady",!1);m(this,"bubbleRevision",0);m(this,"handleWindowMessage",e=>{var s;const a=(s=this.iframeEl)==null?void 0:s.contentWindow;if(!a||e.source!==a||!Ta(e.data))return;const i=c(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=et({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Ke(e.rendererConfig||{}),this.currentState=Ne({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=c(e.assetRoot,1024)||this.manifest.assetRoot;const a=Ra(this.options,this.manifest,this.assetRoot),i={...this.options.query||{}};try{if(new URL(a,window.location.href).origin===window.location.origin){const h=pt(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(h)],{type:"application/json"})),i.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const s=Ma(a,{...this.options,query:i});this.targetOrigin=La(s,this.options.targetOrigin);const n=document.createElement("div");n.className="ks-live2d-frame",Object.assign(n.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const l=document.createElement("iframe");l.className="ks-live2d-iframe",l.src=s,l.title=c(this.options.iframeTitle,80)||`${c(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,l.loading="eager",l.allow="autoplay",Object.assign(l.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),c(this.options.iframeSandbox,255)&&l.setAttribute("sandbox",c(this.options.iframeSandbox,255));const o=this.createSplash(this.assetRoot);n.append(l,o),this.host.append(n),l.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=n,this.iframeEl=l,this.splashEl=o,this.splashTextEl=o.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=Ne(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:c(e==null?void 0:e.cue,32)||null,emotion:c(e==null?void 0:e.emotion,32)||null,motion:c(e==null?void 0:e.motion,32)||null,until:c(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const i=c(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const s=document.createElement("div");s.textContent=c(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(s.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const n=document.createElement("div");return n.dataset.live2dSplashText="true",n.textContent="Loading compatibility renderer...",Object.assign(n.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(s,n),a.append(i),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:pt(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=It(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const a=(i=this.iframeEl)==null?void 0:i.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function Na(t={}){return new Da(t)}const Ba={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},ft={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class Fa{constructor(e={}){m(this,"id","static");m(this,"options");m(this,"host",null);m(this,"frameEl",null);m(this,"imageEl",null);m(this,"bubbleEl",null);m(this,"fallbackEl",null);m(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const s=document.createElement("div");s.className="ks-static-avatar-fallback",s.textContent=this.options.alt||"Avatar",Object.assign(s.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const n=document.createElement("div");n.className="ks-static-avatar-bubble",Object.assign(n.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(i,s,n),this.host.append(a),this.frameEl=a,this.imageEl=i,this.bubbleEl=n,this.fallbackEl=s;const l=this.resolveImageUrl(e.assetRoot);l&&(i.src=l,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||ft,i=a[e]||a.full||ft.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return Ba}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const i=e.replace(/\/+$/,""),s=a.replace(/^\.?\//,"");return i?`${i}/${s}`:s}}function Oa(t={}){return new Fa(t)}const _a={position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.86)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none",zIndex:"2"};function je(t){try{return new URL(t,document.baseURI).href}catch{return t}}class Ha{constructor(e){this.id="module",this.frameEl=null,this.stageEl=null,this.placeholderEl=null,this.bubbleEl=null,this.controller=null,this.disposed=!1,this.pending={},this.options=e}async mount(e){const a=e.host;a.innerHTML="";const i=document.createElement("div");i.className="ks-module-avatar",Object.assign(i.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px"});const s=document.createElement("div");s.className="ks-module-avatar-stage",Object.assign(s.style,{position:"absolute",inset:"0"});const n=document.createElement("div");n.className="ks-module-avatar-placeholder",n.textContent=this.options.alt||this.options.manifest.name||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.6)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",backgroundPosition:"center bottom",backgroundRepeat:"no-repeat",backgroundSize:"contain",transition:"opacity 300ms ease",pointerEvents:"none"});const l=document.createElement("div");l.className="ks-module-avatar-bubble",Object.assign(l.style,_a),i.append(s,n,l),a.append(i),this.frameEl=i,this.stageEl=s,this.placeholderEl=n,this.bubbleEl=l;const o=je((this.options.manifest.assetRoot||e.assetRoot).replace(/\/*$/,"/"));this.load(o)}async load(e){var n;const a=this.options.manifest,i=a.entry||"",s=this.frameEl;try{if(!i)throw new Error("Avatar manifest has no `entry` module.");const l=je(i),u=await(this.options.importModule||(r=>import(r)))(l);if(typeof(u==null?void 0:u.createAvatar)!="function")throw new Error(`Avatar module ${l} does not export createAvatar().`);const h=await u.createAvatar({host:this.stageEl,assetRoot:e,resolveAsset:r=>new URL(r.replace(/^\.?\//,""),e).href,manifest:a});if(this.disposed){await((n=h==null?void 0:h.dispose)==null?void 0:n.call(h));return}this.controller=h,this.placeholderEl&&(this.placeholderEl.style.opacity="0"),s&&(s.dataset.ready="true"),await this.flush()}catch(l){console.warn("Avatar module failed to load",l),s&&(s.dataset.ready="error"),this.placeholderEl&&a.fallbackPortrait&&(this.placeholderEl.textContent="",this.placeholderEl.style.backgroundImage=`url("${je(a.fallbackPortrait)}")`)}}async flush(){const{state:e,cue:a,preset:i,bubble:s}=this.pending;this.pending={},e&&await this.setState(e),a&&await this.setCue(a),i&&await this.setViewPreset(i),s&&await this.showBubble(s[0],s[1])}async dispose(){var a,i;this.disposed=!0;const e=this.controller;this.controller=null,await((a=e==null?void 0:e.dispose)==null?void 0:a.call(e)),(i=this.frameEl)==null||i.remove(),this.frameEl=null,this.stageEl=null,this.placeholderEl=null,this.bubbleEl=null}async setState(e){var a,i;if(this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true"),!this.controller){this.pending.state=e;return}await((i=(a=this.controller).setState)==null?void 0:i.call(a,e))}async setCue(e){var a,i;if(!this.controller){this.pending.cue=e;return}await((i=(a=this.controller).setCue)==null?void 0:i.call(a,e))}async setViewPreset(e){var a,i;if(this.frameEl&&(this.frameEl.dataset.preset=e),!this.controller){this.pending.preset=e;return}await((i=(a=this.controller).setViewPreset)==null?void 0:i.call(a,e))}async showBubble(e,a){var s;if((s=this.controller)!=null&&s.showBubble){await this.controller.showBubble(e,a);return}if(this.controller||(this.pending.bubble=[e,a]),!this.bubbleEl)return;const i=String(e||"").trim();this.bubbleEl.textContent=i,this.bubbleEl.style.opacity=i?"1":"0",this.bubbleEl.style.transform=i?"translateY(0)":"translateY(8px)"}getCapabilities(){var e;return{...this.options.manifest.capabilities,...((e=this.controller)==null?void 0:e.capabilities)||{}}}}function ja(t){return new Ha(t)}function Va(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function Rt(){var t;for(const e of Va())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),i=a==null?void 0:a.hass;if(i!=null&&i.states)return i}catch{continue}return null}function Wa(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return c(e==null?void 0:e.access_token,4096)}catch{return""}}function za(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const i=c(a.entity_id,255);i&&(e[i]=a)}return e}function Ga(t,e,a="Assistant"){const i=t[e.status],s=t[e.message],n=t[e.online],l=t[e.busy],o=t[e.source],u=t[e.updatedAt],h=e.emotion?t[e.emotion]:null,r=e.activity?t[e.activity]:null,x=e.cue?t[e.cue]:null,$=e.speaking?t[e.speaking]:null,S=e.intensity?t[e.intensity]:null,k=e.motion?t[e.motion]:null,v=t[e.revision];if(!i&&!s&&!n&&!l)return null;const C=c(i==null?void 0:i.state,72),M=c(s==null?void 0:s.state,220),T=c(u==null?void 0:u.state,64),j=Ve(n,!0),J=Ve(l,!1),A=c(r==null?void 0:r.state,32)||"",_=Ve($)??A==="speaking",F=A||(j?_?"speaking":J?"thinking":"idle":"offline");return Ne({version:1,assistant:c(a,40)||"Assistant",online:j,busy:J,status:C&&C!=="unknown"&&C!=="unavailable"?C:"",message:M&&M!=="unknown"&&M!=="unavailable"?M:"",source:c(o==null?void 0:o.state,64)||"ha",updatedAt:T&&T!=="unknown"&&T!=="unavailable"?T:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:c(h==null?void 0:h.state,32)||null,activity:F,cue:c(x==null?void 0:x.state,32)||null,intensity:Ya(S),speaking:_,motion:c(k==null?void 0:k.state,32)||null,revision:Number(v==null?void 0:v.state)||0})}const qa=["full","torso","head"];function Ka(t){const e=c(t==null?void 0:t.state,16).toLowerCase();return qa.includes(e)?e:null}function Ja(t,e){const a=e.viewPreset?t[e.viewPreset]:null,i=e.pageMode?t[e.pageMode]:null,s=e.pageTarget?t[e.pageTarget]:null,n=e.pageUntil?t[e.pageUntil]:null,l=e.cue?t[e.cue]:null,o=e.emotion?t[e.emotion]:null,u=e.motion?t[e.motion]:null,h=e.cueUntil?t[e.cueUntil]:null,r=e.revision?t[e.revision]:null;if(!a&&!i&&!s&&!l&&!o&&!u)return null;const x=c(s==null?void 0:s.state,40)||null,$=c(n==null?void 0:n.state,64)||null,S=c(i==null?void 0:i.state,16).toLowerCase(),k=S==="auto"?"auto":S==="pinned"||x||$?"pinned":"auto";return he({...re,revision:Number(r==null?void 0:r.state)||0,viewPreset:Ka(a),page:{mode:k,target:k==="pinned"?x:null,until:k==="pinned"?$:null},cue:{cue:c(l==null?void 0:l.state,32)||null,emotion:c(o==null?void 0:o.state,32)||null,motion:c(u==null?void 0:u.state,32)||null,until:c(h==null?void 0:h.state,64)||null}})}function Ve(t,e){const a=c(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function Ya(t){const e=c(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function Lt(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),i=Math.max(6e4,t.authCooldownMs??600*1e3),s=c(t.apiUrl,4096);let n=null,l=0,o=null,u=0;async function h(){var k;const r=Rt();if(r!=null&&r.states)return r.states;const x=Date.now();if(n&&x-l<a||!s&&!t.allowApiFallback||typeof e!="function"||x<u)return n;if(o)return o;const $=s?"":c(((k=t.readToken)==null?void 0:k.call(t))??Wa(),4096);if(!s&&!$)return n;const S={};return $&&(S.Authorization=`Bearer ${$}`),o=Qe(e,s||"/api/states",{cache:"no-store",headers:S}).then(async v=>{if(!v.ok){const C=new Error(`HA states HTTP ${v.status}`);throw C.status=v.status,C}return v.json()}).then(v=>{const C=za(v);return C&&(n=C,l=Date.now()),C||n}).catch(v=>{var C;return(C=t.onError)==null||C.call(t,v),((v==null?void 0:v.status)===401||(v==null?void 0:v.status)===403)&&(u=Date.now()+i),n}).finally(()=>{o=null}),o}return{id:"ha-states",async read(){return h()}}}function Za(t){const e=new Error(`HTTP ${t}`);return e.status=t,e}async function at(t){var s;const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=c(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const i=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await Qe(e,i.toString(),{cache:"no-store"});if(!n.ok)throw Za(n.status);const l=await n.json();return t.sanitize?t.sanitize(l):l}catch(n){if((s=t.onError)==null||s.call(t,n),t.defaultValue!==void 0)return t.defaultValue;throw n}}function Xa(t){return{id:"json-state",async read(){const e=await at({...t,defaultValue:t.defaultValue});return Ne(e)}}}function Qa(t){return{id:"json-control",async read(){const e=await at({...t,defaultValue:t.defaultValue??re});return he(e)}}}function ei(t){return{id:"json-lines",async read(){const e=await at({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>c(a,220)).filter(Boolean):[]}}}function y(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function z(t,e,a=64){return c(t[e],a)}function me(t,e=0){const a=Number(t);return Number.isFinite(a)?a.toLocaleString(void 0,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function ti(t,e="en-US"){const a=c(t,64);if(!a)return"";const i=new Date(a);return Number.isNaN(i.getTime())?a:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ae(t,e){return!t||!e?null:t[e]||null}function ai(t,e=null,a="en-US"){var x,$,S,k;const i=z(t,"caption",40)||z(t,"type",24)||"Card",s=z(t,"hint",72),n=z(t,"type",32).toLowerCase()||"entity",l=z(t,"entity",255),o=Ae(e,l),u=Ae(e,z(t,"stateEntity",255)),h=Ae(e,z(t,"downEntity",255)),r=Ae(e,z(t,"upEntity",255));if(n==="text"||n==="static"||n==="note")return{caption:i,value:z(t,"value",64)||"—",hint:s||"static card"};if(n==="todo"){const v=Number(o==null?void 0:o.state);return!Number.isFinite(v)||v<=0?{caption:i,value:"Clear",hint:s||"nothing pending"}:{caption:i,value:`${v} item${v===1?"":"s"}`,hint:s||"pending tasks"}}if(n==="onoff"){const v=(o==null?void 0:o.state)==="on";return{caption:i,value:v?z(t,"onText",48)||"On":z(t,"offText",48)||"Off",hint:s||"device state"}}if(n==="battery"){const v=me(o==null?void 0:o.state,0);return{caption:i,value:v?`${v}%`:"—",hint:c(u==null?void 0:u.state,48)||s||"battery level"}}if(n==="network"){const v=me(h==null?void 0:h.state,0),C=me(r==null?void 0:r.state,0);return{caption:i,value:v||C?`↓ ${v||"0"} · ↑ ${C||"0"}`:"—",hint:s||"throughput"}}if(n==="time")return{caption:i,value:ti(o==null?void 0:o.state,a)||"—",hint:s||"next event"};if(n==="percent"){const v=me(o==null?void 0:o.state,Number(z(t,"digits",4))||0);return{caption:i,value:v?`${v}%`:"—",hint:s||c((x=o==null?void 0:o.attributes)==null?void 0:x.friendly_name,48)||"state percentage"}}if(n==="number"){const v=Number(z(t,"digits",4))||0,C=me(o==null?void 0:o.state,v),M=z(t,"unit",16)||c(($=o==null?void 0:o.attributes)==null?void 0:$.unit_of_measurement,16);return{caption:i,value:C?`${C}${M?` ${M}`:""}`:"—",hint:s||c((S=o==null?void 0:o.attributes)==null?void 0:S.friendly_name,48)||"numeric value"}}return{caption:i,value:c(o==null?void 0:o.state,64)||z(t,"value",64)||"—",hint:s||c((k=o==null?void 0:o.attributes)==null?void 0:k.friendly_name,48)||"entity state"}}function Mt(t,e=null,a="en-US"){return Array.isArray(t)?t.map(i=>ai(i,e,a)):[]}const be={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function We(t){return{...be,...t||{},metrics:{...be.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)?t.forecast.map(e=>({...e})):be.forecast.map(e=>({...e}))}}function ht(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function K(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const i=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function ii(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=c(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${K(a)} мм рт. ст.`:`${K(a*.750061683,0)} мм рт. ст.`}function ri(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=c(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${K(a,1)} м/с`:i==="km/h"||i==="км/ч"?`${K(a/3.6,1)} м/с`:`${K(a,1)} м/с`}function si(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ni(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function oi(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function li(t,e="ru-RU"){const a=c(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||c(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function gt(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function di(t,e="./assets/icons"){const a=Number(t),i=qe(e);return a===0?`${i}sun.svg`:[1,2].includes(a)?`${i}cloud-sun.svg`:[3].includes(a)?`${i}cloud.svg`:[45,48].includes(a)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${i}cloud-snow.svg`:[95,96,99].includes(a)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function ci(t){const e=c(t.locale,32)||"ru-RU",a=c(t.iconBaseUrl,1024)||"./assets/icons",i=Lt({allowApiFallback:t.allowApiFallback,apiUrl:t.apiUrl,fetchImpl:t.fetchImpl});return async()=>{var k,v,C,M,T,j,J,A,W,_,F,we,Se,xe,ke,$e,Ce,Ie,Pe,ge;const s=await i.read(),n=t.fetchImpl??globalThis.fetch,l=s==null?void 0:s[t.weatherEntity];let o=null;const u=c(t.openMeteoUrl,4096);if(u&&typeof n=="function")try{const p=await n(`${u}${u.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});p.ok&&(o=await p.json())}catch{o=null}if(!l&&!(o!=null&&o.current))return null;const h=c(l==null?void 0:l.last_changed,64)||c((k=o==null?void 0:o.current)==null?void 0:k.time,64)||new Date().toISOString(),r=l?li(l.state,e):gt((v=o==null?void 0:o.current)==null?void 0:v.weather_code,e),x=Array.isArray((C=o==null?void 0:o.daily)==null?void 0:C.time)?o.daily.time.map((p,f)=>{var b,E,U,R,P;const d=new Date(`${p}T12:00:00`);return{name:d.toLocaleDateString(e,{weekday:"short"}),dayNumber:d.toLocaleDateString(e,{day:"numeric"}),monthShort:d.toLocaleDateString(e,{month:"short"}),note:c(gt((b=o.daily.weather_code)==null?void 0:b[f],e),28),max:`${K((E=o.daily.temperature_2m_max)==null?void 0:E[f])}°`,min:`${K((U=o.daily.temperature_2m_min)==null?void 0:U[f])}° · ${K((R=o.daily.precipitation_probability_max)==null?void 0:R[f])}%`,icon:di((P=o.daily.weather_code)==null?void 0:P[f],a)}}):[],$=x[0]||null,S=x.slice(1,6);return{title:e.startsWith("ru")?"Погода":"Weather",todayCaption:e.startsWith("ru")?"Сегодня":"Today",updatedCaption:e.startsWith("ru")?"Обновлено":"Updated",forecastTitle:e.startsWith("ru")?"Недельный ритм":"Weekly rhythm",todayValue:ni(new Date().toISOString(),e),todayLabel:oi(new Date().toISOString(),e),updatedAt:si(h,e),temperature:K(((M=l==null?void 0:l.attributes)==null?void 0:M.temperature)??((T=o==null?void 0:o.current)==null?void 0:T.temperature_2m),1),condition:r,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${K(((j=l==null?void 0:l.attributes)==null?void 0:j.apparent_temperature)??((J=o==null?void 0:o.current)==null?void 0:J.apparent_temperature)??((A=l==null?void 0:l.attributes)==null?void 0:A.temperature),1)}°C`,badgeSummary:r,badgeRange:$?`${$.max} / ${K((_=(W=o==null?void 0:o.daily)==null?void 0:W.temperature_2m_min)==null?void 0:_[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${K(((F=l==null?void 0:l.attributes)==null?void 0:F.humidity)??((we=o==null?void 0:o.current)==null?void 0:we.relative_humidity_2m))}%`,pressure:ii(((Se=l==null?void 0:l.attributes)==null?void 0:Se.pressure)??((xe=o==null?void 0:o.current)==null?void 0:xe.surface_pressure),((ke=l==null?void 0:l.attributes)==null?void 0:ke.pressure_unit)??"hPa"),wind:ri((($e=l==null?void 0:l.attributes)==null?void 0:$e.wind_speed)??((Ce=o==null?void 0:o.current)==null?void 0:Ce.wind_speed_10m),((Ie=l==null?void 0:l.attributes)==null?void 0:Ie.wind_speed_unit)??"km/h"),clouds:`${K(((Pe=l==null?void 0:l.attributes)==null?void 0:Pe.cloud_coverage)??((ge=o==null?void 0:o.current)==null?void 0:ge.cloud_cover))}%`},forecast:S}}}function ui(t){return t.kind==="overview"?"slide slide-overview":t.kind==="app"?"slide slide-dynamic slide-app":"slide slide-dynamic"}function pi(t,e,a){return c(e.title,64)||c(e.id,64)||`${t.labels.pageStamp} ${a+1}`}function Dt(t){return`
      <article class="day">
        <div class="day-head">
          <div class="icon"><img src="${y(t.icon)}" alt=""></div>
          <div class="day-date">
            <span class="name">${y(t.name)}</span>
            <span class="meta"><span class="day-number">${y(t.dayNumber)}</span><span class="day-month">${y(t.monthShort)}</span></span>
          </div>
        </div>
        <div class="temps">
          <strong>${y(t.max)}</strong>
          <small>${y(t.min)}</small>
        </div>
        <div class="day-note">${y(t.note)}</div>
      </article>
    `}function fi(t){const e=t.weather.forecast||[];if(!e.length)return t.labels.forecastRangeFallback;const a=e[0],i=e[e.length-1];return`${c(a.dayNumber,4)} ${c(a.monthShort,8)} → ${c(i.dayNumber,4)} ${c(i.monthShort,8)}`}function hi(t,e){const a=c(t.assistantName,40)||"Assistant",i=t.weather||be,s=i.forecast.slice(0,5).map(l=>Dt(l)).join(""),{labels:n}=t;return`
        <div class="weather-panel slide-body">
          <div class="weather-top">
            <div>
              <h1 class="headline">${y(i.title)}</h1>
              <p class="subline">${y(i.location)}</p>
            </div>
            <div class="weather-top-meta">
              <div class="stamp today-card">
                <span class="caption">${y(i.todayCaption)}</span>
                <span class="value">${y(i.todayValue)}</span>
                <span class="meta">${y(i.todayLabel)}</span>
              </div>
              <div class="stamp">
                <span class="caption">${y(i.updatedCaption)}</span>
                <span class="value">${y(i.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div class="current">
            <div class="hero">
              <div class="temp-row">
                <span class="temp">${y(i.temperature)}</span>
                <span class="unit">°${y(i.unit)}</span>
              </div>
              <div class="condition">${y(i.condition)}</div>
              <div class="feels">${y(i.feelsLike)}</div>
              <div class="hero-badges">
                <div class="hero-badge"><img class="icon" src="${y(t.iconUrl("thermometer"))}" alt=""><span>${y(i.badgeSummary)}</span></div>
                <div class="hero-badge"><img class="icon" src="${y(t.iconUrl("calendarDays"))}" alt=""><span>${y(i.badgeRange)}</span></div>
              </div>
            </div>
            <div class="neiri-card">
              <div class="neiri-top">
                <div class="neiri-caption">
                  <strong>${y(e.caption)}</strong>
                  <div class="neiri-label">${y(e.label)}</div>
                </div>
                <div class="neiri-mark"><img src="${y(t.iconUrl("sparkles"))}" alt="${y(a)}"></div>
              </div>
              <div class="neiri-meta">${y(e.body)}</div>
            </div>
          </div>

          <div class="metrics">
            <div class="metric"><div class="metric-header"><span>${y(n.humidity)}</span><i><img src="${y(t.iconUrl("droplets"))}" alt=""></i></div><strong>${y(i.metrics.humidity)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${y(n.pressure)}</span><i><img src="${y(t.iconUrl("gauge"))}" alt=""></i></div><strong>${y(i.metrics.pressure)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${y(n.wind)}</span><i><img src="${y(t.iconUrl("wind"))}" alt=""></i></div><strong>${y(i.metrics.wind)}</strong></div>
            <div class="metric"><div class="metric-header"><span>${y(n.clouds)}</span><i><img src="${y(t.iconUrl("cloud"))}" alt=""></i></div><strong>${y(i.metrics.clouds)}</strong></div>
          </div>

          <div class="forecast">
            <div class="forecast-head">
              <h2>${y(i.forecastTitle)}</h2>
              <p></p>
            </div>
            ${s?`<div class="forecast-grid">${s}</div>`:`<p class="forecast-empty">${y(n.forecastUnavailable)}</p>`}
          </div>
        </div>`}function Nt(t,e,a,i,s=""){const n=c(e.widget,96);return`
          <article class="${i} widget-card" ${s?`style="${s}"`:""} data-scene-card-index="${a}" data-scene-page-id="${y(t.id)}" data-widget-slot data-widget-id="${y(n)}"></article>
        `}function Bt(t){return(t==null?void 0:t.type)==="widget"&&!!c(t.widget,96)}function Ft(t,e,a,i,s,n=""){const l=n?` style="${n}"`:"";return s?`
          <article class="mini-card"${l} data-scene-card-index="${a}" data-scene-page-id="${y(e.id)}">
            <span class="caption">${y(t.caption)}</span>
            <strong>${y(t.value)}</strong>
          </article>
        `:`
          <article class="${i}"${l} data-scene-card-index="${a}" data-scene-page-id="${y(e.id)}">
            <span class="caption">${y(t.caption)}</span>
            <strong>${y(t.value)}</strong>
            <small>${y(t.hint)}</small>
          </article>
        `}function Ot(t,e,a,i,s){const n=pi(t,e,a),l=c(e.subtitle,140);return`
          <div class="slide-top">
            <div>
              <h1 class="headline">${y(n)}</h1>
              ${l?`<p class="subline">${y(l)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${y(i)}</span>
              <span class="value">${y(s)}</span>
            </div>
          </div>`}function gi(t,e,a,i){const s=e.cards||[],n=Mt(s,t.states,t.locale),l=e.cardStyle==="mini",o=c(e.stampCaption,24)||(e.kind==="forecast+cards"?t.labels.rangeStamp:t.labels.pageStamp),u=c(e.stampValue,32)||(e.kind==="forecast+cards"?fi(t):`${a+1} / ${i}`),h=n.map(($,S)=>Bt(s[S])?Nt(e,s[S],S,l?"mini-card":"home-card"):Ft($,e,S,"home-card",l)).join(""),r=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${t.weather.forecast.slice(0,5).map($=>Dt($)).join("")}</div>`:"",x=l?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
        <div class="dynamic-slide slide-body" data-dynamic-layout="${y(e.kind)}" data-dynamic-card-style="${y(e.cardStyle||"full")}">
          ${Ot(t,e,a,o,u)}
          ${r}
          <div class="${x}">
            ${h||`<div class="empty">${y(t.labels.noCardsConfigured)}</div>`}
          </div>
        </div>`}function Ue(t,e,a,i){const s=Math.trunc(Number(t));return Number.isFinite(s)?Math.min(a,Math.max(e,s)):i}function mi(t,e,a,i){const s=e.cards||[],n=Mt(s,t.states,t.locale),l=Ue(e.gridColumns,1,12,4),o=Ue(e.gridRows,1,12,3),u=c(e.stampCaption,24)||t.labels.pageStamp,h=c(e.stampValue,32)||`${a+1} / ${i}`,r=n.map((x,$)=>{const S=s[$]||{},k=Math.trunc(Number(S.col)),v=Math.trunc(Number(S.row)),C=Ue(S.w,1,24,1),M=Ue(S.h,1,24,1),j=Number.isFinite(k)&&Number.isFinite(v)&&k>=0&&v>=0&&k<100&&v<100?`grid-column: ${k+1} / span ${C}; grid-row: ${v+1} / span ${M};`:"";return Bt(S)?Nt(e,S,$,"grid-card",j):Ft(x,e,$,"grid-card",!1,j)}).join("");return`
        <div class="dynamic-slide slide-body" data-dynamic-layout="grid">
          ${Ot(t,e,a,u,h)}
          <div class="grid-cards-container" style="--grid-cols: ${l}; --grid-rows: ${o};">
            ${r||`<div class="empty">${y(t.labels.noCardsConfigured)}</div>`}
          </div>
        </div>`}function vi(){return'<div class="app-slide slide-body" data-app-host></div>'}const mt="input, textarea, select, [contenteditable=''], [contenteditable='true']";function bi(t){const e=t==null?void 0:t.status;return typeof e!="number"||e>=500}class yi{constructor(e,a={}){m(this,"root");m(this,"options");m(this,"avatarMountEl");m(this,"carouselShellEl");m(this,"carouselTrackEl");m(this,"dotsEl");m(this,"staleEl");m(this,"presetButtons");m(this,"copy");m(this,"labels");m(this,"presetLabels");m(this,"rendererConfig");m(this,"avatarManifest");m(this,"sceneConfig");m(this,"sceneRuntimeConfig");m(this,"entityMap",null);m(this,"controlEntityMap",null);m(this,"haStatesReader",null);m(this,"weatherData");m(this,"hassStates",null);m(this,"currentState");m(this,"remoteControl",re);m(this,"uiControl",re);m(this,"currentControl",re);m(this,"idleLines",[]);m(this,"activeIndex",0);m(this,"lastAutoRotateAt",0);m(this,"currentIdleLine","");m(this,"lastIdleIndex",-1);m(this,"currentPreset","full");m(this,"idleTimer",null);m(this,"avatarAdapter",null);m(this,"refreshIntervalHandle",null);m(this,"lastWeatherRefreshAt",0);m(this,"orderedPages",[]);m(this,"carouselDragState",null);m(this,"disposed",!1);m(this,"initialized",!1);m(this,"inFlightRefresh",null);m(this,"refreshQueued",!1);m(this,"onVisibilityChange",()=>{document.hidden||(this.refreshWeatherIfStale(0),this.refreshNow())});m(this,"unsubscribeRegistry",null);m(this,"serviceRunner",null);m(this,"cycleConnectivityFailures",0);m(this,"consecutiveFailedCycles",0);m(this,"slides",new Map);m(this,"dotsSignature","");m(this,"lastInteractionAt",0);m(this,"lastRenderedActiveIndex",-1);m(this,"extensionRuntime",null);this.root=e,this.options=a,this.copy={...qt,...a.copy||{}},this.labels={...Kt,...a.labels||{}},this.presetLabels={...Jt,...a.presetLabels||{}},this.weatherData=We(a.defaultWeather),this.root.innerHTML=`
      <div class="scene-viewport">
        <div class="layout">
          <section class="panel avatar-panel">
            <div class="avatar-shell">
              <div class="avatar-presets" aria-label="${y(this.labels.avatarPresetGroup)}">
                <button class="avatar-preset is-active" type="button" data-avatar-preset="full" title="${y(this.presetLabels.full)}" aria-label="${y(this.presetLabels.full)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="full">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="torso" title="${y(this.presetLabels.torso)}" aria-label="${y(this.presetLabels.torso)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="torso">
                </button>
                <button class="avatar-preset" type="button" data-avatar-preset="head" title="${y(this.presetLabels.head)}" aria-label="${y(this.presetLabels.head)}">
                  <img src="" alt="" aria-hidden="true" data-preset-thumb="head">
                </button>
              </div>
              <div class="avatar-mount" data-avatar-mount></div>
            </div>
          </section>

          <section class="panel content-panel">
            <div class="carousel-shell" data-carousel-shell tabindex="0" aria-label="${y(this.labels.carouselRegion)}">
              <div class="carousel-track" data-carousel-track></div>
              <div class="carousel-dots" data-dots aria-label="${y(this.labels.pagesRegion)}"></div>
            </div>
          </section>
        </div>
        <div class="stale-badge" data-stale-badge role="status" aria-live="polite" hidden>${y(this.labels.staleNotice)}</div>
      </div>
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.staleEl=this.requireEl("[data-stale-badge]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){if(this.initialized||this.disposed)return;this.initialized=!0;const e=G(window.location.href,this.getRendererConfigUrl()),a=dt(e),i=Ke(await this.readJson(e)),s=o=>o?G(a,o):void 0,n=Ke({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([o,u])=>[o,G(a,u)])),avatar:{...i.avatar,manifestUrl:G(a,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:G(a,i.scene.configUrl)},state:{...i.state,stateUrl:G(a,i.state.stateUrl),apiUrl:s(i.state.apiUrl),idleLinesUrl:G(a,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:s(i.state.entityMapUrl)},control:{...i.control,controlUrl:G(a,i.control.controlUrl),apiUrl:s(i.control.apiUrl),entityMapUrl:s(i.control.entityMapUrl)}});this.rendererConfig=n;const l=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=this.resolveAvatarManifestUrls(et(await this.readJson(l)),l),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.sceneRuntimeConfig=xa(this.sceneConfig),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await ei({url:this.rendererConfig.state.idleLinesUrl||G(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.lastWeatherRefreshAt=Date.now(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=He(this.remoteControl,this.uiControl),!this.disposed&&(this.options.extensions&&(this.extensionRuntime=Yt({registry:this.options.extensions,mode:"kiosk",locale:this.rendererConfig.assistant.locale||"en-US",resolveUrl:o=>G(window.location.href,o),navigate:o=>this.pinPageById(o),refresh:()=>void this.refreshNow()}),this.serviceRunner=new Zt(this.options.extensions,"kiosk",this.extensionRuntime,(o,u)=>{console.warn(`Extension service ${o} failed`,u)}),this.serviceRunner.start(),this.unsubscribeRegistry=this.options.extensions.onChange(()=>{for(const o of this.slides.values())o.signature="";this.refreshNow()})),!this.disposed&&(this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refreshNow(),this.refreshIntervalHandle=window.setInterval(()=>{document.hidden||this.refreshNow()},this.options.refreshIntervalMs??3e3),document.addEventListener("visibilitychange",this.onVisibilityChange)))}async dispose(){var e,a,i;if(!this.disposed){this.disposed=!0,this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),document.removeEventListener("visibilitychange",this.onVisibilityChange),(e=this.unsubscribeRegistry)==null||e.call(this),this.unsubscribeRegistry=null,(a=this.serviceRunner)==null||a.stop(),this.serviceRunner=null;for(const s of Array.from(this.slides.values()))this.discardSlide(s);this.slides.clear(),await((i=this.avatarAdapter)==null?void 0:i.dispose()),this.avatarAdapter=null}}refreshNow(){return this.disposed?Promise.resolve():this.inFlightRefresh?(this.refreshQueued=!0,this.inFlightRefresh):(this.inFlightRefresh=(async()=>{try{do{this.refreshQueued=!1;try{await this.runRefreshCycle()}catch(e){console.warn("Scene refresh failed",e)}}while(this.refreshQueued&&!this.disposed)}finally{this.inFlightRefresh=null}})(),this.inFlightRefresh)}getRendererConfigUrl(){return c(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return c(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl=fa(this.uiControl,a||"full"),this.refreshNow()})}noteInteraction(){this.lastInteractionAt=Date.now()}isUserInteracting(){const e=this.options.interactionHoldMs??45e3;if(Date.now()-this.lastInteractionAt<e)return!0;const a=document.activeElement;return a instanceof Element&&this.carouselShellEl.contains(a)&&a.matches(mt)}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",a=>{if(this.noteInteraction(),!(a.target instanceof Element&&a.target.matches(mt))){if(a.key==="ArrowLeft"){a.preventDefault(),this.stepPage(-1);return}a.key==="ArrowRight"&&(a.preventDefault(),this.stepPage(1))}}),this.carouselShellEl.addEventListener("focusin",()=>this.noteInteraction()),this.dotsEl.addEventListener("click",a=>{const i=a.target instanceof Element?a.target.closest("[data-slide-index]"):null;i&&(this.noteInteraction(),this.pinPageByIndex(Number(i.dataset.slideIndex)||0))}),this.carouselShellEl.addEventListener("pointerdown",a=>{var i,s;this.noteInteraction(),!(a.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(a.target))&&(this.carouselDragState={pointerId:a.pointerId,startX:a.clientX,startY:a.clientY,deltaX:0,deltaY:0,locked:!1},(s=(i=this.carouselShellEl).setPointerCapture)==null||s.call(i,a.pointerId))}),this.carouselShellEl.addEventListener("pointermove",a=>{if(!(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=a.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=a.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(a.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}a.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=a=>{if(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:s}=this.carouselDragState,n=this.carouselShellEl.clientWidth||1,l=i&&Math.abs(s)>=n*.16,o=s<0?1:-1;if(this.clearDragState(a.pointerId,!1),l){this.stepPage(o);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}async refreshWeatherIfStale(e=600*1e3){if(!(Date.now()-this.lastWeatherRefreshAt<e))try{this.weatherData=await this.readWeatherData(),this.lastWeatherRefreshAt=Date.now()}catch{}}async runRefreshCycle(){this.cycleConnectivityFailures=0,await Promise.race([this.refreshWeatherIfStale(),new Promise(h=>setTimeout(h,3e3))]);const[e,a,i]=await Promise.all([this.readAssistantState(),this.readSceneStates(),this.readRemoteControl(this.currentControl)]);if(this.disposed)return;this.currentState=e,this.hassStates=a,this.remoteControl=i,this.updateDataHealth(),this.uiControl=He(re,this.uiControl),this.currentControl=He(this.remoteControl,this.uiControl);const s=It(this.currentState,this.currentControl);this.syncIdleMonologue(s);const n=Xt(s,{idleMonologue:this.currentIdleLine,copy:this.copy}),l=this.sceneRuntimeConfig;this.applyDisplayConfig(l);const o=l.pages;this.isUserInteracting()&&this.currentControl.page.mode!=="pinned"&&(this.lastAutoRotateAt=Date.now());const u=Ia({control:this.currentControl,rotation:l.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:h=>o.some(r=>r.id===h)});this.activeIndex=u.nextIndex,this.lastAutoRotateAt=u.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),this.renderCarousel(o,n),await this.pushAvatarState(n)}async pushAvatarState(e){const a=this.avatarAdapter;if(!a)return;const i=async(l,o)=>{try{await o()}catch(u){console.warn(`Avatar adapter ${l} failed`,u)}};await i("setState",()=>a.setState(e.state)),await i("setCue",()=>a.setCue(this.currentControl.cue)),await i("setViewPreset",()=>a.setViewPreset(this.currentPreset));const s=!!c(e.state.message,180),n=a.getCapabilities().rendersStateMessage===!0;await i("showBubble",()=>a.showBubble(s&&n?"":e.body,{ttlMs:0,speak:!1,typewriter:!1}))}updateDataHealth(){this.cycleConnectivityFailures>0?this.consecutiveFailedCycles+=1:this.consecutiveFailedCycles=0;const e=this.consecutiveFailedCycles>=(this.options.staleAfterFailures??2);this.staleEl.hidden=!e,this.root.dataset.stale=e?"true":"false"}recordProviderFailure(e){bi(e)&&(this.cycleConnectivityFailures+=1)}renderContext(){return{labels:this.labels,locale:this.rendererConfig.assistant.locale||"en-US",assistantName:this.rendererConfig.assistant.name,weather:this.weatherData||be,states:this.hassStates,iconUrl:e=>this.resolveIconUrl(e)}}renderCarousel(e,a){this.orderedPages=e.slice();const i=this.renderContext(),s=new Set;e.forEach((n,l)=>{s.add(n.id);let o=this.slides.get(n.id);if(o&&o.kind!==n.kind&&(this.discardSlide(o),o.el.remove(),this.slides.delete(n.id),o=void 0),!o){const u=document.createElement("section");u.dataset.slideId=n.id,u.dataset.scenePageId=n.id,o={pageId:n.id,kind:n.kind,el:u,signature:"\0",views:[],widgets:new Map,generation:0,appPropsKey:""},this.slides.set(n.id,o)}if(o.el.className=ui(n),o.el.dataset.slideOrder=String(l),n.kind==="app")this.syncAppSlide(o,n);else{const u=n.kind==="overview"?hi(i,a):n.kind==="grid"?mi(i,n,l,e.length):gi(i,n,l,e.length);this.applySlideHtml(o,u,n)}});for(const[n,l]of Array.from(this.slides.entries()))s.has(n)||(this.discardSlide(l),l.el.remove(),this.slides.delete(n));e.forEach((n,l)=>{var u;const o=(u=this.slides.get(n.id))==null?void 0:u.el;o&&this.carouselTrackEl.children[l]!==o&&this.carouselTrackEl.insertBefore(o,this.carouselTrackEl.children[l]??null)}),this.updateCarouselPosition(),this.renderDots(e),this.notifyActiveSlide(e)}applySlideHtml(e,a,i){var n,l,o;if(e.signature===a)return;e.signature=a;const s=e.widgets;e.widgets=new Map,e.el.innerHTML=a;for(const u of Array.from(e.el.querySelectorAll("[data-widget-slot]"))){const h=Number(u.dataset.sceneCardIndex),r=(n=i.cards)==null?void 0:n[h],x=c(r==null?void 0:r.widget,96),$=(r==null?void 0:r.props)??{},S=JSON.stringify($),k=s.get(h);if(k&&!k.failed&&k.widgetId===x){if(k.key!==S){try{(o=(l=k.view)==null?void 0:l.update)==null||o.call(l,$)}catch(C){console.warn(`Widget ${x} update failed`,C)}k.key=S}for(const{name:C,value:M}of Array.from(u.attributes))k.slot.setAttribute(C,M);u.replaceWith(k.slot),e.widgets.set(h,k),s.delete(h);continue}const v={widgetId:x,key:S,slot:u,view:null,failed:!1,disposed:!1};e.widgets.set(h,v),this.mountWidget(v,$)}for(const u of s.values())this.disposeWidget(u)}syncAppSlide(e,a){var $;const i=c(a.app,96),s=JSON.stringify(a.props??{}),n=this.options.extensions,l=i&&n?n.getPage(i):null,o=!!(l&&l.modes.includes("kiosk")),u=`app:${i}:${o?"ok":"missing"}`;if(e.signature===u){if(e.appPropsKey!==s){e.appPropsKey=s;for(const S of e.views)($=S.update)==null||$.call(S,a.props??{})}return}if(this.disposeViews(e),e.signature=u,e.appPropsKey=s,!o||!l||!this.extensionRuntime){e.el.innerHTML=`
        <div class="app-slide slide-body">
          <div class="slide-top"><div><h1 class="headline">${y(c(a.title,64)||i)}</h1></div></div>
          <div class="empty">${y(this.labels.extensionUnavailable)}${i?` (${y(i)})`:""}</div>
        </div>`;return}e.el.innerHTML=vi();const h=e.el.querySelector("[data-app-host]");if(!h)return;const r=e.generation,x=this.extensionRuntime;(async()=>{try{const S=await l.mount(h,a.props??{},x);if(e.generation!==r||this.disposed){S.dispose();return}e.views.push(S)}catch(S){e.generation===r&&(h.textContent=this.labels.extensionUnavailable),console.warn(`Extension page ${i} failed to mount`,S)}})()}async mountWidget(e,a){var s;const i=e.widgetId?(s=this.options.extensions)==null?void 0:s.getWidget(e.widgetId):null;if(!i||!this.extensionRuntime){e.failed=!0,e.slot.classList.add("is-unavailable"),e.slot.textContent=this.labels.extensionUnavailable;return}try{const n=await i.mount(e.slot,a,this.extensionRuntime);if(e.disposed||this.disposed){n.dispose();return}e.view=n}catch(n){e.disposed||(e.failed=!0,e.slot.classList.add("is-unavailable"),e.slot.textContent=this.labels.extensionUnavailable),console.warn(`Widget ${e.widgetId} failed to mount`,n)}}disposeWidget(e){var a;e.disposed=!0;try{(a=e.view)==null||a.dispose()}catch(i){console.warn("Widget dispose failed",i)}e.view=null}disposeViews(e){e.generation+=1;for(const a of e.widgets.values())this.disposeWidget(a);e.widgets.clear();for(const a of e.views.splice(0))try{a.dispose()}catch(i){console.warn("Extension view dispose failed",i)}}discardSlide(e){this.disposeViews(e)}renderDots(e){const a=e.map((i,s)=>`${s}:${i.id}:${c(i.title,40)}`).join("|");a!==this.dotsSignature&&(this.dotsSignature=a,this.dotsEl.innerHTML=e.map((i,s)=>`
      <button
        class="carousel-dot"
        type="button"
        data-slide-index="${s}"
        data-scene-page-id="${y(i.id)}"
        aria-label="${y(c(i.title,40)||c(i.id,40)||`${this.labels.pageStamp} ${s+1}`)}"
      ></button>
    `).join("")),this.updateDotState()}notifyActiveSlide(e){this.lastRenderedActiveIndex!==this.activeIndex&&(this.lastRenderedActiveIndex=this.activeIndex,e.forEach((a,i)=>{var l;const s=(l=this.slides.get(a.id))==null?void 0:l.el;if(!s)return;const n=i===this.activeIndex;s.dataset.active=n?"true":"false",s.dispatchEvent(new CustomEvent("ks-active-change",{detail:{active:n}}))}))}resolveIconUrl(e){var s;const a=c((s=this.options.iconUrls)==null?void 0:s[e],1024);return a||`${qe(c(this.options.iconBaseUrl,1024)||"./assets")}${Qt[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:i,layoutGapPx:s,globalScale:n}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${s}px`),this.root.style.setProperty("--scene-global-scale",String(n))}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]"))){const a=Number(e.dataset.slideIndex)===this.activeIndex;e.classList.toggle("is-active",a),a?e.setAttribute("aria-current","true"):e.removeAttribute("aria-current")}}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label, [data-no-swipe], [contenteditable]"):!1}clearDragState(e,a){var i,s;!a&&((s=(i=this.carouselShellEl).hasPointerCapture)!=null&&s.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=Ca(this.sceneRuntimeConfig.rotation,this.activeIndex,e,i=>this.orderedPages.some(s=>s.id===i));this.pinPageByIndex(a)}pinPageById(e){const a=this.orderedPages.findIndex(i=>i.app===e||i.id===e);a>=0&&this.pinPageByIndex(a)}pinPageByIndex(e){const a=this.orderedPages.length?this.orderedPages:this.sceneRuntimeConfig.pages,i=a[e];if(!i)return;const s=Math.max(18e3,this.sceneRuntimeConfig.rotation.defaultDwellMs*2);this.uiControl=ha(this.uiControl,i.id,s),this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.notifyActiveSlide(a),this.refreshNow()}syncIdleMonologue(e){if(!Ea(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=ut(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}!this.idleTimer&&!this.disposed&&(this.idleTimer=window.setTimeout(()=>{this.idleTimer=null;const a=ut(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refreshNow()},Pa(18e3,18e3)))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await Qe(fetch,e,{cache:"no-store"});if(!a.ok){const i=new Error(`Failed to load ${e}: HTTP ${a.status}`);throw i.status=a.status,i}return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:Lt({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl,onError:e=>this.recordProviderFailure(e)})}async readAssistantState(){const e=async()=>Xa({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??ea,onError:i=>this.recordProviderFailure(i)}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap||!this.haStatesReader)return e();const a=await this.haStatesReader.read();return Ga(a||{},this.entityMap,this.rendererConfig.assistant.name)||e()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=re){const a=async()=>Qa({url:this.rendererConfig.control.controlUrl,defaultValue:e,onError:s=>this.recordProviderFailure(s)}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap||!this.haStatesReader)return a();const i=await this.haStatesReader.read();return Ja(i||{},this.controlEntityMap)||a()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const a=await this.readJson(this.getWeatherUrl());e=ht(e,a)}catch{}if(this.options.weatherReader)try{const a=await this.options.weatherReader();e=ht(e,a)}catch{}try{return We(e)}catch{return We(this.options.defaultWeather)}}resolveAvatarManifestUrls(e,a){const i=dt(a),s=G(i,c(e.assetRoot,1024)||"./assets"),n=s?qe(s):i,l=o=>{const u=c(o,1024);return u?G(n,u):""};return{...e,assetRoot:s,runtimeUrl:G(i,e.runtimeUrl||""),entry:l(e.entry||""),modelUrl:l(e.modelUrl||""),fallbackPortrait:l(e.fallbackPortrait||""),motionMapUrl:l(e.motionMapUrl||""),expressionMapUrl:l(e.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([o,u])=>[o,G(i,u)]).filter(([,o])=>!!o))}}createAvatarAdapter(){var a,i;const e=(i=(a=this.options).avatarAdapterFactory)==null?void 0:i.call(a,{manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(e)return e;if(this.avatarManifest.adapter==="live2d")return Na({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="module")return ja({manifest:this.avatarManifest,alt:this.rendererConfig.assistant.name||"Assistant"});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Oa({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const i=a.dataset.avatarPreset||"",s=a.querySelector("[data-preset-thumb]"),n=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];a.classList.toggle("is-active",i===this.currentPreset),s&&(n?(s.src=n,s.removeAttribute("hidden")):(s.src="",s.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function wi(t,e={}){const a=new yi(t,e);return await a.init(),a}const Si=["overview","cards","forecast+cards","grid"],xi=["full","mini"],_t=["entity","text","todo","onoff","battery","network","time","percent","number"],Q=["caption","hint"],Te="/local/live2d/",vt="/scene-legacy/live2d/",ki={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},$i={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackDelete:"Удалить",avatarPackDeleteConfirm:t=>`Удалить аватар «${t}»? Это действие нельзя отменить.`,avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",kindGrid:"Сетка",fieldGridColumns:"Столбцы",fieldGridRows:"Строки",fieldCardCol:"Столбец",fieldCardRow:"Строка",fieldCardW:"Ширина",fieldCardH:"Высота",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать",tabCards:"Карточки",tabAvatar:"Аватар",tabDisplay:"Дисплей",pageSettingsLabel:"Настройки страницы"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackDelete:"Delete",avatarPackDeleteConfirm:t=>`Delete avatar "${t}"? This cannot be undone.`,avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",kindGrid:"Grid",fieldGridColumns:"Columns",fieldGridRows:"Rows",fieldCardCol:"Column",fieldCardRow:"Row",fieldCardW:"Width",fieldCardH:"Height",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use",tabCards:"Cards",tabAvatar:"Avatar",tabDisplay:"Display",pageSettingsLabel:"Page settings"}},Ci=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Ii=4*1024*1024,Pi=192*1024,De=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Ye="mellow-fly-7";function pe(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Ei(t){return De.find(e=>e.id===t)||De.find(e=>e.id===Ye)||De[0]}function Ai(t){return`${t.width} × ${t.height}`}function g(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function it(t){return JSON.parse(JSON.stringify(t))}function Y(t){const e=new Map(t.pages.map(s=>[s.id,s])),a=t.rotation.order.map(s=>e.get(s)).filter(Boolean),i=t.pages.filter(s=>!a.some(n=>n.id===s.id));return[...a,...i]}function Ui(t,e){return e?Math.max(0,Y(t).findIndex(a=>a.id===e)):0}function Ti(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Ht(t,e){const a=Ti(e);let i=a,s=2;for(;t.pages.some(n=>n.id===i);)i=`${a}-${s}`,s+=1;return i}function Ri(t){const e=t.pages.length+1,a=pe()==="ru";return{id:Ht(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function ze(t){const e=pe()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function O(t,e){const a=t[e];return a==null?"":String(a)}function ae(t,e){const a=t[e];return a==null?"":String(a)}function oe(t,e){const a=t.display||{},i=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function Li(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function Re(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function Ge(t){return t.avatar||(t.avatar={}),t.avatar}function Mi(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function Di(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Ni(t){var i;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&Y(t).some(s=>s.id===a)?a:((i=Y(t)[0])==null?void 0:i.id)||null}async function bt(t){const e=await fetch(t,{cache:"no-store"}),a=await e.json();if(!e.ok||a.success===!1||!a.config||!a.packId)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return{config:it(a.config),packId:a.packId}}async function Bi(t,e,a){const i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({config:e,expectedPackId:a})}),s=await i.json();if(i.status===409)throw new Error(s.error||"Active scene changed. Reload the editor before saving.");if(!i.ok||s.success===!1||!s.config)throw new Error(`POST ${t} failed: HTTP ${i.status}`);return it(s.config)}function rt(t){switch(t){case"text":return[...Q,"value"];case"todo":return[...Q,"entity"];case"onoff":return[...Q,"entity","onText","offText"];case"battery":return[...Q,"entity","stateEntity"];case"network":return[...Q,"downEntity","upEntity"];case"time":return[...Q,"entity"];case"percent":return[...Q,"entity","digits"];case"number":return[...Q,"entity","digits","unit"];default:return[...Q,"entity"]}}function yt(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:e==="grid"?t.kindGrid:t.kindOverview}function fe(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function jt(t){const e=pe();return ki[e][t]||""}function Fe(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function Fi(t,e){const a=e.attributes||{},i=String(a.friendly_name||t),s=t.includes(".")&&t.split(".",1)[0]||"other",n=String(e.state||""),l=String(a.unit_of_measurement||"");return{entityId:t,name:i,domain:s,state:n,unit:l}}function Oi(t){return t?Object.entries(t).map(([e,a])=>Fi(e,a)).sort((e,a)=>{const i=e.domain.localeCompare(a.domain);return i!==0?i:e.name.localeCompare(a.name,"ru")}):[]}function _i(t,e){const a=e.trim().toLowerCase();return a?t.filter(i=>i.entityId.toLowerCase().includes(a)||i.name.toLowerCase().includes(a)||i.domain.toLowerCase().includes(a)||i.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function Hi(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():null}function de(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const s=Hi(e);if(s)return new URL(a.slice(1),s).toString()}return new URL(a,i).toString()}function st(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Te))return de(`${vt}${a.slice(Te.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const i=new URL(a,e);if(i.pathname.startsWith(Te)){const s=i.pathname.slice(Te.length);return de(`${vt}${s}${i.search}${i.hash}`,e)}}catch{return a}return a}function ji(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function Vi(t,e){const a=new URL("./",t).toString(),i=de(st(e,a)||e,a);return ji(i||a)}function wt(t,e,a){const i=String(a||"").trim();return i?de(st(i,t)||i,Vi(t,e)):""}function Wi(t,e){const a=String(e||"").trim();return a?de(st(a,t)||a,new URL("./",t).toString()):""}function Vt(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}function Ze(t,e){const a=Vt(t);return{...a,manifestUrl:a.manifestUrl?de(a.manifestUrl,e):"",previewUrl:a.previewUrl?de(a.previewUrl,e):""}}async function zi(t,e){var h;const a=String(t||"").trim();if(!a)return null;const i=await fetch(a,{cache:"no-store"}),s=await i.json();if(!i.ok)throw new Error(`GET ${a} failed: HTTP ${i.status}`);const n=String(s.assetRoot||"").trim();let l=0;const o=wt(a,n,String(s.motionMapUrl||"").trim());if(o)try{const r=await fetch(o,{cache:"no-store"}),x=await r.json();r.ok&&Array.isArray(x.motions)&&(l=x.motions.length)}catch{l=0}const u=Wi(a,String(((h=s.presetThumbs)==null?void 0:h.full)||"").trim())||wt(a,n,String(s.fallbackPortrait||"").trim());return Vt({id:"",name:String(s.name||"").trim()||e||"",manifestUrl:a,previewUrl:u,motionCount:l,capabilities:s.capabilities})}async function St(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),i=await a.json();if(!a.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(i.items)?i.items.map(s=>Ze(s,e)).filter(s=>s.id&&s.manifestUrl):[]}async function Gi(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const i=/\/api\/hassio_ingress\//.test(a),s=i?Pi:Ii;if(i||e.size>s){const u=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,h=Math.max(1,Math.ceil(e.size/s));let r=null;for(let x=0;x<h;x+=1){const $=x*s,S=Math.min(e.size,$+s),k=new FormData;k.set("uploadId",u),k.set("filename",e.name),k.set("chunkIndex",String(x)),k.set("chunkCount",String(h)),k.set("archive",e.slice($,S,"application/zip"),`${e.name}.part-${x+1}-of-${h}`);const v=await fetch(a,{method:"POST",body:k}),C=await v.json();if(!v.ok||C.success===!1)throw new Error(String(C.error||`HTTP ${v.status}`));C.item&&(r=Ze(C.item,a))}if(!r)throw new Error("Avatar import did not return the imported pack.");return r}const n=new FormData;n.set("archive",e,e.name);const l=await fetch(a,{method:"POST",body:n}),o=await l.json();if(!l.ok||o.success===!1||!o.item)throw new Error(String(o.error||`HTTP ${l.status}`));return Ze(o.item,a)}async function qi(t,e){var l,o,u,h;const a=String(t||"").trim(),i=String(e||"").trim();if(!a||!i)throw new Error("Avatar pack API is not configured.");const s=await fetch(`${a}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),n=await s.json();if(!s.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${s.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||{},motionMap:{motions:Array.isArray((l=n.motionMap)==null?void 0:l.motions)?(o=n.motionMap)==null?void 0:o.motions.map(r=>({index:Number(r.index),id:String(r.id||"").trim(),label:String(r.label||r.id||"").trim(),group:String(r.group||"").trim(),tags:Array.isArray(r.tags)?r.tags.map(x=>String(x||"").trim()).filter(Boolean):[]})).filter(r=>Number.isFinite(r.index)):[],semantic:typeof((u=n.motionMap)==null?void 0:u.semantic)=="object"&&((h=n.motionMap)!=null&&h.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):{}}}}async function Ki(t,e){var n,l,o;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({motionMap:e.motionMap})}),s=await i.json();if(!i.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${i.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||e.manifest,motionMap:{motions:Array.isArray((n=s.motionMap)==null?void 0:n.motions)?s.motionMap.motions:e.motionMap.motions,semantic:typeof((l=s.motionMap)==null?void 0:l.semantic)=="object"&&((o=s.motionMap)!=null&&o.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):e.motionMap.semantic}}}function Ji(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function Yi(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function Zi(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Ci.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${g(i.key)}">${g(Yi(t,i))}</label>
            <select id="avatar-semantic-${g(i.key)}" data-avatar-semantic="${g(i.key)}">
              <option value="">${g(t.avatarMotionNone)}</option>
              ${a.map(s=>`
                <option value="${g(String(s.index))}"${Ji(e.motionMap.semantic[i.key])===String(s.index)?" selected":""}>
                  ${g(`${s.label||s.id} · #${s.index}`)}
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
  `}function xt(t,e,a){var x,$,S,k,v;const i=(e==null?void 0:e.id)||"",s=a===i,n=(e==null?void 0:e.name)||t.avatarPackDefaultTile,l=(e==null?void 0:e.id)||t.avatarPackCurrent,o=(e==null?void 0:e.previewUrl)||"",u=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(x=e.capabilities)!=null&&x.supportsMotion?t.avatarCapabilityMotion:"",($=e.capabilities)!=null&&$.supportsEmotion?t.avatarCapabilityEmotion:"",(S=e.capabilities)!=null&&S.supportsLipSync?t.avatarCapabilityLipSync:"",(k=e.capabilities)!=null&&k.supportsViewPresets?t.avatarCapabilityViewPresets:"",(v=e.capabilities)!=null&&v.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],h=u.length?u:[t.avatarPackDefaultHint],r=e!==null;return`
    <article class="avatar-pack-card${s?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${o?`<img src="${g(o)}" alt="${g(n)}">`:`<span>${g(n)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${g(n)}</strong>
        <div class="meta">${g(l)}</div>
        <div class="avatar-pack-card-meta">
          ${h.map(C=>`<span>${g(C)}</span>`).join("")}
        </div>
        <div class="avatar-pack-card-actions">
          <button class="scene-editor-button${s?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${g(i)}">
            ${g(s?t.avatarPackSelected:t.avatarPackSelect)}
          </button>
          ${r?`<button class="scene-editor-button is-danger" type="button" data-action="delete-avatar-pack" data-pack-id="${g(i)}" data-pack-name="${g(n)}">
            ${g(t.avatarPackDelete)}
          </button>`:""}
        </div>
      </div>
    </article>
  `}function nt(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function Xi(t,e,a,i){if(!e||a===null)return`<div class="meta">${g(t.entityBindingEmpty)}</div>`;const s=rt(O(e,"type")||"entity").filter(n=>nt(n));return s.length?`
    <div class="binding-targets">
      ${s.map(n=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===a&&i.field===n?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${g(n)}">
            ${g(Fe(t,n))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${g(t.entityBindingNoTargets)}</div>`}function kt(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function ce(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function $t(t){return rt(t).find(e=>nt(e))||null}function ie(t,e,a,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${g(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${g(e)}" value="${g(a)}">
    </div>
  `}function le(t,e,a){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${g(t)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${g(e)}" value="${g(a)}">
    </div>
  `}function Ct(t,e,a,i){return`
    <div class="field">
      <label for="page-select-${e}">${g(t)}</label>
      <select id="page-select-${e}" data-page-field="${g(e)}">
        ${i.map(s=>`<option value="${g(s.value)}"${s.value===a?" selected":""}>${g(s.label)}</option>`).join("")}
      </select>
    </div>
  `}function Qi(t,e,a,i){for(let s=0;s<t.length;s++){if(s===i)continue;const n=t[s],l=Number(n.col)||0,o=Number(n.row)||0,u=Math.max(1,Number(n.w)||1),h=Math.max(1,Number(n.h)||1);if(e>=l&&e<l+u&&a>=o&&a<o+h)return{occupied:!0,cardIndex:s}}return{occupied:!1,cardIndex:-1}}function er(t,e){const a=t.gridColumns||4,i=t.gridRows||3,s=t.cards||[],n=new Set;let l="";for(let o=0;o<i;o++)for(let u=0;u<a;u++){const h=`${u},${o}`;if(n.has(h))continue;const r=Qi(s,u,o);if(r.occupied){const x=s[r.cardIndex],$=Number(x.col)||0,S=Number(x.row)||0,k=Math.max(1,Number(x.w)||1),v=Math.max(1,Number(x.h)||1);if(u===$&&o===S){for(let T=0;T<v;T++)for(let j=0;j<k;j++)n.add(`${$+j},${S+T}`);const C=r.cardIndex===e,M=O(x,"caption")||O(x,"type")||"entity";l+=`<div class="grid-preview-cell is-occupied${C?" is-selected":""}"
            style="grid-column: ${$+1} / span ${k}; grid-row: ${S+1} / span ${v};"
            data-action="select-card" data-card-index="${r.cardIndex}"
            title="#${r.cardIndex+1} ${g(M)}"
          ><span>${g(M)}</span></div>`}}else l+=`<div class="grid-preview-cell"
          style="grid-column: ${u+1}; grid-row: ${o+1};"
          data-action="grid-add-card-at" data-col="${u}" data-row="${o}"
          title="+">+</div>`}return`<div class="grid-preview" style="--grid-cols: ${a}; --grid-rows: ${i};">${l}</div>`}function tr(t,e,a,i,s=!1){const n=O(e,"type")||"entity",l=rt(n),o=s?`
    <div class="field">
      <label>${g(t.fieldCardCol)}</label>
      <input type="number" min="0" data-card-index="${a}" data-card-field="col" value="${g(O(e,"col"))}">
    </div>
    <div class="field">
      <label>${g(t.fieldCardRow)}</label>
      <input type="number" min="0" data-card-index="${a}" data-card-field="row" value="${g(O(e,"row"))}">
    </div>
    <div class="field">
      <label>${g(t.fieldCardW)}</label>
      <input type="number" min="1" data-card-index="${a}" data-card-field="w" value="${g(O(e,"w")||"1")}">
    </div>
    <div class="field">
      <label>${g(t.fieldCardH)}</label>
      <input type="number" min="1" data-card-index="${a}" data-card-field="h" value="${g(O(e,"h")||"1")}">
    </div>
  `:"";return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${g(O(e,"caption")||fe(t,n))}</strong>
          <div class="meta">${g(fe(t,n))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        ${o}
        <div class="field is-wide">
          <label>${g(t.cardType)}</label>
          <select data-card-index="${a}" data-card-field="type">
            ${_t.map(u=>`<option value="${u}"${u===n?" selected":""}>${g(fe(t,u))}</option>`).join("")}
          </select>
        </div>
        ${l.map(u=>{const h=nt(u),r=h&&(i==null?void 0:i.cardIndex)===a&&i.field===u;return h?`
              <div class="field ${u==="hint"?"is-wide":""} is-binding-field${r?" is-active":""}">
                <label>${g(Fe(t,u))}</label>
                <div class="field-binding-row">
                  <input
                    type="text"
                    data-card-index="${a}"
                    data-card-field="${g(u)}"
                    data-binding-field="${g(u)}"
                    value="${g(O(e,u))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${a}"
                    data-binding-field="${g(u)}"
                  >${t.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${u==="hint"?"is-wide":""}">
              <label>${g(Fe(t,u))}</label>
              <input
                type="${u==="digits"?"number":"text"}"
                data-card-index="${a}"
                data-card-field="${g(u)}"
                value="${g(O(e,u))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function ar(t,e,a,i,s,n=!1){const l=O(e,"type")||"entity",o=O(e,"caption")||fe(t,l),h=(n?`[${O(e,"col")||"0"},${O(e,"row")||"0"} ${O(e,"w")||"1"}×${O(e,"h")||"1"}] `:"")+(O(e,"entity")||O(e,"stateEntity")||O(e,"downEntity")||O(e,"upEntity")||O(e,"value")||O(e,"hint")||jt(l));return`
    <article class="card-list-item${s?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
        <strong>${g(o)}</strong>
        <span class="meta">${g(fe(t,l))}</span>
        <div class="meta">${g(h)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===i-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function ir(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${g(e)}"
    >
      <strong>${g(fe(t,e))}</strong>
      <span>${g(jt(e))}</span>
    </button>
  `}function rr(t,e,a){t[e]=a.entityId;const i=t;String(i.caption||"").trim()||(i.caption=a.name),String(i.hint||"").trim()||(i.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&a.unit&&(i.unit=a.unit)}async function sr(t){var ge;const e=$i[pe()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(a)&&document.body.insertBefore(a,i),i==null||i.remove();const s=document.createElement("section");s.id="scene-editor-shell",s.innerHTML=`
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
        display: flex;
        flex-direction: column;
        gap: 16px;
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
      #scene-editor-shell .grid-preview {
        display: grid;
        grid-template-columns: repeat(var(--grid-cols, 4), minmax(0, 1fr));
        grid-template-rows: repeat(var(--grid-rows, 3), minmax(44px, 1fr));
        gap: 4px;
        padding: 8px;
        border-radius: 14px;
        background: rgba(214,225,237,0.42);
        border: 1px solid rgba(32,48,65,0.08);
        margin-bottom: 12px;
        max-height: 240px;
      }
      #scene-editor-shell .grid-preview-cell {
        border-radius: 10px;
        border: 1px dashed rgba(32,48,65,0.14);
        display: grid;
        place-items: center;
        font-size: 10px;
        color: rgba(32,48,65,0.4);
        cursor: pointer;
        min-height: 0;
        overflow: hidden;
        padding: 2px;
        text-align: center;
        word-break: break-all;
      }
      #scene-editor-shell .grid-preview-cell:hover {
        background: rgba(32,48,65,0.06);
      }
      #scene-editor-shell .grid-preview-cell.is-occupied {
        background: rgba(111,191,162,0.18);
        border-style: solid;
        border-color: rgba(77,147,121,0.24);
        color: rgba(32,48,65,0.7);
        font-weight: 500;
      }
      #scene-editor-shell .grid-preview-cell.is-selected {
        background: rgba(45,98,162,0.18);
        border-color: rgba(45,98,162,0.35);
        color: rgba(45,98,162,0.9);
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
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 175px), 1fr));
        gap: 12px;
      }
      #scene-editor-shell .avatar-pack-card {
        display: grid;
        gap: 8px;
        border-radius: 16px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(255,255,255,0.92);
        padding: 10px;
        min-width: 0;
      }
      #scene-editor-shell .avatar-pack-card.is-active {
        border-color: rgba(45,98,162,0.35);
        box-shadow: inset 0 0 0 1px rgba(45,98,162,0.18);
      }
      #scene-editor-shell .avatar-pack-card-preview {
        aspect-ratio: 3/4;
        border-radius: 12px;
        background: linear-gradient(180deg, rgba(223,232,239,0.82), rgba(236,242,246,0.92));
        display: grid;
        place-items: center;
        overflow: hidden;
      }
      #scene-editor-shell .avatar-pack-card-preview img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      #scene-editor-shell .avatar-pack-card-preview span {
        padding: 10px;
        text-align: center;
        font: 11px/1.3 "Aptos","Segoe UI",sans-serif;
        color: rgba(32,48,65,0.62);
      }
      #scene-editor-shell .avatar-pack-card-body {
        display: grid;
        gap: 6px;
      }
      #scene-editor-shell .avatar-pack-card-body strong {
        font-size: 13px;
        line-height: 1.25;
        overflow-wrap: anywhere;
      }
      #scene-editor-shell .avatar-pack-card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      #scene-editor-shell .avatar-pack-card-meta span {
        border-radius: 999px;
        padding: 2px 6px;
        background: rgba(214,225,237,0.72);
        font-size: 10px;
        color: #385268;
      }
      #scene-editor-shell .avatar-pack-card-actions {
        display: grid;
        gap: 4px;
      }
      #scene-editor-shell .scene-editor-button.is-danger {
        color: #a83232;
        border-color: rgba(168,50,50,0.25);
        background: rgba(255,230,230,0.72);
        font-size: 11px;
        padding: 4px 8px;
      }
      #scene-editor-shell .scene-editor-button.is-danger:hover {
        background: rgba(255,210,210,0.9);
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
      #scene-editor-shell .avatar-import-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
      }
      #scene-editor-shell .avatar-import-button.is-disabled {
        opacity: 0.58;
        cursor: not-allowed;
      }
      #scene-editor-shell .avatar-import-input {
        position: absolute;
        width: 1px;
        height: 1px;
        min-height: 1px;
        max-width: 1px;
        max-height: 1px;
        margin: -1px;
        padding: 0;
        border: 0;
        opacity: 0;
        pointer-events: none;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        clip-path: inset(50%);
      }
      #scene-editor-shell .page-tabs {
        display: flex;
        gap: 6px;
        overflow-x: auto;
        padding: 4px 4px 8px;
        scrollbar-width: thin;
        -webkit-overflow-scrolling: touch;
      }
      #scene-editor-shell .page-tab {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 36px;
        padding: 0 16px;
        border-radius: 999px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(255,255,255,0.86);
        color: #203041;
        cursor: pointer;
        white-space: nowrap;
        font: 13px/1.2 "Aptos","Segoe UI",sans-serif;
        flex-shrink: 0;
      }
      #scene-editor-shell .page-tab.is-active {
        background: rgba(77,147,121,0.16);
        border-color: rgba(77,147,121,0.34);
        color: #1b5e3e;
        font-weight: 700;
      }
      #scene-editor-shell .page-tab.is-add {
        background: rgba(214,225,237,0.52);
        border-color: rgba(32,48,65,0.08);
        font-weight: 700;
        min-width: 36px;
        padding: 0 10px;
      }
      #scene-editor-shell .page-tab-actions {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        padding: 0 4px;
      }
      #scene-editor-shell .section-tabs {
        display: flex;
        gap: 0;
        border-radius: 14px;
        border: 1px solid rgba(32,48,65,0.1);
        background: rgba(248,251,253,0.82);
        overflow: hidden;
      }
      #scene-editor-shell .section-tab {
        flex: 1 1 0;
        min-height: 42px;
        padding: 0 14px;
        border: none;
        border-right: 1px solid rgba(32,48,65,0.08);
        background: transparent;
        color: rgba(32,48,65,0.7);
        cursor: pointer;
        font: 600 13px/1.2 "Aptos","Segoe UI",sans-serif;
        transition: background 0.15s, color 0.15s;
      }
      #scene-editor-shell .section-tab:last-child {
        border-right: none;
      }
      #scene-editor-shell .section-tab:hover {
        background: rgba(214,225,237,0.42);
      }
      #scene-editor-shell .section-tab.is-active {
        background: rgba(45,98,162,0.12);
        color: #1f4e87;
      }
      #scene-editor-shell .active-section {
        display: grid;
        gap: 16px;
      }
      #scene-editor-shell .preview-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
      }
      #scene-editor-shell .preview-topbar-actions {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
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
        <div class="preview-topbar">
          <div class="scene-editor-status" data-tone="muted" data-topbar-status></div>
          <span data-preview-resolution style="font:12px/1.2 monospace;color:rgba(32,48,65,0.5);"></span>
          <div class="preview-topbar-actions">
            <select data-preview-display style="min-height:34px;border-radius:999px;border:1px solid rgba(32,48,65,0.1);background:rgba(255,255,255,0.86);padding:0 10px;font:12px/1.2 'Aptos','Segoe UI',sans-serif;">
              ${De.map(p=>`<option value="${g(p.id)}">${g(p.label[pe()])}</option>`).join("")}
            </select>
            <button class="scene-editor-button is-accent" type="button" data-action="save">${e.save}</button>
            <button class="scene-editor-button" type="button" data-action="add-page">${e.addPage}</button>
          </div>
        </div>
        <div class="scene-preview-frame">
          <div class="scene-preview-stage" data-preview-stage>
            <div class="scene-preview-canvas" data-preview-canvas></div>
          </div>
        </div>
        <div class="scene-preview-hint">
          <span>${e.previewSelectPage}</span>
          <span>${e.previewSelectCard}</span>
        </div>
      </section>
      <section class="scene-dashboard" data-dashboard></section>
    </div>
  `,document.body.appendChild(s),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const n=s.querySelector("[data-preview-stage]"),l=s.querySelector("[data-preview-canvas]"),o=s.querySelector("[data-preview-resolution]"),u=s.querySelector("[data-preview-display]"),h=s.querySelector("[data-dashboard]");if(!n||!l||!o||!u||!h)throw new Error("Missing native editor shell elements");l.appendChild(a);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Ye,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1,activeSectionTab:new URL(window.location.href).searchParams.get("editorTab")==="avatar"?"avatar":"cards"};let x=t.packId;const $=async p=>{const f=String(p||"").trim();if(!f||!t.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,A();try{r.avatarPackDetails=await qi(t.avatarPackApiUrl,f),r.avatarPackDirty=!1}catch(d){r.avatarPackDetails=null,r.avatarPackDirty=!1,W(`${e.avatarMappingLoadError}: ${String(d)}`,"bad")}finally{r.avatarPackLoading=!1}},S=()=>{var R;const p=Ei(r.previewDisplayId),f=Math.max(320,((R=n.parentElement)==null?void 0:R.clientWidth)||n.clientWidth||p.width),d=Math.max(260,Math.min(window.innerHeight*.62,760)),b=Math.min(1,f/p.width,d/p.height),E=Math.round(p.width*b),U=Math.round(p.height*b);u.value=p.id,o.textContent=Ai(p),n.style.aspectRatio=`${p.width} / ${p.height}`,n.style.width=`${E}px`,n.style.height=`${U}px`,l.style.width=`${p.width}px`,l.style.height=`${p.height}px`,l.style.transform=`scale(${b})`,a.style.width=`${p.width}px`,a.style.height=`${p.height}px`},k=p=>{r.previewDisplayId=String(p||"").trim()||Ye,S()},v=p=>{r.pendingAvatarZip=p,r.pendingAvatarZipName=(p==null?void 0:p.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",A(),p&&C(p)},C=async p=>{if(!(!r.config||!t.avatarImportUrl||r.avatarImporting)){r.pendingAvatarZip=null,r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",A();try{const f=await Gi(t.avatarImportUrl,p);r.avatarCatalog=t.avatarCatalogUrl?await St(t.avatarCatalogUrl):[f],Ge(r.config).packId=f.id,await $(f.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(f.name||f.id),r.avatarImportTone="ok",F(),A()}catch(f){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(f)}`,r.avatarImportTone="bad",A()}}},M=typeof ResizeObserver<"u"?new ResizeObserver(()=>S()):null;M==null||M.observe(n.parentElement||n);let T=null;const j=()=>{const p=r.selectedPageId||"",f=r.selectedCardIndex;for(const d of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete d.dataset.editorSelectedPage;for(const d of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete d.dataset.editorSelectedCard;if(p){const d=a.querySelector(`[data-slide-id="${CSS.escape(p)}"]`);d&&(d.dataset.editorSelectedPage="true")}if(p&&f!==null){const d=`[data-scene-page-id="${CSS.escape(p)}"][data-scene-card-index="${f}"]`,b=a.querySelector(d);b&&(b.dataset.editorSelectedCard="true")}},J=typeof MutationObserver<"u"?new MutationObserver(()=>j()):null;J==null||J.observe(a,{childList:!0,subtree:!0});const A=()=>{const p=r.config,f=p?Y(p):[],d=f.find(I=>I.id===r.selectedPageId)||f[0]||null,b=Array.isArray(d==null?void 0:d.cards)?d.cards:[],E=r.selectedCardIndex!==null&&b[r.selectedCardIndex]||null,U=d?f.indexOf(d):-1,R=_i(r.haEntities,r.entitySearch),P=r.focusedBinding?e.entityBindingActive(O(b[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,Fe(e,r.focusedBinding.field)):e.entityBindingEmpty,te=p?Re(p):"",se=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${g(r.avatarImportStatus)}</div>`:"",H=r.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,Z=d?`${d.title||d.id||e.pageSettings} · ${yt(e,d.kind)}`:e.statusLoading;h.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${g(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${g(t.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${r.saving||r.avatarPackSaving||!p?" disabled":""}>${r.saving||r.avatarPackSaving?e.saving:e.save}</button>
        </div>
      </div>
      <div class="page-tabs">
        ${f.map((I,D)=>`
          <button class="page-tab${I.id===((d==null?void 0:d.id)||"")?" is-active":""}" type="button" data-action="select-page" data-page-id="${g(I.id)}" draggable="true" data-drag-kind="page">
            ${g(I.title||I.id||(pe()==="ru"?`Стр ${D+1}`:`Page ${D+1}`))}
          </button>
        `).join("")}
        <button class="page-tab is-add" type="button" data-action="add-page"${p?"":" disabled"}>+</button>
      </div>
      ${d?`
      <div class="page-tab-actions">
        <span class="meta">${g(Z)}</span>
        <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${g(d.id)}"${U===0?" disabled":""}>${e.up}</button>
        <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${g(d.id)}"${U===f.length-1?" disabled":""}>${e.down}</button>
        <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${g(d.id)}"${f.length<=1?" disabled":""}>${e.remove}</button>
      </div>
      `:""}
      <div class="section-tabs">
        <button class="section-tab${r.activeSectionTab==="cards"?" is-active":""}" type="button" data-action="switch-section" data-section="cards">${e.cards}</button>
        <button class="section-tab${r.activeSectionTab==="avatar"?" is-active":""}" type="button" data-action="switch-section" data-section="avatar">${e.avatar}</button>
        <button class="section-tab${r.activeSectionTab==="display"?" is-active":""}" type="button" data-action="switch-section" data-section="display">${e.displaySettings}</button>
      </div>
      <div class="active-section">
      ${r.activeSectionTab==="cards"?`
        <section class="scene-settings-card">
          <div class="scene-settings-head">
            <h2>${e.pageSettings}</h2>
          </div>
        ${d?`
          <div class="inspector-grid">
            ${ie(e.fieldPageId,"id",ae(d,"id"),!0)}
            ${Ct(e.fieldKind,"kind",ae(d,"kind"),Si.map(I=>({value:I,label:yt(e,I)})))}
            ${ie(e.fieldTitle,"title",ae(d,"title"),!0)}
            ${ie(e.fieldSubtitle,"subtitle",ae(d,"subtitle"),!0)}
            ${ie(e.fieldSlot,"slot",ae(d,"slot"))}
            ${d.kind==="grid"?`
            ${ie(e.fieldGridColumns,"gridColumns",String(d.gridColumns||4))}
            ${ie(e.fieldGridRows,"gridRows",String(d.gridRows||3))}
            `:`
            ${Ct(e.fieldCardStyle,"cardStyle",ae(d,"cardStyle")||"full",xi.map(I=>({value:I,label:I==="mini"?e.styleMini:e.styleFull})))}
            `}
            ${ie(e.fieldStampCaption,"stampCaption",ae(d,"stampCaption"))}
            ${ie(e.fieldStampValue,"stampValue",ae(d,"stampValue"))}
          </div>
        `:`<div class="meta">${e.statusLoading}</div>`}
        </section>
        <section class="scene-settings-card" data-editor-section="cards">
          <div class="scene-settings-head">
            <h2>${e.cards}</h2>
            <div class="meta">${e.cardsSubtitle}</div>
            <div class="meta">${e.cardOrderHint}</div>
          </div>
        ${d?`
          <div class="card-stack">
            ${d.kind==="grid"?er(d,r.selectedCardIndex):""}
            <div>
              <div class="meta">${e.cardTemplates}</div>
              <div class="card-template-grid" style="margin-top:12px;">
                ${_t.map(I=>ir(e,I)).join("")}
              </div>
            </div>
            <div class="cards-list">
              ${b.length?b.map((I,D)=>ar(e,I,D,b.length,D===r.selectedCardIndex,d.kind==="grid")).join(""):`<div class="meta">${e.noCards}</div>`}
            </div>
            <div>
              <h2>${e.cardInspector}</h2>
              ${E?tr(e,E,r.selectedCardIndex||0,r.focusedBinding,d.kind==="grid"):`<div class="meta">${e.cardInspectorEmpty}</div>`}
            </div>
          </div>
        `:`<div class="meta">${e.statusLoading}</div>`}
        </section>
        <section class="scene-settings-card">
          <div class="scene-settings-head">
            <h2>${e.homeAssistant}</h2>
            <div class="meta">${g(P)}</div>
          </div>
        <div>
          <div class="meta">${e.entityBindingTargets}</div>
          ${Xi(e,E,r.selectedCardIndex,r.focusedBinding)}
        </div>
        <div class="field ha-search" style="margin-top:12px;">
          <label for="ha-entity-search">${e.entitySearch}</label>
          <input id="ha-entity-search" type="text" data-ha-search value="${g(r.entitySearch)}">
        </div>
        <div class="ha-list">
          ${R.length?R.map(I=>`
            <article class="ha-entity">
              <div class="ha-entity-row">
                <div>
                  <strong>${g(I.name)}</strong>
                  <div class="meta">${g(I.domain)}</div>
                </div>
                <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${g(I.entityId)}"${r.focusedBinding?"":" disabled"}>${e.useEntity}</button>
              </div>
              <code>${g(I.entityId)}</code>
              <div class="ha-state">${g(I.state)}${I.unit?` · ${g(I.unit)}`:""}</div>
            </article>
          `).join(""):`<div class="meta">${e.noEntities}</div>`}
        </div>
        </section>
      `:""}
      ${r.activeSectionTab==="avatar"?`
        <section class="scene-settings-card" data-editor-section="avatar" tabindex="-1">
          <div class="scene-settings-head">
            <h2>${e.avatar}</h2>
            <div class="meta">${e.avatarSubtitle}</div>
          </div>
        ${p?`
          <div class="avatar-pack-box">
            <div class="meta">${H}</div>
            <div class="meta">${e.avatarPackAppliedAfterSave}</div>
            <div class="avatar-pack-grid">
              ${xt(e,r.bundledAvatar,te)}
              ${r.avatarCatalog.map(I=>xt(e,I,te)).join("")}
            </div>
          </div>
          <div class="card-stack" style="margin-top:16px;">
            <div class="field is-wide">
              <label>${e.avatarImportSelect}</label>
            </div>
            <div class="avatar-import-actions">
              <button
                class="scene-editor-button avatar-import-button${r.avatarImporting||!t.avatarImportUrl?" is-disabled":""}"
                type="button"
                data-action="choose-avatar-archive"
                ${r.avatarImporting||!t.avatarImportUrl?" disabled":""}
              >
                ${r.avatarImporting?e.avatarImporting:e.avatarImportChooseButton}
              </button>
              <input
                id="avatar-pack-archive"
                class="avatar-import-input"
                type="file"
                accept=".zip,application/zip"
                data-avatar-archive
                tabindex="-1"
                aria-hidden="true"
                ${r.avatarImporting||!t.avatarImportUrl?" disabled":""}
              >
            </div>
            ${r.pendingAvatarZipName?`<div class="meta">${g(e.avatarImportSelected(r.pendingAvatarZipName))}</div>`:""}
            <div class="meta">${e.avatarImportHint}</div>
            ${se}
          </div>
          ${te?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?Zi(e,r.avatarPackDetails):"":""}
        `:`<div class="meta">${e.statusLoading}</div>`}
        </section>
      `:""}
      ${r.activeSectionTab==="display"?`
        <section class="scene-settings-card">
          <div class="scene-settings-head">
            <h2>${e.displaySettings}</h2>
            <div class="meta">${e.displaySubtitle}</div>
          </div>
        ${p?`
          <div class="inspector-grid">
            ${le(e.fieldDisplaySafeTop,"safeTop",oe(p,"safeTop"))}
            ${le(e.fieldDisplaySafeRight,"safeRight",oe(p,"safeRight"))}
            ${le(e.fieldDisplaySafeBottom,"safeBottom",oe(p,"safeBottom"))}
            ${le(e.fieldDisplaySafeLeft,"safeLeft",oe(p,"safeLeft"))}
            ${le(e.fieldDisplayPadding,"layoutPaddingPx",oe(p,"layoutPaddingPx"))}
            ${le(e.fieldDisplayGap,"layoutGapPx",oe(p,"layoutGapPx"))}
            ${le(e.fieldDisplayScale,"globalScale",oe(p,"globalScale"))}
          </div>
        `:`<div class="meta">${e.statusLoading}</div>`}
        </section>
      `:""}
      </div>
    `;const B=h.querySelector("[data-avatar-archive]"),X=h.querySelector("[data-action='choose-avatar-archive']");X==null||X.addEventListener("click",()=>{if(!B||B.disabled)return;B.value="";const I=B;try{if(typeof I.showPicker=="function"){I.showPicker();return}}catch{}B.click()}),B==null||B.addEventListener("click",()=>{B.value=""}),B==null||B.addEventListener("change",()=>{var D;const I=((D=B.files)==null?void 0:D[0])||null;v(I),B.value=""});for(const I of Array.from(h.querySelectorAll(".page-tab[data-page-id]")))I.draggable=!0,I.addEventListener("dragstart",D=>{const q=String(I.dataset.pageId||"").trim();T=q?{kind:"page",pageId:q}:null,!(!T||!D.dataTransfer)&&(D.dataTransfer.effectAllowed="move",D.dataTransfer.setData("text/plain",JSON.stringify(T)))}),I.addEventListener("dragover",D=>{!T||T.kind!=="page"||(D.preventDefault(),ce(s),I.classList.add("is-drop-target"),D.dataTransfer&&(D.dataTransfer.dropEffect="move"))}),I.addEventListener("drop",D=>{if(!T||T.kind!=="page")return;D.preventDefault();const q=String(I.dataset.pageId||"").trim();q&&$e(T.pageId,q),T=null,ce(s)}),I.addEventListener("dragend",()=>{T=null,ce(s)});for(const I of Array.from(h.querySelectorAll(".card-list-item[data-card-index]")))I.draggable=!0,I.addEventListener("dragstart",D=>{const q=Number(I.dataset.cardIndex||"-1");T=Number.isFinite(q)&&q>=0?{kind:"card",cardIndex:q}:null,!(!T||!D.dataTransfer)&&(D.dataTransfer.effectAllowed="move",D.dataTransfer.setData("text/plain",JSON.stringify(T)))}),I.addEventListener("dragover",D=>{!T||T.kind!=="card"||(D.preventDefault(),ce(s),I.classList.add("is-drop-target"),D.dataTransfer&&(D.dataTransfer.dropEffect="move"))}),I.addEventListener("drop",D=>{if(!T||T.kind!=="card")return;D.preventDefault();const q=Number(I.dataset.cardIndex||"-1");Number.isFinite(q)&&q>=0&&Ce(T.cardIndex,q),T=null,ce(s)}),I.addEventListener("dragend",()=>{T=null,ce(s)});S(),j()},W=(p,f)=>{r.status=p,r.statusTone=f,A()},_=()=>{if(!r.config)return;const p=Y(r.config);if(!p.length){r.selectedPageId=null;return}(!r.selectedPageId||!p.some(b=>b.id===r.selectedPageId))&&(r.selectedPageId=p[0].id);const f=p.find(b=>b.id===r.selectedPageId)||null,d=Array.isArray(f==null?void 0:f.cards)?f.cards:[];d.length?(r.selectedCardIndex===null||r.selectedCardIndex>=d.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),Di(r.selectedPageId),Mi(Ui(r.config,r.selectedPageId))},F=()=>{r.dirty=!0,W(e.statusDirty,"muted")},we=()=>{const p=new URL(window.location.href);p.searchParams.set("editor","1"),r.selectedPageId&&p.searchParams.set("editorPage",r.selectedPageId),p.searchParams.set("v",String(Date.now())),window.location.replace(p.toString())},Se=(p,f)=>{if(!r.config||!r.selectedPageId)return;const d=r.config.pages.find(b=>b.id===r.selectedPageId);if(d){if(p==="slot")d.slot=f===""?void 0:Number(f);else if(p==="id"){const b=Ht(r.config,f||"page"),E=d.id;d.id=b,r.config.rotation.order=r.config.rotation.order.map(U=>U===E?b:U),r.selectedPageId=b}else if(p==="title"||p==="subtitle"||p==="stampCaption"||p==="stampValue")d[p]=f;else if(p==="kind")d.kind=f;else if(p==="cardStyle")d.cardStyle=f;else if(p==="gridColumns"||p==="gridRows"){const b=f===""?void 0:Math.max(1,Math.min(12,Math.round(Number(f))));d[p]=Number.isFinite(b)?b:void 0}F(),_()}},xe=(p,f)=>{if(!r.config)return;const d=Li(r.config),b=d.safeArea||{},E=f===""?null:Number(f),U=Number.isFinite(E)?E:null;p==="safeTop"?b.top=U??0:p==="safeRight"?b.right=U??0:p==="safeBottom"?b.bottom=U??0:p==="safeLeft"?b.left=U??0:p==="layoutPaddingPx"?d.layoutPaddingPx=U??16:p==="layoutGapPx"?d.layoutGapPx=U??16:p==="globalScale"&&(d.globalScale=U??1),d.safeArea=b,F()},ke=(p,f,d)=>{var U;if(!r.config||!r.selectedPageId)return;const b=r.config.pages.find(R=>R.id===r.selectedPageId);if(!b)return;Array.isArray(b.cards)||(b.cards=[]);const E=b.cards[p];if(E){if(f==="type"){const R=ze(d);if(b.cards[p]={...R,caption:O(E,"caption")||R.caption},((U=r.focusedBinding)==null?void 0:U.cardIndex)===p){const P=$t(d);r.focusedBinding=P?{cardIndex:p,field:P}:null}}else if(f==="digits")E[f]=d===""?0:Number(d);else if(f==="col"||f==="row"||f==="w"||f==="h"){const R=d===""?void 0:Math.max(0,Number(d));E[f]=Number.isFinite(R)?R:void 0}else E[f]=d;F()}},$e=(p,f)=>{if(!r.config||!p||!f||p===f)return;const d=Y(r.config).map(U=>U.id),b=d.indexOf(p),E=d.indexOf(f);b<0||E<0||(d.splice(b,1),d.splice(E,0,p),r.config.rotation.order=d,r.selectedPageId=p,r.selectedCardIndex=0,r.focusedBinding=null,F(),_(),A())},Ce=(p,f)=>{if(!r.config||!r.selectedPageId||p===f)return;const d=r.config.pages.find(E=>E.id===r.selectedPageId);if(!d||!Array.isArray(d.cards)||p<0||f<0||p>=d.cards.length||f>=d.cards.length)return;const[b]=d.cards.splice(p,1);d.cards.splice(f,0,b),r.selectedCardIndex=f,r.focusedBinding=null,F(),A()},Ie=p=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const f=r.config.pages.find(E=>E.id===r.selectedPageId),d=r.haEntities.find(E=>E.entityId===p);if(!f||!Array.isArray(f.cards)||!d)return;const b=f.cards[r.focusedBinding.cardIndex];b&&(rr(b,r.focusedBinding.field,d),F(),A())},Pe=(p,f)=>{r.selectedCardIndex=p,r.focusedBinding={cardIndex:p,field:f},A(),window.requestAnimationFrame(()=>{const d=s.querySelector("#ha-entity-search");d==null||d.scrollIntoView({behavior:"smooth",block:"center"}),d==null||d.focus(),d==null||d.select()})};s.addEventListener("click",async p=>{var te,se;const f=p.target,d=f==null?void 0:f.closest("[data-action]"),b=d==null?void 0:d.dataset.action;if(!b||!r.config)return;const E=Y(r.config),U=(d==null?void 0:d.dataset.pageId)||null,R=U?E.findIndex(w=>w.id===U):-1;if(b==="select-page"&&U){r.selectedPageId=U,r.selectedCardIndex=0,r.focusedBinding=null,_(),A();return}if(b==="switch-section"){const w=(d==null?void 0:d.dataset.section)||"";(w==="cards"||w==="avatar"||w==="display")&&(r.activeSectionTab=w,A());return}if(b==="page-up"&&R>0){const w=E.map(H=>H.id);[w[R-1],w[R]]=[w[R],w[R-1]],r.config.rotation.order=w,r.selectedPageId=U,F(),_(),A();return}if(b==="page-down"&&R>=0&&R<E.length-1){const w=E.map(H=>H.id);[w[R],w[R+1]]=[w[R+1],w[R]],r.config.rotation.order=w,r.selectedPageId=U,F(),_(),A();return}if(b==="page-remove"&&U&&E.length>1){r.config.pages=r.config.pages.filter(w=>w.id!==U),r.config.rotation.order=Y(r.config).map(w=>w.id),r.selectedPageId=((te=Y(r.config)[Math.max(0,R-1)])==null?void 0:te.id)||((se=Y(r.config)[0])==null?void 0:se.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,F(),_(),A();return}if(b==="add-page"){const w=Ri(r.config);r.config.pages.push(w),r.config.rotation.order=Y(r.config).map(H=>H.id),r.selectedPageId=w.id,r.selectedCardIndex=null,r.focusedBinding=null,F(),_(),A();return}if(b==="add-card-template"&&r.selectedPageId){const w=r.config.pages.find(Z=>Z.id===r.selectedPageId),H=(d==null?void 0:d.dataset.cardType)||"entity";if(w){Array.isArray(w.cards)||(w.cards=[]),w.cards.push(ze(H));const Z=w.cards.length-1;r.selectedCardIndex=Z;const B=$t(H);r.focusedBinding=B?{cardIndex:Z,field:B}:null,F(),A(),B&&window.requestAnimationFrame(()=>{const X=s.querySelector("#ha-entity-search");X==null||X.scrollIntoView({behavior:"smooth",block:"center"}),X==null||X.focus()})}return}if(b==="grid-add-card-at"&&r.selectedPageId){const w=r.config.pages.find(B=>B.id===r.selectedPageId),H=Number((d==null?void 0:d.dataset.col)||"0"),Z=Number((d==null?void 0:d.dataset.row)||"0");if(w){Array.isArray(w.cards)||(w.cards=[]);const B=ze("entity");B.col=H,B.row=Z,B.w=1,B.h=1,w.cards.push(B),r.selectedCardIndex=w.cards.length-1,F(),A()}return}if(b==="focus-binding"){const w=Number((d==null?void 0:d.dataset.cardIndex)||"-1"),H=(d==null?void 0:d.dataset.bindingField)||"";w>=0&&H&&Pe(w,H);return}const P=Number((d==null?void 0:d.dataset.cardIndex)||"-1");if(P>=0&&r.selectedPageId){const w=r.config.pages.find(H=>H.id===r.selectedPageId);if(!w||!Array.isArray(w.cards))return;if(b==="select-card"){r.selectedCardIndex=P,A();return}if(b==="card-remove"){w.cards=w.cards.filter((H,Z)=>Z!==P),r.selectedCardIndex!==null&&(r.selectedCardIndex===P?r.selectedCardIndex=w.cards.length?Math.min(P,w.cards.length-1):null:r.selectedCardIndex>P&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===P?r.focusedBinding=null:r.focusedBinding.cardIndex>P&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),F(),A();return}if(b==="card-up"&&P>0){[w.cards[P-1],w.cards[P]]=[w.cards[P],w.cards[P-1]],r.selectedCardIndex===P?r.selectedCardIndex=P-1:r.selectedCardIndex===P-1&&(r.selectedCardIndex=P),r.focusedBinding&&(r.focusedBinding.cardIndex===P?r.focusedBinding={cardIndex:P-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===P-1&&(r.focusedBinding={cardIndex:P,field:r.focusedBinding.field})),F(),A();return}if(b==="card-down"&&P<w.cards.length-1){[w.cards[P],w.cards[P+1]]=[w.cards[P+1],w.cards[P]],r.selectedCardIndex===P?r.selectedCardIndex=P+1:r.selectedCardIndex===P+1&&(r.selectedCardIndex=P),r.focusedBinding&&(r.focusedBinding.cardIndex===P?r.focusedBinding={cardIndex:P+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===P+1&&(r.focusedBinding={cardIndex:P,field:r.focusedBinding.field})),F(),A();return}}if(b==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,W(e.saving,"muted");try{const w=await bt(t.sceneApiUrl);if(w.packId!==x)throw new Error(`Active scene changed from ${x} to ${w.packId}. Reload the editor before saving.`);if(r.avatarPackDirty&&r.avatarPackDetails&&t.avatarPackApiUrl){try{r.avatarPackDetails=await Ki(t.avatarPackApiUrl,r.avatarPackDetails)}catch(H){throw new Error(`${e.avatarMappingSaveError}: ${String(H)}`)}r.avatarPackDirty=!1}r.config=await Bi(t.sceneApiUrl,it(r.config),x),r.dirty=!1,r.saving=!1,r.avatarPackSaving=!1,_(),W(e.statusSaved,"ok"),window.setTimeout(()=>we(),250)}catch(w){r.saving=!1,r.avatarPackSaving=!1,W(`${e.saveError}: ${String(w)}`,"bad")}return}if(b==="bind-entity"){const w=(d==null?void 0:d.dataset.entityId)||"";Ie(w)}}),s.addEventListener("input",p=>{const f=p.target;if(!f||!r.config){f&&f.dataset.previewDisplay!==void 0&&k(f.value);return}if(f.dataset.previewDisplay!==void 0){k(f.value);return}if(f.dataset.avatarSemantic!==void 0){const d=Re(r.config);if(!r.avatarPackDetails||!d||r.avatarPackDetails.packId!==d)return;const b=f.value.trim();b?r.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic]=Number(b):delete r.avatarPackDetails.motionMap.semantic[f.dataset.avatarSemantic],r.avatarPackDirty=!0,W(e.statusDirty,"muted"),A();return}if(f.dataset.pageField){Se(f.dataset.pageField,f.value),A();return}if(f.dataset.displayField){xe(f.dataset.displayField,f.value),A();return}if(f.dataset.cardField&&f.dataset.cardIndex){r.selectedCardIndex=Number(f.dataset.cardIndex),ke(Number(f.dataset.cardIndex),f.dataset.cardField,f.value),A();return}f.hasAttribute("data-ha-search")&&(r.entitySearch=f.value,A())}),s.addEventListener("click",p=>{var E,U;const f=(E=p.target)==null?void 0:E.closest("[data-action='delete-avatar-pack']");if(f&&t.avatarPackApiUrl){const R=String(f.dataset.packId||"").trim(),P=String(f.dataset.packName||R).trim();if(!R||!window.confirm(e.avatarPackDeleteConfirm(P)))return;const te=`${t.avatarPackApiUrl}?packId=${encodeURIComponent(R)}`;fetch(te,{method:"DELETE"}).then(async se=>{if(!se.ok){const w=await se.json().catch(()=>({}));console.warn("Failed to delete avatar pack",R,w);return}r.config&&Re(r.config)===R&&(Ge(r.config).packId=null,r.avatarPackDetails=null,F()),r.avatarCatalog=r.avatarCatalog.filter(w=>w.id!==R),A()});return}const d=(U=p.target)==null?void 0:U.closest("[data-action='select-avatar-pack']");if(!d||!r.config)return;const b=String(d.dataset.packId||"").trim();Ge(r.config).packId=b||null,F(),$(b||null).finally(()=>A()),A()}),a.addEventListener("click",p=>{if(!r.config)return;const f=p.target,d=f==null?void 0:f.closest("[data-scene-card-index][data-scene-page-id]");if(d){const E=String(d.dataset.scenePageId||"").trim(),U=Number(d.dataset.sceneCardIndex||"-1");E&&Number.isFinite(U)&&U>=0&&(r.selectedPageId=E,r.selectedCardIndex=U,r.focusedBinding=null,_(),A(),kt("cards"));return}const b=f==null?void 0:f.closest("[data-scene-page-id]");if(b){const E=String(b.dataset.scenePageId||"").trim();E&&(r.selectedPageId=E,r.selectedCardIndex=0,r.focusedBinding=null,_(),A(),kt("pages"));return}}),s.addEventListener("change",p=>{var d;const f=p.target;!f||f.dataset.avatarArchive===void 0||v(((d=f.files)==null?void 0:d[0])||null)}),s.addEventListener("focusin",p=>{const f=p.target;if(!(f!=null&&f.dataset.bindingField))return;const d=Number(f.dataset.cardIndex||"-1");d<0||(r.selectedCardIndex=d,r.focusedBinding={cardIndex:d,field:f.dataset.bindingField})});try{const p=await bt(t.sceneApiUrl);if(r.config=p.config,x=p.packId,t.sceneAvatarManifestUrl)try{r.bundledAvatar=await zi(t.sceneAvatarManifestUrl,t.packId)}catch{r.bundledAvatar=null}if(t.avatarCatalogUrl)try{r.avatarCatalog=await St(t.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=Oi(((ge=Rt())==null?void 0:ge.states)||null),r.selectedPageId=Ni(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",await $(Re(r.config)),_()}catch(p){r.status=`${e.loadError}: ${String(p)}`,r.statusTone="bad"}A(),r.activeSectionTab==="avatar"&&r.config&&requestAnimationFrame(()=>{const p=h.querySelector('[data-editor-section="avatar"]');p==null||p.scrollIntoView({block:"start"}),p==null||p.focus({preventScroll:!0})})}function ot(){return new URLSearchParams(window.location.search).get("editor")==="1"}function nr(){const t=new URLSearchParams(window.location.search),e=String(t.get("avatar")||t.get("avatarAdapter")||"").trim().toLowerCase();if(e==="static"||e==="live2d")return e;if(ot())return null;const a=String(window.location.hostname||"").trim().toLowerCase(),i=a==="localhost"||a==="127.0.0.1",s=String(window.location.port||"").trim()==="48123";return i&&s?"static":null}function or(t,e){const a=et(t),i=a.adapter==="live2d"?N("../../scene-runtime/avatar.html",e):"",s=N(String(a.assetRoot||"").trim(),e),n=h=>{const r=String(h||"").trim();return r?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(r)||r.startsWith("/")?N(r,e):r:""},l=h=>{const r=String(h||"").trim();return r?N(r,e):""},o=Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([h,r])=>[h,N(String(r||""),e)]).filter(([,h])=>!!h));if(nr()==="static"&&a.adapter==="live2d"){const h=n(String(a.fallbackPortrait||a.modelUrl||a.entry||"").trim());if(h)return{...a,adapter:"static",runtimeUrl:"",entry:h,modelUrl:h,fallbackPortrait:h,motionMapUrl:"",capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},presetThumbs:o}}return{...a,assetRoot:s,runtimeUrl:i||N(String(a.runtimeUrl||"").trim(),e),entry:n(String(a.entry||"").trim()),modelUrl:n(String(a.modelUrl||"").trim()),fallbackPortrait:n(String(a.fallbackPortrait||"").trim()),motionMapUrl:l(String(a.motionMapUrl||"").trim()),presetThumbs:o}}function lr(t,e){var a,i,s,n,l,o,u,h,r,x,$,S;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([k,v])=>[k,N(v,e)]).filter(([,k])=>!!k)),weather:t.weather,avatar:{manifestUrl:N(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:N(String(((i=t.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((s=t.state)==null?void 0:s.provider)||"json",stateUrl:N(String(((n=t.state)==null?void 0:n.stateUrl)||"").trim(),e),apiUrl:N(String(((l=t.state)==null?void 0:l.apiUrl)||"").trim(),e)||void 0,haApiFallback:((o=t.state)==null?void 0:o.haApiFallback)===!0,idleLinesUrl:N(String(((u=t.state)==null?void 0:u.idleLinesUrl)||"").trim(),e),entityMapUrl:N(String(((h=t.state)==null?void 0:h.entityMapUrl)||"").trim(),e)},control:{provider:((r=t.control)==null?void 0:r.provider)||"json",controlUrl:N(String(((x=t.control)==null?void 0:x.controlUrl)||"").trim(),e),apiUrl:N(String((($=t.control)==null?void 0:$.apiUrl)||"").trim(),e)||void 0,entityMapUrl:N(String(((S=t.control)==null?void 0:S.entityMapUrl)||"").trim(),e)||void 0}}}async function dr(t,e){var k,v,C,M,T,j,J,A;const a=N(String(((k=t.files)==null?void 0:k.rendererConfigUrl)||"").trim(),e);if(!a)return"";const i=N(String(((v=t.files)==null?void 0:v.sceneConfigUrl)||"").trim(),e),s=N(String(((C=t.files)==null?void 0:C.avatarCatalogUrl)||"").trim(),e);let n="";if(i&&s)try{const W=await ve(i);n=String(((M=W.avatar)==null?void 0:M.packId)||"").trim()}catch{n=""}let l="";if(n&&s)try{const W=await ve(s),_=Array.isArray(W.items)?W.items.find(F=>String(F.id||"").trim()===n):null;l=N(String((_==null?void 0:_.manifestUrl)||"").trim(),e)}catch{l=""}const o=lr(await ve(a),a);i&&(o.scene={...o.scene||{},configUrl:i});const u=N(String(((T=t.files)==null?void 0:T.haStatesUrl)||"").trim(),e);u&&(o.state={...o.state||{},apiUrl:((j=o.state)==null?void 0:j.apiUrl)||u},o.control={...o.control||{},apiUrl:((J=o.control)==null?void 0:J.apiUrl)||u});const h=l||String(((A=o.avatar)==null?void 0:A.manifestUrl)||"").trim();if(!h)return URL.createObjectURL(new Blob([JSON.stringify(o)],{type:"application/json"}));const r=N(h,e),x=or(await ve(r),r),$=URL.createObjectURL(new Blob([JSON.stringify(x)],{type:"application/json"})),S={...o,avatar:{manifestUrl:$}};return URL.createObjectURL(new Blob([JSON.stringify(S)],{type:"application/json"}))}const cr="weather.forecast_home_assistant",ur={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Не удалось загрузить bootstrap из add-on Kiosk Scene. Повторяю попытку автоматически.",retryIn:(t,e)=>`Попытка ${e}, следующая через ${t} с.`},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on. Retrying automatically.",retryIn:(t,e)=>`Attempt ${e}, next try in ${t}s.`}};function pr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function fr(t){if(!pr(t))return null;const e=String(t.type||"").trim();return e!=="kiosk-display-off"&&e!=="kiosk-display-on"?null:{type:e,displayOn:t.displayOn===void 0?e==="kiosk-display-on":t.displayOn===!0,source:String(t.source||"").trim()||void 0,timestamp:Number.isFinite(Number(t.timestamp))?Number(t.timestamp):void 0}}let Xe=null,Le=null;function hr(t){const e=Array.from(document.querySelectorAll("iframe.ks-live2d-iframe"));let a=!1;for(const i of e)i.contentWindow&&(i.contentWindow.postMessage(t,"*"),a=!0);return a}function Oe(t=24){Le!==null&&(window.clearTimeout(Le),Le=null),Xe&&(hr(Xe)||t<=0||(Le=window.setTimeout(()=>{Oe(t-1)},120)))}window.addEventListener("message",t=>{const e=fr(t.data);e&&(Xe=e,Oe())});function gr(){if(!ot())return;const t=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),t(),window.addEventListener("pageshow",t,{once:!0}),window.addEventListener("load",t,{once:!0}),window.requestAnimationFrame(()=>{t(),window.setTimeout(t,120)});let e=!1;const a=()=>{e=!0},i=["pointerdown","wheel","touchstart","keydown"];for(const l of i)window.addEventListener(l,a,{once:!0,passive:!0});let s=0;const n=window.setInterval(()=>{if(e||s>=24){window.clearInterval(n);return}t(),s+=1},80)}function mr(t){return`https://api.open-meteo.com/v1/forecast?${new URLSearchParams({latitude:String(t.latitude),longitude:String(t.longitude),current:"temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code",daily:"weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",timezone:t.timezone||"auto",forecast_days:"6"}).toString()}`}const ye=document.getElementById("app");if(!ye)throw new Error("Missing #app root element");const ue=ta(),ee=ur[ue];gr();Be(ye,ee.startingTitle,ee.startingBody);async function vr(t){var $,S;const e=ia(),a=await ra(e),i=String(a.packId||"").trim(),s=await dr(a,e);if(!s)return Be(t,ee.missingRendererTitle,ee.missingRendererBody,JSON.stringify(a,null,2)),null;const n=await ve(s);document.documentElement.dataset.packId=i;const l=(($=n.assistant)==null?void 0:$.name)||i||"kiosk-scene";document.title=l;const o=n.weather??(i.toLowerCase()==="neiri"?{entity:cr}:void 0),u=String(((S=n.state)==null?void 0:S.apiUrl)||"").trim()||void 0,h=new la,r=await wi(t,{rendererConfigUrl:s,weatherUrl:"./weather.json",weatherReader:o!=null&&o.entity||o!=null&&o.openMeteo?ci({weatherEntity:o.entity||"",openMeteoUrl:o.openMeteo?mr(o.openMeteo):void 0,locale:ue==="ru"?"ru-RU":"en-US",iconBaseUrl:"./assets",apiUrl:u,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:na(ue,l),labels:ca(ue),presetLabels:da(ue),defaultWeather:sa(ue,(o==null?void 0:o.location)??""),extensions:h});Oe(),oa(h,a,e);try{await x()}catch(k){throw await r.dispose(),await Promise.allSettled(h.listExtensions().map(v=>h.unload(v.id))),k}return r;async function x(){var k,v,C,M;ot()&&(await sr({packId:i,sceneApiUrl:N(String(a.sceneEditorApiUrl||"").trim(),e),sceneAvatarManifestUrl:N(String(((k=a.files)==null?void 0:k.avatarManifestUrl)||"").trim(),e),avatarCatalogUrl:N(String(((v=a.files)==null?void 0:v.avatarCatalogUrl)||"").trim(),e),avatarImportUrl:N(String(((C=a.files)==null?void 0:C.avatarImportUrl)||"").trim(),e),avatarPackApiUrl:N(String(((M=a.files)==null?void 0:M.avatarPackApiUrl)||"").trim(),e),sceneUrl:N(String(a.entryUrl||a.runtimeBaseUrl||"./").trim(),e)}),Oe())}}aa(()=>vr(ye),{onRetry(t,e,a){Be(ye,ee.failedTitle,`${ee.failedBody} ${ee.retryIn(Math.round(a/1e3),e)}`,String(t))}}).catch(t=>{Be(ye,ee.failedTitle,ee.failedBody,String(t))});
