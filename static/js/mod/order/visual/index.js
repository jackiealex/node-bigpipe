define(function() {
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
                });
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

    function onCleanDate($scope) {
        $scope.on('click', '.corner .remove', function(e) {
            $(this).parents('.input').find('input').val('');
        })
    };
    var View = Backbone.View.extend({
        el: null,
        initialize: function(options) {
            this.Diagram = options.Diagram;
        },
        events: {
            'click .btn-today': 'onTodayClick',
            'click .btn-current-week': 'onCurrentWeekClick',
            'click .btn-current-month': 'onCurrentMonthClick',
            'click .btn-date-click': 'onDateIntervalChangeClick'
        },
        onDateIntervalChangeClick: function() {
            var $scope = this.$el;
            var $startDate = $scope.find('.dnu-start');
            var $endDate = $scope.find('.dnu-end');
            var from = $startDate.val(),
                to = $endDate.val()
            var day = from || to;
            if (!from && !to) {
                return utils.bubble('请选择至少一个日期')
            }
            if (from && !to || !from && to || from == to) {
                new this.Diagram({
                    container: $scope.find('.diagram-box')[0],
                    day: day
                });
            } else {
                new this.Diagram({
                    container: $scope.find('.diagram-box')[0],
                    from: from,
                    to: to
                });
            }
        },
        onCurrentMonthClick: function() {
            var $scope = this.$el;
            var $startDate = $scope.find('.dnu-start');
            var $endDate = $scope.find('.dnu-end');
            var year = (new Date).getFullYear();
            var month = (new Date).getMonth() + 1;
            var lastDay = (new Date(year, month, 0)).getDate();
            var from = utils.dateFormat([year, month, 1].join('-')),
                to = utils.dateFormat([year, month, lastDay].join('-'));
            $startDate.val(from);
            $endDate.val(to);
            new this.Diagram({
                container: this.$el.find('.diagram-box')[0],
                durationType: 'month',
                from: from,
                to: to
            });
        },
        onCurrentWeekClick: function() {
            var $startDate = this.$el.find('.dnu-start');
            var $endDate = this.$el.find('.dnu-end');
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
            new this.Diagram({
                container: this.$el.find('.diagram-box')[0],
                durationType: 'week',
                from: from,
                to: to
            });
        },
        onTodayClick: function($scope) {
            var $startDate = this.$el.find('.dnu-start');
            var $endDate = this.$el.find('.dnu-end');
            var from = utils.dateFormat(new Date())
            var to = utils.dateFormat(new Date());
            $startDate.val(from);
            $endDate.val(to);
            new this.Diagram({
                container: this.$el.find('.diagram-box')[0],
                from: from,
                durationType: 'day',
                to: to
            });
        }
    });
    return {
        init: function() {
            var query = utils.queryString(location.search);
            var type = query['type'] || 'cash';
            var $scope = $('.mod-order-visual');
            require(['mod/order/visual/diagram-' + type], function(Diagram) {
                var view = new View({
                    el: $scope,
                    Diagram: Diagram
                });
                initDatePicker($scope);
                (function() {
                    $scope.find('.btn-current-week').click();
                })();
            })
        }
    };
});