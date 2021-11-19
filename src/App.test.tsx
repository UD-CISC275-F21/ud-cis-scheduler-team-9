import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";


test("renders UD CIS Scheduler text", () => {
    render(<App />);
});

// SchedulerNavbar tests

describe("scheduler-navbar",() => {
    beforeEach(()=>{
        render(<App />);
    });

    it("renders the custom navbar on the document", async () => {
        const element = screen.getByTestId("scheduler-navbar");
        expect(element).toBeInTheDocument();
    });
});

// EditCourseModal tests

describe("edit-course-modal",() => {
    beforeEach(()=>{
        render(<App />);
    });

    it("does not render the edit-course-modal on start", async () => {
        const element = screen.queryByTestId("edit-course-modal");
        expect(element).not.toBeInTheDocument;
    });
});

// AddSemesterModal tests

describe("add-semester-modal", ()=>{
    beforeEach(()=>{
        render(<App />);
    });

    it("shows the add-semester-modal when the add-semester-button is clicked", async () => {
        const button = screen.getByTestId("add-semester-button-plan-table");
        button.click();
        const element = await screen.findByTestId("add-semester-modal");
        expect(element).toBeInTheDocument();
    });

    /*it("enables the save semester button", ()=>{
        const element = screen.getByTestId("add-semester-modal");
        <br/>
        const button = screen.getByTestId("save-semseter-button");
    })*/
});