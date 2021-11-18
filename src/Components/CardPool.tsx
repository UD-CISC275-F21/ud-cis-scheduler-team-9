import React, { useState } from "react";
import { Course } from "../interface/course";
import { useDrop } from "react-dnd";
import { CourseCard } from "./CourseCard";

export function CardPool({showCard, showPreWarning, deleteCard, setDeleteCard}: {
    showCard: boolean,
    showPreWarning: boolean, 
    deleteCard: Course | undefined, 
    setDeleteCard:(c:Course) => void}): JSX.Element{

    const [pool, setPool] = useState<Course[]>([]);
    const [{ isOver } , addToPoolRef] = useDrop({
        accept: "courseCard",
        drop: (item: Course) => handlePool(item),
    });

    function handlePool(item: Course){
        if (!pool.find((course) => course.department === item.department && course.courseID === item.courseID)) {
            setPool([...pool, item]);
        }
    }

    if(deleteCard){
        console.log("Hi");
        /*setPool(pool.filter((element) => {
            element !== deleteCard;
        }));
        setDeleteCard(undefined);*/
    }

    return (
        <div id = "card-pool" ref={addToPoolRef}>
            {pool.map((courseCard, i) => 
                <CourseCard key={i} cardInfo={courseCard} setDeleteCard={setDeleteCard} showCard={showCard} showPreWarning={false} hide={true} hideButton={false}/> 
            )}
            {isOver && console.log("over pool")}
        </div>
    );
}