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
                </div>

            </button>
            <div className="card-body">
                <h2 className="card-title break-all"> {name} </h2>
                <p>{ description } </p>
                <div className="card-actions justify-end">
                    {url ?
                        (<div className="flex justify-between items-center text-gray-400">
                            <CopyToClipboardButton url={url} />
                            <DownloadButton url={url} />
                        </div>) :
                        (<div className="badge badge-outline badge-warning gap-2">
                            pending...
                        </div>)
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