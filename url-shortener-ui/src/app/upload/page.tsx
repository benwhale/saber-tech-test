import Header from "@/components/Header";
import FileUploadForm from "@/components/UploadForm";

export default function Upload() {
  return (
    <>
      <Header title="Upload File" />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <FileUploadForm />
        </div>
      </main>
    </>
  );
}
