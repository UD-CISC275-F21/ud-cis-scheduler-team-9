import React, { useState } from "react";
import { Modal, Col, Row, ModalBody } from "react-bootstrap";
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

    function save(){
        var semester = season
        var totalCredits = creditTotal;
        var expectedTuition = tuition;
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
                <Row></Row>
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