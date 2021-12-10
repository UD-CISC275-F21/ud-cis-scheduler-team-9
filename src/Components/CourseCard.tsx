import React from "react";
import { useDrag } from "react-dnd";
import { Course } from "../interface/course";
import { Button, Card } from "react-bootstrap";

export function CourseCard({cardInfo, setDeleteCard, showCard, hide, hideButton}: {
    cardInfo: Course,
    setDeleteCard:(c:Course | undefined) => void, 
    showCard: boolean,
    hide: boolean,
    hideButton: boolean}): JSX.Element{

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "courseCard",
        item: { 
            department: cardInfo.department, 
            courseID: cardInfo.courseID, 
            title: cardInfo.title, 
            description: cardInfo.description, 
            credits: cardInfo.credits, 
            preReqs: cardInfo.preReqs,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [cardInfo.department, cardInfo.courseID]);

    function displayReqs(s: string[][]): string | undefined{
        let i;
        if(showCard && s != undefined){
            let phrase = s[0][0];
            for(i = 1; i<s[0].length; i++){
                phrase = phrase + ", " + s[0][i];
            }
            return phrase;
        }
    }
    
    return (
        <Card draggable data-testid="course-card" className = "draggable-card" ref={drag} style={{opacity: isDragging ? "50%" : "100%"}}>
            <Card.Body>
                <Card.Title>{cardInfo.department}{cardInfo.courseID}: {cardInfo.title} {!hideButton && <Button className="Danger" data-testid="delete-button" onClick={()=>setDeleteCard(cardInfo)}>-</Button>}
                    <Card.Text> Credits: {cardInfo.credits}</Card.Text>
                </Card.Title> 
                {!hide && <Card.Text>{cardInfo.description}</Card.Text>}
                {!hide && <Card.Text>Prereqs: {displayReqs(cardInfo.preReqs)}</Card.Text>}
            </Card.Body>
        </Card>
    );
}