"use client";
import Header from "@/components/Header";
import UrlForm from "@/components/UrlForm";

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
          <UrlForm
            handleSubmit={handleSubmit}
            url={url}
            setUrl={setUrl}
            loading={loading}
          />
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
