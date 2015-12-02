module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="pull">.<br>.<br>.<br>.<br>.</div>\n<ul class="robot">\n';

for(var i = 0; i<users.length; i++) {
var item = users[i];

$_output_ += '\n<li class="robotman" data-id=\'';
$_output_ += item.id;
$_output_ += '\' data-name="';
$_output_ += item.nickname;
$_output_ += '">\n\t<img src="';
$_output_ += item.headUrl;
$_output_ += '" alt="">\n</li>\n';
 } 
$_output_ += '\n<li class="change-next">换一批</li>\n</ul>';
}
return new String($_output_);

}