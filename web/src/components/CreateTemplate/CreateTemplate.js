import React, { Fragment, useState } from "react";
import Modal from "react-responsive-modal";
import CreateForm from "./CreateForm";
import "./CreateTemplate.css";
import DownloadTemplate from "../DownloadTemplate/DownloadTemplate";
import Loading from "../Loading/Loading";
import {useMutation} from "@apollo/react-hooks";
import { CREATE_TRANSLATION } from "../../graphql/translations";

export default function CreateTemplate() {
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState(null);
  const [createTranslations, { loading }] = useMutation(CREATE_TRANSLATION);
  async function onCreate(input) {
    await createTranslations({ variables: { input }});
    setOpen(false);
    setDownload(input);
  }
  return (
    <Fragment>
      <button className="CreateTemplate" onClick={() => setOpen(true)}>
        Criar
      </button>
      <Modal style={{ zIndex: 900 }} open={open} onClose={() => setOpen(false)}>
        <CreateForm onSubmit={onCreate} />
        { loading && <Loading/> }
      </Modal>
      {(download) && (
        <Loading/>
      )}
      {download && (
        <DownloadTemplate
          onClose={() => setDownload(null)}
          onDownload={() => setDownload(null)}
          userName={download.userName}
          description={download.description}
          type={download.type}
          phrase={download.phrase}
          translation={download.translation}
        />
      )}
    </Fragment>
  );
}
