import CopyToClipboardButton from "./Buttons/CopyToClipboardButton"
import DownloadButton from "./Buttons/DownloadButton"
import Prototypes from 'prop-types'


const Clip = ({ index, url, name, description, onSelect }) => {

    return (
        <article className="card card-compact min-w-min bg-base-100 shadow-xl overflow-hidden">
            <button
                onClick={() => onSelect(index)}
            >
                <div className="relative">
                    <img
                        alt="clip"
                        src={url ? url : "https://media.giphy.com/media/myPdoRAlad0J2/giphy.gif"}
                        className="h-56 w-full object-cover shadow-sm"
                    />
                    {!url &&
                        <p className="absolute top-2 text-lg/relaxed text-black bg-gray-200 ">
                            Your Clip is still Converting...
                        </p>
                    }
                </div>

            </button>
            <div className="p-2">
                <h3 className="text-lg font-medium text-gray-900">
                    { name }
                </h3>
                <p className="mt-1 line-clamp-3 text-md/relaxed text-gray-500">
                    { description }
                </p>
                <div className="flex justify-between items-center text-gray-400">
                    <span className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    </span>
                    {url &&
                    <div className="flex justify-between items-center text-gray-400">
                        <CopyToClipboardButton url={url} />
                        <DownloadButton url={url} />
                    </div>
                    }
                </div>
            </div>
        </article>
    )
}

Clip.propTypes = { 
    index: Prototypes.number,
    url: Prototypes.string,
    name: Prototypes.string,
    description: Prototypes.string,
    onSelect: Prototypes.func
 };

export default Clip