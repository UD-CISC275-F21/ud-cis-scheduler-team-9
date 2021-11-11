import React, { useState } from "react";
import { Course } from "../interface/course";
import { useDrop } from "react-dnd";
import { Col } from "react-bootstrap";
import { CourseCard } from "./CourseCard";

export function CardPool(showCard: boolean): JSX.Element{
    const [pool, setPool] = useState<Course[]>([]);
    const [{ isOver } , addToPoolRef] = useDrop({
        accept: "CoursecCard",
        drop: (item: Course) =>  !pool.includes(item) ? setPool([...pool, item]) : setPool(pool),
    });

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

    console.log("pool");

    return (
        <Col id = "course-display" ref={addToPoolRef}>
            {pool.map((courseCard, i) => <CourseCard key={i} cardInfo={courseCard} showCard={showCard} hide={true}/>)}
            {isOver && console.log("over dispay")}
        </Col>
    );
}