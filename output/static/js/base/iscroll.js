(function(e,t,n){function s(e,n){this.wrapper=typeof e=="string"?t.querySelector(e):e,this.scroller=this.wrapper.children[0],this.scrollerStyle=this.scroller.style,this.options={resizeScrollbars:!0,mouseWheelSpeed:20,snapThreshold:.334,startX:0,startY:0,scrollY:!0,directionLockThreshold:5,momentum:!0,bounce:!0,bounceTime:600,bounceEasing:"",preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0};for(var r in n)this.options[r]=n[r];this.translateZ=this.options.HWCompositing&&i.hasPerspective?" translateZ(0)":"",this.options.useTransition=i.hasTransition&&this.options.useTransition,this.options.useTransform=i.hasTransform&&this.options.useTransform,this.options.eventPassthrough=this.options.eventPassthrough===!0?"vertical":this.options.eventPassthrough,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollY=this.options.eventPassthrough=="vertical"?!1:this.options.scrollY,this.options.scrollX=this.options.eventPassthrough=="horizontal"?!1:this.options.scrollX,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,this.options.bounceEasing=typeof this.options.bounceEasing=="string"?i.ease[this.options.bounceEasing]||i.ease.circular:this.options.bounceEasing,this.options.resizePolling=this.options.resizePolling===undefined?60:this.options.resizePolling,this.options.tap===!0&&(this.options.tap="tap"),this.options.shrinkScrollbars=="scale"&&(this.options.useTransition=!1),this.options.invertWheelDirection=this.options.invertWheelDirection?-1:1,this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._events={},this._init(),this.refresh(),this.scrollTo(this.options.startX,this.options.startY),this.enable()}function o(e,n,r){var i=t.createElement("div"),s=t.createElement("div");return r===!0&&(i.style.cssText="position:absolute;z-index:9999",s.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"),s.className="iScrollIndicator",e=="h"?(r===!0&&(i.style.cssText+=";height:7px;left:2px;right:2px;bottom:0",s.style.height="100%"),i.className="iScrollHorizontalScrollbar"):(r===!0&&(i.style.cssText+=";width:7px;bottom:2px;top:2px;right:1px",s.style.width="100%"),i.className="iScrollVerticalScrollbar"),i.style.cssText+=";overflow:hidden",n||(i.style.pointerEvents="none"),i.appendChild(s),i}function u(n,r){this.wrapper=typeof r.el=="string"?t.querySelector(r.el):r.el,this.wrapperStyle=this.wrapper.style,this.indicator=this.wrapper.children[0],this.indicatorStyle=this.indicator.style,this.scroller=n,this.options={listenX:!0,listenY:!0,interactive:!1,resize:!0,defaultScrollbars:!1,shrink:!1,fade:!1,speedRatioX:0,speedRatioY:0};for(var s in r)this.options[s]=r[s];this.sizeRatioX=1,this.sizeRatioY=1,this.maxPosX=0,this.maxPosY=0,this.options.interactive&&(this.options.disableTouch||(i.addEvent(this.indicator,"touchstart",this),i.addEvent(e,"touchend",this)),this.options.disablePointer||(i.addEvent(this.indicator,i.prefixPointerEvent("pointerdown"),this),i.addEvent(e,i.prefixPointerEvent("pointerup"),this)),this.options.disableMouse||(i.addEvent(this.indicator,"mousedown",this),i.addEvent(e,"mouseup",this))),this.options.fade&&(this.wrapperStyle[i.style.transform]=this.scroller.translateZ,this.wrapperStyle[i.style.transitionDuration]=i.isBadAndroid?"0.001s":"0ms",this.wrapperStyle.opacity="0")}var r=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)},i=function(){function o(e){return s===!1?!1:s===""?e:s+e.charAt(0).toUpperCase()+e.substr(1)}var r={},i=t.createElement("div").style,s=function(){var e=["t","webkitT","MozT","msT","OT"],t,n=0,r=e.length;for(;n<r;n++){t=e[n]+"ransform";if(t in i)return e[n].substr(0,e[n].length-1)}return!1}();r.getTime=Date.now||function(){return(new Date).getTime()},r.extend=function(e,t){for(var n in t)e[n]=t[n]},r.addEvent=function(e,t,n,r){e.addEventListener(t,n,!!r)},r.removeEvent=function(e,t,n,r){e.removeEventListener(t,n,!!r)},r.prefixPointerEvent=function(t){return e.MSPointerEvent?"MSPointer"+t.charAt(9).toUpperCase()+t.substr(10):t},r.momentum=function(e,t,r,i,s,o){var u=e-t,a=n.abs(u)/r,f,l;return o=o===undefined?6e-4:o,f=e+a*a/(2*o)*(u<0?-1:1),l=a/o,f<i?(f=s?i-s/2.5*(a/8):i,u=n.abs(f-e),l=u/a):f>0&&(f=s?s/2.5*(a/8):0,u=n.abs(e)+f,l=u/a),{destination:n.round(f),duration:l}};var u=o("transform");return r.extend(r,{hasTransform:u!==!1,hasPerspective:o("perspective")in i,hasTouch:"ontouchstart"in e,hasPointer:e.PointerEvent||e.MSPointerEvent,hasTransition:o("transition")in i}),r.isBadAndroid=/Android /.test(e.navigator.appVersion)&&!/Chrome\/\d/.test(e.navigator.appVersion),r.extend(r.style={},{transform:u,transitionTimingFunction:o("transitionTimingFunction"),transitionDuration:o("transitionDuration"),transitionDelay:o("transitionDelay"),transformOrigin:o("transformOrigin")}),r.hasClass=function(e,t){var n=new RegExp("(^|\\s)"+t+"(\\s|$)");return n.test(e.className)},r.addClass=function(e,t){if(r.hasClass(e,t))return;var n=e.className.split(" ");n.push(t),e.className=n.join(" ")},r.removeClass=function(e,t){if(!r.hasClass(e,t))return;var n=new RegExp("(^|\\s)"+t+"(\\s|$)","g");e.className=e.className.replace(n," ")},r.offset=function(e){var t=-e.offsetLeft,n=-e.offsetTop;while(e=e.offsetParent)t-=e.offsetLeft,n-=e.offsetTop;return{left:t,top:n}},r.preventDefaultException=function(e,t){for(var n in t)if(t[n].test(e[n]))return!0;return!1},r.extend(r.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2,pointerdown:3,pointermove:3,pointerup:3,MSPointerDown:3,MSPointerMove:3,MSPointerUp:3}),r.extend(r.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(e){return e*(2-e)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(e){return n.sqrt(1- --e*e)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(e){var t=4;return(e-=1)*e*((t+1)*e+t)+1}},bounce:{style:"",fn:function(e){return(e/=1)<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375}},elastic:{style:"",fn:function(e){var t=.22,r=.4;return e===0?0:e==1?1:r*n.pow(2,-10*e)*n.sin((e-t/4)*2*n.PI/t)+1}}}),r.tap=function(e,n){var r=t.createEvent("Event");r.initEvent(n,!0,!0),r.pageX=e.pageX,r.pageY=e.pageY,e.target.dispatchEvent(r)},r.click=function(e){var n=e.target,r;/(SELECT|INPUT|TEXTAREA)/i.test(n.tagName)||(r=t.createEvent("MouseEvents"),r.initMouseEvent("click",!0,!0,e.view,1,n.screenX,n.screenY,n.clientX,n.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),r._constructed=!0,n.dispatchEvent(r))},r}();s.prototype={version:"5.1.2",_init:function(){this._initEvents(),(this.options.scrollbars||this.options.indicators)&&this._initIndicators(),this.options.mouseWheel&&this._initWheel(),this.options.snap&&this._initSnap(),this.options.keyBindings&&this._initKeys()},destroy:function(){this._initEvents(!0),this._execEvent("destroy")},_transitionEnd:function(e){if(e.target!=this.scroller||!this.isInTransition)return;this._transitionTime(),this.resetPosition(this.options.bounceTime)||(this.isInTransition=!1,this._execEvent("scrollEnd"))},_start:function(e){if(i.eventType[e.type]!=1&&e.button!==0)return;if(!this.enabled||this.initiated&&i.eventType[e.type]!==this.initiated)return;this.options.preventDefault&&!i.isBadAndroid&&!i.preventDefaultException(e.target,this.options.preventDefaultException)&&e.preventDefault();var t=e.touches?e.touches[0]:e,r;this.initiated=i.eventType[e.type],this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.directionLocked=0,this._transitionTime(),this.startTime=i.getTime(),this.options.useTransition&&this.isInTransition?(this.isInTransition=!1,r=this.getComputedPosition(),this._translate(n.round(r.x),n.round(r.y)),this._execEvent("scrollEnd")):!this.options.useTransition&&this.isAnimating&&(this.isAnimating=!1,this._execEvent("scrollEnd")),this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=t.pageX,this.pointY=t.pageY,this._execEvent("beforeScrollStart")},_move:function(e){if(!this.enabled||i.eventType[e.type]!==this.initiated)return;this.options.preventDefault&&e.preventDefault();var t=e.touches?e.touches[0]:e,r=t.pageX-this.pointX,s=t.pageY-this.pointY,o=i.getTime(),u,a,f,l;this.pointX=t.pageX,this.pointY=t.pageY,this.distX+=r,this.distY+=s,f=n.abs(this.distX),l=n.abs(this.distY);if(o-this.endTime>300&&f<10&&l<10)return;!this.directionLocked&&!this.options.freeScroll&&(f>l+this.options.directionLockThreshold?this.directionLocked="h":l>=f+this.options.directionLockThreshold?this.directionLocked="v":this.directionLocked="n");if(this.directionLocked=="h"){if(this.options.eventPassthrough=="vertical")e.preventDefault();else if(this.options.eventPassthrough=="horizontal"){this.initiated=!1;return}s=0}else if(this.directionLocked=="v"){if(this.options.eventPassthrough=="horizontal")e.preventDefault();else if(this.options.eventPassthrough=="vertical"){this.initiated=!1;return}r=0}r=this.hasHorizontalScroll?r:0,s=this.hasVerticalScroll?s:0,u=this.x+r,a=this.y+s;if(u>0||u<this.maxScrollX)u=this.options.bounce?this.x+r/3:u>0?0:this.maxScrollX;if(a>0||a<this.maxScrollY)a=this.options.bounce?this.y+s/3:a>0?0:this.maxScrollY;this.directionX=r>0?-1:r<0?1:0,this.directionY=s>0?-1:s<0?1:0,this.moved||this._execEvent("scrollStart"),this.moved=!0,this._translate(u,a),o-this.startTime>300&&(this.startTime=o,this.startX=this.x,this.startY=this.y)},_end:function(e){if(!this.enabled||i.eventType[e.type]!==this.initiated)return;this.options.preventDefault&&!i.preventDefaultException(e.target,this.options.preventDefaultException)&&e.preventDefault();var t=e.changedTouches?e.changedTouches[0]:e,r,s,o=i.getTime()-this.startTime,u=n.round(this.x),a=n.round(this.y),f=n.abs(u-this.startX),l=n.abs(a-this.startY),c=0,h="";this.isInTransition=0,this.initiated=0,this.endTime=i.getTime();if(this.resetPosition(this.options.bounceTime))return;this.scrollTo(u,a);if(!this.moved){this.options.tap&&i.tap(e,this.options.tap),this.options.click&&i.click(e),this._execEvent("scrollCancel");return}if(this._events.flick&&o<200&&f<100&&l<100){this._execEvent("flick");return}this.options.momentum&&o<300&&(r=this.hasHorizontalScroll?i.momentum(this.x,this.startX,o,this.maxScrollX,this.options.bounce?this.wrapperWidth:0,this.options.deceleration):{destination:u,duration:0},s=this.hasVerticalScroll?i.momentum(this.y,this.startY,o,this.maxScrollY,this.options.bounce?this.wrapperHeight:0,this.options.deceleration):{destination:a,duration:0},u=r.destination,a=s.destination,c=n.max(r.duration,s.duration),this.isInTransition=1);if(this.options.snap){var p=this._nearestSnap(u,a);this.currentPage=p,c=this.options.snapSpeed||n.max(n.max(n.min(n.abs(u-p.x),1e3),n.min(n.abs(a-p.y),1e3)),300),u=p.x,a=p.y,this.directionX=0,this.directionY=0,h=this.options.bounceEasing}if(u!=this.x||a!=this.y){if(u>0||u<this.maxScrollX||a>0||a<this.maxScrollY)h=i.ease.quadratic;this.scrollTo(u,a,c,h);return}this._execEvent("scrollEnd")},_resize:function(){var e=this;clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){e.refresh()},this.options.resizePolling)},resetPosition:function(e){var t=this.x,n=this.y;return e=e||0,!this.hasHorizontalScroll||this.x>0?t=0:this.x<this.maxScrollX&&(t=this.maxScrollX),!this.hasVerticalScroll||this.y>0?n=0:this.y<this.maxScrollY&&(n=this.maxScrollY),t==this.x&&n==this.y?!1:(this.scrollTo(t,n,e,this.options.bounceEasing),!0)},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},refresh:function(){var e=this.wrapper.offsetHeight;this.wrapperWidth=this.wrapper.clientWidth,this.wrapperHeight=this.wrapper.clientHeight,this.scrollerWidth=this.scroller.offsetWidth,this.scrollerHeight=this.scroller.offsetHeight,this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.maxScrollY=this.wrapperHeight-this.scrollerHeight,this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=i.offset(this.wrapper),this._execEvent("refresh"),this.resetPosition()},on:function(e,t){this._events[e]||(this._events[e]=[]),this._events[e].push(t)},off:function(e,t){if(!this._events[e])return;var n=this._events[e].indexOf(t);n>-1&&this._events[e].splice(n,1)},_execEvent:function(e){if(!this._events[e])return;var t=0,n=this._events[e].length;if(!n)return;for(;t<n;t++)this._events[e][t].apply(this,[].slice.call(arguments,1))},scrollBy:function(e,t,n,r){e=this.x+e,t=this.y+t,n=n||0,this.scrollTo(e,t,n,r)},scrollTo:function(e,t,n,r){r=r||i.ease.circular,this.isInTransition=this.options.useTransition&&n>0,!n||this.options.useTransition&&r.style?(this._transitionTimingFunction(r.style),this._transitionTime(n),this._translate(e,t)):this._animate(e,t,n,r.fn)},scrollToElement:function(e,t,r,s,o){e=e.nodeType?e:this.scroller.querySelector(e);if(!e)return;var u=i.offset(e);u.left-=this.wrapperOffset.left,u.top-=this.wrapperOffset.top,r===!0&&(r=n.round(e.offsetWidth/2-this.wrapper.offsetWidth/2)),s===!0&&(s=n.round(e.offsetHeight/2-this.wrapper.offsetHeight/2)),u.left-=r||0,u.top-=s||0,u.left=u.left>0?0:u.left<this.maxScrollX?this.maxScrollX:u.left,u.top=u.top>0?0:u.top<this.maxScrollY?this.maxScrollY:u.top,t=t===undefined||t===null||t==="auto"?n.max(n.abs(this.x-u.left),n.abs(this.y-u.top)):t,this.scrollTo(u.left,u.top,t,o)},_transitionTime:function(e){e=e||0,this.scrollerStyle[i.style.transitionDuration]=e+"ms",!e&&i.isBadAndroid&&(this.scrollerStyle[i.style.transitionDuration]="0.001s");if(this.indicators)for(var t=this.indicators.length;t--;)this.indicators[t].transitionTime(e)},_transitionTimingFunction:function(e){this.scrollerStyle[i.style.transitionTimingFunction]=e;if(this.indicators)for(var t=this.indicators.length;t--;)this.indicators[t].transitionTimingFunction(e)},_translate:function(e,t){this.options.useTransform?this.scrollerStyle[i.style.transform]="translate("+e+"px,"+t+"px)"+this.translateZ:(e=n.round(e),t=n.round(t),this.scrollerStyle.left=e+"px",this.scrollerStyle.top=t+"px"),this.x=e,this.y=t;if(this.indicators)for(var r=this.indicators.length;r--;)this.indicators[r].updatePosition()},_initEvents:function(t){var n=t?i.removeEvent:i.addEvent,r=this.options.bindToWrapper?this.wrapper:e;n(e,"orientationchange",this),n(e,"resize",this),this.options.click&&n(this.wrapper,"click",this,!0),this.options.disableMouse||(n(this.wrapper,"mousedown",this),n(r,"mousemove",this),n(r,"mousecancel",this),n(r,"mouseup",this)),i.hasPointer&&!this.options.disablePointer&&(n(this.wrapper,i.prefixPointerEvent("pointerdown"),this),n(r,i.prefixPointerEvent("pointermove"),this),n(r,i.prefixPointerEvent("pointercancel"),this),n(r,i.prefixPointerEvent("pointerup"),this)),i.hasTouch&&!this.options.disableTouch&&(n(this.wrapper,"touchstart",this),n(r,"touchmove",this),n(r,"touchcancel",this),n(r,"touchend",this)),n(this.scroller,"transitionend",this),n(this.scroller,"webkitTransitionEnd",this),n(this.scroller,"oTransitionEnd",this),n(this.scroller,"MSTransitionEnd",this)},getComputedPosition:function(){var t=e.getComputedStyle(this.scroller,null),n,r;return this.options.useTransform?(t=t[i.style.transform].split(")")[0].split(", "),n=+(t[12]||t[4]),r=+(t[13]||t[5])):(n=+t.left.replace(/[^-\d.]/g,""),r=+t.top.replace(/[^-\d.]/g,"")),{x:n,y:r}},_initIndicators:function(){function a(e){for(var t=i.indicators.length;t--;)e.call(i.indicators[t])}var e=this.options.interactiveScrollbars,t=typeof this.options.scrollbars!="string",n=[],r,i=this;this.indicators=[],this.options.scrollbars&&(this.options.scrollY&&(r={el:o("v",e,this.options.scrollbars),interactive:e,defaultScrollbars:!0,customStyle:t,resize:this.options.resizeScrollbars,shrink:this.options.shrinkScrollbars,fade:this.options.fadeScrollbars,listenX:!1},this.wrapper.appendChild(r.el),n.push(r)),this.options.scrollX&&(r={el:o("h",e,this.options.scrollbars),interactive:e,defaultScrollbars:!0,customStyle:t,resize:this.options.resizeScrollbars,shrink:this.options.shrinkScrollbars,fade:this.options.fadeScrollbars,listenY:!1},this.wrapper.appendChild(r.el),n.push(r))),this.options.indicators&&(n=n.concat(this.options.indicators));for(var s=n.length;s--;)this.indicators.push(new u(this,n[s]));this.options.fadeScrollbars&&(this.on("scrollEnd",function(){a(function(){this.fade()})}),this.on("scrollCancel",function(){a(function(){this.fade()})}),this.on("scrollStart",function(){a(function(){this.fade(1)})}),this.on("beforeScrollStart",function(){a(function(){this.fade(1,!0)})})),this.on("refresh",function(){a(function(){this.refresh()})}),this.on("destroy",function(){a(function(){this.destroy()}),delete this.indicators})},_initWheel:function(){i.addEvent(this.wrapper,"wheel",this),i.addEvent(this.wrapper,"mousewheel",this),i.addEvent(this.wrapper,"DOMMouseScroll",this),this.on("destroy",function(){i.removeEvent(this.wrapper,"wheel",this),i.removeEvent(this.wrapper,"mousewheel",this),i.removeEvent(this.wrapper,"DOMMouseScroll",this)})},_wheel:function(e){if(!this.enabled)return;e.preventDefault(),e.stopPropagation();var t,r,i,s,o=this;this.wheelTimeout===undefined&&o._execEvent("scrollStart"),clearTimeout(this.wheelTimeout),this.wheelTimeout=setTimeout(function(){o._execEvent("scrollEnd"),o.wheelTimeout=undefined},400);if("deltaX"in e)t=-e.deltaX,r=-e.deltaY;else if("wheelDeltaX"in e)t=e.wheelDeltaX/120*this.options.mouseWheelSpeed,r=e.wheelDeltaY/120*this.options.mouseWheelSpeed;else if("wheelDelta"in e)t=r=e.wheelDelta/120*this.options.mouseWheelSpeed;else{if(!("detail"in e))return;t=r=-e.detail/3*this.options.mouseWheelSpeed}t*=this.options.invertWheelDirection,r*=this.options.invertWheelDirection,this.hasVerticalScroll||(t=r,r=0);if(this.options.snap){i=this.currentPage.pageX,s=this.currentPage.pageY,t>0?i--:t<0&&i++,r>0?s--:r<0&&s++,this.goToPage(i,s);return}i=this.x+n.round(this.hasHorizontalScroll?t:0),s=this.y+n.round(this.hasVerticalScroll?r:0),i>0?i=0:i<this.maxScrollX&&(i=this.maxScrollX),s>0?s=0:s<this.maxScrollY&&(s=this.maxScrollY),this.scrollTo(i,s,0)},_initSnap:function(){this.currentPage={},typeof this.options.snap=="string"&&(this.options.snap=this.scroller.querySelectorAll(this.options.snap)),this.on("refresh",function(){var e=0,t,r=0,i,s,o,u=0,a,f=this.options.snapStepX||this.wrapperWidth,l=this.options.snapStepY||this.wrapperHeight,c;this.pages=[];if(!this.wrapperWidth||!this.wrapperHeight||!this.scrollerWidth||!this.scrollerHeight)return;if(this.options.snap===!0){s=n.round(f/2),o=n.round(l/2);while(u>-this.scrollerWidth){this.pages[e]=[],t=0,a=0;while(a>-this.scrollerHeight)this.pages[e][t]={x:n.max(u,this.maxScrollX),y:n.max(a,this.maxScrollY),width:f,height:l,cx:u-s,cy:a-o},a-=l,t++;u-=f,e++}}else{c=this.options.snap,t=c.length,i=-1;for(;e<t;e++){if(e===0||c[e].offsetLeft<=c[e-1].offsetLeft)r=0,i++;this.pages[r]||(this.pages[r]=[]),u=n.max(-c[e].offsetLeft,this.maxScrollX),a=n.max(-c[e].offsetTop,this.maxScrollY),s=u-n.round(c[e].offsetWidth/2),o=a-n.round(c[e].offsetHeight/2),this.pages[r][i]={x:u,y:a,width:c[e].offsetWidth,height:c[e].offsetHeight,cx:s,cy:o},u>this.maxScrollX&&r++}}this.goToPage(this.currentPage.pageX||0,this.currentPage.pageY||0,0),this.options.snapThreshold%1===0?(this.snapThresholdX=this.options.snapThreshold,this.snapThresholdY=this.options.snapThreshold):(this.snapThresholdX=n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width*this.options.snapThreshold),this.snapThresholdY=n.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height*this.options.snapThreshold))}),this.on("flick",function(){var e=this.options.snapSpeed||n.max(n.max(n.min(n.abs(this.x-this.startX),1e3),n.min(n.abs(this.y-this.startY),1e3)),300);this.goToPage(this.currentPage.pageX+this.directionX,this.currentPage.pageY+this.directionY,e)})},_nearestSnap:function(e,t){if(!this.pages.length)return{x:0,y:0,pageX:0,pageY:0};var r=0,i=this.pages.length,s=0;if(n.abs(e-this.absStartX)<this.snapThresholdX&&n.abs(t-this.absStartY)<this.snapThresholdY)return this.currentPage;e>0?e=0:e<this.maxScrollX&&(e=this.maxScrollX),t>0?t=0:t<this.maxScrollY&&(t=this.maxScrollY);for(;r<i;r++)if(e>=this.pages[r][0].cx){e=this.pages[r][0].x;break}i=this.pages[r].length;for(;s<i;s++)if(t>=this.pages[0][s].cy){t=this.pages[0][s].y;break}return r==this.currentPage.pageX&&(r+=this.directionX,r<0?r=0:r>=this.pages.length&&(r=this.pages.length-1),e=this.pages[r][0].x),s==this.currentPage.pageY&&(s+=this.directionY,s<0?s=0:s>=this.pages[0].length&&(s=this.pages[0].length-1),t=this.pages[0][s].y),{x:e,y:t,pageX:r,pageY:s}},goToPage:function(e,t,r,i){i=i||this.options.bounceEasing,e>=this.pages.length?e=this.pages.length-1:e<0&&(e=0),t>=this.pages[e].length?t=this.pages[e].length-1:t<0&&(t=0);var s=this.pages[e][t].x,o=this.pages[e][t].y;r=r===undefined?this.options.snapSpeed||n.max(n.max(n.min(n.abs(s-this.x),1e3),n.min(n.abs(o-this.y),1e3)),300):r,this.currentPage={x:s,y:o,pageX:e,pageY:t},this.scrollTo(s,o,r,i)},next:function(e,t){var n=this.currentPage.pageX,r=this.currentPage.pageY;n++,n>=this.pages.length&&this.hasVerticalScroll&&(n=0,r++),this.goToPage(n,r,e,t)},prev:function(e,t){var n=this.currentPage.pageX,r=this.currentPage.pageY;n--,n<0&&this.hasVerticalScroll&&(n=0,r--),this.goToPage(n,r,e,t)},_initKeys:function(t){var n={pageUp:33,pageDown:34,end:35,home:36,left:37,up:38,right:39,down:40},r;if(typeof this.options.keyBindings=="object")for(r in this.options.keyBindings)typeof this.options.keyBindings[r]=="string"&&(this.options.keyBindings[r]=this.options.keyBindings[r].toUpperCase().charCodeAt(0));else this.options.keyBindings={};for(r in n)this.options.keyBindings[r]=this.options.keyBindings[r]||n[r];i.addEvent(e,"keydown",this),this.on("destroy",function(){i.removeEvent(e,"keydown",this)})},_key:function(e){if(!this.enabled)return;var t=this.options.snap,r=t?this.currentPage.pageX:this.x,s=t?this.currentPage.pageY:this.y,o=i.getTime(),u=this.keyTime||0,a=.25,f;this.options.useTransition&&this.isInTransition&&(f=this.getComputedPosition(),this._translate(n.round(f.x),n.round(f.y)),this.isInTransition=!1),this.keyAcceleration=o-u<200?n.min(this.keyAcceleration+a,50):0;switch(e.keyCode){case this.options.keyBindings.pageUp:this.hasHorizontalScroll&&!this.hasVerticalScroll?r+=t?1:this.wrapperWidth:s+=t?1:this.wrapperHeight;break;case this.options.keyBindings.pageDown:this.hasHorizontalScroll&&!this.hasVerticalScroll?r-=t?1:this.wrapperWidth:s-=t?1:this.wrapperHeight;break;case this.options.keyBindings.end:r=t?this.pages.length-1:this.maxScrollX,s=t?this.pages[0].length-1:this.maxScrollY;break;case this.options.keyBindings.home:r=0,s=0;break;case this.options.keyBindings.left:r+=t?-1:5+this.keyAcceleration>>0;break;case this.options.keyBindings.up:s+=t?1:5+this.keyAcceleration>>0;break;case this.options.keyBindings.right:r-=t?-1:5+this.keyAcceleration>>0;break;case this.options.keyBindings.down:s-=t?1:5+this.keyAcceleration>>0;break;default:return}if(t){this.goToPage(r,s);return}r>0?(r=0,this.keyAcceleration=0):r<this.maxScrollX&&(r=this.maxScrollX,this.keyAcceleration=0),s>0?(s=0,this.keyAcceleration=0):s<this.maxScrollY&&(s=this.maxScrollY,this.keyAcceleration=0),this.scrollTo(r,s,0),this.keyTime=o},_animate:function(e,t,n,s){function c(){var h=i.getTime(),p,d,v;if(h>=l){o.isAnimating=!1,o._translate(e,t),o.resetPosition(o.options.bounceTime)||o._execEvent("scrollEnd");return}h=(h-f)/n,v=s(h),p=(e-u)*v+u,d=(t-a)*v+a,o._translate(p,d),o.isAnimating&&r(c)}var o=this,u=this.x,a=this.y,f=i.getTime(),l=f+n;this.isAnimating=!0,c()},handleEvent:function(e){switch(e.type){case"touchstart":case"pointerdown":case"MSPointerDown":case"mousedown":this._start(e);break;case"touchmove":case"pointermove":case"MSPointerMove":case"mousemove":this._move(e);break;case"touchend":case"pointerup":case"MSPointerUp":case"mouseup":case"touchcancel":case"pointercancel":case"MSPointerCancel":case"mousecancel":this._end(e);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(e);break;case"wheel":case"DOMMouseScroll":case"mousewheel":this._wheel(e);break;case"keydown":this._key(e);break;case"click":e._constructed||(e.preventDefault(),e.stopPropagation())}}},u.prototype={handleEvent:function(e){switch(e.type){case"touchstart":case"pointerdown":case"MSPointerDown":case"mousedown":this._start(e);break;case"touchmove":case"pointermove":case"MSPointerMove":case"mousemove":this._move(e);break;case"touchend":case"pointerup":case"MSPointerUp":case"mouseup":case"touchcancel":case"pointercancel":case"MSPointerCancel":case"mousecancel":this._end(e)}},destroy:function(){this.options.interactive&&(i.removeEvent(this.indicator,"touchstart",this),i.removeEvent(this.indicator,i.prefixPointerEvent("pointerdown"),this),i.removeEvent(this.indicator,"mousedown",this),i.removeEvent(e,"touchmove",this),i.removeEvent(e,i.prefixPointerEvent("pointermove"),this),i.removeEvent(e,"mousemove",this),i.removeEvent(e,"touchend",this),i.removeEvent(e,i.prefixPointerEvent("pointerup"),this),i.removeEvent(e,"mouseup",this)),this.options.defaultScrollbars&&this.wrapper.parentNode.removeChild(this.wrapper)},_start:function(t){var n=t.touches?t.touches[0]:t;t.preventDefault(),t.stopPropagation(),this.transitionTime(),this.initiated=!0,this.moved=!1,this.lastPointX=n.pageX,this.lastPointY=n.pageY,this.startTime=i.getTime(),this.options.disableTouch||i.addEvent(e,"touchmove",this),this.options.disablePointer||i.addEvent(e,i.prefixPointerEvent("pointermove"),this),this.options.disableMouse||i.addEvent(e,"mousemove",this),this.scroller._execEvent("beforeScrollStart")},_move:function(e){var t=e.touches?e.touches[0]:e,n,r,s,o,u=i.getTime();this.moved||this.scroller._execEvent("scrollStart"),this.moved=!0,n=t.pageX-this.lastPointX,this.lastPointX=t.pageX,r=t.pageY-this.lastPointY,this.lastPointY=t.pageY,s=this.x+n,o=this.y+r,this._pos(s,o),e.preventDefault(),e.stopPropagation()},_end:function(t){if(!this.initiated)return;this.initiated=!1,t.preventDefault(),t.stopPropagation(),i.removeEvent(e,"touchmove",this),i.removeEvent(e,i.prefixPointerEvent("pointermove"),this),i.removeEvent(e,"mousemove",this);if(this.scroller.options.snap){var r=this.scroller._nearestSnap(this.scroller.x,this.scroller.y),s=this.options.snapSpeed||n.max(n.max(n.min(n.abs(this.scroller.x-r.x),1e3),n.min(n.abs(this.scroller.y-r.y),1e3)),300);if(this.scroller.x!=r.x||this.scroller.y!=r.y)this.scroller.directionX=0,this.scroller.directionY=0,this.scroller.currentPage=r,this.scroller.scrollTo(r.x,r.y,s,this.scroller.options.bounceEasing)}this.moved&&this.scroller._execEvent("scrollEnd")},transitionTime:function(e){e=e||0,this.indicatorStyle[i.style.transitionDuration]=e+"ms",!e&&i.isBadAndroid&&(this.indicatorStyle[i.style.transitionDuration]="0.001s")},transitionTimingFunction:function(e){this.indicatorStyle[i.style.transitionTimingFunction]=e},refresh:function(){this.transitionTime(),this.options.listenX&&!this.options.listenY?this.indicatorStyle.display=this.scroller.hasHorizontalScroll?"block":"none":this.options.listenY&&!this.options.listenX?this.indicatorStyle.display=this.scroller.hasVerticalScroll?"block":"none":this.indicatorStyle.display=this.scroller.hasHorizontalScroll||this.scroller.hasVerticalScroll?"block":"none",this.scroller.hasHorizontalScroll&&this.scroller.hasVerticalScroll?(i.addClass(this.wrapper,"iScrollBothScrollbars"),i.removeClass(this.wrapper,"iScrollLoneScrollbar"),this.options.defaultScrollbars&&this.options.customStyle&&(this.options.listenX?this.wrapper.style.right="8px":this.wrapper.style.bottom="8px")):(i.removeClass(this.wrapper,"iScrollBothScrollbars"),i.addClass(this.wrapper,"iScrollLoneScrollbar"),this.options.defaultScrollbars&&this.options.customStyle&&(this.options.listenX?this.wrapper.style.right="2px":this.wrapper.style.bottom="2px"));var e=this.wrapper.offsetHeight;this.options.listenX&&(this.wrapperWidth=this.wrapper.clientWidth,this.options.resize?(this.indicatorWidth=n.max(n.round(this.wrapperWidth*this.wrapperWidth/(this.scroller.scrollerWidth||this.wrapperWidth||1)),8),this.indicatorStyle.width=this.indicatorWidth+"px"):this.indicatorWidth=this.indicator.clientWidth,this.maxPosX=this.wrapperWidth-this.indicatorWidth,this.options.shrink=="clip"?(this.minBoundaryX=-this.indicatorWidth+8,this.maxBoundaryX=this.wrapperWidth-8):(this.minBoundaryX=0,this.maxBoundaryX=this.maxPosX),this.sizeRatioX=this.options.speedRatioX||this.scroller.maxScrollX&&this.maxPosX/this.scroller.maxScrollX),this.options.listenY&&(this.wrapperHeight=this.wrapper.clientHeight,this.options.resize?(this.indicatorHeight=n.max(n.round(this.wrapperHeight*this.wrapperHeight/(this.scroller.scrollerHeight||this.wrapperHeight||1)),8),this.indicatorStyle.height=this.indicatorHeight+"px"):this.indicatorHeight=this.indicator.clientHeight,this.maxPosY=this.wrapperHeight-this.indicatorHeight,this.options.shrink=="clip"?(this.minBoundaryY=-this.indicatorHeight+8,this.maxBoundaryY=this.wrapperHeight-8):(this.minBoundaryY=0,this.maxBoundaryY=this.maxPosY),this.maxPosY=this.wrapperHeight-this.indicatorHeight,this.sizeRatioY=this.options.speedRatioY||this.scroller.maxScrollY&&this.maxPosY/this.scroller.maxScrollY),this.updatePosition()},updatePosition:function(){var e=this.options.listenX&&n.round(this.sizeRatioX*this.scroller.x)||0,t=this.options.listenY&&n.round(this.sizeRatioY*this.scroller.y)||0;this.options.ignoreBoundaries||(e<this.minBoundaryX?(this.options.shrink=="scale"&&(this.width=n.max(this.indicatorWidth+e,8),this.indicatorStyle.width=this.width+"px"),e=this.minBoundaryX):e>this.maxBoundaryX?this.options.shrink=="scale"?(this.width=n.max(this.indicatorWidth-(e-this.maxPosX),8),this.indicatorStyle.width=this.width+"px",e=this.maxPosX+this.indicatorWidth-this.width):e=this.maxBoundaryX:this.options.shrink=="scale"&&this.width!=this.indicatorWidth&&(this.width=this.indicatorWidth,this.indicatorStyle.width=this.width+"px"),t<this.minBoundaryY?(this.options.shrink=="scale"&&(this.height=n.max(this.indicatorHeight+t*3,8),this.indicatorStyle.height=this.height+"px"),t=this.minBoundaryY):t>this.maxBoundaryY?this.options.shrink=="scale"?(this.height=n.max(this.indicatorHeight-(t-this.maxPosY)*3,8),this.indicatorStyle.height=this.height+"px",t=this.maxPosY+this.indicatorHeight-this.height):t=this.maxBoundaryY:this.options.shrink=="scale"&&this.height!=this.indicatorHeight&&(this.height=this.indicatorHeight,this.indicatorStyle.height=this.height+"px")),this.x=e,this.y=t,this.scroller.options.useTransform?this.indicatorStyle[i.style.transform]="translate("+e+"px,"+t+"px)"+this.scroller.translateZ:(this.indicatorStyle.left=e+"px",this.indicatorStyle.top=t+"px")},_pos:function(e,t){e<0?e=0:e>this.maxPosX&&(e=this.maxPosX),t<0?t=0:t>this.maxPosY&&(t=this.maxPosY),e=this.options.listenX?n.round(e/this.sizeRatioX):this.scroller.x,t=this.options.listenY?n.round(t/this.sizeRatioY):this.scroller.y,this.scroller.scrollTo(e,t)},fade:function(e,t){if(t&&!this.visible)return;clearTimeout(this.fadeTimeout),this.fadeTimeout=null;var n=e?250:500,r=e?0:300;e=e?"1":"0",this.wrapperStyle[i.style.transitionDuration]=n+"ms",this.fadeTimeout=setTimeout(function(e){this.wrapperStyle.opacity=e,this.visible=+e}.bind(this,e),r)}},s.utils=i,typeof module!="undefined"&&module.exports?module.exports=s:e.IScroll=s})(window,document,Math)