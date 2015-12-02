define(['mod/permission/fn-role-drop-handler'], function(onRoleDroppedhandler) {
    var tmplRole = [
        '<div>',
        '    <div class="ui fluid icon input">',
        '        <input type="text" autofocus name="name" placeholder="角色名">',
        '        <i class="home icon"></i>',
        '    </div> <br />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="content" placeholder="描述">',
        '        <i class="text file icon"></i>',
        '    </div>',
        '</div>'
    ].join('');

    var tmplUrl = [
        '<div>',
        '    <div class="ui fluid icon input">',
        '        <input  autofocus type="text" name="name" placeholder="角色名">',
        '        <i class="home icon"></i>',
        '    </div> <br />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="content" placeholder="描述">',
        '        <i class="text file icon"></i>',
        '    </div>',
        '</div>'
    ].join('');

    var tmplUrl = [
        '<div>',
        '    <div class="ui fluid icon input">',
        '        <input autofocus type="text" name="name" placeholder="权限名">',
        '        <i class="home icon"></i>',
        '    </div> <br />',
        '    <div class="ui fluid icon input">',
        '        <input type="text" name="content" placeholder="描述">',
        '        <i class="text file icon"></i>',
        '    </div>',
        '</div>'
    ].join('');

    var tmplUrlForm = [
        '<form action="/_bridge/admin/permission/url/add" method="post" required="required">',
        '    <div class="row form ui" >  ',
        '        <div class="field">',
        '            <div class="ui icon input">',
        '                <input autofocus type="text" required="required" placeholder="路径，如/admin/self/update" name="path">',
        '                <i class="road icon"></i>',
        '            </div>',
        '        </div>',
        '        <div class="field">',
        '            <div class="ui right icon input">',
        '                <input type="text"  required="required" placeholder="权限类型标示：label、atlas..." name="permissionContent">',
        '                <i class="magnet icon"></i>',
        '            </div>',
        '        </div>',
        '        <div class="field">',
        '            <div class="ui right icon input">',
        '                <input type="number" min="0"  required="required" max="1" placeholder="匹配模式 0-全匹配，1-正则匹配" name="level">',
        '                <i class="lightning icon"></i>',
        '            </div>',
        '        </div>',
        '        <div class="field">',
        '            <textarea name="content" placeholder="描述一下本url是干什么的？"></textarea>',
        '        </div>',
        '    </div>',
        '</form>'
    ].join('');

    var tmplRoleItem = [
        '<div class="item role">',
        '   <h2> 角色名：<span><%=name%></span>',
        '       <div class="small red icon ui buttons menu">',
        '           <div class="ui button update" title="编辑"><i class="edit icon"></i></div>',
        '           <div class="ui button delete" title="删除"><i class="minus  icon"></i></div>',
        '       </div>',
        '       <p><%= content %></p> ',
        '   </h2>',
        '    <ul data-id="<%= id %>">',
        '        <li class="empty item">拖拽权限到这里！ </li>',
        '    </ul>',
        '</div>'
    ].join('');

    function onAddRole($scope) {
        $scope.on('click', '.btn-add', function(e) {
            dialog({
                title: '添加角色',
                okValue: '提交',
                cancelValue: '取消',
                width: '500px',
                content: tmplRole,
                quickClose: true,
                ok: function() {
                    var name = $(this.node).find('input[name=name]').val();
                    var description = $(this.node).find('input[name=content]').val();

                    name = $.trim(name)
                    description = $.trim(description)

                    if (!name) {
                        utils.bubble('请输入角色名')
                        return false;
                    }

                    if (!description) {
                        utils.bubble('请输入描述')
                        return false;
                    }

                    utils.api('/_bridge/role', {
                        method: 'post',
                        data: {
                            name: name,
                            description: description
                        }
                    }).done(function(rs, succ) {
                        if(rs['node_code'] == 20000) {
                            
                            _SmartPipe_.reload();
                            utils.bubble('添加成功')
                        }
                    });
                },
                cancel: function() {
                    return true;
                }
            }).showModal(e.target);
        });
    }

    function onMakeRoleEditable($scope) {
        $scope.on('click', '.btn-editable', function(e) {
            var $roles = $scope.find('.item.role');
            if ($roles.hasClass('editable')) {
                $roles.removeClass('editable')
            } else {
                $roles.addClass('editable')
            }
        });
    };

    function onMakeUrlEditable($scope) {
        $scope.on('click', '.btn-url-editable', function(e) {
            if ($scope.find('.sub-mod-url .item.url .menu').length != 0) {
                return $scope.find('.sub-mod-url .item.url .menu').remove()
            }

            var tmpl = [
                '<div class="menu">',
                '<div class="small red icon ui buttons menu">',
                '   <div class="ui button update" title="编辑"><i class="edit icon"></i></div>',
                '   <div class="ui button delete" title="删除"><i class="minus  icon"></i></div>',
                '</div>',
                '</div>'
            ].join('');

            var $menu = $(tmpl);

            $scope.find('.sub-mod-url .item.url').append($menu);

            $scope.find('.sub-mod-url .item.url .menu').addClass('animated bounceInUp');

        });
    };

    function onUrlAddForm($scope) {
        $scope.on('click', '.btn-url-addition', function(e) {
            dialog({
                title: '新增权限',
                content: tmplUrlForm,
               
                ok: function() {
                    var $form = $(this.node).find('form');
                    if(!$form[0].checkValidity()) {
                        utils.bubble('请检查表单信息');
                        return  false;
                    }
                    var path = $form.find('input[name=path]').val();
                    path = ('/' + path).replace(/^\/+/g,'/');
                    $(this.node).find('form').ajaxSubmit({
                        data: {
                            url: path
                        },
                        success: function(rs) {
                            if (rs['node_code'] != 20000) {
                                return utils.bubble('新增权限失败');
                            }
                            utils.bubble('恭喜，新增权限成功!');
                            window._SmartPipe_.reload();
                        },
                        error: function() {

                        }
                    });
                },
                cancel: function() {
                    return true;
                },
                okValue: '提交',
                cancelValue: '取消',
            }).width(500).showModal();
        });
    };

    function _bindEvents($scope) {

        globFnWatchResize(function(size) {
            $scope.find('.container').height(size.h - 110);
        });

        onAddRole($scope);

        onMakeRoleEditable($scope);
        onMakeUrlEditable($scope);
        onUrlAddForm($scope);
    };

    return {
        init: function() {
            debugger
            var $scope = $('.mod-permission-manage');
            _bindEvents($scope);
        }
    };
});