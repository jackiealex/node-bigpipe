define(['libs/query-string'], function(QueryString) {

    function withdrawsDeal($scope) {
		$scope.on('click', '.list div[name=update_button]', function(e){
			var $item = $(this).parents('.item');
			var id = $item.data('id');

			$item.addClass('yellow');

			var d = dialog({
				title: '设为完成',
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">确定已为提现账户打款？</div>',
				ok: function() {
					$loading = utils.loading();
					utils.api('/_bridge/withdraws/'+id+'/status?status=3', {
						method: 'put'
					}).done(function(rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('设置成功！');
							_SmartPipe_.reload();
						}
						$loading.remove()
					});

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

        $scope.on('click', '.list i[name=status_operate]', function(e) {

			var $item = $(this).parents('.item');
			var id = $item.data('id');

			$item.addClass('yellow');

			var d = dialog({
				title: '处理提现申请' ,
				align: 'bottom left',
				width: 200,
				content: [
					'<div class="ui right labeled input fluid" >',
					'    <select class="ui dropdown" style="width: 200px">',
					'		<option value="">--请选择--</option>',
					'		<option value="1">同 意</option>',
					'		<option value="2">拒 绝</option>',
					'	</select>',
					'</div>'
				].join(''),
				ok: function() {
					var dealResult = $(this.node).find("select").val();
					if(!dealResult) {
						utils.bubble('请选择处理结果')
						return false
					}
					utils.api('/_bridge/withdraws/'+id+'/status?status=' + dealResult , {
						method: 'put'
					}).done(function(rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('处理成功！');
							_SmartPipe_.reload();
						}
					});
					return true;
				},
				cancel: function() {
					return true;
				},
				okValue: '提交',
				cancelValue: '取消'
			});
			d.showModal();
			$item.removeClass('yellow');
			return false;
        });
    };

    function _bindevents($scope) {
		withdrawsDeal($scope);
    };
    return {
        init: function(e) {
            var $scope = $('.mod-user-list');
            _bindevents($scope);
        }
    }
});
