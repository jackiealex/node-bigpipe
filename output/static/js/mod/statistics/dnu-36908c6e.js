define(["ec/echarts-all"],function(){function t(t){t=$.extend({container:null,from:"",to:"",day:"",timeType:"",urlForOneDay:"/_bridge/admin/userstatistics/forhours",urlForDays:"/_bridge/admin/userstatistics/fordays",url:""},t,e[$(".mod-dnu").data("type")]),this.options=t,this.processParams(),this.init()}function n(e){var t=e.find(".dnu-start"),n=e.find(".dnu-end");t.datetimepicker({format:"Y-m-d",lang:"ch",maxDate:utils.dateFormat(new Date,"/"),onShow:function(e){var t=n.val();this.setOptions({maxDate:t?utils.dateFormat(t,"/"):!1})},timepicker:!1}),n.datetimepicker({format:"Y-m-d",lang:"ch",minDate:!1,maxDate:utils.dateFormat(new Date,"/"),onChangeDateTime:function(){},onShow:function(e){var n=!1,r=t.val();this.setOptions({minDate:r?utils.dateFormat(r,"/"):!1})},timepicker:!1})}function r(e){var n=e.find(".dnu-start"),r=e.find(".dnu-end");e.on("click",".btn-date-click",function(i){var s=n.val(),o=r.val(),u=s||o;if(!s&&!o)return utils.bubble("请选择至少一个日期");s&&!o||!s&&o||s==o?new t({container:e.find(".diagram-box")[0],day:u}):new t({container:e.find(".diagram-box")[0],from:s,to:o})})}function i(e){e.on("click",".corner .remove",function(e){$(this).parents(".input").find("input").val("")})}function s(e){e.on("click",".btn-current-month",function(n){var r=e.find(".dnu-start"),i=e.find(".dnu-end"),s=(new Date).getFullYear(),o=(new Date).getMonth()+1,u=(new Date(s,o,0)).getDate(),a=utils.dateFormat([s,o,1].join("-")),f=utils.dateFormat([s,o,u].join("-"));r.val(a),i.val(f),new t({container:e.find(".diagram-box")[0],from:a,to:f})})}function o(e){e.on("click",".btn-current-week",function(n){var r=e.find(".dnu-start"),i=e.find(".dnu-end"),s=new Date,o=s.getFullYear(),u=s.getMonth()+1,a=s.getDay(),f=a-1,l=7-a,c=864e5,h=utils.dateFormat(+s-f*c),p=utils.dateFormat(+s+l*c);r.val(h),i.val(p),new t({container:e.find(".diagram-box")[0],timeType:"week",from:h,to:p})})}function u(e){e.on("click",".btn-today",function(n){var r=e.find(".dnu-start"),i=e.find(".dnu-end"),s=utils.dateFormat(new Date),o=utils.dateFormat(new Date);r.val(s),i.val(o),new t({container:e.find(".diagram-box")[0],day:new Date})})}function a(e){r(e),s(e),o(e),u(e),i(e)}var e={newuser:{urlForOneDay:"/_bridge/admin/userstatistics/forhours",urlForDays:"/_bridge/admin/userstatistics/fordays"},active:{urlForOneDay:"/_bridge/admin/userecord/forhours",urlForDays:"/_bridge/admin/userecord/fordays"},atlas:{urlForOneDay:"/_bridge/admin/atlasstatistics/forhours",urlForDays:"/_bridge/admin/atlasstatistics/fordays"}};return $.extend(t.prototype,{init:function(){this.render()},processParams:function(){var e=this.options,t=e.from,n=e.to,r=e.day;r||t==n&&t?(e.url=e.urlForOneDay,e.day=r?utils.dateFormat(r):t):e.url=e.urlForDays},render:function(){var e=this,t=this.options,n=t.container,r=echarts.init(n);this.fetchData(function(e){var n=t.from,i=t.to,s=t.url,o=t.day,u={tooltip:{show:!0},legend:{data:["变化趋势"]},toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},magicType:{show:!0,type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}}},yAxis:[{type:"value"}]},a=o?utils.getHoursOfDay():utils.getDaysArray(+(new Date(n)),+(new Date(i)));t.timeType=="week"&&(a=utils.getDaysOfWeek()),u.xAxis=[{type:"category",data:a}],u.series=[{name:"新增量",type:"bar",calculable:!0,markPoint:{data:[{type:"max",name:"最大值"},{type:"min",name:"最小值"}]},markLine:{data:[{type:"average",name:"平均值"}]},data:e.data.resp.data}],r.setOption(u)})},fetchData:function(e){var t=this.options,n=t.container,r=t.from,i=t.to,s=t.url,o=t.day,u=null;u=utils.loading(),utils.api(s,{method:"get",data:{from:r,to:i,day:o,type:t.type}}).done(function(t,n){if(t["node_code"]!=2e4)return u.remove(),utils.bubble(t.data.msg);e(t),u.remove()})},setUrl:function(e){this.options.url=e}}),{init:function(){var e=$(".mod-dnu");a(e),n(e),function(){e.find(".btn-current-week").click()}()}}})