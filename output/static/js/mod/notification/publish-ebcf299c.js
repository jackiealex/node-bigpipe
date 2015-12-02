define(["mod/common/widget/suggestion"],function(e){function r(t){new e({el:t.find(".label-search-box input"),elSuggestBox:t.find(".ui-suggestion"),url:window._NA_.api_domain+"/label/search",keyName:"name",baseParams:{key:"",page:1,limit:10},tmplSuggestItem:n,itemSelector:".label-item",onStart:function(){this.$el.parent().addClass("loading")},onEnd:function(){this.$el.parent().removeClass("loading")},format:function(e){return e.resp.labels},itemFormat:function(e){return{id:e.id,name:$.trim(e.name),brand:e.brand,type:e.type,imgUrl:e.imgUrl||""}},onItemSelect:function(e){var n=$(e),r=n.data("id"),i=$.trim(n.text());n.addClass("animated zoomOutUp"),n.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){n.remove()}),t.find(".label-search-input").val(i),t.find(".label-search-id").val(r)}})}function i(n){new e({el:n.find(".name-search-box input"),elSuggestBox:n.find(".ui-suggestion"),url:window._NA_.api_domain+"/search/user",keyName:"name",baseParams:{key:"",page:1,limit:10},tmplSuggestItem:t,itemSelector:".user-item",onStart:function(){this.$el.parent().addClass("loading")},onEnd:function(){this.$el.parent().removeClass("loading")},format:function(e){return e.resp.users},itemFormat:function(e){return{id:e.id,nickname:$.trim(e.nickname),headUrl:e.headUrl||""}},onItemSelect:function(e){var t=$(e),r=t.data("id"),i=$.trim(t.text());t.addClass("animated zoomOutUp"),t.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){t.remove()}),n.find(".name-search-box>input").val(i),n.find(".name-search-id").val(r)}})}function s(e){e.on("click",".btn-submit",function(t){function h(){n.remove(),r.clearForm()}var n=null,r=e.find("form"),i=e.find("input[name=imageFile]"),s=e.find("input[name=jump]"),o=e.find("textarea[name=content]"),u=e.find("input[name=timer]").val(),a=e.find(".resource-type .positive").data("id"),f=i.val(),l=$.trim(o.val()),c="";switch(a){case 1:c=e.find("input[name=nameid]").val();break;case 2:c=e.find("input[name=labelid]").val();break;case 3:c="";break;case 4:c=$.trim(s.val())}if(!i.val())return utils.bubble("请上传图片！");if(!l)return utils.bubble("请输入描述！");if(a==4&&c=="")return utils.bubble("请输入跳转链接！");r.ajaxSubmit({data:{type:a,jump:c},beforeSubmit:function(){return n=utils.loading(),!0},success:function(e,t){if(e["node_code"]!=2e4){utils.bubble(e.data.msg),n.remove();return}utils.bubble("上传成功"),h()},fail:function(e,t){h()}})})}function o(e){var t=10,n=$(".datetimepicker",e),r=new Date,i=new Date(+r+6e4*t),s=new Date(+r+2592e6),o=[i.getFullYear(),i.getMonth()+1,i.getDate()].join("/"),u=[s.getFullYear(),s.getMonth()+1,s.getDate()].join("/"),a=n.datetimepicker({format:"Y-m-d H:i:s",lang:"ch",step:t,minDate:o,maxDate:u,yearStart:i.getFullYear(),validateOnBlur:!0,defaultSelect:!1,onChangeDateTime:function(e,t){if(!e)return;var n=new Date(+(new Date)+6e5);if(+e<+n)return utils.bubble("距离发布时间太近了！"),t.val(""),!1}});e.on("click",".clear-timer",function(e){a.val("")})}function u(e){e.on("click",".resource-type .button",function(t){$(this).hasClass("activity-guide")?(e.find(".title-row").show(),e.find(".activity-image").show()):(e.find(".title-row").hide(),e.find(".activity-image").hide()),$(this).hasClass("h5-link")?$(".jumpTarget").show():$(".jumpTarget").hide(),$(this).hasClass("label-page")||$(this).hasClass("activity-guide")?$(".search-label-tmpl").show():$(".search-label-tmpl").hide(),$(this).hasClass("person-page")?$(".search-user-tmpl").show():$(".search-user-tmpl").hide()})}function a(e){s(e),u(e),r(e),i(e),o(e)}var t=['<li class="user-item" data-id="<%= id %>">','    <img src="<%= headUrl %>" alt="">',"    <div><%= nickname %></div>","</li>"].join(""),n=['<li class="label-item" data-type="<%= type %>" data-brand="<%= brand %>" data-id="<%= id %>" data-type="<%= type %>" data-brand="<%= brand %>">','    <img src="<%= imgUrl %>" alt="">',"    <div><%= name %></div>","</li>"].join("");return{init:function(){var e=$(".mod-notification-publish");a(e)}}})