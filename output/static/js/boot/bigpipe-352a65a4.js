(function(e){function n(){}function f(e){var t=[];for(var n=0;n<e.length;n++){var r=e[n];_cssCachedArray_.indexOf(r)==-1&&t.push(r)}return t}function l(e){function o(n){s.onload=null,s.onreadystatechange=null,s.onerror=null;var o=document.styleSheets.length,u=r(function(){document.styleSheets.length>=o&&(i(u),_cssCachedArray_.push(e),t.resolve(s))},16)}var t=_.Deferred(),n=document.getElementsByTagName("head")[0],s=document.createElement("link");return s.type="text/css",s.rel="stylesheet",s.onload=s.onreadystatechange=s.onerror=function(e){o.call(this,e)},s.href=e,n.appendChild(s),t.promise()}function c(e,t){if(e.length==0)return t(1);var n=_.map(e,function(e){return l(e)});_.when.apply(null,n).done(t)}function h(e){var n=document.createElement("iframe"),r=+(new Date);return style=n.style,style.visibility="hidden",style["z-index"]="-1",n.id=r,n.className=t,n.src=p(e.url,{__pipe__:1,cfID:r,referer:e.referer||""}),this.ifr=n,n}function p(e,t){var n=e.split("?"),r=n[0]||"",i=n[1]||"",s=[];for(var o in t)s.push(encodeURIComponent(o)+"="+encodeURIComponent(t[o]));return r+"?"+i+"&"+s.join("&")}window._pageletCache_={},window._pageletDoneArray_={},window._cssCachedArray_=[];var t="big-N-pipe",r=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,i=window.cancelAnimationFrame||window.mozcancelAnimationFrame||window.webkitcancelAnimationFrame||window.mscancelAnimationFrame,s=0,o=0,u=0,a=!1;$.extend(n.prototype,{setPipeProgress:function(e){if(a)return;e||(e=this.lessThanOne()),o>=s&&(e=1,a=!0);var t=$("#globalProgress");e=e*100+"%",t.addClass("ease").show().width(e),e=="100%"&&setTimeout(function(){t.hide().width(0)},400)},doPageletCache:function(e){_pageletCache_[e.pipeID]=e},processCachedPagelets:function(e){if(e=="")return;var e=e.split("-");if(e.length<=0)return;for(var t=0;t<e.length;t++){var n=e[t],r=_pageletCache_[n];if(!r)continue;var i=$(r.sel);i.length>0&&(this.dom(r),delete _pageletCache_[n],this.processCachedPagelets(r.subViewIDs))}},dom:function(e){var t=this,n=e.op||"html",r=$(e.sel);r[n](e.html),_pageletDoneArray_[e.pipeID]=!0,e.js&&e["js"].length!=0?require(e.js,function(){var e=[].concat.apply([],arguments);for(var n=0;n<e.length;n++){var r=e[n];r&&(fnInit=r.init,fnInit&&fnInit())}t.setPipeProgress()}):t.setPipeProgress()},whenPageletArrive:function(e){console.log(Date.now(),"arrive pipe",e.sel);var t=this,n=e.css;t.setPipeProgress(),c(f(e.css),function(){var n=$(e.sel);n.length==0||e.parentID&&!_pageletDoneArray_[e.parentID]?t.doPageletCache(e):(t.dom(e),t.processCachedPagelets(e.subViewIDs)),o++,t.setPipeProgress()})},doPipeRequest:function(e){e=$.extend({url:location.pathname+location.search,title:document.title,referer:location.href},e);var n=h(e);this.currentCfID=n.id,$("."+t).remove(),document.body.appendChild(n)},reload:function(){this.doPipeRequest({})},location:function(e){console.log(e);var t=e.split("?")[1]||"",n=utils.queryString(t),r=$.extend({referer:location.href,title:document.title},{url:e});window.history.pushState(r,r.title,r.url),this.doPipeRequest(r)},notifyStart:function(e){console.log(Date.now()," start"),a=!1,u=0,o=0,s=e.count,this.setPipeProgress(.001),$("#content").animate({scrollTop:0},100)},notifyEnd:function(e){console.log(Date.now()," end"),$("#"+e.cfID).remove()},lessThanOne:function(){var e=Math.PI;return u++,2/e*Math.atan(u/10)}}),e.BigPipe=n})(window,undefined)