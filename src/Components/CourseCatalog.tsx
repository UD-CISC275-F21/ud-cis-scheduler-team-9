import React from "react";
import { Course } from "../interface/course";
import "bootstrap/dist/js/bootstrap.bundle";
import { Card, InputGroup, OverlayTrigger, Popover, FormControl, Button } from "react-bootstrap";

export function CourseCatalog({catalog}: {
    catalog: Record<string, Course>
    }): JSX.Element {
    
    const limit = 100;
    let to_limit = 0;
    function createCard(c: Course){
        const popover = 
            <Popover id="popover-basic">
                <Popover.Header> weee </Popover.Header>
                <Popover.Body>
                    {c.description}
                </Popover.Body>
            </Popover>
        ;
        if (to_limit <= limit){
            to_limit++;
            return (
                <OverlayTrigger trigger="hover" overlay={popover}>
                    <Card style={{ width: "18rem" }}>
                        <Card.Body>
                            <Card.Title>
                                {c.department + c.courseID}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </OverlayTrigger>
            );
        }
    }

    function displayResults(event: {preventDefault: () => void; }){
        event.preventDefault();
        /*
        const course_array: Course[] = Object.values(catalog);
        for (let i = 0; i < course_array.length; i++){
            if (course_array[i].department == search){
                return createCard(course_array[i]);
            }
        }*/
        console.log("test");
    }

    return (
        <div>
            <InputGroup style={{ width: "18rem" }} onSubmit={displayResults}>
                <FormControl 
                    placeholder="Search for a department"
                    aria-label="Search for a department"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2" type="submit">
                    Search
                </Button>
            </InputGroup>
            {Object.values(catalog).map(createCard)}
        </div>
    );
}