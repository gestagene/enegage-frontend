export default function FeedSkeleton() {
  return (
    <>
      <div className="relative sm:mx-6 sm: my-2">
        <div className="relative sm:w-175 text-justify px-2 pb-2 bg-gray-100 rounded-lg">
          <div className="animate-pulse flex items-center space-x-3 px-2 pt-2 w-full">
            <span className="rounded-4xl w-8 h-8 bg-gray-200/75"></span>
            <span className="rounded-sm w-16 h-3 bg-gray-200/75"></span>
            <span className="rounded-sm w-16 h-3 bg-gray-200/75"></span>
            <span className="rounded-sm w-1/4 h-3 bg-gray-200/75"></span>
          </div>
          <div className="px-2 py-2 text-sm w-full space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-200/75 h-2 w-full animate-pulse rounded-md"
              ></div>
            ))}
          </div>
          <div className="animate-pulse flex space-x-2 px-2 py-1">
            <div className="py-1 px-1 bg-gray-200/75 rounded-full h-2 w-15 "></div>
            <div className="py-1 px-1 bg-gray-200/75 rounded-full h-2 w-8 "></div>
          </div>
        </div>
      </div>
    </>
  );
}
