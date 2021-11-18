import React from "react";
import { useDrag } from "react-dnd";
import { Course } from "../interface/course";
import { Button, Card } from "react-bootstrap";
import { Season } from "../interface/semester";


export function CourseCard({cardInfo, setDeleteCard, showCard, showPreWarning, hide, hideButton}: {
    cardInfo: Course,
    setDeleteCard:(c:Course) => void, 
    showCard: boolean, 
    showPreWarning: boolean,
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
                {showPreWarning && <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    <div style = {{ paddingLeft: 10 }}>
                        You cannot add this course to your semester as it&apos;s prerequisite(s) has not been fufilled in a previous semester ({displayReqs(cardInfo.preReqs)})
                    </div>
                </div>}
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