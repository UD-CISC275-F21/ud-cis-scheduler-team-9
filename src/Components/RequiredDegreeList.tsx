import React from "react";

export function RequiredDegreeList({degree_list}: {degree_list: string[]}): JSX.Element{
    
    function createList(course: string){
        return(
            <a className="list-group-item list-group-item-action" key = {course}> {course} </a>
        );
    }

    return(
        <div className="list-group w-25" id = "degree_requirements">
            <a className="list-group-item list-group-item-action active"> Required Courses </a>
            {degree_list.map(createList)}
        </div>
    );
}