module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-label-list mod" >\n\t<div class="header">\n\t\t<div class="ui icon input">\n\t\t\t<input type="text" placeholder="搜索标签"  value="">\n\t\t\t<i class="circular search icon action-paresh" data-url=""></i>\n\t\t</div>\n\t\t';
 if(_PUBLISH_) {
$_output_ += '\n\t\t<a href="/label/publish"  class="ui down button action-paresh">\n\t\t\t<i class="tag icon"></i>\n\t\t\t添加标签\n\t\t</a>\n\t\t';
 } 
$_output_ += '\n\t</div>\n\t<div class="container">\n\t\t<ul class="list">\n\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t';

			var item = list[i];
			
$_output_ += '\n\t\t\t<li class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t<h2>#<span>';
$_output_ += item.name;
$_output_ += '</span></h2>\n\t\t\t\t<div class="wrap">\n\t\t\t\t\t<p class="intro">\n\t\t\t\t\t<i class="left file text icon"></i>\n\t\t\t\t\t\t';
if(item.intro) {
$_output_ += '\n\t\t\t\t\t\t\t';
$_output_ += item.intro;
$_output_ += '\n\t\t\t\t\t\t';
}else {
$_output_ += '\n\t\t\t\t\t\t\t－－\n\t\t\t\t\t\t';
 }
$_output_ += '\n\t\t\t\t\t</p>\n\t\t\t\t\t<p>\n\t\t\t\t\t<i class="left wait icon"></i>\n\t\t\t\t\t\t';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '\n\t\t\t\t\t</p>\n\t\t\t\t\t<p class="order">\n\t\t\t\t\t\t<i class="left ordered list icon"></i>\n\t\t\t\t\t\t';
$_output_ += item.order;
$_output_ += '\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="ui two bottom attached buttons blue">\n\t\t\t\t\t<button class="ui button  btn-edit" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t\t<i class="left edit icon"></i>\n\t\t\t\t\t编辑\n\t\t\t\t\t</button>\n\t\t\t\t\t<button class="ui button  btn-delete" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t\t<i class="left remove icon"></i>\n\t\t\t\t\t删除\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<p class="wave"></p>\n\t\t\t</li>\n\t\t\t';
 } 
$_output_ += '\n\t\t</ul>\n\t\t';
 if (page) { 
$_output_ += '\n\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t';
 } 
$_output_ += '\n\t</div>\n\t\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/label/list-229a375f.css">\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/label/list-f7bf2c94.js"></script>';
}
return new String($_output_);

}