import React, { useState } from "react";
import { Course } from "../interface/course";
import { useDrop } from "react-dnd";
import { CourseCard } from "./CourseCard";

export function CardPool({showCard}: {showCard: boolean}): JSX.Element{
    const [pool, setPool] = useState<Course[]>([]);
    const [{ isOver } , addToPoolRef] = useDrop({
        accept: "courseCard",
        drop: (item: Course) => handlePool(item),
    });

    function handlePool(item: Course){
        for(let i = 0; i<pool.length + 1; i++){
            if (!pool.find((course) => course.department === item.department && course.courseID === item.courseID)) {
                setPool([...pool, item]);
            } else{
                break;
            }
        }
    }

    return (
        <div id = "card-pool" ref={addToPoolRef}>
            {pool.map((courseCard, i) => <CourseCard key={i} cardInfo={courseCard} showCard={showCard} hide={true}/>)}
            {isOver && console.log("over pool")}
        </div>
    );
}