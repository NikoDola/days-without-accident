import { Timestamp } from 'firebase/firestore';

export interface Department{
    shortName: string;
    createdAt:Timestamp;
    fullName: string;
    accidents:number;
    employees:number
}

export interface AccidentType {
    id: string;                
    departmentID: string;     
    title: string;          
    status: string;           
    time: number;          
    envolvedEmployees: EmployeeType[]; 
    description: string;     
}


export interface EmployeeType {
    id: string;
    name: string;
    lastName: string;
    envolvedEmployees: [];
    photoURL: string; // Add the missing property
}