module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var clsName,name,title;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '';

 	var name = name || 'imageFile';
 	var title = title || '选择图片';
 	var clsName = clsName || '';

$_output_ += '\n<div class="row ';
$_output_ += clsName;
$_output_ += '">\n\t \n\t<div class="ui-input-image-preview">\n\t\t<img src="http://7xlphm.com1.z0.glb.clouddn.com/static/img/icons/image-uploader-dced0761.png" alt="默认图片">\n\t\t<input type="file" name="';
$_output_ += name;
$_output_ += '" title="';
$_output_ += title;
$_output_ += '" accept="image/*" required  />\n\t</div>\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/common/input-image-preview-22984c54.css">\n</div>';
}
return new String($_output_);

}