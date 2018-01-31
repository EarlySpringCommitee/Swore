window.onload = function() {
    var username = window.sessionStorage["username"],
        password = window.sessionStorage["password"],
        school = window.sessionStorage["school"]
    if (!username || !password || !school) {
        returnToLogin()
    }
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
    }).fail(function() {
        returnToLogin("填入的帳號或密碼可能有誤，請檢查後再次嘗試送出", "error")
    });
    $("#scoreSelections .button").addClass('active')
    $("#scoreSelections .button").click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
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
    var qaq = $("#scoreSelections .button").length
    for (i = 1; i < qaq + 1; i++) {
        if ($("#scoreSelections .button:nth-child(" + i + ")").hasClass('active')) var owo = owo + "1"
        else var owo = owo + "0"
    }
    return "1" + owo
}