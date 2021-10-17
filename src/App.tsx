import React, { useState } from "react";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import { ControlPanel } from "./Components/ControlPanel";

function App(): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);

    return (
        <Container className="App">
            <Row>

            </Row>
            <Row>
                <ControlPanel showModal={setVisible}></ControlPanel>
            </Row>
            <Row>
            </Row>
        </Container>
    );
}

export default App;
