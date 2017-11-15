var school = {
    "name": "CareerDevs",
    twitter: "@CareerDevs",
    classes: [
        {
            name: "Fall 2017 Morning Intro",
            time: "Morning",
            type: "Intro",
            year: 2017,
            semester: 2,
            students: [
                {
                    name: "Dara Hoy",
                    grade: 9
                },
                {
                    name: "Lauren George",
                    grade: 8
                }
            ]
        },
        {
            name: "Fall 2017 Evening Intro",
            time: "Evening",
            type: "Intermediate",
            year: 2017,
            semester: 2,
            students: [
                {
                    name: "Josh Bristol",
                    grade: 10
                },
                {
                    name: "Matt Curcio",
                    grade: 7,
                    gender: "male"
                }
            ]
        }
    ],
    
    addStudent: function(classNum, studentName, studentGrade) {
        this.classes[classNum].students.push({
            name: studentName,
            grade: studentGrade
        });
    },
    
    getAvgGrade: function(classNum) {
        // grab the students array from the class number given.
        var theStudents = this.classes[classNum].students;
        var total = 0
        for(var i = 0; i < theStudents.length; i++) {
            // we need to get the grade of each student. what Item do we use here?
            total += theStudents[i].grade;
        }
        return total / theStudents.length;
    }
}

var avgGrade = [school.getAvgGrade(0), school.getAvgGrade(0)]
var expectedAvgGrades = [8.5, 8.5]
var pass = true

for (var i = 0; i < avgGrade.length; i++) {
    if (avgGrade[i] != expectedAvgGrades[i]){
        console.log(`Fail...Actual:${avgGrade[i]}, Expected ${expectedAvgGrades[i]}`);
        pass = false;
    }

}

if (pass) {
    console.log('pass!');
}


