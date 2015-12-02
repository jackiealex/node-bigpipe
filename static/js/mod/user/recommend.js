define(function() {
    function onDeleteItem($scope) {
        $scope.on('click','.img-wrap',function(e) {
            var $this = $(this);
            var id = $(this).parents('.item').data('id');
            dialog({
                title: '删除推荐',
                content: '是否将此用户删除默认推荐列表？',
                ok: function() { 
                    utils.api('/_bridge/admin/recommend/user/delete', {
                        method: 'post',
                        data: {
                            id: id
                        }
                    }).done(function(rs, succ) {
                        utils.bubble('删除成功！');
                        $this.parents('.item').addClass('animated bounceOutLeft')
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                        $(this).remove();
                        });
                    });
                    return true;
                },
                okValue: '确定',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                }
            }).show(e.target);
        });

    }

	function _BindEvents($scope) {
		onDeleteItem($scope);
	}

	return {
		init: function(e) {
			var $scope = $('.mod-user-list');
			_BindEvents($scope);
		}
	}
});