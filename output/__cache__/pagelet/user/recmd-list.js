module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/list-44aa292f.css">\n\n<div class="mod-user-list">\n\t<ul class="list" >\n\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t';

			var item = list[i];
		
$_output_ += '\n\n\t\t<li class="item" data-id="';
$_output_ += item['id'];
$_output_ += '">\n\t\t\t<div class="img-wrap">\n\t\t\t\t<img class="lazy-load" data-original="';
$_output_ += item['headUrl'];
$_output_ += '" alt="" />\n\t\t\t</div>\n\t\t\t<div class="info">\n\t\t\t\t';
$_output_ += item['nickname'];
$_output_ += '\n\t\t\t</div>\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\t</ul>\n</div>\n \n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/lib/animate-e78c4ece.css">\n \n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/user/recommend-32ecc6ca.js"></script>\n';
}
return new String($_output_);

}