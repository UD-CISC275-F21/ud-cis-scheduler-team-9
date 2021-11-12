import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import { ControlPanel } from "./Components/ControlPanel";
import { AddSemesterModal } from "./Components/AddSemesterModal";
import { Course } from "./interface/course";
import { Semester } from "./interface/semester";
import { PlanTable } from "./Components/PlanTable";
import { RequiredDegreeList } from "./Components/RequiredDegreeList";

import courseCatalog from "./Assets/testcourses.json";
import degreePlanList from "./Assets/degreeplans.json";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const catalog: Record<string, Course> = courseCatalog;
    const degreePlans: Record<string, string[]> = degreePlanList;
    const [currentDegreePlan, setCurrentDegreePlan] = useState<string[]>(degreePlans["Computer Science: (BS)"]);
    
    function addSemester(semester: Semester) {
        setPlan([...plan, semester]);
    }

    function deleteAllSemesters() {
        setPlan([]);
        console.log("Deleted All Semesters");
    }


    function checkCourse(course: string): boolean {
        let i;
        if (course.includes("or")){
            const courses: string[] = course.split(" or ", 2);
            for(i = 0; i<plan.length; i++){
                if(plan[i].courseRecord[courses[0]] || plan[i].courseRecord[courses[1]]){
                    return true;
                }
            }
            return false;
        }else if (course.includes("Credits")){
            const requirement: string[] = course.split(": ");
            const nondigits = new RegExp("[a-zA-Z:/ ]", "g");
            const credits_needed = parseInt(course.replace(nondigits, ""));
            console.log(credits_needed);
            let credit_count = 0;
            //console.log(requirement[0]);
            for(i = 0; i<plan.length; i++){
                const course_array: Course[] = Object.values(plan[i].courseRecord);
                for (let j = 0; j < course_array.length; j++){
                    if (course_array[j].fufills === requirement[0]){
                        credit_count += course_array[j].credits;
                    }
                }
            }

            if (credit_count >= credits_needed){
                return true;
            }else{
                return false;
            }
        }else{
            for(i = 0; i<plan.length; i++){
                if(plan[i].courseRecord[course]){
                    return true;
                }
            }
            return false;
        }
    }

    function deleteSemester(semester: Semester) {
        let deleteSemesterIndex = 0;
        for(let i = 0; i < plan.length; i++) {
            if(semester.season === plan[i].season && semester.year === plan[i].year) {
                deleteSemesterIndex = i;
            }
        }
        const newPlan = [...plan];
        newPlan.splice(deleteSemesterIndex, 1);
        setPlan([...newPlan]);
    }
    function checkSemester(semesterToCheck: Semester): boolean{
        let i;
        for(i = 0; i<plan.length; i++){
            if(semesterToCheck.year === plan[i].year && semesterToCheck.season === plan[i].season)
                return true;
        }
        return false;
    }

    return (
        <Container className="App">
            <Row>
                <br></br>
            </Row>
            <Row>
                <RequiredDegreeList checkCourse = {checkCourse} degree_list = {currentDegreePlan}></RequiredDegreeList>
                <ControlPanel showModal={setVisible} deleteAllSemesters={deleteAllSemesters}></ControlPanel>
            </Row>
            <Row>
                <AddSemesterModal addSemester={addSemester} checkSemester={checkSemester} setVisible={setVisible} checkCourse = {checkCourse} visible={visible} catalog={catalog}></AddSemesterModal>
            </Row>
            <Row>
                <PlanTable semesters = {plan} deleteSemester = {deleteSemester} showModal={setVisible}></PlanTable>
            </Row>
            <Row>
            </Row>
        </Container>
    );
}

export default App;
