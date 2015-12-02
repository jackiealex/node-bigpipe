define(['mod/common/widget/suggestion', 'mod/common/fn/user.recommend'], function(Suggestion, onRecommend) {
    var $img = null;
    var $leftBox = null;
    var $imageContainter = null; 
    var myScroll;
    var imagePager = null;
    var imgTmpl = ['<div class="img-box">', '<img src="<%= src %>"alt="" class="">', '</div>'].join('');
    var tmplSuggestItem = ['<li class="item" data-id="<%= id %>">', '    <img src="<%= imgUrl %>" alt="">', '    <div class="name"><%= name %></div>', '</li>'].join('');

    function onPrev($scope) {
        $scope.find('.middle').on('click', '.main-img .prev', function() {
            imagePager.prev();
        });
    };

    function onNext($scope) {
        $scope.find('.middle').on('click', '.main-img .next', function() {
            imagePager.next();
        });
    };

    function onSave($scope) {
        $scope.find('.middle').on('click', '.btn-rel', function() {
            var idString = [];
            var spanInLeft = $leftBox.find('span');

            for (var i = 0; i < spanInLeft.length; i++) {
                idString.push(spanInLeft[i].dataset.id);
            }
            if (idString.length <= 0) {
                return utils.bubble('您还没有添加标签');
            }
            var id = imagePager.list[imagePager.index].id
            utils.api('/_bridge/interestcate/addatlasrel', {
                method: 'post',
                data: {
                    atlasid: id,
                    interestcateids: idString.toString()
                }
            }).done(function(rs) {
                if (rs['node_code'] == 20000) {
                    utils.bubble('关联成功了！')
                    var imageRecord = imagePager.getCurrentRecord();
                    imageRecord['status'] = 5;
                    $scope.find('.middle .label-box span').attr('class', 'ui red tag large label')
                    $scope.find('.btn-rel').addClass('green');
                    $scope.find('.buttons .button').removeClass('positive');
                    doNext($scope);
                }
            });
        });
    };

    function onSelectLabel($scope) {
        $scope.on('click', '.category-list .label', function() {
            var name = $(this).find('.name').text()
            var id = $(this).data('id');
            if ($scope.find('.label-box').find('span[data-id=' + id + ']').length <= 0) {
                $leftBox.append('<span class="ui teal tag large label" name="newtag" data-id=' + id + ' data-name=' + name + '>' + name + '</span>');
            }
        });
    };

    function getConnectLabel(atlasid) {
        $leftBox.find('span').remove();
        
        utils.api('/_bridge/interestcate/atlaslist', {
            method: 'get',
            data: {
                atlasid: atlasid
            }
        }).done(function(rs, succ) {
            for (var i = 0; i < rs.data.resp.data.length; i++) {
                var id = rs.data.resp.data[i].id;
                $leftBox.append('<span class="ui large red tag label" data-id="' + rs.data.resp.data[i].id + '">' + rs.data.resp.data[i].name + '</span>');
            }
        });
 
    };

    function onSubImgSelect($scope) {
        $scope.find('.right').on('dblclick', '.all-img-box .img-box', function(e) {
            $(this).siblings().removeClass('on');
            $(this).addClass('on');
            $img.attr({
                'src': $(this).children()[0].src
            });
            imagePager.index = $scope.find('.img-box').index($(this));
            imagePager.options.onChange.call(imagePager, imagePager.index)
        });
    };

    function ImagePager(opts) {
        this.list = [];
        this.index = 0;
        this.options = $.extend({
            currentPage: 0,
            limit: 20,
            date: undefined,
            status: 99,
            url: '/_bridge/admin/atlas/list/all',
            onChange: function (index) {
                if(this.list.length <=0) {
                    console.log('empty list');
                    return
                }
                var image = this.list[index]['coverImage'];
                var size = image.size;

                $img.attr({
                    src: image['url']
                }).data('size', size)

                $(window).trigger('resize');

                var data = this.list[this.index];
                var id = data.id
                var status = data.status

                getConnectLabel(id);

                $scope.find('.status .button').removeClass('positive');
                $scope.find('.status .button[data-id='+status+']').addClass('positive');

                if(status != 5) {
                    $scope.find('.btn-rel').removeClass('green');
                } else {
                    $scope.find('.btn-rel').addClass('green');
                }

                if (myScroll && myScroll.currentPage) {
                    myScroll.refresh();
                    myScroll.goToPage(0, index, 400);
                    myScroll.refresh();
                    $(myScroll.scroller).children().removeClass('on').eq(myScroll.currentPage.pageY).addClass('on')
                }

                $scope.find('.console .index').text(index + 1)
                $scope.find('.console .page').text(this.options.currentPage);

                $scope.find('.title a').attr('href', '/user/atlas/list?uid=' + data['createBy']).find('p').data('id', data['createBy']);
                $scope.find('.title img').attr('src', data['avator'])
                $scope.find('.title .name').text(data['nickname'])
                $scope.find('.title .time').text(utils.dateTimeFormat(data['createDate']));

            },
            onPrevEnd: function  (argument) {
                utils.bubble('到头了')
            },
            onNextEnd: function  (argument) {
                utils.bubble('到头了')
            },
            onFetchStart: function  (argument) {
                
            },
            onFetchEnd: function  (argument) {
                // body...
            },
            onPrev: function(index) {
                
            },
            onNext: function(index) {
                
            },
            onLoaded: function(rs) {
                $leftBox.find('span').remove();
                var list = this.list;
                $imageContainter.empty()

                if(list.length==0) {
                    $imageContainter.append('<div class="img-box empty">没有图片哦</div>');
                    $img.attr('src', '')
                    return;
                }

                for (var i = 0; i < list.length; i++) {
                    var src;
                    var item = list[i];
                    src = item.coverImage.url;
                    var imgHtml = _.template(imgTmpl)({
                        src: src
                    });
                    $imageContainter.append(imgHtml);
                }

                myScroll = new IScroll('#scroller', {
                    startY: 0,
                    scrollX: false,
                    scrollY: true,
                    mouseWheel: true,
                    snap: '.img-box'
                });

                setTimeout(function() {
                    myScroll.refresh()
                }, 16);

                $(window).trigger('resize')
            }
        }, opts);
        this._init();
    };
    $.extend(ImagePager.prototype, {
        _init: function() {
            var _this = this;
            this.loadRemoteData('next').done(function() {
                _this.options.onChange.call(_this, _this.index);
            });
        },
        refresh: function(opts) {
            $.extend(this.options, opts);
            this._init();
        },
        prev: function() {
            var _this = this;
            
            if (this.index <=0) {
                this.index = 0;
                if(this.options.currentPage <=1) {
                    return this.options.onPrevEnd.call(this, null);
                }
                this.loadRemoteData('prev').done(function() {
                    _this.index = _this.list.length - 1;
                    _this.options.onPrev.call(_this, _this.index);
                    _this.options.onChange.call(_this, _this.index)
                });
            } else {
                this.index--;
                this.options.onPrev.call(this, this.index);
                _this.options.onChange.call(_this, _this.index)
            }
        },
        getCurrentRecord: function() {
            return this.list[this.index];
        },
        next: function() {
            var _this = this;
            if (this.index >= this.list.length -1) {
                if(this.list.length < this.options.limit) {
                    return this.options.onNextEnd.call(this, null);
                }
                this.loadRemoteData('next').done(function() {
                    _this.options.onNext.call(_this, 0);
                    _this.options.onChange.call(_this, 0);
                });
            } else {
                this.index++;
                this.options.onNext.call(this, this.index);
                _this.options.onChange.call(_this, _this.index)
            }
        },
        loadRemoteData: function(direction) {
            var opts = this.options;
            var _this = this;
            if (direction == 'prev') {
                opts['currentPage']--;
                if (this.options['currentPage'] <= 0) {
                    this.options['currentPage'] = 1;
                }
            } else {
                this.options['currentPage']++;
            }
            if(this._isLoading_) {
                return utils.bubble('数据加载中，请稍等');
            }
            this._isLoading_ = true
            return utils.api('/_bridge/admin/atlas/list/all', {
                    data: {
                        page: this.options['currentPage'],
                        limit: opts['limit'],
                        date: opts['date'],
                        status: opts['status']
                    },
                    onError: function(rs) {
                        _this._isLoading_ = false;
                        utils.bubble('加载异常')
                    }
                }).done(function(rs, succ) {
                    if (rs['node_code'] == 20000) {
                        _this.list = rs.data.resp.pager.list;
                        _this.index = 0;
                        opts.onLoaded.call(_this, rs);

                        _this.options.onFetchEnd.call(_this, null);    
                        _this._isLoading_ = false;
                    }
                    
                });
        }
    })

    function onDeleteLabel($scope) {
        $leftBox.on('dblclick', 'span', function() {
            $(this).remove();
        });
    };


    function onNextMouseOver($scope) {
        $scope.find('.middle').on('mouseover', '.next', function(e) {
            e.stopPropagation();
            $(this).find('.arrow-right').show();
        });
    }

    function onNextMouseOut($scope) {
        $scope.find('.middle').on('mouseout', '.next', function(e) {
            e.stopPropagation();
            $(this).find('.arrow-right').hide();
        });
    }

    function onPreMouseOver($scope) {
        $scope.find('.middle').on('mouseover', '.prev', function(e) {
            e.stopPropagation();
            $(this).find('.arrow-left').show();
        });
    }

    function onPreMouseOut($scope) {
        $scope.find('.middle').on('mouseout', '.prev', function(e) {
            e.stopPropagation();
            $(this).find('.arrow-left').hide();
        });
    }

    function calculateBoxWhenResize($scope) {
        var $boxContent = $scope.find('.main-img');
        var $img = $boxContent.find('img');
        var height = $boxContent.height();
        var width = $boxContent.width();
        var rate = width / height;
        if(!$img.data('size')) {
            return;
        }
        var imageSize = $img.data('size').split('*');
        var imgWidth = parseInt(imageSize[0]);
        var imgHeight = parseInt(imageSize[1]);
        
        if (imgWidth / imgHeight < rate) {
            $img.css({
                height: '100%',
                'max-height': '640px',
                width: 'auto'
            });
        } else {
            $img.css({
                height: 'auto',
                'max-width': '540px',
                width: '100%'
            });
        }
    }

    function initLabelSuggestion($scope) {
        new Suggestion({
            el: $scope.find('.search-input input'),
            elSuggestBox: $scope.find('.search-input .ui-suggestion'),
            url: '/_bridge/admin/interestcate/listbyname',
            keyName: 'name',
            ajaxType: 'json',
            baseParams: {
                key: '',
                page: 1,
                limit: 20
            },
            tmplSuggestItem: tmplSuggestItem,
            itemSelector: '.item',
            onStart: function() {
                this.$el.parent().addClass('loading');
            },
            onEnd: function() {
                this.$el.parent().removeClass('loading');
            },
            format: function(rs) {
                return rs['data']['resp']['data'];
            },
            itemFormat: function(data) {
                return {
                    id: data['id'],
                    name: data['name'],
                    imgUrl: data['surfaceImg'] || ''
                };
            },
            onItemSelect: function(elItem) {
                var that = this;
                var $item = $(elItem);
                var id = $item.data('id')
                var name = $item.find('.name').text();
                if ($scope.find('.label-box').find('span[data-id=' + id + ']').length >=1) {
                    return utils.bubble('已存在')
                }
                $leftBox.append('<span class="ui teal tag large label" name="newtag" data-id=' + id + ' data-name=' + name + '>' + name + '</span>');
                $item.addClass("animated zoomOutUp");
                $item.remove();
            }
        });
    };

    function initDatePicker($scope) {
        var $date = $scope.find('.filter .date');
        $date.datetimepicker({
            format: 'Y-m-d',
            lang: 'ch',
            maxDate: utils.dateFormat(new Date(), '/'),
            timepicker: false
        });
    };

    function onFilterPanelVisible($scope) {
        $scope.on('click', '.btn-filter, .filter .btn-close, .filter .btn-query', function(e) {
            if($scope.find('.filter').is(':visible')) {
                $scope.find('.filter').hide();
            } else {
                $scope.find('.filter').show();
            }
        });
    };

    function onFilterClick($scope) {
        $scope.on('click', '.btn-query', function(e) {
            var status = $(this).parents('.filter').find('select').val();
            var date = $(this).parents('.filter').find('input').val();
            imagePager.refresh({
                currentPage: 0,
                status: status,
                date: date||undefined            
            })
        });
    };
    
    function onChangeStatus($scope) {
        $scope.on('click', '.status .button', function(e) {
            var status = $(this).data('id');
            var imageData = imagePager.getCurrentRecord();
            var $this = $(this);
            utils.api('/_bridge/admin/atlas/updatestatus', {
                method: 'post',
                data: {
                    id: imageData['id'],
                    status: status
                }
            }).done(function(rs) {
                if(rs['node_code'] == 20000) {
                    utils.bubble('状态已经更新')
                    $this.addClass('positive').siblings().removeClass('positive');
                    imageData['status'] = status;
                    doNext($scope)
                }
            })
        });
    };

    function doNext($scope) {
        if($scope.find('.checkbox').hasClass('pin')) {
            imagePager.next()
        }
    };

    function onAutoFlipClick($scope) {
        $scope.on('click', '.checkbox', function(e) {
            var $this = $(this);
            if($this.hasClass('pin')) {
                $this.removeClass('pin') 
            } else {
                $this.addClass('pin') 
            }
        })
    };

    function _bindEvents($scope) {
        onNext($scope);
        onPrev($scope);
        onSave($scope);
        onSelectLabel($scope);
        onDeleteLabel($scope);
        onNextMouseOver($scope);
        onNextMouseOut($scope);
        onPreMouseOver($scope);
        onPreMouseOut($scope);
        onSubImgSelect($scope);
        onFilterPanelVisible($scope);
        onFilterClick($scope)
        onChangeStatus($scope);
        onAutoFlipClick($scope);
        onRecommend($scope, {
            selector: '.btn-recommend'
        });
    };
    function initImagePager($scope) {
        imagePager = new ImagePager();
    }
    return {
        init: function() {
            $scope = $('.mod-atlas-rel-category');
            $img = $scope.find('.middle .main-img img');
            $leftBox = $scope.find('.middle .middle-bottom .label-box');
            $imageContainter = $scope.find('.all-img-box');
            
            _bindEvents($scope);
            initImagePager($scope);
            initDatePicker($scope)
            initLabelSuggestion($scope);
            $(window).on('resize', function(e) {
                calculateBoxWhenResize($scope);
            });
        }
    }
});