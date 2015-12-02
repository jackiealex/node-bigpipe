module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var pathname,queryString,prev,cursor,next,totalPage,goNum;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '';

	var pathname = pathname.replace(/^\//, '')
	pathname = '/' + pathname;

$_output_ += '\n<div class="page-nav ui basic buttons">\n\t';
 if (current != 1) { 
$_output_ += '\n\t<a class="ui button action-paresh start" href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=1">首页</a>\n\t';
 } 
$_output_ += '\n\t';
 if (prev) { 
$_output_ += '\n\t<a class="ui button action-paresh prev" href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=';
$_output_ += prev;
$_output_ += '" title="上一页">&lt;</a>\n\t';
 } 
$_output_ += '\n\t';
 for(var i = 0; i < list.length; i ++) { 
$_output_ += '\n\t\t';

			var cursor = list[i];
		
$_output_ += '\n\t\t';
 if(current == cursor) { 
$_output_ += '\n\t\t\t<a class="bar pin ui button" style="background: #D4D4D4 !important;color: #fff !important;">';
$_output_ += cursor;
$_output_ += '</a>\n\t\t';
 } else { 
$_output_ += '\n\t\t\t<a href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=';
$_output_ += cursor;
$_output_ += '" class="ui button action-paresh bar">';
$_output_ += cursor;
$_output_ += '</a>\n\t\t';
 } 
$_output_ += '\n\t';
 } 
$_output_ += '\n\t';
 if (next) { 
$_output_ += '\n\t<a class="ui button action-paresh next" href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=';
$_output_ += next;
$_output_ += '" title="下一页">&gt;</a>\n\t';
 } 
$_output_ += '\n\t';
 if (current != totalPage) { 
$_output_ += '\n\t<a class="ui button action-paresh end" href="';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=';
$_output_ += totalPage;
$_output_ += '">尾页</a>\n\t';
 } 
$_output_ += '\n\t';

		var goNum = current + 1  < totalPage ? current + 1 : 1;
		var randomId = +new Date();
		var validateString = '页码请在 1' +'到' +totalPage+' 范围内';
		if(totalPage<=1) {
			validateString = '仅有第1页';
		}
	
$_output_ += '\n\t\t<div class="total button ui">\n\t\t\t共';
$_output_ += totalPage;
$_output_ += '页\n\t\t</div>\n\t<div class="port">\n\t\t<div class="txt">跳至</div>\n\t\t<input type="number" name="page" class="input" style="width: 60px" max=';
$_output_ += totalPage;
$_output_ += ' min=1 required  value="';
$_output_ += goNum;
$_output_ += '" placeholder="页码"  />\n\t\t<input class="ok" type="submit" value="确定" onsubmit="return false;" onclick="_SmartPipe_.location(\'';
$_output_ += pathname;
$_output_ += '?';
$_output_ += queryString;
$_output_ += '&page=\'+this.previousElementSibling.value)" />\n\t</div>\n\t\n</div>';
}
return new String($_output_);

}