import React from 'react';
import { Col, Table } from 'react-bootstrap';
import { Course } from '../interface/course';
import { Semester } from '../interface/semester';

export function SemesterTable({semester}: {semester: (Semester)}): JSX.Element {

    function renderList(course: Course, index: number){
        return (
            <tr key={index}>
                <td id="course-name">{course.department+course.courseID}</td>
            </tr>
    )}

    return (
        <Col>
            <Table>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Course</th>
                    </tr>
                </thead>
                <tbody>
                    {semester.courseList.map(renderList)}
                </tbody>
            </Table>
        </Col>
    )
}