define(function() {

    function qualityCheck($scope) {
        $(".is-quality-change").change(function(e) {
            var tag = $(this).prop("checked");
            if (tag != false) {
                var status = 1;
            } else {
                var status = 0;
            }
            var id = $(this).attr("data");
            var url = '/_bridge/coupon/'+id+'/status';
            var opts = {
                method: 'post',
                data: {
					status: status
                }
            };
            $loading = utils.loading();
            utils.api(url, opts).done(function(rs, succ) {
                if (rs['node_code'] == 20000) {
                    utils.bubble('设置成功');
                }
                $loading.remove()
            });
        });
    }


    function _bindevents($scope) {
        qualityCheck($scope);
    };
    return {
        init: function(e) {
            var $scope = $('.mod-user-list');
            _bindevents($scope);
        }
    }
});
