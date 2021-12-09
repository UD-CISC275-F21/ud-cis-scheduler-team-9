import React, { useState } from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import { AddSemesterModal } from "./Components/AddSemesterModal";
import { Course } from "./interface/course";
import { Semester } from "./interface/semester";
import { PlanTable } from "./Components/PlanTable";
import { EditCourseModal } from "./Components/EditCourseModal";
import { RequiredDegreeList } from "./Components/RequiredDegreeList";
import courseData from "./Assets/courseData.json";
import courseCatalog from "./Assets/testcourses.json";
import { SchedulerNavbar } from "./Components/SchedulerNavbar";
import degreePlanList from "./Assets/degreeplans.json";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const catalog: Record<string, Course> = courseCatalog;
    const [degreePlan, setDegreePlan] = useState<string>("Computer Science: (BS)");
    const [degreeRequirements, setDegreeRequirements] = useState<string[]>(degreePlanList["Computer Science: (BS)"]);
    const [editCourseVisible, setEditCourseVisible] = useState<boolean>(false);
    const [currentCourse, setCurrentCourse] = useState<Course>({
        department: "",
        courseID: 0,
        title: "",
        description: "",
        credits: 0,
        preReqs: [[""]],
        fufills: ""
    });
    const [semesterIndex, setSemesterIndex] = useState<number>(0);

    function setUp(){
        courseData.forEach((json_course)=>{
            const course_entry: Course = {
                department: "",
                courseID: 0,
                title: "",
                description: "",
                credits: 0,
                preReqs: [],
                fufills: ""
            };
            //Split the courseID into the number. "CISC 106" -> "CISC" + "106"
            const courseID_split: string[] = json_course.courseID.split(" ");
            course_entry.department = courseID_split[0];
            course_entry.courseID =  parseInt(courseID_split[1]);

            const title_split: string[] = json_course.title.split("- ");
            course_entry.title = title_split[1];
            course_entry.description = json_course.description;
            course_entry.credits = parseInt(json_course.credits);
            if (json_course.prereqs != []){
                json_course.prereqs.forEach((prereq)=>{
                    prereq.replace(" ", "");
                });
                course_entry.preReqs.push(json_course.prereqs);
            }else{
                course_entry.preReqs.push([""]);
            }
            
            //Handling fufillments
            if (json_course["University Breadth"] != ""){
                const fufilled_breadth = json_course["University Breadth"].substr(1);
                course_entry.fufills = fufilled_breadth;
            }
            const key: string = course_entry.department + course_entry.courseID;
            catalog[key] = course_entry;
        });
    }
    function addSemester(semester: Semester) {
        setPlan([...plan, semester]);
    }

    function deleteAllSemesters() {
        setPlan([]);
    }
    function checkCourse(course: string): boolean {
        let i;
        if (course.includes(" or ")){
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
            let credit_count = 0;
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

    function checkSemester(semesterToCheck: Semester): number {
        for(let semesterIndex = 0; semesterIndex<plan.length; semesterIndex++){
            if(semesterToCheck.year === plan[semesterIndex].year && semesterToCheck.season === plan[semesterIndex].season){
                return semesterIndex;
            }
        }
        return -1;
    }

    //Adds all courses to the course catalog
    setUp();
    return (
        <DndProvider backend = {HTML5Backend}>
            <Container className="App">
                <header></header>
                <SchedulerNavbar
                    deleteAllSemesters={deleteAllSemesters}
                    setDegreeRequirements = {setDegreeRequirements}
                    setDegreePlan = {setDegreePlan}
                    plan={plan}
                    degree_plan_list = {degreePlanList}
                ></SchedulerNavbar>
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
                        checkCourse = {checkCourse}
                        catalog = {catalog}
                        degree_plan = {degreePlan}
                        degree_list={degreeRequirements}
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
