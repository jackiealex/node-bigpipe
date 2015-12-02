module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
var start,end,listpage,startDate,endDate;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-brushperson-list mod" >\n \t<div class="header">\n\t\t<a href="/brush/person/list?start=';
$_output_ += start;
$_output_ += '&end=';
$_output_ += end;
$_output_ += '&page=';
$_output_ += listpage;
$_output_ += '" class="ui down blue button action-paresh">\n\t\t\t<i class="chevron left icon"></i>\n\t\t\t返回\n\t\t</a>\n \t</div>\n \t<div class="ui form">\n\t\t<div class="fields">\n\t\t\t<div class=" field inline">\n\t\t\t\t<div class="ui small icon input   corner labeled  ">\n\t\t\t\t\t<input readonly="readonly" placeholder="开始日期" type="text" class="dnu-start" value="';
$_output_ += startDate;
$_output_ += '">\n\t\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="field inline">\n\t\t\t\t<div class="ui small icon input   corner labeled  ">\n\t\t\t\t\t<input readonly="readonly" placeholder="结束日期" type="text" class="dnu-end" value="';
$_output_ += endDate;
$_output_ += '">\n\t\t\t\t\t<i class="calendar icon"></i>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t</div>\n\t</div>\n \t<div class="container">\n\t \t<div class="list">\n\t \t\t';
 var user = list[0].user; 
$_output_ += '\n\t \t\t<div>当前用户 手机号：';
$_output_ += user.phone;
$_output_ += ', 昵称：';
$_output_ += user.nickname;
$_output_ += '</div>\n\t\t\t<table class="ui celled striped table attached">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>接单人（手机，昵称）</th>\n\t\t\t\t\t\t<th>价格</th>\n\t\t\t\t\t\t<th>支付方式</th>\n\t\t\t\t\t\t<th>状态</th>\n\t\t\t\t\t\t<th>歌曲链接</th>\n\t\t\t\t\t\t<th>最后修改时间</th>\n\t\t\t\t\t\t<th>创建时间</th>\t\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t';
 
					var orderMaps = list[0].orderMaps;
					for (var i = 0; i < orderMaps.length; i ++) {
						var item = orderMaps[i];
					
$_output_ += '\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
$_output_ += item.singer.phone;
$_output_ += '，';
$_output_ += item.singer.nickname;
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>';
$_output_ += item.order.price;
$_output_ += '</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t';
 if(item.order.payType == 2) { 
$_output_ += '支付宝\n\t\t\t\t\t\t\t';
 } else if(item.order.payType == 3) { 
$_output_ += '微信\n\t\t\t\t\t\t\t';
 } else if(item.order.payType == 4) { 
$_output_ += '苹果\n\t\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\n\t\t\t\t\t\t';
 if(item.order.status == -1) { 
$_output_ += '交易取消\n\t\t\t\t\t\t';
 } else if(item.order.status == 0) { 
$_output_ += '等待付款\n\t\t\t\t\t\t';
 } else if(item.order.status == 1) { 
$_output_ += '买家已付款\n\t\t\t\t\t\t';
 } else if(item.order.status == 2) { 
$_output_ += '卖家已接受\n\t\t\t\t\t\t';
 } else if(item.order.status == 3) { 
$_output_ += '卖家拒绝\n\t\t\t\t\t\t';
 } else if(item.order.status == 4) { 
$_output_ += '接受超时\n\t\t\t\t\t\t';
 } else if(item.order.status == 5) { 
$_output_ += '卖家发货\n\t\t\t\t\t\t';
 } else if(item.order.status == 6) { 
$_output_ += '买家已确认\n\t\t\t\t\t\t';
 } else if(item.order.status == 7) { 
$_output_ += '发货超时\n\t\t\t\t\t\t';
 } else if(item.order.status == 8) { 
$_output_ += '举报退款\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t';
 if(!item.order.song) { 
$_output_ += '\n\t\t\t\t\t\t<td>无</td>\n\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t<td><a href="';
$_output_ += item.order.song.fileUrl;
$_output_ += '" target="_blank">';
$_output_ += item.order.song.name;
$_output_ += '</a></td>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t\t<td>';
item.order.modifyDate = __$timeFormat.call(null, item.order.modifyDate);
$_output_ += item.order.modifyDate;
$_output_ += '</td>\n\t\t\t\t\t\t<td>';
item.order.createDate = __$timeFormat.call(null, item.order.createDate);
$_output_ += item.order.createDate;
$_output_ += '</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t';
if(page) { 
$_output_ += '\n\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n\t\t\t';
}
$_output_ += '\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/brushperson/list-2229ef43.css">\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/datetime.picker/jquery.datetimepicker-59c05af6.css">\n\n';
}
return new String($_output_);

}