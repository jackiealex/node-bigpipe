define(['libs/query-string'], function(QueryString) {

    function setFeedbackDeal ($scope){

        $("input[type='checkbox']").change(function(e){
            var tag = $(this).prop("checked");
			var mark = "已设置处理";
            if (tag != false) {
                var status = 2;
            }else{
                var status = 1;
				mark = "已设置成未处理";
            }
            var id = $(this).attr("data");
            var url = '/_bridge/feedback/deal/'+id;
            var opts = {
                method: 'post',
                data: {
					status: status
                }
            };
            $loading = utils.loading();
            utils.api(url, opts).done(function(rs, succ) {
                if (rs['node_code'] == 20000) {
                    utils.bubble(mark);
                }
                $loading.remove()
            });
        });
    }

    function _bindevents($scope) {
		setFeedbackDeal($scope);
    };
    return {
        init: function(e) {
            var $scope = $('.mod-user-list');
            _bindevents($scope);
        }
    }
});
