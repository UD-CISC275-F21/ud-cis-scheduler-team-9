import React, { useState } from "react";
import "./App.css";
import {
    Button,
    Container,
    Row,
    Card,
    Table,
    CloseButton,
    Col,
} from "react-bootstrap";
import { ControlPanel } from "./Components/ControlPanel";
import { AddSemesterModal } from "./Components/AddSemesterModal";
import { Semester } from "./interface/semester";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    function addSemester(semester: Semester) {
        setPlan([...plan, semester]);
    }

    function deleteAllSemesters() {
        setPlan([]);
        console.log("Deleted All Semesters");
    }

    return (
        <Container className="App">
            <Row>
                <br></br>
            </Row>
            <Row>
                <ControlPanel showModal={setVisible}></ControlPanel>
            </Row>
            <Row>
                <AddSemesterModal
                    addSemester={addSemester}
                    setVisible={setVisible}
                    visible={visible}
                ></AddSemesterModal>
                <Button
                    className="button"
                    id="delete-all-button"
                    onClick={() => deleteAllSemesters()}
                >
                    {" "}
                    Delete All Semesters
                </Button>
            </Row>
            <Row>
                <Card bg="Light" className="text-center">
                    <Card.Header>
                        <Container fluid>
                            <Row>
                                <div className="flex-container">
                                    <div className="left-semester-container"></div>
                                    <div className="middle-semester-container">
                                        Semester
                                    </div>
                                    <div className="right-semester-container">
                                        X
                                    </div>
                                </div>
                                <Col></Col>
                                <Col>
                                    <h1>[test]</h1>
                                </Col>
                                <Col>
                                    <Button variant="danger">
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
                        </Table>
                        <p>hello</p>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            </Row>
        </Container>
    );
}

export default App;
