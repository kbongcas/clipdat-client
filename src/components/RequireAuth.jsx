import { useAuth } from './auth'
import { Navigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const RequireAuth = ({ children }) => {
    const auth = useAuth()
    if(!auth.user){
        return <Navigate to="/public" />
    }
    return children
}

