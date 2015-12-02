module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var checked;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<table class="ui attached column table segment">\n    <thead>\n    <tr>\n        <th>头像(';
$_output_ += list.length;
$_output_ += '个)</th>\n        <th>昵称</th>\n        <th>星座/年龄</th>\n        <th>性别</th>\n        <th>在线状态</th>\n        <th>原因</th>\n        <th>是否被禁用</th>\n    </tr>\n    </thead>\n    <tbody>\n    ';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n    ';

    var item = list[i];
    
$_output_ += '\n    <tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n        <td>\n            <div class="img">\n                ';
if(!item.user.headPortrait) {
                item.user.headPortrait = '/static/img/default.png';
                }
$_output_ += '\n                <a target="_blank" href="http://share.vsingapp.com/profile?uid=';
$_output_ += item.user.id;
$_output_ += '">\n                    <img src="';
$_output_ += item.user.headPortrait;
$_output_ += '" />\n                </a>\n            </div>\n        </td>\n        <td class="nickname">';
$_output_ += item.user.nickname;
$_output_ += '</td>\n        <td class="">\n            ';
 if(item.user.astrological) { 
$_output_ += '\n            <p>';
$_output_ += item.user.astrological;
$_output_ += '</p>\n            ';
 } else { 
$_output_ += '\n            <p>未知</p>\n            ';
 } 
$_output_ += '\n            ';
 if(item.user.age !== undefined) { 
$_output_ += '\n            <p>';
$_output_ += item.user.age;
$_output_ += '</p>\n            ';
 } else { 
$_output_ += '\n            <p>未知</p>\n            ';
 } 
$_output_ += '\n        </td>\n        <td class="sex">\n            ';
if(item.user.gender == 'male') {
$_output_ += '\n            男\n            ';
} else {
$_output_ += '\n            女\n            ';
 } 
$_output_ += '\n        </td>\n        <td>\n            ';
 if(item.user.status == 0) { 
$_output_ += '离线\n            ';
 } else if(item.user.status == 1) { 
$_output_ += '买歌在线\n            ';
 } else if(item.user.status == 2) { 
$_output_ += '卖歌在线\n            ';
 } else if(item.user.status == 3) { 
$_output_ += '卖歌离线\n            ';
 } 
$_output_ += '\n        </td>\n        <td>';
$_output_ += item.reason;
$_output_ += '</td>\n        <td>\n            ';

            var checked = 'checked';
            if(item.user.isEnabled) {
            checked = '';
            } 
$_output_ += '\n            <div class="ui toggle checkbox">\n                <input class="is-enabled-user-change" type="checkbox" data="';
$_output_ += item.user.id;
$_output_ += '" name="public" ';
$_output_ += checked;
$_output_ += ' />\n                <label></label>\n            </div>\n        </td>\n    </tr>\n    ';
 } 
$_output_ += '\n    </tbody>\n</table>';
}
return new String($_output_);

}