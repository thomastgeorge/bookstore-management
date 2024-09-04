import React, { useState } from 'react';
import './App.css';
import AppRoutes from './Routes/AppRoutes/AppRoutes'

export const UserContext = React.createContext();

function App({childern}) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <AppRoutes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
