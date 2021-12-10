import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form, Button, ModalFooter } from "react-bootstrap";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/ModalHeader";
/**
 * @decription Creates a Modal that contains a Form (with verification) to edit a given Course.
 * 
 * @param {(b:boolean) => void} setEditCourseVisible - Sets the visibility of EditCourseModal.
 * @param {boolean} editCourseVisible - Visibility of EditCourseModal.
 * @param {Course} course - The course to be edited.
 * @param {(c:Course) => void} setCurrentCourse - Sets the current course that is being edited.
 * @param {(c:Course) => void} editCourse - Removes the course that has been edited and adds the updated course in its 
 * place.
 *
 * @returns {JSX.Element} A JSX.Element containing a custom Modal with embedded Form.
 */
export function EditCourseModal({ setEditCourseVisible, editCourseVisible, course, editCourse}: {
    setEditCourseVisible: (b:boolean) => void;
    editCourseVisible: boolean;
    course: Course;
    setCurrentCourse: (c:Course) => void;
    editCourse: (c:Course) => void;
}): JSX.Element {

    const [newCourse, setNewCourse] = useState<Course>(course);

    const [validated, setValidated] = useState(false);
    const hide = ()=>setEditCourseVisible(false);

    /**
     * @description Sets the hooks containing the searched-for course back to their default
     * values.
     */
    function resetCourseHooks(): void {
        setNewCourse({
            department: "",
            courseID: 0,
            title: "",
            description: "",
            credits: 0,
            preReqs: [[""]],
            fufills: ""
        });
    }

    /**
     * @description Checks to see if the course information on the form is valid.
     * If so, it copies the information from the form into an Array and sets that
     * information to the course hook. If not, it prevents the form from being 
     * submitted.
     * @param {React.FormEvent<HTMLFormElement>} event An HTML form submission event representing the updated course
     * information submitted by the user.
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault();
        const form: HTMLFormElement = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            setValidated(true);
            const inputValueArray: string[] = new Array(form.elements.length - 1);
            for (let i = 0; i<form.elements.length - 1; i++) { // -1 is to remove the button
                const copyElement: HTMLInputElement = form.elements[i] as HTMLInputElement;
                inputValueArray[i] = copyElement.value;
            }
            const updateNewCourse: Course = {
                department: inputValueArray[0],
                courseID: parseInt(inputValueArray[1]),
                title: inputValueArray[2],
                description: inputValueArray[3],
                credits: parseInt(inputValueArray[4]),
                preReqs: course.preReqs,
                fufills: ""
            };
            setNewCourse(updateNewCourse);
        }
        
    };
    /**
     * @description Calls editCourse to update the plan, resets the hooks to 
     * prepare for the next time a user edits a course, resets validity to false,
     * and hides the modal.
     */
    function saveCourse():void {
        editCourse(newCourse);
        resetCourseHooks();
        setValidated(false);
        hide();
    }

    return(
        <Modal
            data-testid="edit-course-modal"
            show={editCourseVisible}
            onHide={hide}
            backdrop="static"
            keyboard={false}
            size="lg">
            <ModalHeader closeButton onClick={resetCourseHooks}>
                <Modal.Title>Edit {course.department + course.courseID}</Modal.Title>
            </ModalHeader>

            <ModalBody>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationDepartment">
                            <Form.Label>Department</Form.Label>
                            <Form.Control
                                datatest-id="edit-department"
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
                                datatest-id="edit-courseid"
                                required
                                type="number"
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
                                datatest-id="edit-title"
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
                                datatest-id="edit-description"
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
                                datatest-id="edit-credits"
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
                    </Row>
                    <Button
                        datatest-id="check-course-changes"
                        variant="primary"
                        type="submit"
                    >Check Course Changes</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                {validated && <Button
                    className="button"
                    id="save-course-button"
                    datatest-id="save-course-button"
                    onClick={saveCourse}>Save Course</Button>}
            </ModalFooter>
        </Modal>
    );
}