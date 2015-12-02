define(['mod/permission/fn-role-drop-handler'], function(onRoleDroppedhandler) {

    var tmplRole = [
        '<form action="/_bridge/role/update" method="post">',
        '<div>',
        '<input type="hidden" value="<%= id %>" name="id"  />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="name" placeholder="角色名" value="<%= name %>" >',
        '        <i class="home icon"></i>',
        '    </div> <br />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="description" placeholder="描述" value="<%= content %>">',
        '        <i class="text file icon"></i>',
        '    </div>',
        '</form>',
        '</div>'
    ].join('');

    function delGroup(id, callback) {
        utils.api('/_bridge/role?id=' + id, {
            method: 'delete',
            onError: function(rs, succ) {
                callback({
                    node_code: null,
                    msg: 'server error'
                });
            }
        }).done(function(rs, succ) {
            callback(rs);
        });
    };

    function onDragItem2Group($scope) {
        $scope.find('.item ul').droppable({}).on('drop',  onRoleDroppedhandler);
    };

    function onDeleteItem($scope) {
        $scope.on('click', '.role .menu .delete', function(e) {

            var $item = $(this).parents('.role');
            var id = $item.find('ul').data('id');

            dialog({
                title: '删除角色',
                quickClose: true,
                align: 'bottom',
                okValue: '提交',
                cancelValue: '取消',
                content: "操作类型为重要操作，请确认是否要继续？",
                ok: function() {
                    delGroup(id, function(rs) {
                        if (rs['node_code'] != 20000) {
                            return utils.bubble('角色移除失败');
                        }
                        $item.addClass('animated zoomOut')
                            .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                                $(this).remove();
                            });
                        utils.bubble('角色成功移除！');
                        _SmartPipe_.reload();
                    });
                },
                cancel: function() {
                    return true;
                }
            }).show(e.target);
            
        });
    };

    function onClickSettingsOfItem($scope) {
        $scope.on('click', '.role .menu .settings', function(e) {
            var $item = $(this).parents('.role');
            var id = $item.find('ul').data('id');
            var $targets = $(this).parents('.item').find('.item.url .btn-url-remove');
            $targets.show();
            setTimeout(function() {
                $targets.hide();
            }, 1000 * 3)
        });
    };

    function onRemoveUrlFromRole($scope) {
        $scope.on('click', '.role .btn-url-remove', function(e) {
            var $item = $(this).parents('.role');
            var roleId = $item.find('ul').data('id');
            var authId = $(this).parents('li').data('id');
             
            dialog({
                title: '慎重啊君！！！',
                align: 'bottom',
                okValue: '确定',
                cancelValue: '取消',
                content: "此操作十分重要，请慎重执行！",
                ok: function() {
                    utils.api('/_bridge/role/{id}/authorities?authId={authId}'.replace('{id}', roleId).replace('{authId}', authId), {
                        method: 'delete',
                    }).done(function(rs, succ) {
                        if (rs['node_code'] != 20000) {
                            return utils.bubble(rs['msg'] || rs['err'])
                        }
                        utils.bubble('权限已经移除！');
                        window._SmartPipe_.reload();
                    });
                },
                cancel: function() {
                    return true;
                }
            }).showModal(e.target);
            
        });
    };

    function onUpdateItem($scope) {
        $scope.on('click', '.role .menu .update', function(e) {
            var $item = $(this).parents('.role');
            var id = $item.find('ul').data('id');
            var name = $item.find('h2 span').text();
            var content = $item.find('h2 p').text();

            dialog({
                title: '编辑角色',
                quickClose: true,
                align: 'bottom',
                okValue: '提交',
                cancelValue: '取消',
                content: _.template(tmplRole, {
                    id: id,
                    name: name,
                    content: content
                }),
                ok: function() {

                    var name = $(this.node).find('input[name=name]').val();
                    var content = $(this.node).find('input[name=content]').val();

                    $(this.node).find('form').ajaxSubmit({
                        success: function(rs) {

                            if (rs['node_code'] != 20000) {
                                return utils.bubble('角色更新失败');
                            }
                           
                            utils.bubble('角色已更新！');
                            $item.find('h2 span').text(name);
                            $item.find('h2 p').text(content);

                        },
                        error: function() {

                        }
                    });
                },
                cancel: function() {
                    return true;
                }
            }).show(e.target);
            
        });
    };

    function _bindEvents($scope) {
        onDragItem2Group($scope);
        onDeleteItem($scope);
        onUpdateItem($scope);
        onClickSettingsOfItem($scope);
        onRemoveUrlFromRole($scope);
    };

    return {
        init: function() {
            var $scope = $('.mod-permission-manage .sub-mod-role');
            debugger
            _bindEvents($scope);
        }
    };
});