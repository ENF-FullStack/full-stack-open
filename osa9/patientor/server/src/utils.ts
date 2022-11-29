/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NewPatient, Gender, NewEntry, NewBaseEntry, EntryTypes, Discharge, SickLeave, HealthCheckRating } from './types';

// export const assertNever = (value: never): never => {
//     throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
// };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (data: unknown, variable: string): string => {
    if(!data || !isString(data)) {
        throw new Error(`Error: missing or wrong string ${variable}`);
    }
    return data;
};

const parseType = (type: any, variable: string): EntryTypes => {
    if(!type || !Object.values(EntryTypes).includes(type)) {
        throw new Error(`Error with variable: ${variable}`);
    }
    return type as EntryTypes;
};

const parseGender = (gender: unknown): Gender => {
    if(gender === 'male') return Gender.Male;
    if(gender === 'female') return Gender.Female;
    if(gender === 'other') return Gender.Other;

    throw new Error('Error: gender is Male/Female/Other');
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Error: missing or wrong timestamp YYYY-MM-DD');
    }
    const timestamp = Date.parse(date);
    const ts: Date = new Date(timestamp);
    return `${ts.getFullYear()}-${ts.getMonth() + 1}-${ts.getDate()}`;
};

type Fields = {
    name: unknown
    dateOfBirth: unknown
    gender: unknown
    ssn: unknown
    occupation: unknown
    entries: unknown
};

export const parsePatient = (object: Fields): NewPatient => {
    return {
        name: parseString(object.name, 'name'),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn, 'ssn'),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation, 'occupation'),
        entries: []
    };
};

const checkHCR = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHCR = (healthCheckRating: unknown, variable: string): HealthCheckRating => {
    if(!healthCheckRating || !checkHCR(healthCheckRating)) {
        throw new Error(`Error with variable: ${variable}`);
    }
    return healthCheckRating;
};

const parseSickLeave = (object: any, variable: string): SickLeave => {
    if (!object) throw new Error(`Error with variable: ${variable}`);

    return {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate),
    };
};

const parseDischarge = (object: any, variable: string): Discharge => {
    if(!object) throw new Error(`Error with variable: ${variable}`);

    return {
        date: parseDate(object.date),
        criteria: parseString(object.criteria, 'discharge criteria')
    };
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<string> => {
    if (!diagnosisCodes || !(diagnosisCodes instanceof Array)) {
        throw new Error(`Error with variable: diagnosis codes`);
    }
    // console.log("🚀 ~ file: utils.ts ~ line 105 ~ parseDiagnosisCodes ~ diagnosisCodes", diagnosisCodes);
    return diagnosisCodes;
};

type ValidateEntryFields = { description: unknown; date: unknown; specialist: unknown; diagnosisCodes?: unknown; type: unknown };

const validateEntry = ({ type, description, date, specialist, diagnosisCodes }: ValidateEntryFields): ValidateEntryFields => {
    const newBaseEntry: NewBaseEntry = {
        type: parseType(type, 'type'),
        description: parseString(description, 'description'),
        date: parseDate(date),
        specialist: parseString(specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)
    };

    //! diagnosisCodes validation disabled
    // if (diagnosisCodes) {
    //     newBaseEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
    //     diagnosisCodes: (newBaseEntry.diagnosisCodes);
        
    // }
    
    return newBaseEntry;
};

export const parseEntry = (object: any): NewEntry => {
    const newBaseEntry = validateEntry(object) as NewEntry;

    switch (newBaseEntry.type) {
        case EntryTypes.health_check:
            return {
                ...newBaseEntry,
                healthCheckRating: parseHCR(object.healthCheckRating, 'health check rating'),
            };
        case EntryTypes.occupational_HC:
            const newEntry = {
                ...newBaseEntry,
                employerName: parseString(object.employerName, 'employer name'),
            };

            if (object.sickLeave) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave, 'sick leave');
            }
            return newEntry;
        case EntryTypes.hospital:
            return {...newBaseEntry, discharge: parseDischarge(object.discharge, 'discharge')};
        // default: return assertNever(newBaseEntry);
        default: throw Error('Invalid entry');
    }
};