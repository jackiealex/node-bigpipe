define(function() {
    var updateItemTmpl = ['<form action="/category/updateimg" method="post">', '<div class="basic-info" style="overflow: auto;">', '   <h4>如需修改图片请添加!</h4>', '   <div class="ui form"> <input type="hidden" name="id" value="<%= id %>" />', '       <div class="field">', '           <div class="ui-input-image-preview">', '               <img src="/static/img/icons/image-uploader.png" alt="默认图片">', '               <input type="file" name="imageFile" title="选择文件" accept="image/*" >', '           </div>', '       </div>', '   </div>', '</div>', '<link rel="stylesheet" href="/static/css/page/common/input-image-preview.css">', '<div class="two fields" style="display:inline-flex;width: 300px;">', '   <div class="ui icon input field" style="width: 45%;margin-right: 4%;">', '      <input type="text" name="name" placeholder="名称" value="<%= name %>">', '        <i class="home  icon"></i>', '  </div>', '   <div class="ui icon input field" style="width: 45%;">', '       <input type="text" name="pid" placeholder="父级" value="<%= pid %>" >', '       <i class="male up  icon"></i>', '   </div>', '</div>', '<div class="row description" style="margin-top:10px;">', '   <div class="ui form" style="width: 280px;">', '       <div class="field ui icon input">', '           <textarea name="content" placeholder="描述一下"><%= content %></textarea>', '       </div>', '   </div>', '</div>', '</form>'].join('');

    function onDeleteItem($scope) {
        $scope.on('click', '.options .delete', function(e) {
            var $item = $(this).parents('.category-list-item');
            var id = $item.data('id');
            var d = dialog({
                title: '您即将删除该兴趣分类',
                content: "确定删除?",
                okValue: '确定',
                cancelValue: '取消',
                ok: function() {
                    utils.api('/_bridge/admin/interestcate/delete', {
                        method: 'post',
                        data: {
                            id: id
                        }
                    }).done(function(rs, succ) {
                        if (rs['node_code'] == 20000) {
                            utils.bubble('删除成功');
                            _SmartPipe_.reload();
                        }
                    });
                },
                cancel: function() {
                    return true;
                }
            });
            d.showModal();
        });
    };

    function onEditItem($scope) {
        $scope.on('click', '.options .edit', function(e) {
            var $item = $(this).parents('.category-list-item');
            var id = $item.data('id');
            var d = dialog({
                title: '修改分类信息',
                content: '数据加载中......',
                okValue: '提交',
                cancelValue: '取消',
                onshow: function() {
                    var _this = this;
                    utils.api('/_bridge/admin/interestcate/info', {
                        data: {
                            id: id
                        }
                    }).done(function(rs) {
                        if (rs['node_code'] == 20000) {
                            var data = rs['data']['resp']['data'];
                            data['content'] = data['intro'];
                            _this.content(_.template(updateItemTmpl, data));
                        }
                    });
                },
                ok: function() {
                    var id = $(this.node).find('input[name=id]').val();
                    var file = $(this.node).find('input[name=imageFile]').val();
                    var name = $(this.node).find('input[name=name]').val();
                    var content = $(this.node).find('textarea[name=content]').val();
                    var pid = $(this.node).find('input[name=pid]').val() || 0;
                    var createdtime = $(this.node).find('input[name=createdtime]').val();
                    var hot = $(this.node).find('input[name=hot]').val();
                    var usable = $(this.node).find('.disable-status .positive').data('id');
                    content = $.trim(content);
                    name = $.trim(name);
                    if (!name) {
                        utils.bubble('名称不能为空');
                        return false;
                    }
                    if (!content) {
                        utils.bubble('描述不能为空');
                        return false;
                    }
                    if (!file) {
                        utils.api('/_bridge/admin/interestcate/update', {
                            method: 'post',
                            data: {
                                id: id,
                                name: name,
                                intro: content,
                                pid: pid
                            }
                        }).done(function(rs, succ) {
                            if (rs['node_code'] == 20000) {
                                utils.bubble('修改成功');
                                _SmartPipe_.reload();
                            }
                        });
                    } else {
                        $(this.node).find('form').ajaxSubmit({
                            beforeSubmit: function() {
                                loading = utils.loading();
                                return true;
                            },
                            success: function(rs, succ) {
                                var imageUrl = rs['data']['resp']['images'][0]['url'];
                                utils.api('/_bridge/admin/interestcate/update', {
                                    method: 'post',
                                    data: {
                                        id: id,
                                        surfaceImg: imageUrl,
                                        name: name,
                                        intro: content,
                                        pid: pid
                                    }
                                }).done(function(rs, succ) {
                                    if (rs['node_code'] == 20000) {
                                        utils.bubble('修改成功');
                                        loading.remove();
                                        _SmartPipe_.reload();
                                    }
                                });
                            }
                        });
                    }
                    d.close();
                    return true;
                },
                cancel: function() {
                    return true;
                }
            });
            d.showModal();
        });
    };

    function onSearchInput($scope) {
        $scope.on('keyup', '.input input', function(e) {
            var name = $(this).val();
            var type = $(this).parent().data('type');
            var $trigger = $(this).next();
            var url = "/interestlabel/search?type=" + type + "&name=" + name;
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

    function onOpenWindow($scope) {
        $scope.on('click', '.list-header .img-category-relation', function(e) {
            return utils.openWindow({
                url: '/category/rel'
            });
        });
    };

    function _BindEvents($scope) {
        onOpenWindow($scope)
        onEditItem($scope);
        onDeleteItem($scope);
        onSearchInput($scope);
        onSearchClick($scope);
    };
    return {
        init: function(el) {
            var $scope = $('.mod-interestlabel-list');
            _BindEvents($scope);
        }
    }
});