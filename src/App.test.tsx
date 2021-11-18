import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { PlanTable } from "./Components/PlanTable"
import { Semester } from "./interface/semester"
import { removeListener } from "process";

test("renders UD CIS Scheduler text", () => {
    render(<App />);
});

// ControlPanel tests

describe("control-panel", ()=>{
    beforeEach(()=>{
        render(<App />);
    });

    it("has the control panel when the application loads", () => {
        const element = screen.getByTestId("control-panel");
        expect(element).toBeInTheDocument();
    });

    it("has the add-semester-button when the application loads", () => {
        const element = screen.getByTestId("add-semester-modal-button");
        expect(element).toBeInTheDocument();
    });
});

// AddSemesterModal tests

describe("add-semester-modal", ()=>{
    beforeEach(()=>{
        render(<App />);
    });

    it("shows the add-semester-modal when the add-semester-button is clicked", async () => {
        const button = screen.getByTestId("add-semester-modal-button");
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

describe("delete-all-semester-button", ()=>{
    beforeEach(() =>{
        render(<App />);
    });

    it("exists when the page loads", () => {
        const button = screen.getByTestId("delete-all-semesters-button");
        expect(button).toBeInTheDocument();
    });
});
describe("plan-table", () => {
    beforeEach(() =>{
        render(<App />);
    });
    
    it("exists when the page loads", () => {
        const element = screen.queryByTestId("plan-table");
        expect(element).toBeInTheDocument();
    });
    //if there a way to insert data in the modal we could test that
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
            const button = screen.getByTestId("add-semester-modal-button");
            button.click();
            const element = await screen.findByTestId("semester-table");
            expect(element).toBeInTheDocument();
        });
});