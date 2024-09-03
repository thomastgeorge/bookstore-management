import React, { useState } from 'react';
import './App.css';
import AppRoutes from './Routes/AppRoutes/AppRoutes'

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <AppRoutes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
