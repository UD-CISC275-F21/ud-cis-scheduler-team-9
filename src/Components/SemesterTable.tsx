import React from "react";
import { Table } from "react-bootstrap";
import { Course } from "../interface/course";
import { Semester } from "../interface/semester";

export function SemesterTable({semester}: {semester: (Semester)}): JSX.Element {

    function getSeason(){
        switch(semester.season) {
        case 0:
            return "Fall";
        case 1:
            return "Winter";
        case 2:
            return "Spring";
        case 3:
            return "Summer";
        }
    }

    function renderList(course: Course, index: number){
        return (
            <tr key={index}>
                <td id="course-name">{course.department+course.courseID}</td>
                <td id="semester-season">{getSeason()}</td>
                <td id="semester-year">{semester.year}</td>
            </tr>
        );
    }

    return (
        <Table id="semester-table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Season</th>
                    <th scope="col">Year</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(semester.courseRecord).map(renderList)}
            </tbody>
        </Table>
    );
}