import { Season } from "./semester";

export interface Course {
    department: string,
    courseID: number,
    description: string,
    credits: number,
    prereqs: Course[],
    coreqs: Course[],
    semestersOffered: Season[]
}