define(function(){function e(e){e.on("click","table tr.row:not(.detail)",function(t){var n=$(this).data("id"),r=$(this).data("accompanyid"),i=e.find("tr.detail"),s=utils.loading(),o=this;utils.api("/report/list/{id}/detail".replace("{id}",n),{dataType:"text",data:{__pipe__:1}}).then(function(e){s.remove(),$(e).insertAfter(o),i.remove(),s.remove()}),e.on("click",".detail .close",function(e){$(this).hide(),$(this).parents("tr").find(".box").animate({height:0},300,function(e){$(this).parents("tr").remove()})})})}function t(e){e.on("click",".btn-handle",function(e){var t=$(this).parents(".item"),n=this,r=t.data("id"),i=t.find(".desc").text(),s=dialog({title:"处理举报",content:['<p style="padding-bottom: 16px; text-align: center">'+i+"</p>",'<h2 style="padding-bottom: 16px; text-align: center">同意：填写“同意”</h2>','<h2 style="padding-bottom: 16px; text-align: center">拒绝：填写“拒绝”</h2>','<div class="ui left icon input">','    <input type="text" />','    <i class="mail icon"></i>',"</div>"].join(""),okValue:"确定",cancelValue:"取消",ok:function(){var e=$(this.node).find("input").val(),t=0;e=$.trim(e);if(e=="同意")t=2;else{if(e!="拒绝")return utils.bubble("口令错误"),!1;t=1}return utils.api("/_bridge/report/{id}/status".replace("{id}",r),{method:"post",data:{status:t}}).done(function(e){e["node_code"]==2e4&&(utils.bubble("处理成功"),_SmartPipe_.reload())}),!0},cancel:function(){return!0}});return s.showModal(),e.stopPropagation(),!1})}function n(e){e.on("change",".header select",function(e){var t=$(this).prev().find("input").val();_SmartPipe_.location("/report/list?key="+t)}),e.on("click",".header .button",function(e){var t=$(this).parents(".header").find("input").val();_SmartPipe_.location("/report/list?key="+t)}),e.on("click",".input .remove",function(e){_SmartPipe_.location("/report/list")}),e.on("keyup",".header .input input",function(e){e.keyCode==13&&$(this).parents(".header").find(".button").trigger("click")})}function r(r){n(r),e(r),t(r)}return{init:function(e){var t=$(".mod-report-list");r(t)}}})