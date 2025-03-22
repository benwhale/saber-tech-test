import Header from "@/components/Header";
import ItemsTable from "@/components/ItemsTable";

export default function History() {
  return (
    <>
      <Header title="History" />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <ItemsTable />
        </div>
      </main>
    </>
  );
}
