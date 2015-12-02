module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/category/list-ece08f7e.css">\n \n<div class="mod-interestlabel-list mod" >\n\t<div class="list-header">\n\t\t<a href="/category/publish"  class="ui down button action-paresh">\n\t\t\t<i class="tag icon"></i>\n\t\t\t增加兴趣分类\n\t\t</a>\n\t\t<div class="ui down button img-category-relation">\n\t\t    <i class="sitemap icon"></i>\n\t\t\t分类图集\n\t\t</div>\n\t</div>\n\t<div class="category">\n\t\t';
 for(var i = 0; i < list.length; i++) { 
$_output_ += '\n\t\t\t';

				var cate = list[i];
				var subcateArray = list[i].subcate || [];
				var len = subcateArray.length;
			
$_output_ += '\n\t\t\t<ul class="category-list">\n\t\t\t\t<li class="category-list-title category-list-item" data-id="';
$_output_ += cate.id;
$_output_ += '">\n\t\t\t\t\t<p class="name">';
$_output_ += cate.name;
$_output_ += '</p>\n\t\t\t\t\t<img src="';
$_output_ += cate.surfaceImg;
$_output_ += '" alt="">\n\t\t\t\t\t<div class="options">\n\t\t\t\t\t\t<p class="edit" title="编辑">编辑</p>\n\t\t\t\t\t\t<p class="delete" title="删除">删除</p>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t';
 for(var j = 0; j < len; j++) { 
$_output_ += '\n\t\t\t\t';

					var subcateItem = subcateArray[j];

				
$_output_ += '\n\t\t\t\t<li class="category-list-item" data-id="';
$_output_ += subcateItem.id;
$_output_ += '" >\n\t\t\t\t\t<p class="name">';
$_output_ += subcateItem.name;
$_output_ += '</p>\n\t\t\t\t\t<img src="';
$_output_ += subcateItem.surfaceImg;
$_output_ += '" alt="">\n\t\t\t\t\t<div class="options">\n\t\t\t\t\t\t<p class="edit" title="编辑">编辑</p>\n\t\t\t\t\t\t<p class="delete" title="删除">删除</p>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t';
 } 
$_output_ += '\t\n\t\t\t\t<li class="category-list-append action-paresh" data-url="/category/publish?pid=';
$_output_ += cate.id;
$_output_ += '"  class="action-paresh">\n\t\t\t\t\t添加\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t';
 } 
$_output_ += '\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/aui-artDialog/css/ui-dialog-e8888bf8.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/aui-artDialog/dist/dialog-min-363c6ec2.js"></script>\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/category/list-9a9cf492.js"></script>\n ';
}
return new String($_output_);

}