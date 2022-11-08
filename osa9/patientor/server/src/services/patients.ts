import patientData from '../../data/patientsNew';
import { Patient, PatientNS, NewPatient } from '../types';
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

export default { getPatients, getPatient, getPatientsNS, addPatient };