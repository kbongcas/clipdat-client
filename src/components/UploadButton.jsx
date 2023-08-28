import { useState, useRef } from "react";

const UploadButton = () => {
    return (
        <button className="mt-2 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
            Upload!
        </button>
    );
};

export default UploadButton