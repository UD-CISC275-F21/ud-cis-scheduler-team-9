import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form, Button, FormCheck, FormControl} from "react-bootstrap";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/ModalHeader";
import { SemesterTable } from "./SemesterTable";

export function AddSemesterModal({ addSemester, checkCourse, setVisible, visible, catalog}:{
    addSemester: (s: Semester)=>void,
    checkCourse: (c: string)=>boolean,
    setVisible: (v:boolean)=>void,
    visible: (boolean)
    catalog: (Record<string, Course>)}): JSX.Element {

    const [season, setSeason] = useState<Season>(0);
    const [year, setYear] = useState<number>(determineYear());
    const [courseRecord, setCourseRecord] = useState<Record<string, Course>>({});
    const [creditTotal, setCreditTotal] = useState<number>(0);
    const [expectedTuition, setExpectedTuition] = useState<number>(0);

    const [department, setDepartment] = useState<string>("");
    const [courseID, setCourseID] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<number>(0);
    const [preReqs, setPreReqs] = useState<string[][]>([[]]);
    const [coReqs, setCoReqs] = useState<string[][]>([[]]);
    const [semestersOffered, setSemestersOffered] = useState<Season[]>([]);


    const hide = ()=>setVisible(false);

    function validateForm(): boolean { // Makes sure that no text field is empty before submit
        return department.length > 0 && courseID >= 100 && year >= determineYear();
    }

    function validateTable() {
        return Object.values(courseRecord).length;
    }

    function validateCourse() {
        return department != "" && courseID != 0 && title != "" && description != "" && credits != 0 && preReqs != [[]] && coReqs != [[]] && semestersOffered != [] && validatePreRequirements();
    }

    function validatePreRequirements(){
        //might need this later
        let courses_violated: Course[] = [];

        let prereqs_fufilled = true; 
        //Iterate through each course in the courseList
        //We might need a variable to keep track of the records length, .length does not work
        for (let i = 0; i < Object.keys(courseRecord).length; i++){
            let valid_course = false;

            //If there are no prerequisites, the course is valid
            if (courseRecord[i].preReqs.length == 0){
                valid_course = true;
            }

            //Then, we look in each prerequisite structure, which holds the keys we are looking for
            for (let j = 0; j < courseRecord[i].preReqs.length; j++){
                
                //Iterate through each key the list of prerequisites, formatted {[CISC108, CISC106], [MATH241]...}
                for (let h = 0; h < courseRecord[i].preReqs[j].length; h++){
                    //If the course isnt valid AND it hasnt been set true previously, then the course isnt valid.
                    if (!checkCourse(courseRecord[i].preReqs[j][h]) && valid_course == false){
                        valid_course = false;
                        console.log(courseRecord[i].title);
                        courses_violated = [...courses_violated, courseRecord[i]];
                    }else{
                        valid_course = true;
                    }
                }
            }
            //If the course(s) wasn't found above, then the prerequirements are violated
            if (!valid_course){
                prereqs_fufilled = false;
            }
        }
        if (prereqs_fufilled){
            return true;
        } else {
            //added an alert for testing purposes, will edit the modal later
            alert("Invalid course!");
            return false;
        }
    }

    function handleSearch(event: {preventDefault: () => void; }){
        event.preventDefault();
        // For now this adds the courses to the table via the last call, 
        // in the future it will just search for a class to display before they decide to drag it into the table or not
        // 
        //These set calls below are just place holders so the code will build

        const key = department + courseID;
        let course: Course = {
            department: "",
            courseID: 0,
            title: "",
            description: "",
            credits: 0,
            preReqs: [],
            coReqs: [],
            semestersOffered: []
        };
        
        if(checkCourse(key)){
            course = getCourse(department, courseID);
        }
        

        setCreditTotal(creditTotal);
        setExpectedTuition(0);

        setTitle(course.title);
        setDescription(course.description);
        setCredits(course.credits);
        setPreReqs(course.preReqs);
        setCoReqs(course.coReqs);
        setSemestersOffered(course.semestersOffered);
    }


    function addCourse(newCourse: Course){ 
        const courseKey: string = department + courseID;
        setCourseRecord({...courseRecord, [courseKey]: newCourse});
    }

    function getCourse(department: string, id: number): Course{
        const name = department + id;
        
        return catalog[name];
    }

    function clearCourseRecord(){
        setCourseRecord({});
    }

    function saveSemester(){
        addSemester({season, year, courseRecord, creditTotal, expectedTuition});
        clearData();
        hide();
    }

    /*function determineCreditTotal({list}: {list: Course[]}) {
        var i = 0;
        var total = 0;
        while(i != list.length){
            total += list[i].credits;
            i++
        }
    }*/

    /*function addCourse(course: Course){
        setCourseList([...courseList, course]);
        determineCreditTotal(courseList);
    }*/

    function determineYear(){
        const today = new Date();
        return today.getFullYear();
    }

    function determineSeason(word: string){
        if(word === "Fall"){
            setSeason(0);
        } else if(word === "Winter"){
            setSeason(1);
        } else if(word === "Spring"){
            setSeason(2);
        } else if(word === "Summer"){
            setSeason(3);
        }
    }

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
        setPreReqs([]);
        setCoReqs([]);
        setSemestersOffered([]);
    }

    return (
        <Modal
            show={visible}
            onHide={hide}
            backdrop="static"
            keyboard={false}
            data-testid="add-semester-modal"
            size="lg"
        >
            <ModalHeader closeButton onClick={clearData}></ModalHeader>
            <ModalBody>
                <Row>
                    <Form className="d-flex" id="search-course-formm" onSubmit={handleSearch}>
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
                            <Form.Control data-testid="CourseID-input" id="course-id" as="input" type="number"
                                min={100}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setCourseID(ev.target.valueAsNumber)}/>
                        </Form.Group>
                        <Button className="button" type="submit" data-testid="search-course-button" id="search-course-button" disabled={!validateForm()}>
                            Search
                        </Button>
                    </Form>
                    <Button className="button" type="submit" data-testid="add-course-button" id="add-course-button" onClick={()=>addCourse} disabled={!validateCourse()}>
                        Add
                    </Button>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <FormCheck inline type="radio" value="Fall" name="season" label="Fall" checked={season === 0} onChange={(e) => determineSeason(e.target.value)}/>
                        <FormCheck inline type="radio" value="Winter" name="season" label="Winter" checked={season === 1} onChange={(e) => determineSeason(e.target.value)}/>
                        <FormCheck inline type="radio" value="Spring" name="season" label="Spring" checked={season === 2} onChange={(e) => determineSeason(e.target.value)}/>
                        <FormCheck inline type="radio" value="Summer" name="season" label="Summer" checked={season === 3} onChange={(e) => determineSeason(e.target.value)}/>
                    </Col>
                    <Col>
                        <FormControl data-testid="year-input" id="year-input" as="input" type="number"
                            min={determineYear()}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setYear(ev.target.valueAsNumber)}
                        />
                    </Col>
                </Row>
                <Row>
                    <SemesterTable semester={{season, year, courseRecord, creditTotal, expectedTuition}}></SemesterTable>
                </Row>
                <Row data-testid="Bottom Row">
                    <Col>
                        <Button className="button" id="clear-course-list-button" variant="danger" onClick={clearCourseRecord}>Clear Semester</Button>
                    </Col>
                    <Col></Col>
                    <Col>
                        <Button className="button" id="save-semester-button" onClick={saveSemester} disabled={!validateTable()}>Save Semester</Button>
                    </Col>
                </Row>
                <Row></Row>
            </ModalBody>
        </Modal>
    );
}