import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form, Button, FormCheck, FormControl } from "react-bootstrap";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/ModalHeader";

export function EditCourseModal({ setEditSemesterVisible, editSemesterVisible, course, editCourse}: {
    setEditSemesterVisible: (b:boolean) => void;
    editSemesterVisible: boolean;
    course: Course;
    setCurrentCourse: (c:Course) => void;
    editCourse: (c:Course) => void;
}): JSX.Element {

    const [department, setDepartment] = useState<string>(course.department);
    const [courseID, setCourseID] = useState<number>(course.courseID);
    const [title, setTitle] = useState<string>(course.title);
    const [description, setDescription] = useState<string>(course.description);
    const [credits, setCredits] = useState<number>(course.credits);
    const [preReqs, setPreReqs] = useState<string[][]>(course.preReqs);
    const [coReqs, setCoReqs] = useState<string[][]>(course.coReqs);
    const [semestersOffered, setSemestersOffered] = useState<Season[]>(course.semestersOffered);

    const [validated, setValidated] = useState(false);

    const hide = ()=>setEditSemesterVisible(false);

    function resetCourseHooks(): void {
        setDepartment("");
        setCourseID(0);
        setTitle("");
        setDescription("");
        setCredits(0);
        setPreReqs([[""]]);
        setCoReqs([[""]]);
        setSemestersOffered([]);
    }
 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault();
        const form: HTMLFormElement = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            const inputValueArray: string[] = new Array(form.elements.length - 1);
            for (let i = 0; i<form.elements.length - 1; i++) { // -1 is to remove the button
                const copyElement: HTMLInputElement = form.elements[i] as HTMLInputElement;
                inputValueArray[i] = copyElement.value;
            }
            setDepartment(inputValueArray[0]);
            setCourseID(parseInt(inputValueArray[1]));
            setTitle(inputValueArray[2]);
            setDescription(inputValueArray[3]);
            setCredits(parseInt(inputValueArray[4]));
            setSemestersOffered([]);
            saveCourse();
        }
        
    };

    function saveCourse() {
        console.log({department, courseID, title, description, credits, preReqs, coReqs, semestersOffered});
        editCourse({department, courseID, title, description, credits, preReqs, coReqs, semestersOffered});
        resetCourseHooks();
        setValidated(false);
        hide();
    }

    return(
        <Modal
            show={editSemesterVisible}
            onHide={hide}
            backdrop="static"
            keyboard={false}
            data-testid="edit-course-modal"
            size="lg"
            onSubmit={() => saveCourse}>
            <ModalHeader closeButton onClick={resetCourseHooks}>
                <Modal.Title>Edit {course.department + course.courseID}</Modal.Title>
            </ModalHeader>

            <ModalBody>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationDepartment">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="ABCD or ABC"
                                defaultValue={course.department}
                                minLength={3}
                                maxLength={4}
                            />
                            <Form.Control.Feedback>
                                Valid Department!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Invalid Department! Please provide a 3-4 
                                character long Department tag (ex. ENGL)
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCourseID">
                            <Form.Label>Course ID</Form.Label>
                            <Form.Control
                                required
                                placeholder="123"
                                defaultValue={course.courseID}
                                pattern="\d*"
                                minLength={3}
                                maxLength={3}
                            />
                            <Form.Control.Feedback>
                                Valid Course ID!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Invalid Course ID! Please include a 3 digit Course ID (ex. 123). 
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Introduction to Course Registration"
                                defaultValue={course.title}
                            />
                            <Form.Control.Feedback>
                                Valid Title!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Invalid Title! Please include a valid title (ex. Introduction to Course Registration). 
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                required
                                as="textarea"
                                style={{ height: "100px" }}
                                type="text"
                                placeholder={("Principles of how to plan a schedule, incluing how breadths work, what" +
                                    "BlueHenPlanner is and how it works, where to find your registration appointment" +
                                    "date and time, etc.")}
                                defaultValue={course.description}
                            />
                            <Form.Control.Feedback>
                                Valid description!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid description.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="3" controlId="validationCredits">
                            <Form.Label>Credits</Form.Label>
                            <Form.Control
                                required
                                as="select"
                                aria-label="Floating label select example"
                                type="number"
                                defaultValue={course.credits}
                            >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </Form.Control>
                            <Form.Control.Feedback>
                                Valid credit total!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid credit total between 1 and 9.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="3" controlId="validationSemestersOffered">
                            <Form.Label>Semesters Offered</Form.Label>
                            <Form.Control
                                required
                                type="text"                               
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide valid Semester(s) offered (ex. Fall, Spring).
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button
                        className="button"
                        variant="primary"
                        type="submit"
                    >Save Course Changes</Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}