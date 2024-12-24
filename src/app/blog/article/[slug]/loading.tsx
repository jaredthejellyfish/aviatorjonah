export default function Loading() {
    return (
      <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>
        <div className="h-8 w-3/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>
        <div className="h-96 bg-gray-300 rounded mb-8"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    )
  }
  