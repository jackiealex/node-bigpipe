module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/music/publish-d911b8c8.css">\n<div class="mod-music-publish">\n\t<a onclick="javascript:history.back(-1)" class="ui button green action-paresh" style="margin-bottom: 20px;">返回</a>\n\t<form class="ui form" action="/_bridge/accompany/modify" method="post">\n\t\t<input type="hidden" name="id" value="';
$_output_ += accompany.id;
$_output_ += '"/>\n\t\t<input type="hidden" name="status" value="';
$_output_ += accompany.status;
$_output_ += '"/>\n\t\t<div class="three fields">\n\t\t\t<div class="field">\n\t\t\t\t<label for="">名称</label>\n\t\t\t\t<input type="text" placeholder="名称" name="name" value="';
$_output_ += accompany.name;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">艺术家</label>\n\t\t\t\t<input type="text" placeholder="艺术家" name="artist" value="';
$_output_ += accompany.artist;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">专辑</label>\n\t\t\t\t<input type="text" placeholder="专辑" name="album" value="';
$_output_ += accompany.album;
$_output_ += '" />\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="three fields">\n\t\t\t<div class="field">\n\t\t\t\t<label for="">所属区域</label>\n\t\t\t\t<select class="ui fluid dropdown" name="area" placeholder="所属区域">\n\t\t\t\t\t';
 if(accompany.area == 1){ 
$_output_ += ' <option value="1" selected="selected" >华语</option>';
 }else{ 
$_output_ += '<option value="1">华语</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.area == 2){ 
$_output_ += ' <option value="2" selected="selected" >日韩</option>';
 }else{ 
$_output_ += '<option value="2">日韩</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.area == 3){ 
$_output_ += ' <option value="3" selected="selected" >欧美</option>';
 }else{ 
$_output_ += '<option value="3">欧美</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.area == 4){ 
$_output_ += ' <option value="4" selected="selected" >其他</option>';
 }else{ 
$_output_ += '<option value="4">其他</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.area == 5){ 
$_output_ += ' <option value="5" selected="selected" >粤语</option>';
 }else{ 
$_output_ += '<option value="5">粤语</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.area == 6){ 
$_output_ += ' <option value="6" selected="selected" >闽南语</option>';
 }else{ 
$_output_ += '<option value="6">闽南语</option>';
 } 
$_output_ += '\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">曲风</label>\n\t\t\t\t<select class="ui fluid dropdown" name="style" placeholder="曲风">\n\t\t\t\t\t';
 if(accompany.style == 1){ 
$_output_ += ' <option value="1" selected="selected" >流行</option>';
 }else{ 
$_output_ += '<option value="1">流行</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 2){ 
$_output_ += ' <option value="2" selected="selected" >民歌</option>';
 }else{ 
$_output_ += '<option value="2">民歌</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 3){ 
$_output_ += ' <option value="3" selected="selected" >摇滚</option>';
 }else{ 
$_output_ += '<option value="3">摇滚</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 4){ 
$_output_ += ' <option value="4" selected="selected" >校园</option>';
 }else{ 
$_output_ += '<option value="4">校园</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 5){ 
$_output_ += ' <option value="5" selected="selected" >励志</option>';
 }else{ 
$_output_ += '<option value="5">励志</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 6){ 
$_output_ += ' <option value="6" selected="selected" >影视</option>';
 }else{ 
$_output_ += '<option value="6">影视</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 7){ 
$_output_ += ' <option value="7" selected="selected" >军旅</option>';
 }else{ 
$_output_ += '<option value="7">军旅</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 8){ 
$_output_ += ' <option value="8" selected="selected" >网游</option>';
 }else{ 
$_output_ += '<option value="8">网游</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 9){ 
$_output_ += ' <option value="9" selected="selected" >中国风</option>';
 }else{ 
$_output_ += '<option value="9">中国风</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 10){ 
$_output_ += ' <option value="10" selected="selected" >高音</option>';
 }else{ 
$_output_ += '<option value="10">高音</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 11){ 
$_output_ += ' <option value="11" selected="selected" >伤感</option>';
 }else{ 
$_output_ += '<option value="11">伤感</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 12){ 
$_output_ += ' <option value="12" selected="selected" >对唱</option>';
 }else{ 
$_output_ += '<option value="12">对唱</option>';
 } 
$_output_ += '\n\t\t\t\t\t';
 if(accompany.style == 13){ 
$_output_ += ' <option value="13" selected="selected" >电影等</option>';
 }else{ 
$_output_ += '<option value="13">电影等</option>';
 } 
$_output_ += '\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">版权方</label>\n\t\t\t\t<input type="text" placeholder="版权方" name="copyright" value="';
$_output_ += accompany.copyright;
$_output_ += '" />\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="four fields" style="display: none">\n\t\t\t<div class="field">\n\t\t\t\t<label for="">歌词类型</label>\n\t\t\t\t<input type="text" placeholder="歌词类型" name="lyricType" value="';
$_output_ += accompany.lyricType;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">文件大小</label>\n\t\t\t\t<input type="number" placeholder="文件大小" name="audioSize" value="';
$_output_ += accompany.audioSize;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">时长</label>\n\t\t\t\t<input type="number" placeholder="时长" name="time" value="';
$_output_ += accompany.time;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="field">\n\t\t\t\t<label for="">排序</label>\n\t\t\t\t<input type="number" placeholder="排序" name="order" value="';
$_output_ += accompany.order;
$_output_ += '" />\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="files">\n\t\t\t<h2>拖放伴奏、原唱、歌词、封面图到此</h2>\n\t\t\t<div class="file-box file-accompnay ">\n\t\t\t\t<div class="preview-container"></div>\n\t\t\t\t<div class="progress-stick"></div>\n\t\t\t\t<p class="btn-delete">×</p>\n\n\t\t\t\t<a href="" target="_blank" class="btn-preview">查看</a>\n\t\t\t\t<div class="file-picker">\n\t\t\t\t伴奏上传(AAC)\n\t\t\t\t</div>\n\t\t\t\t<input type="hidden" class="file-hidden" name="audioUrl"  value="';
$_output_ += accompany.audioUrl;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="file-box file-accompnay">\n\t\t\t\t<div class="preview-container"></div>\n\t\t\t\t<div class="progress-stick"></div>\n\t\t\t\t<p class="btn-delete">×</p>\n\t\t\t\t<a href="" target="_blank" class="btn-preview">查看</a>\n\t\t\t\t<div class="file-picker">\n\t\t\t\t伴奏上传(MP3)\n\t\t\t\t</div>\n\t\t\t\t<input type="hidden" class="file-hidden" name="urlMp3"  value="';
$_output_ += accompany.urlMp3;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="file-box file-music">\n\t\t\t\t<div class="preview-container"></div>\n\t\t\t\t<div class="progress-stick"></div>\n\t\t\t\t<p class="btn-delete">×</p>\n\t\t\t\t<a href="" target="_blank" class="btn-preview">查看</a>\n\t\t\t\t<div class="file-picker">\n\t\t\t\t原唱上传(AAC)\n\t\t\t\t</div>\n\t\t\t\t<input type="hidden" class="file-hidden" name="shakelightUrl"  value="';
$_output_ += accompany.shakelightUrl;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="file-box file-music">\n\t\t\t\t<div class="preview-container"></div>\n\t\t\t\t<div class="progress-stick"></div>\n\t\t\t\t<p class="btn-delete">×</p>\n\t\t\t\t<a href="" target="_blank" class="btn-preview">查看</a>\n\t\t\t\t<div class="file-picker">\n\t\t\t\t原唱上传(MP3)\n\t\t\t\t</div>\n\t\t\t\t<input type="hidden" class="file-hidden" name="shakelightMp3"  value="';
$_output_ += accompany.shakelightMp3;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="file-box file-lyric">\n\t\t\t\t<div class="preview-container"></div>\n\t\t\t\t<div class="progress-stick"></div>\n\t\t\t\t<p class="btn-delete">×</p>\n\t\t\t\t<a href="" target="_blank" class="btn-preview">查看</a>\n\t\t\t\t<div class="file-picker">\n\t\t\t\t歌词上传(lrc)\n\t\t\t\t</div>\n\t\t\t\t<input type="hidden" class="file-hidden" name="lyricUrl"  value="';
$_output_ += accompany.lyricUrl;
$_output_ += '" />\n\t\t\t</div>\n\t\t\t<div class="file-box file-cover">\n\t\t\t\t<div class="preview-container"></div>\n\t\t\t\t<div class="progress-stick"></div>\n\t\t\t\t<p class="btn-delete">×</p>\n\t\t\t\t<a href="" target="_blank" class="btn-preview">查看</a>\n\t\t\t\t<div class="file-picker">\n\t\t\t\t封面图上传\n\t\t\t\t</div>\n\t\t\t\t<input type="hidden" class="file-hidden" name="surfaceImage"  value="';
$_output_ += accompany.surfaceImage;
$_output_ += '" />\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="ui two bottom attached buttons " style="display: none">\n\t\t    <div class="ui button">添加文件</div>\n\t\t    <div class="ui button">检测完整性</div>\n\t\t</div>\n\t\t<div class="ui button green big large btn-submit" style="margin: 20px;">提交</div>\n\t</form>\n</div>\n<script type="text/javascript" src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/mod/music/modify-af4229c1.js"></script>\n';
}
return new String($_output_);

}