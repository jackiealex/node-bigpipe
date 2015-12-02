define(function() {

	function onPublish($scope) {
		$scope.on('click', '.btn-submit', function(e) {
			var $loading = null;

			$scope.find('form').ajaxSubmit({
				beforeSubmit: function() {

					//提交验证
					var money = $scope.find("input[name=money]").val();
					var limit = $scope.find("input[name=limit]").val();
					var time = $scope.find("input[name=time]").val();
					var code = $scope.find("input[name=code]").val();
					var text = $scope.find("input[name=text]").val();
					var mode = $scope.find("select[name=mode]").val();
					if(money == ""){
						utils.bubble("请填写红包金额");
						return false;
					}
					if(limit == ""){
						utils.bubble("请填写红包限制金额");
						return false;
					}
					if(time == ""){
						utils.bubble("请填写红包时限");
						return false;
					}
					if(code == 0){
						utils.bubble("请填写红包代码，例如：register/birthday");
						return false;
					}
					if(text == 0){
						utils.bubble("请填写红包描述");
						return false;
					}
					if(mode == ""){
						utils.bubble("请选择发放类型");
						return false;
					}
					$loading = utils.loading();
					return true;
				},
				uploadProgress: function() {},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						utils.bubble(rs['msg'])
					} else {
						utils.bubble('红包配置成功');
					}
					$loading.remove()
				},
				fail: function(err, res) {
					utils.bubble('上传失败了');
				}
			});
		});
	};

	function _bindEvents($scope) {
		onPublish($scope);
	};
	return {
		init: function(e) {
			var $scope = $('.mod-poster-publish');
			_bindEvents($scope);
		}
	}
})
