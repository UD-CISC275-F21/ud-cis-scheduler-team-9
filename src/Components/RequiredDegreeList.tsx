import React from "react";
import { Course } from "../interface/course";
import "bootstrap/dist/js/bootstrap.bundle";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { createHash } from "crypto";
export function RequiredDegreeList({checkCourse, catalog, degree_plan, degree_list}: {
    checkCourse: (c: string)=>boolean,
    catalog: Record<string, Course>;
    degree_plan: string,
    degree_list: string[]}): JSX.Element{
    
    let i = 0;
    function createList(course: string){
        let popover_description;
        let popover_header;
        if (catalog[course]){
            popover_header = course;
            popover_description = catalog[course].description;
        }else if (course.includes(" or ")){
            popover_header = course;
            popover_description = "Add either one of these courses to fufill this degree requirement";
        }else{
            popover_header = "Requirements";
            popover_description = "Some courses fufill requirements, such as breadth requirements. If a course does fufill one but hasn't been included, you can go into the edit course section and modify the 'fufills' field, and put in the desired course";
        }
        const popover = 
            <Popover id="popover-basic">
                <Popover.Header as="h3">{popover_header}</Popover.Header>
                <Popover.Body>
                    {popover_description}
                </Popover.Body>
            </Popover>
        ;
          
        if (checkCourse(course)){
            return(
                <OverlayTrigger key={i++} placement="right" overlay={popover}>
                    <a className="list-group-item list-group-item-success" > {course} </a>
                </OverlayTrigger>
            );
        }else{
            return(
                <OverlayTrigger key={i++} placement="right" overlay={popover}>
                    <a className="list-group-item list-group-item-action" > {course} </a>
                </OverlayTrigger>
            );
        }
    }
    return(
        <div className = "TEST">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
                Degree Audit
            </button>
            <div className="modal fade" id="" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle"> Major: {degree_plan} </h5>
                        </div>
                        <div className="modal-body">
                            <div id = "required_degree_list">
                                <div className="list-group w-100" id = "degree_requirements">
                                    {degree_list.map(createList)}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}