define(['ec/echarts-all'], function() {
    function getVersionArray(data) {
        var rsMap = {};
        var length = data.length;
        for (var i = 0; i < data.length; i++) {
            var dayVersions = data[i];
            for (var j = 0; j < dayVersions.length; j++) {
                if (dayVersions.length > 0  ) {

                    var version = dayVersions[j];
                    var versionName = version[0];
                    if (!rsMap[versionName]) {
                        rsMap[versionName] = Array.apply(null, Array(length)).map(Number.prototype.valueOf, 0);
                    }
                    rsMap[versionName][i] = version[1]
                }
            };
        };
        return rsMap;
    };

    function Diagram(opts) {
        opts = $.extend({
            container: null,
            from: '',
            to: '',
            url: '/_bridge/admin/userstatistics/alldata',
            type: 1
        }, opts);
        this.options = opts;
        this.init();
    };
    $.extend(Diagram.prototype, {
        init: function() {
            this.render();
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
                var iType = opts['type'];
                var result = rs['data']['resp']['data'];
                var resArr = [];
                var dataArr = [];
                var versionArray = [];
                if (iType == 1) {
                    versionArray = getVersionArray(result);
                    for (var everyData in versionArray) {
                        resArr.push({
                            name: everyData, // 系列名称
                            type: 'line', // 图表类型，折线图line、散点图scatter、柱状图bar、饼图pie、雷达图radar
                            data: versionArray[everyData],
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
                            }
                        });
                        dataArr.push(everyData);
                    }
                    if (from == to && resArr.length == 0) {
                        return utils.bubble("您查询的当天没有数据");
                    }
                    var option = {
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            data: dataArr
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {
                                    show: true,
                                    readOnly: false
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
                    var xAxis = utils.getDaysArray(+new Date(from), +new Date(to));

                    if (opts.timeType == 'week') {
                        xAxis = utils.getDaysOfWeek()
                    }
                    option['xAxis'] = [{
                        type: "category",
                        data: xAxis
                    }];
                    option['series'] = resArr;
                } else if (iType == 2) {
                    var cityArr = [];
                    var name = '';
                    var sum = 0;
                    for (var i = 0; i < result.length; i++) {
                        cityArr.push({
                            name: getCityName(result[i][0]),
                            value: result[i][1]
                        });
                    }
                     
                    option = {
                        tooltip: {
                            trigger: 'item'
                        },
                        dataRange: {
                            min: 0,
                            max: 3000,
                            color: ['#FF0000', '#FFCC00'],
                            x: 'left',
                            y: 'bottom',
                            text: ['高', '低'], // 文本，默认为数值文本
                            calculable: true
                        },
                        toolbox: {
                            show: true,
                            orient: 'vertical',
                            x: 'right',
                            y: 'center',
                            feature: {
                                dataView: {
                                    show: true,
                                    readOnly: false
                                },
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        roamController: {
                            show: true,
                            x: 'right',
                            mapTypeControl: {
                                'china': true
                            }
                        },
                        series: [{
                            name: name,
                            type: 'map',
                            mapType: 'china',
                            data: cityArr,
                            roam: true,
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            }
                        }]
                    };
                }
                myChart.setOption(option);
            });
        },
        fetchData: function(callback) {
            var opts = this.options;
            var container = opts['container'];
            var from = opts['from'];
            var to = opts['to'];
            var url = opts['url'];
            var $loading = null
            $loading = utils.loading();
            utils.api(url, {
                method: 'get',
                data: {
                    from: from,
                    to: to,
                    type: opts['type']
                }
            }).done(function(rs, succ) {
                if (rs['node_code'] != 20000) {
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

    function getCityName(name) {
        if (name == null) {
            name = '北京'
        }
        switch (name.substring(0, 2)) {
            case "北京":
                return "北京";
                break;
            case "天津":
                return "天津";
                break;
            case "河北":
                return "河北";
                break;
            case "山西":
                return "山西";
                break;
            case "山东":
                return "山东";
                break;
            case "河南":
                return "河南";
                break;
            case "陕西":
                return "陕西";
                break;
            case "辽宁":
                return "辽宁";
                break;
            case "吉林":
                return "吉林";
                break;
            case "内蒙":
                return "内蒙古";
                break;
            case "黑龙":
                return "黑龙江";
                break;
            case "江苏":
                return "江苏";
                break;
            case "安徽":
                return "安徽";
                break;
            case "湖北":
                return "湖北";
                break;
            case "重庆":
                return "重庆";
                break;
            case "上海":
                return "上海";
                break;
            case "浙江":
                return "浙江";
                break;
            case "江西":
                return "江西";
                break;
            case "湖南":
                return "湖南";
                break;
            case "贵州":
                return "贵州";
                break;
            case "福建":
                return "福建";
                break;
            case "广东":
                return "广东";
                break;
            case "广西":
                return "广西";
                break;
            case "宁夏":
                return "宁夏";
                break;
            case "四川":
                return "四川";
                break;
            case "云南":
                return "云南";
                break;
            case "台湾":
                return "台湾";
                break;
            case "香港":
                return "香港";
                break;
            case "澳门":
                return "澳门";
                break;
            case "海南":
                return "海南";
                break;
            case "甘肃":
                return "甘肃";
                break;
            case "青海":
                return "青海";
                break;
            case "西藏":
                return "西藏";
                break;
            case "新疆":
                return "新疆";
                break;
            default:
                return "北京";
                break;
        }
    }

    function initDatePicker($scope) {
        var $startDate = $scope.find('.statistics-start');
        var $endDate = $scope.find('.statistics-end');
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
        var $startDate = $scope.find('.statistics-start');
        var $endDate = $scope.find('.statistics-end');
        $scope.on('click', '.btn-date-click', function(e) {
            var from = $startDate.val(),
                to = $endDate.val()
            var day = from || to;
            if (!from && !to) {
                return utils.bubble('请选择至少一个日期')
            }
           
            new Diagram({
                container: $scope.find('.diagram-box')[0],
                from: from,
                to: to,
                type: $('.mod-statistics').data('type')
            });
       
        })
    };

    function onCleanDate($scope) {
        $scope.on('click', '.corner .remove', function(e) {
            $(this).parents('.input').find('input').val('');
        })
    };

    function onCurrentMonthClick($scope) {
        $scope.on('click', '.btn-current-month', function(e) {
            var $startDate = $scope.find('.statistics-start');
            var $endDate = $scope.find('.statistics-end');
            var year = (new Date).getFullYear();
            var month = (new Date).getMonth() + 1;
            var lastDay = (new Date(year, month, 0)).getDate();
            var from = utils.dateFormat([year, month, 1].join('-')),
                to = utils.dateFormat([year, month, lastDay].join('-'));
            $startDate.val(from);
            $endDate.val(to);
            new Diagram({
                container: $scope.find('.diagram-box')[0],
                url: $scope.data('type') == 1 ? '/_bridge/admin/userstatistics/userstatistics' : undefined,
                from: from,
                to: to,
                type: $('.mod-statistics').data('type')
            });
        });
    };

    function onCurrentWeekClick($scope) {
        $scope.on('click', '.btn-current-week', function(e) {
            var $startDate = $scope.find('.statistics-start');
            var $endDate = $scope.find('.statistics-end');

            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var dayOfWeek = date.getDay();
            var monday = dayOfWeek - 1;
            var sunday = 7 - dayOfWeek;
            var dayMillSeconds = 1000 * 3600 * 24;
            var from = utils.dateFormat(+date - monday * dayMillSeconds);
            var to = utils.dateFormat(+date + sunday * dayMillSeconds);
            $startDate.val(from);
            $endDate.val(to);
            new Diagram({
                container: $scope.find('.diagram-box')[0],
                timeType: 'week',
                url: $scope.data('type') == 1 ? '/_bridge/admin/userstatistics/userstatistics' : undefined,
                type: $scope.data('type'),
                from: from,
                to: to
            });
        });
    };

    function onTodayClick($scope) {
        $scope.on('click', '.btn-today', function(e) {
            var $startDate = $scope.find('.statistics-start');
            var $endDate = $scope.find('.statistics-end');
            var from = utils.dateFormat(new Date())
            var to = utils.dateFormat(new Date());
            $startDate.val(from);
            $endDate.val(to);
            new Diagram({
                container: $scope.find('.diagram-box')[0],
                url: $scope.data('type') == 1 ? '/_bridge/admin/userstatistics/userstatistics' : undefined,
                from: from,
                to: to,
                type: $('.mod-statistics').data('type')
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
            var $scope = $('.mod-statistics');
            _bindEvents($scope);
            initDatePicker($scope);
            // to click current month
            (function() {
                $scope.find('.btn-current-week').click();
            })();

            // var type = $scope.data('type');
            $scope.find('.btn-today').hide();
        }
    };
});