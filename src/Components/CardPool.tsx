import React, { useState } from "react";
import { Course } from "../interface/course";
import { useDrop } from "react-dnd";
import { CourseCard } from "./CourseCard";

export function CardPool(showCard: boolean): JSX.Element{
    const [pool, setPool] = useState<Course[]>([]);
    const [{ isOver } , addToPoolRef] = useDrop({
        accept: "CoursecCard",
        drop: (item: Course) =>  !pool.includes(item) ? setPool([...pool, item]) : setPool(pool),
    });

    console.log("pool");

    return (
        <div id = "card-pool" ref={addToPoolRef}>
            {pool.map((courseCard, i) => <CourseCard key={i} cardInfo={courseCard} showCard={showCard} hide={true}/>)}
            {isOver && console.log("over pool")}
        </div>
    );
}

/*const moveCourseCard = (item: Course) => {
        if(item && type === "course"){
            setPool((pool) => [...pool, item]);
            setShowCard(false);
        }else{
            setTitle(item.title);
            setDescription(item.description);
            setCredits(item.credits);
            setPreReqs(item.preReqs);
            setCoReqs(item.coReqs);
            setSemestersOffered(item.semestersOffered);
            setShowCard(true);
        }
    };*/