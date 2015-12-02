define(['base/md5'], function(md5) {

    var tmplEditBasics = [
        '<div class="ui warning form basics" style="width: 400px">',
        '    <div class="field">',
        '        <label>ID</label>',
        '        <input type="text" name="id" value="<%= id %>" readonly />',
        '    </div>',
        '    <div class="field">',
        '        <label>昵称</label>',
        '        <input type="text" name="nickname" value="<%= nickname %>" />',
        '    </div>',
        '    <div class="field">',
        '        <label>邮箱</label>',
        '        <input type="text" name="email" value="<%= email %>" />',
        '    </div>',
        '    <div class="field">',
        '        <label>备注</label>',
        '        <textarea name="content" style="height: 50px" ><%= content %></textarea>',
        '    </div>',
        '</div>',
    ].join('');

    var tmplEditPassword = [
        '<div class="ui warning form basics" style="width: 400px">',
        // '    <div class="field">',
        // '        <label>旧密码</label>',
        // '        <input type="text" name="nickname" value="" />',
        // '    </div>',
        '    <div class="field">',
        '        <label>新密码</label>',
        '        <input type="password" name="password" value="" />',
        '    </div>',
        '    <div class="field">',
        '        <label>确认新密码</label>',
        '        <input type="password" name="password" value="" />',
        '    </div>',
        '</div>',
    ].join('');

    function updateBasics($scope) {
        $scope.on('dblclick', '.item', function(e) {
            var $item = $(this);
            var id = $item.data('id');
            var username = $item.find('.username').text();
             
            var d = dialog({
                title: '修改的' + username + '信息',
                align: 'bottom left',
                content: '正在获取信息.......',
                ok: function() {
                    var $node = $(this.node);
                    var nickname = $node.find('input[name=nickname]').val();
                    var email = $node.find('input[name=email]').val();
                    var content = $node.find('textarea[name=content]').val();
                    nickname = $.trim(nickname);
                    email = $.trim(email);
                    content = $.trim(content);
                    if (!nickname) {
                        return utils.bubble('昵称不能为空！')
                    }
                    if (!email) {
                        return utils.bubble('邮箱不能为空！')
                    }
                  
                    utils.api('/_bridge/admin/' + id + '/update', {
                        method: 'post',
                        data: {
                            id: id,
                            nickname: nickname,
                            email: email,
                            content: content,
                        }
                    }).done(function(rs, succ) {
                        if (rs['node_code'] != 20000) {
                            return utils.bubble(rs['msg'] || rs['data']['msg']);
                        }
                        _SmartPipe_.reload()
                        utils.bubble('修改成功');
                    });
                    return true;
                },
                cancel: function() {
                    return true;
                },
                okValue: '提交',
                cancelValue: '取消'
            });
            d.showModal();
            utils.api('/_bridge/admin/' + id + '', {}).done(function(rs, succ) {
                var data = rs['data']['resp']['admin'];
                data = $.extend({
                    content: '',
                    email: ''
                }, data);

                d.content(utils.xTemplate(tmplEditBasics, data));
            });
        });
    }

    function listRolos($scope) {
        $scope.on('click', '.btn-preview-roles', function(e) {
            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var username = $item.find('.username').text();
            var nickname = $item.find('.nickname').text();
            var email = $item.find('.email').text();
            var d = dialog({
                title: username + '的角色',
                align: 'bottom left',
                content: '<div class="ui" style="width: 200px; height: 200px;"> <div class="ui active loader"> </div></div>',
                onshow: function(e) {
                    $(this.node).on('click', '.item .remove', function(e) {
                        var $this = $(this).parents('.item');
                        var roleId = $(this).data('id');
                        debugger
                        utils.api('/_bridge/admin/' + id + '/roles?roleId=' + roleId, {
                            method: 'delete',
                            data: {
                                roleId: roleId
                            }
                        }).done(function(rs, succ) {
                            if (rs['node_code'] != 20000) {
                                return utils.bubble(rs['data']['msg']);
                            }
                            utils.bubble('角色已移除');
                            if ($this.siblings().length == 0) {
                                d.content('<div style="width: 400px;padding: 100px;text-align: center;">没有分配角色</div>');
                                return;
                            }
                            $this.remove();
                        });
                    });
                }
            });
            d.showModal();
            utils.api('/admin/ones/role', {
                dataType: 'text',
                data: {
                    __pipe__: 1,
                    id: id
                }
            }).done(function(rs) {
                if ((typeof rs).toLowerCase() == 'string') {
                    d.content(rs);
                }
            });
        });
    }

    function allocRoles($scope) {
        $scope.on('click', '.btn-alloc-role', function() {
            var $rolePanel = $('#sideBar').find('.role-panel');
            var $this = $(this);
            if ($rolePanel.length == 1) {
                if ($rolePanel.is(':visible')) {
                    $rolePanel.remove()
                    $this.find('span').text('分配角色')
                } else {
                    $this.find('span').text('取消分配');
                }
                return;
            }
            if ($this.hasClass('loading-effect')) {
                return utils.bubble('等待')
            }
            $this.addClass('loading-effect');
            utils.api('/admin/alloc/role', {
                method: 'get',
                dataType: 'text',
                data: {
                    __pipe__: 1
                }
            }).done(function(rs, succ) {
                $this.find('span').text('取消分配');
                $('#sideBar').append(rs);
                $this.removeClass('loading-effect');
                $('#sideBar').find('.role-panel .role').draggable({});
            });
        });
        // body...
    }

    function search($scope) {
        $scope.on('click', '.input .search', function(e) {
            var name = $(this).prev().val();
            if (!name) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
            _SmartPipe_.location('/admin/list?key=' + name);
        });
        $scope.on('click', '.input .label', function(e) {
            _SmartPipe_.location('/admin/list');
        });
        $scope.on('keyup', '.input input', function(e) {
            if (e.keyCode == 13) {
                $(this).next().trigger('click');
            }
        });
    };

    function showRolesOnSidebar($scope) {
        $('#sideBar').on('click', '.close', function(e) {
            $('#sideBar').find('.role-panel').remove();
            $scope.find('.btn-alloc-role').find('span').text('分配角色');
        });
    };

    function updatePass($scope) {
        $scope.on('click', '.privacy', function(e) {
            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var username = $item.find('.username').text();
            var d = dialog({
                title: '修改' +username+ '的密码',
                align: 'bottom left',
                content: tmplEditPassword,
                ok: function() {
                    var password = $(this.node).find('input').eq(0).val();
                    var newPassword = $(this.node).find('input').eq(1).val();

                    password = $.trim(password);
                    newPassword = $.trim(newPassword);

                    if(password.length<6) {
                        return utils.bubble('长度不能少于6位！');
                    }
                    if (!password) {
                        utils.bubble('密码不能为空！');
                        return false;
                    }
                    if (newPassword != password) {
                        utils.bubble('密码不一致！');
                        return false;
                    }

                    utils.api('/_bridge/admin/'+id+'/password', {
                        method: 'post',
                        data: {
                            password: md5(password)
                        }
                    }).done(function(rs, succ) {
                        if (rs['node_code'] != 20000) {
                            return utils.bubble(rs['data']['msg']);
                        }
                        utils.bubble('密码已经修改');
                        _SmartPipe_.reload()
                    });
                     
                    return true;
                },
                okValue: '提交',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                }
            });
            d.showModal();
        });
    }

    function _bindEvents($scope) {
        search($scope)
        updateBasics($scope);
        updatePass($scope)
        listRolos($scope)
        allocRoles($scope)
        makeDropppable($scope);
    };

    function makeDropppable($scope) {
        $scope.find('tr').droppable({}).on(' dragenter  ', function() {
            $(this).addClass('target')
        }).on('dragleave', function() {
            $(this).removeClass('target')
        }).on('drop', function(e) {
            $(this).removeClass('target');
            var $transfer = $(e.currentTarget.lastChild);
            var id = $(this).data('id');
            var email = $(this).find('.email').text();
            var nickname = $(this).find('.nickname').text();
            var roleId = $transfer.data('id');
            $transfer.remove();
            var $this = $(this);
            $this.append($('<div class="ui "> <div class="ui active inline inverted dimmer"> <div class="ui text loader"></div> </div> <p></p> </div> '));

            utils.api('/_bridge/admin/' + id + '/roles', {
                method: 'post',
                data: {
                    roleId: roleId
                }
            }).done(function(rs, succ) {
                if (rs['node_code'] != 20000) {
                    return utils.bubble(rs['data']['msg']);
                }
                utils.bubble('分配成功！');
                $this.find('>.ui').remove()
                $('#sideBar').find('.role-panel .role').draggable({}).on('dragstart', function() {
                    $(this).addClass('dragging');
                }).on('dragend', function(e) {
                    $(this).removeClass('dragging');
                });
            });
            
        });
    };
    return {
        init: function() {
            var $scope = $('.mod-admin-list');
            _bindEvents($scope)
            showRolesOnSidebar($scope);
        }
    }
});