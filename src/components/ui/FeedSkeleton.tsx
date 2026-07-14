export default function FeedSkeleton() {
  return (
    <div>
      <div className="min-w-150 grow shrink flex-1 text-justify px-2 pb-2 bg-gray-100/50 rounded-lg">
        <div className="animate-pulse flex items-center space-x-3 px-2 pt-2 w-full">
          <span className="rounded-4xl w-9 h-9 bg-gray-300"></span>
          <span className="rounded-sm w-16 h-2.5 bg-gray-300"></span>
          <span className="rounded-sm w-16 h-2.5 bg-gray-300"></span>
          <span className="rounded-sm w-1/4 h-2.5 bg-gray-300"></span>
        </div>
        <div className="px-2 py-2 text-sm w-full space-y-3 mb-10">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 h-2.5 w-full animate-pulse rounded-full"
            ></div>
          ))}
        </div>
        <div className="animate-pulse flex space-x-2 px-2 py-1 mb-3">
          <div className="py-1 px-1 bg-gray-300 rounded-full h-2.5 w-15 "></div>
          <div className="py-1 px-1 bg-gray-300 rounded-full h-2.5 w-8 "></div>
        </div>
      </div>
    </div>
  );
}
