var qt=Object.defineProperty;var Kt=(t,e,a)=>e in t?qt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var v=(t,e,a)=>Kt(t,typeof e!="symbol"?e+"":e,a);import{d as _e,i as M,t as c,p as Ke,n as Jt,s as Ne,f as tt,w as Je,D as Yt,a as Zt,b as Xt,r as G,c as ct,e as Qt,S as ea,g as ta,h as aa,j as ia,k as N,l as ve,m as ra,o as Be,q as sa,u as na,v as oa,x as la,y as da,z as ca,E as ua,A as pa,B as fa}from"./status-rfog_w7J.js";const re={version:1,assistant:{name:"Assistant"},links:{},avatar:{manifestUrl:"./avatar.manifest.json"},scene:{configUrl:"./scene.default.json"},state:{provider:"json",stateUrl:"./state.json",apiUrl:"",haApiFallback:!1,idleLinesUrl:"./idle-lines.json"},control:{provider:"json",controlUrl:"./control.json",apiUrl:"",entityMapUrl:""}},ut={version:1,adapter:"static",assetRoot:"./assets",runtimeUrl:"",entry:"",modelUrl:"",fallbackPortrait:"",motionMapUrl:"",expressionMapUrl:"",presetThumbs:{},viewPresets:{},capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1}};function ha(t){if(!M(t))return;const e={},a=c(t.entity,255);a&&(e.entity=a);const i=c(t.location,80);i&&(e.location=i);const s=M(t.openMeteo)?t.openMeteo:null,n=Number(s==null?void 0:s.latitude),o=Number(s==null?void 0:s.longitude);return s&&Number.isFinite(n)&&Number.isFinite(o)&&Math.abs(n)<=90&&Math.abs(o)<=180&&(e.openMeteo={latitude:n,longitude:o,timezone:c(s.timezone,64)||void 0}),Object.keys(e).length?e:void 0}function Ye(t){var a,i,s,n,o,l,d,h,r,S,C,x,b,$;const e=_e(re,M(t)?t:{});return{version:1,assistant:{name:c((a=e.assistant)==null?void 0:a.name,40)||re.assistant.name,locale:c((i=e.assistant)==null?void 0:i.locale,16)||void 0},links:M(e.links)?Object.fromEntries(Object.entries(e.links).map(([k,L])=>[c(k,64),c(L,1024)]).filter(([k,L])=>k&&L)):{},weather:ha(e.weather),avatar:{manifestUrl:c((s=e.avatar)==null?void 0:s.manifestUrl,1024)||re.avatar.manifestUrl},scene:{configUrl:c((n=e.scene)==null?void 0:n.configUrl,1024)||re.scene.configUrl},state:{provider:((o=e.state)==null?void 0:o.provider)==="ha"?"ha":"json",stateUrl:c((l=e.state)==null?void 0:l.stateUrl,1024)||re.state.stateUrl,apiUrl:c((d=e.state)==null?void 0:d.apiUrl,1024)||void 0,haApiFallback:((h=e.state)==null?void 0:h.haApiFallback)===!0,idleLinesUrl:c((r=e.state)==null?void 0:r.idleLinesUrl,1024)||re.state.idleLinesUrl,entityMapUrl:c((S=e.state)==null?void 0:S.entityMapUrl,1024)||void 0},control:{provider:((C=e.control)==null?void 0:C.provider)==="ha"?"ha":"json",controlUrl:c((x=e.control)==null?void 0:x.controlUrl,1024)||re.control.controlUrl,apiUrl:c((b=e.control)==null?void 0:b.apiUrl,1024)||void 0,entityMapUrl:c(($=e.control)==null?void 0:$.entityMapUrl,1024)||void 0}}}function at(t){var a,i,s,n,o;const e=_e(ut,M(t)?t:{});return{version:1,name:c(e.name,120)||"",adapter:e.adapter==="live2d"||e.adapter==="unity-webgl"||e.adapter==="module"?e.adapter:"static",assetRoot:c(e.assetRoot,1024)||ut.assetRoot,runtimeUrl:c(e.runtimeUrl,1024)||"",entry:c(e.entry,1024)||"",modelUrl:c(e.modelUrl,1024)||"",fallbackPortrait:c(e.fallbackPortrait,1024)||"",motionMapUrl:c(e.motionMapUrl,1024)||"",expressionMapUrl:c(e.expressionMapUrl,1024)||"",presetThumbs:M(e.presetThumbs)?Object.fromEntries(Object.entries(e.presetThumbs).map(([l,d])=>[c(l,32),c(d,1024)]).filter(([l,d])=>l&&d)):{},viewPresets:M(e.viewPresets)?Object.fromEntries(Object.entries(e.viewPresets).filter(([l,d])=>c(l,32)&&M(d))):{},capabilities:{supportsEmotion:((a=e.capabilities)==null?void 0:a.supportsEmotion)===!0,supportsMotion:((i=e.capabilities)==null?void 0:i.supportsMotion)===!0,supportsViewPresets:((s=e.capabilities)==null?void 0:s.supportsViewPresets)!==!1,supportsLipSync:((n=e.capabilities)==null?void 0:n.supportsLipSync)===!0,supportsPointerFocus:((o=e.capabilities)==null?void 0:o.supportsPointerFocus)===!0}}}const ue={version:1,revision:0,viewPreset:null,page:{mode:"auto",target:null,until:null},cue:{cue:null,emotion:null,motion:null,until:null}},ga=["full","torso","head"];function Fe(t,e=Date.now()){var l,d,h,r,S,C,x;const a=_e(ue,M(t)?t:{}),i={version:1,revision:Number.isFinite(Number(a.revision))?Math.max(0,Number(a.revision)):0,viewPreset:null,page:{mode:((l=a.page)==null?void 0:l.mode)==="pinned"?"pinned":"auto",target:c((d=a.page)==null?void 0:d.target,40)||null,until:c((h=a.page)==null?void 0:h.until,64)||null},cue:{cue:c((r=a.cue)==null?void 0:r.cue,32)||null,emotion:c((S=a.cue)==null?void 0:S.emotion,32)||null,motion:c((C=a.cue)==null?void 0:C.motion,32)||null,until:c((x=a.cue)==null?void 0:x.until,64)||null}},s=c(a.viewPreset,16).toLowerCase();i.viewPreset=ga.includes(s)?s:null;const n=Ke(i.page.until);i.page.mode==="pinned"&&(i.page.target?i.page.until&&(!n||n<=e)&&(i.page={mode:"auto",target:null,until:null}):i.page={mode:"auto",target:null,until:null});const o=Ke(i.cue.until);return i.cue.until&&(!o||o<=e)&&(i.cue={cue:null,emotion:null,motion:null,until:null}),i}function pt(t,e,a=Date.now()){return Fe(_e(Fe(t,a),M(e)?e:{}),a)}function ma(t){return{viewPreset:t}}function va(t,e=3e4,a=Date.now()){const i=c(t,40),s=new Date(a+Math.max(5e3,Number(e)||0)).toISOString();return{page:{mode:i?"pinned":"auto",target:i||null,until:i?s:null}}}function ba(t,e=Date.now()){const a={...t||{}},i=a.page;if((i==null?void 0:i.mode)==="pinned"){const s=Ke(i.until);(!i.target||i.until&&(!s||s<=e))&&delete a.page}return a}function At(t,e){var o,l,d;const a={...t||{}},i=c((o=e==null?void 0:e.cue)==null?void 0:o.cue,32),s=c((l=e==null?void 0:e.cue)==null?void 0:l.emotion,32),n=c((d=e==null?void 0:e.cue)==null?void 0:d.motion,32);return i&&(a.cue=i),s&&(a.emotion=s),n&&(a.motion=n),a}function V(t,e){if(t==null||typeof t=="string"&&!t.trim())return e;const a=Number(t);return Number.isFinite(a)?Math.max(0,Math.round(a)):e}function Ut(t){const e=new Set;return t.map((a,i)=>{const s=c(a.id,40)||`page-${i+1}`;let n=s,o=2;for(;e.has(n);)n=`${s}-${o}`,o+=1;return e.add(n),n===a.id?a:{...a,id:n}})}function Tt(t,e){const a=new Set(t.map(n=>n.id)),i=new Set,s=[];for(const n of Jt(e))a.has(n)&&!i.has(n)&&(i.add(n),s.push(n));for(const n of t)i.has(n.id)||(i.add(n.id),s.push(n.id));return s}function Ze(t,e=1){const a=Number(t);return Number.isFinite(a)?Math.min(1,Math.max(.75,a)):e}function it(t){return M(t)&&M(t.config)?t.config:t}function Rt(t,e){const a=e.map(s=>t.find(n=>n.id===s)).filter(Boolean),i=t.filter(s=>!a.some(n=>n.id===s.id));return a.concat(i)}const ya=["overview","cards","forecast+cards","grid","app"];function wa(t){return ya.includes(t)?t:"cards"}function Sa(t,e){const a={...t};if(!M(e))return a;if(typeof e.id=="string"&&(a.id=c(e.id,40)||a.id),typeof e.kind=="string"&&(a.kind=wa(e.kind)),typeof e.layout=="string"&&(a.kind=e.layout==="forecast+cards"?"forecast+cards":"cards"),typeof e.app=="string"){const i=c(e.app,96);i?a.app=i:delete a.app}return M(e.props)&&(a.props={...e.props}),typeof e.cardStyle=="string"&&(a.cardStyle=e.cardStyle==="mini"?"mini":"full"),typeof e.title=="string"&&(a.title=e.title),typeof e.subtitle=="string"&&(a.subtitle=e.subtitle),typeof e.stampCaption=="string"&&(a.stampCaption=e.stampCaption),typeof e.stampValue=="string"&&(a.stampValue=e.stampValue),Number.isFinite(Number(e.slot))&&(a.slot=Math.max(0,Number(e.slot))),Number.isFinite(Number(e.gridColumns))&&(a.gridColumns=Math.max(1,Math.min(12,Math.round(Number(e.gridColumns))))),Number.isFinite(Number(e.gridRows))&&(a.gridRows=Math.max(1,Math.min(12,Math.round(Number(e.gridRows))))),Array.isArray(e.cards)&&(a.cards=e.cards.filter(i=>M(i))),a}function xa(t,e){const a=it(t),i=Ut(Array.isArray(e.pages)?e.pages.slice():[]),s=M(a)&&Array.isArray(a.pages)?a.pages:[],n=i.map(x=>{const b=s.find($=>c(M($)?$.id:"",40)===x.id);return Sa(x,b)}),o=M(a)&&M(a.rotation)?a.rotation:{},l=M(e.display)?e.display:{},d=M(a)&&M(a.display)?a.display:{},h=M(l.safeArea)?l.safeArea:{},r=M(d.safeArea)?d.safeArea:{},S=Array.isArray(o.order)?o.order:e.rotation.order;return{version:1,rotation:{order:Tt(n,S),defaultDwellMs:Math.max(5e3,(Number(o.defaultDwellSeconds)||e.rotation.defaultDwellSeconds)*1e3)},display:{safeAreaPx:{top:V(r.top,V(h.top,0)),right:V(r.right,V(h.right,0)),bottom:V(r.bottom,V(h.bottom,0)),left:V(r.left,V(h.left,0))},layoutPaddingPx:V(d.layoutPaddingPx,V(l.layoutPaddingPx,16)),layoutGapPx:V(d.layoutGapPx,V(l.layoutGapPx,16)),globalScale:Ze(d.globalScale,Ze(l.globalScale,1))},pages:n}}function $a(t,e){var n;const a=xa(t,e),i=it(t),s=M(i)&&M(i.avatar)?{packId:typeof i.avatar.packId=="string"&&c(i.avatar.packId,120)||null}:{packId:typeof((n=e.avatar)==null?void 0:n.packId)=="string"&&c(e.avatar.packId,120)||null};return{version:1,kind:"scene.display",rotation:{order:a.rotation.order.slice(),defaultDwellMs:a.rotation.defaultDwellMs},display:{safeAreaPx:{...a.display.safeAreaPx},layoutPaddingPx:a.display.layoutPaddingPx,layoutGapPx:a.display.layoutGapPx,globalScale:a.display.globalScale},avatar:s,pages:Rt(a.pages,a.rotation.order)}}function ka(t){return M(t)&&t.kind==="scene.display"&&Number(t.version)===1&&M(t.rotation)&&Array.isArray(t.pages)&&M(t.display)&&M(t.display.safeAreaPx)}function Ca(t){var o,l;const e=Ut(Array.isArray(t.pages)?t.pages.filter(d=>M(d)):[]),a=Tt(e,(o=t.rotation)==null?void 0:o.order),i=t.display,s=t.display.safeAreaPx,n=M(t.avatar)?{packId:typeof t.avatar.packId=="string"&&c(t.avatar.packId,120)||null}:{packId:null};return{version:1,kind:"scene.display",rotation:{order:a,defaultDwellMs:Math.max(5e3,Number((l=t.rotation)==null?void 0:l.defaultDwellMs)||18e3)},display:{safeAreaPx:{top:V(s.top,0),right:V(s.right,0),bottom:V(s.bottom,0),left:V(s.left,0)},layoutPaddingPx:V(i.layoutPaddingPx,16),layoutGapPx:V(i.layoutGapPx,16),globalScale:Ze(i.globalScale,1)},avatar:n,pages:Rt(e,a)}}function Ia(t,e){if(ka(t))return Ca(t);const a=it(t);if(!M(a))throw new Error("Scene runtime config must be a JSON object.");return $a(a,a)}function Pa(t,e){return t.order[e]||t.order[0]||""}function Ea(t,e){const a=t.order.findIndex(i=>i===e);return a>=0?a:0}function Aa(t,e,a,i){const s=Array.isArray(t.order)?t.order:[];if(!s.length)return 0;const n=Math.max(0,Math.min(e,s.length-1));for(let o=1;o<=s.length;o+=1){const l=(n+o*a+s.length)%s.length;if(i(s[l]))return l}return n}function Ua(t){const e=t.now??Date.now(),a=Array.isArray(t.rotation.order)&&t.rotation.order.length?t.rotation.order:[],i=Math.max(5e3,Number(t.rotation.defaultDwellMs)||18e3);if(!a.length)return{nextIndex:0,nextAutoRotateAt:e,pinnedKey:""};const s=t.control.page;if(s.mode==="pinned"&&s.target&&a.includes(s.target))return{nextIndex:Ea(t.rotation,s.target),nextAutoRotateAt:e,pinnedKey:`${s.target}:${s.until||""}`};if(t.force){const o=Pa(t.rotation,t.activeIndex);return{nextIndex:t.isEligible(o)?t.activeIndex:Math.max(0,a.findIndex(d=>t.isEligible(d))),nextAutoRotateAt:e,pinnedKey:""}}if(e-t.lastAutoRotateAt<i)return{nextIndex:t.activeIndex,nextAutoRotateAt:t.lastAutoRotateAt,pinnedKey:""};let n=t.activeIndex;for(let o=1;o<=a.length;o+=1){const l=(t.activeIndex+o)%a.length;if(t.isEligible(a[l])){n=l;break}}return{nextIndex:n,nextAutoRotateAt:e,pinnedKey:""}}function Ta(t=28e3,e=52e3){return t+Math.floor(Math.random()*e)}function ft(t,e=-1){const a=Array.isArray(t)?t.map(s=>c(s,220)).filter(Boolean):[];if(!a.length)return{line:"Waiting for input.",index:-1};let i=Math.floor(Math.random()*a.length);return a.length>1&&i===e&&(i=(i+1)%a.length),{line:a[i],index:i}}function Ra(t){const e=(t==null?void 0:t.online)!==!1,a=!!(t!=null&&t.busy),i=!!c(t==null?void 0:t.message,180);return e&&!a&&!i}const La={cue:null,emotion:null,motion:null,until:null},Ma={text:"",key:"",ttlMs:0,speak:!0,typewriter:!0};function Da(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Lt(t){return t.endsWith("/")?t:`${t}/`}function Mt(t){try{const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():""}catch{return""}}function Ee(t,e){const a=c(e,1024);if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;if(a.startsWith("/")){const s=Mt(t||window.location.href);if(s)return new URL(a.slice(1),s).toString();const n=new URL(window.location.href).origin;return new URL(a,n).toString()}const i=new URL(Lt(c(t,1024)||"."),window.location.href);return new URL(a,i).toString()}function Me(t){const e=c(t,1024);if(!e)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(e))return e;if(e.startsWith("/")){const a=Mt(window.location.href);return a?new URL(e.slice(1),a).toString():new URL(e,new URL(window.location.href).origin).toString()}return new URL(e,window.location.href).toString()}function Na(t,e,a){const i=c(t.runtimeUrl,1024)||c(e.runtimeUrl,1024);return i?Me(i):new URL("../avatar.html",new URL(Lt(c(a,1024)||"."),window.location.href)).toString()}function Ba(t,e){const a=c(e,512);if(a)return a;try{return new URL(t,window.location.href).origin||"*"}catch{return"*"}}function Fa(t,e){const a=new URL(t,window.location.href),i={...e.query||{}};e.displayMode!==!1&&i.display==null&&(i.display=!0);for(const[s,n]of Object.entries(i)){const o=c(s,64);if(!o||n==null)continue;const l=typeof n=="boolean"?n?"1":"0":String(n);a.searchParams.set(o,l)}return a.toString()}function ht(t,e,a){const i=Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([s,n])=>[c(s,32),Ee(a,n)]).filter(([s,n])=>s&&n));return{version:1,assistant:{name:c(t.assistant.name,40)||"Assistant"},links:Object.fromEntries(Object.entries(t.links||{}).map(([s,n])=>[c(s,64),Me(n)]).filter(([s,n])=>s&&n)),state:{stateUrl:Me(t.state.stateUrl),idleLinesUrl:Me(t.state.idleLinesUrl||""),haApiFallback:t.state.haApiFallback===!0},assetPack:{modelJson:Ee(a,c(e.modelUrl,1024)||c(e.entry,1024)),fallbackPortrait:Ee(a,e.fallbackPortrait||""),motionMapUrl:Ee(a,e.motionMapUrl||""),presetThumbs:i}}}class Oa{constructor(e={}){v(this,"id","live2d");v(this,"options");v(this,"manifest");v(this,"rendererConfig");v(this,"host",null);v(this,"containerEl",null);v(this,"iframeEl",null);v(this,"splashEl",null);v(this,"splashTextEl",null);v(this,"assetRoot","");v(this,"rendererConfigBlobUrl","");v(this,"currentState");v(this,"currentCue",{...La});v(this,"currentPreset","full");v(this,"currentBubble",{...Ma});v(this,"targetOrigin","*");v(this,"isReady",!1);v(this,"bubbleRevision",0);v(this,"handleWindowMessage",e=>{var s;const a=(s=this.iframeEl)==null?void 0:s.contentWindow;if(!a||e.source!==a||!Da(e.data))return;const i=c(e.data.type,64);if(i==="neiri-renderer-config-request"){this.postRendererConfig(),this.flush();return}i==="neiri-avatar-ready"&&(this.isReady=!0,this.setSplashVisible(!1),this.flush())});this.options=e,this.manifest=at({...e.manifest||{},adapter:"live2d"}),this.rendererConfig=Ye(e.rendererConfig||{}),this.currentState=Ne({},{assistant:this.rendererConfig.assistant.name})}async mount(e){await this.dispose(),this.host=e.host,this.host.innerHTML="",this.isReady=!1,this.assetRoot=c(e.assetRoot,1024)||this.manifest.assetRoot;const a=Na(this.options,this.manifest,this.assetRoot),i={...this.options.query||{}};try{if(new URL(a,window.location.href).origin===window.location.origin){const h=ht(this.rendererConfig,this.manifest,this.assetRoot);this.rendererConfigBlobUrl=URL.createObjectURL(new Blob([JSON.stringify(h)],{type:"application/json"})),i.rendererConfigUrl=this.rendererConfigBlobUrl}}catch{this.rendererConfigBlobUrl=""}const s=Fa(a,{...this.options,query:i});this.targetOrigin=Ba(s,this.options.targetOrigin);const n=document.createElement("div");n.className="ks-live2d-frame",Object.assign(n.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 50px rgba(90,112,132,0.14)"});const o=document.createElement("iframe");o.className="ks-live2d-iframe",o.src=s,o.title=c(this.options.iframeTitle,80)||`${c(this.rendererConfig.assistant.name,40)||"Assistant"} avatar`,o.loading="eager",o.allow="autoplay",Object.assign(o.style,{width:"100%",height:"100%",border:"0",display:"block",background:"transparent"}),c(this.options.iframeSandbox,255)&&o.setAttribute("sandbox",c(this.options.iframeSandbox,255));const l=this.createSplash(this.assetRoot);n.append(o,l),this.host.append(n),o.addEventListener("load",()=>{this.postRendererConfig(),this.flush()}),window.addEventListener("message",this.handleWindowMessage),this.containerEl=n,this.iframeEl=o,this.splashEl=l,this.splashTextEl=l.querySelector("[data-live2d-splash-text]")}async dispose(){window.removeEventListener("message",this.handleWindowMessage),this.isReady=!1,this.targetOrigin="*",this.assetRoot="",this.rendererConfigBlobUrl&&(URL.revokeObjectURL(this.rendererConfigBlobUrl),this.rendererConfigBlobUrl=""),this.host&&(this.host.innerHTML=""),this.host=null,this.containerEl=null,this.iframeEl=null,this.splashEl=null,this.splashTextEl=null}async setState(e){this.currentState=Ne(e,{assistant:this.rendererConfig.assistant.name}),await this.flushState()}async setCue(e){this.currentCue={cue:c(e==null?void 0:e.cue,32)||null,emotion:c(e==null?void 0:e.emotion,32)||null,motion:c(e==null?void 0:e.motion,32)||null,until:c(e==null?void 0:e.until,64)||null},await this.flushState()}async setViewPreset(e){this.currentPreset=e,this.isReady&&this.postMessage({type:"neiri-view-preset",preset:e})}async showBubble(e,a){const i=c(e,255);this.currentBubble={text:i,key:i?`bubble:${++this.bubbleRevision}`:"",ttlMs:Number.isFinite(Number(a==null?void 0:a.ttlMs))?Math.max(0,Number(a==null?void 0:a.ttlMs)):0,speak:(a==null?void 0:a.speak)!==!1,typewriter:(a==null?void 0:a.typewriter)!==!1},this.isReady&&this.postBubble()}getCapabilities(){return{supportsEmotion:!0,supportsMotion:!0,supportsViewPresets:!0,supportsLipSync:!0,supportsPointerFocus:!0,rendersStateMessage:!0}}createSplash(e){const a=document.createElement("div");a.className="ks-live2d-splash",Object.assign(a.style,{position:"absolute",inset:"0",display:"grid",placeItems:"center",padding:"18px",background:"linear-gradient(180deg, rgba(244,248,251,0.94), rgba(235,243,249,0.84))",transition:"opacity 180ms ease, visibility 180ms ease",zIndex:"1"});const i=document.createElement("div");Object.assign(i.style,{display:"grid",gap:"10px",justifyItems:"center",padding:"18px 20px",minWidth:"190px",borderRadius:"20px",background:"rgba(255,255,255,0.82)",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 18px 36px rgba(90,112,132,0.14)",textAlign:"center",backdropFilter:"blur(10px)"});const s=document.createElement("div");s.textContent=c(this.rendererConfig.assistant.name,40)||"Live2D",Object.assign(s.style,{fontSize:"14px",fontWeight:"600",color:"#203041"});const n=document.createElement("div");return n.dataset.live2dSplashText="true",n.textContent="Loading compatibility renderer...",Object.assign(n.style,{fontSize:"12px",lineHeight:"1.35",color:"rgba(32,48,65,0.72)",maxWidth:"220px"}),i.append(s,n),a.append(i),a}setSplashVisible(e){this.splashEl&&(this.splashEl.style.opacity=e?"1":"0",this.splashEl.style.visibility=e?"visible":"hidden",this.splashEl.style.pointerEvents=e?"auto":"none")}getLegacyRendererConfig(){return!this.host||!this.assetRoot?null:ht(this.rendererConfig,this.manifest,this.assetRoot)}postRendererConfig(){const e=this.getLegacyRendererConfig();e&&this.postMessage({type:"neiri-renderer-config",config:e})}async flush(){await this.flushState(),await this.setViewPreset(this.currentPreset),this.postBubble()}async flushState(){if(!this.isReady)return;const e=At(this.currentState,{viewPreset:this.currentPreset,cue:this.currentCue});this.postMessage({type:"neiri-display-state",state:e})}postBubble(){this.isReady&&this.postMessage({type:"neiri-display-bubble",text:this.currentBubble.text,key:this.currentBubble.key,ttlMs:this.currentBubble.ttlMs,speak:this.currentBubble.speak,typewriter:this.currentBubble.typewriter})}postMessage(e){var i;const a=(i=this.iframeEl)==null?void 0:i.contentWindow;a&&a.postMessage(e,this.targetOrigin)}}function Ha(t={}){return new Oa(t)}const _a={supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},gt={full:{scale:1,x:0,y:0},torso:{scale:1.25,x:0,y:16},head:{scale:1.5,x:0,y:28}};class ja{constructor(e={}){v(this,"id","static");v(this,"options");v(this,"host",null);v(this,"frameEl",null);v(this,"imageEl",null);v(this,"bubbleEl",null);v(this,"fallbackEl",null);v(this,"currentPreset","full");this.options=e}async mount(e){this.host=e.host,this.host.innerHTML="";const a=document.createElement("div");a.className="ks-static-avatar",Object.assign(a.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px",background:"linear-gradient(180deg, rgba(255,255,255,0.72), rgba(255,255,255,0.32))",border:"1px solid rgba(32,48,65,0.08)"});const i=document.createElement("img");i.className="ks-static-avatar-image",Object.assign(i.style,{position:"absolute",inset:"0",width:"100%",height:"100%",objectFit:"contain",objectPosition:"center bottom",transformOrigin:"50% 60%",transition:"transform 180ms ease, opacity 180ms ease",filter:"drop-shadow(0 24px 36px rgba(90,112,132,0.16))"}),i.alt=this.options.alt||"Avatar";const s=document.createElement("div");s.className="ks-static-avatar-fallback",s.textContent=this.options.alt||"Avatar",Object.assign(s.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.72)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",border:"1px dashed rgba(32,48,65,0.18)",background:"rgba(255,255,255,0.42)"});const n=document.createElement("div");n.className="ks-static-avatar-bubble",Object.assign(n.style,{position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.84)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none"}),a.append(i,s,n),this.host.append(a),this.frameEl=a,this.imageEl=i,this.bubbleEl=n,this.fallbackEl=s;const o=this.resolveImageUrl(e.assetRoot);o&&(i.src=o,i.addEventListener("load",()=>{this.fallbackEl&&(this.fallbackEl.style.display="none")},{once:!0}),i.addEventListener("error",()=>{this.fallbackEl&&(this.fallbackEl.style.display="grid")},{once:!0})),await this.setViewPreset("full")}async dispose(){this.host&&(this.host.innerHTML=""),this.host=null,this.frameEl=null,this.imageEl=null,this.bubbleEl=null,this.fallbackEl=null}async setState(e){this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true",this.frameEl.dataset.busy=e.busy?"true":"false",this.frameEl.dataset.emotion=String(e.emotion||""),this.frameEl.dataset.motion=String(e.motion||""),this.frameEl.style.opacity=e.online===!1?"0.76":"1")}async setCue(e){this.frameEl&&(this.frameEl.dataset.cueEmotion=String(e.emotion||""),this.frameEl.dataset.cueMotion=String(e.motion||""))}async setViewPreset(e){this.currentPreset=e;const a=this.options.viewPresets||gt,i=a[e]||a.full||gt.full;this.imageEl&&(this.imageEl.style.transform=`translate(${Number(i.x)||0}px, ${Number(i.y)||0}px) scale(${Number(i.scale)||1})`),this.frameEl&&(this.frameEl.dataset.preset=e)}async showBubble(e,a){if(!this.bubbleEl)return;const i=String(e||"").trim();if(!i){this.bubbleEl.textContent="",this.bubbleEl.style.opacity="0",this.bubbleEl.style.transform="translateY(8px)";return}this.bubbleEl.textContent=i,this.bubbleEl.style.opacity="1",this.bubbleEl.style.transform="translateY(0)"}getCapabilities(){return _a}resolveImageUrl(e){const a=this.options.imageUrl||this.options.fallbackImageUrl||"";if(!a)return"";if(/^(?:https?:)?\/\//.test(a)||a.startsWith("/"))return a;const i=e.replace(/\/+$/,""),s=a.replace(/^\.?\//,"");return i?`${i}/${s}`:s}}function Va(t={}){return new ja(t)}const Wa={position:"absolute",left:"18px",right:"18px",bottom:"18px",padding:"12px 14px",borderRadius:"18px",background:"rgba(255,255,255,0.86)",color:"#203041",fontSize:"13px",lineHeight:"1.35",border:"1px solid rgba(32,48,65,0.08)",boxShadow:"0 10px 24px rgba(90,112,132,0.12)",backdropFilter:"blur(12px)",opacity:"0",transform:"translateY(8px)",transition:"opacity 140ms ease, transform 140ms ease",pointerEvents:"none",zIndex:"2"};function Ve(t){try{return new URL(t,document.baseURI).href}catch{return t}}class za{constructor(e){this.id="module",this.frameEl=null,this.stageEl=null,this.placeholderEl=null,this.bubbleEl=null,this.controller=null,this.disposed=!1,this.pending={},this.options=e}async mount(e){const a=e.host;a.innerHTML="";const i=document.createElement("div");i.className="ks-module-avatar",Object.assign(i.style,{position:"relative",width:"100%",height:"100%",overflow:"hidden",borderRadius:"24px"});const s=document.createElement("div");s.className="ks-module-avatar-stage",Object.assign(s.style,{position:"absolute",inset:"0"});const n=document.createElement("div");n.className="ks-module-avatar-placeholder",n.textContent=this.options.alt||this.options.manifest.name||"Avatar",Object.assign(n.style,{position:"absolute",inset:"18px",display:"grid",placeItems:"center",borderRadius:"20px",color:"rgba(32,48,65,0.6)",fontSize:"14px",letterSpacing:"0.08em",textTransform:"uppercase",backgroundPosition:"center bottom",backgroundRepeat:"no-repeat",backgroundSize:"contain",transition:"opacity 300ms ease",pointerEvents:"none"});const o=document.createElement("div");o.className="ks-module-avatar-bubble",Object.assign(o.style,Wa),i.append(s,n,o),a.append(i),this.frameEl=i,this.stageEl=s,this.placeholderEl=n,this.bubbleEl=o;const l=Ve((this.options.manifest.assetRoot||e.assetRoot).replace(/\/*$/,"/"));this.load(l)}async load(e){var n;const a=this.options.manifest,i=a.entry||"",s=this.frameEl;try{if(!i)throw new Error("Avatar manifest has no `entry` module.");const o=Ve(i),d=await(this.options.importModule||(r=>import(r)))(o);if(typeof(d==null?void 0:d.createAvatar)!="function")throw new Error(`Avatar module ${o} does not export createAvatar().`);const h=await d.createAvatar({host:this.stageEl,assetRoot:e,resolveAsset:r=>new URL(r.replace(/^\.?\//,""),e).href,manifest:a});if(this.disposed){await((n=h==null?void 0:h.dispose)==null?void 0:n.call(h));return}this.controller=h,this.placeholderEl&&(this.placeholderEl.style.opacity="0"),s&&(s.dataset.ready="true"),await this.flush()}catch(o){console.warn("Avatar module failed to load",o),s&&(s.dataset.ready="error"),this.placeholderEl&&a.fallbackPortrait&&(this.placeholderEl.textContent="",this.placeholderEl.style.backgroundImage=`url("${Ve(a.fallbackPortrait)}")`)}}async flush(){const{state:e,cue:a,preset:i,bubble:s}=this.pending;this.pending={},e&&await this.setState(e),a&&await this.setCue(a),i&&await this.setViewPreset(i),s&&await this.showBubble(s[0],s[1])}async dispose(){var a,i;this.disposed=!0;const e=this.controller;this.controller=null,await((a=e==null?void 0:e.dispose)==null?void 0:a.call(e)),(i=this.frameEl)==null||i.remove(),this.frameEl=null,this.stageEl=null,this.placeholderEl=null,this.bubbleEl=null}async setState(e){var a,i;if(this.frameEl&&(this.frameEl.dataset.online=e.online===!1?"false":"true"),!this.controller){this.pending.state=e;return}await((i=(a=this.controller).setState)==null?void 0:i.call(a,e))}async setCue(e){var a,i;if(!this.controller){this.pending.cue=e;return}await((i=(a=this.controller).setCue)==null?void 0:i.call(a,e))}async setViewPreset(e){var a,i;if(this.frameEl&&(this.frameEl.dataset.preset=e),!this.controller){this.pending.preset=e;return}await((i=(a=this.controller).setViewPreset)==null?void 0:i.call(a,e))}async showBubble(e,a){var s;if((s=this.controller)!=null&&s.showBubble){await this.controller.showBubble(e,a);return}if(this.controller||(this.pending.bubble=[e,a]),!this.bubbleEl)return;const i=String(e||"").trim();this.bubbleEl.textContent=i,this.bubbleEl.style.opacity=i?"1":"0",this.bubbleEl.style.transform=i?"translateY(0)":"translateY(8px)"}getCapabilities(){var e;return{...this.options.manifest.capabilities,...((e=this.controller)==null?void 0:e.capabilities)||{}}}}function Ga(t){return new za(t)}function qa(){return typeof window>"u"?[]:[window,window.parent,window.top].filter(Boolean)}function Dt(){var t;for(const e of qa())try{const a=(t=e==null?void 0:e.document)==null?void 0:t.querySelector("home-assistant"),i=a==null?void 0:a.hass;if(i!=null&&i.states)return i}catch{continue}return null}function Ka(){if(typeof window>"u"||!window.localStorage)return"";try{const t=window.localStorage.getItem("hassTokens");if(!t)return"";const e=JSON.parse(t);return c(e==null?void 0:e.access_token,4096)}catch{return""}}function Ja(t){if(!Array.isArray(t))return null;const e={};for(const a of t){if(!a||typeof a!="object")continue;const i=c(a.entity_id,255);i&&(e[i]=a)}return e}function Ya(t,e,a="Assistant"){const i=t[e.status],s=t[e.message],n=t[e.online],o=t[e.busy],l=t[e.source],d=t[e.updatedAt],h=e.emotion?t[e.emotion]:null,r=e.activity?t[e.activity]:null,S=e.cue?t[e.cue]:null,C=e.speaking?t[e.speaking]:null,x=e.intensity?t[e.intensity]:null,b=e.motion?t[e.motion]:null,$=t[e.revision];if(!i&&!s&&!n&&!o)return null;const k=c(i==null?void 0:i.state,72),L=c(s==null?void 0:s.state,220),T=c(d==null?void 0:d.state,64),j=We(n,!0),Y=We(o,!1),A=c(r==null?void 0:r.state,32)||"",O=We(C)??A==="speaking",B=A||(j?O?"speaking":Y?"thinking":"idle":"offline");return Ne({version:1,assistant:c(a,40)||"Assistant",online:j,busy:Y,status:k&&k!=="unknown"&&k!=="unavailable"?k:"",message:L&&L!=="unknown"&&L!=="unavailable"?L:"",source:c(l==null?void 0:l.state,64)||"ha",updatedAt:T&&T!=="unknown"&&T!=="unavailable"?T:(i==null?void 0:i.last_changed)||new Date().toISOString(),emotion:c(h==null?void 0:h.state,32)||null,activity:B,cue:c(S==null?void 0:S.state,32)||null,intensity:ei(x),speaking:O,motion:c(b==null?void 0:b.state,32)||null,revision:Number($==null?void 0:$.state)||0})}const Za=["full","torso","head"];function Xa(t){const e=c(t==null?void 0:t.state,16).toLowerCase();return Za.includes(e)?e:null}function Qa(t,e){const a=e.viewPreset?t[e.viewPreset]:null,i=e.pageMode?t[e.pageMode]:null,s=e.pageTarget?t[e.pageTarget]:null,n=e.pageUntil?t[e.pageUntil]:null,o=e.cue?t[e.cue]:null,l=e.emotion?t[e.emotion]:null,d=e.motion?t[e.motion]:null,h=e.cueUntil?t[e.cueUntil]:null,r=e.revision?t[e.revision]:null;if(!a&&!i&&!s&&!o&&!l&&!d)return null;const S=c(s==null?void 0:s.state,40)||null,C=c(n==null?void 0:n.state,64)||null,x=c(i==null?void 0:i.state,16).toLowerCase(),b=x==="auto"?"auto":x==="pinned"||S||C?"pinned":"auto";return Fe({...ue,revision:Number(r==null?void 0:r.state)||0,viewPreset:Xa(a),page:{mode:b,target:b==="pinned"?S:null,until:b==="pinned"?C:null},cue:{cue:c(o==null?void 0:o.state,32)||null,emotion:c(l==null?void 0:l.state,32)||null,motion:c(d==null?void 0:d.state,32)||null,until:c(h==null?void 0:h.state,64)||null}})}function We(t,e){const a=c(t==null?void 0:t.state,16).toLowerCase();return a?["on","true","yes","open","home","1"].includes(a)?!0:["off","false","no","closed","not_home","0"].includes(a)?!1:e:e}function ei(t){const e=c(t==null?void 0:t.state,32);if(!e)return null;const a=Number(e);return Number.isFinite(a)?Math.max(0,Math.min(1,a)):null}function Nt(t={}){const e=t.fetchImpl??globalThis.fetch,a=Math.max(500,t.cacheTtlMs??2500),i=Math.max(6e4,t.authCooldownMs??600*1e3),s=c(t.apiUrl,4096);let n=null,o=0,l=null,d=0;async function h(){var b;const r=Dt();if(r!=null&&r.states)return r.states;const S=Date.now();if(n&&S-o<a||!s&&!t.allowApiFallback||typeof e!="function"||S<d)return n;if(l)return l;const C=s?"":c(((b=t.readToken)==null?void 0:b.call(t))??Ka(),4096);if(!s&&!C)return n;const x={};return C&&(x.Authorization=`Bearer ${C}`),l=tt(e,s||"/api/states",{cache:"no-store",headers:x}).then(async $=>{if(!$.ok){const k=new Error(`HA states HTTP ${$.status}`);throw k.status=$.status,k}return $.json()}).then($=>{const k=Ja($);return k&&(n=k,o=Date.now()),k||n}).catch($=>{var k;return(k=t.onError)==null||k.call(t,$),(($==null?void 0:$.status)===401||($==null?void 0:$.status)===403)&&(d=Date.now()+i),n}).finally(()=>{l=null}),l}return{id:"ha-states",async read(){return h()}}}function ti(t){const e=new Error(`HTTP ${t}`);return e.status=t,e}async function rt(t){var s;const e=t.fetchImpl??globalThis.fetch;if(typeof e!="function")throw new Error("Fetch API is not available for JSON provider.");const a=c(t.url,2048);if(!a)throw new Error("JSON provider URL is empty.");const i=new URL(a,typeof window<"u"?window.location.href:"http://localhost/");i.searchParams.set(t.timestampParam||"ts",String(Date.now()));try{const n=await tt(e,i.toString(),{cache:"no-store"});if(!n.ok)throw ti(n.status);const o=await n.json();return t.sanitize?t.sanitize(o):o}catch(n){if((s=t.onError)==null||s.call(t,n),t.defaultValue!==void 0)return t.defaultValue;throw n}}function ai(t){return{id:"json-state",async read(){const e=await rt({...t,defaultValue:t.defaultValue});return Ne(e)}}}function ii(t){return{id:"json-control",async read(){const e=await rt({...t,defaultValue:t.defaultValue??ue});return Fe(e)}}}function ri(t){return{id:"json-lines",async read(){const e=await rt({...t,defaultValue:t.defaultValue??[]});return Array.isArray(e)?e.map(a=>c(a,220)).filter(Boolean):[]}}}function y(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const mt={en:{card:"Card",staticCard:"static card",clear:"Clear",pendingTasks:"pending tasks",on:"On",off:"Off",deviceState:"device state",batteryLevel:"battery level",throughput:"throughput",nextEvent:"next event",percent:"state percentage",numeric:"numeric value",entityState:"entity state",todoCount:t=>`${t} item${t===1?"":"s"}`,nothingPending:"nothing pending"},ru:{card:"Карточка",staticCard:"статичная карточка",clear:"Нет дел",pendingTasks:"ожидают",on:"Вкл",off:"Выкл",deviceState:"состояние устройства",batteryLevel:"заряд",throughput:"скорость",nextEvent:"следующее событие",percent:"процент",numeric:"число",entityState:"состояние сущности",todoCount:t=>`${t} шт.`,nothingPending:"ничего не осталось"}};function si(t){return t.toLowerCase().startsWith("ru")?mt.ru:mt.en}function z(t,e,a=64){return c(t[e],a)}function me(t,e=0,a="en-US"){const i=Number(t);return Number.isFinite(i)?i.toLocaleString(a,{minimumFractionDigits:e,maximumFractionDigits:e}):""}function ni(t,e="en-US"){const a=c(t,64);if(!a)return"";const i=new Date(a);return Number.isNaN(i.getTime())?a:i.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function Ae(t,e){return!t||!e?null:t[e]||null}function oi(t,e=null,a="en-US"){var C,x,b,$;const i=si(a),s=z(t,"caption",40)||z(t,"type",24)||i.card,n=z(t,"hint",72),o=z(t,"type",32).toLowerCase()||"entity",l=z(t,"entity",255),d=Ae(e,l),h=Ae(e,z(t,"stateEntity",255)),r=Ae(e,z(t,"downEntity",255)),S=Ae(e,z(t,"upEntity",255));if(o==="text"||o==="static"||o==="note")return{caption:s,value:z(t,"value",64)||"—",hint:n||i.staticCard};if(o==="todo"){const k=Number(d==null?void 0:d.state);return!Number.isFinite(k)||k<=0?{caption:s,value:i.clear,hint:n||i.nothingPending}:{caption:s,value:i.todoCount(k),hint:n||i.pendingTasks}}if(o==="onoff"){const k=(d==null?void 0:d.state)==="on";return{caption:s,value:k?z(t,"onText",48)||i.on:z(t,"offText",48)||i.off,hint:n||i.deviceState}}if(o==="battery"){const k=me(d==null?void 0:d.state,0,a);return{caption:s,value:k?`${k}%`:"—",hint:c(h==null?void 0:h.state,48)||n||i.batteryLevel}}if(o==="network"){const k=me(r==null?void 0:r.state,0,a),L=me(S==null?void 0:S.state,0,a);return{caption:s,value:k||L?`↓ ${k||"0"} · ↑ ${L||"0"}`:"—",hint:n||i.throughput}}if(o==="time")return{caption:s,value:ni(d==null?void 0:d.state,a)||"—",hint:n||i.nextEvent};if(o==="percent"){const k=me(d==null?void 0:d.state,Number(z(t,"digits",4))||0,a);return{caption:s,value:k?`${k}%`:"—",hint:n||c((C=d==null?void 0:d.attributes)==null?void 0:C.friendly_name,48)||i.percent}}if(o==="number"){const k=Number(z(t,"digits",4))||0,L=me(d==null?void 0:d.state,k,a),T=z(t,"unit",16)||c((x=d==null?void 0:d.attributes)==null?void 0:x.unit_of_measurement,16);return{caption:s,value:L?`${L}${T?` ${T}`:""}`:"—",hint:n||c((b=d==null?void 0:d.attributes)==null?void 0:b.friendly_name,48)||i.numeric}}return{caption:s,value:c(d==null?void 0:d.state,64)||z(t,"value",64)||"—",hint:n||c(($=d==null?void 0:d.attributes)==null?void 0:$.friendly_name,48)||i.entityState}}function Bt(t,e=null,a="en-US"){return Array.isArray(t)?t.map(i=>oi(i,e,a)):[]}const be={title:"Weather",location:"Saint Petersburg",todayCaption:"Today",todayValue:"Today",todayLabel:"Wednesday",updatedCaption:"Updated",updatedAt:"07:20",temperature:"3",unit:"C",condition:"Bright sky with high cloud cover",feelsLike:"Feels like 1 C and stays calm through the morning.",badgeSummary:"Current snapshot",badgeRange:"Today and next 5 days",metrics:{humidity:"61%",pressure:"1017 hPa",wind:"12 km/h",clouds:"38%"},forecastTitle:"Weekly rhythm",forecast:[{name:"thu",dayNumber:"07",monthShort:"mar",note:"partly cloudy",max:"4 C",min:"-1 C",icon:"./assets/cloud-sun.svg"},{name:"fri",dayNumber:"08",monthShort:"mar",note:"light rain",max:"5 C",min:"0 C",icon:"./assets/cloud-rain.svg"},{name:"sat",dayNumber:"09",monthShort:"mar",note:"clear break",max:"6 C",min:"1 C",icon:"./assets/sun.svg"},{name:"sun",dayNumber:"10",monthShort:"mar",note:"steady clouds",max:"4 C",min:"0 C",icon:"./assets/cloud.svg"},{name:"mon",dayNumber:"11",monthShort:"mar",note:"soft showers",max:"5 C",min:"2 C",icon:"./assets/cloud-rain.svg"}]};function ze(t){return{...be,...t||{},metrics:{...be.metrics,...(t==null?void 0:t.metrics)||{}},forecast:Array.isArray(t==null?void 0:t.forecast)?t.forecast.map(e=>({...e})):be.forecast.map(e=>({...e}))}}function vt(t,e){return e?{...t,...e,metrics:{...t.metrics||{},...e.metrics||{}},forecast:Array.isArray(e.forecast)&&e.forecast.length?e.forecast.map(a=>({...a})):t.forecast||[]}:t}function J(t,e=0){const a=Number(t);if(!Number.isFinite(a))return"--";const i=Math.max(0,e);return a.toLocaleString("ru-RU",{minimumFractionDigits:e>0?e:0,maximumFractionDigits:i})}function li(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=c(e,24).toLowerCase();return i==="mmhg"||i==="мм рт. ст."?`${J(a)} мм рт. ст.`:`${J(a*.750061683,0)} мм рт. ст.`}function di(t,e){const a=Number(t);if(!Number.isFinite(a))return"--";const i=c(e,24).toLowerCase();return i==="m/s"||i==="м/с"?`${J(a,1)} м/с`:i==="km/h"||i==="км/ч"?`${J(a/3.6,1)} м/с`:`${J(a,1)} м/с`}function ci(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--:--":a.toLocaleTimeString(e,{hour:"2-digit",minute:"2-digit"})}function ui(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{day:"numeric",month:"long"})}function pi(t,e="ru-RU"){const a=new Date(String(t||""));return Number.isNaN(a.getTime())?"--":a.toLocaleDateString(e,{weekday:"long"})}function fi(t,e="ru-RU"){const a=c(t,64).toLowerCase();return a?e.startsWith("ru")?{"clear-night":"Ясная ночь",cloudy:"Облачно",exceptional:"Экстремально",fog:"Туман",hail:"Град",lightning:"Гроза","lightning-rainy":"Гроза с дождем",partlycloudy:"Переменная облачность",pouring:"Ливень",rainy:"Дождь",snowy:"Снег","snowy-rainy":"Снег с дождем",sunny:"Ясно",windy:"Ветрено","windy-variant":"Ветрено"}[a]||c(t,64):a:e.startsWith("ru")?"Неизвестно":"Unknown"}function bt(t,e="ru-RU"){const a=Number(t);return Number.isFinite(a)?e.startsWith("ru")?a===0?"Ясно":[1,2].includes(a)?"Переменная облачность":a===3?"Пасмурно":[45,48].includes(a)?"Туман":[51,53,55,56,57,61,63,65,66,67,80,81,82].includes(a)?"Морось":[71,73,75,77,85,86].includes(a)?"Снег":[95,96,99].includes(a)?"Гроза":"Облачно":a===0?"Clear":[1,2].includes(a)?"Partly cloudy":a===3?"Cloudy":[45,48].includes(a)?"Fog":[51,53,55,61,63,65,80,81,82].includes(a)?"Rain":[71,73,75,77,85,86].includes(a)?"Snow":[95,96,99].includes(a)?"Thunderstorm":"Cloudy":e.startsWith("ru")?"Облачно":"Cloudy"}function hi(t,e="./assets/icons"){const a=Number(t),i=Je(e);return a===0?`${i}sun.svg`:[1,2].includes(a)?`${i}cloud-sun.svg`:[3].includes(a)?`${i}cloud.svg`:[45,48].includes(a)?`${i}cloud-fog.svg`:[51,53,55,61,63,65,80,81,82].includes(a)?`${i}cloud-rain.svg`:[71,73,75,77,85,86].includes(a)?`${i}cloud-snow.svg`:[95,96,99].includes(a)?`${i}cloud-lightning.svg`:`${i}cloud.svg`}function gi(t){const e=c(t.locale,32)||"ru-RU",a=c(t.iconBaseUrl,1024)||"./assets/icons",i=Nt({allowApiFallback:t.allowApiFallback,apiUrl:t.apiUrl,fetchImpl:t.fetchImpl});return async()=>{var b,$,k,L,T,j,Y,A,W,O,B,we,Se,xe,$e,ke,Ce,Ie,Pe,ge;const s=await i.read(),n=t.fetchImpl??globalThis.fetch,o=s==null?void 0:s[t.weatherEntity];let l=null;const d=c(t.openMeteoUrl,4096);if(d&&typeof n=="function")try{const f=await n(`${d}${d.includes("?")?"&":"?"}ts=${Date.now()}`,{cache:"no-store"});f.ok&&(l=await f.json())}catch{l=null}if(!o&&!(l!=null&&l.current))return null;const h=c(o==null?void 0:o.last_changed,64)||c((b=l==null?void 0:l.current)==null?void 0:b.time,64)||new Date().toISOString(),r=o?fi(o.state,e):bt(($=l==null?void 0:l.current)==null?void 0:$.weather_code,e),S=Array.isArray((k=l==null?void 0:l.daily)==null?void 0:k.time)?l.daily.time.map((f,u)=>{var g,P,U,R,E;const p=new Date(`${f}T12:00:00`);return{name:p.toLocaleDateString(e,{weekday:"short"}),dayNumber:p.toLocaleDateString(e,{day:"numeric"}),monthShort:p.toLocaleDateString(e,{month:"short"}),note:c(bt((g=l.daily.weather_code)==null?void 0:g[u],e),28),max:`${J((P=l.daily.temperature_2m_max)==null?void 0:P[u])}°`,min:`${J((U=l.daily.temperature_2m_min)==null?void 0:U[u])}° · ${J((R=l.daily.precipitation_probability_max)==null?void 0:R[u])}%`,icon:hi((E=l.daily.weather_code)==null?void 0:E[u],a)}}):[],C=S[0]||null,x=S.slice(1,6);return{title:e.startsWith("ru")?"Погода":"Weather",todayCaption:e.startsWith("ru")?"Сегодня":"Today",updatedCaption:e.startsWith("ru")?"Обновлено":"Updated",forecastTitle:e.startsWith("ru")?"Недельный ритм":"Weekly rhythm",todayValue:ui(new Date().toISOString(),e),todayLabel:pi(new Date().toISOString(),e),updatedAt:ci(h,e),temperature:J(((L=o==null?void 0:o.attributes)==null?void 0:L.temperature)??((T=l==null?void 0:l.current)==null?void 0:T.temperature_2m),1),condition:r,feelsLike:`${e.startsWith("ru")?"Ощущается как":"Feels like"} ${J(((j=o==null?void 0:o.attributes)==null?void 0:j.apparent_temperature)??((Y=l==null?void 0:l.current)==null?void 0:Y.apparent_temperature)??((A=o==null?void 0:o.attributes)==null?void 0:A.temperature),1)}°C`,badgeSummary:r,badgeRange:C?`${C.max} / ${J((O=(W=l==null?void 0:l.daily)==null?void 0:W.temperature_2m_min)==null?void 0:O[0])}° ${e.startsWith("ru")?"сегодня":"today"}`:void 0,metrics:{humidity:`${J(((B=o==null?void 0:o.attributes)==null?void 0:B.humidity)??((we=l==null?void 0:l.current)==null?void 0:we.relative_humidity_2m))}%`,pressure:li(((Se=o==null?void 0:o.attributes)==null?void 0:Se.pressure)??((xe=l==null?void 0:l.current)==null?void 0:xe.surface_pressure),(($e=o==null?void 0:o.attributes)==null?void 0:$e.pressure_unit)??"hPa"),wind:di(((ke=o==null?void 0:o.attributes)==null?void 0:ke.wind_speed)??((Ce=l==null?void 0:l.current)==null?void 0:Ce.wind_speed_10m),((Ie=o==null?void 0:o.attributes)==null?void 0:Ie.wind_speed_unit)??"km/h"),clouds:`${J(((Pe=o==null?void 0:o.attributes)==null?void 0:Pe.cloud_coverage)??((ge=l==null?void 0:l.current)==null?void 0:ge.cloud_cover))}%`},forecast:x}}}function mi(t){return t.kind==="overview"?"slide slide-overview":t.kind==="app"?"slide slide-dynamic slide-app":"slide slide-dynamic"}function vi(t,e,a){return c(e.title,64)||c(e.id,64)||`${t.labels.pageStamp} ${a+1}`}function Ft(t){return`
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
    `}function bi(t){const e=t.weather.forecast||[];if(!e.length)return t.labels.forecastRangeFallback;const a=e[0],i=e[e.length-1];return`${c(a.dayNumber,4)} ${c(a.monthShort,8)} → ${c(i.dayNumber,4)} ${c(i.monthShort,8)}`}function yi(t,e){const a=c(t.assistantName,40)||"Assistant",i=t.weather||be,s=i.forecast.slice(0,5).map(o=>Ft(o)).join(""),{labels:n}=t;return`
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
        </div>`}function Ot(t,e,a,i,s=""){const n=c(e.widget,96);return`
          <article class="${i} widget-card" ${s?`style="${s}"`:""} data-scene-card-index="${a}" data-scene-page-id="${y(t.id)}" data-widget-slot data-widget-id="${y(n)}"></article>
        `}function Ht(t){return(t==null?void 0:t.type)==="widget"&&!!c(t.widget,96)}function _t(t,e,a,i,s,n=""){const o=n?` style="${n}"`:"";return s?`
          <article class="mini-card"${o} data-scene-card-index="${a}" data-scene-page-id="${y(e.id)}">
            <span class="caption">${y(t.caption)}</span>
            <strong>${y(t.value)}</strong>
          </article>
        `:`
          <article class="${i}"${o} data-scene-card-index="${a}" data-scene-page-id="${y(e.id)}">
            <span class="caption">${y(t.caption)}</span>
            <strong>${y(t.value)}</strong>
            <small>${y(t.hint)}</small>
          </article>
        `}function jt(t,e,a,i,s){const n=vi(t,e,a),o=c(e.subtitle,140);return`
          <div class="slide-top">
            <div>
              <h1 class="headline">${y(n)}</h1>
              ${o?`<p class="subline">${y(o)}</p>`:""}
            </div>
            <div class="stamp compact-stamp">
              <span class="caption">${y(i)}</span>
              <span class="value">${y(s)}</span>
            </div>
          </div>`}function wi(t,e,a,i){const s=e.cards||[],n=Bt(s,t.states,t.locale),o=e.cardStyle==="mini",l=c(e.stampCaption,24)||(e.kind==="forecast+cards"?t.labels.rangeStamp:t.labels.pageStamp),d=c(e.stampValue,32)||(e.kind==="forecast+cards"?bi(t):`${a+1} / ${i}`),h=n.map((C,x)=>Ht(s[x])?Ot(e,s[x],x,o?"mini-card":"home-card"):_t(C,e,x,"home-card",o)).join(""),r=e.kind==="forecast+cards"?`<div class="dynamic-forecast-grid">${t.weather.forecast.slice(0,5).map(C=>Ft(C)).join("")}</div>`:"",S=o?"dynamic-cards-grid is-mini":"dynamic-cards-grid is-full";return`
        <div class="dynamic-slide slide-body" data-dynamic-layout="${y(e.kind)}" data-dynamic-card-style="${y(e.cardStyle||"full")}">
          ${jt(t,e,a,l,d)}
          ${r}
          <div class="${S}">
            ${h||`<div class="empty">${y(t.labels.noCardsConfigured)}</div>`}
          </div>
        </div>`}function Ue(t,e,a,i){const s=Math.trunc(Number(t));return Number.isFinite(s)?Math.min(a,Math.max(e,s)):i}function Si(t,e,a,i){const s=e.cards||[],n=Bt(s,t.states,t.locale),o=Ue(e.gridColumns,1,12,4),l=Ue(e.gridRows,1,12,3),d=c(e.stampCaption,24)||t.labels.pageStamp,h=c(e.stampValue,32)||`${a+1} / ${i}`,r=n.map((S,C)=>{const x=s[C]||{},b=Math.trunc(Number(x.col)),$=Math.trunc(Number(x.row)),k=Ue(x.w,1,24,1),L=Ue(x.h,1,24,1),j=Number.isFinite(b)&&Number.isFinite($)&&b>=0&&$>=0&&b<100&&$<100?`grid-column: ${b+1} / span ${k}; grid-row: ${$+1} / span ${L};`:"";return Ht(x)?Ot(e,x,C,"grid-card",j):_t(S,e,C,"grid-card",!1,j)}).join("");return`
        <div class="dynamic-slide slide-body" data-dynamic-layout="grid">
          ${jt(t,e,a,d,h)}
          <div class="grid-cards-container" style="--grid-cols: ${o}; --grid-rows: ${l};">
            ${r||`<div class="empty">${y(t.labels.noCardsConfigured)}</div>`}
          </div>
        </div>`}function xi(){return'<div class="app-slide slide-body" data-app-host></div>'}const yt="input, textarea, select, [contenteditable=''], [contenteditable='true']";function $i(t){const e=t==null?void 0:t.status;return typeof e!="number"||e>=500}class ki{constructor(e,a={}){v(this,"root");v(this,"options");v(this,"avatarMountEl");v(this,"carouselShellEl");v(this,"carouselTrackEl");v(this,"dotsEl");v(this,"staleEl");v(this,"presetButtons");v(this,"copy");v(this,"labels");v(this,"presetLabels");v(this,"rendererConfig");v(this,"avatarManifest");v(this,"sceneConfig");v(this,"sceneRuntimeConfig");v(this,"entityMap",null);v(this,"controlEntityMap",null);v(this,"haStatesReader",null);v(this,"weatherData");v(this,"hassStates",null);v(this,"currentState");v(this,"remoteControl",ue);v(this,"uiControl",{});v(this,"currentControl",ue);v(this,"idleLines",[]);v(this,"activeIndex",0);v(this,"lastAutoRotateAt",0);v(this,"currentIdleLine","");v(this,"lastIdleIndex",-1);v(this,"currentPreset","full");v(this,"idleTimer",null);v(this,"avatarAdapter",null);v(this,"refreshIntervalHandle",null);v(this,"lastWeatherRefreshAt",0);v(this,"weatherRefreshInFlight",null);v(this,"orderedPages",[]);v(this,"carouselDragState",null);v(this,"disposed",!1);v(this,"initialized",!1);v(this,"inFlightRefresh",null);v(this,"refreshQueued",!1);v(this,"onVisibilityChange",()=>{document.hidden||(this.refreshWeatherIfStale(0),this.refreshNow())});v(this,"unsubscribeRegistry",null);v(this,"serviceRunner",null);v(this,"cycleConnectivityFailures",0);v(this,"consecutiveFailedCycles",0);v(this,"slides",new Map);v(this,"dotsSignature","");v(this,"lastInteractionAt",0);v(this,"lastRenderedActiveIndex",-1);v(this,"extensionRuntime",null);this.root=e,this.options=a,this.copy={...Yt,...a.copy||{}},this.labels={...Zt,...a.labels||{}},this.presetLabels={...Xt,...a.presetLabels||{}},this.weatherData=ze(a.defaultWeather),this.root.innerHTML=`
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
    `,this.avatarMountEl=this.requireEl("[data-avatar-mount]"),this.carouselShellEl=this.requireEl("[data-carousel-shell]"),this.carouselTrackEl=this.requireEl("[data-carousel-track]"),this.dotsEl=this.requireEl("[data-dots]"),this.staleEl=this.requireEl("[data-stale-badge]"),this.presetButtons=Array.from(this.root.querySelectorAll("[data-avatar-preset]"))}async init(){if(this.initialized||this.disposed)return;this.initialized=!0;const e=G(window.location.href,this.getRendererConfigUrl()),a=ct(e),i=Ye(await this.readJson(e)),s=l=>l?G(a,l):void 0,n=Ye({...i,links:Object.fromEntries(Object.entries(i.links||{}).map(([l,d])=>[l,G(a,d)])),avatar:{...i.avatar,manifestUrl:G(a,i.avatar.manifestUrl)},scene:{...i.scene,configUrl:G(a,i.scene.configUrl)},state:{...i.state,stateUrl:G(a,i.state.stateUrl),apiUrl:s(i.state.apiUrl),idleLinesUrl:G(a,i.state.idleLinesUrl||"./idle-lines.json"),entityMapUrl:s(i.state.entityMapUrl)},control:{...i.control,controlUrl:G(a,i.control.controlUrl),apiUrl:s(i.control.apiUrl),entityMapUrl:s(i.control.entityMapUrl)}});this.rendererConfig=n;const o=this.rendererConfig.avatar.manifestUrl;this.avatarManifest=this.resolveAvatarManifestUrls(at(await this.readJson(o)),o),this.sceneConfig=await this.readJson(this.rendererConfig.scene.configUrl),this.sceneRuntimeConfig=Ia(this.sceneConfig),this.entityMap=await this.readEntityMap(),this.controlEntityMap=await this.readControlEntityMap(),this.haStatesReader=this.createHaStatesReader(),this.idleLines=await ri({url:this.rendererConfig.state.idleLinesUrl||G(a,"./idle-lines.json"),defaultValue:[]}).read(),this.weatherData=await this.readWeatherData(),this.lastWeatherRefreshAt=Date.now(),this.currentState=await this.readAssistantState(),this.hassStates=await this.readSceneStates(),this.remoteControl=await this.readRemoteControl(),this.currentControl=pt(this.remoteControl,this.uiControl),!this.disposed&&(this.options.extensions&&(this.extensionRuntime=Qt({registry:this.options.extensions,mode:"kiosk",locale:this.rendererConfig.assistant.locale||"en-US",resolveUrl:l=>G(window.location.href,l),navigate:l=>this.pinPageById(l),refresh:()=>void this.refreshNow()}),this.serviceRunner=new ea(this.options.extensions,"kiosk",this.extensionRuntime,(l,d)=>{console.warn(`Extension service ${l} failed`,d)}),this.serviceRunner.start(),this.unsubscribeRegistry=this.options.extensions.onChange(()=>{for(const l of this.slides.values())l.signature="";this.refreshNow()})),!this.disposed&&(this.avatarAdapter=this.createAvatarAdapter(),await this.avatarAdapter.mount({host:this.avatarMountEl,assetRoot:this.avatarManifest.assetRoot}),this.bindPresetControls(),this.bindCarouselControls(),this.syncPresetButtonsFromManifest(),this.lastAutoRotateAt=Date.now(),await this.refreshNow(),this.refreshIntervalHandle=window.setInterval(()=>{document.hidden||this.refreshNow()},this.options.refreshIntervalMs??3e3),document.addEventListener("visibilitychange",this.onVisibilityChange)))}async dispose(){var e,a,i;if(!this.disposed){this.disposed=!0,this.refreshIntervalHandle&&(window.clearInterval(this.refreshIntervalHandle),this.refreshIntervalHandle=null),this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null),document.removeEventListener("visibilitychange",this.onVisibilityChange),(e=this.unsubscribeRegistry)==null||e.call(this),this.unsubscribeRegistry=null,(a=this.serviceRunner)==null||a.stop(),this.serviceRunner=null;for(const s of Array.from(this.slides.values()))this.discardSlide(s);this.slides.clear(),await((i=this.avatarAdapter)==null?void 0:i.dispose()),this.avatarAdapter=null,this.weatherRefreshInFlight=null}}refreshNow(){return this.disposed?Promise.resolve():this.inFlightRefresh?(this.refreshQueued=!0,this.inFlightRefresh):(this.inFlightRefresh=(async()=>{try{do{this.refreshQueued=!1;try{await this.runRefreshCycle()}catch(e){console.warn("Scene refresh failed",e)}}while(this.refreshQueued&&!this.disposed)}finally{this.inFlightRefresh=null}})(),this.inFlightRefresh)}getRendererConfigUrl(){return c(this.options.rendererConfigUrl,1024)||"./renderer.config.json"}getWeatherUrl(){return c(this.options.weatherUrl,1024)||"./weather.json"}bindPresetControls(){for(const e of this.presetButtons)e.addEventListener("click",()=>{const a=e.dataset.avatarPreset;this.uiControl={...this.uiControl,...ma(a||"full")},this.refreshNow()})}noteInteraction(){this.lastInteractionAt=Date.now()}isUserInteracting(){const e=this.options.interactionHoldMs??45e3;if(Date.now()-this.lastInteractionAt<e)return!0;const a=document.activeElement;return a instanceof Element&&this.carouselShellEl.contains(a)&&a.matches(yt)}bindCarouselControls(){this.carouselShellEl.addEventListener("keydown",a=>{if(this.noteInteraction(),!(a.target instanceof Element&&a.target.matches(yt))){if(a.key==="ArrowLeft"){a.preventDefault(),this.stepPage(-1);return}a.key==="ArrowRight"&&(a.preventDefault(),this.stepPage(1))}}),this.carouselShellEl.addEventListener("focusin",()=>this.noteInteraction()),this.dotsEl.addEventListener("click",a=>{const i=a.target instanceof Element?a.target.closest("[data-slide-index]"):null;i&&(this.noteInteraction(),this.pinPageByIndex(Number(i.dataset.slideIndex)||0))}),this.carouselShellEl.addEventListener("pointerdown",a=>{var i,s;this.noteInteraction(),!(a.button!==0||this.orderedPages.length<2||this.isCarouselInteractiveTarget(a.target))&&(this.carouselDragState={pointerId:a.pointerId,startX:a.clientX,startY:a.clientY,deltaX:0,deltaY:0,locked:!1},(s=(i=this.carouselShellEl).setPointerCapture)==null||s.call(i,a.pointerId))}),this.carouselShellEl.addEventListener("pointermove",a=>{if(!(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)){if(this.carouselDragState.deltaX=a.clientX-this.carouselDragState.startX,this.carouselDragState.deltaY=a.clientY-this.carouselDragState.startY,!this.carouselDragState.locked){if(Math.abs(this.carouselDragState.deltaX)<10)return;if(Math.abs(this.carouselDragState.deltaY)>Math.abs(this.carouselDragState.deltaX)){this.clearDragState(a.pointerId,!1);return}this.carouselDragState.locked=!0,this.carouselShellEl.classList.add("is-dragging")}a.preventDefault(),this.updateCarouselPosition({instant:!0,dragOffsetPx:this.carouselDragState.deltaX})}});const e=a=>{if(!this.carouselDragState||a.pointerId!==this.carouselDragState.pointerId)return;const{locked:i,deltaX:s}=this.carouselDragState,n=this.carouselShellEl.clientWidth||1,o=i&&Math.abs(s)>=n*.16,l=s<0?1:-1;if(this.clearDragState(a.pointerId,!1),o){this.stepPage(l);return}this.updateCarouselPosition()};this.carouselShellEl.addEventListener("pointerup",e),this.carouselShellEl.addEventListener("pointercancel",e),this.carouselShellEl.addEventListener("lostpointercapture",e)}refreshWeatherIfStale(e=600*1e3){if(this.weatherRefreshInFlight)return this.weatherRefreshInFlight;if(Date.now()-this.lastWeatherRefreshAt<e)return Promise.resolve();const a=(async()=>{try{this.weatherData=await this.readWeatherData(),this.lastWeatherRefreshAt=Date.now()}catch{}})();return this.weatherRefreshInFlight=a,a.finally(()=>{this.weatherRefreshInFlight===a&&(this.weatherRefreshInFlight=null)}),a}async runRefreshCycle(){this.cycleConnectivityFailures=0,await Promise.race([this.refreshWeatherIfStale(),new Promise(h=>setTimeout(h,3e3))]);const[e,a,i]=await Promise.all([this.readAssistantState(),this.readSceneStates(),this.readRemoteControl(this.currentControl)]);if(this.disposed)return;this.currentState=e,this.hassStates=a,this.remoteControl=i,this.updateDataHealth(),this.uiControl=ba(this.uiControl),this.currentControl=pt(this.remoteControl,this.uiControl);const s=At(this.currentState,this.currentControl);this.syncIdleMonologue(s);const n=ta(s,{idleMonologue:this.currentIdleLine,copy:this.copy}),o=this.sceneRuntimeConfig;this.applyDisplayConfig(o);const l=o.pages;this.isUserInteracting()&&this.currentControl.page.mode!=="pinned"&&(this.lastAutoRotateAt=Date.now());const d=Ua({control:this.currentControl,rotation:o.rotation,activeIndex:this.activeIndex,lastAutoRotateAt:this.lastAutoRotateAt,force:!1,isEligible:h=>l.some(r=>r.id===h)});this.activeIndex=d.nextIndex,this.lastAutoRotateAt=d.nextAutoRotateAt,this.currentPreset=this.currentControl.viewPreset||this.currentPreset||"full",this.updatePresetButtons(),this.renderCarousel(l,n),await this.pushAvatarState(n)}async pushAvatarState(e){const a=this.avatarAdapter;if(!a)return;const i=async(o,l)=>{try{await l()}catch(d){console.warn(`Avatar adapter ${o} failed`,d)}};await i("setState",()=>a.setState(e.state)),await i("setCue",()=>a.setCue(this.currentControl.cue)),await i("setViewPreset",()=>a.setViewPreset(this.currentPreset));const s=!!c(e.state.message,180),n=a.getCapabilities().rendersStateMessage===!0;await i("showBubble",()=>a.showBubble(s&&n?"":e.body,{ttlMs:0,speak:!1,typewriter:!1}))}updateDataHealth(){this.cycleConnectivityFailures>0?this.consecutiveFailedCycles+=1:this.consecutiveFailedCycles=0;const e=this.consecutiveFailedCycles>=(this.options.staleAfterFailures??2);this.staleEl.hidden=!e,this.root.dataset.stale=e?"true":"false"}recordProviderFailure(e){$i(e)&&(this.cycleConnectivityFailures+=1)}renderContext(){return{labels:this.labels,locale:this.rendererConfig.assistant.locale||"en-US",assistantName:this.rendererConfig.assistant.name,weather:this.weatherData||be,states:this.hassStates,iconUrl:e=>this.resolveIconUrl(e)}}renderCarousel(e,a){this.orderedPages=e.slice();const i=this.renderContext(),s=new Set;e.forEach((n,o)=>{s.add(n.id);let l=this.slides.get(n.id);if(l&&l.kind!==n.kind&&(this.discardSlide(l),l.el.remove(),this.slides.delete(n.id),l=void 0),!l){const d=document.createElement("section");d.dataset.slideId=n.id,d.dataset.scenePageId=n.id,l={pageId:n.id,kind:n.kind,el:d,signature:"\0",views:[],widgets:new Map,generation:0,appPropsKey:""},this.slides.set(n.id,l)}if(l.el.className=mi(n),l.el.dataset.slideOrder=String(o),n.kind==="app")this.syncAppSlide(l,n);else{const d=n.kind==="overview"?yi(i,a):n.kind==="grid"?Si(i,n,o,e.length):wi(i,n,o,e.length);this.applySlideHtml(l,d,n)}});for(const[n,o]of Array.from(this.slides.entries()))s.has(n)||(this.discardSlide(o),o.el.remove(),this.slides.delete(n));e.forEach((n,o)=>{var d;const l=(d=this.slides.get(n.id))==null?void 0:d.el;l&&this.carouselTrackEl.children[o]!==l&&this.carouselTrackEl.insertBefore(l,this.carouselTrackEl.children[o]??null)}),this.updateCarouselPosition(),this.renderDots(e),this.notifyActiveSlide(e)}applySlideHtml(e,a,i){var n,o,l;if(e.signature===a)return;e.signature=a;const s=e.widgets;e.widgets=new Map,e.el.innerHTML=a;for(const d of Array.from(e.el.querySelectorAll("[data-widget-slot]"))){const h=Number(d.dataset.sceneCardIndex),r=(n=i.cards)==null?void 0:n[h],S=c(r==null?void 0:r.widget,96),C=(r==null?void 0:r.props)??{},x=JSON.stringify(C),b=s.get(h);if(b&&!b.failed&&b.widgetId===S){if(b.key!==x){try{(l=(o=b.view)==null?void 0:o.update)==null||l.call(o,C)}catch(k){console.warn(`Widget ${S} update failed`,k)}b.key=x}for(const{name:k,value:L}of Array.from(d.attributes))b.slot.setAttribute(k,L);d.replaceWith(b.slot),e.widgets.set(h,b),s.delete(h);continue}const $={widgetId:S,key:x,slot:d,view:null,failed:!1,disposed:!1};e.widgets.set(h,$),this.mountWidget($,C)}for(const d of s.values())this.disposeWidget(d)}syncAppSlide(e,a){var x;const i=c(a.app,96),s=JSON.stringify(a.props??{}),n=this.options.extensions,o=i&&n?n.getPage(i):null,l=!!(o&&o.modes.includes("kiosk")),d=`app:${i}:${l?"ok":"missing"}`;if(e.signature===d){if(e.appPropsKey!==s){e.appPropsKey=s;for(const b of e.views)(x=b.update)==null||x.call(b,a.props??{})}return}if(this.disposeViews(e),e.signature=d,e.appPropsKey=s,!n||!l||!o||!this.extensionRuntime){e.el.innerHTML=`
        <div class="app-slide slide-body">
          <div class="slide-top"><div><h1 class="headline">${y(c(a.title,64)||i)}</h1></div></div>
          <div class="empty">${y(this.labels.extensionUnavailable)}${i?` (${y(i)})`:""}</div>
        </div>`;return}e.el.innerHTML=xi();const h=e.el.querySelector("[data-app-host]");if(!h)return;const r=e.generation,S=n.ownerOf(i),C=S?this.extensionRuntime.forExtension(S):this.extensionRuntime;(async()=>{try{const b=await o.mount(h,a.props??{},C);if(e.generation!==r||this.disposed){b.dispose();return}e.views.push(b)}catch(b){e.generation===r&&(h.textContent=this.labels.extensionUnavailable),console.warn(`Extension page ${i} failed to mount`,b)}})()}async mountWidget(e,a){const i=this.options.extensions,s=e.widgetId?i==null?void 0:i.getWidget(e.widgetId):null;if(!i||!s||!this.extensionRuntime){e.failed=!0,e.slot.classList.add("is-unavailable"),e.slot.textContent=this.labels.extensionUnavailable;return}try{const n=i.ownerOf(e.widgetId),o=n?this.extensionRuntime.forExtension(n):this.extensionRuntime,l=await s.mount(e.slot,a,o);if(e.disposed||this.disposed){l.dispose();return}e.view=l}catch(n){e.disposed||(e.failed=!0,e.slot.classList.add("is-unavailable"),e.slot.textContent=this.labels.extensionUnavailable),console.warn(`Widget ${e.widgetId} failed to mount`,n)}}disposeWidget(e){var a;e.disposed=!0;try{(a=e.view)==null||a.dispose()}catch(i){console.warn("Widget dispose failed",i)}e.view=null}disposeViews(e){e.generation+=1;for(const a of e.widgets.values())this.disposeWidget(a);e.widgets.clear();for(const a of e.views.splice(0))try{a.dispose()}catch(i){console.warn("Extension view dispose failed",i)}}discardSlide(e){this.disposeViews(e)}renderDots(e){const a=e.map((i,s)=>`${s}:${i.id}:${c(i.title,40)}`).join("|");a!==this.dotsSignature&&(this.dotsSignature=a,this.dotsEl.innerHTML=e.map((i,s)=>`
      <button
        class="carousel-dot"
        type="button"
        data-slide-index="${s}"
        data-scene-page-id="${y(i.id)}"
        aria-label="${y(c(i.title,40)||c(i.id,40)||`${this.labels.pageStamp} ${s+1}`)}"
      ></button>
    `).join("")),this.updateDotState()}notifyActiveSlide(e){this.lastRenderedActiveIndex!==this.activeIndex&&(this.lastRenderedActiveIndex=this.activeIndex,e.forEach((a,i)=>{var o;const s=(o=this.slides.get(a.id))==null?void 0:o.el;if(!s)return;const n=i===this.activeIndex;s.dataset.active=n?"true":"false",s.dispatchEvent(new CustomEvent("ks-active-change",{detail:{active:n}}))}))}resolveIconUrl(e){var s;const a=c((s=this.options.iconUrls)==null?void 0:s[e],1024);return a||`${Je(c(this.options.iconBaseUrl,1024)||"./assets")}${aa[e]}`}applyDisplayConfig(e){const{safeAreaPx:a,layoutPaddingPx:i,layoutGapPx:s,globalScale:n}=e.display;this.root.style.setProperty("--scene-safe-top",`${a.top}px`),this.root.style.setProperty("--scene-safe-right",`${a.right}px`),this.root.style.setProperty("--scene-safe-bottom",`${a.bottom}px`),this.root.style.setProperty("--scene-safe-left",`${a.left}px`),this.root.style.setProperty("--scene-layout-padding",`${i}px`),this.root.style.setProperty("--scene-layout-gap",`${s}px`),this.root.style.setProperty("--scene-global-scale",String(n))}updateCarouselPosition(e){const a=this.carouselShellEl.clientWidth||1,i=-(this.activeIndex*a)+Math.round((e==null?void 0:e.dragOffsetPx)||0);this.carouselTrackEl.style.transition=e!=null&&e.instant?"none":"",this.carouselTrackEl.style.transform=`translate3d(${i}px, 0, 0)`}updateDotState(){for(const e of Array.from(this.dotsEl.querySelectorAll("[data-slide-index]"))){const a=Number(e.dataset.slideIndex)===this.activeIndex;e.classList.toggle("is-active",a),a?e.setAttribute("aria-current","true"):e.removeAttribute("aria-current")}}isCarouselInteractiveTarget(e){return e instanceof Element?!!e.closest("button, a, input, select, textarea, label, [data-no-swipe], [contenteditable]"):!1}clearDragState(e,a){var i,s;!a&&((s=(i=this.carouselShellEl).hasPointerCapture)!=null&&s.call(i,e))&&this.carouselShellEl.releasePointerCapture(e),this.carouselDragState=null,this.carouselShellEl.classList.remove("is-dragging")}stepPage(e){if(this.orderedPages.length<2)return;const a=Aa(this.sceneRuntimeConfig.rotation,this.activeIndex,e,i=>this.orderedPages.some(s=>s.id===i));this.pinPageByIndex(a)}pinPageById(e){const a=this.orderedPages.findIndex(i=>i.app===e||i.id===e);a>=0&&this.pinPageByIndex(a)}pinPageByIndex(e){const a=this.orderedPages.length?this.orderedPages:this.sceneRuntimeConfig.pages,i=a[e];if(!i)return;const s=Math.max(18e3,this.sceneRuntimeConfig.rotation.defaultDwellMs*2);this.uiControl={...this.uiControl,...va(i.id,s)},this.activeIndex=e,this.lastAutoRotateAt=Date.now(),this.updateCarouselPosition(),this.updateDotState(),this.notifyActiveSlide(a),this.refreshNow()}syncIdleMonologue(e){if(!Ra(e)){this.currentIdleLine="",this.idleTimer&&(window.clearTimeout(this.idleTimer),this.idleTimer=null);return}if(!this.currentIdleLine){const a=ft(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index}!this.idleTimer&&!this.disposed&&(this.idleTimer=window.setTimeout(()=>{this.idleTimer=null;const a=ft(this.idleLines,this.lastIdleIndex);this.currentIdleLine=a.line,this.lastIdleIndex=a.index,this.refreshNow()},Ta(18e3,18e3)))}requireEl(e){const a=this.root.querySelector(e);if(!a)throw new Error(`Missing element: ${e}`);return a}async readJson(e){const a=await tt(fetch,e,{cache:"no-store"});if(!a.ok){const i=new Error(`Failed to load ${e}: HTTP ${a.status}`);throw i.status=a.status,i}return a.json()}async readEntityMap(){return this.rendererConfig.state.provider!=="ha"||!this.rendererConfig.state.entityMapUrl?null:this.readJson(this.rendererConfig.state.entityMapUrl)}async readControlEntityMap(){return this.rendererConfig.control.provider!=="ha"||!this.rendererConfig.control.entityMapUrl?null:this.readJson(this.rendererConfig.control.entityMapUrl)}createHaStatesReader(){return this.rendererConfig.state.provider!=="ha"?null:Nt({allowApiFallback:this.rendererConfig.state.haApiFallback===!0,apiUrl:this.rendererConfig.state.apiUrl||this.rendererConfig.control.apiUrl,onError:e=>this.recordProviderFailure(e)})}async readAssistantState(){const e=async()=>ai({url:this.rendererConfig.state.stateUrl,defaultValue:this.currentState??ia,onError:i=>this.recordProviderFailure(i)}).read();if(this.rendererConfig.state.provider!=="ha"||!this.entityMap||!this.haStatesReader)return e();const a=await this.haStatesReader.read();return Ya(a||{},this.entityMap,this.rendererConfig.assistant.name)||e()}async readSceneStates(){return this.haStatesReader?this.haStatesReader.read():null}async readRemoteControl(e=ue){const a=async()=>ii({url:this.rendererConfig.control.controlUrl,defaultValue:e,onError:s=>this.recordProviderFailure(s)}).read();if(this.rendererConfig.control.provider!=="ha"||!this.controlEntityMap||!this.haStatesReader)return a();const i=await this.haStatesReader.read();return Qa(i||{},this.controlEntityMap)||a()}async readWeatherData(){let e={...this.options.defaultWeather||{}};try{const a=await this.readJson(this.getWeatherUrl());e=vt(e,a)}catch{}if(this.options.weatherReader)try{const a=await this.options.weatherReader();e=vt(e,a)}catch{}try{return ze(e)}catch{return ze(this.options.defaultWeather)}}resolveAvatarManifestUrls(e,a){const i=ct(a),s=G(i,c(e.assetRoot,1024)||"./assets"),n=s?Je(s):i,o=l=>{const d=c(l,1024);return d?G(n,d):""};return{...e,assetRoot:s,runtimeUrl:G(i,e.runtimeUrl||""),entry:o(e.entry||""),modelUrl:o(e.modelUrl||""),fallbackPortrait:o(e.fallbackPortrait||""),motionMapUrl:o(e.motionMapUrl||""),expressionMapUrl:o(e.expressionMapUrl||""),presetThumbs:Object.fromEntries(Object.entries(e.presetThumbs||{}).map(([l,d])=>[l,G(i,d)]).filter(([,l])=>!!l))}}createAvatarAdapter(){var a,i;const e=(i=(a=this.options).avatarAdapterFactory)==null?void 0:i.call(a,{manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(e)return e;if(this.avatarManifest.adapter==="live2d")return Ha({manifest:this.avatarManifest,rendererConfig:this.rendererConfig});if(this.avatarManifest.adapter==="module")return Ga({manifest:this.avatarManifest,alt:this.rendererConfig.assistant.name||"Assistant"});if(this.avatarManifest.adapter==="unity-webgl")throw new Error("Unity WebGL adapter is not implemented in the browser shell yet.");return Va({alt:this.rendererConfig.assistant.name||"Assistant",imageUrl:this.avatarManifest.modelUrl||this.avatarManifest.entry||void 0,fallbackImageUrl:this.avatarManifest.fallbackPortrait||void 0})}syncPresetButtonsFromManifest(){var e;for(const a of this.presetButtons){const i=a.dataset.avatarPreset||"",s=a.querySelector("[data-preset-thumb]"),n=(e=this.avatarManifest.presetThumbs)==null?void 0:e[i];a.classList.toggle("is-active",i===this.currentPreset),s&&(n?(s.src=n,s.removeAttribute("hidden")):(s.src="",s.setAttribute("hidden","hidden")))}}updatePresetButtons(){for(const e of this.presetButtons)e.classList.toggle("is-active",e.dataset.avatarPreset===this.currentPreset)}}async function Ci(t,e={}){const a=new ki(t,e);return await a.init(),a}function Ii(t){const e=document.activeElement,a=e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement?e:null;let i=null,s=null;if(a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement)try{i=a.selectionStart,s=a.selectionEnd}catch{}return{id:a&&t.contains(a)?a.id:"",selectionStart:i,selectionEnd:s,scrollTop:t.scrollTop,pageScrollY:window.scrollY}}function Pi(t,e){if(e.id){const a=typeof CSS<"u"&&typeof CSS.escape=="function"?`#${CSS.escape(e.id)}`:`#${e.id}`,i=t.querySelector(a);if(i&&(i.focus({preventScroll:!0}),e.selectionStart!==null&&(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement)))try{i.setSelectionRange(e.selectionStart,e.selectionEnd??e.selectionStart)}catch{}}t.scrollTop=e.scrollTop,window.scrollTo(0,e.pageScrollY)}const Ei=["overview","cards","forecast+cards","grid"],Ai=["full","mini"],Vt=["entity","text","todo","onoff","battery","network","time","percent","number"],ee=["caption","hint"],Te="/local/live2d/",wt="/scene-legacy/live2d/",he={"X-Scene-Client":"editor"},Ui={ru:{entity:"Одна сущность с кратким состоянием.",text:"Ручной текстовый блок без привязки.",todo:"Список дел или одна задача из HA.",onoff:"Переключатель с подписями Вкл/Выкл.",battery:"Заряд и отдельное состояние батареи.",network:"Скорость down/up для сети.",time:"Время или timestamp из HA.",percent:"Процентное значение с округлением.",number:"Число с единицей измерения."},en:{entity:"Single entity with a compact state.",text:"Manual text block without HA binding.",todo:"Task list or a single HA task.",onoff:"Switch card with on/off labels.",battery:"Battery value with a secondary state.",network:"Network throughput with down/up.",time:"Time or timestamp from HA.",percent:"Percentage value with rounding.",number:"Numeric value with unit."}},Ti={ru:{title:"Редактор сцены",subtitle:t=>`Пакет: ${t||"default"} · Живое превью сцены и полный дашборд настроек`,previewTitle:"Превью дисплея",previewSubtitle:"Сверху показывается превью выбранного экрана с правильными пропорциями. Оно автоматически вмещается по ширине редактора.",previewDisplay:"Экран для проверки",previewResolution:"Разрешение",dashboardTitle:"Панель настройки сцены",dashboardSubtitle:"Вся настройка расположена ниже превью как длинная редакторская страница.",statusLoading:"Загружаю конфигурацию сцены...",statusSaved:"Сохранено",statusDirty:"Есть несохранённые изменения",statusFailed:"Ошибка",viewOnly:"Только просмотр",save:"Сохранить",saving:"Сохраняю...",addPage:"+ Страница",avatar:"Аватар",avatarSubtitle:"Здесь выбирается модель для текущей сцены. Встроенный аватар остаётся доступен всегда, а новые модели добавляются ZIP-архивами и потом выбираются в этом списке.",avatarPack:"Набор аватара",avatarPackCurrent:"встроенная модель сцены",avatarPackHint:"Выбранная модель применяется после сохранения. После импорта ZIP новый аватар появляется в каталоге ниже и его можно сразу выбрать.",avatarPackEmpty:"Сейчас в каталоге только встроенный аватар сцены. Загрузите ZIP-архив ниже, чтобы добавить новый аватар.",avatarPackAppliedAfterSave:"Смена модели применяется после сохранения и перезагрузки превью.",avatarPackDefaultTile:"Встроенная модель сцены",avatarPackDefaultHint:"Использовать модель, которая уже лежит внутри текущего scene-pack.",avatarPackSelect:"Использовать",avatarPackSelected:"Текущий выбор",avatarPackDelete:"Удалить",avatarPackDeleteConfirm:t=>`Удалить аватар «${t}»? Это действие нельзя отменить.`,avatarPackMotionCount:t=>`${t} анимац.`,avatarCapabilityMotion:"Анимации",avatarCapabilityEmotion:"Эмоции",avatarCapabilityLipSync:"Липсинк",avatarCapabilityViewPresets:"Ракурсы",avatarCapabilityPointerFocus:"Фокус",avatarImport:"Импорт аватара",avatarImportHint:"После выбора ZIP импорт запускается сразу: архив распаковывается, находится model3.json, создаётся avatar-pack и черновик motion-map.",avatarImportSelect:"ZIP-архив Live2D-модели",avatarImportNotSelected:"Файл не выбран",avatarImportSelected:t=>`Выбран архив: ${t}`,avatarImportChooseButton:"Выбрать ZIP",avatarImporting:"Импортирую avatar-pack...",avatarImportSuccess:t=>`Импортирован avatar-pack: ${t}`,avatarImportError:"Не удалось импортировать avatar-pack",avatarMapping:"Маппинг анимаций",avatarMappingSubtitle:"Здесь задаётся, какие движения модель использует для внешних команд runtime/OpenClaw.",avatarMappingEmpty:"У встроенной модели нет отдельного motion-map редактора.",avatarMappingLoading:"Загружаю motion-map avatar-pack...",avatarMappingLoadError:"Не удалось загрузить motion-map avatar-pack",avatarMappingSaveError:"Не удалось сохранить motion-map avatar-pack",avatarMappingMotion:"Движение",avatarMappingSaveHint:"Изменения в motion-map сохраняются общей кнопкой «Сохранить» сверху вместе с конфигом сцены.",avatarMotionNone:"Не назначено",avatarSemanticIdle:"Ожидание",avatarSemanticTouch:"Касание",avatarSemanticReplySoft:"Мягкий ответ",avatarSemanticThink:"Размышление",avatarSemanticBusy:"Занята",avatarSemanticCalm:"Спокойствие",avatarSemanticHappy:"Радость",avatarSemanticSurprise:"Удивление",avatarSemanticWarning:"Предупреждение",avatarSemanticGreet:"Приветствие",avatarSemanticSpeaking:"Речь",pages:"Страницы",pageOrderHint:"Страницы можно перетаскивать; этот порядок используется каруселью справа.",pageKind:"Тип",pageCards:t=>`${t} карточ${t===1?"ка":t<5?"ки":"ек"}`,inspector:"Инспектор",pageSettings:"Выбранная страница",displaySettings:"Экран и масштаб",displaySubtitle:"Только safe area, внутренние отступы и общий масштаб. Профиль сверху меняет само превью автоматически.",cards:"Карточки",cardOrderHint:"Карточки тоже можно перетаскивать. Их порядок сразу отражается в выбранной странице справа.",cardsSubtitle:"Сначала добавь шаблон, затем выбери карточку прямо в превью или на ленте ниже и настрой её.",cardInspector:"Настройка карточки",cardInspectorEmpty:"Добавь карточку или выбери её прямо в превью либо на ленте карточек.",cardTemplates:"Шаблоны карточек",cardType:"Тип карточки",noCards:"На странице пока нет карточек",addCard:"+ Карточка",bindFromHa:"HA",remove:"Удалить",up:"Левее",down:"Правее",loadError:"Не удалось загрузить конфиг сцены",saveError:"Не удалось сохранить конфиг сцены",kindOverview:"Обзор",kindCards:"Карточки",kindForecastCards:"Прогноз + карточки",kindGrid:"Сетка",fieldGridColumns:"Столбцы",fieldGridRows:"Строки",fieldCardCol:"Столбец",fieldCardRow:"Строка",fieldCardW:"Ширина",fieldCardH:"Высота",fieldPageId:"ID страницы",fieldTitle:"Заголовок",fieldSubtitle:"Подзаголовок",fieldKind:"Тип страницы",fieldSlot:"Слот",fieldCardStyle:"Стиль карточек",fieldStampCaption:"Подпись штампа",fieldStampValue:"Значение штампа",fieldDisplaySafeTop:"Безопасная зона сверху",fieldDisplaySafeRight:"Безопасная зона справа",fieldDisplaySafeBottom:"Безопасная зона снизу",fieldDisplaySafeLeft:"Безопасная зона слева",fieldDisplayPadding:"Внутренний отступ layout",fieldDisplayGap:"Промежуток между панелями",fieldDisplayScale:"Общий масштаб сцены",fieldCardCaption:"Подпись",fieldCardHint:"Подсказка",fieldCardEntity:"Сущность",fieldCardValue:"Текст / значение",fieldCardOnText:"Текст Вкл",fieldCardOffText:"Текст Выкл",fieldCardStateEntity:"Сущность состояния",fieldCardDownEntity:"Сущность down",fieldCardUpEntity:"Сущность up",fieldCardDigits:"Знаков после запятой",fieldCardUnit:"Единица измерения",styleFull:"Крупные",styleMini:"Мини",cardEntity:"Сущность",cardText:"Текст",cardTodo:"Список задач",cardOnOff:"Вкл / выкл",cardBattery:"Батарея",cardNetwork:"Сеть",cardTime:"Время",cardPercent:"Процент",cardNumber:"Число",homeAssistant:"Привязка Home Assistant",entitySearch:"Поиск сущностей",entityBindingTargets:"Куда привязывать",entityBinding:"Связать с полем",entityBindingEmpty:"Кликни в поле Сущность / State / Down / Up у карточки, потом выбери сущность здесь.",entityBindingNoTargets:"У этой карточки нет полей для привязки к Home Assistant.",entityBindingActive:(t,e)=>`Сейчас связываем: ${t} → ${e}`,previewSelectPage:"Клик по превью выбирает страницу",previewSelectCard:"Клик по карточке в превью выбирает её в инспекторе",noEntities:"Сущности Home Assistant пока недоступны",useEntity:"Использовать",tabCards:"Карточки",tabAvatar:"Аватар",tabDisplay:"Дисплей",pageSettingsLabel:"Настройки страницы"},en:{title:"Scene Editor",subtitle:t=>`Pack: ${t||"default"} · Live scene preview with a full settings dashboard`,previewTitle:"Display Preview",previewSubtitle:"The top stage previews the selected screen with the correct aspect ratio. It automatically fits the available editor width.",previewDisplay:"Screen profile",previewResolution:"Resolution",dashboardTitle:"Scene Settings Dashboard",dashboardSubtitle:"All configuration lives below the preview as a normal scrollable page.",statusLoading:"Loading scene config...",statusSaved:"Saved",statusDirty:"Unsaved changes",statusFailed:"Error",viewOnly:"View Only",save:"Save",saving:"Saving...",addPage:"+ Page",avatar:"Avatar",avatarSubtitle:"Choose the model for this scene. The bundled avatar always stays available, and new avatars are added from ZIP archives and then selected from this list.",avatarPack:"Avatar pack",avatarPackCurrent:"bundled scene model",avatarPackHint:"The selected model applies after saving. After ZIP import, the new avatar appears here and can be selected immediately.",avatarPackEmpty:"Only the bundled scene avatar is in the catalog right now. Upload a ZIP archive below to add another avatar.",avatarPackAppliedAfterSave:"Model switch applies after saving and reloading the preview.",avatarPackDefaultTile:"Bundled scene model",avatarPackDefaultHint:"Use the model that is already bundled with the active scene-pack.",avatarPackSelect:"Use avatar",avatarPackSelected:"Current selection",avatarPackDelete:"Delete",avatarPackDeleteConfirm:t=>`Delete avatar "${t}"? This cannot be undone.`,avatarPackMotionCount:t=>`${t} motions`,avatarCapabilityMotion:"Motion",avatarCapabilityEmotion:"Emotion",avatarCapabilityLipSync:"LipSync",avatarCapabilityViewPresets:"View presets",avatarCapabilityPointerFocus:"Pointer focus",avatarImport:"Import avatar",avatarImportHint:"Import starts immediately after ZIP selection: the archive is unpacked, model3.json is detected, and a draft motion map is created.",avatarImportSelect:"Choose avatar ZIP",avatarImportNotSelected:"No file selected",avatarImportSelected:t=>`Selected archive: ${t}`,avatarImportChooseButton:"Choose ZIP",avatarImporting:"Importing avatar pack...",avatarImportSuccess:t=>`Imported avatar pack: ${t}`,avatarImportError:"Failed to import avatar pack",avatarMapping:"Animation mapping",avatarMappingSubtitle:"Map external runtime/OpenClaw commands to actual model motions.",avatarMappingEmpty:"The bundled scene model does not have a separate motion-map editor.",avatarMappingLoading:"Loading avatar pack motion map...",avatarMappingLoadError:"Failed to load avatar pack motion map",avatarMappingSaveError:"Failed to save avatar pack motion map",avatarMappingMotion:"Motion",avatarMappingSaveHint:"Motion-map changes are saved by the main Save button together with the scene config.",avatarMotionNone:"Not assigned",avatarSemanticIdle:"Idle",avatarSemanticTouch:"Touch",avatarSemanticReplySoft:"Reply soft",avatarSemanticThink:"Think",avatarSemanticBusy:"Busy",avatarSemanticCalm:"Calm",avatarSemanticHappy:"Happy",avatarSemanticSurprise:"Surprise",avatarSemanticWarning:"Warning",avatarSemanticGreet:"Greet",avatarSemanticSpeaking:"Speaking",pages:"Pages",pageOrderHint:"Pages can be dragged around; this order is used by the carousel on the right.",pageKind:"Kind",pageCards:t=>`${t} cards`,inspector:"Inspector",pageSettings:"Selected page",displaySettings:"Screen and scale",displaySubtitle:"Only safe area, inner spacing and global scale live here. The screen profile above already drives the preview.",cards:"Cards",cardOrderHint:"Cards can also be dragged. Their order is reflected on the selected page immediately.",cardsSubtitle:"Add a template, then choose the card directly in the preview or in the rail below and edit it.",cardInspector:"Card inspector",cardInspectorEmpty:"Add a card or choose it directly from the preview or the card rail.",cardTemplates:"Card templates",cardType:"Card type",noCards:"No cards on this page yet",addCard:"+ Card",bindFromHa:"HA",remove:"Remove",up:"Left",down:"Right",loadError:"Failed to load scene config",saveError:"Failed to save scene config",kindOverview:"overview",kindCards:"cards",kindForecastCards:"forecast+cards",kindGrid:"Grid",fieldGridColumns:"Columns",fieldGridRows:"Rows",fieldCardCol:"Column",fieldCardRow:"Row",fieldCardW:"Width",fieldCardH:"Height",fieldPageId:"Page ID",fieldTitle:"Title",fieldSubtitle:"Subtitle",fieldKind:"Page kind",fieldSlot:"Slot",fieldCardStyle:"Card style",fieldStampCaption:"Stamp caption",fieldStampValue:"Stamp value",fieldDisplaySafeTop:"Safe area top",fieldDisplaySafeRight:"Safe area right",fieldDisplaySafeBottom:"Safe area bottom",fieldDisplaySafeLeft:"Safe area left",fieldDisplayPadding:"Layout padding",fieldDisplayGap:"Layout gap",fieldDisplayScale:"Global scene scale",fieldCardCaption:"Caption",fieldCardHint:"Hint",fieldCardEntity:"Entity",fieldCardValue:"Text / value",fieldCardOnText:"On text",fieldCardOffText:"Off text",fieldCardStateEntity:"State entity",fieldCardDownEntity:"Down entity",fieldCardUpEntity:"Up entity",fieldCardDigits:"Digits",fieldCardUnit:"Unit",styleFull:"full",styleMini:"mini",cardEntity:"entity",cardText:"text",cardTodo:"todo",cardOnOff:"onoff",cardBattery:"battery",cardNetwork:"network",cardTime:"time",cardPercent:"percent",cardNumber:"number",homeAssistant:"Home Assistant binding",entitySearch:"Search entities",entityBindingTargets:"Binding target",entityBinding:"Bind into field",entityBindingEmpty:"Click an Entity / State / Down / Up field on a card, then choose an entity here.",entityBindingNoTargets:"This card has no Home Assistant binding fields.",entityBindingActive:(t,e)=>`Binding now: ${t} → ${e}`,previewSelectPage:"Click the preview to select a page",previewSelectCard:"Click a card in the preview to inspect it",noEntities:"Home Assistant entities are not available yet",useEntity:"Use",tabCards:"Cards",tabAvatar:"Avatar",tabDisplay:"Display",pageSettingsLabel:"Page settings"}},Ri=[{key:"idle",labelKey:"avatarSemanticIdle"},{key:"touch",labelKey:"avatarSemanticTouch"},{key:"reply_soft",labelKey:"avatarSemanticReplySoft"},{key:"think",labelKey:"avatarSemanticThink"},{key:"busy",labelKey:"avatarSemanticBusy"},{key:"calm",labelKey:"avatarSemanticCalm"},{key:"happy",labelKey:"avatarSemanticHappy"},{key:"surprise",labelKey:"avatarSemanticSurprise"},{key:"warning",labelKey:"avatarSemanticWarning"},{key:"greet",labelKey:"avatarSemanticGreet"},{key:"speaking",labelKey:"avatarSemanticSpeaking"}],Li=4*1024*1024,Mi=192*1024,De=[{id:"mellow-fly-7",width:1024,height:600,label:{ru:'Mellow Fly 7" · 1024×600',en:'Mellow Fly 7" · 1024x600'},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:16,layoutGapPx:16,globalScale:1}},{id:"hdmi-1080p",width:1920,height:1080,label:{ru:"HDMI дисплей 1920×1080",en:"HDMI display 1920x1080"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"tv-1366",width:1366,height:768,label:{ru:"ТВ панель 1366×768",en:"TV panel 1366x768"},displayDefaults:{safeTop:8,safeRight:12,safeBottom:12,safeLeft:12,layoutPaddingPx:18,layoutGapPx:18,globalScale:.98}},{id:"hdmi-1440p",width:2560,height:1440,label:{ru:"Монитор 2560×1440",en:"Monitor 2560x1440"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:24,layoutGapPx:24,globalScale:1}},{id:"display-4k",width:3840,height:2160,label:{ru:"4K дисплей 3840×2160",en:"4K display 3840x2160"},displayDefaults:{safeTop:0,safeRight:0,safeBottom:0,safeLeft:0,layoutPaddingPx:32,layoutGapPx:32,globalScale:1}},{id:"portrait-1080",width:1080,height:1920,label:{ru:"Portrait 1080×1920",en:"Portrait 1080x1920"},displayDefaults:{safeTop:8,safeRight:8,safeBottom:8,safeLeft:8,layoutPaddingPx:16,layoutGapPx:16,globalScale:.96}}],Xe="mellow-fly-7";function pe(){return String(navigator.language||"").toLowerCase().startsWith("ru")?"ru":"en"}function Di(t){return De.find(e=>e.id===t)||De.find(e=>e.id===Xe)||De[0]}function Ni(t){return`${t.width} × ${t.height}`}function m(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function st(t){return JSON.parse(JSON.stringify(t))}function Z(t){const e=new Map(t.pages.map(s=>[s.id,s])),a=t.rotation.order.map(s=>e.get(s)).filter(Boolean),i=t.pages.filter(s=>!a.some(n=>n.id===s.id));return[...a,...i]}function Bi(t,e){return e?Math.max(0,Z(t).findIndex(a=>a.id===e)):0}function Fi(t){return String(t||"").toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-+|-+$/g,"").slice(0,40)||"page"}function Wt(t,e){const a=Fi(e);let i=a,s=2;for(;t.pages.some(n=>n.id===i);)i=`${a}-${s}`,s+=1;return i}function Oi(t){const e=t.pages.length+1,a=pe()==="ru";return{id:Wt(t,`page-${e}`),kind:"cards",title:a?`Новая страница ${e}`:`New Page ${e}`,subtitle:"",slot:e-1,cardStyle:"mini",stampCaption:a?"Страница":"Page",stampValue:`${e} / ${e}`,cards:[]}}function Ge(t){const e=pe()==="ru";switch(t){case"text":return{type:t,caption:e?"Текст":"Text",value:"—",hint:""};case"todo":return{type:t,caption:e?"Задачи":"Todo",entity:"",hint:""};case"onoff":return{type:t,caption:e?"Переключатель":"Switch",entity:"",hint:"",onText:e?"Вкл":"On",offText:e?"Выкл":"Off"};case"battery":return{type:t,caption:e?"Батарея":"Battery",entity:"",stateEntity:"",hint:""};case"network":return{type:t,caption:e?"Сеть":"Network",downEntity:"",upEntity:"",hint:""};case"time":return{type:t,caption:e?"Время":"Time",entity:"",hint:""};case"percent":return{type:t,caption:e?"Процент":"Percent",entity:"",digits:0,hint:""};case"number":return{type:t,caption:e?"Значение":"Number",entity:"",digits:0,unit:"",hint:""};default:return{type:"entity",caption:e?"Сущность":"Entity",entity:"",hint:""}}}function F(t,e){const a=t[e];return a==null?"":String(a)}function ae(t,e){const a=t[e];return a==null?"":String(a)}function se(t,e){const a=t.display||{},i=a.safeArea||{};switch(e){case"safeTop":return String(Number.isFinite(Number(i.top))?Number(i.top):0);case"safeRight":return String(Number.isFinite(Number(i.right))?Number(i.right):0);case"safeBottom":return String(Number.isFinite(Number(i.bottom))?Number(i.bottom):0);case"safeLeft":return String(Number.isFinite(Number(i.left))?Number(i.left):0);case"layoutPaddingPx":return String(Number.isFinite(Number(a.layoutPaddingPx))?Number(a.layoutPaddingPx):16);case"layoutGapPx":return String(Number.isFinite(Number(a.layoutGapPx))?Number(a.layoutGapPx):16);case"globalScale":return String(Number.isFinite(Number(a.globalScale))?Number(a.globalScale):1);default:return""}}function Hi(t){return t.display||(t.display={}),t.display.safeArea||(t.display.safeArea={}),t.display}function Re(t){var a;return String(((a=t.avatar)==null?void 0:a.packId)||"").trim()}function qe(t){return t.avatar||(t.avatar={}),t.avatar}function _i(t){const e=document.querySelector(`.carousel-dot[data-slide-index="${t}"]`);e==null||e.click()}function ji(t){const e=new URL(window.location.href);t?e.searchParams.set("editorPage",t):e.searchParams.delete("editorPage"),window.history.replaceState({},"",e)}function Vi(t){var i;const a=new URL(window.location.href).searchParams.get("editorPage");return a&&Z(t).some(s=>s.id===a)?a:((i=Z(t)[0])==null?void 0:i.id)||null}async function St(t){const e=await fetch(t,{cache:"no-store",headers:he}),a=await e.json();if(!e.ok||a.success===!1||!a.config||!a.packId)throw new Error(`GET ${t} failed: HTTP ${e.status}`);return{config:st(a.config),packId:a.packId}}async function Wi(t,e,a){const i=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",...he},body:JSON.stringify({config:e,expectedPackId:a})}),s=await i.json();if(i.status===409)throw new Error(s.error||"Active scene changed. Reload the editor before saving.");if(!i.ok||s.success===!1||!s.config)throw new Error(`POST ${t} failed: HTTP ${i.status}`);return st(s.config)}function nt(t){switch(t){case"text":return[...ee,"value"];case"todo":return[...ee,"entity"];case"onoff":return[...ee,"entity","onText","offText"];case"battery":return[...ee,"entity","stateEntity"];case"network":return[...ee,"downEntity","upEntity"];case"time":return[...ee,"entity"];case"percent":return[...ee,"entity","digits"];case"number":return[...ee,"entity","digits","unit"];default:return[...ee,"entity"]}}function xt(t,e){return e==="cards"?t.kindCards:e==="forecast+cards"?t.kindForecastCards:e==="grid"?t.kindGrid:t.kindOverview}function fe(t,e){return{entity:t.cardEntity,text:t.cardText,todo:t.cardTodo,onoff:t.cardOnOff,battery:t.cardBattery,network:t.cardNetwork,time:t.cardTime,percent:t.cardPercent,number:t.cardNumber}[e]||e}function zt(t){const e=pe();return Ui[e][t]||""}function Oe(t,e){return{caption:t.fieldCardCaption,hint:t.fieldCardHint,entity:t.fieldCardEntity,value:t.fieldCardValue,onText:t.fieldCardOnText,offText:t.fieldCardOffText,stateEntity:t.fieldCardStateEntity,downEntity:t.fieldCardDownEntity,upEntity:t.fieldCardUpEntity,digits:t.fieldCardDigits,unit:t.fieldCardUnit}[e]||e}function zi(t,e){const a=e.attributes||{},i=String(a.friendly_name||t),s=t.includes(".")&&t.split(".",1)[0]||"other",n=String(e.state||""),o=String(a.unit_of_measurement||"");return{entityId:t,name:i,domain:s,state:n,unit:o}}function Gi(t){return t?Object.entries(t).map(([e,a])=>zi(e,a)).sort((e,a)=>{const i=e.domain.localeCompare(a.domain);return i!==0?i:e.name.localeCompare(a.name,"ru")}):[]}function qi(t,e){const a=e.trim().toLowerCase();return a?t.filter(i=>i.entityId.toLowerCase().includes(a)||i.name.toLowerCase().includes(a)||i.domain.toLowerCase().includes(a)||i.state.toLowerCase().includes(a)).slice(0,48):t.slice(0,48)}function Ki(t){const e=new URL(t,window.location.href),a=e.pathname.match(/^\/api\/hassio_ingress\/[^/]+\//);return a?new URL(a[0],e.origin).toString():null}function oe(t,e){const a=String(t||"").trim();if(!a)return"";if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))return a;const i=new URL(e,window.location.href);if(a.startsWith("/")){const s=Ki(e);if(s)return new URL(a.slice(1),s).toString()}return new URL(a,i).toString()}function ot(t,e){const a=String(t||"").trim();if(!a)return"";if(a.startsWith(Te))return oe(`${wt}${a.slice(Te.length)}`,e);if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(a))try{const i=new URL(a,e);if(i.pathname.startsWith(Te)){const s=i.pathname.slice(Te.length);return oe(`${wt}${s}${i.search}${i.hash}`,e)}}catch{return a}return a}function Ji(t){const e=String(t||"").trim();return e?e.endsWith("/")?e:`${e}/`:""}function Yi(t,e){const a=new URL("./",t).toString(),i=oe(ot(e,a)||e,a);return Ji(i||a)}function $t(t,e,a){const i=String(a||"").trim();return i?oe(ot(i,t)||i,Yi(t,e)):""}function Zi(t,e){const a=String(e||"").trim();return a?oe(ot(a,t)||a,new URL("./",t).toString()):""}function Gt(t){return{id:String(t.id||"").trim(),name:String(t.name||t.id||"").trim(),manifestUrl:String(t.manifestUrl||"").trim(),previewUrl:String(t.previewUrl||"").trim(),motionCount:Number(t.motionCount||0),capabilities:typeof t.capabilities=="object"&&t.capabilities?{supportsMotion:!!t.capabilities.supportsMotion,supportsEmotion:!!t.capabilities.supportsEmotion,supportsLipSync:!!t.capabilities.supportsLipSync,supportsViewPresets:!!t.capabilities.supportsViewPresets,supportsPointerFocus:!!t.capabilities.supportsPointerFocus}:void 0}}function Qe(t,e){const a=Gt(t);return{...a,manifestUrl:a.manifestUrl?oe(a.manifestUrl,e):"",previewUrl:a.previewUrl?oe(a.previewUrl,e):""}}async function Xi(t,e){var h;const a=String(t||"").trim();if(!a)return null;const i=await fetch(a,{cache:"no-store"}),s=await i.json();if(!i.ok)throw new Error(`GET ${a} failed: HTTP ${i.status}`);const n=String(s.assetRoot||"").trim();let o=0;const l=$t(a,n,String(s.motionMapUrl||"").trim());if(l)try{const r=await fetch(l,{cache:"no-store"}),S=await r.json();r.ok&&Array.isArray(S.motions)&&(o=S.motions.length)}catch{o=0}const d=Zi(a,String(((h=s.presetThumbs)==null?void 0:h.full)||"").trim())||$t(a,n,String(s.fallbackPortrait||"").trim());return Gt({id:"",name:String(s.name||"").trim()||e||"",manifestUrl:a,previewUrl:d,motionCount:o,capabilities:s.capabilities})}async function kt(t){const e=String(t||"").trim();if(!e)return[];const a=await fetch(e,{cache:"no-store"}),i=await a.json();if(!a.ok||i.success===!1)throw new Error(`GET ${e} failed: HTTP ${a.status}`);return Array.isArray(i.items)?i.items.map(s=>Qe(s,e)).filter(s=>s.id&&s.manifestUrl):[]}async function Qi(t,e){const a=String(t||"").trim();if(!a)throw new Error("Avatar import API is not configured.");const i=/\/api\/hassio_ingress\//.test(a),s=i?Mi:Li;if(i||e.size>s){const d=typeof crypto<"u"&&typeof crypto.randomUUID=="function"?crypto.randomUUID():`${Date.now()}-${Math.random().toString(16).slice(2)}`,h=Math.max(1,Math.ceil(e.size/s));let r=null;for(let S=0;S<h;S+=1){const C=S*s,x=Math.min(e.size,C+s),b=new FormData;b.set("uploadId",d),b.set("filename",e.name),b.set("chunkIndex",String(S)),b.set("chunkCount",String(h)),b.set("archive",e.slice(C,x,"application/zip"),`${e.name}.part-${S+1}-of-${h}`);const $=await fetch(a,{method:"POST",headers:he,body:b}),k=await $.json();if(!$.ok||k.success===!1)throw new Error(String(k.error||`HTTP ${$.status}`));k.item&&(r=Qe(k.item,a))}if(!r)throw new Error("Avatar import did not return the imported pack.");return r}const n=new FormData;n.set("archive",e,e.name);const o=await fetch(a,{method:"POST",headers:he,body:n}),l=await o.json();if(!o.ok||l.success===!1||!l.item)throw new Error(String(l.error||`HTTP ${o.status}`));return Qe(l.item,a)}async function er(t,e){var o,l,d,h;const a=String(t||"").trim(),i=String(e||"").trim();if(!a||!i)throw new Error("Avatar pack API is not configured.");const s=await fetch(`${a}?packId=${encodeURIComponent(i)}`,{cache:"no-store"}),n=await s.json();if(!s.ok||n.success===!1||!n.packId)throw new Error(String(n.error||`HTTP ${s.status}`));return{packId:String(n.packId||"").trim(),manifest:n.manifest||{},motionMap:{motions:Array.isArray((o=n.motionMap)==null?void 0:o.motions)?(l=n.motionMap)==null?void 0:l.motions.map(r=>({index:Number(r.index),id:String(r.id||"").trim(),label:String(r.label||r.id||"").trim(),group:String(r.group||"").trim(),tags:Array.isArray(r.tags)?r.tags.map(S=>String(S||"").trim()).filter(Boolean):[]})).filter(r=>Number.isFinite(r.index)):[],semantic:typeof((d=n.motionMap)==null?void 0:d.semantic)=="object"&&((h=n.motionMap)!=null&&h.semantic)?Object.fromEntries(Object.entries(n.motionMap.semantic)):{}}}}async function tr(t,e){var n,o,l;const a=String(t||"").trim();if(!a||!e.packId)throw new Error("Avatar pack API is not configured.");const i=await fetch(`${a}?packId=${encodeURIComponent(e.packId)}`,{method:"POST",headers:{"Content-Type":"application/json",...he},body:JSON.stringify({motionMap:e.motionMap})}),s=await i.json();if(!i.ok||s.success===!1||!s.packId)throw new Error(String(s.error||`HTTP ${i.status}`));return{packId:String(s.packId||"").trim(),manifest:s.manifest||e.manifest,motionMap:{motions:Array.isArray((n=s.motionMap)==null?void 0:n.motions)?s.motionMap.motions:e.motionMap.motions,semantic:typeof((o=s.motionMap)==null?void 0:o.semantic)=="object"&&((l=s.motionMap)!=null&&l.semantic)?Object.fromEntries(Object.entries(s.motionMap.semantic)):e.motionMap.semantic}}}function ar(t){if(Array.isArray(t)){const e=t.find(a=>Number.isFinite(Number(a)));return e===void 0?"":String(Number(e))}return Number.isFinite(Number(t))?String(Number(t)):""}function ir(t,e){const a=t[e.labelKey];return typeof a=="string"?a:e.key}function rr(t,e){const a=e.motionMap.motions||[];return`
    <div class="card-stack" style="margin-top:16px;">
      <div class="meta">${t.avatarMappingSubtitle}</div>
      <div class="inspector-grid avatar-mapping-grid">
        ${Ri.map(i=>`
          <div class="field">
            <label for="avatar-semantic-${m(i.key)}">${m(ir(t,i))}</label>
            <select id="avatar-semantic-${m(i.key)}" data-avatar-semantic="${m(i.key)}">
              <option value="">${m(t.avatarMotionNone)}</option>
              ${a.map(s=>`
                <option value="${m(String(s.index))}"${ar(e.motionMap.semantic[i.key])===String(s.index)?" selected":""}>
                  ${m(`${s.label||s.id} · #${s.index}`)}
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
              <strong>${m(i.label||i.id||`${t.avatarMappingMotion} ${i.index}`)}</strong>
              <span class="meta">${m(`${t.avatarMappingMotion} #${i.index} · ${i.group||t.avatarMappingMotion.toLowerCase()}`)}</span>
              <code>${m(i.id||"")}</code>
            </div>
          </article>
        `).join("")}
      </div>
      <div class="meta">${t.avatarMappingSaveHint}</div>
    </div>
  `}function Ct(t,e,a){var S,C,x,b,$;const i=(e==null?void 0:e.id)||"",s=a===i,n=(e==null?void 0:e.name)||t.avatarPackDefaultTile,o=(e==null?void 0:e.id)||t.avatarPackCurrent,l=(e==null?void 0:e.previewUrl)||"",d=e?[e.motionCount>0?t.avatarPackMotionCount(e.motionCount):"",(S=e.capabilities)!=null&&S.supportsMotion?t.avatarCapabilityMotion:"",(C=e.capabilities)!=null&&C.supportsEmotion?t.avatarCapabilityEmotion:"",(x=e.capabilities)!=null&&x.supportsLipSync?t.avatarCapabilityLipSync:"",(b=e.capabilities)!=null&&b.supportsViewPresets?t.avatarCapabilityViewPresets:"",($=e.capabilities)!=null&&$.supportsPointerFocus?t.avatarCapabilityPointerFocus:""].filter(Boolean):[t.avatarPackDefaultHint],h=d.length?d:[t.avatarPackDefaultHint],r=e!==null;return`
    <article class="avatar-pack-card${s?" is-active":""}">
      <div class="avatar-pack-card-preview">
        ${l?`<img src="${m(l)}" alt="${m(n)}">`:`<span>${m(n)}</span>`}
      </div>
      <div class="avatar-pack-card-body">
        <strong>${m(n)}</strong>
        <div class="meta">${m(o)}</div>
        <div class="avatar-pack-card-meta">
          ${h.map(k=>`<span>${m(k)}</span>`).join("")}
        </div>
        <div class="avatar-pack-card-actions">
          <button class="scene-editor-button${s?" is-accent":""}" type="button" data-action="select-avatar-pack" data-pack-id="${m(i)}">
            ${m(s?t.avatarPackSelected:t.avatarPackSelect)}
          </button>
          ${r?`<button class="scene-editor-button is-danger" type="button" data-action="delete-avatar-pack" data-pack-id="${m(i)}" data-pack-name="${m(n)}">
            ${m(t.avatarPackDelete)}
          </button>`:""}
        </div>
      </div>
    </article>
  `}function lt(t){return["entity","stateEntity","downEntity","upEntity"].includes(t)}function sr(t,e,a,i){if(!e||a===null)return`<div class="meta">${m(t.entityBindingEmpty)}</div>`;const s=nt(F(e,"type")||"entity").filter(n=>lt(n));return s.length?`
    <div class="binding-targets">
      ${s.map(n=>`
          <button class="tiny-btn${(i==null?void 0:i.cardIndex)===a&&i.field===n?" is-active":""}" type="button" data-action="focus-binding" data-card-index="${a}" data-binding-field="${m(n)}">
            ${m(Oe(t,n))}
          </button>
        `).join("")}
    </div>
  `:`<div class="meta">${m(t.entityBindingNoTargets)}</div>`}function It(t){const e=document.querySelector(`[data-editor-section="${t}"]`);e==null||e.scrollIntoView({behavior:"smooth",block:"start"})}function de(t){for(const e of Array.from(t.querySelectorAll(".is-drop-target")))e.classList.remove("is-drop-target")}function Pt(t){return nt(t).find(e=>lt(e))||null}function ie(t,e,a,i=!1){return`
    <div class="field ${i?"is-wide":""}">
      <label for="page-field-${e}">${m(t)}</label>
      <input id="page-field-${e}" type="text" data-page-field="${m(e)}" value="${m(a)}">
    </div>
  `}function ne(t,e,a){const i=e==="globalScale"?"0.01":"1";return`
    <div class="field">
      <label for="display-field-${e}">${m(t)}</label>
      <input id="display-field-${e}" type="number" step="${i}" data-display-field="${m(e)}" value="${m(a)}">
    </div>
  `}function Et(t,e,a,i){return`
    <div class="field">
      <label for="page-select-${e}">${m(t)}</label>
      <select id="page-select-${e}" data-page-field="${m(e)}">
        ${i.map(s=>`<option value="${m(s.value)}"${s.value===a?" selected":""}>${m(s.label)}</option>`).join("")}
      </select>
    </div>
  `}function nr(t,e,a,i){for(let s=0;s<t.length;s++){if(s===i)continue;const n=t[s],o=Number(n.col)||0,l=Number(n.row)||0,d=Math.max(1,Number(n.w)||1),h=Math.max(1,Number(n.h)||1);if(e>=o&&e<o+d&&a>=l&&a<l+h)return{occupied:!0,cardIndex:s}}return{occupied:!1,cardIndex:-1}}function or(t,e){const a=t.gridColumns||4,i=t.gridRows||3,s=t.cards||[],n=new Set;let o="";for(let l=0;l<i;l++)for(let d=0;d<a;d++){const h=`${d},${l}`;if(n.has(h))continue;const r=nr(s,d,l);if(r.occupied){const S=s[r.cardIndex],C=Number(S.col)||0,x=Number(S.row)||0,b=Math.max(1,Number(S.w)||1),$=Math.max(1,Number(S.h)||1);if(d===C&&l===x){for(let T=0;T<$;T++)for(let j=0;j<b;j++)n.add(`${C+j},${x+T}`);const k=r.cardIndex===e,L=F(S,"caption")||F(S,"type")||"entity";o+=`<div class="grid-preview-cell is-occupied${k?" is-selected":""}"
            style="grid-column: ${C+1} / span ${b}; grid-row: ${x+1} / span ${$};"
            data-action="select-card" data-card-index="${r.cardIndex}"
            title="#${r.cardIndex+1} ${m(L)}"
          ><span>${m(L)}</span></div>`}}else o+=`<div class="grid-preview-cell"
          style="grid-column: ${d+1}; grid-row: ${l+1};"
          data-action="grid-add-card-at" data-col="${d}" data-row="${l}"
          title="+">+</div>`}return`<div class="grid-preview" style="--grid-cols: ${a}; --grid-rows: ${i};">${o}</div>`}function lr(t,e,a,i,s=!1){const n=F(e,"type")||"entity",o=nt(n),l=s?`
    <div class="field">
      <label>${m(t.fieldCardCol)}</label>
      <input id="card-${a}-field-col" type="number" min="0" data-card-index="${a}" data-card-field="col" value="${m(F(e,"col"))}">
    </div>
    <div class="field">
      <label>${m(t.fieldCardRow)}</label>
      <input id="card-${a}-field-row" type="number" min="0" data-card-index="${a}" data-card-field="row" value="${m(F(e,"row"))}">
    </div>
    <div class="field">
      <label>${m(t.fieldCardW)}</label>
      <input id="card-${a}-field-w" type="number" min="1" data-card-index="${a}" data-card-field="w" value="${m(F(e,"w")||"1")}">
    </div>
    <div class="field">
      <label>${m(t.fieldCardH)}</label>
      <input id="card-${a}-field-h" type="number" min="1" data-card-index="${a}" data-card-field="h" value="${m(F(e,"h")||"1")}">
    </div>
  `:"";return`
    <article class="card-item">
      <div class="card-item-head">
        <div>
          <strong>${m(F(e,"caption")||fe(t,n))}</strong>
          <div class="meta">${m(fe(t,n))}</div>
        </div>
        <div class="meta">#${a+1}</div>
      </div>
      <div class="card-grid">
        ${l}
        <div class="field is-wide">
          <label>${m(t.cardType)}</label>
          <select id="card-${a}-field-type" data-card-index="${a}" data-card-field="type">
            ${Vt.map(d=>`<option value="${d}"${d===n?" selected":""}>${m(fe(t,d))}</option>`).join("")}
          </select>
        </div>
        ${o.map(d=>{const h=lt(d),r=h&&(i==null?void 0:i.cardIndex)===a&&i.field===d;return h?`
              <div class="field ${d==="hint"?"is-wide":""} is-binding-field${r?" is-active":""}">
                <label>${m(Oe(t,d))}</label>
                <div class="field-binding-row">
                  <input
                    id="card-${a}-field-${m(d)}"
                    type="text"
                    data-card-index="${a}"
                    data-card-field="${m(d)}"
                    data-binding-field="${m(d)}"
                    value="${m(F(e,d))}"
                  >
                  <button
                    class="tiny-btn"
                    type="button"
                    data-action="focus-binding"
                    data-card-index="${a}"
                    data-binding-field="${m(d)}"
                  >${t.bindFromHa}</button>
                </div>
              </div>
            `:`
            <div class="field ${d==="hint"?"is-wide":""}">
              <label>${m(Oe(t,d))}</label>
              <input
                id="card-${a}-field-${m(d)}"
                type="${d==="digits"?"number":"text"}"
                data-card-index="${a}"
                data-card-field="${m(d)}"
                value="${m(F(e,d))}"
              >
            </div>
          `}).join("")}
      </div>
    </article>
  `}function dr(t,e,a,i,s,n=!1){const o=F(e,"type")||"entity",l=F(e,"caption")||fe(t,o),h=(n?`[${F(e,"col")||"0"},${F(e,"row")||"0"} ${F(e,"w")||"1"}×${F(e,"h")||"1"}] `:"")+(F(e,"entity")||F(e,"stateEntity")||F(e,"downEntity")||F(e,"upEntity")||F(e,"value")||F(e,"hint")||zt(o));return`
    <article class="card-list-item${s?" is-active":""}" draggable="true" data-drag-kind="card" data-card-index="${a}">
      <button class="card-list-select" type="button" data-action="select-card" data-card-index="${a}">
        <span class="card-list-index">#${a+1}</span>
        <strong>${m(l)}</strong>
        <span class="meta">${m(fe(t,o))}</span>
        <div class="meta">${m(h)}</div>
      </button>
      <div class="card-actions">
        <button class="tiny-btn" type="button" data-action="card-up" data-card-index="${a}"${a===0?" disabled":""}>${t.up}</button>
        <button class="tiny-btn" type="button" data-action="card-down" data-card-index="${a}"${a===i-1?" disabled":""}>${t.down}</button>
        <button class="tiny-btn" type="button" data-action="card-remove" data-card-index="${a}">${t.remove}</button>
      </div>
    </article>
  `}function cr(t,e){return`
    <button
      class="card-template-button"
      type="button"
      data-action="add-card-template"
      data-card-type="${m(e)}"
    >
      <strong>${m(fe(t,e))}</strong>
      <span>${m(zt(e))}</span>
    </button>
  `}function ur(t,e,a){t[e]=a.entityId;const i=t;String(i.caption||"").trim()||(i.caption=a.name),String(i.hint||"").trim()||(i.hint=a.unit?`${a.state} ${a.unit}`.trim():a.state),(i.type==="number"||i.type==="percent")&&!String(i.unit||"").trim()&&a.unit&&(i.unit=a.unit)}async function pr(t){var ge;const e=Ti[pe()],a=document.getElementById("app");if(!a)throw new Error("Missing #app root");const i=document.getElementById("scene-editor-shell");i!=null&&i.contains(a)&&document.body.insertBefore(a,i),i==null||i.remove();const s=document.createElement("section");s.id="scene-editor-shell",s.innerHTML=`
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
              ${De.map(f=>`<option value="${m(f.id)}">${m(f.label[pe()])}</option>`).join("")}
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
  `,document.body.appendChild(s),document.documentElement.dataset.editorMode="true",document.body.dataset.editorMode="true",document.body.style.overflow="auto";const n=s.querySelector("[data-preview-stage]"),o=s.querySelector("[data-preview-canvas]"),l=s.querySelector("[data-preview-resolution]"),d=s.querySelector("[data-preview-display]"),h=s.querySelector("[data-dashboard]");if(!n||!o||!l||!d||!h)throw new Error("Missing native editor shell elements");o.appendChild(a);const r={config:null,selectedPageId:null,selectedCardIndex:null,dirty:!1,saving:!1,status:e.statusLoading,statusTone:"muted",haEntities:[],bundledAvatar:null,avatarCatalog:[],entitySearch:"",focusedBinding:null,previewDisplayId:Xe,pendingAvatarZip:null,pendingAvatarZipName:"",avatarImporting:!1,avatarImportStatus:"",avatarImportTone:"muted",avatarPackDetails:null,avatarPackLoading:!1,avatarPackDirty:!1,avatarPackSaving:!1,activeSectionTab:new URL(window.location.href).searchParams.get("editorTab")==="avatar"?"avatar":"cards"};let S=t.packId;const C=async f=>{const u=String(f||"").trim();if(!u||!t.avatarPackApiUrl){r.avatarPackDetails=null,r.avatarPackLoading=!1,r.avatarPackDirty=!1;return}r.avatarPackLoading=!0,A();try{r.avatarPackDetails=await er(t.avatarPackApiUrl,u),r.avatarPackDirty=!1}catch(p){r.avatarPackDetails=null,r.avatarPackDirty=!1,W(`${e.avatarMappingLoadError}: ${String(p)}`,"bad")}finally{r.avatarPackLoading=!1}},x=()=>{var R;const f=Di(r.previewDisplayId),u=Math.max(320,((R=n.parentElement)==null?void 0:R.clientWidth)||n.clientWidth||f.width),p=Math.max(260,Math.min(window.innerHeight*.62,760)),g=Math.min(1,u/f.width,p/f.height),P=Math.round(f.width*g),U=Math.round(f.height*g);d.value=f.id,l.textContent=Ni(f),n.style.aspectRatio=`${f.width} / ${f.height}`,n.style.width=`${P}px`,n.style.height=`${U}px`,o.style.width=`${f.width}px`,o.style.height=`${f.height}px`,o.style.transform=`scale(${g})`,a.style.width=`${f.width}px`,a.style.height=`${f.height}px`},b=f=>{r.previewDisplayId=String(f||"").trim()||Xe,x()},$=f=>{r.pendingAvatarZip=f,r.pendingAvatarZipName=(f==null?void 0:f.name)||"",r.avatarImportStatus="",r.avatarImportTone="muted",A(),f&&k(f)},k=async f=>{if(!(!r.config||!t.avatarImportUrl||r.avatarImporting)){r.pendingAvatarZip=null,r.avatarImporting=!0,r.avatarImportStatus=e.avatarImporting,r.avatarImportTone="muted",A();try{const u=await Qi(t.avatarImportUrl,f);r.avatarCatalog=t.avatarCatalogUrl?await kt(t.avatarCatalogUrl):[u],qe(r.config).packId=u.id,await C(u.id),r.pendingAvatarZip=null,r.pendingAvatarZipName="",r.avatarImporting=!1,r.avatarImportStatus=e.avatarImportSuccess(u.name||u.id),r.avatarImportTone="ok",B(),A()}catch(u){r.avatarImporting=!1,r.avatarImportStatus=`${e.avatarImportError}: ${String(u)}`,r.avatarImportTone="bad",A()}}},L=typeof ResizeObserver<"u"?new ResizeObserver(()=>x()):null;L==null||L.observe(n.parentElement||n);let T=null;const j=()=>{const f=r.selectedPageId||"",u=r.selectedCardIndex;for(const p of Array.from(a.querySelectorAll("[data-editor-selected-page='true']")))delete p.dataset.editorSelectedPage;for(const p of Array.from(a.querySelectorAll("[data-editor-selected-card='true']")))delete p.dataset.editorSelectedCard;if(f){const p=a.querySelector(`[data-slide-id="${CSS.escape(f)}"]`);p&&(p.dataset.editorSelectedPage="true")}if(f&&u!==null){const p=`[data-scene-page-id="${CSS.escape(f)}"][data-scene-card-index="${u}"]`,g=a.querySelector(p);g&&(g.dataset.editorSelectedCard="true")}},Y=typeof MutationObserver<"u"?new MutationObserver(()=>j()):null;Y==null||Y.observe(a,{childList:!0,subtree:!0});const A=()=>{const f=Ii(h),u=r.config,p=u?Z(u):[],g=p.find(I=>I.id===r.selectedPageId)||p[0]||null,P=Array.isArray(g==null?void 0:g.cards)?g.cards:[],U=r.selectedCardIndex!==null&&P[r.selectedCardIndex]||null,R=g?p.indexOf(g):-1,E=qi(r.haEntities,r.entitySearch),le=r.focusedBinding?e.entityBindingActive(F(P[r.focusedBinding.cardIndex],"caption")||`${e.cards} #${r.focusedBinding.cardIndex+1}`,Oe(e,r.focusedBinding.field)):e.entityBindingEmpty,Q=u?Re(u):"",w=r.avatarImportStatus?`<div class="scene-editor-status" data-tone="${r.avatarImportTone}">${m(r.avatarImportStatus)}</div>`:"",X=r.avatarCatalog.length>0?e.avatarPackHint:e.avatarPackEmpty,q=g?`${g.title||g.id||e.pageSettings} · ${xt(e,g.kind)}`:e.statusLoading;h.innerHTML=`
      <div class="scene-dashboard-topbar">
        <div class="scene-dashboard-title">
          <strong>${e.dashboardTitle}</strong>
          <span>${e.dashboardSubtitle}</span>
          <div class="scene-editor-status" data-tone="${r.statusTone}">${m(r.status)}</div>
        </div>
        <div class="scene-editor-actions">
          <a class="scene-editor-button" href="${m(t.sceneUrl)}">${e.viewOnly}</a>
          <button class="scene-editor-button is-accent" type="button" data-action="save"${r.saving||r.avatarPackSaving||!u?" disabled":""}>${r.saving||r.avatarPackSaving?e.saving:e.save}</button>
        </div>
      </div>
      <div class="page-tabs">
        ${p.map((I,D)=>`
          <button class="page-tab${I.id===((g==null?void 0:g.id)||"")?" is-active":""}" type="button" data-action="select-page" data-page-id="${m(I.id)}" draggable="true" data-drag-kind="page">
            ${m(I.title||I.id||(pe()==="ru"?`Стр ${D+1}`:`Page ${D+1}`))}
          </button>
        `).join("")}
        <button class="page-tab is-add" type="button" data-action="add-page"${u?"":" disabled"}>+</button>
      </div>
      ${g?`
      <div class="page-tab-actions">
        <span class="meta">${m(q)}</span>
        <button class="tiny-btn" type="button" data-action="page-up" data-page-id="${m(g.id)}"${R===0?" disabled":""}>${e.up}</button>
        <button class="tiny-btn" type="button" data-action="page-down" data-page-id="${m(g.id)}"${R===p.length-1?" disabled":""}>${e.down}</button>
        <button class="tiny-btn" type="button" data-action="page-remove" data-page-id="${m(g.id)}"${p.length<=1?" disabled":""}>${e.remove}</button>
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
        ${g?`
          <div class="inspector-grid">
            ${ie(e.fieldPageId,"id",ae(g,"id"),!0)}
            ${Et(e.fieldKind,"kind",ae(g,"kind"),Ei.map(I=>({value:I,label:xt(e,I)})))}
            ${ie(e.fieldTitle,"title",ae(g,"title"),!0)}
            ${ie(e.fieldSubtitle,"subtitle",ae(g,"subtitle"),!0)}
            ${ie(e.fieldSlot,"slot",ae(g,"slot"))}
            ${g.kind==="grid"?`
            ${ie(e.fieldGridColumns,"gridColumns",String(g.gridColumns||4))}
            ${ie(e.fieldGridRows,"gridRows",String(g.gridRows||3))}
            `:`
            ${Et(e.fieldCardStyle,"cardStyle",ae(g,"cardStyle")||"full",Ai.map(I=>({value:I,label:I==="mini"?e.styleMini:e.styleFull})))}
            `}
            ${ie(e.fieldStampCaption,"stampCaption",ae(g,"stampCaption"))}
            ${ie(e.fieldStampValue,"stampValue",ae(g,"stampValue"))}
          </div>
        `:`<div class="meta">${e.statusLoading}</div>`}
        </section>
        <section class="scene-settings-card" data-editor-section="cards">
          <div class="scene-settings-head">
            <h2>${e.cards}</h2>
            <div class="meta">${e.cardsSubtitle}</div>
            <div class="meta">${e.cardOrderHint}</div>
          </div>
        ${g?`
          <div class="card-stack">
            ${g.kind==="grid"?or(g,r.selectedCardIndex):""}
            <div>
              <div class="meta">${e.cardTemplates}</div>
              <div class="card-template-grid" style="margin-top:12px;">
                ${Vt.map(I=>cr(e,I)).join("")}
              </div>
            </div>
            <div class="cards-list">
              ${P.length?P.map((I,D)=>dr(e,I,D,P.length,D===r.selectedCardIndex,g.kind==="grid")).join(""):`<div class="meta">${e.noCards}</div>`}
            </div>
            <div>
              <h2>${e.cardInspector}</h2>
              ${U?lr(e,U,r.selectedCardIndex||0,r.focusedBinding,g.kind==="grid"):`<div class="meta">${e.cardInspectorEmpty}</div>`}
            </div>
          </div>
        `:`<div class="meta">${e.statusLoading}</div>`}
        </section>
        <section class="scene-settings-card">
          <div class="scene-settings-head">
            <h2>${e.homeAssistant}</h2>
            <div class="meta">${m(le)}</div>
          </div>
        <div>
          <div class="meta">${e.entityBindingTargets}</div>
          ${sr(e,U,r.selectedCardIndex,r.focusedBinding)}
        </div>
        <div class="field ha-search" style="margin-top:12px;">
          <label for="ha-entity-search">${e.entitySearch}</label>
          <input id="ha-entity-search" type="text" data-ha-search value="${m(r.entitySearch)}">
        </div>
        <div class="ha-list">
          ${E.length?E.map(I=>`
            <article class="ha-entity">
              <div class="ha-entity-row">
                <div>
                  <strong>${m(I.name)}</strong>
                  <div class="meta">${m(I.domain)}</div>
                </div>
                <button class="tiny-btn" type="button" data-action="bind-entity" data-entity-id="${m(I.entityId)}"${r.focusedBinding?"":" disabled"}>${e.useEntity}</button>
              </div>
              <code>${m(I.entityId)}</code>
              <div class="ha-state">${m(I.state)}${I.unit?` · ${m(I.unit)}`:""}</div>
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
        ${u?`
          <div class="avatar-pack-box">
            <div class="meta">${X}</div>
            <div class="meta">${e.avatarPackAppliedAfterSave}</div>
            <div class="avatar-pack-grid">
              ${Ct(e,r.bundledAvatar,Q)}
              ${r.avatarCatalog.map(I=>Ct(e,I,Q)).join("")}
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
            ${r.pendingAvatarZipName?`<div class="meta">${m(e.avatarImportSelected(r.pendingAvatarZipName))}</div>`:""}
            <div class="meta">${e.avatarImportHint}</div>
            ${w}
          </div>
          ${Q?r.avatarPackLoading?`<div class="meta" style="margin-top:16px;">${e.avatarMappingLoading}</div>`:r.avatarPackDetails?rr(e,r.avatarPackDetails):"":""}
        `:`<div class="meta">${e.statusLoading}</div>`}
        </section>
      `:""}
      ${r.activeSectionTab==="display"?`
        <section class="scene-settings-card">
          <div class="scene-settings-head">
            <h2>${e.displaySettings}</h2>
            <div class="meta">${e.displaySubtitle}</div>
          </div>
        ${u?`
          <div class="inspector-grid">
            ${ne(e.fieldDisplaySafeTop,"safeTop",se(u,"safeTop"))}
            ${ne(e.fieldDisplaySafeRight,"safeRight",se(u,"safeRight"))}
            ${ne(e.fieldDisplaySafeBottom,"safeBottom",se(u,"safeBottom"))}
            ${ne(e.fieldDisplaySafeLeft,"safeLeft",se(u,"safeLeft"))}
            ${ne(e.fieldDisplayPadding,"layoutPaddingPx",se(u,"layoutPaddingPx"))}
            ${ne(e.fieldDisplayGap,"layoutGapPx",se(u,"layoutGapPx"))}
            ${ne(e.fieldDisplayScale,"globalScale",se(u,"globalScale"))}
          </div>
        `:`<div class="meta">${e.statusLoading}</div>`}
        </section>
      `:""}
      </div>
    `;const H=h.querySelector("[data-avatar-archive]"),je=h.querySelector("[data-action='choose-avatar-archive']");je==null||je.addEventListener("click",()=>{if(!H||H.disabled)return;H.value="";const I=H;try{if(typeof I.showPicker=="function"){I.showPicker();return}}catch{}H.click()}),H==null||H.addEventListener("click",()=>{H.value=""}),H==null||H.addEventListener("change",()=>{var D;const I=((D=H.files)==null?void 0:D[0])||null;$(I),H.value=""});for(const I of Array.from(h.querySelectorAll(".page-tab[data-page-id]")))I.draggable=!0,I.addEventListener("dragstart",D=>{const K=String(I.dataset.pageId||"").trim();T=K?{kind:"page",pageId:K}:null,!(!T||!D.dataTransfer)&&(D.dataTransfer.effectAllowed="move",D.dataTransfer.setData("text/plain",JSON.stringify(T)))}),I.addEventListener("dragover",D=>{!T||T.kind!=="page"||(D.preventDefault(),de(s),I.classList.add("is-drop-target"),D.dataTransfer&&(D.dataTransfer.dropEffect="move"))}),I.addEventListener("drop",D=>{if(!T||T.kind!=="page")return;D.preventDefault();const K=String(I.dataset.pageId||"").trim();K&&ke(T.pageId,K),T=null,de(s)}),I.addEventListener("dragend",()=>{T=null,de(s)});for(const I of Array.from(h.querySelectorAll(".card-list-item[data-card-index]")))I.draggable=!0,I.addEventListener("dragstart",D=>{const K=Number(I.dataset.cardIndex||"-1");T=Number.isFinite(K)&&K>=0?{kind:"card",cardIndex:K}:null,!(!T||!D.dataTransfer)&&(D.dataTransfer.effectAllowed="move",D.dataTransfer.setData("text/plain",JSON.stringify(T)))}),I.addEventListener("dragover",D=>{!T||T.kind!=="card"||(D.preventDefault(),de(s),I.classList.add("is-drop-target"),D.dataTransfer&&(D.dataTransfer.dropEffect="move"))}),I.addEventListener("drop",D=>{if(!T||T.kind!=="card")return;D.preventDefault();const K=Number(I.dataset.cardIndex||"-1");Number.isFinite(K)&&K>=0&&Ce(T.cardIndex,K),T=null,de(s)}),I.addEventListener("dragend",()=>{T=null,de(s)});x(),j(),Pi(h,f)},W=(f,u)=>{r.status=f,r.statusTone=u,A()},O=()=>{if(!r.config)return;const f=Z(r.config);if(!f.length){r.selectedPageId=null;return}(!r.selectedPageId||!f.some(g=>g.id===r.selectedPageId))&&(r.selectedPageId=f[0].id);const u=f.find(g=>g.id===r.selectedPageId)||null,p=Array.isArray(u==null?void 0:u.cards)?u.cards:[];p.length?(r.selectedCardIndex===null||r.selectedCardIndex>=p.length)&&(r.selectedCardIndex=0):(r.selectedCardIndex=null,r.focusedBinding=null),ji(r.selectedPageId),_i(Bi(r.config,r.selectedPageId))},B=()=>{r.dirty=!0,W(e.statusDirty,"muted")},we=()=>{const f=new URL(window.location.href);f.searchParams.set("editor","1"),r.selectedPageId&&f.searchParams.set("editorPage",r.selectedPageId),f.searchParams.set("v",String(Date.now())),window.location.replace(f.toString())},Se=(f,u)=>{if(!r.config||!r.selectedPageId)return;const p=r.config.pages.find(g=>g.id===r.selectedPageId);if(p){if(f==="slot")p.slot=u===""?void 0:Number(u);else if(f==="id"){const g=Wt(r.config,u||"page"),P=p.id;p.id=g,r.config.rotation.order=r.config.rotation.order.map(U=>U===P?g:U),r.selectedPageId=g}else if(f==="title"||f==="subtitle"||f==="stampCaption"||f==="stampValue")p[f]=u;else if(f==="kind")p.kind=u;else if(f==="cardStyle")p.cardStyle=u;else if(f==="gridColumns"||f==="gridRows"){const g=u===""?void 0:Math.max(1,Math.min(12,Math.round(Number(u))));p[f]=Number.isFinite(g)?g:void 0}B(),O()}},xe=(f,u)=>{if(!r.config)return;const p=Hi(r.config),g=p.safeArea||{},P=u===""?null:Number(u),U=Number.isFinite(P)?P:null;f==="safeTop"?g.top=U??0:f==="safeRight"?g.right=U??0:f==="safeBottom"?g.bottom=U??0:f==="safeLeft"?g.left=U??0:f==="layoutPaddingPx"?p.layoutPaddingPx=U??16:f==="layoutGapPx"?p.layoutGapPx=U??16:f==="globalScale"&&(p.globalScale=U??1),p.safeArea=g,B()},$e=(f,u,p)=>{var U;if(!r.config||!r.selectedPageId)return;const g=r.config.pages.find(R=>R.id===r.selectedPageId);if(!g)return;Array.isArray(g.cards)||(g.cards=[]);const P=g.cards[f];if(P){if(u==="type"){const R=Ge(p);if(g.cards[f]={...R,caption:F(P,"caption")||R.caption},((U=r.focusedBinding)==null?void 0:U.cardIndex)===f){const E=Pt(p);r.focusedBinding=E?{cardIndex:f,field:E}:null}}else if(u==="digits")P[u]=p===""?0:Number(p);else if(u==="col"||u==="row"||u==="w"||u==="h"){const R=p===""?void 0:Math.max(0,Number(p));P[u]=Number.isFinite(R)?R:void 0}else P[u]=p;B()}},ke=(f,u)=>{if(!r.config||!f||!u||f===u)return;const p=Z(r.config).map(U=>U.id),g=p.indexOf(f),P=p.indexOf(u);g<0||P<0||(p.splice(g,1),p.splice(P,0,f),r.config.rotation.order=p,r.selectedPageId=f,r.selectedCardIndex=0,r.focusedBinding=null,B(),O(),A())},Ce=(f,u)=>{if(!r.config||!r.selectedPageId||f===u)return;const p=r.config.pages.find(P=>P.id===r.selectedPageId);if(!p||!Array.isArray(p.cards)||f<0||u<0||f>=p.cards.length||u>=p.cards.length)return;const[g]=p.cards.splice(f,1);p.cards.splice(u,0,g),r.selectedCardIndex=u,r.focusedBinding=null,B(),A()},Ie=f=>{if(!r.config||!r.selectedPageId||!r.focusedBinding)return;const u=r.config.pages.find(P=>P.id===r.selectedPageId),p=r.haEntities.find(P=>P.entityId===f);if(!u||!Array.isArray(u.cards)||!p)return;const g=u.cards[r.focusedBinding.cardIndex];g&&(ur(g,r.focusedBinding.field,p),B(),A())},Pe=(f,u)=>{r.selectedCardIndex=f,r.focusedBinding={cardIndex:f,field:u},A(),window.requestAnimationFrame(()=>{const p=s.querySelector("#ha-entity-search");p==null||p.scrollIntoView({behavior:"smooth",block:"center"}),p==null||p.focus(),p==null||p.select()})};s.addEventListener("click",async f=>{var le,Q;const u=f.target,p=u==null?void 0:u.closest("[data-action]"),g=p==null?void 0:p.dataset.action;if(!g||!r.config)return;const P=Z(r.config),U=(p==null?void 0:p.dataset.pageId)||null,R=U?P.findIndex(w=>w.id===U):-1;if(g==="select-page"&&U){r.selectedPageId=U,r.selectedCardIndex=0,r.focusedBinding=null,O(),A();return}if(g==="switch-section"){const w=(p==null?void 0:p.dataset.section)||"";(w==="cards"||w==="avatar"||w==="display")&&(r.activeSectionTab=w,A());return}if(g==="page-up"&&R>0){const w=P.map(_=>_.id);[w[R-1],w[R]]=[w[R],w[R-1]],r.config.rotation.order=w,r.selectedPageId=U,B(),O(),A();return}if(g==="page-down"&&R>=0&&R<P.length-1){const w=P.map(_=>_.id);[w[R],w[R+1]]=[w[R+1],w[R]],r.config.rotation.order=w,r.selectedPageId=U,B(),O(),A();return}if(g==="page-remove"&&U&&P.length>1){r.config.pages=r.config.pages.filter(w=>w.id!==U),r.config.rotation.order=Z(r.config).map(w=>w.id),r.selectedPageId=((le=Z(r.config)[Math.max(0,R-1)])==null?void 0:le.id)||((Q=Z(r.config)[0])==null?void 0:Q.id)||null,r.selectedCardIndex=0,r.focusedBinding=null,B(),O(),A();return}if(g==="add-page"){const w=Oi(r.config);r.config.pages.push(w),r.config.rotation.order=Z(r.config).map(_=>_.id),r.selectedPageId=w.id,r.selectedCardIndex=null,r.focusedBinding=null,B(),O(),A();return}if(g==="add-card-template"&&r.selectedPageId){const w=r.config.pages.find(X=>X.id===r.selectedPageId),_=(p==null?void 0:p.dataset.cardType)||"entity";if(w){Array.isArray(w.cards)||(w.cards=[]),w.cards.push(Ge(_));const X=w.cards.length-1;r.selectedCardIndex=X;const q=Pt(_);r.focusedBinding=q?{cardIndex:X,field:q}:null,B(),A(),q&&window.requestAnimationFrame(()=>{const H=s.querySelector("#ha-entity-search");H==null||H.scrollIntoView({behavior:"smooth",block:"center"}),H==null||H.focus()})}return}if(g==="grid-add-card-at"&&r.selectedPageId){const w=r.config.pages.find(q=>q.id===r.selectedPageId),_=Number((p==null?void 0:p.dataset.col)||"0"),X=Number((p==null?void 0:p.dataset.row)||"0");if(w){Array.isArray(w.cards)||(w.cards=[]);const q=Ge("entity");q.col=_,q.row=X,q.w=1,q.h=1,w.cards.push(q),r.selectedCardIndex=w.cards.length-1,B(),A()}return}if(g==="focus-binding"){const w=Number((p==null?void 0:p.dataset.cardIndex)||"-1"),_=(p==null?void 0:p.dataset.bindingField)||"";w>=0&&_&&Pe(w,_);return}const E=Number((p==null?void 0:p.dataset.cardIndex)||"-1");if(E>=0&&r.selectedPageId){const w=r.config.pages.find(_=>_.id===r.selectedPageId);if(!w||!Array.isArray(w.cards))return;if(g==="select-card"){r.selectedCardIndex=E,A();return}if(g==="card-remove"){w.cards=w.cards.filter((_,X)=>X!==E),r.selectedCardIndex!==null&&(r.selectedCardIndex===E?r.selectedCardIndex=w.cards.length?Math.min(E,w.cards.length-1):null:r.selectedCardIndex>E&&(r.selectedCardIndex-=1)),r.focusedBinding&&(r.focusedBinding.cardIndex===E?r.focusedBinding=null:r.focusedBinding.cardIndex>E&&(r.focusedBinding={cardIndex:r.focusedBinding.cardIndex-1,field:r.focusedBinding.field})),B(),A();return}if(g==="card-up"&&E>0){[w.cards[E-1],w.cards[E]]=[w.cards[E],w.cards[E-1]],r.selectedCardIndex===E?r.selectedCardIndex=E-1:r.selectedCardIndex===E-1&&(r.selectedCardIndex=E),r.focusedBinding&&(r.focusedBinding.cardIndex===E?r.focusedBinding={cardIndex:E-1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===E-1&&(r.focusedBinding={cardIndex:E,field:r.focusedBinding.field})),B(),A();return}if(g==="card-down"&&E<w.cards.length-1){[w.cards[E],w.cards[E+1]]=[w.cards[E+1],w.cards[E]],r.selectedCardIndex===E?r.selectedCardIndex=E+1:r.selectedCardIndex===E+1&&(r.selectedCardIndex=E),r.focusedBinding&&(r.focusedBinding.cardIndex===E?r.focusedBinding={cardIndex:E+1,field:r.focusedBinding.field}:r.focusedBinding.cardIndex===E+1&&(r.focusedBinding={cardIndex:E,field:r.focusedBinding.field})),B(),A();return}}if(g==="save"){r.saving=!0,r.avatarPackSaving=r.avatarPackDirty,W(e.saving,"muted");try{const w=await St(t.sceneApiUrl);if(w.packId!==S)throw new Error(`Active scene changed from ${S} to ${w.packId}. Reload the editor before saving.`);if(r.config=await Wi(t.sceneApiUrl,st(r.config),S),r.dirty=!1,r.avatarPackDirty&&r.avatarPackDetails&&t.avatarPackApiUrl){try{r.avatarPackDetails=await tr(t.avatarPackApiUrl,r.avatarPackDetails)}catch(_){r.saving=!1,r.avatarPackSaving=!1,W(`${e.statusSaved}. ${e.avatarMappingSaveError}: ${String(_)}`,"bad");return}r.avatarPackDirty=!1}r.saving=!1,r.avatarPackSaving=!1,O(),W(e.statusSaved,"ok"),window.setTimeout(()=>we(),250)}catch(w){r.saving=!1,r.avatarPackSaving=!1,W(`${e.saveError}: ${String(w)}`,"bad")}return}if(g==="bind-entity"){const w=(p==null?void 0:p.dataset.entityId)||"";Ie(w)}}),s.addEventListener("input",f=>{const u=f.target;if(!u||!r.config){u&&u.dataset.previewDisplay!==void 0&&b(u.value);return}if(u.dataset.previewDisplay!==void 0){b(u.value);return}if(u.dataset.avatarSemantic!==void 0){const p=Re(r.config);if(!r.avatarPackDetails||!p||r.avatarPackDetails.packId!==p)return;const g=u.value.trim();g?r.avatarPackDetails.motionMap.semantic[u.dataset.avatarSemantic]=Number(g):delete r.avatarPackDetails.motionMap.semantic[u.dataset.avatarSemantic],r.avatarPackDirty=!0,W(e.statusDirty,"muted"),A();return}if(u.dataset.pageField){Se(u.dataset.pageField,u.value),A();return}if(u.dataset.displayField){xe(u.dataset.displayField,u.value),A();return}if(u.dataset.cardField&&u.dataset.cardIndex){r.selectedCardIndex=Number(u.dataset.cardIndex),$e(Number(u.dataset.cardIndex),u.dataset.cardField,u.value),A();return}u.hasAttribute("data-ha-search")&&(r.entitySearch=u.value,A())}),s.addEventListener("click",f=>{var P,U;const u=(P=f.target)==null?void 0:P.closest("[data-action='delete-avatar-pack']");if(u&&t.avatarPackApiUrl){const R=String(u.dataset.packId||"").trim(),E=String(u.dataset.packName||R).trim();if(!R||!window.confirm(e.avatarPackDeleteConfirm(E)))return;const le=`${t.avatarPackApiUrl}?packId=${encodeURIComponent(R)}`;fetch(le,{method:"DELETE",headers:he}).then(async Q=>{if(!Q.ok){const w=await Q.json().catch(()=>({}));console.warn("Failed to delete avatar pack",R,w);return}r.config&&Re(r.config)===R&&(qe(r.config).packId=null,r.avatarPackDetails=null,B()),r.avatarCatalog=r.avatarCatalog.filter(w=>w.id!==R),A()});return}const p=(U=f.target)==null?void 0:U.closest("[data-action='select-avatar-pack']");if(!p||!r.config)return;const g=String(p.dataset.packId||"").trim();qe(r.config).packId=g||null,B(),C(g||null).finally(()=>A()),A()}),a.addEventListener("click",f=>{if(!r.config)return;const u=f.target,p=u==null?void 0:u.closest("[data-scene-card-index][data-scene-page-id]");if(p){const P=String(p.dataset.scenePageId||"").trim(),U=Number(p.dataset.sceneCardIndex||"-1");P&&Number.isFinite(U)&&U>=0&&(r.selectedPageId=P,r.selectedCardIndex=U,r.focusedBinding=null,O(),A(),It("cards"));return}const g=u==null?void 0:u.closest("[data-scene-page-id]");if(g){const P=String(g.dataset.scenePageId||"").trim();P&&(r.selectedPageId=P,r.selectedCardIndex=0,r.focusedBinding=null,O(),A(),It("pages"));return}}),s.addEventListener("change",f=>{var p;const u=f.target;!u||u.dataset.avatarArchive===void 0||$(((p=u.files)==null?void 0:p[0])||null)}),s.addEventListener("focusin",f=>{const u=f.target;if(!(u!=null&&u.dataset.bindingField))return;const p=Number(u.dataset.cardIndex||"-1");p<0||(r.selectedCardIndex=p,r.focusedBinding={cardIndex:p,field:u.dataset.bindingField})});try{const f=await St(t.sceneApiUrl);if(r.config=f.config,S=f.packId,t.sceneAvatarManifestUrl)try{r.bundledAvatar=await Xi(t.sceneAvatarManifestUrl,t.packId)}catch{r.bundledAvatar=null}if(t.avatarCatalogUrl)try{r.avatarCatalog=await kt(t.avatarCatalogUrl)}catch{r.avatarCatalog=[]}r.haEntities=Gi(((ge=Dt())==null?void 0:ge.states)||null),r.selectedPageId=Vi(r.config),r.selectedCardIndex=0,r.status=e.statusSaved,r.statusTone="ok",await C(Re(r.config)),O()}catch(f){r.status=`${e.loadError}: ${String(f)}`,r.statusTone="bad"}A(),r.activeSectionTab==="avatar"&&r.config&&requestAnimationFrame(()=>{const f=h.querySelector('[data-editor-section="avatar"]');f==null||f.scrollIntoView({block:"start"}),f==null||f.focus({preventScroll:!0})})}function dt(){return new URLSearchParams(window.location.search).get("editor")==="1"}function fr(){const t=new URLSearchParams(window.location.search),e=String(t.get("avatar")||t.get("avatarAdapter")||"").trim().toLowerCase();if(e==="static"||e==="live2d")return e;if(dt())return null;const a=String(window.location.hostname||"").trim().toLowerCase(),i=a==="localhost"||a==="127.0.0.1",s=String(window.location.port||"").trim()==="48123";return i&&s?"static":null}function hr(t,e){const a=at(t),i=a.adapter==="live2d"?N("../../scene-runtime/avatar.html",e):"",s=N(String(a.assetRoot||"").trim(),e),n=h=>{const r=String(h||"").trim();return r?/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(r)||r.startsWith("/")?N(r,e):r:""},o=h=>{const r=String(h||"").trim();return r?N(r,e):""},l=Object.fromEntries(Object.entries(a.presetThumbs||{}).map(([h,r])=>[h,N(String(r||""),e)]).filter(([,h])=>!!h));if(fr()==="static"&&a.adapter==="live2d"){const h=n(String(a.fallbackPortrait||a.modelUrl||a.entry||"").trim());if(h)return{...a,adapter:"static",runtimeUrl:"",entry:h,modelUrl:h,fallbackPortrait:h,motionMapUrl:"",capabilities:{supportsEmotion:!1,supportsMotion:!1,supportsViewPresets:!0,supportsLipSync:!1,supportsPointerFocus:!1},presetThumbs:l}}return{...a,assetRoot:s,runtimeUrl:i||N(String(a.runtimeUrl||"").trim(),e),entry:n(String(a.entry||"").trim()),modelUrl:n(String(a.modelUrl||"").trim()),fallbackPortrait:n(String(a.fallbackPortrait||"").trim()),motionMapUrl:o(String(a.motionMapUrl||"").trim()),presetThumbs:l}}function gr(t,e){var a,i,s,n,o,l,d,h,r,S,C,x;return{...t,links:Object.fromEntries(Object.entries(t.links||{}).map(([b,$])=>[b,N($,e)]).filter(([,b])=>!!b)),weather:t.weather,avatar:{manifestUrl:N(String(((a=t.avatar)==null?void 0:a.manifestUrl)||"").trim(),e)},scene:{configUrl:N(String(((i=t.scene)==null?void 0:i.configUrl)||"").trim(),e)},state:{provider:((s=t.state)==null?void 0:s.provider)||"json",stateUrl:N(String(((n=t.state)==null?void 0:n.stateUrl)||"").trim(),e),apiUrl:N(String(((o=t.state)==null?void 0:o.apiUrl)||"").trim(),e)||void 0,haApiFallback:((l=t.state)==null?void 0:l.haApiFallback)===!0,idleLinesUrl:N(String(((d=t.state)==null?void 0:d.idleLinesUrl)||"").trim(),e),entityMapUrl:N(String(((h=t.state)==null?void 0:h.entityMapUrl)||"").trim(),e)},control:{provider:((r=t.control)==null?void 0:r.provider)||"json",controlUrl:N(String(((S=t.control)==null?void 0:S.controlUrl)||"").trim(),e),apiUrl:N(String(((C=t.control)==null?void 0:C.apiUrl)||"").trim(),e)||void 0,entityMapUrl:N(String(((x=t.control)==null?void 0:x.entityMapUrl)||"").trim(),e)||void 0}}}async function mr(t,e){var b,$,k,L,T,j,Y,A;const a=N(String(((b=t.files)==null?void 0:b.rendererConfigUrl)||"").trim(),e);if(!a)return"";const i=N(String((($=t.files)==null?void 0:$.sceneConfigUrl)||"").trim(),e),s=N(String(((k=t.files)==null?void 0:k.avatarCatalogUrl)||"").trim(),e);let n="";if(i&&s)try{const W=await ve(i);n=String(((L=W.avatar)==null?void 0:L.packId)||"").trim()}catch{n=""}let o="";if(n&&s)try{const W=await ve(s),O=Array.isArray(W.items)?W.items.find(B=>String(B.id||"").trim()===n):null;o=N(String((O==null?void 0:O.manifestUrl)||"").trim(),e)}catch{o=""}const l=gr(await ve(a),a);i&&(l.scene={...l.scene||{},configUrl:i});const d=N(String(((T=t.files)==null?void 0:T.haStatesUrl)||"").trim(),e);d&&(l.state={...l.state||{},apiUrl:((j=l.state)==null?void 0:j.apiUrl)||d},l.control={...l.control||{},apiUrl:((Y=l.control)==null?void 0:Y.apiUrl)||d});const h=o||String(((A=l.avatar)==null?void 0:A.manifestUrl)||"").trim();if(!h)return URL.createObjectURL(new Blob([JSON.stringify(l)],{type:"application/json"}));const r=N(h,e),S=hr(await ve(r),r),C=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:"application/json"})),x={...l,avatar:{manifestUrl:C}};return URL.createObjectURL(new Blob([JSON.stringify(x)],{type:"application/json"}))}const vr="weather.forecast_home_assistant",br={ru:{startingTitle:"Запуск сцены",startingBody:"Загружаю bootstrap для размещённой версии kiosk-scene...",missingRendererTitle:"Не найден renderer config",missingRendererBody:"Хост сцены запущен, но в активном pack пока нет renderer.kiosk-scene.json.",failedTitle:"Сцена не запустилась",failedBody:"Не удалось загрузить bootstrap из add-on Kiosk Scene. Повторяю попытку автоматически.",retryIn:(t,e)=>`Попытка ${e}, следующая через ${t} с.`},en:{startingTitle:"Starting scene host",startingBody:"Loading hosted kiosk-scene bootstrap...",missingRendererTitle:"Scene host is missing a renderer config",missingRendererBody:"The scene host is up, but the active pack does not provide renderer.kiosk-scene.json yet.",failedTitle:"Scene host failed to start",failedBody:"The hosted runtime could not load its bootstrap payload from the Kiosk Scene add-on. Retrying automatically.",retryIn:(t,e)=>`Attempt ${e}, next try in ${t}s.`}};function yr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function wr(t){if(!yr(t))return null;const e=String(t.type||"").trim();return e!=="kiosk-display-off"&&e!=="kiosk-display-on"?null:{type:e,displayOn:t.displayOn===void 0?e==="kiosk-display-on":t.displayOn===!0,source:String(t.source||"").trim()||void 0,timestamp:Number.isFinite(Number(t.timestamp))?Number(t.timestamp):void 0}}let et=null,Le=null;function Sr(t){const e=Array.from(document.querySelectorAll("iframe.ks-live2d-iframe"));let a=!1;for(const i of e)i.contentWindow&&(i.contentWindow.postMessage(t,"*"),a=!0);return a}function He(t=24){Le!==null&&(window.clearTimeout(Le),Le=null),et&&(Sr(et)||t<=0||(Le=window.setTimeout(()=>{He(t-1)},120)))}window.addEventListener("message",t=>{if(t.origin!==window.location.origin)return;const e=wr(t.data);e&&(et=e,He())});function xr(){if(!dt())return;const t=()=>window.scrollTo(0,0);"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual"),t(),window.addEventListener("pageshow",t,{once:!0}),window.addEventListener("load",t,{once:!0}),window.requestAnimationFrame(()=>{t(),window.setTimeout(t,120)});let e=!1;const a=()=>{e=!0},i=["pointerdown","wheel","touchstart","keydown"];for(const o of i)window.addEventListener(o,a,{once:!0,passive:!0});let s=0;const n=window.setInterval(()=>{if(e||s>=24){window.clearInterval(n);return}t(),s+=1},80)}function $r(t){return`https://api.open-meteo.com/v1/forecast?${new URLSearchParams({latitude:String(t.latitude),longitude:String(t.longitude),current:"temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,cloud_cover,weather_code",daily:"weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",timezone:t.timezone||"auto",forecast_days:"6"}).toString()}`}const ye=document.getElementById("app");if(!ye)throw new Error("Missing #app root element");const ce=ra(),te=br[ce];xr();Be(ye,te.startingTitle,te.startingBody);async function kr(t){var C,x;const e=na(),a=await oa(e),i=String(a.packId||"").trim(),s=await mr(a,e);if(!s)return Be(t,te.missingRendererTitle,te.missingRendererBody,JSON.stringify(a,null,2)),null;const n=await ve(s);document.documentElement.dataset.packId=i;const o=((C=n.assistant)==null?void 0:C.name)||i||"kiosk-scene";document.title=o;const l=n.weather??(i.toLowerCase()==="neiri"?{entity:vr}:void 0),d=String(((x=n.state)==null?void 0:x.apiUrl)||"").trim()||void 0,h=new ua,r=await Ci(t,{rendererConfigUrl:s,weatherUrl:"./weather.json",weatherReader:l!=null&&l.entity||l!=null&&l.openMeteo?gi({weatherEntity:l.entity||"",openMeteoUrl:l.openMeteo?$r(l.openMeteo):void 0,locale:ce==="ru"?"ru-RU":"en-US",iconBaseUrl:"./assets",apiUrl:d,allowApiFallback:!0}):void 0,iconBaseUrl:"./assets",copy:da(ce,o),labels:fa(ce),presetLabels:pa(ce),defaultWeather:la(ce,(l==null?void 0:l.location)??""),extensions:h});He(),ca(h,a,e);try{await S()}catch(b){throw await r.dispose(),await Promise.allSettled(h.listExtensions().map($=>h.unload($.id))),b}return r;async function S(){var b,$,k,L;dt()&&(await pr({packId:i,sceneApiUrl:N(String(a.sceneEditorApiUrl||"").trim(),e),sceneAvatarManifestUrl:N(String(((b=a.files)==null?void 0:b.avatarManifestUrl)||"").trim(),e),avatarCatalogUrl:N(String((($=a.files)==null?void 0:$.avatarCatalogUrl)||"").trim(),e),avatarImportUrl:N(String(((k=a.files)==null?void 0:k.avatarImportUrl)||"").trim(),e),avatarPackApiUrl:N(String(((L=a.files)==null?void 0:L.avatarPackApiUrl)||"").trim(),e),sceneUrl:N(String(a.entryUrl||a.runtimeBaseUrl||"./").trim(),e)}),He())}}sa(()=>kr(ye),{onRetry(t,e,a){Be(ye,te.failedTitle,`${te.failedBody} ${te.retryIn(Math.round(a/1e3),e)}`,String(t))}}).catch(t=>{Be(ye,te.failedTitle,te.failedBody,String(t))});
