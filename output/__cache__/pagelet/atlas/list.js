module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var type;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '\n<style>\n\t#content {\n\t\tbackground: rgb(238, 238, 238);\n\t}\n</style>\n\n<div class="mod-atlas-list" data-type="';
$_output_ += type;
$_output_ += '">\n\t';

		var tabName = tabName || 'all';
		var tabAll = '';
		var tabMine = '';
		var tabTimer = '';
		var tabPopout = '';
		if (tabName == 'mine') {
			tabMine = 'on';
		} else if (tabName == 'timer') {
			tabTimer = 'on';
		} else if (tabName == 'top') {
			tabPopout = 'on';
		} else {
			tabAll = 'on'
		}
	
$_output_ += '\n \t';

		var list = data['list'];
	
$_output_ += '\n\t<div class="box-wrapper">\n\t\t<div class="ui active centered large inline loader" style="height: 100%; display: block; width: 100%;"></div>\n\t</div>\n\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/atlas/list-88287ec1.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/common/lazy-ffe4f07a.js"></script>\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/atlas/list-3a50079c.js"></script>\n';
}
return new String($_output_);

}