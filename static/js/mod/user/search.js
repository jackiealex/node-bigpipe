define(['libs/query-string'], function(QueryString) {
	var View = Backbone.View.extend({
		initialize: function(options) {
			this.initDatePicker()
			this.stopElePropagation()
			options = $.extend({
				defaultPathname: '/user/list?',
			}, options)
			this.options = options
		},
		events: {
			'click .header .menu .item': 'searchByFilter',
			'keyup .header .input input': 'searchByEnterKey',
			'click .header .button.search': 'search',
			'click .header .dropdown.button .remove, .field .remove': 'onRemoveCondition',
			'change .is-quality-change': 'qualityCheck',
			'change .is-enabled-user-change': 'isEnabledChange',
			'click .header .dropdown': 'onShowCondition',
			'click .list .item .btn-order': 'setUserOrder',
			'click .icon.remove': 'onRemoveKey',
			'click .list .item div[name=top_cancel]': 'cancelUserTop',
			"click .list .item i[name=top_setting]": 'setUserTopByTimer',
		},
		searchByFilter: function(e) {
			var $scope = this.$el;
			var locationQuery = QueryString.parse(location.search);
			var field = $(this).data('field');
			var value = $(this).data('value');
			var query = {};
			query[field] = value;
			query = $.extend(locationQuery, query);
			query['page'] = 1;


			_SmartPipe_.location(this.options['defaultPathname'] + $.param(query));
		},
		searchByEnterKey: function(e) {
			var $scope = this.$el;
			if (e.keyCode == 13) {
				$(e.currentTarget).parents('.header').find('.button.search').click()
			}
		},
		search: function(e) {
			var $scope = this.$el;
			var name = $(e.currentTarget).parents('.header').find('input').val();
			var createDate = $(e.currentTarget).parents('.header').find('.dnu-create').val();
			var locationQuery = QueryString.parse(location.search);
			delete locationQuery['nickname']
			if (name) {
				locationQuery['nickname'] = name
			}
			if (createDate) {
				locationQuery['createDate'] = createDate
			}
			locationQuery['page'] = 1
			_SmartPipe_.location(this.options['defaultPathname'] + $.param(locationQuery));
		},
		onRemoveCondition: function(e) {
			var $scope = this.$el;
			var query = QueryString.parse(location.search);
			delete query[$(e.currentTarget).parents('.field').data('field')];
			_SmartPipe_.location(this.options['defaultPathname'] + $.param(query));
			return false;
		},

		qualityCheck: function(e) {
			var $scope = this.$el;
			var tag = $(e.currentTarget).prop("checked");
			if (tag != false) {
				var isQuality = 1;
			} else {
				var isQuality = 0;
			}
			var id = $(e.currentTarget).attr("data");
			var url = '/_bridge/user/quality/set';
			var opts = {
				method: 'post',
				data: {
					ids: id,
					isQuality: isQuality
				}
			};
			$loading = utils.loading();
			utils.api(url, opts).done(function(rs, succ) {
				if (rs['node_code'] == 20000) {
					utils.bubble('设置成功');
				}
				$loading.remove()
			});
		},
		isEnabledChange: function(e) {
			var $scope = this.$el;
			var tag = $(e.currentTarget).prop("checked");
			var id = $(e.currentTarget).attr("data");
			var url = '/_bridge/disabled/user';
			if (tag) {
				var d = dialog({
					title: '禁用原因',
					content: ['<div class="ui left icon input">', '    <input type="text" placeholder="原因必填" />', '    <i class="mail icon"></i>', '</div>'].join(''),
					okValue: '确定',
					cancelValue: '取消',
					ok: function() {
						var reason = $(this.node).find('input').val();
						reason = $.trim(reason);
						if (reason == '') {
							utils.bubble('必须填写原因');
							return false;
						}
						utils.api(url, {
							method: 'post',
							data: {
								userId: id,
								reason: reason
							}
						}).done(function(rs) {
							if (rs['node_code'] == 20000) {
								utils.bubble('处理成功');
								_SmartPipe_.reload();
							}
						});
						return true
					},
					cancel: function() {
						return true;
					}
				});
				d.showModal();
				e.stopPropagation();
				return false
			} else {
				utils.api(url + "?id=" + id, {
					method: 'delete'
				}).done(function(rs) {
					if (rs['node_code'] == 20000) {
						utils.bubble('处理成功');
						_SmartPipe_.reload();
					}
				});
			}
			return false;
		},
		onShowCondition: function(e) {
			console.log('dropdown click')
			var $scope = this.$el;
			var $menu = $(e.currentTarget).find('.menu');
			if (!$menu.is(':visible')) {
				$menu.addClass('visible transition');
			} else {
				$menu.removeClass('visible transition');
			}
			return e.stopPropagation();
		},
		initDatePicker: function() {
			var $scope = this.$el;
			var $login = $scope.find('.dnu-create');
			$login.datetimepicker({
				format: 'Y-m-d',
				lang: 'ch',
				minDate: false,
				maxDate: utils.dateFormat(new Date(), '/'),
				onChangeDateTime: function() {},
				onShow: function(ct) {},
				timepicker: false
			});
		},
		/**
		 * 设定置顶
		 * @param $scope
		 * @private
		 */
		setUserTopByTimer: function(e) {
			var $scope = this.$el;
			var $item = $(e.currentTarget).parents('.item');
			var id = $item.data('id');
			$item.addClass('yellow');
			var d = dialog({
				title: '设定置顶',
				align: 'bottom left',
				width: 200,
				content: ['<div class="fields">', ' <div class=" field inline">', '     <div class="ui small icon input   corner labeled  ">', '            <input readonly="readonly" placeholder="开始日期" type="text" class="dnu-start" >', '           <i class="calendar icon"></i>', '           <div class="ui corner label" title="清除日期">', '              <i class="remove icon"></i>', '         </div>', '      </div>', '  </div>', '  <br />', '  <div class="field inline">', '      <div class="ui small icon input   corner labeled  ">', '            <input readonly="readonly" placeholder="结束日期" type="text" class="dnu-end" >', '         <i class="calendar icon"></i>', '           <div class="ui corner label" title="清除日期">', '              <i class="remove icon"></i>', '         </div>', '      </div>', '  </div>', '</div>'].join(''),
				onshow: function() {
					var $start = $(this.node).find('.dnu-start');
					var $end = $(this.node).find('.dnu-end');
					//加载日期控件
					$start.datetimepicker({
						format: 'Y-m-d H:i',
						lang: 'ch',
						maxDate: false,
						onShow: function(ct) {
							var endDate = $end.val();
							this.setOptions({
								maxDate: endDate ? utils.dateFormat(endDate, '/') : false
							})
						},
						timepicker: true
					});
					$end.datetimepicker({
						format: 'Y-m-d H:i',
						lang: 'ch',
						minDate: false,
						onChangeDateTime: function() {},
						onShow: function(ct) {
							var startDate = $start.val();
							this.setOptions({
								minDate: startDate ? utils.dateFormat(startDate, '/') : false
							})
						},
						timepicker: true
					});
				},
				ok: function() {
					var startTime = $(this.node).find('.dnu-start').val();
					var endTime = $(this.node).find('.dnu-end').val();
					if (startTime == null) {
						utils.bubble('请选择开始日期')
						return false
					}
					if (endTime == null) {
						utils.bubble('请选择结束日期')
						return false
					}
					utils.api('/_bridge/user/' + id + '/top', {
						method: 'post',
						data: {
							startTime: startTime,
							endTime: endTime
						}
					}).done(function(rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('设置成功！');
							return true;
						}
					});
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
		},
		setUserOrder: function(arguments) {
			var $scope = this.$el;
			$scope.on("click", ".list .item .btn-order", function(e) {
				var $loading = utils.loading();
				var $item = $(this).parents('.item');
				var order = $(this).parents('.input').find('input[type=number]').val();
				var id = $item.data('id');
				utils.api('/_bridge/user/top/' + id + '/order', {
					method: 'post',
					data: {
						order: order
					}
				}).done(function(rs) {
					if (rs['node_code'] == 20000) {
						utils.bubble('设置成功！');
						_SmartPipe_.reload();
						$loading.remove()
						return true;
					}
				});
			});
		},
		cancelUserTop: function(e) {
			var $scope = this.$el;
			var $item = $(e.currentTarget).parents('.item');
			var id = $item.data('id');
			var d = dialog({
				title: '取消置顶',
				align: 'bottom left',
				width: 300,
				content: '<div style="text-align: center; font-size: 20px">确定取消用户该段时间置顶？</div>',
				ok: function() {
					$loading = utils.loading();
					utils.api('/_bridge/user/top/' + id, {
						method: 'delete'
					}).done(function(rs) {
						if (rs['node_code'] == 20000) {
							utils.bubble('取消成功！');
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
		},
		stopElePropagation: function(e) {
			var $scope = this.$el;
			$('body').one('click', function(e) {
				console.log('body click')
				var $menu = $scope.find('.header .dropdown').find('.menu');
				if ($menu.is(':visible')) {
					$scope.find('.header .dropdown').find('.menu').removeClass('visible transition');
				}
			});
			$scope.one('click', '.header .dropdown .menu', function(e) {
				console.log('menu click')
				return false;
			});
		}
	});
	return View;
});
