import React, { useState } from "react";
import UrlShortenerForm from "./components/UrlShortenerForm";
import UrlList from "./components/UrlList";
import StatsPage from "./components/StatsPage";
import "./App.css";

function App() {
  const [view, setView] = useState<"shorten" | "stats">("shorten");

  return (
    <div className="app-container">
      <h1 className="app-title">🚀 React URL Shortener</h1>

      <div className="nav-buttons">
        <button
          className={view === "shorten" ? "active" : ""}
          onClick={() => setView("shorten")}
        >
          Shorten URLs
        </button>
        <button
          className={view === "stats" ? "active" : ""}
          onClick={() => setView("stats")}
        >
          View Stats
        </button>
      </div>

      <div className="content">
        {view === "shorten" ? (
          <>
            <UrlShortenerForm />
            <UrlList />
          </>
        ) : (
          <StatsPage />
        )}
      </div>
    </div>
  );
}

export default App;
