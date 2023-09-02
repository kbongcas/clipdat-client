import { useState } from "react";
import { clipUploaderService } from "../services/clipUploaderService";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";

const audience = import.meta.env.VITE_AUTH0_AUDIENCE

const Upload = () => {

    const navigate = useNavigate()
    const {getAccessTokenSilently } = useAuth0();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('')
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');


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
        clipUploaderService.uploadClip(token,file,name, desc, true, uploadProgressHandler)
        .then( (result) => {
            console.log('uploader result')
            console.log(result)
            navigate("/clips")
            console.log("hwllo")
        }).finally( result => {
            setUploadProgress(0);
            setUploading(0);
            console.log(result)
            navigate("/clips")
            console.log("savigage")
        })
    }

    const onChange = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    return (
        <div className="bg-base-100 mx-auto max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <div className="bg-base-100 py-20 h-screen bg-gray-300 px-2">
                <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
                    <div className="md:flex">
                        <div className="w-full">

                            <div className="p-4 border-b-2">
                                <span className="text-lg font-bold text-gray-600">Upload a clip!</span>
                            </div>

                            <div className="p-3">
                                <div className="mb-2">
                                    <div>
                                        <label htmlFor="OrderNotes" className="block text-sm font-medium text-gray-700">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="mt-1 h-9 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                                            placeholder="Add a title"
                                            onInput={(e) => setName(e.target.value)}
                                        />
                                        <label htmlFor="OrderNotes" className="mt-4 block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <textarea
                                            id="OrderNotes"
                                            className="mt-1 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                                            rows="4"
                                            placeholder="Add a description."
                                            onInput={(e) => setDesc(e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    {filename != '' && <span
                                        className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-sm text-purple-700"
                                    >
                                        {filename}
                                    </span>
                                    }
                                    <div className="mt-2 relative h-20 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
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
                                            accept=".mp4"
                                        />
                                    </div>
                                    <div className="flex justify-between items-center text-gray-400">
                                        <span>Accepted file type: .mp4 only</span>
                                    </div>
                                </div>
                                <div className="mt-3 text-center pb-3">
                                    {uploadProgress < 99 ? (!uploading ?
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
                                                    style={{ "width": `${uploadProgress}%` }}
                                                >
                                                </span>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center">
                                            <div role="status">
                                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload