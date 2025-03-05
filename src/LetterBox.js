import React from "react";

const LetterBox = ({ letter, isVisible }) => {
  return (
    <span 
      style={{
        display: "inline-block",
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        textAlign: "center",
        margin: "5px",
        fontSize: "24px",
        fontWeight: "bold",
        backgroundColor: isVisible ? "lightgreen" : "lightgray",
        color: isVisible ? "black" : "white",
        borderRadius: "5px",
        border: "2px solid black"
      }}
    >
      {isVisible ? letter : "_"}
    </span>
  );
};

export default LetterBox;
