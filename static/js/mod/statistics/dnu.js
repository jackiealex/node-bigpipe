define(['ec/echarts-all'], function() {

    var urlMap = {
        newuser: {
            urlForOneDay: '/_bridge/admin/userstatistics/forhours',
            urlForDays: '/_bridge/admin/userstatistics/fordays'
        },
        active: {
            urlForOneDay: '/_bridge/admin/userecord/forhours',
            urlForDays: '/_bridge/admin/userecord/fordays'
        },
        atlas: {
            urlForOneDay: '/_bridge/admin/atlasstatistics/forhours',
            urlForDays: '/_bridge/admin/atlasstatistics/fordays'
        }
        
    };

    function Diagram(opts) {
        opts = $.extend({
            container: null,
            from: '',
            to: '',
            day: '',
            timeType: '',
            urlForOneDay: '/_bridge/admin/userstatistics/forhours',
            urlForDays: '/_bridge/admin/userstatistics/fordays',
            url: ''
        }, opts, urlMap[$('.mod-dnu').data('type')]);
        this.options = opts;
        this.processParams();
        this.init();
    };
    $.extend(Diagram.prototype, {
        init: function() {
            this.render();
        },
        processParams: function() {
            var opts = this.options;
            var from = opts['from'];
            var to = opts['to'];
            var day = opts['day'];
            // day day value is not empty or from = end
            if (day || (from == to && from)) {
                opts['url'] = opts['urlForOneDay'];
                opts['day'] = day ? utils.dateFormat(day) : from;
            } else {
                opts['url'] = opts['urlForDays'];
            }
        },
        render: function() {
            var _this = this;
            var opts = this.options
            var container = opts.container;
            var myChart = echarts.init(container);
            this.fetchData(function(rs) {
                var from = opts['from'];
                var to = opts['to'];
                var url = opts['url'];
                var day = opts['day'];
                var option = {
                    tooltip: {
                        show: true
                    },
                    legend: {
                        data: ['变化趋势']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            // mark : {show: true},
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    yAxis: [{
                        type: 'value'
                    }]
                };
                var xAxis = day ? utils.getHoursOfDay() : utils.getDaysArray(+new Date(from), +new Date(to));
                if(opts.timeType == 'week') {
                    xAxis = utils.getDaysOfWeek()
                }
                option['xAxis'] = [{
                    type: "category",
                    data: xAxis
                }];
                option['series'] = [{
                    name: "新增量",
                    type: 'bar',
                    calculable: true,
                    markPoint: {
                        data: [{
                            type: 'max',
                            name: '最大值'
                        }, {
                            type: 'min',
                            name: '最小值'
                        }]
                    },
                    markLine: {
                        data: [{
                            type: 'average',
                            name: '平均值'
                        }]
                    },
                    data: rs['data']['resp']['data']
                }];
                myChart.setOption(option);
            });
        },
        fetchData: function(callback) {
            var opts = this.options;
            var container = opts['container'];
            var from = opts['from'];
            var to = opts['to'];
            var url = opts['url'];
            var day = opts['day'];

            var $loading = null
            $loading = utils.loading();
            utils.api(url, {
                method: 'get',
                data: {
                    from: from,
                    to: to,
                    day: day,
                    type: opts['type']
                }
            }).done(function(rs, succ) {
                if(rs['node_code'] != 20000) {
                    $loading.remove()
                    return utils.bubble(rs['data']['msg'])
                }
                callback(rs)
                $loading.remove()
            });
            
        },
        setUrl: function(url) {
            this.options['url'] = url;
        }
    });

    function initDatePicker($scope) {
        var $startDate = $scope.find('.dnu-start');
        var $endDate = $scope.find('.dnu-end');
        $startDate.datetimepicker({
            format: 'Y-m-d',
            lang: 'ch',
            maxDate: utils.dateFormat(new Date(), '/'),
            onShow: function(ct) {
                var endDate = $endDate.val();
                this.setOptions({
                    maxDate: endDate ? utils.dateFormat(endDate, '/') : false
                })
            },
            timepicker: false
        });
        $endDate.datetimepicker({
            format: 'Y-m-d',
            lang: 'ch',
            minDate: false,
            maxDate: utils.dateFormat(new Date(), '/'),
            onChangeDateTime: function() {},
            onShow: function(ct) {
                var minDate = false;
                var startDate = $startDate.val();
                this.setOptions({
                    minDate: startDate ? utils.dateFormat(startDate, '/') : false
                })
            },
            timepicker: false
        });
    };

    function onDateIntervalChangeClick($scope) {
        var $startDate = $scope.find('.dnu-start');
        var $endDate = $scope.find('.dnu-end');
        $scope.on('click', '.btn-date-click', function(e) {
            var from = $startDate.val(),
                to = $endDate.val()
            var day = from || to;
            if(!from && !to) {
                return utils.bubble('请选择至少一个日期')
            }
            if (from && !to || !from && to || from == to) {
                new Diagram({
                    container: $scope.find('.diagram-box')[0],
                    day: day
                });
            } else {
                new Diagram({
                    container: $scope.find('.diagram-box')[0],
                    from: from,
                    to: to
                });
            }
        })
    };

    function onCleanDate($scope) {
        $scope.on('click', '.corner .remove', function(e) {
            $(this).parents('.input').find('input').val('');
        })
    };

    function onCurrentMonthClick($scope) {
        $scope.on('click', '.btn-current-month', function(e) {
            var $startDate = $scope.find('.dnu-start');
            var $endDate = $scope.find('.dnu-end');
            var year = (new Date).getFullYear();
            var month = (new Date).getMonth() + 1;
            var lastDay = (new Date(year, month, 0)).getDate();
            var from = utils.dateFormat([year, month, 1].join('-')),
                to = utils.dateFormat([year, month, lastDay].join('-'));
            $startDate.val(from);
            $endDate.val(to);
            new Diagram({
                container: $scope.find('.diagram-box')[0],
                from: from,
                to: to
            });
        });
    };

    function onCurrentWeekClick($scope) {
        $scope.on('click', '.btn-current-week', function(e) {
            var $startDate = $scope.find('.dnu-start');
            var $endDate = $scope.find('.dnu-end');
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var dayOfWeek = date.getDay();
            var monday = dayOfWeek - 1 ;
            var sunday = 7 - dayOfWeek;
            var dayMillSeconds = 1000 * 3600 * 24;
            var from = utils.dateFormat(+date-monday * dayMillSeconds);
            var to = utils.dateFormat(+date+sunday * dayMillSeconds);

            $startDate.val(from);
            $endDate.val(to);
            new Diagram({
                container: $scope.find('.diagram-box')[0],
                timeType: 'week',
                from: from,
                to: to
            });
        });
    };

    function onTodayClick($scope) {
        $scope.on('click', '.btn-today', function(e) {
            var $startDate = $scope.find('.dnu-start');
            var $endDate = $scope.find('.dnu-end');
            var from = utils.dateFormat(new Date())
            var to = utils.dateFormat(new Date());
            $startDate.val(from);
            $endDate.val(to);
            new Diagram({
                container: $scope.find('.diagram-box')[0],
                day: new Date()
            });
        });
    };

    function _bindEvents($scope) {
        onDateIntervalChangeClick($scope);
        onCurrentMonthClick($scope);
        onCurrentWeekClick($scope);
        onTodayClick($scope);
        onCleanDate($scope);
    };
    return {
        init: function() {
            var $scope = $('.mod-dnu');
            _bindEvents($scope);
            initDatePicker($scope);
            // to click current month
            (function() {
                $scope.find('.btn-current-week').click();
            })()
        }
    };
});