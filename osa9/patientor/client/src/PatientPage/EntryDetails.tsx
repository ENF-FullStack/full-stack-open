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
            <FavoriteBorderIcon /><br/>
            <b>{entry.date}</b><br />
            <i>{entry.description}</i><br />
            Health rating: { healthRating(entry) }<br />
            Diagnose done by: <b>{entry.specialist}</b><br />
            { entryInfo(entry) }
        </div>
    );
};

export const OccupationHC: React.FC<({ entry: OccupationalHealthcareEntry })> = ({ entry }) => {
    return (
        <div>
            <MedicalInformationIcon />{' '} {entry.employerName}<br />
            <b>{entry.date}</b><br />
            <i>{entry.description}</i><br />
            { entryInfo(entry) }
        </div>
    );
};

export const Hospital: React.FC<({ entry: HospitalEntry})> = ({ entry }) => {
    return (
        <div>
            <LocalHospitalIcon /><br />
            <b>{entry.discharge.date}</b>: {entry.discharge.criteria}<br />
            <i>{entry.description}</i><br />
            { entryInfo(entry) }
        </div>
    );
};