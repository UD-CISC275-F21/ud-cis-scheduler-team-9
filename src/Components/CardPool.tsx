import React, {useState} from "react";
import { Course } from "../interface/course";
import { useDrop } from "react-dnd";
import { Col } from "react-bootstrap";
import { ClassCard } from "./ClassCard";

export function CardPool(): JSX.Element{

    const [pool, setPool] = useState<Course[]>([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "Course Card",
        drop: (item: Course) => addCardToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addCardToBoard = (item: Course) => {
        setPool((pool) => [...pool, item]);
    };

    return (
        <Col className="pool" ref={drop}>
            {pool.map((courseCard) => {
                return <ClassCard c={courseCard}/>;
            })}
            
        </Col>
    );
}