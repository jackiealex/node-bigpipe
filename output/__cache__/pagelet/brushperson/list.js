module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var startDate,endDate,start,end;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-brushperson-list mod" >\n \t<div class="header">\n\t\t<a href="/brush/person/publish" class="ui down button action-paresh">\n\t\t\t<i class="user icon"></i>\n\t\t\t添加人\n\t\t</a>\n \t</div>\n \t<div class="ui form">\n\t\t<div class="fields">\n\t\t\t<div class=" field inline">\n\t\t\t\t<div class="ui small icon input   corner labeled  ">\n\t\t\t\t\t<input readonly="readonly" placeholder="开始日期" type="text" class="dnu-start" value="';
$_output_ += startDate;
$_output_ += '">\n\t\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t\t<div class="ui corner label" title="清除日期">\n\t\t\t\t\t\t<i class="remove icon"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="field inline">\n\t\t\t\t<div class="ui small icon input   corner labeled  ">\n\t\t\t\t\t<input readonly="readonly" placeholder="结束日期" type="text" class="dnu-end" value="';
$_output_ += endDate;
$_output_ += '">\n\t\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t\t<div class="ui corner label" title="清除日期">\n\t\t\t\t\t\t<i class="remove icon"></i>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<button href="" class="ui  button blue btn-date-click" >确定 </button>\n\t\t</div>\n\t</div>\n \t<div class="container">\n\t \t<div class="list">\n\t\t\t<table class="ui celled striped table attached">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>手机号</th>\n\t\t\t\t\t\t<th>姓名</th>\n\t\t\t\t\t\t<th>总量（单数，金额）</th>\n\t\t\t\t\t\t<th>支付宝（单数，金额）</th>\n\t\t\t\t\t\t<th>微信（单数，金额）</th>\n\t\t\t\t\t\t<th>操作</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t';
 
					for (var i = 0; i < list.length; i ++) {
						var item = list[i];
					
$_output_ += '\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
$_output_ += item.phone;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>';
$_output_ += item.name;
$_output_ += '</td>\n\t\t\t\t\t\t<td>（';
$_output_ += item.totals.total.count;
$_output_ += '，';
$_output_ += item.totals.total.total;
$_output_ += '）</td>\n\t\t\t\t\t\t<td>（';
$_output_ += item.totals.alipay.count;
$_output_ += '，';
$_output_ += item.totals.alipay.total;
$_output_ += '）</td>\n\t\t\t\t\t\t<td>（';
$_output_ += item.totals.weixin.count;
$_output_ += '，';
$_output_ += item.totals.weixin.total;
$_output_ += '）</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t<a href="/brush/person/detail?userId=';
$_output_ += item.userId;
$_output_ += '&start=';
$_output_ += start;
$_output_ += '&end=';
$_output_ += end;
$_output_ += '&listpage=';
$_output_ += page.current;
$_output_ += '" class="ui blue button action-paresh">详情</a>\n\t\t\t\t\t\t<button class="ui red button btn-brush-delete" data="';
$_output_ += item.userId;
$_output_ += '">删除</button></td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t';
if(page) { 
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t\t';
}
$_output_ += '\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/brushperson/list-2229ef43.css">\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/brushperson/list-490833de.js"></script>\n';
}
return new String($_output_);

}