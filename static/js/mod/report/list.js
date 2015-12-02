define(function() {
    function showDetail($scope) {
        $scope.on('click', 'table tr.row:not(.detail)', function(el) {
            var id = $(this).data('id');
            var accompanyID = $(this).data('accompanyid');
            var $oldDetails = $scope.find('tr.detail');
            var $loading = utils.loading();
            var _this = this;

            utils.api('/report/list/{id}/detail'.replace('{id}', id), {
                dataType: 'text',
                data: {
                    __pipe__: 1,
                }
            }).then(function(rs) {
                $loading.remove()

                $(rs).insertAfter(_this);
                $oldDetails.remove();
                $loading.remove()
            });
            $scope.on('click', '.detail .close', function(el) {
                $(this).hide();
                $(this).parents('tr').find('.box').animate({
                    height: 0
                }, 300, function(e) {
                    $(this).parents('tr').remove();
                })
            });
        });
    };

    function onHandleItem($scope) {
        $scope.on('click', '.btn-handle', function(e) {
            var $item = $(this).parents('.item');
            var that = this;
            var id = $item.data('id');
            var content = $item.find('.desc').text();
            var d = dialog({
                title: '处理举报',
                content: [
                    '<p style="padding-bottom: 16px; text-align: center">' +content+ '</p>',
                    '<h2 style="padding-bottom: 16px; text-align: center">同意：填写“同意”</h2>',
                    '<h2 style="padding-bottom: 16px; text-align: center">拒绝：填写“拒绝”</h2>',
                    '<div class="ui left icon input">',
                    '    <input type="text" />',
                    '    <i class="mail icon"></i>',
                    '</div>'
                ].join(''),
                okValue: '确定',
                cancelValue: '取消',
                ok: function() {
                    var str = $(this.node).find('input').val();
                    var status = 0;
                    str = $.trim(str);
                    if( str == '同意') {
                        status = 2;
                    } else if( str == '拒绝') {
                        status = 1;
                    } else {
                        utils.bubble('口令错误');
                        return false
                    }

                    utils.api('/_bridge/report/{id}/status'.replace('{id}', id), {
                        method: 'post',
                        data: {
                            status: status
                        }
                    }).done(function(rs) {
                        if (rs['node_code'] == 20000) {
                            utils.bubble('处理成功');
                            _SmartPipe_.reload();
                        }
                    });
                    return true
                },

                cancel: function() {
                    return true;
                }
            });
            d.showModal();
            e.stopPropagation();
            return false
        });
    };

    function search($scope) {

        $scope.on('change', '.header select', function(e) {
            var name = $(this).prev().find('input').val();
            _SmartPipe_.location('/report/list?key=' + name);
        });

        $scope.on('click', '.header .button', function(e) {
            var name = $(this).parents('.header').find('input').val();
            _SmartPipe_.location('/report/list?key=' + name);
        });

        $scope.on('click', '.input .remove', function(e) {
            _SmartPipe_.location('/report/list');
        });

        $scope.on('keyup', '.header .input input', function(e) {
            if (e.keyCode == 13) {
                $(this).parents('.header').find('.button').trigger('click');
            }
        });
    };

    function _bindevents($scope) {
        search($scope);
        showDetail($scope);
        onHandleItem($scope);
    };
    return {
        init: function(e) {
            var $scope = $('.mod-report-list');
            _bindevents($scope);
        }
    }
});