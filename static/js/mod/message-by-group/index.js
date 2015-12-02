define(['mod/user/search'], function(UserSearchView) {
    var View = Backbone.View.extend({
        initialize: function(e) {
        },
        events: {
           
            'click .btn-add-cart': 'addUsersToCart',
            'click .btn-show-cart': 'showCart',
            'click .btn-select-all': 'onSelectAll',
            'click .btn-reverse-select': 'onReverseSelectAll',
            'cartItemCountChanged': 'onCartItemCountChanged'
        },
        onCartItemCountChanged: function(e) {
            var count = this.$el.parents('.sub-main').find('.selected-box .item').length;
            this.$el.find('.btn-show-cart').text(count + '项（点击查看）')
        },
        addUsersToCart: function(e) {
            var $scope = this.$el;
            $scope.find('.item.selected').each(function(index, item) {
                var $box = $scope.parents('.sub-main').find('.selected-box');
                var cloneItem = item.cloneNode(true);
                if ($box.find('.item[data-id=' + $(item).data('id') + ']').length > 0) {
                    return utils.createElementTip(item, {
                        text: '重复加入'
                    });
                }
                $(item).removeClass('selected');
                $box.append($(cloneItem).removeClass('selected'));
                $scope.trigger('cartItemCountChanged')
            });
        },
        showCart: function(e) {
            this.$el.parents('.sub-main').find('.selected-box').show()
        },
       
        onSelectAll: function(e) {
            this.$el.find('.list .item').addClass('selected')
        },
        onReverseSelectAll: function(e) {
            this.$el.find('.list .item').each(function(index, item) {
                if ($(item).hasClass('selected')) {
                    $(item).removeClass('selected')
                } else {
                    $(item).addClass('selected')
                }
            })
        }
    });
    var SelectableUserSearchView = UserSearchView.extend({
        events: function(e) {
            return $.extend({}, UserSearchView.prototype.events, {
                'click .list .item .wrap': 'onItemSelect',
            });
        },
        onItemSelect: function(e) {
            var $item = $(e.currentTarget).parent();
            if ($item.hasClass('selected')) {
                $item.removeClass('selected')
            } else {
                $item.addClass('selected')
            }
        }
    });
    return {
        init: function(e) {
            // body...
            var $scope = $('.mod-message-by-group')
            var view = new View({
                el: $scope.find('.mod-user-list')[0],
            });
            new SelectableUserSearchView({
                el: $scope.find('.mod-user-list')[0],
                defaultPathname: '/message/by/group?auto_end_a=1&'
            });
            view.onCartItemCountChanged();
        }
    }
})
