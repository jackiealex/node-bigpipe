define(['mod/common/widget/waterflow'], function(WaterFlowLayout) {
    var fnDeleteItem = function(id, e) {
        e.stopPropagation();
        e.preventDefault();
        utils.api('/_bridge/admin/atlas/delete', {
            method: 'post',
            data: {
                id: id
            }
        }).done(function(rs, succ) {
            if (rs['node_code'] == 20000) {
                utils.bubble("图集已经删除");
                $(e.target).parents('.item').remove();
                _SmartPipe_.reload();
            }
        });
    };
     
    function onOpenWindow($scope) {
        $scope.on('click', '.pic', function(e) {
            var $item = $(this).parents('.item');
            var id = $item.data('id');
            utils.openWindow({
                url: '/atlas/' + id + '/detail?__pipe__=1'
            });
        });
    };

    function _bindEvents($scope) {
        onOpenWindow($scope);
        onDeleteAtlas($scope);
    };

    function onDeleteAtlas($scope) {
        $scope.on('click', '.delete', function(e) {
            var $item = $(this).parents('.item');
            var that = this;
            var id = $item.data('id');
            var d = dialog({
                title: '您即将删除该图集',
                content: "确定删除?",
                okValue: '确定',
                cancelValue: '取消',
                ok: function() {
                    fnDeleteItem(id, e);
                },
                cancel: function() {
                    return true;
                }
            });
            d.showModal();
        });
    }
    return {
        init: function(e) {
            var $scope = $('.mod-user-atlas-list');
            var type = $scope.data('type');
            var url = '/_bridge/atlas/list/user';
            var queryObject = utils.queryString(location.search);
            
            _bindEvents($scope);
            new WaterFlowLayout({
                el: $scope.find('.box-wrapper')[0],
                url: url,
                query: {
                    page: queryObject['page'] || 1,
                    limit: 40,
                    userId: queryObject['uid']
                },
                itemFormat: function(item) {
                    return $.extend({}, item['atlas'], {
                        createBy: item['user']['id'],
                        nickname: item['user']['nickname'],
                        coverImage: item['coverKey'][0],
                        avator: item['user']['headUrl']
                    })
                },
                format: function(rs) {
                    return rs.data['resp']['items'];
                }
            });
        }
    }
});