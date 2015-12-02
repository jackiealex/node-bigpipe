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
					else {
						utils.bubble(rs['msg']);
						$loading.remove();
					}
				},
				error: function() {}
			});
		});
	};

    function _bindEvents($scope) {
        onPublish($scope);
    };

    return {
        init: function() {
            var $scope = $('.mod-brushperson-publish');
            _bindEvents($scope);
        }
    };
});