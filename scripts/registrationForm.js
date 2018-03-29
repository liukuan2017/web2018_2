$(document).ready(function () {
    $('#sub').click(function (event) {
        event.preventDefault();
        var data={
            name:$('#name').val(),
            password:$('#password').val(),
            phoneNum:$('#phoneNum').val(),
            email:$('#email').val(),
            checkbox1:$('#checkbox1').prop('checked'),
            checkbox2:$('#checkbox2').prop('checked')
        };
        $.ajax({
            url:'http://127.0.0.1:8080/registrationForm',
            type: "POST",
            data: data,
            dataType: 'text',
            success: function (res) {
                $('#whiteBoard')[0].innerHTML = res.toString();
            },
            error: function (err) {
                $('#whiteBoard')[0].innerHTML = err.toString();
            }
        });
    });
});