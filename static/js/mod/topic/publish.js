define(['base/draggabilly.pkgd', 'mod/common/widget/suggestion'],function(Draggabilly, Suggestion) {

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
				.width('100%');
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
	}

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

					$loading = utils.loading();
					return true;
				},
				uploadProgress: function() {},
				success: function(rs, succ) {
					if (rs['node_code'] != 20000) {
						utils.bubble(rs['msg'])
					} else {
						utils.bubble('保存成功');
					}
					$loading.remove()
				},
				fail: function(err, res) {
					utils.bubble('上传失败了');
				}
			});
		});
	}



	function _bindEvents($scope) {
		onPublish($scope);
	}

	return {
		init: function() {
			var $scope = $('.mod-notification-publish');
			_bindEvents($scope);
			// 图片文件
			setTimeout(function(e) {
				new CommonUploader($scope, {
					picker: $scope.find('.file-box').eq(0).find('.file-picker')[0],
					mimeType: 'audio',
					success: function  (rs, file) {
						var data = rs['data']['resp'];
						this.$container.find('input[type=hidden].file-hidden').val(data['key'])
					}
				});
			} ,100);
		}
	};
})
