define(function() {
    function DelItem($scope) {

		$scope.on("click", ".item .del", function (e) {
			var $item = $(this).parents('.item');
			var id = $item.data('id');
			var d = dialog({
				title: '删除题目',
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">确定删除该题目？</div>',
				ok: function () {
					$loading = utils.loading();
					utils.api('/_bridge/topic/' + id, {
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



    function _bindEvents($scope) {
        DelItem($scope);
    }


    return {
        init: function() {
            var $scope = $('.mod-notification-list');
            _bindEvents($scope);
        }
    }
});
