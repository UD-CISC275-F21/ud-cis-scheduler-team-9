import React from "react";
import { Semester } from "../interface/semester";
import { SemesterTable } from "./SemesterTable";


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