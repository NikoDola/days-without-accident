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
    id:string;
    name: string;
    lastName: string;
    accidents: number;
    departmentName: string;
    description: string;
    photoURL: string;
    timestamp: string;
    gender: string;
    email: string;
    phoneNumber: number;
    emergencyContact: string;
    homeAddress: string;
    dateOfBirth: string;
    medicalCondition: string;
    employeeStatus: string;
    notes: string;
    promotions: {};
    salary: number;
    hireDate: string;
    jobPosition: string;
    envolvedEmployees: [];

}