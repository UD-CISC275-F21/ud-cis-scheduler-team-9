import React from "react";
import { Semester } from "../interface/semester";
//import { Course } from "../interface/course";
import { useState } from "react";
import { downloadBlob } from "./downloads";
import { Button, Form } from "react-bootstrap";

export function CSVExport(plan: Semester[]): void{
    if(plan !== []){
        downloadBlob(extractAsCSV(plan), "degreePlan.csv", "text/csv");
    }
}

export function CSVImport(): JSX.Element{
    const [file, setFile] = useState<File>();

    return (
        <Form id='csv-form'>
            <Form.Control 
                data-testid="csv-import"  
                as="input"
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if(e.target.files != null)
                        setFile(e.target.files[0]);
                }}
            >
            </Form.Control>
            <Button className="button" type="submit" data-testid="file-input-button" id="file-input-button">
                Submit
            </Button>
        </Form>
    );
}



/*const [courseRecord, setCourseRecord] = useState<Record<string, Course>>({});

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
//return file;

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
                return course.department + "," + course.courseID + "," + course.title + "," + `"${course.description}"` + "," + 
                reqFormatter(course.preReqs) + "," + reqFormatter(course.coReqs) + "," + `"${course.semestersOffered.map(
                    (offered)=> determineSeason(offered)).join(", ")}"` + "\n";
            });
        }
        return courseData;
    }

    function produceSemesterData(){

        const formatter = new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
            //obtained from https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
        });

        const semesterData = semesterHeaders.join(",") + "\n" + rows.map(row => {
            const data = [row.year, determineSeason(row.season), row.creditTotal, formatter.format(row.expectedTuition)];
            return data.join(",");
        }).join("\n");

        return semesterData;
    }

    const csvContent = produceSemesterData() + produceCourseData();
    
    return csvContent;
}