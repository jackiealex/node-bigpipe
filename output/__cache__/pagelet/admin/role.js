module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="role-panel">\n\t<h2 class="close" title="关闭权限栏"> ╳ </h2>\n';
 for(var i = 0; i < list.length; i++) { 
$_output_ += '\n';

	var item = list[i];
	var authorities = item['authorities'];

$_output_ += '\n\t<div class="item role animated zoomIn"  data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t<h2>角色名：<span>';
$_output_ += item.name;
$_output_ += '</span>\n\t\t\t<p>';
$_output_ += item.description;
$_output_ += '</p>\n\t\t</h2>\n\t\t<ul>\n\t\t\t';
 if (authorities.length == 0) { 
$_output_ += '\n\t\t\t\t<li class="empty">拖拽权限到这里！</li>\n\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t';
 for(var j = 0; j < authorities.length; j ++) { 
$_output_ += '\n\t\t\t\t';

					var authItem = authorities[j];
				
$_output_ += '\n\t\t\t\t<li class="item url" data-id="';
$_output_ += authItem.id;
$_output_ += '">\n\t\t\t\t\t<h4><i class="icon fork"></i>';
$_output_ += authItem.url;
$_output_ += '</h4>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="name" >名称：';
$_output_ += authItem.name;
$_output_ += '</div>\n\t\t\t\t\t\t<div class="url">描述：';
$_output_ += authItem.description;
$_output_ += '</div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t';
 } 
$_output_ += '\n\t\t</ul>\n\t</div>\n';
 } 
$_output_ += '\n</div>\n\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/lib/animate-e78c4ece.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/base/zepto-dnd-ff22b983.js"></script>\n';
}
return new String($_output_);

}