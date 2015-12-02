define(function() {
    var $loading = null;
	function onPublish ($scope) {
		$scope.on('click', '.btn-submit', function(e) {
			$scope.find('form').ajaxSubmit({
				data: {
					device: $scope.find(".butttons .buttton.positive").data('platform')
				},
				beforeSubmit: function() {
					$loading = utils.loading();
					return true;
				},
				success: function(rs, succ) {
					if (rs['node_code'] == 20000) {
						utils.bubble('添加成功');
						_SmartPipe_.reload()
						$loading.remove();
					}
				},
				error: function() {}
			});
		});
	};

	function onForceUpdate($scope) {
		$scope.on('click', '.btn-force-update', function(e) {
			$scope.find('form').ajaxSubmit({
				beforeSubmit: function() {
					$loading = utils.loading();
					return true;
				},
				success: function(rs, succ) {
					if (rs['node_code'] == 20000) {
						utils.bubble('跟新成功');
						_SmartPipe_.reload()
						$loading.remove();
					}
				},
				error: function() {}
			});
		});
	};

    function _bindEvents($scope) {
        onPublish($scope);
        onForceUpdate($scope);
    };

    return {
        init: function() {
            var $scope = $('.mod-version-publish');
            _bindEvents($scope);
        }
    };
});