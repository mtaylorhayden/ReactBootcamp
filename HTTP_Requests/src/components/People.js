import React from "react";

import classes from "./People.module.css";

const People = (props) => {
  return (
    <li className={classes.people}>
      <h2>Name: {props.name}</h2>
      <h3>Height: {props.height}</h3>
      <h3>Weight: {props.weight}</h3>
    </li>
  );
};

export default People;
