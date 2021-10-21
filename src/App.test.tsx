import React from "react";
import { render/*, screen */} from "@testing-library/react";
import App from "./App";

test("renders UD CIS Scheduler text", () => {
    render(<App />);
});


// ControlPanel tests
/*
it("has the control panel when the application loads", () => {
    const element = screen.getByRole("ControlPanel");
    expect(element).toBeInTheDocument();
});

it("has the add-semester-button when the application loads", () => {
    const element = screen.getByTestId("add-semester-button");
    expect(element).toBeInTheDocument();
});

// AddSemesterModal tests
it("shows the add-semester-modal when the add-semester-button is clicked", async () => {
    const button = screen.getByTestId("add-semester-button");
    button.click();
    const element = await screen.findByTestId("add-semester-modal");
    expect(element).toBeInTheDocument();
});
*/

/*it("enables the save semester button", ()=>{
    const element = screen.getByTestId("add-semester-modal");
    
    const button = screen.getByTestId("save-semseter-button");


})*/
