import { Course } from "./course";

export enum Season {
    FALL = 0,
    WINTER = 1,
    SPRING = 2,
    SUMMER = 3
}

export interface Semester {
    season: Season,
    courseList: Course[],
    creditTotal: number,
    expectedTuition: number
}