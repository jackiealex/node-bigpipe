define(["mod/common/widget/waterflow"],function(e){function s(e){e.on("click",".pic",function(e){var t=$(this).parents(".item"),n=t.data("id");utils.openWindow({url:"/atlas/"+n+"/detail?"})})}function o(e){s(e),u(e)}function u(e){e.on("click",".delete",function(n){var s=$(this).parents(".item"),o=this,u=s.data("id"),a=dialog({title:"您即将删除该图集",content:"确定删除?",okValue:"确定",cancelValue:"取消",ok:function(){var s=e.data("type");s=="all"||s=="mine"?r(u,n):s=="timing"?t(u,n):s=="top"&&i(u,n)},cancel:function(){return!0}});a.showModal()})}var t=function(e,t){t.stopPropagation(),t.preventDefault(),utils.api("/_bridge/admin/atlas/timer/cancel",{method:"post",data:{id:e}}).done(function(e,n){e["node_code"]==2e4&&(utils.bubble("定时取消"),$(t.target).parents(".item").remove(),_SmartPipe_.reload())})},n=function(e,t){t.stopPropagation(),t.preventDefault(),utils.api("/_bridge/admin/atlas/timer/cancel",{method:"post",data:{id:e}}).done(function(e,n){e["node_code"]==2e4&&(utils.bubble("图集已经删除"),$(t.target).parents(".item").remove(),_SmartPipe_.reload())})},r=function(e,t){t.stopPropagation(),t.preventDefault(),utils.api("/_bridge/admin/atlas/delete",{method:"post",data:{id:e}}).done(function(e,n){e["node_code"]==2e4&&(utils.bubble("图集已经删除"),$(t.target).parents(".item").remove(),_SmartPipe_.reload())})},i=function(e,t){t.stopPropagation(),t.preventDefault(),utils.api("/_bridge/admin/atlas/top/cancel",{method:"post",data:{id:e,atlasId:e}}).done(function(e,n){e["node_code"]==2e4&&(utils.bubble("图集已经删除"),$(t.target).parents(".item").remove(),_SmartPipe_.reload())})};return{init:function(){var t=$(".mod-atlas-list"),n=t.data("type"),r="/_bridge/admin/atlas/list/all",i=utils.queryString(location.search);switch(n){case"all":r="/_bridge/admin/atlas/list/all";break;case"mine":r="/_bridge/admin/atlas/list";break;case"top":r="/_bridge/admin/atlas/top/list";break;case"timing":r="/_bridge/admin/atlas/timer/all"}new e({el:t.find(".box-wrapper")[0],url:r,query:{page:i.page||1,limit:40},format:function(e){return e.data.resp.pager.list}}),o(t)}}})