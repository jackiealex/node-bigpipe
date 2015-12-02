/*!
 * # Semantic UI 2.1.4 - API
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
!function(e,t,r,n){"use strict";e.api=e.fn.api=function(r){var o,s=e(e.isFunction(this)?t:this),a=s.selector||"",i=(new Date).getTime(),u=[],c=arguments[0],d="string"==typeof c,l=[].slice.call(arguments,1);return s.each(function(){var s,g,f,m,p,b,v=e.isPlainObject(r)?e.extend(!0,{},e.fn.api.settings,r):e.extend({},e.fn.api.settings),h=v.namespace,y=v.metadata,R=v.selector,q=v.error,x=v.className,k="."+h,T="module-"+h,A=e(this),S=A.closest(R.form),j=v.stateContext?e(v.stateContext):A,P=this,w=j[0],D=A.data(T);b={initialize:function(){d||b.bind.events(),b.instantiate()},instantiate:function(){b.verbose("Storing instance of module",b),D=b,A.data(T,D)},destroy:function(){b.verbose("Destroying previous module for",P),A.removeData(T).off(k)},bind:{events:function(){var e=b.get.event();e?(b.verbose("Attaching API events to element",e),A.on(e+k,b.event.trigger)):"now"==v.on&&(b.debug("Querying API endpoint immediately"),b.query())}},decode:{json:function(e){if(e!==n&&"string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e}},read:{cachedResponse:function(e){var r;return t.Storage===n?void b.error(q.noStorage):(r=sessionStorage.getItem(e),b.debug("Using cached response",e,r),r=b.decode.json(r),!1)}},write:{cachedResponse:function(r,o){return o&&""===o?void b.debug("Response empty, not caching",o):t.Storage===n?void b.error(q.noStorage):(e.isPlainObject(o)&&(o=JSON.stringify(o)),sessionStorage.setItem(r,o),void b.verbose("Storing cached response for url",r,o))}},query:function(){if(b.is.disabled())return void b.debug("Element is disabled API request aborted");if(b.is.loading()){if(!v.interruptRequests)return void b.debug("Cancelling request, previous request is still pending");b.debug("Interrupting previous request"),b.abort()}return v.defaultData&&e.extend(!0,v.urlData,b.get.defaultData()),v.serializeForm&&(v.data=b.add.formData(v.data)),g=b.get.settings(),g===!1?(b.cancelled=!0,void b.error(q.beforeSend)):(b.cancelled=!1,f=b.get.templatedURL(),f||b.is.mocked()?(f=b.add.urlData(f),f||b.is.mocked()?(s=e.extend(!0,{},v,{type:v.method||v.type,data:m,url:v.base+f,beforeSend:v.beforeXHR,success:function(){},failure:function(){},complete:function(){}}),b.debug("Querying URL",s.url),b.verbose("Using AJAX settings",s),"local"===v.cache&&b.read.cachedResponse(f)?(b.debug("Response returned from local cache"),b.request=b.create.request(),void b.request.resolveWith(w,[b.read.cachedResponse(f)])):void(v.throttle?v.throttleFirstRequest||b.timer?(b.debug("Throttling request",v.throttle),clearTimeout(b.timer),b.timer=setTimeout(function(){b.timer&&delete b.timer,b.debug("Sending throttled request",m,s.method),b.send.request()},v.throttle)):(b.debug("Sending request",m,s.method),b.send.request(),b.timer=setTimeout(function(){},v.throttle)):(b.debug("Sending request",m,s.method),b.send.request()))):void 0):void b.error(q.missingURL))},should:{removeError:function(){return v.hideError===!0||"auto"===v.hideError&&!b.is.form()}},is:{disabled:function(){return A.filter(R.disabled).length>0},form:function(){return A.is("form")||j.is("form")},mocked:function(){return v.mockResponse||v.mockResponseAsync},input:function(){return A.is("input")},loading:function(){return b.request&&"pending"==b.request.state()},abortedRequest:function(e){return e&&e.readyState!==n&&0===e.readyState?(b.verbose("XHR request determined to be aborted"),!0):(b.verbose("XHR request was not aborted"),!1)},validResponse:function(t){return"json"!==v.dataType&&"jsonp"!==v.dataType||!e.isFunction(v.successTest)?(b.verbose("Response is not JSON, skipping validation",v.successTest,t),!0):(b.debug("Checking JSON returned success",v.successTest,t),v.successTest(t)?(b.debug("Response passed success test",t),!0):(b.debug("Response failed success test",t),!1))}},was:{cancelled:function(){return b.cancelled||!1},succesful:function(){return b.request&&"resolved"==b.request.state()},failure:function(){return b.request&&"rejected"==b.request.state()},complete:function(){return b.request&&("resolved"==b.request.state()||"rejected"==b.request.state())}},add:{urlData:function(t,r){var o,s;return t&&(o=t.match(v.regExp.required),s=t.match(v.regExp.optional),r=r||v.urlData,o&&(b.debug("Looking for required URL variables",o),e.each(o,function(o,s){var a=-1!==s.indexOf("$")?s.substr(2,s.length-3):s.substr(1,s.length-2),i=e.isPlainObject(r)&&r[a]!==n?r[a]:A.data(a)!==n?A.data(a):j.data(a)!==n?j.data(a):r[a];return i===n?(b.error(q.requiredParameter,a,t),t=!1,!1):(b.verbose("Found required variable",a,i),i=v.encodeParameters?b.get.urlEncodedValue(i):i,t=t.replace(s,i),void 0)})),s&&(b.debug("Looking for optional URL variables",o),e.each(s,function(o,s){var a=-1!==s.indexOf("$")?s.substr(3,s.length-4):s.substr(2,s.length-3),i=e.isPlainObject(r)&&r[a]!==n?r[a]:A.data(a)!==n?A.data(a):j.data(a)!==n?j.data(a):r[a];i!==n?(b.verbose("Optional variable Found",a,i),t=t.replace(s,i)):(b.verbose("Optional variable not found",a),t=-1!==t.indexOf("/"+s)?t.replace("/"+s,""):t.replace(s,""))}))),t},formData:function(t){var r,o=e.fn.serializeObject!==n,s=o?S.serializeObject():S.serialize();return t=t||v.data,r=e.isPlainObject(t),r?o?(b.debug("Extending existing data with form data",t,s),t=e.extend(!0,{},t,s)):(b.error(q.missingSerialize),b.debug("Cant extend data. Replacing data with form data",t,s),t=s):(b.debug("Adding form data",s),t=s),t}},send:{request:function(){b.set.loading(),b.request=b.create.request(),b.is.mocked()?b.mockedXHR=b.create.mockedXHR():b.xhr=b.create.xhr(),v.onRequest.call(w,b.request,b.xhr)}},event:{trigger:function(e){b.query(),("submit"==e.type||"click"==e.type)&&e.preventDefault()},xhr:{always:function(){},done:function(t,r,n){var o=this,s=(new Date).getTime()-p,a=v.loadingDuration-s,i=e.isFunction(v.onResponse)?v.onResponse.call(o,e.extend(!0,{},t)):!1;a=a>0?a:0,i&&(b.debug("Modified API response in onResponse callback",v.onResponse,i,t),t=i),a>0&&b.debug("Response completed early delaying state change by",a),setTimeout(function(){b.is.validResponse(t)?b.request.resolveWith(o,[t,n]):b.request.rejectWith(o,[n,"invalid"])},a)},fail:function(e,t,r){var n=this,o=(new Date).getTime()-p,s=v.loadingDuration-o;s=s>0?s:0,s>0&&b.debug("Response completed early delaying state change by",s),setTimeout(function(){b.is.abortedRequest(e)?b.request.rejectWith(n,[e,"aborted",r]):b.request.rejectWith(n,[e,"error",t,r])},s)}},request:{done:function(e,t){b.debug("Successful API Response",e),"local"===v.cache&&f&&(b.write.cachedResponse(f,e),b.debug("Saving server response locally",b.cache)),v.onSuccess.call(w,e,A,t)},complete:function(e,t){var r,n;b.was.succesful()?(n=e,r=t):(r=e,n=b.get.responseFromXHR(r)),b.remove.loading(),v.onComplete.call(w,n,A,r)},fail:function(e,t,r){var o=b.get.responseFromXHR(e),a=b.get.errorFromRequest(o,t,r);"aborted"==t?(b.debug("XHR Aborted (Most likely caused by page navigation or CORS Policy)",t,r),v.onAbort.call(w,t,A,e)):"invalid"==t?b.debug("JSON did not pass success test. A server-side error has most likely occurred",o):"error"==t&&e!==n&&(b.debug("XHR produced a server error",t,r),200!=e.status&&r!==n&&""!==r&&b.error(q.statusMessage+r,s.url),v.onError.call(w,a,A,e)),v.errorDuration&&"aborted"!==t&&(b.debug("Adding error state"),b.set.error(),b.should.removeError()&&setTimeout(b.remove.error,v.errorDuration)),b.debug("API Request failed",a,e),v.onFailure.call(w,o,A,e)}}},create:{request:function(){return e.Deferred().always(b.event.request.complete).done(b.event.request.done).fail(b.event.request.fail)},mockedXHR:function(){var t,r,n,o=!1,s=!1,a=!1;return n=e.Deferred().always(b.event.xhr.complete).done(b.event.xhr.done).fail(b.event.xhr.fail),v.mockResponse?(e.isFunction(v.mockResponse)?(b.debug("Using mocked callback returning response",v.mockResponse),r=v.mockResponse.call(w,v)):(b.debug("Using specified response",v.mockResponse),r=v.mockResponse),n.resolveWith(w,[r,o,{responseText:r}])):e.isFunction(v.mockResponseAsync)&&(t=function(e){b.debug("Async callback returned response",e),e?n.resolveWith(w,[e,o,{responseText:e}]):n.rejectWith(w,[{responseText:e},s,a])},b.debug("Using async mocked response",v.mockResponseAsync),v.mockResponseAsync.call(w,v,t)),n},xhr:function(){var t;return t=e.ajax(s).always(b.event.xhr.always).done(b.event.xhr.done).fail(b.event.xhr.fail),b.verbose("Created server request",t),t}},set:{error:function(){b.verbose("Adding error state to element",j),j.addClass(x.error)},loading:function(){b.verbose("Adding loading state to element",j),j.addClass(x.loading),p=(new Date).getTime()}},remove:{error:function(){b.verbose("Removing error state from element",j),j.removeClass(x.error)},loading:function(){b.verbose("Removing loading state from element",j),j.removeClass(x.loading)}},get:{responseFromXHR:function(t){return e.isPlainObject(t)?"json"==v.dataType||"jsonp"==v.dataType?b.decode.json(t.responseText):t.responseText:!1},errorFromRequest:function(t,r,o){return e.isPlainObject(t)&&t.error!==n?t.error:v.error[r]!==n?v.error[r]:o},request:function(){return b.request||!1},xhr:function(){return b.xhr||!1},settings:function(){var e;return e=v.beforeSend.call(w,v),e&&(e.success!==n&&(b.debug("Legacy success callback detected",e),b.error(q.legacyParameters,e.success),e.onSuccess=e.success),e.failure!==n&&(b.debug("Legacy failure callback detected",e),b.error(q.legacyParameters,e.failure),e.onFailure=e.failure),e.complete!==n&&(b.debug("Legacy complete callback detected",e),b.error(q.legacyParameters,e.complete),e.onComplete=e.complete)),e===n&&b.error(q.noReturnedValue),e!==n?e:v},urlEncodedValue:function(e){var r=t.decodeURIComponent(e),n=t.encodeURIComponent(e),o=r!==e;return o?(b.debug("URL value is already encoded, avoiding double encoding",e),e):(b.verbose("Encoding value using encodeURIComponent",e,n),n)},defaultData:function(){var t={};return e.isWindow(P)||(b.is.input()?t.value=A.val():b.is.form()&&(t.text=A.text())),t},event:function(){return e.isWindow(P)||"now"==v.on?(b.debug("API called without element, no events attached"),!1):"auto"==v.on?A.is("input")?P.oninput!==n?"input":P.onpropertychange!==n?"propertychange":"keyup":A.is("form")?"submit":"click":v.on},templatedURL:function(e){if(e=e||A.data(y.action)||v.action||!1,f=A.data(y.url)||v.url||!1)return b.debug("Using specified url",f),f;if(e){if(b.debug("Looking up url for action",e,v.api),v.api[e]===n&&!b.is.mocked())return void b.error(q.missingAction,v.action,v.api);f=v.api[e]}else b.is.form()&&(f=A.attr("action")||j.attr("action")||!1,b.debug("No url or action specified, defaulting to form action",f));return f}},abort:function(){var e=b.get.xhr();e&&"resolved"!==e.state()&&(b.debug("Cancelling API request"),e.abort())},reset:function(){b.remove.error(),b.remove.loading()},setting:function(t,r){if(b.debug("Changing setting",t,r),e.isPlainObject(t))e.extend(!0,v,t);else{if(r===n)return v[t];v[t]=r}},internal:function(t,r){if(e.isPlainObject(t))e.extend(!0,b,t);else{if(r===n)return b[t];b[t]=r}},debug:function(){v.debug&&(v.performance?b.performance.log(arguments):(b.debug=Function.prototype.bind.call(console.info,console,v.name+":"),b.debug.apply(console,arguments)))},verbose:function(){v.verbose&&v.debug&&(v.performance?b.performance.log(arguments):(b.verbose=Function.prototype.bind.call(console.info,console,v.name+":"),b.verbose.apply(console,arguments)))},error:function(){b.error=Function.prototype.bind.call(console.error,console,v.name+":"),b.error.apply(console,arguments)},performance:{log:function(e){var t,r,n;v.performance&&(t=(new Date).getTime(),n=i||t,r=t-n,i=t,u.push({Name:e[0],Arguments:[].slice.call(e,1)||"","Execution Time":r})),clearTimeout(b.performance.timer),b.performance.timer=setTimeout(b.performance.display,500)},display:function(){var t=v.name+":",r=0;i=!1,clearTimeout(b.performance.timer),e.each(u,function(e,t){r+=t["Execution Time"]}),t+=" "+r+"ms",a&&(t+=" '"+a+"'"),(console.group!==n||console.table!==n)&&u.length>0&&(console.groupCollapsed(t),console.table?console.table(u):e.each(u,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),u=[]}},invoke:function(t,r,s){var a,i,u,c=D;return r=r||l,s=P||s,"string"==typeof t&&c!==n&&(t=t.split(/[\. ]/),a=t.length-1,e.each(t,function(r,o){var s=r!=a?o+t[r+1].charAt(0).toUpperCase()+t[r+1].slice(1):t;if(e.isPlainObject(c[s])&&r!=a)c=c[s];else{if(c[s]!==n)return i=c[s],!1;if(!e.isPlainObject(c[o])||r==a)return c[o]!==n?(i=c[o],!1):(b.error(q.method,t),!1);c=c[o]}})),e.isFunction(i)?u=i.apply(s,r):i!==n&&(u=i),e.isArray(o)?o.push(u):o!==n?o=[o,u]:u!==n&&(o=u),i}},d?(D===n&&b.initialize(),b.invoke(c)):(D!==n&&D.invoke("destroy"),b.initialize())}),o!==n?o:this},e.api.settings={name:"API",namespace:"api",debug:!1,verbose:!1,performance:!0,api:{},cache:!0,interruptRequests:!0,on:"auto",stateContext:!1,loadingDuration:0,hideError:"auto",errorDuration:2e3,encodeParameters:!0,action:!1,url:!1,base:"",urlData:{},defaultData:!0,serializeForm:!1,throttle:0,throttleFirstRequest:!0,method:"get",data:{},dataType:"json",mockResponse:!1,mockResponseAsync:!1,beforeSend:function(e){return e},beforeXHR:function(e){},onRequest:function(e,t){},onResponse:!1,onSuccess:function(e,t){},onComplete:function(e,t){},onFailure:function(e,t){},onError:function(e,t){},onAbort:function(e,t){},successTest:!1,error:{beforeSend:"The before send function has aborted the request",error:"There was an error with your request",exitConditions:"API Request Aborted. Exit conditions met",JSONParse:"JSON could not be parsed during error handling",legacyParameters:"You are using legacy API success callback names",method:"The method you called is not defined",missingAction:"API action used but no url was defined",missingSerialize:"jquery-serialize-object is required to add form data to an existing data object",missingURL:"No URL specified for api event",noReturnedValue:"The beforeSend callback must return a settings object, beforeSend ignored.",noStorage:"Caching responses locally requires session storage",parseError:"There was an error parsing your request",requiredParameter:"Missing a required URL parameter: ",statusMessage:"Server gave an error: ",timeout:"Your request timed out"},regExp:{required:/\{\$*[A-z0-9]+\}/g,optional:/\{\/\$*[A-z0-9]+\}/g},className:{loading:"loading",error:"error"},selector:{disabled:".disabled",form:"form"},metadata:{action:"action",url:"url"}}}(jQuery,window,document);