
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './components/CreatePost';
import MainPost from './components/MainPost';
import EditPost from './components/EditPost';
function App() {
  return (
    <div>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/posts/:id'} element={<MainPost/>}/>
          <Route path={'/posts/edit/:id'} element={<EditPost/>}/>
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />}/>
          <Route path={'/create'} element={<CreatePost/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>

  );
}

export default App;
