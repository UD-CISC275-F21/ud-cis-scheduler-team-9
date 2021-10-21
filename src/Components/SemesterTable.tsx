import React from "react";
import { Col, Container, Row, Card, Table, Button } from "react-bootstrap";
import { Course } from "../interface/course";
import { Semester } from "../interface/semester";
import deleteSemester from "../App";

export function SemesterTable({
    semester,
}: {
    semester: Semester;
}): JSX.Element {
    function getSeason() {
        switch (semester.season) {
        case 0:
            return "Fall";
        case 1:
            return "Winter";
        case 2:
            return "Spring";
        case 3:
            return "Summer";
        }
    }

    function renderList(course: Course, index: number) {
        return (
            <tr key={index}>
                <td id="course-name">{course.department + course.courseID}</td>
                <td id="semester-season">{getSeason()}</td>
                <td id="semester-year">{semester.year}</td>
            </tr>
        );
    }

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
                            <Button variant="danger" onClick={deleteSemester}>
                                Delete Semester
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Table>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Course</th>
                            <th scope="col">Season</th>
                            <th scope="col">Year</th>
                        </tr>
                    </thead>
                    <tbody>{semester.courseList.map(renderList)}</tbody>
                </Table>
                <p>hello</p>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    );
}
