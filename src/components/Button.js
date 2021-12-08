import React from "react";
import classNames from "classnames"; //utility to join classNames together

import "components/Button.scss";

export default function Button(props) {
   //appends a class to the button if a prop's value is true, using classNames utility
   const buttonClass = classNames(
      'button', {
      'button--confirm': props.confirm,
      'button--danger': props.danger
      });


   return <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>;
}
