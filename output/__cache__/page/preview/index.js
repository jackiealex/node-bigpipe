module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__,__$trim = __$utils.trim,__$whenHappend = __$utils.whenHappend;
var id,portraitUrl,desc,usrId,shortDesc,ratio;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<div class="mod-atlas-preview mod" data-atlasID="';
$_output_ += id;
$_output_ += '">\n\t<div class="followers">\n\t</div>\n\t<div class="img-box">\n\t<div class="img-box-header">\n\t\t<h2 class="from">\n\t\t';

		var portraitUrl = headUrl || '/static/img/icons/user.png';
		var desc = basic.content || '暂无描述';
		desc = desc.replace(/(<([^>]+)>)/ig,"");
		var usrId = basic.createBy;
		
$_output_ += '\n\t\t<img src="';
$_output_ += portraitUrl;
$_output_ += '"  title="';
$_output_ += desc;
$_output_ += '" data-id="';
$_output_ += usrId;
$_output_ += '">\n\t\t<span class="name">';
basic.nickname = __$trim.call(null, basic.nickname);
$_output_ += basic.nickname;
$_output_ += '</span>\n\t\t<span class="time">';
basic.createDate = __$whenHappend.call(null, basic.createDate);
basic.createDate = __$trim.call(null, basic.createDate);
$_output_ += basic.createDate;
$_output_ += '</span>\n\t\t';
 if(basic.location) { 
$_output_ += '\n\t\t<span class="location">';
basic.location = __$trim.call(null, basic.location);
$_output_ += basic.location;
$_output_ += '</span>\n\t\t';
 } 
$_output_ += '\n\t\t</h2>\n\t\t';

			var overLength = 32;
			var ellipsis = desc.length > overLength ? '...' : '';
			var shortDesc = desc.slice(0, overLength) + ellipsis;
		
$_output_ += '\n\t\t<h2 class="desc">\n\t\t\t';
$_output_ += shortDesc;
$_output_ += '\n\t\t\t<p class="desc-detail" >';
$_output_ += desc;
$_output_ += '</p>\n\t\t</h2>\n\t\t<ul class="menu">\n\t\t\t';
 if(basic.praiseNum) { 
$_output_ += '\n\t\t\t<li>赞';
$_output_ += basic.praiseNum;
$_output_ += '</li>\n\t\t\t';
 } 
$_output_ += '\n\t\t\t';
 if(labels.length) { 
$_output_ += '\n\t\t\t<li class="menu-label">\n\t\t\t\t标签';
$_output_ += labels.length;
$_output_ += '\n\t\t\t\t<div class="labels">\n\t\t\t\t\t';
 for(var i=0; i<labels.length; i++) { 
$_output_ += '\n\t\t\t\t\t\t';

						var label = labels[i];
						
$_output_ += '\n\t\t\t\t\t\t<div class="label">\n\t\t\t\t\t\t\t';
$_output_ += label['name'];
$_output_ += '\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t';
 if(links.length) { 
$_output_ += '\n\t\t\t\t<li class="menu-label">\n\t\t\t\t\t链接';
$_output_ += links.length;
$_output_ += '\n\t\t\t\t\t<div class="links">\n\t\t\t\t\t\t';
 for(var i=0; i<links.length; i++) { 
$_output_ += '\n\t\t\t\t\t\t';

						var link = links[i];
						
$_output_ += '\n\t\t\t\t\t\t<div class="link">\n\t\t\t\t\t\t\t<a target="_blank" href="';
$_output_ += link['url'];
$_output_ += '">';
$_output_ += link['name'];
$_output_ += '</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\n\t\t\t</ul>\n\t\t</div>\n\t\t<div class="img-box-main">\n\t\t\t<div class="speak-here" ng-controller="CommentListCtrl">\n\t\t\t\t<div class="list">\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<div class="comment" >\n\t\t\t\t\t<textarea name="" id="" cols="30" rows="10"></textarea>\n\t\t\t\t\t<div class="btn-comment">评论</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="img">\n\t\t\t\t<img src="';
$_output_ += basic.coverImage['url'];
$_output_ += '" alt="" /><br/>\n\t\t\t</div>\n\t\t\t<aside class="thumbs">\n\t\t\t\t<div class="wrap">\n\t\t\t\t\t<ul>\n\t\t\t\t\t\t';

						var len = images.length;
						
$_output_ += '\n\t\t\t\t\t\t';
 for(var i=0; i< len; i++) { 
$_output_ += '\n\t\t\t\t\t\t';

						var itemImg = images[i];
						var size = (itemImg['size'] || "100*100").split("*");
						var width = size[0];
						var height = size[1];
						var ratio = width / (height / 1);
						
$_output_ += '\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<img src="';
$_output_ += images[i]['url'];
$_output_ += '" alt="" data-ratio="';
$_output_ += ratio;
$_output_ += '"/>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t';
 } 
$_output_ += '\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</aside>\n\t\t</div>\n\t</div>\n</div>\n<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/atlas/preview-2b46af98.css" />\n<script type="text/javascript"  src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/atlas/preview-4ab1092d.js"></script>';
}
return new String($_output_);

}