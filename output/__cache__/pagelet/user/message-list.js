module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var itemCls;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>用户聊天列表</title>\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/plugins/Semantic-UI/dist/semantic.min-b935c304.css">\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/user/message-list-c34899c0.css">\n</head>\n<body>\n\t<ul>\n\t\t';
 for(var i = 0; i < rs.length; i++) { 
$_output_ += '\n\t\t';

			var item = rs[i];
			var msgContent = JSON.parse(item.msgContent);
			var itemCls = 'a';
			if(item.senderAccount == sa) {
				itemCls = 'b';
			}
		
$_output_ += '\n\t\t<li class="';
$_output_ += itemCls;
$_output_ += '">\n\t\t\t\n\t\t\t';
 if(item.senderAccount == ra) { 
$_output_ += '\n\t\t\t\t<img src="http://7xlphm.com1.z0.glb.clouddn.com/static/img/default-fcdde66e.png" alt="">\n\t\t\t';
 } 
$_output_ += '\n\t\t\t<div class="box">\n\t\t\t\t<h4>\n\t\t\t\t\t<p class="name">';
$_output_ += msgContent.sendername;
$_output_ += '</p>\n\t\t\t\t</h4>\n\t\t\t\t<div class="content">\n\t\t\t\t';
 if(msgContent.msgtype == 0) {
$_output_ += '\n\t\t\t\t<p>';
$_output_ += msgContent.msgcontent;
$_output_ += '</p>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t';
 if(msgContent.msgtype == 1) {
$_output_ += '\n\t\t\t\t<p>邀请唱一首歌 《';
$_output_ += msgContent.songname;
$_output_ += '》</p>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t';
 if(msgContent.msgtype == 2) {
$_output_ += '\n\t\t\t\t<p>唱了一首 《';
$_output_ += msgContent.songname;
$_output_ += '》</p>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t';
 if(msgContent.msgtype == 4) {
$_output_ += '\n\t\t\t\t<p>接受邀请</p>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t';
 if(msgContent.msgtype == 5) {
$_output_ += '\n\t\t\t\t<p>拒绝邀请</p>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t\t';
 if(item.senderAccount == sa) { 
$_output_ += '\n\t\t\t\t<img src="http://7xlphm.com1.z0.glb.clouddn.com/static/img/default-fcdde66e.png" alt="">\n\t\t\t';
 } 
$_output_ += '\n\t\t</li>\n\t\t';
 } 
$_output_ += '\n\t</ul>\n</body>\n</html>';
}
return new String($_output_);

}