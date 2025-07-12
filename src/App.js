import React,{useState} from 'react';
import './App.css';
import Login from './Components/Login';
import Calendar from './Components/Calendar';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      {!isLoggedIn ? ( 
        <Login onLogin={() => setIsLoggedIn(true)
        } />
       
       
      ) : (
        <div className="dashboard">
          <Calendar/>
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
    </div>
      )}
    </div>
  );
}

export default App;
