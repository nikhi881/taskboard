import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie';


const PrivateRoutes = () => {
    let auth = Cookies.get('accessToken')
    return (
        auth ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes