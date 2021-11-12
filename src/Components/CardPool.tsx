import React, { useState } from "react";
import { Course } from "../interface/course";
import { useDrop } from "react-dnd";
import { CourseCard } from "./CourseCard";

export function CardPool({showCard, setShowCard}: {showCard: boolean, setShowCard: (b: boolean)=>void}): JSX.Element{
    const [pool, setPool] = useState<Course[]>([]);
    const [{ isOver } , addToPoolRef] = useDrop({
        accept: "courseCard",
        drop: (item: Course) => handleNewCourse(item),
    });

    function handleNewCourse(item: Course){
        if(!pool.includes(item)){
            setPool([...pool, item]);
            console.log("pool");
            console.log(pool);
        } else{
            setPool(pool);
        }
        setShowCard(false);
    }

    return (
        <div id = "card-pool" ref={addToPoolRef}>
            {pool.map((courseCard, i) => <CourseCard key={i} cardInfo={courseCard} showCard={showCard} hide={true}/>)}
            {isOver && console.log("over pool")}
        </div>
    );
}