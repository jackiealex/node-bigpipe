module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/version/list-148a202e.css">\n\n<div class="mod-version-list mod" >\n \t<div class="header">\n\t\t<a href="/version/publish?type=1"  class="ui down button action-paresh">\n\t\t\t<i class="tag icon"></i>\n\t\t\t添加版本\n\t\t</a>\n \t</div>\n \t<div class="container">\n \t\t';

 			var activeArray = ['', ''];
 			activeArray[type] = 'active';
 		
$_output_ += '\n \t\t<div class="list">\n\t \t\t<div class="ui top attached tabular menu">\n\t \t\t\t<div class="item">&nbsp;&nbsp;&nbsp;&nbsp;</div>\n\t \t\t\t<a href="/version/list?type=0" class="item ';
$_output_ += activeArray[0];
$_output_ += ' action-paresh">审核控制</a>\n\t \t\t\t<a href="/version/list?type=1" class="item ';
$_output_ += activeArray[1];
$_output_ += ' action-paresh">IOS强制更新</a>\n\t \t\t</div>\n \t\t\t<table class="ui column table segment attached">\n \t\t\t\t<thead>\n \t\t\t\t\t<tr>\n \t\t\t\t\t\t<th>链接</th>\n \t\t\t\t\t\t<th>版本</th>\n \t\t\t\t\t\t<th>操作</th>\n \t\t\t\t\t</tr>\n \t\t\t\t</thead>\n \t\t\t\t<tbody>\n \t\t\t\t\t\n \t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n \t\t\t\t\t';

 						var item = list[i];
 					
$_output_ += '\n \t\t\t\t\t<tr class="item row">\n \t\t\t\t\t\t<td class="url" >\n \t\t\t\t\t\t\t';
$_output_ += item.url;
$_output_ += '\n \t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td class="version">\n \t\t\t\t\t\t\t';
$_output_ += item.version;
$_output_ += '\n \t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td>\n \t\t\t\t\t\t\t<i class="remove icon btn-delete ios-update-item"></i>\n\t\t\t\t\t\t</td>\n \t\t\t\t\t</tr>\n \t\t\t\t\t';
 } 
$_output_ += '\n\n \t\t\t\t</tbody>\n \t\t\t</table>\n \t\t</div>\n \t</div>\n</div>\n\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/version/list-f4eafe75.js"></script>\n\n';
}
return new String($_output_);

}