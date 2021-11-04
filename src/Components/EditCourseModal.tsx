import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form, Button, FormCheck, FormControl, Card} from "react-bootstrap";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/ModalHeader";
import { SemesterTable } from "./SemesterTable";

export function EditCourseModal({ setEditSemesterVisible, editSemesterVisible, course, editCourse }: {
    setEditSemesterVisible: (b:boolean) => void;
    editSemesterVisible: boolean;
    course: Course;
    editCourse: (course: Course) => void;
}): JSX.Element {

    const [department, setDepartment] = useState<string>(course.department);
    const [courseID, setCourseID] = useState<number>(course.courseID);
    const [title, setTitle] = useState<string>(course.title);
    const [description, setDescription] = useState<string>(course.description);
    const [credits, setCredits] = useState<number>(course.credits);
    const [preReqs, setPreReqs] = useState<string[][]>(course.preReqs);
    const [coReqs, setCoReqs] = useState<string[][]>(course.coReqs);
    const [semestersOffered, setSemestersOffered] = useState<Season[]>(course.semestersOffered);

    const hide = ()=>setEditSemesterVisible(false);

    //wdwd
    return(<div></div>);
}