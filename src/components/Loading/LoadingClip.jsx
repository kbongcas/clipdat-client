export const LoadingClip = () => {
    return (
        <article className="card card-compact min-w-min bg-base-100 shadow-xl overflow-hidden">
            <div className="flex items-center justify-center w-full h-48 bg-base-300 rounded">
                <svg className="w-10 h-10 text-base-200 animate-pulse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
            <div className="p-2">
                <div className="h-2.5 bg-base-200 rounded-full w-48 mb-4 animate-pulse"></div>
                <div className="h-2 bg-base-200 rounded-full max-w-[480px] mb-2.5 animate-pulse"></div>
                <div className="h-2 bg-base-200 rounded-full mb-2.5 animate-pulse"></div>
                <div className="flex justify-between items-center text-gray-400 animate-pulse">
                    <span className="mt-2 line-clamp-3 text-sm/relaxed text-gray-200 animate-pulse">
                        <div className="h-2.5 bg-base-200 rounded-full w-24 animate-pulse"></div>
                    </span>
                </div>
            </div>
        </article>
    )
}

export default LoadingClip;