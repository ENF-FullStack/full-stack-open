import React from 'react';
import { useStateValue } from '../state';
import { Entry, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry } from '../types';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { SentimentVeryDissatisfied } from "@material-ui/icons";
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';


const getDiagnoseDesc = (diagnose: string) => {
const [{ diagnosisList }, ] = useStateValue();
    return diagnosisList[diagnose].name;
};

const entryInfo = (entry: Entry ) => {
    return (
        <div>
            {
                entry.diagnosisCodes && entry.diagnosisCodes.length > 0
                ? (
                    <div>
                        <ul>
                        {entry.diagnosisCodes.map((diagnose: string) => (
                            <li key={diagnose}>
                                {diagnose}: {getDiagnoseDesc(diagnose)}
                            </li>
                        ))}
                        </ul>
                    </div>
                )
                : null
            }
        </div>
    );
}; 
const healthRating = (entry:HealthCheckEntry) => {
switch (entry.healthCheckRating) {
    case 0: return (<React.Fragment><SentimentSatisfiedAltIcon /><SentimentSatisfiedAltIcon /></React.Fragment>);
    case 1: return (<SentimentSatisfiedAltIcon />);
    case 2: return (<SentimentNeutralIcon />);
    case 3: return (<SentimentVeryDissatisfied />);
    default:
        return null;
}
};

export const HealthCheck: React.FC<({ entry: HealthCheckEntry })> = ({ entry }) => {
    return (
        <div>
            <p>
                <FavoriteBorderIcon /><br/>
                {entry.date}<br />
                {entry.description}<br />
                Diagnose done by: {entry.specialist}<br />
                Health rating: { healthRating(entry) }
                { entryInfo(entry) }
            </p>
        </div>
    );
};

export const OccupationHC: React.FC<({ entry: OccupationalHealthcareEntry })> = ({ entry }) => {
    return (
        <div>
            <p>
                <MedicalInformationIcon /><br />
                {entry.date}<br />
                employer: {entry.employerName}<br />
                {entry.description}<br />
                { entryInfo(entry) }
            </p>
        </div>
    );
};

export const Hospital: React.FC<({ entry: HospitalEntry})> = ({ entry }) => {
    return (
        <div>
            <p>
                <LocalHospitalIcon /><br />
                {entry.discharge.date}: {entry.discharge.criteria}<br />
                {entry.description}<br />
                { entryInfo(entry) }
            </p>
        </div>
    );
};