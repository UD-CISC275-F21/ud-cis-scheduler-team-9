import React from "react";
import { Col, Table, Card, Container, Row, Button } from "react-bootstrap";
import { Semester } from "../interface/semester";
import { SemesterTable } from "./SemesterTable";

export function SemesterCard({ semester, deleteSemester }: {
    semester: Semester;
    deleteSemester: (deleteIndex: number) => void;
}): JSX.Element {



    return (
        <Card bg="Light" className="text-center">
            <Card.Header>
                <Container fluid>
                    <Row>
                        <div className="flex-container">
                            <div className="left-semester-container"></div>
                            <div className="middle-semester-container">
                                Semester
                            </div>
                            <div className="right-semester-container">X</div>
                        </div>
                        <Col></Col>
                        <Col>
                            <h1>[test]</h1>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={() => deleteSemester(0)}>
                                Delete Semester
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Table>
                    <SemesterTable semester={semester}></SemesterTable>
                </Table>
                <p>hello</p>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    );
}