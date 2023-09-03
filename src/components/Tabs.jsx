import { useMatch } from 'react-router-dom';

export const Tabs = () => {

    const isClipsRoute = useMatch("/clips")
    const isUploadRoute = useMatch("/upload")

    return (
        <div className="mt-2 flex flex-col items-center">
            <div className="">
                <div className="tab">
                    {isClipsRoute 
                        ? <a className="tab tab-lifted tab-active" href="/clips">Clips</a> 
                        : <a className="tab tab-lifted" href="/clips">Clips</a> 
                    }
                    {isUploadRoute 
                        ? <a className="tab tab-lifted tab-active" href="/upload">Upload</a> 
                        : <a className="tab tab-lifted" href="/upload">Upload</a> 
                    }
                </div>
            </div>
        </div>
    )
}
