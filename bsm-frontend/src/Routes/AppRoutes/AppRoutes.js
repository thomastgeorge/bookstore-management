import React, { useContext } from 'react'
import { UserContext } from '../../App.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRoutes from '../UserRoutes/UserRoutes'
import LoginSignup from '../../Pages/Auth/LoginSignup/LoginSignup.js'
import AdminRoutes from '../AdminRoutes/AdminRoutes.js'
import PrivateRoute from '../PrivateRoute/PrivateRoute.js'

const AppRoutes = () => {
    const { user } = useContext(UserContext)
    console.log(user);
    return (
        <BrowserRouter>
            <Routes>
                {/* Define route for admin with PrivateRoute guard */}
                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute requiredRole="ADMIN">
                            <AdminRoutes />
                        </PrivateRoute>
                    }
                />

                {/* Define public routes */}
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/signup" element={<LoginSignup />} />

                {/* Define user routes */}
                <Route path="/*" element={<UserRoutes />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes