import React from 'react';
import { CoursePart } from '../types';

const Total: React.FC<{ total: CoursePart[] }> = ({ total }) => {
  return (
    <div>
      <p>
        # of exercises{' '}
        {total.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};

export default Total;
