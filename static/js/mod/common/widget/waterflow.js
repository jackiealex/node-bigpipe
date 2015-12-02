(function(factory) {
    'use strict';
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else {
        factory();
    }
})(function() {
    function WaterFlowLayout(opts) {
        this.options = $.extend({
            el: null,
            columnGap: 10,
            url: '',
            query: {
                page: 1,
                limit: 40,
            },
            columnCount: 4,
            itemTemplate: ['<div class="item" data-id="<%= id %>">', '<div class="wrap">', '<p class="delete" title="删除" data-id="<%= id %>"></p>', '<div class="header">', '<div class="head-img">', '<a class="action-paresh" href="/user/atlas/list?uid=<%= createBy %>" title="查看该用户图集">', '<img class="small-pic" src="<%= avator %>" alt="">', '</a>', '</div>', '<div class="person-info">', '<div class="name"><%= nickname %></div>', '<div class="time"><i></i><%= dateTime %></div>', '</div>', '</div>', '<% if (content) { %>', '<div class="desc"><%= content %></div>', '<% } %>', '<div class="pic-wrap"><img class="pic" data-id="<%= id %>" alt=""></div>', '<div class="sum">', '<span class="praise-num"><i></i><%= praiseNum %></span>', '<span class="comment-num"><i></i><%= commentNum %></span>', '<% if (location) { %>', '<span class="location" title="<%= location %>">', '<i></i><%= location %>', '</span>', '<% } %>', '</div>', '</div>', '</div>'].join(''),
            itemFormat: function(item) {
                return item;
            },
            format: function(rs) {
                return rs;
            }
        }, opts);
        this._init();
    };
    $.extend(WaterFlowLayout.prototype, {
        _init: function() {
            this.$el = $(this.options.el);
            this.list = [];
            this.itemHeightArray = [];
            this.render();
            var _this = this;
            $(window).on('resize', _.debounce(function() {
                _this.rerender()
            }));
        },
        _calcColumnCount: function() {
            var containerWidth = this.$el.width();
            if (containerWidth >= 1000) {
                this.options.columnCount = 4
            } else if (containerWidth >= 700 && containerWidth < 1000) {
                this.options.columnCount = 3
            } else if (containerWidth < 700 && containerWidth >= 500) {
                this.options.columnCount = 2
            } else {
                this.options.columnCount = 1
            }
        },
        rerender: function() {
            this._calcColumnCount()
            var $items = this.$el.children();
            var columnCount = this.options.columnCount;
            var columnGap = this.options.columnGap;
            var containerWidth = this.$el.width();
            var itemWidth = (containerWidth - (columnCount - 1) * columnGap) / columnCount;
            var paddingRight = 6;
            var itemHeightArray = Array.apply(null, Array(columnCount)).map(Number.prototype.valueOf, 0);
            for (var i = 0; i < $items.length; i++) {
                var minColumnValue = Math.min.apply(null, itemHeightArray)
                var minColumnIndex = itemHeightArray.indexOf(minColumnValue)
                var x = minColumnIndex * (itemWidth + columnGap);
                var y = minColumnValue;
                var $item = $items.eq(i);
                var itemHeight = $item.outerHeight();

                var $img = $item.find('.pic');
                var w = $img.width();
                var h = $img.height();
                var imgHeight = (itemWidth - paddingRight) / w * h;

                $item.css({
                    left: x,
                    top: y,
                    width: itemWidth
                });

                $item.find('.pic-wrap').css({
                    height: imgHeight
                })

                itemHeightArray[minColumnIndex] = minColumnValue + itemHeight;
            };
        },
        render: function() {
            this._calcColumnCount();
            this.fetchData(function(list) {
                var columnCount = this.options.columnCount;
                var columnGap = this.options.columnGap;
                var containerWidth = this.$el.width();
                var itemWidth = (containerWidth - (columnCount - 1) * columnGap) / columnCount;
                var itemTmpl = this.options['itemTemplate'];
                var itemHeightArray = Array.apply(null, Array(columnCount)).map(Number.prototype.valueOf, 0);
                var paddingRight = 6;
                itemWidth = Math.ceil(itemWidth);
                var loadedCount = 0;
                this.$el.empty();
                for (var i = 0; i < list.length; i++) {
                    var minColumnValue = Math.min.apply(null, itemHeightArray)
                    var minColumnIndex = itemHeightArray.indexOf(minColumnValue)
                    var x = minColumnIndex * (itemWidth + columnGap);
                    var y = minColumnValue;
                    var item = this.options.itemFormat(list[i]);
                    item['dateTime'] = utils.dateTimeFormat(item.createDate);
                    var $item = $(_.template(itemTmpl, item));
                    this.$el.append($item);
                    var src = item['coverImage']['url'];
                    var size = item['coverImage']['size'].split('*');
                    var w = parseInt(size[0]);
                    var h = parseInt(size[1]);
                    var imgHeight = (itemWidth - paddingRight) / w * h;
                    //set width thne get height because of text
                    $item.css({
                        left: x,
                        top: y,
                        width: itemWidth
                    });
                    var itemHeightWithoutImage = $item.outerHeight();
                    imgHeight = Math.ceil(imgHeight);
                    itemHeightArray[minColumnIndex] = minColumnValue + itemHeightWithoutImage + imgHeight;
                    $item.find('.head-img img').on('error', function(e) {
                        $(this).attr('src', __uri('/static/img/default.png'));
                        this.onload = null;
                    })
                    $item.find('.pic-wrap').css({
                        height: imgHeight
                    })
                    $item.find('.pic').on('load', function(e) {
                        loadedCount++;
                        if (loadedCount >= list.length) {}
                    }).attr('src', src);
                };
                this.$el.height(Math.max.apply(null, itemHeightArray));
                // this.rerender()
            });
        },
        fetchData: function(callback) {
            var _this = this;
            utils.api(this.options.url, {
                data: this.options.query
            }).done(function(rs) {
                if (rs['node_code'] != 20000) {
                    return;
                }
                callback.call(_this, _this.options.format(rs));
            });
        }
    });
    window.WaterFlowLayout = WaterFlowLayout;
    return WaterFlowLayout;
});