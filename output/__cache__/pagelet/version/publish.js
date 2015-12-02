module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '';

	var activeArray = ['', ''];
	activeArray[type] = 'active';

$_output_ += '\n<div class="mod-version-publish" style="padding: 20px;">\n\t<div class="ui top attached tabular menu">\n\t\t<a href="/version/publish?type=0" class="item ';
$_output_ += activeArray[0];
$_output_ += ' action-paresh">审核控制</a>\n\t\t<a href="/version/publish?type=1" class="item ';
$_output_ += activeArray[1];
$_output_ += ' action-paresh">IOS强制更新</a>\n\t</div>\n\t<br>\n\t<br>\n\t';
 if(type==0 || type=='0') { 
$_output_ += '\n\t\t<form class="ui form" action="/_bridge/client/check/version" method="post">\n\t\t\t<div class="field">\n\t\t\t\t<input type="text" placeholder="版本号" name="version" value="" />\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<input type="text" placeholder="渠道" name="channel" value="" />\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<div class="ui buttons device">\n\t\t\t\t\t<div class="ui button" data-platform="ios">IOS</div>\n\t\t\t\t\t<div class="or"></div>\n\t\t\t\t\t<div class="ui  button" data-platform="android">Android</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="ui button green big large btn-submit" style="margin: 20px;">提交</div>\n\t\t</form>\n\t';
 } else { 
$_output_ += '\n\t\t<form class="ui form form-update" action="/_bridge/ios/update/version" method="post">\n\t\t\t<div class="field">\n\t\t\t\t<input type="text" placeholder="链接" name="url" value="" />\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<input type="text" placeholder="版本" name="version" value="" />\n\t\t\t</div>\n\t\t\t<div class="ui button green big large btn-force-update" style="margin: 20px;">更新</div>\n\t\t</form>\n\t';
 } 
$_output_ += '\n</div>\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/version/publish-d7f5b4e4.js"></script>';
}
return new String($_output_);

}