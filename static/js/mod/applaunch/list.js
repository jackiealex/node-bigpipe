define(function() {
    var updateTmpl = [
        '<div class="basic-info"><input type="hidden" name="id" value="<%= id %>" />',
        '	<div class="ui form">',
        '		<div class="two fields">',
        '			<div class="field">',
        '				<input name="name" style="width:250px;" type="text" value="<%= name %>" placeholder="名称"/>',
        '			</div>',
        '		</div>',
        '		<div class="two fields">',
        '			<div class="field">',
        '				<div class="ui left icon input label-search-box">',
        '					<input type="text" readonly class="datetimepicker" name="starttime" value="<%= starttime %>" placeholder="起始时间" />',
        '					<i class="time icon"></i>',
        '				</div>',
        '			</div>',
        '			<div class="field">',
        '				<div class="ui left icon input label-search-box">',
        '					<input type="text"  readonly class="datetimepicker" name="endtime" value="<%= endtime %>" placeholder="结束时间" />',
        '					<i class="time icon"></i>',
        '				</div>',
        '			</div>',
        '		</div>',
        '		<div class="field">',
        '		    <textarea wrap="virtual" style="min-height: 48px;height: 48px;" name="description"  maxlength="40" placeholder="说点什么(最多输入40个字符...)"><%= description %></textarea>',
        '		</div>',
        '	</div>',
        '</div>'
    ].join('');

    var updateImageTmpl = [
        '<form action="/applaunch/updateimg" method="post" class="applunch_image">',
        '<div class="basic-info">',
        '   <div class="ui form"> <input type="hidden" name="id" value="<%= id %>" />',
        '       <div class="field">',
        '           <div class="ui-input-image-preview">',
        '               <img src="/static/img/icons/image-uploader.png" alt="默认图片">',
        '               <input type="file" name="file" title="选择文件" accept="image/*" >',
        '           </div>',
        '       </div>',
        '   </div>',
        '</div>',
        '</form>',
        '<link rel="stylesheet" href="/static/css/page/common/input-image-preview.css">'
    ].join('');

    function onDelItem($scope) {
        $scope.on('click', '.item .del', function() {
            $this = $(this);
            var id = $this.data('id');
            utils.api('/_bridge/admin/start/page?id=' + id, {
                method: 'delete',
            }).done(function(rs) {
                if(rs['node_code'] == 20000) {
                    $this.parents('.item').addClass('animated bounceOutLeft')
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                            $(this).remove();
                        });
                }
            });
        });
    };

    function onEditItemName($scope) {
        $scope.on('dblclick', '.item .name, .item .starttime, .item .endtime, .item .version, .item .pkg, .item .description', function(e) {

            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var link = $item.find('.link-text').text();
            var type = $item.data('type');
            var starttime = $item.data('starttime');
            var endtime = $item.data('endtime');
            var $name = $item.find('.name');
           
            var $description = $item.find('.description');

            var imageKey = $item.data('code');
            var name = $name.text();
            var description = $description.text();

            var $pkg = $item.find('.pkg');

            var pkg = $pkg.text();

            var d = dialog({
                title: '修改启动页',
                align: 'bottom left',
                quickClose: true,
                content: _.template(updateTmpl, {
                    id: id,
                    link: link,
                    type: type,
                    name: name,
                    starttime: utils.dateTimeFormat(starttime),
                    endtime: utils.dateTimeFormat(endtime),
                    pkg: pkg,
                    description: description
                }),
                onshow: function() {
                    $(this.node).find('.buttons .button:contains('+pkg+')').addClass('positive').siblings().removeClass('positive');
                    
                    $(this.node).find('.datetimepicker').eq(0).datetimepicker({
                        format: 'Y-m-d 00:01',
                        timepicker: false,
                        lang: 'ch'
                    });

                    $(this.node).find('.datetimepicker').eq(1).datetimepicker({
                        format: 'Y-m-d 23:59',
                        lang: 'ch',
                        timepicker: false
                    });
                },
                ok: function() {
                    var id = $(this.node).find('input[name=id]').val();
                    var name = $(this.node).find('input[name=name]').val();
                    var starttime = $(this.node).find('input[name=starttime]').val();
                    var endtime = $(this.node).find('input[name=endtime]').val();
                    var description = $(this.node).find('textarea[name=description]').val();

                    name = $.trim(name);
                    description = $.trim(description);
                    if (!name) {
                        utils.bubble('请输入名称');
                        return false;
                    }
                    if (!starttime) {
                        utils.bubble('开始时间不能为空');

                        return false;
                    }
                    if (!endtime) {
                        utils.bubble('结束时间不能为空');
                        return false;
                    }
                    if (endtime < starttime) {
                        utils.bubble('结束时间不能比开始时间早哦');
                        $(this.node).find('input[name=endtime]').val('');
                        return false;
                    }
                   
                    if (!description) {
                        utils.bubble('请输入您的描述');
                        return false;
                    }
                    utils.api('/_bridge/admin/page/update', {
                        method: 'post',
                        data: {
                            id: id,
                            type: type,
                            link: link,
                            name: name,
                            startTime: +new Date(starttime),
                            endTime: +new Date(endtime),
                            pkg: pkg,
                            description: description,
                            imageKey: imageKey
                        }
                    }).done(function(rs) {
                        if (rs['node_code'] != 20000) {
                            return utils.bubble(rs['data']['msg']);
                        }
                        utils.bubble('修改成功');
                        _SmartPipe_.reload();
                    });
                    return true;
                },
                okValue: '提交',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                }
            });
            d.showModal();

        });
    };


    function onEditImage($scope) {
        $scope.on('dblclick', '.item .images', function(e) {

            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var link = $item.find('.link-text').text();
            var starttime = $item.data('starttime');
            var endtime = $item.data('endtime');

            var type = $item.data('type');
            var $name = $item.find('.name');
            var $pkg = $item.find('.pkg');
            var $description = $item.find('.description');
            var imageKey = $item.data('code');


            var name = $name.text();
            var pkg = $pkg.text();
            var description = $description.text();

            var d = dialog({
                title: '修改启动页图片',
                align: 'bottom left',
                quickClose: true,
                content: _.template(updateImageTmpl, {
                    id: id,
                    imageKey: imageKey
                }),
                ok: function() {

                    var file = $(this.node).find('input[name=file]').val();

                    if (!file) {
                        utils.bubble('请选择图片');
                        return false;
                    }

                    $(this.node).find('form').ajaxSubmit({
                        beforeSubmit: function() {
                            loading = utils.loading();
                            return true;
                        },
                        success: function(rs, succ) {
                            var imageKey = rs['data']['resp']['images'][0]['cacheKey'];
                            $.ajax('/_bridge/admin/page/update', {
                                method: 'post',
                                data: {
                                    id: id,
                                    link: link,
                                    type: type,
                                    name: name,
                                    startTime: starttime,
                                    endTime: endtime,
                                    pkg: pkg,
                                    description: description,
                                    imageKey: imageKey
                                } 
                            }).done(function(rs) {
                                if (rs['node_code'] != 20000) {
                                    return utils.bubble(rs['data']['msg']);
                                }
                                loading.remove();
                                utils.bubble('修改成功');
                                _SmartPipe_.reload()
                            })
                        },
                        error: function() {

                        }
                    });
                    return true;
                },
                okValue: '提交',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                }
            });
            d.show(e.target);
        });
    };



    function _bindEvents($scope) {
        onEditItemName($scope);
        onDelItem($scope);
        onEditImage($scope);
    };

    return {
        init: function(e) {
            var $scope = $('.mod-applaunch-list');
            _bindEvents($scope);
        }
    };

});