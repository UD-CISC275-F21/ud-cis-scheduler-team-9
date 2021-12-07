import React, { useState } from "react";
import { Course } from "../interface/course";
import { useDrop } from "react-dnd";
import { CourseCard } from "./CourseCard";

export function CardPool({showCard}: {showCard: boolean}): JSX.Element{
    const [pool, setPool] = useState<Course[]>([]);
    const [deleteCard, setDeleteCard] = useState<Course>();

    const [{ isOver } , addToPoolRef] = useDrop({
        accept: "courseCard",
        drop: (item: Course) => handlePool(item),
    });

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
        <div id = "card-pool" ref={addToPoolRef}>
            {pool.map((courseCard, i) => 
                <div key={i}>
                    <CourseCard cardInfo={courseCard} setDeleteCard={setDeleteCard} showCard={showCard} hide={true} hideButton={false}/>
                </div>
            )}
            {isOver && console.log("over the card pool")}
        </div>
    );
}