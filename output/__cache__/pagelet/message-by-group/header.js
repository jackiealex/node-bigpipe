module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var a,b;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="header">\n\t<div class="col ui form">\n\t\t<div class="four fields">\n\t\t\t<div class="field">\n\t\t\t\t<label>用户名</label>\n\t\t\t\t<input class="uname" placeholder="用户名" type="text">\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label>密码</label>\n\t\t\t\t<div class=" ui  icon action input password">\n\t\t\t\t\t<input class="pass" placeholder="密码" type="password">\n\t\t\t\t\t<button class="ui icon button orange">\n\t\t\t\t\t\t<i class="icon lock" ></i>\n\t\t\t\t\t  </button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=" field  ">\n\t\t\t\t<label>发送方式</label>\n\t\t\t\t<div class="fields tow">\n\t\t\t\t\t<div class="inline field">\n\t\t\t\t\t';

						var a = Date.now() + 'a';
						var b = Date.now() + 'b';
					
$_output_ += '\n\t\t\t\t\t\t<div class="ui  checkbox app-inner">\n\t\t\t\t\t\t\t<input value="1" type="checkbox" id="';
$_output_ += a;
$_output_ += '" >\n\t\t\t\t\t\t\t<label for="';
$_output_ += a;
$_output_ += '">消息推送</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="inline field short-message">\n\t\t\t\t\t\t<div class="ui  checkbox">\n\t\t\t\t\t\t\t<input value="2" type="checkbox" id="';
$_output_ += b;
$_output_ += '" >\n\t\t\t\t\t\t\t<label for="';
$_output_ += b;
$_output_ += '">短信发送</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=" field">\n\t\t\t\t\n\t\t\t\t<div class="ui button green massive btn-send-message">发送</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="col ui form" style="margin-top: 10px;">\n\t\t\t<div class="field">\n\t\t\t\t<label>消息内容</label>\n\t\t\t\t<textarea class="msg-content" style="min-height:50px; height: 50px;"></textarea>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/message-by-group/header-15c0bdfe.css">';
}
return new String($_output_);

}