import './App.css';
import { Provider } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Chat from "./components/Chat";
import ThemeSignInPage from "./auth/signIn";
import SignUp from "./auth/signUp";
import PrivateRoutes from "./utils/privateRoutes";
import store from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<HomePage/>} />
              <Route path='/chat' element={<Chat/>} />
          </Route>
        <Route path="/login" element={<ThemeSignInPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  </Provider>
    </div>
  );
}

export default App;
