import { Season } from "./semester";

export interface Course {
    dept: string,
    id: number,
    description: string,
    credits: number,
    prereqs: Course[],
    coreqs: Course[],
    semestersOffered: Season[]
}