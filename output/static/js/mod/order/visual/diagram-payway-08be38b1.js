define(["ec/echarts-all"],function(){function e(e){e=$.extend({container:null,from:"2015-9-14",to:"2015-10-14",url:"/_bridge/order/statistics/paytype"},e),this.options=e,this.init()}return $.extend(e.prototype,{init:function(){this.render()},formatResponseData:function(e){var t=e.data.resp.data,n=[],r=[];this.legend=r;var i={0:"钱包",1:"支付宝",2:"微信",3:"苹果"};for(var s=0;s<3;s++){var o=i[s];r.push(o);var u={name:o,type:"bar",stack:"总量",itemStyle:{normal:{label:{show:!0,position:"insideRight"}}},data:[]};n.push(u)}for(var s=0;s<t.length;s++){var a=t[s];for(var f=0;f<a.length;f++){var l=n[f];l.data.push(a[f]||"")}}return n},render:function(){var e=this,t=this.options,n=t.container,r=utils.getDaysArray(e.options.from,e.options.to);$(".mod-order-visual").find(".diagram-box").height(r.length*48);var i=echarts.init(n);i.on("DATA_RANGE",function(e){var t=this.getOption(),n=e.seriesIndex,r=t.series[n].data,i=0;for(var s=0;s<r.length;s++)i+=r[s]}),this.fetchData(function(t){var n={tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},legend:{data:[]},toolbox:{show:!0,orient:"vertical",y:"center",feature:{mark:{show:!0},dataView:{show:!0,readOnly:!1},restore:{show:!0},saveAsImage:{show:!0}}},calculable:!0,xAxis:[{type:"value"}],yAxis:[{type:"category",data:["周一","周二","周三","周四","周五","周六","周日"]}],series:[]};n.series=e.formatResponseData(t),n.legend={data:e.legend},e.options.durationType!="week"&&(n.yAxis=[{type:"category",data:r}]),i.setOption(n)})},fetchData:function(e){var t=this.options,n=t.container,r=t.from,i=t.to,s=t.url,o=utils.loading();utils.api(s,{data:{startDay:r,endDay:i}}).done(function(t,n){if(t["node_code"]!=2e4)return o.remove(),utils.bubble(t.data.msg);e(t),o.remove()})}}),e})