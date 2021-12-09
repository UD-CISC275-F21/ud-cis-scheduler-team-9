import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
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
        const button = screen.getByTestId("add-semester-button-plan-table");
        userEvent.click(button);
    });

    afterEach(cleanup);

    it("shows the add-semester-modal when the add-semester-button button is clicked", async () => {
        const element = await screen.findByTestId("add-semester-modal");
        expect(element).toBeInTheDocument();
    });

    it("automatically uppercases letters in the department input", () => {
        const element = screen.getByTestId("department-name-input");
        expect(element.textContent === "");
        userEvent.type(element, "cisc");
        expect(element.textContent === "CISC");
    });

    it("only allows letters in the department input", () => {
        const element = screen.getByTestId("department-name-input");
        expect(element.textContent === "");
        userEvent.type(element, "2");
        expect(element.textContent === "");
    });

    it("only allows numbers in the courseId input", () => {
        const element = screen.getByTestId("course-id-input");
        expect(element.textContent === "");
        userEvent.type(element, "cisc");
        expect(element.textContent === "");
        userEvent.type(element, "201");
        expect(element.textContent === "201");
    });

    it("only allows numbers that are at least 100 in the courseId input", () => {
        const element = screen.getByTestId("course-id-input");
        expect(element.textContent === "");
        userEvent.type(element, "99");
        expect(element.textContent === "");
        userEvent.type(element, "201");
        expect(element.textContent === "201");
    });

    it("only enable the search button when the department and courseId inputs are filled", () => {
        const button = screen.getByTestId("search-course-button");
        const department = screen.getByTestId("department-name-input");
        const courseId = screen.getByTestId("course-id-input");
        let cardDisplay = screen.queryByTestId("course-card-display");

        expect(department.textContent === "");
        expect(courseId.textContent === "");
        userEvent.click(button);
        cardDisplay = screen.queryByTestId("course-card-display");
        expect(cardDisplay).not.toBeInTheDocument();

        userEvent.type(department, "CISC");
        userEvent.type(courseId, "210");
        userEvent.click(button);
        cardDisplay = screen.queryByTestId("course-card-display");
        expect(cardDisplay).toBeInTheDocument();
    });

    it("shows winter is checked by default for the season radio buttons", () => {
        const radios: HTMLElement = screen.getByTestId("season-radio-buttons");
        const winterLabel = radios.children[0];
        const springLabel = radios.children[1];
        const summerLabel = radios.children[2];
        const fallLabel = radios.children[3];

        expect(winterLabel).toBeChecked;
        expect(springLabel).not.toBeChecked;
        expect(summerLabel).not.toBeChecked;
        expect(fallLabel).not.toBeChecked;
    });

    it("only allows numbers in year-input", () => {
        const year = screen.getByTestId("year-input");

        userEvent.type(year, "Cisc");
        expect(year.textContent === "");

        userEvent.type(year, "2022");
        expect(year.textContent === "2022");
    });

    it("doesn't allows years that are before the current one in year-input", () => {
        const year = screen.getByTestId("year-input");

        userEvent.type(year, "1800");
        expect(year.textContent === "");

        userEvent.type(year, "2022");
        expect(year.textContent === "2022");
    });

    it("only enable the add button when the all inputs are filled and the course is displayed", () => {
        const searchButton = screen.getByTestId("search-course-button");
        const addButton = screen.getByTestId("add-course-button");
        const department = screen.getByTestId("department-name-input");
        const courseId = screen.getByTestId("course-id-input");
        const winterRadio = screen.getByTestId("season-radio-buttons").children[0];
        const year = screen.getByTestId("year-input");

        //tests that everything is zeroed out at render
        expect(department.textContent === "");
        expect(courseId.textContent === "");
        expect(winterRadio).toBeChecked;
        expect(year.textContent === "");
        userEvent.click(addButton);
        //this is teting that the dynamic table is empty
        expect(screen.findByText("CISC108")).toEqual({});

        //tests that the table has a course when the add button is clicked
        userEvent.type(department, "CISC");
        userEvent.type(courseId, "108");
        userEvent.click(searchButton);
        userEvent.type(year, "2022");
        userEvent.click(addButton);
        //this is testing that the dynamic table has one row of content
        expect(screen.getAllByText("CISC108")).toHaveLength(1);
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
    //if there is a way to insert data in the modal we could test that
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