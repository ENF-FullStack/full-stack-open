/* eslint-disable @typescript-eslint/no-unsafe-return */
import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (data: unknown): string => {
    if(!data || !isString(data)) {
        throw new Error('Error: missing or wrong string');
    }
    return data;
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
};

export const parsePatient = (object: Fields): NewPatient => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    };
};