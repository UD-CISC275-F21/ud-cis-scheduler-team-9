import React from "react";
import { Semester } from "../interface/semester";


export function RequiredDegreeList({checkCourse, degree_list}: {
    checkCourse: (c: string)=>boolean, 
    degree_list: string[]}): JSX.Element{
    
    function createList(course: string){
        if (checkCourse(course)){
            return(
                <a className="list-group-item list-group-item-success" key = {course}> {course} </a>
            );
        }else{
            return(
                <a className="list-group-item list-group-item-action" key = {course}> {course} </a>
            );
        }
    }

    return(
        <div className="list-group w-25" id = "degree_requirements">
            <a className="list-group-item list-group-item-action active"> Required Courses </a>
            {degree_list.map(createList)}
        </div>
    );
}