import React from "react";

import People from "./People";
import classes from "./MoviesList.module.css";

const PeopleList = (props) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.people.map((people) => (
        <People
          key={people.id}
          name={people.name}
          weight={people.weight}
          height={people.height}
        />
      ))}
    </ul>
  );
};

export default PeopleList;
