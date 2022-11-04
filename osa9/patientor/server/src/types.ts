export type Gender = 'male' | 'female';

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
}

export type NewPatient = Omit<Patient, 'id'>;
export type PatientNS = Omit<Patient, 'ssn'>;