import React from "react";
import { useDrag } from "react-dnd";
import { Course } from "../interface/course";
import { Card, Row } from "react-bootstrap";


export function ClassCard(course: Course): JSX.Element{
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "Course Card",
        item: { department: course.department, courseID: course.courseID},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return (
        <Card ref={drag} style={{opacity: isDragging ? "50%" : "100%"}}>
            <Row>
                {course.department + course.courseID}
            </Row>
        </Card>
    );
}