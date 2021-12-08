import { Season, Semester } from "../interface/semester";
//import fs from "fs";
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
        switch(season){
        case "Winter":
            return 0;
        case "Spring":
            return 1;
        case "Summer":
            return 2;
        case "Fall":
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

    function reqFormatter(courses: string[][]): string{
        let ret = "";
        for(let i = 0; i<courses.length; i++){
            for(let p = 0; p<courses[i].length; p++){
                ret += `${courses[i][p]}`;
                if(courses[i][p+1]){
                    ret += " or ";
                }
            }
            if(courses[i+1]){
                ret += " and ";
            }
        }
        if(ret === ""){
            ret = "N/A";
        }
        return ret + " ";
    }

    function produceCourseData(){
        let courseData = "";
        for(let i = 0; i<rows.length; i++){
            courseData = courseData + emptyRow + emptyRow + courseHeaders.join(",") + "\n" + 
            determineSeason(rows[i].season) + " " + rows[i].year + "," + Object.values(rows[i].courseRecord).map(course => {
                return course.department + "," + course.courseID + "," + course.title + "," + `"${course.description.replaceAll(",", ",")}"` + "," + 
                reqFormatter(course.preReqs) + "," + reqFormatter(course.coReqs) + "," + `"${course.semestersOffered.map(
                    (offered)=> determineSeason(offered)).join(", ")}"` + "\n";
            });
        }
        return courseData;
    }

    function produceSemesterData(){
        const semesterData = semesterHeaders.join(",") + "\n" + rows.map(row => {
            row.year + "," + determineSeason(row.season) + "," + row.creditTotal + "," + row.expectedTuition + "\n";
            console.log(row.year);
        });
        return semesterData;
        
    }

    const csvContent = produceSemesterData() + produceCourseData();
    
    return csvContent;
}