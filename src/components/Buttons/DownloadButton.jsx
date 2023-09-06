import Prototypes from 'prop-types'

const DownloadButton = ({ url }) => {
    return (
        <button>
            <a
                title="Download file."
                href={url} download>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="ml-2 mr-1 w-6 h-6 fill-none hover:text-neutral">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            </a>
        </button>
    )
}

DownloadButton.propTypes = { url: Prototypes.string };

export default DownloadButton