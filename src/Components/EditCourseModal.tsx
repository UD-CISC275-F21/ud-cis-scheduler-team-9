import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form, Button, ModalFooter } from "react-bootstrap";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/ModalHeader";
/**
 * Creates a Modal that contains a Form (with verification) to edit a given Course.
 * @param setEditCourseVisible Sets the visibility of EditCourseModal.
 * @param editCourseVisible Visibility of EditCourseModal.
 * @param course A course.
 * @param setCurrentCourse Sets the current course that is being edited.
 * @param editCourse Removes the course that has been edited and adds the 
 * updated course in its place.
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

    function resetCourseHooks(): void {
        setNewCourse({
            department: "",
            courseID: 0,
            title: "",
            description: "",
            credits: 0,
            preReqs: [[""]],
            coReqs: [[""]],
            semestersOffered: []
        });
    }
 
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
            console.log(inputValueArray);
            const updateNewCourse: Course = {
                department: inputValueArray[0],
                courseID: parseInt(inputValueArray[1]),
                title: inputValueArray[2],
                description: inputValueArray[3],
                credits: parseInt(inputValueArray[4]),
                preReqs: course.preReqs,
                coReqs: course.coReqs,
                semestersOffered: course.semestersOffered
            };
            setNewCourse(updateNewCourse);
        }
        
    };

    function saveCourse() {
        console.log(newCourse);
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
                                defaultValue={course.semestersOffered.toString()}                            
                            />
                            <Form.Control.Feedback>
                                Valid Semesters!
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please provide valid Semester(s) offered (ex. Fall, Spring).
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button
                        variant="primary"
                        type="submit"
                    >Check Course Changes</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                {validated && <Button
                    className="button"
                    id="save-course-button"
                    onClick={saveCourse}>Save Course</Button>}
            </ModalFooter>
        </Modal>
    );
}