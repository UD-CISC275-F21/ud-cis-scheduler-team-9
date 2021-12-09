export interface Course {
    department: string,
    courseID: number,
    title: string,
    description: string,
    credits: number,
    preReqs: string[][],
    fufills: string,
}