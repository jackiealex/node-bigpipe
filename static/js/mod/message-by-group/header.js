define(function() {
    var View = Backbone.View.extend({
        initialize: function(e) {
        },
        events: {
            'click .password .button': 'togglePassWord',
            'click .btn-send-message': 'onSendMessageToUsers',
            'click .selected-box .close': 'hideCart',
            'dblclick .selected-box .item .wrap': 'onRemoveItemFromCart',
			'click .btn-send-message-all': 'onSendMessageToAllUsers'
        },
       
        togglePassWord: function(e) {
            var $p = this.$el.find('.pass');
            var p = $p.val();
            var type = $p.attr('type');
            $p.attr('type', type == 'password' ? 'text' : 'password');
            $(e.currentTarget).find('.icon')[type == 'password' ? 'addClass' : 'removeClass']('unlock');
        },
        onSendMessageToUsers: function(e) {
            debugger
            var userArray = this.$el.find('.selected-box .item').map(function(index, item) {
                return $(item).data('id');
            });
            var userPhoneArray = this.$el.find('.selected-box .item').map(function(index, item) {
                return $(item).data('phone');
            });
            var uname = this.$el.find('.sub-header .uname').val();
            var pass = this.$el.find('.sub-header .pass').val();
            var shortMessageChecked = this.$el.find('.sub-header .short-message input')[0].checked;
            var appInnerChecked = this.$el.find('.sub-header .app-inner input')[0].checked;
            var content = this.$el.find('.sub-header .msg-content').val();
            var $loading = utils.loading()
            if (!shortMessageChecked && !appInnerChecked) {
                $loading.remove();
            }
            if (shortMessageChecked) {
                userPhoneArray = userPhoneArray.toArray();
                if (userPhoneArray.length <= 0) {
                    return utils.bubble('没有添加用户！');
                }
                utils.api('/_bridge/public/message/send', {
                    method: 'post',
                    data: {
                        phones: userPhoneArray.join(','),
                        content: content
                    }
                }).done(function(rs) {
                    $loading.remove()
                    if (rs['node_code'] == 20000) {
                        utils.bubble('短信发送成功！');
                        _SmartPipe_.reload();
                        return true;
                    }
                });
            }
            if (appInnerChecked) {
                userArray = userArray.toArray();
                if (userArray.length <= 0) {
                    return utils.bubble('没有添加用户！');
                }
                utils.api('/_bridge/public/message/send/gotye', {
                    method: 'post',
                    data: {
                        phone: uname,
                        pwd: pass,
                        accounts: userArray.join(','),
                        content: content
                    }
                }).done(function(rs) {
                    $loading.remove()
                    if (rs['node_code'] == 20000) {
                        utils.bubble('消息推送成功！');
                        _SmartPipe_.reload();
                        return true;
                    }
                });
            }
        },
         hideCart: function(e) {
            $(e.currentTarget).parent().hide()
        },
        onRemoveItemFromCart: function(e) {
            $(e.currentTarget).parent().remove();
            this.$el.trigger('cartItemCountChanged')
        },
		onSendMessageToAllUsers:function(e){
			var content = this.$el.find('.sub-header .msg-content').val();
			if (content.trim() == '') {
				return utils.bubble('请填写发送内容！');
			}

			var d = dialog({
				title: '发送确认',
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">确定要给所有用户发送此消息？</div>',
				ok: function () {
					utils.api('/_bridge/public/message/send/gotye/all', {
						method: 'post',
						data: {
							content: content
						}
					}).done(function(rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('消息推送成功！');
							_SmartPipe_.reload();
							return true;
						}
					});
				},
				cancel: function () {
					return true;
				},
				okValue: '提交',
				cancelValue: '取消'
			});
			d.showModal();
		}
    });
   
    return {
        init: function(e) {
            var $scope = $('.mod-message-by-group')
            var view = new View({
                el: $scope[0]
            });
        }
    }
})
