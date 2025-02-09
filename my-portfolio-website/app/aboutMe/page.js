export default function AboutMePage() {
  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600">About Me</h1>
      <p className="mt-4 text-lg text-gray-700">Here are my educational qualifications:</p>

      <div className="mt-6 space-y-4">
        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold text-gray-800">📚 10th Grade</h2>
          <p className="text-gray-600">School: [Your School Name]</p>
          <p className="text-gray-600">Board: [Your Board Name]</p>
          <p className="text-gray-600">Percentage: [Your Score]%</p>
        </div>

        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold text-gray-800">📖 12th Grade</h2>
          <p className="text-gray-600">School: [Your School Name]</p>
          <p className="text-gray-600">Board: [Your Board Name]</p>
          <p className="text-gray-600">Percentage: [Your Score]%</p>
        </div>

        <div className="p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold text-gray-800">🎓 College</h2>
          <p className="text-gray-600">Institution: [Your College Name]</p>
          <p className="text-gray-600">Degree: [Your Degree Name]</p>
          <p className="text-gray-600">CGPA: [Your Score]</p>
        </div>
      </div>
    </section>
  );
}
