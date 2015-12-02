module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
var pageValue,i,image;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-user-list">\n\t';

		var activeArray = [
			{text: '已屏蔽', isActive: ''},
			{text: '正常', isActive: ''},
			{text: '劣质', isActive: ''}
		];
		activeArray[status]['isActive'] = 'active';
	
$_output_ += '\n\t<div class="container">\n\t\t<div class="list">\n\t\t\t<div class="ui top attached tabular menu">\n\t\t\t\t<div class=" item">&nbsp;&nbsp;&nbsp;&nbsp;</div>\n\t\t\t\t';
for(var i = 0;i<activeArray.length;i++) { 
$_output_ += '\n\t\t\t\t';

					var tabItem = activeArray[i];
					var pageValue = currentPage;
					if(i != status) {
						pageValue = 1;
					}
				
$_output_ += '\n\t\t\t\t<a href="/publication/list?page=';
$_output_ += pageValue;
$_output_ += '&status=';
$_output_ += i;
$_output_ += '" class="';
$_output_ += tabItem['isActive'];
$_output_ += ' item action-paresh">';
$_output_ += tabItem['text'];
$_output_ += '</a>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t</div>\n\t\t\t<table class="ui  column table segment">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th width="10%">发布人昵称(';
$_output_ += list.length;
$_output_ += '个)</th>\n\t\t\t\t\t\t<th width="15%">时间</th>\n\t\t\t\t\t\t<th width="30%">文字</th>\n\t\t\t\t\t\t<th width="30%">照片</th>\n\t\t\t\t\t\t<th width="10%">状态</th>\n\t\t\t\t\t\t<th width="5%">操作</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t\t\t';

					var item = list[i];
					
$_output_ += '\n\t\t\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
$_output_ += item.nickname;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
$_output_ += item.text;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item['imagesUrl']){ 
$_output_ += '\n\t\t\t\t\t\t\t<div class="ui tiny images">\n\t\t\t\t\t\t\t\t';
 for(var j = 0; j < item['imagesUrl'].length; j ++) { 
$_output_ += '\n\t\t\t\t\t\t\t\t';

									var image = item['imagesUrl'][j];
								
$_output_ += '\n\t\t\t\t\t\t\t\t<img class="ui image" src="';
$_output_ += image;
$_output_ += '">\n\t\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.quality == 0){
$_output_ += '<a class="ui red tag label">已屏蔽</a>\n\t\t\t\t\t\t\t';
 }else if(item.quality == 1){
$_output_ += '<a class="ui teal tag label">正常</a>\n\t\t\t\t\t\t\t';
 }else{ 
$_output_ += '<a class="ui teal tag label">劣质</a>';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td><i name="status_operate" class="privacy icon" ></i></td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t';
if(page) { 
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t\t';
}
$_output_ += '\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/list-44aa292f.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/publication/list-24c21f82.js"></script>\n';
}
return new String($_output_);

}