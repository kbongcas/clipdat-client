export const LoadingClip = () => {
    return (
        <article className="card card-compact min-w-min bg-base-100 shadow-xl overflow-hidden">
            <div className="flex items-center justify-center w-full h-48 bg-base-300 rounded">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
            <div className="p-2">
                <div className="h-2.5 bg-base-300 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-base-300 rounded-full max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-base-300 rounded-full mb-2.5"></div>
                <div className="flex justify-between items-center text-gray-400">
                    <span className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        <div className="h-2.5 bg-base-300 rounded-full w-24"></div>
                    </span>
                </div>
            </div>
        </article>
    )
}

export default LoadingClip;