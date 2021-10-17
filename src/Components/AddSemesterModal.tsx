import React from "react";
import { Modal, Col, Row, ModalBody } from "react-bootstrap";
import { Semester } from "../interface/semester";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

export function AddSemester({setVisible, plan, semester, visible}:{
    setVisible: (v:boolean)=>void,
    plan: (Semester[]), 
    semester: (Course[]),
    visible: (boolean)}): JSX.Element {

    const hide = ()=>setVisible(false);


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
                <Row></Row>
            </ModalBody>
        </Modal>
    );
}