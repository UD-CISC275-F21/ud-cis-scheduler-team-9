import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form, Button} from "react-bootstrap";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/ModalHeader";
import { SemesterTable } from "./SemesterTable";

export function AddSemesterModal({ addSemester, setVisible, visible}:{
    addSemester: (s: Semester)=>void,
    setVisible: (v:boolean)=>void,
    visible: (boolean)}): JSX.Element {

    const [season, setSeason] = useState<Season>(0);
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
        //these set calls below are just place holders for the code to build
        setSeason(0);
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
        addSemester({season, courseList, creditTotal, expectedTuition});
        hide();
    }

    /*function addCourse(course: Course){
        setCourseList([...courseList, course]);
    }*/

    return (
        <Modal
            show={visible}
            onHide={hide}
            backdrop="static"
            keyboard={false}
            datatestid="add-semester-modal"
        >
            <ModalHeader closeButton onClick={hide}></ModalHeader>
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
                            <Form.Control as="input" type="number"
                                min={100}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setCourseID(ev.target.valueAsNumber)}/>
                        </Form.Group>
                        <Button className="button" type="submit" id="search-course-button" disabled={!validateForm()}>
                            Search
                        </Button>
                    </Form>
                </Row>
                <Row>
                    <SemesterTable semester={{season, courseList, creditTotal, expectedTuition}}></SemesterTable>
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