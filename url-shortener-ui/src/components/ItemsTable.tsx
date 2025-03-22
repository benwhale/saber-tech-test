"use client";
import { useItems } from "@/hooks/useItems";

export default function ItemsTable() {
  const { items, loading, error } = useItems();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Type
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Name/URL
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Short URL
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Created
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr key={item.slug}>
            <td className="px-6 py-4 text-sm text-gray-500">
              {item.type === "url" ? "🔗 Link" : "📄 File"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
              {item.type === "url" ? item.url : item.filename}
            </td>
            <td className="px-6 py-4 text-sm text-blue-600">
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                /{item.slug}
              </a>
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {new Date(item.created_at).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
