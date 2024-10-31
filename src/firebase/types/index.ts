import { Timestamp } from 'firebase/firestore';

export interface Department{
    shortName: string;
    createdAt:Timestamp;
    fullName: string;
    accidents:number;
    employees:number;
    id:string;
}

export interface AccidentType {
    id: string;                
    departmentID: string;     
    title: string;          
    status: string;           
    time: number;          
    envolvedEmployees: EmployeeType[]; 
    description: string; 
    involvedEmployees: EmployeeType[];    
    accidentID: 'string' 
    dataReported: 'string'
}


export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other", // for inclusivity
  }
  
  export enum EmployeeStatus {
    Active = "Active",
    Inactive = "Inactive",
    OnLeave = "OnLeave",
    Terminated = "Terminated",
  }
  
  export enum JobPosition {
    Manager = "Manager",
    Engineer = "Engineer",
    Technician = "Technician",
    HR = "HR",
    // add as many as you need
  }
  
  export interface EmployeeType {
    id: string;
    name: string;
    lastName: string;
    gender: Gender;
    dateOfBirth: string  // can be a string (YYYY-MM-DD) or a Date object
    homeAddress: string;
    email: string;
    phoneNumber: string;
    emergencyContact: string | null; // can be null if not provided
    employeeStatus: EmployeeStatus;
    jobPosition: JobPosition;
    medicalCondition?: string; // optional, use if applicable
    positiveNotes?: string; // optional, if you allow it
    negativeNotes?: string,
    photoURL?: string; // optional, for employee photos
    salary?: number; // optional, make sure to handle precision if needed
    departmentID: string;
    hireDate?: string ; // optional, same approach as dateOfBirth
  
  }
  