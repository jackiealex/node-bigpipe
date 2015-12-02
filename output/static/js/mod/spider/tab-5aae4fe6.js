define(function(){function t(e){this.options=_.extend({tabBar:null,panelContainer:null,tabBarItemTmpl:'<div class="item active" data-tab="tab-name"><%= title %></div>',tabPanelItemTmpl:'<div class="panel active"><%= content %></div> '},e),this.$tabBar=$(this.options.tabBar),this.$panelContainer=$(this.options.panelContainer),this.init()}var e=!1;return _.extend(t.prototype,{init:function(){this._bindEvents()},findItemByTitle:function(e){var t=-1;return $tabBarItems=this.$tabBar.find(".item"),$tabBarItems.each(function(n,r){if($(r).text()==e)return t=n,!1}),t},updateItemContentByTitle:function(e,t,n){var r=this.findItemByTitle(e);if(r>0){this.updateItemContent(r,t);return}this.addTabItem(e,t)},updateItemContent:function(e,t,n){n||(n=!0),this.$tabBar.find(".item.active").removeClass("active"),this.$tabBar.find(".item").eq(e).addClass("active"),this.$panelContainer.find(".panel.active").removeClass("active");var r=this.$panelContainer.find(".panel").eq(e);r[n?"append":"html"](t).addClass("active")},activeItem:function(e){this.$tabBar.find(".item").removeClass("active").eq(e).addClass("active"),this.$panelContainer.find(".panel").removeClass("active").eq(e).addClass("active")},addTabItem:function(e,t,n){n||(n=this.$tabBar.find(".item").length),e||(e="title"+n),t||(t="content"+n);var r=_.template(this.options.tabBarItemTmpl)({title:e}),i=_.template(this.options.tabPanelItemTmpl)({content:t});this.$tabBar.find(".item").removeClass("active"),this.$panelContainer.find(".panel").removeClass("active"),this.$tabBar.append(r),this.$panelContainer.append(i)},_bindEvents:function(){var e=this;this.$tabBar.on("click",".item",function(t){var n=$(this).parent().children().index(this);$(this).addClass("active").siblings().removeClass("active"),e.$panelContainer.find(".panel").removeClass("active").eq(n).addClass("active")})}}),t})