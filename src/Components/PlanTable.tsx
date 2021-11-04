import React from "react";
import { Col, Row } from "react-bootstrap";
import { Course } from "../interface/course";
import { Semester } from "../interface/semester";
import { SemesterCard } from "./SemesterCard";


export function PlanTable({ semesters, deleteSemester }: {
    semesters: Semester[];
    deleteSemester: (deleteIndex: number) => void;
}): JSX.Element {

    /*function sortPlan(){
        let i;
        const today = new Date();
        const newArr = [];
        for(i = 0; i<semesters.length; i++){
            if(semesters[i].year === today.getFullYear()){
                if(semesters[i].season === 0)
                    newArr.push(semesters[i]);
                if(semesters[i].season === 1)
                    newArr.push(semesters[i]);
                if(semesters[i].season === 2)
                    newArr.push(semesters[i]);
                if(semesters[i].season === 3)
                    newArr.push(semesters[i]);
            }
        }
    }*/

    function renderList(the_semester: Semester): JSX.Element {
        return (
            <SemesterCard key={the_semester.season.toString() + the_semester.year.toString()} semester={the_semester} deleteSemester = {deleteSemester}></SemesterCard>
        );
    }

    function listDisplay(truncatedSemesterCardArray: JSX.Element[]): JSX.Element {

        if (truncatedSemesterCardArray.length % 0) {
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

    const semesterCopy: JSX.Element[] = semesters.map(renderList);
    const semesterPairs = [];

    for(let i = 0; i < semesterCopy.length; i += 2) {
        semesterPairs.push(semesterCopy.slice(i, i + 2));
    }

    for(let i = 0; i < semesterPairs.length; i++) {
        listDisplay(semesterCopy);
    }

    return (
        <div className="plan-table" id="plan-table">
            {
                
            }
        </div>
    );
}