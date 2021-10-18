import React, { useState } from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import { ControlPanel } from "./Components/ControlPanel";
import { AddSemesterModal } from "./Components/AddSemesterModal";
import { Semester } from "./interface/semester";

function App(): JSX.Element {
    const [plan, setPlan] = useState<Semester[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    function addSemester(semester:Semester){
        setPlan([...plan, semester]);
    }

    return (
        <Container className="App">
            <Row>
                
            </Row>
            <Row>
                <ControlPanel showModal={setVisible}></ControlPanel>
            </Row>
            <Row>
                <AddSemesterModal addSemester={addSemester} setVisible={setVisible} visible={visible}></AddSemesterModal>
            </Row>
        </Container>
    );
}

export default App;
