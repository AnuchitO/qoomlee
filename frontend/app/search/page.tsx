import SearchForm from '@/components/SearchForm';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Search Flights</h1>

          <SearchForm />

          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <h3 className="font-medium text-gray-900">Bangkok</h3>
                <p className="text-gray-600">From $299</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <h3 className="font-medium text-gray-900">Singapore</h3>
                <p className="text-gray-600">From $349</p>
              </div>
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <h3 className="font-medium text-gray-900">Tokyo</h3>
                <p className="text-gray-600">From $599</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}