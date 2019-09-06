import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Card from "./components/Card/Card";
import DownloadTemplate from "./components/DownloadTemplate/DownloadTemplate";
import Loading from "./components/Loading/Loading";
import { useQuery } from "@apollo/react-hooks";
import { TRANSLATION_CREATED, TRANSLATIONS_QUERY } from "./graphql/translations";

function App() {
  const [download, setDownload] = useState(null);
  const { data, loading, subscribeToMore } = useQuery(TRANSLATIONS_QUERY);
  const translations = data ? (data.translations || []) : [];
  subscribeToMore({
    document: TRANSLATION_CREATED,
    updateQuery: (prev, { subscriptionData }) => {
        if(!subscriptionData.data) return prev;
        const { translationCreated } = subscriptionData.data;
        return translationCreated && !prev.translations.find(({id}) => id === translationCreated.id)
          ? {
            ...prev,
            translations: [translationCreated, ...prev.translations],
          }
          : prev;
    }
  });
  return (
    <div className="App">
      <Nav/>
      <div className="List">
        {translations.map((translation) => (
          <Card onClick={setDownload} key={translation.id} translation={translation} />
        ))}
      </div>
      {(download || loading) && (
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
    </div>
  );
}

export default App;
