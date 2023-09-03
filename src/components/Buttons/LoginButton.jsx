import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {

    const { loginWithRedirect, isLoading } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect()
    }

    return (
        <button
            className="btn btn-primary"
            disabled={isLoading}
            onClick={handleLogin}
            type="button"
        >
            Login or Sign up
        </button>
    )
}

export default LoginButton