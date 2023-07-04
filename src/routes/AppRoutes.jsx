import { Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login'
import Home from '../components/Home'
import TableUser from '../components/TableUser'
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element=<Home /> />
                <Route path='/login' element=<Login /> />
                <Route
                    path='/listusers'
                    element={
                        <PrivateRoutes>
                            <TableUser />
                        </PrivateRoutes>
                    }
                />
            </Routes>

        </>
    )
}

export default AppRoutes;