import React, { useState } from "react";
import { Modal, Col, Row, ModalBody, Form, Button, FormCheck, FormControl, Card} from "react-bootstrap";
import { Season, Semester } from "../interface/semester";
import { Course } from "../interface/course";
import ModalHeader from "react-bootstrap/ModalHeader";
import { SemesterTable } from "./SemesterTable";
import { useDrag, useDrop } from "react-dnd";

export function AddSemesterModal({ addSemester, checkSemester, setVisible, visible, catalog}:{
    addSemester: (s: Semester)=>void,
    checkSemester: (c: Semester)=>boolean,
    setVisible: (v:boolean)=>void,
    visible: (boolean)
    catalog: (Record<string, Course>)}): JSX.Element {

    // semester states
    const [season, setSeason] = useState<Season>(0);
    const [year, setYear] = useState<number>(determineYear());
    const [courseRecord, setCourseRecord] = useState<Record<string, Course>>({});
    const [creditTotal, setCreditTotal] = useState<number>(0);
    const [expectedTuition, setExpectedTuition] = useState<number>(0);
    const semesterInfo = {season, year, courseRecord, creditTotal, expectedTuition};

    // course states
    const [department, setDepartment] = useState<string>("");
    const [courseID, setCourseID] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [credits, setCredits] = useState<number>(0);
    const [preReqs, setPreReqs] = useState<string[][]>([[]]);
    const [coReqs, setCoReqs] = useState<string[][]>([[]]);
    const [semestersOffered, setSemestersOffered] = useState<Season[]>([]);
    const courseInfo = {department, courseID, title, description, credits, preReqs, coReqs, semestersOffered};

    // course card states
    const [showCard, setShowCard] = useState<boolean>(false);
    const hide = ()=>setVisible(false);

    // card pool states
    const [pool, setPool] = useState<Course[]>([]);

    function validateForm(): boolean { // Makes sure that no text field is empty before submit
        return department.length > 0 && courseID >= 100 && year >= determineYear();
    }

    function validateTable() {
        return Object.values(courseRecord).length > 0 && !checkSemester(semesterInfo);
    }

    function validateCourse() {
        return department != "" && courseID != 0 && title != "" && description != "" && credits != 0 && preReqs != [[]] && coReqs != [[]] && semestersOffered != [];
    }


    function handleSearch(event: {preventDefault: () => void; }){
        event.preventDefault();

        const key = department + courseID;

        let course: Course = {
            department: "",
            courseID: 0,
            title: "",
            description: "",
            credits: 0,
            preReqs: [[""]],
            coReqs: [[""]],
            semestersOffered: []
        };
        
        if(catalog[key]){
            course = getCourse(department, courseID);
            setShowCard(true);
        }

        setTitle(course.title);
        setDescription(course.description);
        setCredits(course.credits);
        setPreReqs(course.preReqs);
        setCoReqs(course.coReqs);
        setSemestersOffered(course.semestersOffered);
    }

    function addCourse(newCourse: Course){ 
        const courseKey: string = department + courseID;

        setCourseRecord({...courseRecord, [courseKey]: newCourse});
        setCreditTotal(determineCreditTotal(courseRecord));
        setExpectedTuition(expectedTuition);
    }

    function getCourse(department: string, id: number): Course{
        const name = department + id;
        
        return catalog[name];
    }

    function clearCourseRecord(){
        setCourseRecord({});
    }

    function saveSemester(){
        addSemester(semesterInfo);
        clearData();
        setShowCard(false);
        hide();
    }

    function determineCreditTotal(record: Record<string, Course>) {
        let i = 0;
        let total = 0;
        const keys = Object.keys(record); 
        const arr = [];

        for(i = 0; i<keys.length; i++){
            arr.push(record[keys[i]]);
        }
        
        while(i != arr.length){
            total += arr[i].credits;
            i++;
        }
        return total;
    }

    function determineYear(){
        const today = new Date();
        return today.getFullYear();
    }

    function determineSeason(word: string){
        if(word === "Fall"){
            setSeason(0);
        } else if(word === "Winter"){
            setSeason(1);
        } else if(word === "Spring"){
            setSeason(2);
        } else if(word === "Summer"){
            setSeason(3);
        }
    }

    function displayReqs(s: string[][]){
        let i;
        if(showCard){
            let phrase = s[0][0];
            for(i = 1; i<s[0].length; i++){
                phrase = phrase + ", " + s[0][i];
            }
            return phrase;
        }
    }
    
    function displaySemesters(){
        let i = 0;
        let phrase = "";
        semestersOffered.forEach((s)=>{
            switch(s){
            case 0:
                phrase = phrase + "Fall";
                break;
            case 1:
                phrase = phrase + "Winter";
                break;
            case 2:
                phrase = phrase + "Spring";
                break;
            case 3:
                phrase = phrase + "Summer";
                break;
            }
            
            i++;
            if(i<semestersOffered.length)
                phrase = phrase + ", ";
        });
        return phrase;
    }

    const [{ isOver } , addToPoolRef] = useDrop({
        accept: "course",
        drop: (item: Course) => moveCourseCard(item),
    });

    const [{ isOver: isCourseOver } , removeFromPoolRef] = useDrop({
        accept: "pool",
        drop: (item: Course) => moveCourseCard(item),
    });

    const draggableComponent = (props: Course) => {
        const [collected, drag, dragPreview] = useDrag(() => ({
            type: "course card",
            item: {id: "Displayed Card"},
            dropEffect: "move",
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));
        return collected.isDragging ? (<  div ref={dragPreview} />) :
            <Card 
                ref={drag} 
                {...collected}
                
            >
                <Card.Body>
                    <Card.Title>{department}{courseID}: {title} 
                        <Card.Text> Credits: {credits}</Card.Text>
                    </Card.Title> 
                    <Card.Text>{description}</Card.Text>
                    <Card.Text>Prereqs: {displayReqs(preReqs)}</Card.Text> 
                    <Card.Text>Coreqs: {displayReqs(coReqs)}</Card.Text> 
                    <Card.Text>Semesters: {displaySemesters()}</Card.Text>
                </Card.Body>
            </Card>;
    };

    const moveCourseCard = (item: Course) => {
        if(item && draggableComponent(item).type === "course"){
            setPool((pool) => [...pool, item]);
            setShowCard(false);
        }else{
            setTitle(item.title);
            setDescription(item.description);
            setCredits(item.credits);
            setPreReqs(item.preReqs);
            setCoReqs(item.coReqs);
            setSemestersOffered(item.semestersOffered);
            setShowCard(true);
        }
    };

    function clearData(){
        // Semester Data
        setSeason(0);
        setYear(0);
        setCourseRecord({});
        setCreditTotal(0);
        setExpectedTuition(0);
        
        //Course Data
        setDepartment("");
        setCourseID(0);
        setDescription("");
        setCredits(0);
        setPreReqs([[""]]);
        setCoReqs([[""]]);
        setSemestersOffered([]);

        //Course Card
        setShowCard(false);
    }

    return (
        <Modal
            show={visible}
            onHide={hide}
            backdrop="static"
            keyboard={false}
            data-testid="add-semester-modal"
            size="lg"
        >
            <ModalHeader closeButton onClick={clearData}></ModalHeader>
            <ModalBody>
                <Row>
                    <Form className="d-flex" id="search-course-formm" onSubmit={handleSearch}>
                        <Form.Group>
                            <Form.Label>
                                Department
                            </Form.Label>
                            <Form.Control data-testid="department-name-input" id="department-name" as="textarea" rows={1} 
                                minLength={3}
                                maxLength={4}
                                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setDepartment(ev.target.value.toUpperCase())}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Course ID
                            </Form.Label>
                            <Form.Control data-testid="CourseID-input" id="course-id" as="input" type="number"
                                min={100}
                                onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setCourseID(ev.target.valueAsNumber)}/>
                        </Form.Group>
                        <Button className="button" type="submit" data-testid="search-course-button" id="search-course-button" disabled={!validateForm()}>
                            Search
                        </Button>
                        <Button className="button" type="submit" data-testid="add-course-button" id="add-course-button" onClick={()=>addCourse(courseInfo)} disabled={!validateCourse()}>
                            Add
                        </Button>
                    </Form>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <FormCheck inline type="radio" value="Fall" name="season" label="Fall" checked={season === 0} onChange={(e) => determineSeason(e.target.value)}/>
                        <FormCheck inline type="radio" value="Winter" name="season" label="Winter" checked={season === 1} onChange={(e) => determineSeason(e.target.value)}/>
                        <FormCheck inline type="radio" value="Spring" name="season" label="Spring" checked={season === 2} onChange={(e) => determineSeason(e.target.value)}/>
                        <FormCheck inline type="radio" value="Summer" name="season" label="Summer" checked={season === 3} onChange={(e) => determineSeason(e.target.value)}/>
                    </Col>
                    <Col>
                        <FormControl data-testid="year-input" id="year-input" as="input" type="number" placeholder="Year"
                            min={determineYear()}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setYear(ev.target.valueAsNumber)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {showCard && <Card id="course-card">
                            <Card.Body>
                                <Card.Title>{department}{courseID}: {title} 
                                    <Card.Text> Credits: {credits}</Card.Text>
                                </Card.Title> 
                                <Card.Text>{description}</Card.Text>
                                <Card.Text>Prereqs: {displayReqs(preReqs)}</Card.Text> 
                                <Card.Text>Coreqs: {displayReqs(coReqs)}</Card.Text> 
                                <Card.Text>Semesters: {displaySemesters()}</Card.Text>
                            </Card.Body>
                        </Card>}
                    </Col>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <SemesterTable semester={{season, year, courseRecord, creditTotal, expectedTuition}}></SemesterTable>
                </Row>
                <Row data-testid="Bottom Row">
                    <Col>
                        <Button className="button" id="clear-course-list-button" variant="danger" onClick={clearCourseRecord}>Clear Semester</Button>
                    </Col>
                    <Col></Col>
                    <Col>
                        <Button className="button" id="save-semester-button" onClick={saveSemester} disabled={!validateTable()}>Save Semester</Button>
                    </Col>
                </Row>
                <Row></Row>
            </ModalBody>
        </Modal>
    );
}