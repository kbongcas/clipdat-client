import Prototypes from 'prop-types'
import CopyToClipboardButton from "../components/Buttons/CopyToClipboardButton"
import DownloadButton from '../components/Buttons/DownloadButton';

/* */
const SingleClip = ({name, description, url, onBack}) => {
    
    return (
        <div className="flex flex-col items-center">
            <button 
            onClick={() => onBack()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
            <article className="max-w-md mt-5 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm" >
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
                <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        {name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-md/relaxed text-gray-500">
                        {description}
                    </p>
                    <div className="flex justify-between items-center text-gray-400">
                        <span className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                            Gif by Kevin
                        </span>
                        <div className="flex justify-between items-center text-gray-400">
                            <CopyToClipboardButton url={url} />
                            <DownloadButton url={url} />
                        </div>
                    </div>
                </div>
            </article >
        </div>
    )
}

SingleClip.propTypes = { 
    name: Prototypes.string,
    description: Prototypes.string,
    url: Prototypes.string,
    onBack: Prototypes.func
};

export default SingleClip