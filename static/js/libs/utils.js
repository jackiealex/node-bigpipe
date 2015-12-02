(function(exports) {
	exports.utils =  {
		nextTick: function(fn, delay) {
			setTimeout(function() {
				fn()
			}, delay || 0);
		},
		bubble: function(text, delay) {
			if(Notification) {
				if (Notification.permission !== "granted") {
				    Notification.requestPermission();
				} else {
					var text = $('<div />').html(text).text();
					var no = new Notification('通知', {
						icon: __uri('/static/img/logo.png'),
						body: text
				    });
					return utils.nextTick(function() {
						no.close()
					}, 4* 1000);
				}
			}
			var $bubble = $('<div class="bubble"/>').html(text);
			$('body').append($bubble);
			utils.nextTick(function() {
				$bubble.addClass('slide-down');
			});
			utils.nextTick(function() {
				$bubble
				.animate({
					opacity: 0.62
				}, 2000)
				.animate({
					top: -10,
				}, function() {
					this.remove()
				});
			}, 1000);
			
		},
		createElementTip: function (el, opts) {
			var position = $(el).offset();
			var tmpl = [
				'<div class="widget-tip">',
				opts.text || '',
				'</div>'
			].join('')
			var $item = $(tmpl);
			$('body').append($item .css(position));
			setTimeout(function  (e) {
				$item.addClass('animated fadeOutUp').on(_VENDOR_ + 'AnimationEnd', function  (e) {
					$(this).remove();
				})

			}, 1800);
		},
		xTemplate: function(tmpl, obj) {
			return _.template(tmpl).call(obj, obj);
		},
		queryString: function (str) {
			if (typeof str !== 'string') {
				return {};
			}

			str = str.trim().replace(/^(\?|#|&)/, '');

			if (!str) {
				return {};
			}

			return str.split('&').reduce(function (ret, param) {
				var parts = param.replace(/\+/g, ' ').split('=');
				var key = parts[0];
				var val = parts[1];

				key = decodeURIComponent(key);
				// missing `=` should be `null`:
				// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
				val = val === undefined ? null : decodeURIComponent(val);

				if (!ret.hasOwnProperty(key)) {
					ret[key] = val;
				} else if (Array.isArray(ret[key])) {
					ret[key].push(val);
				} else {
					ret[key] = [ret[key], val];
				}

				return ret;
			}, {});
		},
		JSONParse: function(string) {
			return (new Function('return ' + string))();
		},
        api: function(url, opts) {
            var def = $.Deferred();
            opts = $.extend({
                method: 'get',
                dataType: 'json',
                data: {},
                onError: function(rs) {
                	var msg = rs['msg'] + ' =:= ' + JSON.stringify(opts.data);
                	if(rs['data']) {
                		rs['data']['msg'] || '操作异常了'
                	}
                    utils.bubble(msg);
                    return;
                }
            }, opts);
            $.ajax({
                method: opts['method'],
                dataType: opts['dataType'],
                url: url,
                data: opts['data'],
                success: function(rs, succ) {
                	if (opts['dataType'] == 'text') {
                		return def.resolve.apply(null, arguments);
                	}
                    if (rs['node_code'] != 20000) {
                        opts.onError(rs)
                    }
                    def.resolve(rs);
                },
                error: function(e, opts) {
                    utils.bubble('请求错误');
                	def.resolve.apply(null, arguments);
                }
            });
            return def.promise();
        },
        openWindow: function(state) {
        	var $body = $('body');
        	_SmartPipe_.doPipeRequest(state);
            var tmpl = [
                '<div id="window">',
                '<div class="win-close"><i class="remove large icon"></i></div>',
                '<div class="win-content">loading......</div>',
                '</div>'
            ].join('');
            $body.append(tmpl);
            $body.on('click', '#window .win-close', function() {
                $('#window').remove();
            });
        },
		loading: function() {
			var $loading = $('<div class="widget-loading" />');
			$('body').append($loading);
			return {
				remove: function() {
					$('.widget-loading').remove()
				}
			}
		},
		getHoursOfDay: function() {
		    var rs = [];
		    for(var i=1; i <=24; i++) {
		        rs.push(i + '时');
		    };
		    return rs;
		},
		getDaysOfWeek: function() {
			return ["一","二","三","四","五","六","日"];
		},
		getMonthLastDay: function(date) {
		    var d = new Date(date.getFullYear(), date.getDate() + 1, 1);
		    d = +d - 3600 * 1000 * 24;
		    return dateFormat(d);
		},
		offsetNumber: function(num, char) {
		    if(!char) {
		        char = '0';
		    }
		    if((num + '').length<2) {
		        return char + '' + num;
		    }
		    return num;
		},
		getDaysArray: function(from, to) {
			if(typeof from == 'string') {
				from = +new Date(from)
			}

			if(typeof to == 'string') {
				to = +new Date(to)
			}
	        var day = 3600 * 1000 * 24;
	        var rs = [];
	        for (var i = from; i <= to; i+=day) {
	            rs.push(utils.dateFormat(i));
	        };
	        return rs;
	    },
		dateFormat: function(date, joint) {
		    if(!joint) {
		        joint = '-';
		    }
		    var d = new Date(date);
		    var str = [
		        d.getFullYear(),
		        utils.offsetNumber(d.getMonth() + 1),
		        utils.offsetNumber(d.getDate())
		    ].join(joint);
		    return str;
		},
		dateTimeFormat: function(date) {
		    
		    var d = new Date(date);
		    var dateStr = [
		        d.getFullYear(),
		        utils.offsetNumber(d.getMonth() + 1),
		        utils.offsetNumber(d.getDate())
		    ].join('/');
		    var timeStr = [
		        utils.offsetNumber(d.getHours()),
		        utils.offsetNumber(d.getMinutes())
		    ].join(':');
		    return dateStr + ' ' + timeStr;
		}
		
	}
})(window);