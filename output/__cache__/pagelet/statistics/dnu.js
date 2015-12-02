module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var type,i,isActive;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-dnu"  data-type="';
$_output_ += type;
$_output_ += '">\n\t';

		var viewMap = {
			newuser: '新增用户',
			active: '活跃用户',
			atlas: '图集变化'
		}
	
$_output_ += '\n\t<div class="tab-header">\n\t\t<div class="ui top attached tabular menu">\n\t\t\t';
 for(var i in viewMap) { 
$_output_ += '\n\t\t\t';

				var isActive = '';
				if (type==i) {
					isActive = 'active';
				}
			
$_output_ += '\n\t\t\t<a href="/admin/dnu?type=';
$_output_ += i;
$_output_ += '" class="';
$_output_ += isActive;
$_output_ += ' item action-paresh">\t\t';
$_output_ += viewMap[i];
$_output_ += '\n\t\t\t</a>\n\t\t\t';
 } 
$_output_ += '\n\t\t</div>\n\t</div>\n\t<header>\n\t\t<div class="ui grid">\n\t\t\t<div class="three wide column">\n\t\t\t\t<div class="ui small icon input   corner labeled  ">\n\t\t\t\t\t<input readonly="readonly" placeholder="开始日期" type="text" class="dnu-start">\n\t\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t\t<div class="ui corner label" title="清除日期">\n\t\t\t\t\t\t<i class="remove icon"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="three wide column">\n\t\t\t\t<div class="ui small icon input   corner labeled  ">\n\t\t\t\t\t<input readonly="readonly" placeholder="结束日期" type="text" class="dnu-end">\n\t\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t\t<div class="ui corner label" title="清除日期">\n\t\t\t\t\t\t<i class="remove icon"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="two wide column">\n\t\t\t\t<button class="ui  button blue btn-date-click" > 确定 </button>\n\t\t\t</div>\n\t\t\t\n\t\t</div>\n\t\t<div class="ui grid">\n\t\t\t<div class="three wide column">\n\t\t\t\t<button class="ui  button blue btn-current-month">\n\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t本月\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<div class="three wide column">\n\t\t\t\t<button class="ui  button blue btn-current-week" >\n\t\t\t\t<i class="unhide icon"></i>\n\t\t\t\t本周\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t\t<div class="three wide column">\n\t\t\t\t<button class="ui  button blue btn-today" >\n\t\t\t\t<i class="unhide icon"></i>\n\t\t\t\t今天\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t</header>\n\t<div class="diagram-box">\n\t\t<div class="ui segment" style="height: 100%;">\n\t\t\t<div class="ui active inverted dimmer" style="border: none">\n\t\t\t\t<div class="ui text loader">加载中.....</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/statistics/dnu-81c13e0e.css">\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/statistics/dnu-36908c6e.js"></script>';
}
return new String($_output_);

}