module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
var pageValue,type,status,i;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-user-list">\n\t<div class="header">\n\t\t<a href="/poster/publish"  class="ui down button action-paresh">\n\t\t\t<i class="tag icon"></i>\n\t\t\t添加banner\n\t\t</a>\n\t</div>\n\t';

		var activeArray = [
			{text: '新手提示', isActive: ''},
			{text: '下线', isActive: ''},
			{text: '等待在线', isActive: ''},
			{text: '已上线', isActive: ''}
		];
		activeArray[tag]['isActive'] = 'active';
	
$_output_ += '\n\t<div class="container">\n\t\t<div class="list">\n\t\t\t<div class="ui top attached tabular menu">\n\t\t\t\t<div class=" item">&nbsp;&nbsp;&nbsp;&nbsp;</div>\n\t\t\t\t';
for(var i = 0;i<activeArray.length;i++) { 
$_output_ += '\n\t\t\t\t';

					var tabItem = activeArray[i];
					var pageValue = currentPage;
					if(i != tag) {
						pageValue = 1;
					}

					var type = 1;
					var status = 99;
					if(i != 0){
						type = 99;
						status = i - 1;
					}
				
$_output_ += '\n\t\t\t\t<a href="/poster/list?page=';
$_output_ += pageValue;
$_output_ += '&type=';
$_output_ += type;
$_output_ += '&status=';
$_output_ += status;
$_output_ += '&tag=';
$_output_ += i;
$_output_ += '" class="';
$_output_ += tabItem['isActive'];
$_output_ += ' item action-paresh">';
$_output_ += tabItem['text'];
$_output_ += '</a>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t</div>\n\t\t\t<table class="ui  column table segment">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>图片(';
$_output_ += list.length;
$_output_ += '个)</th>\n\t\t\t\t\t\t<th>链接</th>\n\t\t\t\t\t\t<th>链接类型</th>\n\t\t\t\t\t\t<th>banner方式</th>\n\t\t\t\t\t\t<th>开始时间</th>\n\t\t\t\t\t\t<th>结束时间</th>\n\t\t\t\t\t\t';
 if(tag != 1){ 
$_output_ += '<th>序号设置</th><th>操作</th>';
 } 
$_output_ += '\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t\t\t';

					var item = list[i];
					
$_output_ += '\n\t\t\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '">\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
if(!item.imageUrl) {
							item.imageUrl = '/static/img/default.png';
							}
$_output_ += '\n\t\t\t\t\t\t\t<img src="';
$_output_ += item.imageUrl;
$_output_ += '" />\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>';
$_output_ += item.link;
$_output_ += '</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.linkType == 1){
$_output_ += '链接';
 }else{ 
$_output_ += 'APP下载';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.type == 1){
$_output_ += '新手提示';
 }else{ 
$_output_ += '运营活动';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
item.startDate = __$timeFormat.call(null, item.startDate);
$_output_ += item.startDate;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
item.endDate = __$timeFormat.call(null, item.endDate);
$_output_ += item.endDate;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t';
 if(tag != 1){ 
$_output_ += '\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<input type="number" name="data_order" min="1" value="';
$_output_ += item.order;
$_output_ += '"  />\n\t\t\t\t\t\t\t<i class="large green checkmark icon" name="order_submit"></i>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<div class="ui teal button" name="offline_setting">下线</div>\n\t\t\t\t\t\t\t<a href="/poster/modify?id=';
$_output_ += item.id;
$_output_ += '"  class="ui down button action-paresh">\n\t\t\t\t\t\t\t\t<i class="tag icon"></i>\n\t\t\t\t\t\t\t\t修改banner\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t</tr>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t';
if(page) { 
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t\t';
}
$_output_ += '\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/list-44aa292f.css">\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/poster/list-883082ec.js"></script>\n';
}
return new String($_output_);

}