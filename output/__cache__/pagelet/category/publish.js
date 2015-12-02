module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var pid,isSelected,len;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/category/publish-eacfa799.css">\n<div class="mod-interestlabel-publish">\n\t<div class="row" style="margin-top: 0">\n\t\t<a class="ui active primary button action-paresh" href="/category/list">\n\t\t  <i class="chevron  left icon"></i>\n\t\t  返回\n\t\t</a>\n\t</div>\n\t<form action="/category/create" method="post" class="create-interestlabel">\n\t';
$_output_ += __$include('./__cache__/common/widgets/input-image-preview.html', {name: 'files'});
$_output_ += '\n\t<div class="row">\n\t\t<div class="ui icon input">\n\t\t\t<input type="text" name="name" placeholder="名称">\n\t\t\t<i class="tag  icon"></i>\n\t\t</div>\n\t</div>\n\t\n\t<div class="row" style="width: 400px;">\n\t\t<div class="ui form">\n\t\t\t<textarea style="min-height: 48px;height: 48px; width: 100%;" placeholder="说点什么......" name="content"></textarea>\n\t\t</div>\n\t</div>\n\t<div class="row">\n\t\t<input type="hidden" name="id" value="';
$_output_ += pid;
$_output_ += '">\n\t</div>\n\t</form>\n\t<ul class="category-list">\n\t';
 for(var i = 0; i < list.length; i++) { 
$_output_ += '\n\t';

		var cate = list[i];
		var subcateArray = list[i].subcate || [];
		var len = subcateArray.length;
		var isSelected = '';
		if(cate.id == pid) {
			isSelected = 'selected';
		}
	
$_output_ += '\n\t\t<li class="category-list-item ';
$_output_ += isSelected;
$_output_ += '" data-id="';
$_output_ += cate.id;
$_output_ += '">\n\t\t\t<p class="name">';
$_output_ += cate.name;
$_output_ += '</p>\n\t\t\t<img src="';
$_output_ += cate.surfaceImg;
$_output_ += '" title="';
$_output_ += len;
$_output_ += '个子项目">\n\t\t</li>\n\t';
 } 
$_output_ += '\n\t</ul>\n\t<div class="tips">\n\t\t点击选择分类父级，再次点击取消选择（可选操作）\n\t</div>\n\t<div class="row">\n\t\t<div class=" btn-submit positive ui button">提交</div>\n\t</div>\n</div>\n\n\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/category/publish-fdf3da94.js"></script>';
}
return new String($_output_);

}