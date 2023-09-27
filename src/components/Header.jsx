import { useState } from 'react';
import LoginButton from './Buttons/LoginButton'
import { useAuth0 } from '@auth0/auth0-react';
import UploadButton from './Buttons/UploadButton';
import Logo from '../assets/logo_single_sm.svg'
import { UserProfile } from './UserProfile';

const Header = () => {

    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <header className="bg-base-100 border-b-2 border-base-300">
            <div
                className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
            >
                <div className="block text-teal-600">
                    <img src={Logo} alt="Logo" />
                </div>

                { isLoading == false && <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                        </ul>
                    </nav>

                    {isAuthenticated == false ?
                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <LoginButton buttonText={"Login or Sign up"} />
                            </div>
                        </div> :
                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <UploadButton />
                            </div>
                            <div className="sm:flex sm:gap-4">
                                <UserProfile user={user} />
                            </div>
                        </div>
                    }
                </div>}
            </div>
        </header>
    )
}

export default Header