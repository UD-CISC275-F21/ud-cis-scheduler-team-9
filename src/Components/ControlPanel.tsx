import React from "react";
import { Col, Row, Button } from "react-bootstrap";

export function ControlPanel({showModal}: {showModal: (b:boolean)=>void}): JSX.Element{

    return (
        <Col>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="button" data-test-id="add-semester-button" id="add-semester-button" onClick={()=>showModal(true)}>Add Semester</Button>
                </Col>
            </Row>
        </Col>
    );
}