define(function(){return{init:function(){var e=$(".mod-broadcast");e.on("click",".btn-submit",function(t){var n=e.find(".ui.buttons .positive").data("type"),r=e.find("textarea").val(),i=__getSocketSingleton__();i&&i.emit("request_broadcast",{content:r,type:n})})}}})