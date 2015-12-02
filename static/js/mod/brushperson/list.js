define(function() {

	function initDatePicker($scope) {
        var $startDate = $scope.find('.dnu-start');
        var $endDate = $scope.find('.dnu-end');
        $startDate.datetimepicker({
            format: 'Y-m-d',
            lang: 'ch',
            maxDate: utils.dateFormat(new Date(), '/'),
            onShow: function(ct) {
                var endDate = $endDate.val();
                this.setOptions({
                    maxDate: endDate ? utils.dateFormat(endDate, '/') : false
                })
            },
            timepicker: false
        });
        $endDate.datetimepicker({
            format: 'Y-m-d',
            lang: 'ch',
            minDate: false,
            maxDate: utils.dateFormat(new Date(), '/'),
            onChangeDateTime: function() {},
            onShow: function(ct) {
                var minDate = false;
                var startDate = $startDate.val();
                this.setOptions({
                    minDate: startDate ? utils.dateFormat(startDate, '/') : false
                })
            },
            timepicker: false
        });
    };

    function onCleanDate($scope) {
        $scope.on('click', '.corner .remove', function(e) {
            $(this).parents('.input').find('input').val('');
        })
    };

    function onDeletePerson($scope) {
    	$scope.on('click', '.btn-brush-delete', function(e) {
    		$.ajax({
    			method: 'DELETE',
    			url: '/_bridge/brush/person?id=' + $(this).attr('data'),
				data: {
				},
				beforeSend: function() {
					$loading = utils.loading();
					return true;
				},
				success: function(rs, succ) {
					if (rs['node_code'] == 20000) {
						utils.bubble('删除成功');
						_SmartPipe_.reload()
						$loading.remove();
					}
				},
				error: function() {}
			});
    	})
    }

    function onDateIntervalChangeClick($scope) {
        var $startDate = $scope.find('.dnu-start');
        var $endDate = $scope.find('.dnu-end');
        $scope.on('click', '.btn-date-click', function(e) {
        	var from = Date.parse($startDate.val()),
                to = Date.parse($endDate.val());
            if (!from && !to) {
                return utils.bubble('请选择至少一个日期')
            } else {
            	_SmartPipe_.location('/brush/person/list?' + $.param({start: from, end: to}) )
            }
        })
    };

    function _bindEvents($scope) {
    	initDatePicker($scope);
    	onCleanDate($scope);
    	onDateIntervalChangeClick($scope);
    	onDeletePerson($scope);
    };

    return {
        init: function() {
            var $scope = $('.mod-brushperson-list');
            _bindEvents($scope);
        }
    };
});