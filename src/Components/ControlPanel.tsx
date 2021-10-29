import React from "react";
import { Col, Row, Button } from "react-bootstrap";

export function ControlPanel({showModal, deleteAllSemesters}: {showModal: (b:boolean)=>void, deleteAllSemesters: () => void}): JSX.Element{

    return (
        <Col data-testid="control-panel">
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="button" data-testid="add-semester-button" id="add-semester-button" onClick={()=>showModal(true)}>Add Semester</Button>
                </Col>
            </Row>
            <Row>
                <Col> 
                    <Button className="button" variant="danger" id="delete-all-semesters-button" onClick = {() => deleteAllSemesters()}>Delete All Semesters</Button>
                </Col>
            </Row>
        </Col>
    );
}