import { useState } from "react";
import { clipUploaderService } from "../services/clipUploaderService";
import { useAuth0 } from '@auth0/auth0-react';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE

const Upload = () => {

    const {getAccessTokenSilently } = useAuth0();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('')

    const uploadProgressHandler = (progressEvent) => {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        console.log("progress " + percentCompleted)
        setUploadProgress(percentCompleted);
    }

    const attemptUpload = async (e) => {
        console.log('attemptUpload called')
        e.preventDefault();
        if (file === '') return;
        console.log('attemptUpload called and file found')
        var token = await getAccessTokenSilently(
            {
                authorizationParams: { audience: audience }
            })
        setUploading(true)
        setUploadProgress(0)
        console.log(token)
        console.log(file)
        clipUploaderService.uploadClip(token,file, uploadProgressHandler)
        .then( (result) => {
            console.log('uploader result')
            console.log(result.data)
        }).finally( result => {
            setUploadProgress(0);
            setUploading(0);
            console.log(result.data)
        })
    }

    const onChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    return (
        <div className="py-20 h-screen bg-gray-300 px-2">
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
                <div className="md:flex">
                    <div className="w-full">
                        <div className="p-4 border-b-2">
                            <span className="text-lg font-bold text-gray-600">Upload a clip!</span>
                        </div>
                        <div className="p-3">
                            <div className="mb-2">
                                <span className="text-sm">Title</span>
                                <input type="text" className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300" />
                            </div>
                            <div className="mb-2">
                                {filename != '' && <span
                                    className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700"
                                >
                                    {filename}
                                </span>
                                }
                                <div className="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                                    <div className="absolute">
                                        <div className="flex flex-col items-center ">
                                            <i className="fa fa-cloud-upload fa-3x text-gray-200"></i>
                                            <span className="block text-gray-400 font-normal">Drop your files here</span>
                                            <span className="block text-gray-400 font-normal">or</span>

                                            <span className="block text-blue-400 font-normal">Browse files</span>

                                        </div>
                                    </div> 
                                    <input 
                                        type="file" 
                                        className="h-full w-full opacity-0" 
                                        name="" 
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Accepted file type:.mp4 only</span>
                                    <span className="flex items-center "><i className="fa fa-lock mr-1"></i> secure</span>
                                </div>
                            </div>
                            <div className="mt-3 text-center pb-3">
                                {!uploading ? 
                                <button
                                    className="w-full h-12 text-lg w-32 bg-blue-600 rounded text-white hover:bg-blue-700"
                                    onClick={attemptUpload}
                                >
                                    Create
                                </button>
                                    :
                                    <div>
                                        <span id="ProgressLabel" className="sr-only">Loading</span>

                                        <span
                                            role="progressbar"
                                            aria-labelledby="ProgressLabel"
                                            aria-valuenow="75"
                                            className="block rounded-full bg-gray-200"
                                        >
                                            <span
                                                className="block h-3 rounded-full bg-indigo-600"
                                                style={ {"width": `${uploadProgress}%`}}
                                            >
                                            </span>
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload