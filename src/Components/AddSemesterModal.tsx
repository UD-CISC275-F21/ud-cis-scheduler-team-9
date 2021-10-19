import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form, Button, FormCheck, FormControl} from "react-bootstrap";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/ModalHeader";
import { SemesterTable } from "./SemesterTable";

export function AddSemesterModal({ addSemester, setVisible, visible}:{
    addSemester: (s: Semester)=>void,
    setVisible: (v:boolean)=>void,
    visible: (boolean)}): JSX.Element {

    const [season, setSeason] = useState<Season>(0);
    const [year, setYear] = useState<number>(2022);
    const [courseList, setCourseList] = useState<Course[]>([]);
    const [creditTotal, setCreditTotal] = useState<number>(0);
    const [expectedTuition, setExpectedTuition] = useState<number>(0);

    const [department, setDepartment] = useState<string>("");
    const [courseID, setCourseID] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<number>(0);
    const [preReqs, setPreReqs] = useState<Course[]>([]);
    const [coReqs, setCoReqs] = useState<Course[]>([]);
    const [semestersOffered, setSemestersOffered] = useState<Season[]>([1]);


    const hide = ()=>setVisible(false);

    /* implement with drag function
    function addCourse(course: Course){
        setCourseList([...courseList, course]); 
    }*/

    function validateForm() { // Makes sure that no text field is empty before submit
        return department.length > 0 && courseID >= 100;
    }

    function handleSearch(event: {preventDefault: () => void; }){
        event.preventDefault();
        // For now this adds the courses to the table via the last call, 
        // in the future it will just search for a class to display before they decide to drag it into the table or not
        // 
        //These set calls below are just place holders so the code will build
        setCreditTotal(0);
        setExpectedTuition(0);

        setDescription("");
        setCredits(0);
        setPreReqs([]);
        setCoReqs([]);
        setSemestersOffered([1]);

        setCourseList([...courseList, {department, courseID, description, credits, preReqs, coReqs, semestersOffered}]);
    }

    function clearCourseList(){
        setCourseList([]);
    }

    function saveSemester(){
        addSemester({season, year, courseList, creditTotal, expectedTuition});
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
        setCourseList([]);
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
            datatestid="add-semester-modal"
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
                            <Form.Control id="department-name" as="textarea" rows={1} 
                                minLength={3}
                                maxLength={4}
                                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setDepartment(ev.target.value.toUpperCase())}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Course ID
                            </Form.Label>
                            <Form.Control id="course-id" as="input" type="number"
                                min={100}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setCourseID(ev.target.valueAsNumber)}/>
                        </Form.Group>
                        <Button className="button" type="submit" id="search-course-button" disabled={!validateForm()}>
                            Search
                        </Button>
                    </Form>
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
                        <FormControl id="year-input" as="input" type="number"
                            min={determineYear()}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setYear(ev.target.valueAsNumber)}
                        />
                    </Col>
                </Row>
                <Row>
                    <SemesterTable semester={{season, year, courseList, creditTotal, expectedTuition}}></SemesterTable>
                </Row>
                <Row>
                    <Col>
                        <Button className="button" id="clear-course-list-button" variant="danger" onClick={clearCourseList}>Clear Semester</Button>
                    </Col>
                    <Col></Col>
                    <Col>
                        <Button className="button" id="save-semester-button" onClick={saveSemester}>Save Semester</Button>
                    </Col>
                </Row>
                <Row></Row>
            </ModalBody>
        </Modal>
    );
}