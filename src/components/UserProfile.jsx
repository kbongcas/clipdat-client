import { useAuth0 } from '@auth0/auth0-react';

export const UserProfile = ({ user }) => {

    const { logout } = useAuth0();
    return (
        <div>
            <div className="flex flex-1 items-center justify-end md:justify-between">
                <div className="flex">
                    <div className="group flex shrink-0 items-center rounded-lg transition">
                        <div className="avatar">
                            <div className="w-11 rounded-xl">
                                <img src={user.picture} />
                            </div>
                        </div>

                        <p className="ms-2 hidden text-left text-xs sm:block">
                            <strong className="block font-medium text-lg">{user.nickname}</strong>
                            <span className="">{user.email}</span>
                        </p>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost rounded-btn">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                                <li>

                                    <button
                                        type="submit"
                                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                        role="menuitem"
                                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 opacity-75"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
