import { Season } from "./semester";

export interface Course {
    department: string,
    courseID: number,
    description: string,
    credits: number,
    preReqs: Course[],
    coReqs: Course[],
    semestersOffered: Season[]
}