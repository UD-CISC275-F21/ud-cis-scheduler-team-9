import { Course } from "./course";

export enum Season {
    WINTER = 0,
    SPRING = 1,
    SUMMER = 2,
    FALL = 3
}

export interface Semester {
    season: Season,
    year: number,
    courseRecord: Record<string, Course>,
    creditTotal: number,
    expectedTuition: number
}