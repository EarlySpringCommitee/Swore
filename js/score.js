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
}

function returnToLogin() { document.location.href = "login.html" }