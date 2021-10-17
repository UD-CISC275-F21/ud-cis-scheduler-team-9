import Button from "@restart/ui/esm/Button";
import React from "react";
import { Col, Row } from "react-bootstrap";

export function ControlPanel(){

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
                    <Button className="button" id="add-semester-button" onClick={()=>showModal()}>Add</Button>
                </Col>
            </Row>
        </Col>
    );
}