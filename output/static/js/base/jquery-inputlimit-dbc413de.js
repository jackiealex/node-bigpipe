(function(e){e.fn.maxlength=function(t){function n(e){var n=e.value;return t.words&&(n=e.value.length?n.split(/\s+/):{length:0}),n.length}return typeof t=="string"&&(t={feedback:t}),t=e.extend({},e.fn.maxlength.defaults,t),this.each(function(){function a(e){var r=n(this),i=r>=o,s=e.keyCode;if(!i)return;switch(s){case 8:case 9:case 17:case 36:case 35:case 37:case 38:case 39:case 40:case 46:case 65:case 112:case 113:case 114:case 115:case 116:case 117:case 118:case 119:case 120:case 121:case 122:case 123:return;default:return t.words&&s!=32&&s!=13&&r==o}}var r=this,i=e(r),s=e(r.form),o=t.useInput?s.find("input[name=maxlength]").val():i.attr("maxlength"),u=s.find(t.feedback),f=function(){var e=n(r),i=o-e;u.html(i||"0"),t.hardLimit&&i<0&&(r.value=t.words?r.value.split(/(\s+)/,o*2-1).join(""):r.value.substr(0,o),f())};i.keyup(f).change(f),t.hardLimit&&i.keydown(a),f()})},e.fn.maxlength.defaults={useInput:!1,hardLimit:!0,feedback:".charsLeft",words:!1}})(jQuery)