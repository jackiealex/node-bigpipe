define(['mod/common/widget/waterflow'], function (WaterFlowLayout) {
	var fnCancelTimerItem = function(id, e) {
		e.stopPropagation();
		e.preventDefault();

		utils.api('/_bridge/admin/atlas/timer/cancel', {
		    method: 'post',
		    data: {
				id: id
			}
		}).done(function(rs, succ) {
		    if(rs['node_code'] == 20000) {
				utils.bubble("定时取消");
				$(e.target).parents('.item').remove();
				_SmartPipe_.reload();
			}
		});
	};

	var fnCancelTopItem = function(id, e) {
		e.stopPropagation();
		e.preventDefault();

		utils.api('/_bridge/admin/atlas/timer/cancel', {
		    method: 'post',
		    data: {
				id: id
			}
		}).done(function(rs, succ) {
			if(rs['node_code'] == 20000) {
				utils.bubble("图集已经删除");
				$(e.target).parents('.item').remove();
				_SmartPipe_.reload();
			}
		});

	};

	var fnDeleteItem = function(id, e) {
		e.stopPropagation();
		e.preventDefault();

		utils.api('/_bridge/admin/atlas/delete', {
		    method: 'post',
		    data: {
				id: id
			}
		}).done(function(rs, succ) {
			if(rs['node_code'] == 20000) {
				utils.bubble("图集已经删除");
				$(e.target).parents('.item').remove();
				_SmartPipe_.reload();
			}
		});
	};

	var fnCancelPopoutItem = function(id, e) {
		e.stopPropagation();
		e.preventDefault();

		utils.api('/_bridge/admin/atlas/top/cancel', {
		    method: 'post',
		    data: {
				id: id,
				atlasId: id
			}
		}).done(function(rs, succ) {
			if(rs['node_code'] == 20000) {
				utils.bubble("图集已经删除");
				$(e.target).parents('.item').remove();
				_SmartPipe_.reload();
			}
		});
	};
	
	function onOpenWindow($scope) {
	    $scope.on('click', '.pic', function(e) {
	    	var $item = $(this).parents('.item');
	    	var id = $item.data('id');
	    	utils.openWindow({
	            url: '/atlas/' + id + '/detail?'
	        });
	    });
	};
	function _bindEvents($scope) {
		onOpenWindow($scope);
		onDeleteAtlas($scope);
	};
	
	function onDeleteAtlas($scope) {
		$scope.on('click', '.delete', function(e) {
			var $item = $(this).parents('.item');
			var that = this;
	    	var id = $item.data('id');
	    	var d = dialog({
	    	    title: '您即将删除该图集',
	    	    content: "确定删除?",
	    	    okValue: '确定',
	    	    cancelValue: '取消',
	    	    ok: function() {
	    	    	var type = $scope.data('type')
	    	        if(type == 'all' || type == 'mine') {
        				fnDeleteItem(id, e);
        			} else if (type=='timing') {
        				fnCancelTimerItem(id, e);
        			} else if (type == 'top') { 
        				fnCancelPopoutItem(id, e);
        			}
	    	    },
	    	    cancel: function() {
	    	        return true;
	    	    }
	    	});
	    	d.showModal();
		});
	};
	

	return {
		init: function() {
			var $scope = $('.mod-atlas-list');
			var type = $scope.data('type');
			var url = '/_bridge/admin/atlas/list/all';
			var queryObject = utils.queryString(location.search);
			switch(type) {
				case 'all':
					url = '/_bridge/admin/atlas/list/all';
					break;
				case 'mine':
					url = '/_bridge/admin/atlas/list'
					break;
				case 'top':
					url = '/_bridge/admin/atlas/top/list'
					break;
				case 'timing':
					url = '/_bridge/admin/atlas/timer/all';
					break;
			};
			new WaterFlowLayout({
				el: $scope.find('.box-wrapper')[0],
				url: url,
				query: {
					page: queryObject['page'] || 1,
					limit: 40
				},
				format: function(rs) {
					return rs.data['resp']['pager']['list'];
				}
			});
			_bindEvents($scope);
		}
	}
})