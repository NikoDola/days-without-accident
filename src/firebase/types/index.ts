import { Timestamp } from 'firebase/firestore';

export interface Department{
    shortName: string;
    createdAt:Timestamp;
    fullName: string;
    accidents:number;
    employees:number
}

export interface AccidentType {
    title: string;
    accidentDescription: string;
    status: string;
    time: number;
    involvedEmployees: EmployeeType[];
    description: string;
}

export interface EmployeeType {
    id: string;
    name: string;
    lastName: string;
   
}