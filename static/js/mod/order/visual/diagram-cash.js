define(['ec/echarts-all'], function() {
    function Diagram(opts) {
        opts = $.extend({
            container: null,
            from: '2015-9-14',
            to: '2015-10-14',
            url: '/_bridge/order/statistics/counts'
        }, opts);
        this.options = opts;
        this.init();
    };
    $.extend(Diagram.prototype, {
        init: function() {
            this.render();
        },
        formatResponseData: function(rs) {
            var list = rs['data']['resp']['data'];
            var series = [];
            var legend = [];
            this.legend = legend;
            var statusMap = {
                '-1': '未付款',
                '0': '订单初始化',
                '1': '买家已付款',
                '2': '卖家接受邀请',
                '3': '卖家拒绝',
                '4': '接受超时',
                '5': '卖家发货',
                '6': '买家已确认',
                '7': '发货超时',
                '8': '举报退款'
            };
            for (var i = -1; i < 9; i++) {
                var name = statusMap[i];
                legend.push(name);
                var statusItemViewData = {
                    name: name,
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'insideRight'
                            }
                        }
                    },
                    data: []
                };
                series.push(statusItemViewData);
            };
            for (var i = 0; i < list.length; i++) {
                var dayData = list[i];
                for (var j = 0; j < dayData.length; j++) {
                    var statusItem = series[j];
                    statusItem['data'].push(dayData[j] || '');
                };
            };
            // console.log(JSON.stringify(series));
            return series;
        },
        render: function() {
            var _this = this;
            var opts = this.options
            var container = opts.container;
            var days = utils.getDaysArray(_this.options['from'], _this.options['to'])
            $('.mod-order-visual').find('.diagram-box').height(days.length * 48);
            var myChart = echarts.init(container);
            myChart.on('DATA_RANGE', function(e) {
                var option = this.getOption();
                var index = e.seriesIndex;
                var data = option['series'][index]['data'];
                var sum = 0;
                for (var i = 0; i < data.length; i++) {
                    sum += data[i];
                }
                // utils.bubble(sum);
            });
            this.fetchData(function(rs) {
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        // orient: 'vertical',
                        // x: 'left',
                        data: []
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        y: 'center',
                        feature: {
                            mark: {
                                show: true
                            },
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
                    calculable: true,
                    xAxis: [{
                        type: 'value'
                    }],
                    yAxis: [{
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }],
                    series: []
                };
                option['series'] = _this.formatResponseData(rs);
                option['legend'] = {
                    // orient: 'vertical',
                    // x: 'left',
                    data: _this.legend
                }
                if (_this.options.durationType != 'week') {
                    option['yAxis'] = [{
                        type: 'category',
                        data: days
                    }]
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
            var $loading = utils.loading()
            utils.api(url, {
                data: {
                    startDay: from,
                    endDay: to
                }
            }).done(function(rs, succ) {
                if (rs['node_code'] != 20000) {
                    $loading.remove()
                    return utils.bubble(rs['data']['msg'])
                }
                callback(rs);
                $loading.remove()
            });
        }
    });
    return Diagram;
})