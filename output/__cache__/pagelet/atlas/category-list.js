module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<ul class="category-list">\n';
 for(var i = 0; i < list.length; i++) { 
$_output_ += '\n';

	var cate = list[i];
	var subcateArray = list[i].subcate || [];
	var len = subcateArray.length;
	var isSelected = '';
	if(cate.id == pid) {
		isSelected = 'selected';
	}

$_output_ += '\n\t';
 for(var j = 0; j < len; j++) { 
$_output_ += '\n\t';

		var subcateItem = subcateArray[j];
	
$_output_ += '\n\t<li class="category-list-item" data-id="';
$_output_ += subcateItem.id;
$_output_ += '">\n\t\t<p class="name">';
$_output_ += subcateItem.name;
$_output_ += '</p>\n\t\t<img src="';
$_output_ += subcateItem.surfaceImg;
$_output_ += '" title="';
$_output_ += subcateItem.name;
$_output_ += '">\n\t</li>\n\t';
 } 
$_output_ += '\t\n';
 } 
$_output_ += '\n</ul>\n<div class="tips">\n\t点击选择分类，再次点击取消选择（可选操作）\n</div>';
}
return new String($_output_);

}