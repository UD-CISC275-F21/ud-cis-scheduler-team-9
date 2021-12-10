import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { Course } from "../interface/course";
import { CourseCard } from "./CourseCard";

/**
 * @description Renders the CourseCards with the necessary Drag and Drop functionality.
 * @param {Course} courseInfo A course.
 * @param {(b: Course) => void} setCourseInfo Sets the course's information in the staging area to the information from
 * the dragged CourseCard.
 * @param {boolean} showCard If the CourseCard should be displayed.
 * 
 * @returns {JSX.Element} A JSX.Element containing a CourseCard with Drag and Drop functionality.s
 */
export function CourseCardDisplay({courseInfo, setCourseInfo, showCard}: {
    courseInfo: Course, 
    setCourseInfo:(b: Course) => void, 
    showCard: boolean
}): JSX.Element{

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
            preReqs: courseInfo.preReqs
        },
        dropEffect: "move",
        drop: (item: Course) =>  handleDisplay(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }), [courseInfo.department, courseInfo.courseID]);

    /**
     * @description handles dragging a CourseCard back to the staging area (Where a CourseCard starts when initially 
     * searched for).
     * @param {Course} item A course.
     */
    function handleDisplay(item: Course){
        if(courseInfo.department != item.department || courseInfo.courseID != item.courseID)
            setCourseInfo(item);
    }

    return (
        <div data-testid="course-card-display" id = "course-display" ref={addToDisplay}>
            {<CourseCard data-testid="course-card" cardInfo={courseInfo} setDeleteCard={setDeleteCard} showCard={showCard} hide={false} hideButton={true}/>}
            {isOver && console.log("over display")} 
        </div>
    );
}