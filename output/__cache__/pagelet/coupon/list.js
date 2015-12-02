module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/coupon/list-1a98e503.css">\n';

	var key = key;

$_output_ += '\n<div class="mod-coupon-list mod" >\n \t<div class="header">\n\t\t<a href="/coupon/publish"  class="action-paresh ui down button">\n\t\t\t<i class="user icon"></i>\n\t\t\t添加红包配置\n\t\t</a>\n \t</div>\n \t<div class="container">\n \t\t<div class="list">\n \t\t\t<table class="ui  column table segment">\n \t\t\t\t<thead>\n \t\t\t\t\t<tr>\n \t\t\t\t\t\t<th>描述</th>\n \t\t\t\t\t\t<th>金额</th>\n \t\t\t\t\t\t<th>限制金额</th>\n \t\t\t\t\t\t<th>时长(天)</th>\n \t\t\t\t\t\t<th>标识</th>\n\t\t\t\t\t\t<th>方式</th>\n\t\t\t\t\t\t<th>操作(启用/停用)</th>\n \t\t\t\t\t</tr>\n \t\t\t\t</thead>\n \t\t\t\t<tbody>\n \t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n \t\t\t\t\t';

 						var item = list[i];
 					
$_output_ += '\n \t\t\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n \t\t\t\t\t\t<td>\n \t\t\t\t\t\t\t';
$_output_ += item.text;
$_output_ += '\n \t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td>';
$_output_ += item.money;
$_output_ += '</td>\n \t\t\t\t\t\t<td>';
$_output_ += item.limitMoney;
$_output_ += '</td>\n \t\t\t\t\t\t<td>';
$_output_ += item.time;
$_output_ += '</td>\n\t\t\t\t\t\t<td>';
$_output_ += item.code;
$_output_ += '</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.mode == 1){ 
$_output_ += '\n\t\t\t\t\t\t\t\t发放\n\t\t\t\t\t\t\t';
 }else{ 
$_output_ += '\n\t\t\t\t\t\t\t\t领用\n\t\t\t\t\t\t\t';
 }
$_output_ += '\n\t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
if(item.status==1) { 
$_output_ += '\n\t\t\t\t\t\t\t<div class="checked ui toggle checkbox">\n\t\t\t\t\t\t\t\t<input class="is-quality-change" type="checkbox" data="';
$_output_ += item.id;
$_output_ += '" name="status" checked />\n\t\t\t\t\t\t\t\t<label></label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t<div class="ui toggle checkbox">\n\t\t\t\t\t\t\t\t<input class="is-quality-change" type="checkbox" data="';
$_output_ += item.id;
$_output_ += '" name="status" />\n\t\t\t\t\t\t\t\t<label></label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n \t\t\t\t\t</tr>\n \t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t</tbody>\n \t\t\t</table>\n \t\t\t';
if(page) { 
$_output_ += '\n \t\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n \t\t\t';
}
$_output_ += '\n \t\t</div>\n \t</div>\n</div>\n\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/base/zepto-dnd-ff22b983.js"></script>\n';
}
return new String($_output_);

}