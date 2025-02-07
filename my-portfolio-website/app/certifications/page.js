export default function CertificationsPage() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600">Certifications</h1>
      <p className="mt-4 text-lg text-gray-700">
        Here are some of my certifications.
      </p>

      {/* Placeholder for certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">Certification 1</h2>
          <p className="text-gray-600">Issued by XYZ</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold">Certification 2</h2>
          <p className="text-gray-600">Issued by ABC</p>
        </div>
      </div>
    </section>
  );
}
