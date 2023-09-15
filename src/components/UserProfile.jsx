import { useAuth0 } from '@auth0/auth0-react';

export const UserProfile = ({ user }) => {

    const { logout } = useAuth0();
    return (
        <div className="flex">
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={user.picture} />
                    </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <p className="font-medium text-base text-center">{user.nickname}</p>
                    <p className="text-xs text-center">{user.email}</p>
                    <div className="divider mt-0 mb-1"></div>
                    <li><a
                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    >Logout</a></li>
                </ul>
            </div>
        </div>
    )

}
