define(["mod/user/search"],function(e){var t=Backbone.View.extend({initialize:function(e){},events:{"click .selected-box .close":"hideCart","dblclick .selected-box .item .wrap":"onRemoveItemFromCart","click .btn-add-cart":"addUsersToCart","click .btn-show-cart":"showCart","click .list .item .wrap":"onItemSelect","click .btn-select-all":"onSelectAll","click .btn-reverse-select":"onReverseSelectAll","click .password .button":"togglePassWord",cartItemCountChanged:"onCartItemCountChanged","click .btn-send-message":"onSendMessageToUsers"},onCartItemCountChanged:function(e){var t=this.$el.find(".selected-box .item").length;this.$el.find(".btn-show-cart").text(t+"项（点击查看）")},addUsersToCart:function(e){var t=this.$el;t.find(".item.selected").each(function(e,n){var r=t.find(".selected-box"),i=n.cloneNode(!0);if(r.find(".item[data-id="+$(n).data("id")+"]").length>0)return utils.createElementTip(n,{text:"重复加入"});$(n).removeClass("selected"),t.find(".selected-box").append($(i).removeClass("selected")),t.trigger("cartItemCountChanged")})},showCart:function(e){this.$el.find(".selected-box").show()},hideCart:function(e){this.$el.find(".selected-box").hide()},onItemSelect:function(e){var t=$(e.currentTarget).parent();t.hasClass("selected")?t.removeClass("selected"):t.addClass("selected")},onRemoveItemFromCart:function(e){$(e.currentTarget).parent().remove(),this.$el.trigger("cartItemCountChanged")},onSelectAll:function(e){this.$el.find(".list .item").addClass("selected")},onReverseSelectAll:function(e){this.$el.find(".list .item").each(function(e,t){$(t).hasClass("selected")?$(t).removeClass("selected"):$(t).addClass("selected")})},togglePassWord:function(e){var t=this.$el.find(".pass"),n=t.val(),r=t.attr("type");t.attr("type",r=="password"?"text":"password"),$(e.currentTarget).find(".icon")[r=="password"?"addClass":"removeClass"]("unlock")},onSendMessageToUsers:function(e){var t=this.$el.find(".selected-box .item").map(function(e,t){return $(t).data("id")}),n=this.$el.find(".selected-box .item").map(function(e,t){return $(t).data("phone")}),r=this.$el.find(".sub-header .uname").val(),i=this.$el.find(".sub-header .pass").val(),s=this.$el.find(".sub-header .short-message input")[0].checked,o=this.$el.find(".sub-header .app-inner input")[0].checked,u=this.$el.find(".sub-header .msg-content").val(),a=utils.loading();!s&&!o&&a.remove();if(s){n=n.toArray();if(n.length<=0)return utils.bubble("没有添加用户！");utils.api("/_bridge/public/message/send",{method:"post",data:{phones:n.join(","),content:u}}).done(function(e){a.remove();if(e["node_code"]==2e4)return utils.bubble("短信发送成功！"),_SmartPipe_.reload(),!0})}if(o){t=t.toArray();if(t.length<=0)return utils.bubble("没有添加用户！");utils.api("/_bridge/public/message/send/gotye",{method:"post",data:{phone:r,pwd:i,accounts:t.join(","),content:u}}).done(function(e){a.remove();if(e["node_code"]==2e4)return utils.bubble("消息推送成功！"),_SmartPipe_.reload(),!0})}}});return{init:function(n){var r=$(".mod-message-by-group"),i=new t({el:r});new e({el:r.find(".mod-user-list"),defaultPathname:"/message/by/group?"}),i.onCartItemCountChanged()}}})