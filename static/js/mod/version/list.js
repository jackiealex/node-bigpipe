define(function() {
 

    function onDeleteItem($scope) {
        $scope.on('click', '.item .btn-delete', function(e) {
            var id = $(this).data('id');

            var $item = $(this).parents('.item');

            var channel = $item.find('.channel').text();
            var device = $item.find('.device').text();
            channel = $.trim(channel)
            device = $.trim(device);

            var text = $item.text();

            var isIOSUpate = $(this).hasClass('ios-update-item')

            var d = dialog({
                title: '删除' ,
                align: 'bottom left',
                width: 300,
                content: '<div style="text-align: center; font-size: 20px">你确认删除当前项 <p>{text}</p></div>'.replace('{text}', text) ,
                ok: function() {

                    if(!isIOSUpate) {
                        utils.api('/_bridge/client/check/version?channel={channel}&device={device}'.replace('{channel}', channel).replace('{device}', device) , {
                            method: 'delete',
                        }).done(function(rs, succ) {
                            if(rs['node_code'] == 20000) {
                                utils.bubble("已经删除");
                                _SmartPipe_.reload();
                            }
                        });
                    } else {
                        utils.api('/_bridge/ios/update/version', {
                            method: 'delete',
                        }).done(function(rs, succ) {
                            if(rs['node_code'] == 20000) {
                                utils.bubble("已经删除");
                                _SmartPipe_.reload();
                            }
                        });
                    }

                    
                    return true;
                },
                cancel: function() {
                    return true;
                },
                okValue: '提交',
                cancelValue: '取消'
            });
            d.showModal();
        });
    }

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

    function _BindEvents($scope) {
        onDeleteItem($scope);
    }

    return {
        init: function(el) {
            var $scope = $('.mod-version-list');
            _BindEvents($scope);
        }
    }
})