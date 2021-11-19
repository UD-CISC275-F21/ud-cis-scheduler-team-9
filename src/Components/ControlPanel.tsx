import React from "react";
import { Col, Row, Button } from "react-bootstrap";

export function ControlPanel({deleteAllSemesters}: {deleteAllSemesters: () => void}): JSX.Element{

    return (
        <Col data-testid="control-panel">
            <Row>
                <Col>

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