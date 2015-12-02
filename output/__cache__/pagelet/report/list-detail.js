module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<tr class="detail" >\n    <td  colspan="7" style="padding: 0; height:10px" >\n       <div class="triangle"></div>\n        <div class="box">\n            <div class="close">x</div>\n            <ul>\n                <li class="u2u">\n                    <div class="who">\n                        <a href="http://share.vsingapp.com/profile/?uid=';
$_output_ += reporter.id;
$_output_ += '" target="_blank"><img src="';
$_output_ += reporter.headPortrait;
$_output_ += '" alt=""></a>\n                        <div class="info">\n                           <p>';
$_output_ += reporter.nickname;
$_output_ += '</p>\n                           <p class="user-property"><span class="sex">\n                           ';
 if(reporter.gender == 'male') {
$_output_ += ' ♂ ';
} else {
$_output_ += ' ♀ ';
 } 
$_output_ += '</span>';
$_output_ += reporter.age;
$_output_ += '岁</p>\n                           <p class="user-property">';
$_output_ += reporter.astrological;
$_output_ += '</p>\n                       </div>\n                    </div>\n                    <div class="txt-words">举报了</div>\n                    <div class="who">\n                        <a href="http://share.vsingapp.com/profile/?uid=';
$_output_ += beReporter.id;
$_output_ += '" target="_blank"><img src="';
$_output_ += beReporter.headPortrait;
$_output_ += '" alt=""></a>\n                        <div class="info">\n                           <p>';
$_output_ += beReporter.nickname;
$_output_ += '</p>\n                           <p class="user-property"><span class="sex">';
 if(beReporter.gender == 'male') {
$_output_ += ' ♂ ';
} else {
$_output_ += ' ♀ ';
 } 
$_output_ += '</span>';
$_output_ += beReporter.age;
$_output_ += '岁</p>\n                           <p class="user-property">';
$_output_ += beReporter.astrological;
$_output_ += '</p>\n                        </div>\n                    </div>\n                </li>\n                ';
if(report.type == 1 || report.type == 2) {
$_output_ += '\n                ';
 if(order.comment) { 
$_output_ += '\n                <li class="comment">\n                    <p>';
$_output_ += order.comment;
$_output_ += '</p>\n                </li>\n                ';
 } 
$_output_ += '\n                ';
 } 
$_output_ += '\n                ';
if(report.type == 1 || report.type == 2) {
$_output_ += '\n                ';
 if(order.song) { 
$_output_ += '\n                <li class="song">\n                    <h4>歌曲:';
$_output_ += order.song.name;
$_output_ += '</h4>\n                    <p>\n                        <a href="';
$_output_ += order.song.fileUrl;
$_output_ += '" target="_blank">歌曲链接</a>\n                    </p>\n                </li>\n                ';
 } 
$_output_ += '\n                ';
 } 
$_output_ += '\n                <li>\n                    <a class="green ui button" href="/user/message/list?sa=';
$_output_ += reporter.id;
$_output_ += '&ra=';
$_output_ += beReporter.id;
$_output_ += '&startTime=';
$_output_ += report.createDate-24*60*60*1000;
$_output_ += '&endTime=';
$_output_ += report.createDate+24*60*60*1000;
$_output_ += '" target="_blank">查看聊天</a>\n                </li>\n            </ul>\n        </div>\n    </td>\n</tr>';
}
return new String($_output_);

}