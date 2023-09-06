import { useMatch } from 'react-router-dom';
import { Link } from "react-router-dom";

export const Tabs = () => {

    const isHomeRoute = useMatch("/")
    const isClipsRoute = useMatch("/clips")
    const isUploadRoute = useMatch("/upload")

    return (
        <div className="mt-2 flex flex-col items-center">
            <div className="">
                <div className="tab">
                    {isClipsRoute || isHomeRoute 
                        ? <Link className="tab tab-bordered tab-active" to="/clips">Clips</Link> 
                        : <Link className="tab tab-bordered" to="/clips">Clips</Link> 
                    }
                    {isUploadRoute 
                        ? <Link className="tab tab-bordered tab-active" to="/upload">Upload</Link> 
                        : <Link className="tab tab-bordered" to="/upload">Upload</Link> 
                    }
                </div>
            </div>
        </div>
    )
}
