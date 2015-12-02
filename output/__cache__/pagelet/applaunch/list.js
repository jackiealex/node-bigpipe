module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<style>\n\t.mod-applaunch-list {\n\t\tpadding: 20px;\n\t}\n\t.mod-applaunch-list p {\n\t\tpadding: 4px;\n\t\twhite-space: normal;\n\t\tword-break: break-word;\n\t}\n</style>\n<div class="mod-applaunch-list">\n \t<div class="list-header">\n \t\t<div class="ui icon input">\n\t\t\t<input type="text" placeholder="搜索启动页">\n\t\t\t<i class="circular search icon"></i>\n\t\t</div>\n\t\t<a href="/applaunch/publish"  class="ui  button action-paresh">\n\t\t\t<i class="user icon"></i>\n\t\t\t添加启动页\n\t\t</a>\n \t</div>\n\t<table class="ui  column table segment">\n\t\t<thead>\n\t\t\t<tr>\n\t\t\t\t<th>图片</th>\n\t\t\t\t<th>名称</th>\n\t\t\t\t<th>起始时间</th>\n\t\t\t\t<th>结束时间</th>\n\t\t\t\t<th>包名</th>\n\t\t\t\t<th>描述</th>\n\t\t\t\t<th>操作</th>\n\t\t\t</tr>\n\t\t</thead>\n\t\t<tbody>\n\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t\t';

				var item = list[i];
			
$_output_ += '\n \n\t\t\t<tr class="item" data-id="';
$_output_ += item.id;
$_output_ += '" data-starttime="';
$_output_ += item.startTime;
$_output_ += '" data-endtime="';
$_output_ += item.endTime;
$_output_ += '" data-code="';
$_output_ += item.imageKey;
$_output_ += '" data-pkg="';
$_output_ += item.pkg;
$_output_ += '" data-type="';
$_output_ += item.type;
$_output_ += '"> \n\t\t\t\t<td class="images" style="max-width:200px">\n\t\t\t\t\t<img src="';
$_output_ += item.imageUrl;
$_output_ += '" alt="" />\n\t\t\t\t\t<p>类型：';
$_output_ += item.type;
$_output_ += '</p>\n\t\t\t\t\t<p>\n\t\t\t\t\t';
if (item.type==4 || item.type==5) { 
$_output_ += '\n\t\t\t\t\t\t<a target="_blank" style="color: blue" href="';
$_output_ += item.link;
$_output_ += '">';
$_output_ += item.name;
$_output_ += '</a>\n\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t目标：';
$_output_ += item.link;
$_output_ += '\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t<span class="link-text" style="display: none">';
$_output_ += item.link;
$_output_ += '</span>\n\t\t\t\t\t</p>\n\t\t\t\t</td>\n\t\t\t\t<td class="name">';
$_output_ += item.name;
$_output_ += '</td>\n\t\t\t\t<td class="starttime">';
item.startTime = __$timeFormat.call(null, item.startTime);
$_output_ += item.startTime;
$_output_ += '</td>\n\t\t\t\t<td class="endtime">';
item.endTime = __$timeFormat.call(null, item.endTime);
$_output_ += item.endTime;
$_output_ += '</td>\n\t\t\t\t<td class="pkg">';
$_output_ += item.pkg;
$_output_ += '</td>\n\t\t\t\t<td class="description" style="width:10%;">';
$_output_ += item.description;
$_output_ += '</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a data-id="';
$_output_ += item.id;
$_output_ += '" class="del" href="void:javascript(0)">删除</a>\n\t\t\t\t</td>\n\n\t\t\t</tr>\n\t\t\t';
 } 
$_output_ += '\n\t\t</tbody>\n\t</table>\n</div>\n\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/lib/animate-e78c4ece.css">\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/aui-artDialog/css/ui-dialog-e8888bf8.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/aui-artDialog/dist/dialog-min-363c6ec2.js"></script>\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/applaunch/list-7a4a8159.js"></script>\n';
}
return new String($_output_);

}