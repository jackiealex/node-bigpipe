define(function(){function e(e){e.on("click",".btn-submit",function(){function a(){t.remove(),n.clearForm()}var t=null,n=e.find("form"),r=e.find("input[name=image]"),i=e.find("input[name=jumpUrl]"),s=e.find("input[name=weight]"),o=$.trim(s.val()),u=$.trim(i.val());if(!r.val())return utils.bubble("请上传图片");if(!u)return utils.bubble("请输入图片点击后跳转的链接");if(!o)return utils.bubble("请输入banner权重");var f=e.find(".disable-status .positive").data("id");n.ajaxSubmit({data:{show:f},beforeSubmit:function(){return t=utils.loading(),!0},uploadProgress:function(){console.log(+(new Date))},success:function(e,n){if(e["node_code"]!=2e4){alert(e.data.msg),t.remove();return}utils.bubble("上传成功"),a()},fail:function(e,t){a()}})})}function t(t){e(t)}return{init:function(e){var n=$(".mod-banner");t(n)}}})