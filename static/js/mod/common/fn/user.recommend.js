define(function() {
    return function onSetRecommend($scope, opts) {
        var opts = $.extend({
            selector: '.recmd .btn-recommend'
        }, opts);
        var recommendTmpl = ['<div class="recommend">', '   <div class="field">', '      <p style="margin: 20px 0;">是否将此用户加入推荐列表，请选则推荐方案？</p>', '      <div class="ui buttons resource-type">', '          <div class="ui button" data-type="0">随机出现</div>', '          <div class="or"></div>', '          <div class="ui button" data-type="1">优先显示</div>', '          <div class="or"></div>', '          <div class="ui button" data-type="2">取消推荐</div>', '      </div>', '   </div>', '</div>'].join('');
        $scope.on('click', opts['selector'], function(e) {

            var $this = $(this);
            var id = $(this).parents('.item').data('id') || $(this).data('id');
            var d = dialog({
                title: '加入推荐',
                align: 'bottom left',
                quickClose: true,
                content: _.template(recommendTmpl, {
                    id: id
                }),
                ok: function() {
                    var level = $(this.node).find('.buttons .positive').data('type');
                    if ($(this.node).find('.buttons .positive').length == 0) {
                        utils.bubble('你没选择推荐方案');
                        return false
                    }
                    if (level == 0 || level == 1) {
                        utils.api('/_bridge/admin/recommend/user/add', {
                            method: 'post',
                            data: {
                                id: id,
                                level: level
                            }
                        }).done(function(rs, succ) {
                            if (rs['node_code'] == 20000) {
                                utils.bubble('添加成功');
                                $this.removeClass('gift').addClass('red')
                                return utils.bubble(rs['data']['msg']);
                            }
                        });
                    } else {
                        utils.api('/_bridge/admin/recommend/user/delete', {
                            method: 'post',
                            data: {
                                id: id
                            },
                            onError: function(rs) {
                                if (rs['node_code'] == 1) {
                                    utils.bubble('用户此前并不在推荐列表中，操作失败');
                                }
                            }
                        }).done(function(rs, succ) {
                            if (rs['node_code'] == 20000) {
                                utils.bubble('删除成功！');
                                _SmartPipe_.reload();
                            }
                        });
                    }
                    return true;
                },
                okValue: '确定',
                cancelValue: '取消',
                cancel: function() {
                    return true;
                }
            });
            d.show(e.target);
            e.preventDefault();
            e.stopPropagation();
            return false
        });
    };
})