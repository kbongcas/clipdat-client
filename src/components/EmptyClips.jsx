import { useNavigate } from "react-router-dom"

export const EmptyClips = () => {
    const navigate = useNavigate();
    return (
        <div className="hero mt-5">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold">
                        Get Started and Upload your first Clip!
                    </h1>
                    <p className="py-6"></p>
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/upload")}
                    >
                        Upload!
                    </button>
                </div>
            </div>
        </div>
    )
}
