export enum Gender { Male = 'male', Female = 'female', Other = 'other' }

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id' | 'entries'>;
export type PatientNS = Omit<Patient, 'ssn' | 'entries'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}