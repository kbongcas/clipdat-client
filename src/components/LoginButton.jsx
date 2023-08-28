import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {

    const {loginWithRedirect, isLoading} = useAuth0();

    const handleLogin = () => {
        loginWithRedirect()
    }

    return (
        <button
            disabled={isLoading}
            onClick={handleLogin}
            className="block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring disabled:opacity-50"
            type="button"
        >
            Login
        </button>
    );
};

export default LoginButton