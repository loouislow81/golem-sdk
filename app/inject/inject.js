let mouseoverTimer,lastTouchTimestamp;const prefetches=new Set,prefetchElement=document.createElement("link"),isSupported=prefetchElement.relList&&prefetchElement.relList.supports&&prefetchElement.relList.supports("prefetch")&&window.IntersectionObserver&&"isIntersecting"in IntersectionObserverEntry.prototype,allowQueryString="instantAllowQueryString"in document.body.dataset,allowExternalLinks="instantAllowExternalLinks"in document.body.dataset,useWhitelist="instantWhitelist"in document.body.dataset;let delayOnHover=65,useMousedown=!0,useMousedownOnly=!1,useViewport=!0;if("instantIntensity"in document.body.dataset){const e=document.body.dataset.instantIntensity;if("mousedown"==e.substr(0,"mousedown".length))useMousedown=!0,"mousedown-only"==e&&(useMousedownOnly=!0);else if("viewport"==e.substr(0,"viewport".length))navigator.connection&&(navigator.connection.saveData||navigator.connection.effectiveType.includes("2g"))||("viewport"==e?document.documentElement.clientWidth*document.documentElement.clientHeight<45e4&&(useViewport=!0):"viewport-all"==e&&(useViewport=!0));else{const t=parseInt(e);isNaN(t)||(delayOnHover=t)}}if(isSupported){const e={capture:!0,passive:!0};if(useMousedownOnly||document.addEventListener("touchstart",touchstartListener,e),useMousedown?document.addEventListener("mousedown",mousedownListener,e):document.addEventListener("mouseover",mouseoverListener,e),useViewport){let e;(e=window.requestIdleCallback?e=>{requestIdleCallback(e,{timeout:1500})}:e=>{e()})(()=>{const e=new IntersectionObserver(t=>{t.forEach(t=>{if(t.isIntersecting){const o=t.target;e.unobserve(o),preload(o.href)}})});document.querySelectorAll("a").forEach(t=>{isPreloadable(t)&&e.observe(t)})})}}function touchstartListener(e){lastTouchTimestamp=performance.now();const t=e.target.closest("a");isPreloadable(t)&&preload(t.href)}function mouseoverListener(e){if(performance.now()-lastTouchTimestamp<1100)return;const t=e.target.closest("a");isPreloadable(t)&&(t.addEventListener("mouseout",mouseoutListener,{passive:!0}),mouseoverTimer=setTimeout(()=>{preload(t.href),mouseoverTimer=void 0},delayOnHover))}function mousedownListener(e){const t=e.target.closest("a");isPreloadable(t)&&preload(t.href)}function mouseoutListener(e){e.relatedTarget&&e.target.closest("a")==e.relatedTarget.closest("a")||mouseoverTimer&&(clearTimeout(mouseoverTimer),mouseoverTimer=void 0)}function isPreloadable(e){if(e&&e.href&&(!useWhitelist||"instant"in e.dataset)&&(allowExternalLinks||e.origin==location.origin||"instant"in e.dataset)&&["http:","https:"].includes(e.protocol)&&("http:"!=e.protocol||"https:"!=location.protocol)&&(allowQueryString||!e.search||"instant"in e.dataset)&&!(e.hash&&e.pathname+e.search==location.pathname+location.search||"noInstant"in e.dataset))return!0}function preload(e){if(prefetches.has(e))return;const t=document.createElement("link");t.rel="prefetch",t.href=e,document.head.appendChild(t),prefetches.add(e),console.log("GOLEM: prefetch",e)}
