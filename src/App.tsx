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
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const catalog: Record<string, Course> = courseCatalog;
    const [degreePlan, setDegreePlan] = useState<string[]>(["CISC210", "MATH241"]);
    const [requiredCourses, setRequiredCourses] = useState<string[]>(degreePlan);

    useEffect (() => {
        checkDegreePlan();
    }, [plan]);
    
    function addSemester(semester: Semester) {
        setPlan([...plan, semester]);
    }

    function deleteAllSemesters() {
        //just to bypass the linter warning, remove later
        setDegreePlan(degreePlan);

        setPlan([]);
        console.log("Deleted All Semesters");
    }

    function checkCourse(course: string): boolean {
        let i;
        for(i = 0; i<plan.length; i++){
            if(plan[i].courseRecord[course]){
                return true;
            }
        }
        return false;
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

    function checkDegreePlan() {
        let violations: string[] = [];
        for (let i = 0; i < degreePlan.length; i++){
            //console.log("TESTING " + degreePlan[i]);
            //console.log(checkCourse(degreePlan[i]));
            if (!checkCourse(degreePlan[i])){
                const course: string = degreePlan[i];
                violations = [...violations, course];
            }
        } 
        //It seems that useState does not like trying to set its variable in a loop multiple times
        setRequiredCourses(violations);
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
        <DndProvider backend = {HTML5Backend}>
            <Container className="App">
                <Row>
                    <br></br>
                </Row>
                <Row>
                    <ControlPanel showModal={setVisible} deleteAllSemesters={deleteAllSemesters}></ControlPanel>
                </Row>
                <Row>
                    <AddSemesterModal addSemester={addSemester} checkSemester={checkSemester} setVisible={setVisible} checkCourse = {checkCourse} visible={visible} catalog={catalog}></AddSemesterModal>
                    <RequiredDegreeList degree_list = {requiredCourses}></RequiredDegreeList>
                </Row>
                <Row>
                    <PlanTable semesters = {plan} deleteSemester = {deleteSemester} showModal={setVisible}></PlanTable>
                </Row>
                <Row>
                </Row>
            </Container
        </DndProvider>
    );
}

export default App;
