require.config({waitSeconds:20,baseUrl:"/static/js",deps:["boot/entry"],paths:{ec:"/static/plugins/echarts-2.2.5/build/dist",underscore:"/static/js/base/underscore",jquery:"/static/js/base/jquery-2.1.4","datetime.picker":"/static/plugins/datetime.picker/jquery.datetimepicker",Backbone:"/static/js/base/backbone"},shim:{jquery:{init:function(){console.log("jq init");var e=this.jQuery.noConflict(!0);return e.support.cors=!0,e},deps:[],exports:"$"}}})