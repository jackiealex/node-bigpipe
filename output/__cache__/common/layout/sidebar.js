module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var title,siteUrl;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div id="sideBar">\n\t<div class="list">\n\t\t<a href="/" class="on navItem nav-welcome" style="margin-top: 4px">欢迎</a>\n\t\t';
 for(var groupName in menu) { 
$_output_ += '\n\t\t';

			var group = menu[groupName];
			var list = group['list'];
			var title = group['title'];
			var siteUrl = group['site'];
		
$_output_ += '\n\t\t<div class="group">\n\t\t\t<h2>';
$_output_ += title;
$_output_ += '<a target="_blank" href="';
$_output_ += siteUrl;
$_output_ += '" title="进入主站"></a></h2>\n\t\t\t<ul>\n\t\t\t\t';
 for(var i=0; i<list.length; i++) { 
$_output_ += '\n\t\t\t\t';

					var item = list[i];
				
$_output_ += '\n\t\t\t\t<li><a href="';
$_output_ += item['href'];
$_output_ += '" class="navItem ';
$_output_ += item.clsName;
$_output_ += ' action-paresh">';
$_output_ += item.text;
$_output_ += '</a></li>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t</ul>\n\t\t</div>\n\t\t';
 } 
$_output_ += '\n\t\t\n\t\t<div class="group">\n\t\t\t<h2>开发测试</h2>\n\t\t\t<ul>\n\t\t\t\t<li><a href="/admin/list" class="action-paresh" >管理员中心</a></li>\n\t\t\t\t<li><a href="/label/list" class="action-paresh" >标签管理</a></li>\n\t\t\t\t<li><a href="/order/list" class="action-paresh" >订单管理</a></li>\n\t\t\t\t<li><a href="/music/list" class="action-paresh" >曲库管理</a></li>\n\t\t\t\t<li><a href="/user/list" class="action-paresh" >用户管理</a></li>\n\t\t\t\t<li><a href="/auth/list" class="action-paresh" >权限管理</a></li>\n\t\t\t\t<li><a href="/report/list" class="action-paresh" >举报中心</a></li>\n\t\t\t\t<li><a href="/version/list" class="action-paresh" >版本控制</a></li>\n\t\t\t</ul>\n\t\t</div>\n\t\t';
 if(__LOCAL__.mode == 'development') { 
$_output_ += '\n\t\t<div class="group">\n\t\t\t<h2>测试案例</h2>\n\t\t\t<ul>\n\t\t\t\t<li><a href="/test/view" class="action-paresh" >单视图</a></li>\n\t\t\t\t<li><a href="/test/layout" class="action-paresh" >多重嵌套视图</a></li>\n\t\t\t\t<li><a href="/message/by/group" class="action-paresh" >多重视图嵌套＋局部翻页</a></li>\n\t\t\t\t<li><a href="/test/load" class="action-paresh" >加载更多</a></li>\n\t\t\t\t<li><a href="/test/delay1" class="action-paresh" >延迟1秒</a></li>\n\t\t\t\t<li><a href="/test/delay2" class="action-paresh" >延迟超过1秒</a></li>\n\t\t\t\t<li><a href="/test/tmpl" class="action-paresh" >模版引擎</a></li>\n\t\t\t</ul>\n\t\t</div>\n\t\t';
 } 
$_output_ += '\n\t</div>\n</div>';
}
return new String($_output_);

}