define(function(){function t(t){t.on("click",".add-type",function(t){var n=dialog({title:"添加贴纸类别",content:_.template(e),okValue:"提交",cancelValue:"取消",cancel:function(){return!0},ok:function(){return $(this.node).find("form").ajaxSubmit({success:function(e,t){utils.bubble("添加成功！"),_SmartPipe_.reload()},error:function(e,t){}}),n.close(),!0}});n.showModal()})}function n(e){e.on("click",".btn-submit",function(t){function m(){n.remove(),r.clearForm()}var n=null,r=e.find("form"),i=e.find("input[name=imageFile]"),s=e.find("input[name=viewFile]"),o=e.find("input[name=name]"),u=e.find("input[name=weight]"),a=e.find(".fullscree-status .positive").data("type"),f=e.find(".type-status .positive").data("id"),l=e.find("input[name=stickerTypeId]:checked"),c=l.val();f==0?stickerTypeId="":f==1&&(stickerTypeId=c);var h=i.val(),p=s.val(),d=o.val(),v=u.val();if(!h)return utils.bubble("请上传贴纸图！");if(!p)return utils.bubble("请上传预览图！");if(!v)return utils.bubble("请输入权重");if(!d)return utils.bubble("请输入名称！");r.ajaxSubmit({data:{level:f,stickerTypeId:stickerTypeId,fullScreen:a},beforeSubmit:function(){return n=utils.loading(),!0},success:function(e,t){if(e["node_code"]!=2e4){utils.bubble(e.data.msg),n.remove();return}m(),utils.bubble("添加成功"),_SmartPipe_.reload()},fail:function(e,t){m()}})})}function r(e){e.on("click",".btn-type",function(e){$(".stype-list").addClass("animated lightSpeedIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend").show()}),e.on("click",".btn-common",function(e){$(".stype-list").hide()})}function i(e){n(e),t(e),r(e)}var e=['<form action="/sticker/type/add" method="post">','   <div class="ui form">','       <div class="field">','           <div class="ui-input-image-preview">','               <img src="/static/img/icons/image-uploader.png" alt="默认图片">','               <input type="file" name="file" title="选择文件" accept="image/*" >',"           </div>","       </div>","   </div>",'	<div class="field">','		<div class="ui right icon input">','			<input type="number" min="1" placeholder="权重" name="weight" >','			<i class="resize vertical icon"></i>',"		</div>","	</div><br/>",'	<div class="field">','		<div class="ui right icon input">','			<input type="text" name="name" placeholder="名称">','			<i class="home  icon"></i>',"		</div>","	</div>","</form>"].join("");return{init:function(){var e=$(".mod-stickers");i(e)}}})