import React from "react";
import { Semester } from "../interface/semester";
import { SemesterCard } from "./SemesterCard";


export function PlanTable({ semesters, deleteSemester }: {
    semesters: Semester[];
    deleteSemester: (deleteIndex: number) => void;
}): JSX.Element {

    const arr = planSort();

    function planSort(){
        let i;
        const today = new Date();
        const arr1 = [];
        const arr2 = [];
        const arr3 = [];
        const arr4 = [];
        const newArr: Semester[] = [];
        for(i = 0; i<semesters.length; i++){
            if(semesters[i].year === today.getFullYear()){
                arr1.push(semesters[i]);
            } else if(semesters[i].year === today.getFullYear() + 1){
                arr2.push(semesters[i]);
            } else if(semesters[i].year === today.getFullYear() + 2){
                arr3.push(semesters[i]);
            } else if(semesters[i].year === today.getFullYear() + 3){
                arr4.push(semesters[i]);
            }
        }

        for(i = 0; i<4; i++){
            switch(i){
            case 0:
                if(arr1){
                    quickSort(arr1, 0, arr1.length);
                    newArr.push(...arr1);
                }
                break;
            case 1: 
                if(arr2){
                    quickSort(arr2, 0, arr1.length);
                    newArr.push(...arr2);
                }
                break;
            case 2:
                if(arr3){ 
                    quickSort(arr3, 0, arr1.length);
                    newArr.push(...arr3);
                }
                break;
            case 4:
                if(arr4){ 
                    quickSort(arr4, 0, arr1.length);
                    newArr.push(...arr4);
                }
                break;

            }
        }

        return newArr;
    }

    function quickSort(array: Array<Semester>, left: 0, right: number = array.length -1) {
        let index;
      
        if (array.length > 1) {
            index = partition(array, left, right);
      
            if (left < index - 1) {
                quickSort(array, left, index - 1);
            }
      
            if (index < right) {
                quickSort(array, index, right);
            }
        }
      
        return array;
    }

    function partition(array: Array<Semester>, left: 0, right: number = array.length -1) {
        const pivot = array[Math.floor((left + right) / 2)].season;
        let i = left;
        let j = right;
    
        while (i <= j) {
            while (array[i].season < pivot) {
                i++;
            }
        
            while (array[j].season > pivot) {
                j--;
            }
        
            if (i <= j) {
                [array[i].season, array[j].season] = [array[j].season, array[i].season];
                i++;
                j--;
            }
        }
    
        return i;
    }   

    function renderList(the_semester: Semester) {
        return (
            <SemesterCard semester={the_semester} deleteSemester = {deleteSemester}></SemesterCard>
        );
    }

    return (
        <div className="plan-table" id="plan-table">
            {arr.map(renderList)}
        </div>
    );
}