define(function(){function e(e){e.on("click",".img-wrap",function(e){var t=$(this),n=$(this).parents(".item").data("id");dialog({title:"删除推荐",content:"是否将此用户删除默认推荐列表？",ok:function(){return utils.api("/_bridge/admin/recommend/user/delete",{method:"post",data:{id:n}}).done(function(e,n){utils.bubble("删除成功！"),t.parents(".item").addClass("animated bounceOutLeft").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){$(this).remove()})}),!0},okValue:"确定",cancelValue:"取消",cancel:function(){return!0}}).show(e.target)})}function t(t){e(t)}return{init:function(e){var n=$(".mod-user-list");t(n)}}})