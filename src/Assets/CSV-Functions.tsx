import { Season, Semester } from "../interface/semester";
import fs from "fs";
import { Course } from "../interface/course";
import { useState } from "react";
import { downloadBlob } from "./downloads";

export function CSVExport(plan: Semester[]): void{
    if(plan !== []){
        downloadBlob(extractAsCSV(plan), "degreePlan.csv", "text/csv");
    }
}

export function CSVImport(): Semester[]{
    const [plan, setPlan] = useState<Semester[]>([]);
    const [courseRecord, setCourseRecord] = useState<Record<string, Course>>({});

    function redetermineSeason(season: string): Season{
        if(season === "Winter"){
            return 0;
        } else if(season === "Spring"){
            return 1;
        } else if(season === "Summer"){
            return 2;
        } else if(season === "Fall"){
            return 3;
        }
        return 0;
    }

    /*fs.createReadStream("degreePlan.csv")
        .pipe(csv())
        .on("data", function (row) {
            const season = redetermineSeason(row.Season);
            
            const semester: Semester = {
                season,
                year: +row.Year,
                courseRecord,
                creditTotal: +row.Credit_Total,
                expectedTuition: +row.Expected_Tuition
            };

            if(!plan.includes(semester))
                setPlan([...plan, semester]);

            const course: Course = {
                department: row.Department,
                courseID: +row.CourseID,
                title: row.Title,
                description: row.Description,
                credits: +row.Credits,
                preReqs: row.Pre_Requisites,
                coReqs: row.Co_Requisites,
                semestersOffered: row.Semesters_Offered
            };

            
            for(let i = 0; i<plan.length; i++){
                if(plan[i].season + plan[i].year === row.Semester){
                    const courseKey = row.Department + row.CourseID;
                    if(!plan[i].courseRecord[courseKey])
                        setCourseRecord({...plan[i].courseRecord, [courseKey]: course});
                }
            }
        });*/
    return plan;
}

function extractAsCSV(rows: Semester[]): string{
    const emptyRow = ", \n";
    const semesterHeaders = ["Year", "Season", "Credit Total", "Expected Tuition"];
    const courseHeaders = ["Semester", "Department", "courseID", "Title", "Description", "Pre-Requisites", "Co-Requisites", "Semesters Offered"];

    function determineSeason(num: number){
        switch(num){
        case 0:
            return "Winter";
        case 1:
            return "Spring";
        case 2:
            return "Summer";
        case 3:
            return "Fall";
        }
    }

    function produceCourseData(){
        let courseData = "";
        for(let i = 0; i<rows.length; i++){
            courseData = courseData + emptyRow + emptyRow + courseHeaders.join(",") + "\n" + 
            determineSeason(rows[i].season) + " " + rows[i].year + "," + Object.values(rows[i].courseRecord).map(course => {
                return course.department + "," + course.courseID + "," + course.title + "," + `${course.description}` + "," + course.preReqs + "," + course.coReqs + "," + course.semestersOffered + ", \n";
            });
        }
        return courseData;
    }

    const csvContent = semesterHeaders.join(",") + "\n" + rows.map(row => {
        function determineSeason(num: number){
            switch(num){
            case 0:
                return "Winter";
            case 1:
                return "Spring";
            case 2:
                return "Summer";
            case 3:
                return "Fall";
            }
        }

        row.year + "," + determineSeason(row.season) + "," + row.creditTotal + "," + row.expectedTuition + "\n";
    }) + emptyRow + emptyRow + produceCourseData();

    return csvContent;
}