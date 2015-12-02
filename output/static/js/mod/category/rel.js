define(["mod/common/widget/suggestion","mod/common/fn/user.recommend"],function(e,t){function f(e){e.find(".middle").on("click",".main-img .prev",function(){o.prev()})}function l(e){e.find(".middle").on("click",".main-img .next",function(){o.next()})}function c(e){e.find(".middle").on("click",".btn-rel",function(){var t=[],n=r.find("span");for(var i=0;i<n.length;i++)t.push(n[i].dataset.id);if(t.length<=0)return utils.bubble("您还没有添加标签");var s=o.list[o.index].id;utils.api("/_bridge/interestcate/addatlasrel",{method:"post",data:{atlasid:s,interestcateids:t.toString()}}).done(function(t){if(t["node_code"]==2e4){utils.bubble("关联成功了！");var n=o.getCurrentRecord();n.status=5,e.find(".middle .label-box span").attr("class","ui red tag large label"),e.find(".btn-rel").addClass("green"),e.find(".buttons .button").removeClass("positive"),k(e)}})})}function h(e){e.on("click",".category-list .label",function(){var t=$(this).find(".name").text(),n=$(this).data("id");e.find(".label-box").find("span[data-id="+n+"]").length<=0&&r.append('<span class="ui teal tag large label" name="newtag" data-id='+n+" data-name="+t+">"+t+"</span>")})}function p(e){r.find("span").remove(),utils.api("/_bridge/interestcate/atlaslist",{method:"get",data:{atlasid:e}}).done(function(e,t){for(var n=0;n<e.data.resp.data.length;n++){var i=e.data.resp.data[n].id;r.append('<span class="ui large red tag label" data-id="'+e.data.resp.data[n].id+'">'+e.data.resp.data[n].name+"</span>")}})}function d(e){e.find(".right").on("dblclick",".all-img-box .img-box",function(t){$(this).siblings().removeClass("on"),$(this).addClass("on"),n.attr({src:$(this).children()[0].src}),o.index=e.find(".img-box").index($(this)),o.options.onChange.call(o,o.index)})}function v(e){this.list=[],this.index=0,this.options=$.extend({currentPage:0,limit:20,date:undefined,status:99,url:"/_bridge/admin/atlas/list/all",onChange:function(e){if(this.list.length<=0){console.log("empty list");return}var t=this.list[e].coverImage,r=t.size;n.attr({src:t.url}).data("size",r),$(window).trigger("resize");var i=this.list[this.index],o=i.id,u=i.status;p(o),$scope.find(".status .button").removeClass("positive"),$scope.find(".status .button[data-id="+u+"]").addClass("positive"),u!=5?$scope.find(".btn-rel").removeClass("green"):$scope.find(".btn-rel").addClass("green"),s&&s.currentPage&&(s.refresh(),s.goToPage(0,e,400),s.refresh(),$(s.scroller).children().removeClass("on").eq(s.currentPage.pageY).addClass("on")),$scope.find(".console .index").text(e+1),$scope.find(".console .page").text(this.options.currentPage),$scope.find(".title a").attr("href","/user/atlas/list?uid="+i.createBy).find("p").data("id",i.createBy),$scope.find(".title img").attr("src",i.avator),$scope.find(".title .name").text(i.nickname),$scope.find(".title .time").text(utils.dateTimeFormat(i.createDate))},onPrevEnd:function(e){utils.bubble("到头了")},onNextEnd:function(e){utils.bubble("到头了")},onFetchStart:function(e){},onFetchEnd:function(e){},onPrev:function(e){},onNext:function(e){},onLoaded:function(e){r.find("span").remove();var t=this.list;i.empty();if(t.length==0){i.append('<div class="img-box empty">没有图片哦</div>'),n.attr("src","");return}for(var o=0;o<t.length;o++){var a,f=t[o];a=f.coverImage.url;var l=_.template(u)({src:a});i.append(l)}s=new IScroll("#scroller",{startY:0,scrollX:!1,scrollY:!0,mouseWheel:!0,snap:".img-box"}),setTimeout(function(){s.refresh()},16),$(window).trigger("resize")}},e),this._init()}function m(e){r.on("dblclick","span",function(){$(this).remove()})}function g(e){e.find(".middle").on("mouseover",".next",function(e){e.stopPropagation(),$(this).find(".arrow-right").show()})}function y(e){e.find(".middle").on("mouseout",".next",function(e){e.stopPropagation(),$(this).find(".arrow-right").hide()})}function b(e){e.find(".middle").on("mouseover",".prev",function(e){e.stopPropagation(),$(this).find(".arrow-left").show()})}function w(e){e.find(".middle").on("mouseout",".prev",function(e){e.stopPropagation(),$(this).find(".arrow-left").hide()})}function E(e){var t=e.find(".main-img"),n=t.find("img"),r=t.height(),i=t.width(),s=i/r;if(!n.data("size"))return;var o=n.data("size").split("*"),u=parseInt(o[0]),a=parseInt(o[1]);u/a<s?n.css({height:"100%","max-height":"640px",width:"auto"}):n.css({height:"auto","max-width":"540px",width:"100%"})}function S(t){new e({el:t.find(".search-input input"),elSuggestBox:t.find(".search-input .ui-suggestion"),url:"/_bridge/admin/interestcate/listbyname",keyName:"name",ajaxType:"json",baseParams:{key:"",page:1,limit:20},tmplSuggestItem:a,itemSelector:".item",onStart:function(){this.$el.parent().addClass("loading")},onEnd:function(){this.$el.parent().removeClass("loading")},format:function(e){return e.data.resp.data},itemFormat:function(e){return{id:e.id,name:e.name,imgUrl:e.surfaceImg||""}},onItemSelect:function(e){var n=this,i=$(e),s=i.data("id"),o=i.find(".name").text();if(t.find(".label-box").find("span[data-id="+s+"]").length>=1)return utils.bubble("已存在");r.append('<span class="ui teal tag large label" name="newtag" data-id='+s+" data-name="+o+">"+o+"</span>"),i.addClass("animated zoomOutUp"),i.remove()}})}function x(e){var t=e.find(".filter .date");t.datetimepicker({format:"Y-m-d",lang:"ch",maxDate:utils.dateFormat(new Date,"/"),timepicker:!1})}function T(e){e.on("click",".btn-filter, .filter .btn-close, .filter .btn-query",function(t){e.find(".filter").is(":visible")?e.find(".filter").hide():e.find(".filter").show()})}function N(e){e.on("click",".btn-query",function(e){var t=$(this).parents(".filter").find("select").val(),n=$(this).parents(".filter").find("input").val();o.refresh({currentPage:0,status:t,date:n||undefined})})}function C(e){e.on("click",".status .button",function(t){var n=$(this).data("id"),r=o.getCurrentRecord(),i=$(this);utils.api("/_bridge/admin/atlas/updatestatus",{method:"post",data:{id:r.id,status:n}}).done(function(t){t["node_code"]==2e4&&(utils.bubble("状态已经更新"),i.addClass("positive").siblings().removeClass("positive"),r.status=n,k(e))})})}function k(e){e.find(".checkbox").hasClass("pin")&&o.next()}function L(e){e.on("click",".checkbox",function(e){var t=$(this);t.hasClass("pin")?t.removeClass("pin"):t.addClass("pin")})}function A(e){l(e),f(e),c(e),h(e),m(e),g(e),y(e),b(e),w(e),d(e),T(e),N(e),C(e),L(e),t(e,{selector:".btn-recommend"})}function O(e){o=new v}var n=null,r=null,i=null,s,o=null,u=['<div class="img-box">','<img src="<%= src %>"alt="" class="">',"</div>"].join(""),a=['<li class="item" data-id="<%= id %>">','    <img src="<%= imgUrl %>" alt="">','    <div class="name"><%= name %></div>',"</li>"].join("");return $.extend(v.prototype,{_init:function(){var e=this;this.loadRemoteData("next").done(function(){e.options.onChange.call(e,e.index)})},refresh:function(e){$.extend(this.options,e),this._init()},prev:function(){var e=this;if(this.index<=0){this.index=0;if(this.options.currentPage<=1)return this.options.onPrevEnd.call(this,null);this.loadRemoteData("prev").done(function(){e.index=e.list.length-1,e.options.onPrev.call(e,e.index),e.options.onChange.call(e,e.index)})}else this.index--,this.options.onPrev.call(this,this.index),e.options.onChange.call(e,e.index)},getCurrentRecord:function(){return this.list[this.index]},next:function(){var e=this;if(this.index>=this.list.length-1){if(this.list.length<this.options.limit)return this.options.onNextEnd.call(this,null);this.loadRemoteData("next").done(function(){e.options.onNext.call(e,0),e.options.onChange.call(e,0)})}else this.index++,this.options.onNext.call(this,this.index),e.options.onChange.call(e,e.index)},loadRemoteData:function(e){var t=this.options,n=this;return e=="prev"?(t.currentPage--,this.options.currentPage<=0&&(this.options.currentPage=1)):this.options.currentPage++,this._isLoading_?utils.bubble("数据加载中，请稍等"):(this._isLoading_=!0,utils.api("/_bridge/admin/atlas/list/all",{data:{page:this.options.currentPage,limit:t.limit,date:t.date,status:t.status},onError:function(e){n._isLoading_=!1,utils.bubble("加载异常")}}).done(function(e,r){e["node_code"]==2e4&&(n.list=e.data.resp.pager.list,n.index=0,t.onLoaded.call(n,e),n.options.onFetchEnd.call(n,null),n._isLoading_=!1)}))}}),{init:function(){$scope=$(".mod-atlas-rel-category"),n=$scope.find(".middle .main-img img"),r=$scope.find(".middle .middle-bottom .label-box"),i=$scope.find(".all-img-box"),A($scope),O($scope),x($scope),S($scope),$(window).on("resize",function(e){E($scope)})}}})