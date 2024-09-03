import React, { useContext } from 'react'
import { UserContext } from '../../App.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRoutes from '../UserRoutes/UserRoutes'
import LoginSignup from '../../Pages/Auth/LoginSignup/LoginSignup.js'
// import Signup from '../../Pages/Auth/Signup/Signup'


const AppRoutes = () => {
    const { user } = useContext(UserContext)
    console.log(user);
    return (
        
        <BrowserRouter>
            {

                <Routes>
                    <Route path="/*" element={<UserRoutes/>} />
                    <Route path="/login" element={<LoginSignup/>} />
                    <Route path="/signup" element={<LoginSignup />} />
                    {/* <Route path="/account" element={<Account/>} /> */}
                    
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