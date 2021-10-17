import Button from "@restart/ui/esm/Button";
import React from "react";
import { Col, Row } from "react-bootstrap";

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
                    <Button className="button" id="add-semester-button" onClick={()=>showModal(true)}>Add Semester</Button>
                </Col>
            </Row>
        </Col>
    );
}