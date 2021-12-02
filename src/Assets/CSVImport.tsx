import csv from "csv-parser";
import fs from "fs";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import { useState } from "react";



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

    fs.createReadStream("degreePlan.csv")
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
        });
    return plan;
}