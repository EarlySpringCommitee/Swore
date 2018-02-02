window.onload = () => {
    var username = window.sessionStorage["username"],
        password = window.sessionStorage["password"],
        school = window.sessionStorage["school"]
    if (!username || !password || !school) {
        returnToLogin("請先登入", "error")
    }
    if (location.hostname == 'localhost' || username == '始春延期') {
        getLocalScore()
        snackbar("目前取用本地資料")
    } else {
        ajaxGetScore(username, password, school)
    }
    $('a[href="login.html"]').attr('href', '#logout').text('登出')
    $('a[href="#logout"]').click(function() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('password');
        sessionStorage.removeItem('school');
        returnToLogin("您已成功登出", "success")
    })
}

function buttonClick() {
    $(".ts.accordion .button").addClass('spring')
    $(".ts.accordion .ts.buttons .ts.button").click(function() {
        if ($(this).hasClass('spring')) {
            $(this).removeClass('spring')
        } else {
            $(this).addClass('spring')
        }
        let score = ajaxdata['s']
        let owo = createScoreTable('s', score, scoreSelectionStatus(), examSelectionStatus(), subjectSelectionStatus());
        $("#score").html(owo)
    })
}

function returnToLogin(message, icon) {
    if (message) {
        window.sessionStorage["loginMessage"] = message
        window.sessionStorage["loginMessageIcon"] = icon
    }
    document.location.href = "login.html"
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
        showSelectorButtons(ajaxdata)
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
    showSelectorButtons(ajaxdata)
}

function showSelectorButtons(data) {

    var exam = getKeys(data['s'], 'exam')
    for (i = 0; i < exam.length; i = i + 1) {
        $("#examSelections") //這裡用到了 JQ
            .append($("<div/>")
                .addClass("ts button")
                .attr("data-exam", exam[i])
                .html('<i class="icon"></i>' + exam[i])
            );
    } //結束迴圈

    var subject = getKeys(data['s'], 'subject')
    for (i = 0; i < subject.length; i = i + 1) {
        $("#subjectSelections") //這裡用到了 JQ
            .append($("<div/>")
                .addClass("ts button")
                .attr("data-subject", subject[i])
                .html('<i class="icon"></i>' + subject[i])
            );
    } //結束迴圈

    buttonClick()
}

function scoreSelectionStatus() {
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
        })
    }
    return owo
}

function examSelectionStatus() {
    var exam = getKeys(ajaxdata['s'], 'exam')
    for (i = 0; i < exam.length; i = i + 1) {
        let now = $("#examSelections .ts.button:nth-child(" + (i + 1) + ')')
        if (!now.hasClass('spring')) {
            delete exam[i];
        }
    }
    if (exam.filter(x => true)[0] == undefined) {
        swal({
            title: "錯誤",
            text: '篩選器無法全部關閉',
            icon: 'error',
        })
        $("#examSelections .button").addClass('spring')
        return getKeys(ajaxdata['s'], 'exam')
    }

    return exam.filter(x => true)
}

function subjectSelectionStatus() {
    var subject = getKeys(ajaxdata['s'], 'subject')
    for (i = 0; i < subject.length; i = i + 1) {
        let now = $("#subjectSelections .ts.button:nth-child(" + (i + 1) + ')')
        if (!now.hasClass('spring')) {
            delete subject[i];
        }
    }
    if (subject.filter(x => true)[0] == undefined) {
        swal({
            title: "錯誤",
            text: '篩選器無法全部關閉',
            icon: 'error',
        })
        $("#subjectSelections .button").addClass('spring')
        return getKeys(ajaxdata['s'], 'subject')
    }
    return subject.filter(x => true)
}