import React from "react";

function Text(props) {
  return (
    <p {...props} style={props.style} className={props.className}>
      {props.children}
    </p>
  )
}



export default Text;