import React, { createRef, forwardRef } from "react";
import { IMaskInput } from "react-imask";

const MaskedTextField = forwardRef(
  ({ id, onChange, mask, ...other }, inputRef) => {
    const ref = createRef();

    return (
      <IMaskInput
        {...other}
        style={{
          padding: "10px",
          fontSize: "16px",
          marginBottom: "15px",
          backgroundColor: "#303030",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
        id={id}
        inputRef={inputRef}
        ref={ref}
        mask={mask}
        onAccept={(value) => {
          onChange({ target: { name: other.name, value } });
        }}
      />
    );
  }
);

export default MaskedTextField;
