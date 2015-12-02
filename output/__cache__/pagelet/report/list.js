module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
var key;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '';

	var key = key;

$_output_ += '\n<div class="mod-report-list">\n \t<div class="header">\n \t\t<div class="ui form">\n \t\t\t<div class="fields">\n\t\t \t\t<div class=" field inline ">\n\t\t\t \t\t<div class="ui  input corner labeled">\n\t\t\t\t\t\t<input type="text" placeholder="搜索举报项" onfocus="this.select()" value="';
$_output_ += key;
$_output_ += '">\n\t\t\t\t\t\t';
 if(key) {
$_output_ += '\n\t\t\t\t\t\t<div class="ui corner label" title="清除">       \n\t\t\t\t\t\t\t<i class="remove icon"></i>      \n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=" field inline ">\n\t\t\t\t\t<div class=" field inline ">\n\t\t\t\t\t\t<div class="ui active blue  button">\n\t\t\t\t\t\t  <i class="search icon"></i>\n\t\t\t\t\t\t  搜索\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n \t</div>\n \t<div class="container">\n \t\t<div class="list">\n\t \t\t<div class="ui top attached tabular menu">\n\t \t\t\t<div class=" item">&nbsp;&nbsp;&nbsp;&nbsp;</div>\n\t\t\t\t';

					var activeArray = ['', '', '', ''];
					if (typeof status == "undefined" || status == null) {
						activeArray[3] = 'active';
					}
					else {
						activeArray[status] = 'active';
					}
				
$_output_ += '\n\t\t\t\t<a class="';
$_output_ += activeArray[3];
$_output_ += ' item action-paresh" href="/report/list">全部</a>\n\t\t\t\t<a class="';
$_output_ += activeArray[0];
$_output_ += ' item action-paresh" href="/report/list?status=0">\n\t\t\t\t\t未处理\n\t\t\t\t</a>\n\t\t\t\t<a class="';
$_output_ += activeArray[2];
$_output_ += ' item action-paresh" href="/report/list?status=2">\n\t\t\t\t\t同意\n\t\t\t\t</a>\n\t\t\t\t<a class="';
$_output_ += activeArray[1];
$_output_ += ' item action-paresh" href="/report/list?status=1">\n\t\t\t\t\t拒绝\n\t\t\t\t</a>\n\t\t\t</div>\n \t\t\t<table class="ui attached column table segment">\n \t\t\t\t<thead>\n \t\t\t\t\t<tr>\n \t\t\t\t\t\t<th>类型</th>\n \t\t\t\t\t\t<th>内容</th>\n \t\t\t\t\t\t<th>时间</th>\n \t\t\t\t\t\t<th>状态</th>\n \t\t\t\t\t\t<th>处理</th>\n \t\t\t\t\t</tr>\n \t\t\t\t</thead>\n \t\t\t\t<tbody>\n \t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n \t\t\t\t\t';

 						var item = list[i];
 					
$_output_ += '\n \t\t\t\t\t<tr class="item row" data-id="';
$_output_ += item.id;
$_output_ += '">\n \t\t\t\t\t\t\n \t\t\t\t\t\t';
 if (item.type == 1) { 
$_output_ += '\n \t\t\t\t\t\t<td class="type">交易投诉</td>\n \t\t\t\t\t\t';
 } else if (item.type == 2) { 
$_output_ += '\n \t\t\t\t\t\t<td class="type">评论投诉</td>\n \t\t\t\t\t\t';
 } else if (item.type == 3) { 
$_output_ += '\n \t\t\t\t\t\t<td class="type">举报用户</td>\n \t\t\t\t\t\t';
 } else if (item.type == 4) { 
$_output_ += '\n \t\t\t\t\t\t<td class="type">举报歌曲</td>\n \t\t\t\t\t\t';
 } else if (item.type == 5) { 
$_output_ += '\n\t\t\t\t\t\t<td class="type">他人页评论列表投诉</td>\n \t\t\t\t\t\t';
 } 
$_output_ += '\n\n \t\t\t\t\t\t<td class="desc">';
$_output_ += item.description;
$_output_ += '</td>\t\n \t\t\t\t\t\t<td class="date">';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '</td>\t\n \t\t\t\t\t\t<td class="status">';
$_output_ += item.status;
$_output_ += '</td>\t\n \t\t\t\t\t\t<td class="status">\n \t\t\t\t\t\t\t';
 if (item.status == 0) { 
$_output_ += '\n \t\t\t\t\t\t\t<div class="ui button btn-handle">\n \t\t\t\t\t\t\t\t<i class="mail icon"></i>\n \t\t\t\t\t\t\t\t点击处理\n \t\t\t\t\t\t\t</div>\n \t\t\t\t\t\t\t';
 } else if (item.status == 2) { 
$_output_ += '\n\t\t\t\t\t\t\t<div class="ui green button">\n \t\t\t\t\t\t\t\t<i class="mail icon"></i>\n \t\t\t\t\t\t\t\t已同意\n \t\t\t\t\t\t\t</div>\n \t\t\t\t\t\t\t';
 } else if (item.status == 1) { 
$_output_ += '\n \t\t\t\t\t\t\t<div class="ui red button">\n \t\t\t\t\t\t\t\t<i class="mail icon"></i>\n \t\t\t\t\t\t\t\t已拒绝\n \t\t\t\t\t\t\t</div>\n \t\t\t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t\t\t</td>\t\n \t\t\t\t\t</tr>\n \t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t</tbody>\n \t\t\t</table>\n \t\t\t';
if(page) { 
$_output_ += '\n \t\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n \t\t\t';
 } 
$_output_ += '\n \t\t</div>\n \t</div>\n</div> \n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/report/list-a9a30417.css">\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/order/list-a18b65ad.css">\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/report/list-787d4914.js"></script>\n';
}
return new String($_output_);

}