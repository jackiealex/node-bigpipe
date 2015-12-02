define([], function(Draggabilly, Suggestion, LabelHistory) {

	function initDatePicker($scope) {
		var $start = $scope.find('.dnu-start');
		var $end = $scope.find('.dnu-end');
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

	};

	function CommonUploader($scope, options) {
		this.options = $.extend({
			picker: null,
			containerSelector: '.file-box',
			mimeType: 'image',
			success: function() {}
		}, options);

		this.$container = $(this.options.picker).parents(this.options.containerSelector);

		var _this = this;
		var uploader = WebUploader.create({
			// swf文件路径
			auto: true,
			swf: '/static/webuploader/Uploader.swf',
			// 文件接收服务端。
			server: '/upload/media',
			pick: this.options['picker'],
			dnd: '.files',
			fileVal: 'file',
			chunked: true,
			formData: {
				__no_retain__: 'ok',
				bucketType: {image: 1, audio:2, other: 3}[this.options['mimeType']] || 3
			},
			fileSingleSizeLimit: 10 * 1000 * 1000,
			duplicate: false,
			thumb: {
				width: 400,
				height: 400,
				crop: true
			},
			compress: {
				width: 2400,
				height: 2400,
				crop: false,
				preserveHeaders: true,
				noCompressIfLarger: true
			},
			accept: this.getMIME(this.options['mimeType'])
		});

		uploader.on('filesQueued', function(files) {
			_.each(files, function(file, index) {
				var type = _this.getMIMEType(file);
				if (type != 'image') {
					return;
				}
				uploader.makeThumb(file, function(error, dataURL) {
					if (error) {
						return utils.bubble('错误');
					} else {
						$(_this.options['picker']).parents(_this.options.containerSelector).find('.preview-container').html($('<img />').attr('src', dataURL));
					}
				});
			});
		});

		uploader.on('uploadSuccess', function(file, rs) {
			var $progress  = $(_this.options.picker)
				.parents(_this.options.containerSelector)
				.find('.progress-stick')
				.width('100%')
			if (rs['node_code'] !== 20000) {
				return $(_this.options.picker)
					.parents(_this.options.containerSelector).addClass('warn')
			}
			setTimeout(function() {
				utils.bubble('上传成功！');
				$progress.hide();
			}, 400);
			_this.options.success.call(_this, rs, file);
		});

		uploader.on('uploadProgress', function(file, per) {
			$(_this.options.picker)
				.parents(_this.options.containerSelector)
				.find('.progress-stick').show()
				.width(per * 62 + '%')
		});

		uploader.on('error', function(type) {
			var limit = this.getFiles().length;
			switch (type) {
				case 'Q_TYPE_DENIED':
					alert('资源类型错误！');
					break;
				case 'Q_EXCEED_NUM_LIMIT':
					utils.bubble('分批文件限制为' + limit + '个！（可再次追加）');
					break;
				case 'Q_EXCEED_SIZE_LIMIT':
					alert('文件体积过大');
					break;
				case 'F_EXCEED_SIZE':
					alert('文件体积过大');
					break;
			}
		});
		uploader.on('uploadError', function(file, err) {
			utils.bubble('上传错误！');
		});
	};
	$.extend(CommonUploader.prototype, {
		init: function() {

		},
		getMIMEType: function(file) {
			var type = file['type'].split('/')[0].toLowerCase();
			return type
		},
		getMIME: function(type) {
			type || (type = 'image');
			var map = {
				image: {
					title: 'Images',
					mimeTypes: 'image/jpg,image/jpeg,image/png'
				},
				audio: {
					title: 'Audio',
					extensions: 'mp3,aac',
					mimeTypes: 'audio/mp3,audio/aac'
				},
				text: {
					title: 'Text',
					// extensions: 'lrc,krc,txt,js',
					mimeTypes: '*/*'
				}
			}
			return map[type];
		}
	});

	function onPublish($scope) {
		$scope.on('click', '.btn-submit', function(e) {
			var $loading = null;

			$scope.find('form').ajaxSubmit({
				beforeSubmit: function() {

					//提交验证
					var link = $scope.find("input[name=link]").val();
					var imageUrl = $scope.find("input[name=imageUrl]").val();
					var startDate = $scope.find("input[name=startDate]").val();
					var endDate = $scope.find("input[name=endDate]").val();
					var type = $scope.find("select[name=type]").val();
					var linkType = $scope.find("select[name=linkType]").val();
					if(link == ""){
						utils.bubble("请填写链接地址");
						return false;
					}
					if(startDate == ""){
						utils.bubble("请选择开始日期");
						return false;
					}
					if(endDate == ""){
						utils.bubble("请选择结束日期");
						return false;
					}
					if(linkType == 0){
						utils.bubble("请选择链接类型");
						return false;
					}
					if(type == 0){
						utils.bubble("请选择banner方式");
						return false;
					}
					if(imageUrl == ""){
						utils.bubble("请上传banner图片");
						return false;
					}
					$loading = utils.loading();
					return true;
				},
				uploadProgress: function() {},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						utils.bubble(rs['msg'])
					} else {
						utils.bubble('添加banner成功');
						_SmartPipe_.reload();
					}
					$loading.remove()
				},
				fail: function(err, res) {
					utils.bubble('上传失败了');
				}
			});
		});
	};
	function test($scope){}

	function _bindEvents($scope) {
		initDatePicker($scope);
		onPublish($scope);
		test($scope)
	}

	return {
		init: function(e) {
			var $scope = $('.mod-poster-publish');
			_bindEvents($scope);
			// 图片文件
			setTimeout(function(e) {
				new CommonUploader($scope, {
					picker: $scope.find('.file-box').eq(0).find('.file-picker')[0],
					mimeType: 'image',
					success: function  (rs, file) {
						var data = rs['data']['resp'];
						this.$container.find('input[type=hidden].file-hidden').val(data['key'])
					}
				});
			} ,1000);
		}
	}
})
