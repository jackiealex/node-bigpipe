module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<table class="ui attached column table segment">\n    <thead>\n        <tr>\n            <th>头像(';
$_output_ += list.length;
$_output_ += '个)</th>\n            <th>昵称</th>\n            <th>开始时间</th>\n            <th>结束时间</th>\n            <th>排序</th>\n            <th>取消置顶</th>\n        </tr>\n    </thead>\n    <tbody>\n        ';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n        ';

        var item = list[i];
        
$_output_ += '\n        <tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n            <td>\n                <div class="img">\n                    ';
if(!item.headPortrait) {
                    item.headPortrait = '/static/img/default.png';
                    }
$_output_ += '\n                    <a target="_blank" href="http://share.vsingapp.com/profile?uid=';
$_output_ += item.userId;
$_output_ += '">\n                        <img src="';
$_output_ += item.headPortrait;
$_output_ += '" />\n                    </a>\n                </div>\n            </td>\n            <td>';
$_output_ += item.nickname;
$_output_ += '</td>\n            <td>';
item.startTime = __$timeFormat.call(null, item.startTime);
$_output_ += item.startTime;
$_output_ += '</td>\n            <td>';
item.endTime = __$timeFormat.call(null, item.endTime);
$_output_ += item.endTime;
$_output_ += '</td>\n            <td>\n                <div class="ui right action input mini">\n                    <input type="number" name="data_order" style="width: 60px;" min="1" value="';
$_output_ += item.orders;
$_output_ += '" placeholder="';
$_output_ += item.orders;
$_output_ += '"  />\n                    <div class="ui icon button">\n                        <i class="checkmark green icon btn-order"></i>\n                    </div>\n                </div>\n                \n            </td>\n            <td><div class="ui teal button" name="top_cancel">取消</div></td>\n        </tr>\n        ';
 } 
$_output_ += '\n    </tbody>\n</table>';
}
return new String($_output_);

}