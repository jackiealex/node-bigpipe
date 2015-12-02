define(function() {

	function setOffline($scope) {

		$scope.on("click", ".list .item i[name=order_submit]", function(e){
			var $item = $(this).parents('.item');
			var order = $(this).parent().find('input[type=number]').val();
			var id = $item.data('id');
			utils.api('/_bridge/poster/' + id + '/order', {
				method: 'post',
				data: {
					order: order
				}
			}).done(function(rs) {
				if (rs['node_code'] == 20000) {
					utils.bubble('设置成功！');
					_SmartPipe_.reload();
					return true;
				}
			});
		});

		$scope.on("click", ".list .item div[name=offline_setting]", function (e) {
			var $item = $(this).parents('.item');
			var id = $item.data('id');
			var d = dialog({
				title: 'banner下线',
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">确定下线该banner？</div>',
				ok: function () {
					$loading = utils.loading();
					utils.api('/_bridge/poster/' + id, {
						method: 'delete'
					}).done(function (rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('下线成功！');
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
	}

	function _bindevents($scope) {
		setOffline($scope);
	};

	return {
		init: function(e) {
			var $scope = $('.mod-user-list');
			_bindevents($scope);
		}
	}
});
