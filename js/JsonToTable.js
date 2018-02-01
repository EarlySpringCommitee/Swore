isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n);

function createScoreTable(mode, data, scoreSelections = '11111', examSelections = Object.keys(data),
    subjectSelections = Object.keys(Object.values(data)[0]),
    highlight = true, good = 80, bad = 60, goodRankP = 0.125, badRankP = 0.25, goodRank = 5) {
    function s() {
        let table = document.createElement("tbody");
        let firstRow = table.appendChild(document.createElement('tr'));
        firstRow.appendChild(document.createElement('td'));
        scoreSelections = scoreSelections.split('').concat(['0', '0', '0', '0', '0']);
        let rowScoreLength = scoreSelections.filter(i => i != '0').length;

        function color(td, value){
            if (isNumeric(value)){
                let score = parseFloat(value);
                if (score >= good) td.className += ' positive' ;
                else if (score < bad) td.className += ' negative';
            }
            else if (value.includes('/')){
                let rankList = value.split('/');
                if (isNumeric(rankList[0])){
                    if (isNumeric(rankList[1])){
                        if (rankList[0] >= rankList[1] * goodRankP) td.className += ' positive' ;
                        else if (rankList[0] < rankList[1] - (rankList[1] * badRankP)) td.className += ' negative';
                    }
                    else if (rankList[0] >= goodRank) td.className += ' positive' ;
                }
            }
        }

        function generateFirstRow(exam) {
            if (scoreSelections[0] != '0') firstRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(exam));
            if (scoreSelections[1] != '0') firstRow.appendChild(document.createElement('td')).appendChild(document.createTextNode("平均"));
            if (scoreSelections[2] != '0') firstRow.appendChild(document.createElement('td')).appendChild(document.createTextNode("排名"));
            if (scoreSelections[3] != '0') firstRow.appendChild(document.createElement('td')).appendChild(document.createTextNode("類組排"));
            if (scoreSelections[4] != '0') firstRow.appendChild(document.createElement('td')).appendChild(document.createTextNode("校排"));
        }

        function generateScoreRow(subject) {
            let newRow = table.appendChild(document.createElement('tr'));
            newRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(subject));
            examDatas = examSelections.map(i => {
                if (Number.isInteger(i)) return Object.values(data)[i];
                else if (i in data) return data[i];
                else return undefined;
            });
            for (let examData of examDatas) { //
                if (Array.isArray(examData[subject])) {
                    for (let index in examData[subject]) {
                        if (scoreSelections[index] != '0'){
                            let score = examData[subject][index];
                            let td = newRow.appendChild(document.createElement('td'));
                            td.appendChild(document.createTextNode(score));
                            if (highlight) color(td, score);
                        }
                    }
                } else {
                    let score = examData[subject];
                    let td = newRow.appendChild(document.createElement('td'));
                    td.colSpan = rowScoreLength.toString();
                    td.appendChild(document.createTextNode(score));
                    if (highlight) {
                        if (score.includes('.')){
                            if (parseFloat(score) <= 100) color(td, score);
                        }    
                    }
                }
            }
        }
        for (let examSelection of examSelections) {
            let exam;
            if (Number.isInteger(examSelection)) exam = Object.keys(data)[examSelection];
            else if (examSelection in data) exam = examSelection;
            generateFirstRow(exam);
        }
        for (let subjectSelection of subjectSelections) {
            let subject;
            if (Number.isInteger(subjectSelection)) subject = Object.keys(Object.values(data)[0])[subjectSelection];
            else if (subjectSelection in Object.values(data)[0]) subject = subjectSelection;
            generateScoreRow(subject);
        }
        return table;
    }

    switch (mode) {
        case 's':
            return s();
    }
}

function fillInfoIn(data) {
    for (let i of document.querySelectorAll('[data-student="name"]')) {
        i.textContent = data['name'];
    }
    for (let i of document.querySelectorAll('[data-student="studentId"]')) {
        i.textContent = data['studentId'];
    }
    for (let i of document.querySelectorAll('[data-student="class"]')) {
        i.textContent = data['class'];
    }
}

function getKeys(data, mode='exam'){
    switch (mode){
        case 'exam':
            return Object.keys(data);
        case 'subject':
            return Object.keys(Object.values(data)[0]);
    }
}