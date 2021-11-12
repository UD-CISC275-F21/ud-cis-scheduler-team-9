import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Course } from "../interface/course";
import { Col } from "react-bootstrap";
import { CourseCard } from "./CourseCard";


export function CourseCardDisplay({cardInfo, showCard}: {cardInfo: Course, showCard: boolean}): JSX.Element{
    const [display, setDisplay] = useState<Course[]>([cardInfo]);
    const [{ isOver }, addToDisplay] = useDrop(() => ({
        accept: "courseCard",
        item: { department: cardInfo.department, courseID: cardInfo.courseID},
        dropEffect: "move",
        drop: (item: Course) =>  !display.includes(item) ? setDisplay([...display, item]) : setDisplay(display),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    console.log("entered Display");
    console.log(display);

    return (
        <Col id = "course-display" ref={addToDisplay}>
            {display.map((courseCard, i) => <CourseCard key={i} cardInfo={courseCard} showCard={showCard} hide={false}/>)}
            {isOver && console.log("over dispay")}
        </Col>
    );
}