define(function(){function e(e){var t=e.find(".dnu-start"),n=e.find(".dnu-end");t.datetimepicker({format:"Y-m-d",lang:"ch",maxDate:utils.dateFormat(new Date,"/"),onShow:function(e){var t=n.val();this.setOptions({maxDate:t?utils.dateFormat(t,"/"):!1})},timepicker:!1}),n.datetimepicker({format:"Y-m-d",lang:"ch",minDate:!1,maxDate:utils.dateFormat(new Date,"/"),onChangeDateTime:function(){},onShow:function(e){var n=!1,r=t.val();this.setOptions({minDate:r?utils.dateFormat(r,"/"):!1})},timepicker:!1})}function t(e){e.on("click",".corner .remove",function(e){$(this).parents(".input").find("input").val("")})}var n=Backbone.View.extend({el:null,initialize:function(e){this.Diagram=e.Diagram},events:{"click .btn-today":"onTodayClick","click .btn-current-week":"onCurrentWeekClick","click .btn-current-month":"onCurrentMonthClick","click .btn-date-click":"onDateIntervalChangeClick"},onDateIntervalChangeClick:function(){var e=this.$el,t=e.find(".dnu-start"),n=e.find(".dnu-end"),r=t.val(),i=n.val(),s=r||i;if(!r&&!i)return utils.bubble("请选择至少一个日期");r&&!i||!r&&i||r==i?new this.Diagram({container:e.find(".diagram-box")[0],day:s}):new this.Diagram({container:e.find(".diagram-box")[0],from:r,to:i})},onCurrentMonthClick:function(){var e=this.$el,t=e.find(".dnu-start"),n=e.find(".dnu-end"),r=(new Date).getFullYear(),i=(new Date).getMonth()+1,s=(new Date(r,i,0)).getDate(),o=utils.dateFormat([r,i,1].join("-")),u=utils.dateFormat([r,i,s].join("-"));t.val(o),n.val(u),new this.Diagram({container:this.$el.find(".diagram-box")[0],durationType:"month",from:o,to:u})},onCurrentWeekClick:function(){var e=this.$el.find(".dnu-start"),t=this.$el.find(".dnu-end"),n=new Date,r=n.getFullYear(),i=n.getMonth()+1,s=n.getDay(),o=s-1,u=7-s,a=864e5,f=utils.dateFormat(+n-o*a),l=utils.dateFormat(+n+u*a);e.val(f),t.val(l),new this.Diagram({container:this.$el.find(".diagram-box")[0],durationType:"week",from:f,to:l})},onTodayClick:function(e){var t=this.$el.find(".dnu-start"),n=this.$el.find(".dnu-end"),r=utils.dateFormat(new Date),i=utils.dateFormat(new Date);t.val(r),n.val(i),new this.Diagram({container:this.$el.find(".diagram-box")[0],from:r,durationType:"day",to:i})}});return{init:function(){var t=utils.queryString(location.search),r=t.type||"cash",i=$(".mod-order-visual");require(["mod/order/visual/diagram-"+r],function(t){var r=new n({el:i,Diagram:t});e(i),function(){i.find(".btn-current-week").click()}()})}}})