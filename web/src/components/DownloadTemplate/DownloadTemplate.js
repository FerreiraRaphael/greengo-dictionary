import React, { Fragment, useState, useEffect } from "react";
import propTypes from "prop-types";
import * as htmlToImage from 'html-to-image';
import "./DownloadTemplate.css";
import Template from "../Template/Template";
import Modal from "react-responsive-modal";

function saveAs(uri, filename) {
  var link = document.createElement("a");

  if (typeof link.download === "string") {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}

export default function DownloadTemplate({ onClose, onDownload, phrase, type, description, translation, userName }) {
  const [open, setOpen] = useState(false);
  const [uri, setUri] = useState(null);
  useEffect(() => {
    htmlToImage.toCanvas(document.querySelector(".DownloadTemplate"), { style: { opacity: 1 } }).then(canvas => {
      setOpen(true);
      const img = document.createElement("img");
      setUri(canvas.toDataURL());
      img.src = canvas.toDataURL();
      img.style.width = "100%";
      img.style.height = "auto";
      document.querySelector(".show-template").innerHTML = "";
      document.querySelector(".show-template").appendChild(img);
    });
  }, []);
  return (
    <Fragment>
      <div className="DownloadTemplate">
        <Template userName={userName} translation={translation} description={description} phrase={phrase} type={type} />
      </div>
      <Modal
        center
        open={open}
        onClose={() => {
          onClose();
          setOpen(false);
        }}
      >
        <div className="show-template"></div>
        <button
          className="DownloadButton"
          onClick={() => {
            saveAs(uri, phrase + ".jpeg");
            onDownload();
            setOpen(false);
          }}
        >
          baixar !
        </button>
      </Modal>
    </Fragment>
  );
}

DownloadTemplate.defaultProps = {
  onClose: () => {},
}

DownloadTemplate.propTypes = {
  onDownload: propTypes.func.isRequired,
  onClose: propTypes.func,
  phrase: propTypes.string.isRequired,
  type: propTypes.oneOf(["exp", "n", "adj", "prov", "quo", "v"]).isRequired,
  description: propTypes.string.isRequired,
  translation: propTypes.string.isRequired,
  userName: propTypes.string.isRequired
};
