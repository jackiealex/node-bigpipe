define(function() {

	var tmplUpdate = [
		'<form class="ui form" action="/_bridge/accompany" method="post">',
		'    <div class="three fields">',
		'        <div class="field">',
		'            <label for="">名称</label>        ',
		'            <input type="text" placeholder="名称" name="name" value="<%= name %>" />',
		'        </div>',
		'        <div class="field">',
		'            <label for="">艺术家</label>       ',
		'            <input type="text" placeholder="艺术家" name="artist" value="<%= artist %>" />',
		'        </div>',
		'        <div class="field">',
		'            <label for="">专辑</label>        ',
		'            <input type="text" placeholder="专辑" name="album" value="<%= album %>" />',
		'        </div>',
		'    </div>',
		'    <div class="three fields">',
		'        <div class="field">',
		'            <label for="">所属区域</label>      ',
		'            <select class="ui fluid dropdown" name="area" placeholder="所属区域" style="height: 32px">',
		'                <option value="1"  selected="selected">华语</option>',
		'                <option value="2">日韩</option>',
		'                <option value="3">欧美</option>',
		'                <option value="4">其他</option>',
		'                <option value="5">粤语</option>',
		'                <option value="6">闽南语</option>',
		'            </select>',
		'        </div>',
		'        <div class="field">',
		'            <label for="">曲风</label>        ',
		'            <select class="ui fluid dropdown" name="style" placeholder="曲风" style="height: 32px">',
		'                <option value="1" selected="selected">流行</option> ',
		'                <option value="2">民歌</option> ',
		'                <option value="3">摇滚</option> ',
		'                <option value="4">校园</option> ',
		'                <option value="5">励志</option> ',
		'                <option value="6">影视</option> ',
		'                <option value="7">军旅</option> ',
		'                <option value="8">网游</option> ',
		'                <option value="9">中国风</option> ',
		'                <option value="10">高音</option> ',
		'                <option value="11">伤感</option> ',
		'                <option value="12">对唱</option> ',
		'                <option value="13">电影等</option>',
		'            </select>',
		'        </div>',
		'        <div class="field">',
		'            <label for="">版权方</label>       ',
		'            <input type="text" placeholder="版权方" name="copyright" value="<%= copyright %>" />',
		'        </div>',
		'    </div>',
		'    <div class="four fields" style="display: none">',
		'        <div class="field">',
		'            <label for="">歌词类型</label>      ',
		'            <input type="text" placeholder="歌词类型" name="lyricType" value="<%= lyricType %>" />',
		'        </div>',
		'        <div class="field">',
		'            <label for="">文件大小</label>      ',
		'            <input type="number" placeholder="文件大小" name="audioSize" value="<%= audioSize %>" />',
		'        </div>',
		'        <div class="field">',
		'            <label for="">时长</label>        ',
		'            <input type="number" placeholder="时长" name="time" value="<%= time %>" />',
		'        </div>',
		'        <div class="field">',
		'            <label for="">排序</label>        ',
		'            <input type="number" placeholder="排序" name="order" value="<%= order %>" />',
		'        </div>',
		'    </div>',
		'            <input type="hidden" class="file-hidden" name="audioUrl"  value="<%= audioUrl %>" />',
		'            <input type="hidden" class="file-hidden" name="urlMp3"  value="<%= urlMp3 %>" />',
		'            <input type="hidden" class="file-hidden" name="shakelightUrl"  value="<%= shakelightUrl %>" />',
		'            <input type="hidden" class="file-hidden" name="shakelightMp3"  value="<%= shakelightMp3 %>" />',
		'            <input type="hidden" class="file-hidden" name="lyricUrl"  value="<%= lyricUrl %>" />',
		'            <input type="hidden" class="file-hidden" name="surfaceImage"  value="<%= surfaceImage %>" />',
		'</form>',
	].join('');

	function onDeleteItems($scope) {
		$scope.on('click', '.btn-remove', function(e) {
			if($(this).hasClass('disabled')) {
				return utils.bubble('请选择行');
			}

			var $items = $scope.find('.list .select input[type=checkbox]:checked');
			var defs = $items.map(function  (index, item) {
				return utils.api('/_bridge/accompany/' + item.value, {
					method: 'delete'
				});
			});
			var d = dialog({
				title: '删除歌曲' ,
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">你确认删除当前' + defs.length +'项歌曲</div>',
				ok: function() {
					$.when.apply(null, defs.toArray()).done(function() {
						for (var i = 0; i < arguments.length; i++) {
							var rs = arguments[i];
							var rsSucc = []
							var rsFail = []
							if (rs['node_code'] != 20000) {
								rsFail.push(rs)
							} else {
								rsSucc.push(rs)
							}

						};
						utils.bubble('成功删除'+ (rsFail.length==0 ?'所有选中项':(rsSucc.length + '项')));
						_SmartPipe_.reload();
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
	};

	function onOnlineOfflineItems($scope) {
		$scope.on('click', '.btn-o2o', function(e) {
			if($(this).hasClass('disabled')) {
				return utils.bubble('请选择行');
			}

			var $items = $scope.find('.list .select input[type=checkbox]:checked');
			var idArray = $items.map(function  (index, item) {
				return item.value;
			});

			var idArrayString = idArray.toArray().join(',');

			var status = $(this).hasClass('btn-online')? 1: 0;


			var statusText = $(this).hasClass('btn-online')? '上线': '下线';

			var d = dialog({
				title: '歌曲批量' + statusText,
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">你确认' +statusText+ '当前' + idArray.length +'项歌曲</div>',
				ok: function() {
					var $loading = utils.loading();

					utils.api('/_bridge/accompany/updatestatus/betch?status=' + status + '&ids=' + idArrayString, {
						method: 'put'
					}).done(function(rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('成功'+statusText);
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
	};


	function stopCheckBoxPropagation($scope) {
		$scope.on('click', '.list tr input[type=checkbox]', function  (e) {
			e.stopPropagation();
		})
	};

	function onUpdateItem($scope) {
		$scope.on('click', '.list tr td div[name=update_button]', function(e) {

			var id = $(this).data('id');
			window.location.href = "/music/modify?id="+id;
		});
	};

	function enableButton($scope) {
		$scope.on('click',  '.select input[type=checkbox]', function(e) {
			if(this.checked) {
				$(this).parents('.item').addClass('positive green');
			} else {
				$(this).parents('.item').removeClass('positive green');
			}
			if($scope.find('.select input[type=checkbox]:checked').length>0) {
				$scope.find('.btn-do .button').removeClass('disabled')
			} else {
				$scope.find('.btn-do .button').addClass('disabled')
			}
		});
	};

	function onReverseSelectPage($scope) {
		$scope.on('click', '.btn-reverse-select', function(e) {
			var $items = $scope.find('.list .select input[type=checkbox]').each(function (index, item) {
				item.checked = !item.checked;
			});
		});
	};

	function onSelectPage($scope) {
		$scope.on('click', '.btn-select-all', function(e) {
			var $items = $scope.find('.list .select input[type=checkbox]').each(function (index, item) {
				if(!item.checked) {
					item.checked = true;
				}
			});
		});
	};

	function search($scope) {

		$scope.on('click', '.input i', function(e) {

			var name = $(this).prev().val();
			if (!name) {
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
			_SmartPipe_.location('/music/list?type=0&key=' + name);
		});
		$scope.on('click', '.input .label', function(e) {
			_SmartPipe_.location('/admin/list');
		});
		$scope.on('keyup', '.input input', function(e) {
			if (e.keyCode == 13) {
				var name = $(this).val();
				if (!name) {
					e.stopPropagation();
					e.preventDefault();
					return false;
				}
				_SmartPipe_.location('/music/list?type=0&key=' + name);
			}
		});
	};

	function onSetHotItems($scope) {

		//取消热门
		$scope.on('click', '.btn-unhot', function(e) {
			var items = $scope.find('.list .select input[type=checkbox]:checked');
			if(items.length == 0) {
				return utils.bubble('请选择行');
			}
			var statusText = "确定所选歌曲取消热门?";

			var params = "";
			$.each(items, function(n, i){
				var id = $(this).val();
				var order = 10000;
				var item = id + "|" + order;
				if(n != 0){
					params += ",";
				}
				params += item;
			});

			var d = dialog({
				title: '歌曲批量更新',
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">' + statusText+ '</div>',
				ok: function() {
					$loading = utils.loading();
					utils.api('/_bridge/accompany/updateorder/betch?params=' + params, {
						method: 'put'
					}).done(function(rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('已设置成功,请稍候...');
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


		$scope.on('click', '.btn-hot', function(e) {
			var type = $(this).attr('data');
			var items = $scope.find('.list .select input[type=checkbox]:checked');
			if(items.length == 0) {
				return utils.bubble('请选择行');
			}
			if(type == 1){
				var statusText = "确定更新所选项排序?";
			}else{
				var statusText = "确定将所选项设为热门?";
			}

			var params = "";
			$.each(items, function(n, i){
				var id = $(this).val();
				var order = 1;
				if(type == 1){
					order = $(this).parent().parent().find("input[name=data_order]").val();
				}
				var item = id + "|" + order;
				if(n != 0){
					params += ",";
				}
				params += item;
			});

			var d = dialog({
				title: '歌曲批量更新',
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">' + statusText+ '</div>',
				ok: function() {
					$loading = utils.loading();
					utils.api('/_bridge/accompany/updateorder/betch?params=' + params, {
						method: 'put'
					}).done(function(rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('已设置成功,请稍候...');
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
	};





	function _bindEvents($scope) {
		onDeleteItems($scope);
		enableButton($scope);
		onUpdateItem($scope);
		onOnlineOfflineItems($scope);
		stopCheckBoxPropagation($scope);
		onReverseSelectPage($scope);
		onSelectPage($scope);
		onSetHotItems($scope);
		search($scope);
	}

	return {
		init: function() {
			var $scope = $('.mod-music-list');
			_bindEvents($scope)
		}
	}
});
