import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form } from "react-bootstrap";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import Button from "@restart/ui/esm/Button";

export function AddSemesterModal({ addSemester, setVisible, visible}:{
    addSemester: (s: Semester)=>void,
    setVisible: (v:boolean)=>void,
    visible: (boolean)}): JSX.Element {

    const [season, setSeason] = useState<Season>(0);
    const [courseList, setCourseList] = useState<Course[]>([]);
    const [creditTotal, setCreditTotal] = useState<number>(0);
    const [tuition, setTuition] = useState<number>(0);


    const hide = ()=>setVisible(false);

    /* implement with drag function
    function addCourse(course: Course){
        setCourseList([...courseList, course]); 
    }*/

    function handleSearch(event: {preventDefault: () => void; }){
        event.preventDefault();
        //these set calls below are just place holders for the code to build
        setSeason(0);
        setCreditTotal(0);
        setTuition(0);
        setCourseList([]);
    }

    function save(){
        const semester = season;
        const totalCredits = creditTotal;
        const expectedTuition = tuition;
        addSemester({semester, courseList, totalCredits, expectedTuition});
        hide;
    }


    return (
        <Modal
            show={visible}
            onHide={hide}
            backdrop="static"
            keyboard={false}
            datatestid="add-semester-modal"
        >
            <ModalHeader closeButton onClick={hide}>AddSemester</ModalHeader>
            <ModalBody>
                <Row>
                    <Form onSubmit={handleSearch}>
                        <Form.Group>
                            <Form.Label>
                                Course ID
                            </Form.Label>
                        </Form.Group>
                        <Form.Control as="textarea" rows={1}
                        autoCapitalize = "on"
                        >                         
                        </Form.Control>
                        <Button className="button" type="submit" id="search-button">
                            Search
                        </Button>
                    </Form>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Button onClick={save}></Button>
                </Row>
                <Row></Row>
            </ModalBody>
        </Modal>
    );
}