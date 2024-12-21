import CertificateForm from "./components/forms/certificate-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Certificate Generator</h1>
          <p className="text-lg text-gray-600">Generate and send professional certificates with ease</p>
        </div>
        <CertificateForm />
      </div>
    </main>
  );
}