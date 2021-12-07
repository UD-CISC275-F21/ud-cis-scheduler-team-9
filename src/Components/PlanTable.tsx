import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Course } from "../interface/course";
import { Semester } from "../interface/semester";
import { SemesterCard } from "./SemesterCard";

/**
 * @description Renders the SemesterCards as a 2xn "table" in order, effectively creating a viewable plan.
 * 
 * @param {Semester[]} semesters A list of semesters.
 * @param {function} deleteSemester Deletes a single semester from the plan.
 * @param {function} showModal Shows the AddSemesterModal.
 * @param {({course, semester}: {course: Course, semester:Semester}) => void} editCourseLauncher Launches the editCourse
 *  Modal.
 * @param {({course, semester}: {course: Course, semester:Semester}) => void} deleteCourse Deletes a course.
 *
 * @returns {JSX.Element} A JSX.Element containing the rendered plan.
 */
export function PlanTable({ semesters, deleteSemester, showModal, editCourseLauncher, deleteCourse }: {
    semesters: Semester[];
    deleteSemester: (semester: Semester) => void;
    showModal: (b:boolean) => void;
    editCourseLauncher: ({course, semester}: {course: Course, semester:Semester}) => void;
    deleteCourse: ({course, semester}: {course: Course, semester:Semester}) => void;
}): JSX.Element {

    const sortedSemesters = semesters.sort(compareSeason).sort(compareYear);

    /**
     * @description Calculates the difference between two semesters' years.
     * @param {Semester} a - The first Semester.
     * @param {Semester} b - The second Semester.
     *
     * @returns {number} Number of years between Semester a and Semester b.
     */
    function compareYear(a: Semester, b: Semester):number {
        return a.year - b.year;
    }

    /**
     * @description Calculates the difference between two semesters' seasons.
     * @param {Semester} a The first Semester.
     * @param {Semester} b The second Semester.
     *
     * @returns {number} Number of seasons between Semester a and Semester b.
     */
    function compareSeason(a: Semester, b: Semester):number {
        return a.season - b.season;
    }
    
    /**
     * Creates a SemesterCard of a single Semester
     * @param {Semester} the_semester A Semester.
     *
     * @returns {JSX.Element} A SemesterCard for the_semester.
     */
    function renderList(the_semester: Semester): JSX.Element {
        return (
            <SemesterCard
                key={the_semester.season.toString() + the_semester.year.toString()}
                semester={the_semester} 
                deleteSemester={deleteSemester}
                editCourseLauncher={editCourseLauncher}
                deleteCourse={deleteCourse}
            ></SemesterCard>
        );
    }

    /**
     * Renders a SemesterCard pair, or a SemesterCard and a AddSemester button
     * on the PlanTable
     * @param {JSX.Element} truncatedSemesterCardArray array (of size 1 or 2) of SemesterCards,
     * containing semesters from the plan.
     *
     * @returns {JSX.Element} A <Row> containing the SemesterCard pair / 
     * SemesterCard + AddSemester button.
     */
    function listDisplay(truncatedSemesterCardArray: JSX.Element[]): JSX.Element {

        if (!(truncatedSemesterCardArray.length % 2)) {
            return (
                <Row key={truncatedSemesterCardArray[0].key}>
                    <Col>
                        {truncatedSemesterCardArray[0]}       
                    </Col>
                    <Col>
                        {truncatedSemesterCardArray[1]}
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row key={truncatedSemesterCardArray[0].key}>
                    <Col>
                        {truncatedSemesterCardArray[0]}       
                    </Col>
                    <Col>
                    </Col>
                </Row>
            );
        }
    }

    const semesterJSX: JSX.Element[] = sortedSemesters.map(renderList);
    semesterJSX.push(<Card><Button
        className="button"
        data-testid="add-semester-button-plan-table"
        id="add-semester-button-plan-table"
        onClick={()=>showModal(true)}>Add Semester</Button></Card>);
    const semesterPairs: JSX.Element[][] = [];

    for(let i = 0; i < semesterJSX.length; i += 2) {
        semesterPairs.push(semesterJSX.slice(i, i + 2));
    }
    

    return (
        <div className="plan-table" id="plan-table">
            {semesterPairs.map(listDisplay)}
        </div>
    );
}