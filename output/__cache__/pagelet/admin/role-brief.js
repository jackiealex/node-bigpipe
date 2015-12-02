module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="roles">\n';
 if(list.length <=0) { 
$_output_ += '\n\t没有角色列表\n';
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
$_output_ += '</p>\n\t\t</h2>\n\t\t<div class="select">√</div>\n\t</div>\n';
 } 
$_output_ += '\n';
 } 
$_output_ += '\n</div>\n';
}
return new String($_output_);

}