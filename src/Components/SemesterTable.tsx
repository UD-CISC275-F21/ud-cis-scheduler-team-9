import React from "react";
import { Button, Table } from "react-bootstrap";
import { Course } from "../interface/course";
import { Semester } from "../interface/semester";
/**
 * Formats the Courses in a Semester within a Table, adds Edit and Delete buttons
 * if called in PlanTable.
 * @param semester A semester.
 * @param editCourseLauncher Launches the editCourse Modal.
 * @param deleteCourse Deletes a course.
 *
 * @returns {JSX.Element} A JSX.Element containing a table poplated with the
 * courses in a Semester.
 */
export function SemesterTable({semester, editCourseLauncher, deleteCourse}: { 
    semester: (Semester);
    editCourseLauncher?: ({course, semester}: {course: Course, semester:Semester}) => void;
    deleteCourse?: ({course, semester}: {course: Course, semester:Semester}) => void;
    }): JSX.Element {

    /**
     * Renders a single row in the table with a course's information.
     * @param course A Course.
     * @param index The index of the Course in the Semester.
     *
     * @returns {JSX.Element} A JSX.Element containing a <tr> with the course's
     * name, title, description, credits, as well as an edit and delete button
     * for the course if editCourseLauncher and deleteCourse are passed in.
     */
    function renderList(course: Course, index: number){
        return (
            <tr key={index}>
                <td id="course-name">{course.department+course.courseID}</td>
                <td id="course-title">{course.title}</td>
                <td id="course-description">{course.description.substring(0, 50) + "..."}</td>
                <td id="course-credits">{course.credits}</td>
                {editCourseLauncher && 
                <td id="course-edit-button">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => editCourseLauncher({course, semester})}
                    >Edit Course</Button>  
                </td>}
                {deleteCourse &&
                <td>
                    <Button
                        variant="danger"
                        className="btn-block"
                        size="sm"
                        onClick={() => deleteCourse({course, semester})}
                    >Delete Course</Button>
                </td>}
            </tr>
        );
    }

    return (
        <Table data-testid = "semester-table" id="semester-table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Credits</th>
                    {editCourseLauncher && <th scope="col">Edit:</th>}
                    {editCourseLauncher && <th scope="col">Delete:</th>} 
                </tr>
            </thead>
            <tbody>
                {Object.values(semester.courseRecord).map(renderList)}
            </tbody>
        </Table>
    );
}