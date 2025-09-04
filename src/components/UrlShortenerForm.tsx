import React, { useState } from "react";

interface Url {
  id: string;
  longUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: number;
  expiresAt: number;
  clicks: number;
  source: string;
  location: string;
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const UrlShortenerForm: React.FC = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [validity, setValidity] = useState(60); // minutes, default 60
  const [urls, setUrls] = useState<Url[]>([]);
  const [error, setError] = useState("");

  const generateShortCode = (): string => {
    return Math.random().toString(36).substring(2, 8);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (urls.length >= 5) {
      setError("Maximum 5 URLs allowed.");
      return;
    }

    if (!isValidUrl(longUrl)) {
      setError("Please enter a valid URL.");
      return;
    }

    if (shortCode && urls.some((u) => u.shortCode === shortCode)) {
      setError("Custom shortcode already used. Choose another one.");
      return;
    }

    const code = shortCode || generateShortCode();
    const now = Date.now();
    const expiry = now + validity * 60 * 1000; // validity in milliseconds

    const newUrl: Url = {
      id: `${now}-${code}`,
      longUrl,
      shortCode: code,
      shortUrl: `short.ly/${code}`,
      createdAt: now,
      expiresAt: expiry,
      clicks: 0,
      source: "Chrome", // Simulated
      location: "India", // Simulated
    };

    setUrls([...urls, newUrl]);
    setLongUrl("");
    setShortCode("");
    setValidity(60);
  };

  const handleLinkClick = (id: string) => {
    setUrls((prevUrls) =>
      prevUrls.map((url) =>
        url.id === id ? { ...url, clicks: url.clicks + 1 } : url
      )
    );
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
        <input
          type="number"
          min={1}
          max={1440}
          value={validity}
          onChange={(e) => setValidity(Number(e.target.value))}
          placeholder="Validity (minutes)"
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="urls-list">
        <h3>Shortened URLs</h3>
        {urls.length === 0 ? (
          <p>No URLs yet.</p>
        ) : (
          <ul>
            {urls.map((u) => (
              <li key={u.id}>
                <a
                  href={u.longUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => handleLinkClick(u.id)}
                  style={{ textDecoration: u.expiresAt < Date.now() ? "line-through" : "none" }}
                  title={`Expires at: ${new Date(u.expiresAt).toLocaleString()}`}
                >
                  {u.shortUrl}
                </a>
                {" — "}
                <small>
                  Clicks: {u.clicks} | Created: {new Date(u.createdAt).toLocaleString()} | Source:{" "}
                  {u.source} | Location: {u.location} | Valid for: {validity} mins
                </small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UrlShortenerForm;
