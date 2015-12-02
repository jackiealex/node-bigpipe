module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var key,type,pageValue,i;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-music-list mod" >\n\t<div class="header">\n\t\t<div class="ui icon input">\n\t\t\t';
 if(key) { 
$_output_ += '\n\t\t\t<input type="text" placeholder="搜索歌曲"  value="';
$_output_ += key;
$_output_ += '">\n\t\t\t';
 } else{ 
$_output_ += '\n\t\t\t<input type="text" placeholder="搜索歌曲"  value="">\n\t\t\t';
 } 
$_output_ += '\n\t\t\t<i class="circular search icon action-paresh" data-url=""></i>\n\t\t</div>\n\t\t';
 if(_PUBLISH_) {
$_output_ += '\n\t\t<a href="/music/publish"  class="ui down button action-paresh">\n\t\t\t<i class="tag icon"></i>\n\t\t\t添加歌曲\n\t\t</a>\n\t\t';
 } 
$_output_ += '\n\n\t\t<div class="ui icon buttons btn-make">\n\t\t<a class="ui down button green btn-select-all">\n\t\t\t<i class="checkmark  box icon"></i>\n\t\t\t全选\n\t\t</a>\n\t\t<a class="ui down button green btn-reverse-select">\n\t\t\t<i class="checkmark  box icon"></i>\n\t\t\t反选\n\t\t</a>\n\t\t</div>\n\n\t\t<div class="ui icon buttons btn-do">\n\t\t\t\n\t\t\t<div class="ui  button disabled btn-online btn-o2o">\n\t\t\t\t<i class="arrow up green icon"></i>\n\t\t\t\t上线\n\t\t\t</div>\n\t\t\t<div class="ui  button disabled btn-offline btn-o2o">\n\t\t\t\t<i class="arrow down red  icon"></i>\n\t\t\t\t下线\n\t\t\t</div>\n\t\t\t<div class="ui  button btn-hot disabled" data="';
$_output_ += type;
$_output_ += '">\n\t\t\t\t<i class="certificate icon"></i>\n\t\t\t\t';
 if(type==1) { 
$_output_ += '提交排序 ';
 } else {
$_output_ += ' 设为热门 ';
 } 
$_output_ += '\n\t\t\t</div>\n\t\t\t';
 if(type==1) { 
$_output_ += '\n\t\t\t<div class="ui down button btn-unhot disabled">\n\t\t\t\t<i class="certificate icon"></i>\n\t\t\t\t取消热门\n\t\t\t</div>\n\t\t\t';
 } 
$_output_ += '\n\t\t</div>\n\t</div>\n\t';

		var activeArray = [
			{text: '全部', isActive: ''},
			{text: '热门', isActive: ''},
			{text: '华语', isActive: ''},
			{text: '日韩', isActive: ''},
			{text: '欧美', isActive: ''},
			{text: '其它', isActive: ''}
		];
		activeArray[type]['isActive'] = 'active';
	
$_output_ += '\n\t<div class="container">\n \t\t<div class="list">\n \t\t\t<div class="ui top attached tabular menu">\n\t\t\t\t<div class=" item">&nbsp;&nbsp;&nbsp;&nbsp;</div>\n\t\t\t\t';
for(var i = 0;i<activeArray.length;i++) { 
$_output_ += '\n\t\t\t\t';

					var tabItem = activeArray[i];
					var pageValue = currentPage;
					if(i != type) {
						pageValue = 1;
					}
				
$_output_ += '\n\t\t\t\t<a href="/music/list?page=';
$_output_ += pageValue;
$_output_ += '&type=';
$_output_ += i;
$_output_ += '" class="';
$_output_ += tabItem['isActive'];
$_output_ += ' item action-paresh">';
$_output_ += tabItem['text'];
$_output_ += '</a>\n\t\t\t\t';
 } 
$_output_ += '\n \t\t\t</div>\n \t\t\t<table class="ui table striped selectable attached">\n \t\t\t\t<thead>\n \t\t\t\t\t<tr>\n \t\t\t\t\t\t<th>选择(';
$_output_ += list.length;
$_output_ += '首)</th>\n \t\t\t\t\t\t<th>歌曲</th>\n \t\t\t\t\t\t<th>歌手</th>\n \t\t\t\t\t\t<th>专辑</th>\n \t\t\t\t\t\t<th>区域</th>\n \t\t\t\t\t\t<th>序号</th>\n \t\t\t\t\t\t<th>状态</th>\n\t\t\t\t\t\t<th>操作</th>\n \t\t\t\t\t</tr>\n \t\t\t\t</thead>\n \t\t\t\t<tbody>\n \t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n \t\t\t\t\t';

 						var item = list[i];
 					
$_output_ += '\n \t\t\t\t\t<tr class="item">\n \t\t\t\t\t\t<td class="select">\n\t\t\t\t\t\t\t<input type="checkbox" value="';
$_output_ += item.id;
$_output_ += '"  />\n\t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td style="max-width: 200px;">\n \t\t\t\t\t\t\t<a target="_blank" href="';
$_output_ += item.audioUrl;
$_output_ += '" class="name">';
$_output_ += item.name;
$_output_ += '</a>\n \t\t\t\t\t\t\t<a target="_blank" href="';
$_output_ += item.lyricUrl;
$_output_ += '">歌词</a>\n \t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td class="artist">';
$_output_ += item.artist;
$_output_ += '</td>\n \t\t\t\t\t\t<td style="...">《';
$_output_ += item.album;
$_output_ += '》</td>\n \t\t\t\t\t\t<td>\n \t\t\t\t\t\t';
 if(item.area == 1){ 
$_output_ += '\n \t\t\t\t\t\t\t华语\n \t\t\t\t\t\t';
 } else if(item.area == 2){ 
$_output_ += '\n \t\t\t\t\t\t\t日韩\n \t\t\t\t\t\t';
 } else if(item.area == 3){
$_output_ += '\n \t\t\t\t\t\t\t欧美\n \t\t\t\t\t\t';
 } else { 
$_output_ += '其他';
 } 
$_output_ += '\n \t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td class="order">\n \t\t\t\t\t\t\t';
 if(type == 1){ 
$_output_ += '\n \t\t\t\t\t\t\t\t<div class="ui small icon input">\n \t\t\t\t\t\t\t\t\t<input type="text" name="data_order" value="';
$_output_ += item.order;
$_output_ += '"  />\n \t\t\t\t\t\t\t\t\t<i class="order icon"></i>\n \t\t\t\t\t\t\t\t</div>\n \t\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n \t\t\t\t\t\t\t\t\t';
$_output_ += item.order;
$_output_ += '\n \t\t\t\t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td>\n \t\t\t\t\t\t\t';
if(item.status==1) { 
$_output_ += '\n \t\t\t\t\t\t\t<i class="arrow up green icon"></i>\n\t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t<i class="arrow down red icon"></i>\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<a href="/music/modify?id=';
$_output_ += item.id;
$_output_ += '"  class="ui down button action-paresh">\n\t\t\t\t\t\t\t\t<i class="tag icon"></i>\n\t\t\t\t\t\t\t\t修改歌曲\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</td>\n \t\t\t\t\t</tr>\n \t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t</tbody>\n \t\t\t</table>\n \t\t\t';
 if (page) { 
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t\t';
 } 
$_output_ += '\n \t\t</div>\n \t</div>\n</div>\n\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/music/list-99131dc7.css">\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/music/list-ec1e339a.js"></script>\n';
}
return new String($_output_);

}