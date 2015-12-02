module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="panel">\n\t<div class="col">\n\t\t';
 for(var i = 0; i < list.length; i = i + 2) { 
$_output_ += '\n\t\t';

			var item = list[i];
			var authorities = item['authorities'];
		
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/pagelet/permission/role-item.html', {item: item, authorities: authorities});
$_output_ += '\n\t\t';
 } 
$_output_ += '\n\t</div>\n\t<div class="col">\n\t\t';
 for(var i = 1; i < list.length; i = i + 2) { 
$_output_ += '\n\t\t';

			var item = list[i];
			var authorities = item['authorities'];
		
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/pagelet/permission/role-item.html', {item: item, authorities: authorities});
$_output_ += '\n\t\t';
 } 
$_output_ += '\n\t</div>\n</div>\n\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/lib/animate-e78c4ece.css">\n\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/base/zepto-dnd-ff22b983.js"></script>\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/permission/role-58812ad8.js"></script>\n';
}
return new String($_output_);

}