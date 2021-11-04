import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Semester } from "../interface/semester";
import { SemesterCard } from "./SemesterCard";


export function PlanTable({ semesters, deleteSemester, showModal, setEditSemesterVisible}: {
    semesters: Semester[];
    deleteSemester: (semester: Semester) => void;
    showModal: (b:boolean) => void;
    setEditSemesterVisible: (b:boolean) => void;
}): JSX.Element {

    const sortedSemesters = semesters.sort(compareSeason).sort(compareYear);

    function compareYear(a: Semester, b: Semester){
        return a.year - b.year;
    }

    function compareSeason(a: Semester, b: Semester){
        return a.season - b.season;
    }

    function renderList(the_semester: Semester): JSX.Element {
        return (
            <SemesterCard 
                key={the_semester.season.toString() + the_semester.year.toString()}
                semester={the_semester} deleteSemester = {deleteSemester}
                setEditSemesterVisible={() => setEditSemesterVisible}></SemesterCard>
        );
    }

    function listDisplay(truncatedSemesterCardArray: JSX.Element[]): JSX.Element {

        if (!(truncatedSemesterCardArray.length % 2)) {
            return (
                <Row>
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
                <Row>
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