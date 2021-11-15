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
            Download your courseplan here
        </CSVLink>
    );
}