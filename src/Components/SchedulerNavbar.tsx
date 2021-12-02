import React, { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import UDLogo from "../Assets/University_of_Delaware_wordmark.svg";
import { CSVImport } from "../Assets/CSVImport";
import { CSVExport } from "../Assets/CSVExport";
import { Semester } from "../interface/semester";
/**
 * Creates a Navbar that contains the University of Delaware logo, a 
 * deleteAllSemesters button, a DropDown with upload and download csv. buttons, 
 * etc.
 * @param deleteAllSemesters Deletes all semesters from the plan.
 *
 * @returns {JSX.Element} A JSX.Element containing a custom Navbar
 */
export function SchedulerNavbar({deleteAllSemesters, plan, setPlan}: {
    deleteAllSemesters: () => void, 
    plan: Semester[], 
    setPlan: (p: Semester[]) => void}): JSX.Element {
    return (
        <Navbar
            data-testid="scheduler-navbar"
            bg="light"
            variant="light"
            sticky="top"
            expand="xxl">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt="UD Logo"
                        src={UDLogo}
                        width="140px"
                        height="60px"
                        className="img-responsive"
                    />
                    {""}
                </Navbar.Brand>
                <Nav className="sch-nav" justify={true}>
                    <Nav.Item>
                        <Nav.Link 
                            id="delete-all-semesters-nav"
                            onClick = {() => deleteAllSemesters()}
                        >Delete All Semesters</Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="scheduleDropdown" id="sch-dropdown">
                        <NavDropdown.Item 
                            eventKey="downloadcsv"
                            onClick = {() => CSVExport(plan)}
                        >Download as .csv</NavDropdown.Item>
                        <NavDropdown.Item 
                            eventKey="uploadcsv"
                            onClick = {() => setPlan(CSVImport())}
                        >Upload .csv</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="loadgeneric">Load Generic Plan</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav.Link
                    className="ud-catalog-link"
                    href="https://catalog.udel.edu/"
                    target="_blank"
                >
                    <strong>UD Catalog</strong>
                </Nav.Link>
            </Container>
        </Navbar>
    );
}