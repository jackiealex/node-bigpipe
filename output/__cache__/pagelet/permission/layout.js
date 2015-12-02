module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-permission-manage">\n\t \n\t<div class="header">\n\t\t<div class="menu-role">\n\t\t\t';
if(_PUBLISH_) { 
$_output_ += '\n\t\t\t<div class="ui button teal btn-add">\n\t\t\t\t<i class="cubes icon"></i>\n\t\t\t\t添加角色\n\t\t\t</div>\n\t\t\t';
 } 
$_output_ += '\n\t\t\t';
if(_UPDATE_) { 
$_output_ += '\n\t\t\t<div class="ui button teal btn-editable">\n\t\t\t\t<i class="edit icon"></i>\n\t\t\t\t<i class="cubes icon" style="margin-left: -10px"></i>\n\t\t\t\t编辑角色\n\t\t\t</div>\n\t\t\t';
 } 
$_output_ += '\n\t\t</div>\n\t\t<div class="menu-url" style="display: none">\n\t\t\t<div class="ui button red btn-url-addition">\n\t\t\t\t<i class="add icon"></i>\n\t\t\t\t<i class="fork icon" style="margin-left: -12px"></i>\n\t\t\t\t添加权限\n\t\t\t</div>\n\t\t\t<div class="ui button red btn-url-editable">\n\t\t\t\t<i class="fork icon"></i>\n\t\t\t\t编辑权限\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t\t\n\t<div class="container">\n\t\t<div class="sub-mod-role">\n\t\t\t<div class="panel">\n\t\t\t\t<div class="ui segment" style="height: 100%;">\n\t\t\t\t\t<div class="ui active inverted dimmer">\n\t\t\t\t\t\t<div class="ui text loader">Loading</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<p></p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="sub-mod-url">\n\t\t\t<div class="panel">\n\t\t\t\t<div class="ui segment" style="height: 100%;">\n\t\t\t\t\t<div class="ui active inverted dimmer" >\n\t\t\t\t\t\t<div class="ui text loader">Loading</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<p></p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/permission/index-eb7ec31b.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/permission/index-7fd6368a.js"></script>';
}
return new String($_output_);

}