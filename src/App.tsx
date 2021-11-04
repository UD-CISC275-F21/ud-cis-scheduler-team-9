import React, { useState } from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import { ControlPanel } from "./Components/ControlPanel";
import { AddSemesterModal } from "./Components/AddSemesterModal";
import { Course } from "./interface/course";
import { Semester } from "./interface/semester";
import { PlanTable } from "./Components/PlanTable";
import courseCatalog from "./Assets/testcourses.json";
import { EditCourseModal } from "./Components/EditCourseModal";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [editSemesterVisible, setEditSemesterVisible] = useState<boolean>(false);
    const catalog: Record<string, Course> = courseCatalog;

    function addSemester(semester: Semester) {
        setPlan([...plan, semester]);
    }

    function deleteAllSemesters() {
        setPlan([]);
        console.log("Deleted All Semesters");
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

    function checkSemester(semesterToCheck: Semester): boolean {
        let i;
        for(i = 0; i<plan.length; i++){
            if(semesterToCheck.year === plan[i].year && semesterToCheck.season === plan[i].season)
                return true;
        }
        return false;
    }

    function editCourse(course: Course): void {
        setEditSemesterVisible(true);
        
    }

    return (
        <Container className="App">
            <Row>
                <br></br>
            </Row>
            <Row>
                <ControlPanel showModal={setVisible} deleteAllSemesters={deleteAllSemesters}></ControlPanel>
            </Row>
            <Row>
                <AddSemesterModal addSemester={addSemester}
                    checkSemester={checkSemester}
                    setVisible={setVisible}
                    visible={visible}
                    catalog={catalog}></AddSemesterModal>
                <EditCourseModal
                    setEditSemesterVisible={setEditSemesterVisible}
                    editSemesterVisible={editSemesterVisible}
                    course={plan[1].courseRecord["CISC108"]}
                    editCourse={() => {
                        console.log("gefe");
                    }}></EditCourseModal>
            </Row>
            <Row>
                <PlanTable semesters={plan}
                    deleteSemester={deleteSemester}
                    showModal={setVisible}
                    setEditSemesterVisible={setEditSemesterVisible}></PlanTable>
            </Row>
        </Container>
    );
}

export default App;
