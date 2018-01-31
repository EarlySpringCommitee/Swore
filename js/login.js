// 程式碼來自 https://www.jianshu.com/p/b5a9b8d74d38
function setCookie(name, value, expdays) {
    var expdate = new Date();
    //設置 Cookie 過期日期
    expdate.setDate(expdate.getDate() + expdays);
    //添加 Cookie
    document.cookie = name + "=" + escape(value) + ";expires=" + expdate.toUTCString();
}

function getCookie(name) {
    //獲取 name 在 Cookie 中起止位置
    var start = document.cookie.indexOf(name + "=");

    if (start != -1) {
        start = start + name.length + 1;
        //獲取 value 的終止位置
        var end = document.cookie.indexOf(";", start);
        if (end == -1)
            end = document.cookie.length;
        //截獲 cookie 的 value 值,並返回
        return unescape(document.cookie.substring(start, end));
    }
    return "";
}

function delCookie(name) {
    setCookie(name, "", -1);
}

function check() {
    //獲取 form 表單輸入:使用者名稱,密碼,是否保存密碼
    var username = document.getElementById("userID").value.trim();
    var password = document.getElementById("userPASS").value.trim();
    var school = document.getElementById("userSchool").value.trim();
    var isRmbPwd = document.getElementById("isRmbPwd").checked;
    //存到 sessionStorage 等等在成績頁使用
    window.sessionStorage["username"] = username;
    window.sessionStorage["password"] = password;
    window.sessionStorage["school"] = school;

    //判斷使用者名稱,密碼是否為空(全空格也算空)
    if (username.length != 0 && password.length != 0) {
        //若複選框勾選,則添加 Cookie,記錄密碼
        if (isRmbPwd == true) {
            setCookie("This is username", username, 7);
            setCookie("School", school, 7);
            setCookie(username, password, 7);
        }
        //否則清除Cookie
        else {
            delCookie("This is username");
            delCookie("School");
            delCookie(username);
        }
        return true;
    }
    //非法輸入提示
    else {
        swal({
            title: "糟糕",
            text: '請正確填寫帳號密碼',
            icon: 'error',
        });
        return false;
    }

    document.location.href = "score.html"
}
//將 function 函數賦值給 onload 對象
window.onload = function() {
    //從 Cookie 獲取到使用者名稱
    var username = getCookie("This is username");
    var school = getCookie("School");
    //如果使用者名稱為空,則給 form 元素賦空值
    if (username == "") {
        document.getElementById("userID").value = "";
        document.getElementById("userPASS").value = "";
        document.getElementById("isRmbPwd").checked = false;
    }
    //獲取對應的密碼,並把使用者名稱,密碼賦值給 form
    else {
        var password = getCookie(username);

        document.getElementById("userID").value = username;
        document.getElementById("userPASS").value = password;
        document.getElementById("isRmbPwd").checked = true;

        // 調整下拉式選單
        var userSchool = document.getElementById('userSchool');
        for (var i, j = 0; i = userSchool.options[j]; j++) {
            if (i.value == 'PIAN') {
                document.getElementById("userID").value = "521069"
                document.getElementById("userPASS").value = "spring_never_comes"
                document.getElementById("isRmbPwd").checked = true
                $("#userPASS").attr('type', 'text')
            }
            if (i.value == school) {
                userSchool.selectedIndex = j;
                break;
            }
        }
    }
    //傳出的帳密錯誤
    if (window.sessionStorage["loginMessage"]) {
        swal({
            title: "訊息",
            text: window.sessionStorage["loginMessage"],
            icon: window.sessionStorage["loginMessageIcon"],
        });
        sessionStorage.removeItem('loginMessage');
        sessionStorage.removeItem('loginMessageIcon');
    }
    //自動填入洨安高中
    $("select#userSchool").change(function() {
        $("#userPASS").attr('type', 'password')
        if ($(this).val() == 'PIAN') {
            document.getElementById("userID").value = "521069"
            document.getElementById("userPASS").value = "spring_never_comes"
            document.getElementById("isRmbPwd").checked = true
            $("#userPASS").attr('type', 'text')
        }
    });
}