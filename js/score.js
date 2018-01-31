window.onload = function() {
    var username = window.sessionStorage["username"],
        password = window.sessionStorage["password"],
        school = window.sessionStorage["school"]
    if (!username || !password || !school) {
        returnToLogin()
    }
    $("#loader .loader").text('請求中')
    $.post("http://api.twscore.ml:5000/" + school, {
        account: username,
        password: password,
        mode: "is"
    }, function(data, status) {
        console.log(status)
        console.log(data)
        ajaxdata = data
        let owo = createScoreTable('s', ajaxdata['s']);
        $("#score").html(owo)
        fillInfoIn(ajaxdata['i'])
        $("#loader").removeClass('active')
    }).fail(function() {
        returnToLogin("填入的帳號或密碼可能有誤，請檢查後再次嘗試送出", "error")
    });
    $("#scoreSelections .button").addClass('spring')
    $("#scoreSelections .button").click(function() {
        if ($(this).hasClass('spring')) {
            $(this).removeClass('spring')
        } else {
            $(this).addClass('spring')
        }
        let owo = createScoreTable('s', ajaxdata['s'], selectorStatus());
        $("#score").html(owo)
    })
    $('a[href="login.html"]').attr('href', '#logout').text('登出')
    $('a[href="#logout"]').click(function() {
        returnToLogin("您已成功登出", "info")
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('school');
    })
}

function returnToLogin(message, icon) {
    if (message) {
        window.sessionStorage["loginMessage"] = message
        window.sessionStorage["loginMessageIcon"] = icon
    }
    document.location.href = "login.html"
}

function selectorStatus() {
    var owo = ''
    var ouo = 0
    var qaq = $("#scoreSelections .button").length
    for (i = 1; i < qaq + 1; i++) {
        if ($("#scoreSelections .button:nth-child(" + i + ")").hasClass('spring')) {
            var owo = owo + "1"
            var ouo = ouo + 1
        } else { var owo = owo + "0" }
    }
    console.log(ouo)
    $('table#score').attr('style', 'min-width: ' + (ouo * 375 + 900) + 'px')
    return "1" + owo
}