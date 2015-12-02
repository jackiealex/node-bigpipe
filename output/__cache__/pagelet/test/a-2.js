module.exports = function anonymous($_data_) {
var $_output_ = '';var __$utils = this,$helper = this,__$include = __$utils.include,__LOCAL__ = this.__LOCAL__;
with($_data_ || {}) {
var $_output_ = '';$_output_ += '<script src="/test?type=javascript&delay=3"></script>\n<style>\n\t.test {\n\t\tbackground: red;\n\t}\n</style>\n<style>\n\t.sub-a-2 {\n\t\t\n\t\theight: 100px;\n\t}\n\t.a-2-children1, .a-2-children2 {\n\t\tfloat: left;\n\t\twidth: 50%;\n\t\theight: 60px;\n\t\tbackground: red;\n\t}\n\t.a-2-children2 {\n\t\tbackground: orange\n\t}\n</style>\n<div class="sub-a-2">\n\t<p>sub-a-2</p>\n\t<div class="a-2-children1">\n\t\twaiting......\n\t</div>\n\t<div class="a-2-children2">\n\t\twaiting......\n\t</div>\n</div>';
}
return new String($_output_);

}