module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
var key,createDate,genderText,statusText,pageValue,i,enabled;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '';

var key = nickname;
var conditionArray = [{}, {}]
var genderText = gender == 'male' ? '男' : '女';
var statusText = [
	'听歌离线',
	'听歌在线',
	'唱歌在线',
	'唱歌离线'
][status] || '请选择在线状态';

$_output_ += '\n<div class="mod-user-list">\n\t<div class="header">\n\t\t<div class="ui form">\n\t\t\t<div class="fields">\n\t\t\t\t<div class=" field inline"  data-field="nickname">\n\t\t\t\t\t<div class="ui small icon input   corner labeled   ">\n\t\t\t\t\t\t<input type="text" placeholder="昵称或电话" onfocus="this.select()" value="';
$_output_ += key;
$_output_ += '" style="width: 200px" />\n\t\t\t\t\t\t';
 if(key) {
$_output_ += '\n\t\t\t\t\t\t<div class="ui corner label" title="清除">\n\t\t\t\t\t\t\t<i class="remove icon"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="field inline"  data-field="createDate">\n\t\t\t\t\t<div class="ui small icon input   corner labeled  ">\n\t\t\t\t\t\t<input readonly="readonly" placeholder="注册日期" type="text" class="dnu-create" value="';
$_output_ += createDate;
$_output_ += '">\n\t\t\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t\t\t';
 if(createDate) {
$_output_ += '\n\t\t\t\t\t\t<div class="ui corner label" title="注册日期">\n\t\t\t\t\t\t\t<i class="remove icon"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t';
 if(gender) {
$_output_ += '\n\t\t\t\t<div class=" field inline "data-field="gender" >\n\t\t\t\t\t<div class="ui labeled icon top left pointing dropdown button green" >\n\t\t\t\t\t\t<span class="text">';
$_output_ += genderText;
$_output_ += '</span>\n\t\t\t\t\t\t<i class="remove icon" title="清除过滤器"></i>\n\t\t\t\t\t\t<div class="menu">\n\t\t\t\t\t\t\t<div class="item gender-item" data-field="gender" data-value="male">\n\t\t\t\t\t\t\t\t<div class="ui red empty circular label"></div>\n\t\t\t\t\t\t\t\t男\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item gender-item " data-field="gender" data-value="female" >\n\t\t\t\t\t\t\t\t<div class="ui green empty circular label"></div>\n\t\t\t\t\t\t\t\t女\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t';
 if(status != undefined ) { 
$_output_ += '\n\t\t\t\t<div class=" field inline "  data-field="status">\n\t\t\t\t\t<div class="ui labeled icon top left pointing dropdown button green">\n\t\t\t\t\t\t<span class="text">';
$_output_ += statusText;
$_output_ += '</span>\n\t\t\t\t\t\t<i class="remove icon" title="清除过滤器"></i>\n\t\t\t\t\t\t<div class="menu">\n\t\t\t\t\t\t\t<div class="item " data-field="status" data-value="0">\n\t\t\t\t\t\t\t\t<div class="ui empty circular label"></div>\n\t\t\t\t\t\t\t\t听歌离线\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item  " data-field="status" data-value="1">\n\t\t\t\t\t\t\t\t<div class="ui green empty circular label"></div>\n\t\t\t\t\t\t\t\t听歌在线\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item  " data-field="status" data-value="2">\n\t\t\t\t\t\t\t\t<div class="ui red empty circular label"></div>\n\t\t\t\t\t\t\t\t唱歌在线\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item " data-field="status" data-value="3">\n\t\t\t\t\t\t\t\t<div class="ui  empty circular label"></div>\n\t\t\t\t\t\t\t\t唱歌离线\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t';
 } 
$_output_ += '\n\n\t\t\t\t<div class=" field inline ">\n\t\t\t\t\t<div class="ui labeled icon top left pointing dropdown button green">\n\t\t\t\t\t\t<span class="text">高级查询</span>\n\t\t\t\t\t\t<i class="filter icon"></i>\n\t\t\t\t\t\t<div class="menu">\n\t\t\t\t\t\t\t<div class="header">\n\t\t\t\t\t\t\t\t<i class="filter icon"></i>\n\t\t\t\t\t\t\t\t提示，以下过滤器类型为AND\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="divider"></div>\n\t\t\t\t\t\t\t<div class="header">\n\t\t\t\t\t\t\t\t<i class="intergender icon"></i>\n\t\t\t\t\t\t\t\t选择性别\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item gender-item" data-field="gender" data-value="male">\n\t\t\t\t\t\t\t\t<div class="ui red empty circular label"></div>\n\t\t\t\t\t\t\t\t男\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item gender-item " data-field="gender" data-value="female" >\n\t\t\t\t\t\t\t\t<div class="ui green empty circular label"></div>\n\t\t\t\t\t\t\t\t女\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="divider"></div>\n\t\t\t\t\t\t\t<div class="header">\n\t\t\t\t\t\t\t\t<i class="spy icon"></i>\n\t\t\t\t\t\t\t\t选择状态\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item status" data-field="status" data-value="1">\n\t\t\t\t\t\t\t\t<i class="lightning icon status-item"></i>\n\t\t\t\t\t\t\t\t在线状态\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=" field inline ">\n\t\t\t\t\t<div class="ui active blue  button search">\n\t\t\t\t\t\t<i class="search icon"></i>\n\t\t\t\t\t\t搜索\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t';

		var activeArray = [
			{text: '全部', isActive: ''},
			{text: '优质用户', isActive: ''},
			{text: '禁用用户', isActive: ''},
			{text: '置顶用户', isActive: ''}
		];
		activeArray[type]['isActive'] = 'active';
	
$_output_ += '\n\t<div class="container">\n\t\t<div class="list">\n\t\t\t<div class="ui top attached tabular menu">\n\t\t\t\t<div class=" item">&nbsp;&nbsp;&nbsp;&nbsp;</div>\n\t\t\t\t';
for(var i = 0;i<activeArray.length;i++) { 
$_output_ += '\n\t\t\t\t\t';

						var tabItem = activeArray[i];
						var pageValue = currentPage;
						if(i != type) {
							pageValue = 1;
						}
					
$_output_ += '\n\t\t\t\t\t';
 if(i == 3){ 
$_output_ += '\n\t\t\t\t\t\t<a href="/user/toplist?page=';
$_output_ += pageValue;
$_output_ += '&type=';
$_output_ += i;
$_output_ += '" class="';
$_output_ += tabItem['isActive'];
$_output_ += ' item action-paresh">';
$_output_ += tabItem['text'];
$_output_ += '</a>\n\t\t\t\t\t';
 }else{ 
$_output_ += '\n\t\t\t\t\t\t<a href="/user/list?page=';
$_output_ += pageValue;
$_output_ += '&type=';
$_output_ += i;
$_output_ += '" class="';
$_output_ += tabItem['isActive'];
$_output_ += ' item action-paresh">';
$_output_ += tabItem['text'];
$_output_ += '</a>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t</div>\n\t\t\t';
 if(type == 2) { 
$_output_ += '\n\t\t\t\t';
$_output_ += __$include('./__cache__/pagelet/user/disabled-user.html', {list: list});
$_output_ += '\n\t\t\t';
 } else if(type == 3) { 
$_output_ += '\n\t\t\t\t';
$_output_ += __$include('./__cache__/pagelet/user/top-user.html', {list: list});
$_output_ += '\n\t\t\t';
 } else { 
$_output_ += '\n\t\t\t<table class="ui attached column table segment">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>头像(';
$_output_ += list.length;
$_output_ += '个)</th>\n\t\t\t\t\t\t<th>昵称</th>\n\t\t\t\t\t\t<th>注册时间</th>\n\t\t\t\t\t\t<th>星座／电话／年龄</th>\n\t\t\t\t\t\t<th>性别</th>\n\t\t\t\t\t\t<th>是否已加入歌单</th>\n\t\t\t\t\t\t<th>状态</th>\n\t\t\t\t\t\t<th>优质用户</th>\n\t\t\t\t\t\t<th>是否被禁用</th>\n\t\t\t\t\t\t<th>设定置顶</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t\t\t';

					var item = list[i];
					
$_output_ += '\n\t\t\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<div class="img">\n\t\t\t\t\t\t\t\t';
if(!item.headPortrait) {
								item.headPortrait = '/static/img/default.png';
								}
$_output_ += '\n\t\t\t\t\t\t\t\t<a target="_blank" href="http://share.vsingapp.com/profile?uid=';
$_output_ += item['id'];
$_output_ += '">\n\t\t\t\t\t\t\t\t\t<img src="';
$_output_ += item.headPortrait;
$_output_ += '" />\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td class="nickname">\n\t\t\t\t\t\t\t';
$_output_ += item.nickname;
$_output_ += '\n\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t';
if(item.price == undefined) { 
$_output_ += '\n\t\t\t\t\t\t\t\t--￥\n\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t<span title="最低接单价格';
$_output_ += item.price;
$_output_ += '￥">';
$_output_ += item.price;
$_output_ += '￥</span>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '</td>\n\t\t\t\t\t\t<td class="">\n\t\t\t\t\t\t\t';
 if(item.astrological) { 
$_output_ += '\n\t\t\t\t\t\t\t<p>';
$_output_ += item.astrological;
$_output_ += '</p>\n\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t<p>未知</p>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t<i class="phone icon"></i>\n\t\t\t\t\t\t\t\t';
$_output_ += item['phone'];
$_output_ += '\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t';
 if(item.age !== undefined) { 
$_output_ += '\n\t\t\t\t\t\t\t<p>';
$_output_ += item.age;
$_output_ += '岁</p>\n\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t<p>未知</p>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td class="sex">\n\t\t\t\t\t\t\t';
if(item.gender == 'male') {
$_output_ += '\n\t\t\t\t\t\t\t男\n\t\t\t\t\t\t\t';
} else {
$_output_ += '\n\t\t\t\t\t\t\t女\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>';
 if(item.isSinger == true){ 
$_output_ += '是';
 }else{ 
$_output_ += '否';
 } 
$_output_ += '</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.status == 0) { 
$_output_ += '离线\n\t\t\t\t\t\t\t';
 } else if(item.status == 1) { 
$_output_ += '买歌在线\n\t\t\t\t\t\t\t';
 } else if(item.status == 2) { 
$_output_ += '卖歌在线\n\t\t\t\t\t\t\t';
 } else if(item.status == 3) { 
$_output_ += '卖歌离线\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n \t\t\t\t\t\t\t';
if(item.isQuality==1) { 
$_output_ += '\n \t\t\t\t\t\t\t<div class="checked ui toggle checkbox">\n \t\t\t\t\t\t\t  <input class="is-quality-change" type="checkbox" data="';
$_output_ += item.id;
$_output_ += '" name="public" checked />\n \t\t\t\t\t\t\t  <label></label>\n \t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t<div class="ui toggle checkbox">\n\t\t\t\t\t\t\t  <input class="is-quality-change" type="checkbox" data="';
$_output_ += item.id;
$_output_ += '" name="public" />\n\t\t\t\t\t\t\t  <label></label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';

							var enabled = 'checked';
							if(item.isEnabled) {
								enabled = '';
							} 
$_output_ += '\n\t\t\t\t\t\t\t<div class="ui toggle checkbox">\n\t\t\t\t\t\t\t\t<input class="is-enabled-user-change" type="checkbox" data="';
$_output_ += item.id;
$_output_ += '" name="public" ';
$_output_ += enabled;
$_output_ += ' />\n\t\t\t\t\t\t\t\t<label></label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<i name="top_setting" class="privacy icon" ></i>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t';
 } 
$_output_ += '\n\t\t\t';
if(page) { 
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t\t';
}
$_output_ += '\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/list-44aa292f.css">\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/user/list-54a9f692.js"></script>\n';
}
return new String($_output_);

}