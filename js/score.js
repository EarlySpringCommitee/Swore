window.onload = function() {
    /*var username = window.sessionStorage["username"],
        password = window.sessionStorage["password"],
        school = window.sessionStorage["school"]
    if (!username || !password || !school) {
        returnToLogin()
    }*/
    let owo = createScoreTable('s', data['s']);
    $("#score").html(owo)
    fillInfoIn(data['i'])
    $("#scoreSelections .button").addClass('active')
    $("#scoreSelections .button").click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
        }
        console.log(selectorStatus())
        let owo = createScoreTable('s', data['s'], selectorStatus());
        $("#score").html(owo)
    })
}

function returnToLogin() { document.location.href = "login.html" }

function selectorStatus() {
    var owo = ''
    var qaq = $("#scoreSelections .button").length
    for (i = 1; i < qaq + 1; i++) {
        if ($("#scoreSelections .button:nth-child(" + i + ")").hasClass('active')) var owo = owo + "1"
        else var owo = owo + "0"
    }
    return "1" + owo
}