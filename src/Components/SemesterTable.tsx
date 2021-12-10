import React from "react";
import { Button, Table } from "react-bootstrap";
import { useDrop } from "react-dnd";
import { Course } from "../interface/course";
import { Semester } from "../interface/semester";
/**
 * @description Formats the Courses in a Semester within a Table, adds Edit and Delete buttons if called in PlanTable.
 * @param semester A semester.
 * @param editCourseLauncher Launches the editCourse Modal.
 * @param deleteCourse Deletes a course.
 * @param addCourse Adds a course to the courseRecord.
 *
 * @returns {JSX.Element} A JSX.Element containing a table poplated with the
 * courses in a Semester.
 */
export function SemesterTable({semester, editCourseLauncher, deleteCourse, addCourse, checkCourse, year}: { 
    semester: (Semester);
    editCourseLauncher?: ({course, semester}: {course: Course, semester:Semester}) => void,
    deleteCourse?: ({course, semester}: {course: Course, semester:Semester}) => void,
    addCourse?: (newCourse: Course) => void,
    checkCourse?: (s: string) => boolean,
    year?: number
    }): JSX.Element {
      
    const [{ isOver } , addToTableRef] = useDrop({
        accept: "courseCard",
        drop: (item: Course) => {
            handleCourse(item);
        },
    });

    function handleCourse(item: Course): void{
        function determineYear(){
            const today = new Date();
            return today.getFullYear();
        }

        function validatePreRequirements(course: Course): boolean{
            //Iterate through each course   
            let valid_course = true;
            //If there are no prerequisites, the course is valid, you can probably just break here.
            if (course.preReqs[0][0] == ""){
                return false;
            }
            //We look in each prerequisite structure, which holds the keys we are looking for
            for (let j = 0; j < course.preReqs.length; j++){
                //Iterate through each key the list of prerequisites, formatted {[CISC108, CISC106], [MATH241]...}
                for (let h = 0; h < course.preReqs[j].length; h++){
                    //If the course isnt valid AND it hasnt been set true previously, then the course isnt valid.
                    //console.log(course.preReqs[j][h]);
                    if (checkCourse && !checkCourse(course.preReqs[j][h])){
                        valid_course = false;
                    }else{
                        valid_course = true;
                        break;
                    }
                }
            }    
            if (valid_course){
                return true;
            } else {
                return false;
            }
        }
        if(validatePreRequirements(item) && year && year >= determineYear()){
            {addCourse && addCourse(item);}
        }
    }

    /**
    * @description Renders a single row in the table with a course's information.
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
        <Table data-testid = "semester-table" id="semester-table" ref={addToTableRef}>
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Credits</th>
                    {editCourseLauncher && <th scope="col">Edit:</th>}
                    <th scope="col">Delete:</th> 
                </tr>
            </thead>
            <tbody>
                {Object.values(semester.courseRecord).map(renderList)}
            </tbody>
            {isOver && console.log("over table")}
        </Table>
    );
}