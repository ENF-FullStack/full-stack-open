import patientData from '../../data/patients';
import { Patient, PatientNS } from '../types';

const getPatients = (): Patient[] => {
    return patientData;
};

const getPatientsNS = (): PatientNS[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = () => {
    return null;
};

export default { getPatients, getPatientsNS, addPatient };