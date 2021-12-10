import React, { useState } from "react";
import { Course } from "../interface/course";
import { useDrop } from "react-dnd";
import { CourseCard } from "./CourseCard";

/**
 * @description Renders the pool area, where users can drag CourseCards before they put them in the SemesterTable 
 * if they so choose.
 * @param {boolean} showCard If the CourseCard should be displayed.
 * 
 * @returns {JSX.Element} A JSX.Element containing the Pool area.
 */
export function CardPool({showCard}: {showCard: boolean}): JSX.Element{
    const [pool, setPool] = useState<Course[]>([]);
    const [deleteCard, setDeleteCard] = useState<Course>();

    const [{ isOver } , addToPoolRef] = useDrop({
        accept: "courseCard",
        drop: (item: Course) => handlePool(item),
    });

    /**
     * braxton save me
     */
    function handlePool(item: Course){
        if (!pool.find((course) => course.department === item.department && course.courseID === item.courseID)) {
            setPool([...pool, item]);
        }
    }

    if(deleteCard != undefined){
        console.log("Hi");
        setPool(pool.filter(courseCard => courseCard.department + courseCard.courseID !== deleteCard.department + deleteCard.courseID));
        setDeleteCard(undefined);
    }

    return (
        <div data-testid="card-pool" id = "card-pool" ref={addToPoolRef}>
            {pool.map((courseCard, i) => 
                <div key={i}>
                    <CourseCard data-testid="course-card" cardInfo={courseCard} setDeleteCard={setDeleteCard} showCard={showCard} hide={true} hideButton={false}/>
                </div>
            )}
            {isOver && console.log("over the card pool")}
        </div>
    );
}