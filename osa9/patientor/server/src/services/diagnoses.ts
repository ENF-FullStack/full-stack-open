import diagnoseData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default { getDiagnoses, addDiagnosis };