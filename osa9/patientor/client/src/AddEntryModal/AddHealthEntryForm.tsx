import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, SelectHealthField, HealthOption } from "./FormField";
import { HealthCheckEntry, HealthCheckRating } from '../types';
import { useStateValue } from "../state";

export type HealthEntryFormValues = Omit<HealthCheckEntry, 'id'>;

export interface Props {
    onSubmit: (values: HealthEntryFormValues) => void;
    onCancel: () => void;
}

const healthCheckOptions: HealthOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "LowRisk" },
    { value: HealthCheckRating.HighRisk, label: "HighRisk" },
    { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
  ];

const AddHealthEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosisList }] = useStateValue();
  
    return (
      <Formik
        initialValues={{
          description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.LowRisk,
        type: "HealthCheck",
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          return errors;
        }}
      >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
  
        return (
          <Form className="form ui">
            <Field label="Description"
              placeholder="Description"
              name="description"
              component={TextField} />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date of Visit"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosisList)}
            />

            <SelectHealthField label="Healthcheck rating" name="healthCheckRating" options={healthCheckOptions} />
            <Grid>
              <Grid item>
                <Button color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}>
                  Add entry
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
    );
  };

  export default AddHealthEntryForm;