import React, { ForwardedRef } from "react";
import { InputProps } from "../../types";
import classes from "./Input.module.css";

const Input = React.forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement> | undefined) => {
    return (
      <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} />
      </div>
    );
  }
);

export default Input;
