define(function() {
    var phoneNum = "";
    var type = 0;
    var timer = "";
    var _this;
    //验证是不是手机号
    function isPhone(aPhone) {
        var bValidate = RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/).test(aPhone);
        if (bValidate) {
            return true;
        } else {
            return false;
        }
    };
    //切换操作事件
    function onOperationChange($scope) {
        $scope.on('change', '.choice', function() {
            var select = $(this).val();
            if (select == 0) {
                $('.reset-pwd').hide();
                $('.register').show('slow');
                type = 0;
            } else {
                $('.register').hide();
                $('.reset-pwd').show('slow');
                type = 1;
            }
        });
    };
    //获取验证码
    function onGetCode($scope) {
        $scope.on('click', '.wrapper .getcode', function(e) {
            _this = this;
            var number = $('.wrapper input[type=text]').val();
            phoneNum = number;
            var varifyPhone = isPhone(number);
            if (varifyPhone) {
                $(_this).attr('disabled', true);
                var value = 60;
                timer = setInterval(function() {
                    value--;
                    $(_this).val(value + "秒后再次获取");
                    if (value == 0) {
                        clearInterval(timer);
                        $(_this).val("获取验证码").attr('disabled', false);
                        $scope.find('.msgresult').remove();
                    }
                }, 1000);
                // console.log(type);
                utils.api('/_bridge/sendverifycode', {
                    method: 'get',
                    data: {
                        phone: number,
                        tag: type
                    }
                }).done(function(rs, succ) {
                    if (rs.node_code == 20000) {
                        var pTag = $('<p class="msgresult">验证码已发送,请注意查收!</p>');
                        $(_this).after(pTag);
                    } else if (rs.node_code == 20003) {
                        var pTag = $('<p class="msgresult">用户不存在!</p>');
                        $(_this).after(pTag);
                    } else {
                        clearInterval(timer);
                        $(_this).val("获取验证码").attr('disabled', false);
                        console.log("验证码获取失败");
                    }
                });
                

            } else {
                alert('请输入正确的手机号码');
            }


        });
    };

    //手机注册提交事件
    function onRegisterSubmit($scope) {
        $scope.on('click', '.register .submit', function() {
            var _regthis = this;
            var pwd = $scope.find('.register .pwd').val();
            var repwd = $scope.find('.register .repwd').val();
            var verifyCode = $scope.find('.register .validcode').val();
            if (pwd != '' && repwd != '' && verifyCode != '' && pwd == repwd) {
                utils.api('/_bridge/phoneregister', {
                    method: 'post',
                    data: {
                        phone: phoneNum,
                        vcode: verifyCode,
                        pwd: pwd
                    }
                }).done(function(rs, succ) {
                    clearInterval(timer);
                        $(_this).val("获取验证码").attr('disabled', false);
                        if (rs.node_code == 20007 && rs.msg == "user is exist") {
                            $scope.find('.register .register-result').html("用户已存在!").show();
                            $scope.find('input').not($('input[type=button]')).val('');
                            setTimeout(function() {
                                $scope.find('.register .register-result').hide();
                            }, 1000 * 10);
                        } else if (rs.node_code == 20000) {
                            $scope.find('.register .register-result').html("用户注册成功!").show();
                            $scope.find('input').not($('input[type=button]')).val('');
                            setTimeout(function() {
                                $scope.find('.register .register-result').hide();
                            }, 1000 * 10);
                        }
                });
                 
            } else {
                alert("输入框为空或者两次输入的密码不一致!");
                $scope.find('input').not($('input[type=button]')).val('');
            }
        });
    };

    //重置密码提交事件
    function onResetPwdSubmit($scope) {
        $scope.on('click', '.reset-pwd .submit', function() {
            var _resetthis = this;
            // var pwd = $scope.find('.reset-pwd .pwd').val();
            var newPwd = $scope.find('.reset-pwd .newpwd').val();
            var renewPwd = $scope.find('.reset-pwd .renewpwd').val();
            var verifyCode = $scope.find('.reset-pwd .validcode').val();
            // console.log(type +','+ phoneNum + ',' +newPwd +','+verifyCode);
            if (newPwd != '' && renewPwd != '' && verifyCode != '' && newPwd == renewPwd) {
                utils.api('/_bridge/resetpwd', {
                    method: 'post',
                    data: {
                        phone: phoneNum,
                        vcode: verifyCode,
                        pwd: newPwd
                    }
                }).done(function(rs, succ) {
                    if (rs.node_code == 20000 && rs.msg == "success") {
                        clearInterval(timer);
                        $(_this).val("获取验证码").attr('disabled', false);
                        $scope.find('.reset-pwd .reset-result').html("重置密码成功!").show();
                        $scope.find('input').not($('input[type=button]')).val('');
                        $scope.find('.msgresult').remove();
                        setTimeout(function() {
                            $scope.find('.reset-pwd .reset-result').hide();
                        }, 1000 * 10);
                    } else if (rs.node_code == 20006) {
                        clearInterval(timer);
                        $(_this).val("获取验证码").attr('disabled', false);
                        $scope.find('.reset-pwd .reset-result').html("验证码错误!").show();
                        $scope.find('.validcode').val('');
                        $scope.find('.msgresult').remove();
                        setTimeout(function() {
                            $scope.find('.reset-pwd .reset-result').hide();
                        }, 1000 * 10);
                    } else {
                        clearInterval(timer);
                        $(_this).val("获取验证码").attr('disabled', false);
                        $scope.find('.reset-pwd .reset-result').html("密码重置失败!").show();
                        $scope.find('.validcode').val('');
                        $scope.find('.msgresult').remove();
                    }
                });
                 
            } else {
                alert("输入框为空或者两次输入的密码不一致!");
                $scope.find('input').not($('input[type=button]')).val('');
            }
        });
    };

    return {
        init: function() {
            var $scope = $(".mod-verify-box");
            onGetCode($scope);
            onOperationChange($scope);
            onRegisterSubmit($scope);
            onResetPwdSubmit($scope);
        }
    }
});