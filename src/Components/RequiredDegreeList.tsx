import React from "react";
import "bootstrap/dist/js/bootstrap.bundle";

export function RequiredDegreeList({checkCourse, setCurrentDegreePlan, degree_plan_list, degree_list}: {
    checkCourse: (c: string)=>boolean,
    setCurrentDegreePlan: (p: string[])=>void,
    degree_plan_list: Record<string, string[]>,
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

    function createDropDown(plan: string){
        return (
            <a className="dropdown-item" href="#" onClick = {()=>setCurrentDegreePlan(degree_plan_list[plan])}>{plan}</a>
        );
    } 

    return(
        <div id = "required_degree_list">
            <div className = "dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Degree Plans
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {Object.keys(degree_plan_list).map(createDropDown)}
                </div>
            </div>
            <div className="list-group w-25" id = "degree_requirements">
                <a className="list-group-item list-group-item-action active"> Required Courses </a>
                {degree_list.map(createList)}
            </div>
        </div>
    );
}