//表单验证

(
    function () {
        //整体检测
        $('form').on('submit', function(e) {
            var elements = this.elements;
            var valid = {};
            var isValid;
            var isFormValid;
            for (var i = 0, l = (elements.length - 1); i < l; i++) {
                isValid = validateRequired(elements[i]);
                if (!isValid) {
                    showErrorMessage(elements[i]);
                } else {
                    removeErrorMessage(elements[i]);
                }
                valid[elements[i].id] = isValid;
            }
            if (!validatePhoneNum()) {
                showErrorMessage(document.getElementById('phoneNum'));
                valid.phoneNum = false;
            } else {
                removeErrorMessage(document.getElementById('phoneNum'));
            }
            if (!validatePassword()) {
                showErrorMessage(document.getElementById('password'));
                valid.password = false;
            } else {
                removeErrorMessage(document.getElementById('password'));
            }
            if (!validateEmail()) {
                showErrorMessage(document.getElementById('email'));
                valid.email = false;
            } else {
                removeErrorMessage(document.getElementById('email'));
            }

            for (var field in valid) {
                if (!valid[field]) {
                    isFormValid = false;
                    break;
                }
                isFormValid = true;
            }
            if (!isFormValid) {
                e.preventDefault();
            }
        });

        //检查是否存在required属性&&检查值是否为空
        function validateRequired(el) {
            if (isRequired(el)) {
                var valid = !isEmpty(el);
                if (!valid) {
                    setErrorMessage(el,  '这个也要填写哦！');
                }
                return valid;
            }
            return true;
        }
        function isRequired(el) {
            return ((typeof el.required === 'boolean') && el.required) || (typeof el.required === 'string');
        }
        function isEmpty(el) {
            return !el.value || el.value === el.placeholder;
        }
        //验证11位手机号正则
        function validatePhoneNum() {
            var phoneNum = $('#phoneNum');
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            var valid = myreg.test(phoneNum.val())
            if(!valid){
                setErrorMessage(phoneNum,'输入正确的11位手机号→_→');
            }
            return valid;
        }
        //检测密码
        function validatePassword() {
            var password = $('#password');
            var myreg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
            var valid = myreg.test(password.val())
            if(!valid){
                setErrorMessage(password,'密码大于6包括字母和数字，而且不能是纯字母数字哦~！');
            }
            return valid;
        }
        //检测邮箱
        function validateEmail() {
            var email = $('#email');
            var myreg=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
            var valid = myreg.test(email.val())
            if(!valid){
                setErrorMessage(email,'输入一个正确的邮箱[○･｀Д´･ ○]');
            }
            return valid;
        }

        //创建错误信息
        function setErrorMessage(el, message) {
            $(el).data('errorMessage', message);
        }
        //显示错误信息
        function getErrorMessage(el) {
            return $(el).data('errorMessage') || el.title;
        }

        function showErrorMessage(el) {
            var $el = $(el);
            var errorContainer = $el.siblings('.error.message');

            if (!errorContainer.length) {

                errorContainer = $('<span class="error message"></span>').insertAfter($el);
            }
            errorContainer.text(getErrorMessage(el));
        }

        function removeErrorMessage(el) {
            var errorContainer = $(el).siblings('.error.message');
            errorContainer.remove();
        }

    }());
