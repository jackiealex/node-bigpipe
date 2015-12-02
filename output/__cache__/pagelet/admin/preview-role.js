module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="roles">\n';
 if(list.length <=0) { 
$_output_ += '\n\t<div style="width: 400px;padding: 100px;text-align: center;">没有分配角色</div>\n';
 } else { 
$_output_ += '\n';
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
$_output_ += '</p>\n\t\t\t<div class="remove" data-id="';
$_output_ += item.id;
$_output_ += '">╳ </div>\n\t\t\t<div class="expand" >双击展开／收起</div>\n\t\t</h2>\n\t\t<ul>\n\t\t\t';
 if (authorities.length <= 0) { 
$_output_ += '\n\t\t\t\t<li class="empty">拖拽权限到这里！</li>\n\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t';
 for(var j = 0; j < authorities.length; j++) { 
$_output_ += '\n\t\t\t\t';

					var itemUrl = authorities[j];
					
				
$_output_ += '\n\t\t\t\t<li class="item url" data-id="';
$_output_ += itemUrl.id;
$_output_ += '">\n\t\t\t\t\t<h4><i class="icon fork"></i>';
$_output_ += itemUrl.url;
$_output_ += '</h4>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<div class="name">名称：';
$_output_ += itemUrl.name;
$_output_ += '</div>\n\t\t\t\t\t\t<div class="url">描述：';
$_output_ += itemUrl.description;
$_output_ += '</div>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t';
 } 
$_output_ += '\n\t\t</ul>\n\t</div>\n';
 } 
$_output_ += '\n';
 } 
$_output_ += '\n</div>\n';
}
return new String($_output_);

}