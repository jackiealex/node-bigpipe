module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var nickname,createDate,genderText,statusText;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-user-list">\n\t<div class="header">\n\t\t<div class="ui form">\n\t\t\t<div class="fields">\n\t\t\t\t<div class=" field inline"  data-field="nickname">\n\t\t\t\t\t<div class="ui small icon input   corner labeled   ">\n\t\t\t\t\t\t<input type="text" placeholder="昵称或电话" onfocus="this.select()" value="';
$_output_ += nickname;
$_output_ += '" style="width: 200px" />\n\t\t\t\t\t\t';
 if(nickname) {
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
$_output_ += '\n\t\t\t\t<div class=" field inline ">\n\t\t\t\t\t<div class="ui labeled icon top left pointing dropdown button green">\n\t\t\t\t\t\t<span class="text">高级查询</span>\n\t\t\t\t\t\t<i class="filter icon"></i>\n\t\t\t\t\t\t<div class="menu">\n\t\t\t\t\t\t\t<div class="header">\n\t\t\t\t\t\t\t\t<i class="filter icon"></i>\n\t\t\t\t\t\t\t\t提示，以下过滤器类型为AND\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="divider"></div>\n\t\t\t\t\t\t\t<div class="header">\n\t\t\t\t\t\t\t\t<i class="intergender icon"></i>\n\t\t\t\t\t\t\t\t选择性别\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item gender-item" data-field="gender" data-value="male">\n\t\t\t\t\t\t\t\t<div class="ui red empty circular label"></div>\n\t\t\t\t\t\t\t\t男\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item gender-item " data-field="gender" data-value="female" >\n\t\t\t\t\t\t\t\t<div class="ui green empty circular label"></div>\n\t\t\t\t\t\t\t\t女\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="divider"></div>\n\t\t\t\t\t\t\t<div class="header">\n\t\t\t\t\t\t\t\t<i class="spy icon"></i>\n\t\t\t\t\t\t\t\t选择状态\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="item status" data-field="status" data-value="1">\n\t\t\t\t\t\t\t\t<i class="lightning icon status-item"></i>\n\t\t\t\t\t\t\t\t在线状态\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=" field inline ">\n\t\t\t\t\t<div class="ui active blue  button search">\n\t\t\t\t\t\t<i class="search icon"></i>\n\t\t\t\t\t\t搜索\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="row" style="padding: 12px 0">\n\t\t\t<a class="ui down button orange btn-select-all">\n\t\t\t\t<i class="checkmark  box icon"></i>\n\t\t\t\t全选\n\t\t\t</a>\n\t\t\t<a class="ui down button orange btn-reverse-select">\n\t\t\t\t<i class="checkmark  box icon"></i>\n\t\t\t\t反选\n\t\t\t</a>\n\t\t\t<div class="ui labeled button " tabindex="0">\n\t\t\t\t<div class="ui red button btn-add-cart">\n\t\t\t\t\t<i class="add to cart icon"></i> 加入已选\n\t\t\t\t</div>\n\t\t\t\t<a class="ui basic red left pointing label btn-show-cart">\n\t\t\t\t\t0项 （点击查看）\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="container">\n\t\t<div class="list">\n\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t';

			var item = list[i];
			
$_output_ += '\n\t\t\t<div class="item " title="';
$_output_ += item.id;
$_output_ += '" data-id="';
$_output_ += item.id;
$_output_ += '" data-phone="';
$_output_ += item.phone;
$_output_ += '">\n\t\t\t\t<div class="wrap">\n\t\t\t\t\t';
if(!item.headPortrait) {
					item.headPortrait = '/static/img/default.png';
					}
$_output_ += '\n\t\t\t\t\t<img src="';
$_output_ += item.headPortrait;
$_output_ += '" />\n\t\t\t\t\t<div class="profile">\n\t\t\t\t\t\t<p class="name">';
$_output_ += item.nickname;
$_output_ += '</p>\n\t\t\t\t\t\t<p class="property">';
$_output_ += item.gender;
$_output_ += '</p>\n\t\t\t\t\t\t<p class="property">';
$_output_ += item.phone;
$_output_ += '</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t';
 } 
$_output_ += '\n\t\t\t\n\t\t\t\n\t\t</div>\n\t\t';
 if (page) { 
$_output_ += '\n\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t';
 } 
$_output_ += '\n\t</div>\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/message-by-group/list-8bb654cc.css">\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/list-44aa292f.css">\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n\t<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n\t \n\t<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/message-by-group/index-107b4a34.js"></script>\n</div>\n\n\n';
}
return new String($_output_);

}