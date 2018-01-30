function createScoreTable(mode, data, examSelections = Object.keys(data), subjectSelections = Object.keys(Object.values(data)[0]), scoreSelections = '11111') {
    function s() {
        let table = document.createElement("tbody");
        let firstRow = table.appendChild(document.createElement('tr'));
        firstRow.appendChild(document.createElement('td'));
        scoreSelections = scoreSelections.split('').concat(['0', '0', '0', '0', '0']);
        let rowScoreLength = scoreSelections.filter(i => i != '0').length;

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
                        if (scoreSelections[index] != '0') newRow.appendChild(document.createElement('td')).appendChild(document.createTextNode(examData[subject][index]));
                    }
                } else {
                    let td = newRow.appendChild(document.createElement('td'));
                    td.colSpan = rowScoreLength.toString();
                    td.appendChild(document.createTextNode(examData[subject]));
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