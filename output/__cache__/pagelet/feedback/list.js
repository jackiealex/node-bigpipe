module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
var pageValue,i;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-user-list">\n\t';

		var activeArray = [
			{text: '缺失歌曲反馈', isActive: ''},
			{text: '错误歌曲反馈', isActive: ''}
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
				
$_output_ += '\n\t\t\t\t<a href="/feedback/list?page=';
$_output_ += pageValue;
$_output_ += '&type=';
$_output_ += i;
$_output_ += '" class="';
$_output_ += tabItem['isActive'];
$_output_ += ' item action-paresh">';
$_output_ += tabItem['text'];
$_output_ += '</a>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t</div>\n\t\t\t<table class="ui  column table segment">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t';
 if(type == 0){ 
$_output_ += '\n\t\t\t\t\t\t\t<th>歌名(';
$_output_ += list.length;
$_output_ += '个)</th>\n\t\t\t\t\t\t\t<th>歌手名称</th>\n\t\t\t\t\t\t\t<th>类别</th>\n\t\t\t\t\t\t\t<th>反馈人</th>\n\t\t\t\t\t\t\t<th>反馈时间</th>\n\t\t\t\t\t\t\t<th>状态</th>\n\t\t\t\t\t\t\t<th>操作</th>\n\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t<th>歌名(';
$_output_ += list.length;
$_output_ += '个)</th>\n\t\t\t\t\t\t\t<th>歌手名称</th>\n\t\t\t\t\t\t\t<th>错误内容</th>\n\t\t\t\t\t\t\t<th>反馈人</th>\n\t\t\t\t\t\t\t<th>反馈时间</th>\n\t\t\t\t\t\t\t<th>状态</th>\n\t\t\t\t\t\t\t<th>操作</th>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t\t\t';

					var item = list[i];
					
$_output_ += '\n\t\t\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
$_output_ += item.accompanyName;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>';
$_output_ += item.artist;
$_output_ += '</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
if(type == 0) {
$_output_ += '\n\t\t\t\t\t\t\t';
$_output_ += item.area;
$_output_ += '\n\t\t\t\t\t\t\t';
} else {
$_output_ += '\n\t\t\t\t\t\t\t';
$_output_ += item.content;
$_output_ += '\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
$_output_ += item.nickname;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n \t\t\t\t\t\t\t';
if(item.status==2) { 
$_output_ += '\n \t\t\t\t\t\t\t<div class="checked ui toggle checkbox">\n \t\t\t\t\t\t\t  <input type="checkbox" data="';
$_output_ += item.id;
$_output_ += '" name="public" checked />\n \t\t\t\t\t\t\t  <label></label>\n \t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t<div class="ui toggle checkbox">\n\t\t\t\t\t\t\t  <input type="checkbox" data="';
$_output_ += item.id;
$_output_ += '" name="public" />\n\t\t\t\t\t\t\t  <label></label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(type == 0){ 
$_output_ += '\n\t\t\t\t\t\t\t<a href="/music/publish"  class="ui down button action-paresh">\n\t\t\t\t\t\t\t\t<i class="tag icon"></i>\n\t\t\t\t\t\t\t\t添加歌曲\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t<a href="/music/modify?id=';
$_output_ += item.accompanyId;
$_output_ += '"  class="ui down button action-paresh">\n\t\t\t\t\t\t\t\t<i class="tag icon"></i>\n\t\t\t\t\t\t\t\t修改歌曲\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t';
if(page) { 
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t\t';
}
$_output_ += '\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/list-44aa292f.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/feedback/list-97456829.js"></script>\n';
}
return new String($_output_);

}