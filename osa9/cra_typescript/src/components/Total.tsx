import React from 'react';

const Total: React.FC<{ total: number }> = ({ total }) => (
  <p># of exercises {total}</p>
);

export default Total;
