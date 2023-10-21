import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login'
import RegisterUser from './Components/Login/RegisterUser'
import Cart from './Components/Cart/Cart'
import HomePage from './Components/HomePage/HomePage'
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <ToastContainer />
    <Routes>
     <Route path='/' element={<Login />} />
     <Route path='/Register' element={<RegisterUser/>} />
     <Route path='/homePage' element={<HomePage />} />
     <Route path='/homePage/Cart' element={<Cart />} />
    </Routes>
    </div>
    
    </Provider>
  );
}

export default App;
