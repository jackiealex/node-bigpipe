module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$trim = __$utils.trim,__$whenHappend = __$utils.whenHappend;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<ul>\n\t';
 if(comments.length == 0) { 
$_output_ += '\n\t<li>\n\t\t<div class="desc" style="height: 18px;">暂无评论 <img src="http://7xlphm.com1.z0.glb.clouddn.com/static/img/icons/exclamation-aa03d019.png" style="width: 18px; vertical-align:middle;display: inline;margin: -2px 0 0 4px;" alt=""></div>\n\t</li>\n\t';
 } else { 
$_output_ += '\n\t';
 for(var i=0; i<comments.length; i++) { 
$_output_ += '\n\t';

	var commentItem = comments[i];
	
$_output_ += '\n\t';
 if(commentItem['replyUser']) { 
$_output_ += '\n\t<li class="item" data-uid="';
$_output_ += commentItem['userId'];
$_output_ += '">\n\t\t<img class="comment-head" src="';
$_output_ += commentItem['headUrl'];
$_output_ += '" alt="" />\n\t\t<div class="cmt">\n\t\t\t<div class="origin">\n\t\t\t\t<p class="user"><span class="speaker">';
commentItem['nickname'] = __$trim.call(null, commentItem['nickname']);
$_output_ += commentItem['nickname'];
$_output_ += '</span><span style="color:blue;">回复</span>';
commentItem['replyUser']['nickname'] = __$trim.call(null, commentItem['replyUser']['nickname']);
$_output_ += commentItem['replyUser']['nickname'];
$_output_ += ' </p>\n\t\t\t\t<p class="time">';
commentItem['createDate'] = __$whenHappend.call(null, commentItem['createDate']);
$_output_ += commentItem['createDate'];
$_output_ += '</p>\n\t\t\t</div>\n\t\t\t<div class="content"> ';
commentItem['content'] = __$trim.call(null, commentItem['content']);
$_output_ += commentItem['content'];
$_output_ += ' </div>\n\t\t</div>\n\t\t<p class="close" data-id="';
$_output_ += commentItem['id'];
$_output_ += '">删除</p>\n\t</li>\n\t';
 } else { 
$_output_ += '\n\t<li class="item" data-uid="';
$_output_ += commentItem['userId'];
$_output_ += '">\n\t\t<img class="comment-head" src="';
$_output_ += commentItem['headUrl'];
$_output_ += '" alt="" />\n\t\t<div class="cmt">\n\t\t\t<div class="origin">\n\t\t\t\t<p class="user"><span class="speaker">';
commentItem['nickname'] = __$trim.call(null, commentItem['nickname']);
$_output_ += commentItem['nickname'];
$_output_ += ' </span></p>\n\t\t\t\t<p class="time">';
commentItem['createDate'] = __$whenHappend.call(null, commentItem['createDate']);
$_output_ += commentItem['createDate'];
$_output_ += '</p>\n\t\t\t</div>\n\t\t\t<div class="content"> ';
commentItem['content'] = __$trim.call(null, commentItem['content']);
$_output_ += commentItem['content'];
$_output_ += ' </div>\n\t\t</div>\n\t\t<p class="close" data-id="';
$_output_ += commentItem['id'];
$_output_ += '">删除</p>\n\t</li>\n\t';
 } 
$_output_ += '\n\t';
 } 
$_output_ += '\n\t';
 } 
$_output_ += '\n</ul>';
}
return new String($_output_);

}