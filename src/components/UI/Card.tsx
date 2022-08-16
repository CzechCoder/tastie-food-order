import React from "react";
import { ChildrenProps } from "../../types";
import classes from "./Card.module.css";

const Card = ({ children }: ChildrenProps) => {
  return <div className={classes.card}>{children}</div>;
};

export default Card;
