define(function(){function n(e){e.on("click",".item .del",function(){$this=$(this),utils.api("/_bridge/admin/page/delete",{method:"post",data:{id:$this.data("id")}}).done(function(e){e["node_code"]==2e4&&$this.parents(".item").addClass("animated bounceOutLeft").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$(this).remove()})})})}function r(t){t.on("dblclick",".item .name, .item .starttime, .item .endtime, .item .version, .item .pkg, .item .description",function(t){var n=$(this).parents(".item"),r=n.data("id"),i=n.find(".link-text").text(),s=n.data("type"),o=n.data("starttime"),u=n.data("endtime"),a=n.find(".name"),f=n.find(".description"),l=n.data("code"),c=a.text(),h=f.text(),p=n.find(".pkg"),d=p.text(),v=dialog({title:"修改启动页",align:"bottom left",quickClose:!0,content:_.template(e,{id:r,link:i,type:s,name:c,starttime:utils.dateTimeFormat(o),endtime:utils.dateTimeFormat(u),pkg:d,description:h}),onshow:function(){$(this.node).find(".buttons .button:contains("+d+")").addClass("positive").siblings().removeClass("positive"),$(this.node).find(".datetimepicker").eq(0).datetimepicker({format:"Y-m-d 00:01",timepicker:!1,lang:"ch"}),$(this.node).find(".datetimepicker").eq(1).datetimepicker({format:"Y-m-d 23:59",lang:"ch",timepicker:!1})},ok:function(){var e=$(this.node).find("input[name=id]").val(),t=$(this.node).find("input[name=name]").val(),n=$(this.node).find("input[name=starttime]").val(),r=$(this.node).find("input[name=endtime]").val(),o=$(this.node).find("textarea[name=description]").val();return t=$.trim(t),o=$.trim(o),t?n?r?r<n?(utils.bubble("结束时间不能比开始时间早哦"),$(this.node).find("input[name=endtime]").val(""),!1):o?(utils.api("/_bridge/admin/page/update",{method:"post",data:{id:e,type:s,link:i,name:t,startTime:+(new Date(n)),endTime:+(new Date(r)),pkg:d,description:o,imageKey:l}}).done(function(e){if(e["node_code"]!=2e4)return utils.bubble(e.data.msg);utils.bubble("修改成功"),_SmartPipe_.reload()}),!0):(utils.bubble("请输入您的描述"),!1):(utils.bubble("结束时间不能为空"),!1):(utils.bubble("开始时间不能为空"),!1):(utils.bubble("请输入名称"),!1)},okValue:"提交",cancelValue:"取消",cancel:function(){return!0}});v.showModal()})}function i(e){e.on("dblclick",".item .images",function(e){var n=$(this).parents(".item"),r=n.data("id"),i=n.find(".link-text").text(),s=n.data("starttime"),o=n.data("endtime"),u=n.data("type"),a=n.find(".name"),f=n.find(".pkg"),l=n.find(".description"),c=n.data("code"),h=a.text(),p=f.text(),d=l.text(),v=dialog({title:"修改启动页图片",align:"bottom left",quickClose:!0,content:_.template(t,{id:r,imageKey:c}),ok:function(){var e=$(this.node).find("input[name=file]").val();return e?($(this.node).find("form").ajaxSubmit({beforeSubmit:function(){return loading=utils.loading(),!0},success:function(e,t){var n=e.data.resp.images[0].cacheKey;$.ajax("/_bridge/admin/page/update",{method:"post",data:{id:r,link:i,type:u,name:h,startTime:s,endTime:o,pkg:p,description:d,imageKey:n}}).done(function(e){if(e["node_code"]!=2e4)return utils.bubble(e.data.msg);loading.remove(),utils.bubble("修改成功"),_SmartPipe_.reload()})},error:function(){}}),!0):(utils.bubble("请选择图片"),!1)},okValue:"提交",cancelValue:"取消",cancel:function(){return!0}});v.show(e.target)})}function s(e){r(e),n(e),i(e)}var e=['<div class="basic-info"><input type="hidden" name="id" value="<%= id %>" />','	<div class="ui form">','		<div class="two fields">','			<div class="field">','				<input name="name" style="width:250px;" type="text" value="<%= name %>" placeholder="名称"/>',"			</div>","		</div>",'		<div class="two fields">','			<div class="field">','				<div class="ui left icon input label-search-box">','					<input type="text" readonly class="datetimepicker" name="starttime" value="<%= starttime %>" placeholder="起始时间" />','					<i class="time icon"></i>',"				</div>","			</div>",'			<div class="field">','				<div class="ui left icon input label-search-box">','					<input type="text"  readonly class="datetimepicker" name="endtime" value="<%= endtime %>" placeholder="结束时间" />','					<i class="time icon"></i>',"				</div>","			</div>","		</div>",'		<div class="field">','		    <textarea wrap="virtual" style="min-height: 48px;height: 48px;" name="description"  maxlength="40" placeholder="说点什么(最多输入40个字符...)"><%= description %></textarea>',"		</div>","	</div>","</div>"].join(""),t=['<form action="/applaunch/updateimg" method="post" class="applunch_image">','<div class="basic-info">','   <div class="ui form"> <input type="hidden" name="id" value="<%= id %>" />','       <div class="field">','           <div class="ui-input-image-preview">','               <img src="/static/img/icons/image-uploader.png" alt="默认图片">','               <input type="file" name="file" title="选择文件" accept="image/*" >',"           </div>","       </div>","   </div>","</div>","</form>",'<link rel="stylesheet" href="/static/css/page/common/input-image-preview.css">'].join("");return{init:function(e){var t=$(".mod-applaunch-list");s(t)}}})