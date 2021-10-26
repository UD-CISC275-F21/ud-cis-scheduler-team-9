import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";


test("renders UD CIS Scheduler text", () => {
    render(<App />);
});

// ControlPanel tests

describe("Control Panel", ()=>{
    beforeEach(()=>{
        render(<App />);
    });

    it("has the control panel when the application loads", () => {
        const element = screen.getByTestId("ControlPanel");
        expect(element).toBeInTheDocument();
    });

    it("has the add-semester-button when the application loads", () => {
        const element = screen.getByTestId("add-semester-button");
        expect(element).toBeInTheDocument();
    });
});

// AddSemesterModal tests

describe("add-semester-modal", ()=>{
    beforeEach(()=>{
        render(<App />);
    });

    it("shows the add-semester-modal when the add-semester-button is clicked", async () => {
        const button = screen.getByTestId("add-semester-button");
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