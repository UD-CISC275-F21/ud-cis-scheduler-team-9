import React from "react";
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

    function renderList(the_semester: Semester) {
        return (
            <SemesterCard key={the_semester.season.toString() + the_semester.year.toString()} semester={the_semester} deleteSemester = {deleteSemester}></SemesterCard>
        );
    }

    

    return (
        <div className="plan-table" id="plan-table">
            {semesters.map(renderList)}
        </div>
    );
}