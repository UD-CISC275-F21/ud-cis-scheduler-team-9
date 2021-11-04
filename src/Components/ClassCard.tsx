import React from "react";
import { useDrag } from "react-dnd";
import { Course } from "../interface/course";
import { Card, Row } from "react-bootstrap";


export function ClassCard(c: Course): JSX.Element{
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "Course Card",
        item: { department: c.department, courseID: c.courseID},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return (
        <Card ref={drag} style={{opacity: isDragging ? "50%" : "100%"}}>
            <Row>
                {c.department + c.courseID}
            </Row>
        </Card>
    );
}