function createScoreTable(mode, data, examSelections = Object.keys(data), subjectSelections = Object.keys(Object.values(data)[0], scoreSelections = '1110')) {
    function s() {
        let table = document.createElement("table");
        let firstRow = table.appendChild(document.createElement('tr'));
        firstRow.appendChild(document.createElement('td'));
        scoreSelections = scoreSelections.split('').concat(['0', '0', '0', '0']);
        let rowScoreLength = scoreSelections.filter(i => i != '0').length;

        function generateFirstRow(exam) {
            let i = scoreSelections;
            if (i[0] != '0') firstRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(exam));
            if (i[1] != '0') firstRow.appendChild(document.createElement('td')).appendChild(document.createTextNode("平均"));
            if (i[2] != '0') firstRow.appendChild(document.createElement('td')).appendChild(document.createTextNode("排名"));
            if (i[3] != '0') firstRow.appendChild(document.createElement('td')).appendChild(document.createTextNode("排名人數"));
        }

        function generateScoreRow(subject, exams = examSelections) {
            let newRow = table.appendChild(document.createElement('tr'));
            newRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(subject));
            let j = [];
            for (let i of exams) {
                if (Number.isInteger(i)) j.push(Object.values(data)[i]);
                else if (i in data) j.push(data[i]);
            }
            exams = j;
            for (let i of exams) { //
                if (Array.isArray(i[subject])) {
                    for (let index in i[subject]) {
                        let j = scoreSelections;
                        if (j[index] != '0') newRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(i[subject][index]));
                    }
                } else {
                    let j = newRow.appendChild(document.createElement('td'));
                    j.colSpan = rowScoreLength.toString();
                    j.appendChild(document.createTextNode(i[subject]));
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