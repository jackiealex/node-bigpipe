module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var path,ta;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/atlas-list-fb35d92f.css">\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/atlas/list-88287ec1.css">\n<style>\n\t#content {\n\t\tbackground: rgb(238, 238, 238);\n\t}\n</style>\n<div class="mod-user-atlas-list mod-atlas-list" data-type="all">\n\t';
 if(path) { 
$_output_ += '\n\t<a href="';
$_output_ += path;
$_output_ += '" class="action-paresh">\n\t\t<div class="ui basic button" style="float: right;">\n\t\t\t<i class="icon angle double left"></i>\n\t\t\t返回\n\t\t</div>\n\t</a>\n\t';
 } 
$_output_ += '\n\t';
 if (list.length == 0) { 
$_output_ += '\n\t<div>空空如也</div>\n\t';
 } else { 
$_output_ += '\n\t';

		var headItem = list[0];
		var user = headItem['user'];
		var headUrl = user.headUrl;
		var ta = user['sex'] == 'boy' ? '他' : '她';
	
$_output_ += '\n\t<h2 class="title">\n\t\t<img src="';
$_output_ += user.headUrl;
$_output_ += '" alt="" style="width: 48px;height: auto;display: inline-block;">\n\t\t<div>\n\t\t\t<p>';
$_output_ += user['nickname'];
$_output_ += '</p>\n\t\t\t<p>';
$_output_ += ta;
$_output_ += '的最新';
$_output_ += list.length;
$_output_ += '个图集</p>\n\t\t</div>\n\t</h2>\n\t<div class="box-wrapper">\n\t\t<div class="ui active centered large inline loader" style="height: 100%; display: block; width: 100%;"></div>\n\t</div>\n\t';
 } 
$_output_ += '\n</div>\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/user/user-atlas-41df7169.js"></script>';
}
return new String($_output_);

}