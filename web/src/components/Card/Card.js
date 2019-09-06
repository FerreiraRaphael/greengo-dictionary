import React from "react";
import Template from "../Template/Template";
import "./Card.css";

export default function Card({ translation, onClick }) {
  return (
    <button
      onClick={e => onClick(translation)}
      className="Card"
    >
      <p style={{ color: "#002776" }}>@{translation.userName}</p>
      <Template
        height={260}
        translation={translation.translation}
        description={translation.description}
        phrase={translation.phrase}
        type={translation.type}
        small
      />
    </button>
  );
}
