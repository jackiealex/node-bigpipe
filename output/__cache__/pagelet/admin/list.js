module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
var key;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/admin/list-b8a03c7a.css">\n';

	var key = key;

$_output_ += '\n<div class="mod-admin-list mod" >\n \t<div class="header">\n \t\t<div class="ui icon input corner labeled  ">\n\t\t\t<input type="text" placeholder="搜索管理员" onfocus="this.select()" value="';
$_output_ += key;
$_output_ += '">\n\t\t\t<i class="circular search icon"></i>\n\t\t\t';
 if(key) {
$_output_ += '\n\t\t\t<div class="ui corner label" title="清除">       \n\t\t\t\t<i class="remove icon"></i>      \n\t\t\t</div>\n\t\t\t';
 } 
$_output_ += '\n\t\t</div>\n\t\t';
 if(_PUBLISH_) {
$_output_ += '\n\t\t<a href="/admin/publish"  class="action-paresh ui down button">\n\t\t\t<i class="user icon"></i>\n\t\t\t添加管理员\n\t\t</a>\n\t\t';
 } 
$_output_ += '\n\t\t';
 if(_ALLOC_ROLE_) {
$_output_ += '\n\t\t<div class="btn-alloc-role ui down button">\n\t\t\t<i class="user icon"></i>\n\t\t\t<i class="fork icon"></i>\n\t\t\t<span>分配角色</span>\n\t\t</div>\n\t\t';
 } 
$_output_ += '\n \t</div>\n \t<div class="container">\n \t\t<div class="list">\n \t\t\t<table class="ui  column table segment">\n \t\t\t\t<thead>\n \t\t\t\t\t<tr>\n \t\t\t\t\t\t\n \t\t\t\t\t\t<th>账号</th>\n \t\t\t\t\t\t<th>昵称</th>\n \t\t\t\t\t\t<th>邮箱</th>\n \t\t\t\t\t\t<th>创建日期</th>\n \t\t\t\t\t\t<th>操作</th>\n \t\t\t\t\t</tr>\n \t\t\t\t</thead>\n \t\t\t\t<tbody>\n \t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n \t\t\t\t\t';

 						var item = list[i];
 					
$_output_ += '\n \t\t\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n \t\t\t\t\t\t<td class="username">\n \t\t\t\t\t\t\t';
$_output_ += item.username;
$_output_ += '\n \t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td class="nickname">';
$_output_ += item.nickname;
$_output_ += '</td>\t\n \t\t\t\t\t\t<td class="email ">';
$_output_ += item.email;
$_output_ += '</td>\t\n \t\t\t\t\t\t<td class="date">';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '</td>\t\n \t\t\t\t\t\t<td>\n \t\t\t\t\t\t\t<a class="btn-preview-roles">权限</a>\n \t\t\t\t\t\t\t<i class="privacy icon"></i>\n\t\t\t\t\t\t</td>\n \t\t\t\t\t</tr>\n \t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t</tbody>\n \t\t\t</table>\n \t\t\t';
if(page) { 
$_output_ += '\n \t\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n \t\t\t';
}
$_output_ += '\n \t\t</div>\n \t</div>\n</div>\n\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/base/zepto-dnd-ff22b983.js"></script>\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/admin/list-0e13a3a5.js"></script>\n\n';
}
return new String($_output_);

}