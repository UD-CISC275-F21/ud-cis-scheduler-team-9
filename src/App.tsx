import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Col, Container, Row } from "react-bootstrap";
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
