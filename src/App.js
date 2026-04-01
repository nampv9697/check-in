
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-toastify/dist/ReactToastify.css';
import Dangnhap from './components/Dangnhap';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (

    <div className="App">
      <Dangnhap />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
