import React from "react";
import { Col, Table, Card, Container, Row, Button } from "react-bootstrap";
import { Season, Semester } from "../interface/semester";
import { SemesterTable } from "./SemesterTable";

export function SemesterCard({ semester, deleteSemester }: {
    semester: Semester;
    deleteSemester: (deleteIndex: number) => void;
}): JSX.Element {


    function getSeason(season: Season): string{
        switch(season) {
        case 0:
            return "Fall";
        case 1:
            return "Winter";
        case 2:
            return "Spring";
        case 3:
            return "Summer";
        default:
            return "Inproper Semester";
        }
    }

    return (
        <Card bg="Light" className="text-center">
            <Card.Header>
                <Container>
                    <Row>
                        <div className="flex-container">
                            {/* <div className="left-semester-container"></div> */}
                            <div className="middle-semester-container">
                                <Col>
                                    <h1>{"Semester: " + getSeason(semester.season) + " " + semester.year}</h1>
                                </Col>
                            </div>
                            <div className="right-semester-container">
                                <Button variant="danger" onClick={() => deleteSemester(0)}>
                                    Delete Semester
                                </Button>
                            </div>
                        </div>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                <Card.Title>Courses:</Card.Title>
                <Row>
                    <Table>
                        <SemesterTable semester={semester}></SemesterTable>
                    </Table>
                </Row>
                <p>PLACEHOLDER FOR SEMESTER STATS (TOT CREDITS, ESTIMATED COST, ETC)</p>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary">Add Semester: {getSeason(semester.season + 1)}</Button>
            </Card.Footer>
        </Card>   
    );
}