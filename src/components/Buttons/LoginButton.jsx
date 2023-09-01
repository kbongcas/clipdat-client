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
            className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
            type="button"
        >
            Login or Sign up
        </button>
    );
};

export default LoginButton