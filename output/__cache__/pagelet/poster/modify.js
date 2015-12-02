module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/poster/publish-e4bfda28.css">\n<div class="mod-poster-publish">\n\t<a onclick="javascript:history.back(-1)" class="ui button green action-paresh" style="margin-bottom: 20px;">返回</a>\n\t<form class="ui form" action="/_bridge/poster/';
$_output_ += poster.id;
$_output_ += '/modify" method="post" onsubmit="onsubmit()">\n\t\t<input type="hidden" name="status" value="';
$_output_ += poster.status;
$_output_ += '"/>\n\t\t<div class="three fields">\n\t\t\t<div class="field">\n\t\t\t\t<label for="">链接地址</label>\n\t\t\t\t<input type="text" placeholder="http://" name="link" value="';
$_output_ += poster.link;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">开始日期</label>\n\t\t\t\t<div class="ui small icon input   corner labeled  ">\n\t\t\t\t\t<input readonly="readonly" name="startDate" placeholder="开始日期" type="text" class="dnu-start" value="';
$_output_ += poster.startDate;
$_output_ += '">\n\t\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t\t<div class="ui corner label" title="清除日期">\n\t\t\t\t\t\t<i class="remove icon"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">结束日期</label>\n\t\t\t\t<div class="ui small icon input   corner labeled  ">\n\t\t\t\t\t<input readonly="readonly" name="endDate" placeholder="结束日期" type="text" class="dnu-end" value="';
$_output_ += poster.endDate;
$_output_ += '">\n\t\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t\t<div class="ui corner label" title="清除日期">\n\t\t\t\t\t\t<i class="remove icon"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="two fields">\n\t\t\t<div class="field">\n\t\t\t\t<label for="">链接类型</label>\n\t\t\t\t<select class="ui fluid dropdown" name="linkType" placeholder="所属区域">\n\t\t\t\t\t';
 if(poster.linkType == 0){ 
$_output_ += '<option value="0" selected="selected">--请选择--</option>';
 }else{ 
$_output_ += '<option value="0" >--请选择--</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(poster.linkType == 1){ 
$_output_ += '<option value="1" selected="selected">链接</option>';
 }else{ 
$_output_ += '<option value="1" >链接</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(poster.linkType == 2){ 
$_output_ += '<option value="2" selected="selected">app下载</option>';
 }else{ 
$_output_ += '<option value="2" >app下载</option>';
 } 
$_output_ += '\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">banner显示类型</label>\n\t\t\t\t<select class="ui fluid dropdown" name="type" placeholder="banner显示类型">\n\t\t\t\t\t';
 if(poster.type == 0){ 
$_output_ += '<option value="0" selected="selected">--请选择--</option>';
 }else{ 
$_output_ += '<option value="0" >--请选择--</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(poster.type == 1){ 
$_output_ += '<option value="1" selected="selected">新手提示</option>';
 }else{ 
$_output_ += '<option value="1" >新手提示</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(poster.type == 2){ 
$_output_ += '<option value="2" selected="selected">运营活动</option>';
 }else{ 
$_output_ += '<option value="2" >运营活动</option>';
 } 
$_output_ += '\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="files">\n\t\t\t<h2>拖放图片到此</h2>\n\t\t\t<div class="file-box file-cover">\n\t\t\t\t<div class="preview-container"></div>\n\t\t\t\t<div class="progress-stick"></div>\n\t\t\t\t<p class="btn-delete">×</p>\n\t\t\t\t<a href="" target="_blank" class="btn-preview">查看</a>\n\t\t\t\t<div class="file-picker">\n\t\t\t\tbanner图上传\n\t\t\t\t</div>\n\t\t\t\t<input type="hidden" class="file-hidden" name="imageUrl"  value="';
$_output_ += poster.imageUrl;
$_output_ += '" />\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="ui button green big large btn-submit" style="margin: 20px;">提交</div>\n\t</form>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/poster/modify-2e750481.js"></script>\n';
}
return new String($_output_);

}