define(["base/md5"],function(e){function t(t){t.on("click",".btn-submit",function(n){function h(){r.remove(),t.find(".progress").html("点击上传头像"),uploader.reset()}var r=null,i=t.find("form"),s=t.find("input[name=username]"),o=t.find("input[name=raw-password]"),u=t.find("input[name=re-password]"),a=t.find("input[name=email]"),f=t.find("input[name=phone]"),l=t.find("input[name=nickname]"),c=t.find("input[name=content]");if(!s.val()){utils.bubble("请输入用户名！"),$account.focus();return}if(o.val().length<6){utils.bubble("密码长度最少6位！"),o.focus();return}if(!o.val()||!u.val()){utils.bubble("请输入密码！");if(o.val()==""){o.focus();return}if(u.val()==""){u.focus();return}}if(o.val()!=u.val()){utils.bubble("确认密码不一致！"),u.focus();return}if(!l.val()){utils.bubble("请输入昵称！"),l.focus();return}if(!a.val()){utils.bubble("请输入邮箱！"),a.focus();return}var p=t.find(".roles .item.select").map(function(e,t){return $(t).data("id")});i.ajaxSubmit({data:{roleId:p.toArray().join(",")},beforeSubmit:function(t){return r=utils.loading(),t.push({name:"password",value:e(o.val())}),!0},success:function(e,t){if(e["node_code"]!=2e4){r.remove();switch(e.node_code){case 40302:utils.bubble("昵称重复！");break;case 40309:utils.bubble("用户名被占用！");break;default:utils.bubble(e.data.msg)}return}utils.bubble("提交成功"),r.remove(),_SmartPipe_.reload()},fail:function(e,t){h(),utils.bubble(rs.data.msg),i.clearForm()}})})}function n(e){t(e),r(e),i(e)}function r(e){e.on("click",".roles>.item",function(e){$(this).hasClass("select")?$(this).removeClass("select"):$(this).addClass("select")})}function i(e){e.on("click",".roles .item .expand",function(e){var t=$(this).parents(".item").find("ul");return t.is(":visible")?t.hide():t.show(),e.preventDefault(),e.stopPropagation(),!1})}return{init:function(){var e=$(".mod-admin-publish");n(e)}}})