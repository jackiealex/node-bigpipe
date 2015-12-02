module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var errorText;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '';

	var errorText = "未知错误" || content;

$_output_ += '\n<div class="error" style>\n\t';
$_output_ += errorText;
$_output_ += '\n</div>';
}
return new String($_output_);

}