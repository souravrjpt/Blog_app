
import './App.css';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignUp from './components/auth/Signup';
import SignIn from './components/auth/Signin';
import { BlogPage } from './pages/BlogPage';
import PostForm from './components/form/PostForm';


function App() {
  return (
    <Router>
      <Routes>
              <Route exact path='/signin' element={<SignIn />}></Route>
              <Route exact path='/signup' element={<SignUp />}></Route>
              <Route exact path='/' element={<BlogPage />}></Route>
              <Route exact path='/my-blogs' element={<BlogPage isLogged={true} />}></Route>
              <Route exact path='/create-blog' element={<PostForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
