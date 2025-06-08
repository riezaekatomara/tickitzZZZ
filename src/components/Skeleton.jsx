const Skeleton = ({ size }) => {
  return (
    <div className="group flex flex-col w-full max-w-sm mx-auto animate-pulse">
      {/* Poster Skeleton */}
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="w-full h-80 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 relative">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
          
          {/* Rating Badge Skeleton */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-2 bg-gray-300 rounded-full">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <div className="w-8 h-3 bg-gray-400 rounded"></div>
          </div>

          {/* Recommended Badge Skeleton */}
          <div className="absolute top-3 right-3 px-4 py-2 bg-gray-300 rounded-full">
            <div className="w-16 h-3 bg-gray-400 rounded"></div>
          </div>

          {/* Center Play Icon Skeleton */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Info Skeleton */}
      <div className="pt-4 space-y-3">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 rounded w-4/5"></div>
          <div className="h-5 bg-gray-300 rounded w-3/5"></div>
        </div>

        {/* Release Date Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>

        {/* Genres Skeleton */}
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 bg-gray-200 rounded-full">
            <div className="h-3 bg-gray-300 rounded w-12"></div>
          </div>
          <div className="px-3 py-1 bg-gray-200 rounded-full">
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
          <div className="px-3 py-1 bg-gray-200 rounded-full">
            <div className="h-3 bg-gray-300 rounded w-10"></div>
          </div>
        </div>

        {/* Rating Bar Skeleton */}
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div className="h-full bg-gray-300 rounded-full w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-12"></div>
        </div>
      </div>

      {/* Pulse Animation Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-xl"></div>
    </div>
  );
};

export default Skeleton;