(function(e){typeof define=="function"&&define.amd?define(["jquery","ChineseDistricts"],e):e(jQuery,ChineseDistricts)})(function(e,t){"use strict";if(typeof t=="undefined")throw new Error('The file "distpicker.data.js" must be included first!');var n=function(t,r){this.$element=e(t),this.defaults=e.extend({},n.defaults,e.isPlainObject(r)?r:{}),this.init()};n.prototype={constructor:n,data:t,init:function(){var t=this.$element.find("select"),n=t.length,r={};t.each(function(){e.extend(r,e(this).data())}),r.province?(this.defaults.province=r.province,this.$province=t.filter("[data-province]")):this.$province=n>0?t.eq(0):null,r.city?(this.defaults.city=r.city,this.$city=t.filter("[data-city]")):this.$city=n>1?t.eq(1):null,r.district?(this.defaults.district=r.district,this.$district=t.filter("[data-district]")):this.$district=n>=2?t.eq(2):null,this.output("province"),this.output("city"),this.output("district"),this.addListener()},addListener:function(){var e=this;this.$province&&this.$province.change(function(){e.output("city"),e.output("district")}),this.$city&&this.$city.change(function(){e.output("district")})},output:function(t){var n=1,r={},i=[],s="",o=this["$"+t],u=this;if(!o)return;s=this.defaults[t]||"",n=t==="province"?1:t==="city"?this.$province.find("option:selected").data().zipcode:t==="district"?this.$city.find("option:selected").data().zipcode:n,r=e.isNumeric(n)?this.data[n]:{},r=e.isPlainObject(r)?r:{},e.each(r,function(e,t){var n=t===s;n&&(u.selected=!0),i.push(u.template({zipcode:e,address:t,selected:n}))}),this.selected||i.unshift(u.template({zipcode:"",address:s,selected:!1})),o.html(i.join(""))},template:function(t){var n={zipcode:"",address:"",selected:!1};return e.extend(n,t),['<option value="'+(n.address&&n.zipcode?n.address:"")+'"',' data-zipcode="'+(n.zipcode?n.zipcode:"")+'"',n.selected?" selected":"",">"+(n.address?n.address:"")+"</option>"].join("")}},n.defaults={province:"—— 省 ——",city:"—— 市 ——",district:"—— 区 ——"},n.setDefaults=function(t){e.extend(n.defaults,t)},e.fn.distpicker=function(t){return this.each(function(){e(this).data("distpicker",new n(this,t))})},e.fn.distpicker.constructor=n,e.fn.distpicker.setDefaults=n.setDefaults,e(function(){e("[distpicker]").distpicker()})})