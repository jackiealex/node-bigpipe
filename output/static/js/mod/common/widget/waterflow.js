(function(e){"use strict";typeof define=="function"&&define.amd?define(e):e()})(function(){function e(e){this.options=$.extend({el:null,columnGap:10,url:"",query:{page:1,limit:40},columnCount:4,itemTemplate:['<div class="item" data-id="<%= id %>">','<div class="wrap">','<p class="delete" title="删除" data-id="<%= id %>"></p>','<div class="header">','<div class="head-img">','<a class="action-paresh" href="/user/atlas/list?uid=<%= createBy %>" title="查看该用户图集">','<img class="small-pic" src="<%= avator %>" alt="">',"</a>","</div>",'<div class="person-info">','<div class="name"><%= nickname %></div>','<div class="time"><i></i><%= dateTime %></div>',"</div>","</div>","<% if (content) { %>",'<div class="desc"><%= content %></div>',"<% } %>",'<div class="pic-wrap"><img class="pic" data-id="<%= id %>" alt=""></div>','<div class="sum">','<span class="praise-num"><i></i><%= praiseNum %></span>','<span class="comment-num"><i></i><%= commentNum %></span>',"<% if (location) { %>",'<span class="location" title="<%= location %>">',"<i></i><%= location %>","</span>","<% } %>","</div>","</div>","</div>"].join(""),itemFormat:function(e){return e},format:function(e){return e}},e),this._init()}return $.extend(e.prototype,{_init:function(){this.$el=$(this.options.el),this.list=[],this.itemHeightArray=[],this.render();var e=this;$(window).on("resize",_.debounce(function(){e.rerender()}))},_calcColumnCount:function(){var e=this.$el.width();e>=1e3?this.options.columnCount=4:e>=700&&e<1e3?this.options.columnCount=3:e<700&&e>=500?this.options.columnCount=2:this.options.columnCount=1},rerender:function(){this._calcColumnCount();var e=this.$el.children(),t=this.options.columnCount,n=this.options.columnGap,r=this.$el.width(),i=(r-(t-1)*n)/t,s=6,o=Array.apply(null,Array(t)).map(Number.prototype.valueOf,0);for(var u=0;u<e.length;u++){var a=Math.min.apply(null,o),f=o.indexOf(a),l=f*(i+n),c=a,h=e.eq(u),p=h.outerHeight(),d=h.find(".pic"),v=d.width(),m=d.height(),g=(i-s)/v*m;h.css({left:l,top:c,width:i}),h.find(".pic-wrap").css({height:g}),o[f]=a+p}},render:function(){this._calcColumnCount(),this.fetchData(function(e){var t=this.options.columnCount,n=this.options.columnGap,r=this.$el.width(),i=(r-(t-1)*n)/t,s=this.options.itemTemplate,o=Array.apply(null,Array(t)).map(Number.prototype.valueOf,0),u=6;i=Math.ceil(i);var a=0;this.$el.empty();for(var f=0;f<e.length;f++){var l=Math.min.apply(null,o),c=o.indexOf(l),h=c*(i+n),p=l,d=this.options.itemFormat(e[f]);d.dateTime=utils.dateTimeFormat(d.createDate);var v=$(_.template(s,d));this.$el.append(v);var m=d.coverImage.url,g=d.coverImage.size.split("*"),y=parseInt(g[0]),b=parseInt(g[1]),w=(i-u)/y*b;v.css({left:h,top:p,width:i});var E=v.outerHeight();w=Math.ceil(w),o[c]=l+E+w,v.find(".head-img img").on("error",function(e){$(this).attr("src",__uri("/static/img/default.png")),this.onload=null}),v.find(".pic-wrap").css({height:w}),v.find(".pic").on("load",function(t){a++,a>=e.length}).attr("src",m)}this.$el.height(Math.max.apply(null,o))})},fetchData:function(e){var t=this;utils.api(this.options.url,{data:this.options.query}).done(function(n){if(n["node_code"]!=2e4)return;e.call(t,t.options.format(n))})}}),window.WaterFlowLayout=e,e})