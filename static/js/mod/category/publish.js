define(function() {
	function onSubmit($scope) {
		$scope.on('click', '.btn-submit', function(e) {
			var $loading = null;

			var $form = $scope.find('form.create-interestlabel');

			var $imgFile = $scope.find('input[type=file]');
			var $name = $scope.find('input[name=name]');
			var $fatherId = $scope.find('input[id]').val();
			var $content = $scope.find('textarea[name=content]');
			//var type = $scope.find('.resource-type .positive').data('id');

			var imgFile = $imgFile.val();
			var name = $.trim($name.val());
			var fatherId =$.trim($fatherId) || 0;
			var content = $.trim($content.val());
			 
			if(!$imgFile.val()) {
				return utils.bubble('请上传图片！');
			}
			if(!name) {
				return utils.bubble('请输入名称！');
			}

			$form.ajaxSubmit({
				data: {
					id: $scope.find('.selected').data('id') || 0
				},
				beforeSubmit: function() {
					$loading = utils.loading();
					return true;
				},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						utils.bubble(rs['data']['msg']);
						$loading.remove();
						return;
					}
					utils.bubble('上传成功');
					_SmartPipe_.reload();
					$loading.remove();
				},
				fail: function(err, res) {
					_SmartPipe_.reload();
					utils.bubble('未知错误');
					$loading.remove();
				}
			});
		});
	};
	 

    function onCategoryChange($scope) {
    	$scope.on('click', '.category-list li', function(e) {
    		if($(this).hasClass('selected')) {
    			return $(this).removeClass('selected')
    		}
    		$(this).addClass('selected').siblings().removeClass('selected');
    	});
    }

	function _bindEvents($scope) {
		onSubmit($scope);
		onCategoryChange($scope)
	};

	return {
		init: function() {
			var $scope = $('.mod-interestlabel-publish');
			_bindEvents($scope);
		}
	};
});