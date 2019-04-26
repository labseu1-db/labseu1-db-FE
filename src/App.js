import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
// import HomeScreen from './Components/HomeScreen';
import GetTest from './Components/GetTest';
import GetTest2 from './Components/GetTest2';
import SetTest from './Components/SetTest';

function App() {
  return (
    <div>
      <Sidebar />
      <GetTest />
      <GetTest2 />
      <SetTest />
      {/* <HomeScreen /> */}
    </div>
  );
}

export default App;
