module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-system-config">\n\n\t<div class="ui message">\n\t  <div class="header">\n\t    提示，以下仅为模版参考\n\t  </div>\n\t  <p>\n\t  \t1. 如果有占位符，修改请注意不要漏掉占位符（如：｛0｝、｛1｝）<br>\n\t  \t2. 占位符的使用若遇到问题，请联系服务端同学<br>\n\t  \t3. 内置配置不能删除 <br>\n\t  \t4. 内置配置描述不可修改\t\n\t  </p>\n\t</div>\n\t<button class="ui green button btn-add-item">\n\t  <i class="add icon"></i>\n\t  添加配置行\n\t</button>\n\t<br><br>\n\n\t<table class="ui celled striped table">\n\t\t<thead>\n    \t\t<tr><th colspan="6">\n      \t\t配置列表\n    \t\t</th>\n  \t\t\t</tr>\n  \t\t\t<tr>\n  \t\t\t\t<th>名字（只能英文）</td>\n  \t\t\t\t<th>配置值</td>\n  \t\t\t\t<th>类型（服务端/客户端）</td>\n  \t\t\t\t<th>是否内置</td>\n  \t\t\t\t<th>描述</td>\n  \t\t\t\t<th>操作</td>\n  \t\t\t</tr>\n  \t\t</thead><tbody>\n\t';
 for(var i=0; i<list.length; i++) { 
$_output_ += '\n\t';

		var item = list[i];
	
$_output_ += '\n\t<tr>\n      <td class="collapsing" data-name="';
$_output_ += item.name;
$_output_ += '">\n        <i class="file outline icon"></i>';
$_output_ += item.name;
$_output_ += '\n      </td>\n      <td data-value="';
$_output_ += item.value;
$_output_ += '"><p>';
$_output_ += item.value;
$_output_ += '</p></td>\n      <td class="collapsing">\n      \t';
 if(item.type == 1) { 
$_output_ += '服务端\n      \t';
 } else { 
$_output_ += '客户端\n      \t';
 } 
$_output_ += '\n      </td>\n      <td class="collapsing">\n      \t';
 if(item.isSystem) { 
$_output_ += '是\n      \t';
 } else { 
$_output_ += '否\n      \t';
 } 
$_output_ += '\n      </td>\n      <td data-description="';
$_output_ += item.description;
$_output_ += '"><p>';
$_output_ += item.description;
$_output_ += '</p></td>\n      <td class="right aligned collapsing">\n      \t<button class="button blue ui config-mod">修改</button>\n      \t';
 if(!item.isSystem) { 
$_output_ += '\n      \t<button class="ui red button config-del">删除</button>\n      \t';
 } 
$_output_ += '\n      </td>\n    </tr>\n\t';
 } 
$_output_ += '\n\t</table>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/system-configuration/index-6801826a.css">\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/system-configuration/index-35e50991.js"></script>';
}
return new String($_output_);

}