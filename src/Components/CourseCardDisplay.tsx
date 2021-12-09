import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Course } from "../interface/course";
import { CourseCard } from "./CourseCard";


export function CourseCardDisplay({courseInfo, setCourseInfo, showCard}: {
    courseInfo: Course, 
    setCourseInfo:(b: Course) => void, 
    showCard: boolean}): JSX.Element{

    const [deleteCard, setDeleteCard] = useState<Course>();
    if(deleteCard != undefined)
        setDeleteCard(undefined);

    const [{ isOver }, addToDisplay] = useDrop(() => ({
        accept: "courseCard",
        item: { 
            department: courseInfo.department, 
            courseID: courseInfo.courseID, 
            title: courseInfo.title, 
            description: courseInfo.description, 
            credits: courseInfo.credits, 
            preReqs: courseInfo.preReqs, 
            coReqs: courseInfo.coReqs, 
            semestersOffered: courseInfo.semestersOffered
        },
        dropEffect: "move",
        drop: (item: Course) =>  handleDisplay(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [courseInfo.department, courseInfo.courseID]);

    function handleDisplay(item: Course){
        if(courseInfo.department != item.department || courseInfo.courseID != item.courseID)
            setCourseInfo(item);
    }

    return (
        <div data-testid="course-card-display" id = "course-display" ref={addToDisplay}>
            {<CourseCard cardInfo={courseInfo} setDeleteCard={setDeleteCard} showCard={showCard} hide={false} hideButton={true}/>}
            {isOver && console.log("over display")}
        </div>
    );
}