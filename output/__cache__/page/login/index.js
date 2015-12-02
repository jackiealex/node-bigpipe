module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
var mode,msg;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>登录</title>\n\t<link rel="stylesheet" href="http://7xlphm.com1.z0.glb.clouddn.com/static/css/page/login/index-e366e6a8.css">\n\t<script type="text/javascript">\n\t\twindow[\'_NA_\'] = {\n\t\t\tmode: \'';
$_output_ += mode;
$_output_ += '\'\n\t\t};\n\t</script>\n\t\t\n\t\n\t\n\t<style>\n\t.status-code {\n\t\t\n\t}\n\t</style>\n</head>\n<body>\n\t';

		var code = code || '';
		var msg ='';
	
$_output_ += '\n\t<div class="login" >\n\t<form action="/passport/check" method="post" onsubmit="return doSubmit(this);">\n\t\t<h2>登录</h2>\n\t\t<div class="row">\n\t\t\t<input type="text" required name="username" placeholder="账号" />\n\t\t</div>\n\t\t<div class="row">\n\t\t\t<input type="password" required name="password-raw"  placeholder="密码" />\n\t\t\t<input type="hidden" required name="password" id="pass" placeholder="密码" />\n\t\t</div>\n\t\t';
 
			if(code==50004) { 
				msg = '提示，服务不可用';
		  	} else if(code==40303) {
				msg = '用户名或密码错误';
		 	} else if(code==55) { 
				msg = '请您尽快关注网络问题';
			} 
		
$_output_ += '\n\t\t';
 if(msg) { 
$_output_ += '\n\t\t<div class="row status-code">\n\t\t\t<p>';
$_output_ += msg;
$_output_ += '</p>\n\t\t</div>\n\t\t';
 } 
$_output_ += '\n\t\t<div class="row">\n\t\t\t<input type="submit"  class="sbtnSubmit" value="登录">\n\t\t</div>\t\n\t</form>\n\t</div>\n\t<script>\n\tfunction doSubmit (form) {\n\t\tdocument.getElementById(\'pass\').value = md5(form[\'password-raw\'].value);\n\t\treturn true;\n\t}\n\t</script>\n\t<script type="text/javascript"  src="http://7xlphm.com1.z0.glb.clouddn.com/static/js/base/md5-07dd00df.js"></script>\n</body>\n</html>';
}
return new String($_output_);

}