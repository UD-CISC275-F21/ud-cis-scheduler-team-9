import React from "react";
import { Button, Table } from "react-bootstrap";
import { Course } from "../interface/course";
import { Semester } from "../interface/semester";

export function SemesterTable({semester}: {semester: (Semester)}): JSX.Element {



    function renderList(course: Course, index: number){
        return (
            <tr key={index}>
                <td id="course-name">{course.department+course.courseID}</td>
                <td id="course-title">{course.title}</td>
                <td id="course-description">{course.description}</td>
                <td id="course-credits">{course.credits}</td>
                <td id="course-edit-button">{
                    <Button variant="primary">
                        Edit Course
                    </Button>
                }</td>
            </tr>
        );
    }

    return (
        <Table id="semester-table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Credits</th>
                    <th scope="col">Edit:</th>
                </tr>
            </thead>
            <tbody>
                {Object.values(semester.courseRecord).map(renderList)}
            </tbody>
        </Table>
    );
}