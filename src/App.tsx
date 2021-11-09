import React, { useState } from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import { ControlPanel } from "./Components/ControlPanel";
import { AddSemesterModal } from "./Components/AddSemesterModal";
import { Course } from "./interface/course";
import { Semester } from "./interface/semester";
import { PlanTable } from "./Components/PlanTable";
import courseCatalog from "./Assets/testcourses.json";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const catalog: Record<string, Course> = courseCatalog;

    function addSemester(semester: Semester) {
        setPlan([...plan, semester]);
    }

    function deleteAllSemesters() {
        setPlan([]);
        console.log("Deleted All Semesters");
    }

    function deleteSemester(deleteIndex: number) {
        const newPlan = [...plan];
        newPlan.splice(deleteIndex, 1);
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
        <DndProvider backend = {HTML5Backend}>
            <Container className="App">
                <Row>
                    <br></br>
                </Row>
                <Row>
                    <ControlPanel showModal={setVisible} deleteAllSemesters={deleteAllSemesters}></ControlPanel>
                </Row>
                <Row>
                    <AddSemesterModal addSemester={addSemester} checkSemester={checkSemester} setVisible={setVisible} visible={visible} catalog={catalog}></AddSemesterModal>
                </Row>
                <Row>
                    <PlanTable semesters = {plan} deleteSemester = {deleteSemester}></PlanTable>
                </Row>
            </Container>
        </DndProvider>
    );
}

export default App;
