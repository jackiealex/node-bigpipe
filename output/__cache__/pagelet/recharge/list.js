module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-user-list">\n\t<div class="container">\n\t\t<div class="list">\n\t\t\t<div class="ui top attached tabular menu">\n\t\t\t\t<div class=" item">&nbsp;&nbsp;&nbsp;&nbsp;</div>\n\t\t\t\t<a href="javascript:void(0)" class="active item action-paresh">全部</a>\n\t\t\t</div>\n\t\t\t<table class="ui  column table segment">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>申请人昵称(';
$_output_ += list.length;
$_output_ += '个)</th>\n\t\t\t\t\t\t<th>充值金额</th>\n\t\t\t\t\t\t<th>充值方式</th>\n\t\t\t\t\t\t<th>日期</th>\n\t\t\t\t\t\t<th>状态</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t\t\t';

					var item = list[i];
					
$_output_ += '\n\t\t\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
$_output_ += item['user']['nickname'];
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td class="nickname">';
$_output_ += item.number;
$_output_ += '</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.payType == 1){
$_output_ += '微信\n\t\t\t\t\t\t\t';
 }else if(item.payType == 2){ 
$_output_ += '支付宝\n\t\t\t\t\t\t\t';
 }else{ 
$_output_ += '苹果';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.status == 0){
$_output_ += '<a class="ui teal tag label">处理中</a>\n\t\t\t\t\t\t\t';
 }else if(item.status == 1){ 
$_output_ += '<a class="ui teal tag label">成功</a>\n\t\t\t\t\t\t\t';
 }else{ 
$_output_ += '<a class="ui red tag label">失败</a>';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t';
if(page) { 
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t\t';
}
$_output_ += '\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/list-44aa292f.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n';
}
return new String($_output_);

}