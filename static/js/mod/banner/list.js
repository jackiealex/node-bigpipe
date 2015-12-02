define(function() {
	var updateItemTmpl = [
	'<div class="update-banner"> <input type="hidden" name="id" value="<%= id %>" >',
	'	<div class="field">',
	'		<div class="ui icon input">',
	'			<input type="text" placeholder="目标链接" name="jumpUrl" value="<%= jumpUrl %>" >',
	'			<i class="linkify icon"></i>',
	'		</div>',
	'	</div><br/>',
	'	<div class="field">',
	'		<div class="ui right icon input">',
	'			<input type="number" min="1" placeholder="权重" name="weight" value="<%= weight %>" >',
	'			<i class="resize vertical icon"></i>',
	'		</div>',
	'	</div><br/>',
	'	<div class="field">',
	'		<div class="ui buttons disable-status">',
	'			<div class="ui button positive" data-id="0">激活</div>',
	'			<div class="or"></div>',
	'			<div class="ui button" data-id="1">禁用</div>',
	'		</div>',
	'	</div>',
	'</div>'
	].join('');

    var updateImageTmpl = [
    '<form action="/banner/updateimg" method="post">',
    '   <div class="ui form"> <input type="hidden" name="id" value="<%= id %>" />',
    '       <div class="field">',
    '           <div class="ui-input-image-preview">',
    '               <img src="/static/img/icons/image-uploader.png" alt="默认图片">',
    '               <input type="file" name="file" title="选择文件" accept="image/*" >',
    '           </div>',
    '       </div>',
    '   </div>',
    '</form>',
    '<link rel="stylesheet" href="/static/css/page/common/input-image-preview.css">'
    ].join('');


    function onEditImage($scope) {
        $scope.on('click', '.item .edit', function(e) {

            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var show = $item.data('show');

            var jumpUrl = $item.find('.images a').attr('href');
            var $weight = $item.find('.weight');

            var imageId = $item.data('imageId');

            
            var weight = $weight.text();

            var file = $item.find('.images img').attr('src');

            var d = dialog({
                title: '修改',
                align: 'bottom left',
                quickClose: true,
                content: _.template(updateImageTmpl, {
                    id: id,
                    file: file
                }),
                ok: function() {

                    var file = $(this.node).find('input[type=file]');

                    if (!file) {
                        utils.bubble('请选择文件');
                        return false;
                    }

                    $(this.node).find('form').ajaxSubmit({
                        data: {
                            id: id 
                        },
                        beforeSubmit: function() {
                            loading = utils.loading();
                            return true;
                        },
                        success: function(rs, succ) {
                            var imageId = rs['data']['resp']['images'][0]['id']; 
                            utils.api('/_bridge/admin/banner/update', {
                                method: 'post',
                                data: {
                                    id:id,
                                    jumpUrl: jumpUrl,
                                    weight: weight,
                                    show: show,
                                    imageId: imageId
                                }
                            }).done(function(rs, succ) {
                                if (rs['node_code'] != 20000) {
                                    return utils.bubble(rs['data']['msg']);
                                }
                                loading.remove();
                                utils.bubble('修改成功'); 
                                $item.find('img').eq(0).attr('src', dataURL);
                            });
                            
                        },
                        error: function() {

                        }
                    })
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
    }

	function onEditItem($scope) {
		$scope.on('click', '.item .show,.item .weight', function(e) {

            var $item = $(this).parents('.item');
            var id = $item.data('id');
            var show = $item.data('show');

            var jumpUrl = $item.find('.images a').attr('href');
            var $weight = $item.find('.weight');

            var imageId = $item.data('imageId');

            var $showName = $item.find('.show');
            
            var weight = $weight.text();

            var d = dialog({
                title: '修改',
                align: 'bottom left',
                quickClose: true,
                content: _.template(updateItemTmpl, {
                    id: id,
                    jumpUrl: jumpUrl,
                    weight: weight,
                }),
                onshow: function() {
                    if(show == 1){
                        $(this.node).find('.buttons .button:contains(禁用)').addClass('positive').siblings().removeClass('positive');
                    } 
                },
                ok: function() {

                    var id = $(this.node).find('input[name=id]').val();
                    var jumpUrl = $(this.node).find('input[name=jumpUrl]').val();
                    var weight = $(this.node).find('input[name=weight]').val();
                    var show = $(this.node).find('.buttons .positive').data('id');

                    if (!jumpUrl) {
                        utils.bubble('请选择目标链接');
                        return false;
                    }
                    if (!weight) {
                        utils.bubble('请选择权重"');
                        return false;
                    }
                    utils.api('/_bridge/admin/banner/update', {
                        method: 'post',
                        data: {
                            id:id,
                            jumpUrl: jumpUrl,
                            weight: weight,
                            show: show,
                            imageId: imageId
                        }
                    }).done(function(rs, succ) {
                        if (rs['node_code'] != 20000) {
                                return utils.bubble(rs['data']['msg']);
                            }
                            $weight.text(weight);
                            jumpUrl = $item.find('.images a').attr('href');
                            
                            if(show == 0) {
                                showName = "否";
                            }
                            else {
                                showName = "是";
                            }
                            $showName.text(showName);

                            utils.bubble('修改成功');  
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
	}

	function onDelItem($scope) {
        $scope.on('click', '.item .del', function(e) {
            var $this = $(this);
            utils.api('/_bridge/admin/banner/delete', {
                method: 'post',
                data: {
                    id: $this.data('id')
                }
            }).done(function(rs, succ) {
                utils.bubble('删除成功！');
                $this.parents('.item').addClass('animated bounceOutLeft')
                    .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                        $(this).remove();
                    });
            });
             
        });
    };

	function _BindEvents($scope) {
		onDelItem($scope);
        onEditItem($scope);
        onEditImage($scope);
	}

	return {
		init: function(e) {
			$scope = $('.mod-banner-list');
			_BindEvents($scope);
		}
	}
});