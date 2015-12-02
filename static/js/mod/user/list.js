define(['mod/user/search'], function(View) {
	 
	return {
		init: function(e) {
			var $scope = $('.mod-user-list');
			new View({
				el: $scope
			})
		}
	}
});