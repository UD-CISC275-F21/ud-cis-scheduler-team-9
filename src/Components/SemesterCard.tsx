import React from "react";
import { Col, Card, Container, Row, Button } from "react-bootstrap";
import { Course } from "../interface/course";
import { Season, Semester } from "../interface/semester";
import { SemesterTable } from "./SemesterTable";
/**
 * @description Creates a Card containing all of the Semester information (SemesterTable), macro data such as cost of
 * attendance and total credits, a deleteSemester button, etc.
 * @param {Semester} semester A semester.
 * @param {(semester: Semester) => void} deleteSemester Deletes a single semester from the plan.
 * @param {({course, semester}: {course: Course, semester:Semester}) => void} editCourseLauncher Launches the editCourse
 * Modal.
 * @param {({course, semester}: {course: Course, semester:Semester}) => void} deleteCourse Deletes a course.
 *
 * @returns {JSX.Element} A JSX.Element containing a custom Navbar
 */
export function SemesterCard({ semester, deleteSemester, editCourseLauncher, deleteCourse }: {
    semester: Semester;
    deleteSemester: (semester: Semester) => void;
    editCourseLauncher: ({course, semester}: {course: Course, semester:Semester}) => void;
    deleteCourse: ({course, semester}: {course: Course, semester:Semester}) => void;
}): JSX.Element {
    /**
     * Gets the string value of a given Season enum.
     * @param season A season enum.
     *
     * @returns {string} The passed in season's string value.
     */
    function getSeason(season: Season): string{
        switch(season) {
        case 3:
            return "Fall";
        case 0:
            return "Winter";
        case 1:
            return "Spring";
        case 2:
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
                                <Button variant="danger" size="sm" onClick={() => deleteSemester(semester)}>
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
                    <SemesterTable
                        semester={semester}
                        editCourseLauncher={editCourseLauncher}
                        deleteCourse={deleteCourse}
                    ></SemesterTable>
                </Row>
                <p>PLACEHOLDER FOR SEMESTER STATS (TOT CREDITS, ESTIMATED COST, ETC)</p>
            </Card.Body>
            <Card.Footer>
                {(semester.season % 2) && <Button variant="primary">Add Semester: {getSeason((semester.season + 1) % 4)}</Button>}
            </Card.Footer>
        </Card>   
    );
}