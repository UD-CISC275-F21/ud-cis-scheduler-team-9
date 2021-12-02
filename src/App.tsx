import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import { AddSemesterModal } from "./Components/AddSemesterModal";
import { Course } from "./interface/course";
import { Semester } from "./interface/semester";
import { PlanTable } from "./Components/PlanTable";
import { EditCourseModal } from "./Components/EditCourseModal";
import { RequiredDegreeList } from "./Components/RequiredDegreeList";

import courseCatalog from "./Assets/testcourses.json";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SchedulerNavbar } from "./Components/SchedulerNavbar";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const catalog: Record<string, Course> = courseCatalog;
    const [degreePlan, setDegreePlan] = useState<string[]>(["CISC210", "MATH241"]);
    const [requiredCourses, setRequiredCourses] = useState<string[]>(degreePlan);

    const [editCourseVisible, setEditCourseVisible] = useState<boolean>(false);
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
    function editCourse(course: Course) {
        const editSemesterIndex: number = semesterIndex;
        delete plan[editSemesterIndex].courseRecord[currentCourse.department + currentCourse.courseID];
        plan[editSemesterIndex].courseRecord = {...plan[editSemesterIndex].courseRecord, [course.department + course.courseID]: course};
        setPlan([...plan]);
    }

    function deleteCourse({course, semester}: {
        course: Course;
        semester: Semester;
    }): void {
        const deleteSemesterIndex: number = checkSemester(semester);
        delete plan[deleteSemesterIndex].courseRecord[course.department + course.courseID];
        setPlan([...plan]);
    }

    function editCourseLauncher({course, semester}: {
        course: Course;
        semester: Semester;
    }): void {
        setSemesterIndex(checkSemester(semester));
        setCurrentCourse(course);
        setEditCourseVisible(true);
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
    function checkSemester(semesterToCheck: Semester): number {
        for(let semesterIndex = 0; semesterIndex<plan.length; semesterIndex++){
            if(semesterToCheck.year === plan[semesterIndex].year && semesterToCheck.season === plan[semesterIndex].season)
                return semesterIndex;
        }
        return -1;
    }

    return (
        <DndProvider backend = {HTML5Backend}>
            <Container className="App">
                <header></header>
                <SchedulerNavbar deleteAllSemesters={deleteAllSemesters}></SchedulerNavbar>
                <Row>
                    <AddSemesterModal
                        addSemester={addSemester}
                        checkSemester={checkSemester}
                        setVisible={setVisible}
                        checkCourse={checkCourse}
                        visible={visible}
                        catalog={catalog}
                    ></AddSemesterModal>
                    <EditCourseModal
                        setEditCourseVisible={setEditCourseVisible}
                        editCourseVisible={editCourseVisible}
                        course={currentCourse}
                        setCurrentCourse={setCurrentCourse}
                        editCourse={editCourse}
                    ></EditCourseModal>
                    <RequiredDegreeList
                        degree_list={requiredCourses}
                    ></RequiredDegreeList>
                </Row>
                <Row>
                    <PlanTable
                        semesters={plan}
                        deleteSemester={deleteSemester}
                        showModal={setVisible}
                        editCourseLauncher={editCourseLauncher}
                        deleteCourse={deleteCourse}
                    ></PlanTable>
                </Row>
                <Row>
                </Row>
            </Container>
        </DndProvider>
    );
}

export default App;
