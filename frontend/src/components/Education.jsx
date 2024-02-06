import React from "react";

const Education = ({ year, school, degree }) => {
  return (
    <div>
      <div>
        <p>{year}</p>
        <h3>{school}</h3>
        <p>{degree}</p>
      </div>
    </div>
  );
};

export default Education;
