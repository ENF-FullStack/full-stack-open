import React, { Fragment } from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );
    case 'special':
      return (
        <div>
          <p>
            <b>
              {part.name}
              {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          <p>
            Required skills:
            {part.requirements.map((e) => (
              <Fragment key={e}>
                {' '}
                <b>{e}</b>
              </Fragment>
            ))}
          </p>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          <p>
            <b>
              {part.name}
              {part.exerciseCount}
            </b>
          </p>
          <p>groupProjectCount {part.groupProjectCount}</p>
        </div>
      );
    case 'submission':
      return (
        <div>
          <p>
            <b>
              {part.name}
              {part.exerciseCount}
            </b>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
          Submit: <a href={part.exerciseSubmissionLink}>Link</a>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
