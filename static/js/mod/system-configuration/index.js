define(function() {
	function onUpdateItem ($scope) {
 
		$scope.on('click', '.config-mod', function  (e) {
			var name = $(this).parent().parent().find('td[data-name]').data('name');
			var value = $(this).parent().parent().find('td[data-value]').data('value');
			var description = $(this).parent().parent().find('td[data-description]').data('description');
			var formTmpl = [
				'<div class="ui warning form segment">',
				'	<div class="ui warning message">',
				'		<div class="header">确定要修改，慎重！</div>',
				'	</div>',
				'    <div class="field">',
				'        <label>名字</label>',
				'        <input disabled="disabled" type="text" name="name" placeholder="name" value="'+ name +'">',
				'    </div>',
				'    <div class="field">',
				'        <label>值</label>',
				'        <input type="text" name="value" placeholder="value" value="' + value + '">',
				'    </div>',
				'	<div class="field">',
				'		<label>描述</label>',
				'		<textarea name="description" placeholder="description">' + description + '</textarea>',
				'	</div>',
				'</div>',
			].join('');
			var d = dialog({
				title: '修改配置项',
				content: formTmpl,
				width: 600,
				okValue: '修改',
				cancelValue: '取消',
				cancel: function() {
					return true;
				},
				ok: function() {

					var v = $(this.node).find('input[name=value]').val();
					var n = $(this.node).find('input[name=name]').val();
					var d = $(this.node).find('textarea[name=description]').text();
					utils.api('/_bridge/public/config', {
						method: 'post',
						data: {
							value: v,
							name: n,
							description: d
						}
					}).done(function(rs, succ) {
						if (rs['node_code'] != 20000) {
							return utils.bubble(rs['data']['msg']);
						}
						utils.bubble('修改成功');
						setTimeout(_SmartPipe_.reload(), 5000);
					});
					return true 
				}
			});
			d.showModal();
		})
	}

	function onPublish ($scope) {
		$scope.on('click', '.btn-add-item', function  (e) {
			var formTmpl = [
				'<form class="ui form">',
				'    <div class="field">',

				'        <label>名字（只能是字母和下划线［a-z］+ _ + .）</label>',
				'        <input type="text" name="name" placeholder="name">',
				'    </div>',
				'    <div class="field">',
				'        <label>值</label>',
				'        <input type="text" name="value" placeholder="value">',
				'    </div>',
				'    <div class="field">',
				'        <label>描述</label>',
				'        <textarea name="description" placeholder="description"></textarea>',
				'    </div>',
				'</form>',
			].join('');

			var d = dialog({
				title: '添加配置项',
				content: formTmpl,
				width: 400,
				okValue: '添加',
				cancelValue: '取消',
				cancel: function() {
					return true;
				},
				ok: function() {

					var name = $(this.node).find('form input[name=name]').val();
					var value = $(this.node).find('form input[name=value]').val();
					var description = $(this.node).find('form textarea[name=description]').text();
					if(!name || !value) {
						utils.bubble('请输入完整信息');
						return false;
					}


					utils.api('/_bridge/public/config', {
						method: 'post',
						data: {
							value: value,

							name: name,
							description: description
						}
					}).done(function(rs, succ) {
						if (rs['node_code'] != 20000) {
							return utils.bubble(rs['data']['msg']);
						}
						utils.bubble('添加成功');
						setTimeout(_SmartPipe_.reload(), 5000);
					});
					return true 
				}
			});
			d.showModal();
		})

	}

	function onDelete($scope) {
		$scope.on('click', '.config-del', function  (e) {
			var name = $(this).parent().parent().find('td[data-name]').data('name');
			var d = dialog({
				title: '删除配置项',
				content: '确定要删除？慎重！',
				okValue: '确定',
				cancelValue: '取消',
				cancel: function() {
					return true;
				},
				ok: function() {
					utils.api('/_bridge/public/config?name=' + name, {
						method: 'delete',
					}).done(function(rs, succ) {
						if (rs['node_code'] != 20000) {
							return utils.bubble(rs['data']['msg']);
						}
						utils.bubble('删除成功');
						setTimeout(_SmartPipe_.reload(), 5000);
					});
					return true 
				}
			});
			d.showModal();
		});
	}
	 
	function _bindEvents($scope) {
		onUpdateItem($scope)
		onPublish($scope)
		onDelete($scope)
	};

	return {
		init: function() {
			var $scope = $('.mod-system-config');
			_bindEvents($scope);
		}
	};
});