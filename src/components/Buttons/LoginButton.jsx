import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {

    const { isLoading } = useAuth0();
    const navigate = useNavigate();

    return (
        <button
            className="btn btn-primary"
            disabled={isLoading}
            onClick={() => navigate("/login")}
            type="button"
        >
            Login or Sign up
        </button>
    )
}

export default LoginButton