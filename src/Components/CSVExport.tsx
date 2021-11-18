import React from "react";
import { CSVLink } from "react-csv";
import { Semester } from "../interface/semester";

export function CSVExport({plan}: {plan: Semester[]}): JSX.Element{

    const headers = [
        { label: "Season", key: "season"},
        { label: "Year", key: "year"},
        { label: "Course Record", key: "courseRecord"},
        { label: "Credit Total", key: "creditTotal"},
        { label: "Expected Tuition", key: "expectedTuition"}
    ];

    const data = plan;
    /*console.log("data: ", data);

    function editedPlan({oldPlan}: {oldPlan:Semester[]}){
        const newPlan: Semester[] = [];
        for(let i = 0; i<oldPlan.length; i++){

        }
    }*/

    if(plan.length > 0){
        console.log(plan[0]);
        return (
            <CSVLink 
                className="btn btn-primary"
                filename={"my-degree-plan.csv"} 
                headers={headers}
                data={data}
                onClick={() => {
                    console.log("You click the link"); // 👍🏻 Your click handling logic
                }}
            >
                Download Your Degree Plan Here
            </CSVLink>
        );
    }

    return (
        <p></p>
    );
}