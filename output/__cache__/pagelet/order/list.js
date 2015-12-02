module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$timeFormat = __$utils.timeFormat;
var key,isSelected,s;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/order/list-a18b65ad.css">\n';

	var key = key || '';
	var statusMap = {
		'-1': '未付款',
		'0':'订单初始化',
		'1':'买家已付款',
		'2':'卖家接受邀请',
		'3':'卖家拒绝',
		'4':'接受超时',
		'5':'卖家发货',
		'6':'买家已确认',
		'7':'发货超时',
		'8':'举报退款',
		'99':'全部'
	};

$_output_ += '\n<div class="mod-order-list mod" >\n \t<div class="header">\n \t\t<div class="ui form">\n \t\t\t<div class="fields">\n\t\t \t\t<div class=" field inline ">\n\t\t\t \t\t<div class="ui small icon input   corner labeled   ">\n\t\t\t\t\t\t<input type="text" placeholder="搜索管订单" onfocus="this.select()" value="';
$_output_ += key;
$_output_ += '" />\n\t\t\t\t\t\t';
 if(key) {
$_output_ += '\n\t\t\t\t\t\t\t<div class="ui corner label" title="清除">\n\t\t\t\t\t\t\t  <i class="remove icon"></i>      \n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t \t\t<div class=" field inline ">\n\t\t \t\t\t<select class="ui dropdown" style="height: 30px ;">\n\t\t\t \t\t\t';
for(var s in statusMap) { 
$_output_ += '\n\t\t\t \t\t\t';

			 				var isSelected = '';
			 				if(status == s) {
			 					isSelected = 'selected'
			 				}
			 			
$_output_ += '\n\t\t \t\t\t\t<option ';
$_output_ += isSelected;
$_output_ += ' value="';
$_output_ += s;
$_output_ += '">';
$_output_ += statusMap[s];
$_output_ += '</option>\n\t\t \t\t\t\t';
 } 
$_output_ += '\n\t\t \t\t\t</select>\n\t\t \t\t\t\n\t\t \t\t</div>\n\t\t \t\t<div class=" field inline ">\n\t\t \t\t\t<div class="ui active blue  button">\n\t\t \t\t\t  <i class="search icon"></i>\n\t\t \t\t\t  搜索\n\t\t \t\t\t</div>\n\t\t \t\t</div>\n \t\t\t</div>\n \t\t</div>\n \t</div>\n \t<div class="container">\n \t\t<div class="list">\n \t\t\t<table class="ui column table segment">\n \t\t\t\t<thead>\n \t\t\t\t\t<tr>\n \t\t\t\t\t\t<th>听歌人</th>\n \t\t\t\t\t\t<th>唱歌人</th>\n \t\t\t\t\t\t<th>价格</th>\n \t\t\t\t\t\t<th>时间</th>\n \t\t\t\t\t\t<th>状态</th>\n \t\t\t\t\t\t<th>星级</th>\n \t\t\t\t\t\t<th>操作</th>\n \t\t\t\t\t</tr>\n \t\t\t\t</thead>\n \t\t\t\t<tbody>\n \t\t\t\t\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n \t\t\t\t\t';

 						var item = list[i];
 					
$_output_ += '\n \t\t\t\t\t<tr class="item row" data-id="';
$_output_ += item.id;
$_output_ += '" data-songid="';
$_output_ += item.songId;
$_output_ += '" data-accompanyid="';
$_output_ += item.accompanyId;
$_output_ += '">\n \t\t\t\t\t\t<td class="listener" data-id="';
$_output_ += item.customerId;
$_output_ += '">';
$_output_ += item.customerName;
$_output_ += '</td>\n \t\t\t\t\t\t<td class="singer" data-id="';
$_output_ += item.singerId;
$_output_ += '">\n \t\t\t\t\t\t\t';
$_output_ += item.singerName;
$_output_ += '\n \t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td class="price">\n \t\t\t\t\t\t';
 if(item.price) { 
$_output_ += '\n \t\t\t\t\t\t\t';
$_output_ += item.price;
$_output_ += '\n \t\t\t\t\t\t';
 } else { 
$_output_ += '\n \t\t\t\t\t\t\t-\n \t\t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t\t\t</td>\t\n \t\t\t\t\t\t<td class="date">\n \t\t\t\t\t\t\t<p>\n \t\t\t\t\t\t\t\t<i class="history icon"></i>\n \t\t\t\t\t\t\t\t';
item.createDate = __$timeFormat.call(null, item.createDate);
$_output_ += item.createDate;
$_output_ += '</p>\n \t\t\t\t\t\t\t<p>\n \t\t\t\t\t\t\t<i class="wait icon"></i>\n\t\t\t\t\t\t\t';
item.modifyDate = __$timeFormat.call(null, item.modifyDate);
$_output_ += item.modifyDate;
$_output_ += '</p>\n \t\t\t\t\t\t</td>\t\n \t\t\t\t\t\t<td class="status">\n \t\t\t\t\t\t\t';
 if(item.status == -1) { 
$_output_ += '\n \t\t\t\t\t\t\t\t<span style="color: red">';
$_output_ += statusMap[item.status];
$_output_ += '</span>\n \t\t\t\t\t\t\t';
 } else { 
$_output_ += '\n \t\t\t\t\t\t\t';
$_output_ += statusMap[item.status];
$_output_ += '\n \t\t\t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td class="star">\n\t\t\t\t\t\t';
 if(item.starLevel) { 
$_output_ += '\n\t\t\t\t\t\t\t';
$_output_ += item.starLevel;
$_output_ += '\n\t\t\t\t\t\t';
 } else { 
$_output_ += '\n\t\t\t\t\t\t\t-\n\t\t\t\t\t\t';
 } 
$_output_ += '\n \t\t\t\t\t\t</td>\n \t\t\t\t\t\t<td>\n \t\t\t\t\t\t\t<i class="settings icon"></i>\n\t\t\t\t\t\t</td>\n \t\t\t\t\t</tr>\n \t\t\t\t\t';
 } 
$_output_ += '\n\n \t\t\t\t</tbody>\n \t\t\t</table>\n \t\t\t';
if(page) { 
$_output_ += '\n \t\t\t\t';
$_output_ += __$include('./__cache__/common/widgets/pagenavi.html', page);
$_output_ += '\n \t\t\t';
}
$_output_ += '\n \t\t</div>\n \t</div>\n</div>\n\n<script src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/order/list-b904dad3.js"></script>\n\n';
}
return new String($_output_);

}