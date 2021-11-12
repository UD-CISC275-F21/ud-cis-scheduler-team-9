import React from "react";
import { useDrag } from "react-dnd";
import { Course } from "../interface/course";
import { Card } from "react-bootstrap";
import { Season } from "../interface/semester";


export function CourseCard({cardInfo, showCard, hide}: {cardInfo: Course, showCard: boolean, hide:boolean}): JSX.Element{

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "Course Card",
        item: { department: cardInfo.department, courseID: cardInfo.courseID},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    function displayReqs(s: string[][]): string | undefined{
        let i;
        if(showCard){
            let phrase = s[0][0];
            for(i = 1; i<s[0].length; i++){
                phrase = phrase + ", " + s[0][i];
            }
            return phrase;
        }
    }
    
    function displaySemesters(semesters: Season[]){
        let i = 0;
        let phrase = "";
        semesters.forEach((s)=>{
            switch(s){
            case 0:
                phrase = phrase + "Fall";
                break;
            case 1:
                phrase = phrase + "Winter";
                break;
            case 2:
                phrase = phrase + "Spring";
                break;
            case 3:
                phrase = phrase + "Summer";
                break;
            }
            
            i++;
            if(i<semesters.length)
                phrase = phrase + ", ";
        });
        return phrase;
    }

    console.log("card");
    
    return (
        <Card draggable className = "draggable-card" ref={drag} style={{opacity: isDragging ? "50%" : "100%"}}>
            <Card.Body>
                <Card.Title>{cardInfo.department}{cardInfo.courseID}: {cardInfo.title} 
                    <Card.Text> Credits: {cardInfo.credits}</Card.Text>
                </Card.Title> 
                <Card.Text>{cardInfo.description}</Card.Text>
                {!hide && <Card.Text>Prereqs: {displayReqs(cardInfo.preReqs)}</Card.Text>} 
                {!hide && <Card.Text>Coreqs: {displayReqs(cardInfo.coReqs)}</Card.Text>} 
                {!hide && <Card.Text>Semesters: {displaySemesters(cardInfo.semestersOffered)}</Card.Text>}
            </Card.Body>
        </Card>
    );
}