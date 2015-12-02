define(['libs/query-string'], function(QueryString) {

    function publicationDeal($scope) {
		$scope.on('click', '.list i[name=status_operate]', function(e) {

			var $item = $(this).parents('.item');
			var id = $item.data('id');

			$item.addClass('yellow');

			var d = dialog({
				title: '处理发布内容状态' ,
				align: 'bottom left',
				width: 200,
				content: [
					'<div class="ui right labeled input fluid" >',
					'    <select class="ui dropdown" style="width: 200px">',
					'		<option value="0">屏 蔽</option>',
					'		<option value="1">正 常</option>',
					'		<option value="2">劣 质</option>',
					'	</select>',
					'</div>'
				].join(''),
				ok: function() {
					var dealResult = $(this.node).find("select").val();
					if(!dealResult) {
						utils.bubble('请选择处理结果')
						return false
					}
					utils.api('/_bridge/publication/'+id+'/status' , {
						method: 'post',
						data:{
							"status":dealResult
						}
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
		publicationDeal($scope);
    };
    return {
        init: function(e) {
            var $scope = $('.mod-user-list');
            _bindevents($scope);
        }
    }
});
