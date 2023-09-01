import { useNavigate } from "react-router-dom"

const UploadButton = () => {
      const navigate = useNavigate();
    return (
       <button 
            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            onClick={() => navigate("/upload")}
        >
            Upload!
        </button>
    );
};

export default UploadButton