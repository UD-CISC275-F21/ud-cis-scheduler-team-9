import React from "react";
import { Semester } from "../interface/semester";
import { SemesterCard } from "./SemesterCard";


export function PlanTable({ semesters, deleteSemester }: {
    semesters: Semester[];
    deleteSemester: (deleteIndex: number) => void;
}): JSX.Element {

    const sortedSemesters = semesters.sort(compareSeason).sort(compareYear);

    function compareYear(a: Semester, b: Semester){
        return a.year - b.year;
    }

    function compareSeason(a: Semester, b: Semester){
        return a.season - b.season;
    }

    function renderList(the_semester: Semester) {
        return (
            <SemesterCard semester={the_semester} deleteSemester = {deleteSemester}></SemesterCard>
        );
    }

    return (
        <div className="plan-table" id="plan-table">
            {sortedSemesters.map(renderList)}
        </div>
    );
}