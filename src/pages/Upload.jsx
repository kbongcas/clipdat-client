import { useState } from "react";
import { clipUploaderService } from "../services/clipUploaderService";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";

const audience = import.meta.env.VITE_AUTH0_AUDIENCE
const UploadState = {
    PreUpload: "preUpload",
    Uploading: "uploading",
    Processing: "processing",
    Success: "success",
    Failed: "failed",
}

const Upload = () => {

    const navigate = useNavigate()
    const { getAccessTokenSilently } = useAuth0();

    const [uploadProgress, setUploadProgress] = useState(0);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('')
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const [uploadState, setUploadState] = useState(UploadState.PreUpload);

    const uploadProgressHandler = (progressEvent) => {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        setUploadProgress(percentCompleted);
        if (percentCompleted === 100) setUploadState(UploadState.Processing)
    }

    const attemptUpload = async (e) => {

        e.preventDefault();
        if (file === '') return;
        var token = await getAccessTokenSilently(
            {
                authorizationParams: { audience: audience }
            })

        setUploadState(UploadState.Uploading)
        setUploadProgress(0)
        clipUploaderService
            .uploadClip(token, file, name, desc, true, uploadProgressHandler)
            .then(() => {
                setUploadState(UploadState.Success)
                setUploadProgress(0);
                setTimeout(() => {
                    navigate("/clips")
                }, 1500);
            })
            .catch((er) => {
                setUploadProgress(UploadState.Failed)
                setUploadProgress(0);
                console.log('error uploading clip: ', er)
            })
    }

    const onFileInput = (e) => {
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const disableButton = () => {
        return (name != '' && filename != '') ? "" : "disabled"
    }

    const getUploadStateView = (buttonState) => {
        if (buttonState === UploadState.PreUpload || buttonState === UploadState.Failed)
            return (<button
                className="btn btn-secondary btn-block"
                onClick={attemptUpload}
                disabled={disableButton()}
            >
                Create
            </button>)

        else if (buttonState === UploadState.Uploading)
            return (<progress className="progress progress-secondary w-full h-4"
                value={uploadProgress} max="100"></progress>)

        else if (buttonState === UploadState.Processing)
            return <span className="justify-center loading loading-spinner loading-lg"></span>

        else if (buttonState === UploadState.Success)
            return (
                <input
                    type="checkbox"
                    checked="checked"
                    readOnly={true}
                    className="checkbox checkbox-success checkbox-lg"
                />

            )
    }

    return (
        <div className=" mx-auto max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <div className="py-5 h-screen px-2">
                <div className="card card-compact bg-base-100 shadow-xl max-w-sm mx-auto">

                    <figure className="bg-neutral">
                        <span className="mt-2  mb-2 text-neutral-content">
                            <h1>Upload a Clip!</h1>
                        </span>
                    </figure>
                    <div className="card-body">
                        <div className="form-control w-full max-w-sm">
                            <div className="indicator w-full">
                                <span className="indicator-item badge badge-secondary mr-10">Required</span>
                                <input
                                    className="input input-bordered input-sm w-full max-w-sm"
                                    maxLength="60"
                                    type="text"
                                    placeholder="Title"
                                    onInput={(e) => setName(e.target.value)}
                                />
                            </div>
                            <textarea
                                className="mt-2 textarea textarea-bordered textarea-sm w-full max-w-sm"
                                placeholder="Description"
                                maxLength="280"
                                onInput={(e) => setDesc(e.target.value)}>
                            </textarea>
                            <div className="mt-2">
                                {filename != '' ?
                                    (<span
                                        className="badge badge-primary"
                                    >
                                        {filename}
                                    </span>) :
                                    (<p className="text-warning">No file selected</p>)
                                }
                            </div>
                            <div className="">
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
                                        onInput={onFileInput}
                                        accept=".mp4"
                                    />
                                </div>
                                <div className="flex justify-between items-center text-gray-400">
                                    <span>Accepted file type: .mp4 only</span>
                                </div>
                            </div>
                            <div className="flex justify-center mt-3">
                                {getUploadStateView(uploadState)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload