import React from "react";

function Input(props) {
  return (
    <input
      {...props}
      type={props.type}
      placeholder={props.placeholder}
      value={props.input}
      onChange={props.onChange}
      className={props.className}
      width={props.width}
      height={props.height}
      readOnly={props.readOnly}
      maxLength={props.maxLength}
      minLength={props.minLength}
    />
  )
}

export default Input;