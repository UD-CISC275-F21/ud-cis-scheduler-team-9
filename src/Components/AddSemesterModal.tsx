import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form, Button, FormCheck, FormControl} from "react-bootstrap";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import { CardPool } from "./CardPool";
import { CourseCardDisplay } from "./CourseCardDisplay";

import ModalHeader from "react-bootstrap/ModalHeader";
import { SemesterTable } from "./SemesterTable";

export function AddSemesterModal({ addSemester, checkSemester, setVisible, checkCourse, visible, catalog}:{
    addSemester: (s: Semester)=>void,
    checkSemester: (c: Semester)=>number,
    setVisible: (v:boolean)=>void,
    checkCourse: (c: string)=>boolean,
    visible: (boolean),
    catalog: (Record<string, Course>)
}): JSX.Element {

    const [season, setSeason] = useState<Season>(0);
    const [year, setYear] = useState<number>(1);
    const [courseRecord, setCourseRecord] = useState<Record<string, Course>>({});
    const [creditTotal, setCreditTotal] = useState<number>(0);
    const [expectedTuition, setExpectedTuition] = useState<number>(0);
    const semesterInfo = {season, year, courseRecord, creditTotal, expectedTuition};

    const [department, setDepartment] = useState<string>("");
    const [courseID, setCourseID] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<number>(0);
    const [preReqs, setPreReqs] = useState<string[][]>([[]]);
    const [preRequirements, setPreRequirements] = useState<boolean>(true);
    const [fufills, setFufills] = useState<string>("");
    const [courseInfo, setCourseInfo] = useState<Course>({department, courseID, title, description, credits, preReqs, fufills});

    const [showCard, setShowCard] = useState<boolean>(false);
    // add semester modal states
    const [showPreWarning, setShowPreWarning] = useState<boolean>(false);
    
    const hide = ()=>setVisible(false);

    /**
     * @description Deletes a course from a given semester (different from one contained in App).
     * @param {Course} course The course to be deleted.
     * @param {Semester} semester The semester that the course is contained in.
     */
    function deleteCourse({course, semester}: {
        course: Course;
        semester: Semester;
    }): void {
        delete semester.courseRecord[course.department + course.courseID];
        setCourseRecord({...semester.courseRecord});
    }

    /**
     * @description Validation for the course search form.
     * 
     * @returns {boolean} If the user has submitted a valid course department + course ID format 
     * (ex. XXXX123 or XXX123).
     */
    function validateForm(): boolean { // Makes sure that no text field related to course search is empty
        return department.length > 0 && courseID > 0;
    }

    /**
     * @description Valdation for the table.
     * 
     * @returns {boolean} If the Semester contains courses and isn't already in the user's plan.
     */
    function validateTable() {
        return Object.values(courseRecord).length > 0 && checkSemester(semesterInfo) === -1;
    }

    /**
     * @description Valdation for the course.
     * 
     * @returns {boolean} If the course has non-deafult values for all of its fields.
     */
    function validateCourse() {
        return preRequirements && department != "" && courseID != 0 && title != "" && description != "" && credits != 0 && year >= determineYear();
    }
    
    /**
     * @description Valdation for the prerequirements (for a course).
     * @param {Course} course A course.
     */
    function validatePreRequirements(course: Course): void {
        //Iterate through each course   
        let valid_course = true;
        //If there are no prerequisites, the course is valid, you can probably just break here.
        if (course.preReqs[0][0] == ""){
            setShowPreWarning(false);
            setPreRequirements(true);
            return;
        }

        //We look in each prerequisite structure, which holds the keys we are looking for
        for (let j = 0; j < course.preReqs.length; j++){
            //Iterate through each key the list of prerequisites, formatted {[CISC108, CISC106], [MATH241]...}
            for (let h = 0; h < course.preReqs[j].length; h++){
                //If the course isnt valid AND it hasnt been set true previously, then the course isnt valid.
                //console.log(course.preReqs[j][h]);
                if (!checkCourse(course.preReqs[j][h])){
                    valid_course = false;
                }else{
                    valid_course = true;
                    break;
                }
            }
        }    
        if (valid_course){
            setShowPreWarning(false);
            setPreRequirements(true);
        } else {
            setShowPreWarning(true);
            setPreRequirements(false);
        }
    }
   
    /**
     * @description Handles when a user clicks the search button. Searches for the course key the user submitted. If it 
     * is in the catalog, sets the course hooks to the catalog's values, then shows the Coursecard (with the information
     * ) and CardPool. If it is not, does nothing.
     * @param {preventDefault: () => void } event An event tat is fired when the search-course-form is submitted.
     */
    function handleSearch(event: {preventDefault: () => void; }){
        event.preventDefault();

        const key = department + courseID;

        let course: Course = {
            department: "",
            courseID: 0,
            title: "",
            description: "",
            credits: 0,
            preReqs: [[""]],
            fufills: ""
        };
        
        if(catalog[key]){
            course = getCourse(department, courseID);
            setCourseInfo(course);
            setShowCard(true);
        }else{
            setShowCard(false);
        }

        setShowPreWarning(false);
        validatePreRequirements(course);
        setTitle(course.title);
        setDescription(course.description);
        setCredits(course.credits);
        setPreReqs(course.preReqs);
        setFufills(course.fufills);
        
    }

    /**
     * @description Adds a course to the CourseRecord.
     * @param {Course} newCourse The course to be added.
     */
    function addCourse(newCourse: Course){ 
        const courseKey: string = newCourse.department + newCourse.courseID;

        setCourseRecord({...courseRecord, [courseKey]: newCourse});
        setCreditTotal(determineCreditTotal({...courseRecord, [courseKey]: newCourse}));
        setExpectedTuition(expectedTuition);
    }

    /**
     * @description Obtains a course's information from the catalog.
     * @param {string} department The course's department (ex. XXX or XXXX).
     * @param {number} id The course's code (ex. 123)
     */
    function getCourse(department: string, id: number): Course{
        const name = department + id;
        
        return catalog[name];
    }

    /**
     * @description Clears the CourseRecord, effectively deleting all courses from the semester.
     */
    function clearCourseRecord(){
        setCourseRecord({});
    }

    /**
     * @description Adds the Semester to the plan, clears all of the information from the hooks, and hides both the
     * CourseCard and the AddSemsterModal.
     */
    function saveSemester(){
        addSemester(semesterInfo);
        clearData();
        setShowCard(false);
        hide();
    }

    /**
     * @description Summates the total credits from all of the courses in a Semester.
     * @param {Record<string, Course>} record All of the courses in a given semester.
     * 
     * @returns {number} The semester's credit total.
     */
    function determineCreditTotal(record: Record<string, Course>):number {
        let total = 0;
        const courses = Object.values(record);
        for(let i = 0; i<courses.length; i++){
            total += courses[i].credits;
        }
        return total;
    }

    /**
     * @description Calculates the current year.
     * 
     * @returns {number} The current year.
     */
    function determineYear(): number{
        const today = new Date();
        return today.getFullYear();
    }

    /**
     * @description Sets the Season to its corresponding number value in chronological order. 
     * (ex. Winter = 0, Spring = 1, etc).
     * @param {string} word The season.
     */
    function determineSeason(word: string){
        switch(word){
        case "Winter":
            setSeason(0);
            break;
        case "Spring":
            setSeason(1);
            break;
        case "Summer":
            setSeason(2);
            break;
        case "Fall":
            setSeason(3);
            break;
        }
    }

    /**
     * @description Formats the Prereqs or Coreqs for conventional English use with "or".
     * @param {string[][]} s The season.
     * 
     * @returns The formatted phrase for pre/coreqs
     */
    function displayReqs(s: string[][]): string {
        let i;
        if(showCard){
            let phrase = s[0][0];
            for(i = 1; i<s[0].length; i++){
                phrase = phrase + " or " + s[0][i];
            }
            return phrase;
        }
        return "";
    }

    /**
     * @description Resets all of the hooks so that they are blank the next time the modal is made visible.
     */
    function clearData(){
        // Semester Data
        setSeason(0);
        setYear(0);
        setCourseRecord({});
        setCreditTotal(0);
        setExpectedTuition(0);
        
        //Course Data
        setDepartment("");
        setCourseID(0);
        setDescription("");
        setCredits(0);
        setPreReqs([[""]]);

        setShowPreWarning(false);
        setShowCard(false);
    }

    return (
        <Modal
            show={visible}
            onHide={hide}
            backdrop="static"
            keyboard={false}
            data-testid="add-semester-modal"
            size="xl"
        >
            <ModalHeader closeButton onClick={clearData}></ModalHeader>
            <ModalBody>
                <Row>
                    <Form className="d-flex" id="search-course-form" onSubmit={handleSearch}>
                        <Form.Group>
                            <Form.Label>
                                Department
                            </Form.Label>
                            <Form.Control data-testid="department-name-input" id="department-name" as="textarea" rows={1} 
                                minLength={3}
                                maxLength={4}
                                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setDepartment(ev.target.value.toUpperCase())}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Course ID
                            </Form.Label>
                            <Form.Control data-testid="course-id-input" id="course-id" as="input" type="number"
                                min={100}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setCourseID(ev.target.valueAsNumber)}/>
                        </Form.Group>
                        <Button className="button" type="submit" data-testid="search-course-button" id="search-course-button" disabled={!validateForm()}>
                            Search
                        </Button>
                        <Button className="button" type="submit" data-testid="add-course-button" id="add-course-button" onClick={()=>addCourse(courseInfo)} disabled={!validateCourse()}>
                            Add
                        </Button>
                    </Form>
                </Row>
                <br/>
                <Row>
                    <Col data-testid = "season-radio-buttons">
                        <FormCheck data-testid="winter-radio" inline type="radio" value="Winter" name="season" label="Winter" checked={season === 0} onChange={(e) => determineSeason(e.target.value)}/>
                        <FormCheck data-testid="spring-radio" inline type="radio" value="Spring" name="season" label="Spring" checked={season === 1} onChange={(e) => determineSeason(e.target.value)}/>
                        <FormCheck data-testid="summer-radio" inline type="radio" value="Summer" name="season" label="Summer" checked={season === 2} onChange={(e) => determineSeason(e.target.value)}/>
                        <FormCheck data-testid="fall-radio" inline type="radio" value="Fall" name="season" label="Fall" checked={season === 3} onChange={(e) => determineSeason(e.target.value)}/>
                    </Col>
                    <Col>
                        <FormControl data-testid="year-input" id="year-input" as="input" type="number" placeholder="Year"
                            min={determineYear()}
                            max={(determineYear() + 6)}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setYear(ev.target.valueAsNumber)}
                        />
                    </Col>
                </Row>
                {showPreWarning && 
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div style = {{ paddingLeft: 10 }}>
                            You cannot add this course to your semester as it&apos;s prerequisite(s) has not been fufilled in a previous semester ({displayReqs(preReqs)})
                        </div>
                    </div>}
                <Row>
                    <Col>
                        {showCard && <CourseCardDisplay courseInfo = {courseInfo} setCourseInfo = {setCourseInfo} showCard={showCard} validatePreRequirements={validatePreRequirements}></CourseCardDisplay>}
                    </Col>
                    <Col>
                        <CardPool showCard={showCard}></CardPool>
                    </Col>
                </Row>
                <Row>
                    <SemesterTable data-testid="semester-table" semester={{season, year, courseRecord, creditTotal, expectedTuition}} deleteCourse={deleteCourse} addCourse={addCourse} checkCourse={checkCourse} year={year}></SemesterTable>
                </Row>
                <Row data-testid="Bottom Row">
                    <Col>
                        <Button className="button" data-testid="clear-course-list-button" id="clear-course-list-button" variant="danger" onClick={clearCourseRecord}>Clear Semester</Button>
                    </Col>
                    <Col></Col>
                    <Col>
                        <Button className="button" data-testid="save-semester-button" id="save-semester-button" onClick={saveSemester} disabled={!validateTable()}>Save Semester</Button>
                    </Col>
                </Row>
                <Row></Row>
            </ModalBody>
        </Modal>
    );
}