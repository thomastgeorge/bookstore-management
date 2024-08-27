import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRoutes from '../UserRoutes/UserRoutes'
import LoginSignup from '../../Pages/Auth/Login/LoginSignup'
// import Signup from '../../Pages/Auth/Signup/Signup'


const AppRoutes = () => {
    return (
        
        <BrowserRouter>
            {

                <Routes>
                    <Route path="/*" element={<UserRoutes />} />
                    {/* <Route path="/login" element={<LoginSignup/>} /> */}
                    
                </Routes>

                // user ?
                //     <Switch>
                //         <Route path="/*" element={<Home />} />
                //     </Switch>
                //     :
                //     <Switch>
                //         <Route path="/login" element={<Login />} />
                //         <Route path="/signup" element={<Signup />} />
                //         <Route path="/*" element={<Login />} />
                //     </Switch>
            }
        </BrowserRouter>
    )
}

export default AppRoutes