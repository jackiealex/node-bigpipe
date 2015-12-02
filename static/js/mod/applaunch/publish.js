define(['base/draggabilly.pkgd', 'mod/common/widget/suggestion'], function(Draggabilly, Suggestion) {
    var tmplUserSuggestItem = [
        '<li class="user-item" data-id="<%= id %>">',
        '    <img src="<%= headUrl %>" alt="">',
        '    <div><%= nickname %></div>',
        '</li>'
    ].join('');

    function onClearStime($scope) {
        $scope.on('click', '.clear-stime', function(e) {
            var $starttime = $scope.find('input[name=input-starttime]');
            $starttime.val('');
        });
    };

    function onClearEtime($scope) {
        $scope.on('click', '.clear-etime', function(e) {
            var $endtime = $scope.find('input[name=input-endtime]');
            $endtime.val('');
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
                bucketType: {image: 1, audio:2, other: 3}[this.options['mimeType']] || 3,
                isPublic: this.options['isPublic'] || false
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
        $scope.on('click', '.btn-submit', function() {

            var $form = $scope.find('form')
            var $name = $scope.find('input[name=name].start-page-name');
            var $imageKey = $scope.find('input[name=image]');
            var $starttime = $scope.find('input[name=input-starttime]');
            var $endtime = $scope.find('input[name=input-endtime]');
            var $description = $scope.find('textarea[name=description]');

            var description = $.trim($description.val());
            var name = $.trim($name.val());

            var starttime = $starttime.val();
            var endtime = $endtime.val();
            var imageKey = $imageKey.val();

            function reset() {
                loading.remove();
                $form.clearForm();
            };
            if (!name) {
                return utils.bubble('请输入名称');
            }
            if (!imageKey) {
                return utils.bubble('请选择图片');
            }
            if (!$starttime.val()) {
                return utils.bubble('开始时间不能为空');
            }
            if (!$endtime.val()) {
                return utils.bubble('结束时间不能为空');
            }
            if (endtime < starttime) {
                utils.bubble('结束时间不能比开始时间早哦');
                $endtime.val('');
                return false;
            }

            if (!description) {
                return utils.bubble('请输入您的描述');
            }

            var type = $scope.find('.jump-type .buttons .button.positive').data('id');
            var link = '';
            if (type == 'to_someone') {
                link = $scope.find('.name-search-id').val()
            } else if (type == 'to_download' || type == 'to_webview') {
                link = $scope.find('.jump-url input').val()
            }

            if (type !== 'to_nowhere' && !link) {
                return utils.bubble('请输入跳转目标');
            }
            starttime = +new Date(starttime);
            endtime = +new Date(endtime);
            $form.ajaxSubmit({
                data: {
                    startTime: starttime,
                    endTime: endtime,
                    link: link
                },
                beforeSubmit: function() {
                    loading = utils.loading();
                    return true;
                },
                uploadProgress: function() {
                    console.log(+new Date);
                },
                success: function(rs, succ) {
                    reset();
                    if (rs['node_code'] != 20000) {
                        utils.bubble(rs['msg']);
                        return;
                    }
                    utils.bubble('上传成功');
                    _SmartPipe_.reload()
                },
                fail: function(err, res) {
                    reset();
                }
            });

        });
    };

    function initUserSuggtion($scope) {
        new Suggestion({
            el: $scope.find('.name-search-box input'),
            elSuggestBox: $scope.find('.ui-suggestion'),
            url: '/_bridge/search/users',
            keyName: 'nickname',
            ajaxType: 'json',
            baseParams: {
                page: 1,
                limit: 15
            },
            tmplSuggestItem: tmplUserSuggestItem,
            itemSelector: '.user-item',
            onStart: function() {
                this.$el.parent().addClass('loading');
            },
            onEnd: function() {
                this.$el.parent().removeClass('loading');
            },
            format: function(rs) {
                return rs["data"]['resp']['page']['list'];
            },
            itemFormat: function(data) {
                return {
                    id: data['objId'],
                    nickname: $.trim(data['nickname']),
                    headUrl: data['headPortrait'] || ''
                }
            },
            onItemSelect: function(elItem) {
                var $item = $(elItem);
                var id = $item.data('id');
                var name = $.trim($item.text());
                $item.addClass("animated zoomOutUp");
                $item.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $item.remove();
                })
                $scope.find('.name-search-box>input').val(name);
                $scope.find('textarea[name=info]').text(id);
                $scope.find('textarea[name=info]').val(id);
            }
        });
    }

    function onTypeClick($scope) {
        $scope.find('.jump-url').hide();
        $scope.find('.search-user-component').hide();
        $scope.on('click', '.jump-type .button', function(e) {
            var $this= $(this);
            if ($this.hasClass('person-page')) {
                $scope.find('.link-type').val(2);
                $scope.find('.search-user-component').show();
                $scope.find('.jump-url').hide();
            } else if ($this.hasClass('web-site') || $this.hasClass('app-download')) {
                if ($this.hasClass('web-site')) {
                    $scope.find('.link-type').val(1);
                } else {
                    $scope.find('.link-type').val(3);
                }
                $scope.find('.jump-url').show();
                $scope.find('.search-user-component').hide();
            } else if ($this.hasClass('just-no')) {
                $scope.find('.link-type').val(0);
                $scope.find('.jump-url').hide();
                $scope.find('.search-user-component').hide();
            }
        });
    };

    function onStartTypeClick($scope) {
        $scope.on('click', '.start-type .button', function(e) {
            var $this= $(this);
            if ($this.hasClass('start-page')) {
                $scope.find('.start-type').val(1);
            } else if ($this.hasClass('start-window')) {
                $scope.find('.start-type').val(2);
            }
        });
    }

    function _bindEvents($scope) {
        onPublish($scope);
        onStartTypeClick($scope);
        onClearStime($scope);
        onClearEtime($scope);
        onTypeClick($scope);
    };

    return {
        init: function(e) {

            var $scope = $('.mod-applaunch');
            initUserSuggtion($scope);

            $scope.find('.datetimepicker').eq(0).datetimepicker({
                format: 'Y-m-d 00:01',
                timepicker: false,
                lang: 'ch'
            });

            $scope.find('.datetimepicker').eq(1).datetimepicker({
                format: 'Y-m-d 23:59',
                lang: 'ch',
                timepicker: false
            });

            _bindEvents($scope);

            // 图片文件
            setTimeout(function(e) {
                new CommonUploader($scope, {
                    picker: $scope.find('.file-box').eq(0).find('.file-picker')[0],
                    mimeType: 'image',
                    isPublic: true,
                    success: function  (rs, file) {
                        var data = rs['data']['resp'];
                        this.$container.find('input[type=hidden].file-hidden').val(data['key'])
                    }
                });
            } ,100);
        }
    }


});