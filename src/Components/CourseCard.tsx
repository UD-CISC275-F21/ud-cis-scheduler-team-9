import React from "react";
import { useDrag } from "react-dnd";
import { Course } from "../interface/course";
import { Button, Card } from "react-bootstrap";
import { Season } from "../interface/semester";


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
            coReqs: cardInfo.coReqs, 
            semestersOffered: cardInfo.semestersOffered
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
    
    function displaySemesters(semesters: Season[]){
        let i = 0;
        let phrase = "";
        if(semesters != undefined){
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
        }
        return phrase;
    }
    
    return (
        <Card draggable className = "draggable-card" ref={drag} style={{opacity: isDragging ? "50%" : "100%"}}>
            <Card.Body>
                <Card.Title>{cardInfo.department}{cardInfo.courseID}: {cardInfo.title} {!hideButton && <Button className="Danger" onClick={()=>setDeleteCard(cardInfo)}>-</Button>}
                    <Card.Text> Credits: {cardInfo.credits}</Card.Text>
                </Card.Title> 
                {!hide && <Card.Text>{cardInfo.description}</Card.Text>}
                {!hide && <Card.Text>Prereqs: {displayReqs(cardInfo.preReqs)}</Card.Text>} 
                {!hide && <Card.Text>Coreqs: {displayReqs(cardInfo.coReqs)}</Card.Text>} 
                {!hide && <Card.Text>Semesters: {displaySemesters(cardInfo.semestersOffered)}</Card.Text>}
            </Card.Body>
        </Card>
    );
}