window.onload = function() {
    var username = window.sessionStorage["username"],
        password = window.sessionStorage["password"],
        school = window.sessionStorage["school"]
    if (!username || !password || !school) {
        returnToLogin()
    }
    if (location.hostname == 'localhost' || username == '始春延期') {
        getLocalScore()
    } else {
        ajaxGetScore(username, password, school)
    }
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
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('school');
        returnToLogin("您已成功登出", "success")
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
    if (owo == '00000') {
        $("#scoreSelections .button").addClass('spring')
        var ouo = 5
        var owo = '11111'
        swal({
            title: "錯誤",
            text: '篩選器無法全部關閉',
            icon: 'error',
        });
    }
    $('table#score').attr('style', 'min-width: ' + (ouo * 300 + 900) + 'px')
    return owo
}

function ajaxGetScore(username, password, school) {
    $("#loader .loader").text('請求中')
    $.post("https://api.twscore.ml/" + school, {
        account: username,
        password: password,
        mode: "is",
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

}

function getLocalScore() {
    $("#loader").removeClass('active')
    $.getScript('/js/data.json')
    ajaxdata = data
    $("#score").html(createScoreTable('s', ajaxdata['s']))
    fillInfoIn(ajaxdata['i'])
}