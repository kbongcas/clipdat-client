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
    const [showError, setShowError] = useState(false);

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
                console.log('error uploading clip: ', er)
                setUploadState(UploadState.Failed)
                setShowError(true)
                setUploadProgress(0);
                setTimeout(() => {
                    setShowError(false)
                }, 6000);
            })
    }

    const onFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
            setFilename(e.target.files[0].name)
        }
        else {
            setFile(null)
            setFilename('')
        }
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
                <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Upload Complete!</span>
                </div>
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

                            {/* Clip Title*/}
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

                            {/* Description*/}
                            <div className="indicator w-full"></div>
                            <textarea
                                className="mt-2 textarea textarea-bordered textarea-sm w-full"
                                placeholder="Description"
                                maxLength="280"
                                onInput={(e) => setDesc(e.target.value)}>
                            </textarea>


                            {/* File Input*/}

                            <div className="form-control mt-4 w-full">
                                <div className="indicator w-full">
                                    <span className="indicator-item badge badge-secondary mr-10">Required</span>
                                    <input
                                        type="file"
                                        className="file-input file-input-bordered file-input-md w-full "
                                        onInput={(e) => onFileInput(e)}
                                        accept=".mp4"
                                    />
                                </div>
                                <label className="label">
                                    <span className="label-text-alt"> .mp4 only</span>
                                    <span className="label-text-alt">180 MB max</span>
                                </label>
                            </div>
                            <div className="flex justify-center mt-3">
                                {getUploadStateView(uploadState)}
                            </div>
                            {uploadState === UploadState.Failed && showError &&
                                <div className="alert alert-error mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Oops! Error Occurred. Please try again.</span>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload