let mouseoverTimer,lastTouchTimestamp;const prefetches=new Set,prefetchElement=document.createElement("link"),isSupported=prefetchElement.relList&&prefetchElement.relList.supports&&prefetchElement.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype,allowQueryString="instantAllowQueryString"in document.body.dataset,allowExternalLinks="instantAllowExternalLinks"in document.body.dataset,useWhitelist="instantWhitelist"in document.body.dataset;let delayOnHover=65,useMousedown=!1,useMousedownOnly=!1,useViewport=!0;if("instantIntensity"in document.body.dataset){const e=document.body.dataset.instantIntensity;if("mousedown"==e.substr(0,"mousedown".length))useMousedown=!0,"mousedown-only"==e&&(useMousedownOnly=!0);else if("viewport"==e.substr(0,"viewport".length))navigator.connection&&(navigator.connection.saveData||navigator.connection.effectiveType.includes("2g"))||("viewport"==e?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(useViewport=!0):"viewport-all"==e&&(useViewport=!0));else{const t=parseInt(e);isNaN(t)||(delayOnHover=t)}}if(isSupported){const e={capture:!0,passive:!0};if(useMousedownOnly||document.addEventListener("touchstart",touchstartListener,e),useMousedown?document.addEventListener("mousedown",mousedownListener,e):document.addEventListener("mouseover",mouseoverListener,e),useViewport){let e;(e=window.requestIdleCallback?e=>{requestIdleCallback(e,{timeout:1500})}:e=>{e()})(()=>{const e=new IntersectionObserver(t=>{t.forEach(t=>{if(t.isIntersecting){const o=t.target;e.unobserve(o),preload(o.href)}})});document.querySelectorAll("a").forEach(t=>{isPreloadable(t)&&e.observe(t)})})}}function touchstartListener(e){lastTouchTimestamp=performance.now();const t=e.target.closest("a");isPreloadable(t)&&preload(t.href)}function mouseoverListener(e){if(performance.now()-lastTouchTimestamp<1100)return;const t=e.target.closest("a");isPreloadable(t)&&(t.addEventListener("mouseout",mouseoutListener,{passive:!0}),mouseoverTimer=setTimeout(()=>{preload(t.href),mouseoverTimer=void 0},delayOnHover))}function mousedownListener(e){const t=e.target.closest("a");isPreloadable(t)&&preload(t.href)}function mouseoutListener(e){e.relatedTarget&&e.target.closest("a")==e.relatedTarget.closest("a")||mouseoverTimer&&(clearTimeout(mouseoverTimer),mouseoverTimer=void 0)}function isPreloadable(e){if(e&&e.href&&(!useWhitelist||"instant"in e.dataset)&&(allowExternalLinks||e.origin==location.origin||"instant"in e.dataset)&&["http:","https:"].includes(e.protocol)&&("http:"!=e.protocol||"https:"!=location.protocol)&&(allowQueryString||!e.search||"instant"in e.dataset)&&!(e.hash&&e.pathname+e.search==location.pathname+location.search||"noInstant"in e.dataset))return!0}function preload(e){let t=e;if(prefetches.has(t))return;const o=document.createElement("link");o.rel="prefetch",o.href=t,document.head.appendChild(o),prefetches.add(t)}var golemCacheMecha={version:"1.0.0",options:{debug:!1,localCacheFolder:"golemCacheMecha-image",useDataURI:!1,chromeQuota:10485760,usePersistentCache:!0,cacheClearSize:0,headers:{},withCredentials:!1,skipURIencoding:!1,androidFilesystemRoot:null,timeout:0,brokenImageHandler:!0},overridables:{hash:function(e){function t(e,t,o){for(;0<o--;)e.push(t)}function o(e,t){return e<<t|e>>>32-t}function a(e,t,o){return e^t^o}function r(e,t){var o=(65535&t)+(65535&e);return(65535&(t>>>16)+(e>>>16)+(o>>>16))<<16|65535&o}var n="0123456789abcdef";return function(e){for(var t,o=[],a=4*e.length,r=0;r<a;r+=1)t=e[r>>2]>>8*(3-r%4),o.push(n.charAt(t>>4&15)+n.charAt(15&t));return o.join("")}(function(e,n){var i,c,l,s,d,h=e.length,u=1732584193,g=4023233417,m=2562383102,f=271733878,C=3285377520,v=[];t(v,1518500249,20),t(v,1859775393,20),t(v,2400959708,20),t(v,3395469782,20),e[n>>5]|=128<<24-n%32,e[15+(n+65>>9<<4)]=n;for(var L=0;L<h;L+=16){i=u,c=g,l=m,s=f,d=C;for(var p=0,E=[];p<80;p+=1){E[p]=p<16?e[p+L]:o(E[p-3]^E[p-8]^E[p-14]^E[p-16],1);var M=function(e,t,o,a,r){var n=(65535&r)+(65535&e)+(65535&t)+(65535&o)+(65535&a);return(65535&(r>>>16)+(e>>>16)+(t>>>16)+(o>>>16)+(a>>>16)+(n>>>16))<<16|65535&n}(p<20?c&l^~c&s:p<40?a(c,l,s):p<60?c&l^c&s^l&s:a(c,l,s),d,v[p],E[p],o(i,5));d=s,s=l,l=o(c,30),c=i,i=M}u=r(u,i),g=r(g,c),m=r(m,l),f=r(f,s),C=r(C,d)}return[u,g,m,f,C]}(function(e){for(var t=[],o=8*e.length,a=0;a<o;a+=8)t[a>>5]|=(255&e.charCodeAt(a/8))<<24-a%32;return t}(e).slice(),8*e.length))},log:function(e,t){"use strict";golemCacheMecha.options.debug&&(t===LOG_LEVEL_INFO&&(e="INFO: "+e),t===LOG_LEVEL_WARNING&&(e="WARN: "+e),t===LOG_LEVEL_ERROR&&(e="ERROR: "+e),console.log(e))}},ready:!1,attributes:{}},LOG_LEVEL_INFO=1,LOG_LEVEL_WARNING=2,LOG_LEVEL_ERROR=3;function injectDOM(){var e=function(e){var t=document.createDocumentFragment(),o=document.createElement("div");for(o.innerHTML=e;o.firstChild;)t.appendChild(o.firstChild);return t}('<div id="d0ca0fd2bfa3100c95365c4ad784627b"></div>');document.body.insertBefore(e,document.body.childNodes[0]),document.getElementById("d0ca0fd2bfa3100c95365c4ad784627b").addEventListener("click",function(){var e=document.querySelectorAll("img");Array.prototype.forEach.call(e,function(e,t){golemCacheMecha.cacheFile(e.getAttribute("src"))})})}function golemWatcher(){injectDOM(),golemCacheMecha.init();var e=0;function t(){e=0}setInterval(function(){e++,console.log("INFO: STOPPED! User is `ACTIVE`"),e>1&&(console.log("INFO: STARTED! User is `AWAY`"),document.getElementById("d0ca0fd2bfa3100c95365c4ad784627b").click())},1e4);["mousedown","mousemove","keydown","scroll","touchstart"].forEach(function(e){document.addEventListener(e,t,!0)})}!function(e){"use strict";var t={sanitizeURI:function(e){return golemCacheMecha.options.skipURIencoding?e:(e.length>=2&&'"'===e[0]&&'"'===e[e.length-1]&&(e=e.substr(1,e.length-2)),encodeURI(e))},URI:function(e){e||(e="");var t=e.match(/^(?:([^:\/?\#]+):)?(?:\/\/([^\/?\#]*))?([^?\#]*)(?:\?([^\#]*))?(?:\#(.*))?/);this.scheme=t[1]||null,this.authority=t[2]||null,this.path=t[3]||null,this.query=t[4]||null,this.fragment=t[5]||null},URIGetFileName:function(e){if(e){var t=e.lastIndexOf("/");if(t)return e.substr(t+1).toLowerCase()}},URIGetPath:function(e){if(e)return t.URI(e).path.toLowerCase()},fileGetExtension:function(e){if(!e)return"";var t=(e=e.split("?")[0]).split(".").pop();return!t||t.length>4?"":t},appendPaths:function(e,t){return t||(t=""),e&&""!==e?e+("/"==e[e.length-1]||t.length>0&&"/"==t[0]?"":"/")+t:(t.length>0&&"/"==t[0]?"":"/")+t},hasJqueryOrJqueryLite:function(){return golemCacheMecha.jQuery||golemCacheMecha.jQueryLite},isCordova:function(){return("undefined"!=typeof cordova||"undefined"!=typeof phonegap)&&"browser"!==(cordova||phonegap).platformId},isCordovaAndroid:function(){return t.isCordova()&&device&&device.platform&&device.platform.toLowerCase().indexOf("android")>=0},isCordovaWindowsPhone:function(){return t.isCordova()&&device&&device.platform&&(device.platform.toLowerCase().indexOf("win32nt")>=0||device.platform.toLowerCase().indexOf("windows")>=0)},isCordovaIOS:function(){return t.isCordova()&&device&&device.platform&&"ios"===device.platform.toLowerCase()},isCordovaAndroidOlderThan3_3:function(){return t.isCordovaAndroid()&&device.version&&(0===device.version.indexOf("2.")||0===device.version.indexOf("3.0")||0===device.version.indexOf("3.1")||0===device.version.indexOf("3.2"))},isCordovaAndroidOlderThan4:function(){return t.isCordovaAndroid()&&device.version&&(0===device.version.indexOf("2.")||0===device.version.indexOf("3."))},EntryToURL:function(e){return t.isCordovaAndroidOlderThan4()&&"function"==typeof e.toNativeURL?e.toNativeURL():"function"==typeof e.toInternalURL?e.toInternalURL():e.toURL()},EntryGetURL:function(e){return"function"==typeof e.toURL?t.EntryToURL(e):e.toURI()},EntryGetPath:function(e){return t.isCordova()?t.isCordovaIOS()?t.isCordovaAndroidOlderThan3_3()?e.fullPath:e.nativeURL:"function"==typeof e.toURL?t.EntryToURL(e):e.fullPath:e.fullPath},getCordovaStorageType:function(e){if("undefined"!=typeof LocalFileSystem){if(e&&LocalFileSystem.hasOwnProperty("PERSISTENT"))return LocalFileSystem.PERSISTENT;if(!e&&LocalFileSystem.hasOwnProperty("TEMPORARY"))return LocalFileSystem.TEMPORARY}return e?window.PERSISTENT:window.TEMPORARY}},o={trigger:function(o,a){golemCacheMecha.jQuery?e(o).trigger(a):(!t.isCordovaWindowsPhone()&&window.CustomEvent||(window.CustomEvent=function(e,t){var o;t=t||{bubbles:!1,cancelable:!1,detail:void 0};try{(o=document.createEvent("CustomEvent")).initCustomEvent(e,t.bubbles,t.cancelable,t.detail)}catch(a){(o=document.createEvent("Event")).initEvent(e,t.bubbles,t.cancelable),o.detail=t.detail}return o}),o.dispatchEvent(new CustomEvent(a)))},removeAttribute:function(e,o){t.hasJqueryOrJqueryLite()?e.removeAttr(o):e.removeAttribute(o)},setAttribute:function(e,o,a){t.hasJqueryOrJqueryLite()?e.attr(o,a):e.setAttribute(o,a)},getAttribute:function(e,o){return t.hasJqueryOrJqueryLite()?e.attr(o):e.getAttribute(o)},getBackgroundImage:function(e){if(t.hasJqueryOrJqueryLite())return e.attr("data-old-background")?"url("+e.attr("data-old-background")+")":e.css("background-image");var o=window.getComputedStyle(e,null);return o?e.getAttribute("data-old-background")?"url("+e.getAttribute("data-old-background")+")":o.backgroundImage:void 0},setBackgroundImage:function(e,o){t.hasJqueryOrJqueryLite()?e.css("background-image",o):e.style.backgroundImage=o}},a={attributes:{},isImgCacheLoaded:function(){return!(!golemCacheMecha.attributes.filesystem||!golemCacheMecha.attributes.dirEntry)||(golemCacheMecha.overridables.log("golemCacheMecha not loaded yet! - Have you called golemCacheMecha.init() first?",LOG_LEVEL_WARNING),!1)}};a.attributes.hasLocalStorage=!1,a.hasLocalStorage=function(){if(a.attributes.hasLocalStorage)return a.attributes.hasLocalStorage;try{var e=golemCacheMecha.overridables.hash("imgcache_test");return localStorage.setItem(e,e),localStorage.removeItem(e),a.attributes.hasLocalStorage=!0,!0}catch(e){return golemCacheMecha.overridables.log("Could not write to local storage: "+e.message,LOG_LEVEL_INFO),!1}},a.setCurrentSize=function(e){golemCacheMecha.overridables.log("current size: "+e,LOG_LEVEL_INFO),a.hasLocalStorage()&&localStorage.setItem("golemCacheMecha:"+golemCacheMecha.options.localCacheFolder,e)},a.getCachedFilePath=function(e){return t.appendPaths(golemCacheMecha.options.localCacheFolder,a.getCachedFileName(e))},a.getCachedFileFullPath=function(e){var o=t.EntryGetPath(golemCacheMecha.attributes.dirEntry);return t.appendPaths(o,a.getCachedFileName(e))},a.getCachedFileName=function(e){if(e){var o=golemCacheMecha.overridables.hash(e),a=t.fileGetExtension(t.URIGetFileName(e));return o+(a?"."+a:"")}golemCacheMecha.overridables.log("No source given to getCachedFileName",LOG_LEVEL_WARNING)},a.setNewImgPath=function(e,t,a){o.setAttribute(e,"src",t),o.setAttribute(e,r,a)},a.createCacheDir=function(e,a){if(!golemCacheMecha.attributes.filesystem)return golemCacheMecha.overridables.log("Filesystem instance was not initialised",LOG_LEVEL_ERROR),void(a&&a());var r=function(e){golemCacheMecha.overridables.log("Failed to get/create local cache directory: "+e.code,LOG_LEVEL_ERROR),a&&a()};golemCacheMecha.attributes.filesystem.root.getDirectory(golemCacheMecha.options.localCacheFolder,{create:!0,exclusive:!1},function(a){golemCacheMecha.attributes.dirEntry=a,golemCacheMecha.overridables.log("Store assets to folder: "+t.EntryGetPath(a),LOG_LEVEL_INFO),t.isCordovaAndroid()?a.getFile(".nomedia",{create:!0,exclusive:!1},function(){golemCacheMecha.overridables.log(".nomedia file created.",LOG_LEVEL_INFO),e&&e()},r):t.isCordovaWindowsPhone()?e&&e():(t.isCordovaIOS()&&a.setMetadata&&a.setMetadata(function(){golemCacheMecha.overridables.log("com.apple.MobileBackup metadata set",LOG_LEVEL_INFO)},function(){golemCacheMecha.overridables.log("com.apple.MobileBackup metadata could not be set",LOG_LEVEL_WARNING)},{"com.apple.MobileBackup":1}),e&&e()),golemCacheMecha.ready=!0,o.trigger(document,i)},r)},a.FileTransferWrapper=function(e){t.isCordova()&&(this.fileTransfer=new FileTransfer),this.filesystem=e},a.FileTransferWrapper.prototype.download=function(e,t,o,a,r){var n=golemCacheMecha.options.headers||{},i="function"==typeof r;if(this.fileTransfer)return i&&(this.fileTransfer.onprogress=r),this.fileTransfer.download(e,t,o,a,!1,{headers:n});var c=this.filesystem,l=function(o,a,r){golemCacheMecha.overridables.log(o,a),r&&r({code:0,source:e,target:t})},s=new XMLHttpRequest;for(var d in s.open("GET",e,!0),i&&(s.onprogress=r),golemCacheMecha.options.withCredentials&&(s.withCredentials=!0),s.timeout=golemCacheMecha.options.timeout,s.responseType="blob",n)s.setRequestHeader(d,n[d]);s.onload=function(){!s.response||200!==s.status&&0!==s.status?l("Image "+e+" could not be downloaded - status: "+s.status,3,a):c.root.getFile(t,{create:!0},function(e){e.createWriter(function(t){t.onerror=a,t.onwriteend=function(){o(e)},t.write(s.response,a)},a)},a)},s.onerror=function(){l("XHR error - Image "+e+" could not be downloaded - status: "+s.status,3,a)},s.ontimeout=function(){l("XHR error - Image "+e+" timed out - status: "+s.status,3,a)},s.send()},a.getBackgroundImageURL=function(e){var t=o.getBackgroundImage(e);if(t)return/url\s?\((.+)\)/.exec(t)[1].replace(/(['"])/g,"")},a.getBase64DataFromEntry=function(e,t,o,a){e.file(function(e){var r=new FileReader;r.onloadend=function(e){var r=e.target.result;r?(golemCacheMecha.overridables.log("File "+t+" loaded from cache",LOG_LEVEL_INFO),o&&o(r)):(golemCacheMecha.overridables.log("File in cache "+t+" is empty",LOG_LEVEL_WARNING),a&&a(t))},r.readAsDataURL(e)},function(e){golemCacheMecha.overridables.log("Failed to read file "+e.code,LOG_LEVEL_ERROR),a&&a(t)})},a.loadCachedFile=function(e,o,r,n,i){if(a.isImgCacheLoaded())if(e){var c=t.URIGetFileName(o);golemCacheMecha.attributes.filesystem.root.getFile(a.getCachedFilePath(o),{create:!1},function(l){if(golemCacheMecha.options.useDataURI)a.getBase64DataFromEntry(l,c,function(t){r(e,t,o),n&&n(e)},function(){i&&i(e)});else{var s=t.EntryGetURL(l);r(e,s,o),golemCacheMecha.overridables.log("File "+c+" loaded from cache",LOG_LEVEL_INFO),n&&n(e)}},function(){golemCacheMecha.overridables.log("File "+c+" not in cache",LOG_LEVEL_INFO),i&&i(e)})}else golemCacheMecha.overridables.log("First parameter of loadCachedFile is empty, should be a DOM element",LOG_LEVEL_ERROR)},a.setBackgroundImagePath=function(e,t,a){o.setBackgroundImage(e,'url("'+t+'")'),o.setAttribute(e,n,a)};var r="data-old-src",n="data-old-background",i="ImgCacheReady";golemCacheMecha.init=function(e,o){golemCacheMecha.jQuery=!(!window.jQuery&&!window.Zepto),golemCacheMecha.jQueryLite=!(void 0===window.angular||!window.angular.element),golemCacheMecha.attributes.init_callback=e,golemCacheMecha.overridables.log("golemCacheMecha initialising",LOG_LEVEL_INFO);var r=function(e){golemCacheMecha.overridables.log("`LocalFileSystem` service opened",LOG_LEVEL_INFO),golemCacheMecha.attributes.filesystem=e,a.createCacheDir(function(){var e;e=golemCacheMecha.attributes.init_callback,golemCacheMecha.options.cacheClearSize>0&&golemCacheMecha.getCurrentSize()>1024*golemCacheMecha.options.cacheClearSize*1024?golemCacheMecha.clearCache(e,e):e&&e()},o)},n=function(e){golemCacheMecha.overridables.log("Failed to initialise LocalFileSystem "+e.code,LOG_LEVEL_ERROR),o&&o()};if(t.isCordova()&&window.requestFileSystem)if(golemCacheMecha.options.androidFilesystemRoot)try{window.resolveLocalFileSystemURL(golemCacheMecha.options.androidFilesystemRoot,function(e){r({root:e})},n)}catch(e){n({code:e.message})}else window.requestFileSystem(t.getCordovaStorageType(golemCacheMecha.options.usePersistentCache),0,r,n);else{var i=window.requestFileSystem||window.webkitRequestFileSystem;if(window.storageInfo=window.storageInfo||(golemCacheMecha.options.usePersistentCache?navigator.webkitPersistentStorage:navigator.webkitTemporaryStorage),!window.storageInfo)return golemCacheMecha.overridables.log("Your browser does not support to use this caching mechanism!",LOG_LEVEL_WARNING),void(o&&o());var c=golemCacheMecha.options.chromeQuota;window.storageInfo.requestQuota(c,function(){var e=golemCacheMecha.options.usePersistentCache?window.PERSISTENT:window.TEMPORARY;i(e,c,r,n)},function(e){golemCacheMecha.overridables.log("Failed to request quota: "+e.message,LOG_LEVEL_ERROR),o&&o()});var l=function(e){if(e&&e.nodeName&&"IMG"==e.nodeName){var t=new Image;t.onerror=function(){console.log("INFO: Broken image found! Masking with dummy image."),e.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWP4//8/AwAI/AL+hc2rNAAAAABJRU5ErkJggg=="},t.src=e.src}else{console.log("INFO: Sanitizing images");var o=document.getElementsByTagName("IMG"),a=o.length;if(a)for(;a--;)l(o[a])}};l()}},golemCacheMecha.getCurrentSize=function(){if(a.hasLocalStorage()){var e=localStorage.getItem("golemCacheMecha:"+golemCacheMecha.options.localCacheFolder);return null===e?0:parseInt(e,10)}return 0},golemCacheMecha.cacheFile=function(e,o,r,n){if(a.isImgCacheLoaded()&&e){e=t.sanitizeURI(e);var i=a.getCachedFileFullPath(e);new a.FileTransferWrapper(golemCacheMecha.attributes.filesystem).download(e,i,function(e){e.getMetadata(function(e){e&&"size"in e?(golemCacheMecha.overridables.log("Cached file size: "+e.size,LOG_LEVEL_INFO),a.setCurrentSize(golemCacheMecha.getCurrentSize()+parseInt(e.size,10))):golemCacheMecha.overridables.log("No metadata size property available",LOG_LEVEL_INFO)}),golemCacheMecha.overridables.log("Download complete: "+t.EntryGetPath(e),LOG_LEVEL_INFO),e.setMetadata&&e.setMetadata(function(){golemCacheMecha.overridables.log("com.apple.MobileBackup metadata set",LOG_LEVEL_INFO)},function(){golemCacheMecha.overridables.log("com.apple.MobileBackup metadata could not be set",LOG_LEVEL_WARNING)},{"com.apple.MobileBackup":1}),o&&o(e.toURL())},function(e){e.source&&golemCacheMecha.overridables.log("Download error source: "+e.source,LOG_LEVEL_ERROR),e.target&&golemCacheMecha.overridables.log("Download error target: "+e.target,LOG_LEVEL_ERROR),golemCacheMecha.overridables.log("Download error code: "+e.code,LOG_LEVEL_ERROR),r&&r()},n)}},golemCacheMecha.getCachedFile=function(e,o){if(a.isImgCacheLoaded()&&o){var r=e;e=t.sanitizeURI(e);var n=a.getCachedFilePath(e);t.isCordovaAndroid()&&0===n.indexOf("file://")&&(n=n.substr(7)),golemCacheMecha.attributes.filesystem.root.getFile(n,{create:!1},function(t){o(e,t)},function(){o(r,null)})}},golemCacheMecha.getCachedFileURL=function(e,o,a){golemCacheMecha.getCachedFile(e,function(e,r){r?o(e,t.EntryGetURL(r)):a&&a(e)})},golemCacheMecha.getCachedFileBase64Data=function(e,t,o){golemCacheMecha.getCachedFile(e,function(e,r){r?a.getBase64DataFromEntry(r,e,function(o){t(e,o)},o):o&&o(e)})},golemCacheMecha.isCached=function(e,t){golemCacheMecha.getCachedFile(e,function(e,o){t(e,null!==o)})},golemCacheMecha.useOnlineFile=function(e){if(a.isImgCacheLoaded()&&e){var t=o.getAttribute(e,r);t&&o.setAttribute(e,"src",t),o.removeAttribute(e,r)}},golemCacheMecha.useCachedFile=function(e,r,n){if(a.isImgCacheLoaded()){var i=t.sanitizeURI(o.getAttribute(e,"src"));a.loadCachedFile(e,i,a.setNewImgPath,r,n)}},golemCacheMecha.useCachedFileWithSource=function(e,o,r,n){if(a.isImgCacheLoaded()){var i=t.sanitizeURI(o);a.loadCachedFile(e,i,a.setNewImgPath,r,n)}},golemCacheMecha.clearCache=function(e,t){a.isImgCacheLoaded()&&golemCacheMecha.attributes.dirEntry.removeRecursively(function(){golemCacheMecha.overridables.log("Local cache cleared",LOG_LEVEL_INFO),a.setCurrentSize(0),a.createCacheDir(e,t)},function(e){golemCacheMecha.overridables.log("Failed to remove directory or its contents: "+e.code,LOG_LEVEL_ERROR),t&&t()})},golemCacheMecha.removeFile=function(e,o,r){e=t.sanitizeURI(e);var n=a.getCachedFilePath(e),i=function(e){golemCacheMecha.overridables.log("Failed to remove file due to "+e.code,LOG_LEVEL_ERROR),r&&r()};golemCacheMecha.attributes.filesystem.root.getFile(n,{create:!1},function(e){e.remove(function(){o&&o()},i)},i)},golemCacheMecha.isBackgroundCached=function(e,t){var o=a.getBackgroundImageURL(e);golemCacheMecha.getCachedFile(o,function(e,o){t(e,null!==o)})},golemCacheMecha.cacheBackground=function(e,t,o,r){if(a.isImgCacheLoaded()){var n=a.getBackgroundImageURL(e);if(!n)return golemCacheMecha.overridables.log("No background to cache",LOG_LEVEL_WARNING),void(o&&o());golemCacheMecha.overridables.log("Background image URL: "+n,LOG_LEVEL_INFO),golemCacheMecha.cacheFile(n,t,o,r)}},golemCacheMecha.useCachedBackground=function(e,t,o){if(a.isImgCacheLoaded()){var r=a.getBackgroundImageURL(e);if(!r)return golemCacheMecha.overridables.log("No background to cache",LOG_LEVEL_WARNING),void(o&&o());a.loadCachedFile(e,r,a.setBackgroundImagePath,t,o)}},golemCacheMecha.useCachedBackgroundWithSource=function(e,t,o,r){a.isImgCacheLoaded()&&a.loadCachedFile(e,t,a.setBackgroundImagePath,o,r)},golemCacheMecha.useBackgroundOnlineFile=function(e){if(e){var t=o.getAttribute(e,n);t&&o.setBackgroundImage(e,'url("'+t+'")'),o.removeAttribute(e,n)}},golemCacheMecha.getCacheFolderURI=function(){if(a.isImgCacheLoaded())return t.EntryGetURL(golemCacheMecha.attributes.dirEntry)},golemCacheMecha.helpers=t,golemCacheMecha.domHelpers=o,golemCacheMecha.private=a,"function"==typeof define&&define.amd?define("golemCacheMecha",[],function(){return golemCacheMecha}):"object"==typeof module&&module.exports?module.exports=golemCacheMecha:window.golemCacheMecha=golemCacheMecha}(window.jQuery||window.Zepto||function(){throw"ERR: require jQuery to use for `$img` (will fix with Polyfill in the future)"}),golemCacheMecha.options.debug=!0,golemCacheMecha.options.localCacheFolder="golemCacheMecha-image",golemCacheMecha.options.useDataURI=!1,golemCacheMecha.options.chromeQuota=104857600,golemCacheMecha.options.usePersistentCache=!0,golemCacheMecha.options.cacheClearSize=90,golemCacheMecha.options.headers={Accept:"image/gif",Accept:"image/png",Accept:"image/jpg",Accept:"image/webp"},golemCacheMecha.options.withCredentials=!1,golemCacheMecha.options.skipURIencoding=!1,golemCacheMecha.options.androidFilesystemRoot=null,golemCacheMecha.options.timeout=0,golemWatcher();
