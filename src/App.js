import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Components/Cart';
import LoginDetails from './Components/LoginDetails';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <LoginDetails />
      <ToastContainer />
    <Routes>
     <Route path='/' element={<LoginPage />} />
     <Route path='/homePage' element={<HomePage />} />
     <Route path='/homePage/Cart' element={<Cart />} />
    </Routes>
    </div>
    
    </Provider>
  );
}

export default App;
