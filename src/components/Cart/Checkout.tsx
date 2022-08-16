import React, { useRef, useState } from "react";
import { CheckoutProps } from "../../types";
import classes from "./Checkout.module.css";

// validation functions
const isEmpty = (value: string) => value.trim() === "";
const isFiveChars = (value: string) => value.toString().length === 5;

const Checkout = (props: CheckoutProps) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  // useRef into variables
  const nameInputRef: React.LegacyRef<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const streetInputRef: React.LegacyRef<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const postalCodeInputRef: React.LegacyRef<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const cityInputRef: React.LegacyRef<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const confirmHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // extract values from inputs
    const enteredName = nameInputRef.current!.value;
    const enteredStreet = streetInputRef.current!.value;
    const enteredPostalCode = postalCodeInputRef.current!.value;
    const enteredCity = cityInputRef.current!.value;

    // check values
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    // assign boolean results to values
    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    // this value indicates whether all inputs passed the check
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    // if form is not valid, process ends here
    if (!formIsValid) {
      return;
    }

    // confirm order and store values
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  // displaced classes for better code readability
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="number"
          id="postal"
          ref={postalCodeInputRef}
          className={classes["no-spin"]}
        />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button
          type="button"
          onClick={props.onCancel}
          className={classes["button--alt"]}
        >
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
