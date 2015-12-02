module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
var pageValue,i;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-user-list">\n\t';

		var activeArray = [
			{text: '未处理', isActive: ''},
			{text: '已同意', isActive: ''},
			{text: '已拒绝', isActive: ''},
			{text: '已完成', isActive: ''}
		];
		activeArray[type]['isActive'] = 'active';
	
$_output_ += '\n\t<div class="container">\n\t\t<div class="list">\n\t\t\t<div class="ui top attached tabular menu">\n\t\t\t\t<div class=" item">&nbsp;&nbsp;&nbsp;&nbsp;</div>\n\t\t\t\t';
for(var i = 0;i<activeArray.length;i++) { 
$_output_ += '\n\t\t\t\t';

					var tabItem = activeArray[i];
					var pageValue = currentPage;
					if(i != type) {
						pageValue = 1;
					}
				
$_output_ += '\n\t\t\t\t<a href="/withdraws/list?page=';
$_output_ += pageValue;
$_output_ += '&type=';
$_output_ += i;
$_output_ += '" class="';
$_output_ += tabItem['isActive'];
$_output_ += ' item action-paresh">';
$_output_ += tabItem['text'];
$_output_ += '</a>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t</div>\n\t\t\t<table class="ui  column table segment">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>申请人昵称(';
$_output_ += list.length;
$_output_ += '个)</th>\n\t\t\t\t\t\t<th>提现账号</th>\n\t\t\t\t\t\t<th>账户类型</th>\n\t\t\t\t\t\t<th>申请金额</th>\n\t\t\t\t\t\t';
 if(type == 1){ 
$_output_ += '<th>验证码</th>';
 } 
$_output_ += '\n\t\t\t\t\t\t<th>';
 if(type == 0){
$_output_ += '申请时间';
 }else{ 
$_output_ += '处理时间';
 } 
$_output_ += '</th>\n\t\t\t\t\t\t<th>';
 if(type == 0 || type == 1){
$_output_ += '操作';
 }else{ 
$_output_ += '处理结果';
 } 
$_output_ += '</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t\t\t';

					var item = list[i];
					
$_output_ += '\n\t\t\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
$_output_ += item['user']['nickname'];
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td class="nickname">';
$_output_ += item.account;
$_output_ += '</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.type == 1){
$_output_ += '微信号';
 }else{ 
$_output_ += '支付宝';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t￥';
$_output_ += item.number;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t';
 if(type == 1){ 
$_output_ += '<td>';
$_output_ += item.code;
$_output_ += '</td>';
 } 
$_output_ += '\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(type == 0){
$_output_ += '\n\t\t\t\t\t\t\t\t';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '\n\t\t\t\t\t\t\t';
 }else{ 
$_output_ += '\n\t\t\t\t\t\t\t\t';
item.modifyDate = __$timeFormat.call(null, item.modifyDate);
$_output_ += item.modifyDate;
$_output_ += '\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.status == 1){
$_output_ += '\n\t\t\t\t\t\t\t\t<div class="ui teal button" name="update_button">设为完成</div>\n\t\t\t\t\t\t\t';
 }else if(item.status == 2){ 
$_output_ += '\n\t\t\t\t\t\t\t\t<a class="ui red tag label">已拒绝</a>\n\t\t\t\t\t\t\t';
 }else if(item.status == 3){ 
$_output_ += '\n\t\t\t\t\t\t\t\t<a class="ui teal tag label">已完成</a>\n\t\t\t\t\t\t\t';
 }else{ 
$_output_ += '\n\t\t\t\t\t\t\t\t<i name="status_operate" class="privacy icon" ></i>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t';
if(page) { 
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t\t';
}
$_output_ += '\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/list-44aa292f.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/withdraws/list-42e832f7.js"></script>\n';
}
return new String($_output_);

}