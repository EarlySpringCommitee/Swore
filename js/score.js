$(document).ready(function() {

    $("#score ,#total,#day").attr('style', '')
    $("#score tr:first-child ,#total tr:last-child,#day tr:last-child").remove()

    $('#score td ,#total td ,#day td').html(function() {
        var text = $(this).text()
        if (text < 60 && text > 0) {
            $(this).addClass('negative')
                // 不及格
        }
        if (text <= 100 && text >= 0) {
            $(this).addClass('score')
                // 如果是分數，加上等寬字元
        }
        if (text == '曠課 ') {
            $(this).addClass('negative')
                //曠課
        }
        return text
    })
});