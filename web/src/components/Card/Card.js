import React, { useState } from "react";
import Template from "../Template/Template";
import "./Card.css";
import DownloadTemplate from "../DownloadTemplate/DownloadTemplate";

export default function Card({ translation, onClick }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={e => onClick(translation)}
      className="Card"
    >
      <p style={{ color: "#002776" }}>@{translation.username}</p>
      <Template
        height={260}
        translation={translation.translation}
        description={translation.description}
        phrase={translation.phrase}
        type={translation.type}
        small
      />
      {open && (
        <DownloadTemplate
          onClose={() => setOpen(false)}
          onDownload={() => setOpen(false)}
          userName={translation.username}
          description={translation.description}
          type={translation.type}
          phrase={translation.phrase}
          translation={translation.translation}
        />
      )}
    </button>
  );
}
