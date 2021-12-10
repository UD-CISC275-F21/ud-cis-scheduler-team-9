import React, { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import UDLogo from "../Assets/University_of_Delaware_wordmark.svg";
import { CSVImport } from "../Assets/CSV-Functions";
import { CSVExport } from "../Assets/CSV-Functions";
import { Semester } from "../interface/semester";
/**
 * @description Creates a Navbar that contains the University of Delaware logo, a deleteAllSemesters button, a DropDown
 *  with upload and download csv. buttons, etc. 
 * @param {() => void} deleteAllSemesters Deletes all semesters from the plan.
 *
 * @returns {JSX.Element} A JSX.Element containing a custom Navbar
 */
export function SchedulerNavbar({deleteAllSemesters, setDegreePlan, setDegreeRequirements, plan, degree_plan_list}: {
    deleteAllSemesters: () => void
    setDegreeRequirements: (p: string[])=>void,
    setDegreePlan: (p: string)=>void,
    plan: Semester[],
    degree_plan_list: Record<string, string[]>}): JSX.Element {

    /**
     * @description Formats the Courses in a Semester within a Table, adds Edit and Delete buttons if called in PlanTable.
     * @param {string} plan The degree plan, which is needed to update the degree requirements if degree type is 
     * changed.
     *
     * @returns {JSX.Element} A JSX.Element containing the custom Navbar, which includes the logo, the ability to change
     * degree plan types, a link to the UD Academic Catalog, etc.
     */    
    function updateDegree(plan: string){
        setDegreePlan(plan);
        setDegreeRequirements(degree_plan_list[plan]);
    }
    /**
     * @description Renders a NavDropdown with the list of degree types.
     * @param {string} plan The degree plan, which is needed to update the degree requirements if degree type is 
     * changed.
     *
     * @returns {JSX.Element} A JSX.Element <NavDropdown.Item> containing one single degree type.
     */   
    function createDegreeDropDown(plan: string){
        return (
            <NavDropdown.Item datatest-id={plan} key={plan} eventKey="changedegreeplan" onClick = {()=>updateDegree(plan)}>{plan}</NavDropdown.Item>
        );
    } 
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
                            data-testid="delete-all-semesters-nav"
                            onClick = {() => deleteAllSemesters()}
                        >Delete All Semesters</Nav.Link>
                    </Nav.Item>
                    <NavDropdown key="title" title="Set Degree Plan" data-testid="degree-plans-nav">
                        {Object.keys(degree_plan_list).map(createDegreeDropDown)} 
                    </NavDropdown>
                    <NavDropdown key="nav" title="scheduleDropdown" id="sch-dropdown" data-testid ="sche">
                        <NavDropdown.Item 
                            eventKey="downloadcsv"
                            onClick = {() => CSVExport(plan)}
                        >Download as .csv</NavDropdown.Item>
                        <NavDropdown.Item 
                            eventKey="uploadcsv"
                            onClick = {() => CSVImport()}
                        >Upload .csv</NavDropdown.Item>
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