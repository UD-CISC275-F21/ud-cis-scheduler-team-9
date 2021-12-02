import { Season, Semester } from "../interface/semester";
import fs from "fs";

export function CSVExport(plan: Semester[]): void{
    const filename = "degreePlan.csv";
    fs.writeFile(filename, extractAsCSV(plan), err => {
        if (err) {
            console.log("Error writing to csv file", err);
        } else {
            console.log(`saved as ${filename}`);
        }
    });
}


function extractAsCSV(rows: Semester[]): string | undefined{
    if (!rows || !rows.length) {
        return;
    }

    const emptyRow = ", \n";
    const semesterHeaders = ["Year", "Season", "Credit_Total", "Expected_Tuition"];
    const courseHeaders = ["Semester", "Department", "courseID", "Title", "Description", "Pre_Requisites", "Co_Requisites", "Semesters_Offered"];

    function determineSeason(num: number){
        if(num === 0){
            return "Winter";
        } else if(num === 1){
            return "Spring";
        } else if(num === 2){
            return "Summer";
        } else if(num === 3){
            return "Fall";
        }
    }

    function produceCourseData(){
        let courseData = "";
        for(let i = 0; i<rows.length; i++){
            courseData = courseData + emptyRow + emptyRow + courseHeaders.join(",") + "\n" + 
            determineSeason(rows[i].season) + " " + rows[i].year + "," + Object.values(rows[i].courseRecord).map(course => {
                return course.department + "," + course.courseID + "," + course.title + "," + course.description + "," + course.preReqs + "," + course.coReqs + "," + course.semestersOffered + ", \n";
            });
        }
        return courseData;
    }

    const csvContent = semesterHeaders.join(",") + "\n" + rows.map(row => {
        function determineSeason(num: Season){
            if(num === 0){
                return "Winter";
            } else if(num === 1){
                return "Spring";
            } else if(num === 2){
                return "Summer";
            } else if(num === 3){
                return "Fall";
            }
        }

        return row.year + "," + determineSeason(row.season) + "," + row.creditTotal + "," + row.expectedTuition + "\n";
    }) + emptyRow + emptyRow + produceCourseData();

    return csvContent;
}