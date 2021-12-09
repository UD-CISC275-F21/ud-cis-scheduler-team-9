import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";


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

describe("plan-table", () => {
    beforeEach(() =>{
        render(<App />);
    });
    
    it("exists when the page loads", () => {
        const element = screen.queryByTestId("plan-table");
        expect(element).toBeInTheDocument();
    });

    it("sorts the semesters in sequential order", ()=>{
        const button = screen.getByTestId("add-semester-button-plan-table");
        button.click();
        const department = screen.getByTestId("department-name-input");
        const courseID = screen.getByTestId("CourseID-input");
        const year = screen.getByTestId("year-input");
        
        //Add a schedule with CISC108
        userEvent.type(department, "CISC");
        userEvent.type(courseID, "108");
        userEvent.type(year, "2021");
        const add_button = screen.getByTestId("add-course-button");
        const search_button = screen.getByTestId("search-course-button")
        const save_button = screen.getByTestId("save-semester-button")
        search_button.click;
        add_button.click;
        save_button.click;
        //Add another with CISC106
        userEvent.type(department, "CISC");
        userEvent.type(courseID, "106");
        userEvent.type(year, "2021");
        userEvent.click(search_button);
        userEvent.click(add_button);
        userEvent.click(save_button);


    });
});

describe("semester-table", () => {
    beforeEach(() =>{
        render(<App />);
    });

    it ("does not initially exist when website loads", ()=> {
        const element = screen.queryByTestId("semester-table");
        expect(element).not.toBeInTheDocument();
    });

    it ("exists when add-semester-modal button is pressed", async () => {
        const button = screen.getByTestId("add-semester-button-plan-table");
        button.click();
        const element = await screen.findByTestId("semester-table");
        expect(element).toBeInTheDocument();
    });
});