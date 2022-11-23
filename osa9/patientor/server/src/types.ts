export enum Gender { Male = 'male', Female = 'female', Other = 'other' }

//? Patient entry types

export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
}

export enum EntryTypes {
    health_check = 'HealthCheck',
    occupational_HC = 'OccupationalHealthcare',
    hospital = 'Hospital',
}

export interface BaseEntry {
    id: string
    description: string
    date: string
    specialist: string
    type: string
    diagnosisCodes?: Array<Diagnosis['code']>
}

export interface HealthCheckEntry extends BaseEntry {
    type: 'HealthCheck'
    healthCheckRating: HealthCheckRating
}

export interface Discharge {
    date: string,
    criteria: string,
}

export interface HospitalEntry extends BaseEntry {
    type: 'Hospital'
    discharge: Discharge
    // discharge: {
    //     date: string
    //     criteria: string
    // }
}

export interface SickLeave {
    startDate: string,
    endDate: string,
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare'
    employerName: string
    sickLeave?: SickLeave
    // sickLeave?: {
    //     startDate: string
    //     endDate: string
    // }
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type Entry = 
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;
export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export type NewEntry = UnionOmit<Entry, 'id'>;

//? patient types

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry[]
}

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export type NewPatient = Omit<Patient, 'id'>;
export type PatientNS = Omit<Patient, 'ssn' | 'entries'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;