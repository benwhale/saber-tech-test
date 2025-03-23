"use client";
import { useItems } from "@/hooks/useItems";

export default function ItemsTable() {
  const { items, loading, error } = useItems();

  if (loading)
    return (
      <div>Loading...</div>
    ); /** TODO with more time would be great to use Suspense */
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Type
            </th>
            <th className="w-1/2 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name/URL
            </th>
            <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Short URL
            </th>
            <th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.slug}>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {item.type === "url" ? "Link" : "File"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 break-all">
                {item.type === "url" ? item.url : item.filename}
              </td>
              <td className="px-6 py-4 text-sm text-blue-600 whitespace-nowrap">
                {/* This is a bit of a hack to get the full URL.
                I didn't want to store the full URL in the db in case the location of the API changes.
                As long as we aren't dealing with unreasonable amounts of data, we could map it in the dynamodb response handling and populate a field with the full URL.
                It works for today though. */}
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}${item.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /{item.slug}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {new Date(item.created_at).toLocaleString("en-GB")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
