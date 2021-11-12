import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Course } from "../interface/course";
import { Col } from "react-bootstrap";
import { CourseCard } from "./CourseCard";


export function CourseCardDisplay({cardInfo, showCard}: {cardInfo: Course, showCard: boolean}): JSX.Element{
    const [display, setDisplay] = useState<Course>(cardInfo);
    const [{ isOver }, addToDisplay] = useDrop(() => ({
        accept: "courseCard",
        item: { 
            department: cardInfo.department, 
            courseID: cardInfo.courseID, 
            title: cardInfo.title, 
            description: cardInfo.description, 
            credits: cardInfo.credits, 
            preReqs: cardInfo.preReqs, 
            coReqs: cardInfo.coReqs, 
            semestersOffered: cardInfo.semestersOffered
        },
        dropEffect: "move",
        drop: (item: Course) =>  display === item ? setDisplay(item) : setDisplay(display),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    console.log(cardInfo);

    return (
        <div id = "course-display" ref={addToDisplay}>
            {<CourseCard cardInfo={display} showCard={showCard} hide={false}/>}
            {isOver && console.log("over dispay")}
        </div>
    );
}