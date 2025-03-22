"use client";
import Header from "@/components/Header";

import { useUrls } from "@/hooks/useUrls";
import { useState } from "react";

export default function ShortenUrl() {
  const { shortenUrl, loading, error } = useUrls();
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await shortenUrl(url);
    // setShortUrl(result.shortUrl); // Would be nicer to provide the full URL
    setShortUrl(`${process.env.NEXT_PUBLIC_API_URL}/${result.slug}`);
  };

  return (
    <>
      <Header title="Shorten URL" />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to shorten"
              className="w-80 rounded-md border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </form>
          {error && <p className="text-red-500">{error}</p>}
          {shortUrl && (
            <p className="mt-4">
              Shortened URL:{" "}
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </p>
          )}
        </div>
      </main>
    </>
  );
}
