export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-lg mx-auto px-4">
        {/* Header skeleton */}
        <div className="h-8 bg-gray-200 rounded-md w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        
        {/* Recording interface skeleton */}
        <div className="bg-surface rounded-lg p-6 shadow-card space-y-4">
          <div className="h-24 bg-gray-200 rounded-full w-24 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
        
        {/* Recent recordings skeleton */}
        <div className="space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-surface rounded-lg p-4 shadow-card">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
