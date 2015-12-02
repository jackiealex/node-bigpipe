define(function() {
    function Player(opts) {
        this.audio = new Audio();
        this.initailize()
        this.eventDelegator = {};
    };
    function time2str(time) {
        var floor, hour, minute, pad, r, second;
        r = [];
        floor = Math.floor;
        time = Math.round(time);
        hour = floor(time / 3600);
        minute = floor((time - 3600 * hour) / 60);
        second = time % 60;
        pad = function(source, length) {
            var nagative, pre, str;
            pre = '';
            nagative = '';
            if (source < 0) {
                nagative = '-';
            }
            str = String(Math.abs(source));
            if (str.length < length) {
                pre = new Array(length - str.length + 1).join('0');
            }
            return nagative + pre + str;
        };
        if (hour) {
            r.push(hour);
        }
        r.push(pad(minute, 2));
        r.push(pad(second, 2));
        return r.join(':');
    }
    $.extend(Player.prototype, {
        initailize: function() {
            this._bindEvents();
            this._bindElementsEvents();
            var _this = this;
            $('.widget-mini-player').find('.btn-play').on('click', function(e) {
                if (_this.audio.paused) {
                    _this.audio.play();
                } else {
                    _this.audio.pause();
                }
            });
        },
        _bindElementsEvents: function(e) {
            $('.widget-mini-player').find('.player-pan').on('click', function function_name(e) {
                if ($('.widget-mini-player').hasClass('none')) {
                    $('.widget-mini-player').removeClass('none')
                } else {
                    $('.widget-mini-player').addClass('none')
                }
            });
        },
        _bindEvents: function(e) {
            var events = ['abort', //	Fires when the loading of an audio/video is aborted
                'canplay', //	Fires when the browser can start playing the audio/video
                'canplaythrough', //	Fires when the browser can play through the audio/video without stopping for buffering
                'durationchange', //	Fires when the duration of the audio/video is changed
                'emptied', //	Fires when the current playlist is empty
                'ended', //	Fires when the current playlist is ended
                'error', //	Fires when an error occurred during the loading of an audio/video
                'loadeddata', //	Fires when the browser has loaded the current frame of the audio/video
                'loadedmetadata', //	Fires when the browser has loaded meta data for the audio/video
                'loadstart', //	Fires when the browser starts looking for the audio/video
                'pause', //	Fires when the audio/video has been paused
                'play', //	Fires when the audio/video has been started or is no longer paused
                'playing', //	Fires when the audio/video is playing after having been paused or stopped for buffering
                'progress', //	Fires when the browser is downloading the audio/video
                'ratechange', //	Fires when the playing speed of the audio/video is changed
                'seeked', //	Fires when the user is finished moving/skipping to a new position in the audio/video
                'seeking', //	Fires when the user starts moving/skipping to a new position in the audio/video
                'stalled', //	Fires when the browser is trying to get media data, but data is not available
                'suspend', //	Fires when the browser is intentionally not getting media data
                'timeupdate', //	Fires when the current playback position has changed
                'volumechange', //	Fires when the volume has been changed
                'waiting' //	Fires when the video stops because it needs to buffer the next frame
            ];
            var self = this;
            for (var i = 0; i < events.length; i++) {
                this.audio.addEventListener(events[i], function(e) {
                    $(self.eventDelegator).trigger(e.type, e)
                });
            }
        },
        play: function() {
            this.audio.play();
        },
        pause: function(e) {},
        setUrl: function(url) {
            this.audio.src = url;
            return this;
        },
        setDomContent: function(opts) {
            var $el = $('.widget-mini-player');
            $el.find('.player-info h2').text(opts['title'])
            $el.find('.player-info .author').text(opts['author'])
            
            $el.find('.poster').attr('src', opts['src'])
        },
        on: function(type, handler) {
            var self = this;
            $(this.eventDelegator).on(type, function(e) {
                handler.call(self, e)
                console.log(e)
            });
        },
    });
    var player = new Player();
    player.on('timeupdate', function(e) {
        var audio = this.audio;
        var currentTime = audio.currentTime;
        var duration = audio.duration;
        var per = currentTime / (duration || 1);

        
        $('.widget-mini-player').find('.player-progress .stick').width(per * 100 + '%');
        $('.widget-mini-player').find('.player-info .cur').text(time2str(currentTime));
        $('.widget-mini-player').find('.player-info .total').text(time2str(duration))
        // body...
    });
    player.on('play', function(e) {
        $('.widget-mini-player').find('.btn-play').addClass('btn-pause')
        // $('.widget-mini-player').find('.player-info .total').text(time2str(this.audio.duration))
        // body...
    });
    player.on('pause ended ', function(e) {
        $('.widget-mini-player').find('.btn-play').removeClass('btn-pause')
        // body...
    });
    return player
})