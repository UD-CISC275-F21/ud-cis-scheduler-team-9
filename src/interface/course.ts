import { Season } from "./semester";

export interface Course {
    department: string,
    courseID: number,
    title: string,
    description: string,
    credits: number,
    preReqs: string[][],
    coReqs: string[][],
    fufills: string,
    semestersOffered: Season[]
}