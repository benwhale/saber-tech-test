import React from "react";

interface UrlFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
}

export default function UrlForm(props: UrlFormProps) {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <input
          type="url"
          value={props.url}
          onChange={(e) => props.setUrl(e.target.value)}
          required
          placeholder="Enter URL to shorten"
          className="w-80 rounded-md border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={props.loading}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
        >
          {props.loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
    </>
  );
}
