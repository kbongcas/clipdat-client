import { useNavigate } from "react-router-dom"

const UploadButton = () => {
    const navigate = useNavigate();
    return (
        <button
            className="btn btn-primary"
            onClick={() => navigate("/upload")}
        >
            Upload!
        </button>
    );
};

export default UploadButton