define(function(){function e(e){e.on("click",".btn-submit",function(t){var n=null,r=e.find("form.create-interestlabel"),i=e.find("input[type=file]"),s=e.find("input[name=name]"),o=e.find("input[id]").val(),u=e.find("textarea[name=content]"),a=i.val(),f=$.trim(s.val()),l=$.trim(o)||0,c=$.trim(u.val());if(!i.val())return utils.bubble("请上传图片！");if(!f)return utils.bubble("请输入名称！");r.ajaxSubmit({data:{id:e.find(".selected").data("id")||0},beforeSubmit:function(){return n=utils.loading(),!0},success:function(e,t){if(e["node_code"]!=2e4){utils.bubble(e.data.msg),n.remove();return}utils.bubble("上传成功"),_SmartPipe_.reload(),n.remove()},fail:function(e,t){_SmartPipe_.reload(),utils.bubble("未知错误"),n.remove()}})})}function t(e){e.on("click",".category-list li",function(e){if($(this).hasClass("selected"))return $(this).removeClass("selected");$(this).addClass("selected").siblings().removeClass("selected")})}function n(n){e(n),t(n)}return{init:function(){var e=$(".mod-interestlabel-publish");n(e)}}})