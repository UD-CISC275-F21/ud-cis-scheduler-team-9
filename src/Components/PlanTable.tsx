import React from "react";
import { Semester } from "../interface/semester";
import { SemesterCard } from "./SemesterCard";


export function PlanTable({ semesters, deleteSemester }: {
    semesters: Semester[];
    deleteSemester: (deleteIndex: number) => void;
}): JSX.Element {

    function renderList(the_semester: Semester) {
        return (
            <SemesterCard semester={the_semester} deleteSemester = {deleteSemester}></SemesterCard>
        );
    }

    return (
        <div className="plan-table">
            {semesters.map(renderList)}
        </div>
    );
}