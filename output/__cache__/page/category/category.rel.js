module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-atlas-rel-category">\n\t<div class="left">\n\t\t<div class="left-wrap">\n\t\t\t<div class="search-input">\n\t\t\t\t<div class="ui fluid icon input">\n\t\t\t\t\t<input type="text" placeholder="搜索标签...">\n\t\t\t\t\t<i class="tag icon"></i>\n\t\t\t\t\t<div class="ui-suggestion"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="box">\n\t\t\t\t';
 for(var i = 0; i < list.length; i++) { 
$_output_ += '\n\t\t\t\t\t';

						var cate = list[i];
						var subcateArray = list[i].subcate || [];
						var len = subcateArray.length;
					
$_output_ += '\n\t\t\t\t\t<ul class="category-list">\n\t\t\t\t\t\t<li class="category-list-title category-list-item" data-id="';
$_output_ += cate.id;
$_output_ += '">\n\t\t\t\t\t\t\t<p class="name">';
$_output_ += cate.name;
$_output_ += '</p>\n\t\t\t\t\t\t\t<img src="';
$_output_ += cate.surfaceImg;
$_output_ += '" alt="">\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t';
 for(var j = 0; j < len; j++) { 
$_output_ += '\n\t\t\t\t\t\t';

							var subcateItem = subcateArray[j];

						
$_output_ += '\n\t\t\t\t\t\t<li class="category-list-item label" data-id="';
$_output_ += subcateItem.id;
$_output_ += '" >\n\t\t\t\t\t\t\t<p class="name">';
$_output_ += subcateItem.name;
$_output_ += '</p>\n\t\t\t\t\t\t\t<img src="';
$_output_ += subcateItem.surfaceImg;
$_output_ += '" alt="">\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t';
 } 
$_output_ += '\t\n\t\t\t\t\t</ul>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="middle">\n\t\t<div class="title">\n\t\t\t<a class="user-link" target="_blank" href="#" title="查看她的图集">\n\t\t\t\t<img src="" alt="">\n\t\t\t\t<p class="btn-recommend" data-id="">\n\t\t\t\t\t推荐\n\t\t\t\t</p>\n\t\t\t</a>\n\t\t\t<div class="info">\n\t\t\t\t<p class="name"></p>\n\t\t\t\t<p class="time"></p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="middle-box">\n\t\t\t<div class="main-img">\n\t\t\t\t<img src="" class="img" alt="" >\n\t\t\t\t<div class="prev">\n\t\t\t\t\t<div class="arrow-left">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="next">\n\t\t\t\t\t<div class="arrow-right">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t\t<div class="middle-bottom">\n\t\t\t\t<p>已关联标签</p>\n\t\t\t\t<div class="label-box">\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<div class="ui buttons status" style="margin-bottom: 16px;">\n\t\t\t\t\t\t<button class="ui  button" data-id="2">忽略</button>\n\t\t\t\t\t\t<div class="or"></div>\n\t\t\t\t\t\t<button class="ui  button" data-id="4">待定</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="ui blue big button btn-rel">保存</div>\n\t\t\t\t<div class="ui blue big button btn-filter green">筛选</div>\n\t\t\t    <div class="checkbox" title="自动翻页"></div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class="right" id="wrapper">\n\t\t<div class="sub-img-box" id=\'scroller\'>\n\t\t\t<div class="all-img-box"> </div>\n\t\t</div>\n\t\t<div class="console">\n\t\t\t<p class="index">10</p>\n\t\t\t<p class="hr">——</p>\n\t\t\t<p class="page">20</p>\n\t\t</div>\n\t</div>\n\t<div class="filter">\n\t\t<div class="ui form">\n\t\t\t<div class="three fields">\n\t\t\t\t<div class="field ui icon input">\n\t\t\t        <i class="calendar icon"></i>\n\t\t\t        <input placeholder="日期" type="text" name="date" class="date">\n\t\t\t    </div>\n\t\t\t\t<div class="field">\n\t\t\t\t\t<select>\n\t\t\t\t\t\t<option value="99">全部</option>\n\t\t\t\t\t\t<option value="1">未编辑</option>\n\t\t\t\t\t\t<option value="2">忽略</option>\n\t\t\t\t\t\t<option value="4">待定</option>\n\t\t\t\t\t\t<option value="5">已完成</option>\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t\t<div class="field ui button btn-query black">筛选</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="btn-close">收起</div>\n\t</div>\n\t<script type="text/javascript"  src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/base/iscroll-835a4eb9.js"></script>\n\t<script type="text/javascript"  src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/category/rel-43aedd37.js"></script>\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/category/rel-5c85a4f6.css">\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n</div>\n';
}
return new String($_output_);

}