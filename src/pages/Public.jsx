import { useAuth0 } from '@auth0/auth0-react';
import Logo from '../assets/logo_with_name.svg'
import Logo2 from '../assets/logo_single.svg'

const Public = () => {

    const {loginWithRedirect, isLoading} = useAuth0();

    const handleLogin = () => {
        loginWithRedirect()
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md"></div>
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-2 block text-teal-600">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <h1
                        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Upload your clip!
                        <span className="sm:block"> Share with friends. </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Clipdat allows you to take your clip and convert into a .gif.
                    </p>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Share and send the gif to any platform.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            onClick={handleLogin}
                            className="btn btn-neutral"
                        >
                            Get Started!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Public