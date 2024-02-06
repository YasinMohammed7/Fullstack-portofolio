import React from "react";

const Experience = ({ year, job, company }) => {
  return (
    <div>
      <p>{year}</p>
      <h3>{job}</h3>
      <p>{company}</p>
    </div>
  );
};

export default Experience;
