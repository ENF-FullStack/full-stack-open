import patientData from '../../data/patientsNew';
import { Entry, Patient, PatientNS, NewPatient, NewEntry } from '../types';
import uuid = require('uuid');

const getPatients = (): Patient[] => {
    return patientData;
};

const getPatient = (id: string): Patient | undefined => {
    return patientData.find(patient => patient.id === id);
};

const getPatientsNS = (): PatientNS[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({ id, name, dateOfBirth, gender, occupation, entries }));
};

const addPatient = (patient: NewPatient): Patient => {
    const uuidv4: string = uuid.v4();
    const newPatient: Patient = {
        id: uuidv4,
        ...patient,
        entries: []
    };
    patientData.push(newPatient);
    return newPatient;
};

const addEntryToPatient = (entry: NewEntry, patient: Patient): Patient => {
    const uuidv4: string = uuid.v4();
    const allEntries: Entry = {...entry, id: uuidv4 };
    console.log("🚀 ~ file: patients.ts ~ line 32 ~ addEntryToPatient ~ allEntries", allEntries)
    
    const changedPatient: Patient = {...patient, entries: patient.entries.concat(allEntries)};
    console.log("🚀 ~ file: patients.ts ~ line 34 ~ addEntryToPatient ~ changedPatient", changedPatient)

    patientData.filter((patient) => patient.id === changedPatient.id)[0].entries.unshift(allEntries);
    
    patientData.map((patient) => (patient.id === changedPatient.id ? changedPatient : patient));

    return changedPatient;
};

export default { getPatients, getPatient, getPatientsNS, addPatient, addEntryToPatient };