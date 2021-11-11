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
    const [currentCourse, setCurrentCourse] = useState<Course>({
        department: "",
        courseID: 0,
        title: "",
        description: "",
        credits: 0,
        preReqs: [[""]],
        coReqs: [[""]],
        semestersOffered: []
    });
    const [semesterIndex, setSemesterIndex] = useState<number>(0);
    const catalog: Record<string, Course> = courseCatalog;

    function addSemester(semester: Semester) {
        setPlan([...plan, semester]);
    }

    function deleteAllSemesters() {
        setPlan([]);
        console.log("Deleted All Semesters");
    }

    function deleteSemester(semester: Semester) {
        const deleteSemesterIndex = checkSemester(semester);
        const newPlan = [...plan];
        newPlan.splice(deleteSemesterIndex, 1);
        setPlan([...newPlan]);
    }

    function checkSemester(semesterToCheck: Semester): number {
        for(let semesterIndex = 0; semesterIndex<plan.length; semesterIndex++){
            if(semesterToCheck.year === plan[semesterIndex].year && semesterToCheck.season === plan[semesterIndex].season)
                return semesterIndex;
        }
        return -1;
    }

    function editCourseLauncher({course, semester}: {
        course: Course;
        semester: Semester;
    }): void {
        setSemesterIndex(checkSemester(semester));
        setCurrentCourse({...course});
        setEditSemesterVisible(true);
    }

    function editCourse(course: Course) {
        const editSemesterIndex: number = semesterIndex;
        const editCourseKey: string = course.department + course.courseID.toString();
        console.log(course.department);
        console.log(course.courseID);
        console.log(JSON.stringify(plan[editSemesterIndex].courseRecord));
        delete plan[editSemesterIndex].courseRecord[currentCourse.department + currentCourse.courseID];
        plan[editSemesterIndex].courseRecord = {...plan[editSemesterIndex].courseRecord, [editCourseKey]: course};
        setPlan([...plan]);
        console.log(JSON.stringify(plan[editSemesterIndex].courseRecord));
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
                    course={currentCourse}
                    setCurrentCourse={setCurrentCourse}
                    editCourse={editCourse}></EditCourseModal>
            </Row>
            <Row>
                <PlanTable
                    semesters={plan}
                    deleteSemester={deleteSemester}
                    showModal={setVisible}
                    editCourseLauncher={editCourseLauncher}></PlanTable>
            </Row>
        </Container>
    );
}

export default App;
