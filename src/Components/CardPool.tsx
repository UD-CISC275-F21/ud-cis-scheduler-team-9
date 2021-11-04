import React, {useState} from "react";
import { Course } from "../interface/course";
import { useDrop } from "react-dnd";
import { Col } from "react-bootstrap";
import { ClassCard } from "./ClassCard";

export function CardPool(): JSX.Element{

    return (
        <Col className="pool" ref={drop}>
            {pool.map((courseCard) => {
                return <ClassCard course={courseCard}/>;
            })}
        </Col>
    );
}