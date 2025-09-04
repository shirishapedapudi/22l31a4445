import React, { useState } from "react";

interface Url {
  longUrl: string;
  shortUrl: string;
}

const UrlShortenerForm: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [urls, setUrls] = useState<Url[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl) return;

    const shortUrl = `short.ly/${shortCode || Math.random().toString(36).substr(2, 6)}`;
    setUrls([...urls, { longUrl, shortUrl }]);

    setLongUrl("");
    setShortCode("");
  };

  return (
    <div className="form-container">
      <h2>Shorten a New URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Custom shortcode (optional)"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      <div className="urls-list">
        <h3>Shortened URLs</h3>
        {urls.length === 0 ? (
          <p>No URLs yet.</p>
        ) : (
          <ul>
            {urls.map((u, i) => (
              <li key={i}>
                <a href={u.longUrl} target="_blank" rel="noreferrer">
                  {u.shortUrl}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UrlShortenerForm;
