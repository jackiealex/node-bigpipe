define(function() {

    var detailTmpl = [
        '<tr class="detail " data-id="<%= order.id %>">',
        '    <td  colspan="7" style="padding: 0; height:10px" >',
        '       <div class="triangle"></div>',
        '        <div class="box">',
        '            <div class="close">╳</div>',
        '            <ul>',
        '                <li class="u2u">',
        '                    <div class="who">',
        '                        <a href="http://share.vsingapp.com/profile/?uid=<%= listener.id %>" target="_blank"><img src="<%= listener.headPortrait %>" alt=""></a>',
        '                        <div class="info">',
        '                           <p><%= listener.nickname || listener.username %></p>',
        '                           <p class="user-property"><span class="sex"><%= listener.gender = "male" ? "♂": "♀" %></span><%= listener.age %>岁</p>',
        '                           <p class="user-property"><%= listener.astrological %></p>',
        '                        </div>',
        '                    </div>',
        '                    <div class="txt-words">',
        '                    <% if(!order.song) { %>',
        '                                想',
        '                    <% } %>               ',
        '                    听</div>',
        '                    <div class="who">',
        '                        <a href="http://share.vsingapp.com/profile/?uid=<%= singer.id %>" target="_blank"><img src="<%= singer.headPortrait %>" alt=""></a>',
        '                        <div class="info">',
        '                           <p><%= singer.nickname || singer.username %></p>',
        '                           <p class="user-property"><span class="sex"><%= singer.gender = "male" ? "♂": "♀" %></span><%= singer.age %>岁</p>',
        '                           <p class="user-property"><%= singer.astrological %></p>',
        '                        </div>',
        '                    </div>',
        '                    <% if(!order.song) { %>',
        '                    <div class="txt-words end">唱歌</div>',
        '                    <% } else { %>               ',
        '                    <div class="txt-words end">',
        '                    唱了一首歌《<a href="<%= order.song && order.song.fileUrl || accompany.audioUrl %>" target="_blank" ><%= accompany.name %></a>》（点击试听）',
        '                    </div>',
        '                    <% } %>               ',
        '                </li>',
        '                <%if(order.comment) {%>',
        '                <li class="comment">',
        '                    <h4><%= listener.nickname %>说：</h4>',
        '                    <p><%= order.comment %></p>',
        '                </li>',
        '                <%}%>',
        '                <li class="song">',
        '                    <h4>歌曲／伴奏／歌词</h4>',
        '                    <p>',
        '                        <a class="btn-song" data-url="<%= order.song && order.song.fileUrl%>" target="_blank">歌曲链接</a>',
        '                        <a href="<%= accompany.audioUrl %>" target="_blank"><%= accompany.name %></a>',
        '                        <a href="<%= accompany.lyricUrl %>" target="_blank">歌词</a>',
        '                    </p>',
        '                </li>',
        '                <li>',
        '                    <a class="green ui button" href="/chart/<%= order.id %>/detail">查看聊天</a>',
        '                </li>',
        '            </ul>',
        '        </div>',
        '    </td>',
        '</tr>',
    ].join('');

    function showDetail($scope) {
        $scope.on('click', 'table tr.row:not(.detail)', function(el) {
            var oID = $(this).data('id');
            var accompanyID = $(this).data('accompanyid');
            var listenerID = $(this).find('.listener').data('id');
            var singerID = $(this).find('.singer').data('id');
            var $oldDetails = $scope.find('tr.detail');
            var $loading = utils.loading();
            var _this = this;
            $.when(
                utils.api('/_bridge/order/' + oID + '/admin', {}),
                utils.api('/_bridge/accompany/' + accompanyID + '/admin', {}),
                utils.api('/_bridge/user/' + listenerID + '/admin', {}),
                utils.api('/_bridge/user/' + singerID + '/admin', {})
            ).done(function(rsOrder, rsAccompany, rsListener, rsSinger) {

                var order = rsOrder['data']['resp']['order'] || {};
                var accompany = rsAccompany['data']['resp']['accompany'] || {};
                var listener = rsListener['data']['resp']['user'] || {};
                var singer = rsSinger['data']['resp']['user'] || {};

                var html = _.template(detailTmpl)({
                    order: order,
                    accompany: accompany,
                    listener: listener,
                    singer: singer
                });
                $(html).insertAfter(_this);
                $oldDetails.remove();
                $loading.remove()
            });

        });

        $scope.on('click', '.detail .close', function(el) {
            $(this).hide();
            $(this).parents('tr').find('.box').animate({height: 0}, 300, function (e) {
                $(this).parents('tr').remove();
            })
        });

    };

    function onPlayerSong ($scope) {
        $scope.on('click', '.detail .btn-song', function(e) {
            var self = this;
            require(['mod/common/widget/player/mini-player'], function  (miniPlayer) {
                var url = $(e.target).data('url');
                if(!url) {
                    return utils.bubble('空的链接')
                }
                miniPlayer.setUrl(url).play();
                miniPlayer.setDomContent({
                    src: $(self).parents('.detail').find('.who img').attr('src'),
                    author: $(self).parents('.detail').find('.who .info').eq(1).find('p').text(),
                    title: $(self).parents('.detail').find('.txt-words.end a').text()
                });
            })
        });
    }

    function search($scope) {

        $scope.on('change', '.header select', function(e) {
            var name = $(this).parents('.header').find('input').val();
            var status = $(this).val();
            _SmartPipe_.location('/order/list?key=' + name + '&status=' + status);
        });

        $scope.on('click', '.header .button', function(e) {
            var name = $(this).parents('.header').find('input').val();
            var status = $(this).parents().find('select').val();
            _SmartPipe_.location('/order/list?key=' + name + '&status=' + status);
        });

        $scope.on('click', '.header .input .remove', function(e) {
            _SmartPipe_.location('/order/list');
        });

        $scope.on('keyup', '.header .input input', function(e) {
            if (e.keyCode == 13) {
                $(this).parents('.header').find('.button').trigger('click');
            }
        });
    };

    function _bindEvents($scope) {
        showDetail($scope);
        onPlayerSong($scope)
        search($scope);
    };

    return {
        init: function() {
            var $scope = $('.mod-order-list');
            require(['mod/common/widget/player/mini-player'], function  (miniPlayer) {
                
            })
            _bindEvents($scope)
        }
    }
});