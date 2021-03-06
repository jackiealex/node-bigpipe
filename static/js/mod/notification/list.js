define(function() {
    function DelItem($scope) {

		$scope.on("click", ".item .del", function (e) {
			var $item = $(this).parents('.item');
			var id = $item.data('id');
			var d = dialog({
				title: '删除系统消息',
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">确定删除该系统消息？</div>',
				ok: function () {
					$loading = utils.loading();
					utils.api('/_bridge/notice/system/' + id, {
						method: 'delete'
					}).done(function (rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('成功删除！');
							_SmartPipe_.reload();
						}
						$loading.remove()
					});
					return true;
				},
				cancel: function () {
					return true;
				},
				okValue: '提交',
				cancelValue: '取消'
			});
			d.showModal();
		});
    };

    var updateItemTmpl = [
        '<form action="/notification/updateimg" method="post">',
        '<div class="basic-info" style="overflow: auto;">',
        '	<h4>如需修改图片请添加!</h4>',
        '   <div class="ui form"> <input type="hidden" name="id" value="<%= id %>" />',
        '       <div class="field">',
        '           <div class="ui-input-image-preview">',
        '               <img src="/static/img/icons/image-uploader.png" alt="默认图片">',
        '               <input type="file" name="imageFile" title="选择文件" accept="image/*" >',
        '           </div>',
        '       </div>',
        '   </div>',
        '</div>',
        '<link rel="stylesheet" href="/static/css/page/common/input-image-preview.css">',
        '<div class="row description" style="margin-top:10px;">',
        '   <div class="ui form" style="width: 280px;">',
        '       <div class="field ui icon input">',
        '           <textarea name="content" placeholder="描述一下"><%= content %></textarea>',
        '       </div>',
        '   </div>',
        '</div>',
        '</form>',
    ].join('');


    function EditItem($scope) {
        $scope.on('click', '.edit', function() {
            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var content = $item.find('.content').text();
            var jump = $item.find('.jump').text();
            var type = $('.active').data('type');

            var d = dialog({
                title: '修改消息内容',
                content: _.template(updateItemTmpl, {
                    id: id,
                    content: content,
                    jump: jump,
                    type: type
                }),
                okValue: '提交',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                },
                ok: function() {
                    var id = $(this.node).find('input[name=id]').val();
                    var content = $(this.node).find('textarea[name=content]').val();
                    var file = $(this.node).find('input[name=imageFile]').val();
                    content = $.trim(content);

                    if (!content) {
                        utils.bubble('描述不能为空');
                        return false;
                    }

                    if (!file) {
                        utils.api('/_bridge/admin/system/message/update', {
                            method: 'post',
                            data: {
                                id: id,
                                content: content,
                                jump: jump,
                                type: type
                            }
                        }).done(function(rs, succ) {
                            if (rs['node_code'] != 20000) {
                                return utils.bubble(rs['data']['msg']);
                            }
                            utils.bubble('修改成功');
                            _SmartPipe_.reload();
                        });
                    } else {
                        $(this.node).find('form').ajaxSubmit({
                            data: {
                                file: file
                            },
                            beforeSubmit: function() {
                                loading = utils.loading();
                                return true;
                            },
                            success: function(rs, succ) {
                                var imageId = rs['data']['resp']['images'][0]['id'];
                                utils.api('/_bridge/admin/system/message/update', {
                                    method: 'post',
                                    data: {
                                        id: id,
                                        content: content,
                                        jump: jump,
                                        type: type,
                                        imageId: imageId
                                    }
                                }).done(function(rs, succ) {
                                    if (rs['node_code'] != 20000) {
                                        return utils.bubble(rs['data']['msg']);
                                    }
                                    loading.remove();
                                    utils.bubble('修改成功');
                                    _SmartPipe_.reload();
                                });
                            },
                            error: function() {

                            }
                        });
                    }
                    d.close();
                    return true;
                }
            });
            d.showModal();
        });
    };

    function _bindEvents($scope) {
        DelItem($scope);
        EditItem($scope);
    }


    return {
        init: function() {
            var $scope = $('.mod-notification-list');
            _bindEvents($scope);
        }
    }
});
