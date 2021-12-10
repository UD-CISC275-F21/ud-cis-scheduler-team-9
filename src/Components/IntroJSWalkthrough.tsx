import { Button } from "react-bootstrap";
import React,{useState} from "react";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";

export function IntroJSWalkthrough(): JSX.Element {
    const [stepsEnabled, setStepsEnabled] = useState(false);
    const initialStep = 0;
    const steps = [
        {
            intro:"Welcome to Group 9's UD CIS Scheduler Application! Using this, you are able to plan out your courses" + 
            "for the duration of your UD career.",
            position: "top"
        },
        {
            element:"#plan-table",
            intro: "This is the plan. All of the semesters you add will be located on it.",
            position: "top"
        },
        {
            element:"#add-semester-button-plan-table",
            intro: "Click this button to add a semester to your plan. A modal will pop up, allowing you to search for" +
            "and subsequently add courses to a semester.",
            position: "top"
        },
        {
            element: "#delete-all-semesters-nav",
            intro: "Click this dropdown to delete all semesters from your plan.",
            position: "bottom"
        },
        {
            element: "#degree-dropdown",
            intro: "Click this dropdown to choose/change a degree plan (ex. Computer Science B.S.).",
            position: "bottom"
        },
        {
            element: "#sch-dropdown",
            intro: "Click this dropdown to either download or upload your plan as a CSV.",
            position: "bottom"
        },
        {
            element: "#catalog-link",
            intro: "This takes you to the UD Catalog, where you can cross-reference course requirements and explore.",
            position: "bottom"
        },
        {
            element: "#tut-button",
            intro: "Click here if you need to reference the tuturial again.",
            position: "bottom"
        },
        {
            intro: "Enjoy the application!",
            position: "top"
        }
    ];
    function onExit(): void{
        setStepsEnabled(false);
    }
    function startIntro():void{
        setStepsEnabled(true);
    }
    return(
        <div>
            <Button onClick={()=>startIntro()} id="tut-button">Tutorial</Button>
            <Steps
                enabled={stepsEnabled}
                steps={steps}
                initialStep={initialStep}
                onExit={onExit}
                options=
                    {{
                        tooltipClass: "customTooltip",
                        showProgress: true,
                        showStepNumbers: true,
                        showBullets: false,
                        exitOnOverlayClick: false,
                        doneLabel: "Finished",
                        nextLabel: "Next Step",
                        hideNext: false,
                    }}
            />
        </div>
    );
}