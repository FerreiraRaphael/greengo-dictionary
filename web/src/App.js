import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Card from "./components/Card/Card";
import DownloadTemplate from "./components/DownloadTemplate/DownloadTemplate";
import Loading from "./components/Loading/Loading";

const translations = [
  {
    phrase: "I woke up and I don't recommend it",
    translation: "acordei e não recomendo",
    type: "exp",
    username: "diniz",
    description: "a sentence that express lack of motivation to start a day."
  },
  {
    phrase: "big shoe",
    translation: "sapatão",
    type: "exp",
    username: "caju",
    description: "affectionate slang for \"lesbian\" that should be used by friends only."
  },
  {
    phrase: "the dog sucking on mango",
    translation: "o cão chupando manga",
    type: "exp",
    username: "raphael",
    description: "traditionally considered something ugly, when in fact it's actually cute."
  },
  {
    phrase: "dead with farofa",
    translation: "morto com farofa",
    type: "exp",
    username: "diniz",
    description: "typical Brazilian recipe made with toasted flour crumbs."
  },
  {
    phrase: "full of 9 o'clock",
    translation: "cheio de 9 horas",
    type: "adj",
    username: "diniz",
    description: "a fussy person who has too many demands or pet peeves."
  },
  {
    phrase: "day yes, day no",
    translation: "dia sim, dia não",
    type: "exp",
    username: "diniz",
    description: "an unfortunate comment by Brazil's president Pocketnaro suggesting that pooping only every other day helps preserving the environment."
  },
];

function App() {
  const [download, setDownload] = useState(null);
  return (
    <div className="App">
      <Nav/>
      <div className="List">
        {translations.map((translation) => (
          <Card onClick={setDownload} key={translation.username + translation.phrase} translation={translation} />
        ))}
      </div>
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
    </div>
  );
}

export default App;
