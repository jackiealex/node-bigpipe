module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="panel">\n\t<h2 class="title"> 可用权限列表 </h2>\n\t<ul>\n\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t';

			var item = list[i];
		
$_output_ += '\n\t\t<li class="item animated pulse url" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t<h4><i class="icon fork"></i>';
$_output_ += item.url;
$_output_ += '</h4>\n\t\t\t<div>\n\t\t\t\t<div class="name">名称：';
$_output_ += item.name;
$_output_ += '</div>\n\t\t\t\t<div class="url">描述：';
$_output_ += item.description;
$_output_ += '</div>\n\t\t\t\t<div class="method">方法：';
$_output_ += item.method;
$_output_ += '</div>\n\t\t\t</div>\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\n\t</ul>\n</div>\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/base/zepto-dnd-ff22b983.js"></script>\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/permission/url-972ffdb5.js"></script>';
}
return new String($_output_);

}