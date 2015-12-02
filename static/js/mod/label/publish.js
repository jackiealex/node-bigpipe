define(function() {
	function onSubmit($scope) {
		$scope.on('click', '.btn-submit', function(e) {
			var $loading = null;

			var $form = $scope.find('form.create-label');

			var $name = $scope.find('input[name=name]');
			var $intro = $scope.find('input[name=intro]');
			var $order = $scope.find('input[name=order]');

			var name = $.trim($name.val());
			var intro = $.trim($intro.val());
			var order = $.trim($order.val());

			function reset () {
				$loading.remove();
				$form.clearForm();
			}
			if(!name) {
				return utils.bubble('请输入名字！');
			}
			
			var url = '/_bridge/label';
			var opts = {
				method: 'post',
				data: {
					name: name,
					intro: intro,
					order: order
				}
			};
			$loading = utils.loading()
			utils.api(url, opts).done(function(rs, succ) {
				if (rs['node_code'] == 20000) {
					utils.bubble('添加成功');
					_SmartPipe_.reload()
				}
				$loading.remove()
			});
		});
	};
	function onClick($scope) {
		$scope.on('click', '.buttons>.location, .buttons>.feeling, .buttons>.character, .buttons>.activity',function(e) {
			$('.brand').hide();
		});
		$scope.on('click', '.buttons>.common', function() {
			$('.brand').addClass('animated lightSpeedIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend').show();
		});
	}

	function _bindEvents($scope) {
		onSubmit($scope);
		onClick($scope);
	};

	return {
		init: function() {
			var $scope = $('.mod-label-publish');
			_bindEvents($scope);
		}
	};
});