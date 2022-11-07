/* eslint-disable no-unused-labels */
import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "FETCH_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "FETCH_PATIENT":
      console.log(action.payload);
      return {
        ...state,
        [action.payload.id]: action.payload

      };
    default:
      return state;
  }
};

export const setFetchPatient = (patient: Patient): Action => {
  return { type: 'FETCH_PATIENT', payload: patient};
};
