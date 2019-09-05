import React, { Fragment, useState } from "react";
import Modal from "react-responsive-modal";
import CreateForm from "./CreateForm";
import "./CreateTemplate.css";
import DownloadTemplate from "../DownloadTemplate/DownloadTemplate";
import Loading from "../Loading/Loading";

export default function CreateTemplate() {
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState(null);
  async function onCreate(values) {
    await Promise.resolve(values);
    setOpen(false);
    setDownload(values);
  }
  return (
    <Fragment>
      <button className="CreateTemplate" onClick={() => setOpen(true)}>
        Criar
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <CreateForm onSubmit={onCreate} />
      </Modal>
      {download && (
        <Loading/>
      )}
      {download && (
        <DownloadTemplate
          onClose={() => setDownload(null)}
          onDownload={() => setDownload(null)}
          userName={download.username}
          description={download.description}
          type={download.type}
          phrase={download.phrase}
          translation={download.translation}
        />
      )}
    </Fragment>
  );
}
