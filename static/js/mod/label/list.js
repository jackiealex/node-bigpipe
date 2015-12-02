define(function() {

    var tmplEdit = [
        '<form action="/label/create" method="post" class="create-label">',
        '<div class="ui warning form  ">',
        '    <div class="row">',
        '        <div class="ui icon input">',
        '            <input type="text" name="name" placeholder="名称" value="<%= name %>">',
        '            <i class="home icon"></i>',
        '        </div>',
        '    </div>',
        '    <div class="row" style="margin-top: 16px">',
        '        <div class="field">',
        '            <textarea name="intro" placeholder="简介" cols="30" rows="10"><%= intro %></textarea>',
        '        </div>',
        '    </div>',
        '</div>',
        '</form>',
    ].join('');

    function onEditItem($scope) {
        $scope.on('click', '.item .btn-edit', function(e) {
            var id = $(this).data('id');
            var $item = $(this).parents('.item');
            var name = $item.find('h2 span').text();
            var intro = $item.find('.intro').text();
            var d = dialog({
                title: '修改标签',
                content:  _.template(tmplEdit, {
                    name: name,
                    intro: intro
                }),
                okValue: '提交',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                },
                ok: function() {
                    var $node = $(this.node);
                    var intro = $node.find('textarea[name=intro]').val();
                    var name = $node.find('input[name=name]').val();

                    if (!name) {
                        utils.bubble('名称不能为空');
                        return false;
                    }
                    if (!intro) {
                        utils.bubble('简介不能为空');
                        return false;
                    }

                    utils.api('/_bridge/label/'+id , {
                        method: 'post',
                        data: {
                            name: name,
                            intro: intro
                        }
                    }).done(function(rs, succ) {
                        if(rs['node_code'] == 20000) {
                            utils.bubble("已经更新");
                            _SmartPipe_.reload();
                        }
                    });
                }
            });
            d.showModal();
             
        });
    };

    function onDeleteLabel($scope) {
        $scope.on('click', '.item .btn-delete', function(e) {
            var id = $(this).data('id');
            var $item = $(this).parents('.item');
            var name = $item.find('h2 span').text();
            var d = dialog({
                title: '删除标签',
                content:  '<div style="text-align: center; font-size: 20px; bold; padding: 40px  80px">#' +name+ '</div>',
                okValue: '删除',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                },
                ok: function() {
                    utils.api('/_bridge/label/'+id , {
                        method: 'delete'
                    }).done(function(rs, succ) {
                        if(rs['node_code'] == 20000) {
                            utils.bubble("已经删除");
                            _SmartPipe_.reload();
                        }
                     });
                     return true;
                }
            });
            d.showModal();
            return false
        });
    };

    function onSearchInput($scope) {
        $scope.on('keyup', '.input input', function(e) {
            var name = $(this).val();
            var type = $(this).parent().data('type');
            var $trigger = $(this).next();
            var url = "/label/search?type="+type+"&name=" + name;
            $(this).next().data('url', url);
            if (e.keyCode == 13) {
                $trigger.trigger('click');
            }
        });
    };

    function onSearchClick($scope) {
        $scope.on('click', '.input i', function(e) {
            var name = $(this).prev().val();
            if (!name) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
        });
    };

    function _BindEvents($scope) {
        onEditItem($scope);
        onSearchInput($scope);
        onSearchClick($scope);
        onDeleteLabel($scope);
    }

    return {
        init: function(el) {
            var $scope = $('.mod-label-list');
            _BindEvents($scope);
        }
    }
})