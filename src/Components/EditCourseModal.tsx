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
    const courseInfo = {department, courseID, title, description, credits, preReqs, coReqs, semestersOffered};

    const [validated, setValidated] = useState(false);

    const hide = ()=>setEditSemesterVisible(false);

    //efefef
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
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            usernameInput: HTMLInputElement
        };
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    
        setValidated(true);
    };

    function saveCourse() {
        editCourse({department, courseID, title, description, credits, preReqs, coReqs, semestersOffered});
        resetCourseHooks();
        hide();
    }

    return(
        <Modal
            show={editSemesterVisible}
            onHide={hide}
            backdrop="static"
            keyboard={false}
            data-testid="edit-course-modal"
            size="lg">
            <ModalHeader closeButton onClick={resetCourseHooks}>
                <Modal.Title>Edit {department + courseID.toString()}</Modal.Title>
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
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => 
                                    setDepartment(event.target.value.toUpperCase())}
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
                                as="input"
                                placeholder="123"
                                defaultValue={course.courseID}
                                pattern="\d*"
                                minLength={3}
                                maxLength={3}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setCourseID(event.target.valueAsNumber)}
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
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setTitle(event.target.value)}
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
                                type="text"
                                placeholder={("Principles of how to plan a schedule, incluing how breadths work, what" +
                                    "BlueHenPlanner is and how it works, where to find your registration appointment" +
                                    "date and time, etc.")}
                                defaultValue={course.description}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setDescription(event.target.value)}
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
                                type="text"
                                defaultValue={course.credits}
                                pattern="\d*"
                                minLength={1}
                                maxLength={1}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setCredits(event.target.valueAsNumber)}
                            />
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
                                placeholder=""
                                
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Semester.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </ModalBody>
            <Modal.Footer>
                <Button
                    className="button"
                    variant="primary"
                    onClick={saveCourse}
                >Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
}