
import './App.css'
import Header from './components/Header';
import Post from './components/Post';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/Login';
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
