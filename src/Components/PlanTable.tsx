import React from "react";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import { SemesterTable } from "./SemesterTable";
import { Col, Table } from "react-bootstrap";



export const PlanTable = ({semesters}: {semesters: Semester[]}): JSX.Element => {

    function renderList(the_semester: Semester){
        return (
            <SemesterTable semester = {the_semester}></SemesterTable>
        );
    }

    return (
        <div className = "plan-table">
            {semesters.map(renderList)}
        </div>
    );
};