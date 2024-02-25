import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/doctor' element={''} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;