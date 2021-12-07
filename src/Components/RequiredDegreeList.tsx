import React from "react";
/**
 * Renders the RequiredDegreeList, a bunch f <a> tags containing each of the
 * courses that have yet to be completed in the degree plan. (i.e. required 
 * courses for the degree that aren't yet in the plan).
 * @param degree_list Array of strings containing the course codes of required
 * courses not yet fulfilled.
 *
 * @returns {JSX.Element} A JSX.Element containing a custom RequiredDegreeList
 */
export function RequiredDegreeList({degree_list}: {degree_list: string[]}): JSX.Element{
    /**
     * Renders a single <a> tag instance of a required course, typically called
     * as a .map() callback function.
     * @param course String containing a course code (Department + CourseID).
     *
     * @returns {JSX.Element} A JSX.Element containing one required course as
     * an <a> tag
     */
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